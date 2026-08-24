# Claim 5: SMED for software means cheap deliberate changeovers, not constant switching

**Status: Provisional — not finalized**

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

## Research-based adjustment

The central connection is promising, but it needs four corrections:

1. The standard term is **SMED: Single-Minute Exchange of Die**.
2. SMED reduces the elapsed cost of changeover; it is not defined as reducing
   the number of steps.
3. LeSS seeks the ability to change direction at short, deliberate boundaries,
   not frequent interruption of unfinished programming work.
4. In software, “switching cost” is not one thing. Organizational, technical,
   and cognitive changeovers have different causes and countermeasures.

### Terminology: SMED is the correct name

The established term is **Single-Minute Exchange of Die (SMED)**. “Single
minute” means a **single-digit number of minutes—less than ten minutes**—not
necessarily one minute.

The American Society for Quality separately defines **one-touch exchange of
dies** as reducing die setup to a single step. This likely explains Terry's
memory. **OTED** is the more commonly documented abbreviation for the
one-touch idea. Some secondary sources use **STED** for “Single-Touch Exchange
of Die,” but that is not the standard name for Shigeo Shingo's setup-reduction
method. Unless the talk is tracing a particular source that uses STED, it
should say **SMED**.

SMED is also broader than eliminating steps. Shingo's method is commonly
summarized in three stages:

1. **Separate internal from external setup.** Internal work requires the
   machine to be stopped; external work can be done while it is still running.
2. **Convert internal setup to external setup** wherever possible.
3. **Streamline all remaining setup operations**, internal and external.

Streamlining can include eliminating, simplifying, standardizing, preparing,
parallelizing, or redesigning operations. Fewer touches may be one result, but
the governing measure is shorter, more reliable changeover.

### Why quick changeover matters: it changes the economics of batch size

The strategic effect of SMED is not merely recovering a few minutes of machine
capacity. When changing a machine is expensive, producing a large batch before
changing it appears economical. That creates inventory, delays feedback, and
makes the system slow to respond to a different mix of customer demand.

When changeover becomes cheap, smaller lots become practical. Production can
follow current pull more closely and change product mix more frequently without
paying a prohibitive setup penalty each time.

The transferable reasoning is:

> **High changeover cost makes large batches look efficient. Reducing
> changeover cost makes small-batch flow and responsiveness practical.**

LeSS's queueing discussion describes a closely related dynamic in product
development. Shortening cycles makes the old transaction overhead of analysis,
testing, integration, and deployment repeatedly painful; that pain creates
pressure to improve the development system. The analogy to SMED is therefore
not imported from manufacturing arbitrarily. LeSS already treats the overhead
of each short cycle as something the organization must systematically reduce.

### The LeSS changeover is primarily organizational

The strongest mapping is not “a programmer is a stamping press.” It is:

| Manufacturing | LeSS product development |
|---|---|
| A stable production resource changes from one product type to another. | A stable feature team finishes one customer item and takes another. |
| Long setup encourages large runs and infrequent changes. | Specialist ownership, handoffs, and fragile tooling encourage large projects and resist reprioritization. |
| Short setup permits smaller lots responding to actual demand. | Cross-functional, cross-component capability permits small end-to-end items selected by current product priority. |
| The die changes; the machine is not rebuilt for every product. | The work changes; the long-lived team is not dissolved and reassembled for every item. |

LeSS defines a feature team as long-lived, cross-functional, and
cross-component, completing many end-to-end customer features one by one. It
uses one Product Backlog for the product, does not pre-assign its items to
teams, and continuously reprioritizes it. Continuous integration and shared
code ownership support multiple teams working across the same product.

These choices reduce **organizational changeover cost**:

- no project organization has to be assembled around each new item;
- fewer specialist queues and cross-team handoffs have to be negotiated;
- knowledge mismatch becomes a trigger for learning rather than a permanent
  routing constraint;
- more teams can take high-priority work from the shared backlog; and
- the same team carries its collaboration capability from one item to the
  next.

This does not mean every item can be assigned randomly to every team. LeSS
explicitly says current knowledge still matters. The aim is to prevent narrow
specialization from making product priority impossible to follow, while
growing broad capability over time.

### Short full-cycle feedback does not mean constant interruption

The phrase **short iterative full-cycle feedback** describes repeatedly doing
the whole development cycle rather than passing work through long phases. A
LeSS team clarifies, implements, tests, integrates, and contributes to one
whole product increment within the Sprint, then learns from the result and
feedback.

This creates frequent **decision points** at which the Product Backlog can be
reordered. It does not imply that the Product Owner should replace a team's
goal whenever a new idea appears. LeSS's Scrum guidance protects the selected
goal during the Sprint. A materially invalidated Sprint can be terminated, but
that is intentionally disruptive; otherwise new priorities wait until the
next Sprint.

A critical distinction is therefore:

| Kind of switch | Desired response |
|---|---|
| **Changeover after a done item or short feedback cycle** | Make it cheap so the next highest-value item can start quickly. |
| **Safe suspension of unfinished work because feedback invalidated it** | Preserve state, limit stranded WIP, and make resumption or abandonment explicit. |
| **Routine interruption and multitasking within unfinished work** | Reduce it; cheap tooling does not eliminate cognitive disruption. |

Research on interrupted programming reinforces this distinction. Parnin and
Rugaber found task resumption to be a frequent problem: only 10% of observed
sessions resumed programming activity in under a minute, and programmers
usually navigated through code and other artifacts before editing. They
identified externalizing working state, reviewing the task, inspecting source
history, and executing the program as resumption strategies.

The implication is not “make developers switch more.” It is:

> **Finish small items and protect focus. When a switch is valuable or
> unavoidable, make the working state reconstructible rather than depending
> on one person's short-term memory.**

### Three distinct software changeover costs

Treating all switching as “context switching” hides where to improve.

| Cost | Examples | Primary countermeasures |
|---|---|---|
| **Organizational** | Finding the only expert, transferring ownership, forming a project team, waiting for another component team, obtaining routine approval | Long-lived feature teams, broad product definition, shared ownership, generalizing specialists, clear decision rights |
| **Technical/environmental** | Cloning and building, dependency installation, credentials, data fixtures, branch conflicts, slow tests, manual deployment, finding the correct command | Reproducible environments, isolated workspaces, scripted setup, representative fixtures, fast layered checks, CI/CD, safe permissions |
| **Cognitive/informational** | Understanding the goal, rebuilding the code model, locating rationale, recalling unfinished reasoning, determining the next step | Bounded items, explicit outcomes and constraints, discoverable decisions, cohesive code, source history, executable examples, current handoff notes |

The costs interact. A clean worktree does not explain what the customer needs;
a detailed ticket does not make a failing build executable; a feature team
cannot move freely through a product whose tests take days or whose components
are privately owned.

### A software translation of the SMED method

SMED can be used as a thinking method without claiming that software work is
the same as die stamping.

#### 1. Observe and define the actual changeover

For a team or coding agent, measure from **authorization to take the next
item** until the system produces the **first trustworthy evidence of progress**
on it. The end point should not be the first keystroke or generated patch;
those can create apparent speed without validated direction.

Observe where time and effort go:

- locating the task's purpose and acceptance evidence;
- finding relevant code and prior decisions;
- creating an isolated workspace;
- installing dependencies or obtaining permitted access;
- reproducing the current behavior;
- running a focused check; and
- waiting for a person, shared environment, or specialized team.

#### 2. Separate internal and external setup

For software, **internal** does not mean “work done while a physical machine is
stopped.” It means setup that must occur after this specific item is selected
and before useful verified work on it can begin.

Examples of necessarily item-specific internal setup include understanding the
current user's problem, confirming a risky assumption, and reproducing this
particular defect.

External setup is reusable readiness that can exist before any particular item
is chosen:

- a reproducible development environment;
- dependencies and toolchains declared as code;
- one discoverable command for focused and broad verification;
- representative test data that does not require production access;
- product and repository boundaries that are easy to navigate;
- decisions and constraints recorded near the affected system; and
- long-lived team capability across components and disciplines.

#### 3. Convert internal setup to external readiness

Possible conversions include:

- replace bespoke environment construction with a versioned setup script or
  development container;
- replace waiting for a specialist to run a check with safe self-service
  tooling;
- replace manual creation of branches, worktrees, fixtures, and logs with
  automated isolated workspaces;
- preserve a suspended task's goal, diff, test state, evidence, uncertainties,
  and next step in durable artifacts; and
- turn recurring explanations into discoverable source-level constraints,
  examples, or automated checks.

Preparation should be pulled by likely near-term need. Elaborating every
distant backlog item would be the software equivalent of producing inventory.
LeSS warns that a large queue of finely analyzed items is invested WIP and that
people's grasp of old details becomes hazy and stale.

#### 4. Streamline the irreducible item-specific setup

Some context cannot and should not be prepared in advance. Customer intent,
novel domain reasoning, and the consequences of a unique change are part of
development, not pure waste.

The aim is to make that necessary learning focused and evidence-rich:

- split work into a small end-to-end outcome with explicit non-goals;
- begin from a reproducible example or failing check when appropriate;
- keep code cohesive enough that a change has a comprehensible locality;
- make architectural constraints and exceptions discoverable;
- provide fast tests, type checks, static analysis, and runtime feedback;
- return a reviewable diff with the evidence run and uncertainty exposed; and
- leave the workspace in a legible state if the work is suspended.

### Jidoka helps with abnormal switches, but is not setup reduction

Jidoka and SMED solve different problems. SMED reduces changeover overhead.
Jidoka detects abnormality, stops or contains it, makes it visible, and creates
the conditions for people to respond and prevent recurrence.

In software, automated tests, compilation, type checks, observability, stop
conditions, and rollback can play jidoka-like roles. They can lower the cost of
an abnormal switch indirectly by:

- catching a problem near its origin before it contaminates more work;
- preserving an executable signal of what is wrong;
- making the reason for stopping visible;
- narrowing the context that has to be reconstructed; and
- preventing an urgent defect from turning into an open-ended investigation.

But jidoka may also **cause** an immediate interruption: stop and fix is meant
to interrupt normal flow when continuing would be worse. Its value is not that
switching becomes free. It makes abnormality response bounded, visible, and
learnable.

A precise relationship is:

> **SMED reduces the overhead of a necessary changeover. Jidoka makes the
> abnormality that may trigger a changeover explicit and containable. Kaizen
> removes the recurrent causes of both.**

### “AI-friendly development context” means operational readiness, not a giant prompt

Repository-level AI research supports the importance of context but also shows
why the phrase must include more than documentation. SWE-bench tasks give a
model an issue and a real repository; resolving them can require long-context
reasoning, coordinated changes across files, and interaction with an execution
environment. Recent work on software-engineering agents treats **executable
environments and verifiers**—compilers, tests, analyzers, and runtime
feedback—as a primary axis of agent capability.

A concrete working definition is:

> **An AI-friendly development context is a development system in which a
> suitably capable human or AI agent can take a current, bounded item, discover
> the relevant constraints, create an isolated executable workspace, obtain
> trustworthy feedback, and return a reviewable evidence-bearing change
> without reconstructing routine setup from tribal knowledge.**

Such a context has three layers:

1. **Persistent product readiness** — coherent code, explicit boundaries,
   reproducible tools, safe access, fast verifiers, shared ownership, and
   discoverable durable decisions.
2. **Current item readiness** — the user problem or desired outcome, why it is
   now important, acceptance evidence, constraints and non-goals, a starting
   state, and unresolved questions.
3. **Change and handoff readiness** — an isolated diff, commands and results,
   assumptions, remaining uncertainty, current failure state, and the next
   useful step.

This context is **human-friendly for the same reasons**. AI makes its quality
more visible because an agent cannot quietly rely on years of undocumented
organizational memory. Creating a huge instruction file is neither the goal
nor sufficient: documentation can be stale, undiscoverable, or contradicted by
the running system. The strongest context is concise where prose is needed and
executable where behavior can be checked.

### What should be measured

If this claim becomes an improvement program, useful system measures include:

- time from taking an item to the first trustworthy reproduced or passing
  check;
- time from a feedback-driven priority decision to starting the new highest
  value item;
- proportion of high-priority items that most feature teams can take without
  a handoff or reorganization;
- setup failures and routine human interventions per item;
- time to restore a safely suspended task;
- verification latency from a change to a useful signal; and
- WIP abandoned or stranded when direction changes.

These should remain diagnostic measures, not targets for gaming. Optimizing
“time to first edit,” number of agent tasks started, or raw utilization could
increase unverified output and multitasking while making full-cycle delivery
slower.

### Where the analogy breaks

SMED is not a recipe to transplant literally.

- A die change selects a known production mode; a software item often requires
  discovering both the problem and the solution.
- Manufacturing changeover time is mostly non-value-adding overhead. Rebuilding
  a software mental model may include necessary learning that directly affects
  product quality.
- A machine can alternate repeatably between known settings. Each software
  change alters the product and may alter the environment for later changes.
- A feature team learns cumulatively. Treating people or agents as fungible
  machines would destroy the stable capability LeSS is trying to create.
- Parallel AI work can hide rather than remove changeover cost by moving the
  bottleneck to review, integration, verification, or human attention.

The analogy is strongest at the level of **system design**: reduce the
recurrent overhead that makes small feedback batches uneconomical while
protecting the irreducible learning and judgment in product development.

## Emerging implication for the talk

The original idea can be sharpened to:

> **LeSS needs cheap product-level changeovers, not constant developer
> switching. Stable feature teams, small done increments, shared ownership,
> reproducible environments, and fast verification let the product group act
> on new feedback without large stranded batches or organizational reshuffling.**

SMED supplies a practical improvement question:

> **When we move to the next valuable item, which setup truly requires the
> current work to stop, which preparation can be made reusable, and which
> remaining steps can be eliminated or simplified?**

AI raises the stakes. Candidate implementation is becoming faster, so a larger
share of the changeover may be spent reconstructing intent, preparing a safe
environment, and obtaining trustworthy feedback. Launching more agents does
not solve that. It may simply create more partially done inventory waiting for
human judgment.

Possible compact formulations are:

> **Apply SMED to development context: make the next valuable change cheap to
> start and fast to verify.**

> **Protect focus within the cycle; reduce changeover cost between cycles.**

> **AI-friendly is not prompt-rich. It is context-ready and feedback-rich.**

The deeper claim is:

> **Adaptiveness is a production capability. An organization can only afford
> to learn and change direction frequently when finishing, changing over, and
> verifying the next small increment are all inexpensive.**

## Questions still open

- What should be the unit of analysis in the talk: an individual developer, a
  feature team, the whole product group, an AI agent, or a human–AI system?
- Is **changeover cost** clearer than **switching cost**, given that switching
  is commonly associated with harmful multitasking?
- Which real development changeover should be observed and mapped end to end
  to test the proposed SMED translation?
- What is the right boundary for changeover time: first reproduced failure,
  first verified edit, first integrated result, or first customer feedback?
- Which AI-context practices demonstrably improve correctness rather than only
  speed or token use?
- How much product and domain knowledge can be externalized without creating
  stale documentation or prematurely refined backlog inventory?
- When should feedback terminate current work immediately rather than wait for
  the next Sprint boundary?
- Does test automation function better in the talk as jidoka, as externalized
  context, as a verifier, or as all three at different abstraction levels?
- How can parallel AI work be limited by review and integration capacity so it
  does not become hidden WIP?

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
   Publisher's table of contents for the three stages: separate, convert, and
   streamline setup operations.
4. American Society for Quality, [Quality
   Glossary](https://asq.org/quality-resources/quality-glossary). Definitions
   of single-minute exchange of dies, internal and external setup, and
   one-touch exchange of dies as setup reduced to a single step.
5. Large-Scale Scrum, [Feature
   Teams](https://less.works/less/structure/feature-teams). Definition and
   rationale for long-lived, cross-functional, cross-component teams,
   end-to-end items, continuous integration, shared ownership, and reduced
   handoffs and multitasking.
6. Large-Scale Scrum, [Product
   Backlog](https://less.works/less/framework/product-backlog). One shared,
   prioritized backlog whose items are not pre-assigned to teams.
7. Large-Scale Scrum, [Customer-Centric
   Thinking](https://less.works/less/principles/customer-centric). Direct
   customer connection, continuous reprioritization, and end-to-end feature
   organization.
8. Large-Scale Scrum, [Sprint
   Planning](https://less.works/less/scrum/sprint-planning). Small high-priority
   items, protection from routine mid-Sprint goal changes, and the deliberate
   ability to reprioritize at the next Sprint.
9. Large-Scale Scrum, [Flow & Queueing
   Theory](https://less.works/less/principles/queueing_theory). Relationship
   among small batches, short cycles, transaction overhead, WIP, multitasking,
   feature teams, and the staleness risk of refining too much backlog.
10. Pete Deemer, Gabrielle Benefield, Craig Larman, and Bas Vodde (2012), [*The
    Scrum Primer 2.0*](https://goodagile.com/scrumprimer/scrumprimer20.pdf).
    Describes Scrum as combining short iterative full-cycle feedback loops,
    cross-functional teams, and lowering the cost of change.
11. Chris Parnin and Spencer Rugaber (2011), [“Resumption Strategies for
    Interrupted Programming
    Tasks”](https://doi.org/10.1007/s11219-010-9104-9), *Software Quality
    Journal*, 19, 5–34. Empirical evidence on resumption cost, reconstruction
    of task context, externalization, source history, and execution as a cue.
12. Gina Venolia, Robert DeLine, and Thomas LaToza (2005), [“Software
    Development at Microsoft
    Observed”](https://www.microsoft.com/en-us/research/publication/software-development-at-microsoft-observed/),
    Microsoft Research Technical Report MSR-TR-2005-140. Evidence about rich
    mental code models, code rationale, and disruptive task switching.
13. Carlos E. Jimenez et al. (2023), [“SWE-bench: Can Language Models Resolve
    Real-World GitHub Issues?”](https://arxiv.org/abs/2310.06770). Establishes
    repository-level AI tasks that combine an issue, codebase, coordinated
    multi-file reasoning, and an execution environment.
14. Manish Shetty (2026), [*Scaling Environments and Verifiers for Software
    Engineering
    Agents*](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2026/EECS-2026-52.html),
    UC Berkeley EECS Technical Report UCB/EECS-2026-52. Evidence that
    executable environments and dense verifiers materially shape agent
    capability and feedback-driven performance.

**Still open for further discussion and fact-checking.**
