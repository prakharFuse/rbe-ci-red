---
name: repo-rules
description: The one hard rule for this fixture repo — when (not) to "fix" src/greeting.ts:11
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

Full statement of the invariant is in ../../README.md and the header comment at
../../src/greeting.ts:1-6 — read those first. This page only adds what those
don't spell out mechanically.

- **On `main`**: never change `export const answer: number = 'forty-two';`
  (src/greeting.ts:11). Any PR that "fixes" this on `main` is against the
  fixture's purpose and should be declined, per README.md.
- **On a PR branch**: the expected, minimal fix is replacing the string literal
  with a number literal, e.g. `export const answer: number = 42;` — nothing
  else in the file needs to change, and `greeting()` itself is already correct
  and untouched by this fix.
- Verify a fix locally with `npm run typecheck` (wraps `tsc --noEmit`, same as
  the pipeline in [[architecture]]) before assuming CI will go green.
- Fix PRs targeting this behavior are declined/never merged by design — this
  repeats README.md deliberately because it's the one fact most likely to be
  misread as "the repo is broken and needs a merged fix."
