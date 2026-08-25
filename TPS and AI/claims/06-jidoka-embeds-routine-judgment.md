# Claim 6: Jidoka embeds routine judgment so adaptive intelligence can learn

**Status: Provisional — not finalized**

## Original claim / hypothesis

Jidoka preserves high-intelligence learning by pairing it with
low-intelligence automation—**autonomation**, or automation with a human
touch.

The proposed levels are:

- **High intelligence:** a human or an AI solves a problem by consuming a
  large amount of tokens, attention, or effort.
- **Low intelligence:** an automated test follows a fixed scenario and applies
  simple assertions.
- **No intelligence:** a highly cohesive design removes the need for smartness
  altogether.

The intended implication is:

> Use “no-intelligence” design plus “low-intelligence” jidoka so that
> “high intelligence”—human or AI—is freed to focus on learning.

## Research-based adjustment

The central intuition is strong: jidoka deliberately places different kinds of
judgment in different parts of a human-machine system. Routine watching and
recognizable abnormality detection should be built into the process, while
people respond to exceptions and improve the process.

The three-tier vocabulary, however, should be revised. It conflates at least
four different dimensions:

- how much effort a task consumes;
- whether a response is fixed or adaptive;
- whether judgment occurs during design or during operation; and
- whether a human, conventional program, or AI performs it.

Calling these “levels of intelligence” makes a useful intuition sound like a
general theory of intelligence. The evidence supports a more precise claim
about **where judgment is performed, when it is performed, and how often it
must be repeated**.

### What autonomation means in Toyota's account

Toyota currently defines jidoka as “automation with a human touch,” where
human wisdom is added to automation. The mechanism has several linked parts:

1. People first learn to perform and improve the work manually.
2. They determine what counts as an abnormal condition.
3. The ability to detect that condition is built into the equipment or
   process.
4. The equipment stops automatically, or a worker can stop the line.
5. The abnormality becomes visible, defective work is contained, and people
   prevent recurrence through kaizen.

The historical loom example captures the same logic. Sakichi Toyoda's loom did
not merely move automatically. It made a bounded judgment—detecting a broken
thread—and stopped rather than continuing to produce defective cloth. That
freed a worker from continuously watching one machine.

This strongly supports Terry's allocation intuition:

> **Do not spend scarce human attention repeatedly watching for a condition
> that the process can recognize and stop on by itself.**

[Claim 3](03-jidoka-enables-jit-trusts-respect-grows.md) states the people-side:
jidoka frees people by empowering them—the right and expectation to signal,
stop, respond, and improve. This claim is about where that judgment lives in
the process.

But jidoka is not simply “low intelligence replaces high intelligence.” Human
wisdom first defines and engineers the detection, and human judgment remains
necessary when an exception occurs. The automation contains **crystallized
prior learning**.

Toyota's virtual plant material uses **jidoka or autonomation** in contrast to
ordinary automation. In this usage, autonomation does not mean that the machine
has general autonomy or intelligence. It means that recognizable judgment and
stop capability have been built into the machine so a person need not watch it
continuously.

Toyota's current account also explicitly reserves the continuing evolution of
the work through kaizen for people. Extending the adaptive role to include AI
is therefore Terry's proposed software analogy, not part of Toyota's definition
of jidoka. AI can participate in investigation and propose improvements; a
human-centered system still needs accountable people to decide what should
change and whether the evidence is sufficient.

### “No intelligence” is really intelligence embedded at design time

A cohesive design can make some knowledge unnecessary at the point of use.
Information hiding, a narrow interface, a type that excludes invalid states,
or a process that physically permits only the correct orientation can prevent
each user from reconstructing the designer's reasoning.

That is valuable, but it is not literally intelligence-free. The design
embodies earlier judgment and usually required substantial intelligence to
create.

Parnas's information-hiding account makes this temporal shift explicit without
using intelligence language. A good modular decomposition lets one module be
used with little knowledge of another and confines the effect of likely
changes. Complexity has not disappeared from the universe; responsibility for
understanding it has been localized.

The closest quality concept is often **poka-yoke**, or mistake-proofing, rather
than jidoka. Mistake-proofing can:

- eliminate the error-producing step;
- make the incorrect action impossible;
- make the correct action much easier; or
- prevent continuation until conditions are correct.

There is an important design preference here:

> **If a failure mode can be made impossible or irrelevant by design, prefer
> that to repeatedly detecting it after it occurs.**

“No intelligence” is therefore better renamed **judgment embedded in design**
or **prevention by construction**.

### Automated tests contain predefined judgment, not negligible intelligence

An automated test can execute cheaply and deterministically, but its value
depends on the judgment encoded in its setup, observation, and assertions.

Software-testing research calls the difficulty of deciding whether observed
behavior is correct the **test oracle problem**. A test runner can repeat an
oracle automatically once it exists. Discovering the right oracle may require
requirements knowledge, domain expertise, modeling, or a human decision.

This means a simple assertion has two very different costs:

- **execution cost:** often low and repeatable; and
- **knowledge-creation cost:** potentially high, because someone had to decide
  what property distinguishes acceptable from abnormal behavior.

Tests are therefore not “low intelligence” in an absolute sense. They are
**previous judgment made executable**.

Tests also have limited jurisdiction. They detect only properties their
oracles observe under the conditions exercised. A green test suite does not
establish that the product is correct, valuable, safe, or appropriate in every
unanticipated situation.

An automated check becomes jidoka-like when it does more than report
information eventually. It should:

- detect a meaningful abnormality near its origin;
- stop or contain further propagation;
- make the abnormality visible to someone able to respond;
- preserve enough evidence for diagnosis; and
- lead, when worthwhile, to prevention of recurrence.

A test that is routinely ignored, runs long after contamination, or produces
an unactionable signal has only a weak resemblance to jidoka.

### Effort and token consumption are not measures of intelligence

The proposed “high intelligence” category correctly points to a scarce
resource: adaptive problem solving is more expensive than replaying a fixed
check. But a large token count or much human effort does not show that the
reasoning is intelligent, correct, or learning.

It may instead indicate:

- a genuinely novel and difficult problem;
- poor context or an incohesive design;
- repeated search through irrelevant information;
- an inadequate feedback signal;
- rework caused by an earlier mistake; or
- verbose but unproductive model behavior.

Humans and AI also should not be treated as interchangeable instances of one
high-intelligence tier. Both may perform adaptive search, but they differ in
experience, accountability, situational understanding, available evidence,
and ability to decide what ought to matter. An AI can help investigate and
generate candidate improvements without automatically inheriting authority to
accept risk or redefine value.

A better term for the scarce category is **adaptive judgment** or
**high-cost reasoning**. Its cost can be observed through time, attention,
model calls, experiments, and review, but no single one is a measure of
intelligence.

### Automation is not one scalar ladder

Human-factors research also cautions against treating automation as a single
low-to-high scale. Parasuraman, Sheridan, and Wickens distinguish automation
of four functions:

1. information acquisition;
2. information analysis;
3. decision and action selection; and
4. action implementation.

Each function can be automated to a different degree. A system might detect a
failure automatically, let a person decide the response, and then execute an
approved rollback automatically. Describing the whole arrangement as one
“intelligence level” loses the allocation that matters.

Jidoka is especially clear about this separation:

| Function | Possible allocation in a jidoka-like software system |
|---|---|
| Observe | Compiler, test, monitor, user, developer, or AI gathers evidence. |
| Judge abnormality | A type rule, invariant, test oracle, threshold, person, or AI identifies a stop condition. |
| Stop and contain | Build, merge, deployment, feature, or request is blocked, isolated, or rolled back. |
| Diagnose | Human and/or AI investigates cause and consequences. |
| Improve | People change the design, process, standard, or automated check and decide whether the new behavior is acceptable. |

The allocation can change as the system learns. A novel failure initially
requires adaptive investigation. Once understood, part of that judgment may
become a regression test, a monitor, a type constraint, a safer interface, or
the removal of the failure-producing path.

### The irony of leaving people only the hardest exceptions

Bainbridge's classic “ironies of automation” is an important stress test.
Automation can remove the easy, frequent parts of work while leaving a person
responsible for rare, unfamiliar, high-consequence abnormalities. At the same
time, reduced involvement can weaken the knowledge and practice needed for
that takeover.

Jidoka therefore does not justify automating every normal case and assuming a
human can rescue anything else. A responsible system must preserve:

- a comprehensible picture of what the automation is doing;
- timely, specific signals rather than undifferentiated alarms;
- evidence and controls needed to diagnose and contain failure;
- realistic authority, time, and capability for the responder; and
- learning loops that reduce recurrence rather than normalize firefighting.

This warning becomes stronger with AI. A model may automate information
analysis or even propose decisions while making its own limitations difficult
to inspect. More generated reasoning does not remove the need for clear
boundaries, executable evidence, stop conditions, and accountable acceptance.

### A more defensible three-layer model

The original three levels can be retained as a memorable progression if they
are reframed as **layers of quality and learning**, not ranks of intelligence.

| Layer | Primary function | Software examples | Where judgment lives |
|---|---|---|---|
| **Prevent by design** | Make a known error impossible, irrelevant, or local. | Cohesive modules, narrow interfaces, types, schemas, safe defaults, eliminated states. | Prior design decisions embodied in structure and constraints. |
| **Detect and stop** | Recognize a specified abnormality and contain it quickly. | Compilation, assertions, tests, invariant checks, policy gates, monitors, circuit breakers. | An executable oracle plus an automatic or human stop rule. |
| **Investigate and learn** | Resolve novelty, ambiguity, and competing values; prevent recurrence. | Diagnosis, experiments, domain judgment, root-cause analysis, human-AI exploration, kaizen. | Adaptive reasoning, with human accountability for value and risk. |

These layers are complementary rather than strictly ordered. Prevention is
preferable for a well-understood failure, but not every important property can
be designed away. Detection is valuable where a reliable abnormality can be
specified, but not every oracle is complete. Adaptive judgment remains
necessary wherever the system encounters novelty or disagreement about what
“correct” means.

The improvement loop moves learning across the layers:

> **Investigate the novel problem → encode what is now known in a detector →
> redesign the system so the recurring failure needs neither detection nor
> rescue.**

This is not a one-way mandate to automate. Some rare or value-laden decisions
should remain explicit human judgments. The point is to stop paying repeatedly
for reasoning that the system could reliably preserve.

## Emerging implication for the talk

The strongest version of the claim is not that jidoka combines three levels of
intelligence. It is:

> **Jidoka preserves adaptive attention by embedding previously learned
> judgment in the process: detect a known abnormality, stop it near its
> origin, and bring people to the exception rather than making them watch the
> routine. Kaizen then turns what they learn into a better process.**

For AI-augmented software, a compact formulation is:

> **Spend judgment once; make the learning reusable. Prevent what design can
> prevent, stop automatically for what can be specified, and reserve adaptive
> reasoning for what is genuinely new.**

A sharper loop for the talk may be:

> **Design out → detect and stop → investigate and learn → design out more.**

This formulation changes how AI productivity should be judged. The goal is not
merely to let an AI solve the same difficult problem with more tokens each
time. A productive episode should leave the system more capable:

- a clearer interface or more cohesive boundary;
- an invalid state that can no longer be represented;
- an executable example or regression oracle;
- a faster and more local stop signal;
- better diagnostic evidence;
- an explicit decision or constraint; or
- a deliberately documented reason the judgment must remain human.

The scarce resource is not intelligence as an abstract quantity. It is the
capacity for **responsible adaptive judgment and learning**. Jidoka-like design
protects that capacity only when automation exposes meaningful abnormalities,
stops safely, and enables improvement rather than distancing people from a
system they can no longer understand.

## Questions still open

- Which vocabulary will be most memorable without implying a scientific
  theory of intelligence: **embedded judgment / executable judgment / adaptive
  judgment**, or **prevent / detect / learn**?
- Should prevention by cohesive design be presented as an extension of jidoka,
  as poka-yoke, or as a separate software-design principle that complements
  jidoka?
- What is the best concrete software example that traverses all three layers
  from novel failure to test to prevention by design?
- When is a probabilistic AI evaluator reliable enough to participate in a
  stop decision, and what independent evidence or human escalation is needed?
- How should teams measure whether AI-assisted problem solving leaves behind
  reusable capability rather than only a successful one-off patch?
- Which high-consequence judgments should deliberately resist automation even
  if an AI can produce a plausible recommendation?
- How can developers retain diagnostic skill and system awareness when normal
  work is increasingly delegated to automation and AI?
- Does “spend judgment once” overstate how often requirements and environments
  change, making old tests or constraints stale?

## Sources consulted

1. Toyota Motor Corporation, [Toyota Production
   System](https://global.toyota/en/company/vision-and-philosophy/production-system/).
   Current primary account of jidoka as human wisdom added to automation: first
   improve work, define and build in abnormality detection, stop, make the
   problem visible, prevent recurrence, and free people from machine watching.
2. Toyota Motor Corporation, [Toyota Virtual Plant Tour: Toyota Production
   System](https://global.toyota/en/company/plant-tours/production-system/).
   Official use of “jidoka or autonomation” for automatic stopping on
   abnormality and removal of the need for continuous machine watching.
3. Y. Sugimori, K. Kusunoki, F. Cho, and S. Uchikawa (1977),
   [“Toyota production system and Kanban system: Materialization of
   just-in-time and respect-for-human
   system”](https://doi.org/10.1080/00207547708943149), *International Journal
   of Production Research*, 15(6), 553–564. Early Toyota-authored explanation
   of jidoka, visible control, worker stop authority, responsibility, and
   improvement.
4. American Society for Quality, [What is Mistake
   Proofing?](https://asq.org/quality-resources/mistake-proofing). Definition
   of poka-yoke and its distinction among eliminating an error, making it
   impossible, detecting it, warning, and preventing continuation.
5. Raja Parasuraman, Thomas B. Sheridan, and Christopher D. Wickens (2000),
   [“A Model for Types and Levels of Human Interaction with
   Automation”](https://doi.org/10.1109/3468.844354), *IEEE Transactions on
   Systems, Man, and Cybernetics—Part A*, 30(3), 286–297. Separates information
   acquisition, analysis, decision selection, and action implementation, each
   automatable to different degrees.
6. Lisanne Bainbridge (1983), [“Ironies of
   Automation”](https://doi.org/10.1016/0005-1098(83)90046-8), *Automatica*,
   19(6), 775–779. Classic warning that automating routine operation can leave
   people with harder abnormal situations while weakening the involvement
   needed to handle them.
7. Earl T. Barr, Mark Harman, Phil McMinn, Muzammil Shahbaz, and Shin Yoo
   (2015), [“The Oracle Problem in Software Testing: A
   Survey”](https://discovery.ucl.ac.uk/id/eprint/1471263/), *IEEE Transactions
   on Software Engineering*, 41(5), 507–525. Shows that automatically executing
   tests does not eliminate the difficult judgment of distinguishing desired
   behavior from incorrect behavior.
8. David L. Parnas (1972), [“On the Criteria to Be Used in Decomposing Systems
   into Modules”](https://doi.org/10.1145/361598.361623), *Communications of
   the ACM*, 15(12), 1053–1058. Foundational argument that information-hiding
   decomposition improves comprehensibility and confines the knowledge and
   effects of design decisions.

**Still open for further discussion and fact-checking.**
