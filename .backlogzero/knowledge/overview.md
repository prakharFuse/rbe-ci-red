---
name: overview
description: What rbe-ci-red is and why it exists — read before touching src/greeting.ts, ci.yml, or main
type: knowledge
scope: global
updated: 2026-09-11 (IONE-959)
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - README.md
  - package.json
  - tsconfig.json
  - src/greeting.ts
  - .github/workflows/ci.yml
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  package.json: 8233427e2dea5f0d0f69945b542cee71e11235b388b01adcae9ee4356b6bddae
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
  tsconfig.json: b3433dd8b2ee73252b402dc6964bbd0b8fd3e34802fd0750c24a884501678da9
---

Purpose and the "don't fix main" / "PR-branch fixes are expected" rules are
already stated correctly in ../../README.md — read that first.

## Derived facts not in the README

- The repo is intentionally minimal: one source file (`src/greeting.ts`), one
  CI workflow (`.github/workflows/ci.yml`), no `tests/` directory, no
  `package-lock.json`, no build output (`tsconfig.json` sets `"noEmit": true`).
- The only script is `npm run typecheck` → `tsc --noEmit` (package.json:7).
  CI does **not** call this script — `.github/workflows/ci.yml` invokes
  `npx tsc --noEmit` directly (ci.yml:21). If the `typecheck` script is ever
  changed, CI behavior won't change with it unless ci.yml is updated too.
- `tsconfig.json` has `"strict": true`, which is why `answer: number =
  'forty-two'` (src/greeting.ts:11) fails type-checking — a string literal
  assigned to a `number`-typed const, not an inference gap.
- The README (README.md:12) points to a re-provisioning script at
  `tests/journeys/scripts/provision-ci-red-fixtures.ts`. That path does not
  exist in this repo (no `tests/` directory at all) — it lives in the
  journey-suite/seeding repo that provisions this fixture, not here.

## The one thing that must never change on `main`

`src/greeting.ts:11` must stay type-broken on `main`. Do not "fix" it as a
drive-by cleanup, even if it looks like an obvious bug — see README.md and
[[ci-fixture-behavior]].
