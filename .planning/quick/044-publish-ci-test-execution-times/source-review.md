# Source review

Launch: a fresh general-purpose reviewer with no conversation inheritance, on
2026-11-07, during execution of SEED-003#publish-ci-test-execution-times.
Input: only the seed's Goal, Scope and Key examples text and the line "Follow
the installed CI proof recipe", with instructions to read no project files,
change nothing, and return numbered commitments and exclusions.

Reviewer notes: 2a–2f split one compound promise; "one other" in E2 is the
skipped case's bucket; E2 states that a partial file makes the suite partial;
"Intent's display precision" is not defined by the source.

Exclusions (deferred): X1 making tests faster; X2 additional proof locations;
X3 historical backfill; X4 new dashboard presentation.

## Commitments

| Id | Source commitment | Slice | Observation or obligation |
| --- | --- | --- | --- |
| 1 | Goal: a Terry Moves developer looking into Remotion unit test runtime can read cumulative test execution time next to outcome counts in Intent's CI status tab. | slice 1 | |
| 1a | Goal: this is shown for the suite in the selected CI attempt. | slice 1 | |
| 1b | Goal: this is shown for the suite's test files in the selected CI attempt. | slice 1 | |
| 2 | The summary is published in the existing `ci-proof-summary-attempt-<n>` artifact. No new artifact or location is added. | slice 1 | |
| 2a | The artifact publishes outcome counts for the suite `terry-moves/tests`. | slice 1 | |
| 2b | The artifact publishes outcome counts for each test file under `terry-moves/tests`, using its repository-relative path. | slice 1 | |
| 2c | The artifact publishes the cumulative recorded Jest case duration for the suite. | slice 1 | |
| 2d | The artifact publishes the cumulative recorded Jest case duration for each test file. | slice 1 | |
| 2e | The artifact publishes any untimed counts for the suite. | slice 1 | |
| 2f | The artifact publishes any untimed counts for each test file. | slice 1 | |
| 3 | Each duration is a sum of recorded case durations in milliseconds. | slice 1 | observed: scripts/ci-proof/jest-fragment.test.mjs 'timed, untimed, measured-zero…': mixed file durationMs 20 from 12+8 ms; real replay entry 194360 ms = independent sum |
| 4 | A recorded duration of zero counts as a measurement. It is not treated as missing. | slice 1 | observed: scripts/ci-proof/jest-fragment.test.mjs: zero.spec.ts durationMs 0 with no untimed |
| 5 | Missing durations are stated explicitly as untimed counts, never hidden or inferred. | slice 1 | observed: scripts/ci-proof/jest-fragment.test.mjs: untimed counted at file and entry (entry untimed 3) |
| 5a | This applies when a file has both timed and untimed results (mixed timing). | slice 1 | observed: scripts/ci-proof/jest-fragment.test.mjs: mixed.spec.ts 20 ms with untimed 1 |
| 6a | When timing is complete, Intent shows the total time. | slice 1 | |
| 6b | When timing is partial, Intent explains the gap. | slice 1 | observed: deployed Intent ciProofCellsOf/ciScopeCellsOf on scratch failing summary: 'partial: 1 check without a duration' at entry and file |
| 6c | When timing is absent, Intent explains the gap. | slice 1 | observed: deployed Intent ciScopeCellsOf: untimed-only file 'not recorded: 1 check without a duration' |
| 7 | Existing check outcomes stay as they are. Timing data does not change pass or fail. | slice 1 | observed: scripts/ci-proof/jest-fragment.test.mjs: counts 2/2/2 unchanged by timing; real replay 1093 passed matches Jest |
| 8 | Existing CI verdicts stay as they are. | slice 1 | |
| 9 | A suite that fails before reporting any case still counts as one untimed failure. | slice 1 | observed: scripts/ci-proof/jest-fragment.test.mjs: broken.spec.ts failed 1 untimed 1 |
| 10 | When Jest produces no usable report, that part stays missing. No counts or times are made up. | slice 1 | observed: scripts/ci-proof/jest-fragment.test.mjs 'a missing or unusable report…': producer exits non-zero, no fragment, part 1 missing |
| 11a | Delivery covers this project's Jest proof (`terry-moves/tests`). | slice 1 | observed: real Jest replay: entry terry-moves/tests, 88 files, no unassigned |
| 11b | Delivery covers Intent's existing views, meaning the CI status tab. | slice 1 | |
| 12 | The work follows the installed CI proof recipe. | slice 1 | observed: scripts/ci-proof/ci-proof-*.mjs byte-identical to installed recipe copies (cmp); ci.yml producer/collector per recipe steps 3-4 |
| E1 | Complete timing: a completed CI attempt's proof shows counts and summed times for the suite and a representative file, matching the Jest report and downloaded summary at Intent's display precision. | slice 1 | |
| E2 | Partial timing within a file: 12 ms pass, 8 ms failure and an untimed skip add 1 passed, 1 failed, 1 other, 20 ms and 1 untimed; Intent marks file and suite timing partial; the Jest check still fails. | slice 1 | observed: scripts/ci-proof/jest-fragment.test.mjs mixed.spec.ts 1/1/1, 20 ms, 1 untimed; scratch Jest run exit 1 with Intent 'partial: 1 check without a duration' at file and entry |
| E3a | Measured zero: a fully timed file totalling zero displays `0 ms`. | slice 1 | observed: deployed Intent ciScopeCellsOf on producer+summarize output: zero.spec.ts executionTime '0 ms' |
| E3b | Fully untimed: a file with only untimed results has no recorded duration, not 0 ms. | slice 1 | observed: deployed Intent ciScopeCellsOf: untimed.spec.ts 'not recorded: 1 check without a duration'; summary file has no durationMs |
