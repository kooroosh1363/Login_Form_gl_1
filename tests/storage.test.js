import test from "node:test";
import assert from "node:assert/strict";

import {
  clearRememberedEmail,
  loadRememberedEmail,
  saveRememberedEmail,
} from "../assets/js/storage.js";

function memoryStorage() {
  const data = new Map();
  return {
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    },
    setItem(key, value) {
      data.set(key, String(value));
    },
    removeItem(key) {
      data.delete(key);
    },
  };
}

test("stores only remembered email", () => {
  const storage = memoryStorage();
  saveRememberedEmail(" user@example.com ", storage);
  assert.equal(loadRememberedEmail(storage), "user@example.com");
});

test("clears remembered email", () => {
  const storage = memoryStorage();
  saveRememberedEmail("user@example.com", storage);
  clearRememberedEmail(storage);
  assert.equal(loadRememberedEmail(storage), "");
});

test("storage failures do not break the UI", () => {
  const failingStorage = {
    getItem() { throw new Error("blocked"); },
    setItem() { throw new Error("blocked"); },
    removeItem() { throw new Error("blocked"); },
  };

  assert.equal(loadRememberedEmail(failingStorage), "");
  assert.equal(saveRememberedEmail("user@example.com", failingStorage), "user@example.com");
  assert.doesNotThrow(() => clearRememberedEmail(failingStorage));
});
