# Claim 21: CI is a developer practice; a CI service is not CI

**Status: Provisional — names adopted (CI service); LeSS's andon
comparison kept as history; XP beat kept; Tokyo placement not chosen**

## Claim

> **CI is the developer practice of growing one working system by
> small changes on the mainline. A CI service is not that practice.**
> It can support CI by verifying each mainline integration. Having a
> CI service does not make teams do CI. Presence of a service does not
> prove the practice; absence of a service does not prove its absence.

This claim owns the **names**. [Claim
8](08-technical-excellence-enables-jit-coordination-in-less.md) owns
why the practice matters. [Claim 19](19-stop-and-fix.md) owns the
halt. What that honesty costs when a hypothesis is later
rejected—entanglement, roll-forward deletion—is
[Claim 23](23-ci-and-disposable-prototypes-tension-pair.md).

The talk says **CI service** (Fowler): less ambiguous than LeSS's **CI
system**. LeSS compared the safety net to an **andon**; that
comparison stays as history, not as the name of the tool, and not as a
claim that the daemons were designed from Toyota. The TPS lineage in
this story is XP: Beck himself later placed XP next to TPS.

## What the research supports

LeSS's CI chapter already splits practice from tool. CI is not
automating the build. It is a developer practice to keep a working
system by small changes, integrating at least daily on the mainline,
supported by a CI system, with lots of automated tests. **Supported
by**, not **constituted by**. Owen Rogers, quoted there: CI is what
people do, not the tools. If developers do not integrate regularly, or
do not keep the integration environment working, they are not
practicing CI. *More with LeSS*: **Avoid… Believing CI is a tool**.

A CI service that compiles while people still integrate on long-lived
branches is not CI. None of Claim 8's coordination story is installed
by standing up Jenkins or GitHub Actions. LeSS: if it were only tools,
you could hire a company to “install CI.” You cannot. The
counter-example to keep: excellent always-green automation whose
developers delayed integration, sometimes because “thou shall not
break the build” made them afraid to.

### Andon is LeSS's comparison, not the talk's name for the tool

When everyone integrates to the mainline, mistakes are already more
visible. People still make mistakes. LeSS: “This safety net, an
andon-like system, in Toyota terminology, is a CI system.” Toyota's
andon makes an abnormality visible so people respond. Visual
management of the build is the same intent. Liker, quoted by LeSS:
display that does not drive daily action is not visual management.

[Claim 6](06-jidoka-embeds-routine-judgment.md) owns how much live
judgment that signal still requires. [Claim 19](19-stop-and-fix.md)
owns the halt. [Claim
24](24-warnings-as-stop-no-news-is-good-news.md) owns keeping that
channel quiet enough to act on. This claim only refuses to call the
tool CI.

### XP did the practice before there was a CI service

Fowler: almost all teams use a CI service today; it is perfectly
possible to do CI without one. People can check out the head of the
mainline onto an integration machine and verify the build there.
There is little point in that manual process when automation is freely
available. He prefers not to confuse the tool for the practice, and
suggests “Continuous Build Services” would have been a better name.

That was early XP. Beck (1999): new code is integrated after no more
than a few hours; the system is built from scratch; all tests must
pass or the changes are discarded. Fowler credits Beck and C3 for the
practice, and CruiseControl as the first CI service—useful, not
essential.

Beck later placed that way of working next to TPS himself. In
*Extreme Programming Explained*, second edition, he writes a TPS
chapter: every worker responsible for the whole line; stop the line to
find the root cause; Ohno's greatest waste is overproduction;
“Software development is full of the waste of overproduction.” The XP
principle **Flow** is taken from lean manufacturing, not from
psychology. Do not tell the C3 origin story as a copy of *The Toyota
Way*; that book is later. The citable Beck claim is the 2004
philosophy: XP is to be read with TPS.

At LeSS scale the manual arrangement would be fragile. Hundreds of
people, slow tests, and multi-site work are why LeSS spends a chapter
on *scaling a CI system* once the developer practice is in place. The
history still matters on stage: **the practice came first; the service
does not prove it.**

## Implication for the talk

A compact candidate, as sub-slides after Claim 8 (placement still
open):

> **A CI service does not do CI. People do.** Do not take a green
> service on long-lived branches as evidence that the group is
> integrating. LeSS compared that safety net to andon; mention that
> as history.

AI makes Rogers's error cheaper: generated branches, tests, and
“CI-looking” checks can keep a service green while unintegrated work
grows. [Claim
8](08-technical-excellence-enables-jit-coordination-in-less.md)
already says generation must meet shared reality early. Meeting a
**CI service** is not the same as meeting the **integrated product**.

On stage, one pair of pictures: a green service whose teams still
batch on branches, versus a group that integrates small changes to
the mainline—with or without a fancy service.

## Questions still open

- How much of this split belongs on Tokyo sub-slides after Claim 8
  versus one sentence when Claim 8 shows integration pulling
  collaboration? Working lean: sub-slides after Claim 8; decide later.
- What single doughnut-project episode shows an always-green service
  that was not CI, or genuine CI whose stop was still primitive?
  Queued on [Claim 13](13-doughnut-project-examples.md).

## Sources consulted

1. The LeSS Company, [Continuous
   Integration](https://less.works/less/technical-excellence/continuous-integration).
   CI is not automating the build; it is a developer practice,
   supported by a CI system; excellent always-green automation with
   delayed integration is the anti-pattern; the CI system is named an
   andon-like stop-the-line safety net; visual management of the
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
   tools; CruiseControl as the first CI service; practice credited to
   Beck and C3.
5. Kent Beck (1999), [“Embracing Change with Extreme
   Programming,”](https://www.cs.kent.edu/~jmaletic/cs63902/Papers/Beck99.pdf)
   *IEEE Computer*. Integrate after no more than a few hours; build
   from scratch; all tests pass or the changes are discarded.
6. Kent Beck with Cynthia Andres (2004), *Extreme Programming
   Explained*, second edition. Chapter 19, Toyota Production System:
   stop the line, waste of overproduction in software. Principle
   **Flow** taken from lean manufacturing.
7. The LeSS Company, [Coordination &
   Integration](https://less.works/less/framework/coordination-and-integration).
   Communicate in code, integrate continuously, just talk—the
   practice that scales, not the service.
8. Toyota Motor Corporation, [Toyota Production
   System](https://global.toyota/en/company/vision-and-philosophy/production-system/).
   Jidoka: detect and stop on abnormality; andon makes the stop
   visible so people respond when there is an abnormality.
9. Jeffrey K. Liker and Michael Hoseus (2008), *Toyota Culture*.
   Quoted by LeSS: visual presentation is not visual management
   unless it drives daily action.

**Split sourced in LeSS and Fowler. Talk name is CI service. Andon
is LeSS history. XP-before-the-service and Beck's TPS chapter are
in. Tokyo sub-slide placement and the doughnut episode remain live.**
