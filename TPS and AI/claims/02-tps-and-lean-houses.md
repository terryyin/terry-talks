# Claim 2: The TPS and Lean Thinking houses show different layers

**Status: Provisional — not finalized**

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
source. Toyota does not label this visual a “house,” so **official TPS
overview** is more accurate than **Toyota's official TPS House**.

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
Just-in-Time, alongside pull and producing at the pace of sales.

### Then compare Larman and Vodde's Lean Thinking House

Larman and Vodde call their 2009 diagram a
[“Summary of the Toyota Way (Lean Thinking) House”][lv-pdf]. Their own
[description][lv-page] says it summarizes the **Toyota Way, or Lean Thinking**,
as presented in *Scaling Lean & Agile Development*.

Its sides foreground **Respect for People** and **Continuous Improvement**,
but it is more than a relabelled TPS production house. It also includes product
development, the 14 Toyota Way principles, management teaching and applying
lean thinking, and a broad roof of outcomes including lead time, quality,
value, customer delight, cost, morale, and safety.

| Representation | What it foregrounds | Source and scope |
|---|---|---|
| **Toyota TPS overview** | Jidoka + Just-in-Time | Toyota's current explanation of its production/operating system. |
| **Larman/Vodde Lean Thinking House** | Respect for People + Continuous Improvement, with product-development and Toyota Way content | Larman and Vodde's synthesis for lean product development. It is not an official Toyota TPS diagram. |

Toyota itself used **Continuous Improvement** and **Respect for People** as the
two pillars of the Toyota Way 2001, so Larman and Vodde's choice is grounded in
Toyota terminology. That does not make their house interchangeable with
Toyota's TPS overview.

The corrected claim is therefore:

> **The two diagrams show related but different layers of Toyota/lean
> thinking. Toyota's TPS overview explains an operating system through Jidoka
> and Just-in-Time. Larman and Vodde's house broadens the view to Toyota Way
> values and product-development thinking through Respect for People and
> Continuous Improvement.**

## Emerging implication for the talk

Show the official Toyota TPS overview first and use it to explain how the two
pillars work toward human and customer outcomes. Then show the Larman/Vodde
house, clearly attributed, to widen the view from production-system principles
to management philosophy and product development.

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

- Toyota's current official visual is not labelled a house and does not define
  a roof or foundation. A familiar house-shaped TPS diagram may still be useful
  in the talk, but it would need its own source and must not be presented as
  Toyota's current canonical graphic without evidence.
- Many historical and contemporary TPS houses add heijunka, standardized work,
  kaizen, stability, employee involvement, pull, takt, or flow in different
  locations. This claim does not establish one universally authoritative
  arrangement.
- The abstraction-layer comparison is an interpretive device for the talk, not
  a claim that Toyota formally organizes TPS and the Toyota Way in this exact
  hierarchy.

## Questions still open

- Is there a historical Toyota-authored, house-shaped TPS diagram that should
  accompany or replace the current official overview?
- What exactly appears in the roof and foundation of that historical diagram,
  and in which version and year?
- How does Toyota distinguish TPS from the Toyota Way across different periods,
  including the change from Toyota Way 2001 to Toyota Way 2020?
- How do Larman and Vodde explain the intended relationships among Respect for
  People, Continuous Improvement, product development, and the 14 principles
  in the book text surrounding their diagram?
- Is the model of interacting layers historically defensible, or mainly a
  useful interpretive device for this talk?
- How should the talk visualize the reciprocal loop among JIT, jidoka, people,
  and kaizen without presenting a new diagram as Toyota's canonical model?
- Which low-level practices fail to transfer cleanly to AI-augmented software,
  and which remain useful?
- Should SMED and poka-yoke appear as supporting practices beneath the TPS
  pillars, or only as examples within particular system relationships?
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
4. Toyota Motor Corporation (2019), [Annual Report 2019][toyota-way-2019].
   Official account of Continuous Improvement and Respect for People as the
   two pillars of Toyota Way 2001.

[toyota-visual]: https://global.toyota/en/company/plant-tours/production-system/
[toyota-tps]: https://global.toyota/en/company/vision-and-philosophy/production-system/
[lv-pdf]: https://www.craiglarman.com/wiki/downloads/scaling_lean/toyota-house-larman-vodde.pdf
[lv-page]: https://www.craiglarman.com/wiki/index.php?title=Lean_Thinking_house
[toyota-way-2019]: https://global.toyota/pages/global_toyota/ir/library/annual/2019_001_annual_en.pdf

**Still open for further discussion and fact-checking.**
