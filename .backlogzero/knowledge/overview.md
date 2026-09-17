---
name: overview
description: What this repo is and why its main branch is intentionally red — read before touching CI or greeting.ts
type: knowledge
scope: global
updated: 2026-09-17 (IONE-959)
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - README.md
  - src/greeting.ts
  - .github/workflows/ci.yml
  - package.json
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  package.json: 8233427e2dea5f0d0f69945b542cee71e11235b388b01adcae9ee4356b6bddae
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
---

This repo is a **test fixture**, not an application. See ../../README.md for the
canonical statement of intent (resolver-core spec 014 / j85): `main` is kept
deterministically red so the CI-fix-agent seeding pipeline has a real
type-error annotation to consume.

The entire "product" is two files:
- `src/greeting.ts` — exports `greeting(name: string): string`, plus the
  deliberately-broken `export const answer: number = 'forty-two';` at line 11
  (string assigned to a `number`-typed binding).
- `package.json` — one script, `typecheck` → `tsc --noEmit`.

There is no runtime entrypoint, no test runner, and no build step. The only
"behavior" this repo has is its typecheck result.

## Rules an agent must not violate

- **Never fix the type error on `main`.** The red build is the fixture, not a
  bug. See ../../README.md and the header comment in `src/greeting.ts`.
- **On a PR branch**, making `npx tsc --noEmit` pass by assigning a numeric
  literal to `answer` at `src/greeting.ts:11` is the expected, in-scope fix —
  that is exactly the behavior resolver-core's CI-fix-agent seeding is
  designed to exercise.
- Fix PRs against this fixture are declined/never merged regardless of
  correctness — see ../../README.md. Don't be surprised if a correct PR is
  closed without merge; that's the fixture working as intended, not a review
  failure.
- Re-provisioning the fixture (if it ever needs regenerating) is done via
  `tests/journeys/scripts/provision-ci-red-fixtures.ts` per the README — that
  script does not exist in this checkout, so treat it as external tooling,
  not something to author here.
