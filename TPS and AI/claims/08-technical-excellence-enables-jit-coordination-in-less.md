# Claim 8: Technical excellence enables JIT coordination in LeSS

**Status: Provisional — Whole Product Focus needs technical excellence;
JIT coordination is interpretive**

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

## Reconciled claim

LeSS's own material supports the dependency. Complete local autonomy,
freedom from repetitive work as the definition of technical excellence,
and **JIT coordination** as a named LeSS rule are not.

> **Technical excellence makes Whole Product Focus workable.
> Self-managing feature teams change one shared product; continuous
> integration reduces hidden work in process, exposes abnormalities and
> dependencies, and can pull collaboration when those become concrete.
> Customer-centric teams and one ordered backlog orient that capability
> toward user value.**

The LeSS translation of that collaboration pattern is **Whole Product
Focus**, not dependable inter-team relationships. That naming is
[Claim 3](03-jidoka-enables-jit-trusts-respect-grows.md). This claim is
the **technical precondition**.

### Organizational agility is constrained by technical agility

LeSS states that as a property of the system, not as polish after
self-managing teams exist. Changing reporting lines cannot make a product
group responsive when the product is slow or dangerous to change.
Continuous integration, clean code, architecture and design, testing,
TDD, test automation, and continuous delivery sit under technical
excellence.

The dependency is stronger with feature teams: long-lived,
cross-functional, and cross-component, completing an end-to-end customer
feature. How those features are cut so each can be confirmed—vertical
slices, not technical layers—is
[Claim 17](17-jit-vertical-slicing-one-piece-flow.md). Several teams
therefore change the same components. LeSS says that makes modern
engineering practices, especially continuous integration, essential.

### Self-management is bounded

“Largely through ways of working they control” is close. The team
executes the work, monitors whether it is on track, takes action when
it is not, decides how to work, and resolves conflicts in its process. It does not
reinvent product direction. Teams share one product, one Product
Backlog, one Product Owner, a common Definition of Done, one
product-level Sprint, and the obligation to create an integrated
whole-product increment.

> **LeSS gives teams authority over how they execute, monitor, and adapt
> their work, inside common product direction, quality, and integration
> constraints.**

Those constraints are enabling. A reliable shared product and visible
evidence let a team act without waiting for a coordinating manager.
[Claim 12](12-respect-for-people-who-can-think.md) is the human
capability being pulled.

### Not merely freedom from repetitive work

The jidoka connection supports *part* of the freedom claim. Toyota:
detect a known abnormality, stop, make it visible, bring people to
respond—no continuous machine watching. Software analogues include
automated builds, tests, checks, and deployments; designs that prevent
invalid states; fast feedback; and regression evidence that preserves
earlier learning.

**Freedom from repetitive work** is too broad as a definition. Skilled
teams still maintain, test, refactor, operate, and practice. Automation
built before the work is understood can accelerate waste or distance
people from the system. Narrower:

> **Technical excellence removes or automates repeatable overhead where
> the system has learned enough to do so, while preserving fast evidence
> and human authority for exceptions.**

[Claim 6](06-jidoka-embeds-routine-judgment.md) owns that loop.
[Claim 10](10-freedom-and-trust-reinforce-through-jidoka.md) owns the
freedom-and-trust theme. Technical excellence does not decide what is
valuable: a strong component organization can still optimize internal
output; an excellent pipeline can deliver unwanted features faster.
Feature teams and one ordered backlog are what orient the capability
toward user value.

### Continuous integration is jidoka-like and JIT-like

**Jidoka-like:** keep a stable working system. Small changes enter the
shared mainline frequently; automated builds and tests detect a
meaningful break; the signal is visible; fixing has priority. LeSS
compares the CI system to an andon. Stop & Fix, and why a red pipeline
must actually halt work, is
[Claim 19](19-stop-and-fix.md).

**JIT-like:** remove unintegrated work in process. Instead of
accumulating changes on branches and reconciling a large batch later,
developers integrate small changes into the actual shared product many
times a day.

The two sides depend on each other. Integration without a fast stop
spreads defects. Automated checks without frequent integration inspect
isolated inventory. Stop-and-fix without self-management waits for a
coordinator. Self-management without technical evidence leaves teams
free to make incompatible local decisions.

CI is therefore a shared, rapidly updated representation of the product
that teams can use to coordinate.

### Integration can pull collaboration; it is not the only coordination

LeSS prefers **decentralized and informal coordination**:

1. **Communicate in code:** synchronize with the shared mainline several
   times a day and notice changes related to current work.
2. **Just talk:** when a dependency becomes relevant, contact the other
   team directly rather than invoke a formal coordination mechanism.

That matches the original pattern: do not produce every coordination
conversation in advance; keep integration frequent enough that a real
interaction becomes visible early; let that need pull the relevant
people.

Calling this **JIT coordination** is an interpretation, not a named LeSS
rule or a literal kanban implementation. Nor is CI the only mechanism:
multi-team refinement, design workshops, component communities, scouts,
travelers, and open spaces can expose or anticipate dependencies. The
stronger claim is not “all coordination begins with a failed
integration.” It is:

> **Technical excellence lets teams defer much detailed coordination
> until evidence from the evolving shared product makes the right
> collaboration concrete.**

## Emerging implication for the talk

This claim is the technical bridge from TPS to LeSS. [Claim
3](03-jidoka-enables-jit-trusts-respect-grows.md) supplies the
translation. This claim adds:

> **Technical excellence makes Whole Product Focus workable: jidoka makes
> frequent integration safe enough to expose reality; JIT entrusts teams
> not to stockpile changes or coordination in advance; self-managing
> teams respond to the need the integrated product reveals.**

Memorable:

> **Integrate continuously; collaborate just in time.**

AI can make candidate changes cheap enough to create far more parallel
code, tests, designs, and plans. In a weak technical system that output
becomes inventory. In a stronger system, small AI-assisted changes meet
the shared product and its executable evidence quickly. People remain
responsible for whether the change is valuable, whether the evidence is
sufficient, and what the system should learn.

> **As generation becomes cheaper, technical excellence matters more—not
> mainly so every team can generate independently, but so generated work
> meets shared reality early enough for people to self-manage the
> consequences.**

## Questions still open

- Is **JIT coordination** still useful as this claim's interpretive
  label now that Claim 3 names the LeSS translation **Whole Product
  Focus**, or could it be confused with a claim that LeSS formally maps
  team interaction to kanban replenishment?
- Which repetitive work is genuinely eliminated by technical excellence,
  and which work is only displaced into maintaining tests, pipelines,
  environments, and platform capabilities?
- What minimum common constraints—Definition of Done, tests,
  architectural boundaries, integration policy, product direction—make
  local freedom safe?
- How can a product group tell whether a CI signal is creating focused
  collaboration or overwhelming teams with noisy, coupled interruptions?
- Does AI make direct mainline integration more important, or does the
  volume and uncertainty of generated work require additional
  containment before it reaches the shared product?
- What concrete example can show the full sequence from AI-assisted
  change to integration signal, conversation, stop-and-fix, and
  delivered user value?

Doughnut examples of CI pulling useful collaboration are queued on
[Claim 13](13-doughnut-project-examples.md).

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
