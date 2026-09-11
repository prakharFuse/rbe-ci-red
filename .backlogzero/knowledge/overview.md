---
name: overview
description: What rbe-ci-red is and why main is intentionally red — read before touching anything here
type: knowledge
scope: global
updated: '2026-09-11'
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - package.json
  - tsconfig.json
  - README.md
  - src/greeting.ts
  - .github/workflows/ci.yml
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  package.json: 8233427e2dea5f0d0f69945b542cee71e11235b388b01adcae9ee4356b6bddae
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
  tsconfig.json: b3433dd8b2ee73252b402dc6964bbd0b8fd3e34802fd0750c24a884501678da9
---

This repo is a CI-fixture, not a product. See ../../README.md for the full statement of intent — it already covers the dual invariant (main stays red, PR branches are expected to fix it) and must not be duplicated here. See also the inline comment at `src/greeting.ts:1-6`, which restates the same invariant next to the offending line.

## Derived facts not in the README

- The type error is `tsconfig.json`'s `strict: true` catching `export const answer: number = 'forty-two';` at `src/greeting.ts:11` (string literal assigned to a `number`-typed binding — TS2322). Turning off `strict` or removing the annotation would also silence it, but the only fix path the fixture expects is replacing the string literal with a numeric one (see [[ci-red-fixture-invariant]]).
- `package.json` defines exactly one script, `typecheck` (`tsc --noEmit`). There is no `build`, `test`, or `lint` script, and no test runner is installed — the only devDependency is `typescript`.
- The README's "Re-provision" line points at `tests/journeys/scripts/provision-ci-red-fixtures.ts`. That path does not exist in this checkout — it lives in the host (resolver-core) repo that provisions this fixture, not in `rbe-ci-red` itself. Don't go looking for it here.
