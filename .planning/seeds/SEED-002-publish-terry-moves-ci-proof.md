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

**Outcome:** A Terry Moves developer can see the Remotion unit test
outcomes for a run in the Open Dough dashboard's **Intent → CI status** tab.

Configure `terry-moves/tests` as an Intent location. Follow the
[installed CI proof recipe](../../.agents/skills/dough-test-optimization/references/ci-proof-summary.md)
to collect Jest outcomes from the existing Remotion test step in
[CI](../../.github/workflows/ci.yml). Publish a compact summary for the
same run and attempt, including available outcomes after test failures.

**Acceptance:** A real GitHub Actions run produces a readable summary for
the Terry Moves tests and the dashboard displays the matching totals. The
existing Remotion, Slidev, and narration checks continue to report their own
verdicts.
