# Source review: SEED-002#publish-terry-moves-ci-proof

Launch: fresh general-purpose subagent, no conversation inheritance, 2026-11-05.
Input: only the story's Goal, Scope and Key examples text from
`.planning/seeds/SEED-002-publish-terry-moves-ci-proof.md`; told to read no
project files, change nothing, and return numbered commitments.

## Commitments

| Id | Source commitment | Slice | Observation or obligation |
| --- | --- | --- | --- |
| 1 | A Terry Moves developer reviewing a CI run sees, in the Open Dough dashboard's Intent → CI status tab, how many of the Remotion unit tests under `terry-moves/tests` that ran passed and how many failed, without opening the Actions log. | slice 1 | observed: Intent → CI status (dashboard 127.0.0.1:4173, headless Chrome, 2026-11-05 16:13) for claude/publish-terry-moves-ci-proof-for-intent: Proof 'Attempt 1 of run 41993294917 at f712d65. terry-moves/tests: 1093 passed checks; 1 of 1 part present.' (zero failed omitted by the tab's count renderer); Jest log of that run 'Tests: 1093 passed, 1093 total' |
| 2 | CI results become part of the same Intent view used to judge the films' tested behaviour. | slice 1 | observed: Intent → CI status (dashboard 127.0.0.1:4173, headless Chrome, 2026-11-05 16:13) for claude/publish-terry-moves-ci-proof-for-intent: Proof 'Attempt 1 of run 41993294917 at f712d65. terry-moves/tests: 1093 passed checks; 1 of 1 part present.' (zero failed omitted by the tab's count renderer); Jest log of that run 'Tests: 1093 passed, 1093 total' |
| 3 | A new `.planning/open-dough.json` configures `terry-moves/tests` as this project's one and only Intent location. | slice 1 | observed: .planning/open-dough.json intent.locations has the single path terry-moves/tests |
| 3.1 | The Intent location's kind is `typescript`. | slice 1 | observed: .planning/open-dough.json kind "typescript" |
| 3.2 | The Intent location covers its `*.spec.ts` files. | slice 1 | observed: .planning/open-dough.json include "**/*.spec.ts" |
| 3.3 | The Intent location covers its `*.spec.tsx` files. | slice 1 | observed: .planning/open-dough.json include "**/*.spec.tsx" |
| 3.4 | The Intent location covers its `*.test.ts` files. | slice 1 | observed: .planning/open-dough.json include "**/*.test.ts" |
| 4 | No retained proof is configured: neither `proof` nor `proofGeneration` is added. | slice 1 | observed: .planning/open-dough.json has no proof or proofGeneration key |
| 5 | The work follows the GitHub Actions path (steps 1–6) of the installed CI proof summary recipe. | slice 1 | observed: CI run 41992379034 at 4db999c: steps 1–6 applied; step-6 gh api listing names ci-proof-summary-attempt-1 and its zip holds only ci-proof-summary.json |
| 5.1 | The judged workflow stays the default `ci.yml`. | slice 1 | observed: .planning/open-dough.json sets no ciWorkflow; steps added to .github/workflows/ci.yml |
| 5.2 | The project sets no `ciAdapter`, so the recipe's new CI-adapter path (guidance 0.3.86) does not apply. | slice 1 | observed: .planning/open-dough.json has no ciAdapter key |
| 6 | The existing Remotion tests step in the `node` job writes Jest's JSON report. | slice 1 | observed: .github/workflows/ci.yml step `remotion-tests` runs `test:unit --json --outputFile=${RUNNER_TEMP}/jest-report.json`; local replay wrote the report (1093 tests) |
| 7 | Project-owned code converts the Jest JSON report into one outcome line per test. | slice 1 | observed: scripts/ci-proof/jest-outcomes.mjs; local replay 1093 lines for 1093 Jest tests |
| 7.1 | Each outcome line is named by the test's repository-relative file. | slice 1 | observed: local scratch replay lines `terry-moves/tests/silentScene/joins.spec.ts` etc. |
| 8 | The `node` job keeps one fragment for the run attempt. | slice 1 | observed: CI run 41992379034 at 4db999c: node job artifact ci-proof-fragments-node-1-attempt-1 |
| 9 | A collector job publishes the run's `ci-proof-summary-attempt-<n>` artifact. | slice 1 | observed: CI run 41992379034 at 4db999c: artifact ci-proof-summary-attempt-1 (id 13398119287), runId 41992379034, runAttempt 1, revision 4db999c |
| 9.1 | The artifact is kept for 30 days. | slice 1 | observed: .github/workflows/ci.yml ci-proof job upload `retention-days: 30` |
| 10 | Outcomes are still published when tests fail. | slice 1 | observed: local scratch failing replay printed `terry-moves/tests: 11 passed, 2 failed, 1 other checks`; ci.yml fragment and keep steps run under `!cancelled()`, collector `if: !cancelled()` |
| 11 | When the tests never ran (for example, install failed), the run still publishes a summary that shows the part as missing. | slice 1 | observed: local summarize over empty fragments printed `part 1 of 1 missing`; ci.yml fragment step skipped by `steps.remotion-tests.outcome != 'skipped'`, collector runs under `!cancelled()` |
| 12 | Required restriction: the proof steps never change the verdicts of the existing checks, so the tab's verdict stays the project's own CI result. | slice 1 | observed: CI run 41992379034 at 4db999c: node, python jobs succeed with their existing steps; proof is the separate ci-proof job; no existing step gained a condition |
| 12.1 | The proof steps never change the Remotion tests verdict. | slice 1 | observed: CI run 41992379034 at 4db999c: Remotion tests step success, Jest 'Tests: 1093 passed, 1093 total'; step condition unchanged |
| 12.2 | The proof steps never change the lint and typecheck verdict. | slice 1 | observed: CI run 41992379034 at 4db999c: Remotion lint and Remotion typecheck success; steps unchanged |
| 12.3 | The proof steps never change the Slidev typecheck verdict. | slice 1 | observed: CI run 41992379034 at 4db999c: Slidev typecheck success; step unchanged |
| 12.4 | The proof steps never change the Python narration checks verdict. | slice 1 | observed: CI run 41992379034 at 4db999c: Python narration tests job success; job unchanged |
| 13 | Scope limit: the narration tests (`scripts/`) are not an Intent location here. | slice 1 | observed: .planning/open-dough.json lists only terry-moves/tests |
| 14 | Scope limit: Slidev is not an Intent location here. | slice 1 | observed: .planning/open-dough.json lists only terry-moves/tests |
| 15 | Scope limit: no retained Jest proof snapshot is added. | slice 1 | observed: diff adds no proof snapshot file |
| 16 | Scope limit: nothing changes about which tests run or how they run. | slice 1 | observed: ci.yml Remotion tests step only adds Jest's `--json --outputFile` report flags; same command and selection (1093 tests locally) |
| 17 | Example (all pass): when every Remotion test passes on a pushed revision, that run's CI status tab shows Proof for `terry-moves/tests`, with the same passed count Jest logged and 0 failed. | slice 1 | observed: Intent → CI status (dashboard 127.0.0.1:4173, headless Chrome, 2026-11-05 16:13) for claude/publish-terry-moves-ci-proof-for-intent: Proof 'Attempt 1 of run 41993294917 at f712d65. terry-moves/tests: 1093 passed checks; 1 of 1 part present.' (zero failed omitted by the tab's count renderer); Jest log of that run 'Tests: 1093 passed, 1093 total' |
| 18 | Example (one fails): when one Remotion test fails, the `node` job still fails as it does today. | slice 1 | observed: local scratch failing replay jest exit 1; ci.yml Remotion tests step unchanged in condition and has no continue-on-error |
| 18.1 | In that case the summary shows the failed count alongside the passed ones. | slice 1 | observed: local scratch failing replay `terry-moves/tests: 11 passed, 2 failed, 1 other checks` |
| 19 | Example (install fails): when dependency install fails and the tests never run, the run still fails as it does today. | slice 1 | observed: ci.yml install step unchanged; new steps add no continue-on-error |
| 19.1 | In that case the tab shows `terry-moves/tests` as missing rather than as a count. | slice 1 | observed: local summarize over empty fragments: `parts:[{part:1,status:"missing"}]` |
| 20 | Example (re-run): when a run is re-run, the tab shows the new attempt's summary. | slice 1 | observed: ci.yml summary artifact named `ci-proof-summary-attempt-${{ github.run_attempt }}` |
| 20.1 | The tab never shows the earlier attempt's fragments for the re-run. | slice 1 | observed: ci.yml fragment artifacts named `…-attempt-${{ github.run_attempt }}` and collector downloads only that attempt's pattern |
