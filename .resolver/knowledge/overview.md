---
name: overview
description: What this repo is and why it exists — read before touching anything here
type: knowledge
scope: global
updated: 2026-08-07 (IONE-959)
captured_sha: 7887b9648a33ccc5627d6fae5090e1ad1007b7bb
sources:
  - README.md
  - package.json
  - src/greeting.ts
---

Purpose, provisioning, and the "do not fix" rule are documented in [../../README.md](../../README.md) — read that first, it is authoritative and current.

Code-verified facts not spelled out in the README:

- The repo has exactly two source files: `src/greeting.ts` and `package.json` (plus `tsconfig.json`, `.github/workflows/ci.yml`, `README.md`). There is no test runner, linter, or build step configured — the only script is `"typecheck": "tsc --noEmit"` (`package.json:7`).
- `src/greeting.ts` exports one function, `greeting(name: string): string` (lines 7-9), plus the deliberately-broken `export const answer: number = 'forty-two';` on line 11.
- The type error exists only because `tsconfig.json` has `"strict": true` — under non-strict mode this assignment would still fail (string is not assignable to number regardless of strictness), so `strict` isn't actually load-bearing for this particular fixture, just good hygiene.

See [gotchas.md](gotchas.md) for the operating rule when working in this repo, and [architecture.md](architecture.md) for how the red-CI signal is produced.
