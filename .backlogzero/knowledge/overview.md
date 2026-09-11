---
name: overview
description: What this repo is (a deterministic CI-red fixture) and what NOT to touch when working in it
type: knowledge
scope: global
updated: 2026-09-11 (IONE-959)
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

This repo is a single-purpose fixture, not an app under active development. The
core behavior — main is deliberately red, PR branches are where automated
CI-fix agents are expected to fix it, fix PRs are never merged — is already
correctly stated in [README.md](../../README.md) and the header comment in
`src/greeting.ts`. Read those first; this page only adds what they don't say.

## What's actually in the repo

The whole "app" is one function: `greeting()` in `src/greeting.ts:7`. There is
no test runner, no lint config, and no other source file. `package.json`
defines exactly one script (`typecheck`) and one devDependency
(`typescript@5.6.3`) — there's nothing else to build or install.

## Current red state (verified in code)

`src/greeting.ts:11` currently reads:
```ts
export const answer: number = 'forty-two';
```
This is the live type error `tsc --noEmit` fails on right now — a string
literal assigned to a `number`-typed const. The documented minimal fix (on a
PR branch only) is to replace the string with a number literal, e.g. `42`.

## Re-provisioning script is not in this checkout

The README points to `tests/journeys/scripts/provision-ci-red-fixtures.ts` for
re-provisioning the red state. That path does not exist anywhere in this
repo — it lives in the resolver-core monorepo that owns this fixture, not in
this standalone checkout. Don't go looking for it here.

## Scope note for this session

Building the `.backlogzero/` overlay is a documentation task only. Even
though this branch is a PR branch (where README says CI-fix agents are
expected to patch `src/greeting.ts:11`), that fix is out of scope here — only
files under `.backlogzero/` should be touched in this workflow.
