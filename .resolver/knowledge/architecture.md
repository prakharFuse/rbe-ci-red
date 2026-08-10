---
name: architecture
description: The CI flow that produces the deterministic red check-run annotation
type: knowledge
scope: global
updated: 2026-08-10 (IONE-959)
captured_sha: 7887b9648a33ccc5627d6fae5090e1ad1007b7bb
sources:
  - .github/workflows/ci.yml
  - package.json
  - tsconfig.json
---

The repo's only "system" is a single GitHub Actions job. There are no
services, no queues, no databases — just a checkout-and-typecheck pipeline
that is expected to always fail.

```mermaid
flowchart LR
  A[push or pull_request<br/>any branch] --> B[job: typecheck<br/>ubuntu-latest]
  B --> C[actions/checkout@v4]
  C --> D[actions/setup-node@v4<br/>node 20, registers tsc problem matcher]
  D --> E[npm install --no-audit --no-fund]
  E --> F[npx tsc --noEmit]
  F -->|fails on src/greeting.ts:11| G[check-run annotation<br/>path:line:message]
  G --> H[resolver-core CI-fix agent seeding<br/>ciFailureFiles, IONE-1027]
```

Note: CI invokes `npx tsc --noEmit` directly (`.github/workflows/ci.yml:21`),
not the `typecheck` script defined in `package.json:7`. Both run the same
command today, so this isn't a bug — just don't assume the `npm run
typecheck` script is what CI actually calls if you ever change one without
the other.
