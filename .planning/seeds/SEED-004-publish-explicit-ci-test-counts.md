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

Open Dough 0.3.93 publishes these units. Update Open Dough guidance to
0.3.93 or later with `dough-update`, then copy all seven `ci-proof-*.mjs`
collector modules into `scripts/ci-proof/` through the CI proof copy recipe
(`ci-proof-evidence.mjs` and `ci-proof-options.mjs` are new). Because
`scripts/ci-proof/jest-fragment.mjs` builds its fragment from the
collector's contract and figure modules, adapt it so its fragment carries
the test case unit, and declare `--expect terry-moves/tests=1:case` in the
`ci-proof` job. A run with no usable Jest report stays a missing part.
Until both compared builds declare matching units, Intent reads unit-less
results as legacy test results and shows no count or time difference.

**Key examples.**

- A Jest spec with five case results contributes five test cases in Intent.
  The summary agrees with the Jest report on their outcomes and timings.
- A Jest suite that fails before reporting cases remains visible as a test
  file failure. A file with a mix of timed and untimed cases still shows
  a partial timing total.
