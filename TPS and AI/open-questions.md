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
- Where does the analogy break down because software work combines discovery
  and production?

## Evidence to collect

- Primary Toyota sources defining TPS and the Toyota Way today.
- Historical sources for the development and international diffusion of TPS
  and lean production.
- Larman and Vodde's original Lean Thinking house and accompanying explanation.
- Evidence about Toyota's software, mobility, invention, and experimentation
  capabilities beyond conventional production.
- Evidence about AI's effect on software generation speed and on downstream
  review or verification costs.

## Candidate future claims

Add each new claim as a separate file under `claims/` only after Terry has
stated the hypothesis. Keep the sequence:

**original claim → research-based adjustment → emerging implication → open
questions**

### Backlog

1. **Jidoka enables, JIT trusts, Respect for People grows.** "Jidoka is about
   enabling people; JIT is about trusting people; Respect for people grows
   people." Terry's claim, origin uncertain — he is not sure whether this is
   his own formulation or something remembered from elsewhere. Before writing
   this up as a claim: search for similar triads or framings in TPS/lean
   literature (Ohno, Liker, Toyota's own materials); collect ideas that
   support or complicate it.

2. **SMED, switching cost, and LeSS full-cycle feedback.** Like TPS, LeSS
   needs rapid switching between work items so priority stays on delivering
   user value and getting full-cycle feedback; once value is delivered and/or
   feedback is received, a resulting change of direction also triggers
   switching. Lowering switching cost therefore matters. Jidoka helps reduce
   switching cost. On top of that, SMED — Single-Minute Exchange of Die
   (Terry recalled this as "STED / single touch exchange of die"; name needs
   verification) — is specifically about reducing the number of steps in a
   changeover. This line of thought leads toward the idea of an "AI-friendly
   development context." Before writing this up: confirm SMED's correct name
   and definition; work out the mapping between manufacturing changeover and
   switching between software work items; define what "AI-friendly
   development context" concretely means.

3. **Jidoka as autonomation across intelligence levels.** Jidoka preserves
   high-intelligence learning by pairing it with low-intelligence automation
   (autonomation). Proposed levels: "high intelligence" — a human or an AI
   solving a problem by consuming a large amount of tokens/effort; "low
   intelligence" — automated tests that follow a fixed scenario with simple
   assertions; "no intelligence" — a highly cohesive design that removes the
   need for smartness altogether. Implication: use "no intelligence" design
   plus "low intelligence" jidoka so that "high intelligence" (human or AI)
   is freed to focus on learning. Before writing this up: check the framing
   against the standard definition of autonomation (automation with a human
   touch, stopping on abnormality); stress-test whether the three-tier
   intelligence framing holds up.
