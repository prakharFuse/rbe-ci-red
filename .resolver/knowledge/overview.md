---
name: overview
description: What rbe-ci-red is and why its main branch is deliberately red — read before touching src/greeting.ts or CI config
type: knowledge
scope: global
updated: '2026-08-10'
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - README.md
  - src/greeting.ts
  - .github/workflows/ci.yml
  - package.json
---

`rbe-ci-red` is a resolver-core journey-suite test fixture, not a real application. Its sole purpose is to keep `main`'s CI deterministically failing so downstream CI-fix-agent tests have a stable red signal to react to — see ../../README.md for the full framing.

The repo has exactly one source file, `src/greeting.ts`, with one exported function (`greeting`) and one intentionally-broken export:

```ts
export const answer: number = 'forty-two';  // src/greeting.ts:11 — type error by design
```

**Do not "fix" this on `main`.** The mismatched string-to-`number` assignment is the feature under test, not a bug. See ../conventions/ci-fixture.md for the exact rule on what a correct fix looks like and where it's allowed.

There is no database, no runtime entrypoint, and no test suite in this repo — `npm run typecheck` (`tsc --noEmit`) is the only check that exists (package.json:7).
