# Claim 2: The TPS and Lean Thinking houses show different layers

**Status: Provisional — two-diagram comparison sourced; historical TPS
house not claimed**

## Reconciled claim

TPS and lean thinking are often explained with a house metaphor. My original
recollection was that the TPS House has **Jidoka** and **Just-in-Time** as its
pillars, while Craig Larman and Bas Vodde's house has **Respect for People** and
**Continuous Improvement**. I initially treated these as alternative
arrangements of roughly the same collection of ideas.

The research supports the recollection but corrects the interpretation.

### Start with Toyota's official TPS overview

For the talk, use Toyota Motor Corporation's current
[official TPS overview][toyota-visual] to explain TPS and mark Toyota as the
source. Toyota does not label this visual a “house,” define a roof, or
define a foundation. **Official TPS overview** is therefore the accurate
name. This claim does not introduce a historical house-shaped TPS diagram:
no Toyota-authored house of that form is among the sources consulted.

Toyota presents TPS as being “for the benefit of others”: making ever-better
products, delivering quality at the best price, putting people first, and
making work easier and less burdensome. It focuses on eliminating **muri**,
**mura**, and **muda**, then shows two pillars:

| TPS pillar | Immediate purpose in Toyota's overview |
|---|---|
| **Jidoka** | Create no defects by detecting abnormalities, stopping, and building quality into the process. |
| **Just-in-Time** | Produce or transport only what is needed, when it is needed, and in the amount needed. |

Toyota's accompanying [official TPS description][toyota-tps] says these two
pillars enable vehicles to satisfy customer requirements quickly, at low cost,
and with high quality.

This corrects my uncertainty about **one-piece flow**. Flow is not the roof.
Toyota describes continuous flow as part of synchronizing production under
Just-in-Time, alongside pull and producing at the pace of sales. How that
flow is cut in software—vertical slices of user value, confirmed by
一個ずつ確認—is [Claim 17](17-jit-vertical-slicing-one-piece-flow.md).

### Then compare Larman and Vodde's Lean Thinking House

Larman and Vodde call their 2009 diagram a
[“Summary of the Toyota Way (Lean Thinking) House”][lv-pdf]. Their own
[description][lv-page] says it summarizes the **Toyota Way, or Lean Thinking**,
as presented in *Scaling Lean & Agile Development*.

Its sides foreground **Respect for People** and **Continuous Improvement**,
but it is more than a relabelled TPS production house.

The book consulted for surrounding explanation is Larman and Vodde (2016),
*Large-Scale Scrum: More with LeSS* — the third LeSS book, not the 2008
*Scaling Lean & Agile Development* where the house was first published.
*More with LeSS* does not reprint the diagram. It does restate the same
structure as a LeSS principle:

> Lean thinking — Create an organizational system whose foundation is
> managers-as-teachers who apply and teach lean thinking, manage to
> improve, promote stop-and-fix, and who practice Go See. Add the two
> pillars of respect for people and continuous challenge-the-status-quo
> improvement mindset. All towards the goal of perfection.

That sourced relationship is:

| House element (2009 diagram) | Book explanation (*More with LeSS*) |
|---|---|
| **Foundation** | Managers-as-teachers who apply and teach lean thinking, manage to improve, promote stop-and-fix, and practice Go See. |
| **Two pillars** | Respect for people, and a continuous challenge-the-status-quo improvement mindset. |
| **Goal / roof** | Perfection. The 2009 diagram lists outcomes (lead time, quality, value, customer delight, cost, morale, safety) under that goal. |

The 2009 diagram also places **product development** and the **14 Toyota Way
principles** in the center. *More with LeSS* does not explain those center
elements as parts of this house. (Fayol's 14 principles of management appear
later in the same book; they are not the Toyota Way 14.)

| Representation | What it foregrounds | Source and scope |
|---|---|---|
| **Toyota TPS overview** | Jidoka + Just-in-Time | Toyota's current explanation of its production/operating system. Not labelled a house. |
| **Larman/Vodde Lean Thinking House** | Respect for People + Continuous Improvement, on a foundation of managers-as-teachers, toward a perfection goal | Larman and Vodde's synthesis for lean product development. It is not an official Toyota TPS diagram. |

Toyota itself used **Continuous Improvement** and **Respect for People** as the
two pillars of the Toyota Way 2001, so Larman and Vodde's pillar labels are
grounded in Toyota terminology. That does not make their house
interchangeable with Toyota's TPS overview.

The corrected claim is therefore:

> **The two diagrams show related but different layers of Toyota/lean
> thinking. Toyota's TPS overview explains an operating system through Jidoka
> and Just-in-Time. Larman and Vodde's house is a Toyota Way / lean-thinking
> synthesis: managers-as-teachers as foundation, Respect for People and
> Continuous Improvement as pillars, toward a perfection goal.**

LeSS also names **Continuous Improvement Towards Perfection** as its own
principle. That naming, the TPS vs Toyota Way vs LeSS layer, and SMED as
a worked example of the never-done trajectory are
[Claim 18](18-continuous-improvement-towards-perfection.md).

## Emerging implication for the talk

Show the official Toyota TPS overview first and use it to explain how the two
pillars work toward human and customer outcomes. Then show the Larman/Vodde
house, clearly attributed as their Toyota Way / lean thinking synthesis, to
widen the view from the production-system pillars to managers-as-teachers,
Respect for People, Continuous Improvement, and a perfection goal. Do not
present an unsourced house-shaped TPS diagram as Toyota's.

The comparison should not become a taxonomy in which practices sit neatly
below principles and philosophy sits decoratively above them. Claims 3–6 argue
that the meaning lies in the relationships: JIT removes hiding places, jidoka
detects and contains what is exposed, people investigate, and kaizen embeds
the learning. Respect for People determines whether this becomes agency and
development or merely pressure.

For AI-augmented software development, the useful move is therefore not to
copy a house or transfer a manufacturing mechanism by name. It is to ask:

> **What problem did the mechanism solve, what conditions made it workable,
> what human response followed when it exposed a problem, and what learning
> changed the system?**

## Gaps and cautions

- Toyota's official visual has no roof or foundation. That is a fact about
  this source, not a licence to fill the gaps from an unsourced “classic TPS
  House.”
- The 2009 diagram's center (product development, 14 Toyota Way principles) is
  visible. *More with LeSS* does not explain those elements as parts of the
  house.
- The abstraction-layer comparison is an interpretive device for the talk, not
  a claim that Toyota formally organizes TPS and the Toyota Way in this exact
  hierarchy.

## Questions still open

- How does Toyota distinguish TPS from the Toyota Way across different periods,
  including the change from Toyota Way 2001 to Toyota Way 2020?
- The 2008 book that first published the house was not the PDF consulted. Does
  *Scaling Lean & Agile Development* explain the center of the diagram
  (product development and the 14 Toyota Way principles) in a way that should
  change the talk?
- Is the model of interacting layers historically defensible, or mainly a
  useful interpretive device for this talk?
- How should the talk visualize the reciprocal loop among JIT, jidoka, people,
  and kaizen without presenting a new diagram as Toyota's canonical model?
- Which low-level practices fail to transfer cleanly to AI-augmented software,
  and which remain useful?
- Should SMED and poka-yoke appear as supporting practices beneath the TPS
  pillars, or only as examples within particular system relationships?
  SMED as a worked example of continuous improvement toward perfection,
  still inside JIT, is
  [Claim 18](18-continuous-improvement-towards-perfection.md). Poka-yoke
  placement is still open. Stop & Fix as the jidoka *response* (not a
  third pillar) is [Claim 19](19-stop-and-fix.md).
- Which enabling conditions must accompany a transferred mechanism so that it
  produces learning and responsiveness rather than pressure, interruption, or
  more unverified output?

## Sources consulted

1. Toyota Motor Corporation, [Toyota Virtual Plant Tour: Toyota Production
   System][toyota-visual]. Current official visual used as the talk's primary
   TPS overview.
2. Toyota Motor Corporation, [Toyota Production System][toyota-tps]. Current
   official explanation of TPS's purpose, two pillars, flow, pull, and
   human-centered kaizen.
3. Craig Larman and Bas Vodde (2009), [Summary of the Toyota Way (Lean
   Thinking) House][lv-pdf], with Larman's [source description][lv-page].
   Diagram contents only.
4. Craig Larman and Bas Vodde (2016), *Large-Scale Scrum: More with LeSS*,
   “Lean thinking” principle (printed p. 11). Restates foundation
   (managers-as-teachers, Go See, stop-and-fix), two pillars (respect for
   people; continuous improvement), and a perfection goal. Does not reprint
   the house or explain its center.
5. Toyota Motor Corporation (2019), [Annual Report 2019][toyota-way-2019].
   Official account of Continuous Improvement and Respect for People as the
   two pillars of Toyota Way 2001.

[toyota-visual]: https://global.toyota/en/company/plant-tours/production-system/
[toyota-tps]: https://global.toyota/en/company/vision-and-philosophy/production-system/
[lv-pdf]: https://www.craiglarman.com/wiki/downloads/scaling_lean/toyota-house-larman-vodde.pdf
[lv-page]: https://www.craiglarman.com/wiki/index.php?title=Lean_Thinking_house
[toyota-way-2019]: https://global.toyota/pages/global_toyota/ir/library/annual/2019_001_annual_en.pdf

**Still open for further discussion and fact-checking.**
