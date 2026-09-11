---
name: architecture
description: Real shape of the repo — one module feeding one CI typecheck job, nothing else
type: knowledge
scope: global
updated: 2026-09-11 (IONE-959)
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - package.json
  - tsconfig.json
  - .github/workflows/ci.yml
  - src/greeting.ts
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  package.json: 8233427e2dea5f0d0f69945b542cee71e11235b388b01adcae9ee4356b6bddae
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
  tsconfig.json: b3433dd8b2ee73252b402dc6964bbd0b8fd3e34802fd0750c24a884501678da9
---

```mermaid
flowchart LR
  A[src/greeting.ts] -->|included via tsconfig.json| B[tsc --noEmit]
  B -->|npm run typecheck| C[.github/workflows/ci.yml : typecheck job]
  C -->|push to any branch or PR| D[GitHub Actions check-run]
  D -->|setup-node tsc problem matcher| E[annotation: path, line, message]
```

The `ci` workflow runs on every push (`branches: ['**']`) and every pull
request — there's no branch filtering, so the red `main` state and any PR
branch both trigger the same single `typecheck` job. `actions/setup-node@v4`
registers the built-in `tsc` problem matcher specifically so type errors
surface as structured check-run annotations (`{path, line, message}`) rather
than raw log text — that's the signal format the fix-agent journey expects,
per the comment in `.github/workflows/ci.yml:14-16`.
