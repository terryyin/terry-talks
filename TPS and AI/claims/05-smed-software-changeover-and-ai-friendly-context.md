# Claim 5: SMED for software means cheap changeovers so customer-centric focus is not interrupted

**Status: Provisional — name, method, switching-vs-changeover,
component/customer-focus trade-off, and talk choices recorded; OTED
naming and oversized-component limit still open**

## Claim

> **LeSS needs cheap changeovers so the customer-centric cycle is not
> interrupted.** The **feature team** is the unit of analysis. AI is a
> common tool the team uses. The team *does* switch components and
> disciplines inside one slice. That local interruption is the accepted
> cost of not handing customer value across specialist queues. Stable
> feature teams, small done increments, shared ownership, simplified
> design, fast verification, and one-touch remaining setup make that
> cost payable without large stranded batches or organizational
> reshuffling.

The name is **SMED: Single-Minute Exchange of Die**. “Single minute”
means a single-digit number of minutes—less than ten. The method reduces
**elapsed changeover cost**: separate internal from external setup,
convert internal work to external wherever possible, then streamline what
remains. Fewer touches may result; they are a consequence, not the
definition.

SMED lives **inside JIT**. [Claim
4](04-jit-assurance-resourcefulness-and-constraint.md) has the factory
reason: even a known mix is made alternately; that is only cheap if
changeover is cheap. [Claim
17](17-jit-vertical-slicing-one-piece-flow.md) has the software cut: a
vertical slice forces the same team across components and disciplines,
then a different mix on the next item. This claim is how that switch is
**afforded**. The same SMED work as never-ending kaizen toward near-zero
changeover is
[Claim 18](18-continuous-improvement-towards-perfection.md).

> **High changeover cost makes batching by type—or by layer—look
> efficient even when the mix is known. Cheap changeover makes thin
> vertical slices the economical way to follow actual need.**

Launching more agents does not substitute for that kaizen. It can move
the bottleneck to review and integration.

### One customer item at a time: Vodde's spill-over

Bas Vodde's 2020 post, 2024 blog, and 2025 Amsterdam keynote are **one
argument**. Spill-over is items *started* but not finished at Sprint
end. Unstarted selected items may be thrown out. “Did the team finish
everything it selected?” is a bad metric.

Spill-over matters because started unfinished work becomes WIP between
Sprints and removes the Product Owner's freedom to reprioritize; because
it is usually a team habit—people work individualistically on many items
so they can stay inside a specialty; and because it marks weak
incremental engineering, with surprises at integration instead of on
this piece. The origin is single-specialization. The usual
quick-fixes—people on more than one team, extra work so everyone is
busy, starting next Sprint's design or last Sprint's QA—produce
half-done items.

What to do is stable across the three publications. The best teams work
**one item at a time**. Pair or mob when the next task leaves someone's
specialty. Use Sprint Planning Two as a design meeting for that one
item. If the remainder will not fit, split *customer-centrically* inside
the Sprint and put the other fragment back on the backlog. Take
spill-over to the retrospective. Picking fewer items in planning does
not fix a specialty-buffer habit. A lower-quality Done is worse than
spill-over. In the 2025 talk, Wärtsilä's average started-unfinished (or
unsplit) items per team was about 0.8—insight into development, not a
number for reporting upward.

This claim is why that one-item discipline is *economical* when the item
is a vertical slice. The weekly-report feature jumps frontend, backend,
data, and render. Without cheap component and discipline changeover,
specialists start a second item so they stay busy—exactly Vodde's
quick-fix. AI makes starting that second item cheaper. The constraint
does not move: one customer-centric item, finished or split, then a
deliberate changeover.

Tokyo 2026 is the **same** Global LeSS Conference as this talk. If Vodde
covers spill-over as team health, complement it: SMED, poka-yoke,
jidoka, and OTED are how a feature team can stay on one cross-component
item, and why more agents are not a license for more unfinished work.

### Deliberate changeover, not interruption

**Short iterative full-cycle feedback** means repeatedly doing the whole
development cycle. LeSS protects the selected Sprint goal. A materially
invalidated Sprint can be terminated; that is disruptive. Otherwise new
priorities wait until the next Sprint.

| Kind of switch | Desired response |
|---|---|
| **Changeover after a done item or short feedback cycle** | Make it cheap so the next highest-value item can start quickly. |
| **Safe suspension because feedback invalidated the work** | Preserve state; make resumption or abandonment explicit. |
| **Routine interruption and multitasking inside unfinished work** | Reduce it. Cheap tooling does not cancel cognitive disruption. |

The third row is a new product priority, or another unfinished item,
cutting into work that is not yet done. Crossing components and
disciplines *inside* one customer-centric item is a different
interruption—the next section.

Parnin and Rugaber found task resumption expensive: only 10% of observed
sessions resumed programming in under a minute.

> **Finish small items and protect focus. When a switch is valuable or
> unavoidable, make the working state reconstructible rather than
> depending on one person's short-term memory.**

### Protect customer-centric focus; accept local technical interruption

The table above is **when** work may change. A different trade-off is
**which focus** a feature team protects while finishing one item.

| Focus | What LeSS does |
|---|---|
| **Component-local** — stay in one module | Accepts the interruption. The team crosses components to finish the customer item. |
| **Discipline-local** — finish all analysis, then all design, then all coding, then all test | Accepts the interruption. Analysis, design, test, and coding interleave on the same thin slice. |
| **Customer-centric value** — one end-to-end outcome a user can confirm | Protects it. The team stays with that outcome rather than handing fragments across queues. |

LeSS is explicit that a feature team works “across all components and
disciplines (analysis, programming, testing, …)” and completes
customer-centric features one by one. Feature teams are “optimized for
delivering the maximum customer value”; component teams are “optimized
for delivering the maximum number of lines of code.” One shared,
continuously reprioritized Product Backlog exists “to optimize the
overall system for customer delivery.”

Component teams reverse the trade-off. They protect local component
focus and a sequential lifecycle, and they interrupt customer-value
completion: a separate analysis step, a separate design/planning step,
partial implementation by several component teams, then a later
system-test team. Completing one non-trivial feature typically takes
several iterations instead of one. Handoffs, queues, WIP, and
mini-waterfalls are the form of that interruption. Local work can look
efficient while the only thing a customer can confirm waits.

> **Switching components and disciplines inside one customer-centric
> item is a real interruption. LeSS accepts it so that customer-value
> focus is not interrupted. Component teams make the opposite bargain.**

The accepted local switches remain cognitively expensive. Even *inside*
one change task, programmers flip among usage contexts as they extend
understanding and chase ripple effects. LaToza, Venolia, and DeLine
found developers invest great effort recovering implicit knowledge from
code and teammates because mental models of modules, rationale, and
ownership live largely in memory. Cheap tooling can make the jump cheap
enough that the team can still hold the customer problem.

[Claim 17](17-jit-vertical-slicing-one-piece-flow.md) already says a
vertical slice imposes this changeover. [Claim
8](08-technical-excellence-enables-jit-coordination-in-less.md) already
says feature teams require skilled engineering, or shared-code work
becomes integration chaos. This claim is the SMED-shaped reason those
practices exist here: they keep the chosen interruption inside what the
team—people using AI as a common tool—can actually solve.

**On-stage changeover to watch.** A weekly-report feature: a button in
the frontend, backend generation, a data service, then rendering the
report. One customer-centric item; the team jumps among several
components to finish it.

### Cheapen the accepted interruption: poka-yoke, tests, OTED

Three practices lower the cost of jumping among components and among
analysis, design, test, and coding.

| Practice | TPS name, qualified | How it cheapens a local jump |
|---|---|---|
| **Simplified, mistake-proofed design** | Closest to **poka-yoke** and information hiding. [Claim 20](20-poka-yoke-supports-jidoka-not-a-tps-pillar.md) owns poka-yoke; [Claim 6](06-jidoka-embeds-routine-judgment.md) owns prevent vs detect vs learn. | Invalid states cannot be constructed; a module can be used with little knowledge of another. TDD and low coupling let the team enter one component without reconstructing the rest. |
| **Automated tests** | **Jidoka** when they detect, stop, and make an abnormality visible. They also cheapen checking: SMED-like externalized verification. | Coding and checking can alternate without reconstructing a manual test procedure. The oracle is previous judgment made executable. |
| **One-command remaining setup** | **OTED**: ASQ’s “reduction of die setup to a single step,” the SMED extreme toward zero setup. | Clone, build, test, or deploy becomes one motion, so working memory is spent on the customer problem, not on reconstructing the environment. |

Poka-yoke here is setup reduction: cohesive interfaces, types that
exclude invalid states, and designs that localize likely change. Broader
simplicity—high cohesion, low coupling, navigable boundaries—also
reduces how much must be held in mind. Do not collapse every good
design move into poka-yoke.

Automated tests play two jobs. As jidoka they may *cause* a stop; that
is [Claim 6](06-jidoka-embeds-routine-judgment.md) and [Claim
19](19-stop-and-fix.md). As changeover kaizen they remove the internal
setup of “reconstruct how we check this.” LeSS treats the automated
safety net as paramount once several feature teams share code. Frequent
execution keeps that net cheap to maintain. A test that is ignored,
slow, or unactionable helps neither job. Test automation is the **main**
software method of jidoka; fail-fast and CI/CD that actually halt
delivery are others.

OTED is remaining setup reduced to one touch, not every script a team
happens to own. The software analogue is remaining setup that a human
or agent can invoke as a single motion—one reproducible command, one
verifier, one isolated workspace. Extra automation that adds steps,
credentials, or opaque failure modes is more internal setup.

If those three hold, the remaining context is bounded: this customer’s
need, this slice, this current abnormality. That is what human working
memory can hold. It is also the same kind of bounded
item-plus-environment-plus-verifier that SWE-bench and later agent
research treat as an axis of capability.

> **Poka-yoke and simple design shrink what you must know to enter a
> component. Jidoka-like tests shrink what you must reconstruct to
> check. OTED shrinks remaining environment setup to one motion. The
> leftover context is the customer problem—small enough for the team
> to solve.**

Cheap local changeover is how feature teams follow actual customer need
instead of what a component team can do most easily.

### The LeSS changeover is organizational first

Between items the strongest mapping is a long-lived feature team that
finishes one customer item and takes another. The work changes; the team
is not rebuilt. Long setup in that mapping is specialist ownership,
handoffs, and fragile tooling. Short setup is cross-functional,
cross-component capability on one Product Backlog, continuously
reprioritized, with shared code and continuous integration.

Current knowledge still matters. The aim is to stop narrow
specialization from making product priority impossible to follow, while
growing broad capability over time.

### Three distinct costs

Treating all switching as “context switching” hides where to improve.

| Cost | Examples | Primary countermeasures |
|---|---|---|
| **Organizational** | The only expert, ownership transfer, a project team, waiting on a component team, routine approval | Long-lived feature teams, shared ownership, generalizing specialists, clear decision rights |
| **Technical** | Clone and build, credentials, fixtures, branch conflicts, slow tests, manual deploy | Reproducible environments, isolated workspaces, one-touch remaining setup, fast layered checks, CI/CD |
| **Cognitive** | Goal, code model, rationale, unfinished reasoning, next step | Bounded items, mistake-proofed modules, discoverable decisions, cohesive code, executable examples, current handoff notes |

The costs interact. A clean worktree does not explain what the customer
needs; a detailed ticket does not make a failing build executable.

A large queue of finely analyzed items is invested WIP. People's grasp of
old details becomes hazy and stale. Preparing every distant backlog item
is the software form of producing inventory.

### Internal setup is item-specific; external setup is reusable readiness

**Internal** is setup that must occur after this item is selected and
before the first trustworthy evidence of progress on it. Understanding
this user's problem, confirming a risky assumption, reproducing this
defect: those are internal.

**External** is reusable readiness that can exist before any particular
item is chosen: a reproducible environment, declared toolchains, one
discoverable verification command, representative data, navigable
boundaries, decisions recorded near the affected system, and long-lived
team capability.

Convert what can be converted. Streamline the rest. Customer intent,
novel domain reasoning, and the consequences of a unique change are
development. Split a small end-to-end outcome; start from a reproducible
example when that helps; leave the workspace legible if the work is
suspended.

### SMED and jidoka solve different problems

SMED reduces the overhead of a necessary changeover. Jidoka detects
abnormality, stops or contains it, and creates the conditions to respond
and prevent recurrence. Tests still cheapen the *discipline* switch as
described above; those two jobs keep two names.

> **SMED reduces the overhead of a necessary changeover. Jidoka makes the
> abnormality that may trigger a changeover explicit and containable.
> Kaizen removes the recurrent causes of both.**

### AI-friendly means operational readiness

SWE-bench and agent research treat **executable environments and
verifiers** as a primary axis of capability, not documentation volume.

> **An AI-friendly development context is a development system in which a
> feature team, using AI as a common tool, can take a current, bounded
> item, discover the relevant constraints, create an isolated executable
> workspace, obtain trustworthy feedback, and return a reviewable
> evidence-bearing change without reconstructing routine setup from
> tribal knowledge.**

Three layers: **persistent product readiness** (coherent code, tools,
verifiers, shared ownership); **current item readiness** (outcome,
evidence, constraints, unresolved questions); **change and handoff
readiness** (isolated diff, commands and results, uncertainty, next
step).

This context is human-friendly for the same reasons. AI makes its quality
more visible because an agent cannot quietly rely on undocumented
organizational memory. A huge instruction file is neither the goal nor
sufficient.

The practices that improve **correctness**, not only speed, move
knowledge out of the current problem-solver’s working memory—“I” and AI
together—into the system:

- Capture a fixed scenario as a **dumb** automated test with simple
  assertions. Most of the time, future people and agents do not hold it
  in active load; jidoka recalls them when the test fails.
- Make the system **cohesive**: once-and-only-once representation,
  related things close together.
- Preserve current intention with **ubiquitous domain language** and
  **strong typing**. Future solvers inherit the intention instead of
  reconstructing it.

That is the same split as [Claim
6](06-jidoka-embeds-routine-judgment.md): previous judgment made
executable or unrepresentable, so adaptive attention stays on the
unsolved customer problem.

**How far to externalize** without stale documents or a finely analyzed
backlog (inventory):

1. Prefer **no additional representation**—the cheapest software is
   software that is not there.
2. Make illegal states unrepresentable (poka-yoke;
   [Claim 20](20-poka-yoke-supports-jidoka-not-a-tps-pillar.md)).
3. Highly cohesive design: once-and-only-once; related things close.
4. Intention-revealing names that map to the business domain.
5. Purpose of the code revealed by automated tests, which also prove it.
6. Documentation only when the above is insufficient—and then prefer
   instructions “I” and AI can follow immediately and validate without
   ambiguity.

Externalize into the running system and its checks, not into distant
tickets.

### Where the analogy breaks

A die change returns a machine to a known production mode. A software
item often requires discovering both the problem and the solution, and
each change alters the product for later work. [Claim
11](11-physical-production-and-software-differences.md) owns that break.
A feature team learns cumulatively; people and agents are not fungible
machines.

## Implication for the talk

> **Protect the customer-centric focus of the cycle, not residence in
> one component or one discipline.** Reduce the cost of those local
> switches, and of the changeover between cycles. The unit on stage is
> the **feature team**; AI is the common tool. The weekly-report slice
> is the changeover to watch. In Tokyo, if Vodde owns spill-over as
> team health, this talk owns why one cross-component item is
> affordable.

SMED's practical question:

> **When we move to the next valuable item, which setup truly requires
> the current work to stop, which preparation can be made reusable, and
> which remaining steps can be eliminated or simplified?**

> **AI-friendly is context-ready and feedback-rich.**

Candidate implementation is becoming faster, so more of the changeover
may be spent reconstructing intent, preparing a safe environment, and
obtaining trustworthy feedback. That leftover cost is still changeover,
not a reason to launch more unfinished work.

> **Adaptiveness is a production capability. An organization can only
> afford to learn and change direction frequently when finishing,
> changing over, and verifying the next small increment are all
> inexpensive.**

## Questions still open

- When is a component still too large or coupled for this trade-off,
  even with TDD, tests, and one-command setup?
- Does calling one-command remaining setup **OTED** help a Tokyo LeSS
  audience, or does it over-claim the factory extreme?

Skipped: changeover-time boundary (when a clock on the weekly-report
sequence would stop); Sprint-boundary termination of current work.

## Sources consulted

1. Lean Enterprise Institute, [Single Minute Exchange of
   Die](https://www.lean.org/lexicon-terms/single-minute-exchange-of-die/).
   Definition of SMED, the single-digit-minute target, and separation and
   conversion of internal and external setup.
2. Shigeo Shingo and Andrew P. Dillon (1985), [*A Revolution in
   Manufacturing: The SMED
   System*](https://www.routledge.com/A-Revolution-in-Manufacturing-The-SMED-System-1st-Edition/Shingo/p/book/9780915299034).
   Foundational presentation of the setup-reduction system.
3. Shigeo Shingo (1996), [*Quick Changeover for Operators: The SMED
   System*](https://www.routledge.com/Quick-Changeover-for-Operators-The-SMED-System-1st-Edition/Shingo/p/book/9781563271250).
   Three stages: separate, convert, and streamline setup operations.
4. American Society for Quality, [Quality
   Glossary](https://asq.org/quality-resources/quality-glossary).
   Definitions of SMED, internal and external setup, and **one-touch
   exchange of dies** as the reduction of die setup to a single step.
   SMED’s long-term objective is zero setup that does not interfere with
   continuous flow.
5. Large-Scale Scrum, [Feature
   Teams](https://less.works/less/structure/feature-teams). Long-lived,
   cross-functional, cross-component teams that work across all
   components and disciplines; feature teams optimized for customer
   value versus component teams optimized for lines of code; sequential
   lifecycle, handoffs, and queues as the cost of protecting local
   component focus.
6. Large-Scale Scrum, [Product
   Backlog](https://less.works/less/framework/product-backlog). One
   shared, prioritized backlog whose items are not pre-assigned to
   teams.
7. Large-Scale Scrum, [Customer-Centric
   Thinking](https://less.works/less/principles/customer-centric).
   Feature teams, requirement areas, and one continuously reprioritized
   backlog to optimize the overall system for customer delivery.
8. Large-Scale Scrum, [Sprint
   Planning](https://less.works/less/scrum/sprint-planning). Protection
   from routine mid-Sprint goal changes; reprioritize at the next
   Sprint.
9. Large-Scale Scrum, [Flow & Queueing
   Theory](https://less.works/less/principles/queueing_theory). Small
   batches, short cycles, transaction overhead, WIP, and the staleness
   risk of refining too much backlog.
10. Pete Deemer, Gabrielle Benefield, Craig Larman, and Bas Vodde (2012),
    [*The Scrum Primer
    2.0*](https://goodagile.com/scrumprimer/scrumprimer20.pdf). Short
    iterative full-cycle feedback and lowering the cost of change.
11. Chris Parnin and Spencer Rugaber (2011), [“Resumption Strategies for
    Interrupted Programming
    Tasks”](https://doi.org/10.1007/s11219-010-9104-9), *Software Quality
    Journal*, 19, 5–34. Resumption cost and reconstruction of task
    context.
12. Gina Venolia, Robert DeLine, and Thomas LaToza (2005), [“Software
    Development at Microsoft
    Observed”](https://www.microsoft.com/en-us/research/publication/software-development-at-microsoft-observed/),
    Microsoft Research Technical Report MSR-TR-2005-140. Mental code
    models and disruptive task switching.
13. Carlos E. Jimenez et al. (2023), [“SWE-bench: Can Language Models
    Resolve Real-World GitHub
    Issues?”](https://arxiv.org/abs/2310.06770). Repository-level AI
    tasks combining an issue, codebase, and execution environment.
14. Manish Shetty (2026), [*Scaling Environments and Verifiers for
    Software Engineering
    Agents*](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2026/EECS-2026-52.html),
    UC Berkeley EECS Technical Report UCB/EECS-2026-52. Executable
    environments and dense verifiers as an axis of agent capability.
15. Thomas D. LaToza, Gina Venolia, and Robert DeLine (2006),
    [“Maintaining Mental Models: A Study of Developer Work
    Habits”](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/p492-latoza.pdf),
    *ICSE*. Recovering implicit module, rationale, and ownership
    knowledge from code and teammates.
16. Chris Parnin and Carsten Görg (2006), [“Building Usage Contexts
    During Program
    Comprehension”](https://doi.org/10.1109/icpc.2006.14), *ICPC*. Even
    inside one change task, programmers flip among code contexts as
    they extend understanding and chase ripple effects.
17. Craig Larman and Bas Vodde, [Feature
    Teams](https://www.craiglarman.com/content/feature-teams/feature-teams.htm)
    (chapter also issued as the [Feature Team
    Primer](https://featureteams.org/feature_team_primer13.pdf)).
    Component teams force a sequential lifecycle; completing one
    non-trivial feature typically takes several iterations; local
    optimization of easier work rather than highest customer value.
18. Large-Scale Scrum, [Architecture &
    Design](https://less.works/less/technical-excellence/architecture-design).
    TDD and refactoring for low coupling so a component can be tested
    and understood in isolation.
19. Large-Scale Scrum, [Test
    Automation](https://less.works/less/technical-excellence/test-automation).
    Automated safety net as paramount for feature teams with shared
    code; frequent execution keeps that net cheap to maintain.
20. Bas Vodde — **one spill-over argument**, three publications:
    (a) [Overcoming the false dichotomy of Specialization vs
    Generalization with
    Scrum](https://less.works/blog/2020/06/16/specialization-vs-generalization-with-scrum.html)
    (2020): single-specialization quick-fixes produce half-done work;
    “carry-over” / “spill-over” are not Scrum.
    (b) [Dealing with Spill-over
    Items](https://less.works/blog/2024/09/03/dealing-with-item-spillover-in-teams.html)
    (2024; also
    [LinkedIn](https://www.linkedin.com/pulse/dealing-spill-over-items-bas-vodde-xuwue)):
    definition; agility, habits, and engineering; one item at a time;
    split customer-centrically inside the Sprint; no shortcuts.
    (c) [The Product
    Backlog](https://www.youtube.com/watch?v=G2gq0stySvs), LeSS
    Conference 2025, Amsterdam
    ([slides](https://less.works/conferenza/sessions/2025-global-less-conference-amsterdam-keynote-the-product-backlog-455)):
    started items must be finished or split; unstarted items may be
    thrown out; spill-over as a development-insight metric, not an
    upward report.
21. Yaron Minsky (2010), [Effective
    ML](https://blog.janestreet.com/effective-ml/) / [Effective ML
    Revisited](https://blog.janestreet.com/effective-ml-revisited/).
    “Make illegal states unrepresentable.”
22. Eric Evans (2003), *Domain-Driven Design*. Ubiquitous language.
23. Kent Beck, *Extreme Programming Explained*. Once and only once.
24. John Sweller, cognitive load theory. Extraneous load from poor
    representation, as distinct from the intrinsic difficulty of the
    problem.

Mix-leveling sources for why SMED exists under JIT are in
[Claim 4](04-jit-assurance-resourcefulness-and-constraint.md).
