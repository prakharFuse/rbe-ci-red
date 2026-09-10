---
name: ci-fixture-conventions
description: Branch-specific rules for this fixture — what's allowed on main vs. PR branches
type: convention
scope: global
updated: 2026-09-10 (IONE-959)
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - README.md
  - src/greeting.ts
sources_sha256:
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
---

This repo has inverted the usual "always fix red CI" instinct. Treat these as
hard rules, not suggestions:

- **On `main`**: never change `src/greeting.ts:11`. The type error
  (`export const answer: number = 'forty-two';`) must stay red. Do not add
  `// @ts-ignore`, change `tsconfig.json`'s `strict` setting, or otherwise
  silence the error — any of those would defeat the fixture's purpose.
- **On a PR branch**: the one expected, minimal change is assigning a real
  number literal to `answer` at `src/greeting.ts:11` (e.g. `42`). Don't touch
  `greeting()`, `tsconfig.json`, or `.github/workflows/ci.yml` as part of that
  fix — scope creep beyond the single literal is not the behavior under test.
- Fix PRs against this fixture are intentionally declined/never merged — a
  merged fix would remove the fixture's reason to exist. Don't be surprised
  or try to "unblock" a fix PR that isn't merging; that's expected.

See [[overview]] for what the fixture is testing and why.
