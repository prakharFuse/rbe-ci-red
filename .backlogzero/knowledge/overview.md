---
name: overview
description: What this repo is and its one-file, one-script shape — read before touching anything here
type: knowledge
scope: global
updated: 2026-09-10 (IONE-959)
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

This is a journey-suite fixture repo (resolver-core spec 014 / j85), not an application. See `../../README.md` and the header comment in `../../src/greeting.ts` for the dual-invariant rule the repo exists to enforce (main stays red; PR-branch CI-fix agents are expected to fix it).

Derived facts not stated in those docs:

- The entire production surface is one file: `src/greeting.ts`, exporting `greeting()` and the intentionally mistyped `answer` (`string` assigned to a `number`-typed export, line 11).
- `package.json` defines exactly one script, `typecheck` (`tsc --noEmit`). There is no `test`, `build`, `lint`, or `start` script, and no test framework/dependency in the repo.
- `tsconfig.json` sets `strict: true`, `noEmit: true`, target `ES2022`, module/moduleResolution `NodeNext`. Strict mode is why the string-to-number assignment on line 11 is a hard compile error rather than a warning.
- The README's re-provisioning pointer, `tests/journeys/scripts/provision-ci-red-fixtures.ts`, does not exist in this checkout — that script lives in the external resolver-core harness that seeds this fixture, not in this repo.

Passing CI in this repo is equivalent to `npx tsc --noEmit` succeeding — there is nothing else to satisfy.
