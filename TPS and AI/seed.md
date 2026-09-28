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

<a id="conference-ready"></a>
### 4. Terry can deliver the talk reliably on conference day
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../.planning/quick/011-conference-ready/PLAN.md","assessment":"ready","reasons":[],"basis":{"document":"2b2d0719ed52eb50aeff29a10f079824db44e53d4cd929580cd8ad43c6699955","plan":"342982957147db8417c189a7f3670a7e21e0074f7ff3f8a5b0a7b2264fd1416d"}}
```

#### Goal

For **Terry**, presenting at 15:45 on 8 October 2026 at the Tokyo LeSS
Conference, the finished bilingual *Freedom and Entrustment* deck becomes a
performance he can count on. Terry fits the 45-minute talk with 15 minutes
left for Q&A, and the climax falls near the three-quarter mark. Speaker notes
are cues he can glance at while speaking. If the network or the venue fails,
the talk still runs from his own laptop, and he has backups. This delivers
the direction's "ready to present". Its learning question is whether the
accepted deck fits the slot at Terry's real pace.

#### Scope

**Decided with Terry (2026-09-28):**

- **Speaker notes are short spoken cues.** Each slide's note becomes 2–5 short
  lines of what Terry says. Each doughnut example becomes a one-line spoken
  story. Claim numbers, commit hashes, class names, and editorial rationale
  come out of the notes, because the [claims](claims/) hold the reasoning.
- **Presentation machine: Terry's own Mac,** running presenter mode through
  `pnpm present` from this repository. The backups are a PDF export and a
  static build, kept on the laptop and on a USB stick. A venue PC is not a
  planned path.
- **Generated art credit:** One line on the end slide credits the AI-generated
  illustrations, with its Japanese beneath it. Every third-party image keeps
  or gains its license credit on its own slide.
- **Timing support:** A few elapsed-time checkpoints go in the notes. Terry
  runs the timed rehearsal himself. The changes Terry reports are then
  applied.

**Required:**

- **Timing checkpoints:** The notes carry elapsed-time checkpoints at the end
  of the opening act, at the climax ("AI speeds whichever loop you feed",
  about 34:00 of 45:00), and at the start of the closing. Each checkpoint
  moves with its slide if slides change.
- **Rehearsal changes stay within the limits:** After a rehearsal, Terry's
  reported cuts, reorders, and wording changes are applied. Any overrun is
  cut in the seed's [scope-reduction order](#ordering-and-scope-reduction).
  The deck stays at 35 rendered slides or fewer. The protected beats listed
  there are cut only if Terry says so.
- **Bilingual stays true:** A slide whose English changes also gets its
  Japanese updated. The slide is then listed as not yet reviewed by Aki,
  under the review rule in
  [japanese-review.md](../slides/tps-and-ai/japanese-review.md#keeping-the-deck-bilingual).
- **Runs offline:** With the network off on Terry's Mac, `pnpm present`
  opens presenter mode. Every slide renders its Japanese glyphs, mermaid
  diagrams, and images, and the loom video plays.
- **Backups open offline:** The PDF has one page per slide. Its "Smart →
  dumb → gone" slide shows the still loom-mechanism image where the video
  plays live. The static build opens on the laptop with
  the network off. Both are also copied to a USB stick. Terry does the copy.
- **Credits:** Every third-party image or graphic shows its source and license
  on-slide. At present these are the Toyota reconstruction, the less.works CC
  graphics, the Wikimedia CC0 loom photo, and the AllAboutLean CC BY-SA photo.
  The end slide carries the generated-art credit.
- **Commands:** The existing build, export, and `pnpm present` commands keep
  working.

**Rejection constraints:**

- **More than 35 rendered slides** fails Terry's limit.

**Deferred** (not built or verified here):

- Recording, publishing the slides online, and follow-up blog posts.
- Japanese speaker notes, handouts, and a venue-PC run as a primary path.
- Per-slide time budgets.

**Assumptions:**

- **Evidence removed from the notes:** If a commit hash or evidence detail
  in the notes appears in no claim file, it moves into the matching claim
  instead of being lost.
- **Rehearsal inputs:** Terry reports rehearsal results as elapsed times at
  the checkpoints plus the slides to change. The agent does not time anything.
- **Credit wording:** The proposed end-slide line is "Illustrations generated
  with AI by Terry Yin". Terry may reword it.

**Open question (Terry):**

- **Stale cut order.** Items 2 and 3 of the
  [scope-reduction order](#ordering-and-scope-reduction) name a "Preferred
  tests" slide and section dividers. Neither exists in the accepted 30-slide
  deck. Before rehearsal, Terry decides which current slides come next in
  line to be cut. Until then, only items 1 and 4 apply.

#### Key examples

1. **Spoken cues.** Today the "Smart → dumb → gone" note lists
   `RecallStatsPerformanceTest`, `getPrepareStatementCount()`, and three
   hashes. After the change it reads as short cues, such as "Dumb: a test now
   stops the 200-recall timeout from coming back" and "Gone: illegal path
   characters can no longer be typed into a name". It contains no claim
   numbers and no hashes.
2. **Climax checkpoint.** The note on "AI speeds whichever loop you feed"
   starts with "⏱ ~34:00". In rehearsal Terry reaches it at 38:00 and reports
   the overrun. The cut order is applied to what still exists. First the
   spoken "lower the switching cost" follow-on is dropped from the notes.
   Then "Tensions and honest limits" is shortened to the one tension from
   Claim 23. The deck stays at 30 slides, and each checkpoint stays on its
   slide.
3. **Wi-Fi off.** With Wi-Fi off on the Mac, Terry runs `pnpm present`. Presenter
   mode shows the notes. 現地現物 and the other Japanese render in a proper
   Japanese font. The "AI speeds whichever loop you feed" mermaid diagram
   draws, and the loom warp-stop video loops.
4. **PDF fallback.** In the exported PDF, the "Smart → dumb → gone" slide
   shows the still `loom-jidoka-mechanism.png` clearly where the loom video
   would play. The page count
   equals the deck's slide count.
5. **Credits.** The end slide reads "Illustrations generated with AI by Terry
   Yin", with its Japanese beneath it. The Type G dropper photo slide still shows
   "Christoph Roser, AllAboutLean.com · CC BY-SA 4.0".
6. **Changed wording after rehearsal.** Terry shortens one bullet on "The
   gates do not care who authored the change". Its Japanese line is updated
   to match, and the slide is listed as not yet reviewed by Aki.

- **Evaluation:** Terry does a full timed rehearsal in presenter mode on the
  Mac with the network off and hits the checkpoints within about a minute.
  He opens the PDF and the static build from the USB stick.
- **Effort hypothesis:** Small to medium. The uncertainty is how much the
  rehearsal changes.
- **Depends on:** the bilingual deck (done; see
  [japanese-review.md](../slides/tps-and-ai/japanese-review.md)). Final timing is rehearsed on the
  bilingual deck. Rewriting the notes and adding the credits touch the same
  `slides.md` as that story, so they follow it or are coordinated with it.
- **Safe stopping point:** Spoken-cue notes with checkpoints, verified offline
  presenting, and PDF and static-build backups. Rehearsal changes follow on
  top.

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
  ([japanese-review.md](../slides/tps-and-ai/japanese-review.md)).
- ~~**Conference-day readiness.**~~ Decided 2026-09-28: the notes become
  short spoken cues with elapsed-time checkpoints. The talk runs from Terry's
  Mac through `pnpm present`, with the PDF and static-build backups on the
  laptop and a USB stick. One generated-art credit goes on the end slide
  ([conference-ready](#conference-ready)).

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
