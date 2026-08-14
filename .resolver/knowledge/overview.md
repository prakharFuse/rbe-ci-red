---
name: overview
description: What rbe-ci-red is and why its main branch is deliberately red — read before touching src/greeting.ts or the CI workflow
type: knowledge
scope: global
updated: 2026-08-14 (IONE-959)
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - README.md
  - src/greeting.ts
  - package.json
  - tsconfig.json
---

`rbe-ci-red` is a journey-suite fixture repo (resolver-core spec 014 / j85), not a
real application. Its sole purpose is documented in ../../README.md and
src/greeting.ts:1-6 — see those for the dual-invariant: main stays red, PR
branches are expected to be auto-fixed.

## Gaps not covered by README

- **Mechanism**: the repo is a single TypeScript file (`src/greeting.ts`) plus a
  `tsc --noEmit` check (package.json:7). `tsconfig.json` has `"strict": true`,
  which is what turns `export const answer: number = 'forty-two';`
  (src/greeting.ts:11) into a hard type error rather than a warning.
- **CI annotation path**: `.github/workflows/ci.yml` uses `actions/setup-node@v4`
  specifically so the built-in `tsc` problem matcher is registered, converting
  the compiler error into a GitHub check-run annotation (`{path, line, message}`).
  That annotation is the actual signal resolver-core's CI-fix agent seeding
  consumes — the repo's redness is not just "tests fail", it's structured output.
- **Re-provision script gap**: README.md points to
  `tests/journeys/scripts/provision-ci-red-fixtures.ts` for re-provisioning this
  fixture, but that path does **not** exist in this checkout — it lives in the
  parent resolver-core monorepo that generates/seeds this fixture repo, not in
  `rbe-ci-red` itself. Don't go looking for it here.

See [[ci-fixture-invariants]] for the exact rule on what edits are and aren't
allowed to src/greeting.ts.
