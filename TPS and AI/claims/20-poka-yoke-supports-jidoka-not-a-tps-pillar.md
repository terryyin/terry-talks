# Claim 20: Poka-yoke mistake-proofs a known error at the source; it supports jidoka, it is not a TPS pillar

**Status: Provisional — hypothesis extracted from Claims 1, 2, 5, 6, 11,
and 19; TPS relationship sourced; not a finalized talk beat**

## Original claim / hypothesis

Poka-yoke has been used in several claims and deserves its own. Extract
those details and explain how poka-yoke relates to TPS.

The scattered uses were already doing different jobs:

- [Claim 1](01-changing-significance-of-tps.md): AI should support
  **jidoka and poka-yoke**; preventive design (remove unnecessary code,
  make illegal states unrepresentable) is the poka-yoke form of spent
  judgment, complementary to executable checks.
- [Claim 2](02-tps-and-lean-houses.md): open whether poka-yoke should
  appear as a supporting practice beneath the TPS pillars, or only as an
  example inside particular relationships.
- [Claim 5](05-smed-software-changeover-and-ai-friendly-context.md):
  simplified, mistake-proofed design cheapens the accepted component and
  discipline jump inside a vertical slice. Do not collapse every good
  design move into the name.
- [Claim 6](06-jidoka-embeds-routine-judgment.md): "no intelligence" is
  prevention by construction; the closest quality concept is poka-yoke,
  not jidoka. Still open whether the talk presents that as an extension
  of jidoka, as poka-yoke, or as a complementary software-design
  principle.
- [Claim 11](11-physical-production-and-software-differences.md):
  poka-yoke and tests encode prior learning; they do not replace judgment
  of value, usefulness, or sufficiency of evidence.
- [Claim 19](19-stop-and-fix.md): previously learned judgment also lives
  in types and poka-yoke, not only in tests.

This is a lightly edited record of that request. This claim owns the
**TPS relationship** and the **name**. Claim 6 still owns the layers of
judgment (prevent / detect-and-stop / investigate-and-learn). Claim 19
still owns the stop. Claim 5 still owns changeover.

## Research-based adjustment

> **Poka-yoke is not a third TPS pillar.** Toyota's operating system has
> two pillars: **jidoka** and **Just-in-Time**. Poka-yoke is a supporting
> quality method: mistake-proof a *known* error so it cannot occur, or
> so it is immediately obvious at the source. Toyota itself presents
> fail-safe poka-yoke devices under autonomation. Shingo formalized the
> same idea as Zero Quality Control: distinguish inadvertent **errors**
> from **defects**, then use source inspection and poka-yoke so defects
> never form. That is the relationship: poka-yoke is one of the ways
> jidoka builds quality into the process, which is why low-inventory JIT
> can survive. Prefer prevention by construction to repeatedly detecting
> the same failure. Do not collapse every good design, every test, or
> jidoka itself into the name.

### Not a pillar: Toyota's placement

Toyota's current TPS overview still names two pillars. Jidoka (also
called autonomation) is "preventing defective products by automatically
stopping a machine when an abnormality occurs," which removes the need
for a person to watch machines continuously. Just-in-Time is produce or
transport only what is needed, when it is needed, in the amount needed.

On the same official plant-tour page, under **exploring autonomation**,
Toyota shows a separate beat: "Avoiding Simple Mistakes Through
Fail-Safe Devices called Poka-yoke." The example is a screwdriver
linked to a check for loose screws; a red lamp alerts the worker.
That is Toyota calling poka-yoke a **fail-safe under jidoka**, not a
peer of jidoka and JIT.

Lean commentary that stays close to that placement treats poka-yoke as
a tool of the jidoka pillar: detect or prevent a defect, stop rather
than pass it forward, and separate watching from responding—if, and
only if, the device actually helps people see the problem. Over-complex
devices that hinder the operator get disconnected. The ideal is cheap,
simple, and invented in kaizen, not dreamed up as equipment that is
"people-proof."

[Claim 2](02-tps-and-lean-houses.md)'s open placement question is
therefore answerable for poka-yoke: **supporting practice under
jidoka**, shown inside that relationship, not drawn as a third pillar
on Toyota's overview. SMED stays under JIT, as
[Claim 18](18-continuous-improvement-towards-perfection.md) already has
it.

### How poka-yoke relates to the rest of TPS

| TPS element | Relationship to poka-yoke |
|---|---|
| **Jidoka** | The pillar is detect abnormality, stop, make it visible, bring people to respond, prevent recurrence, and free them from watching the routine. Poka-yoke is a *method* for a named, previously learned mistake: make that mistake impossible, or make continuation impossible until conditions are correct, or warn immediately at the source. Some poka-yoke devices *are* jidoka mechanisms (they stop). The distinctive contribution is targeting a known error so it need not keep being watched for. |
| **Just-in-Time** | Low inventory cannot absorb a stream of defectives. Quality at the source—jidoka, including poka-yoke—is why pull and small buffers are survivable. Poka-yoke does not replace JIT; it is part of what makes JIT honest. |
| **Respect for People** | The older name was **baka-yoke** (fool-proofing). It was changed because it insulted the people doing the work. *Poka* is an inadvertent error; *yoke* is prevention. The assumption is that people will slip, so the process should change—not that operators are fools who must be watched. Toyota's TPS purpose includes making work easier and less burdensome. |
| **Kaizen** | Once a failure mode is understood, "be more careful" is not the countermeasure. Encode the learning so the error cannot recur, or cannot continue unnoticed. That is the prevent-then-detect half of [Claim 6](06-jidoka-embeds-routine-judgment.md)'s loop. |

The software-useful cut in Claim 6—**prevent by construction** versus
**detect and stop**—is still the right allocation of judgment. It is
slightly sharper than Shingo's vocabulary. Shingo's poka-yoke includes
both **control / shutdown** (the process cannot proceed) and **warning**
(a lamp, buzzer, or other signal). Toyota's official example is a
warning lamp, not a fixture that makes the wrong screw physically
impossible. So the talk should not say "poka-yoke = only prevention,
jidoka = only detection." Say instead:

> **Jidoka is the pillar: the capability and expectation to detect,
> stop, respond, and improve. Poka-yoke is a method under that pillar
> for a known mistake, preferably so the mistake cannot occur.**

Present prevention-by-design **as poka-yoke**, supporting jidoka—not as
an extension that swallows jidoka, and not as a free-floating
software-design slogan with the Japanese name stripped off. That closes
Claim 6's naming question.

### Shingo's Zero QC: errors are not yet defects

Shigeo Shingo, consulting with Toyota and later writing *Zero Quality
Control*, distinguished **errors** (inadvertent human slips, which will
happen) from **defects** (errors that reach the next process or the
customer). Sampling inspection guarantees that some defectives pass.
One-hundred-percent inspection after the fact is costly and late. The
aim is **source inspection**: check the conditions that produce quality
*before* or *as* the step is done, and couple that with poka-yoke so
the error cannot become a defect.

ASQ's definition matches that range: any automatic device or method
that either makes an error impossible or makes it immediately obvious
once it has occurred. Setting functions (how the check is made) include
contact / physical attributes, fixed-value / counting, and motion-step
/ sequence. Regulatory functions are **warning** versus **control**
(do not proceed until the error is corrected or conditions are right).
LEI's two types are the same split: shutdown and warning. Good devices
are simple, reliable, inexpensive, and fitted to the actual workplace.

That last criterion is a Respect-for-People test. A poka-yoke that adds
burden, false stops, or opaque complexity is not "more jidoka." It is
muri. Operators who disconnect it are often diagnosing that.

### Software mapping, extracted from the other claims

The factory device is usually physical. The software analogue is
usually **structure**: types, schemas, constructors, APIs, and deleted
paths that make a known class of mistake unrepresentable or uncallable.

| Factory move | Software analogue | Caution |
|---|---|---|
| Geometry that fits only the correct orientation | Types, schemas, constructors; "make illegal states unrepresentable" | Not every cohesive module is poka-yoke. Information hiding and once-and-only-once also cheapen a component jump; [Claim 5](05-smed-software-changeover-and-ai-friendly-context.md) already warns against collapsing all of design into this name. |
| Control: the machine will not start | The illegal call will not compile; the API cannot be invoked wrong; the pipeline will not ship an illegal configuration | Halt still has to happen. Detection without stop is [Claim 19](19-stop-and-fix.md). |
| Warning: red lamp | A linter, a test that catches a known class of defect, a fail-fast at a violated assumption | A warning that everyone continues past is not yet quality at the source. |
| Eliminate the error-producing step | Delete the code path; do not offer the wrong action; prefer no extra representation | [Claim 5](05-smed-software-changeover-and-ai-friendly-context.md)'s externalization order starts here: cheapest software is software that is not there, then illegal states unrepresentable. |
| Cheap, local, invented in kaizen | A fixture in the type system or UI that the team understands and can change | An over-engineered detector nobody trusts will be ignored—the software form of disconnecting the device. |

Harry Robinson's 1997 software case is detection poka-yoke, not
prevention-by-geometry: automated checks prevented classes of
localization defects, and still did not replace testing whether the
application actually worked. That is the Claim 11 limit in miniature.
Poka-yoke encodes **prior** learning about a specifiable mistake. It
does not judge value, usefulness, or whether the evidence is enough.

[Claim 5](05-smed-software-changeover-and-ai-friendly-context.md) already
uses the leftover job: mistake-proofed, locally understandable modules
shrink what you must know to *enter* a component. That is poka-yoke as
setup reduction, not as a second definition. Keep that use; do not
re-teach the TPS relationship there.

### AI does not get a free pass on ownership

[Claim 1](01-changing-significance-of-tps.md) already has the rule: an
AI-generated safeguard becomes part of the team's jidoka or poka-yoke
only when the team can understand, verify, own, and improve it.
Generated tests fail; generated refactorings change behavior. The LEI
caution about over-complex devices maps directly: a check the team
cannot explain will be skipped, suppressed, or worked around—the
software form of disconnecting the poka-yoke so production can
continue.

AI is useful for *proposing* preventive designs and oracles. The
scarce move is still Claim 6's loop: investigate the novel failure,
then encode what is now known so the same mistake is unrepresentable or
unmissable. Delegating a *known, recurring* mistake to another model
call instead of changing the structure keeps paying for reconstruction.

## Emerging implication for the talk

A compact candidate, sitting next to Claims 1, 2, 5, 6, and 19:

> **Do not add a third pillar to Toyota's TPS overview.** Jidoka and
> JIT remain the two. Under jidoka, show poka-yoke: for a known
> mistake, change the process so people need not rely on vigilance.
> That is how quality at the source makes pull survivable, and how
> spent judgment frees attention for what is still novel.

On stage, one software fixture is enough: a type or constructor that
cannot represent the illegal state, or a UI that does not offer the
wrong action—then, if needed, a check that still must actually halt.
The weekly-report slice in Claim 5 can *use* that fixture as the reason
a component jump stays cheap. It should not stop to define poka-yoke.

> **Prefer to make the known mistake impossible. If you cannot, make
> continuation impossible until someone responds. If you only warn,
> you have not yet built quality in.**

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

1. Toyota Motor Corporation, [Toyota Virtual Plant Tour: Toyota
   Production
   System](https://global.toyota/en/company/plant-tours/production-system/).
   Two pillars; poka-yoke presented under exploring autonomation as
   fail-safe devices that help avoid simple mistakes; screwdriver /
   loose-screw red-lamp example.
2. Toyota Motor Corporation, [Toyota Production
   System](https://global.toyota/en/company/vision-and-philosophy/production-system/).
   Current primary account of jidoka and Just-in-Time as the two
   operating pillars; jidoka as automation with a human touch, stop on
   abnormality, prevent recurrence, free people from machine watching.
3. Lean Enterprise Institute, [Poka
   Yoke](https://www.lean.org/lexicon-terms/poka-yoke/). Error-proofing
   by simple inexpensive devices; 100% quality at the source versus
   sampling; shutdown versus warning; criteria of simple, reliable,
   inexpensive.
4. Michael Ballé, ["Why Create Poka-yokes—and Why Disconnect
   Them?"](https://www.lean.org/the-lean-post/articles/why-create-poka-yokes-and-why-disconnect-them/),
   Lean Enterprise Institute. Poka-yoke as a tool of the jidoka pillar;
   prevention versus detection; cheap and simple; devices that hinder
   operators get disconnected; ideal invented in kaizen.
5. Shigeo Shingo (1986), [*Zero Quality Control: Source Inspection and
   the Poka-Yoke
   System*](https://www.routledge.com/Zero-Quality-Control-Source-Inspection-and-the-Poka-Yoke-System/Shingo/p/book/9780915299072).
   Errors versus defects; source inspection; poka-yoke as the method
   toward zero defects rather than sorting after the fact.
6. American Society for Quality, [What is Mistake
   Proofing?](https://asq.org/quality-resources/mistake-proofing).
   Makes an error impossible or immediately obvious; contact,
   fixed-value, and motion-step setting functions; warning versus
   control regulatory functions.
7. Harry Robinson (1997), ["Using Poka-Yoke Techniques for Early Defect
   Detection"](https://www.researchgate.net/publication/374808625_Using_Poka-Yoke_Techniques_for_Early_Defect_Detection).
   Software case: automated checks prevented classes of localization
   defects and did not replace testing whether the application worked.
8. Yaron Minsky (2010), [Effective
   ML](https://blog.janestreet.com/effective-ml/) / [Effective ML
   Revisited](https://blog.janestreet.com/effective-ml-revisited/).
   "Make illegal states unrepresentable."

**TPS relationship sourced: supporting method under jidoka, not a third
pillar. Naming and one on-stage software fixture remain live.**
