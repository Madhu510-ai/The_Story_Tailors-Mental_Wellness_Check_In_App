/* Story-based emotional check-in.
   Questions, options and the 8-state mood scores come from data/stories.json,
   converted from the psychology-scored questionnaire workbooks.
   Scoring follows the workbook method: each option carries an 8-state mood
   score vector (sums to 10). Answers are averaged, normalised to percentages,
   and mapped to mood / energy / stress / sleep for the dashboard. */

const MOOD_KEYS = ["veryLow", "low", "uneasy", "neutral", "good", "happy", "veryHappy", "euphoric"];
const MOOD_META = [
  { label: "Very Low", color: "#171923" }, { label: "Low", color: "#49307A" },
  { label: "Uneasy", color: "#7B45D6" }, { label: "Neutral", color: "#48B9E8" },
  { label: "Good", color: "#42D39A" }, { label: "Happy", color: "#FFD447" },
  { label: "Very Happy", color: "#FF7A45" }, { label: "Euphoric", color: "#FF3F8E" }
];
const LETTERS = ["A", "B", "C", "D"];
const $ = (s, r = document) => r.querySelector(s);
const clamp = (v, a = 0, b = 100) => Math.min(b, Math.max(a, v));

let DATA = null, genre = null, story = null, questions = [], answers = [], index = 0;

/* ---------- selection screens ---------- */
function showPickGenres() {
  $("#quizCard").hidden = true;
  $("#doneCard").hidden = true;
  $("#pickCard").hidden = false;
  $("#pickStep").textContent = "Step 1 of 2";
  $("#pickTitle").textContent = "Choose a genre";
  $("#pickHint").textContent = "Each world tells a different story about how you feel today.";
  $("#pickBack").hidden = true;
  $("#qProgressFill").style.width = "0%";
  $("#pickGrid").innerHTML = DATA.genres.map(g => `
    <li><button type="button" class="pick" data-genre="${g.id}">
      <span class="pick-ico" aria-hidden="true">${g.icon}</span>
      <span class="pick-name">${g.name}</span>
      <span class="muted small">${g.stories.length} stories</span>
    </button></li>`).join("");
}

function showPickStories(g) {
  genre = g;
  $("#pickStep").textContent = "Step 2 of 2";
  $("#pickTitle").textContent = `${g.name} — pick your story`;
  $("#pickHint").textContent = "Six moments from the story, six choices.";
  $("#pickBack").hidden = false;
  $("#pickGrid").innerHTML = g.stories.map(s => `
    <li><button type="button" class="pick" data-story="${s.id}">
      <span class="pick-ico" aria-hidden="true">${g.icon}</span>
      <span class="pick-name">${s.title}</span>
      <span class="muted small">${s.questions.length} questions</span>
    </button></li>`).join("");
}

function startStory(s) {
  story = s;
  questions = s.questions.slice(0, 6);
  answers = new Array(questions.length).fill(null);
  index = 0;
  $("#pickCard").hidden = true;
  $("#quizCard").hidden = false;
  render();
}

$("#pickGrid").addEventListener("click", e => {
  const btn = e.target.closest("button[data-genre],button[data-story]");
  if (!btn) return;
  if (btn.dataset.genre) showPickStories(DATA.genres.find(g => g.id === btn.dataset.genre));
  else startStory(genre.stories.find(s => s.id === btn.dataset.story));
});
$("#pickBack").addEventListener("click", showPickGenres);

/* ---------- question screen ---------- */
function render() {
  const q = questions[index];
  $("#qStep").textContent = `Question ${index + 1} of ${questions.length}`;
  $("#qSignal").textContent = `${story.title} · ${q.beat}`;
  $("#qScenario").textContent = q.scene;
  $("#qText").textContent = q.question;
  $("#qProgressFill").style.width = (index / questions.length) * 100 + "%";

  $("#qOptions").innerHTML = q.options.map((o, i) => `
    <li>
      <button type="button" class="opt${answers[index] === i ? " chosen" : ""}" data-i="${i}"
        aria-pressed="${answers[index] === i}">
        <span class="opt-key" aria-hidden="true">${LETTERS[i]}</span>
        <span class="opt-text">${o.text}</span>
      </button>
    </li>`).join("");

  $("#qBack").disabled = index === 0;
  $("#qNext").disabled = answers[index] === null;
  $("#qNext").textContent = index === questions.length - 1 ? "See my results" : "Next";
}

$("#qOptions").addEventListener("click", e => {
  const btn = e.target.closest("button[data-i]");
  if (!btn) return;
  answers[index] = +btn.dataset.i;
  render();
  setTimeout(() => { if (answers[index] !== null) next(); }, 260);
});
function next() {
  if (answers[index] === null) return;
  if (index < questions.length - 1) { index++; render(); }
  else finish();
}
$("#qNext").addEventListener("click", next);
$("#qBack").addEventListener("click", () => { if (index > 0) { index--; render(); } });

/* ---------- scoring (workbook method) ---------- */
function scoreAnswers() {
  const chosen = answers.map((a, i) => questions[i].options[a]);

  /* 1. average the 8-state mood score vectors, then normalise to percentages */
  const totals = {};
  MOOD_KEYS.forEach(k => (totals[k] = 0));
  chosen.forEach(o => MOOD_KEYS.forEach(k => (totals[k] += o.mix[k] || 0)));
  const sum = MOOD_KEYS.reduce((s, k) => s + totals[k], 0) || 1;
  const mixExact = {};
  MOOD_KEYS.forEach(k => (mixExact[k] = (totals[k] / sum) * 100));

  /* rounded percentages that still add up to 100 */
  const mix = {};
  MOOD_KEYS.forEach(k => (mix[k] = Math.round(mixExact[k])));
  let drift = 100 - MOOD_KEYS.reduce((s, k) => s + mix[k], 0);
  const order = MOOD_KEYS.slice().sort((a, b) => mixExact[b] - mixExact[a]);
  for (let i = 0; drift !== 0; i = (i + 1) % order.length) {
    mix[order[i]] += drift > 0 ? 1 : -1;
    drift += drift > 0 ? -1 : 1;
  }

  /* 2. mood score = mix-weighted position on the 8-level scale (0-100) */
  const mood = Math.round(MOOD_KEYS.reduce((s, k, i) => s + mixExact[k] * ((i + 0.5) / 8) * 100, 0) / 100);

  /* 3. energy from arousal, stress from negative states + low valence */
  const avg = a => a.reduce((s, v) => s + v, 0) / a.length;
  const arousal = avg(chosen.map(o => o.arousal || 0));   // -1..1
  const valence = avg(chosen.map(o => o.valence || 0));   // -1..1
  const energy = Math.round(clamp(((arousal + 1) / 2) * 100));
  const negShare = mixExact.veryLow + mixExact.low + mixExact.uneasy;
  const stress = Math.round(clamp(0.7 * negShare + 0.3 * (1 - (valence + 1) / 2) * 100));

  /* 4. sleep wellness proxy: calm + energy balance, in minutes of deep rest */
  const sleep = Math.round((((100 - stress) * 0.6 + energy * 0.4) / 100) * 60);

  const topKey = order[0];
  return {
    mood, energy, stress, sleep, mix,
    dominant: MOOD_META[MOOD_KEYS.indexOf(topKey)].label,
    genre: genre.name, story: story.title,
    at: new Date().toISOString(), answers: answers.slice()
  };
}

function databaseRecord(result) {
  return {
    genre: result.genre,
    story: result.story,
    answers: questions.map((question, questionIndex) => {
      const optionIndex = answers[questionIndex];
      return {
        question: question.question,
        selected_option_index: optionIndex,
        selected_answer: question.options[optionIndex]?.text || ""
      };
    }),
    results: result
  };
}

async function finish() {
  const result = scoreAnswers();

  $("#quizCard").hidden = true;
  const done = $("#doneCard");
  done.hidden = false;
  $("#qProgressFill").style.width = "100%";
  $("#resMoodLabel").textContent = `${result.genre} · ${result.story} — detected mood: ${result.dominant}`;
  $("#resMood").textContent = result.mood + "%";
  $("#resStress").textContent = result.stress + "%";
  $("#resSleep").textContent = result.sleep + " min";
  $("#resMix").innerHTML = MOOD_KEYS.map((k, i) =>
    `<i style="--c:${MOOD_META[i].color};width:${result.mix[k]}%" title="${MOOD_META[i].label}: ${result.mix[k]}%"></i>`).join("");
  $("#resLegend").innerHTML = MOOD_KEYS.map((k, i) =>
    `<li><span class="dot glow" style="--c:${MOOD_META[i].color};background:${MOOD_META[i].color}"></span>${MOOD_META[i].label} <strong>${result.mix[k]}%</strong></li>`).join("");
  done.focus();

  try {
    await WellnessAuth.saveCheckin(databaseRecord(result));
    $("#saveStatus").textContent = "Saved securely to your account. Your dashboard is ready.";
  } catch (error) {
    $("#saveStatus").textContent = `Could not save this check-in: ${error.message}`;
  }
}

/* ---------- boot ---------- */
WellnessAuth.getUser().then(user => {
  if (!user) { location.replace("login.html"); return; }
  fetch("data/stories.json")
    .then(r => r.json())
    .then(d => { DATA = d; showPickGenres(); })
    .catch(() => {
      $("#pickTitle").textContent = "Stories couldn't be loaded";
      $("#pickHint").textContent = "Please refresh the page to try again.";
    });
});
