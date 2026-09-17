---
name: architecture
description: How the single CI job turns the intentional type error into a check-run annotation — read before editing the workflow or build config
type: knowledge
scope: global
updated: '2026-09-17'
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - .github/workflows/ci.yml
  - package.json
  - tsconfig.json
  - src/greeting.ts
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  package.json: 8233427e2dea5f0d0f69945b542cee71e11235b388b01adcae9ee4356b6bddae
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
  tsconfig.json: b3433dd8b2ee73252b402dc6964bbd0b8fd3e34802fd0750c24a884501678da9
---

The repo has one moving part: a single GitHub Actions job that typechecks the
one source file.

```mermaid
flowchart LR
    A[push or pull_request\nany branch] --> B[ci workflow\n.github/workflows/ci.yml]
    B --> C[actions/checkout]
    C --> D[actions/setup-node\nregisters tsc problem matcher]
    D --> E[npm install]
    E --> F[npx tsc --noEmit]
    F -->|type error at\nsrc/greeting.ts:11| G[check-run annotation\npath, line, message]
    G --> H[CI-fix agent under test]
```

Notes on non-obvious edges:

- `actions/setup-node@v4` (ci.yml:17-19) is what registers the built-in `tsc`
  problem matcher — without it, `tsc`'s stderr output would just be plain
  text in the log instead of structured `{path, line, message}` check-run
  annotations. That structured annotation is the actual interface the
  external CI-fix agent consumes, per the comment at ci.yml:14-16.
- `npx tsc --noEmit` (ci.yml:21) duplicates the `typecheck` script defined in
  package.json:7 rather than invoking `npm run typecheck` — if you ever
  consolidate these, keep the flags (`--noEmit`) identical so behavior
  doesn't change.
- The workflow triggers on push to `branches: ['**']` (ci.yml:5) and on all
  pull requests, so both the "main stays red" and "PR branch gets fixed"
  invariants in [[overview]] run through this same single job definition —
  there is no branch-conditional logic in the workflow itself.
