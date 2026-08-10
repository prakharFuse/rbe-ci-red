---
name: ci-fixture-rules
description: Branch-dependent rule for the deliberate type error in src/greeting.ts — what counts as a correct fix and where it's allowed
type: convention
scope: global
updated: '2026-08-10'
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - README.md
  - src/greeting.ts
---

`src/greeting.ts:11` (`export const answer: number = 'forty-two';`) is a dual-invariant fixture, stated in README.md and reiterated in the file's own header comment:

- **On `main`**: leave it red. Never change this line, never widen the type, never delete the export on `main`. The failing `tsc --noEmit` is the expected, permanent state of `main`.
- **On a PR branch**: an automated CI-fix agent making CI pass IS the expected behavior. The correct minimal fix is replacing the string literal with a number literal (e.g. `42`), not changing the declared type or removing the export. Fix PRs made this way are declined/never merged — the branch existing and going green is the test signal, not the merge.

If you're asked to "fix CI" in this repo, first check which branch you're on: fixing `main` directly contradicts the fixture's purpose (README.md:7). Fixing a PR branch by assigning a number literal is the intended, expected action (README.md:8-10).

Re-provisioning source: `tests/journeys/scripts/provision-ci-red-fixtures.ts` (referenced in README.md:12, not present in this checkout — it lives in the resolver-core test harness, not this repo).
