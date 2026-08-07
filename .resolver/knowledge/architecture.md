---
name: architecture
description: How the CI workflow turns the deliberate type error into a consumable annotation
type: knowledge
scope: global
updated: 2026-08-07 (IONE-959)
captured_sha: 7887b9648a33ccc5627d6fae5090e1ad1007b7bb
sources:
  - .github/workflows/ci.yml
  - tsconfig.json
  - src/greeting.ts
---

There is no runtime architecture — one workflow, one job, one failing
command.

```mermaid
flowchart LR
    A[push / pull_request<br/>any branch] --> B[ci workflow: typecheck job]
    B --> C[actions/checkout@v4]
    C --> D[actions/setup-node@v4<br/>registers tsc problem matcher]
    D --> E[npm install]
    E --> F[npx tsc --noEmit]
    F -->|fails on src/greeting.ts:11| G[check-run annotation<br/>path + line + message]
    G --> H[resolver-core CI-fix agent seeding<br/>ciFailureFiles, IONE-1027]
```

`tsconfig.json` scopes `include` to `src` only and runs with `strict: true`
and `noEmit: true`, so `tsc --noEmit` (`package.json`'s `typecheck` script)
is the only thing that ever runs — there is no build, bundle, or test step
in this repo.

The setup-node problem matcher (`.github/workflows/ci.yml`) is what turns
the raw `tsc` stderr line into a structured GitHub check-run annotation;
that annotation, not the raw log, is the signal resolver-core's CI-fix agent
seeding consumes.
