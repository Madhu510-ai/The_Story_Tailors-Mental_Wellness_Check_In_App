const form = document.querySelector("#resetForm");
const message = document.querySelector("#formMessage");
const submitButton = document.querySelector("#submitButton");
const passwordIsValid = (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/.test(value);

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

if (!WellnessAuth.restoreRecoverySession()) {
  message.textContent = "Open the reset link from your email to verify your identity, then choose a new password.";
  submitButton.disabled = true;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const password = document.querySelector("#newPassword").value;
  const confirmation = document.querySelector("#confirmPassword").value;
  if (!passwordIsValid(password)) {
    message.textContent = "Use 8+ characters with an uppercase letter, lowercase letter, number, and special character.";
    return;
  }
  if (password !== confirmation) {
    message.textContent = "The new passwords do not match.";
    return;
  }
  submitButton.disabled = true;
  message.textContent = "Updating password…";
  try {
    await WellnessAuth.updatePassword(password);
    message.textContent = "Password updated. Redirecting to your dashboard…";
    location.replace("checkin.html");
  } catch (error) {
    message.textContent = error.message;
    submitButton.disabled = false;
  }
});
