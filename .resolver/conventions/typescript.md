---
name: typescript
description: TypeScript compiler settings for this repo — strict mode, NodeNext modules, no emit
type: convention
scope: global
updated: 2026-08-10 (IONE-959)
captured_sha: 7887b9648a33ccc5627d6fae5090e1ad1007b7bb
sources:
  - tsconfig.json
---

`tsconfig.json` targets `ES2022` with `module`/`moduleResolution: NodeNext`,
`strict: true`, and `noEmit: true` — only `src/**` is included. There's no
build output; the compiler is used purely for type checking (`tsc --noEmit`,
matching the `typecheck` npm script and the CI step).

`strict: true` is what makes the fixture error in `src/greeting.ts:11` a
compile failure at all — see `[[gotchas]]`. Don't loosen strictness or add
`skipLibCheck`/`noImplicitAny: false` etc. without checking whether that
changes which line the type error surfaces on.
