---
name: architecture
description: How the single CI workflow turns the fixture type error into a consumable check-run annotation
type: knowledge
scope: global
updated: 2026-08-10 (IONE-959)
captured_sha: 7887b9648a33ccc5627d6fae5090e1ad1007b7bb
sources:
  - .github/workflows/ci.yml
  - package.json
  - tsconfig.json
  - src/greeting.ts
---

There is no runtime architecture — one workflow, one source file. The shape
worth recording is the failure pipeline itself:

```mermaid
flowchart LR
    A[push / PR on any branch] --> B["ci workflow: typecheck job\n.github/workflows/ci.yml"]
    B --> C[actions/setup-node@v4\nregisters tsc problem matcher]
    C --> D["npm install"]
    D --> E["npx tsc --noEmit\n(tsconfig.json: strict, noEmit)"]
    E -->|"type error at\nsrc/greeting.ts:11"| F["check-run annotation\n{path, line, message}"]
    F --> G[resolver-core CI-fix agent seeding\nIONE-1027 ciFailureFiles]
```

- `setup-node@v4` is what turns the raw `tsc` stderr into a structured
  GitHub check-run annotation — this is the specific step the fixture depends
  on; removing or reordering it (e.g. running `tsc` before `setup-node`)
  would silently break the signal without failing the workflow.
- `tsconfig.json` sets `strict: true` and `noEmit: true`; `noEmit` means the
  job's only observable output is the diagnostic itself, no build artifact.
- The workflow has no branch filters (`branches: ['**']`) and no path
  filters, so the failure fires on every push and PR by design — do not add
  filters that would make it conditional.
