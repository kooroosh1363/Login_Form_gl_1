# GlassGate — Accessible Glass Login UI

[![Quality](https://github.com/kooroosh1363/Login_Form_gl_1/actions/workflows/quality.yml/badge.svg)](https://github.com/kooroosh1363/Login_Form_gl_1/actions/workflows/quality.yml)
[![Deploy](https://github.com/kooroosh1363/Login_Form_gl_1/actions/workflows/pages.yml/badge.svg)](https://github.com/kooroosh1363/Login_Form_gl_1/actions/workflows/pages.yml)

GlassGate modernizes the original 2023 glassmorphism login-form exercise into an accessible, dependency-free frontend interaction demo.

Unlike the separate backend authentication project, this repository intentionally stays frontend-only and does **not** pretend to authenticate users.

## Features

- semantic email/password labels
- correct autocomplete attributes
- password reveal/hide control
- Caps Lock warning
- field-level validation
- remember-email option
- password is never persisted
- accessible status messages
- responsive glassmorphism UI
- automatic light/dark color scheme
- reduced-motion support
- zero runtime dependencies
- no Ionicons or Google Fonts
- GitHub Actions + Pages deployment

## Demo behavior

A valid submission is handled locally and displays a message confirming that nothing was transmitted.

Remember-me stores **only the email address** in localStorage. Passwords are never stored.

## Architecture

```text
index.html
   │
   ├── semantic form
   ▼
assets/js/javas.js
   ├── DOM interaction
   ├── password visibility
   ├── Caps Lock warning
   └── status rendering
        │
        ├── login-form.js  -> normalization + validation
        └── storage.js     -> remembered email only
```

## Quality

```bash
npm run check
```

Tests cover validation, password-visibility labels, remember-email storage behavior, secure password input semantics, label associations, and third-party dependency boundaries.

## Scope

This is a UI/UX portfolio demo. Real authentication requires a server-side identity system, password hashing, sessions/tokens, CSRF protection, rate limiting, and secure account lifecycle handling.

## License

No license is currently included.
