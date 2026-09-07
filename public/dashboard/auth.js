/* Browser client for Supabase Auth and the wellness_checkins table. */
window.WellnessAuth = (() => {
  const SESSION_KEY = "mindful.supabase.session";
  const config = window.WELLNESS_SUPABASE_CONFIG || {};
  const configured = () => /^https:\/\/.+\.supabase\.co$/i.test(config.url || "") && Boolean(config.anonKey);
  const endpoint = path => `${config.url.replace(/\/$/, "")}${path}`;

  const session = () => {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null"); } catch { return null; }
  };
  const saveSession = value => sessionStorage.setItem(SESSION_KEY, JSON.stringify(value));
  const clearSession = () => sessionStorage.removeItem(SESSION_KEY);
  const headers = (token, extra = {}) => ({ apikey: config.anonKey, ...(token ? { Authorization: `Bearer ${token}` } : {}), ...extra });

  async function request(path, options = {}) {
    if (!configured()) throw new Error("Database connection has not been configured yet.");
    const response = await fetch(endpoint(path), options);
    const text = await response.text();
    const body = text ? JSON.parse(text) : null;
    if (!response.ok) throw new Error(body?.msg || body?.message || body?.error_description || "Request failed.");
    return body;
  }

  async function signIn(email, password) {
    const data = await request("/auth/v1/token?grant_type=password", {
      method: "POST", headers: headers(null, { "Content-Type": "application/json" }),
      body: JSON.stringify({ email, password })
    });
    saveSession(data);
    return data.user;
  }

  async function signUp(email, password) {
    const data = await request("/auth/v1/signup", {
      method: "POST", headers: headers(null, { "Content-Type": "application/json" }),
      body: JSON.stringify({ email, password })
    });
    if (data.access_token) saveSession(data);
    return data;
  }

  async function getUser() {
    const current = session();
    if (!current?.access_token) return null;
    try { return await request("/auth/v1/user", { headers: headers(current.access_token) }); }
    catch { clearSession(); return null; }
  }

  async function signOut() {
    const current = session();
    if (current?.access_token && configured()) {
      try { await request("/auth/v1/logout", { method: "POST", headers: headers(current.access_token) }); } catch { /* remove local session regardless */ }
    }
    clearSession();
  }

  async function saveCheckin(checkin) {
    const current = session();
    if (!current?.access_token) throw new Error("Please sign in before saving a check-in.");
    return request("/rest/v1/wellness_checkins", {
      method: "POST",
      headers: headers(current.access_token, { "Content-Type": "application/json", Prefer: "return=representation" }),
      body: JSON.stringify({ genre: checkin.genre, story: checkin.story, answers: checkin.answers, results: checkin.results })
    });
  }

  async function loadCheckins() {
    const current = session();
    if (!current?.access_token) return [];
    return request("/rest/v1/wellness_checkins?select=id,genre,story,answers,results,submitted_at&order=submitted_at.asc", {
      headers: headers(current.access_token)
    });
  }

  return { configured, session, getUser, signIn, signUp, signOut, saveCheckin, loadCheckins };
})();
