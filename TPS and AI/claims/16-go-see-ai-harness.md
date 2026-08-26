# Claim 16: Go-See means firsthand facts; AI work may require entering the harness

**Status: Provisional — initial reconciliation; Toyota placement corrected and
the AI-harness transfer retained as Terry's synthesis**

## Claim

> **Genchi genbutsu means going to the source to grasp the facts yourself,
> rather than deciding from reports. In AI-augmented development, see the
> product first. When the process is in question, inspect the harness—the
> prompts, context, tool calls, rules, permissions, and traces that actually
> ran—instead of relying on the agent's summary. Use jidoka to draw attention
> to abnormalities, not to watch the agent continuously.**

This corrects the original claim that “Go-See is part of TPS” without a layer
distinction. Toyota's current TPS overview is organized around **jidoka** and
**Just-in-Time**. Toyota Way 2001 places **genchi genbutsu** under Continuous
Improvement, while Toyota UK's TPS glossary also treats it as part of TPS
practice. The careful formulation is therefore: **a Toyota Way value and a
habit through which TPS is practiced**, while retaining Toyota's distinction
between that value and the official TPS overview.

The AI mapping is an interpretation for this talk, not a Toyota claim.

## What the research supports

**Gemba** is the actual place where value-creating work occurs.
**Genchi genbutsu** is the act of going to the source and checking the facts
yourself. Toyota renders it as “go to the source to find the facts” and “go and
see for yourself.”

Go-See is not a walk-around or a form of micromanagement. LeSS stresses that
the visitor must stay long enough to understand the work, ask why it is done
that way, and help the person closest to the problem. Reports and metrics
remain useful, but they do not replace direct understanding of the actual work
and its context.

For AI-augmented development there are two related places to see:

| Place | Inspect | Do not substitute |
|---|---|---|
| **Product gemba** | The change, tests, running system, and customer need | The agent's success claim or generated PR summary |
| **Process gemba** | The prompt and context used, tool calls, applicable rules, permissions, and execution trace | The agent's account of its process or an unexplained dashboard score |

The product remains primary: studying the harness without checking the result
is like studying a machine panel without checking the part. A trace is also a
record and may be incomplete, so it should be read alongside the resulting
product and other observable evidence—not treated as unquestionable truth.

## Relationship to jidoka

[Claim 6](06-jidoka-embeds-routine-judgment.md) argues against spending human
attention on normal operation. Go-See does not justify watching an agent's
stream all day. **Jidoka** makes a known abnormality visible and stoppable;
**Go-See** describes the firsthand investigation that follows.

The combination is: surface the abnormality, inspect the actual product and
process, involve the people closest to the work, and improve the system. Using
harness traces to surveil or blame people would conflict with that purpose.

## Implication for the talk

> **Toyota Way: genchi genbutsu—go to the source for the facts. In AI work,
> do not manage by the agent's summary. See the product first; when the
> process is opaque, inspect the harness that actually ran. Let jidoka pull
> you there at an abnormality instead of parking you there to watch.**

This preserves the useful intuition while avoiding two overstatements:
flattening Toyota Way and TPS into one layer, and making the harness the main
destination in every investigation. The harness matters when it is where the
process became opaque; the customer-facing work remains the gemba that gives
the investigation its purpose.

## Questions still open

- Should the talk say **Go See**, **genchi genbutsu**, or introduce both once?
- Which single harness failure best makes the idea concrete: wrong context, a
  misleading tool call, a rule that did not fire, or a permission failure?
- Does this need its own beat, or one sentence under jidoka?

## Sources consulted

1. Toyota Motor Corporation, [Toyota Way
   2001](https://www.toyota-global.com/company/history_of_toyota/75years/data/conditions/philosophy/toyotaway2001.html).
   Places Genchi Genbutsu under Continuous Improvement and describes it as
   going to the source for facts.
2. Toyota Motor Corporation, [Toyota Production
   System](https://global.toyota/en/company/vision-and-philosophy/production-system/).
   Presents jidoka and Just-in-Time as the two parts of the current official
   TPS overview.
3. Toyota Motor Europe, [The Toyota
   Way](https://www.toyota-europe.com/about-us/toyota-vision-and-philosophy/the-toyota-way),
   and Toyota UK, [What is Genchi
   Genbutsu?](https://mag.toyota.co.uk/genchi-genbutsu/). Define the practice
   as personally seeing the problem and understanding it in context; the UK
   article places it in a TPS glossary.
4. The LeSS Company, [Go
   See](https://less.works/less/management/go-see). Distinguishes Go-See from
   walking around and micromanagement, and locates gemba in value-adding work.
5. Lean Enterprise Institute, [Gemba, workplace, genchi genbutsu,
   go-and-see: What's the
   difference?](https://www.lean.org/the-lean-post/articles/gemba-workplace-genchi-genbutsu-go-and-see-whats-the-difference/).
   Distinguishes gemba as a place from genchi genbutsu as checking facts at
   the source.
