---
name: architecture
description: Shape of the CI pipeline that turns the type error into a check-run annotation
type: knowledge
scope: global
updated: 2026-08-26 (IONE-959)
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

There are no services or apps here — the only "architecture" is the CI
pipeline that produces the red/green signal.

```mermaid
flowchart LR
    A[push or pull_request\nany branch] --> B[ci workflow\n.github/workflows/ci.yml]
    B --> C[job: typecheck\nubuntu-latest, 5m timeout]
    C --> D[actions/checkout@v4]
    D --> E[actions/setup-node@v4\nnode 20 — registers tsc problem matcher]
    E --> F[npm install --no-audit --no-fund]
    F --> G[npx tsc --noEmit\ntsconfig.json: strict, noEmit, ES2022/NodeNext]
    G -->|type error at\nsrc/greeting.ts:11| H[check-run annotation\npath, line, message]
    H --> I[resolver-core CI-fix\nagent seeding — external]
```

The `package.json` `typecheck` script (`tsc --noEmit`) is not invoked by the
workflow directly — `ci.yml` calls `npx tsc --noEmit` on its own line rather
than `npm run typecheck`. Both resolve to the same compiler invocation given
the local `tsconfig.json`, but if you add compiler flags, add them to
`tsconfig.json` (or both call sites) — editing only the `package.json` script
would not change what CI runs.

Node version is pinned to `20` in the workflow only; there is no `engines`
field in `package.json` and no lockfile committed, so `npm install` resolves
`typescript` freely within the `5.6.3` exact version pinned in
`devDependencies`.
