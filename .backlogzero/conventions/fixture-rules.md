---
name: fixture-rules
description: Hard rules for editing this fixture repo — what must stay broken, what must stay unmerged
type: convention
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

Never "fix" `src/greeting.ts:11` on `main`. The type error there is the
fixture's whole purpose — a deterministically red `main` build with a
predictable check-run annotation.

**Why:** the annotation from that specific line/error is what the
resolver-core CI-fix agent seeding is calibrated against (see
[[overview]] and [[architecture]]). A green `main` breaks the fixture for
every consumer of it.

**How to apply:** on a PR branch, the one acceptable change to
`src/greeting.ts:11` is replacing the string literal with a number literal
(e.g. `42`) — nothing else about the file should change. Any PR that does
this is expected to go green in CI and then be **declined, never merged** —
don't treat a passing PR-branch CI run here as a signal to merge.
