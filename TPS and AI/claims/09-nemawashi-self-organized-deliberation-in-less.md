# Claim 9: Nemawashi supports self-organized deliberation in LeSS

**Status: Provisional — origin, decision role, and LeSS mapping
researched; not a finalized talk beat**

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

The LeSS application is an interpretation, not a named LeSS practice. The
origin needs the same layer distinction as
[Claim 16](16-go-see-ai-harness.md) for Go-See and
[Claim 20](20-poka-yoke-supports-jidoka-not-a-tps-pillar.md) for
poka-yoke.

> **Nemawashi is Japanese groundwork for a change, not a TPS pillar.
> Toyota uses it as a decision habit: discuss problems and options with
> those affected, improve the proposal, then implement quickly. Authority
> stays explicit. LeSS does not use the word. The useful mapping is Just
> Talk and informal networks preparing a named decision—not
> manager-convened consensus, and not a synonym for agreement.**

### Placement: Japanese practice, Toyota Way habit, not a TPS pillar

根回し (*nemawashi*) is older than Toyota. Japanese dictionaries keep the
gardening sense—cut and prepare a tree's roots before transplanting—and
the transferred sense: take steps in advance so a negotiation or meeting
goes smoothly. *デジタル大辞泉* also glosses the transferred sense as
**下工作** (laying groundwork). That is ordinary Japanese organizational
practice, including government and firms that never ran TPS.

Toyota did not invent it. Toyota UK's glossary says the word came to mean
an informal process of laying a foundation and building consensus **within
the Toyota Production System—and Japanese culture itself**. The same
article calls it an aspect of the Toyota Way, part of TPS, and one item in
a popular thirteen-term glossary that also includes poka-yoke and hansei.
That mixed placement is teaching language, not Toyota's operating
architecture.

| Source | How it places nemawashi |
|---|---|
| **Toyota's official TPS overview** | Not named. The two pillars remain **jidoka** and **Just-in-Time**. |
| **Toyota Way 2001** | Not one of the five concepts (Challenge, Kaizen, Genchi Genbutsu, Respect, Teamwork). Official English for genchi genbutsu already includes going to the source “to make correct decisions, **build consensus** and achieve goals.” Consensus sits inside Go-See, not as a sixth value. |
| **Toyota UK glossary** | Informal groundwork and consensus-building; first step in decision-making; TPS *and* Japanese culture. |
| **Liker, Principle 13** | English lean literature's named home: make decisions slowly by consensus, thoroughly considering options; implement rapidly. Nemawashi is the process of discussing problems and potential solutions with those affected. |

So the original hypothesis's “TPS—or perhaps more broadly the Toyota Way”
is the right *uncertainty*, and the broader answer is the accurate one.
Nemawashi is a Japanese decision habit Toyota uses. It is not a peer of
jidoka and JIT.

### What it does in a decision

Nemawashi is the informal work *before* a formal decision, not the
allocation of decision rights. Share the situation, seek opinions, surface
concerns, revise the proposal, then take the formal step. Toyota UK:
successful nemawashi lets changes go ahead with the **consent** of the
parties. Liker: once a decision is made, the stage is set for **rapid
implementation**.

Liker and Meier are explicit that the surface slogan misleads:

> The real key is not consensus but exploring potential problems and
> solutions to get to the best possible answer.

When someone brings a solution, the questions are: how do you know the
real problem, and **who have you spoken to**? The second question is
nemawashi as a quality check on the thinking, not a vote.

Those effects should not be collapsed into one word:

| Effect | Supported? |
|---|---|
| A better proposal (knowledge from people the change will touch) | Yes — that is the point of asking who you spoke to. |
| Informed participation; a fair hearing | Yes. Liker: not everyone gets what they personally want. |
| Consent / alignment so implementation is not a surprise fight | Yes — the gardening metaphor: prepare the roots so the transplant survives. |
| Unanimous enthusiasm | No. Alignment and consent are not the same as everyone preferring the same option. |
| The formal decision itself | No. Ringi, an A3 review, a management approval, or an ADR status change is later. The conversations are what produce the artifact. |

Art Smalley's useful cut: the A3 (or ringi-sho) is the **artifact**;
nemawashi is the **process** that produces it. Skip the conversations and
the document stalls or is sent back, often because the process was wrong,
not because the idea was.

Liker's product-development illustration is the K4 (*kozokeikaku*) binder
of study drawings before vehicle styling is frozen: engineering issues and
countermeasures circulate widely—more than a hundred signatures in the
case he reports, including a non-engineer vice president—so integration
problems are argued on paper before metal. That is preparatory
consultation changing a proposal, with a chief engineer still owning the
vehicle.

### Who retains authority

Toyota's preferred pattern in Liker's chapter on this principle is group
consensus **with management approval**. Management can still take input
and then decide, especially if the group cannot align or speed is
required. The philosophy is maximum involvement *appropriate to the
situation*, not a rule that the group governs.

The typical Toyota picture in that literature is also **hierarchical**:
someone junior develops a proposal and circulates it for management
approval. By the formal meeting, surprise opposition should already have
been heard. That is prepared decision-making. It is not, by itself,
LeSS-style self-management.

A Tokyo audience already knows the ambivalent everyday word. The same
practice can be:

- **enabling:** the people closest to the work improve the proposal and
  are not ambushed by a meeting;
- **coercive:** 下工作 that manufactures consent, hides disagreement, or
  becomes an invisible veto chain.

The talk should keep that split visible. Nemawashi is not automatically
cooperative just because consultation happened.

### LeSS does not name nemawashi

Primary LeSS material on self-management, coordination, communities, and
the Product Owner does not discuss nemawashi. The connection is an
interpretation from overlapping habits, not a LeSS label.

What LeSS actually specifies:

- A self-managing team executes the work, monitors progress, decides
  **how** to work, and handles its own process conflicts. It does not, by
  the Hackman ladder LeSS cites, own organizational design or product
  direction.
- **All prioritization goes through the Product Owner.** Clarification is
  as direct as possible between teams and customers. The PO is a
  connector, not an intermediary—and not a coordinating project manager
  of conversations.
- **Cross-team coordination is decided by the teams.** Prefer
  decentralized, informal coordination. Emphasize **Just Talk** and
  informal networks: communicate in code, multi-team meetings, component
  mentors, travelers, scouts, open space.
- A component mentor is a teacher and steward, **not a gate**. Code is
  not approved through that person.
- Managers are optional. If they exist, they improve the development
  system (Go See, Stop & Fix, experiments over conformance), not the
  Sprint.

[Claim 3](03-jidoka-enables-jit-trusts-respect-grows.md) already rejects
dependable inter-team relationships as the LeSS translation. Nemawashi
must fit **Whole Product Focus**: integration of shared work can pull
collaboration; earlier conversation is not forbidden. [Claim
8](08-technical-excellence-enables-jit-coordination-in-less.md) is the
technical precondition that makes that pull cheap enough.

Just Talk and nemawashi **rhyme**—anyone on a self-managing team may
initiate; you do not wait for a manager to convene the official
channel—but they are not the same timescale.

| | **Just Talk** (LeSS) | **Nemawashi** (Toyota / Japanese usage) |
|---|---|---|
| Trigger | A concrete coordination need, often from integrated work or a shared item | A consequential change that will be hard to reverse |
| Move | Get up and talk; do not wait for Scrum of Scrums | Go around the people the change will touch *before* the formal step |
| Failure if skipped | Hidden dependency, late conflict, coordinating-role bottleneck | Surprise opposition, rework in implementation, a meeting that is the first hearing |
| Failure if overdone | Formal coordination theatre | Slow politics, hidden approval, consent without disagreement |

The mapping by **scope**:

| Scope | Who owns the decision | What preparatory talk is |
|---|---|---|
| How one team works | The team | Ordinary team conversation. Do not dress it up as a Toyota ritual. |
| Day-to-day cross-team sync | The teams | Just Talk / communicate in code, pulled by the integrated product. |
| Shared conventions (Definition of Done, architecture, tooling) | Named agreement among teams; CoPs teach, they do not approve | Closest software analogue of nemawashi: circulate, revise, then make the agreement explicit—**without** recreating a component-team gate. |
| Product priority | The Product Owner | Teams and stakeholders prepare information; they do not replace PO authority. |
| Organizational design | Managers (if any) and adopters | Closest to classical Toyota circulation of a proposal toward people who can change the system. |

[Claim 4](04-jit-assurance-resourcefulness-and-constraint.md) already
treats those conventions as a **supporting condition** for reducing WIP:
take away constraints on self-integration and self-coordination, and keep
collaborative decision-making under kaizen. Without that, low WIP becomes
paralysis or heroic escalation. The research supports that reading. It
does not support saying LeSS “uses nemawashi.”

### This project's ADR is a compact analogue, with a boundary

The repository's ADR lifecycle deliberately separates proposing,
deliberating, deciding, and preserving. That is closer to **artifact plus
named authority** than to a circle of informal conversations.

| Nemawashi / Toyota decision habit | This repo's ADR |
|---|---|
| Informal groundwork that reshapes a proposal | Status stays **Proposed** while you re-read, stress-test alternatives, and walk ready-to-accept checks |
| Formal decision | Only the owner moves it to Accepted or Rejected; that status change *is* the approval |
| A3 / ringi-sho as the written vehicle | The ADR file |
| Hierarchical circulation for stamps | **Absent.** Solo playbook: no advice round, no consensus step |
| Preserve the reasoning | Accepted ADRs remain the recommendation; Rejected and Superseded stay for archaeology |

The solo-owner boundary in [Accepted ADR
0000](../../docs/adrs/0000-use-adrs-accepted.md) is therefore a feature of
the example, not a defect to hide. Agents may help research or challenge
a proposal; they cannot approve it. That illustrates **distributed input
and prepared, visible decision-making**. It is not evidence of group
consensus or team-level self-organization. The valuable demonstration is
precisely the split the original claim needs: people (and tools) closest
to the knowledge can improve a proposal without owning the decision.

## Emerging implication for the talk

[Claim 3](03-jidoka-enables-jit-trusts-respect-grows.md) names the LeSS
translation **Whole Product Focus**. If this claim is used, it extends
that account from responding to integrated work into preparing
consequential decisions:

> **Self-organization does not require decisions to arrive without
> preparation. Nemawashi can let the people closest to the knowledge
> surface concerns and reshape a proposal before the accountable
> decision is made.**

Keep Just Talk and nemawashi on different beats if both appear:

> **Just Talk is the JIT of conversation: a visible need, then go talk.
> Nemawashi is preparing a transplant: go around the roots before you
> move the tree.**

The project ADR sequence can still demonstrate a compact software form:

> **Make the proposal visible → invite relevant challenge → revise with
> the learning → make authority and status explicit → preserve the
> reasoning.**

The analogy stays bounded. An ADR is a written governance record.
Nemawashi in its strong form is still mostly face-to-face, revisable
conversation. LeSS should not be presented as requiring ADRs or naming
nemawashi. A CoP coordinator or component mentor who becomes a stamp
along the path is ringi dressed as community, which LeSS already
rejects.

For AI-augmented work the same split gets sharper. Generation makes
proposals, RFCs, and “decision records” cheap. That does not go around
the roots. An agent's review is not nemawashi. A posted document is not
the people who will live with the change. Cheap drafts raise the value of
preparatory challenge and of an explicit owner—the same jidoka concern as
[Claim 6](06-jidoka-embeds-routine-judgment.md): do not stack
unjudged artifacts and call the pile alignment.

## Questions still open

- On stage, say **nemawashi**, **根回し**, **preparatory consultation**,
  or only **Just Talk**—and how hard to push the everyday 下工作 warning
  for a Tokyo audience that already knows the word?
- How much hierarchical Toyota circulation (junior proposal, management
  approval) belongs next to the LeSS peer-to-peer reading, so the talk
  does not smuggle a coordinating manager back in?
- At what scope should a LeSS example live: multi-team Definition of
  Done, an architecture convention, Product Owner prioritization input,
  or an organizational-design change?
- Would a multi-person product-group story be needed to support the LeSS
  argument, or is the solo ADR valuable precisely because it separates
  input from authority? A doughnut-project case, if it exists, belongs on
  [Claim 13](13-doughnut-project-examples.md).
- How early can Toyota itself be shown using the *word* nemawashi in
  internal TPS or Toyota Way material, as opposed to Liker and the UK
  glossary?

## Sources consulted

1. Toyota Motor Corporation, [Toyota Production
   System](https://global.toyota/en/company/vision-and-philosophy/production-system/).
   Current official TPS: jidoka and Just-in-Time. Nemawashi is not a
   pillar. Layer distinction already in
   [Claim 2](02-tps-and-lean-houses.md).
2. Toyota Motor Corporation, [Toyota Way
   2001](https://www.toyota-global.com/company/history_of_toyota/75years/data/conditions/philosophy/toyotaway2001.html)
   and [Human Resources
   Development](https://www.toyota-global.com/company/history_of_toyota/75years/text/leaping_forward_as_a_global_corporation/chapter4/section7/item4.html)
   in *75 Years of Toyota*. Two pillars; five concepts. Nemawashi is not
   among them.
3. Toyota Motor Corporation, [Supplier Sustainability
   Guidelines](https://global.toyota/pages/global_toyota/sustainability/esg/supplier_csr_en.pdf)
   and the 2003 [management-system
   announcement](https://global.toyota/en/detail/220327). Official
   English for genchi genbutsu: go to the source to find the facts, make
   correct decisions, **build consensus**, and achieve goals.
4. Toyota UK, [What is
   nemawashi?](https://mag.toyota.co.uk/nemawashi-toyota-production-system/).
   Informal groundwork and consensus-building as the first step in
   decision-making; TPS and Japanese culture; consent of the parties.
5. Jeffrey K. Liker, *The Toyota Way* (McGraw-Hill, 2004), Principle 13
   and Chapter 19. Named English home of nemawashi: slow consensus,
   thorough alternatives, rapid implementation; discuss problems and
   solutions with those affected. K4 study drawings; fair hearing; group
   consensus with management approval.
6. Jeffrey K. Liker and David Meier, *The Toyota Way Fieldbook*
   (McGraw-Hill, 2006). The real key is not consensus but exploring
   problems and solutions; “who have you spoken to?”
7. 小学館『デジタル大辞泉』, [根回し](https://kotobank.jp/word/%E6%A0%B9%E5%9B%9E%E3%81%97-178519)
   via Kotobank. Gardening origin; transferred sense as advance
   groundwork / 下工作.
8. The LeSS Company, [Coordination &
   Integration](https://less.works/less/framework/coordination-and-integration)
   (Just Talk; component mentors are not gates), [LeSS
   Rules](https://less.works/less/rules) (teams decide cross-team
   coordination; all prioritization through the Product Owner),
   [Self-Management](https://less.works/less/management/self-managing-teams),
   and [Product
   Owner](https://less.works/less/framework/product-owner). No
   nemawashi.
9. Art Smalley, [Nemawashi](https://artoflean.com/reference/nemawashi/)
   in the Art of Lean TPS Encyclopedia. Secondary: Japanese practice
   Toyota uses; A3 as artifact versus nemawashi as process; alignment
   rather than unanimous enthusiasm. Not a Toyota primary source.
10. This repository's [Accepted ADR
    0000](../../docs/adrs/0000-use-adrs-accepted.md) and [ADR
    playbook](../../docs/adrs/README.md). Internal case; solo-owner
    boundary.

**Still open for talk wording (nemawashi vs Just Talk vs 根回し) and
whether a multi-person LeSS example is required on stage.**
