# Claim 20: Poka-yoke mistake-proofs a known error at the source; it supports jidoka

**Status: Provisional — initial reconciliation; Toyota placement sourced
and Shingo origin corrected; not a finalized talk beat**

## Original claim / hypothesis

Poka-yoke has been used in several claims and deserves its own. Extract
those details and explain how poka-yoke relates to TPS.

This claim owns the **TPS relationship** and the **name**. [Claim
6](06-jidoka-embeds-routine-judgment.md) still owns smart → dumb →
gone. [Claim 19](19-stop-and-fix.md) still owns the stop. [Claim
5](05-smed-software-changeover-and-ai-friendly-context.md) still owns
changeover. [Claim
11](11-physical-production-and-software-differences.md) still owns the
semantic limit. [Claim 1](01-tps-reasoning-not-mechanisms.md) already
uses prevention by design as AI-supported jidoka.

## Research-based adjustment

The original extraction treated Shingo's Zero Quality Control as
Toyota's own formalization of poka-yoke, and treated poka-yoke as
prevention-by-construction. Both are too strong.

> **Poka-yoke is a supporting quality method under jidoka, not a second
> pillar and not jidoka itself.** For a known inadvertent error, change
> the process so the error cannot occur, or so it is immediately
> obvious at the source. Toyota's plant-tour materials present
> fail-safe poka-yoke devices under autonomation; Toyota's primary TPS
> description names jidoka and does not name poka-yoke. Shingo named
> the method and distinguished **errors** from **defects**; his Zero
> Quality Control is source inspection plus poka-yoke, not a
> restatement of jidoka. Prefer prevention. Do not equate poka-yoke
> with prevention only, or collapse every good design or every test
> into the name.

### Toyota places the device under autonomation

On Toyota's official plant-tour page, **exploring autonomation** has a
separate beat: "Avoiding Simple Mistakes Through Fail-Safe Devices
called Poka-yoke." The example is a screwdriver linked to a check for
loose screws; a red lamp alerts the worker. That is Toyota calling
poka-yoke a **fail-safe under jidoka**. "Fail-safe" is Toyota's English
gloss, not a second technical term.

Toyota's current TPS philosophy page never mentions poka-yoke. Jidoka
there is: detect an abnormality, stop (machine or stop-cord), make it
visible (andon), prevent recurrence, and free people from watching.
Poka-yoke is one way to make a *known* mistake unmissable or
unmakeable so that pillar can hold. Lean commentary that stays close
to that placement (Ballé, LEI) treats it the same way: a tool of the
jidoka pillar, cheap and simple, invented in kaizen. Over-complex
devices that hinder the operator get disconnected—that is muri, not
"more jidoka."

Toyota's own example is a **warning**, not a fixture that makes the
wrong screw physically impossible. The talk must not say "poka-yoke =
only prevention, jidoka = only detection."

> **Jidoka is the pillar: the capability and expectation to detect,
> stop, respond, and improve. Poka-yoke is a method under that pillar
> for a known mistake, preferably so the mistake cannot occur.**

SMED stays under JIT:
[Claims 4](04-jit-assurance-resourcefulness-and-constraint.md) and
[5](05-smed-software-changeover-and-ai-friendly-context.md). The
perfection-goal trajectory of that same work is
[Claim 18](18-continuous-improvement-towards-perfection.md). Quality at
the source is why low-inventory JIT can survive; that pairing is [Claim
3](03-jidoka-enables-jit-trusts-respect-grows.md), not a second
definition of poka-yoke.

### Shingo named the method; he did not invent jidoka

Shigeo Shingo was a Japan Management Association industrial engineer.
He taught Toyota's P-course from 1955; he was not Ohno's system
architect, and jidoka predates his visits by decades. The first poka-yoke he recounts is **Yamada Electric, 1961**:
a dish that held two springs so a leftover spring made a missing
insertion obvious. That is **detection**, not geometry that makes the
error impossible. The older name **baka-yoke** (fool-proofing) was
dropped because it insulted the people doing the work. *Poka* is an
inadvertent error; *yoke* is prevention. The assumption is that people
will slip, so the process should change.

Shingo's later *Zero Quality Control* (1986) is his theory, not
Toyota's name for the pillar: sampling lets some defectives through;
100% inspection after the fact is costly and late; **source
inspection** checks the conditions of quality before or as the step is
done; poka-yoke couples that check to a device so the error cannot
become a defect. Regulatory functions are **control** (will not
proceed) versus **warning** (lamp, buzzer). LEI's shutdown versus
warning is the same split. ASQ's definition matches the range: a
device or method that either makes an error impossible or makes it
immediately obvious.

That is why "gone" in
[Claim 6](06-jidoka-embeds-routine-judgment.md) is *closer* to
prevention poka-yoke, and a control poka-yoke that actually stops is
already a jidoka mechanism. A warning that everyone continues past is
not yet quality at the source
([Claim 19](19-stop-and-fix.md)).

### Software: one fixture, not a second curriculum

The factory device is usually physical. The software analogue for
prevention is **structure**: a type, schema, constructor, or deleted
path that makes a known class of mistake unrepresentable or
uncallable. The analogue for detection is a cheap, specific check
close to the error—a linter, a fail-fast, a script for a named class
of defect.

Harry Robinson's 1997 HP case is detection poka-yoke: small scripts
found 311 structural localization mistakes in menus and mnemonics. He
is explicit that verifying catalog syntax is not testing whether the
menus actually worked in the application. That is [Claim
11](11-physical-production-and-software-differences.md)'s limit in
miniature: poka-yoke encodes prior learning about a specifiable
mistake. It does not judge value, usefulness, or whether the evidence
is enough.

[Claim 5](05-smed-software-changeover-and-ai-friendly-context.md)
already uses mistake-proofed modules as setup reduction. Keep that
use; do not re-teach the TPS relationship there. Do not collapse
information hiding or once-and-only-once into this name.
AI-generated safeguards belong only when the team can understand,
verify, own, and improve them
([Claim 1](01-tps-reasoning-not-mechanisms.md)); a check nobody
trusts will be skipped—the software form of disconnecting the device.

## Emerging implication for the talk

> **Under jidoka, show poka-yoke:** for a known mistake, change the
> process so people need not rely on vigilance. Prefer to make the
> mistake impossible. If you cannot, make continuation impossible
> until someone responds. If you only warn, you have not yet built
> quality in.

On stage, one software fixture is enough: a type or constructor that
cannot represent the illegal state, or a UI that does not offer the
wrong action—then, if needed, a check that still must actually halt.
The weekly-report slice in Claim 5 can *use* that fixture. It should
not stop to define poka-yoke.

## Questions still open

- How much of Shingo's taxonomy (contact / fixed-value / motion-step;
  control vs warning) belongs on a Tokyo slide versus one software
  fixture?
- Is **poka-yoke**, **mistake-proofing**, or **make illegal states
  unrepresentable** the memorable English for this audience?
- Best single software example that is clearly poka-yoke and not
  "just a test" or "just good design"?
- When should a warning-level check be promoted to control (will not
  compile / will not ship) rather than left as a linter people skip?

## Sources consulted

1. Toyota Motor Corporation, [Toyota Virtual Plant Tour: Toyota Production
   System](https://global.toyota/en/company/plant-tours/production-system/).
   Poka-yoke under exploring autonomation; screwdriver / red-lamp warning.
2. Toyota Motor Corporation, [Toyota Production
   System](https://global.toyota/en/company/vision-and-philosophy/production-system/).
   Jidoka as the pillar; poka-yoke is not named.
3. Lean Enterprise Institute, [Poka
   Yoke](https://www.lean.org/lexicon-terms/poka-yoke/). Error-proofing;
   shutdown versus warning; *poka* = inadvertent error, *yoke* = prevention.
4. Michael Ballé, ["Why Create Poka-yokes—and Why Disconnect
   Them?"](https://www.lean.org/the-lean-post/articles/why-create-poka-yokes-and-why-disconnect-them/).
   Tool of the jidoka pillar; cheap, simple, invented in kaizen; over-complex
   devices get disconnected.
5. Shigeo Shingo (1986), [*Zero Quality Control: Source Inspection and the
   Poka-Yoke
   System*](https://www.routledge.com/Zero-Quality-Control-Source-Inspection-and-the-Poka-Yoke-System/Shingo/p/book/9780915299072).
   Errors versus defects; source inspection; control versus warning. Yamada
   Electric (1961) is recounted by Shingo and cited via Robinson from *The
   Sayings of Shigeo Shingo*.
6. Isao Kato, recounted by Art Smalley, ["Dr. Shigeo Shingo's P-Course and
   Contribution to
   TPS"](https://www.kevinmeyer.com/dr-shigeo-shingos-p-course-and-contribution-to-tps/).
   Shingo taught the P-course from 1955; he was not Ohno's advisor; jidoka
   predates his visits.
7. American Society for Quality, [What is Mistake
   Proofing?](https://asq.org/quality-resources/mistake-proofing). Makes an
   error impossible or immediately obvious; warning versus control. (Page
   fetch was blocked; definition corroborated from ASQ-quoting sources.)
8. Harry Robinson (1997), ["Using Poka-Yoke Techniques for Early Defect
   Detection"](https://web.archive.org/web/20120607053529/http://facultyweb.berry.edu/jgrout/pokasoft.html),
   STAR'97. 311 structural localization mistakes; not a test that the menus
   worked.
9. Yaron Minsky (2010), [Effective
   ML](https://blog.janestreet.com/effective-ml/). "Make illegal states
   unrepresentable."

**TPS relationship sourced: supporting method under jidoka. The name
covers prevention and detection; prefer prevention. Naming and one
on-stage software fixture remain live.**
