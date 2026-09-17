---
name: overview
description: What this repo is for and the invariant that must never be broken — read before touching src/greeting.ts, tsconfig.json, or .github/workflows/ci.yml
type: knowledge
scope: global
updated: '2026-09-17'
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - README.md
  - package.json
  - src/greeting.ts
  - tsconfig.json
  - .github/workflows/ci.yml
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  package.json: 8233427e2dea5f0d0f69945b542cee71e11235b388b01adcae9ee4356b6bddae
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
  tsconfig.json: b3433dd8b2ee73252b402dc6964bbd0b8fd3e34802fd0750c24a884501678da9
---

This is not an application — it is a **test fixture**. The whole repo exists to
produce one deterministic TypeScript type error so that downstream automation
(a "CI-fix agent" under test, per resolver-core spec 014 / j85) has a
reproducible red build to react to. See ../../README.md for the canonical
statement of intent; this page adds the code-verified specifics.

## The invariant

`src/greeting.ts:11` reads:

```ts
export const answer: number = 'forty-two';
```

Assigning a string literal to a `number`-typed const fails under
`tsconfig.json`'s `strict: true`, so `npm run typecheck` (`tsc --noEmit`)
fails on every push to every branch, including `main`.

- **On `main`**: this failure must stay. Do not change line 11, do not
  relax `strict` in tsconfig.json, do not change `answer`'s declared type.
  Any of those would silently "fix" the fixture and break the thing it's
  designed to test.
- **On a PR branch**: an automated CI-fix agent replacing the string literal
  with a numeric literal (e.g. `42`) is the expected, correct, in-scope
  behavior — that's the exact signal this fixture is built to elicit. Such
  fix PRs are intentionally never merged (per README.md); the repo's job is
  just to keep offering the red signal, not to accumulate fixes.

## Do not modify

- `src/greeting.ts` — the type error is the payload of the fixture.
- `tsconfig.json` — `strict: true` is required for the error to surface.
- `.github/workflows/ci.yml` — the `setup-node` problem matcher is what turns
  the raw `tsc` failure into the check-run annotation the fix-agent consumes;
  see [[architecture]].

## Re-provisioning

README.md points to `tests/journeys/scripts/provision-ci-red-fixtures.ts` for
re-provisioning this fixture. That script does not live in this repository —
it's part of an external harness/monorepo that manages fixture repos like
this one, not something to look for or add here.
