2026-09-17 · first-run · created .backlogzero

- Indexed the repo: a minimal fixture (README.md, package.json, tsconfig.json,
  src/greeting.ts, .github/workflows/ci.yml) whose sole purpose is a
  deterministic TypeScript type error at src/greeting.ts:11 that keeps `main`
  red in CI, per resolver-core spec 014 / j85.
- No CLAUDE.md/AGENTS.md/.cursor rules exist in the repo; README.md is the
  only user-owned doc and its claims (error location, intent, PR-fix
  expectations) all check out against the code — no divergences found.
- Wrote knowledge/overview.md (the invariant + do-not-modify list),
  knowledge/architecture.md (mermaid flow of push/PR → tsc → check-run
  annotation), and conventions/fixture-integrity.md (rules for any future
  change so it doesn't break the fixture's determinism).
- Skipped knowledge/data-model.md — no database or schema in this repo.
