import {
  passwordVisibilityLabel,
  validateLoginInput,
} from "./login-form.js";
import {
  clearRememberedEmail,
  loadRememberedEmail,
  saveRememberedEmail,
} from "./storage.js";

const form = document.querySelector("#login-form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const remember = document.querySelector("#remember");
const passwordToggle = document.querySelector("#password-toggle");
const capsLockStatus = document.querySelector("#caps-lock-status");
const formStatus = document.querySelector("#form-status");
const submitButton = document.querySelector("#submit-button");

const fields = ["email", "password"];

function values() {
  const data = new FormData(form);
  return {
    email: data.get("email"),
    password: data.get("password"),
    remember: data.get("remember") === "on",
  };
}

function setFieldError(field, message = "") {
  const input = document.querySelector(`#${field}`);
  const error = document.querySelector(`#${field}-error`);

  if (!input || !error) return;

  if (message) {
    input.setAttribute("aria-invalid", "true");
    error.textContent = message;
  } else {
    input.removeAttribute("aria-invalid");
    error.textContent = "";
  }
}

function clearErrors() {
  fields.forEach((field) => setFieldError(field));
}

function updateCapsLock(event) {
  const enabled = Boolean(event.getModifierState?.("CapsLock"));
  capsLockStatus.textContent = enabled ? "Caps Lock is on." : "";
}

password.addEventListener("keydown", updateCapsLock);
password.addEventListener("keyup", updateCapsLock);
password.addEventListener("blur", () => {
  capsLockStatus.textContent = "";
});

passwordToggle.addEventListener("click", () => {
  const visible = password.type === "text";
  const nextVisible = !visible;

  password.type = nextVisible ? "text" : "password";
  passwordToggle.setAttribute("aria-pressed", String(nextVisible));
  passwordToggle.setAttribute("aria-label", passwordVisibilityLabel(nextVisible));
  passwordToggle.textContent = nextVisible ? "Hide" : "Show";
  password.focus();
});

fields.forEach((field) => {
  const input = document.querySelector(`#${field}`);
  input?.addEventListener("input", () => {
    if (input.hasAttribute("aria-invalid")) {
      const { errors } = validateLoginInput(values());
      setFieldError(field, errors[field] ?? "");
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();

  const result = validateLoginInput(values());

  if (!result.valid) {
    fields.forEach((field) => setFieldError(field, result.errors[field] ?? ""));
    formStatus.className = "form-status form-status--error";
    formStatus.textContent = "Review the highlighted fields and try again.";

    const firstInvalid = fields
      .map((field) => document.querySelector(`#${field}`))
      .find((input) => input?.hasAttribute("aria-invalid"));

    firstInvalid?.focus();
    return;
  }

  if (result.data.remember) {
    saveRememberedEmail(result.data.email);
  } else {
    clearRememberedEmail();
  }

  submitButton.disabled = true;
  submitButton.textContent = "Validated";
  formStatus.className = "form-status form-status--success";
  formStatus.textContent =
    "Demo credentials validated locally. Nothing was transmitted and the password was not stored.";

  window.setTimeout(() => {
    submitButton.disabled = false;
    submitButton.textContent = "Continue";
    password.value = "";
    password.type = "password";
    passwordToggle.textContent = "Show";
    passwordToggle.setAttribute("aria-pressed", "false");
    passwordToggle.setAttribute("aria-label", "Show password");
  }, 1200);
});

const rememberedEmail = loadRememberedEmail();
if (rememberedEmail) {
  email.value = rememberedEmail;
  remember.checked = true;
}
