# Claim 13: Doughnut project as an evidence backlog for other claims

**Status: Backlog — examples not yet pulled; search not started**

## Role

This file is not a TPS thesis of its own. It is the queue for **concrete
examples and evidence from the doughnut project** (Terry's LeSS in Action
setting) that other claims need. Claims keep the argument; this claim
keeps the search list.

Terry uses doughnut in LeSS in Action trainings: multiple teams work at
the same time on interdependent user-centric features, in one-week
sprints, and continuously integrate. Feature teams each focus on
customer-centric value. When they integrate, conflict in the shared
product can pull collaboration.

Do not start the search from this file until Terry asks. Adding a
claim to the list below does not authorize pulling examples.

## Queued searches

### Whole Product Focus and continuous integration — Claims 3 and 8

Original hypothesis, split from
[Claim 3](03-jidoka-enables-jit-trusts-respect-grows.md). [Claim
8](08-technical-excellence-enables-jit-coordination-in-less.md) states
the technical-excellence bridge. This item is the empirical case.

> **In the doughnut LeSS in Action setting, continuous integration of
> interdependent user-centric work pulls useful cross-team collaboration
> rather than noisy interruption.**

Look for:

- Episodes where integration pulled focused collaboration that advanced
  both teams' customer-centric items.
- Episodes of interruption, flaky integration, or coordination overhead
  instead—and what was missing.
- How much of the effect depends on training design (one week, coaching,
  Whole Product Focus) versus practices that transfer to ordinary
  product groups.

### Judgment descent — Claim 6

[Claim 6](06-jidoka-embeds-routine-judgment.md) needs software examples
of the downhill movement **judgment-loaded → judgment-preserved →
judgment-removed** (**smart → dumb → gone**). From doughnut, look for
**good** examples of:

- **smart → dumb:** live investigation encoded as a closed, owned stop
  (a test, type, or check whose firing *is* the evidence and that
  actually halts work).
- **smart → gone:** a known failure made impossible or irrelevant by
  design (invalid state unrepresentable, path removed, simpler
  structure) so neither detection nor rescue is still required.

Counter-examples (generated checks nobody trusts, “smart” inventory
that still needs re-judging) can be noted if they appear, but the
request is for good descents.

### Preferred tests and same gates for “I” and AI — Claim 6

[Claim 6](06-jidoka-embeds-routine-judgment.md) also needs concrete
doughnut examples of **preferred unit tests, E2E tests, and gates that
apply to human and AI work the same way**—the harness text that is
supposed to leave reusable capability after an AI episode, not only a
one-off patch. The current rules and execute-plan skill are already
cited there in brief; this item is for worked examples in the tests
themselves.

Look for:

- Unit (“small test”) examples that drive a stable boundary with
  `makeMe` / data rather than a mock forest.
- E2E examples that assert a user-valued state change, not
  presentation-only.
- Gates that stop both a person and an agent (no commit on red,
  `@wip` for unfinished E2E, execute-plan Jidoka categories).
- Counter-examples where an agent (or a person) would be tempted to
  delete or skip a failing test to proceed.

## Talk implication

Once examples are pulled, they belong in the owning claims. This file
stays a backlog and an index, not a second lecture.

## Questions still open

- Where do the doughnut materials live, and which episodes are
  discussable in a public talk?
- Which queued searches should be filled first when the search starts?

## Sources consulted

None yet. Starting point: the doughnut project used in Terry's LeSS in
Action trainings.

**Search not started.**
