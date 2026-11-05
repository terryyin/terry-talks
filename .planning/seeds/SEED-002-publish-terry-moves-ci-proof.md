---
id: SEED-002
status: active
planted: 2026-11-05
planted_during: Terry Yin's request to prioritize CI proof adoption
trigger_when: A Terry Moves developer reviews the film test results from a CI run
scope: story
---

# SEED-002: Publish Terry Moves CI proof for Intent

<a id="publish-terry-moves-ci-proof"></a>

### Publish Terry Moves CI proof for Intent

**Identity:** SEED-002#publish-terry-moves-ci-proof
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../quick/043-publish-terry-moves-ci-proof/PLAN.md","assessment":"ready","reasons":[],"basis":{"document":"cea759461b24b47c0dbe6200ef08f9c0ac8cb2e6b7fb1833ceb860e63b0bfefb","plan":"3bf37b0e881d8d43eca47cf9fe5a81313eefeb6ce1aeeccb9bc1ded4bec4234a"}}
```

**Goal:** A Terry Moves developer reviewing a CI run sees, in the Open Dough
dashboard's **Intent → CI status** tab, how many Remotion unit tests under
`terry-moves/tests` that run passed and failed, without opening the Actions
log. This makes CI results part of the same Intent view used to judge the
films' tested behaviour.

**Scope:**

- Configure `terry-moves/tests` as this project's one Intent location in a new
  `.planning/open-dough.json` (kind `typescript`, its `*.spec.ts`,
  `*.spec.tsx` and `*.test.ts` files). No retained proof (`proof`,
  `proofGeneration`) is added.
- Follow the installed
  [CI proof summary](../../.claude/skills/dough-test-optimization/references/ci-proof-summary.md)
  recipe's GitHub Actions path (steps 1–6): the judged workflow stays the
  default `ci.yml`, and the project sets no `ciAdapter`, so the recipe's new
  CI-adapter path (guidance 0.3.86) does not apply.
- The existing **Remotion tests** step in the `node` job writes Jest's JSON
  report; a project-owned conversion turns it into one outcome line per test,
  named by its repository-relative file, and the job keeps one fragment for
  the run attempt. A collector job publishes the run's
  `ci-proof-summary-attempt-<n>` artifact, kept 30 days.
- Outcomes are published after failing tests too. A run whose tests never ran
  (install failed) publishes a summary showing the part as missing.
- **Required restriction:** the proof steps never change the verdicts of the
  existing Remotion tests, lint and typecheck, Slidev typecheck and Python
  narration checks — the tab's verdict must stay the project's own CI result.
- **Scope limits:** narration tests (`scripts/`) and Slidev are not Intent
  locations here; no retained Jest proof snapshot; no change to which tests
  run or how.

**Key examples:**

- All Remotion tests pass on a pushed revision → that run's CI status tab
  shows Proof for `terry-moves/tests` with the same passed count Jest logged
  and 0 failed.
- One Remotion test fails → the `node` job still fails as today, and the
  summary shows the failed count alongside the passed ones.
- Dependency install fails, so the tests never run → the run still fails as
  today and the tab shows `terry-moves/tests` as missing rather than a count.
- A run is re-run → the tab shows the new attempt's summary, never the
  earlier attempt's fragments.

**Plan:** [043-publish-terry-moves-ci-proof](../quick/043-publish-terry-moves-ci-proof/PLAN.md)
