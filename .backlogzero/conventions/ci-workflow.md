---
name: ci-workflow
description: How the single CI job is structured, for anyone touching .github/workflows/ci.yml
type: convention
scope:
  - .github/workflows/**
updated: 2026-09-11 (IONE-959)
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - .github/workflows/ci.yml
  - package.json
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  package.json: 8233427e2dea5f0d0f69945b542cee71e11235b388b01adcae9ee4356b6bddae
---

The `ci` workflow has exactly one job, `typecheck`, with a 5-minute timeout.
It installs with `npm install --no-audit --no-fund` (not `npm ci` — there's
no committed lockfile in this repo) and runs `npx tsc --noEmit` directly
rather than through the `typecheck` npm script; keep both in sync if either
changes (`package.json:7` and `.github/workflows/ci.yml:21`).

`actions/setup-node@v4` is present specifically to register the `tsc`
problem matcher — don't replace it with a bare Node install or swap the
typecheck step for a different invocation (e.g. piping through another tool)
without preserving check-run annotation output, since that's the signal
format downstream tooling consumes.
