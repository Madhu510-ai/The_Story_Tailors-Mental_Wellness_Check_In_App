/* Story-based emotional check-in with User Session & Story Set Progression support.
   - Supports individual user sessions (switching profiles / creating new user session).
   - Loads successive question sets (Set 1: Q1-6, Set 2: Q7-12, Set 3: Q13-18...) with respective questions and all 4 options intact from data/stories.json.
   - Persists 8-state mood scores, stress, and sleep metrics per user session. */

const MOOD_KEYS = ["veryLow", "low", "uneasy", "neutral", "good", "happy", "veryHappy", "euphoric"];
const MOOD_META = [
  { label: "Very Low", color: "#6ee7b7" },
  { label: "Low", color: "#49307A" },
  { label: "Uneasy", color: "#7B45D6" },
  { label: "Neutral", color: "#48B9E8" },
  { label: "Good", color: "#42D39A" },
  { label: "Happy", color: "#FFD447" },
  { label: "Very Happy", color: "#FF7A45" },
  { label: "Euphoric", color: "#FF3F8E" },
];
const LETTERS = ["A", "B", "C", "D"];
const $ = (s, r = document) => r.querySelector(s);
const clamp = (v, a = 0, b = 100) => Math.min(b, Math.max(a, v));

const MOOD_THEME_META = {
  veryLow: { key: "veryLow", label: "Very Low", name: "Misty Shadow Valley", icon: "🏔️" },
  low: { key: "low", label: "Low", name: "Twilight Plum", icon: "🌧️" },
  uneasy: { key: "uneasy", label: "Uneasy", name: "Electric Violet", icon: "🔮" },
  neutral: { key: "neutral", label: "Neutral", name: "Serene Sunset Zen", icon: "🪨" },
  good: { key: "good", label: "Good", name: "Mint Emerald", icon: "🌿" },
  happy: { key: "happy", label: "Happy", name: "Golden Sunshine", icon: "☀️" },
  veryHappy: { key: "veryHappy", label: "Very Happy", name: "Sunrise Coral", icon: "🔥" },
  euphoric: { key: "euphoric", label: "Euphoric", name: "Neon Magenta", icon: "✨" },
};

function getDominantMoodKey(mix, moodScore) {
  if (mix && typeof mix === "object") {
    let maxKey = null;
    let maxPct = 0;
    const moodKeys = [
      "veryLow",
      "low",
      "uneasy",
      "neutral",
      "good",
      "happy",
      "veryHappy",
      "euphoric",
    ];
    moodKeys.forEach((k) => {
      const val = Number(mix[k] || 0);
      if (val > maxPct) {
        maxPct = val;
        maxKey = k;
      }
    });
    if (maxKey && maxPct > 0) return maxKey;
  }

  if (typeof moodScore === "number" && !isNaN(moodScore)) {
    if (moodScore <= 20) return "veryLow";
    if (moodScore <= 35) return "low";
    if (moodScore <= 48) return "uneasy";
    if (moodScore <= 62) return "neutral";
    if (moodScore <= 75) return "good";
    if (moodScore <= 86) return "happy";
    if (moodScore <= 94) return "veryHappy";
    return "euphoric";
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

/* ---------- User Session Management ---------- */
const USERS_KEY = "mindful.users";
const CURRENT_USER_KEY = "mindful.currentUser";
const DEFAULT_USERS = [
  { id: "user_sara", name: "Sara" },
  { id: "user_alex", name: "Alex" },
];

function getUsers() {
  try {
    const data = JSON.parse(localStorage.getItem(USERS_KEY));
    if (Array.isArray(data) && data.length > 0) return data;
  } catch (e) {}
  localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
  return DEFAULT_USERS;
}

function getCurrentUserId() {
  let uid = localStorage.getItem(CURRENT_USER_KEY);
  const users = getUsers();
  if (!uid || !users.some((u) => u.id === uid)) {
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

//: Use the authenticated account as the active check-in session.
function syncAuthenticatedUser(user) {
  const name = user.user_metadata?.username || user.email || "User";
  const authenticatedUser = { id: user.id, name };
  localStorage.setItem(USERS_KEY, JSON.stringify([authenticatedUser]));
  setCurrentUserId(user.id);
  return authenticatedUser;
}

/* ---------- Story Progress Management ---------- */
function getProgressKey(userId) {
  return `mindful.storyProgress.${userId}`;
}

function getCheckinsKey(userId) {
  return `mindful.checkins.${userId}`;
}

function loadUserProgress(userId) {
  try {
    return JSON.parse(localStorage.getItem(getProgressKey(userId))) || {};
  } catch {
    return {};
  }
}

function saveUserProgress(userId, storyId, completedSetNum) {
  const prog = loadUserProgress(userId);
  prog[storyId] = Math.max(prog[storyId] || 0, completedSetNum);
  localStorage.setItem(getProgressKey(userId), JSON.stringify(prog));
}

function loadUserCheckins(userId) {
  try {
    return JSON.parse(localStorage.getItem(getCheckinsKey(userId))) || [];
  } catch {
    return [];
  }
}

/* ---------- State Variables ---------- */
let DATA = null;
let currentGenre = null;
let currentStory = null;
let currentSetNumber = 1;
let questions = [];
let answers = [];
let index = 0;
let flowItems = [];
let flowIndex = 0;
let flowMode = "genres";
let dragStartX = null;
let dragDeltaX = 0;
let wheelLock = false;

const GENRE_ART = [
  "expedition",
  "comic",
  "victory",
  "noir",
  "mystery",
  "drama",
  "magic",
  "history",
  "horror",
  "mind",
  "romance",
  "future",
];

const GENRE_COVERS = {
  adventure_exploratio: "assets/covers/adventure_exploratio.jpg",
  comics_graphic_world: "assets/covers/comics_graphic_world.jpg",
  competition_challeng: "assets/covers/competition_challeng.jpg",
  dark_romance: "assets/covers/dark_romance.jpg",
  detective_mystery: "assets/covers/detective_mystery.jpg",
  drama_real_life: "assets/covers/drama_real_life.jpg",
  fantasy_magic: "assets/covers/fantasy_magic.jpg",
  historical_period_st: "assets/covers/historical_period_st.jpg",
  horror_suspense: "assets/covers/horror_suspense.jpg",
  psychological_thrill: "assets/covers/psychological_thrill.jpg",
  romance: "assets/covers/romance.jpg",
  sci_fi_future: "assets/covers/sci_fi_future.jpg",
};

function safeText(value) {
  return String(value ?? "").replace(
    /[&<>"]/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char],
  );
}

/* ---------- Question Set Loader from stories.json ---------- */
function buildQuestionSet(genreObj, storyObj, setNum) {
  const storyTitle = storyObj ? storyObj.title : "Mindful Story";

  const allQuestions =
    storyObj && Array.isArray(storyObj.questions) && storyObj.questions.length > 0
      ? storyObj.questions
      : [];

  const startIdx = (setNum - 1) * 6;
  const endIdx = startIdx + 6;

  // Slice the 6 questions for this set number directly from the imported XLSX dataset (up to 150 questions per story)
  let setQuestions = allQuestions.slice(startIdx, endIdx);

  // Fallback wrap if setNum exceeds total story questions
  if (setQuestions.length < 6 && allQuestions.length > 0) {
    setQuestions = Array.from({ length: 6 }, (_, i) => {
      const q = allQuestions[(startIdx + i) % allQuestions.length];
      return { ...q };
    });
  }

  const startNum = startIdx + 1;

  return setQuestions.map((q, i) => {
    const globalQNum = startNum + i;
    return {
      ...q,
      globalNumber: globalQNum,
      setNumber: setNum,
      sourceStoryTitle: storyTitle,
      options: (q.options || []).map((opt) => ({ ...opt })),
    };
  });
}

/* ---------- UI Renders & Flow ---------- */
function initUserSessionUI() {
  const users = getUsers();
  const currentUid = getCurrentUserId();
  const select = $("#userSelect");

  select.innerHTML = users
    .map(
      (u) =>
        `<option value="${u.id}" ${u.id === currentUid ? "selected" : ""}>👤 ${u.name}</option>`,
    )
    .join("");

  select.onchange = (e) => {
    setCurrentUserId(e.target.value);
    updateUserSessionHeader();
    if (!currentGenre) showPickGenres();
    else showPickStories(currentGenre);
  };

  $("#newUserBtn").onclick = () => {
    $("#newUserNameInput").value = "";
    $("#newUserModal").hidden = false;
    $("#newUserNameInput").focus();
  };

  $("#cancelNewUserBtn").onclick = () => {
    $("#newUserModal").hidden = true;
  };

  $("#saveNewUserBtn").onclick = () => {
    const name = $("#newUserNameInput").value;
    const created = createNewUserSession(name);
    if (created) {
      $("#newUserModal").hidden = true;
      initUserSessionUI();
      updateUserSessionHeader();
      showPickGenres();
    }
  };

  updateUserSessionHeader();
}

function updateUserSessionHeader() {
  const users = getUsers();
  const uid = getCurrentUserId();
  const user = users.find((u) => u.id === uid) || users[0];
  const checkins = loadUserCheckins(uid);
  const prog = loadUserProgress(uid);
  const storyCount = Object.keys(prog).length;

  const summary = $("#userProgressSummary");
  if (summary) {
    summary.innerHTML = `<span class="u-pill-icon">⚡</span> <strong>${user.name}</strong> · ${checkins.length} Sessions · ${storyCount} Stories In-Progress`;
  }
}

function showPickGenres() {
  currentGenre = null;
  currentStory = null;
  $("#quizCard").hidden = true;
  $("#doneCard").hidden = true;
  $("#pickCard").hidden = false;
  $("#pickStep").textContent = "Step 1 of 2";
  $("#pickTitle").textContent = "Choose a genre";
  $("#pickHint").textContent = "Each world tells a different story about how you feel today.";
  $("#pickBack").hidden = true;
  $("#flowChoose").textContent = "Explore this genre";
  $("#bookflowViewport").setAttribute("aria-label", "Genre choices");
  $("#qProgressFill").style.width = "0%";

  const uid = getCurrentUserId();
  const prog = loadUserProgress(uid);

  flowMode = "genres";
  flowItems = DATA.genres;
  flowIndex = 0;
  $("#pickGrid").innerHTML = DATA.genres
    .map((g, genreIndex) => {
      const storiesInGenre = g.stories;
      const totalSetsCompleted = storiesInGenre.reduce((acc, s) => acc + (prog[s.id] || 0), 0);
      const coverUrl = GENRE_COVERS[g.id];
      const coverClass = coverUrl ? "has-cover" : "";
      const coverStyle = coverUrl
        ? `style="background-image: linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.42) 100%), url('${coverUrl}'); background-size: cover; background-position: center;"`
        : "";

      return `
    <li class="bookflow-item" data-index="${genreIndex}">
      <button type="button" class="book-cover genre-cover ${coverClass} art-${GENRE_ART[genreIndex % GENRE_ART.length]}" ${coverStyle} data-genre="${g.id}" aria-label="${safeText(g.name)}, ${g.stories.length} stories">
        <span class="book-spine" aria-hidden="true"></span>
        <span class="cover-kicker">Mindful stories</span>
        ${coverUrl ? "" : `<span class="cover-symbol" aria-hidden="true">${g.icon}</span>`}
        <span class="cover-title">${safeText(g.name)}</span>
        <span class="cover-rule" aria-hidden="true"></span>
        <span class="cover-meta">${g.stories.length} stories</span>
        ${totalSetsCompleted > 0 ? `<span class="cover-progress">${totalSetsCompleted} sets read</span>` : `<span class="cover-progress">A new world awaits</span>`}
      </button>
    </li>`;
    })
    .join("");
  updateBookflow();
}

/* ---------- Modular Genre Data Loader ---------- */
const loadedGenreData = {};

async function fetchGenreData(genreId) {
  if (loadedGenreData[genreId]) return loadedGenreData[genreId];
  try {
    const res = await fetch(`data/genres/${genreId}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const genreData = await res.json();
    loadedGenreData[genreId] = genreData;
    return genreData;
  } catch (err) {
    console.warn(`Could not load modular genre file for ${genreId}:`, err);
    return null;
  }
}

async function showPickStories(g) {
  let fullGenre = g;
  if (!g.stories || !g.stories[0] || !g.stories[0].questions) {
    const fetched = await fetchGenreData(g.id);
    if (fetched) fullGenre = fetched;
  }
  currentGenre = fullGenre;
  const uid = getCurrentUserId();
  const prog = loadUserProgress(uid);

  $("#pickStep").textContent = "Step 2 of 2";
  $("#pickTitle").textContent = `${fullGenre.name} — pick your story`;
  $("#pickHint").textContent = "Select a story to continue from where you left off or start Set 1.";
  $("#pickBack").hidden = false;
  $("#flowChoose").textContent = "Begin this story";
  $("#bookflowViewport").setAttribute("aria-label", `${fullGenre.name} story choices`);

  flowMode = "stories";
  flowItems = fullGenre.stories;
  flowIndex = 0;
  $("#pickGrid").innerHTML = fullGenre.stories
    .map((s, storyIndex) => {
      const completedSets = prog[s.id] || 0;
      const nextSet = completedSets + 1;
      const startQ = (nextSet - 1) * 6 + 1;
      const endQ = nextSet * 6;
      const isResuming = completedSets > 0;
      const coverUrl = GENRE_COVERS[fullGenre.id];
      const coverClass = coverUrl ? "has-cover" : "";
      const coverStyle = coverUrl
        ? `style="background-image: linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.42) 100%), url('${coverUrl}'); background-size: cover; background-position: center;"`
        : "";

      return `
    <li class="bookflow-item" data-index="${storyIndex}">
      <button type="button" class="book-cover story-cover ${coverClass} art-${GENRE_ART[DATA.genres.findIndex((item) => item.id === fullGenre.id) % GENRE_ART.length]}" ${coverStyle} data-story="${s.id}" aria-label="${safeText(s.title)}, ${isResuming ? `resume set ${nextSet}` : "start set 1"}">
        <span class="book-spine" aria-hidden="true"></span>
        <span class="cover-kicker">${safeText(fullGenre.name)}</span>
        ${coverUrl ? "" : `<span class="cover-symbol" aria-hidden="true">${fullGenre.icon}</span>`}
        <span class="cover-title">${safeText(s.title)}</span>
        <span class="cover-rule" aria-hidden="true"></span>
        <span class="cover-meta">${isResuming ? `Resume set ${nextSet}` : "Begin set 1"}</span>
        <span class="cover-progress">Questions ${startQ}–${endQ}</span>
      </button>
    </li>`;
    })
    .join("");
  updateBookflow();
}

function updateBookflow() {
  const cards = [...document.querySelectorAll(".bookflow-item")];
  const compact = window.matchMedia("(max-width: 640px)").matches;
  const spacing = compact ? 74 : 112;
  cards.forEach((card, itemIndex) => {
    const distance = itemIndex - flowIndex;
    const away = Math.abs(distance);
    card.style.setProperty("--flow-x", `${distance * spacing}px`);
    card.style.setProperty("--flow-z", `${-away * (compact ? 42 : 64)}px`);
    card.style.setProperty("--flow-ry", `${distance === 0 ? 0 : distance < 0 ? 48 : -48}deg`);
    card.style.setProperty("--flow-scale", String(Math.max(0.72, 1 - away * 0.07)));
    card.style.zIndex = String(100 - away);
    card.classList.toggle("is-active", distance === 0);
    card.classList.toggle("is-far", away > (compact ? 3 : 5));
    const button = card.querySelector("button");
    if (button) {
      button.tabIndex = distance === 0 ? 0 : -1;
      button.setAttribute("aria-current", distance === 0 ? "true" : "false");
    }
  });
  const selected = flowItems[flowIndex];
  const status = $("#flowStatus");
  if (selected && status)
    status.textContent = `${flowIndex + 1} of ${flowItems.length} · ${selected.name || selected.title}`;
  $("#flowPrev").disabled = flowIndex === 0;
  $("#flowNext").disabled = flowIndex === flowItems.length - 1;
  const maxDots = Math.min(flowItems.length, 12);
  $("#flowDots").innerHTML = Array.from({ length: maxDots }, (_, dotIndex) => {
    const mappedIndex =
      maxDots === flowItems.length
        ? dotIndex
        : Math.round((dotIndex * (flowItems.length - 1)) / (maxDots - 1));
    return `<i class="${Math.abs(mappedIndex - flowIndex) <= Math.max(1, Math.ceil(flowItems.length / maxDots / 2)) ? "active" : ""}"></i>`;
  }).join("");
}

function moveBookflow(direction) {
  flowIndex = Math.max(0, Math.min(flowItems.length - 1, flowIndex + direction));
  updateBookflow();
}

async function chooseActiveBook() {
  const selected = flowItems[flowIndex];
  if (!selected) return;
  if (flowMode === "genres") await showPickStories(selected);
  else await startStory(selected);
}

async function loadStoryQuestions(story) {
  if (story && Array.isArray(story.questions) && story.questions.length > 0) return story;
  if (story && story.dataUrl) {
    try {
      const response = await fetch(story.dataUrl, { cache: "no-store" });
      if (response.ok) {
        const loaded = await response.json();
        if (Array.isArray(loaded.questions) && loaded.questions.length > 0) {
          Object.assign(story, loaded);
          return story;
        }
      }
    } catch (e) {}
  }
  return story;
}

async function startStory(s, forceSetNum = null) {
  let targetStory = s;
  let targetGenre = currentGenre;

  if (s && s.dataUrl) {
    try {
      targetStory = await loadStoryQuestions(s);
    } catch (e) {}
  }

  if (!targetStory || !targetStory.questions || targetStory.questions.length === 0) {
    let genreId = currentGenre ? currentGenre.id : null;
    if (!genreId && DATA && Array.isArray(DATA.genres)) {
      const gMatch = DATA.genres.find(
        (g) => g.stories && g.stories.some((st) => st.id === (s ? s.id : "")),
      );
      if (gMatch) genreId = gMatch.id;
    }
    if (genreId) {
      const fullGenre = await fetchGenreData(genreId);
      if (fullGenre) {
        targetGenre = fullGenre;
        currentGenre = fullGenre;
        const foundStory = fullGenre.stories.find((st) => st.id === (s ? s.id : ""));
        if (foundStory) targetStory = foundStory;
      }
    }
  }

  currentStory = targetStory;
  if (!currentGenre && DATA && Array.isArray(DATA.genres)) {
    currentGenre =
      DATA.genres.find((g) => g.stories && g.stories.some((st) => st.id === targetStory.id)) ||
      DATA.genres[0];
  }

  const uid = getCurrentUserId();
  const prog = loadUserProgress(uid);
  const completedSets = prog[targetStory.id] || 0;

  currentSetNumber = forceSetNum !== null ? forceSetNum : completedSets + 1;
  questions = buildQuestionSet(currentGenre, targetStory, currentSetNumber);
  answers = new Array(questions.length).fill(null);
  index = 0;

  const pickCard = $("#pickCard");
  if (pickCard) pickCard.hidden = true;

  const doneCard = $("#doneCard");
  if (doneCard) doneCard.hidden = true;

  const quizCard = $("#quizCard");
  if (quizCard) quizCard.hidden = false;

  const startQ = (currentSetNumber - 1) * 6 + 1;
  const endQ = currentSetNumber * 6;

  const setBadge = $("#setBadge");
  if (setBadge) setBadge.textContent = `Set ${currentSetNumber}`;

  const setRange = $("#setRange");
  if (setRange) setRange.textContent = `Questions ${startQ}–${endQ}`;

  const setContinuity = $("#setContinuity");
  if (setContinuity)
    setContinuity.textContent =
      completedSets > 0 ? `Resuming Session (Completed Set ${completedSets})` : `First Session`;

  render();
}

$("#pickGrid").addEventListener("click", async (e) => {
  if (Math.abs(dragDeltaX) > 12) return;
  const btn = e.target.closest("button[data-genre],button[data-story],.book-cover");
  if (!btn) return;
  const item = btn.closest(".bookflow-item");
  const itemIndex = item ? Number(item.dataset.index) : -1;
  if (itemIndex >= 0) {
    flowIndex = itemIndex;
    updateBookflow();
  }
  const genreId = btn.dataset.genre || btn.getAttribute("data-genre");
  const storyId = btn.dataset.story || btn.getAttribute("data-story");

  if (genreId) {
    const selectedGenreMeta = DATA.genres.find((g) => g.id === genreId);
    if (selectedGenreMeta) await showPickStories(selectedGenreMeta);
  } else if (storyId) {
    let selectedStory =
      currentGenre && currentGenre.stories
        ? currentGenre.stories.find((s) => s.id === storyId)
        : null;
    if (!selectedStory && DATA && DATA.genres) {
      for (const g of DATA.genres) {
        if (g.stories) {
          const found = g.stories.find((s) => s.id === storyId);
          if (found) {
            selectedStory = found;
            break;
          }
        }
      }
    }
    await startStory(selectedStory || { id: storyId });
  }
});
$("#pickBack").addEventListener("click", showPickGenres);
$("#flowPrev").addEventListener("click", () => moveBookflow(-1));
$("#flowNext").addEventListener("click", () => moveBookflow(1));
$("#flowChoose").addEventListener("click", chooseActiveBook);
$("#bookflowViewport").addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    moveBookflow(-1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    moveBookflow(1);
  }
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    chooseActiveBook();
  }
});
$("#bookflowViewport").addEventListener(
  "wheel",
  (event) => {
    if (wheelLock || Math.abs(event.deltaX) + Math.abs(event.deltaY) < 8) return;
    event.preventDefault();
    wheelLock = true;
    moveBookflow((event.deltaX || event.deltaY) > 0 ? 1 : -1);
    window.setTimeout(() => {
      wheelLock = false;
    }, 180);
  },
  { passive: false },
);
$("#bookflowViewport").addEventListener("pointerdown", (event) => {
  dragStartX = event.clientX;
  dragDeltaX = 0;
  event.currentTarget.classList.add("is-dragging");
});
$("#bookflowViewport").addEventListener("pointermove", (event) => {
  if (dragStartX === null) return;
  dragDeltaX = event.clientX - dragStartX;
});
$("#bookflowViewport").addEventListener("pointerup", (event) => {
  if (dragStartX === null) return;
  event.currentTarget.classList.remove("is-dragging");
  if (Math.abs(dragDeltaX) > 34) moveBookflow(dragDeltaX < 0 ? 1 : -1);
  dragStartX = null;
  dragDeltaX = 0;
});
window.addEventListener("resize", updateBookflow);

/* ---------- Question Screen ---------- */
function render() {
  const q = questions[index];
  const globalQNum = q.globalNumber || index + 1;
  const totalForSet = questions.length;

  $("#qStep").textContent =
    `Set ${currentSetNumber} · Question ${index + 1} of ${totalForSet} (Overall Q${globalQNum})`;
  $("#qSignal").textContent = `${currentStory.title} · Set ${currentSetNumber} · ${q.beat}`;
  $("#qScenario").textContent = q.scene;
  $("#qText").textContent = q.question;
  $("#qProgressFill").style.width = (index / totalForSet) * 100 + "%";

  $("#qOptions").innerHTML = q.options
    .map(
      (o, i) => `
    <li>
      <button type="button" class="opt${answers[index] === i ? " chosen" : ""}" data-i="${i}"
        aria-pressed="${answers[index] === i}">
        <span class="opt-key" aria-hidden="true">${LETTERS[i]}</span>
        <span class="opt-text">${o.text}</span>
      </button>
    </li>`,
    )
    .join("");

  $("#qBack").disabled = index === 0;
  $("#qNext").disabled = answers[index] === null;
  $("#qNext").textContent = index === totalForSet - 1 ? `Finish Set ${currentSetNumber}` : "Next";
}

$("#qOptions").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-i]");
  if (!btn) return;
  answers[index] = +btn.dataset.i;
  render();
  setTimeout(() => {
    if (answers[index] !== null) next();
  }, 260);
});

function next() {
  if (answers[index] === null) return;
  if (index < questions.length - 1) {
    index++;
    render();
  } else finish();
}
$("#qNext").addEventListener("click", next);
$("#qBack").addEventListener("click", () => {
  if (index > 0) {
    index--;
    render();
  }
});

/* ---------- Scoring ---------- */
function scoreAnswers() {
  const chosen = answers.map((a, i) => questions[i].options[a]);

  const totals = {};
  MOOD_KEYS.forEach((k) => (totals[k] = 0));
  chosen.forEach((o) => MOOD_KEYS.forEach((k) => (totals[k] += o.mix[k] || 0)));
  const sum = MOOD_KEYS.reduce((s, k) => s + totals[k], 0) || 1;
  const mixExact = {};
  MOOD_KEYS.forEach((k) => (mixExact[k] = (totals[k] / sum) * 100));

  const mix = {};
  MOOD_KEYS.forEach((k) => (mix[k] = Math.round(mixExact[k])));
  let drift = 100 - MOOD_KEYS.reduce((s, k) => s + mix[k], 0);
  const order = MOOD_KEYS.slice().sort((a, b) => mixExact[b] - mixExact[a]);
  for (let i = 0; drift !== 0; i = (i + 1) % order.length) {
    mix[order[i]] += drift > 0 ? 1 : -1;
    drift += drift > 0 ? -1 : 1;
  }

  const mood = Math.round(
    MOOD_KEYS.reduce((s, k, i) => s + mixExact[k] * ((i + 0.5) / 8) * 100, 0) / 100,
  );
  const avg = (a) => a.reduce((s, v) => s + v, 0) / a.length;
  const arousal = avg(chosen.map((o) => o.arousal || 0));
  const valence = avg(chosen.map((o) => o.valence || 0));
  const energy = Math.round(clamp(((arousal + 1) / 2) * 100));
  const negShare = mixExact.veryLow + mixExact.low + mixExact.uneasy;
  const stress = Math.round(clamp(0.7 * negShare + 0.3 * (1 - (valence + 1) / 2) * 100));
  const sleep = Math.round((((100 - stress) * 0.6 + energy * 0.4) / 100) * 60);

  const topKey = order[0];
  const uid = getCurrentUserId();
  const startQ = (currentSetNumber - 1) * 6 + 1;
  const endQ = currentSetNumber * 6;

  return {
    sessionId: "sess_" + Date.now().toString(36),
    userId: uid,
    mood,
    energy,
    stress,
    sleep,
    mix,
    dominant: MOOD_META[MOOD_KEYS.indexOf(topKey)].label,
    genre: currentGenre.name,
    story: currentStory.title,
    storyId: currentStory.id,
    setNumber: currentSetNumber,
    questionRange: `Q${startQ}–Q${endQ}`,
    at: new Date().toISOString(),
    answers: answers.slice(),
    answersDetailed: questions.map((q, idx) => ({
      globalQ: q.globalNumber,
      question: q.question,
      chosenOption: q.options[answers[idx]].text,
      mix: q.options[answers[idx]].mix,
    })),
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
        selected_answer: question.options[optionIndex]?.text || "",
      };
    }),
    results: result,
  };
}

async function finish() {
  const result = scoreAnswers();
  const uid = getCurrentUserId();

  // Check-ins require the same authenticated account used by the dashboard.
  if (typeof WellnessAuth === "undefined" || !(await WellnessAuth.getUser())) {
    location.replace("login.html");
    return;
  }

  // Save progress for story set
  saveUserProgress(uid, currentStory.id, currentSetNumber);

  // Save session to user checkins
  const history = loadUserCheckins(uid);
  history.push(result);
  localStorage.setItem(getCheckinsKey(uid), JSON.stringify(history.slice(-50)));

  // Transform theme to match newly calculated mood mix
  applyDynamicMoodTheme(result.mix, result.mood);

  const quizCard = $("#quizCard");
  if (quizCard) quizCard.hidden = true;

  const done = $("#doneCard");
  if (done) done.hidden = false;

  const progressFill = $("#qProgressFill");
  if (progressFill) progressFill.style.width = "100%";

  const doneSetHeader = $("#doneSetHeader");
  if (doneSetHeader)
    doneSetHeader.textContent = `Set ${currentSetNumber} Complete! (${result.questionRange})`;

  const resMoodLabel = $("#resMoodLabel");
  if (resMoodLabel)
    resMoodLabel.textContent = `${result.genre} · ${result.story} — detected mood: ${result.dominant}`;

  const resMood = $("#resMood");
  if (resMood) resMood.textContent = result.mood + "%";

  const resStress = $("#resStress");
  if (resStress) resStress.textContent = result.stress + "%";

  const resSleep = $("#resSleep");
  if (resSleep) resSleep.textContent = result.sleep + " min";

  const resMix = $("#resMix");
  if (resMix) {
    resMix.innerHTML = MOOD_KEYS.map(
      (k, i) =>
        `<i style="--c:${MOOD_META[i].color};width:${result.mix[k]}%" title="${MOOD_META[i].label}: ${result.mix[k]}%"></i>`,
    ).join("");
  }

  const resLegend = $("#resLegend");
  if (resLegend) {
    resLegend.innerHTML = MOOD_KEYS.map(
      (k, i) =>
        `<li><span class="dot glow" style="--c:${MOOD_META[i].color};background:${MOOD_META[i].color}"></span>${MOOD_META[i].label} <strong>${result.mix[k]}%</strong></li>`,
    ).join("");
  }

  const nextSetNum = currentSetNumber + 1;
  const nextStartQ = (nextSetNum - 1) * 6 + 1;
  const nextEndQ = nextSetNum * 6;

  const nextSetPrompt = $("#nextSetPrompt");
  if (nextSetPrompt) {
    nextSetPrompt.innerHTML = `
      <div class="next-set-card">
        <span class="spark">📖</span>
        <div>
          <strong>Ready for Set ${nextSetNum}?</strong>
          <p class="muted small">Continue the storyline of <em>${currentStory.title}</em> (Questions ${nextStartQ}–${nextEndQ}).</p>
        </div>
      </div>
    `;
  }

  const continueBtn = $("#continueNextSetBtn");
  if (continueBtn) {
    continueBtn.onclick = () => {
      startStory(currentStory, nextSetNum);
    };
  }

  updateUserSessionHeader();
  if (done) done.focus();

  if (typeof WellnessAuth !== "undefined") {
    try {
      await WellnessAuth.saveCheckin(databaseRecord(result));
      const saveStatus = $("#saveStatus");
      if (saveStatus)
        saveStatus.textContent = "Saved securely to your account. Your dashboard is ready.";
      location.replace("index.html");
    } catch (error) {
      const saveStatus = $("#saveStatus");
      if (saveStatus) saveStatus.textContent = `Could not save this check-in: ${error.message}`;
    }
  }
}

/* ---------- Boot ---------- */
fetch("data/genres.json")
  .then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  })
  .catch(() =>
    fetch("data/stories.json", { cache: "no-store" }).then((r) => {
      if (!r.ok) throw new Error(`Questionnaire index request failed (${r.status}).`);
      return r.json();
    }),
  )
  .then(async (d) => {
    if (!Array.isArray(d.genres) || d.genres.length === 0) {
      throw new Error("Questionnaire index is empty.");
    }
    DATA = d;
    const user = await WellnessAuth.getUser();
    if (!user) {
      location.replace("login.html");
      return;
    }
    syncAuthenticatedUser(user);
    initUserSessionUI();
    const existingCheckins = loadUserCheckins(getCurrentUserId());
    if (existingCheckins && existingCheckins.length > 0) {
      const latestCheckin = existingCheckins[existingCheckins.length - 1];
      applyDynamicMoodTheme(latestCheckin.mix, latestCheckin.mood);
    }
    showPickGenres();
  })
  .catch((err) => {
    console.error("Failed to load questionnaire data:", err);
    const title = $("#pickTitle");
    if (title) title.textContent = "Stories couldn't be loaded";
    const hint = $("#pickHint");
    if (hint) hint.textContent = "Please refresh the page to try again.";
  });
