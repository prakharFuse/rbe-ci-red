---
name: architecture
description: Shape of the CI pipeline this fixture drives — how a push/PR turns the type error into a consumable check-run annotation
type: knowledge
scope: global
updated: '2026-09-11'
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - .github/workflows/ci.yml
  - src/greeting.ts
  - package.json
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  package.json: 8233427e2dea5f0d0f69945b542cee71e11235b388b01adcae9ee4356b6bddae
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
---

There's no service/module architecture here — the only "system" this repo has
is the single CI job it triggers. Diagram derived from `.github/workflows/ci.yml`:

```mermaid
flowchart TD
    A[push to any branch / pull_request] --> B[job: typecheck<br/>ubuntu-latest, 5 min timeout]
    B --> C[actions/checkout@v4]
    C --> D[actions/setup-node@v4<br/>node 20 — registers tsc problem matcher]
    D --> E[npm install --no-audit --no-fund]
    E --> F[npx tsc --noEmit]
    F -->|src/greeting.ts:11 type error| G[check-run annotation<br/>path, line, message]
    G --> H[external: resolver-core CI-fix<br/>agent seeding consumes annotation]
```

Non-obvious edges:
- `setup-node@v4` isn't just a Node install step — its side effect of registering
  the built-in tsc problem matcher is *why* this fixture works at all: it's what
  turns a plain `tsc` stderr line into a structured `{path, line, message}`
  check-run annotation (see the inline comment in ci.yml:14-16).
- `F -> G` is unconditional on `main` (line 11 always fails there); on a PR
  branch it only fires if `answer` still isn't a `number` literal — see
  [[repo-rules]] for the expected fix.
- Node H is outside this repo entirely — nothing here calls or is called by it;
  it's included only because it's the reason the pipeline exists.
