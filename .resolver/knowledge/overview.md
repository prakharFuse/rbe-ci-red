---
name: overview
description: What rbe-ci-red is and why it exists — read before touching src/greeting.ts, package.json, or CI config
type: knowledge
scope: global
updated: '2026-08-07'
captured_sha: 7887b9648a33ccc5627d6fae5090e1ad1007b7bb
sources:
  - README.md
  - package.json
  - src/greeting.ts
  - tsconfig.json
---

This repo's purpose, and the "never fix on main" rule, are stated in `../../README.md` — read that first.

## Gaps not covered by the README

- The whole project is two source files: `src/greeting.ts` (the fixture) and `package.json`. There is no test suite, no linter, no build/bundle step — the only script is `typecheck` (`tsc --noEmit`).
- `tsconfig.json` targets `ES2022` with `module`/`moduleResolution: NodeNext` and `strict: true`, `noEmit: true`, and only includes `src`. Strict mode is why the bad literal assignment at `src/greeting.ts:11` is a hard type error rather than a warning.
- The only runtime dependency is `typescript@5.6.3` as a devDependency — there is no `node_modules` runtime surface to reason about.
- `greeting()` itself (`src/greeting.ts:7-9`) is correct and unrelated to the fixture error; the deliberate break is the sibling export `answer` on line 11.
