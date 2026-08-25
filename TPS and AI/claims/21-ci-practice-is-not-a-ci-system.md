# Claim 21: CI is a developer practice; a CI system is an andon

**Status: Provisional — LeSS sources the split; CI without a CI system
is possible but unusual; talk placement not chosen**

## Original claim / hypothesis

> A CI system is different from CI. CI, as described in [Claim
> 8](08-technical-excellence-enables-jit-coordination-in-less.md), is
> an important developer practice in LeSS. It enables the
> integration-coordination interplay that scales the way of working.
> A CI system, on the other hand, is a jidoka mechanism directly
> inspired by the andon system in TPS. It might be used to support
> CI. Having a CI system does not make the teams do CI. An
> organization that does CI might not necessarily have a CI system
> (that would be weird, but it is possible).

This is a lightly edited record of Terry's hypothesis. It was split
from Claim 8, where the purpose of technical excellence is the
*practice*, not the server, and from [Claim
19](19-stop-and-fix.md), where a red pipeline must actually halt.
This claim owns the **names**.

## Research-based adjustment

LeSS's own CI chapter is already this distinction. The first
misconception it removes is: continuous integration is not automating
the build and running tests. CI is:

- a developer practice…
- to keep a working system
- by small changes
- growing the system
- by integrating at least daily
- on the mainline
- supported by a CI system
- with lots of automated tests

**Supported by**, not **constituted by**. Owen Rogers, quoted there:
CI is about what people do, not about what tools they use. Once a
product group scales, it is easy to be deceived into thinking the
teams are practicing CI just because the tools are set up and
running. If developers do not integrate regularly, or do not keep the
integration environment working, they are not practicing CI. Full
stop. *More with LeSS* files the same error as **Avoid… Believing CI
is a tool**.

> **CI is the developer practice of growing one working system by
> small changes on the mainline. A CI system is not that practice. It
> is an andon: a jidoka mechanism that can support the practice by
> detecting a broken integrated product and making the stop visible.**

That is why a pipeline that compiles while people still integrate on
long-lived branches is not CI. It is also why a group can, in
principle, do CI without a CI system.

### The practice is what scales LeSS

[Claim 8](08-technical-excellence-enables-jit-coordination-in-less.md)
owns why the practice matters: several feature teams change one
product; frequent mainline integration removes unintegrated work in
process, exposes abnormalities and dependencies, and can pull
self-managed collaboration. [Claim
3](03-jidoka-enables-jit-trusts-respect-grows.md) names that
collaboration pattern **Whole Product Focus**. LeSS's coordination
guides are the same story in operational language: communicate in
code, integrate continuously, just talk when a relevant change
creates a need.

None of that is installed when someone stands up Jenkins, GitHub
Actions, or a red–green monitor. CI on large products is hard
precisely because it is a developer practice. If it were only tools,
LeSS says, you could start a CI project or hire a company to “install
CI.” You cannot. It requires a change to the daily habits of all
developers.

LeSS's own counter-example is the one to keep: large products with an
excellent automated build whose developers still delayed integration,
sometimes because “thou shall not break the build” made them afraid
to. Always-green tooling, opposite of CI.

### The CI system is andon, not CI

When everyone integrates to the mainline, a mistake is already more
visible: other developers update, and they are annoyed. People still
make mistakes. LeSS then names the safety net: “This safety net, an
andon-like system, in Toyota terminology, is a CI system.”

That is a **jidoka** placement, not a coordination placement. Toyota's
andon makes an abnormality visible so people respond when there is
one, rather than watching normal operation. The CI system listens to
the shared mainline, builds and tests the actual product, and signals
when that product is not in the agreed working state. Visual
management of the build—lava lamps, red–green screens—is the same
intent. Liker's warning, which LeSS quotes, still applies: display
that does not drive daily action is not visual management.

[Claim 6](06-jidoka-embeds-routine-judgment.md) owns how much live
judgment that signal still requires: a red mainline that will not
ship is **dumb** if firing *is* the evidence and the consequence is
enforced. A dashboard everyone continues past is still **smart**
inventory. [Claim 19](19-stop-and-fix.md) owns the halt. This claim
only names which object is the andon: the **CI system**, not CI.

A CI system might support CI. That is the usual and recommended
pairing. It does not *make* teams do CI.

### CI without a CI system is possible, and weird

Martin Fowler, the classic paper LeSS points to, is explicit: almost
all teams use a CI service today, and it is perfectly possible to do
continuous integration without one. People can check out the head of
the mainline onto an integration machine and verify the build there.
There is little point in that manual process when automation is
freely available. Fowler also prefers not to confuse the tool for the
practice, and suggests “Continuous Build Services” would have been a
better name for the daemons now called CI services.

Historically that matches early XP: frequent mainline integration
with an automated, self-testing build, before CruiseControl. The
verification can be local, shared-machine, or social: everyone
updates often enough that a broken mainline is immediately everyone
else's problem.

At LeSS scale that arrangement would be fragile. Hundreds of people,
slow tests, and multi-site work are why LeSS spends a chapter on
*scaling a CI system*—speed, stages, promotions—once the developer
practice is in place. The logical independence still matters for the
talk: **lack of a CI system does not prove the absence of CI;
presence of a CI system does not prove CI.**

## Emerging implication for the talk

A compact candidate, sitting next to Claims 8 and 19:

> **Do not teach the pipeline as CI.** CI is what developers do on
> the shared mainline several times a day. The CI system is andon: it
> can make a broken product stoppable. Install the andon to support
> the practice. Do not take a green pipeline on long-lived branches
> as evidence that the group is integrating.

AI makes the deception cheaper. Generated branches, generated tests,
and generated “CI-looking” checks can keep a service green while
unintegrated work in process grows. That is Rogers's error at higher
volume. [Claim 8](08-technical-excellence-enables-jit-coordination-in-less.md)
already says generation must meet shared reality early. This claim
adds: meeting a **CI system** is not the same as meeting the
**integrated product**.

On stage, one pair of pictures is enough: a red–green monitor whose
teams still batch on branches, versus a group that integrates small
changes to the mainline—with or without a fancy server.

> **A CI system does not do CI. People do. The system is andon.**

## Questions still open

- How much of this split belongs on a Tokyo slide versus one sentence
  when Claim 8 shows integration pulling collaboration?
- Should the talk keep LeSS's **CI system**, Fowler's **CI service**,
  or say **andon** / **pipeline** for a mixed audience?
- Is “CI without a CI system” worth a historical beat (XP,
  integration machine), or only the logical warning that the tool
  does not prove the practice?
- What single doughnut-project episode shows an always-green
  pipeline that was not CI, or genuine CI whose andon was still
  primitive? Queued on
  [Claim 13](13-doughnut-project-examples.md).

## Sources consulted

1. The LeSS Company, [Continuous
   Integration](https://less.works/less/technical-excellence/continuous-integration).
   CI is not automating the build; it is a developer practice,
   supported by a CI system; excellent always-green automation with
   delayed integration is the anti-pattern; the CI system is named
   an andon-like stop-the-line safety net; visual management of the
   build; start requires changing developer behavior *and* setting up
   a CI system.
2. Craig Larman and Bas Vodde, *More with LeSS*. Guide: **Avoid…
   Believing CI is a tool**.
3. Owen Rogers (2004), “Scaling Continuous Integration,” in *Extreme
   Programming and Agile Processes in Software Engineering*. Quoted
   by LeSS: CI is what people do, not the tools; tooling without the
   discipline is not CI.
4. Martin Fowler, [Continuous
   Integration](https://martinfowler.com/articles/continuousIntegration.html)
   (2006, rewritten 2023). Essence is frequent mainline integration,
   not an expensive tool; CI without a CI service is possible via an
   integration machine; a CI service on feature branches is not CI;
   “Continuous Build Services” would have been a better name for the
   tools.
5. The LeSS Company, [Coordination &
   Integration](https://less.works/less/framework/coordination-and-integration).
   Communicate in code, integrate continuously, just talk—the
   practice that scales, not the andon.
6. Toyota Motor Corporation, [Toyota Production
   System](https://global.toyota/en/company/vision-and-philosophy/production-system/).
   Jidoka: detect and stop on abnormality; andon makes the stop
   visible so people respond when there is an abnormality.
7. Jeffrey K. Liker and Michael Hoseus (2008), *Toyota Culture*.
   Quoted by LeSS: visual presentation is not visual management
   unless it drives daily action.

**Split sourced in LeSS and Fowler. Whether the talk says “andon” or
“CI system,” and whether the historical possibility needs a beat,
remain live.**
