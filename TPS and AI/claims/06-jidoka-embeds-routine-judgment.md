# Claim 6: Jidoka embeds previously learned judgment so adaptive attention can learn

**Status: Provisional — descent locked as judgment-loaded →
judgment-preserved → judgment-removed (captions: smart, dumb, gone);
loom stop confirmed as a closed mechanical question; human-intelligence
layer withdrawn**

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

### Later refinement of the original

“Low-intelligence” was never meant as a score of IQ. It means
knowledge in which judgment is **preserved** instead of required, not
knowledge that stays **loaded**. Jidoka should reduce dependence on
future judgment, not add more of it.

Autonomation should be much simpler at the moment it detects a problem
and stops than the work that follows: analyzing the cause, repairing
the immediate break, and removing the root cause. That later work is
the real value-adding thinking. An AI that tries to detect, diagnose,
patch, and “fix the root cause” in one pass still leaves a person to
do that thinking—and often leaves extra output that itself needs
judgment.

Sakichi's loom should illustrate this: the mechanism that notices the
abnormality is quite dumb, at least much dumber than tying the thread,
and far dumber than finding why threads keep breaking.

Stated as a movement: jidoka moves knowledge from **judgment-loaded**
intelligence created live (**smart**), to **self-proven,
self-protected** mechanisms in which judgment is preserved instead of
required (**dumb**), and even to **no smartness required at
all**—simplified and removed (**gone**).

(A further first level—human intelligence as empathy, a sense of
romance, and critical thinking—was proposed and then withdrawn from
this topic.)

Loading a development system with **judgment-dependent** knowledge is
exactly the failure mode of many AI-assisted software projects today.

## Reconciled claim

The allocation intuition holds. “Levels of intelligence” remains a bad
name for it. The later refinement names the split more accurately.

> **Jidoka preserves adaptive attention by embedding previously learned
> judgment as a closed question: detect a specified abnormality, stop
> it near its origin, and bring people to the exception.** The detector
> is supposed to be simpler than diagnosis, repair, and kaizen. The
> movement is downhill: **judgment-loaded → judgment-preserved →
> judgment-removed** (**smart → dumb → gone**). Spend judgment once so
> later work needs *less* live judgment, not more.

[Claim 3](03-jidoka-enables-jit-trusts-respect-grows.md) already has the
people-side: jidoka frees by empowering—the right and expectation to
signal, stop, respond, and improve. [Claim
4](04-jit-assurance-resourcefulness-and-constraint.md) already has the
JIT pairing: stop conditions protect previous intentions rather than
stacking judgment-dependent output. This claim is **where that judgment
lives** and what the original “intelligence” levels were naming.

### The loom stop is a closed physical question, not a diagnosis

Toyota currently defines jidoka as “automation with a human touch”:
human wisdom added to automation. People first learn the work by hand,
define what counts as abnormal, and put detection and stop into the
process. Autonomation does **not** mean the machine has general
autonomy or intelligence.

Sakichi Toyoda's power looms, and later the Type G automatic loom,
stopped when a warp or weft yarn broke or the weft ran out, so the
machine would not keep weaving defective cloth and would not need a
watcher per loom. Toyota's own history treats those halt devices as
the origin of jidoka. The Type G also had a **non-stop shuttle
change**—automatic replenishment of an empty shuttle. That is a
different gadget: it automates a *known, expected* exhaustion so the
loom need not stop. The jidoka lesson is the **stop on abnormality**,
not the replenishment.

The stop itself is mechanically simple:

- **Warp break:** each warp yarn holds a small piece of sheet metal up
  by tension. When the yarn breaks, the metal drops and blocks a bar
  that is already reciprocating under the warp. The blocked bar trips
  the stop. Gravity plus interference. The device does not ask why the
  yarn broke.
- **Weft break or exhaustion:** a weft fork presses the weft against a
  grill. If yarn is present, tension keeps the fork from passing
  through. If the weft is gone, the fork passes through the grill and
  that motion trips the stop. Presence or absence. Not a diagnosis.

Toyota's 1905 power-loom account already splits **prevention** from
**stop**. A warp-tension controller tries to keep tension constant so
breakages are rarer. The halt devices still stop the loom when a break
occurs. Repairing the yarn, and later removing the cause of repeated
breaks, remain human work. The detector is allowed to be “dumb”
because the question is closed. Analysis, repair, and root-cause
removal are a different, larger kind of work.

That confirms the refinement. It does not confirm that the invention
was trivial. A great deal of prior learning went into choosing *which*
closed question to ask, and into making the stop reliable. Once in
place, the mechanism is still not a problem-solver.

### The descent is real; name it by required judgment, not IQ

The original vocabulary conflated effort consumed, whether a response
is fixed or adaptive, whether judgment happens when the work is
designed or while it is in use, and whether a human, a program, or an
AI performs it. Calling these levels of intelligence makes a useful
split sound like a theory of IQ, and token count is not a measure of
intelligence: a large spend may be a novel problem—or poor context,
repeated search, a weak feedback signal, rework, or unproductive
verbosity.

The objection is to the word, not to the direction. The descent is
the claim. Measure each rung by **how much live judgment its use still
requires**. Precise names stay on the page; short captions go on the
slide:

| Rung | Caption | What it is | Loom | Software |
|---|---|---|---|---|
| **Judgment-loaded** | **smart** | Knowledge that demands live intelligence every time it is used: interpreting, ranking, re-deciding. ([Claim 4](04-jit-assurance-resourcefulness-and-constraint.md)'s judgment-dependent inventory.) | A watcher per loom, judging cloth continuously; a report that a thread “might be unhealthy.” | Generated analysis, unowned tests, “smart” evaluators, patches that look finished until a person re-judges them. |
| **Judgment-preserved** | **dumb** | A closed mechanism carrying earlier judgment. **Self-proven:** its firing is the evidence—the drop-wire falls only because tension is gone. **Self-protected:** it enforces its own consequence—the loom stops whether or not anyone watches. | Drop-wire; weft fork. | A type that will not compile; a red mainline that will not ship; an assertion with a closed oracle. |
| **Judgment-removed** | **gone** | No smartness required at all: the question is simplified away or removed. | Warp-tension controller making breaks rarer; better yarn. | Cohesive modules, unrepresentable invalid states, deleted code ([Claim 20](20-poka-yoke-supports-jidoka-not-a-tps-pillar.md)). |

The captions are proper if they name **required judgment at the point
of use**, not IQ or cleverness. **Smart** here is a burden: someone
must still think. **Dumb** is a closed question the mechanism can
answer without a thinker. **Gone** is the question that no longer
exists. Do not say “smart once, dumb forever”: that uses *smart* for
the inventing of the detector, which is the opposite of this caption.

“Self-proven” is why the dumbness is trustworthy. The drop-wire shares
its physics with the work: the same tension that weaves the cloth
holds the wire up, so there is no interpretation gap between signal
and fact. The software analog is the check whose passing *is* the
proof—a compile, an enforced invariant—not the advisor whose output
must itself be judged.

Avoid **build / building** and **run time** as names for this
movement. In software those words already mean compile, CI, and when
the program executes. Say *in the design* versus *in use*, and *put
into the process* rather than “build in.”

“Low-intelligence” stays dropped: it reads as a claim about IQ and
invites the wrong argument.

A better name for the scarce *operational* category is still
**adaptive judgment**: high-cost reasoning whose cost shows up as
time, attention, model calls, experiments, and review. Humans and AI
are not interchangeable instances of one “high-intelligence” tier.
Both may search; they differ in experience, accountability, and
authority to accept risk or redefine value.

### “No intelligence” is judgment embedded in the design

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
third pillar, and not an extension that swallows jidoka. On the loom,
the warp-tension controller is closer to this layer than the drop-wire
is.

> **If a failure mode can be made impossible or irrelevant by design,
> prefer that to repeatedly detecting it after it occurs.**

Rename “no intelligence” to **prevention by construction**. [Claim
5](05-smed-software-changeover-and-ai-friendly-context.md) already uses
that distinction to cheapen a component jump; this claim owns the
layers of judgment.

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

A test is **judgment-preserved** when the oracle is closed, owned, and
actually stops work. A generated check that nobody trusts, or that
still needs a person to decide what the failure means, is
**judgment-loaded** knowledge wearing a jidoka costume.

Tests detect only the properties their oracles observe under the
conditions exercised. A green suite does not establish that the product
is correct, valuable, or safe in every unanticipated situation. A check
becomes jidoka-like when it detects a meaningful abnormality near its
origin and stops or contains it. Detection without halt is [Claim
19](19-stop-and-fix.md).

### Layers of quality and learning, not ranks of intelligence

Keep the memorable progression as **layers of quality and learning**:

| Layer | Caption | Primary function | Software examples | Where judgment lives |
|---|---|---|---|---|
| **Investigate and learn** | **smart** | Resolve novelty, ambiguity, and competing values; repair; prevent recurrence. | Diagnosis, experiments, root-cause analysis, human-AI exploration, kaizen. | Adaptive reasoning, with human accountability for value and risk. |
| **Detect and stop** | **dumb** | Recognize a specified abnormality and contain it quickly. | Compilation, assertions, tests, invariant checks, policy gates, monitors, circuit breakers. | A closed, executable oracle plus an automatic or human stop rule. Judgment-preserved: later work needs less interpretation. |
| **Prevent by design** | **gone** | Make a known error impossible, irrelevant, or local. | Cohesive modules, narrow interfaces, types, schemas, safe defaults, eliminated states. | Prior design decisions embodied in structure. |

Prevention is preferable for a well-understood failure, but not every
property can be designed away. Detection is valuable where a reliable
abnormality can be specified, but no oracle is complete. Adaptive
investigation remains necessary wherever the system meets novelty or
disagreement about what “correct” means.

The improvement loop moves learning across the process layers:

> **Investigate the novel problem → encode what is now known in a
> closed detector → redesign so the recurring failure needs neither
> detection nor rescue.**

This is not a mandate to automate everything. Some rare or value-laden
decisions should remain explicit human judgments. Observe, judge, stop,
diagnose, and improve can be allocated separately. A novel failure
starts as investigation; once understood, part of that judgment may
become a test, a monitor, a type, or the removal of the
failure-producing path. The detector that results should be simpler
than the investigation that produced it. If the “detector” is another
open-ended reasoning pass, jidoka has not happened yet.

Bainbridge's **ironies of automation** is the stress test. Automating
the easy, frequent work can leave a person with rare, high-consequence
abnormalities while weakening the practice needed for that takeover.
Jidoka does not justify automating every normal case and assuming a
human can rescue the rest. [Claim
10](10-freedom-and-trust-reinforce-through-jidoka.md) develops the
deskilling risk; [Claim 12](12-respect-for-people-who-can-think.md)
what must not be outsourced.

### AI-assisted development often stacks judgment-loaded knowledge

Many current AI-for-development setups invert the loom.

The useful pattern is: a person (with or without AI) investigates; the
team encodes a closed stop or a prevention; later episodes need less
live judgment. [Claim
4](04-jit-assurance-resourcefulness-and-constraint.md) already warns
that AI can stack judgment-dependent work into the product very
quickly.

The failure pattern is: the tool generates diagnosis, patch, tests,
and explanation in one pass; none of those is a closed question the
process can halt on without a person; the person still does the real
value-adding work of judging usefulness, risk, and recurrence; and the
system is now **loaded** with artifacts that look like knowledge.
Throughput rises while the ability to finish, trust, and improve
falls.

An AI episode that only solves the instance, or that leaves
unverified “smartness” in the repo, is the opposite of jidoka. The
scarce resource is not model calls. It is **responsible human
judgment**.

## Emerging implication for the talk

> **Spend judgment once; make the learning reusable.** Prevent what
> design can prevent. Stop automatically on a closed question. Reserve
> investigation for what is genuinely new. The movement is downhill:
> **judgment-loaded → judgment-preserved → judgment-removed**
> (**smart → dumb → gone**).

> **Design out → detect and stop → investigate and learn → design out
> more.** The detector should be dumber than the investigation. If the
> automation is as open-ended as the diagnosis, it is not jidoka yet.

> **Do not load the system with judgment-dependent knowledge.** That is
> the common AI-development failure: generated analysis and patches
> that still need “I” to do the real work, plus extra inventory to
> re-judge.

Judge an AI episode by whether it leaves the system more capable—a
clearer boundary, an unrepresentable invalid state, a regression
oracle, a local stop, better evidence, an explicit constraint, or a
documented reason the judgment must remain human—not by whether the
same difficult problem was solved again with more tokens. Jidoka-like
design protects adaptive attention only when automation exposes
meaningful abnormalities, stops safely, and enables improvement rather
than distancing people from a system they can no longer understand.

## Questions still open

- Captions **smart / dumb / gone** locked to the three rungs. Avoid
  **build / building** and **run time** as names for this movement.
  Retain **prevent / detect / learn** as the process loop.
  “Low-intelligence” stays dropped as a stage phrase.
- What is the best concrete software example that traverses all three
  rungs, from novel failure to closed detector to prevention by
  design?
- When is a generated test, evaluator, or “root-cause” explanation
  judgment-preserved (closed, owned, stops work) versus judgment-loaded
  (looks like knowledge, still needs interpretation)? When, if ever, is
  a probabilistic AI evaluator reliable enough to participate in a stop
  decision?
- How should teams measure whether AI-assisted problem solving leaves
  behind reusable capability rather than a successful one-off patch
  plus extra artifacts to re-judge?
- Which high-consequence judgments should deliberately resist
  automation even if an AI can produce a plausible recommendation?
- Does “spend judgment once” overstate how often requirements and
  environments change, making old tests or constraints stale?
- Prevention by cohesive design: answered in [Claim
  20](20-poka-yoke-supports-jidoka-not-a-tps-pillar.md)—present as
  poka-yoke supporting jidoka, not as an extension that swallows it.

## Sources consulted

1. Toyota Motor Corporation, [Toyota Production
   System](https://global.toyota/en/company/vision-and-philosophy/production-system/).
   Current primary account of jidoka as human wisdom added to automation:
   first improve work, define abnormality detection and put it into the
   process, stop, make the problem visible, prevent recurrence, and free
   people from machine watching.
2. Toyota Motor Corporation, [Toyota Virtual Plant Tour: Toyota Production
   System](https://global.toyota/en/company/plant-tours/production-system/).
   Official use of “jidoka or autonomation” for automatic stopping on
   abnormality and removal of the need for continuous machine watching.
3. Toyota Motor Corporation, [“The Birth of
   Jidoka”](https://www.toyota-global.com/company/history_of_toyota/75years/text/taking_on_the_automotive_business/chapter1/section1/item4.html),
   *75 Years of Toyota*. Warp-tension controller as prevention of
   breakage; warp and weft halting devices as automatic stop on
   irregularity; those halt devices as the origin of jidoka.
4. Japan Society of Mechanical Engineers, [Non-Stop Shuttle Change
   Toyoda Automatic Loom, Type
   G](https://www.jsme.or.jp/kikaiisan/heritage_016_en.html). Type G as
   combining automatic shuttle change with an automatic stopping device
   when warp or weft yarn is broken.
5. Christoph Roser, [“The Toyoda Model G Loom (with
   Videos)”](https://www.allaboutlean.com/toyoda-model-g/). Mechanical
   description of the warp drop-wire (sheet metal held by tension,
   falling to block a reciprocating bar) and the weft fork (fork passes
   through a grill when yarn is absent). Secondary source; mechanism
   matches museum exhibits of the Type G.
6. Y. Sugimori, K. Kusunoki, F. Cho, and S. Uchikawa (1977),
   [“Toyota production system and Kanban system: Materialization of
   just-in-time and respect-for-human
   system”](https://doi.org/10.1080/00207547708943149), *International
   Journal of Production Research*, 15(6), 553–564. Early Toyota-authored
   explanation of jidoka, visible control, worker stop authority,
   responsibility, and improvement.
7. American Society for Quality, [What is Mistake
   Proofing?](https://asq.org/quality-resources/mistake-proofing).
   Definition of poka-yoke and its distinction among eliminating an
   error, making it impossible, detecting it, warning, and preventing
   continuation.
8. Raja Parasuraman, Thomas B. Sheridan, and Christopher D. Wickens
   (2000), [“A Model for Types and Levels of Human Interaction with
   Automation”](https://doi.org/10.1109/3468.844354), *IEEE Transactions
   on Systems, Man, and Cybernetics—Part A*, 30(3), 286–297. Separates
   information acquisition, analysis, decision selection, and action
   implementation, each automatable to different degrees.
9. Lisanne Bainbridge (1983), [“Ironies of
    Automation”](https://doi.org/10.1016/0005-1098(83)90046-8),
    *Automatica*, 19(6), 775–779. Classic warning that automating routine
    operation can leave people with harder abnormal situations while
    weakening the involvement needed to handle them.
10. Earl T. Barr, Mark Harman, Phil McMinn, Muzammil Shahbaz, and Shin Yoo
    (2015), [“The Oracle Problem in Software Testing: A
    Survey”](https://discovery.ucl.ac.uk/id/eprint/1471263/), *IEEE
    Transactions on Software Engineering*, 41(5), 507–525. Shows that
    automatically executing tests does not eliminate the difficult
    judgment of distinguishing desired behavior from incorrect behavior.
11. David L. Parnas (1972), [“On the Criteria to Be Used in Decomposing
    Systems into Modules”](https://doi.org/10.1145/361598.361623),
    *Communications of the ACM*, 15(12), 1053–1058. Foundational argument
    that information-hiding decomposition improves comprehensibility and
    confines the knowledge and effects of design decisions.

**“Low-intelligence” dropped as a stage phrase; the descent is
judgment-loaded → judgment-preserved → judgment-removed (captions:
smart, dumb, gone). Loom stop confirmed as a closed mechanical
question. Human-intelligence triad withdrawn. Prevent / detect / learn
remain the process loop. Prevention is named poka-yoke in
[Claim 20](20-poka-yoke-supports-jidoka-not-a-tps-pillar.md).**
