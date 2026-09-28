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

<a id="storyline"></a>
### 2. The audience follows one arc to a climax in at most 35 slides
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../.planning/quick/008-storyline/PLAN.md","assessment":"ready","reasons":[],"basis":{"document":"9a2097df7bbdf3116190c92f7799454366af844b95ff2d7cfaa5e3c3ea00914f","plan":"2117d9450ff9c3062bf100fb104978ebfa0d3edd54c4c9cc054f08c252105376"}}
```

#### Goal

For the **Tokyo LeSS Conference audience** (mixed Japanese and international,
with TPS and Toyota experts in the room), the English deck tells **one arc**.
It opens casually with the key message and builds to a single peak, **"AI
speeds whichever loop you feed"**, at about the three-quarter mark. It then
winds down to the takeaways and the closing crane, in **about 33 rendered
slides, never more than 35**, within a **45-minute** delivery. The audience leaves with the few takeaways. Terry gets an
order he can speak naturally. This is the direction's central test: can the
argument be told as one arc within that limit without dropping a claim Terry
considers core? It also gives a presentable English deck even if the Japanese
or rehearsal stories slip.

#### Scope

**Decided with Terry (2026-09-28):**

- **Climax: the loop pair.** The designated climax is the "AI speeds whichever
  loop you feed" causal-loop slide (Claim 22, Figure 2). It sits at about
  75% of the final count: slides 24–26 of 33, or the same proportion if the
  deck ends shorter or longer. The slide explicitly pays off the early statement slide
  ("AI can produce plausible software faster…", which already ends on that
  line). "The engine of freedom and entrustment" may sit directly before it or
  earlier as the model. The jidoka material (the loom's closed stop,
  smart → dumb → gone, Stop & Fix, same gates, and the five human judgments)
  and the JIT flow material (pull, CI as a practice, the shared product pulls
  collaboration) come **before** the climax and build toward it.
- **Cover:** The title stays **Freedom and Entrustment**. The subtitle becomes
  the listed session title, *What AI-Augmented Development Can Learn from the
  Toyota Production System*, so attendees recognize the session they chose.

**Required:**

- **Count:** Aim for about 33 slides; **35 is the hard ceiling** (Terry,
  2026-09-28, loosening the direction's 32). Slides are counted as `slidev`
  renders them in presenter mode, including the cover, the About Me slide,
  section dividers, quote slides, each frame of the loom sequence, and the
  end slide.
- **Density:** The talk is **45 minutes**, leaving a 15-minute Q&A bank in the
  one-hour slot (Terry, 2026-09-28). That is about 1.3–1.4 minutes per slide,
  so a slide carries one beat Terry can speak in that time; rehearsal timing
  itself belongs to [conference-ready](#conference-ready).
- **Opening:** The opening stays casual (the 釈迦に説法 tone). By about slide 5,
  the audience has seen the diagnostic *freed vs. constrained* and the Freedom
  and Entrustment theme. The early "AI speeds whichever loop you feed"
  statement sets up the climax.
- **Middle:** A streamlined middle in which each slide advances one thread
  toward the climax. Merge or cut slides that repeat a beat.
- **Wind-down:** After the climax, the talk winds down through what remains
  (Respect for People, continuous improvement, and at least one **tension**
  beat) to the takeaways, the closing crane, and the end slide.
- **Session-page promises:** The session page's promises stay visible: TPS's
  influence on Agile thinking (the lineage), hands-on doughnut experience,
  learning, flow, quality, and coordination, and at least one tension
  ([Claim 23](claims/23-ci-and-disposable-prototypes-tension-pair.md) carries
  it).
- **Talk roles:** Primary beats come only from **Confirmed** claims.
  **Supporting** claims (2, 7, 9, 11, 14, 16) appear only as qualified or
  secondary beats.
- **Speaker notes:** Notes cite claims consistently with those roles.
- **Recoverability:** Cut or merged slides are deleted from the deck, not
  hidden. Git recovers them.
- **Commands:** Existing build, export, and `pnpm present` commands still work.

**Rejection constraints:**

- **More than 35 rendered slides** fails Terry's limit.
- **Off-stage claims on slides:** Off-stage claims (13, 15) do not appear on
  slides ([README](README.md) talk roles). Doughnut examples reach slides only
  as evidence for the claim they illustrate, never as Claim 13 itself.

**Deferred** (not built or verified here):

- Japanese text and layout ([japanese](#japanese)).
- Rehearsed timing, reducing notes to spoken text, and offline or PDF backups
  ([conference-ready](#conference-ready)).
- New research and new artwork, unless a restructured slide needs an asset.
  Existing unused art, such as the Go-See harness image, may be reused.

**Assumptions:**

- **Go-See harness example re-verified (2026-09-28)** against doughnut HEAD
  `a0ab5999db`. The pre-fix pre-commit hook resolved `REPO_ROOT` as
  `$HOOK_DIR/../..`, which is the main checkout when committing from a
  worktree, and ran `git add -u` there. Fix `1c696d455d` (2026-07-24,
  Cursor-coauthored) switched to `git rev-parse --show-toplevel`, and its
  comment names that failure; the current hook keeps the fix. The symptom
  commits are not in published history (the `perf/recall-stats` branch is
  gone), so tell it through the mechanism, not as a quoted commit. It may carry
  a **secondary** Go-See beat (Claim 16 is Supporting).
- If fitting 35 slides would drop a beat Terry considers core, stop and ask.
  Do not cut it silently. The seed's shortening order is the default: the
  switching-cost follow-on, Preferred tests, section dividers, then one tension.

#### Key examples

1. **Count and cover.** The current deck renders **38** slides and its cover
   subtitle is "…and LeSS Can Learn from the TPS". After the change, presenter
   mode shows a total of about **33**, never more than **35**. The cover reads *Freedom and Entrustment*
   over *What AI-Augmented Development Can Learn from the Toyota Production
   System*.
2. **Climax placement.** Today "AI speeds whichever loop you feed" is slide 15
   of 38 (about 40%), before any jidoka or JIT slide. After the change, Terry
   pages to about slide 25 of 33 and lands on it. The loom's closed stop,
   Stop & Fix, same gates, and pull/CI all come earlier. Its notes point back
   to the early statement it pays off.
3. **Opening.** Paging from the cover, the diagnostic ("How do you know if the
   organization is using AI right? … more **freed** than **constrained**") and
   the theme appear by about slide 5. There is no long preamble before the key
   message.
4. **Talk roles on the tension slide.** Today "Tensions and honest limits"
   lists Claim 15 (Off-stage) and Claim 7 (Supporting) as peer bullets. After
   the change, Claim 15 is gone from the slide. Claim 23's honest-CI versus
   disposable-prototype pair carries the tension. Claim 7, if kept, is worded
   as a family resemblance, not a proven extension.
5. **Boundary: the ceiling.** A 31-slide deck with the climax at slide 23
   satisfies the story, as does 35 with the climax at 26. A 36-slide deck
   does not, however strong slide 36 is.
6. **Cut slide.** "Lower the switching cost" is cut to meet the count. It is
   absent from `slides.md` rather than marked `hide: true`, and
   `git log -p slides/tps-and-ai/slides.md` recovers it.

- **Evaluation:** Terry pages through the rendered deck in presenter mode. He
  confirms the count and the climax position and names the climax slide.
  Ideally he also tells the arc to a colleague and gets back the key message
  and the takeaways.
- **Effort hypothesis:** Largest editorial work in the set. The uncertainty is
  in narrative judgment, not tooling.
- **Depends on:** the talk roles in the [README](README.md) claim list.
- **Safe stopping point:** A complete, deliverable English deck at the limit.

<a id="storyline-art-cleanup"></a>
### Correction: the deck's art matches the accepted 30-slide storyline

**Identity:** tps-and-ai-talk#storyline-art-cleanup
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../.planning/quick/009-storyline-art-cleanup/PLAN.md","assessment":"ready","reasons":[],"basis":{"document":"84f9f6c02a9bea81ec65e32739b2071e6828fa4e03818cd4e40d6cc11bd4aaac","plan":"27633e6fa5ccd2b2f62ae589ea13e1f4585824344d1293f19c8b4a8851e96d04"}}
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
  the slide budget (30 slides accepted, at most 35). If they do not, the deck
  may need to reduce text density.
- **Boundary:** Translating the claims, the speaker notes, or a separate
  Japanese-only deck is out of scope unless Terry decides otherwise. The
  presentation format (same slide or alternate, placement, font) is decided at
  refinement.
- **Effort hypothesis:** Medium relative to the storyline story. The
  uncertainty is concentrated in the native review turnaround.
- **Depends on:** the accepted 30-slide English deck (the storyline story is
  done). Translating unstable text is waste.
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
