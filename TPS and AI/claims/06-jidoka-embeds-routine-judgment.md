# Claim 6: Jidoka embeds previously learned judgment so adaptive attention can learn

**Status: Provisional — partially reconciled**

## Claim

> **Jidoka preserves adaptive attention by putting previously learned
> judgment into a closed question: detect a specified abnormality, stop
> it near its origin, and bring people to the exception.** The detector
> must be simpler than diagnosis, repair, and kaizen. Knowledge should
> move downhill: **judgment-loaded → judgment-preserved →
> judgment-removed** (**smart → dumb → gone**). Spend judgment once so
> later work needs *less* live judgment, not more.

[Claim 3](03-jidoka-enables-jit-trusts-respect-grows.md) owns the
people-side: the right and expectation to signal, stop, respond, and
improve. [Claim
4](04-jit-assurance-resourcefulness-and-constraint.md) owns the JIT
pairing: stop conditions protect previous intentions rather than
stacking judgment-dependent output. [Claim 19](19-stop-and-fix.md)
owns the halt. [Claim
20](20-poka-yoke-supports-jidoka-not-a-tps-pillar.md) owns poka-yoke
as prevention supporting jidoka, not as a third pillar. This claim is
**where that judgment lives**.

Toyota's jidoka is “automation with a human touch”: people learn the
work by hand, define what counts as abnormal, and put detection and
stop into the process. Autonomation is not general autonomy. The
machine does not diagnose.

## Smart → dumb → gone

Measure each rung by how much live judgment its **use** still
requires. Precise names on the page; captions on the slide.
**Smart** is a burden: someone must still think. **Dumb** is a closed
question a mechanism can answer without a thinker. **Gone** is the
question that no longer exists. Avoid *build / building* and *run
time* as names for this movement—in software they already mean
compile, CI, and program execution. Say *in the design* versus *in
use*.

| Caption | Rung | In use | Loom | Software |
|---|---|---|---|---|
| **smart** | **Judgment-loaded** | Live intelligence every time: interpret, rank, re-decide. | A watcher per loom; a report that a thread “might be unhealthy.” | Generated analysis, unowned tests, “smart” evaluators, patches that look finished until a person re-judges them. |
| **dumb** | **Judgment-preserved** | Closed mechanism carrying earlier judgment. **Self-proven:** its firing *is* the evidence. **Self-protected:** it enforces its own consequence. | Drop-wire; weft fork. | A type that will not compile; a red mainline that will not ship; an assertion with a closed oracle. |
| **gone** | **Judgment-removed** | No smartness required: the question is simplified away or removed. | Warp-tension controller; better yarn. | Cohesive modules, unrepresentable invalid states, deleted code. |

The process loop is the same descent:

> **Investigate the novel problem (smart) → encode what is now known
> in a closed detector (dumb) → redesign so the recurring failure
> needs neither detection nor rescue (gone).**

A novel failure starts as investigation. Once understood, part of that
judgment may become a test, a monitor, a type, or the removal of the
failure-producing path. The detector should be simpler than the
investigation that produced it. If the “detector” is another
open-ended reasoning pass, jidoka has not happened yet. Some rare or
value-laden decisions should remain explicit human judgments.

Prefer **gone** for a well-understood failure: information hiding, a
narrow interface, a type that excludes invalid states, a fixture that
permits only the correct orientation. That usually took substantial
intelligence to create; Parnas's point is temporal—complexity has not
left the universe; responsibility for it has been localized. On the
loom, the warp-tension controller is this rung; the drop-wire is
**dumb**.

## The loom stop is a closed physical question

Sakichi Toyoda's power looms, and later the Type G, stopped when a
warp or weft yarn broke or the weft ran out, so the machine would not
keep weaving defective cloth and would not need a watcher per loom.
Toyota treats those halt devices as the origin of jidoka.

- **Warp:** yarn tension holds a piece of sheet metal up. A break lets
  it fall and block a bar already moving under the warp. Gravity plus
  interference. No “why.”
- **Weft:** a fork presses the yarn against a grill. Yarn present →
  the fork cannot pass. Yarn gone → it passes, and that motion trips
  the stop. Presence or absence. No diagnosis.

The Type G's **non-stop shuttle change** is a different gadget: it
replenishes a *known, expected* empty shuttle so the loom need not
stop. The jidoka lesson is the stop, not the replenishment.

Toyota's 1905 account already splits prevention from stop. A
warp-tension controller keeps tension constant so breakages are
rarer. Halt devices still stop the loom when a break occurs. Repair
and later removal of the cause remain human work. Choosing *which*
closed question to ask took prior learning. Once in place, the
mechanism is not a problem-solver.

The drop-wire shares its physics with the work: the same tension that
weaves the cloth holds the wire up, so there is no interpretation gap
between signal and fact. The software analog is the check whose
passing *is* the proof—a compile, an enforced invariant—not an
advisor whose output must itself be judged.

## Tests, AI, and stacking smart inventory

An automated test can execute cheaply. Its value is the judgment in
its setup, observations, and assertions (the **test oracle
problem**). Repeating an oracle is cheap; discovering the right one
may not be. A test is **dumb** when the oracle is closed, owned, and
actually stops work. A generated check that nobody trusts, or that
still needs a person to decide what the failure means, is **smart**
knowledge wearing a jidoka costume. A green suite does not prove the
product valuable or safe in every unanticipated situation.

Many AI-for-development setups invert the loom. The useful pattern: a
person (with or without AI) investigates; the team encodes a closed
stop or a prevention; later episodes need less live judgment. The
failure: the tool generates diagnosis, patch, tests, and explanation
in one pass; none of those is a closed question the process can halt
on without a person; the person still does the real judging; the
system is **loaded** with artifacts that look like knowledge.
Throughput rises while the ability to finish, trust, and improve
falls.

Bainbridge's ironies of automation are the stress test: automating
the easy, frequent work can leave people with rare, high-consequence
abnormalities while weakening the practice needed for takeover.
[Claim 10](10-freedom-and-trust-reinforce-through-jidoka.md) develops
deskilling; [Claim 12](12-respect-for-people-who-can-think.md) what
must not be outsourced.

## Talk implication

> **Smart → dumb → gone.** Prevent what design can prevent. Stop
> automatically on a closed question. Reserve investigation for what
> is genuinely new. The detector should be dumber than the
> investigation.

> **Do not load the system with judgment-dependent knowledge.**
> Generated analysis and patches that still need “I” to do the real
> work, plus extra inventory to re-judge, climb the descent
> backwards.

Judge an AI episode by whether it leaves the system more capable—a
clearer boundary, an unrepresentable invalid state, a regression
oracle, a local stop, better evidence, or a documented reason the
judgment must remain human—not by whether the same difficult problem
was solved again with more tokens.

## Questions still open

- What is the best concrete software example that traverses all three
  rungs?
- When is a generated test, evaluator, or “root-cause” explanation
  dumb (closed, owned, stops work) versus smart (looks like knowledge,
  still needs interpretation)? When, if ever, is a probabilistic AI
  evaluator reliable enough to participate in a stop decision?
- How should teams measure whether AI-assisted problem solving leaves
  reusable capability rather than a one-off patch plus extra artifacts
  to re-judge?
- Which high-consequence judgments should deliberately resist
  automation even if an AI can produce a plausible recommendation?
- Does “spend judgment once” overstate how often requirements and
  environments change, making old tests or constraints stale?

## Sources consulted

1. Toyota Motor Corporation, [Toyota Production
   System](https://global.toyota/en/company/vision-and-philosophy/production-system/).
   Jidoka as human wisdom added to automation: learn the work, define
   abnormality detection and put it into the process, stop, make the
   problem visible, prevent recurrence, free people from machine
   watching.
2. Toyota Motor Corporation, [Toyota Virtual Plant Tour: Toyota Production
   System](https://global.toyota/en/company/plant-tours/production-system/).
   “Jidoka or autonomation”: automatic stopping on abnormality;
   no continuous machine watching.
3. Toyota Motor Corporation, [“The Birth of
   Jidoka”](https://www.toyota-global.com/company/history_of_toyota/75years/text/taking_on_the_automotive_business/chapter1/section1/item4.html),
   *75 Years of Toyota*. Warp-tension controller as prevention;
   warp and weft halting devices as stop on irregularity; those halt
   devices as the origin of jidoka.
4. Japan Society of Mechanical Engineers, [Non-Stop Shuttle Change
   Toyoda Automatic Loom, Type
   G](https://www.jsme.or.jp/kikaiisan/heritage_016_en.html). Type G
   combines automatic shuttle change with automatic stopping when warp
   or weft yarn is broken.
5. Christoph Roser, [“The Toyoda Model G Loom (with
   Videos)”](https://www.allaboutlean.com/toyoda-model-g/). Warp
   drop-wire (sheet metal held by tension, falling to block a
   reciprocating bar) and weft fork (fork passes through a grill when
   yarn is absent). Secondary source; matches museum exhibits of the
   Type G.
6. Earl T. Barr, Mark Harman, Phil McMinn, Muzammil Shahbaz, and Shin Yoo
   (2015), [“The Oracle Problem in Software Testing: A
   Survey”](https://discovery.ucl.ac.uk/id/eprint/1471263/), *IEEE
   Transactions on Software Engineering*, 41(5), 507–525. Executing
   tests does not eliminate the judgment of distinguishing desired
   behavior from incorrect behavior.
7. David L. Parnas (1972), [“On the Criteria to Be Used in Decomposing
   Systems into Modules”](https://doi.org/10.1145/361598.361623),
   *Communications of the ACM*, 15(12), 1053–1058. Information-hiding
   localizes knowledge; complexity does not leave the universe.
8. Lisanne Bainbridge (1983), [“Ironies of
   Automation”](https://doi.org/10.1016/0005-1098(83)90046-8),
   *Automatica*, 19(6), 775–779. Automating routine operation can
   leave people with harder abnormal situations while weakening the
   involvement needed to handle them.
