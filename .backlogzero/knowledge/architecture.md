---
name: architecture
description: The repo's only "system" is its CI pipeline shape — read to understand how the red build is produced and surfaced
type: knowledge
scope: global
updated: 2026-09-10 (IONE-959)
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - .github/workflows/ci.yml
  - src/greeting.ts
  - tsconfig.json
  - README.md
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
  tsconfig.json: b3433dd8b2ee73252b402dc6964bbd0b8fd3e34802fd0750c24a884501678da9
---

There are no runtime services here — the "architecture" is the CI job that
turns a type error into a check-run annotation.

```mermaid
flowchart LR
  A[push or pull_request\nany branch] --> B[GitHub Actions: ci workflow]
  B --> C[actions/checkout]
  C --> D[actions/setup-node\nregisters tsc problem matcher]
  D --> E[npm install]
  E --> F[npx tsc --noEmit]
  F -->|type error at\nsrc/greeting.ts:11| G[check-run annotation\npath/line/message]
  G --> H[resolver-core CI-fix\nagent seeding consumes annotation]
```

- The `tsc` problem matcher registered by `setup-node` (see
  `.github/workflows/ci.yml:14-16`) is what converts a raw compiler error into
  a structured `{path, line, message}` annotation — that annotation is the
  actual "output" this fixture exists to produce.
- `tests/journeys/scripts/provision-ci-red-fixtures.ts` (referenced in
  README.md, not present in this repo) re-provisions/resets this fixture from
  the outside; it is not part of this repo's own build.
