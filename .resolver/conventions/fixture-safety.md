---
name: fixture-safety
description: Rules for any agent that has write access to this repo's src/ (unlike this overlay, which is read-only there)
type: convention
scope: global
updated: 2026-08-07 (IONE-959)
captured_sha: 7887b9648a33ccc5627d6fae5090e1ad1007b7bb
sources:
  - src/greeting.ts
  - README.md
---

- Never merge a fix for the type error at `src/greeting.ts:11` into `main`
  of this repo — see `[[overview]]`. The repo needs to stay red on `main` so
  the CI-fix journey has something to fix on ephemeral branches/PRs.
- `greeting()` itself (`src/greeting.ts:7-9`) is correct and untouched by
  the fixture invariant — only the `answer` const on line 11 is the
  deliberate breakage. Don't conflate the two when reasoning about "the bug".
- There are no tests in this repo (`package.json` defines only a
  `typecheck` script) and no test framework dependency — don't assume Jest/
  Vitest conventions apply here.
