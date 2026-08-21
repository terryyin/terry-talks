# Claim 2: TPS House, Lean House, and levels of abstraction

**Status: Provisional — not finalized**

## Original claim / hypothesis

TPS and lean thinking are often depicted using a **house metaphor**, with a
roof, pillars, and a foundation.

There are many different versions of these houses, and different authors make
different choices about what belongs in each part.

My recollection is that the most common **TPS House** has **Jidoka** and
**Just-in-Time** as its two pillars. I was less certain about the roof and
thought it might contain something such as **one-piece flow**.

Craig Larman and Bas Vodde use a different version of the house in their
LeSS-related writing. My recollection is that their two pillars are **Respect
for People** and **Continuous Improvement**.

My initial interpretation is that these are simply different representations
of roughly the same collection of Toyota/lean philosophy, with authors choosing
different elements to emphasize.

## Research-based adjustment

The broad intuition is correct, but an important distinction is needed.

The familiar **TPS House** and the **Lean Thinking / Toyota Way house** are not
merely alternative drawings of exactly the same model. They operate at somewhat
different levels of abstraction.

In the traditional TPS representation, the two central pillars are:

- **Jidoka**
- **Just-in-Time**

These are core operating principles of the Toyota Production System.

The roof is more commonly expressed in terms of outcomes such as:

- highest quality
- lowest cost
- shortest lead time

rather than one-piece flow.

**One-piece flow / continuous flow** belongs more naturally among the
mechanisms supporting **Just-in-Time**, together with ideas such as pull and
takt time.

Craig Larman and Bas Vodde's representation is better understood as a **Lean
Thinking house**, drawing strongly from the **Toyota Way**, rather than as a
replacement diagram for the TPS production system.

Their two pillars are:

- **Continuous Improvement**
- **Respect for People**

Toyota itself uses these same two pillars when describing the **Toyota Way**.

| Representation | Main pillars | Primary level |
|---|---|---|
| **TPS House** | Jidoka + Just-in-Time | Production / operating system |
| **Toyota Way** | Continuous Improvement + Respect for People | Broader management values and philosophy |
| **Larman/Vodde Lean Thinking House** | Continuous Improvement + Respect for People | Generalized lean thinking, especially for product development |

There are also many historical and contemporary variants of the “house.”
Different versions may include or emphasize such elements as:

- heijunka
- standardized work
- kaizen
- stability
- respect for humanity
- employee involvement
- flow
- pull
- takt

Therefore, there is no single universally authoritative visual arrangement of
the house.

## Emerging interpretation

The different houses should probably not be treated as contradictory. A more
useful interpretation is that they describe **different layers of an
interconnected system**.

One possible abstraction ladder is:

1. **Concrete practices and mechanisms** — one-piece flow, pull, takt,
   standardized work, heijunka.
2. **Operating principles** — Just-in-Time and Jidoka.
3. **Production-system logic** — Toyota Production System.
4. **Broader management philosophy** — Continuous Improvement and Respect for
   People.
5. **Underlying assumptions** — how people learn, how problems should be
   exposed, how technology should support humans, and how organizations
   improve.

This means the initial statement:

> These are just different representations of the same collection of
> philosophy.

is directionally useful, but should be made more precise:

> **The different houses are related representations of the Toyota/lean system
> at different levels of abstraction. They overlap strongly, but they are not
> completely interchangeable.**

## Emerging implication for the talk

This distinction may be particularly useful when applying TPS thinking to
software and AI.

Rather than copying lower-level manufacturing mechanisms directly into
software—for example treating one-piece flow, takt, or kanban as universally
transferable practices—the talk can move upward through the abstraction layers
and ask:

> **What reasoning caused Toyota to invent these mechanisms in the first
> place?**

This creates a principled path from manufacturing practice toward software:

**manufacturing mechanism → operating principle → management philosophy →
underlying reasoning**

The goal is therefore not to reproduce a particular TPS or Lean House for
software development, but to use these representations as different views into
the deeper logic of the Toyota system.

## Questions still open

- Which historical or official TPS House should be used as the talk's primary
  reference image?
- What exactly appears in the roof and foundation of the chosen TPS House?
- How do Toyota's own descriptions distinguish TPS from the Toyota Way?
- How do Larman and Vodde describe the purpose and scope of their Lean Thinking
  house in their own words?
- Is the proposed abstraction ladder historically defensible, or is it mainly a
  useful interpretive device for this talk?
- Which low-level practices fail to transfer cleanly to AI-augmented software,
  and which ones remain useful?

**Still open for further discussion and fact-checking.**
