const REMEMBERED_EMAIL_KEY = "glass-login.remembered-email";

export function loadRememberedEmail(storage = window.localStorage) {
  try {
    return String(storage.getItem(REMEMBERED_EMAIL_KEY) ?? "");
  } catch {
    return "";
  }
}

export function saveRememberedEmail(email, storage = window.localStorage) {
  const normalized = String(email ?? "").trim();

  try {
    if (normalized) {
      storage.setItem(REMEMBERED_EMAIL_KEY, normalized);
    } else {
      storage.removeItem(REMEMBERED_EMAIL_KEY);
    }
  } catch {
    // The UI remains usable when browser storage is unavailable.
  }

  return normalized;
}

export function clearRememberedEmail(storage = window.localStorage) {
  try {
    storage.removeItem(REMEMBERED_EMAIL_KEY);
  } catch {
    // Ignore privacy-mode storage failures.
  }
}
