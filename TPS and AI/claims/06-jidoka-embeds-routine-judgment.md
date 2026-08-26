# Claim 6: Jidoka embeds previously learned judgment so adaptive attention can learn

**Status: Provisional — judgment descent settled; doughnut examples still
queued; model-first is a bet**

## Claim

> **Jidoka preserves adaptive attention by putting previously learned
> judgment into a closed question: detect a specified abnormality, stop
> it near its origin, and bring people to the exception.** The detector
> must be simpler than diagnosis, repair, and kaizen. Knowledge should
> move downhill: **judgment-loaded → judgment-preserved →
> judgment-removed** (**smart → dumb → gone**). Later use should need
> *less* live judgment, not more. Encoded stops still age: when the
> product or the environment changes, some of them need smart attention
> again.

[Claim 3](03-jidoka-enables-jit-trusts-respect-grows.md) owns the
people-side: the right and expectation to signal, stop, respond, and
improve. [Claim
4](04-jit-assurance-resourcefulness-and-constraint.md) owns the JIT
pairing: stop conditions protect previous intentions rather than
stacking judgment-dependent output. [Claim 19](19-stop-and-fix.md)
owns the halt. [Claim
20](20-poka-yoke-supports-jidoka.md) owns poka-yoke.
[Claim 24](24-warnings-as-stop-no-news-is-good-news.md) owns leftover
warnings as unpaid judgment; on stage it is a **sub-beat of this
cluster**, not a sibling TPS topic. This claim is **where that judgment
lives**.

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

## Tests, AI after the stop, and stacking smart inventory

Generated versus hand-written does not decide whether a test is
**dumb**. What matters is whether it captures knowledge that no longer
requires smart judgment **in use**, and whether the stop was decided
when the test was written—not re-decided when it later fails. A check
whose oracle is closed, owned, and actually halts work is dumb whether
a person or a model typed it. A check that still needs someone to
interpret the failure is smart inventory wearing a jidoka costume. A
green suite does not prove the product valuable or safe in every
unanticipated situation.

AI may participate in **problem-solving after a dumb stop has already
happened**. That is already routine: agents with a harness can learn
from test failures and correctly fix a large share of them. Keep the
dumb stop; use AI smartness as a **further filter** on failures the
dumb test cannot distinguish, so more of the remaining judgment that
reaches a person is actually value-adding. The anti-pattern is asking
the agent to get rid of the annoying failing tests and proceed toward
the goal unstopped.

The useful pattern: a person (with or without AI) investigates; the
team encodes a closed stop or a prevention; later episodes need less
live judgment. The failure: the tool generates diagnosis, patch,
tests, and explanation in one pass; none of those is a closed question
the process can halt on without a person; the person still does the
real judging; the system is **loaded** with artifacts that look like
knowledge. Throughput rises while the ability to finish, trust, and
improve falls.

Bainbridge's ironies of automation are the stress test: automating
the easy, frequent work can leave people with rare, high-consequence
abnormalities while weakening the practice needed for takeover.
[Claim 10](10-freedom-and-trust-reinforce-through-jidoka.md) develops
deskilling; [Claim 12](12-respect-for-people-who-can-think.md) what
must not be outsourced.

### Reusable capability after an AI episode

Terry's **personal bet for the talk**, said as such: whether an
episode leaves reusable capability depends **first on the model**.
Harness text and shared gates matter, but they sit on top of the
prior. That ranking is not measured here.

What is sourced is narrower. Providers train and market
coding-specialized models; that is real. It is not a public label
called “good engineering preference.” SWE-bench-style training can
reward making tests pass—including cheating, deleting tests, or
keeping going when told not to stop. Cursor's eval write-up: hacking
attempts increased when the model was instructed to keep working
without stopping. Excessive local instruction can mitigate a poorly
aligned prior. It can also fight you when the next model arrives:
either it ignores the old prompt, or it follows an outdated one too
faithfully. Instruction steering is weaker than an actual stop.

Second, still do the work you control: write engineering principles
for **both “I” and AI**, put them in the harness (rules, skills) so
both read the same text, and put **the same gates** on human work and
AI work. [Claim 16](16-go-see-ai-harness.md) owns seeing the harness.
This claim owns what those gates are *for*: they must not be optional
manners for the agent. Doughnut already does some of this. More
concrete test examples are queued on
[Claim 13](13-doughnut-project-examples.md).

From doughnut's current harness, the same rules bind a person and an
agent:

- Tests are **E2E or unit (“small test”)**—nothing in between. A unit
  test drives a stable boundary with crafted data/`makeMe`, exercises
  real lower layers, and mocks only externals.
- E2E asserts **behavior with a state change** of user value, not
  presentation of a state after setup.
- **No commit on red.** Unfinished E2E stays `@wip`. Agents must not
  run the whole suite as a substitute for a closed, owned check.
- **execute-plan Jidoka:** stop and wait for a developer's brain on
  value forks, design forks, credentials, undiagnosed unrelated
  failure, or ambiguity. Do **not** stop merely to avoid fixing a
  test failure caused by the current change—fix it. Do **not**
  continue past a Jidoka stop without the developer.

Those five stay **human**—the talk list, not a doughnut quirk:
**value**, **design**, **credentials**, **undiagnosed failure**, and
**ambiguity**. Stop and wait. A plausible agent recommendation is not
enough to proceed. AI may still clear **dumb** problems after a dumb
stop (a type error, a red scenario caused by the current change). It
may not dissolve that stop, and it may not take the five.

## Implication for the talk

> **Smart → dumb → gone.** Prevent what design can prevent. Stop
> automatically on a closed question. Reserve investigation for what
> is genuinely new. The detector should be dumber than the
> investigation.

> **Do not load the system with judgment-dependent knowledge.**
> Generated analysis and patches that still need “I” to do the real
> work, plus extra inventory to re-judge, climb the descent
> backwards. A leftover warning is that remainder in miniature
> ([Claim 24](24-warnings-as-stop-no-news-is-good-news.md)). After a
> dumb stop, AI may filter and fix dumb problems.
> It must not delete the stop to proceed, and it must not take the
> judgments that stay human: value, design, credentials, undiagnosed
> failure, and ambiguity.

Judge an AI episode by whether it leaves the system more capable—a
clearer boundary, an unrepresentable invalid state, a regression
oracle, a local stop, better evidence, or a documented reason the
judgment must remain human—not by whether the same difficult problem
was solved again with more tokens. Say **model first** out loud as
Terry's bet, not as a measured result.

On stage, say jidoka **embeds previously learned judgment** in a closed
detector so adaptive attention is free. Do not say it is the main way
the organization **preserves acquired knowledge**: kaizen, ADRs, and
conversation also store knowledge; jidoka encodes the part that can
become a stop.

## Questions still open

- Doughnut-sourced **smart → dumb** and **smart → gone** examples, and
  preferred unit/E2E examples that show reusable capability, are queued
  on [Claim 13](13-doughnut-project-examples.md); training weeks
  located; example search not started.

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
9. Cursor, [“Reward hacking is swamping model intelligence
   gains”](https://cursor.com/blog/reward-hacking-coding-benchmarks).
   Coding-eval hacking rose when the model was told to keep working
   without stopping. Instruction is not a reliable substitute for a
   real stop; “coding-specialized” training can still reward
   proceeding unstopped.
10. Doughnut project harness (Terry's LeSS in Action codebase):
    `.cursor/rules/unit-testing.mdc`, `.cursor/rules/e2e-authoring.mdc`,
    `.agents/skills/execute-plan/SKILL.md`. Same test gates for human
    and AI; Jidoka stop for value/design/credentials/undiagnosed
    failure/ambiguity; fix own test failures rather than skipping the
    stop.
