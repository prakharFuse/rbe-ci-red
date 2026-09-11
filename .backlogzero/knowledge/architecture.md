---
name: architecture
description: Shape of the repo's single CI pipeline and its one source module
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

There is no runtime architecture — one module, one CI job.

```mermaid
flowchart LR
    A[push or pull_request] --> B[job: typecheck]
    B --> C[actions/checkout@v4]
    C --> D[actions/setup-node@v4 node 20]
    D --> E[npm install --no-audit --no-fund]
    E --> F[npx tsc --noEmit]
    F -->|main: src/greeting.ts:11 fails| G[check-run annotation: red]
    F -->|PR branch with numeric-literal fix| H[check-run: green]
```

`setup-node@v4` registers the built-in `tsc` problem matcher (`.github/workflows/ci.yml:14-16`), which is what turns the `tsc --noEmit` failure into a structured `{path, line, message}` check-run annotation rather than plain log text — that annotation is the signal the resolver-core CI-fix agent seeding consumes.

`src/greeting.ts` exports two bindings: `greeting(name: string): string` (never the source of the failure) and `answer: number` (always the source of the failure on main, per [[ci-red-fixture-invariant]]).
