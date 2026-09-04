/* Emotional check-in questionnaire.
   Each option carries a mood / energy / stress signal (0-100).
   Results are stored locally and read by the dashboard (script.js).
   A backend can later replace the storage layer without touching the scoring. */

const QUESTIONS = [
  {
    scenario: "It's Saturday. You have no deadlines, no plans, and nobody expects anything from you.",
    question: "What sounds most appealing?",
    signal: "Energy · motivation · withdrawal",
    options: [
      { text: "I just want to stay in bed and do nothing.", mood: 15, energy: 10, stress: 70 },
      { text: "I'd probably watch something and forget about the day.", mood: 35, energy: 25, stress: 55 },
      { text: "Maybe I'll slowly get myself moving.", mood: 58, energy: 50, stress: 40 },
      { text: "I'd actually love to go out and do something.", mood: 82, energy: 80, stress: 25 }
    ]
  },
  {
    scenario: "You send a message to someone you care about. Hours pass. They haven't replied.",
    question: "What is your first instinct?",
    signal: "Emotional sensitivity · reassurance-seeking · rumination",
    options: [
      { text: "\u201cThey're probably busy. I'll wait.\u201d", mood: 70, energy: 55, stress: 30 },
      { text: "\u201cDid I say something wrong?\u201d", mood: 25, energy: 30, stress: 80 },
      { text: "I keep checking my phone.", mood: 35, energy: 40, stress: 72 },
      { text: "I forget about it and continue my day.", mood: 75, energy: 60, stress: 25 }
    ]
  },
  {
    scenario: "You're about to leave for something you've been looking forward to. Suddenly, the plan changes completely.",
    question: "What's your reaction?",
    signal: "Uncertainty tolerance · stress response · adaptability",
    options: [
      { text: "\u201cOkay, let's see what happens.\u201d", mood: 68, energy: 50, stress: 30 },
      { text: "I immediately want to know every detail.", mood: 45, energy: 55, stress: 58 },
      { text: "I feel irritated and need a moment.", mood: 28, energy: 40, stress: 78 },
      { text: "\u201cActually, this could be fun.\u201d", mood: 85, energy: 75, stress: 22 }
    ]
  },
  {
    scenario: "You walk into a caf\u00e9 you've never visited before. It's quiet, there's good music playing, and you have an hour completely to yourself.",
    question: "What do you do?",
    signal: "Baseline emotional regulation · preference for stimulation",
    options: [
      { text: "Sit by the window and simply enjoy it.", mood: 72, energy: 45, stress: 25 },
      { text: "Read or work on something.", mood: 60, energy: 55, stress: 35 },
      { text: "Take out your phone and message someone.", mood: 42, energy: 45, stress: 55 },
      { text: "Start exploring the menu and the place.", mood: 80, energy: 75, stress: 30 }
    ]
  },
  {
    scenario: "Something you've been working on finally goes right. It isn't a huge achievement, but you're genuinely pleased.",
    question: "What happens next?",
    signal: "Satisfaction · motivation · positive regulation",
    options: [
      { text: "I quietly enjoy the feeling.", mood: 65, energy: 45, stress: 28 },
      { text: "I immediately tell someone.", mood: 75, energy: 65, stress: 28 },
      { text: "It motivates me to tackle the next thing.", mood: 80, energy: 80, stress: 32 },
      { text: "I reward myself with something fun.", mood: 85, energy: 75, stress: 25 }
    ]
  },
  {
    scenario: "A friend texts: \u201cDon't make plans tonight. I've got something fun planned.\u201d",
    question: "What's your reaction?",
    signal: "Anticipation · positive affect · social engagement",
    options: [
      { text: "\u201cTell me everything!\u201d", mood: 72, energy: 70, stress: 32 },
      { text: "I start guessing what it could be.", mood: 62, energy: 60, stress: 42 },
      { text: "I'm already excited.", mood: 85, energy: 80, stress: 25 },
      { text: "I send back about 20 excited messages.", mood: 92, energy: 92, stress: 30 }
    ]
  },
  {
    scenario: "Imagine tomorrow goes almost exactly the way you'd want. You wake up feeling great, your favorite people are around, and everything seems to click.",
    question: "What would you most likely do?",
    signal: "Energy · social activation · motivation · novelty-seeking",
    options: [
      { text: "Soak it all in.", mood: 70, energy: 45, stress: 22 },
      { text: "Make plans to keep the energy going.", mood: 80, energy: 75, stress: 28 },
      { text: "Bring everyone together.", mood: 85, energy: 80, stress: 26 },
      { text: "Try something completely spontaneous.", mood: 90, energy: 90, stress: 32 }
    ]
  },
  {
    scenario: "You receive a message: \u201cYou just got something you've wanted for a very long time.\u201d",
    question: "Before you even know the details, what's your instinct?",
    signal: "Positive activation · excitement · reward response",
    options: [
      { text: "I freeze for a second because it doesn't feel real.", mood: 55, energy: 40, stress: 50 },
      { text: "I immediately call someone.", mood: 80, energy: 72, stress: 28 },
      { text: "I start jumping around / celebrating.", mood: 92, energy: 92, stress: 22 },
      { text: "I want to do something unforgettable right now.", mood: 95, energy: 95, stress: 28 }
    ]
  }
];

const LETTERS = ["A", "B", "C", "D"];
const $ = (s, r = document) => r.querySelector(s);

const answers = new Array(QUESTIONS.length).fill(null);
let index = 0;

const listEl = $("#qOptions");

function render() {
  const q = QUESTIONS[index];
  $("#qStep").textContent = `Question ${index + 1} of ${QUESTIONS.length}`;
  $("#qSignal").textContent = q.signal;
  $("#qScenario").textContent = q.scenario;
  $("#qText").textContent = q.question;
  $("#qProgressFill").style.width = ((index) / QUESTIONS.length) * 100 + "%";

  listEl.innerHTML = q.options.map((o, i) => `
    <li>
      <button type="button" class="opt${answers[index] === i ? " chosen" : ""}" data-i="${i}"
        aria-pressed="${answers[index] === i}">
        <span class="opt-key" aria-hidden="true">${LETTERS[i]}</span>
        <span class="opt-text">${o.text}</span>
      </button>
    </li>`).join("");

  $("#qBack").disabled = index === 0;
  $("#qNext").disabled = answers[index] === null;
  $("#qNext").textContent = index === QUESTIONS.length - 1 ? "See my results" : "Next";
}

listEl.addEventListener("click", e => {
  const btn = e.target.closest("button[data-i]");
  if (!btn) return;
  answers[index] = +btn.dataset.i;
  render();
  setTimeout(() => { if (answers[index] !== null) next(); }, 260);
});

function next() {
  if (answers[index] === null) return;
  if (index < QUESTIONS.length - 1) { index++; render(); }
  else finish();
}

$("#qNext").addEventListener("click", next);
$("#qBack").addEventListener("click", () => { if (index > 0) { index--; render(); } });

/* ---- scoring ---- */
const avg = a => Math.round(a.reduce((s, v) => s + v, 0) / a.length);

function scoreAnswers() {
  const chosen = answers.map((a, i) => QUESTIONS[i].options[a]);
  const mood = avg(chosen.map(o => o.mood));
  const energy = avg(chosen.map(o => o.energy));
  const stress = avg(chosen.map(o => o.stress));

  /* mood mix = distribution of the 8 mood levels across the answers */
  const keys = ["veryLow", "low", "uneasy", "neutral", "good", "happy", "veryHappy", "euphoric"];
  const mix = {};
  keys.forEach(k => (mix[k] = 0));
  chosen.forEach(o => {
    const idx = Math.min(7, Math.max(0, Math.floor((o.mood / 100) * 8)));
    mix[keys[idx]] += 1;
  });
  keys.forEach(k => (mix[k] = Math.round((mix[k] / chosen.length) * 100)));

  /* sleep wellness proxy: calm + energy balance, expressed in minutes of deep rest */
  const sleep = Math.round(((100 - stress) * 0.6 + energy * 0.4) / 100 * 60);

  return { mood, energy, stress, sleep, mix, at: new Date().toISOString(), answers: answers.slice() };
}

const KEY = "mindful.checkins";
const loadHistory = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };

function finish() {
  const result = scoreAnswers();
  const history = loadHistory();
  history.push(result);
  localStorage.setItem(KEY, JSON.stringify(history.slice(-30)));

  $("#quizCard").hidden = true;
  const done = $("#doneCard");
  done.hidden = false;
  $("#qProgressFill").style.width = "100%";
  $("#resMood").textContent = result.mood + "%";
  $("#resStress").textContent = result.stress + "%";
  $("#resSleep").textContent = result.sleep + " min";
  done.focus();
}

render();
