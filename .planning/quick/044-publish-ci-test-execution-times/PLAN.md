# 044 Publish Terry Moves test execution times in Intent

## Source

[Publish Terry Moves test execution times in Intent](../../seeds/SEED-003-publish-ci-test-execution-times.md#publish-ci-test-execution-times)

**Source review:** [source-review.md](source-review.md)

**Identity:** SEED-003#publish-ci-test-execution-times

## Goal and scope

Show cumulative Jest case execution time alongside counts for the selected
CI attempt in Intent's **CI status** and test-file **Summary** views.
Publish the counts, recorded milliseconds and untimed counts in the existing
Terry Moves proof summary. Preserve the current test selection, outcome
accounting and CI verdicts. The delivery covers the existing GitHub Actions
location and dashboard views. It excludes profiling, other test locations,
historical backfill and dashboard changes.

## Outside-in proof

Slice 1 owns all of these observations.

| Example | Observation |
| --- | --- |
| Completed attempt with timings | Replay the workflow producer and `summarize` from a real Jest JSON report. Independently sum case durations and count outcomes in the report for the entry and `tests/silentScene/joins.spec.ts`. Check the emitted schema 1 summary for the same counts, exact milliseconds and file path. Download the artifact for one hosted candidate and verify the same run/attempt/revision and figures in Intent's **CI status** and the file's **Summary**, using Intent's display precision. For the hosted same-run comparison, capture only independently calculated entry and representative-file figures from that job's `jest-report.json` in temporary proof diagnostics if needed. Remove temporary diagnostics before final delivery. |
| Passed, failed and untimed checks in the same file | A focused regression drives the actual producer and collector commands from a report with a 12 ms pass, an 8 ms failure and a skipped case with a null or absent duration. Assert one of each outcome, 20 ms and one untimed at both levels. With these figures, Intent's entry and file cells explain the partial duration. Replay one real scratch failing Jest report locally to verify Jest exits 1 while its JSON still reaches the reporting steps. |
| Measured zero, wholly untimed file, suite-level failure or missing report | Include a measured-zero file, an untimed-only file and a pre-case suite failure in the focused proof. Verify zero stays a duration, the wholly untimed rows omit duration, and the suite failure is one untimed failure. Run `summarize` against no fragments and check the part is missing, as it is when the producer has no usable report. |

For the hosted comparison, use the story branch's normal push-triggered CI
when available. List artifacts for the matching run with
`gh api repos/terryyin/terry-talks/actions/runs/<run-id>/artifacts`, then
download the matching `ci-proof-summary-attempt-<n>` zip with
`gh api repos/terryyin/terry-talks/actions/artifacts/<artifact-id>/zip`.
Check that the zip has only the summary, that the summary is under the
reader's 1 MiB limit, and that Intent is showing the same revision and attempt.
Use local replay for intentionally failing examples.

## Ordered slices

### 1. Intent shows the run's Jest execution times

Type: Behavior
Status: planned
Proof: local workflow replay and focused regression, followed by the hosted
artifact and Intent observation above.

Behavior: when Jest writes a report, the existing producer emits a proof
fragment with case counts and timings grouped by repository-relative file.
The existing collector publishes the corresponding attempt's summary, and
Intent reads the entry and file figures. Missing timing stays visible.

- Refresh `scripts/ci-proof/ci-proof-*.mjs` to the five modules in the
  installed [CI proof recipe](../../../.agents/skills/dough-test-optimization/references/ci-proof-summary.md).
  Use the existing Jest conversion responsibility to write the fragment
  with the shared figure aggregation, breakdown and fragment helpers.
  Aggregate each case's outcome and optional duration together before
  grouping. Keep the `checks` unit and the existing suite-failure fallback.
- Wire the producer in `.github/workflows/ci.yml` using the existing
  revision, attempt, part, output directory and after-failure conditions.
  Keep the collector command and artifact contract. Update the CI proof
  paragraph in `README.md` to describe the published timing.

## Accepted proof

Slice 1 local proof, at the uncommitted candidate on `daba4cf`, Node 24.21.0:

- `pnpm test:ci-proof` (`scripts/ci-proof/jest-fragment.test.mjs`, 3 pass)
  drives `jest-fragment.mjs` and `ci-proof-summary.mjs summarize`: mixed
  12/8/untimed file 1/1/1, 20 ms, 1 untimed at file and entry; measured zero
  0 ms; untimed-only file with no duration; pre-case suite failure one
  untimed failure; missing and unusable report leave part 1 missing.
- Real Jest replay (`CI=true pnpm -C terry-moves test:unit --json`, 1,093
  passed) through the producer and collector matched independent sums: entry
  194,360 ms, `tests/silentScene/joins.spec.ts` 10 passed, 81 ms; summary
  10,366 bytes. Deployed Intent wording: entry `3 min 14 s`, file `81 ms`.
- Scratch failing Jest suite: Jest exited 1, the producer still wrote 1/1/1,
  2 ms, 1 untimed; Intent wording `partial: 1 check without a duration` at
  file and entry. Scratch file removed.
- Lint, both typechecks and Python tests pass. Refactor pass complete
  (`OPTIONS` constant and figure destructuring in `jest-fragment.mjs`).
- Hosted artifact and Intent observation for the published candidate remain.

## Learnings

- Node 24 `node --test <directory>` treats the directory as one failing
  test file; `test:ci-proof` names the test file.

## Current decisions

- The installed schema 1 contract already supports these figures. Reuse it
  with a Jest-specific producer that calls its aggregation helpers. The
  installed TSV route groups timings by file path and clears that file's
  untimed count when any case in it has timing. Recording each case through
  the shared helpers preserves the gap and keeps the collector copies intact.
- Use Jest's assertion `duration` in milliseconds. Intent's existing wording
  displays a total for complete figures and a gap explanation for partial
  figures. Exact recorded milliseconds remain available in the artifact.

## Preparation evidence

| Premise | Observation |
| --- | --- |
| The current Jest report provides timing and path input | At `22f904473`, Node 24.21.0 and pnpm 11.28.5, `CI=true pnpm -C terry-moves test:unit --json --outputFile="$RUNNER_TEMP/jest-report.json"` with a disposable output directory produced 88 suites and 1,093 passed cases, all timed, including 136 measured zeros. The assertions summed to 155,144 ms and the 10 cases in `tests/silentScene/joins.spec.ts` to 36 ms. A local `--runInBand --runTestsByPath` scratch suite using the same JSON flags exited 1 and reported durations of 1 ms passed, 1 ms failed and null pending. The scratch suite was removed. |
| A schema 1 fragment can retain mixed timing for one file | At the same revision, ran the installed `fragmentsFromOutcomes` with `byFile: true` over a 12 ms pass, 8 ms failure and untimed skip sharing a path. It returned 20 ms with zero untimed. Replayed the same figures through installed `recordResult`, `breakdownExtras` and `fragment`, and then `node .agents/skills/dough-test-optimization/scripts/ci-proof-summary.mjs summarize --fragments "$RUNNER_TEMP/fragments" --expect terry-moves/tests=1 --repository terryyin/terry-talks --run-id 1 --attempt 1 --revision 22f90447368cf047d29d3cbf961b3155514ebf76 --out "$RUNNER_TEMP/ci-proof-summary.json"`. The validated summary reported 20 ms and one untimed on both the file and entry. Running the deployed dashboard's `ciProofCellsOf` and `ciScopeCellsOf` on that summary gave `partial: 1 check without a duration` at both levels, and `0 ms` on a separate measured-zero file. This reaches the deployed wording functions with the actual summary data shape. |
| The existing hosted workflow and Intent consume the attempt artifact | `gh api repos/terryyin/terry-talks/actions/artifacts/13398769700/zip` on 2026-11-07 returned only `ci-proof-summary.json` for run 41993294917, attempt 1, revision `f712d651`, with 1,093 passed checks. [The prior live Intent observation](https://github.com/terryyin/terry-talks/commit/464dc6e68f9c83fcda73bf2b8d324da3bb048b4b) used the same run and counts. The new candidate's hosted timing and file data remain slice 1 proof. |

## Plan review

Refinement was unnecessary because one producer-to-Intent slice owns the
complete outcome and its proof. No slice-specific concerns remain.
