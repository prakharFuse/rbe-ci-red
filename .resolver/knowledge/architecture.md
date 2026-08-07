---
name: architecture
description: How the single CI workflow turns the deliberate type error into a check-run annotation
type: knowledge
scope: global
updated: 2026-08-07 (IONE-959)
captured_sha: 7887b9648a33ccc5627d6fae5090e1ad1007b7bb
sources:
  - .github/workflows/ci.yml
  - tsconfig.json
  - src/greeting.ts
---

There is no runtime architecture — this repo is a single CI pipeline whose only job is to fail deterministically at a known location.

```mermaid
flowchart LR
    A[push or pull_request<br/>any branch] --> B[job: typecheck<br/>ubuntu-latest, 5min timeout]
    B --> C[actions/checkout@v4]
    C --> D[actions/setup-node@v4<br/>node 20, registers tsc problem matcher]
    D --> E[npm install --no-audit --no-fund]
    E --> F[npx tsc --noEmit]
    F --> G[TS2322 error at<br/>src/greeting.ts:11]
    G --> H[check-run annotation<br/>path:line:message]
```

Only `typecheck` runs — there is no build, test, or deploy job in `.github/workflows/ci.yml`. The `setup-node` step's problem matcher is what converts the raw `tsc` stderr line into a structured GitHub check-run annotation (`path`, `line`, `message`); this annotation is the consumable signal, not the workflow's exit code alone.
