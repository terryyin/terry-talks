# Claim 9: Nemawashi supports self-organized deliberation in LeSS

**Status: Provisional — research not started**

## Original claim / hypothesis

> Nemawashi also comes from TPS—or perhaps more broadly from the Toyota Way.
> It is a good way to support self-organized discussion and decision-making in
> LeSS. The ADR process in this project can provide an example.

This is a lightly edited record of Terry's hypothesis. It contains three
related propositions to investigate:

1. **Origin:** nemawashi belongs to TPS, the Toyota Way, or the wider context
   from which both developed.
2. **LeSS application:** nemawashi can help people organize deliberation and
   prepare decisions without relying on a manager to coordinate every
   conversation.
3. **Concrete example:** this project's ADR process can make that pattern
   visible in a form familiar to software developers.

## Research-based adjustment

**Research is still pending.** The investigation should preserve several
distinctions rather than treating nemawashi as a synonym for consensus.

First, the historical and conceptual placement needs primary evidence. The
claim should establish whether Toyota presents nemawashi as part of TPS, as a
Toyota Way management practice, or as a broader Japanese practice that Toyota
uses. These answers overlap, but they are not interchangeable. [Claim
16](16-go-see-ai-harness.md) works the same distinction for Go-See / genchi
genbutsu: Toyota Way value and shop-floor habit.

Second, the role of nemawashi in a decision needs clarification. It may
describe the informal groundwork that precedes a formal decision—sharing a
proposal, seeking concerns, incorporating knowledge, and building support—more
than the final allocation of decision authority. Research should test whether
it improves a decision by creating informed participation, by creating
agreement, by reducing surprise during implementation, or by some combination
of these effects.

Third, the fit with LeSS should be tested against LeSS's actual account of
self-managing teams and decentralized coordination. [Claim
3](03-jidoka-enables-jit-trusts-respect-grows.md) already rejects dependable
inter-team relationships as the LeSS translation. Nemawashi must fit Whole
Product Focus and a self-managed response, not fixed coordination ties. The
important question is not merely whether discussion happens without a manager.
It is whether the people with relevant knowledge can initiate the necessary
conversations, surface disagreement early, improve a proposal, and still know
who owns the decision. [Claim
4](04-jit-assurance-resourcefulness-and-constraint.md) now treats those
conventions as a **supporting condition** for reducing WIP: take away
constraints on self-integration and self-coordination, and keep
collaborative decision-making under kaizen.

The ADR process in this repository is a useful candidate example, with one
important boundary. It deliberately separates:

- **proposing** a consequential change;
- **deliberating** through visible context, alternatives, consequences,
  reflection, and optional challenge;
- **deciding** by explicitly accepting or rejecting the proposal; and
- **preserving** the reasoning so future work does not drift silently.

However, this is a solo project. Its Accepted ADR process explicitly gives the
owner every status decision; agents may help research or stress-test a
proposal, but they cannot approve it. It can therefore illustrate distributed
input and prepared, visible decision-making, but it is not by itself evidence
of group consensus or team-level self-organization.

## Emerging implication for the talk

[Claim 3](03-jidoka-enables-jit-trusts-respect-grows.md) names the LeSS
translation **Whole Product Focus**: integration of shared work can pull
collaboration; earlier conversation is not forbidden. If the historical and
LeSS links are supported, nemawashi may extend that account from responding
to integrated work into preparing consequential decisions:

> **Self-organization does not require decisions to arrive without
> preparation. Nemawashi can let the people closest to the knowledge surface
> concerns and reshape a proposal before the accountable decision is made.**

The project ADR example may then demonstrate a compact sequence:

> **Make the proposal visible → invite relevant challenge → revise with the
> learning → make authority and status explicit → preserve the reasoning.**

The analogy should remain bounded. An ADR is a written artifact and governance
record; nemawashi may depend heavily on informal, relational conversations
that a document cannot replace. Likewise, LeSS should not be presented as
requiring ADRs or naming nemawashi unless its primary material actually does
so.

## Questions still open

- How does Toyota itself define nemawashi, and where does it place the practice:
  TPS, the Toyota Way, decision-making, problem-solving, or another category?
- What is the earliest reliable evidence connecting nemawashi specifically to
  Toyota management rather than to Japanese organizational culture generally?
- Is nemawashi intended to create consensus, informed consent, broad support,
  a better proposal, smoother implementation, or all of these?
- Who retains decision authority after nemawashi, and how is disagreement
  represented rather than suppressed?
- Does LeSS explicitly discuss nemawashi, or is the connection an
  interpretation based on self-management and decentralized coordination?
- At what scope would nemawashi be most useful in LeSS: within one feature
  team, across teams, in product decisions, or in organizational design?
- When does preparatory consultation enable self-organization, and when does
  it become slow, political, coercive, or an invisible approval process?
- Which parts of this project's ADR lifecycle genuinely resemble nemawashi,
  and which parts are simply written decision records?
- Would a multi-person ADR example be needed to support the LeSS argument, or
  is the solo example valuable precisely because it separates input from
  decision authority?

## Evidence to collect

1. Primary Toyota material defining or demonstrating nemawashi and locating it
   relative to TPS and the Toyota Way.
2. LeSS primary material on self-management, decentralized coordination,
   decision-making, and any explicit references to nemawashi.
3. Scholarly or historically grounded accounts that distinguish Toyota's use
   of nemawashi from broader Japanese usage.
4. A concrete product-development case showing how preparatory conversations
   changed a proposal, clarified authority, and affected implementation.
5. This repository's [Accepted ADR 0000](../../docs/adrs/0000-use-adrs-accepted.md)
   and [ADR playbook](../../docs/adrs/README.md) as the internal case, while
   keeping their solo-owner boundary explicit.

**Still open for research, discussion, and fact-checking.**
