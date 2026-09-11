---
name: overview
description: What this repo is and isn't — read before touching src/greeting.ts or ci.yml
type: knowledge
scope: global
updated: 2026-09-11 (IONE-959)
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - package.json
  - README.md
  - src/greeting.ts
sources_sha256:
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  package.json: 8233427e2dea5f0d0f69945b542cee71e11235b388b01adcae9ee4356b6bddae
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
---

This repo is a single-purpose CI fixture, not an application. See ../../README.md
for the full rules (main must stay red, PR-branch CI-fix agents are expected to
patch `src/greeting.ts:11`, fix PRs are declined/never merged). Don't restate
those rules elsewhere — link back to the README instead.

Derived facts not stated in the README:

- The entire package surface is `src/greeting.ts` (one function, `greeting`,
  plus the deliberately-mistyped `answer` export) and `package.json`. There is
  no other source, no test runner, and no `tests/` directory in this checkout.
- `package.json` declares exactly one script (`typecheck`) and one
  `devDependency` (`typescript@5.6.3`). There's no lint, build, or test
  script — don't assume any exist when writing automation against this repo.
- No `package-lock.json` is committed, so `npm install` in CI resolves
  `typescript` fresh each run rather than from a lockfile.
- The README's "Re-provision" pointer
  (`tests/journeys/scripts/provision-ci-red-fixtures.ts`) refers to a path
  that lives in the parent monorepo/harness that generates this fixture, not
  to anything inside this checkout — don't search for it here.
