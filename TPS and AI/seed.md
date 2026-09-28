---
id: tps-and-ai-talk
status: proposed-decomposition
created: 2026-09-28
created_during: Near-future direction — TPS and AI talk ready for the LeSS Conference in Tokyo, 2026
trigger_when: Now; the backlog direction selects this talk
scope: three candidate stories; S/M/L bands unassigned (no project definitions)
---

# TPS and AI talk: from a working deck to a Tokyo-ready presentation

## Parent problem and desired effect

For **Terry**, presenting to a mixed Japanese and international audience at
the LeSS Conference in Tokyo (with TPS, lean, and LeSS experts, some from
Toyota, in the room), the current
[Freedom and Entrustment deck](../slides/tps-and-ai/slides.md) should change
from a comprehensive working draft into a presentation he can deliver with
confidence. It should be built on the claims he stands behind, fit in about 33 slides (never more than 35) with Japanese embedded, and follow a deliberate arc: a casual opening
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
  subtitle is this listed title.
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
- **Claims:** The [README](README.md) claim list gives each claim a talk
  role Terry set: Confirmed (may carry a primary beat), Supporting (qualified
  or secondary beats only), or Off-stage.

## Alternatives and proposed direction

| Approach | Value | Decision and reason |
| --- | --- | --- |
| Do nothing: present the current deck | No work | Reject: over the slide limit, no Japanese, no designed climax. It fails every requirement in the direction. |
| Trim to the limit in place, then translate | Least editing | Reject as sufficient: the count would be met, but the arc and the confirmed basis would not. Translating before the storyline stabilizes wastes translation work on slides that later change. |
| Rely on a live interpreter or spoken Japanese instead of embedded text | Avoids translation work | Reject: the direction explicitly requires embedded Japanese. It can still complement the slides on the day. |
| Settle the claim basis, then restructure the storyline, then embed Japanese, then rehearse and harden for the day | Every stage consumes stable input from the stage before it | **Recommended.** |

**Highest learning:** Can the argument be told as one arc within about 33 slides,
with a real climax at about slide 25, without dropping a claim Terry considers
core? That tests the most consequential assumption, so the storyline story
carries it. The claim basis it needs is already settled as the README's talk
roles.

## Candidate story decomposition

These are non-executable candidates. The proposed story boundaries and order are
a response to Terry's direction; they are not his decisions. Effort bands are
unassigned because this project has no S/M/L definitions. Relative effort is
noted as a hypothesis.

<a id="storyline-art-cleanup"></a>
### Correction: the deck's art matches the accepted 30-slide storyline

**Identity:** tps-and-ai-talk#storyline-art-cleanup
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../.planning/quick/009-storyline-art-cleanup/PLAN.md","assessment":"ready","reasons":[],"basis":{"document":"d9b287f39e0cc45541735a7070bec619a5ed6db9276447f8ca142ab0a99ecdac","plan":"99583d758a5d93d30d56daf775992cc03199e5d9e97a5a696ec987e9d4320af0"}}
```

#### Goal

The accepted 30-slide deck ships only the art it shows, and Terry can read
the artwork list to see which art is on which current slide. This is a
bounded correction from the storyline story's execution retrospective
(provenance in its plan). It adds no feature promise.

#### Scope

- **Included:**
  - Delete the four images in `slides/tps-and-ai/public/` that slide 4's cuts
    left unreferenced.
  - Bring `slides/tps-and-ai/artwork-list.md` entries whose slides were cut
    or merged in line with the current deck titles.
- **Excluded:** Any change to slide text, order, or count. New art and
  Japanese text are also out of scope.
- **Plan:** [009-storyline-art-cleanup](../.planning/quick/009-storyline-art-cleanup/PLAN.md)

<a id="japanese"></a>
### 3. Japanese-speaking attendees can follow every slide in Japanese
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../.planning/quick/010-japanese/PLAN.md","assessment":"ready","reasons":[],"basis":{"document":"a76db6ada02abc973520091d1331853a9a36a6c2d20a4d2857fa8f965ba093e9","plan":"295fbe0b045aa888365e9adb02eff5c4dc6dc43bf4ecadb4a026988794610eb4"}}
```

#### Goal

For the **Japanese-speaking attendees** at the Tokyo LeSS Conference, every
slide of the accepted 30-slide *Freedom and Entrustment* deck shows its
audience-facing text in **Japanese directly under the English**. They can
follow Terry's English delivery slide by slide without relying on an
interpreter or waiting for a separate Japanese view. International attendees
still read the English first. This delivers the direction's "Japanese
translation embedded" and tests whether bilingual slides stay readable
without breaking the 35-slide ceiling.

#### Scope

**Decided with Terry (2026-09-28):**

- **Format: same slide, Japanese under English.** Each English title, bullet,
  statement, quote, and caption is followed by its Japanese rendering on the
  same slide, set slightly smaller and visually secondary to the English. There are no
  alternate or twin slides and no language toggle.
- **Coverage: everything audience-facing.** This includes titles, bullets,
  statement and quote slides, diagram labels (the inline SVGs and the mermaid
  diagrams), image captions, the prose in doughnut-example boxes, the cover,
  About Me, and the end slide.
- **Speaker notes stay English only.**
- **Reviewer:** Aki (aki@odd-e.com), a fluent Japanese reader and Terry's
  friend, reviews the Japanese. Terry sends the rendered deck. Aki's
  corrections are applied.

**Required:**

- **Count unchanged:** Adding Japanese adds no slides. The deck stays at its
  accepted count (30), and at most 35.
- **Readable at projection size:** On a projector-sized screen, each slide's
  English and Japanese both fit without overflow, clipping, or overlapping
  images. The Japanese does not crowd the English out of its hierarchy.
- **Terms follow the claims' first-use rules:** nemawashi (根回し),
  genchi genbutsu / Go See (現地現物), 一個ずつ確認, poka-yoke glossed as
  mistake-proofing (ポカヨケ), jidoka (自働化), and the contrast between
  entrust (任せる) and trust (信頼). TPS terms use Toyota's own Japanese
  wording, not back-translations.
- **Existing Japanese is not duplicated:** Text already in Japanese, such as
  the 釈迦に説法 title and the 任せる / 信頼 line, keeps a single Japanese form.
- **Review status is visible:** Until Aki's review is applied, Terry can see
  which slides are still unreviewed.
- **Commands:** Existing build, export, and `pnpm present` commands still work.

**Rejection constraints:**

- **More than 35 rendered slides** fails Terry's limit, so alternate
  Japanese slides are out.

**Deferred** (not built or verified here):

- Japanese speaker notes, translated claims, and a Japanese-only deck.
- A language toggle or a separate Japanese build.
- Rehearsed timing with the bilingual deck, and offline font availability on
  the presentation machine ([conference-ready](#conference-ready)).

**Assumptions:**

- **Overflowing slides:** If a slide overflows once Japanese is added, the
  first remedy is layout: size, spacing, or moving an image. The second is
  shortening that slide's English wording without dropping its beat. If a
  beat would have to go, stop and ask Terry.
- **Timing:** Aki can review by about 5 October. If the review is late, the
  Japanese that Terry has checked still ships, and the unreviewed slides are
  listed.

#### Key examples

1. **Plain text slide.** Today "The gates do not care who authored the
   change" is English only. After the change, the title has a smaller
   Japanese line beneath it, such as ゲートは変更の作者を問わない, and each
   paragraph has its Japanese rendering beneath it. The slide still fits,
   and the deck still totals 30 slides in presenter mode.
2. **Doughnut example box.** On the same slide, the box's prose ("A Jidoka
   stop binds the agent…") gains Japanese. The code block `A detour into a
   note is recorded separately. / Do not guess the UX.` stays in English,
   because it is quoted source.
3. **Mermaid diagram.** In the climax diagram "AI speeds whichever loop you
   feed", each node shows both languages, for example "AI generation volume
   / AI生成量". The +/- edge labels stay as they are. The diagram still fits
   beside its image.
4. **Inline SVG.** The "Two houses" and "The triad" diagrams carry Japanese
   labels wherever they carry English ones.
5. **Quote slide.** The main-message quote and the closing crane quote each
   show the full Japanese sentence beneath the English and stay legible over
   the art.
6. **Already Japanese.** 釈迦に説法 keeps its English gloss, *Preaching to the
   Buddha*, and is not re-translated. The 任せる / 信頼 line is not doubled.
7. **Term first use.** The first slide that says "Go-See" renders it as
   現地現物 (Go See). Later slides use the same Japanese term consistently.
8. **Late review.** On 5 October, Aki has reviewed slides 1–20 only. The
   deck still ships with all 30 slides in Japanese, and slides 21–30 are
   recorded as checked by Terry but not yet reviewed by Aki.

- **Evaluation:** Terry pages through the rendered deck on a projector-sized
  screen and confirms that every slide is bilingual and fits. Aki confirms
  that the Japanese is natural and that the TPS terms match Toyota usage,
  and Aki's corrections are applied.
- **Effort hypothesis:** Medium. The uncertainty is in fitting dense slides
  and in the review turnaround.
- **Depends on:** the accepted 30-slide English deck. The storyline story is
  done.
- **Safe stopping point:** A fully bilingual deck that Terry has checked, with
  the slides Aki has not yet reviewed listed.

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

Order: storyline → japanese → conference-ready. Each story consumes the
stable output of the one before it; the storyline starts from the README's
talk roles. The storyline carries the highest learning.

**Calendar (proposed, not committed):** there are ten days until
8 October 15:45, so each story needs a time-box:

| Story | Finish by |
| --- | --- |
| storyline | about 2 October |
| japanese | about 5 October, leaving time for the fluent reviewer |
| conference-ready | rehearsals on 6–7 October |

A 45-minute talk (15 minutes banked for Q&A) with the accepted 30 slides
allows about 1.5 minutes per slide.

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

- ~~**Title alignment.**~~ Decided 2026-09-28: keep *Freedom and
  Entrustment*, with the listed session title as the subtitle.
- ~~**Q&A share of the hour.**~~ Decided 2026-09-28: a 45-minute talk with
  a 15-minute Q&A bank; slide limit about 33, never more than 35.
- ~~**What "confirmed" means.**~~ Decided 2026-09-28: a talk role (Confirmed,
  Supporting, Off-stage) that Terry sets in the [README](README.md) claim
  list.
- ~~**Climax slide.**~~ Decided 2026-09-28: the loop pair, "AI speeds
  whichever loop you feed", at slide 24 of 30 (accepted 2026-09-28).
- ~~**Japanese format and reviewer.**~~ Decided 2026-09-28: Japanese goes
  under the English on the same slide, covering all audience-facing text,
  with speaker notes left in English. Aki (aki@odd-e.com) reviews
  ([japanese](#japanese)).

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
