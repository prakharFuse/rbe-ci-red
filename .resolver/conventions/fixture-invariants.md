---
name: fixture-invariants
description: Rules for working in this repo without destroying the deliberately-red CI fixture — read before any commit touching src/greeting.ts, ci.yml, or package.json
type: convention
scope: global
updated: 2026-08-10 (IONE-959)
captured_sha: 7887b9648a33ccc5627d6fae5090e1ad1007b7bb
sources:
  - README.md
  - src/greeting.ts
  - .github/workflows/ci.yml
---

`../../README.md` already states the top-level rule: do not fix the type
error on `main`. This page covers what that means operationally, since the
repo has no `CLAUDE.md`/`AGENTS.md` to spell it out.

## What "do not fix on main" actually constrains

- Never edit `src/greeting.ts:11` (the `answer` literal) on `main`, and never
  merge a PR that does. A branch created to exercise or test the auto-fix
  loop may apply the fix (e.g. `answer: number = 42`), but that branch's PR
  must not be merged back to `main`.
- Never add `path`/`branches` filters to `.github/workflows/ci.yml` that
  would stop the workflow running on a push or PR — the fixture's value is
  that it fails unconditionally.
- Never reorder or remove the `actions/setup-node@v4` step relative to the
  `tsc --noEmit` step — the problem-matcher annotation this fixture exists to
  produce depends on `setup-node` running first (see
  `../knowledge/architecture.md`).
- Never change the line number of the deliberate error inside
  `src/greeting.ts` without also updating anything downstream that pins
  `src/greeting.ts:11` literally (this repo has no such references itself,
  but resolver-core's provisioning script and journey tests, referenced in
  the README, do).

## What is safe to change

- Unrelated additions (new files, new scripts) that don't touch the three
  files above and don't add a competing CI job are low-risk, but think twice
  before adding anything — per `../knowledge/overview.md`, extra surface
  area dilutes the single stable failure signal this repo is provisioned
  for.
