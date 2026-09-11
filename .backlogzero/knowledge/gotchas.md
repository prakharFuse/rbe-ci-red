---
name: gotchas
description: Hard constraints for any agent working in this repo — what never to change and why
type: knowledge
scope: global
updated: 2026-09-11 (IONE-959)
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - README.md
  - src/greeting.ts
  - .github/workflows/ci.yml
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
---

- **Never fix `src/greeting.ts:11` on `main`.** `answer: number = 'forty-two'`
  is the deliberate type error; removing or correcting it breaks the fixture's
  entire purpose. See `../../README.md` for the full rule.
- **The expected PR-branch fix is a number literal**, not a rename, type
  widening, `@ts-ignore`, or removing the `answer` export. Any of those would
  "pass" CI without exercising the intended minimal-fix behavior the journey
  tests for.
- **Fix PRs against this repo are meant to be declined, never merged** — if
  asked to open or merge one, treat that as out of scope rather than a normal
  review request.
- **There is no test suite to run locally.** `npm run typecheck` is the only
  script (`package.json:7`); don't add a test runner or framework as part of
  unrelated work here — it's outside this fixture's intended shape.
- `tests/journeys/scripts/provision-ci-red-fixtures.ts` (referenced in the
  README as the re-provisioning script) is **not present in this repo's
  working tree** — it lives elsewhere in the monorepo this fixture was
  extracted from. Don't assume it exists here.
