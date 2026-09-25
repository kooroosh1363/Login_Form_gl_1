import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("email and password fields have real label associations", () => {
  for (const id of ["email", "password"]) {
    assert.match(html, new RegExp('id=["\\\']' + id + '["\\\']'));
    assert.match(html, new RegExp('for=["\\\']' + id + '["\\\']'));
  }
});

test("password field uses secure input semantics", () => {
  assert.match(html, /id="password"[^>]*type="password"/);
  assert.match(html, /autocomplete="current-password"/);
});

test("password toggle is an accessible button", () => {
  assert.match(html, /id="password-toggle"[^>]*type="button"/);
  assert.match(html, /aria-pressed="false"/);
});

test("page has no third-party runtime resources", () => {
  assert.doesNotMatch(
    html,
    /unpkg\.com|fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs|jsdelivr|ionicons/i,
  );
});

test("application script is loaded as a module", () => {
  assert.match(
    html,
    /<script[^>]+type="module"[^>]+src="\.\/assets\/js\/javas\.js"/,
  );
});
