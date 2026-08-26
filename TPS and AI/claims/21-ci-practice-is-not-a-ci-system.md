# Claim 21: CI is a developer practice; a CI service is not CI

**Status: Provisional — names settled (CI service); LeSS andon is
history, not the tool's name; Tokyo placement and doughnut episode
still open**

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
system**. LeSS compared the safety net to an **andon**; mention that
as history, not as the name of the tool, and not as a claim that the
daemons were designed from Toyota. The TPS lineage here is XP: Beck
later placed XP next to TPS himself.

LeSS already splits practice from tool. CI is not automating the
build. It is a developer practice to keep a working system by small
changes, integrating at least daily on the mainline, **supported by**
a CI system, with lots of automated tests. Owen Rogers, quoted there:
CI is what people do, not the tools. If developers do not integrate
regularly, or do not keep the integration environment working, they
are not practicing CI. *More with LeSS*: **Avoid… Believing CI is a
tool**.

A CI service that compiles while people still integrate on long-lived
branches is not CI. You cannot hire a company to “install CI.” The
counter-example to keep: excellent always-green automation whose
developers delayed integration, sometimes because “thou shall not
break the build” made them afraid to.

Fowler: almost all teams use a CI service today; CI without one is
possible by verifying the head of the mainline on an integration
machine. There is little point in that manual process when automation
is freely available. “Continuous Build Services” would have been a
better name for the daemons.

Beck (1999): integrate after no more than a few hours; build from
scratch; all tests pass or the changes are discarded. Fowler credits
Beck and C3 for the practice, and CruiseControl as the first CI
service—useful, not essential. In *Extreme Programming Explained*,
second edition, Beck writes a TPS chapter: stop the line; Ohno's
greatest waste is overproduction in software. The XP principle
**Flow** is taken from lean manufacturing. Do not tell C3 as a copy
of *The Toyota Way*; that book is later. The citable claim is the
2004 philosophy: XP is to be read with TPS. At LeSS scale the manual
arrangement would be fragile, which is why LeSS then scales a CI
system. On stage: **the practice came first; the service does not
prove it.**

## Implication for the talk

> **A CI service does not do CI. People do.** Do not take a green
> service on long-lived branches as evidence that the group is
> integrating.

AI makes Rogers's error cheaper: generated branches, tests, and
“CI-looking” checks can keep a service green while unintegrated work
grows. Meeting a **CI service** is not the same as meeting the
**integrated product**.

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
   andon-like stop-the-line safety net; start requires changing
   developer behavior *and* setting up a CI system.
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
