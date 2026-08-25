# Claim 6: Jidoka embeds previously learned judgment so adaptive attention can learn

**Status: Provisional — “levels of intelligence” dropped; prevent / detect /
learn retained**

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

## Reconciled claim

The allocation intuition holds. The intelligence vocabulary does not.

> **Jidoka preserves adaptive attention by embedding previously learned
> judgment in the process: detect a known abnormality, stop it near its
> origin, and bring people to the exception rather than making them
> watch the routine.** Spend judgment once; make the learning reusable.

[Claim 3](03-jidoka-enables-jit-trusts-respect-grows.md) already has the
people-side: jidoka frees by empowering—the right and expectation to
signal, stop, respond, and improve. [Claim
4](04-jit-assurance-resourcefulness-and-constraint.md) already has the
JIT pairing: stop conditions protect previous intentions rather than
stacking judgment-dependent output. This claim is **where that judgment
lives**, and what the original three “intelligence” levels were actually
naming.

### Autonomation is built-in detection and stop, not a low-intelligence machine

Toyota currently defines jidoka as “automation with a human touch”: human
wisdom added to automation. People first learn the work by hand, define
what counts as abnormal, and build detection and stop into the process.
Sakichi Toyoda's loom did not merely move automatically. It made a
bounded judgment—detecting a broken thread—and stopped rather than
producing defective cloth. A worker no longer had to watch one machine
continuously.

Autonomation does **not** mean the machine has general autonomy or
intelligence. The automation contains **crystallized prior learning**.
Human judgment still defines the detection, still responds to exceptions,
and—in Toyota's account—still owns kaizen. Extending the adaptive role
to AI is Terry's software analogy, not Toyota's definition of jidoka. An
AI can investigate and propose; accountable people still decide what
should change and whether the evidence is enough.

### The three “intelligence” levels mixed four different things

The original vocabulary conflated effort consumed, whether a response is
fixed or adaptive, whether judgment happens at design time or during
operation, and whether a human, a program, or an AI performs it. Calling
these levels of intelligence makes a useful split sound like a theory of
intelligence.

Token count and effort are not measures of intelligence. A large spend
may be a novel problem—or poor context, repeated search, a weak feedback
signal, rework, or unproductive verbosity. Humans and AI are also not
interchangeable instances of one high-intelligence tier. Both may search
adaptively; they differ in experience, accountability, situational
understanding, and authority to accept risk or redefine value.

A better name for the scarce category is **adaptive judgment**: high-cost
reasoning whose cost shows up as time, attention, model calls,
experiments, and review—not as a score of intelligence.

### “No intelligence” is judgment embedded at design time

A cohesive design can make some knowledge unnecessary at the point of
use. Information hiding, a narrow interface, a type that excludes
invalid states, or a fixture that permits only the correct orientation
prevents each user from reconstructing the designer's reasoning. That is
valuable, and it usually took substantial intelligence to create.
Parnas's point is temporal: complexity has not left the universe;
responsibility for it has been localized.

The closest quality concept is **poka-yoke** (mistake-proofing), not
jidoka. [Claim
20](20-poka-yoke-supports-jidoka-not-a-tps-pillar.md) owns that name
and its TPS relationship: a supporting method under jidoka, not a
third pillar, and not an extension that swallows jidoka.

> **If a failure mode can be made impossible or irrelevant by design,
> prefer that to repeatedly detecting it after it occurs.**

Rename “no intelligence” to **prevention by construction**. [Claim
5](05-smed-software-changeover-and-ai-friendly-context.md) already uses
that distinction to cheapen a component jump; this claim owns the
three layers of judgment.

### Tests are previous judgment made executable, not negligible intelligence

An automated test can execute cheaply. Its value depends on the judgment
in its setup, observations, and assertions. Software-testing research
calls deciding whether observed behavior is correct the **test oracle
problem**. Repeating an oracle is cheap once it exists. Discovering the
right oracle may require requirements knowledge, domain expertise, or a
human decision.

Two costs, not one intelligence level:

- **execution cost:** often low and repeatable;
- **knowledge-creation cost:** potentially high.

Tests detect only the properties their oracles observe under the
conditions exercised. A green suite does not establish that the product
is correct, valuable, or safe in every unanticipated situation. A check
becomes jidoka-like when it detects a meaningful abnormality near its
origin and stops or contains it. Detection without halt is [Claim
19](19-stop-and-fix.md).

### Three complementary layers, not ranks of intelligence

Keep the memorable progression as **layers of quality and learning**:

| Layer | Primary function | Software examples | Where judgment lives |
|---|---|---|---|
| **Prevent by design** | Make a known error impossible, irrelevant, or local. | Cohesive modules, narrow interfaces, types, schemas, safe defaults, eliminated states. | Prior design decisions embodied in structure. |
| **Detect and stop** | Recognize a specified abnormality and contain it quickly. | Compilation, assertions, tests, invariant checks, policy gates, monitors, circuit breakers. | An executable oracle plus an automatic or human stop rule. |
| **Investigate and learn** | Resolve novelty, ambiguity, and competing values; prevent recurrence. | Diagnosis, experiments, domain judgment, root-cause analysis, human-AI exploration, kaizen. | Adaptive reasoning, with human accountability for value and risk. |

Prevention is preferable for a well-understood failure, but not every
property can be designed away. Detection is valuable where a reliable
abnormality can be specified, but no oracle is complete. Adaptive
judgment remains necessary wherever the system meets novelty or
disagreement about what “correct” means.

The improvement loop moves learning across the layers:

> **Investigate the novel problem → encode what is now known in a
> detector → redesign so the recurring failure needs neither detection
> nor rescue.**

This is not a mandate to automate everything. Some rare or value-laden
decisions should remain explicit human judgments. Observe, judge, stop,
diagnose, and improve can be allocated separately; describing the whole
arrangement as one intelligence level loses that allocation. A novel
failure starts as investigation; once understood, part of that judgment
may become a test, a monitor, a type, or the removal of the
failure-producing path.

Bainbridge's **ironies of automation** is the stress test. Automating
the easy, frequent work can leave a person with rare, high-consequence
abnormalities while weakening the practice needed for that takeover.
Jidoka does not justify automating every normal case and assuming a
human can rescue the rest. [Claim
10](10-freedom-and-trust-reinforce-through-jidoka.md) develops the
deskilling risk; [Claim 12](12-respect-for-people-who-can-think.md)
what must not be outsourced. More generated reasoning does not remove
the need for clear boundaries, executable evidence, stop conditions,
and accountable acceptance.

## Emerging implication for the talk

> **Spend judgment once; make the learning reusable. Prevent what
> design can prevent, stop automatically for what can be specified, and
> reserve adaptive reasoning for what is genuinely new.**

> **Design out → detect and stop → investigate and learn → design out
> more.**

Judge an AI episode by whether it leaves the system more capable—a
clearer boundary, an unrepresentable invalid state, a regression
oracle, a local stop, better evidence, an explicit constraint, or a
documented reason the judgment must remain human—not by whether the
same difficult problem was solved again with more tokens. The scarce
resource is **responsible adaptive judgment**. Jidoka-like design
protects it only when automation exposes meaningful abnormalities,
stops safely, and enables improvement rather than distancing people
from a system they can no longer understand.

## Questions still open

- Which remaining vocabulary is most memorable: **embedded / executable /
  adaptive judgment**, or **prevent / detect / learn**? “Levels of
  intelligence” is dropped.
- Should prevention by cohesive design be presented as an extension of
  jidoka, as poka-yoke, or as a complementary software-design principle?
  Answered in [Claim
  20](20-poka-yoke-supports-jidoka-not-a-tps-pillar.md): present it as
  poka-yoke supporting jidoka, not as an extension that swallows
  jidoka.
- What is the best concrete software example that traverses all three
  layers from novel failure to test to prevention by design?
- When is a probabilistic AI evaluator reliable enough to participate in
  a stop decision, and what independent evidence or human escalation is
  needed?
- How should teams measure whether AI-assisted problem solving leaves
  behind reusable capability rather than only a successful one-off
  patch?
- Which high-consequence judgments should deliberately resist automation
  even if an AI can produce a plausible recommendation?
- Does “spend judgment once” overstate how often requirements and
  environments change, making old tests or constraints stale?

## Sources consulted

1. Toyota Motor Corporation, [Toyota Production
   System](https://global.toyota/en/company/vision-and-philosophy/production-system/).
   Current primary account of jidoka as human wisdom added to automation:
   first improve work, define and build in abnormality detection, stop,
   make the problem visible, prevent recurrence, and free people from
   machine watching.
2. Toyota Motor Corporation, [Toyota Virtual Plant Tour: Toyota Production
   System](https://global.toyota/en/company/plant-tours/production-system/).
   Official use of “jidoka or autonomation” for automatic stopping on
   abnormality and removal of the need for continuous machine watching.
3. Y. Sugimori, K. Kusunoki, F. Cho, and S. Uchikawa (1977),
   [“Toyota production system and Kanban system: Materialization of
   just-in-time and respect-for-human
   system”](https://doi.org/10.1080/00207547708943149), *International
   Journal of Production Research*, 15(6), 553–564. Early Toyota-authored
   explanation of jidoka, visible control, worker stop authority,
   responsibility, and improvement.
4. American Society for Quality, [What is Mistake
   Proofing?](https://asq.org/quality-resources/mistake-proofing).
   Definition of poka-yoke and its distinction among eliminating an
   error, making it impossible, detecting it, warning, and preventing
   continuation.
5. Raja Parasuraman, Thomas B. Sheridan, and Christopher D. Wickens
   (2000), [“A Model for Types and Levels of Human Interaction with
   Automation”](https://doi.org/10.1109/3468.844354), *IEEE Transactions
   on Systems, Man, and Cybernetics—Part A*, 30(3), 286–297. Separates
   information acquisition, analysis, decision selection, and action
   implementation, each automatable to different degrees.
6. Lisanne Bainbridge (1983), [“Ironies of
   Automation”](https://doi.org/10.1016/0005-1098(83)90046-8),
   *Automatica*, 19(6), 775–779. Classic warning that automating routine
   operation can leave people with harder abnormal situations while
   weakening the involvement needed to handle them.
7. Earl T. Barr, Mark Harman, Phil McMinn, Muzammil Shahbaz, and Shin Yoo
   (2015), [“The Oracle Problem in Software Testing: A
   Survey”](https://discovery.ucl.ac.uk/id/eprint/1471263/), *IEEE
   Transactions on Software Engineering*, 41(5), 507–525. Shows that
   automatically executing tests does not eliminate the difficult
   judgment of distinguishing desired behavior from incorrect behavior.
8. David L. Parnas (1972), [“On the Criteria to Be Used in Decomposing
   Systems into Modules”](https://doi.org/10.1145/361598.361623),
   *Communications of the ACM*, 15(12), 1053–1058. Foundational argument
   that information-hiding decomposition improves comprehensibility and
   confines the knowledge and effects of design decisions.

**Intelligence-levels vocabulary is dropped. Prevent / detect / learn
remain live. Prevention is named poka-yoke in
[Claim 20](20-poka-yoke-supports-jidoka-not-a-tps-pillar.md).**
