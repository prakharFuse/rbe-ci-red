---
name: architecture
description: How the single CI workflow turns the intentional type error into check-run annotations
type: knowledge
scope: global
updated: '2026-09-11'
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - .github/workflows/ci.yml
  - package.json
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  package.json: 8233427e2dea5f0d0f69945b542cee71e11235b388b01adcae9ee4356b6bddae
---

There is no application architecture to speak of — the only "system" is the
CI pipeline itself, which is the fixture's payload.

```mermaid
flowchart LR
  A[git push / pull_request, any branch] --> B[GitHub Actions: ci.yml / typecheck job]
  B --> C[actions/checkout@v4]
  C --> D[actions/setup-node@v4 node 20]
  D --> E[npm install --no-audit --no-fund]
  E --> F[npx tsc --noEmit]
  F -->|main: TS2322 at greeting.ts:11| G[check-run annotation path/line/message]
  F -->|PR branch with number-literal fix| H[CI green]
  G --> I[resolver-core CI-fix agent seeding]
```

The mechanism that turns a plain `tsc` failure into structured
`{path, line, message}` annotations is `actions/setup-node@v4`, which
registers the TypeScript problem matcher before `tsc --noEmit` runs (see the
comment in `.github/workflows/ci.yml`). Without that step, `tsc`'s stderr
output would just be raw log text, not annotations — this is the detail the
README's "check-run annotation" language depends on but doesn't spell out.
