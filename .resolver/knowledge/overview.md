---
name: overview
description: What rbe-ci-red is and why its CI is deliberately broken — read before touching src/greeting.ts or the ci workflow
type: knowledge
scope: global
updated: 2026-08-10 (IONE-959)
captured_sha: 7887b9648a33ccc5627d6fae5090e1ad1007b7bb
sources:
  - README.md
  - src/greeting.ts
  - .github/workflows/ci.yml
  - package.json
---

Purpose and provisioning story are covered in `../../README.md` — this is a
journey-suite fixture for resolver-core spec 014 (CI auto-fix hardening), not
a real application.

## The invariant (gap: README doesn't spell out the exact mechanics)

`src/greeting.ts:11` is:

```ts
export const answer: number = 'forty-two';
```

This is a type mismatch (`string` assigned to a `number`-typed const), not a
syntax error — `tsc --noEmit` (the only script in `package.json`) fails on it
deterministically, on every branch and PR (`.github/workflows/ci.yml` has no
path filters).

- The single exported function, `greeting(name: string): string` at
  `src/greeting.ts:7`, is unrelated to the failure — it is valid, unused-by-CI
  boilerplate that exists only to make the file look like real source.
- The minimal correct fix is changing the string literal to a numeric literal
  (e.g. `42`). Do not do this on `main` — see
  `../conventions/fixture-invariants.md`.
- There are no tests and no `src/` files besides `greeting.ts`. Do not add a
  test suite, linter, or second module "to make the repo more real" — that
  would dilute the single stable failure signal the fixture exists to produce.
