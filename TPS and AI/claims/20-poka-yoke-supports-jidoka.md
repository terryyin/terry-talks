# Claim 20: Poka-yoke mistake-proofs a known error at the source; it supports jidoka

**Status: Provisional — TPS placement and naming settled; doughnut
fixture still queued; leftover warnings owned by Claim 24**

## Claim

> **Poka-yoke is a supporting quality method under jidoka, not a second
> pillar and not jidoka itself.** Toyota practices it. Shingo coined
> the name as a later addition. For a known inadvertent error, change
> the process so the error cannot occur, or so it is immediately
> obvious at the source. Prefer prevention. Do not equate poka-yoke
> with prevention only, or collapse every good design or every test
> into the name.

This claim owns the **TPS relationship** and the **name**. [Claim
6](06-jidoka-embeds-routine-judgment.md) owns smart → dumb → gone.
[Claim 19](19-stop-and-fix.md) owns the stop. [Claim
24](24-warnings-as-stop-no-news-is-good-news.md) owns leftover
warnings as unpaid judgment. [Claim
5](05-smed-software-changeover-and-ai-friendly-context.md) owns
changeover. [Claim
11](11-physical-production-and-software-differences.md) owns the
semantic limit.

Toyota's plant tour files fail-safe poka-yoke under **autonomation**:
a screwdriver linked to a loose-screw check; a red lamp alerts the
worker. That example is a **warning**, not geometry that makes the
wrong screw impossible. Toyota's TPS philosophy page names jidoka
and does not name poka-yoke. Jidoka is the pillar: detect, stop, make
visible (andon), prevent recurrence, free people from watching.
Poka-yoke makes a *known* mistake unmissable or unmakeable so that
pillar can hold. Cheap and simple, invented in kaizen (Ballé, LEI);
over-complex devices that hinder the operator get disconnected.

Shigeo Shingo coined **poka-yoke** in the early 1960s, replacing
insulting **baka-yoke**. *Poka* is an inadvertent error; *yoke* is
prevention. He taught Toyota's P-course; he was not Ohno's system
architect. The first device he recounts (Yamada Electric, 1961) is
**detection**: a dish holding two springs, so a leftover spring made
a missing insertion obvious. *Zero Quality Control* (1986) is his
theory—source inspection plus poka-yoke—not Toyota's name for the
pillar. Regulatory functions are **control** (will not proceed)
versus **warning** (lamp, buzzer).

"Gone" in Claim 6 is closer to prevention poka-yoke. Control that
actually stops is already a jidoka mechanism. A warning everyone
continues past is not yet quality at the source (Claim 19). A
skippable compiler or linter line is Claim 24.

Keep **poka-yoke** as the Japanese name (Tokyo; Toyota's plant-tour
English still uses it). Gloss it once as **mistake-proofing**. Map
software English onto control versus warning. Leave contact /
fixed-value / motion-step off the slide unless a doughnut fixture
needs them.

| Phrase | Maps to |
|---|---|
| **poka-yoke** | The method under jidoka |
| **mistake-proofing** | English gloss: prevention *and* detection |
| **make illegal states unrepresentable** | **Prevention:** a type, schema, constructor, or missing UI path |
| **will not compile / will not ship** | **Control.** A skippable warning is not yet this (Claim 24). |

Harry Robinson's 1997 HP scripts found 311 structural localization
mistakes. Verifying catalog syntax is not testing whether the menus
worked. That is Claim 11 in miniature: poka-yoke encodes a
specifiable known mistake; it does not judge value. Claim 5 may
*use* a mistake-proofed module as setup reduction; it should not
define poka-yoke. A check nobody trusts will be skipped—the software
form of disconnecting the device.

## Implication for the talk

> **Under jidoka, show poka-yoke:** for a known mistake, change the
> process so people need not rely on vigilance. Prefer to make the
> mistake impossible. If you cannot, make continuation impossible
> until someone responds. If you only warn, you have not yet built
> quality in.

On stage, one doughnut fixture, queued on
[Claim 13](13-doughnut-project-examples.md) as part of the judgment-descent
hunt (same search as Claims 6 and 24). Until pulled, Robinson
is the sourced proof that detection poka-yoke is not a test of
whether the feature worked. Then [Claim
24](24-warnings-as-stop-no-news-is-good-news.md): one warning pile
versus a quiet gate—the software punchline of control versus warning,
not a second TPS topic.

## Questions still open

- Doughnut-sourced prevention and control fixtures, queued on
  [Claim 13](13-doughnut-project-examples.md) with Claim 6's judgment
  descent; example search not started.

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
   Tool of the jidoka pillar; cheap, simple; over-complex devices get
   disconnected.
5. Shigeo Shingo (1986), [*Zero Quality Control: Source Inspection and the
   Poka-Yoke
   System*](https://www.routledge.com/Zero-Quality-Control-Source-Inspection-and-the-Poka-Yoke-System/Shingo/p/book/9780915299072).
   Errors versus defects; source inspection; control versus warning.
   Yamada Electric (1961) is recounted by Shingo and cited via Robinson
   from *The Sayings of Shigeo Shingo*.
6. Isao Kato, recounted by Art Smalley, ["Dr. Shigeo Shingo's P-Course and
   Contribution to
   TPS"](https://www.kevinmeyer.com/dr-shigeo-shingos-p-course-and-contribution-to-tps/).
   Shingo taught the P-course from 1955; he was not Ohno's advisor; jidoka
   predates his visits.
7. American Society for Quality, [What is Mistake
   Proofing?](https://asq.org/quality-resources/mistake-proofing). Makes an
   error impossible or immediately obvious; warning versus control.
8. Harry Robinson (1997), ["Using Poka-Yoke Techniques for Early Defect
   Detection"](https://web.archive.org/web/20120607053529/http://facultyweb.berry.edu/jgrout/pokasoft.html),
   STAR'97. 311 structural localization mistakes; not a test that the menus
   worked.
9. Yaron Minsky (2010), [Effective
   ML](https://blog.janestreet.com/effective-ml/). "Make illegal states
   unrepresentable."
