---
name: ci-fixture-workflow
description: Exact shape of the fix expected on PR branches for this CI-fix-agent test fixture
type: convention
scope: global
updated: '2026-09-11'
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - src/greeting.ts
  - README.md
sources_sha256:
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
---

The single intentional type error is at `src/greeting.ts:11`:

```ts
export const answer: number = 'forty-two';
```

a string literal assigned to a `number`-typed const (TS2322).

On a PR branch, the minimal expected fix is replacing only the string literal
with a number literal, e.g. `export const answer: number = 42;` — keep the
`export`, the identifier name, and the `: number` annotation unchanged; change
only the right-hand-side value.

Do not, even when "fixing" this on a PR branch:
- remove the `answer` export or its type annotation,
- rename `answer`,
- touch `greeting()` or any other line — it is unrelated to the single
  intentional error and any wider diff falls outside what the CI-fix-agent
  test expects.

On `main`, never apply this fix at all — see [[overview]] and README.md ("Do
NOT fix main").
