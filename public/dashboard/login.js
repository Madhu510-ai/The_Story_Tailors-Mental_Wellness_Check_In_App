const form = document.querySelector("#authForm");
const message = document.querySelector("#formMessage");
const modeButton = document.querySelector("#modeButton");
const submitButton = document.querySelector("#submitButton");
let creating = false;

if (!WellnessAuth.configured()) document.querySelector("#setupNote").hidden = false;
WellnessAuth.getUser().then(user => { if (user) location.replace("index.html"); });

modeButton.addEventListener("click", () => {
  creating = !creating;
  document.querySelector("#authEyebrow").textContent = creating ? "Create your private space" : "Welcome back";
  document.querySelector("#authTitle").textContent = creating ? "Create an account" : "Sign in to continue";
  document.querySelector("#authDescription").textContent = creating ? "Your check-ins are stored only under your account." : "Use your email and password to open your dashboard.";
  submitButton.textContent = creating ? "Create account" : "Sign in";
  modeButton.textContent = creating ? "Already have an account? Sign in" : "New here? Create an account";
  document.querySelector("#password").autocomplete = creating ? "new-password" : "current-password";
  message.textContent = "";
});

form.addEventListener("submit", async event => {
  event.preventDefault();
  if (!WellnessAuth.configured()) { message.textContent = "The database connection has not been configured yet."; return; }
  submitButton.disabled = true; message.textContent = creating ? "Creating your account…" : "Signing you in…";
  try {
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;
    const data = creating ? await WellnessAuth.signUp(email, password) : await WellnessAuth.signIn(email, password);
    if (creating && !data.access_token) { message.textContent = "Account created. Check your email to confirm it, then sign in."; return; }
    location.replace("index.html");
  } catch (error) { message.textContent = error.message; }
  finally { submitButton.disabled = false; }
});
