# Claim 6: Jidoka embeds previously learned judgment so adaptive attention can learn

**Status: Provisional — judgment descent settled; cheap-generation
supporting argument and bottleneck-as-journey settled; doughnut examples
still queued; model-first is a bet**

## Claim

> **Jidoka preserves adaptive attention by putting previously learned
> judgment into a closed question: detect a specified abnormality, stop
> it near its origin, and bring people to the exception.** The detector
> must be simpler than diagnosis, repair, and kaizen. Knowledge should
> move downhill: **judgment-loaded → judgment-preserved →
> judgment-removed** (**smart → dumb → gone**). Later use should need
> *less* live judgment, not more. Encoded stops still age: when the
> product or the environment changes, some of them require live judgment
> again.

[Claim 3](03-jidoka-enables-jit-trusts-respect-grows.md) owns the
people-side: the right and expectation to signal, stop, respond, and
improve. [Claim
4](04-jit-assurance-resourcefulness-not-abundance.md) owns the JIT
pairing: pulled product work may be judgment-intensive and valuable;
stop conditions protect its intention rather than allowing
judgment-loaded output to stack. [Claim
19](19-stop-and-fix.md) owns the halt and human-triggered jidoka: an
abnormality makes emergent judgment-intensive problem solving current
work before more output inherits it. [Claim
20](20-poka-yoke-supports-jidoka.md) owns poka-yoke.
[Claim 24](24-warnings-as-stop-no-news-is-good-news.md) owns leftover
warnings as unpaid judgment; on stage it is a **sub-beat of this
cluster**, not a sibling TPS topic. This claim is **where that judgment
lives**. [Claim 00](00-judgment-intensive-work.md) owns the distinction
between judgment-intensive work and judgment-loaded artifacts and
systems.

Toyota's jidoka is “automation with a human touch”: people learn the
work by hand, define what counts as abnormal, and put detection and
stop into the process. Autonomation is not general autonomy. The
machine does not diagnose.

## Smart → dumb → gone

Measure each rung by how much live judgment its **use** still
requires. Precise names on the page; captions on the slide.
**Smart** means that use requires someone capable of live judgment; it
is not a synonym for waste. The live judgment can be valuable
creation-time work: understanding and creating for a pulled product
need, or investigating an emergent abnormality. The failure is leaving
a comparable demand in an artifact or system presented as finished.
**Dumb** is a closed question a mechanism can answer without a thinker.
**Gone** is the question that no longer exists. Avoid *build / building*
and *run time* as names for this movement—in software they already mean
compile, CI, and program execution. Say *in the design* versus *in use*.

| Caption | Rung | In use | Loom | Software |
|---|---|---|---|---|
| **smart** | **Judgment-loaded** | Live intelligence every time: interpret, rank, re-decide. | A watcher per loom; a report that a thread “might be unhealthy.” | Generated analysis, unowned tests, open-ended evaluators, patches that look finished until a person re-judges them. |
| **dumb** | **Judgment-preserved** | Closed mechanism carrying earlier judgment. **Self-proven:** its firing *is* the evidence. **Self-protected:** it enforces its own consequence. | Drop-wire; weft fork. | A type that will not compile; a red mainline that will not ship; an assertion with a closed oracle. |
| **gone** | **Judgment-removed** | No live judgment required: the question is simplified away or removed. | Warp-tension controller; better yarn. | Cohesive modules, unrepresentable invalid states, deleted code. |

The process loop is the same descent. Judgment-intensive work creates a
mechanism whose later use occupies the simpler next rung:

> **Judgment-intensive investigation → judgment-preserving closed detector →
> judgment-removing redesign.**

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

## Tests, AI after the stop, and judgment-stacked inventory

Generated versus hand-written does not decide whether a test is
**judgment-preserving** (the **dumb** rung). What matters is whether it
captures knowledge that no longer requires live judgment **in use**, and
whether the stop was decided when the test was written—not re-decided
when it later fails. A check whose oracle is closed, owned, and actually
halts work is judgment-preserving whether a person or a model typed it.
A check that still needs someone to interpret the failure is
judgment-loaded, not a closed jidoka mechanism. Park or accumulate such
checks and they become judgment-stacked inventory. A green suite does
not prove the product valuable or safe in every unanticipated situation.

AI may participate in **judgment-intensive problem solving after a closed
stop has already happened**. That is already routine: agents with a
harness can learn from test failures and correctly fix a large share of
them. Keep the judgment-preserving stop; use the AI's live judgment as a
**further filter** on failures the closed test cannot distinguish, so more of
the remaining judgment that reaches a person is actually value-adding. The
anti-pattern is asking the agent to get rid of the annoying failing
tests and proceed toward the goal unstopped.

The useful pattern: a person (with or without AI) performs the
judgment-intensive investigation; the team encodes a closed stop or a
prevention; later episodes need less live judgment. The failure: the
tool generates diagnosis, patch, tests, and explanation in one pass;
none of those is a closed question the process can halt on without a
person; the person still does the real judging. The generated artifacts
are **judgment-loaded** while looking like finished knowledge.
Throughput rises while the ability to finish, trust, and improve falls.

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
manners for the agent. Doughnut already does some of this (the
bullets below). A talk-shaped same-gates episode and worked
preferred-test examples are queued on
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
enough to proceed. AI may still resolve a failure exposed by a closed stop
(a type error, a red scenario caused by the current change). It
may not dissolve that stop, and it may not take the five.

## Generation is cheap; the bottleneck is the journey

> **Generation is cheap; judgment is expensive** is a supporting
> argument for this jidoka cluster, not the talk's central thesis.
> [Claim 10](10-freedom-and-trust-reinforce-through-jidoka.md) owns
> Freedom and Entrustment.

Cheap generation does not move the bottleneck to a later pipeline
stage—problem selection, specification, verification, integration,
deployment, learning, or governance. Any of those can be flooded with
judgment-loaded output. The scarce capacity is people's **cognitive
ability to fully experience the problem-solving journey and to
comprehend both the problem and the solution**.

That is why accumulating judgment-loaded artifacts as judgment-stacked
inventory is the distinctive failure already named above: the person who must
judge did not live the path that produced the artifact, and the next problem
has even less room for a real journey. [Claim
12](12-respect-for-people-who-can-think.md) owns what must not be
outsourced; [Claim
10](10-freedom-and-trust-reinforce-through-jidoka.md) owns deskilling.
This claim owns the encoding that keeps remaining attention able to
walk the next problem.

## Implication for the talk

> **Smart → dumb → gone.** Prevent what design can prevent. Stop
> automatically on a closed question. Reserve investigation for what
> is genuinely new. The detector should require less live judgment than the
> investigation.

> **Do not treat judgment-loaded output as finished knowledge.**
> Generated analysis and patches that still need “I” to do the real
> work, plus extra inventory to interpret, rank, and re-decide, climb
> the descent backwards. A leftover warning is that remainder in miniature
> ([Claim 24](24-warnings-as-stop-no-news-is-good-news.md)). After closed
> stops, AI may filter and fix the failures they expose.
> It must not delete the stop to proceed, and it must not take the
> judgments that stay human: value, design, credentials, undiagnosed
> failure, and ambiguity.

Judge an AI episode by whether it leaves the system more capable—a
clearer boundary, an unrepresentable invalid state, a regression
oracle, a local stop, better evidence, or a documented reason the
judgment must remain human—not by whether the same difficult problem
was solved again with more tokens. Say **model first** out loud as
Terry's bet, not as a measured result.

On stage, one **jidoka / preserve-knowledge** slide uses the supporting
argument, then unpacks it:

> **Jidoka preserves knowledge.** Generation is cheap; judgment is
> expensive. Encode what we already know. Leave people able to
> experience the next problem and comprehend the solution.

Say jidoka **embeds previously learned judgment** in a closed detector
so adaptive attention is free. Do not say it is the organization's
only knowledge store: kaizen, ADRs, and conversation also store
knowledge; jidoka encodes the part that can become a stop.

## Questions still open

- Doughnut-sourced **smart → dumb** and **smart → gone** examples,
  one same-gates episode, and preferred unit/E2E examples for the
  preferred-tests slide are queued on
  [Claim 13](13-doughnut-project-examples.md); training weeks
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
