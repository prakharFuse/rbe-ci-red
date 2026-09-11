---
name: architecture
description: Shape of the CI pipeline that gates this repo — read before editing .github/workflows/ci.yml
type: knowledge
scope: global
updated: 2026-09-11 (IONE-959)
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - .github/workflows/ci.yml
  - package.json
  - tsconfig.json
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  package.json: 8233427e2dea5f0d0f69945b542cee71e11235b388b01adcae9ee4356b6bddae
  tsconfig.json: b3433dd8b2ee73252b402dc6964bbd0b8fd3e34802fd0750c24a884501678da9
---

There is no runtime architecture — the repo ships one library function. The
only "system" worth diagramming is the CI pipeline itself, since that pipeline
is the fixture's actual subject matter.

```mermaid
flowchart TD
  A[push or pull_request<br/>any branch] --> B[job: typecheck<br/>ubuntu-latest]
  B --> C[actions/checkout@v4]
  C --> D[actions/setup-node@v4<br/>node 20, registers tsc problem matcher]
  D --> E[npm install --no-audit --no-fund]
  E --> F[npx tsc --noEmit]
  F -->|src/greeting.ts:11 type error on main| G[check-run annotation<br/>path/line/message]
```

- `actions/setup-node@v4` is what turns raw `tsc` stderr into GitHub check-run
  annotations (`{path, line, message}`) — this is the signal the resolver-core
  CI-fix agent seeding consumes, per the comment in ci.yml:14-16. If you ever
  swap the Node setup action or drop `setup-node`, you lose that annotation
  and the fixture stops working even though `tsc` still fails.
- `tsconfig.json` sets `noEmit: true`, so `tsc --noEmit` is both the typecheck
  and the only build-like step; there is no compiled output artifact anywhere
  in this pipeline.
