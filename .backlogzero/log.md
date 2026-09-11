2026-09-11 · first-run · created .backlogzero

- Indexed a minimal single-file fixture repo (`rbe-ci-red`): one TS module,
  one CI workflow, no tests, no lockfile.
- README.md already states the core rule (main stays red; PR-branch fixes
  expected but declined) — cited by pointer rather than duplicated.
- Added knowledge pages for overview, architecture (mermaid of the
  push → tsc → check-run-annotation flow), and gotchas (hard constraints
  for agents, including the missing provisioning script reference).
- Added one convention page for the CI workflow's install/typecheck details
  not covered by the README.
- Skipped knowledge/data-model.md — no database or schema in this repo.
