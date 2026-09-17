---
name: fixture-integrity
description: Rules for making any change in this repo without breaking its role as a deterministic-red-CI fixture
type: convention
scope: global
updated: '2026-09-17'
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - README.md
  - package.json
  - src/greeting.ts
  - tsconfig.json
  - .github/workflows/ci.yml
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  package.json: 8233427e2dea5f0d0f69945b542cee71e11235b388b01adcae9ee4356b6bddae
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
  tsconfig.json: b3433dd8b2ee73252b402dc6964bbd0b8fd3e34802fd0750c24a884501678da9
---

Before making any change here, check it against these constraints — see
[[overview]] for the full invariant this repo tests.

- **Never fix the type error on `main`.** `src/greeting.ts:11`
  (`export const answer: number = 'forty-two';`) must keep failing
  `tsc --noEmit` on `main`. A "helpful" fix on `main` defeats the fixture.
- **On a branch, the one correct fix is a numeric literal** for `answer`
  (e.g. `42`), and nothing else — don't also change the declared type, the
  `greeting` function, or unrelated files. Minimal-diff fixes are what the
  fix-agent under test is expected to produce, so keep any manual PR
  demonstrating the fix equally minimal.
- **Fix PRs against this repo are never merged** (README.md) — that's by
  design, not an oversight. Don't try to "clean up" by merging one.
- **Don't add source files, tests, or dependencies.** The repo is
  deliberately a single file (`src/greeting.ts`) plus the minimum tooling to
  typecheck it (`typescript` devDependency, `tsconfig.json`, one npm script).
  Adding more surface area adds more ways the fixture's signal could become
  ambiguous.
- **Don't add a lockfile-sensitive install step change.** CI runs
  `npm install --no-audit --no-fund` with no lockfile committed
  (`package-lock.json` is absent) — that's consistent with there being only
  one pinned devDependency (`typescript@5.6.3`). If you add dependencies,
  reconsider whether a lockfile is now needed, since drift would make the
  "deterministic" part of "deterministically RED CI" less true.
