# Publish explicit Terry Moves CI test counts

**Identity:** SEED-004#publish-explicit-ci-test-counts
**Source:** [See Terry Moves test case counts in Intent](../../seeds/SEED-004-publish-explicit-ci-test-counts.md#publish-explicit-ci-test-counts)
**Source review:** [source-review.md](./source-review.md)

## Goal and scope

Publish the selected CI attempt's individual Jest case counts for
`terry-moves/tests` in explicit case evidence, preserving outcomes, per-file
breakdowns and timing completeness. Keep failures before any cases are reported
visible as separate file evidence, without manufacturing case outcomes.

Migrate the copied collector and its Jest publisher, workflow declarations,
focused proof and README together. The existing artifact name, retention,
revision/attempt identity and after-failure publication remain supported.
No Intent implementation changes, historical relabeling, additional Intent
locations/runners, suite optimization or new timing scheme are included.

## Existing solutions and decisions

- PFE: `.planning/open-dough.json` configures only `terry-moves/tests`.
  `.github/workflows/ci.yml` already obtains Jest JSON, converts it after tests,
  uploads fragments and collects a summary. `scripts/ci-proof/jest-fragment.mjs`
  owns Jest-specific assertion outcomes and timing. Extend that converter.
- Open Dough 0.3.94 is installed at `49047db`. Reuse the recipe in
  `.agents/skills/dough-test-optimization/references/ci-proof-summary.md`:
  copy `ci-proof-summary`, `ci-proof-options`, `ci-proof-contract`,
  `ci-proof-evidence`, `ci-proof-figures`, `ci-proof-fragments` and
  `ci-proof-collect` unchanged into `scripts/ci-proof/`. Two modules are new.
  CI continues running project copies rather than installed skill paths.
- The copied contract changes from schema 1 entry figures to schema 2
  `entries[].evidence[]`. `fragment` now takes `{unit: "case"}` or
  `{unit: "file"}`. Existing figure helpers already retain partial/zero timing.
  Reuse them with separate accumulators; add no parallel counting model.
- A suite with assertion results supplies case outcomes. A failed suite with
  no assertion results supplies one untimed file outcome. Do not derive file
  counts from the number of paths, or a case from an aggregate file failure.
- Emit a fragment for each of case and file evidence for a usable report,
  including zero counts when its bucket is empty. Use unit-qualified filenames
  so fragments from the same entry/part coexist. Declare both
  `--expect terry-moves/tests=1:case` and
  `--expect terry-moves/tests=1:file`; otherwise the collector excludes the
  separate file failures. Missing/unusable reports emit neither fragment.
- ADR review: [ADR 0000 — Use Architectural Decision Records](../../../docs/adrs/0000-use-adrs-accepted.md)
  is the sole current Accepted record; index and record agree. This local,
  reversible contract adoption introduces no durable architectural choice or
  conflict. No North Star topic or new ADR is needed.

## Outside-in proof ownership

| Story example / preserved boundary | Observable signal and owner |
| --- | --- |
| Five assertion results in one spec | Slice 1 CLI test: one case evidence bucket totals five with exact outcomes and repository-relative breakdown; not one result per path. |
| Cases plus a pre-case failed suite | Slice 1 CLI test: case count remains five; separate file evidence contains one untimed failure at its path. Both fragments survive collection. |
| Timed, untimed and measured-zero cases | Slice 1 preserves and updates the existing mixed fixture: 12 + 8 ms gives 20 ms, pending is untimed, zero remains measured; fully untimed evidence has no duration. Figures agree at part, file and evidence boundaries. |
| Missing/unusable report versus a usable empty report | Slice 1 CLI tests: no fragments and missing declared parts for the former; present zero-count evidence for the latter. |
| Outside-entry suites | Slice 1 preserves the existing fixture's exclusion: unrelated paths contribute no figures or absolute machine paths. |
| Selected hosted attempt and legacy history | Slice 1 hosted CI artifact has schema 2, both declared units and the run's exact identity. Existing shared reader remains responsible for legacy classification/comparison; retained observation below proves the historical artifact is still readable as legacy. |

Use `pnpm test:ci-proof` (the complete focused suite, not selected subtests).
Its test already runs the real producer and collector CLIs in child processes.
Update its expectation and assertions to schema 2 rather than adding a second
harness. Add the missing discriminating examples there, including zero counts
and a file failure that must never inflate cases. Assert absence of legacy
results in new evidence and validate the resulting summary through the copied
contract. Check that the workflow uses the same explicit declarations as these
CLI tests. Update README's existing proof description to explain both units.

Consumer trace: output flows from Jest JSON through `jest-fragment.mjs`, copied
contract/figure helpers and collector into `ci-proof-summary-attempt-<n>`;
Intent reads that summary using the installed schema/identity contract.
Production consumers found across the checkout are the two workflow commands,
README and root `test:ci-proof`/`test:node` scripts. Test consumers are the three
existing CLI tests, including their `summarize` helper and schema-1 assertions.
Run all focused CLI tests, review both workflow call sites and README, reuse
shared legacy reader behavior and the hosted-artifact route observed below.
No application, film, Python or Slidev consumer of this proof schema was found.
During execution extend this trace from the actual diff with the installed
consumer-trace command; any newly reached consumer owns appropriate proof.

## Decisive premises and observations

All observations below were made on 2026-11-10 in this owned preparation checkout
at `d5580160a728ea3413c0f85df7b3a14eee80d9e2`, using Node v24.21.0.
Scratch edits were restored; only seed and plan records are retained.

| Premise / consuming operation | Observation, result and remainder |
| --- | --- |
| Existing CLI harness observes preservation of outcomes and timings | `node --test scripts/ci-proof/jest-fragment.test.mjs`: 3/3 pass. Scratch replacement of `durationOf(assertion.duration)` with `undefined` makes the mixed-figure test fail (2/3 pass); restoring the adapter restores 3/3. This is discriminating timing proof. The new unit assertions still need writing in Slice 1. |
| Installed collector is a usable migration source; consumers need coordinated adaptation | Scratch copy of all seven installed modules into `scripts/ci-proof/`, followed by the same `node --test` command: 0/3 pass. Producer reports `unit is not case, file, legacy`; missing-report assertions address the removed top-level entry figures. Thus a collector-only delivery is unsafe. Copies and adapter were restored. |
| Explicit units can preserve five cases, one pre-case failure and partial timings | With those exact scratch copies, `node --input-type=module -e` with inline contract/figure/collector assertions constructed case figures from five outcomes `[passed/12, failed/8, other/untimed, passed/0, other/untimed]` at `terry-moves/tests/five.spec.ts` and a separate untimed file failure at `broken.spec.ts`, then consumed them through `fragment` and `summarize` with both explicit declarations. Fragment and summary validation passed. Case evidence was 2/1/2, 20 ms, 2 untimed; file evidence was 0/1/0, no duration, 1 untimed. This observes the actual new contract, not a substitute schema. Jest conversion itself remains Slice 1 work. |
| Empty fragment arrival preserves the expected units as missing | The same scratch `summarize` invocation with no fragments returned `case:missing` and `file:missing`. A schema-1 summary remained valid and `currentSummaryOf` classified its `checks` results as legacy. |
| A usable report with no results can remain present rather than missing | `node --input-type=module` with an inline empty-map fixture through installed `fragment`, `breakdownExtras`, `summarize` and `checkedSummary`: both explicit units had present part 1, zero counts and no duration, accepted for the selected repository/run/attempt/revision. These are the unchanged modules to be copied. |
| Hosted artifact route and installed reader work for this repository | `gh run list --workflow ci.yml --branch master --limit 1 --json databaseId,attempt,headSha,status,conclusion` selected successful run 42732829786, attempt 1, at this revision. `gh run download 42732829786 --name ci-proof-summary-attempt-1 --dir .planning/ci-proof-observation`, followed by `checkedSummary` with repository `terryyin/terry-talks`, that run/attempt and full revision, accepted its schema-1 artifact as legacy (`checks`): 1093 passed, 0 failed/other, 267136 ms, 0 untimed. Temporary download removed. Slice 1 will inspect its own hosted schema-2 artifact through this same route. |

The API probe used the copied modules that CI will run; unmodified copies and
Node built-ins make that profile equivalent for collector semantics. It does
not claim to have observed a new hosted run or rendered Intent UI. There is no
new UI behavior to implement; the installed unit-aware proof contract owns the
consumer boundary. The existing artifact download route is available. No
remaining decisive premise requires an early probe or a human decision.

## Ordered slices

### 1. Show individual cases while preserving pre-case failures
Type: Behavior
Status: planned
Proof: `pnpm test:ci-proof`, workflow/README review, unmodified-copy comparison,
then the execution workflow's hosted CI result and summary artifact inspection.

Accepted local proof (coordinator): `pnpm test:ci-proof` 5/5 after producer/collector
migration and post-change test-file cohesion refactor. Seven `scripts/ci-proof/ci-proof-*.mjs`
modules byte-identical to `.claude/skills/dough-test-optimization/scripts/`. Workflow
declares `--expect terry-moves/tests=1:case` and `…=1:file`. README documents both
units. Hosted summary artifact inspection remains owed on the published revision
(`progress: true` until that observation).

Learnings: collector-only delivery breaks the Jest publisher (`unit is not case,
file, legacy`); migrate producer and collector together. Unit-qualified fragment
filenames are required for case+file coexistence on the same part.

Behavior: given a usable Jest report for the selected attempt, publishing and
collecting it produces explicit case counts with truthful per-file outcomes
and timings, plus independent file evidence for failures before cases; given
no usable report, collection instead shows missing declared evidence.

Copy the seven collector modules, adapt the Jest converter and its unit-qualified
fragment outputs, declare both units in CI, update the existing end-to-end CLI
tests and README, and complete slice-local refactoring as one coherent change.
Keep all regression examples above in this proof loop. A collector-only or
publisher-only intermediate state is not deliverable.

Size: one bounded conversion/collection outcome and one focused proof loop.
No numeric target or hard limit is supplied. Expected editable files currently
have 136 lines (converter), 114 (tests), 110 (workflow) and 50 (README); existing
collector copies have 132–235 lines and installed replacements 91–249. None
requires an oversized-file reorganization. Keep hand-authored code cohesive
under the installed 250-line refactor check; copied modules remain unchanged.

Safe stopping point: the complete producer/collector migration passes focused
proof and preserves failing/missing outcomes before delivery. There is no
interim behavior or subsequent feature needed to make this slice useful.

## Verification and delivery

Use the installed `dough-execute-plan` workflow when execution is authorized,
including independent post-change refactoring, agent commits, delivery and CI
failure ownership. `AGENTS.md` selects these installed workflows and forbids
unauthorized pushes; this preparation does not authorize implementation.

Local checks: the complete focused CLI suite above, seven module byte comparisons
against the installed recipe, and `git diff --check`. No broader local suite is
required by project guidance for this CI-only change; the unmodified Remotion
runner, films and Slidev code are outside the changed behavior. Hosted CI still
runs its configured JavaScript, TypeScript, lint and Python checks and failures
remain owned by execution.

After a candidate's CI finishes, download that run attempt's summary artifact,
validate its repository/run/attempt/revision and schema, and inspect separate
case/file evidence with truthful present/missing parts. Preserve the existing
artifact name and 30-day retention. This works on an execution branch's push
run; the story needs no trunk-only operation or landing checkpoint.

## Plan review

Slice-plan refinement was not needed: one cohesive behavior keeps the format
migration and every affected producer/collector consumer in one proof loop,
uses the existing unit/figure model and has no independent second outcome.
No remaining slice-specific concerns were identified in this review.

## Story obligations

### G-excl-19.1. No Intent UI implementation changes
Reported: slice 1 — "Exclusion: Intent UI implementation changes"
Story clause: "no Intent UI or comparison implementation changes"
Disposition: excluded "no Intent UI or comparison implementation changes"
Commitment: 19.1

### G-excl-19.2. No Intent comparison implementation changes
Reported: slice 1 — "Exclusion: Intent comparison implementation changes"
Story clause: "no Intent UI or comparison implementation changes"
Disposition: excluded "no Intent UI or comparison implementation changes"
Commitment: 19.2

### G-excl-19.3. No new proof locations
Reported: slice 1 — "Exclusion: new proof locations"
Story clause: "new proof locations"
Disposition: excluded "new proof locations"
Commitment: 19.3

### G-excl-19.4. No additional test runners
Reported: slice 1 — "Exclusion: additional test runners"
Story clause: "additional test runners"
Disposition: excluded "additional test runners"
Commitment: 19.4

### G-excl-19.5. No new timing measurement scheme
Reported: slice 1 — "Exclusion: a new/changed timing measurement scheme"
Story clause: "timing measurement scheme"
Disposition: excluded "timing measurement scheme"
Commitment: 19.5

### G-excl-19.6. No test-suite optimization
Reported: slice 1 — "Exclusion: test-suite optimization"
Story clause: "test-suite optimization"
Disposition: excluded "test-suite optimization"
Commitment: 19.6

### G-excl-19.7. No relabeling historical results
Reported: slice 1 — "Exclusion: relabeling historical unit-less results"
Story clause: "this story does not relabel historical results"
Disposition: excluded "this story does not relabel historical results"
Commitment: 19.7

### G-excl-19.8. No promised legacy versus explicit-unit count/time differences
Reported: slice 1 — "Exclusion: promising count or time differences between legacy and explicit-unit builds"
Story clause: "or promise count/time differences between legacy and explicit-unit builds"
Disposition: excluded "or promise count/time differences between legacy and explicit-unit builds"
Commitment: 19.8
