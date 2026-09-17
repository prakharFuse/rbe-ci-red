---
name: architecture
description: How the single CI job turns the intentional type error into a check-run annotation
type: knowledge
scope: global
updated: 2026-09-17 (IONE-959)
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

There is no service architecture here — one GitHub Actions workflow (`ci`)
runs a single job (`typecheck`) against a two-file TypeScript package.

```mermaid
flowchart LR
    A[push to any branch / pull_request] --> B[ci.yml: typecheck job]
    B --> C[actions/checkout]
    C --> D[actions/setup-node@v4\nnode 20, registers tsc problem matcher]
    D --> E[npm install]
    E --> F[npx tsc --noEmit]
    F -->|src/greeting.ts:11 type error on main| G[check-run annotation\npath, line, message]
    G --> H[resolver-core CI-fix agent seeding]
```

Non-obvious edge: the `setup-node@v4` step's only purpose (per the inline
comment in `.github/workflows/ci.yml`) is registering the `tsc` problem
matcher so that `tsc --noEmit` failures surface as structured GitHub
check-run annotations (`{path, line, message}`) rather than plain log text —
that structured annotation is the actual payload the fixture exists to
produce, not the CI failure itself.

The workflow triggers on push to `branches: ['**']` (every branch, not just
main) and on `pull_request` — so PR branches run the same job; a numeric fix
to `src/greeting.ts:11` on a PR branch is what turns step F/G green for that
branch while `main` stays red.
