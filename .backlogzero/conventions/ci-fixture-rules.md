---
name: ci-fixture-rules
description: Constraints on how to touch this repo's code — what counts as an in-scope fix vs. an out-of-scope change
type: convention
scope: global
updated: 2026-09-17 (IONE-959)
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - README.md
  - src/greeting.ts
sources_sha256:
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
---

This repo has no normal "coding standards" — it's a minimal fixture, and the
only convention that matters is scope discipline around the intentional
error in `src/greeting.ts`.

- **The only sanctioned fix shape** is replacing the string literal at
  `src/greeting.ts:11` with a number literal (e.g. `42`), and only on a PR
  branch, never on `main`. Don't refactor the line into a different type
  (`let`, union type, `as number` cast, deleting the export) — those change
  what the fixture is testing even if they also make `tsc --noEmit` pass.
- Don't add tests, a build step, linting, or other tooling to "improve" this
  repo — it intentionally has none beyond `typecheck` (see `package.json`).
  Extra tooling changes what CI reports and would break the fixture's
  determinism.
- Don't touch `.github/workflows/ci.yml` — the `setup-node` problem-matcher
  registration and the `tsc --noEmit` invocation are load-bearing for how the
  resolver-core seeding pipeline consumes the failure (see
  [[architecture]]).
- If asked to "fix CI" on `main` in this repo specifically, that request is
  almost certainly out of scope per ../../README.md — flag it rather than
  editing `src/greeting.ts:11` on `main`.
