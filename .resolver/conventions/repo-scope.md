---
name: repo-scope
description: What kinds of changes are in-scope vs. out-of-scope for this fixture repo
type: convention
scope: global
updated: 2026-08-07 (IONE-959)
captured_sha: 7887b9648a33ccc5627d6fae5090e1ad1007b7bb
sources:
  - package.json
  - README.md
---

This repo has no product code to extend — `src/greeting.ts` is the entire surface area, and its only purpose is to keep `tsc --noEmit` red (see [../knowledge/gotchas.md](../knowledge/gotchas.md)).

- Do not add dependencies, scripts, tests, or lint config unless a task explicitly calls for expanding the fixture itself (e.g. adding a second deliberately-broken file). `package.json` intentionally has one dependency (`typescript@5.6.3`) and one script (`typecheck`).
- Do not add a `build`, `test`, or `lint` job to `.github/workflows/ci.yml` — the single `typecheck` job is intentional and matches what the fixture is designed to exercise.
- Any change to `src/greeting.ts:11` that removes the type error is out of scope for `main` — see [../knowledge/gotchas.md](../knowledge/gotchas.md).
