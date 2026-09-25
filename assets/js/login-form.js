const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LIMITS = Object.freeze({
  emailMax: 254,
  passwordMin: 8,
  passwordMax: 128,
});

export function normalizeLoginInput(input = {}) {
  return {
    email: String(input.email ?? "").trim(),
    password: String(input.password ?? ""),
    remember: input.remember === true || input.remember === "on",
  };
}

export function validateLoginInput(input = {}) {
  const data = normalizeLoginInput(input);
  const errors = {};

  if (!data.email) {
    errors.email = "Please enter your email address.";
  } else if (data.email.length > LIMITS.emailMax || !EMAIL_PATTERN.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.password) {
    errors.password = "Please enter your password.";
  } else if (
    data.password.length < LIMITS.passwordMin ||
    data.password.length > LIMITS.passwordMax
  ) {
    errors.password = `Password must be between ${LIMITS.passwordMin} and ${LIMITS.passwordMax} characters.`;
  }

  return { data, errors, valid: Object.keys(errors).length === 0 };
}

export function passwordVisibilityLabel(isVisible) {
  return isVisible ? "Hide password" : "Show password";
}
