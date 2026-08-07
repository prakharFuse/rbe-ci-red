---
name: gotchas
description: The one operating rule for this repo — do not fix the intentional error, and what "correct" looks like if asked to
type: knowledge
scope: global
updated: 2026-08-07 (IONE-959)
captured_sha: 7887b9648a33ccc5627d6fae5090e1ad1007b7bb
sources:
  - src/greeting.ts
  - README.md
---

`src/greeting.ts:11` — `export const answer: number = 'forty-two';` — is a deliberate type error (TS2322: string literal assigned to a `number`-typed const). This is the entire point of the repo: it must keep failing `npm run typecheck` / the `ci` workflow on `main`.

- **Never merge a fix to `main`.** If a task here asks you to "fix CI" or "fix the type error," the code-correct minimal fix is changing line 11's literal to a number (e.g. `42`) or changing the annotation to `string` — but per `README.md` that fix must never land on `main`. Treat any such request as exercising a CI-fix agent in a disposable branch/PR context, not as real repo maintenance.
- `answer` is unused elsewhere in the codebase (`greeting` is the only other export, and nothing imports `answer`) — so the error has zero blast radius on runtime behavior, only on `tsc --noEmit`.
- If this fixture is ever deleted or corrupted, README.md notes it's safe to re-provision via `tests/journeys/scripts/provision-ci-red-fixtures.ts` in `resolver-core` (external repo, not present here).
