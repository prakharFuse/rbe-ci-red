---
name: architecture
description: Shape of the CI flow that turns the deliberate type error into a check-run annotation
type: knowledge
scope: global
updated: '2026-08-07'
captured_sha: 7887b9648a33ccc5627d6fae5090e1ad1007b7bb
sources:
  - .github/workflows/ci.yml
  - package.json
  - tsconfig.json
---

```mermaid
flowchart LR
    A[push or pull_request<br/>any branch] --> B[ci workflow: typecheck job]
    B --> C[actions/checkout@v4]
    C --> D[actions/setup-node@v4<br/>node 20, registers tsc problem matcher]
    D --> E[npm install --no-audit --no-fund]
    E --> F[npx tsc --noEmit]
    F -->|"src/greeting.ts:11 type error"| G[check-run annotation<br/>path:line:message]
    G --> H[resolver-core CI-fix agent seeding<br/>consumes ciFailureFiles]
```

There is a single job (`typecheck`) and no other CI stage — no test job, no deploy job, no matrix. The `setup-node` step is load-bearing: it registers the `tsc` problem matcher that GitHub Actions uses to turn stderr output into structured annotations, which is the actual signal resolver-core's seeding depends on (see `README.md`). Without that step the same `tsc` failure would still redden the job but wouldn't produce a `path:line` annotation.
