---
name: overview
description: What this repo is and how its files fit together — read first for any task here
type: knowledge
scope: global
updated: 2026-08-26 (IONE-959)
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - package.json
  - src/greeting.ts
  - README.md
  - .github/workflows/ci.yml
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  package.json: 8233427e2dea5f0d0f69945b542cee71e11235b388b01adcae9ee4356b6bddae
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
---

This repo's purpose, the intended type error, and the dual invariant (main
stays red, PR branches get fixed) are already stated correctly in
[README.md](../../README.md) and the header comment in
[src/greeting.ts](../../src/greeting.ts) — read those first, do not re-derive
or restate the intent here.

## What actually exists

The repo is intentionally tiny: one source file (`src/greeting.ts`, 11
lines), one config (`tsconfig.json`), one workflow (`.github/workflows/ci.yml`),
and `package.json` declares a single script, `typecheck` (`tsc --noEmit`).
There is no `build`, `test`, or `lint` script, no test runner dependency, and
no `src/` files other than `greeting.ts`.

`answer` (the value with the type error) is exported but not imported or
referenced anywhere else in `src/`. The type error is isolated — fixing it
cannot cascade into other type errors elsewhere in this repo.

## Gap: the re-provisioning script isn't in this repo

README.md points to `tests/journeys/scripts/provision-ci-red-fixtures.ts` for
re-provisioning. That path does not exist in this working tree — it lives in
the parent `resolver-core` monorepo that generates/seeds this fixture, not in
`rbe-ci-red` itself. Don't search for it here.
