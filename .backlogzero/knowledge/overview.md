---
name: overview
description: What this repo is — a deliberately red-CI fixture, not a real app; read before touching src/greeting.ts, package.json, or ci.yml
type: knowledge
scope: global
updated: '2026-09-11'
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - README.md
  - src/greeting.ts
  - package.json
  - .github/workflows/ci.yml
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  package.json: 8233427e2dea5f0d0f69945b542cee71e11235b388b01adcae9ee4356b6bddae
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
---

This repo is a journey-suite test fixture, not a product. Its entire purpose is
to keep `main` deterministically red in CI so a downstream CI-fix agent has a
known failure to react to on PR branches. See README.md and
`src/greeting.ts:11` for the exact rule ("Do NOT fix main"; PR-branch fixes
are expected and declined-not-merged) — do not restate or relax that rule.

Facts not covered in README.md:

- The whole source surface is one file, `src/greeting.ts`, plus `package.json`
  and `tsconfig.json`. There is no test framework, no lint config, no build/
  dist step — `typecheck` (`tsc --noEmit`) is the only script that exists.
- The only runtime/dev dependency is `typescript@5.6.3` (devDependency). There
  are no production dependencies.
- README.md references a re-provisioning script,
  `tests/journeys/scripts/provision-ci-red-fixtures.ts` — that path does not
  exist in this repo. It lives in the host repo (resolver-core) that
  provisions this fixture; don't search for it here.

See also [[architecture]] for how the red build surfaces as CI annotations,
and [[ci-fixture-workflow]] for the exact shape of the expected PR-branch fix.
