# Repository Purpose

- This repository is a **test fixture** for resolver-core's CI-fix-agent seeding pipeline (spec 014/j85), not a real application. See README.md for the canonical statement of intent.
- The entire codebase is `src/greeting.ts` (exports `greeting(name: string): string`) and `package.json` (single `typecheck` script running `tsc --noEmit`). There is no test runner, build step, or runtime entrypoint — don't add one.

# The Intentional Type Error — Scope Discipline

- `src/greeting.ts:11` deliberately assigns a string literal to a `number`-typed binding (`export const answer: number = 'forty-two';`), causing `main` to fail `tsc --noEmit` on purpose. This red build is the fixture, not a bug.
- Never fix this error on `main`.
- On a PR branch, the expected and in-scope fix is replacing the string literal at `src/greeting.ts:11` with a number literal (e.g. `42`) — nothing else. Don't change the fix shape (no `let`, no union type, no `as number` cast, no deleting the export) even though those would also make `tsc --noEmit` pass.
- If asked to "fix CI" on `main` specifically, treat that as out of scope and flag it rather than editing the file.
- Fix PRs against this fixture are routinely declined/never merged regardless of correctness — a closed PR here is the fixture working as intended, not a review failure.

# Things Not To Touch

- Don't modify `.github/workflows/ci.yml`. Its `setup-node@v4` step exists solely to register the `tsc` problem matcher so `tsc --noEmit` failures surface as structured check-run annotations (`{path, line, message}`) — that annotation is the actual payload the fixture produces, and the resolver-core pipeline depends on it.
- Don't add tests, linting, a build step, or other tooling "to improve" this repo — it intentionally has none beyond `typecheck`, and extra tooling would break the fixture's determinism.
- Re-provisioning this fixture is done externally via `tests/journeys/scripts/provision-ci-red-fixtures.ts`, which does not exist in this checkout — don't attempt to author it here.
