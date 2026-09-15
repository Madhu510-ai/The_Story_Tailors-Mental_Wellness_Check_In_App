/* Mindful Dashboard Script
   - Supports user session switching and profile isolation.
   - Powers the interactive Session-Wise Analysis Visualizer.
   - Synchronizes mood trends, mood mix, story progression, and session breakdown. */

const MOOD_LEVELS = [
  { key: "veryLow",   level: 1, label: "Very Low",   note: "Overwhelmed",        color: "#6ee7b7", face: "😞" },
  { key: "low",       level: 2, label: "Low",        note: "Sad / withdrawn",    color: "#49307A", face: "🙁" },
  { key: "uneasy",    level: 3, label: "Uneasy",     note: "Worried / anxious",  color: "#7B45D6", face: "😟" },
  { key: "neutral",   level: 4, label: "Neutral",    note: "Steady / okay",      color: "#48B9E8", face: "😐" },
  { key: "good",      level: 5, label: "Good",       note: "Positive / balanced",color: "#42D39A", face: "🙂" },
  { key: "happy",     level: 6, label: "Happy",      note: "Motivated / joyful", color: "#FFD447", face: "😄" },
  { key: "veryHappy", level: 7, label: "Very Happy", note: "Excited / energetic",color: "#FF7A45", face: "😃" },
  { key: "euphoric",  level: 8, label: "Euphoric",   note: "Feel like flying",   color: "#FF3F8E", face: "🤩" }
];

const levelFor = score => {
  if (score <= 20) return MOOD_LEVELS[0];
  if (score <= 35) return MOOD_LEVELS[1];
  if (score <= 48) return MOOD_LEVELS[2];
  if (score <= 62) return MOOD_LEVELS[3];
  if (score <= 75) return MOOD_LEVELS[4];
  if (score <= 86) return MOOD_LEVELS[5];
  if (score <= 94) return MOOD_LEVELS[6];
  return MOOD_LEVELS[7];
};
const levelForInverse = score => levelFor(100 - score);

const MOOD_THEME_META = {
  veryLow:   { key: "veryLow",   label: "Very Low",   name: "Misty Shadow Valley", icon: "🏔️" },
  low:       { key: "low",       label: "Low",        name: "Twilight Plum",    icon: "🌧️" },
  uneasy:    { key: "uneasy",    label: "Uneasy",     name: "Electric Violet",  icon: "🔮" },
  neutral:   { key: "neutral",   label: "Neutral",    name: "Serene Sunset Zen", icon: "🪨" },
  good:      { key: "good",      label: "Good",       name: "Mint Emerald",     icon: "🌿" },
  happy:     { key: "happy",     label: "Happy",      name: "Golden Sunshine",  icon: "☀️" },
  veryHappy: { key: "veryHappy", label: "Very Happy", name: "Sunrise Coral",    icon: "🔥" },
  euphoric:  { key: "euphoric",  label: "Euphoric",   name: "Neon Magenta",     icon: "✨" }
};

function getDominantMoodKey(mix, moodScore) {
  if (mix && typeof mix === "object") {
    let maxKey = null;
    let maxPct = 0;
    const moodKeys = ["veryLow", "low", "uneasy", "neutral", "good", "happy", "veryHappy", "euphoric"];
    moodKeys.forEach(k => {
      const val = Number(mix[k] || 0);
      if (val > maxPct) {
        maxPct = val;
        maxKey = k;
      }
    });
    if (maxKey && maxPct > 0) return maxKey;
  }

  if (typeof moodScore === "number" && !isNaN(moodScore)) {
    const lv = levelFor(moodScore);
    if (lv && lv.key) return lv.key;
  }

  return "neutral";
}

function applyDynamicMoodTheme(mixOrKey, moodScore) {
  let key = "neutral";
  if (typeof mixOrKey === "string" && MOOD_THEME_META[mixOrKey]) {
    key = mixOrKey;
  } else if (typeof mixOrKey === "number") {
    key = getDominantMoodKey(null, mixOrKey);
  } else {
    key = getDominantMoodKey(mixOrKey, moodScore);
  }

  const meta = MOOD_THEME_META[key] || MOOD_THEME_META.neutral;
  document.documentElement.dataset.moodTheme = key;

  const badge = $("#activeThemeBadge");
  if (badge) {
    badge.innerHTML = `<span aria-hidden="true">${meta.icon}</span> Theme: ${meta.name} (${meta.label})`;
    badge.title = `Active app theme reflecting dominant mood division: ${meta.label} (${meta.name})`;
  }

  const euphoricVid = $("#euphoricBgVideo");
  if (euphoricVid) {
    if (key === "euphoric") {
      euphoricVid.style.display = "block";
      euphoricVid.play().catch(e => console.log("Video autoplay check:", e));
    } else {
      euphoricVid.style.display = "none";
      euphoricVid.pause();
    }
  }

  const lowVid = $("#lowBgVideo");
  if (lowVid) {
    if (key === "low") {
      lowVid.style.display = "block";
      lowVid.play().catch(e => console.log("Video autoplay check:", e));
    } else {
      lowVid.style.display = "none";
      lowVid.pause();
    }
  }

  const uneasyVid = $("#uneasyBgVideo");
  if (uneasyVid) {
    if (key === "uneasy") {
      uneasyVid.style.display = "block";
      uneasyVid.play().catch(e => console.log("Video autoplay check:", e));
    } else {
      uneasyVid.style.display = "none";
      uneasyVid.pause();
    }
  }

  const goodVid = $("#goodBgVideo");
  if (goodVid) {
    if (key === "good") {
      goodVid.style.display = "block";
      goodVid.play().catch(e => console.log("Video autoplay check:", e));
    } else {
      goodVid.style.display = "none";
      goodVid.pause();
    }
  }

  const happyVid = $("#happyBgVideo");
  if (happyVid) {
    if (key === "happy") {
      happyVid.style.display = "block";
      happyVid.play().catch(e => console.log("Video autoplay check:", e));
    } else {
      happyVid.style.display = "none";
      happyVid.pause();
    }
  }

  const veryHappyVid = $("#veryHappyBgVideo");
  if (veryHappyVid) {
    if (key === "veryHappy") {
      veryHappyVid.style.display = "block";
      veryHappyVid.play().catch(e => console.log("Video autoplay check:", e));
    } else {
      veryHappyVid.style.display = "none";
      veryHappyVid.pause();
    }
  }
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const $ = (s, r = document) => r.querySelector(s);

/* ---------- User Session Storage ---------- */
const USERS_KEY = "mindful.users";
const CURRENT_USER_KEY = "mindful.currentUser";
const DEFAULT_USERS = [
  { id: "user_sara", name: "Sara" },
  { id: "user_alex", name: "Alex" },
  { id: "user_elena_low", name: "Elena (Very Low Mood)" },
  { id: "user_kai_low", name: "Kai (Low Mood)" },
  { id: "user_rowan_uneasy", name: "Rowan (Uneasy Mood)" },
  { id: "user_oliver_good", name: "Oliver (Good Mood)" },
  { id: "user_sunny_happy", name: "Sunny (Happy Mood)" },
  { id: "user_blaze_veryhappy", name: "Blaze (Very Happy Mood)" },
  { id: "user_spark_euphoric", name: "Spark (Euphoric Mood)" }
];

function getUsers() {
  try {
    const data = JSON.parse(localStorage.getItem(USERS_KEY));
    if (Array.isArray(data) && data.length > 0) {
      if (!data.some(u => u.id === "user_elena_low")) {
        data.push({ id: "user_elena_low", name: "Elena (Very Low Mood)" });
      }
      if (!data.some(u => u.id === "user_kai_low")) {
        data.push({ id: "user_kai_low", name: "Kai (Low Mood)" });
      }
      if (!data.some(u => u.id === "user_rowan_uneasy")) {
        data.push({ id: "user_rowan_uneasy", name: "Rowan (Uneasy Mood)" });
      }
      if (!data.some(u => u.id === "user_oliver_good")) {
        data.push({ id: "user_oliver_good", name: "Oliver (Good Mood)" });
      }
      if (!data.some(u => u.id === "user_sunny_happy")) {
        data.push({ id: "user_sunny_happy", name: "Sunny (Happy Mood)" });
      }
      if (!data.some(u => u.id === "user_blaze_veryhappy")) {
        data.push({ id: "user_blaze_veryhappy", name: "Blaze (Very Happy Mood)" });
      }
      if (!data.some(u => u.id === "user_spark_euphoric")) {
        data.push({ id: "user_spark_euphoric", name: "Spark (Euphoric Mood)" });
      }
      localStorage.setItem(USERS_KEY, JSON.stringify(data));
      return data;
    }
  } catch (e) {}
  localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
  return DEFAULT_USERS;
}

function getCurrentUserId() {
  let uid = localStorage.getItem(CURRENT_USER_KEY);
  const users = getUsers();
  if (!uid || !users.some(u => u.id === uid)) {
    uid = users[0].id;
    localStorage.setItem(CURRENT_USER_KEY, uid);
  }
  return uid;
}

function setCurrentUserId(uid) {
  localStorage.setItem(CURRENT_USER_KEY, uid);
}

function createNewUserSession(name) {
  const cleanName = (name || "").trim();
  if (!cleanName) return null;
  const users = getUsers();
  const id = "user_" + Date.now().toString(36) + Math.random().toString(36).substr(2, 4);
  const newUser = { id, name: cleanName };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  setCurrentUserId(id);
  return newUser;
}

// Keep the visible session selector aligned with the signed-in Supabase account.
function syncAuthenticatedUser(user) {
  const name = user.user_metadata?.username || user.email || "User";
  const authenticatedUser = { id: user.id, name };
  localStorage.setItem(USERS_KEY, JSON.stringify([authenticatedUser]));
  setCurrentUserId(user.id);
  return authenticatedUser;
}

function loadUserCheckins(userId) {
  if (userId === "user_elena_low") {
    const lowHistory = [
      {
        sessionId: "sess_low_1",
        userId: "user_elena_low",
        story: "Misty Shadow Valley Journal",
        genre: "Atmospheric Reflections",
        storyId: "002_misty_valley",
        setNumber: 1,
        questionRange: "Q1–Q6",
        mood: 10, energy: 15, stress: 88, sleep: 30,
        mix: { veryLow: 85, low: 15 },
        dominant: "Very Low",
        at: new Date(Date.now() - 2 * 86400000).toISOString(),
        answersDetailed: [
          { globalQ: 1, question: "Dense fog covers the mountain paths.", chosenOption: "Pause by the solitary cabin in the valley", mix: { veryLow: 8, low: 2 } },
          { globalQ: 2, question: "Cold wind echoes through the pass.", chosenOption: "Sit quietly and listen to the stillness", mix: { veryLow: 7, low: 3 } }
        ]
      },
      {
        sessionId: "sess_low_2",
        userId: "user_elena_low",
        story: "Misty Shadow Valley Journal",
        genre: "Atmospheric Reflections",
        storyId: "002_misty_valley",
        setNumber: 2,
        questionRange: "Q7–Q12",
        mood: 12, energy: 18, stress: 85, sleep: 35,
        mix: { veryLow: 80, low: 20 },
        dominant: "Very Low",
        at: new Date(Date.now() - 86400000).toISOString(),
        answersDetailed: [
          { globalQ: 7, question: "Faint light emerges over the dark ridges.", chosenOption: "Watch the mist swirl gently around the trees", mix: { veryLow: 8, low: 2 } },
          { globalQ: 8, question: "Navigating the silent slope.", chosenOption: "Take small slow steps forward", mix: { veryLow: 7, low: 3 } }
        ]
      }
    ];
    localStorage.setItem(`mindful.checkins.${userId}`, JSON.stringify(lowHistory));
    return lowHistory;
  }

  if (userId === "user_kai_low") {
    const kaiHistory = [
      {
        sessionId: "sess_kai_low_1",
        userId: "user_kai_low",
        story: "Twilight Amethyst Sanctuary",
        genre: "Gentle Reflections",
        storyId: "004_low_kai",
        setNumber: 1,
        questionRange: "Q1–Q6",
        mood: 32, energy: 35, stress: 68, sleep: 50,
        mix: { low: 80, uneasy: 20 },
        dominant: "Low",
        at: new Date(Date.now() - 86400000).toISOString(),
        answersDetailed: [
          { globalQ: 1, question: "Twilight settles softly over the quiet garden.", chosenOption: "Sit beneath the purple shadows and breathe slowly", mix: { low: 8, uneasy: 2 } },
          { globalQ: 2, question: "A light breeze rustles through dark plum leaves.", chosenOption: "Listen to the tranquil evening breeze", mix: { low: 8, uneasy: 2 } }
        ]
      }
    ];
    localStorage.setItem(`mindful.checkins.${userId}`, JSON.stringify(kaiHistory));
    return kaiHistory;
  }

  if (userId === "user_rowan_uneasy") {
    const uneasyHistory = [
      {
        sessionId: "sess_rowan_uneasy_1",
        userId: "user_rowan_uneasy",
        story: "Electric Violet Echoes",
        genre: "Intensive Reflections",
        storyId: "005_uneasy_rowan",
        setNumber: 1,
        questionRange: "Q1–Q6",
        mood: 42, energy: 45, stress: 75, sleep: 55,
        mix: { uneasy: 85, low: 15 },
        dominant: "Uneasy",
        at: new Date(Date.now() - 86400000).toISOString(),
        answersDetailed: [
          { globalQ: 1, question: "Uncertain pulses echo through the corridor.", chosenOption: "Observe the shifting neon currents carefully", mix: { uneasy: 8, low: 2 } },
          { globalQ: 2, question: "Static hums softly in the background.", chosenOption: "Focus on steady calm thoughts", mix: { uneasy: 8, low: 2 } }
        ]
      }
    ];
    localStorage.setItem(`mindful.checkins.${userId}`, JSON.stringify(uneasyHistory));
    return uneasyHistory;
  }

  if (userId === "user_oliver_good") {
    const goodHistory = [
      {
        sessionId: "sess_oliver_good_1",
        userId: "user_oliver_good",
        story: "Mint Emerald Meadow Sanctuary",
        genre: "Nature & Renewal",
        storyId: "006_good_oliver",
        setNumber: 1,
        questionRange: "Q1–Q6",
        mood: 68, energy: 72, stress: 25, sleep: 80,
        mix: { good: 85, happy: 15 },
        dominant: "Good",
        at: new Date(Date.now() - 86400000).toISOString(),
        answersDetailed: [
          { globalQ: 1, question: "Morning sunlight illuminates the dew on fresh leaves.", chosenOption: "Walk along the lush green forest path with a light heart", mix: { good: 8, happy: 2 } },
          { globalQ: 2, question: "Clear stream water flows past smooth stones.", chosenOption: "Breathe in the crisp invigorating air", mix: { good: 8, happy: 2 } }
        ]
      }
    ];
    localStorage.setItem(`mindful.checkins.${userId}`, JSON.stringify(goodHistory));
    return goodHistory;
  }

  if (userId === "user_sunny_happy") {
    const happyHistory = [
      {
        sessionId: "sess_sunny_happy_1",
        userId: "user_sunny_happy",
        story: "Golden Sunshine Horizon",
        genre: "Radiant Joy & Celebration",
        storyId: "007_happy_sunny",
        setNumber: 1,
        questionRange: "Q1–Q6",
        mood: 82, energy: 85, stress: 15, sleep: 88,
        mix: { happy: 85, good: 15 },
        dominant: "Happy",
        at: new Date(Date.now() - 86400000).toISOString(),
        answersDetailed: [
          { globalQ: 1, question: "Warm golden rays illuminate the expansive horizon.", chosenOption: "Celebrate with bright enthusiasm and gratitude", mix: { happy: 8, good: 2 } },
          { globalQ: 2, question: "Lively cheerful music fills the warm air.", chosenOption: "Share smiles and laughter with everyone around", mix: { happy: 8, good: 2 } }
        ]
      }
    ];
    localStorage.setItem(`mindful.checkins.${userId}`, JSON.stringify(happyHistory));
    return happyHistory;
  }

  if (userId === "user_blaze_veryhappy") {
    const veryHappyHistory = [
      {
        sessionId: "sess_veryhappy_1",
        userId: "user_blaze_veryhappy",
        story: "Golden Horizon Celebration",
        genre: "Exuberant Energy & Fulfillment",
        storyId: "008_veryhappy_blaze",
        setNumber: 1,
        questionRange: "Q1–Q6",
        mood: 92, energy: 90, stress: 10, sleep: 90,
        mix: { veryHappy: 85, euphoric: 15 },
        dominant: "Very Happy",
        at: new Date(Date.now() - 86400000).toISOString(),
        answersDetailed: [
          { globalQ: 1, question: "A magnificent sunset lights up the golden peak.", chosenOption: "Celebrate with bright enthusiasm and gratitude", mix: { veryHappy: 8, euphoric: 2 } },
          { globalQ: 2, question: "Vibrant energy fills the air.", chosenOption: "Share warm joy and positivity with everyone", mix: { veryHappy: 8, euphoric: 2 } }
        ]
      }
    ];
    localStorage.setItem(`mindful.checkins.${userId}`, JSON.stringify(veryHappyHistory));
    return veryHappyHistory;
  }

  if (userId === "user_spark_euphoric") {
    const euphoricHistory = [
      {
        sessionId: "sess_euphoric_1",
        userId: "user_spark_euphoric",
        story: "Cosmic Horizons & Starlight Revelry",
        genre: "Sci-Fi & Cosmic Wonder",
        storyId: "003_euphoric_spark",
        setNumber: 1,
        questionRange: "Q1–Q6",
        mood: 98, energy: 95, stress: 10, sleep: 92,
        mix: { euphoric: 88, happy: 12 },
        dominant: "Euphoric",
        at: new Date(Date.now() - 86400000).toISOString(),
        answersDetailed: [
          { globalQ: 1, question: "The starlight glows intensely across the nebula.", chosenOption: "Soar through the luminous stellar stream with boundless energy", mix: { euphoric: 9, happy: 1 } },
          { globalQ: 2, question: "Pure vibrant rhythm resonates through the spacecraft.", chosenOption: "Dance to the pulse of cosmic energy", mix: { euphoric: 9, happy: 1 } }
        ]
      }
    ];
    localStorage.setItem(`mindful.checkins.${userId}`, JSON.stringify(euphoricHistory));
    return euphoricHistory;
  }

  const key = `mindful.checkins.${userId}`;
  try {
    const data = JSON.parse(localStorage.getItem(key));
    if (Array.isArray(data) && data.length > 0) return data;
  } catch {}

  // Generate initial default sessions for demonstration if empty
  const mockHistory = [
    {
      sessionId: "sess_demo_1",
      userId,
      story: "Sherlock Holmes",
      genre: "Detective & Mystery",
      storyId: "001_sherlock_holmes",
      setNumber: 1,
      questionRange: "Q1–Q6",
      mood: 62, energy: 60, stress: 58, sleep: 44,
      mix: { neutral: 30, uneasy: 20, good: 30, happy: 20 },
      dominant: "Neutral",
      at: new Date(Date.now() - 3 * 86400000).toISOString(),
      answersDetailed: [
        { globalQ: 1, question: "How do you approach the locked study door?", chosenOption: "Examine the handle for recent marks", mix: { neutral: 5, good: 5 } },
        { globalQ: 2, question: "A clue emerges under the rug.", chosenOption: "Catalog the dust particles methodically", mix: { uneasy: 4, neutral: 6 } }
      ]
    },
    {
      sessionId: "sess_demo_2",
      userId,
      story: "Sherlock Holmes",
      genre: "Detective & Mystery",
      storyId: "001_sherlock_holmes",
      setNumber: 2,
      questionRange: "Q7–Q12",
      mood: 74, energy: 70, stress: 42, sleep: 48,
      mix: { neutral: 20, good: 40, happy: 30, euphoric: 10 },
      dominant: "Good",
      at: new Date(Date.now() - 86400000).toISOString(),
      answersDetailed: [
        { globalQ: 7, question: "The suspect flees into the fog.", chosenOption: "Signal Watson and cut through the alley", mix: { happy: 6, good: 4 } },
        { globalQ: 8, question: "Deciphering the coded message.", chosenOption: "Apply chemical solution to reveal hidden text", mix: { good: 5, euphoric: 5 } }
      ]
    }
  ];

  localStorage.setItem(key, JSON.stringify(mockHistory));
  return mockHistory;
}

//  Convert Supabase rows into the dashboard's existing chart shape.
function normalizeRemoteCheckin(row) {
  const result = row.results || {};
  return {
    ...result,
    sessionId: row.id || result.sessionId,
    userId: row.user_id,
    genre: row.genre || result.genre,
    story: row.story || result.story,
    at: row.submitted_at || result.at
  };
}

//  Derive story progress from the same persisted check-ins used by the charts.
function progressFromRemoteCheckins(checkins) {
  return checkins.reduce((progress, checkin) => {
    if (checkin.storyId) {
      progress[checkin.storyId] = Math.max(progress[checkin.storyId] || 0, checkin.setNumber || 0);
    }
    return progress;
  }, {});
}

// Use authenticated Supabase history as the source of truth.
async function loadAuthenticatedCheckins() {
  const user = await WellnessAuth.getUser();
  if (!user) {
    location.replace("login.html");
    return { user: null, checkins: [] };
  }
  const rows = await WellnessAuth.loadCheckins();
  return { user, checkins: rows.map(normalizeRemoteCheckin) };
}

function loadUserProgress(userId) {
  try {
    return JSON.parse(localStorage.getItem(`mindful.storyProgress.${userId}`)) || { "001_sherlock_holmes": 2 };
  } catch {
    return { "001_sherlock_holmes": 2 };
  }
}

/* ---------- Dashboard State ---------- */
let activeCheckins = [];
let activeUser = null;
let selectedSessionId = null;

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

function updateRingsAndBars(latest, previous) {
  if (!latest) return;
  const moodValue = $("#moodValue");
  const stressValue = $("#stressValue");
  const sleepValue = $("#sleepValue");
  if (moodValue) moodValue.dataset.count = latest.mood;
  if (stressValue) stressValue.dataset.count = latest.stress;
  if (sleepValue) sleepValue.dataset.count = latest.sleep;

  const moodDelta = $("#moodDelta");
  if (moodDelta) {
    const change = previous ? latest.mood - previous.mood : 0;
    moodDelta.textContent = previous
      ? `${change >= 0 ? "▲" : "▼"} ${Math.abs(change)}% from last session`
      : "First recorded session";
    moodDelta.classList.toggle("up", change >= 0);
    moodDelta.classList.toggle("down", change < 0);
  }

  const stressDelta = $("#stressDelta");
  if (stressDelta) {
    const change = previous ? previous.stress - latest.stress : 0;
    stressDelta.textContent = previous
      ? `${change >= 0 ? "▼" : "▲"} ${Math.abs(change)}% ${change >= 0 ? "calmer" : "more stressed"}`
      : "First recorded session";
    stressDelta.classList.toggle("down", change >= 0);
    stressDelta.classList.toggle("up", change < 0);
  }

  document.querySelectorAll("[data-count]").forEach(animateNumber);
  const C = 2 * Math.PI * 34;
  const sleepPct = Math.min((latest.sleep / 60) * 100, 100);
  const ringValues = { moodScore: latest.mood, sleep: sleepPct };
  const ringLevels = { moodScore: levelFor(latest.mood), sleep: levelFor(sleepPct) };

  document.querySelectorAll(".ring").forEach(r => {
    const pct = ringValues[r.dataset.ring] || 0;
    const lv = ringLevels[r.dataset.ring];
    const fg = r.querySelector(".ring-fg");
    if (!fg) return;
    if (lv) {
      fg.style.stroke = lv.color;
      fg.style.filter = `drop-shadow(0 0 8px ${lv.color}88)`;
      const tag = r.parentElement ? r.parentElement.querySelector(".tag") : null;
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

  const stressLv = levelForInverse(latest.stress);
  const stressFill = $(".fill.coral");
  if (stressFill) {
    stressFill.dataset.width = latest.stress;
    stressFill.style.background = `linear-gradient(90deg, ${stressLv.color}, ${stressLv.color}aa)`;
    stressFill.style.boxShadow = `0 0 14px ${stressLv.color}80`;
    const statBody = stressFill.closest(".stat-body");
    const stressTag = statBody ? statBody.querySelector(".tag") : null;
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

function drawWeeklyWave(checkins) {
  const chartEl = $("#chart");
  if (!chartEl || !checkins || checkins.length === 0) return;
  const recent = checkins.slice(-7);
  const scores = recent.map(c => c.mood);
  const peak = scores.indexOf(Math.max(...scores));

  chartEl.innerHTML = recent.map((c, i) => {
    const lv = levelFor(c.mood);
    const d = new Date(c.at);
    const dayName = DAYS[d.getDay() === 0 ? 6 : d.getDay() - 1] || "S" + (i + 1);

    return `
      <div class="wbar${i === peak ? " peak" : ""}" style="--c:${lv.color}">
        <span class="wval">${c.mood}%</span>
        <div class="wtrack"><i class="wfill" data-h="${c.mood}"></i></div>
        <span class="wday">${dayName}</span>
        <span class="wface" aria-hidden="true">${lv.face}</span>
        <span class="wlabel">${c.story ? c.story.substring(0, 10) : lv.label}</span>
      </div>`;
  }).join("");

  requestAnimationFrame(() => {
    chartEl.querySelectorAll(".wfill").forEach((f, i) => {
      setTimeout(() => { f.style.height = f.dataset.h + "%"; }, i * 80);
    });
  });
}

function drawMix(mixObj) {
  const mixContainer = $("#mix");
  const mixLegend = $("#mixLegend");
  const mix = mixObj || {};

  if (mixContainer) {
    mixContainer.innerHTML = MOOD_LEVELS
      .map(m => `<i style="--c:${m.color}" data-w="${mix[m.key] || 0}" title="${m.level} · ${m.label}: ${mix[m.key] || 0}%"></i>`).join("");

    requestAnimationFrame(() => {
      mixContainer.querySelectorAll("i").forEach(i => { i.style.width = i.dataset.w + "%"; });
    });
  }

  if (mixLegend) {
    mixLegend.innerHTML = MOOD_LEVELS
      .map(m => `<li><span class="dot glow" style="--c:${m.color};background:${m.color}"></span>${m.level} · ${m.label} <strong>${mix[m.key] || 0}%</strong></li>`).join("");
  }
}

/* ---------- SESSION-WISE ANALYSIS LINE GRAPH VISUALIZER ---------- */
let activeGraphMetrics = { mood: true, stress: true, sleep: false };

function initSessionVisualizer(checkins) {
  const select = $("#sessionSelect");
  if (!select) return;

  if (!checkins || checkins.length === 0) {
    select.innerHTML = `<option value="">No sessions recorded yet</option>`;
    $("#sessionWaveChart").innerHTML = `<p class="muted pad" style="padding:24px;text-align:center;">Complete a story check-in to unlock your session line graph visualizer.</p>`;
    $("#sessionDetailContainer").innerHTML = "";
    return;
  }

  // Populate dropdown (Session #1, Session #2 ... Session #N)
  select.innerHTML = checkins.slice().reverse().map((s, idx) => {
    const sessionIndex = checkins.length - idx; // 1-based nth session
    const d = new Date(s.at);
    const dateStr = d.toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
    const label = `Session #${sessionIndex}: ${s.story || "Check-in"} (${s.questionRange || `Set ${s.setNumber || 1}`}) — ${dateStr}`;
    return `<option value="${s.sessionId || idx}">${label}</option>`;
  }).join("");

  // Default select latest session if not selected
  if (!selectedSessionId || !checkins.some(c => c.sessionId === selectedSessionId || c.sessionId == selectedSessionId)) {
    selectedSessionId = checkins[checkins.length - 1].sessionId || (checkins.length - 1);
  }
  select.value = selectedSessionId;

  select.onchange = (e) => {
    selectedSessionId = e.target.value;
    renderSelectedSessionAnalysis(checkins);
    drawSessionLineGraph(checkins);
  };

  drawSessionLineGraph(checkins);
  renderSelectedSessionAnalysis(checkins);
}

function drawSessionLineGraph(checkins) {
  const container = $("#sessionWaveChart");
  if (!container) return;

  const total = checkins.length;
  if (total === 0) return;

  // Dimensions
  const svgW = Math.max(650, total * 110);
  const svgH = 220;
  const padL = 45;
  const padR = 35;
  const padT = 25;
  const padB = 45;
  const graphW = svgW - padL - padR;
  const graphH = svgH - padT - padB;

  // Calculate coordinates for each session node (nth time user answered a question set)
  const points = checkins.map((s, i) => {
    const x = total === 1 ? padL + graphW / 2 : padL + (i / (total - 1)) * graphW;
    const yMood = (padT + graphH) - (s.mood / 100) * graphH;
    const yStress = (padT + graphH) - (s.stress / 100) * graphH;
    const sleepPct = Math.min(100, (s.sleep / 60) * 100);
    const ySleep = (padT + graphH) - (sleepPct / 100) * graphH;
    const isSelected = (s.sessionId && s.sessionId === selectedSessionId) || (selectedSessionId == i);

    return {
      index: i + 1, // Session #
      session: s,
      x, yMood, yStress, ySleep,
      isSelected
    };
  });

  // Helper to generate SVG path string
  function buildPath(ptArray, key) {
    if (ptArray.length === 0) return "";
    if (ptArray.length === 1) return `M ${ptArray[0].x} ${ptArray[0][key]} L ${ptArray[0].x} ${ptArray[0][key]}`;

    let path = `M ${ptArray[0].x} ${ptArray[0][key]}`;
    for (let i = 0; i < ptArray.length - 1; i++) {
      const p0 = ptArray[i];
      const p1 = ptArray[i + 1];
      const cx = (p0.x + p1.x) / 2;
      path += ` C ${cx} ${p0[key]}, ${cx} ${p1[key]}, ${p1.x} ${p1[key]}`;
    }
    return path;
  }

  function buildAreaPath(ptArray, key) {
    if (ptArray.length < 2) return "";
    const linePath = buildPath(ptArray, key);
    const firstX = ptArray[0].x;
    const lastX = ptArray[ptArray.length - 1].x;
    const bottomY = padT + graphH;
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }

  const moodPath = buildPath(points, "yMood");
  const moodArea = buildAreaPath(points, "yMood");
  const stressPath = buildPath(points, "yStress");
  const stressArea = buildAreaPath(points, "yStress");
  const sleepPath = buildPath(points, "ySleep");

  container.innerHTML = `
    <div class="line-graph-legend-bar">
      <div class="legend-toggle ${activeGraphMetrics.mood ? 'active' : ''}" data-metric="mood">
        <span class="dot-line teal"></span> <strong>Mood Score (%)</strong>
      </div>
      <div class="legend-toggle ${activeGraphMetrics.stress ? 'active' : ''}" data-metric="stress">
        <span class="dot-line coral"></span> <strong>Stress Level (%)</strong>
      </div>
      <div class="legend-toggle ${activeGraphMetrics.sleep ? 'active' : ''}" data-metric="sleep">
        <span class="dot-line gold"></span> <strong>Sleep Rest (%)</strong>
      </div>
      <span class="sess-count-badge">Total User Sessions: ${total}</span>
    </div>

    <div class="svg-graph-wrapper">
      <svg class="session-line-svg" viewBox="0 0 ${svgW} ${svgH}" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#42D39A" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#42D39A" stop-opacity="0.0"/>
          </linearGradient>
          <linearGradient id="stressGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FF7A45" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="#FF7A45" stop-opacity="0.0"/>
          </linearGradient>
          <filter id="glowTeal" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#42D39A" flood-opacity="0.6"/>
          </filter>
          <filter id="glowCoral" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#FF7A45" flood-opacity="0.6"/>
          </filter>
        </defs>

        <!-- Horizontal Grid Lines -->
        ${[0, 25, 50, 75, 100].map(pct => {
          const y = (padT + graphH) - (pct / 100) * graphH;
          return `
            <line x1="${padL}" y1="${y}" x2="${svgW - padR}" y2="${y}" class="grid-line" />
            <text x="${padL - 8}" y="${y + 4}" class="grid-label" text-anchor="end">${pct}%</text>
          `;
        }).join("")}

        <!-- Vertical Session Grid Lines & X-axis Labels -->
        ${points.map(pt => `
          <line x1="${pt.x}" y1="${padT}" x2="${pt.x}" y2="${padT + graphH}" class="grid-line-v ${pt.isSelected ? 'selected-grid-v' : ''}" />
          <text x="${pt.x}" y="${padT + graphH + 20}" class="x-axis-label ${pt.isSelected ? 'active-x-label' : ''}" text-anchor="middle">Sess #${pt.index}</text>
        `).join("")}

        <!-- Gradient Area Fills -->
        ${activeGraphMetrics.mood && moodArea ? `<path d="${moodArea}" fill="url(#moodGradient)" />` : ""}
        ${activeGraphMetrics.stress && stressArea ? `<path d="${stressArea}" fill="url(#stressGradient)" />` : ""}

        <!-- Lines -->
        ${activeGraphMetrics.sleep ? `<path d="${sleepPath}" fill="none" stroke="#FFD447" stroke-width="2.5" stroke-dasharray="5 4" opacity="0.85"/>` : ""}
        ${activeGraphMetrics.stress ? `<path d="${stressPath}" fill="none" stroke="#FF7A45" stroke-width="3" filter="url(#glowCoral)" stroke-linecap="round"/>` : ""}
        ${activeGraphMetrics.mood ? `<path d="${moodPath}" fill="none" stroke="#42D39A" stroke-width="3.5" filter="url(#glowTeal)" stroke-linecap="round"/>` : ""}

        <!-- Interactive Session Nodes (Points) -->
        ${points.map(pt => {
          const s = pt.session;
          const mLv = levelFor(s.mood);
          return `
            <g class="graph-node-group ${pt.isSelected ? 'selected-node' : ''}" data-sess-id="${s.sessionId || (pt.index - 1)}">
              <!-- Active Glow Circle -->
              ${pt.isSelected ? `
                <circle cx="${pt.x}" cy="${pt.yMood}" r="14" fill="#42D39A" opacity="0.25" class="pulse-halo"/>
                <circle cx="${pt.x}" cy="${pt.yMood}" r="9" fill="none" stroke="#42D39A" stroke-width="2"/>
              ` : ""}

              <!-- Stress Point -->
              ${activeGraphMetrics.stress ? `
                <circle cx="${pt.x}" cy="${pt.yStress}" r="4.5" fill="#FF7A45" stroke="#fff" stroke-width="1.5" class="node-dot-stress"/>
              ` : ""}

              <!-- Mood Point -->
              ${activeGraphMetrics.mood ? `
                <circle cx="${pt.x}" cy="${pt.yMood}" r="${pt.isSelected ? 7 : 5.5}" fill="#42D39A" stroke="#fff" stroke-width="2" class="node-dot-mood"/>
              ` : ""}

              <!-- Invisible Hover Trigger -->
              <circle cx="${pt.x}" cy="${(pt.yMood + pt.yStress) / 2}" r="24" fill="transparent" class="node-hover-trigger">
                <title>Session #${pt.index}: ${s.story || "Check-in"} (${s.questionRange || "Set " + (s.setNumber || 1)})&#10;Mood: ${s.mood}% | Stress: ${s.stress}% | Sleep: ${s.sleep} min</title>
              </circle>
            </g>
          `;
        }).join("")}
      </svg>
    </div>

    <!-- Session Quick Pill Selector Bar -->
    <div class="session-pills-bar">
      ${checkins.map((s, i) => {
        const isSel = (s.sessionId && s.sessionId === selectedSessionId) || (selectedSessionId == i);
        return `
          <button type="button" class="sess-pill-btn ${isSel ? 'active' : ''}" data-sess-id="${s.sessionId || i}">
            <span class="p-num">Sess #${i + 1}</span>
            <span class="p-title">${s.story || "Check-in"}</span>
            <span class="p-score">${s.mood}%</span>
          </button>
        `;
      }).join("")}
    </div>
  `;

  // Attach event handlers
  container.querySelectorAll(".graph-node-group, .sess-pill-btn").forEach(el => {
    el.onclick = (e) => {
      const sessId = el.dataset.sessId;
      if (sessId !== undefined) {
        selectedSessionId = sessId;
        $("#sessionSelect").value = sessId;
        renderSelectedSessionAnalysis(checkins);
        drawSessionLineGraph(checkins);
      }
    };
  });

  container.querySelectorAll(".legend-toggle").forEach(el => {
    el.onclick = () => {
      const metric = el.dataset.metric;
      activeGraphMetrics[metric] = !activeGraphMetrics[metric];
      drawSessionLineGraph(checkins);
    };
  });
}

function renderSelectedSessionAnalysis(checkins) {
  const container = $("#sessionDetailContainer");
  if (!container) return;

  const session = checkins.find(c => (c.sessionId && c.sessionId === selectedSessionId) || c.sessionId == selectedSessionId)
    || checkins[+selectedSessionId]
    || checkins[checkins.length - 1];

  if (!session) return;

  // Dynamically transform whole app theme to match selected session's dominant mood mix
  applyDynamicMoodTheme(session.mix, session.mood);

  const d = new Date(session.at);
  const formattedDate = d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  const mLv = levelFor(session.mood);
  const mix = session.mix || {};

  container.innerHTML = `
    <div class="session-detail-card reveal">
      <div class="sess-detail-header">
        <div>
          <span class="eyebrow">${session.genre || "Story Check-in"}</span>
          <h2>${session.story || "Story Check-in"} — ${session.setNumber ? `Set ${session.setNumber}` : "Set 1"} (${session.questionRange || "Q1–Q6"})</h2>
          <p class="muted small">Completed on ${formattedDate} by ${activeUser ? activeUser.name : "User"}</p>
        </div>
        <div class="sess-score-badge" style="background:${mLv.color}18; border:1px solid ${mLv.color}40; color:${mLv.color}">
          <span class="big-score">${session.mood}%</span>
          <span class="score-lbl">${mLv.label} Mood</span>
        </div>
      </div>

      <div class="sess-metrics-row">
        <div class="metric-box">
          <span class="m-title">Stress Level</span>
          <strong class="m-value">${session.stress}%</strong>
          <span class="muted small">${session.stress > 60 ? 'Elevated tension' : 'Balanced calm'}</span>
        </div>
        <div class="metric-box">
          <span class="m-title">Sleep Rest Balance</span>
          <strong class="m-value">${session.sleep} min</strong>
          <span class="muted small">Deep rest equivalent</span>
        </div>
        <div class="metric-box">
          <span class="m-title">Dominant Emotion</span>
          <strong class="m-value">${session.dominant || mLv.label}</strong>
          <span class="muted small">Primary state vector</span>
        </div>
      </div>

      <!-- Session 8-State Mix Breakdown -->
      <div class="sess-mix-box">
        <h4>Session Mood Vector Spectrum</h4>
        <div class="mix" style="margin:10px 0">
          ${MOOD_LEVELS.map(m => `<i style="--c:${m.color};width:${mix[m.key] || 0}%" title="${m.label}: ${mix[m.key] || 0}%"></i>`).join("")}
        </div>
        <ul class="legend">
          ${MOOD_LEVELS.map(m => `<li><span class="dot glow" style="--c:${m.color};background:${m.color}"></span>${m.label} <strong>${mix[m.key] || 0}%</strong></li>`).join("")}
        </ul>
      </div>

      <!-- Question & Choice Log -->
      ${session.answersDetailed && session.answersDetailed.length > 0 ? `
      <div class="sess-q-log">
        <h4>Session Question & Choice Log (${session.questionRange || "Questions"})</h4>
        <ul class="q-log-list">
          ${session.answersDetailed.map(a => `
            <li>
              <span class="q-num-pill">Q${a.globalQ}</span>
              <div class="q-log-body">
                <strong>${a.question}</strong>
                <p class="chosen-answer">Selected: <em>"${a.chosenOption}"</em></p>
              </div>
            </li>
          `).join("")}
        </ul>
      </div>
      ` : ''}
    </div>
  `;
}

/* ---------- Reports & Recommendations ---------- */
function drawReports(checkins) {
  $("#reportList").innerHTML = checkins.slice().reverse().slice(0, 6).map((r, i) => {
    const mLv = levelFor(r.mood);
    const d = new Date(r.at);
    const dateStr = d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    return `
    <li>
      <button type="button" data-i="${i}" aria-label="${r.story}, ${dateStr}">
        <span class="ico" aria-hidden="true">${mLv.face}</span>
        <span>
          <span class="rtitle">${r.story || "Story Check-in"} ${r.setNumber ? `(Set ${r.setNumber})` : ""}</span><br>
          <span class="meta">${dateStr} · ${r.questionRange || "Q1–Q6"}</span>
        </span>
        <span class="status" style="background:${mLv.color}20;color:${mLv.color}">${mLv.label} ${r.mood}%</span>
        <span class="chev" aria-hidden="true">›</span>
      </button>
    </li>`;
  }).join("");

  $("#reportList").onclick = e => {
    const btn = e.target.closest("button[data-i]");
    if (!btn) return;
    const r = checkins.slice().reverse()[+btn.dataset.i];
    openModal(
      `${r.story || "Check-in"} ${r.setNumber ? `— Set ${r.setNumber}` : ""}`,
      `${new Date(r.at).toLocaleDateString()} · ${r.questionRange || "Q1–6"}`,
      `Detected mood: ${r.dominant || levelFor(r.mood).label}. Mood Score ${r.mood}%, Stress Level ${r.stress}%, Sleep Rest ${r.sleep} min.`
    );
  };
}

function drawPaths() {
  const pathsContainer = $("#paths");
  if (!pathsContainer) return;

  const recommendations = [
    { id: "rec_1", icon: "🧘", title: "Meditation & Focus", desc: "5 min · Calm nervous system", progress: 75 },
    { id: "rec_2", icon: "✍️", title: "Journaling Reflection", desc: "10 min · Express mood story", progress: 45 },
    { id: "rec_3", icon: "✨", title: "Mindful Reset", desc: "5 min · Understand current state", progress: 85 },
    { id: "rec_4", icon: "🌬", title: "Deep Breath Wave", desc: "3 min · Quick stress release", progress: 30 }
  ];

  pathsContainer.innerHTML = recommendations.map(p => {
    const lv = levelFor(p.progress);
    return `
    <li>
      <button type="button" class="p-open" data-title="${p.title}" data-desc="${p.desc}">
        <div class="p-ico" aria-hidden="true">${p.icon}</div>
        <h3>${p.title}</h3>
        <p class="muted small">${p.desc}</p>
        <div class="bar"><i class="fill" style="background:${lv.color};box-shadow:0 0 10px ${lv.color}80" data-width="${p.progress}"></i></div>
        <span class="small muted">${p.progress}% completed</span>
      </button>
    </li>`;
  }).join("");

  pathsContainer.onclick = e => {
    const btn = e.target.closest("button[data-title]");
    if (!btn) return;
    openModal(btn.dataset.title, "Personalized Recommendation", btn.dataset.desc + "\n\nFollow this guided activity to align your energy and lower stress after your story check-in.");
  };
}

/* ---------- Shared Modal & Header Init ---------- */
function openModal(title, meta, body) {
  const modalTitle = $("#modalTitle");
  const modalMeta = $("#modalMeta");
  const modalBody = $("#modalBody");
  const modal = $("#modal");
  const modalClose = $("#modalClose");

  if (modalTitle) modalTitle.textContent = title;
  if (modalMeta) modalMeta.textContent = meta;
  if (modalBody) modalBody.textContent = body;
  if (modal) modal.hidden = false;
  if (modalClose) modalClose.focus();
}

function buildInsight(latest, history) {
  const parts = [];
  parts.push(latest.mood >= 70 ? "Your latest check-in reads bright and motivated."
    : latest.mood >= 45 ? "Your latest check-in reads steady, with room to lift."
    : "Your latest check-in reads low — be gentle with yourself today.");
  if (latest.stress >= 65) parts.push("Stress is running high, so a short breathing reset is the highest-value action right now.");
  else if (latest.stress <= 35) parts.push("Stress is comfortably low — a good moment to build momentum on something you care about.");
  if (history && history.length > 1) {
    const prev = history[history.length - 2];
    const d = latest.mood - prev.mood;
    parts.push(d > 3 ? `Mood is up ${d} points since your previous check-in.`
      : d < -3 ? `Mood is down ${Math.abs(d)} points since your previous check-in.`
      : "Mood is holding close to your previous check-in.");
  }
  return parts.join(" ");
}

function initModal() {
  const modal = $("#modal");
  const modalClose = $("#modalClose");
  if (modalClose) modalClose.onclick = () => { if (modal) modal.hidden = true; };
  if (modal) modal.onclick = e => { if (e.target === modal) modal.hidden = true; };
  document.addEventListener("keydown", e => { if (e.key === "Escape" && modal) modal.hidden = true; });
}

function initDashboardUserSessionUI() {
  const users = getUsers();
  const uid = getCurrentUserId();
  activeUser = users.find(u => u.id === uid) || users[0];

  const select = $("#userSelectDashboard");
  if (select) {
    select.innerHTML = users.map(u => 
      `<option value="${u.id}" ${u.id === uid ? "selected" : ""}>👤 ${u.name}</option>`
    ).join("");

    select.onchange = (e) => {
      setCurrentUserId(e.target.value);
      loadDashboard();
    };
  }

  const veryLowBtn = $("#loadVeryLowUserBtn");
  if (veryLowBtn) {
    veryLowBtn.onclick = () => {
      let uList = getUsers();
      let elena = uList.find(u => u.id === "user_elena_low");
      if (!elena) {
        elena = { id: "user_elena_low", name: "Elena (Very Low Mood)" };
        uList.push(elena);
        localStorage.setItem(USERS_KEY, JSON.stringify(uList));
      }
      setCurrentUserId("user_elena_low");
      loadDashboard();
    };
  }

  const lowBtn = $("#loadLowUserBtn");
  if (lowBtn) {
    lowBtn.onclick = () => {
      let uList = getUsers();
      let kai = uList.find(u => u.id === "user_kai_low");
      if (!kai) {
        kai = { id: "user_kai_low", name: "Kai (Low Mood)" };
        uList.push(kai);
        localStorage.setItem(USERS_KEY, JSON.stringify(uList));
      }
      setCurrentUserId("user_kai_low");
      loadDashboard();
    };
  }

  const uneasyBtn = $("#loadUneasyUserBtn");
  if (uneasyBtn) {
    uneasyBtn.onclick = () => {
      let uList = getUsers();
      let rowan = uList.find(u => u.id === "user_rowan_uneasy");
      if (!rowan) {
        rowan = { id: "user_rowan_uneasy", name: "Rowan (Uneasy Mood)" };
        uList.push(rowan);
        localStorage.setItem(USERS_KEY, JSON.stringify(uList));
      }
      setCurrentUserId("user_rowan_uneasy");
      loadDashboard();
    };
  }

  const goodBtn = $("#loadGoodUserBtn");
  if (goodBtn) {
    goodBtn.onclick = () => {
      let uList = getUsers();
      let oliver = uList.find(u => u.id === "user_oliver_good");
      if (!oliver) {
        oliver = { id: "user_oliver_good", name: "Oliver (Good Mood)" };
        uList.push(oliver);
        localStorage.setItem(USERS_KEY, JSON.stringify(uList));
      }
      setCurrentUserId("user_oliver_good");
      loadDashboard();
    };
  }

  const happyBtn = $("#loadHappyUserBtn");
  if (happyBtn) {
    happyBtn.onclick = () => {
      let uList = getUsers();
      let sunny = uList.find(u => u.id === "user_sunny_happy");
      if (!sunny) {
        sunny = { id: "user_sunny_happy", name: "Sunny (Happy Mood)" };
        uList.push(sunny);
        localStorage.setItem(USERS_KEY, JSON.stringify(uList));
      }
      setCurrentUserId("user_sunny_happy");
      loadDashboard();
    };
  }

  const veryHappyBtn = $("#loadVeryHappyUserBtn");
  if (veryHappyBtn) {
    veryHappyBtn.onclick = () => {
      let uList = getUsers();
      let blaze = uList.find(u => u.id === "user_blaze_veryhappy");
      if (!blaze) {
        blaze = { id: "user_blaze_veryhappy", name: "Blaze (Very Happy Mood)" };
        uList.push(blaze);
        localStorage.setItem(USERS_KEY, JSON.stringify(uList));
      }
      setCurrentUserId("user_blaze_veryhappy");
      loadDashboard();
    };
  }

  const euphoricBtn = $("#loadEuphoricUserBtn");
  if (euphoricBtn) {
    euphoricBtn.onclick = () => {
      let uList = getUsers();
      let spark = uList.find(u => u.id === "user_spark_euphoric");
      if (!spark) {
        spark = { id: "user_spark_euphoric", name: "Spark (Euphoric Mood)" };
        uList.push(spark);
        localStorage.setItem(USERS_KEY, JSON.stringify(uList));
      }
      setCurrentUserId("user_spark_euphoric");
      loadDashboard();
    };
  }

  const newBtn = $("#newUserBtnDashboard");
  if (newBtn) {
    newBtn.onclick = () => {
      const input = $("#newUserNameInputDashboard");
      if (input) input.value = "";
      const modal = $("#newUserModalDashboard");
      if (modal) modal.hidden = false;
      if (input) input.focus();
    };
  }

  const cancelBtn = $("#cancelNewUserBtnDashboard");
  if (cancelBtn) {
    cancelBtn.onclick = () => {
      const modal = $("#newUserModalDashboard");
      if (modal) modal.hidden = true;
    };
  }

  const saveBtn = $("#saveNewUserBtnDashboard");
  if (saveBtn) {
    saveBtn.onclick = () => {
      const input = $("#newUserNameInputDashboard");
      const name = input ? input.value : "";
      const created = createNewUserSession(name);
      if (created) {
        const modal = $("#newUserModalDashboard");
        if (modal) modal.hidden = true;
        loadDashboard();
      }
    };
  }
}

async function loadDashboard() {
  let remote = { user: null, checkins: [] };
  try {
    const authUser = await WellnessAuth.getUser();
    if (authUser) {
      const rows = await WellnessAuth.loadCheckins();
      remote = { user: authUser, checkins: rows.map(normalizeRemoteCheckin) };
    }
  } catch (error) {
    console.error("Failed to load check-ins from Supabase:", error);
  }

  const users = getUsers();
  const uid = getCurrentUserId();
  activeUser = users.find(u => u.id === uid) || users[0];

  initDashboardUserSessionUI();

  if (remote.user && activeUser.id !== "user_elena_low" && !activeUser.id.startsWith("user_")) {
    activeUser = syncAuthenticatedUser(remote.user);
    activeCheckins = remote.checkins;
  } else {
    activeCheckins = loadUserCheckins(activeUser.id);
  }

  const userNameEl = $("#userName");
  if (userNameEl) userNameEl.textContent = activeUser.name;

  if (activeCheckins.length === 0) {
    const emptyState = $("#insightText");
    if (emptyState) emptyState.textContent = "Complete your first story check-in to start your personal wellness history.";
    drawPaths();
    initSessionVisualizer([]);
    return;
  }

  const prog = progressFromRemoteCheckins(activeCheckins);

  const latest = activeCheckins[activeCheckins.length - 1];
  if (!latest) return;

  // Transform whole app theme according to highest percentage mood in latest check-in's mood mix
  applyDynamicMoodTheme(latest.mix, latest.mood);

  // Sync rings & metrics
  updateRingsAndBars(latest, activeCheckins[activeCheckins.length - 2]);
  const streakEl = $("#streak");
  if (streakEl) streakEl.textContent = activeCheckins.length;

  // Insight
  const insightTextEl = $("#insightText");
  if (insightTextEl) {
    insightTextEl.textContent = latest.mood <= 25
      ? `Be extra gentle with yourself today, ${activeUser.name}. Your check-in recorded a Very Low mood (${latest.mood}%) — Misty Shadow Valley theme active.`
      : latest.mood >= 70
      ? `Great job ${activeUser.name}! Your latest story check-in recorded a bright, resilient mood.`
      : `Hello ${activeUser.name}, your latest check-in showed elevated stress. A quick reflection session is recommended today.`;
  }

  // Next story card
  const lastStoryId = latest.storyId || "001_sherlock_holmes";
  const completedSets = prog[lastStoryId] || 1;
  const nextSet = completedSets + 1;
  const nextQStart = (nextSet - 1) * 6 + 1;
  const nextQEnd = nextSet * 6;

  const nextTitleEl = $("#nextStoryTitle");
  if (nextTitleEl) nextTitleEl.textContent = `${latest.story || "Sherlock Holmes"}`;
  const nextSetEl = $("#nextStorySet");
  if (nextSetEl) nextSetEl.textContent = `Ready for Set ${nextSet} (Q${nextQStart}–${nextQEnd})`;

  // Charts & Visualizers
  drawWeeklyWave(activeCheckins);
  drawMix(latest.mix);
  initSessionVisualizer(activeCheckins);
  drawReports(activeCheckins);
  drawPaths();
}

/* ---------- Boot ---------- */
document.querySelectorAll(".reveal").forEach((el, i) => { el.style.animationDelay = `${i * 90}ms`; });

const menuBtn = $("#menuBtn"), nav = $("#nav");
if (menuBtn && nav) {
  menuBtn.onclick = () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  };
  nav.onclick = e => { if (e.target.tagName === "A") nav.classList.remove("open"); };
}

initModal();
//  Keep dashboard data loading asynchronous and tied to the auth session.
loadDashboard();

const signOutButton = $("#signOutButton");
if (signOutButton) {
  signOutButton.onclick = async () => {
    await WellnessAuth.signOut();
    location.replace("login.html");
  };
}
