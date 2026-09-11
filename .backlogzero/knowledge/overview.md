---
name: overview
description: What rbe-ci-red is and why main is deliberately red — read before touching src/greeting.ts, ci.yml, or package.json
type: knowledge
scope: global
updated: '2026-09-11'
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - README.md
  - src/greeting.ts
  - package.json
  - tsconfig.json
sources_sha256:
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  package.json: 8233427e2dea5f0d0f69945b542cee71e11235b388b01adcae9ee4356b6bddae
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
  tsconfig.json: b3433dd8b2ee73252b402dc6964bbd0b8fd3e34802fd0750c24a884501678da9
---

This whole repo is a two-source-file fixture, not an application. See ../../README.md
for the purpose (deterministically red `main`, PR-branch CI-fix agents expected to
turn it green) and the do-not-fix-main / do-fix-on-PR-branch invariant — don't
duplicate that here, read it there.

## What's actually in the tree

- `src/greeting.ts` — one working export (`greeting(name: string): string`) and
  one intentionally broken one: `export const answer: number = 'forty-two';` at
  line 11. That's a string literal assigned to a `number`-typed const; it only
  fails because `tsconfig.json` sets `"strict": true`. There is no other logic,
  no tests, no other module.
- `package.json` — single devDependency (`typescript@5.6.3`), single script:
  `typecheck` → `tsc --noEmit`. This is the exact command CI runs (see
  [[architecture]]), so `npm run typecheck` locally reproduces the CI result
  exactly — no need to push to check whether a fix works.
- No `dependencies`, no test runner, no build/emit step (`noEmit: true`).

## Gap: the re-provisioning script isn't in this repo

../../README.md points to `tests/journeys/scripts/provision-ci-red-fixtures.ts`
for re-provisioning this fixture. That path does not exist anywhere in this
repo's tree — it lives in the external journey-suite/resolver-core harness that
seeds and re-seeds this fixture, not here. Don't go looking for it locally.
