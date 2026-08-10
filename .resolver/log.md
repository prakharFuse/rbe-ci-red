2026-08-10 · first-run · created .resolver

- Indexed repo: single fixture package (`rbe-ci-red`) with one deliberately
  red typecheck CI job.
- Read `README.md`, `.github/workflows/ci.yml`, `tsconfig.json`,
  `package.json`, `src/greeting.ts`. No `CLAUDE.md`/`AGENTS.md`/`.cursor`
  files exist in this repo.
- Wrote `knowledge/overview.md` (fixture purpose + exact invariant at
  `src/greeting.ts:11`), `knowledge/architecture.md` (Mermaid flowchart of
  the push→annotation pipeline), `conventions/fixture-invariants.md`
  (what must never change and why).
- No database in the repo — skipped `knowledge/data-model.md` per
  instructions.
