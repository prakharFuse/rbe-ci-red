# rbe-ci-red

**Journey-suite fixture — deterministically RED CI.** Created for resolver-core
spec 014 (CI auto-fix hardening) journey coverage (future j85: real CI-fix loop).

The `src/greeting.ts` file carries a deliberate TypeScript type error at a
stable line, so every push/PR fails the `ci` workflow with a **check-run
annotation** (`path:line` via the setup-node tsc problem matcher). That
annotation is what the product's CI-fix agent seeding (IONE-1027,
`ciFailureFiles`) consumes — and the error is trivially agent-fixable, so the
full auto-fix loop can be exercised end-to-end.

Do NOT fix the type error on `main`. Safe to delete and re-provision via
`tests/journeys/scripts/provision-ci-red-fixtures.ts` in resolver-core.

## Status

CI-fix journey canary (msnbyydf-01bo).
