/* Browser client for Supabase Auth and the wellness_checkins table. */
window.WellnessAuth = (() => {
  // localStorage intentionally survives browser restarts. Supabase sessions are
  // short-lived access tokens plus refresh tokens, not a separate "logged in"
  // flag, so every restored session is verified/refreshed before it is trusted.
  const SESSION_KEY = "mindful.supabase.session";
  const config = window.WELLNESS_SUPABASE_CONFIG || {};
  const configured = () =>
    /^https:\/\/.+\.supabase\.co$/i.test(config.url || "") && Boolean(config.anonKey);
  const endpoint = (path) => `${config.url.replace(/\/$/, "")}${path}`;

  const session = () => {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    } catch {
      return null;
    }
  };
  const saveSession = (value) => localStorage.setItem(SESSION_KEY, JSON.stringify(value));
  const clearSession = () => localStorage.removeItem(SESSION_KEY);
  const headers = (token, extra = {}) => ({
    apikey: config.anonKey,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  });

  async function request(path, options = {}) {
    if (!configured()) throw new Error("Database connection has not been configured yet.");
    const response = await fetch(endpoint(path), options);
    const text = await response.text();
    const body = text ? JSON.parse(text) : null;
    if (!response.ok)
      throw new Error(body?.msg || body?.message || body?.error_description || "Request failed.");
    return body;
  }

  async function signIn(email, password) {
    const data = await request("/auth/v1/token?grant_type=password", {
      method: "POST",
      headers: headers(null, { "Content-Type": "application/json" }),
      body: JSON.stringify({ email, password }),
    });
    saveSession(data);
    return data.user;
  }

  async function signUp(email, password, username) {
    const data = await request("/auth/v1/signup", {
      method: "POST",
      headers: headers(null, { "Content-Type": "application/json" }),
      body: JSON.stringify({ email, password, data: { username } }),
    });
    if (data.access_token) saveSession(data);
    return data;
  }

  async function refreshSession(current) {
    if (!current?.refresh_token) return null;
    try {
      const data = await request("/auth/v1/token?grant_type=refresh_token", {
        method: "POST",
        headers: headers(null, { "Content-Type": "application/json" }),
        body: JSON.stringify({ refresh_token: current.refresh_token }),
      });
      saveSession(data);
      return data;
    } catch {
      clearSession();
      return null;
    }
  }

  async function currentSession() {
    const current = session();
    if (!current?.access_token) return null;
    // Refresh a minute early so a token cannot expire in the middle of a request.
    if (current.expires_at && current.expires_at * 1000 <= Date.now() + 60_000) {
      return refreshSession(current);
    }
    return current;
  }

  async function getUser() {
    const current = await currentSession();
    if (!current?.access_token) return null;
    try {
      return await request("/auth/v1/user", { headers: headers(current.access_token) });
    } catch {
      clearSession();
      return null;
    }
  }

  async function signOut() {
    const current = await currentSession();
    if (current?.access_token && configured()) {
      try {
        await request("/auth/v1/logout", {
          method: "POST",
          headers: headers(current.access_token),
        });
      } catch {
        /* remove local session regardless */
      }
    }
    clearSession();
  }

  async function saveCheckin(checkin) {
    const current = await currentSession();
    if (!current?.access_token) throw new Error("Please sign in before saving a check-in.");
    return request("/rest/v1/wellness_checkins", {
      method: "POST",
      headers: headers(current.access_token, {
        "Content-Type": "application/json",
        Prefer: "return=representation",
      }),
      body: JSON.stringify({
        genre: checkin.genre,
        story: checkin.story,
        answers: checkin.answers,
        results: checkin.results,
      }),
    });
  }

  async function loadCheckins() {
    const current = await currentSession();
    if (!current?.access_token) return [];
    return request(
      "/rest/v1/wellness_checkins?select=id,genre,story,answers,results,submitted_at&order=submitted_at.asc",
      {
        headers: headers(current.access_token),
      },
    );
  }

  async function sendPasswordRecovery(email) {
    const redirectTo =
      config.recoveryRedirectUrl || `${window.location.origin}${window.location.pathname.replace(/[^/]*$/, "reset-password.html")}`;
    return request("/auth/v1/recover", {
      method: "POST",
      headers: headers(null, { "Content-Type": "application/json" }),
      // This project uses the Auth REST API directly; its wire-format name is
      // redirect_to (supabase-js maps its redirectTo option to this field).
      body: JSON.stringify({ email, redirect_to: redirectTo }),
    });
  }

  // Supabase puts a recovery session in the URL hash after the email link is opened.
  // Save it before the reset form calls updateUser.
  function restoreRecoverySession() {
    const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const access_token = params.get("access_token");
    if (!access_token || params.get("type") !== "recovery") return null;
    const recoverySession = {
      access_token,
      refresh_token: params.get("refresh_token"),
      expires_at:
        Number(params.get("expires_at")) ||
        (Number(params.get("expires_in")) ? Math.floor(Date.now() / 1000) + Number(params.get("expires_in")) : undefined),
      token_type: params.get("token_type") || "bearer",
    };
    saveSession(recoverySession);
    window.history.replaceState({}, document.title, window.location.pathname);
    return recoverySession;
  }

  async function updatePassword(password) {
    const current = await currentSession();
    if (!current?.access_token) throw new Error("Your reset link is missing or has expired. Request a new one.");
    const data = await request("/auth/v1/user", {
      method: "PUT",
      headers: headers(current.access_token, { "Content-Type": "application/json" }),
      body: JSON.stringify({ password }),
    });
    return data;
  }

  return {
    configured, session, currentSession, getUser, signIn, signUp, signOut, saveCheckin, loadCheckins,
    sendPasswordRecovery, restoreRecoverySession, updatePassword,
  };
})();
