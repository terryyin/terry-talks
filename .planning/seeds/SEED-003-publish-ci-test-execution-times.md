---
id: SEED-003
status: active
planted: 2026-11-07
scope: story
---

# Publish Terry Moves test execution times in Intent

<a id="publish-ci-test-execution-times"></a>

### Publish Terry Moves test execution times in Intent

**Identity:** SEED-003#publish-ci-test-execution-times
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

**Beneficiary:** A Terry Moves developer investigating the runtime of the Remotion unit tests.

**Goal:** Intent shows the cumulative test execution time of the Jest suite and its files for the selected CI attempt.

**Scope:** Carry recorded Jest case durations and repository-relative file paths into
the proof fragment for `terry-moves/tests`. The existing CI collector
publishes one `ci-proof-summary-attempt-<n>` artifact for the judged run.

Follow the [installed CI proof recipe](../../.agents/skills/dough-test-optimization/references/ci-proof-summary.md).

**Acceptance:** For a completed run, the downloaded summary and Intent match the Jest
report's counts and times for the suite and a representative test file.
A failed case with a recorded duration still contributes evidence, and
missing timing stays explicit.
