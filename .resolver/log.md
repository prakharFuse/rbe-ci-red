2026-08-10 · first-run · created .resolver

Indexed the full repo (2 source files, no tests, no lint config). Wrote:
- knowledge/overview.md — what the repo is, pointing to README.md for the fixture's purpose
- knowledge/gotchas.md — the line-11 type error invariant (never fix on main)
- knowledge/architecture.md — Mermaid flow of the CI typecheck job that produces the red annotation, plus a divergence note (CI calls `npx tsc --noEmit` directly, not the `npm run typecheck` script)
- conventions/typescript.md — tsconfig strictness settings and why they matter for the fixture
