---
name: architecture
description: The CI pipeline shape for rbe-ci-red — how the intentional type error becomes a consumable check-run annotation
type: knowledge
scope: global
updated: 2026-08-14 (IONE-959)
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - .github/workflows/ci.yml
  - src/greeting.ts
  - package.json
---

There are no services/modules to speak of — the whole "system" is a single
source file gated by one CI job. The shape worth diagramming is the pipeline
that turns the deliberate type error into a signal:

```mermaid
flowchart TD
    A[push or pull_request<br/>any branch] --> B[job: typecheck<br/>ubuntu-latest]
    B --> C[actions/checkout@v4]
    C --> D[actions/setup-node@v4<br/>node 20 + tsc problem matcher]
    D --> E[npm install --no-audit --no-fund]
    E --> F[npx tsc --noEmit]
    F -->|src/greeting.ts:11<br/>answer: number = 'forty-two'| G{branch?}
    G -->|main| H[check run: FAILURE<br/>expected, stays red]
    G -->|PR branch| I[check run: FAILURE<br/>annotation consumed by<br/>resolver-core CI-fix agent seeding]
    I --> J[CI-fix agent assigns<br/>a number literal at line 11]
    J --> K[tsc passes on PR branch<br/>fix PR still declined, never merged]
```

The branch fork at `G` isn't in the workflow file itself — `ci.yml` runs
identically on every branch (`on.push.branches: ['**']`). The divergent outcome
(main stays red / PR branches get auto-fixed) is enforced by the resolver-core
CI-fix agent policy consuming the annotation, not by the workflow YAML. Don't
add branch conditionals to `ci.yml` to "fix" main — that would defeat the
fixture's purpose (see [[ci-fixture-invariants]]).
