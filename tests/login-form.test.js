import test from "node:test";
import assert from "node:assert/strict";

import {
  LIMITS,
  normalizeLoginInput,
  passwordVisibilityLabel,
  validateLoginInput,
} from "../assets/js/login-form.js";

test("normalizes email without trimming password", () => {
  assert.deepEqual(
    normalizeLoginInput({
      email: "  user@example.com  ",
      password: "  secret  ",
      remember: "on",
    }),
    {
      email: "user@example.com",
      password: "  secret  ",
      remember: true,
    },
  );
});

test("accepts a valid login-form payload", () => {
  const result = validateLoginInput({
    email: "user@example.com",
    password: "correct-horse-battery-staple",
    remember: true,
  });

  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, {});
});

test("rejects malformed email and short passwords", () => {
  const result = validateLoginInput({
    email: "not-an-email",
    password: "short",
  });

  assert.equal(result.valid, false);
  assert.ok(result.errors.email);
  assert.ok(result.errors.password);
});

test("rejects oversized values", () => {
  const oversizedEmail = "a".repeat(LIMITS.emailMax) + "@example.com";
  const result = validateLoginInput({
    email: oversizedEmail,
    password: "x".repeat(LIMITS.passwordMax + 1),
  });

  assert.ok(result.errors.email);
  assert.ok(result.errors.password);
});

test("password visibility copy follows state", () => {
  assert.equal(passwordVisibilityLabel(false), "Show password");
  assert.equal(passwordVisibilityLabel(true), "Hide password");
});
