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
useful interpretation is that they offer **different views of an
interconnected system**.

An abstraction ladder remains useful for distinguishing a practice from an
operating principle or philosophy:

1. **Concrete practices and mechanisms** — one-piece flow, pull, takt,
   standardized work, heijunka, quick changeover, and andon.
2. **Operating principles** — Just-in-Time and Jidoka.
3. **Broader management philosophy** — Continuous Improvement and Respect for
   People.
4. **Underlying assumptions** — how people learn, how problems should be
   exposed, how technology should support humans, and how organizations
   improve.

Claims 3–6 show, however, that this must not become a one-way hierarchy in
which lower-level techniques merely instantiate independent higher-level
ideas. The important content of TPS lies in the **relationships and feedback
loops across the levels**:

1. Actual downstream need pulls work through **JIT**, reducing surplus that
   could hide a broken commitment.
2. Lower buffers make abnormalities consequential; **jidoka** detects, stops,
   contains, and makes them visible near their origin.
3. People need authority, time, capability, and support to respond. **Respect
   for People** determines whether visible problems become agency and
   development or merely pressure.
4. Investigation and **kaizen** turn what was learned into a more capable
   process: a standard, a detector, a better design, or removal of the
   failure-producing condition.
5. Supporting practices change the economics of the loop. For example,
   **SMED** makes small batches and frequent deliberate changeovers practical;
   jidoka makes an abnormal interruption explicit, contained, and learnable
   rather than allowing bad work to continue.

This is reciprocal rather than linear:

> **JIT removes hiding places. Jidoka detects and contains what is exposed.
> People investigate. Kaizen embeds the learning. Greater capability makes
> the next pull response more trustworthy.**

The “production-system logic” is therefore not best treated as one more rung
between principles and philosophy. It is the way all of these elements work
together over time. Similarly, Respect for People and Continuous Improvement
are broader Toyota Way ideas, but they are not a decorative layer placed above
an otherwise complete technical system.

This means the initial statement:

> These are just different representations of the same collection of
> philosophy.

is directionally useful, but should be made more precise:

> **The different houses are related representations of the Toyota/lean system
> at different levels of abstraction. They overlap strongly, but they are not
> completely interchangeable.**

A still sharper version, incorporating the later claims, is:

> **The houses foreground different levels of the same evolving human and
> technical system. Their boxes are not interchangeable, and their meaning
> comes from the relationships among them rather than from a taxonomy of lean
> terms.**

## Emerging implication for the talk

This distinction may be particularly useful when applying TPS thinking to
software and AI.

Rather than copying lower-level manufacturing mechanisms directly into
software—for example treating one-piece flow, takt, kanban, or an andon cord as
universally transferable practices—the talk can move through the relationships
in the system and ask:

> **What reasoning caused Toyota to invent these mechanisms in the first
> place, what other capabilities made them workable, and what happened after
> they exposed a problem?**

This creates a principled path from manufacturing practice toward software:

**mechanism → system problem → enabling conditions → human response → learning
loop**

Claims 3–6 supply early examples of this translation method:

| TPS relationship | Question for AI-augmented software development |
|---|---|
| JIT pulls from actual need instead of producing for stock. | How do we avoid turning cheap generation into a stockpile of unverified code, plans, tests, or backlog detail? |
| SMED lowers the changeover cost that makes large batches appear economical. | Can a stable team or agent take a bounded current item, reconstruct only necessary context, and obtain trustworthy evidence quickly? |
| Jidoka detects a specified abnormality, stops, contains, and exposes it. | Which tests, types, monitors, policies, or human signals have meaningful stop authority and preserve evidence for response? |
| People investigate; kaizen prevents recurrence or improves the response. | Does an AI-assisted episode leave behind a clearer design, executable oracle, faster signal, or explicit decision—or merely a one-off answer? |
| Respect for People supplies agency, support, development, and accountability. | Are people able to understand, challenge, stop, and improve the human–AI system, or are they left to absorb its pressure and rare exceptions? |

The goal is therefore not to reproduce a particular TPS or Lean House for
software development, nor merely to copy the words from the roof and pillars.
It is to use the representations as maps into a dynamic system and then test
each proposed software analogy against its purpose, prerequisites, human
consequences, and failure modes.

## Questions still open

- Which historical or official TPS House should be used as the talk's primary
  reference image?
- What exactly appears in the roof and foundation of the chosen TPS House?
- How do Toyota's own descriptions distinguish TPS from the Toyota Way?
- How do Larman and Vodde describe the purpose and scope of their Lean Thinking
  house in their own words?
- Is the revised model of interacting levels historically defensible, or is it
  mainly a useful interpretive device for this talk?
- How should the talk visualize the reciprocal loop among JIT, jidoka, people,
  and kaizen without presenting a new diagram as Toyota's canonical model?
- Which low-level practices fail to transfer cleanly to AI-augmented software,
  and which ones remain useful?
- Should SMED and poka-yoke appear as supporting practices beneath the two TPS
  pillars, or only as examples used to explain particular system
  relationships?
- Which enabling conditions must accompany a transferred mechanism so that it
  produces learning and responsiveness rather than pressure, interruption, or
  more unverified output?

**Still open for further discussion and fact-checking.**
