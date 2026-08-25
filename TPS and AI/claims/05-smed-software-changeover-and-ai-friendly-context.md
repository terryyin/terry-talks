# Claim 5: SMED for software means cheap deliberate changeovers, not constant switching

**Status: Provisional — name, method, and switching-vs-changeover
corrected**

## Original claim / hypothesis

Like TPS, LeSS needs the ability to switch rapidly between work items so that
the highest priority remains delivering user value and obtaining full-cycle
feedback. Once value has been delivered, or feedback changes what is valuable,
the product group may need to change direction and start different work.

Lowering switching cost therefore matters. Jidoka may help reduce that cost.
SMED—recalled initially as “STED / single touch exchange of die”—appears to be
specifically concerned with making a changeover require fewer steps. Applied to
software, this points toward creating an **AI-friendly development context** in
which a human or AI can move to the next valuable item without spending a long
time reconstructing the environment and relevant knowledge.

## Reconciled claim

> **LeSS needs cheap product-level changeovers, not constant developer
> switching.** Stable feature teams, small done increments, shared
> ownership, reproducible environments, and fast verification let the
> product group act on new feedback without large stranded batches or
> organizational reshuffling.

The name is **SMED: Single-Minute Exchange of Die**. “Single minute”
means a single-digit number of minutes—less than ten—not necessarily one
minute. The method reduces **elapsed changeover cost**, not the count of
steps: separate internal from external setup, convert internal work to
external wherever possible, then streamline what remains. Fewer touches
may result. They are not the definition.

SMED is not a pillar. It lives **inside JIT**. [Claim
4](04-jit-assurance-resourcefulness-and-constraint.md) already has the
factory reason: even a known mix is made alternately; that is only cheap
if changeover is cheap. [Claim
17](17-jit-vertical-slicing-one-piece-flow.md) already has the software
cut: a vertical slice forces the same team across components and
disciplines, then a different mix on the next item. This claim is how
that switch is **afforded**.

> **High changeover cost makes batching by type—or by layer—look
> efficient even when the mix is known. Cheap changeover makes thin
> vertical slices the economical way to follow actual need.**

Launching more agents does not substitute for that kaizen. It can move
the bottleneck to review and integration.

### Deliberate changeover, not interruption

**Short iterative full-cycle feedback** means repeatedly doing the whole
development cycle, not interrupting unfinished programming whenever a
new idea appears. LeSS protects the selected Sprint goal. A materially
invalidated Sprint can be terminated; that is disruptive. Otherwise new
priorities wait until the next Sprint.

| Kind of switch | Desired response |
|---|---|
| **Changeover after a done item or short feedback cycle** | Make it cheap so the next highest-value item can start quickly. |
| **Safe suspension because feedback invalidated the work** | Preserve state; make resumption or abandonment explicit. |
| **Routine interruption and multitasking inside unfinished work** | Reduce it. Cheap tooling does not cancel cognitive disruption. |

Parnin and Rugaber found task resumption expensive: only 10% of observed
sessions resumed programming in under a minute. The implication is not
“make developers switch more.”

> **Finish small items and protect focus. When a switch is valuable or
> unavoidable, make the working state reconstructible rather than
> depending on one person's short-term memory.**

### The LeSS changeover is organizational first

The strongest mapping is not “a programmer is a stamping press.” A
long-lived feature team finishes one customer item and takes another.
The work changes; the team is not rebuilt. Long setup in that mapping is
specialist ownership, handoffs, and fragile tooling. Short setup is
cross-functional, cross-component capability on one Product Backlog,
continuously reprioritized, with shared code and continuous integration.

That does not make every item assignable to every team. Current knowledge
still matters. The aim is to stop narrow specialization from making
product priority impossible to follow, while growing broad capability
over time.

### Three distinct costs

Treating all switching as “context switching” hides where to improve.

| Cost | Examples | Primary countermeasures |
|---|---|---|
| **Organizational** | The only expert, ownership transfer, a project team, waiting on a component team, routine approval | Long-lived feature teams, shared ownership, generalizing specialists, clear decision rights |
| **Technical** | Clone and build, credentials, fixtures, branch conflicts, slow tests, manual deploy | Reproducible environments, isolated workspaces, fast layered checks, CI/CD |
| **Cognitive** | Goal, code model, rationale, unfinished reasoning, next step | Bounded items, discoverable decisions, cohesive code, executable examples, current handoff notes |

The costs interact. A clean worktree does not explain what the customer
needs; a detailed ticket does not make a failing build executable.

A large queue of finely analyzed items is invested WIP. People's grasp of
old details becomes hazy and stale. Preparing every distant backlog item
is the software form of producing inventory.

### Internal setup is item-specific; external setup is reusable readiness

**Internal** here is not “the physical machine is stopped.” It is setup
that must occur after this item is selected and before the first
trustworthy evidence of progress on it. Understanding this user's
problem, confirming a risky assumption, reproducing this defect: those
are internal.

**External** is reusable readiness that can exist before any particular
item is chosen: a reproducible environment, declared toolchains, one
discoverable verification command, representative data, navigable
boundaries, decisions recorded near the affected system, and long-lived
team capability.

Convert what can be converted. Streamline the rest. Customer intent,
novel domain reasoning, and the consequences of a unique change are
development, not pure waste. Split a small end-to-end outcome; start
from a reproducible example when that helps; leave the workspace legible
if the work is suspended.

### Jidoka is not setup reduction

Jidoka and SMED solve different problems. SMED reduces the overhead of a
necessary changeover. Jidoka detects abnormality, stops or contains it,
and creates the conditions to respond and prevent recurrence. Tests,
types, observability, stop conditions, and rollback can play that role.
They may **cause** an interruption: stop-and-fix is meant to. That
mechanism is [Claim 6](06-jidoka-embeds-routine-judgment.md).

> **SMED reduces the overhead of a necessary changeover. Jidoka makes the
> abnormality that may trigger a changeover explicit and containable.
> Kaizen removes the recurrent causes of both.**

### AI-friendly means operational readiness, not a giant prompt

SWE-bench and agent research treat **executable environments and
verifiers** as a primary axis of capability, not documentation volume.

> **An AI-friendly development context is a development system in which a
> suitably capable human or AI agent can take a current, bounded item,
> discover the relevant constraints, create an isolated executable
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

### Where the analogy breaks

A die change returns a machine to a known production mode. A software
item often requires discovering both the problem and the solution, and
each change alters the product for later work. [Claim
11](11-physical-production-and-software-differences.md) owns that break.
Do not treat people or agents as fungible machines: a feature team
learns cumulatively.

## Emerging implication for the talk

> **Protect focus within the cycle; reduce changeover cost between
> cycles.**

SMED's practical question:

> **When we move to the next valuable item, which setup truly requires
> the current work to stop, which preparation can be made reusable, and
> which remaining steps can be eliminated or simplified?**

> **AI-friendly is not prompt-rich. It is context-ready and
> feedback-rich.**

Candidate implementation is becoming faster, so more of the changeover
may be spent reconstructing intent, preparing a safe environment, and
obtaining trustworthy feedback. That leftover cost is still changeover,
not a reason to launch more unfinished work.

> **Adaptiveness is a production capability. An organization can only
> afford to learn and change direction frequently when finishing,
> changing over, and verifying the next small increment are all
> inexpensive.**

## Questions still open

- What should be the unit of analysis on stage: a developer, a feature
  team, the product group, an AI agent, or a human–AI system?
- Which real development changeover should be observed end to end?
- What is the right boundary for changeover time: first reproduced
  failure, first verified edit, first integrated result, or first
  customer feedback?
- Which AI-context practices demonstrably improve correctness rather
  than only speed or token use?
- How much product and domain knowledge can be externalized without
  creating stale documentation or prematurely refined backlog inventory?
- When should feedback terminate current work immediately rather than
  wait for the next Sprint boundary?
- Does test automation function better in the talk as jidoka, as
  externalized context, as a verifier, or as all three at different
  levels?
- How can parallel AI work be limited by review and integration capacity
  so it does not become hidden WIP?

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
   Definitions of SMED, internal and external setup, and one-touch
   exchange of dies as setup reduced to a single step.
5. Large-Scale Scrum, [Feature
   Teams](https://less.works/less/structure/feature-teams). Long-lived,
   cross-functional, cross-component teams, end-to-end items, shared
   ownership, and reduced handoffs.
6. Large-Scale Scrum, [Product
   Backlog](https://less.works/less/framework/product-backlog). One
   shared, prioritized backlog whose items are not pre-assigned to
   teams.
7. Large-Scale Scrum, [Customer-Centric
   Thinking](https://less.works/less/principles/customer-centric).
   Continuous reprioritization and end-to-end feature organization.
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

Mix-leveling sources for why SMED exists under JIT are in
[Claim 4](04-jit-assurance-resourcefulness-and-constraint.md).

**Still open for talk choices on the unit of analysis and a real
changeover to observe.**
