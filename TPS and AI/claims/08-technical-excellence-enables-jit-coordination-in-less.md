# Claim 8: Technical excellence enables JIT coordination in LeSS

**Status: Provisional — Whole Product Focus needs technical excellence;
TE-for-CI is a proposed contrast**

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

### Additional hypothesis: technical excellence is for continuous integration

> Because continuous integration is so important in a LeSS organization,
> CI should not be considered a part of Technical Excellence. The entire
> Technical Excellence is for the purpose of Continuous Integration.

A proposal. The contrast with LeSS's catalog is the point.

## Reconciled claim

LeSS's own material supports the dependency. Complete local autonomy
and freedom from repetitive work as the definition of technical
excellence are not. LeSS does not name **JIT coordination**. It says
that when you integrate continuously, the coordination and integration
channels overlap.

> **Technical excellence makes Whole Product Focus workable.
> Self-managing feature teams change one shared product; in a LeSS
> group that excellence exists so they can integrate continuously.
> Continuous integration reduces hidden work in process, exposes
> abnormalities and dependencies, and can pull collaboration when those
> become concrete. Customer-centric teams and one ordered backlog
> orient that capability toward user value.**

The LeSS translation of that collaboration pattern is **Whole Product
Focus**, not dependable inter-team relationships. That naming is
[Claim 3](03-jidoka-enables-jit-trusts-respect-grows.md). This claim is
the **technical precondition**.

### Organizational agility is constrained by technical agility

LeSS states that as a property of the system, not as polish after
self-managing teams exist. Changing reporting lines cannot make a product
group responsive when the product is slow or dangerous to change.

The dependency is stronger with feature teams: long-lived,
cross-functional, and cross-component, completing an end-to-end customer
feature. How those features are cut so each can be confirmed—vertical
slices, not technical layers—is
[Claim 17](17-jit-vertical-slicing-one-piece-flow.md). Several teams
therefore change the same components. LeSS says that makes modern
engineering practices, especially continuous integration, essential.

### Technical excellence exists for continuous integration

LeSS lists continuous integration with clean code, architecture and
design, testing, TDD, test automation, and continuous delivery. Those
are not peers. They exist so several feature teams can integrate one
product continuously.

TDD and splitting large changes keep the system working so a developer
can integrate after a few minutes, not after a feature. Fast tests and a
fast build keep people from batching. Clean code, refactoring, and
craftsmanship support optimistic mainline integration. A shorter build
cycle even forces better product structure. Continuous delivery is that
same working system taken further, not a second purpose beside CI.

The purpose is the practice, not the server
([Claim 21](21-ci-practice-is-not-a-ci-system.md)).

> **Continuous integration is not an item on the technical-excellence
> list. The list exists so a LeSS product group can integrate
> continuously.**

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
Use the strongest quality gate from day one. Decide **style** once,
openly and early, and enforce it with the strictest automatic lint and
style checker. That frees people from arguing about style so they can
focus on **intention**. [Claim
10](10-freedom-and-trust-reinforce-through-jidoka.md) owns that
enabling-constraint reading of freedom. [Claim
12](12-respect-for-people-who-can-think.md) is the human capability
being pulled.

### Not freedom from repetitive work

The original hypothesis defined technical excellence as freeing people
from repetitive work. LeSS does not, and that is no longer the jidoka
connection.

[Claim 3](03-jidoka-enables-jit-trusts-respect-grows.md) owns the people
side: jidoka **frees people by empowering them**—the right and
expectation to signal, stop, respond, and improve. Known abnormal work
is made visible and stoppable so attention can move to judgment,
learning, and kaizen.

[Claim 6](06-jidoka-embeds-routine-judgment.md) owns where that judgment
lives. Knowledge should move **smart → dumb → gone**: a closed,
self-protected stop, or the failure designed out. Software analogues
are not any automation. Automated builds and tests that actually halt
are **dumb**; unrepresentable invalid states are **gone**
([Claim 20](20-poka-yoke-supports-jidoka-not-a-tps-pillar.md)). Checks
that still need a person to interpret the failure, or generated
artifacts that look finished until someone re-judges them, are **smart**
inventory. [Claim 4](04-jit-assurance-resourcefulness-and-constraint.md)
already warns that AI can stack that inventory quickly.

Skilled teams still investigate, maintain, refactor, operate, and
practice. Encoding judgment the system has not yet learned can
accelerate waste and distance people from the work.

> **Technical excellence encodes previously learned judgment as closed
> stops and preventive design, so later use needs less live judgment
> and people retain authority for exceptions.**

Whether those practices have actually encoded **dumb** / **gone**
judgment, rather than stacked **smart** inventory, is not something a
dashboard can tell. It is the team's knowledge and awareness.
Management without Go-See
([Claim 16](16-go-see-ai-harness.md)) will not understand it. A team
can look right—end-to-end customer value, continuous integration, fast
user feedback, full test coverage—and still have tests that only
duplicate the code structure and protect no behavior, or duplicated
solutions that break cohesion. Nothing replaces the people who can see
that. That is [Claim
12](12-respect-for-people-who-can-think.md).

[Claim 10](10-freedom-and-trust-reinforce-through-jidoka.md) owns the
freedom-and-trust theme. Technical excellence does not decide what is
valuable: a strong component organization can still optimize internal
output; an excellent pipeline can deliver unwanted features faster.
Feature teams and one ordered backlog are what orient the capability
toward user value.

### Continuous integration is jidoka-like and JIT-like

The proposal holds because continuous integration is both jidoka-like
and JIT-like.

**Jidoka-like:** keep a stable working system. Small changes enter the
shared mainline frequently; automated builds and tests detect a
meaningful break; the signal is visible; fixing has priority. LeSS
compares the **CI system**—not CI—to an andon
([Claim 21](21-ci-practice-is-not-a-ci-system.md)). Stop & Fix, and
why a red pipeline must actually halt work, is
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

### Integration and coordination overlap

LeSS's own statement:

> **Why coordination and integration? Because when you are integrating
> continuously, the coordination and integration channels strongly
> overlap: integration requires coordination, and coordination results
> in integration.**

That is the LeSS wording, not a mapping of team interaction onto kanban
replenishment. [Claim
3](03-jidoka-enables-jit-trusts-respect-grows.md) still names the
organizational translation **Whole Product Focus**. This claim is the
technical overlap: continuous integration is both the integration
channel and the coordination channel.

LeSS prefers **decentralized and informal coordination**:

1. **Communicate in code:** synchronize with the shared mainline several
   times a day and notice changes related to current work.
2. **Just talk:** when a dependency becomes relevant, contact the other
   team directly rather than invoke a formal coordination mechanism.

That matches the original pattern: do not produce every coordination
conversation in advance; keep integration frequent enough that a real
interaction becomes visible early; let that need pull the relevant
people.

Nor is CI the only mechanism: multi-team refinement, design workshops,
component communities, scouts, travelers, and open spaces can expose or
anticipate dependencies. The stronger claim is not “all coordination
begins with a failed integration.” It is:

> **Technical excellence lets teams defer much detailed coordination
> until evidence from the evolving shared product makes the right
> collaboration concrete.**

A CI signal that “overwhelms the product group with noisy, coupled
interruptions” is already a problem, not a normal cost of the overlap.
A merge conflict—or a red check—should draw the teams that share the
work. If the same cause repeats, they should already have done that
decentralized coordination. Because only the two sides in conflict are
involved, it does not interrupt every team.

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
>
> **Continuous integration is not an item on the technical-excellence
> list. The list exists so a LeSS product group can integrate
> continuously.**

AI does not make direct mainline integration *more* important. It was
never less. The practice does not change. Use AI to **reduce volume**
(the doughnut project's post-change-refactor skill is one example) and to **reduce
uncertainty**, not to increase either.

**Slow down means avoid overproduction**—do not fill idle capacity with
unwanted output. If the work is creating debt, speed is not the remedy.
**1973 is the strongest overproduction case.** 1985 and 2008 as
keep-people years are [Claim
12](12-respect-for-people-who-can-think.md).

TPS became famous because Toyota *cut production to actual need*
instead of keeping the line busy. Sales fell; dealer stock rose; Eiji
Toyoda says they were the first domestic maker to cut output, while
others still increased it. Ohno: Toyota suffered less, and the world
then noticed the production system. Overproduction is “the most
terrible” waste.

> **Slow down = do not overproduce. When demand falls, cut to actual
> need. Do not keep people busy by creating inventory.**

Keeping the people, and using slack to improve rather than firing them,
is [Claim 12](12-respect-for-people-who-can-think.md): Respect for
People is respect for people who can think. Generating unwanted code is
the software form of the output other makers still increased in early
1974.

> **As generation becomes cheaper, technical excellence matters more—not
> mainly so every team can generate independently, but so generated work
> meets shared reality early enough for people to self-manage the
> consequences. Do not create debt faster.**

## Questions still open

None remaining on this claim. The full doughnut sequence from
AI-assisted change to integration signal, conversation, stop-and-fix,
and delivered user value is queued on
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
   blame. TDD, fast tests, and clean code appear as what makes frequent
   integration possible.
4. The LeSS Company, [Coordination &
   Integration](https://less.works/less/framework/coordination-and-integration).
   Describes decentralized coordination, “communicate in code,” frequent
   synchronization, and “just talk” when a relevant change creates a need.
   Craig Larman and Bas Vodde, *Large-Scale Scrum: More with LeSS*,
   chapter Coordination & Integration: under continuous integration the
   coordination and integration channels strongly overlap—integration
   requires coordination, and coordination results in integration. The
   public design principle is [coordination through
   integration](https://less.works/less/adoption/more-with-less-organizational-design-principles).
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
9. Toyota Motor Corporation, [Response to the First Oil
   Crisis](https://www.toyota-global.com/company/history_of_toyota/75years/text/entering_the_automotive_business/chapter2/section4/item1.html),
   *75 Years of Toyota*. Production curtailed January–March 1974; Eiji
   Toyoda: first among domestic makers to cut output while others still
   increased it; dealer inventory then cleared.
10. Taiichi Ohno (1978/1988), *Toyota Production System: Beyond Large-Scale
    Production*. TPS drew attention because Toyota suffered less in the
    1973 oil crisis; overproduction is the worst waste. Keeping people
    rather than hiring-for-peaks-and-firing is [Claim
    12](12-respect-for-people-who-can-think.md).
