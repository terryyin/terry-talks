---
id: tps-and-ai-talk
status: proposed-decomposition
created: 2026-09-28
created_during: Near-future direction — TPS and AI talk ready for the LeSS Conference in Tokyo, 2026
trigger_when: Now; the backlog direction selects this talk
scope: four candidate stories; S/M/L bands unassigned (no project definitions)
---

# TPS and AI talk: from a working deck to a Tokyo-ready presentation

## Parent problem and desired effect

For **Terry**, presenting to a mixed Japanese and international audience at
the LeSS Conference in Tokyo (with TPS, lean, and LeSS experts, some from
Toyota, in the room), the current
[Freedom and Entrustment deck](../slides/tps-and-ai/slides.md) should change
from a comprehensive working draft into a presentation he can deliver with
confidence. It should be built on the claims he stands behind, fit in at most
32 slides with Japanese embedded, and follow a deliberate arc: a casual opening
that puts the key message first, a streamlined narrative, a climax at about the
three-quarter point, then a wind-down to a solid ending.

The **audience** evaluates comprehension and memorability: *a small collection
of main points that are easy to remember*
([main theme](main-theme-and-stage-setting.md)). Terry evaluates fidelity to
his opinion and whether he can deliver it.

### The published session (constraint)

The [conference session page](https://less.works/conferenza/sessions/2026-global-less-conference-tokyo-what-ai-augmented-development-can-learn-from-the-toyota-production-system-592)
fixes these facts:

- **When:** 2026 Global LeSS Conference Tokyo, **8 October 2026, 15:45**.
- **Slot:** a one-hour talk. That is about ten days after this decomposition.
- **Listed title:** *What AI-Augmented Development Can Learn from the Toyota
  Production System*. The deck's title is *Freedom and Entrustment*, and its
  subtitle adds "and LeSS".
- **Abstract promises:** TPS's influence on Agile thinking; lessons drawn from
  hands-on project experience; and "patterns, tensions, and practical lessons
  for using AI in ways that improve learning, flow, quality, and coordination
  rather than amplify waste".
- **Language:** English. The page lists translation options, including
  Japanese, but does not say what form that translation takes on the day.

The abstract is a promise the audience arrives with. The storyline must visibly
deliver its four named outcomes, and at least one **tension** beat. The
doughnut examples are the "hands-on project experience".

### Evidence from the current material (2026-09-28)

- **Deck:** About 38 slides. That is over the limit, even though the deck
  already covers every priority topic in the main theme. The artwork in the
  [artwork list](../slides/tps-and-ai/artwork-list.md) is essentially complete.
  Generated art for Go-See (`entering-ai-harness.png`) exists, but no slide
  uses it.
- **Flow:** The deck follows the main theme's topic priority list, which that
  file says "does not dictate the order". No slide is designated as the climax.
  The strongest candidates are the loop pair ("The engine…" / "AI speeds
  whichever loop you feed") and the jidoka cluster, and both currently sit near
  the middle. After the jidoka cluster there are a JIT section, Respect for
  People, continuous improvement, switching cost, tensions, and takeaways. That
  is a long tail with no single peak.
- **Japanese:** Only one bilingual touch exists (任せる / 信頼) and there is no
  translation layer. [Claim 9](claims/09-nemawashi-self-organized-deliberation-in-less.md)
  already assumes "slides will be translated". Claims 16, 17, and 20 set
  first-use rules for genchi genbutsu, 一個ずつ確認, and poka-yoke.
- **Claims:** None is marked Confirmed or Finalized. 25 are *Provisional* and
  Claim 13 is *Backlog*. Terry has explicitly accepted Claim 00's vocabulary
  and Claim 3's triad wording. Most other claims present one settled opinion.
  Claims 15 and 22 still show their forming path, and 7, 11, 2, 16, 14, 12,
  and 9 have open questions that affect their use on stage.
- **Stale cross-references among the claims:**
  - Claim 13's status names an "item 7", but its section was removed in
    `a2cb854`.
  - Claims 6, 20, and 24 say "example search not started", although Claim 13
    has already ranked those examples.
  - Claim 9 cites text that Claim 3 no longer contains.
  - The wording on detailed control differs between Claims 1, 10, and 22.
  - The CLD's skill list disagrees with Claim 12's open editorial choice.
  - Claims 15 and 22 still carry "still open" footers.

## Alternatives and proposed direction

| Approach | Value | Decision and reason |
| --- | --- | --- |
| Do nothing: present the current deck | No work | Reject: over 32 slides, no Japanese, no designed climax. It fails every requirement in the direction. |
| Trim to 32 in place, then translate | Least editing | Reject as sufficient: the count would be met, but the arc and the confirmed basis would not. Translating before the storyline stabilizes wastes translation work on slides that later change. |
| Rely on a live interpreter or spoken Japanese instead of embedded text | Avoids translation work | Reject: the direction explicitly requires embedded Japanese. It can still complement the slides on the day. |
| Settle the claim basis, then restructure the storyline, then embed Japanese, then rehearse and harden for the day | Every stage consumes stable input from the stage before it | **Recommended.** |

**Highest learning:** Can the argument be told as one arc within 32 slides,
with a real climax at about slide 24, without dropping a claim Terry considers
core? That tests the most consequential assumption, so the storyline story
carries it. The claim-basis story before it is kept small so that it does not
delay that learning.

## Candidate story decomposition

These are non-executable candidates. The proposed story boundaries and order are
a response to Terry's direction; they are not his decisions. Effort bands are
unassigned because this project has no S/M/L definitions. Relative effort is
noted as a hypothesis.

<a id="confirmed-basis"></a>
### 1. Terry can see which claims the talk stands on
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Terry needs the direction's content rule, "confirmed claims
  primary, unconfirmed secondary", to be decidable before cutting slides. With
  Toyota experts in the audience, every primary beat must rest on a claim he has
  confirmed.
- **Visible outcome:** The [README](README.md) claim list shows each claim's
  talk role: **Confirmed** (primary), **Supporting** (secondary, may appear
  qualified), or **Off-stage** (not in this talk). Every Confirmed claim reads as
  one current opinion. Its forming path is collapsed, and no stale
  cross-reference contradicts another claim. The deck's speaker notes cite claims
  consistently with those roles.
- **Evaluation:** Terry reads the list and each Confirmed claim and agrees with
  the role he assigned. None of the stale references listed under *Evidence*
  remains. Changing a status is Terry's decision; the agent proposes and repairs.
- **Value / learning:** Removes ambiguity that would otherwise be resolved
  slide by slide during the cut. It tests whether the "settled enough" reading
  (Claims 00, 1, 3, 4, 5, 6, 8, 10, 17, 18, 19, 20, 21, 22, 24) matches Terry's
  own.
- **Boundary:** New research, new claims, and resolving open questions that do
  not change a claim's talk role are out of scope. A claim with open questions
  can still be Supporting.
- **Effort hypothesis:** Smallest in the set. Mostly review and consistency
  repair. Confidence is moderate, because Terry may reopen a claim.
- **Depends on:** none.
- **Safe stopping point:** A trustworthy claim map that is useful for any later
  talk or blog, even if the deck work stops.

<a id="storyline"></a>
### 2. The audience follows one arc to a climax in at most 32 slides
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** The audience remembers a few points when the talk builds to
  one peak. Terry needs a deck whose order he can speak naturally.
- **Visible outcome:** An English deck of at most 32 slides (counted as
  rendered, including cover and end):
  - A casual opening whose first few slides state the key message: the
    diagnostic *freed vs. constrained*, and the Freedom and Entrustment theme.
  - A streamlined middle in which each slide advances one thread.
  - A designated climax at about the three-quarter mark (around slide 24 of 32).
  - A wind-down through the takeaways to the closing crane.
  - Primary beats come from Confirmed claims. Supporting claims appear only as
    qualified or secondary beats.
  - Cut or merged slides stay recoverable through Git.
- **Evaluation:** Terry pages through the rendered deck in presenter mode. The
  slide count is at most 32. He can name the climax slide and sees it at about
  the 3/4 point. Ideally he also tells the arc to a colleague and gets back the
  key message and the takeaways. Existing build and export commands still work.
- **Value / learning:** The central test of the direction. It gives a
  presentable English deck even if Japanese or rehearsal slips.
- **Boundary:** Research and new artwork are out of scope unless a restructured
  slide needs an asset. Existing unused art such as the Go-See harness image may
  be reused. Japanese text belongs to the next story. The **climax slide choice
  is Terry's**. The candidates are the loop pair ("AI speeds whichever loop you
  feed") or "Same gates for 'I' and AI", with the jidoka and JIT material
  building toward it.
- **Effort hypothesis:** Largest editorial work in the set. The uncertainty is
  in narrative judgment, not tooling.
- **Depends on:** [confirmed-basis](#confirmed-basis), for what may be primary.
- **Safe stopping point:** A complete, deliverable English deck at the limit.

<a id="japanese"></a>
### 3. Japanese-speaking attendees can follow every slide in Japanese
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Most of the Tokyo audience reads Japanese more comfortably
  than English. Embedded Japanese lets them follow Terry's English delivery
  without relying on an interpreter.
- **Visible outcome:** Every slide with audience-facing text carries a Japanese
  rendering, embedded in the deck:
  - Key terms follow the claims' first-use rules: nemawashi,
    genchi genbutsu / Go See, 一個ずつ確認, poka-yoke glossed as
    mistake-proofing, and the entrust (任せる) / trust (信頼) contrast.
  - The Japanese is legible at projection size without crowding the English.
  - Diagrams (SVG, mermaid) carry Japanese labels where they carry English ones.
  - Doughnut code snippets and source attributions stay untranslated.
- **Evaluation:** Terry checks the rendered deck on a projector-sized screen.
  A fluent Japanese reader, whom Terry arranges, confirms the text is natural
  and the TPS terms match Toyota usage. Their corrections are applied.
- **Value / learning:** Tests whether bilingual slides stay readable within
  the 32-slide budget. If they do not, the storyline story may need to reduce
  text density.
- **Boundary:** Translating the claims, the speaker notes, or a separate
  Japanese-only deck is out of scope unless Terry decides otherwise. The
  presentation format (same slide or alternate, placement, font) is decided at
  refinement.
- **Effort hypothesis:** Medium relative to the storyline story. The
  uncertainty is concentrated in the native review turnaround.
- **Depends on:** [storyline](#storyline). Translating unstable text is waste.
- **Safe stopping point:** Full machine-assisted Japanese that Terry has
  checked is still usable if the native review arrives late. Record which parts
  are still unreviewed.

<a id="conference-ready"></a>
### 4. Terry can deliver the talk reliably on conference day
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** The talk must fit the slot and survive venue conditions.
- **Visible outcome:**
  - The talk fits the conference time slot at Terry's rehearsal pace, with the
    climax timed near the 3/4 mark.
  - Speaker notes are reduced to what Terry speaks, including the spoken
    doughnut examples.
  - A PDF backup and an offline-capable build exist. Media such as the loom
    animation plays or has a fallback.
  - Assets are licensed and attributed on-slide.
- **Evaluation:** Terry does a timed full rehearsal in presenter mode. He opens
  the offline build and the PDF on the presentation machine without network
  access.
- **Value / learning:** Converts a finished deck into a dependable
  performance.
- **Boundary:** Addresses what rehearsal exposes. Recording, publishing slides
  online, and follow-up blog posts are separate decisions.
- **Effort hypothesis:** Small to medium. Depends on how much rehearsal
  feedback changes.
- **Depends on:** [japanese](#japanese). Timing is rehearsed on the final
  bilingual deck.
- **Safe stopping point:** A rehearsed deck with backups.

## Ordering and scope reduction

Order: confirmed-basis → storyline → japanese → conference-ready. Each story
consumes the stable output of the one before it. The storyline carries the
highest learning, and the story ahead of it is deliberately small.

**Calendar (proposed, not committed):** there are ten days until
8 October 15:45, so each story needs a time-box:

| Story | Finish by |
| --- | --- |
| confirmed-basis | about 29 September (one working day) |
| storyline | about 2 October |
| japanese | about 5 October, leaving time for the fluent reviewer |
| conference-ready | rehearsals on 6–7 October |

A one-hour slot with at most 32 slides allows roughly 1.5–2 minutes per slide.
The exact figure depends on how much time Terry reserves for Q&A.

If time runs short, cut or shorten slides in this order, least important
first:

1. The "Lower the switching cost" follow-on.
2. The separate "Preferred tests" slide.
3. Section divider slides.
4. Shorten "Tensions and honest limits" to one tension (Claim 23), because the
   abstract promises tensions.

Keep the diagnostic, the theme, the jidoka descent, the same gates, the JIT
flow, one tension, and the closing intact. Do not skip the native Japanese
review silently: if it is late, say so.

## Open decisions

- **Title alignment.** The session page lists *What AI-Augmented Development
  Can Learn from the Toyota Production System*. Terry chooses whether to keep
  *Freedom and Entrustment* with that as its subtitle, or to change the cover.
- **Q&A share of the hour.** This sets the slide density and the rehearsal
  target.
- **What "confirmed" means.** The proposal is that Terry marks each claim's
  talk role. Current statuses do not use that vocabulary.
- **Climax slide.** Terry's choice during storyline refinement.
- **Japanese format and reviewer.** Same slide or alternate slides, and who
  reviews the translation.

## When to surface

Now. The product backlog's near-future direction names this talk. Refinement and
slice planning follow selection. This seed authorizes no execution.

## References

- [README](README.md), [main theme](main-theme-and-stage-setting.md),
  [open questions](open-questions.md), [claims](claims/)
- [Deck](../slides/tps-and-ai/slides.md) and
  [artwork list](../slides/tps-and-ai/artwork-list.md)
- [ADR-0000](../docs/adrs/0000-use-adrs-accepted.md): durable decisions stay
  human-owned. No new ADR is implied.
