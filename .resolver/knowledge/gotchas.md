---
name: gotchas
description: The line-11 type error is intentional and must never be fixed on main — read before editing src/greeting.ts
type: knowledge
scope: global
updated: 2026-08-10 (IONE-959)
captured_sha: 7887b9648a33ccc5627d6fae5090e1ad1007b7bb
sources:
  - src/greeting.ts
  - README.md
  - .github/workflows/ci.yml
---

`src/greeting.ts:11` — `export const answer: number = 'forty-two';` — is a
deliberate type error (assigning a string literal to a `number`-typed const).
It exists solely to keep the `ci` workflow's `typecheck` job permanently red
with a stable `src/greeting.ts:11` check-run annotation.

**Do not fix this on `main`.** The correct minimal fix (change the literal to
a number, e.g. `42`) is intentionally the *expected* output of a CI-fix agent
under test — but a PR making that fix must never actually merge. See
`../../README.md` for the re-provisioning script if the fixture is ever
deleted by mistake.

If you're asked to work in this repo for any reason other than fixture
maintenance, confirm with the user before changing `src/greeting.ts` at all —
any edit to that file risks moving or removing the annotation the CI-fix
seeding depends on.
