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
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../quick/044-publish-ci-test-execution-times/PLAN.md","assessment":"ready","reasons":[],"basis":{"document":"bc647c96fd56b7b901bf6d9d77a40cb9eb61a99eb4ba70ecd5aeaf3f16de77f1","plan":"db994528d241f3ad83ef3027ee6faed595cec3e372fc2894583d35afc06ae890"}}
```

**Goal**

A Terry Moves developer investigating Remotion unit test runtime can read
cumulative test execution time alongside outcome counts in Intent's **CI
status** tab, for the suite and its test files in the selected CI attempt.

**Scope**

- Publish counts, cumulative recorded Jest case durations and any untimed
  counts for `terry-moves/tests` and its repository-relative test files in
  the existing `ci-proof-summary-attempt-<n>` artifact. Each duration is
  summed in milliseconds. A recorded zero is a measurement. Missing
  durations remain explicit, including when a file has both timed and
  untimed results. Intent shows the total when timing is complete and
  explains gaps when timing is partial or absent.
- Keep existing check outcomes and CI verdicts. A suite that fails before
  reporting any case still counts as one untimed failure. When Jest produces
  no usable report, the part remains missing.
- Delivery covers this project's Jest proof and Intent's existing views.
  Test speedups, additional proof locations, historical backfill and new
  dashboard presentation are deferred.

**Key examples**

- A completed CI attempt has a Jest report with timing for every case.
  Opening the attempt's proof shows counts and summed times for the suite
  and a representative file, matching the report and downloaded summary
  at Intent's display precision.
- A file reports a 12 ms pass, an 8 ms failure and a skipped case with no
  duration. The file contributes one passed, one failed, one other, 20 ms
  recorded and one untimed to the summary. Intent marks the file and suite
  timing as partial. The Jest check still fails.
- A file reports a measured zero and every case in it has timing. Intent
  displays `0 ms` when that file's total is zero. A file with only untimed
  results has no recorded duration.

Follow the [installed CI proof recipe](../../.agents/skills/dough-test-optimization/references/ci-proof-summary.md).
