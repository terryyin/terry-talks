# Open questions and future claims

This file collects questions that span multiple claims. It is a queue for
future discussion, not a set of conclusions.

## Talk framing

- What is the exact title and promised audience takeaway for the Tokyo LeSS
  Conference talk?
- Is the talk primarily about applying TPS philosophy to AI-augmented software,
  or about using the contrast with TPS to expose what is newly difficult?
- Which audience assumptions about TPS, lean, LeSS, and AI can safely be made?
- What would make the talk useful to practitioners the following day?

## Central tension

- Is “generation is cheap; judgment is expensive” the central thesis, one
  supporting argument, or merely an opening hypothesis?
- In AI-augmented development, where does the bottleneck actually move: problem
  selection, specification, verification, integration, deployment, learning,
  or governance?
- Which TPS ideas become more important when work can be generated faster:
  jidoka, stop-the-line behavior, visual management, small batches, pull,
  respect for people, continuous improvement, or something else?
  LeSS's named principle and SMED as a never-done example are
  [Claim 18](claims/18-continuous-improvement-towards-perfection.md).
- Can technical excellence make AI-generated changes meet the integrated
  product quickly enough that real dependencies pull teams into focused,
  self-managed collaboration rather than planned coordination overhead?
  A working answer is
  [Claim 8](claims/08-technical-excellence-enables-jit-coordination-in-less.md):
  LeSS's coordination and integration channels overlap under continuous
  integration; the engineering catalog exists so the group can integrate
  continuously; use AI to reduce volume and uncertainty, and slow down
  rather than create debt faster.
- Where does the analogy break down because software work combines discovery
  and production? A working answer is
  [Claim 11](claims/11-physical-production-and-software-differences.md):
  the mixture changes units, signals, and inventory; it is not a binary of
  factory versus lab. Remaining talk choices (one sequence example, AI
  set-based exploration versus overproduction, operations as a third mode)
  stay on that claim.
- Is stacking **judgment-dependent** knowledge (generated analysis, unowned
  tests, patches that still need a person to re-judge) the distinctive
  failure of AI-assisted development, as opposed to merely generating too
  much code? [Claim
  6](claims/06-jidoka-embeds-routine-judgment.md) now names that split;
  [Claim
  4](claims/04-jit-assurance-resourcefulness-and-constraint.md) already
  has the stacking warning.

## Evidence to collect

- Primary Toyota sources defining TPS and the Toyota Way today.
- Toyota's own chronology of TPS/JIT is the historical index in
  [Claim 4](claims/04-jit-assurance-resourcefulness-and-constraint.md). Do
  not collect a second lean-diffusion history unless a later claim needs it.
- Larman and Vodde's 2009 house diagram and the *More with LeSS* lean-thinking
  principle are in [Claim 2](claims/02-tps-and-lean-houses.md). Remaining: the
  2008 book text around the diagram's center (product development, 14 Toyota
  Way principles).
- Evidence about Toyota's software, mobility, invention, and experimentation
  capabilities beyond conventional production.
- Evidence about AI's effect on software generation speed and on downstream
  review or verification costs.
- Examples from the doughnut project used in Terry's LeSS in Action
  trainings. The search list lives on
  [Claim 13](claims/13-doughnut-project-examples.md) (backlog; training
  weeks located; example search not started). Currently queued: CI
  pulling useful collaboration ([Claims
  3](claims/03-jidoka-enables-jit-trusts-respect-grows.md) and
  [8](claims/08-technical-excellence-enables-jit-coordination-in-less.md)),
  including a green pipeline that is not CI
  ([Claim 21](claims/21-ci-practice-is-not-a-ci-system.md)); the full
  sequence from AI-assisted change to integration signal, conversation,
  stop-and-fix, and delivered user value
  ([Claim 8](claims/08-technical-excellence-enables-jit-coordination-in-less.md));
  **smart → dumb** and **smart → gone**, and preferred unit/E2E plus
  same-gates-for-human-and-AI examples
  ([Claim 6](claims/06-jidoka-embeds-routine-judgment.md)).

## Candidate future claims

Add each new claim as a separate file under `claims/` only after Terry has
stated the hypothesis. Keep the sequence:

**original claim → research-based adjustment → emerging implication → open
questions**

### Backlog

*No items currently queued.*
