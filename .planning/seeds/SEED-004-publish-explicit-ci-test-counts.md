---
id: SEED-004
status: active
planted: 2026-11-09
scope: story
---

# See Terry Moves test case counts in Intent

<a id="publish-explicit-ci-test-counts"></a>

### See Terry Moves test case counts in Intent

**Identity:** SEED-004#publish-explicit-ci-test-counts
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

**Goal.** Terry Moves contributors can see the number of individual Remotion test
cases recorded for a selected CI attempt.

**Scope.** Adopt the new format in the existing Jest proof publisher for
`terry-moves/tests`. Preserve the per-file breakdown, outcomes, and known
and missing test timings.

Adopt once Open Dough publishes the explicit test case and test file units
and Intent can read the new format. See the [Open Dough protocol story](https://github.com/terryyin/open-dough/blob/b8fdb3a361899488e12828383afdea02cb545fda/.planning/seeds/SEED-281-distinguish-test-cases-and-files-in-ci-proof.md#distinguish-test-cases-and-files-in-ci-proof).

**Key examples.**

- A Jest spec with five case results contributes five test cases in Intent.
  The summary agrees with the Jest report on their outcomes and timings.
- A Jest suite that fails before reporting cases remains visible as a test
  file failure. A file with a mix of timed and untimed cases still shows
  a partial timing total.
