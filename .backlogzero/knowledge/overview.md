---
name: overview
description: What this repo is — a deliberately-red CI fixture, not a real app; read before touching anything
type: knowledge
scope: global
updated: 2026-09-10 (IONE-959)
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - README.md
  - package.json
  - src/greeting.ts
  - .github/workflows/ci.yml
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  package.json: 8233427e2dea5f0d0f69945b542cee71e11235b388b01adcae9ee4356b6bddae
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
---

`rbe-ci-red` is a journey-suite test fixture, not a product codebase. Its only
purpose is to keep `main`'s CI deterministically red so that automated CI-fix
agents have something real to fix on PR branches. See ../../README.md for the
full framing (resolver-core spec 014 / j85).

The entire "application" is one function:

- `src/greeting.ts:7` — `greeting(name: string): string`, returns a template
  string. Never modified by the fixture's design.
- `src/greeting.ts:11` — `export const answer: number = 'forty-two';` — this
  is the injected type error (string assigned to a `number`-typed const).
  `tsconfig.json` has `strict: true`, so `tsc --noEmit` fails on this line.

**Hard rule for this repo: do NOT fix the type error on `main`.** The red
build is the feature under test, not a bug. The only place a fix belongs is
on a PR branch, and the expected fix is narrow: replace the string literal
with a number literal (e.g. `42`) at `src/greeting.ts:11` — nothing else
should change. Such fix PRs are declined/never merged; they exist only to
verify the CI-fix agent's behavior, see [[ci-fixture-conventions]].
