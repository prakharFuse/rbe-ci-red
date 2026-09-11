---
name: ci-red-fixture-invariant
description: The one rule that governs any change to this repo — read before editing src/greeting.ts or the CI workflow
type: convention
scope: global
updated: '2026-09-11'
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

Full statement is in ../../README.md and the header comment at `src/greeting.ts:1-6` — cite those, don't restate them.

## Operational consequences not spelled out in the README

- On `main`: `src/greeting.ts:11` must keep `answer: number = 'forty-two';` (or any other value whose type fails `strict` checking against `number`). Never "fix" this on main — a green `main` breaks the fixture's purpose.
- On a PR branch: the expected minimal diff is replacing the string literal with a numeric literal, e.g. `answer: number = 42;`. Any other change (loosening `tsconfig.json`'s `strict` flag, deleting the `answer` export, changing its type annotation) is not the fix under test, even though it would also make `tsc --noEmit` pass — it's testing that the CI-fix agent produces the *minimal* type-correct fix, not just *a* type-correct fix.
- Fix PRs opened against this repo are declined and never merged, by design — don't merge one, and don't treat a still-open fix PR as unfinished work needing follow-up.
- Because this repo is itself the fixture, no `.backlogzero` guidance here should ever recommend editing `src/greeting.ts` or `.github/workflows/ci.yml` on `main`.
