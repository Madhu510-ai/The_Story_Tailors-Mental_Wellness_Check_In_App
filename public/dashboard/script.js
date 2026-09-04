/* Dashboard data — will later be produced by the emotion questionnaire */
const dashboardData = {
  user: { name: "Sara" },
  moodScore: 65,
  stressLevel: 70,
  sleepWellness: 42,
  streak: 7,
  moodTrend: [62, 68, 64, 76, 88, 79, 84],
  moodMix: { veryLow: 5, low: 8, uneasy: 12, neutral: 20, good: 22, happy: 16, veryHappy: 12, euphoric: 5 },
  insight:
    "Your mood peaks on Thursdays and improves on days you complete an evening reflection — consider a longer mid-week session.",
  nextCheckIn: { inMinutes: 6 * 60 + 52 },
  questionnaireHistory: [
    { icon: "🌤", title: "Emotional Check-in", date: "Today", status: "Completed", detail: "You reported a calm, steady mood with mild afternoon tension. Mood score 65." },
    { icon: "🌊", title: "Stress Management", date: "Yesterday", status: "Completed", detail: "Breathing exercise completed. Stress dropped 3% compared with the previous day." },
    { icon: "🌙", title: "Sleep Tracking", date: "Aug 31", status: "Completed", detail: "Average sleep wellness of 42 minutes of deep rest below your personal baseline." },
    { icon: "🍂", title: "Mood Reflection", date: "Aug 30", status: "Completed", detail: "Journaling noted gratitude and social energy as the strongest positive drivers." }
  ],
  recommendations: [
    { icon: "🧘", title: "Meditation", desc: "5 min · Calm your mind", progress: 60, tone: "teal" },
    { icon: "✍️", title: "Journaling", desc: "10 min · Evening reflection", progress: 35, tone: "gold" },
    { icon: "✨", title: "Reflection", desc: "5 min · Understand today's mood", progress: 80, tone: "ocean" },
    { icon: "🌬", title: "Breathing", desc: "3 min · Reset your nervous system", progress: 20, tone: "coral" }
  ]
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const $ = (s, r = document) => r.querySelector(s);

/* header */
$("#userName").textContent = dashboardData.user.name;
$("#streak").textContent = dashboardData.streak;
$("#insightText").textContent = dashboardData.insight;

const menuBtn = $("#menuBtn"), nav = $("#nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
nav.addEventListener("click", e => { if (e.target.tagName === "A") nav.classList.remove("open"); });

/* counters + rings + bars */
function animateNumber(el) {
  const target = +el.dataset.count, suffix = el.dataset.suffix || "";
  const start = performance.now(), dur = 1200;
  const step = t => {
    const p = Math.min((t - start) / dur, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function boot() {
  document.querySelectorAll("[data-count]").forEach(animateNumber);
  const C = 2 * Math.PI * 34;
  const ringValues = { moodScore: dashboardData.moodScore, sleep: Math.min(dashboardData.sleepWellness / 60 * 100, 100) };
  document.querySelectorAll(".ring").forEach(r => {
    const pct = ringValues[r.dataset.ring] || 0;
    const fg = r.querySelector(".ring-fg");
    fg.style.strokeDasharray = C;
    fg.style.strokeDashoffset = C;
    requestAnimationFrame(() => { fg.style.strokeDashoffset = C * (1 - pct / 100); });
  });
  document.querySelectorAll(".fill[data-width]").forEach(f => {
    requestAnimationFrame(() => { f.style.width = f.dataset.width + "%"; });
  });
}

/* mood wave chart */
function drawChart() {
  const svg = $("#chart"), W = 600, H = 220, pad = 26;
  const d = dashboardData.moodTrend;
  const min = Math.min(...d) - 10, max = Math.max(...d) + 8;
  const x = i => pad + (i * (W - pad * 2)) / (d.length - 1);
  const y = v => H - pad - ((v - min) / (max - min)) * (H - pad * 2);
  const pts = d.map((v, i) => [x(i), y(v)]);

  let path = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i], [x1, y1] = pts[i + 1], cx = (x0 + x1) / 2;
    path += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
  }
  const peak = d.indexOf(Math.max(...d));

  svg.innerHTML = `
    <defs>
      <linearGradient id="moodFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#3FA6B8" stop-opacity=".35"/>
        <stop offset="100%" stop-color="#FBF3E3" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <path class="area" d="${path} L ${x(d.length - 1)} ${H - pad} L ${pad} ${H - pad} Z"/>
    <path class="line" d="${path}"/>
    ${pts.map(([px, py], i) => `<circle class="pt${i === peak ? " peak" : ""}" cx="${px}" cy="${py}" r="${i === peak ? 7 : 5}"><title>${DAYS[i]}: ${d[i]}</title></circle>`).join("")}
  `;
  const line = svg.querySelector(".line");
  const len = line.getTotalLength();
  line.style.strokeDasharray = len;
  line.style.strokeDashoffset = len;
  line.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: 1400, easing: "ease-out", fill: "forwards" });

  $("#days").innerHTML = DAYS.map((day, i) => `<li class="${i === peak ? "peak" : ""}">${day}</li>`).join("");
}

/* mood mix */
function drawMix() {
  const meta = {
    veryLow: { label: "1 · Very Low", note: "Overwhelmed", color: "#171923" },
    low: { label: "2 · Low", note: "Sad / withdrawn", color: "#49307A" },
    uneasy: { label: "3 · Uneasy", note: "Worried / anxious", color: "#7B45D6" },
    neutral: { label: "4 · Neutral", note: "Steady / okay", color: "#48B9E8" },
    good: { label: "5 · Good", note: "Positive / balanced", color: "#42D39A" },
    happy: { label: "6 · Happy", note: "Motivated / joyful", color: "#FFD447" },
    veryHappy: { label: "7 · Very Happy", note: "Excited / energetic", color: "#FF7A45" },
    euphoric: { label: "8 · Euphoric", note: "Feel like flying", color: "#FF3F8E" }
  };
  const mix = dashboardData.moodMix;
  $("#mix").innerHTML = Object.keys(meta)
    .map(k => `<i style="background:${meta[k].color}" data-w="${mix[k]}" title="${meta[k].label} — ${meta[k].note}: ${mix[k]}%"></i>`).join("");
  requestAnimationFrame(() => {
    $("#mix").querySelectorAll("i").forEach(i => { i.style.width = i.dataset.w + "%"; });
  });
  $("#mix").setAttribute("aria-label",
    "Mood mix: " + Object.keys(meta).map(k => `${meta[k].label} ${mix[k]}%`).join(", "));
  $("#mixLegend").innerHTML = Object.keys(meta)
    .map(k => `<li><span class="dot" style="background:${meta[k].color}"></span>${meta[k].label} <strong>${mix[k]}%</strong></li>`).join("");
}

/* reports */
function drawReports() {
  $("#reportList").innerHTML = dashboardData.questionnaireHistory.map((r, i) => `
    <li><button type="button" data-i="${i}" aria-label="${r.title}, ${r.date}, ${r.status}">
      <span class="ico" aria-hidden="true">${r.icon}</span>
      <span><span class="rtitle">${r.title}</span><br><span class="meta">${r.date} · ${r.status}</span></span>
      <span class="status">${r.status}</span>
      <span class="chev" aria-hidden="true">›</span>
    </button></li>`).join("");

  const modal = $("#modal");
  $("#reportList").addEventListener("click", e => {
    const btn = e.target.closest("button[data-i]");
    if (!btn) return;
    const r = dashboardData.questionnaireHistory[+btn.dataset.i];
    $("#modalTitle").textContent = r.title;
    $("#modalMeta").textContent = `${r.date} · ${r.status}`;
    $("#modalBody").textContent = r.detail;
    modal.hidden = false;
    $("#modalClose").focus();
  });
  $("#modalClose").addEventListener("click", () => { modal.hidden = true; });
  modal.addEventListener("click", e => { if (e.target === modal) modal.hidden = true; });
  document.addEventListener("keydown", e => { if (e.key === "Escape") modal.hidden = true; });
}

/* recommendations */
function drawPaths() {
  $("#paths").innerHTML = dashboardData.recommendations.map(p => `
    <li>
      <div class="p-ico" aria-hidden="true">${p.icon}</div>
      <h3>${p.title}</h3>
      <p class="muted small">${p.desc}</p>
      <div class="bar"><i class="fill ${p.tone}" style="background:${p.tone === "coral" ? "var(--warm-coral)" : ""}" data-width="${p.progress}"></i></div>
      <span class="small muted">${p.progress}% complete</span>
    </li>`).join("");
}

/* countdown */
function startCountdown() {
  const end = Date.now() + dashboardData.nextCheckIn.inMinutes * 60000;
  const el = $("#countdown");
  const tick = () => {
    const ms = Math.max(end - Date.now(), 0);
    const h = Math.floor(ms / 3.6e6), m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60;
    el.textContent = `${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
  };
  tick();
  setInterval(tick, 1000);
}

/* reveal stagger */
document.querySelectorAll(".reveal").forEach((el, i) => { el.style.animationDelay = `${i * 90}ms`; });

drawChart();
drawMix();
drawReports();
drawPaths();
startCountdown();
boot();
window.addEventListener("resize", () => { clearTimeout(window.__r); window.__r = setTimeout(drawChart, 200); });
