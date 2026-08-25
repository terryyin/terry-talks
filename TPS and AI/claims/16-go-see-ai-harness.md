# Claim 16: Go-See is firsthand facts; in AI work that includes the harness

**Status: Provisional — hypothesis stated; placement and AI mapping
researched; not a finalized talk beat**

## Original claim / hypothesis

> **Go-See is part of TPS. The idea could be borrowed to AI-augmented work.
> People need to go into the details of the AI harness to see what actually
> is happening there.**

This is a lightly edited record of Terry's hypothesis. It contains two
propositions:

1. **Origin:** Go-See belongs with TPS.
2. **Transfer:** in AI-augmented work, firsthand seeing means entering the
   harness—the scaffolding around the model—not treating the agent's
   output or a dashboard as the facts.

## Research-based adjustment

The transfer is strong. The origin needs the same layer distinction as
[Claim 2](02-tps-and-lean-houses.md): Toyota's official TPS overview is
**jidoka** and **Just-in-Time**; **Go-See** is Toyota's English gloss of
**genchi genbutsu** (現地現物, actual place, actual thing), a Toyota Way
value under Continuous Improvement. Shop-floor practice and popular TPS
glossaries still treat it as part of how TPS is lived.

> **Go-See is genchi genbutsu: go to the actual place and the actual thing
> to grasp facts, rather than deciding from reports. In AI-augmented work
> the product remains the primary gemba. The harness is the newly opaque
> process. Entering it is how you see what actually happened—not watching
> the agent all day, and not trusting its summary.**

### Placement: Toyota Way value, TPS habit

Toyota Way 2001 names five concepts under two pillars. Continuous
Improvement holds **Challenge**, **Kaizen**, and **Genchi Genbutsu** (“go
to the source to find the facts”). Respect for People holds Respect and
Teamwork. LeSS's **Go See** page attributes the practice to that internal
document and gives the Japanese name as genchi genbutsu.

Toyota Europe's current Toyota Way still defines genchi genbutsu as: go
and see the location or process where the problem exists, grasp problems,
confirm facts, and analyse root causes. Toyota UK's TPS glossary calls it
part of the Toyota Production System and adds that the phrase is less the
physical visit than personal understanding of the full implications of an
action in its environment.

So:

| Source | How it places Go-See |
|---|---|
| **Toyota Way 2001** | One of five values; under Continuous Improvement. |
| **Toyota Europe / UK** | English: “Go and see for yourself.” UK lists it in a TPS glossary. |
| **LeSS** | **Go See**; Toyota Way 2001 as the origin for the management practice. |

[Claim 12](12-respect-for-people-who-can-think.md) already uses genchi
genbutsu as the Toyota name for the analysis practice, not as a “skill”
Toyota lists.

### Place versus act; not a walk-around

The Lean Lexicon distinction is enough for the talk:

- **Gemba** (現場) is the actual place where value-creating work occurs.
- **Genchi genbutsu** is the act: go to the source and check the facts
  yourself so a decision rests on the right information.

LeSS is explicit about what the practice is not. It is not management by
walking around: that is too shallow. It is not micro-management: the
visitor does not commandeer how the work is done. The visitor stays long
enough to understand, asks why the work is done that way, and helps the
person closest to it solve a problem. Gemba is the value-adding work the
customer pays for—writing code, answering a customer—not a meeting room
near the workers.

Nanpachi Hayashi, a student of Taiichi Ohno, recalled Ohno's teaching:

> Don’t look with your eyes, look with your feet. Don’t think with your
> head, think with your hands.

And:

> People who can’t understand numbers are useless. The gemba where numbers
> are not visible is also bad. However, people who only look at the numbers
> are the worst of all.

Reports and metrics still matter. They are not a substitute for the actual
place and the actual thing. Toyota Europe 2020 keeps the same insistence
after machines: humans sense things instinctively in ways that machines
cannot; they bring hard data together with personally seeing, feeling, and
interpreting the situation.

### What “go into the AI harness” maps to

In this claim, **AI harness** means the scaffolding around the model: the
prompts, tools, skills, rules, context assembly, traces, hooks, and
permissions that actually run—not the product the customer pays for, and
not the model's own account of what it did.

[Claim 11](11-physical-production-and-software-differences.md) already
says the codebase is both product and process. AI makes a further split:
much of the process now happens inside a loop the human did not step
through. The report of that loop is cheap. The facts are in the trace.

Two places to go see, not one:

| Place | Actual thing | Counterfeit (the report) |
|---|---|---|
| **Product gemba** | The change, the tests, the running system, the customer need | “The agent said it works”; a generated PR summary; a green check that nobody can explain |
| **Process gemba (harness)** | Tool calls, retrieved context, the prompt that actually ran, the skill or rule that fired, the permission that was skipped | Token counts, eval dashboards, the model's self-description of its plan |

The product remains primary. Going only into the harness is like studying
the machine's panel without looking at the part. Going only to the
summary is like managing from the office.

The borrowed idea is therefore not “inspect AI for its own sake.” It is:

> **When you need to know what happened, go to the actual work and the
> actual process. For AI-augmented work, that process is often the
> harness. The agent's narrative is a report.**

### Relationship to jidoka: go see at the stop, do not watch the stream

[Claim 6](06-jidoka-embeds-routine-judgment.md) already argues against
spending scarce attention continuously watching normal operation.
Go-See is not a reason to sit in the agent's stream all day. That would
undo autonomation.

The TPS pairing is:

- **Jidoka** makes a known abnormality visible and stoppable (andon).
- **Go-See** is what you do when you go to that place: confirm the actual
  condition, not the board alone, and understand enough to respond and
  improve.

[Claim 3](03-jidoka-enables-jit-trusts-respect-grows.md) already has
people respond and improve after a stop. This claim names the quality of
that response: firsthand facts. [Claim
10](10-freedom-and-trust-reinforce-through-jidoka.md) already warns that
the same signal can become surveillance. A harness trace used to blame
the person, or to watch them work, is not Go-See.

## Emerging implication for the talk

A compact candidate, sitting next to Claims 2, 6, and 12:

> **Toyota Way: genchi genbutsu—go to the source for the facts. LeSS
> already calls this Go See. For AI-augmented development, do not manage
> by the agent's summary. See the product. When the process is opaque,
> go into the harness: the actual prompt, tools, context, and trace.
> Build jidoka so you are pulled there at an abnormality, not parked
> there watching.**

Useful on stage because the audience will have seen both failure modes:
treating the agent as a black box whose English explanation is trusted,
and drowning in traces with no stop condition. Ohno's “people who only
look at the numbers” maps cleanly onto people who only look at
dashboards, eval scores, or generated summaries.

Toyota Europe's line that humans sense things machines cannot is a
possible closer: the model does not replace going to see; the harness is
where that seeing now has to reach.

## Questions still open

- For Tokyo timing, is this a named beat or one sentence under jidoka /
  Respect for People?
- Should the talk use **Go See** (LeSS), **genchi genbutsu**, or both?
- What one concrete harness example belongs on stage: a misleading tool
  call, a truncated context, a skill that never fired, a permission skip?
- How sharply should the product gemba be ranked above the harness so the
  talk does not become “debug the agent instead of the product”?
- Is the Ohno/Hayashi pair of quotes the right colour, or is Toyota
  Europe's “machines can’t sense as humans do” enough?

## Sources consulted

1. Toyota Motor Corporation, [Toyota Way
   2001](https://www.toyota-global.com/company/history_of_toyota/75years/data/conditions/philosophy/toyotaway2001.html)
   and [Human Resources
   Development](https://www.toyota-global.com/company/history_of_toyota/75years/text/leaping_forward_as_a_global_corporation/chapter4/section7/item4.html)
   in *75 Years of Toyota*. Two pillars; five concepts including Genchi
   Genbutsu as “go to the source to find the facts.”
2. Toyota Motor Europe, [The Toyota
   Way](https://www.toyota-europe.com/about-us/toyota-vision-and-philosophy/the-toyota-way).
   Genchi genbutsu as “Go and see for yourself”; humans bringing hard data
   together with personally seeing and interpreting; machines cannot sense
   as humans do.
3. Toyota UK, [What is Genchi
   Genbutsu?](https://mag.toyota.co.uk/genchi-genbutsu/). Places it in a
   TPS glossary; visit plus understanding implications in the environment.
4. The LeSS Company, [Go
   See](https://less.works/less/management/go-see). Toyota Way 2001 origin;
   gemba as value-adding work; not walking around; not micro-management.
5. Lean Enterprise Institute, [Gemba, workplace, genchi genbutsu,
   go-and-see … What’s the
   difference?](https://www.lean.org/the-lean-post/articles/gemba-workplace-genchi-genbutsu-go-and-see-whats-the-difference/)
   (Michael Ballé). Lean Lexicon: gemba is a place; genchi genbutsu is
   going to the source to check facts.
6. Nanpachi Hayashi quoting Taiichi Ohno, in Jon Miller's translation of
   the 4 Aug 2008 Nikkei Business Online interview, [“Toyota's Top Engineer
   on How to Develop Thinking
   People”](https://blog.gembaacademy.com/2008/08/04/toyotas_top_engineer_on_how_to_develop_thinking_pe/).
   “Look with your feet”; “people who only look at the numbers are the
   worst of all.” LeSS cites this as Hayashi08.
7. Toyota Motor Corporation, [Toyota Production
   System](https://global.toyota/en/company/vision-and-philosophy/production-system/).
   Current official TPS: jidoka and JIT. Layer
   distinction already in
   [Claim 2](02-tps-and-lean-houses.md).

**Still open for talk wording (Go See vs genchi genbutsu) and how much
harness detail belongs on stage.**
