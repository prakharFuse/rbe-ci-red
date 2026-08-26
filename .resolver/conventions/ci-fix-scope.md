---
name: ci-fix-scope
description: Exactly what a PR-branch CI-fix may touch here, and the fix that would technically pass but isn't the intended one
type: convention
scope: global
updated: 2026-08-26 (IONE-959)
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - src/greeting.ts
  - README.md
  - tsconfig.json
sources_sha256:
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
  tsconfig.json: b3433dd8b2ee73252b402dc6964bbd0b8fd3e34802fd0750c24a884501678da9
---

README.md and the header comment in `src/greeting.ts` already state that PR
branches are expected to be fixed with "a number literal" at
`src/greeting.ts:11`. This page covers what those docs don't spell out: the
boundary of that fix.

## The narrow fix vs. the fix that also passes

`tsc --noEmit` only checks that the declared type and the assigned value
agree. That means at least three edits would all turn CI green:

1. Change the value: `export const answer: number = 42;` — the intended fix.
2. Change the annotation: `export const answer: string = 'forty-two';`
3. Drop the annotation: `export const answer = 'forty-two';` (inferred as `string`)

Only (1) is correct. (2) and (3) also satisfy `tsc --noEmit` but change the
declared type of an exported symbol, which is a wider edit than the fixture
calls for — treat those as out of scope even though CI would accept them.

## Files a CI-fix must not touch

- `src/greeting.ts`'s header comment (lines 1–6) — it documents the
  intended dual-invariant behavior itself; removing or editing it would
  erase the record of why the file looks the way it does.
- `README.md`, `.github/workflows/ci.yml`, `tsconfig.json`, `package.json` —
  none of these need to change to make `tsc --noEmit` pass. If a fix touches
  any of them, that's a signal the fix drifted from the minimal-diff intent.
