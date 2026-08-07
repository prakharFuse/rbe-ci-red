---
name: overview
description: What rbe-ci-red is and the one invariant that must never be broken
type: knowledge
scope: global
updated: 2026-08-07 (IONE-959)
captured_sha: 7887b9648a33ccc5627d6fae5090e1ad1007b7bb
sources:
  - README.md
  - src/greeting.ts
  - package.json
---

`rbe-ci-red` is a **journey-suite fixture**, not a real application — see
`../../README.md` for the full rationale (resolver-core spec 014 / journey
j85, CI auto-fix hardening).

The entire repo is two source files (`src/greeting.ts`, one exported
function) plus a TS config and a CI workflow whose sole job is to fail
deterministically.

## The one hard invariant

`src/greeting.ts:11` is:

```ts
export const answer: number = 'forty-two';
```

This is a **deliberate** type error (assigning a `string` literal to a
`number`-typed const). It must stay red on `main` — do not "fix" it by
changing the annotation to `string`, removing the annotation, or changing
the value's type. The only fix a CI-fix agent should ever propose is
changing the literal to a number (e.g. `42`), and per the README such a fix
PR must never actually be merged into this fixture repo. If you are working
in this repo as a CI-fix agent under test, treat any drift on this line as
a bug in the harness, not something to silently correct.

To re-provision this fixture from scratch, resolver-core exposes
`tests/journeys/scripts/provision-ci-red-fixtures.ts` (lives in the
resolver-core repo, not here).
