# Claim 6: Jidoka embeds previously learned judgment so adaptive attention can learn

**Status: Provisional — “low-intelligence” restated as judgment-building
detection; loom stop confirmed as a closed mechanical question;
human-intelligence layer opened**

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
**preserved knowledge that is judgment-building**, not
**judgment-dependent**. Jidoka should reduce dependence on future
judgment, not add more of it.

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

A further first level is **human intelligence**: empathy, a sense of
romance, and critical thinking. That layer is not interchangeable with
AI “high intelligence.”

Loading a development system with **judgment-dependent** knowledge is
exactly the failure mode of many AI-assisted software projects today.

## Reconciled claim

The allocation intuition holds. “Levels of intelligence” remains a bad
name for it. The later refinement names the split more accurately.

> **Jidoka preserves adaptive attention by embedding previously learned
> judgment as a closed question: detect a specified abnormality, stop
> it near its origin, and bring people to the exception.** The detector
> is supposed to be simpler than diagnosis, repair, and kaizen. Spend
> judgment once so later work needs *less* live judgment, not more.

[Claim 3](03-jidoka-enables-jit-trusts-respect-grows.md) already has the
people-side: jidoka frees by empowering—the right and expectation to
signal, stop, respond, and improve. [Claim
4](04-jit-assurance-resourcefulness-and-constraint.md) already has the
JIT pairing: stop conditions protect previous intentions rather than
stacking judgment-dependent output. This claim is **where that judgment
lives**, what the original “intelligence” levels were naming, and why
human intelligence is not the same bucket as an expensive model call.

### The loom stop is a closed physical question, not a diagnosis

Toyota currently defines jidoka as “automation with a human touch”:
human wisdom added to automation. People first learn the work by hand,
define what counts as abnormal, and build detection and stop into the
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
closed question to ask, and into making the stop reliable. The runtime
mechanism is still not a problem-solver.

### “Low-intelligence” is the wrong name; judgment-building is the split

The original vocabulary conflated effort consumed, whether a response
is fixed or adaptive, whether judgment happens at design time or
during operation, and whether a human, a program, or an AI performs
it. Calling these levels of intelligence makes a useful split sound
like a theory of IQ. Token count is not a measure of intelligence. A
large spend may be a novel problem—or poor context, repeated search, a
weak feedback signal, rework, or unproductive verbosity.

What “low-intelligence” was pointing at is better named
**judgment-building** knowledge:

| | **Judgment-building** | **Judgment-dependent** |
|---|---|---|
| **What was encoded** | A closed question whose answer already means “stop” or “this state is illegal.” | Information that still needs interpretation, trust, or a further decision at use time. |
| **Effect on later work** | Reduces live judgment: the process can halt or refuse without a meeting. | Increases live judgment: someone must read, rank, verify, or choose. |
| **Loom** | Drop-wire / weft fork. | A report that a thread “might be unhealthy,” requiring an expert to decide whether to stop. |
| **Software** | Type that excludes the invalid state; assertion with a known oracle; build that will not ship red. | Generated analysis, unowned tests, “smart” evaluators, and patches that look finished until a person re-judges them. |

Talk wording, in order of preference while this is still open:

1. **Judgment-building vs judgment-dependent** — the thesis, and the
   AI-project failure mode.
2. **Closed-question stop** / **specified abnormality** — closest to
   Toyota, and what the loom actually does.
3. **Dumb stop, smart response** — memorable once the closed-question
   point is in place; risky if it sounds as if the invention or the
   people were stupid.

Do not say “low-intelligence automation” on stage. It undersells the
prior learning that chose the question, and it invites the audience to
argue about IQ instead of about allocation.

A better name for the scarce *operational* category is still
**adaptive judgment**: high-cost reasoning whose cost shows up as
time, attention, model calls, experiments, and review. Humans and AI
are not interchangeable instances of one “high-intelligence” tier.
Both may search; they differ in experience, accountability, and
authority to accept risk or redefine value. The new first level below
is why that difference is not only about tokens.

### Human intelligence is not the same as expensive investigation

The original “high intelligence” mixed two things: (1) diagnosing and
fixing a stopped abnormality, and (2) the human capacities that decide
what is worth making, for whom, and whether the evidence is good
enough. The later refinement splits them.

Proposed first level, still a hypothesis:

> **Human intelligence**—empathy, a sense of romance, and critical
> thinking—is not a larger token budget. It is the capacity the stop
> is supposed to free, not a job to automate.

Research around this triad is **reopened**. Toyota does not publish
these three words as a named set.

| Terry's name | What sources currently support | What is still missing |
|---|---|---|
| **Empathy** | Toyota Way Respect: understand others, take responsibility, build mutual trust. “Next process is the customer” is a demand to imagine the person downstream. | Whether “empathy” is the talk word, or whether Respect / understand-others is stronger because it is Toyota's. |
| **Sense of romance** | No Toyota primary found that uses “romance” / ロマン for TPS. The nearest official neighbor is **Challenge**: a long-term vision, courage, and creativity—not efficiency alone. Cho's “making things means making people” cares about more than output. | Needs Terry's intended sense (craft love, ロマン as a compelling dream, aesthetic of good work, or something else) and a source, or an explicit “this is my word, not Toyota's.” |
| **Critical thinking** | Strongest overlap. Independent thinking, genchi genbutsu, hansei, kaizen, “Good Thinking, Good Products.” [Claim 12](12-respect-for-people-who-can-think.md) already owns people-who-can-think and what must not be outsourced. | How this claim and Claim 12 share the stage without two lectures on thinking. |

This layer does not sit *above* prevention and detection as a smarter
machine. It sits *beside* the process layers as the reason they exist.
A drop-wire cannot care that a weaver is tired, that the cloth is for
someone, or that the “fix” is the wrong product. An AI that writes a
plausible root-cause essay still has not done that work.

[Claim 12](12-respect-for-people-who-can-think.md) keeps the pillar:
the operating system requires people who can think, and the work is
the school that makes them. This claim keeps the allocation: do not
put empathy, romance, and critical thinking in the same bucket as
“the model spent many tokens.”

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

A test is **judgment-building** when the oracle is closed, owned, and
actually stops work. A generated check that nobody trusts, or that
still needs a person to decide what the failure means, is
**judgment-dependent** knowledge wearing a jidoka costume.

Tests detect only the properties their oracles observe under the
conditions exercised. A green suite does not establish that the product
is correct, valuable, or safe in every unanticipated situation. A check
becomes jidoka-like when it detects a meaningful abnormality near its
origin and stops or contains it. Detection without halt is [Claim
19](19-stop-and-fix.md).

### Layers of quality and learning, not ranks of intelligence

Keep the memorable progression as **layers of quality and learning**,
with **human intelligence** named so it is not swallowed by “high
intelligence” as token spend:

| Layer | Primary function | Software examples | Where judgment lives |
|---|---|---|---|
| **Human intelligence** | Care, aspiration, and critique that decide what is worth making and whether the evidence is enough. | Empathy with the user and the next teammate; a sense of romance about the product; critical thinking about value, risk, and whose judgment counts. | Empathy, romance, and critical thinking. Research reopened; not a token budget. |
| **Investigate and learn** | Resolve novelty, ambiguity, and competing values; repair; prevent recurrence. | Diagnosis, experiments, root-cause analysis, human-AI exploration, kaizen. | Adaptive reasoning, with human accountability for value and risk. |
| **Detect and stop** | Recognize a specified abnormality and contain it quickly. | Compilation, assertions, tests, invariant checks, policy gates, monitors, circuit breakers. | A closed, executable oracle plus an automatic or human stop rule. Judgment-building when later work needs less interpretation. |
| **Prevent by design** | Make a known error impossible, irrelevant, or local. | Cohesive modules, narrow interfaces, types, schemas, safe defaults, eliminated states. | Prior design decisions embodied in structure. |

Prevention is preferable for a well-understood failure, but not every
property can be designed away. Detection is valuable where a reliable
abnormality can be specified, but no oracle is complete. Adaptive
investigation remains necessary wherever the system meets novelty.
Human intelligence remains necessary wherever the question is not “did
the thread break?” but “is this the right cloth, for this person, and
are we becoming the kind of team that can tell?”

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

### AI-assisted development often stacks judgment-dependent knowledge

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
judgment**, including the capacities named above.

## Emerging implication for the talk

> **Spend judgment once; make the learning reusable.** Prevent what
> design can prevent. Stop automatically on a closed question. Reserve
> investigation for what is genuinely new. Do not call that
> low-intelligence. Call it **judgment-building**.

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

The human-intelligence triad is a candidate talk beat, not yet a
sourced TPS claim: **empathy, a sense of romance, and critical
thinking** are what the stop is for, and they are not a larger
context window.

## Questions still open

- Talk vocabulary: **judgment-building vs judgment-dependent**,
  **closed-question stop**, or **dumb stop, smart response**? Retain
  **prevent / detect / learn** as the process loop. “Low-intelligence”
  is dropped as a stage phrase.
- Empathy, sense of romance, and critical thinking: keep as Terry's
  first level on this claim, move the triad to
  [Claim 12](12-respect-for-people-who-can-think.md), or split
  (critical thinking already there; empathy and romance still
  homeless)? What does “romance” mean here, and is there a Toyota or
  Japanese-engineering source, or is it explicitly Terry's word?
- What is the best concrete software example that traverses prevention,
  closed-question stop, investigation, *and* a human-intelligence
  judgment the detector cannot make?
- When is a generated test, evaluator, or “root-cause” explanation
  judgment-building (closed, owned, stops work) versus
  judgment-dependent (looks like knowledge, still needs
  interpretation)? When, if ever, is a probabilistic AI evaluator
  reliable enough to participate in a stop decision?
- How should teams measure whether AI-assisted problem solving leaves
  behind reusable capability rather than a successful one-off patch
  plus extra artifacts to re-judge?
- Which high-consequence judgments should deliberately resist
  automation even if an AI can produce a plausible recommendation—
  including ones that are about care, aspiration, or critique rather
  than defect detection?
- Does “spend judgment once” overstate how often requirements and
  environments change, making old tests or constraints stale?
- Prevention by cohesive design: answered in [Claim
  20](20-poka-yoke-supports-jidoka-not-a-tps-pillar.md)—present as
  poka-yoke supporting jidoka, not as an extension that swallows it.

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
7. Toyota Motor Corporation, [Toyota Way
   2001](https://www.toyota-global.com/company/history_of_toyota/75years/data/conditions/philosophy/toyotaway2001.html)
   and [Annual Report
   2019](https://global.toyota/pages/global_toyota/ir/library/annual/2019_001_annual_en.pdf),
   as already used in
   [Claim 12](12-respect-for-people-who-can-think.md). Empathy maps onto
   Respect as “understand others”; romance has no primary match yet;
   critical thinking maps onto independent thinking and kaizen.
8. American Society for Quality, [What is Mistake
   Proofing?](https://asq.org/quality-resources/mistake-proofing).
   Definition of poka-yoke and its distinction among eliminating an
   error, making it impossible, detecting it, warning, and preventing
   continuation.
9. Raja Parasuraman, Thomas B. Sheridan, and Christopher D. Wickens
   (2000), [“A Model for Types and Levels of Human Interaction with
   Automation”](https://doi.org/10.1109/3468.844354), *IEEE Transactions
   on Systems, Man, and Cybernetics—Part A*, 30(3), 286–297. Separates
   information acquisition, analysis, decision selection, and action
   implementation, each automatable to different degrees.
10. Lisanne Bainbridge (1983), [“Ironies of
    Automation”](https://doi.org/10.1016/0005-1098(83)90046-8),
    *Automatica*, 19(6), 775–779. Classic warning that automating routine
    operation can leave people with harder abnormal situations while
    weakening the involvement needed to handle them.
11. Earl T. Barr, Mark Harman, Phil McMinn, Muzammil Shahbaz, and Shin Yoo
    (2015), [“The Oracle Problem in Software Testing: A
    Survey”](https://discovery.ucl.ac.uk/id/eprint/1471263/), *IEEE
    Transactions on Software Engineering*, 41(5), 507–525. Shows that
    automatically executing tests does not eliminate the difficult
    judgment of distinguishing desired behavior from incorrect behavior.
12. David L. Parnas (1972), [“On the Criteria to Be Used in Decomposing
    Systems into Modules”](https://doi.org/10.1145/361598.361623),
    *Communications of the ACM*, 15(12), 1053–1058. Foundational argument
    that information-hiding decomposition improves comprehensibility and
    confines the knowledge and effects of design decisions.

**“Low-intelligence” dropped as a stage phrase; the intended split is
judgment-building vs judgment-dependent. Loom stop confirmed as a closed
mechanical question. Human-intelligence triad opened. Prevent / detect /
learn remain the process loop. Prevention is named poka-yoke in
[Claim 20](20-poka-yoke-supports-jidoka-not-a-tps-pillar.md).**
