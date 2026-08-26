2026-08-26 · first-run · created .resolver

- Added knowledge/overview.md — repo purpose pointers, isolated-export fact, and the missing re-provisioning script gap.
- Added knowledge/architecture.md — Mermaid flowchart of the CI pipeline (push/PR → typecheck job → annotation → external agent seeding), plus the package.json-script-vs-workflow-call divergence-risk note.
- Added conventions/ci-fix-scope.md — the boundary between the intended minimal fix and other edits that would also pass `tsc --noEmit`, and files a CI-fix must not touch.
