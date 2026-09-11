---
name: typescript
description: tsconfig conventions and the intentional exception to strict mode on main
type: convention
scope: global
updated: 2026-09-11 (IONE-959)
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - tsconfig.json
  - src/greeting.ts
sources_sha256:
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
  tsconfig.json: b3433dd8b2ee73252b402dc6964bbd0b8fd3e34802fd0750c24a884501678da9
---

`tsconfig.json` targets `ES2022` with `module`/`moduleResolution: NodeNext`,
`strict: true`, and `noEmit: true` (no `outDir`/build step — this repo is
typechecked, never compiled to disk). Only `src/**` is included.

Despite `strict: true`, `src/greeting.ts:11` (`export const answer: number =
'forty-two'`) is a deliberate string-to-number type error left in place on
`main` on purpose — see ../../README.md for why. Do not "fix" this on `main`;
the correct minimal fix (a number literal) is only expected on PR branches, per
the in-file comment at src/greeting.ts:1-6.
