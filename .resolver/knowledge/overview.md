---
name: overview
description: What rbe-ci-red is and why it exists — read this before touching anything in the repo
type: knowledge
scope: global
updated: 2026-08-10 (IONE-959)
captured_sha: 7887b9648a33ccc5627d6fae5090e1ad1007b7bb
sources:
  - README.md
  - package.json
  - src/greeting.ts
  - .github/workflows/ci.yml
---

This repo is a **deliberately-broken fixture**, not a product codebase — see
`../../README.md` for the full rationale (resolver-core spec 014 / journey j85,
`ciFailureFiles` seeding via IONE-1027).

Two source files total: `src/greeting.ts` (the fixture) and its config
(`package.json`, `tsconfig.json`). There is no test suite, no lint config, and
no runtime entrypoint — the only thing this repo does is fail `tsc --noEmit`.

The one function, `greeting(name: string): string` at `src/greeting.ts:7`, is
correct and unused elsewhere in the repo (no callers — it exists only to make
the file look like real source next to the fixture error).
