---
name: ci-fixture-invariants
description: The exact edit rules for src/greeting.ts and ci.yml — what must never change on main vs. what a PR-branch fix must look like
type: convention
scope: global
updated: 2026-08-14 (IONE-959)
captured_sha: 574d3132b87c5d1962f16efce8993dafc1ff9a8c
sources:
  - src/greeting.ts
  - README.md
  - .github/workflows/ci.yml
---

This repo has one rule and it's already stated in ../../README.md and the
docblock at src/greeting.ts:1-6: main must stay red, PR branches are expected
to be auto-fixed. This page adds the precision needed to apply that rule
correctly.

## On `main`

- Never change `src/greeting.ts:11` (`export const answer: number =
  'forty-two';`) on main. Never add `// @ts-expect-error`, never widen the
  type, never touch `tsconfig.json`'s `strict` flag, never add branch logic to
  `.github/workflows/ci.yml` to skip or soften the typecheck job. Any of these
  would silently defeat the fixture.

## On a PR branch

- The **only** correct fix is replacing the string literal with a number
  literal, e.g. `export const answer: number = 42;` — nothing else. Don't
  change the declared type, don't delete the export, don't rename `answer`,
  don't touch `greeting()`.
- Fix PRs coming out of this flow are **declined, never merged** — this is
  intentional per README.md. Don't be surprised by an auto-fix PR getting
  closed without merge; that's the expected end state of the test, not a
  regression.

## Both branches

- `package.json`'s only script is `typecheck` (`tsc --noEmit`) — there is no
  test runner, lint step, or build step in this repo. Don't add one unless
  explicitly asked; it isn't part of what this fixture exercises.
