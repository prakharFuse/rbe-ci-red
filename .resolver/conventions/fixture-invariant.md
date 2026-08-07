---
name: fixture-invariant
description: Rules for any change touching src/greeting.ts or the CI workflow — this repo must stay red on main
type: convention
scope: global
updated: '2026-08-07'
captured_sha: 7887b9648a33ccc5627d6fae5090e1ad1007b7bb
sources:
  - README.md
  - src/greeting.ts
  - .github/workflows/ci.yml
---

The non-negotiable invariant is stated in `../../README.md`: the type error at `src/greeting.ts:11` must never be fixed on `main`.

## How to apply

- Never open or merge a PR to `main` that changes `src/greeting.ts:11` (`export const answer: number = 'forty-two';`) to a valid `number` literal, removes the line, or otherwise makes `tsc --noEmit` pass.
- The correct minimal fix (`'forty-two'` → a numeric literal) is intentionally obvious and agent-discoverable — that's the point of the fixture — but discoverability is not permission to apply it here.
- If a task legitimately requires exercising the fix (e.g. testing the CI-fix agent loop itself), do it on a disposable branch/PR that is never merged into `main`, and prefer the repo's own re-provisioning path (`tests/journeys/scripts/provision-ci-red-fixtures.ts` in resolver-core) over hand-editing this repo if regeneration is available.
- Do not "clean up" the workflow in `.github/workflows/ci.yml` (e.g. adding lint/test jobs, caching, or matrix builds) — the single `typecheck` job with the `setup-node` problem matcher is deliberately minimal so the annotation signal stays simple and deterministic; see `[[architecture]]`.
