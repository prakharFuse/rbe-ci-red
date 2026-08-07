/**
 * FIXTURE INVARIANT: line 11 carries a deliberate type error so CI is
 * deterministically red with a `src/greeting.ts:11` annotation. A CI-fix
 * agent's correct minimal fix is changing the literal to a number — that is
 * the expected behavior under test, but such fix PRs must never merge.
 */
export function greeting(name: string): string {
  return `Hello, ${name}!`;
}

export const answer: number = 'forty-two';
