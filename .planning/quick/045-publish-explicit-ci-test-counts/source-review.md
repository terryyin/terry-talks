# Source review: SEED-004#publish-explicit-ci-test-counts

Launch: fresh general-purpose reviewer with no conversation inheritance.
Input: only the selected story Goal, Scope, key examples and exclusions from
SEED-004#publish-explicit-ci-test-counts. No plan, product, proof, or slice
scope supplied. Reviewer instructed to read no other project files and change
nothing.

## Commitments

| Id | Source commitment | Slice | Observation or obligation |
| --- | --- | --- | --- |
| 1 | For a selected CI attempt, Intent's CI status tab shows the count of individual Remotion test cases recorded for Terry Moves. | slice 1 | observed: schema-2 case evidence in summary (jest-fragment.test.mjs five-cases + workflow both expects); Intent reads via existing reader |
| 2 | That count is usable to distinguish case coverage from file-level failures. | slice 1 | observed: separate case vs file evidence units in summary (five cases + pre-case file failure test) |
| 3 | Explicit test case evidence is published from Jest individual assertion results for `terry-moves/tests`. | slice 1 | observed: jest-fragment.mjs assertionResults → case unit fragments |
| 4 | That evidence is published through the existing CI proof pipeline. | slice 1 | observed: .github/workflows/ci.yml producer+collector path unchanged; both --expect units |
| 5 | Outcomes are preserved as passed, failed, and other. | slice 1 | observed: outcomes passed/failed/other in five-cases test [2,1,2] |
| 6 | Breakdowns are preserved per file using repository-relative paths. | slice 1 | observed: repository-relative per-file breakdown in five-cases and mixed-figures tests |
| 7 | Measured durations are preserved, including zero-duration measurements. | slice 1 | observed: mixed/zero durationMs 20 and 0 preserved (timed/untimed/measured-zero test) |
| 8 | The number of untimed results is preserved. | slice 1 | observed: untimed counts preserved (pending/skipped → untimed 2) |
| 9 | A suite that fails before reporting cases remains a visible untimed test-file failure. | slice 1 | observed: broken.spec.ts untimed file failure in file evidence |
| 10 | That file failure is separate from case evidence. | slice 1 | observed: file evidence separate from case evidence (broken not in cases.files) |
| 11 | No invented test case is created for such a pre-case suite failure. | slice 1 | observed: cases stay at five; broken adds no case |
| 12 | When the Jest report is missing or unusable, expected proof remains missing. | slice 1 | observed: missing/unusable → parts status missing for both units |
| 13 | That situation is not reported as zero-count evidence. | slice 1 | observed: missing/unusable not present zero (parts missing, not present) |
| 14 | Use the installed Open Dough collector's explicit units. | slice 1 | observed: fragment({unit}) case/file; workflow --expect :case and :file |
| 15 | Use that collector's existing summary artifact. | slice 1 | observed: artifact name ci-proof-summary-attempt-<n> unchanged in workflow |
| 16 | Use that collector's existing attempt/revision identity contract. | slice 1 | observed: identity fields attempt/revision/repository/run-id retained in summarize CLI+tests |
| 17 | Collector modules remain unmodified copies under the installed CI proof recipe. | slice 1 | observed: cmp seven modules vs .claude/skills/dough-test-optimization/scripts/ OK |
| 18.1 | Remaining migration covers: the project's copied collector | slice 1 | observed: scripts/ci-proof collector copies refreshed from recipe |
| 18.2 | Remaining migration covers: the Jest converter | slice 1 | observed: jest-fragment.mjs adapted to case/file |
| 18.3 | Remaining migration covers: the workflow declaration | slice 1 | observed: ci.yml both unit expects |
| 18.4 | Remaining migration covers: their proof | slice 1 | observed: jest-fragment.test.mjs schema-2 examples; pnpm test:ci-proof 5/5 |
| 18.5 | Remaining migration covers: their documentation | slice 1 | observed: README.md both units wording |
| 19.1 | Exclusion: Intent UI implementation changes | | G-excl-19.1 |
| 19.2 | Exclusion: Intent comparison implementation changes | | G-excl-19.2 |
| 19.3 | Exclusion: new proof locations | | G-excl-19.3 |
| 19.4 | Exclusion: additional test runners | | G-excl-19.4 |
| 19.5 | Exclusion: a new/changed timing measurement scheme | | G-excl-19.5 |
| 19.6 | Exclusion: test-suite optimization | | G-excl-19.6 |
| 19.7 | Exclusion: relabeling historical unit-less results | | G-excl-19.7 |
| 19.8 | Exclusion: promising count or time differences between legacy and explicit-unit builds | | G-excl-19.8 |
| 20 | Earlier unit-less summaries remain legacy test results under the existing reader. | slice 1 | observed: ci-proof-contract.mjs currentSummaryOf retained; new evidence asserts non-legacy |
| 21 | A valid Jest report with no selected cases and no pre-case failures records present zero-count evidence. | slice 1 | observed: usable empty report → present zero-count case+file evidence test |
