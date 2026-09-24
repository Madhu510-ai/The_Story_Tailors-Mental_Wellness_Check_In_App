/* ==========================================================================
   MINDFUL WELLNESS GAMIFICATION & BADGE HIERARCHY SYSTEM
   - Point scoring based on time spent in mindful activities & completed timers.
   - Levels and tiered badge progression (Seeker -> Pro -> Elite -> Legend).
   - Real-time timer score rewards and level-up celebrations.
   ========================================================================== */

window.WELLNESS_GAMIFICATION = (() => {
  const STORAGE_KEY_PREFIX = "mindful.gamification.";
  const COIN_SOUND_URL = "assets/coin-collection.mp3?v=2";

  function playCoinCollectionSound(pointsToAdd) {
    if (!(Number.isFinite(Number(pointsToAdd)) && Number(pointsToAdd) > 0)) return;
    try {
      const coinAudio = document.createElement("audio");
      coinAudio.src = COIN_SOUND_URL;
      coinAudio.preload = "auto";
      coinAudio.volume = 1;
      coinAudio.setAttribute("playsinline", "");
      coinAudio.addEventListener("ended", () => coinAudio.remove(), { once: true });
      document.body.appendChild(coinAudio);
      coinAudio.play().catch(() => coinAudio.remove());
    } catch (e) {
      // Audio playback is optional and must not interrupt reward storage.
    }
  }

  function animateWalletReward(pointsToAdd) {
    const wallet = document.querySelector(".user-wallet");
    const reward = document.getElementById("walletRewardFloat");
    if (!wallet || !reward) return;

    wallet.classList.remove("wallet-collecting");
    reward.classList.remove("wallet-reward-visible");
    void wallet.offsetWidth;
    reward.textContent = `+${Number(pointsToAdd).toLocaleString()} coins`;
    wallet.classList.add("wallet-collecting");
    reward.classList.add("wallet-reward-visible");
    window.setTimeout(() => {
      wallet.classList.remove("wallet-collecting");
      reward.classList.remove("wallet-reward-visible");
    }, 900);
  }

  // 8-Tier Level & Badge Hierarchy
  const BADGE_HIERARCHY = [
    {
      level: 1,
      key: "seeker",
      title: "Mindful Seeker",
      shortTitle: "Seeker",
      icon: "🥉",
      minPoints: 0,
      maxPoints: 99,
      color: "#a3e635",
      desc: "Starting the journey of mindful check-ins and self-awareness."
    },
    {
      level: 2,
      key: "explorer",
      title: "Calm Explorer",
      shortTitle: "Explorer",
      icon: "🥈",
      minPoints: 100,
      maxPoints: 249,
      color: "#38bdf8",
      desc: "Exploring somatic regulation, breathing cadences, and mindful habits."
    },
    {
      level: 3,
      key: "practitioner",
      title: "Mindful Practitioner",
      shortTitle: "Practitioner",
      icon: "🏅",
      minPoints: 250,
      maxPoints: 499,
      color: "#818cf8",
      desc: "Developing consistent nervous-system balance and emotional stability."
    },
    {
      level: 4,
      key: "pro",
      title: "Wellness Pro",
      shortTitle: "Pro",
      icon: "🎖️",
      minPoints: 500,
      maxPoints: 999,
      color: "#f59e0b",
      desc: "Demonstrating solid commitment to mental health, focus, and recovery."
    },
    {
      level: 5,
      key: "master",
      title: "Zen Master",
      shortTitle: "Master",
      icon: "💎",
      minPoints: 1000,
      maxPoints: 1799,
      color: "#ec4899",
      desc: "Mastery over deep parasympathetic breathing and restorative sleep hygiene."
    },
    {
      level: 6,
      key: "elite",
      title: "Mindful Elite",
      shortTitle: "Elite",
      icon: "🛡️",
      minPoints: 1800,
      maxPoints: 2799,
      color: "#6366f1",
      desc: "Exemplary resilience under stress and high-vitality emotional poise."
    },
    {
      level: 7,
      key: "champion",
      title: "Resilience Champion",
      shortTitle: "Champion",
      icon: "🏆",
      minPoints: 2800,
      maxPoints: 3999,
      color: "#f43f5e",
      desc: "Holistic mind-body harmony, sustained energy, and circadian mastery."
    },
    {
      level: 8,
      key: "legend",
      title: "Wellness Legend",
      shortTitle: "Legend",
      icon: "👑",
      minPoints: 4000,
      maxPoints: Infinity,
      color: "#eab308",
      desc: "The ultimate pinnacle of transcendent inner calm, wisdom, and lifelong practice."
    }
  ];

  function getStorageKey(userId) {
    return STORAGE_KEY_PREFIX + (userId || "default");
  }

  function getUserData(userId) {
    try {
      const raw = localStorage.getItem(getStorageKey(userId));
      if (raw) {
        const data = JSON.parse(raw);
        data.totalPoints = Number(data.totalPoints) || 0;
        data.totalCoins = Number.isFinite(Number(data.totalCoins))
          ? Number(data.totalCoins)
          : data.totalPoints;
        data.totalMinutes = Number(data.totalMinutes) || 0;
        data.activitiesCompleted = Number(data.activitiesCompleted) || 0;
        data.history = Array.isArray(data.history) ? data.history : [];
        return data;
      }
    } catch (e) {
      console.warn("Could not read gamification data:", e);
    }
    // Default initial profile
    return {
      userId: userId || "default",
      totalPoints: 0,
      totalCoins: 0,
      totalMinutes: 0,
      activitiesCompleted: 0,
      history: []
    };
  }

  function saveUserData(userId, data) {
    try {
      localStorage.setItem(getStorageKey(userId), JSON.stringify(data));
    } catch (e) {
      console.warn("Could not save gamification data:", e);
    }
  }

  function getLevelForPoints(points) {
    const pts = Math.max(0, Number(points) || 0);
    for (let i = BADGE_HIERARCHY.length - 1; i >= 0; i--) {
      if (pts >= BADGE_HIERARCHY[i].minPoints) {
        return BADGE_HIERARCHY[i];
      }
    }
    return BADGE_HIERARCHY[0];
  }

  function getNextLevel(currentLevelObj) {
    const nextIdx = BADGE_HIERARCHY.findIndex(b => b.level === currentLevelObj.level) + 1;
    if (nextIdx < BADGE_HIERARCHY.length) {
      return BADGE_HIERARCHY[nextIdx];
    }
    return null; // Already at Legend
  }

  /**
   * Calculates points based on time spent + full completion bonus.
   * - 10 points per full minute (e.g. 1 point per 6 seconds).
   * - Completion bonus if full timer finished:
   *   <= 5 min: +25 bonus
   *   6 - 10 min: +50 bonus
   *   > 10 min: +100 bonus
   */
  function calculatePoints(elapsedSeconds, totalDurationSeconds, isFull) {
    const minutes = Math.floor(elapsedSeconds / 60);
    let pts = minutes * 10;

    // Fractional seconds credit (1 pt per 6 secs)
    const extraSecs = elapsedSeconds % 60;
    pts += Math.floor(extraSecs / 6);
    if (elapsedSeconds > 0) pts = Math.max(1, pts);

    let bonus = 0;
    if (isFull) {
      const totalMin = Math.round(totalDurationSeconds / 60);
      if (totalMin <= 5) bonus = 25;
      else if (totalMin <= 10) bonus = 50;
      else bonus = 100;
      pts += bonus;
    }

    return {
      points: pts,
      minutes: Math.max(1, Math.round(elapsedSeconds / 60)),
      bonus
    };
  }

  /**
   * Awards points to the user and detects level ups
   */
  function awardPoints(userId, pointsToAdd, minutesToAdd, activityTitle, recId) {
    const data = getUserData(userId);
    const oldLevel = getLevelForPoints(data.totalPoints);

    data.totalPoints += pointsToAdd;
    data.totalCoins = (Number(data.totalCoins) || 0) + pointsToAdd;
    data.totalMinutes += minutesToAdd;
    data.activitiesCompleted = (data.activitiesCompleted || 0) + 1;

    data.history.unshift({
      recId: recId || "custom",
      title: activityTitle || "Mindful Session",
      points: pointsToAdd,
      minutes: minutesToAdd,
      timestamp: new Date().toISOString()
    });

    // Keep history clean to latest 50
    if (data.history.length > 50) data.history = data.history.slice(0, 50);

    saveUserData(userId, data);
    playCoinCollectionSound(pointsToAdd);
    animateWalletReward(pointsToAdd);

    const newLevel = getLevelForPoints(data.totalPoints);
    const leveledUp = newLevel.level > oldLevel.level;

    return {
      totalPoints: data.totalPoints,
      totalMinutes: data.totalMinutes,
      activitiesCompleted: data.activitiesCompleted,
      oldLevel,
      newLevel,
      leveledUp,
      pointsAwarded: pointsToAdd
    };
  }

  /**
   * Renders the Gamification Banner in Dashboard
   */
  function renderDashboardGamification(userId) {
    const data = getUserData(userId);
    const currentTier = getLevelForPoints(data.totalPoints);
    const topBadge = document.getElementById("userTopBadge");
    const topBadgeIcon = document.getElementById("userTopBadgeIcon");
    const topBadgeTitle = document.getElementById("userTopBadgeTitle");
    const usernameBadgeIcon = document.getElementById("userNameBadgeIcon");

    if (topBadge) {
      topBadge.style.borderColor = `${currentTier.color}99`;
      topBadge.style.background = `${currentTier.color}22`;
      topBadge.title = `${currentTier.title} · Level ${currentTier.level}`;
    }
    if (topBadgeIcon) topBadgeIcon.textContent = currentTier.icon;
    if (usernameBadgeIcon) usernameBadgeIcon.textContent = currentTier.icon;
    if (topBadgeTitle) {
      topBadgeTitle.textContent = currentTier.shortTitle;
      topBadgeTitle.style.color = currentTier.color;
    }

    const banner = document.getElementById("gamificationBanner");
    if (!banner) return;

    const nextTier = getNextLevel(currentTier);

    const iconEl = document.getElementById("gameUserBadgeIcon");
    const levelEl = document.getElementById("gameUserLevel");
    const titleEl = document.getElementById("gameUserBadgeTitle");
    const descEl = document.getElementById("gameTierDesc");
    const pointsEl = document.getElementById("gameUserPoints");
    const walletCoinsEl = document.getElementById("userWalletCoins");
    const minutesEl = document.getElementById("gameUserMinutes");
    const nextTierEl = document.getElementById("gameProgressNextTier");
    const pointsLeftEl = document.getElementById("gameProgressPointsLeft");
    const fillEl = document.getElementById("gameProgressFill");

    if (iconEl) iconEl.textContent = currentTier.icon;
    if (levelEl) {
      levelEl.textContent = `Level ${currentTier.level}`;
      levelEl.style.background = `${currentTier.color}22`;
      levelEl.style.color = currentTier.color;
      levelEl.style.borderColor = `${currentTier.color}55`;
    }
    if (titleEl) {
      titleEl.textContent = currentTier.title;
      titleEl.style.color = currentTier.color;
    }
    if (descEl) descEl.textContent = currentTier.desc;
    if (pointsEl) pointsEl.innerHTML = `${data.totalPoints.toLocaleString()} <small>pts</small>`;
    if (walletCoinsEl) walletCoinsEl.textContent = data.totalCoins.toLocaleString();
    if (minutesEl) minutesEl.innerHTML = `${data.totalMinutes} <small>min</small>`;

    if (nextTier) {
      const range = nextTier.minPoints - currentTier.minPoints;
      const progressInTier = Math.max(0, data.totalPoints - currentTier.minPoints);
      const pct = Math.min(100, Math.round((progressInTier / range) * 100));
      const remaining = nextTier.minPoints - data.totalPoints;

      if (nextTierEl) {
        nextTierEl.innerHTML = `Next Rank: <strong>${nextTier.icon} ${nextTier.title} (${nextTier.minPoints.toLocaleString()} pts)</strong>`;
      }
      if (pointsLeftEl) {
        pointsLeftEl.textContent = `${remaining.toLocaleString()} pts remaining`;
      }
      if (fillEl) {
        fillEl.style.width = `${pct}%`;
        fillEl.style.background = `linear-gradient(90deg, ${currentTier.color}, ${nextTier.color})`;
      }
    } else {
      if (nextTierEl) nextTierEl.innerHTML = `<strong>Pinnacle Reached: Wellness Legend 👑</strong>`;
      if (pointsLeftEl) pointsLeftEl.textContent = `Supreme Mastery`;
      if (fillEl) {
        fillEl.style.width = "100%";
        fillEl.style.background = `linear-gradient(90deg, #ffd700, #ff8c00)`;
      }
    }
  }

  /**
   * Renders the Badge Hierarchy in the modal
   */
  function renderBadgeHall(userId) {
    const listContainer = document.getElementById("badgeHierarchyList");
    if (!listContainer) return;

    const data = getUserData(userId);
    const userPoints = data.totalPoints;
    const currentTier = getLevelForPoints(userPoints);

    listContainer.innerHTML = BADGE_HIERARCHY.map(badge => {
      const isUnlocked = userPoints >= badge.minPoints;
      const isCurrent = badge.level === currentTier.level;
      const ptsRemaining = badge.minPoints - userPoints;

      return `
      <li class="badge-item ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''}">
        <div class="badge-item-icon" style="background:${badge.color}20; border-color:${badge.color}60">
          ${badge.icon}
        </div>
        <div class="badge-item-content">
          <div class="badge-item-header">
            <span class="badge-tier-level" style="color:${badge.color}">Level ${badge.level}</span>
            <h4>${badge.title}</h4>
            <span class="badge-points-tag">${badge.minPoints.toLocaleString()}+ pts</span>
            ${isCurrent ? '<span class="current-badge-pill">Active Rank</span>' : ''}
          </div>
          <p class="small muted">${badge.desc}</p>
          <div class="badge-item-footer">
            ${isUnlocked 
              ? `<span class="badge-status-unlocked">✓ Unlocked (${badge.minPoints.toLocaleString()} pts milestone)</span>` 
              : `<span class="badge-status-locked">🔒 Locked · Need ${ptsRemaining.toLocaleString()} more pts</span>`
            }
          </div>
        </div>
      </li>`;
    }).join("");
  }

  /**
   * Triggers a Level-up celebration popup
   */
  function triggerLevelUpModal(newTier) {
    const modal = document.getElementById("levelUpModal");
    if (!modal) return;

    const iconEl = document.getElementById("levelUpBadgeIcon");
    const nameEl = document.getElementById("levelUpBadgeTitle");
    const levelEl = document.getElementById("levelUpLevelNum");
    const descEl = document.getElementById("levelUpDesc");

    if (iconEl) iconEl.textContent = newTier.icon;
    if (nameEl) {
      nameEl.textContent = newTier.title;
      nameEl.style.color = newTier.color;
    }
    if (levelEl) levelEl.textContent = `Level ${newTier.level}`;
    if (descEl) descEl.textContent = newTier.desc;

    modal.hidden = false;

    // Confetti or visual vibration if available
    if (navigator.vibrate) navigator.vibrate([150, 100, 200, 100, 250]);
  }

  return {
    HIERARCHY: BADGE_HIERARCHY,
    getUserData,
    saveUserData,
    getLevelForPoints,
    getNextLevel,
    calculatePoints,
    awardPoints,
    renderDashboardGamification,
    renderBadgeHall,
    triggerLevelUpModal
  };
})();
