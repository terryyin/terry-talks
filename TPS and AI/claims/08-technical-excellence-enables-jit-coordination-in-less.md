# Claim 8: Technical excellence enables JIT coordination in LeSS

**Status: Provisional — not finalized**

## Original claim / hypothesis

> LeSS relies on technical excellence, related to jidoka, to enable people and
> teams. It frees them—largely through ways of working they control—from
> repetitive work so that they can concentrate on adding value for users.
>
> More importantly, technical excellence enables teams to integrate
> continuously and then coordinate through self-management in a Just-in-Time
> fashion: integration reveals a need, and that need leads the teams to
> collaborate.
>
> This is how the talk about TPS and AI is related to LeSS.

This is a lightly edited record of Terry's hypothesis. The proposed causal
chain is:

> **Technical excellence → continuous integration → visible dependency or
> abnormality → self-managed collaboration when needed → more attention for
> user value.**

## Research-based adjustment

The main relationship is unusually well supported by LeSS's own material.
LeSS explicitly says that organizational agility is constrained by technical
agility, that feature teams require skilled engineering practices, and that
continuous integration is essential when several teams share product code.

The wording should nevertheless distinguish what technical excellence makes
**possible** from what the wider LeSS organizational design makes
**purposeful**.

### LeSS depends on technical agility, not organizational design alone

LeSS describes technical excellence as a precondition for changing a product
easily, quickly, and flexibly:

> **Organizational agility is constrained by technical agility.**

Changing reporting lines or adopting a framework cannot make a product group
responsive when the product is slow or dangerous to change. LeSS therefore
groups continuous integration, clean code, architecture and design, unit and
acceptance testing, test-driven development, test automation, and continuous
delivery under technical excellence.

This dependency becomes stronger with feature teams. A feature team is
long-lived, cross-functional, and cross-component, and completes an
end-to-end customer feature. How those features are cut so each can be
confirmed by 一個ずつ確認—vertical slices, not technical layers—is
[Claim 17](17-jit-vertical-slicing-one-piece-flow.md). Several feature
teams consequently change the same components and share ownership of the
product code. LeSS says this makes
modern engineering practices—especially continuous integration—essential.

Technical excellence is therefore not a polish added after LeSS has created
self-managing feature teams. It is part of the capability that lets those
teams work across the product without replacing component handoffs with
integration chaos.

### Self-management means control of process and progress, within shared bounds

Terry's phrase **“mostly by their own way of working”** is close to LeSS's
definition of self-management. LeSS says the team:

- executes the work;
- monitors whether it is on track;
- takes action when it is not on track;
- decides how to work; and
- resolves conflicts and problems in its process.

This is not complete local autonomy. The teams share one product, one Product
Backlog, one Product Owner, a common Definition of Done, one product-level
Sprint, and the obligation to create an integrated whole-product increment.
Product direction and ordering are not reinvented independently by each team.

A more precise statement is:

> **LeSS gives teams authority over how they execute, monitor, and adapt their
> work, inside common product direction, quality, and integration
> constraints.**

Those constraints are not opposed to self-management. A reliable shared
product and visible evidence are part of what allows a team to act without
waiting for a coordinating manager.

### Technical excellence can remove repetitive work, but that is not its whole role

The jidoka connection supports part of Terry's freedom claim directly.
Toyota says jidoka eliminates the need for a person merely to watch a machine:
the process detects a known abnormality, stops, makes the problem visible, and
brings people in to respond and improve it. Toyota also emphasizes that the
work must first be understood and improved by people before appropriate
judgment is built into machines.

The software analogue includes:

- automated builds, tests, checks, deployments, and environment creation;
- designs that prevent invalid states or localize the knowledge needed for a
  change;
- fast feedback that replaces repetitive manual watching; and
- regression evidence that preserves earlier learning instead of requiring
  the same investigation after every change.

This can free attention from repeated setup, checking, reconciliation, and
recovery. But **freedom from repetitive work** is too broad as a definition of
technical excellence. Skilled teams still perform necessary maintenance,
testing, refactoring, operational work, and deliberate practice. Automation
can also accelerate waste or distance people from the system when it is built
before the work and its abnormalities are understood.

A narrower formulation is:

> **Technical excellence removes or automates repeatable overhead where the
> system has learned enough to do so, while preserving fast evidence and human
> authority for exceptions.**

This connects directly to Claim 6's loop: **design out → detect and stop →
investigate and learn → design out more.**

### Continuous integration is both jidoka-like and JIT-like

LeSS's continuous-integration guidance explicitly makes both connections.

Its **jidoka-like** side is the commitment to keep a stable working system.
Small changes enter the shared mainline frequently; automated builds and tests
detect a meaningful break; the signal is visible; and fixing the break has
priority. LeSS compares the CI system to an andon and tells teams to make it
easy to fail fast, stop and fix, and learn without blame. The named
Stop & Fix practice, and why a red pipeline must actually halt work, is
[Claim 19](19-stop-and-fix.md).

Its **JIT-like** side is the removal of unintegrated work in process. Instead
of accumulating changes on branches or in components and reconciling a large
batch later, developers integrate small changes into the actual shared
product many times a day. This shortens the interval between making a change
and learning how it interacts with everybody else's work.

The two sides depend on each other:

- Integration without a fast stop signal spreads defects and confusion.
- Automated checks without frequent integration inspect isolated inventory
  rather than the current whole product.
- Stop-and-fix without self-management can turn into waiting for an authorized
  coordinator.
- Self-management without technical evidence can leave teams free to make
  incompatible local decisions.

CI is therefore more than a delivery pipeline. It is a shared, rapidly updated
representation of the product that teams can use to coordinate.

### Integration can pull collaboration at the moment it becomes useful

LeSS calls its preferred pattern **decentralized and informal coordination**.
Its guidance combines two practices:

1. **Communicate in code:** everyone synchronizes with the shared mainline
   several times a day and notices changes related to their current work.
2. **Just talk:** when a dependency or issue becomes relevant, any team member
   is expected to contact the other team directly rather than invoke a formal
   coordination mechanism.

This closely matches Terry's proposed JIT pattern:

> **Do not produce every coordination conversation, plan, approval, or
> interface agreement in advance. Keep integration frequent enough that a
> real interaction becomes visible early, then let that actual need pull the
> relevant people into collaboration.**

Calling this **JIT coordination** is an interpretation, not a named LeSS rule
or a literal kanban implementation. [Claim
3](03-jidoka-enables-jit-trusts-respect-grows.md) names the LeSS translation
**Whole Product Focus**, not dependable inter-team relationships: integration
conflict pulls collaboration because a cohesive customer-centric solution is a
common interest, and earlier refinement is not forbidden.

Nor is CI the only coordination mechanism in LeSS. Multi-team refinement and
planning, design workshops, component communities, scouts, travelers, and
open spaces can expose or anticipate dependencies. The stronger claim is not
“all coordination begins with a failed integration.” It is:

> **Technical excellence lets teams defer much detailed coordination until
> evidence from the evolving shared product makes the right collaboration
> concrete.**

### Customer value comes from the whole system, not automation alone

LeSS organizes most teams as customer-focused feature teams, gives all teams
one continuously reprioritized Product Backlog, and expects teams to refine
items directly with customers and users. These choices connect technical
freedom to customer value.

Technical excellence by itself does not decide what is valuable. A technically
excellent component organization could still optimize internal output, and an
excellent delivery pipeline could deliver unwanted features faster. The
value-directed chain needs all of the following:

| System element | Contribution |
|---|---|
| **Customer-centric feature teams** | Give a team end-to-end responsibility for a user outcome rather than an internal component. |
| **One ordered Product Backlog** | Pulls the product group toward the most important current product work. |
| **Technical excellence** | Makes small, safe, flexible changes economically possible. |
| **Continuous integration** | Keeps one shared product real and exposes interactions early. |
| **Jidoka-like stop and fix** | Prevents speed from normalizing broken or untrustworthy output. |
| **Self-management and just talk** | Let the people closest to an actual dependency coordinate their response. |

The adjusted claim is therefore:

> **LeSS relies on technical excellence to make Whole Product Focus workable.
> Self-managing feature teams change one shared product; continuous
> integration reduces hidden work in process, exposes abnormalities and
> dependencies, and pulls collaboration when integration conflicts.
> Customer-centric teams and one ordered backlog orient that capability
> toward user value.**

## Emerging implication for the talk

This claim supplies a direct bridge from TPS to LeSS rather than merely saying
that both are “lean.”

[Claim 3](03-jidoka-enables-jit-trusts-respect-grows.md) supplies the LeSS
translation. This claim adds the technical precondition:

> **Technical excellence makes Whole Product Focus workable: jidoka makes
> frequent integration safe enough to expose reality; JIT entrusts teams not
> to stockpile changes or coordination in advance; self-managing teams
> respond to the need the integrated product reveals.**

The memorable formulation for the talk could be:

> **Integrate continuously; collaborate just in time.**

Or, with the human purpose made explicit:

> **Technical excellence does not replace collaboration. It removes routine
> watching and delayed reconciliation so that the shared product can summon
> the right collaboration when it is valuable.**

This also connects LeSS to the AI argument. AI can make candidate changes
cheap enough to create far more parallel code, tests, designs, and plans. In a
weak technical system, that output becomes inventory: it waits for review,
diverges from the mainline, collides during integration, and consumes human
attention in large reconciliation batches.

In a stronger system, small AI-assisted changes meet the shared product and
its executable evidence quickly. Integration reveals whether a change is
compatible; jidoka-like checks stop known abnormalities; and the resulting
dependency, ambiguity, or failure pulls people into focused collaboration.
People remain responsible for whether the change is valuable, whether the
evidence is sufficient, and what the system should learn.

The AI-era thesis may therefore be:

> **As generation becomes cheaper, technical excellence matters more—not
> mainly so every team can generate independently, but so generated work meets
> shared reality early enough for people to self-manage the consequences.**

## Questions still open

- Is **JIT coordination** still useful as this claim's interpretive label now
  that Claim 3 names the LeSS translation **Whole Product Focus**, or could it
  be confused with a claim that LeSS formally maps team interaction to kanban
  replenishment?
- What case study provides the strongest empirical evidence that frequent
  integration actually triggered useful cross-team collaboration rather than
  merely creating interruptions? Doughnut examples are the subject of
  [Claim 13](13-doughnut-project-examples.md).
- Which repetitive work is genuinely eliminated by technical excellence, and
  which work is only displaced into maintaining tests, pipelines, environments,
  and platform capabilities?
- What minimum common constraints—Definition of Done, tests, architectural
  boundaries, integration policy, product direction—make local freedom safe?
- How can a product group tell whether a CI signal is creating focused
  collaboration or overwhelming teams with noisy, coupled interruptions?
- Does AI make direct mainline integration more important, or does the volume
  and uncertainty of generated work require additional containment before it
  reaches the shared product?
- What concrete example can show the full sequence from AI-assisted change to
  integration signal, cross-team conversation, stop-and-fix, and delivered
  user value?

## Sources consulted

1. The LeSS Company, [Technical
   Excellence](https://less.works/less/technical-excellence). States that
   organizational agility is constrained by technical agility and groups the
   engineering practices that keep a product high-quality and flexible.
2. The LeSS Company, [Feature
   Teams](https://less.works/less/structure/feature-teams). Defines
   end-to-end customer-centric teams and explains why shared code ownership
   requires skilled engineering practices, especially continuous integration.
3. The LeSS Company, [Continuous
   Integration](https://less.works/less/technical-excellence/continuous-integration).
   Connects CI to small batches, removal of unintegrated WIP, a stable system,
   jidoka, visible andon-like feedback, stop-and-fix, and learning without
   blame.
4. The LeSS Company, [Coordination &
   Integration](https://less.works/less/framework/coordination-and-integration).
   Describes decentralized coordination, “communicate in code,” frequent
   synchronization, and “just talk” when a relevant change creates a need.
5. The LeSS Company, [Self-Management](https://less.works/less/management/self-managing-teams).
   Defines the team's responsibility for executing work and managing its own
   process and progress.
6. The LeSS Company, [LeSS Rules and
   Principles](https://less.works/resources/LeSS-complete-picture.pdf).
   Establishes the common product-level boundaries: self-managing feature
   teams, one Product Backlog, one common Definition of Done, one Sprint, an
   integrated whole product, and team-decided informal coordination.
7. The LeSS Company, [Customer-Centric
   Thinking](https://less.works/less/principles/customer-centric). Connects
   feature teams, direct customer contact, and one continuously reprioritized
   Product Backlog to whole-system customer delivery.
8. Toyota Motor Corporation, [Toyota Production
   System](https://global.toyota/en/company/vision-and-philosophy/production-system/).
   Current primary account of jidoka freeing people from machine watching,
   detecting and stopping abnormalities, preserving kaizen, and JIT linking
   processes in continuous flow according to actual need.

**Still open for further discussion and fact-checking.**
