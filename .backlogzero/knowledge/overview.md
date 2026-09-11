---
name: overview
description: What this repo is and why its CI is intentionally red — read before touching anything here
type: knowledge
scope: global
updated: 2026-09-11 (IONE-959)
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - package.json
  - README.md
  - src/greeting.ts
sources_sha256:
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  package.json: 8233427e2dea5f0d0f69945b542cee71e11235b388b01adcae9ee4356b6bddae
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
---

`rbe-ci-red` is a journey-suite test fixture, not an application under active
development. Its only purpose is to keep `main`'s CI deterministically red via
a single TypeScript type error, so that downstream CI-fix-agent journeys have
a known-bad signal to consume. See `../../README.md` for the authoritative
statement of that rule (do not fix `main`; PR-branch fixes are expected but
declined/never merged).

The entire source surface is one file, `src/greeting.ts`, exporting:
- `greeting(name: string): string` — correct, unused elsewhere in the repo.
- `answer: number` — assigned the string literal `'forty-two'`, which is the
  deliberate type error the fixture exists to produce.

There is no application logic, no runtime entrypoint, and no test suite in
this repo — `npm run typecheck` (`tsc --noEmit`) is the only script and the
only thing CI runs.
