# 043: Publish Terry Moves CI proof for Intent

## Source

[Publish Terry Moves CI proof for Intent](../../seeds/SEED-002-publish-terry-moves-ci-proof.md#publish-terry-moves-ci-proof)

**Source review:** [source-review.md](source-review.md)

**Identity:** SEED-002#publish-terry-moves-ci-proof

## Goal and scope

A Terry Moves developer sees, in Intent's **CI status** tab, the passed and
failed Remotion unit test counts for `terry-moves/tests` in the shown GitHub
Actions run, including after test failures, while every existing CI check
keeps its own verdict.

Included: `.planning/open-dough.json` with the one Intent location; the four
collector modules copied from the installed guidance; a Jest-report
conversion; fragment and collector steps in `.github/workflows/ci.yml`.

Excluded: the recipe's CI-adapter path (this project is judged on GitHub
Actions `ci.yml` and sets no `ciAdapter`); narration and Slidev as Intent
locations; retained Jest proof snapshots; changes to which tests run.

Assumptions: the dashboard reads the repository as `terryyin/terry-talks` with
the developer's signed-in `gh` (observed signed in as `terryyin`, 2026-11-05).

## Outside-in proof

| Key example | Signal |
| --- | --- |
| All pass → tab shows matching passed count, 0 failed | Real CI run of the delivered revision: `ci-proof-summary-attempt-1` artifact listed and downloaded with `gh api` (recipe step 6); its `passed` equals the Jest `Tests:` line of the same run's **Remotion tests** step; Intent → CI status shows Proof for `terry-moves/tests` with that count |
| One test fails → failed count shown, `node` job still fails | Local: the committed workflow commands run on a Jest report from a scratch failing spec (reverted) print `terry-moves/tests: N passed, 1 failed`. CI: the fragment and keep steps run under `!cancelled()`; no failing commit is pushed |
| Install fails → part shown missing | Local: `summarize` over an empty fragments directory reports `terry-moves/tests` missing; CI: fragment step skipped by `steps.remotion-tests.outcome != 'skipped'` |
| Rerun → new attempt only | Artifact names carry `run_attempt`, as the recipe prescribes; no rerun is forced |
| Existing verdicts unchanged | Same CI run: `node` and `python` jobs report their steps as before; the new `ci-proof` job is separate and none of the existing steps gained conditions |

## Ordered slices

### 1. CI publishes the Terry Moves proof summary
Type: Behavior
Status: done
Proof: local replay of the workflow's fragment/summarize commands (pass, scratch failure, empty fragments), then the real CI run and dashboard observation above

Behavior: a revision pushed to GitHub → the CI run's `node` job writes a
fragment for `terry-moves/tests` from Jest's report after the Remotion tests
step, pass or fail, and the `ci-proof` job publishes
`ci-proof-summary-attempt-<n>` → Intent's CI status tab shows the run's
Terry Moves totals.

Work:

- `.planning/open-dough.json`:
  `{"intent":{"locations":[{"path":"terry-moves/tests","kind":"typescript","include":["**/*.spec.ts","**/*.spec.tsx","**/*.test.ts"]}]}}`
  (shape as in other Open Dough projects with a proofless location).
- Copy `ci-proof-contract.mjs`, `ci-proof-summary.mjs`,
  `ci-proof-fragments.mjs`, `ci-proof-collect.mjs` unchanged from
  `.claude/skills/dough-test-optimization/scripts/` (guidance 0.3.86) into
  `scripts/ci-proof/`, and add `scripts/ci-proof/jest-outcomes.mjs`: reads a
  Jest `--json` report and prints `<passed|failed|other>\t<repo-relative
  file>` per assertion result (relative to `git rev-parse --show-toplevel` /
  `GITHUB_WORKSPACE`).
- `ci.yml`: workflow-level `CI_PROOF_REVISION`; give **Remotion tests**
  `id: remotion-tests` and run
  `pnpm -C terry-moves test:unit --json --outputFile="${RUNNER_TEMP}/jest-report.json"`;
  add the recipe's step-3 fragment and keep steps (`--part 1 --of 1`); add
  the step-4 `ci-proof` job (`needs: [node]`, `--expect terry-moves/tests=1`,
  Node 24, summary retention 30 days). Use the project's existing
  `actions/checkout@v7` / `actions/setup-node@v7` pins; for the artifact
  actions use the current major release (v4 or later, as pattern download
  requires).

## Accepted proof (slice 1, local)

Local replay 2026-11-05 at 782b938, Node 24.21, of the committed workflow
commands with `RUNNER_TEMP` in a scratch dir:

- Full `pnpm -C terry-moves test:unit --json --outputFile="${RUNNER_TEMP}/jest-report.json"`
  → `jest-outcomes.mjs` → `fragment --part 1 --of 1` → `summarize --expect terry-moves/tests=1`:
  Jest `Tests: 1093 passed`; collector `terry-moves/tests: 1093 passed, 0 failed, 0 other checks`.
- Scratch failing spec (1 fail, 1 pass, 1 skipped) plus a scratch suite with a
  compile error, with `tests/silentScene/joins.spec.ts` (scratch files deleted):
  jest exit 1; `terry-moves/tests: 11 passed, 2 failed, 1 other checks`.
- `summarize` over an empty fragments directory: `part 1 of 1 missing`, exit 0.

Refactor: independent pass returned `## REFACTOR COMPLETE`, no edits. Consumer
trace: `terry-moves/package.json` `test` (calls `test:unit` without flags) and
READMEs/records excluded — the change only adds report flags in CI.

CI run 41992379034 (push, attempt 1) of 4db999c: success. Jobs `node`,
`python` and `ci-proof` succeed; every existing step succeeds unchanged. Jest
logged `Tests: 1093 passed, 1093 total`; the collector logged
`terry-moves/tests: 1093 passed, 0 failed, 0 other checks`. Recipe step 6 as
`terryyin` with `gh api`: the run lists `ci-proof-fragments-node-1-attempt-1`
and `ci-proof-summary-attempt-1` (id 13398119287, not expired); its zip holds
only `ci-proof-summary.json` with repository `terryyin/terry-talks`, runId
41992379034, runAttempt 1, revision 4db999c, passed 1093, failed 0.

Intent → **CI status** (observed 2026-11-05 16:13 by driving the local
dashboard at 127.0.0.1:4173 in headless Chrome over DevTools: project
`terry-talks`, Select story, Intent perspective, CI status) for
`claude/publish-terry-moves-ci-proof-for-intent`: "Passed at f712d65", Proof
"Attempt 1 of run 41993294917 at f712d65. terry-moves/tests: 1093 passed
checks; 1 of 1 part present." The tab omits zero counts, so failed = 0; that
run's Jest log reads `Tests: 1093 passed, 1093 total`. The same tab on `master`
(782b938, before this change) reads "This run published no CI proof summary."

## Learnings

- When the Chrome extension is not connected, the dashboard tab can still be
  observed by driving the system Chrome headless over DevTools against the
  local dashboard; its read endpoint accepts only same-origin page requests.

- `jest-outcomes.mjs` emits one `failed` line for a suite that failed before
  any test ran (e.g. a compile error), so such a failure is not invisible.
- Artifact actions pinned to the current majors, `upload-artifact@v7` and
  `download-artifact@v8`; both still zip by default.

## Execution complete

Product advice: no change. The delivered CI proof matches the story with no
correction needed. It sits outside the near-future film direction but was
Terry's explicit priority. When Open Dough guidance updates change the
collector, recopy `scripts/ci-proof/ci-proof-*.mjs` as the recipe says.

## Current decisions

- GitHub Actions path only; the 0.3.86 CI-adapter path is not used.
- After-failure behaviour is proved locally, not by pushing a failing commit.

## Premises

| Premise | Consuming operation | Observation | Result |
| --- | --- | --- | --- |
| Jest's JSON report names each test's file and outcome, also when a test fails, and the 0.3.86 collector accepts the converted lines | Remotion tests step + fragment/summarize | 2026-11-05 at 1517e07 (guidance 0.3.86), Node 24.21: `node --experimental-vm-modules node_modules/jest/bin/jest.js tests/silentScene/validation.spec.ts tests/silentScene/joins.spec.ts --json --outputFile=…` with a scratch failing test (reverted); converted with a scratch equivalent of `jest-outcomes.mjs`; `ci-proof-summary.mjs fragment … --entry terry-moves/tests --part 1 --of 1` then `summarize --expect terry-moves/tests=1` | jest exit 1; `terry-moves/tests: 56 passed, 1 failed, 0 other checks`; summary JSON valid |
| `pnpm -C terry-moves test:unit` forwards `--json --outputFile` to Jest | Remotion tests step | 2026-11-05, same revision: `pnpm -C terry-moves test:unit tests/silentScene/joins.spec.ts --json --outputFile=<tmp>/p.json` | report written; 10 passed, 1 suite. Local macOS vs CI ubuntu-latest with the same pnpm script and Node 24: path handling is relative-to-root in both, so the difference cannot change the outcome |
| Artifact upload, dashboard read and display for a real run | Slice 1 proof after publication | Not observable before a push (state-changing); `gh auth status` signed in as `terryyin` | Covered by slice 1's own post-publication proof; failure there changes the plan |

## Concern evidence

Refinement not needed: one cohesive slice following an installed recipe, with
its decisive local premises observed. No remaining slice-specific concerns
were identified in this review.
