---
name: architecture
description: The CI pipeline shape for rbe-ci-red — how a push/PR turns into a type-error annotation
type: knowledge
scope: global
updated: 2026-09-11 (IONE-959)
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - .github/workflows/ci.yml
  - src/greeting.ts
  - README.md
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
---

There is no application architecture here — the repo's only "system" is the
CI pipeline itself, which is the fixture under test.

```mermaid
flowchart LR
    A[push to any branch / pull_request] --> B[GitHub Actions: ci.yml job 'typecheck']
    B --> C[actions/checkout@v4]
    C --> D[actions/setup-node@v4 node 20]
    D --> E[npm install --no-audit --no-fund]
    E --> F[npx tsc --noEmit]
    F -->|main: src/greeting.ts:11 type error| G[check-run annotation path/line/message]
    F -->|PR branch with literal fix| H[tsc passes, ci green]
    G --> I[resolver-core CI-fix agent seeding\nexternal, consumes annotation]
```

- `setup-node@v4` registers the `tsc` problem matcher (ci.yml:14-16), which is
  what turns a plain `tsc --noEmit` failure into a structured
  `{path, line, message}` check-run annotation instead of raw log text — that
  annotation is the actual signal the external CI-fix agent seeding consumes.
- The "fix" node (H) is branch-local: it means replacing the string literal at
  src/greeting.ts:11 with a number literal on a PR branch. It is never
  supposed to land on `main` — see [[ci-fixture-behavior]].
