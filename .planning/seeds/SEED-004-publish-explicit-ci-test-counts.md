---
id: SEED-004
status: active
planted: 2026-11-09
scope: story
---

# See Terry Moves test case counts in Intent

<a id="publish-explicit-ci-test-counts"></a>

### See Terry Moves test case counts in Intent

**Identity:** SEED-004#publish-explicit-ci-test-counts
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../quick/045-publish-explicit-ci-test-counts/PLAN.md","assessment":"ready","reasons":[],"basis":{"document":"9c5cd8013181ed5e3e16283c7c280da56aa0dd4ef6f9c71dd0d29aace1aa9bf2","plan":"7fb4836fafa93f091ab009bc47ce4d7960f414195bb239760d6c4be6c633ab34"}}
```

**Goal.** Terry Moves contributors can see the number of individual Remotion
test cases recorded for a selected CI attempt in Intent's CI status tab, so
they can distinguish case coverage from file-level failures.

**Scope.** Publish explicit test case evidence from Jest's individual assertion
results for `terry-moves/tests` through the existing CI proof pipeline. Preserve
passed, failed and other outcomes, repository-relative per-file breakdowns,
measured durations (including zero), and the number of untimed results.
A suite that fails before reporting cases remains a visible untimed test file
failure, separate from case evidence: inventing a case for it would overstate
how many individual cases the runner reported. A missing or unusable Jest
report still leaves the expected proof missing rather than reporting zero.

Use the installed Open Dough collector's explicit units and its existing
summary artifact and attempt/revision identity contract. Open Dough guidance
was updated to 0.3.94 in `49047db`; the remaining migration is the project's
copied collector, Jest converter, workflow declaration, and their proof and
documentation. Keep the collector modules as unmodified copies under the
installed CI proof recipe.

Scope limits: no Intent UI or comparison implementation changes, new proof
locations, additional test runners, timing measurement scheme, or test-suite
optimization. Earlier unit-less summaries remain legacy test results under
the existing reader; this story does not relabel historical results or promise
count/time differences between legacy and explicit-unit builds.

**Key examples.**

- Given a Jest spec reporting five assertion results, publishing the attempt
  contributes five test cases with the same passed, failed and other outcomes,
  grouped under that spec's repository-relative path.
- Given those five cases and a different suite that failed before reporting
  any cases, publishing shows five test cases and one failed test file in
  separate units. The failure adds no invented test case.
- Given passed and failed cases timed at 12 ms and 8 ms, an untimed pending
  case, and a further passed case timed at 0 ms, publishing preserves a 20 ms
  partial sum and one untimed case; a fully untimed report has no measured
  duration. The pre-case suite failure is untimed in its own file unit.
- Given no usable Jest report, collecting the attempt leaves its expected
  evidence missing. Given a valid report with no selected cases or pre-case
  failures, it instead records present zero-count evidence.
- Given an older unit-less build and an explicit-unit build, the older build
  stays legacy evidence; existing Intent comparison rules do not invent a
  case-count or timing difference between them.
