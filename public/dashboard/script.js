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

/* Single source of truth for every mood visualization (charts, mix, stats, legends).
   Later this can be replaced by values coming from the questionnaire backend. */
const MOOD_LEVELS = [
  { key: "veryLow",   level: 1, label: "Very Low",   note: "Overwhelmed",        color: "#171923", face: "😞" },
  { key: "low",       level: 2, label: "Low",        note: "Sad / withdrawn",    color: "#49307A", face: "🙁" },
  { key: "uneasy",    level: 3, label: "Uneasy",     note: "Worried / anxious",  color: "#7B45D6", face: "😟" },
  { key: "neutral",   level: 4, label: "Neutral",    note: "Steady / okay",      color: "#48B9E8", face: "😐" },
  { key: "good",      level: 5, label: "Good",       note: "Positive / balanced",color: "#42D39A", face: "🙂" },
  { key: "happy",     level: 6, label: "Happy",      note: "Motivated / joyful", color: "#FFD447", face: "😄" },
  { key: "veryHappy", level: 7, label: "Very Happy", note: "Excited / energetic",color: "#FF7A45", face: "😃" },
  { key: "euphoric",  level: 8, label: "Euphoric",   note: "Feel like flying",   color: "#FF3F8E", face: "🤩" }
];

/* score 0-100 -> mood level (never hardcoded per element) */
const levelFor = score => MOOD_LEVELS[Math.min(MOOD_LEVELS.length - 1, Math.max(0, Math.floor((score / 100) * MOOD_LEVELS.length)))];
/* stress is inverse: high stress = low mood level */
const levelForInverse = score => levelFor(100 - score);

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
  const sleepPct = Math.min((dashboardData.sleepWellness / 60) * 100, 100);
  const ringValues = { moodScore: dashboardData.moodScore, sleep: sleepPct };
  const ringLevels = { moodScore: levelFor(dashboardData.moodScore), sleep: levelFor(sleepPct) };
  document.querySelectorAll(".ring").forEach(r => {
    const pct = ringValues[r.dataset.ring] || 0;
    const lv = ringLevels[r.dataset.ring];
    const fg = r.querySelector(".ring-fg");
    if (lv) {
      fg.style.stroke = lv.color;
      fg.style.filter = `drop-shadow(0 0 8px ${lv.color}88)`;
      const tag = r.parentElement.querySelector(".tag");
      if (tag) {
        tag.textContent = `${lv.label} · ${lv.note}`;
        tag.style.background = lv.color + "22";
        tag.style.color = lv.color;
      }
    }
    fg.style.strokeDasharray = C;
    fg.style.strokeDashoffset = C;
    requestAnimationFrame(() => { fg.style.strokeDashoffset = C * (1 - pct / 100); });
  });

  /* stress uses the same palette, inverted (more stress = lower mood level) */
  const stressLv = levelForInverse(dashboardData.stressLevel);
  const stressFill = $(".fill.coral");
  if (stressFill) {
    stressFill.style.background = `linear-gradient(90deg, ${stressLv.color}, ${stressLv.color}aa)`;
    stressFill.style.boxShadow = `0 0 14px ${stressLv.color}80`;
    const stressTag = stressFill.closest(".stat-body").querySelector(".tag");
    if (stressTag) {
      stressTag.textContent = `${stressLv.label} · ${stressLv.note}`;
      stressTag.style.background = stressLv.color + "22";
      stressTag.style.color = stressLv.color;
    }
  }

  document.querySelectorAll(".fill[data-width]").forEach(f => {
    requestAnimationFrame(() => { f.style.width = f.dataset.width + "%"; });
  });
}

/* weekly mood wave — gradient bars coloured by mood level */
function drawChart() {
  const d = dashboardData.moodTrend;
  const peak = d.indexOf(Math.max(...d));
  $("#chart").innerHTML = d.map((v, i) => {
    const lv = levelFor(v);
    return `
      <div class="wbar${i === peak ? " peak" : ""}" style="--c:${lv.color}">
        <span class="wval">${v}%</span>
        <div class="wtrack"><i class="wfill" data-h="${v}"></i></div>
        <span class="wday">${DAYS[i]}</span>
        <span class="wface" aria-hidden="true">${lv.face}</span>
        <span class="wlabel">${lv.label}</span>
      </div>`;
  }).join("");
  $("#chart").setAttribute("aria-label",
    "Weekly mood: " + d.map((v, i) => `${DAYS[i]} ${v}% ${levelFor(v).label}`).join(", "));
  requestAnimationFrame(() => {
    $("#chart").querySelectorAll(".wfill").forEach((f, i) => {
      setTimeout(() => { f.style.height = f.dataset.h + "%"; }, i * 80);
    });
  });
}

/* mood mix — bright, glowing segments */
function drawMix() {
  const mix = dashboardData.moodMix;
  $("#mix").innerHTML = MOOD_LEVELS
    .map(m => `<i style="--c:${m.color}" data-w="${mix[m.key] || 0}" title="${m.level} · ${m.label} — ${m.note}: ${mix[m.key] || 0}%"></i>`).join("");
  requestAnimationFrame(() => {
    $("#mix").querySelectorAll("i").forEach(i => { i.style.width = i.dataset.w + "%"; });
  });
  $("#mix").setAttribute("aria-label",
    "Mood mix: " + MOOD_LEVELS.map(m => `${m.level} ${m.label} ${mix[m.key] || 0}%`).join(", "));
  $("#mixLegend").innerHTML = MOOD_LEVELS
    .map(m => `<li><span class="dot glow" style="--c:${m.color};background:${m.color}"></span>${m.level} · ${m.label} <strong>${mix[m.key] || 0}%</strong></li>`).join("");
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
  $("#paths").innerHTML = dashboardData.recommendations.map(p => {
    const lv = levelFor(p.progress);
    return `
    <li>
      <div class="p-ico" aria-hidden="true">${p.icon}</div>
      <h3>${p.title}</h3>
      <p class="muted small">${p.desc}</p>
      <div class="bar"><i class="fill" style="background:${lv.color};box-shadow:0 0 10px ${lv.color}80" data-width="${p.progress}"></i></div>
      <span class="small muted">${p.progress}% complete</span>
    </li>`;
  }).join("");
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
