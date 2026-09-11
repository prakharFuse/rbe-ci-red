---
name: architecture
description: The CI pipeline shape — the only "system" this repo has
type: knowledge
scope: global
updated: 2026-09-11 (IONE-959)
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - .github/workflows/ci.yml
  - package.json
  - src/greeting.ts
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  package.json: 8233427e2dea5f0d0f69945b542cee71e11235b388b01adcae9ee4356b6bddae
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
---

There's no runtime architecture — this repo has one workflow and one source
file. The diagram below is the entire pipeline, derived from
`.github/workflows/ci.yml`.

```mermaid
flowchart LR
    A[push to any branch, or pull_request] --> B[job: typecheck\nubuntu-latest, 5 min timeout]
    B --> C[actions/checkout@v4]
    C --> D[actions/setup-node@v4\nnode-version 20]
    D --> E[npm install --no-audit --no-fund]
    E --> F["npx tsc --noEmit\n(src/greeting.ts)"]
    F -->|fails on main| G[check-run annotation\npath/line/message]
    G --> H[external resolver-core\nCI-fix agent seeding]
    F -->|expected to pass on PR branches\nafter agent fix| I[CI green]
```

The only non-obvious edge: `setup-node@v4` registers the built-in tsc problem
matcher (noted in a comment in `ci.yml`), which is what turns a raw compiler
error into a structured check-run annotation — that annotation, not the raw
`tsc` stdout, is the signal the external CI-fix agent seeding actually
consumes.
