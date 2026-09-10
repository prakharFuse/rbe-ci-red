---
name: architecture
description: The repo's only real workflow — the CI typecheck pipeline and how its failure is surfaced
type: knowledge
scope: global
updated: 2026-09-10 (IONE-959)
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - .github/workflows/ci.yml
  - README.md
  - src/greeting.ts
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
---

There are no services or modules in this repo beyond the CI pipeline itself and the single file it type-checks.

```mermaid
flowchart LR
  A[push or pull_request event] --> B["actions/checkout@v4"]
  B --> C["actions/setup-node@v4 (node 20)"]
  C --> D["npm install --no-audit --no-fund"]
  D --> E["npx tsc --noEmit"]
  E -->|main: fails at src/greeting.ts:11| F[check-run annotations]
  E -->|PR branch: number literal assigned| G[CI passes]
  F -.consumed by.-> H[(external resolver-core CI-fix agent)]
```

`actions/setup-node` registers the `tsc` problem matcher (see the comment above it in `../../.github/workflows/ci.yml`), which is what turns raw `tsc` stderr into structured `{path, line, message}` check-run annotations — that's the signal node `F` represents, and it's what the external CI-fix agent (node `H`, not part of this repo) reads.

The `main` and PR-branch outcomes (`F` vs `G`) are two paths through the same job, not two different workflows — see `../../README.md` for which one is expected on which branch.
