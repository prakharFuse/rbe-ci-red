---
name: ci-fixture-behavior
description: Exact expected diff for the "fix CI" behavior this fixture tests, and what never to touch
type: convention
scope: global
updated: 2026-09-11 (IONE-959)
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - src/greeting.ts
  - README.md
  - .github/workflows/ci.yml
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
---

This repo is a fixture for testing an automated CI-fix agent, not a normal
codebase to be improved. The "correct" behavior is asymmetric by branch —
see README.md for the base rule; this page pins down the exact diff shape.

## On `main`

Never modify `src/greeting.ts:11`. The broken line is:

```ts
export const answer: number = 'forty-two';
```

Leave the string literal, the type annotation, and the surrounding comment
block (src/greeting.ts:1-6) exactly as-is. Do not add a `// @ts-expect-error`,
change `strict` in tsconfig.json, or otherwise silence the error — any of
those would defeat the fixture's purpose (a real, annotation-producing type
error on every push to main).

## On a PR branch (automated CI-fix agent under test)

The minimal correct fix is to replace the string with a number literal,
e.g.:

```ts
export const answer: number = 42;
```

Any number literal is acceptable — the value is not semantically meaningful,
only the type is. Do not rename `answer`, change its declared type away from
`number`, or touch `greeting()`. Resulting PRs are expected to be declined
and never merged; that decline is part of the tested behavior, not a bug in
the fix.
