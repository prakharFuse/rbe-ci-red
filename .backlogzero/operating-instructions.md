# Purpose

- This repository is a test fixture, not an application. Its sole job is to keep `npm run typecheck` (`tsc --noEmit`) failing with one deterministic error, giving an external CI-fix agent under test a reproducible red build to react to.

# The core invariant — do not break

- `src/greeting.ts:11` (`export const answer: number = 'forty-two';`) must keep failing type-checking under `tsconfig.json`'s `strict: true`.
- On `main`: never change this line, never relax `strict`, never change `answer`'s declared type. Any of these silently "fixes" the fixture and defeats its purpose.
- On a PR branch: an automated fix that replaces the string literal with a numeric literal (e.g. `42`) and changes nothing else is the correct, expected, in-scope behavior — it's the exact signal this fixture exists to elicit, not something to prevent or revert.
- Fix PRs against this repo are never merged, by design — don't merge one in an attempt to "clean up".

# Do not modify

- `src/greeting.ts` — carries the intentional type error.
- `tsconfig.json` — `strict: true` is required for the error to surface.
- `.github/workflows/ci.yml` — the `setup-node` step's problem matcher is what converts the raw `tsc` failure into the check-run annotation the fix-agent consumes.

# Scope constraints

- Keep the repo to a single source file (`src/greeting.ts`) plus the minimum tooling to typecheck it. Don't add source files, tests, or dependencies — more surface area makes the fixture's signal ambiguous.
- No `package-lock.json` is committed, consistent with there being only one pinned devDependency (`typescript@5.6.3`). If you add a dependency, reconsider whether a lockfile is now needed, since drift would undermine the "deterministic" part of the fixture.
- `tests/journeys/scripts/provision-ci-red-fixtures.ts` (referenced by README.md for re-provisioning) lives in an external harness repo, not here — don't search for it in this repository.

# CI mechanics

- The workflow triggers on push to every branch (`branches: ['**']`) and on all pull requests, running the same single job with no branch-conditional logic.
- CI invokes `npx tsc --noEmit` directly rather than `npm run typecheck`, even though they're equivalent today — if you ever consolidate them, keep the `--noEmit` flag so behavior doesn't change.
- The install step is `npm install --no-audit --no-fund`.