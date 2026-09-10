2026-09-10 · first-run · created .backlogzero

- Indexed a minimal (2-file) journey fixture repo whose sole purpose is a deterministically-red `main` CI build (README.md, src/greeting.ts).
- Wrote knowledge/overview.md covering the fixture's purpose and the injected type error at src/greeting.ts:11.
- Wrote knowledge/architecture.md with a Mermaid flowchart of the CI pipeline (push/PR → GitHub Actions → tsc → check-run annotation) since that pipeline is the repo's only real "system".
- Skipped knowledge/data-model.md — no database or schema files in the repo.
- Wrote conventions/ci-fixture-conventions.md capturing the main-vs-PR-branch behavior split already stated in README.md, to keep it front-of-mind for future agents that might reflexively "fix" the red build.
