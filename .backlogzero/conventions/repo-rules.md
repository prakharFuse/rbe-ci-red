---
name: repo-rules
description: The dual-invariant rule for this fixture — what an agent is and isn't allowed to change, and where
type: convention
scope: global
updated: 2026-09-10 (IONE-959)
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - README.md
  - src/greeting.ts
sources_sha256:
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
---

The core rule is stated in `../../README.md` and the header comment of `../../src/greeting.ts` — read those first. This page adds the operational detail those docs leave implicit.

- On `main`, do not touch `src/greeting.ts:11` (the `answer: number = 'forty-two'` line) or anything else that would make `npx tsc --noEmit` pass. The red build is the fixture's product, not a bug.
- On a PR branch, the only expected/allowed change is minimal: replace the string literal `'forty-two'` with a number literal (e.g. `42`) at that same line. No other production-code edit is in scope for this fixture.
- Fix PRs are always declined and never merged (per README.md) — a merge or approval is not a valid signal that a fix was "correct"; passing `npm run typecheck` is the only signal that matters.
- There is no lint config and no test suite to satisfy (see `../knowledge/overview.md`) — don't add one speculatively; it's outside this fixture's scope.
