const form = document.querySelector("#authForm");
const message = document.querySelector("#formMessage");
const modeButton = document.querySelector("#modeButton");
const forgotPasswordButton = document.querySelector("#forgotPasswordButton");
const submitButton = document.querySelector("#submitButton");
const usernameField = document.querySelector("#usernameField");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const recoverySupportLink = document.querySelector("#recoverySupportLink");
let creating = false;
let recovering = false;

const PASSWORD_MESSAGE = "Use 8+ characters with an uppercase letter, lowercase letter, number, and special character.";
const passwordIsValid = (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/.test(value);
const nameIsValid = (value) => {
  const name = value.trim();
  return /^(?=.{2,50}$)(?=.*[aeiouyAEIOUY])[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(name)
    && !/(.)\1\1/i.test(name) && !/^(asdf|qwerty|zxcv|test)/i.test(name);
};
const setMessage = (text) => { message.textContent = text; };

document.querySelectorAll("[data-password-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.passwordToggle);
    const visible = input.type === "password";
    input.type = visible ? "text" : "password";
    button.setAttribute("aria-pressed", String(visible));
    button.setAttribute("aria-label", `${visible ? "Hide" : "Show"} password`);
    button.querySelector("span").textContent = visible ? "◉" : "○";
  });
});

function showLogin() {
  recovering = false;
  usernameField.hidden = !creating;
  usernameInput.required = creating;
  passwordInput.closest("label").hidden = false;
  passwordInput.required = true;
  forgotPasswordButton.hidden = creating;
  recoverySupportLink.hidden = true;
  document.querySelector("#authEyebrow").textContent = creating ? "Create your private space" : "Welcome back";
  document.querySelector("#authTitle").textContent = creating ? "Create an account" : "Sign in to continue";
  document.querySelector("#authDescription").textContent = creating ? "Your check-ins are stored only under your account." : "Use your email and password to open your dashboard.";
  submitButton.textContent = creating ? "Create account" : "Sign in";
  modeButton.textContent = creating ? "Already have an account? Sign in" : "New here? Create an account";
  passwordInput.autocomplete = creating ? "new-password" : "current-password";
}

function showRecovery() {
  recovering = true;
  creating = false;
  usernameField.hidden = true;
  usernameInput.required = false;
  passwordInput.closest("label").hidden = true;
  passwordInput.required = false;
  forgotPasswordButton.hidden = true;
  const supportUrl = window.WELLNESS_SUPABASE_CONFIG?.recoverySupportUrl;
  recoverySupportLink.hidden = !supportUrl;
  if (supportUrl) recoverySupportLink.href = supportUrl;
  document.querySelector("#authEyebrow").textContent = "Password recovery";
  document.querySelector("#authTitle").textContent = "Recover your account";
  document.querySelector("#authDescription").textContent = "Enter your registered email and we will send a secure reset link.";
  submitButton.textContent = "Send reset link";
  modeButton.textContent = "Back to sign in";
}

if (!WellnessAuth.configured()) document.querySelector("#setupNote").hidden = false;
WellnessAuth.getUser().then((user) => { if (user) location.replace("checkin.html"); });

modeButton.addEventListener("click", () => {
  if (recovering) showLogin(); else { creating = !creating; showLogin(); }
  setMessage("");
});
forgotPasswordButton.addEventListener("click", () => { showRecovery(); setMessage(""); emailInput.focus(); });

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!WellnessAuth.configured()) return setMessage("The database connection has not been configured yet.");
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const username = usernameInput.value.trim();
  if (creating && !nameIsValid(username)) return setMessage("Enter a name using letters and spaces only; please avoid placeholder or keyboard-pattern names.");
  if (!recovering && !passwordIsValid(password)) return setMessage(PASSWORD_MESSAGE);
  submitButton.disabled = true;
  setMessage(recovering ? "Sending your secure reset link…" : creating ? "Creating your account…" : "Signing you in…");
  try {
    if (recovering) {
      await WellnessAuth.sendPasswordRecovery(email);
      setMessage("If this email is registered, a reset link is on its way. Check spam too. If you cannot access email recovery, use the configured support-recovery option below.");
      return;
    }
    if (creating) {
      const data = await WellnessAuth.signUp(email, password, username);
      localStorage.setItem("mindful.authUsername", username);
      showLogin();
      setMessage(data.access_token ? "Account created. Please sign in to continue." : "Account created. Check your email to confirm it, then sign in.");
      return;
    }
    await WellnessAuth.signIn(email, password);
    location.replace("checkin.html");
  } catch (error) {
    setMessage(error.message);
  } finally {
    submitButton.disabled = false;
  }
});
