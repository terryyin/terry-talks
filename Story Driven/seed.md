---
id: story-impact-animation
status: proposed-decomposition
created: 2026-09-28
created_during: A digression from the current near-future direction (the TPS and AI talk); a redo of the story-driven ("3D + 1") animation after Terry rejected the previous effort
trigger_when: When Terry chooses to spend time on the animation; it is not for the TPS and AI talk
scope: four delivered stories, improvement stories 6-10 and corrections 11-12 (all delivered), and one conditional; S/M/L bands unassigned (no project definitions)
---

# Story impact animation: romantic stories, disciplined products

## Parent problem and desired effect

For **developers and product people** who treat stories as features or as a
lasting description of the system, Terry's idea exists only as an
[essay](romantic-stories-disciplined-products.md) and a
[flip chart](story-driven-product-space.jpg). It should become a short,
playful, square animation that explains the idea. The idea has four parts,
the "3D + 1":

- A product is a space of **Behavior × Structure** that moves through
  **Time**.
- The **Product Backlog** holds romantic, fuzzy stories, queued along Time.
- A story hits the product and splashes across its boundaries.
- Development assimilates the splash into coherent behavior and structure,
  and the spent story leaves the present for history.

**Terry** evaluates whether the film expresses his intention. **Representative
viewers** evaluate whether they can say, after watching, what a story is for,
what remains in the product, and where the story went.

### Why redo it

The previous effort (script, visual proof, complete cut, and missile study,
built from `e657ee8` to `7a5ac06`) is reverted. Terry was not satisfied with it:
it was too serious, and its bomb and missile imagery was too intimidating. The
essay and the flip chart remain the authority for the idea. Open Dough defines
the same concepts in its ADRs and puts them into practice. It is used here only
to confirm the concepts. The film is not about Open Dough, and it does not
name Open Dough.

## The intention, recovered

The film must carry these points from the [essay](romantic-stories-disciplined-products.md):

1. **The product is a space.** At any moment it has a current state. Behavior
   (functionality, features) is what it does. Structure (design, components,
   architecture) is how it is organized. Time moves it from one coherent state
   to the next.
2. **The backlog belongs to Time.** Backlog items are possible transitions, not
   the current state.
3. **A story is romantic.** It is fictional, fuzzy, emotional, and does not
   care about the product's boundaries. It carries a desire and a desired
   impact in someone's world. That makes it good for imagining change and bad
   for describing state.
4. **Story ≠ feature.** A feature belongs to the product state, and a story
   belongs to a transition. One story can touch several features and
   components, and one feature is changed by many stories over time.
5. **Impact, twice.** The story carries an impact we want in the world, and it
   makes a physical impact on the product. It cuts across the product's
   organization, so behavior gets messy and structure gets unstable.
6. **Development is assimilation, not bolting on.** Behavior is reconciled into
   a coherent answer to "what does the product do now?" Structure goes from
   organized to disturbed to reorganized. The product ends coherent **now**,
   not as a battlefield scarred by every past hit.
7. **The spent story goes to history.** Once assimilated, the story has done its
   job. The current product describes what IS, not what WAS. History stays
   available (in Git) but out of the way, and the product is ready for the
   next story.

Stories and products are opposites that serve different purposes, and neither
is better. The film should give them different movement qualities: stories are
bouncy, splashy, and irregular, and the product is tidy and deliberate. Neither
should be shown as morally better.

**Kept out of the picture:** the upper "ABC of Architecture" triangle and the
essay's historical-negation argument. Human judgment and automated tests were
first kept out too. On 2026-09-29 Terry asked for them in improvement stories
7 and 10, so they now come in through those stories only.

## Confirmed constraints and direction

- The film is a digression from the current near-future direction (the TPS
  and AI talk) and is not made for that talk.
- The frame is **square**. The film is in English and silent-first, and the
  audience is developers and product people.
- **Genre: cartoonish and playful.** It should be lighter than the rejected,
  too-serious version.
- **Impact metaphor: a paint or water ball that splashes.** It is in the spirit
  of a paint-shooting game such as Nintendo's Splatoon, used only as
  inspiration: no copied characters, assets, or branding. A story is a
  colorful ball that flies from the backlog and splats across several cells of
  the product. Its color bleeds across behavior and structure boundaries.
  Assimilation turns the mess into tidy, re-organized cells that keep the new
  color where the change belongs. No bombs or missiles.
- Use only the lower diagram of the flip chart. Author, render, and keep the
  source in `terry-moves`. Generated artwork is allowed where it helps; it is
  not a quota, and no image model name is assumed.
- Open Dough is not named or depicted. Human judgment appears only as "?"
  thought bubbles and words (improvement 10), never as people judging.
- A finished export does not authorize external publication.

## Alternatives and decision

| Approach | Value | Decision |
| --- | --- | --- |
| Do nothing; keep the essay and flip chart | No production cost | Reject: Terry wants the animation |
| Restore and polish the reverted cut | Reuses work | Reject: Terry rejected its tone and imagery |
| Slowly reveal the flip chart with captions | The strongest simpler alternative, cheap and faithful | Keep as the fallback. It cannot show the splash being assimilated, or the story leaving for history |
| **Check the cartoon model in storyboard frames, then animate one splash, then the full film** | Tests recognition and tone before motion work, which is where the last effort failed | **Recommended** |

The highest learning priority: **does Terry recognize his idea, and enjoy the
tone, in cartoon splash frames before anyone animates them?**

## Candidate story decomposition

These are non-executable candidates. None of them authorizes execution.

## Improvement stories after the finished film (2026-09-29)

Terry watched the finished 88-second film, liked it, and asked for five
improvements (6–10). All five are delivered; see the breadcrumbs. The film
is now about 104 seconds.

## Corrections after the improved film (2026-09-29)

Terry watched the 104-second film. He confirmed that the History ball gets no
judgment label and accepted the other delegated decisions, with one
exception: when the customer reacts. He asked for two stories, 11 and 12,
both delivered (see the breadcrumbs). The film is now about 108 seconds;
Terry allowed up to 2.5 minutes.

## Reading pace (2026-09-29)

<a id="caption-reading-pace"></a>
### 14. Viewers, and Terry reading aloud, have time to read every caption

- **For / why:** In general the captions go by a bit faster than Terry can read
  them, and some are far too short. This also sets the time budget for Terry's
  voice-over (story 13), so it comes first.
- **Outcome:**
  - Each caption's on-screen time is re-measured from its sentence length,
    counted in syllables, not a fixed slot. The baseline is about **1.2× the
    current durations** overall. Captions that are too short for their
    syllable count get more time. The timing is a rule in code (syllables to
    seconds, with a minimum hold), not hand-tuned numbers, so a reworded
    caption re-times itself.
  - **Breathing pauses:** find the places where the film should leave a
    pause, such as after a splat, before a key line, or between the two
    values, so that captions do not fill all the time. Terry can then breathe
    while narrating and viewers can take in the picture.
  - The animation beats stretch with their captions and stay in sync. The
    storyboard boards still match. The film can grow and stays within Terry's
    2 to 2.5 minute allowance.
- **Evaluation:** Terry reads every caption aloud at a comfortable pace
  against the render without being cut off.

## Voice-over (2026-09-29)

<a id="terry-voice-over"></a>
### 13. Viewers hear Terry narrate the film in his own voice

- **For / why:** The film is silent, and the captions carry it. Terry wants to
  record himself reading the captions so that viewers hear the idea from its
  author.
- **Outcome:** The rendered film carries Terry's recorded narration, one
  recorded line per caption, played in sync with each caption. Where a
  recording is longer or shorter than its caption's slot, the beat's timing
  adapts rather than cutting him off or leaving dead air. The captions stay
  on screen (silent-first viewing still works). Re-recording one line and
  re-rendering does not require manual timing repair elsewhere.
- **Inputs from Terry:** his audio recordings. Refinement defines the
  recording format and file naming, and the script (the caption list, in film
  order) he reads from.
- **Out of scope:** speech coaching. Terry judged automated delivery and
  pronunciation feedback not useful.
- **Assumption:** Terry asked for "the module for it". This is read as the
  audio (voice-over) for the film. Correct it if another module was meant.
- **Relation:** this may expose the authoring gap in conditional story 5
  (revise a scene without repairing unrelated timing).

## Conditional candidate

<a id="authoring-improvement"></a>
### 5. The author can revise a scene without repairing unrelated timing (conditional, not queued)

- **For / why:** Terry or the animation author can change wording or pacing
  without manual repair elsewhere.
- **Selection condition:** Choose this only when stories 2 or 3 expose a
  concrete authoring gap in `terry-moves`. Demonstrate the same edit before and
  after the improvement.
- **Effort hypothesis:** Cannot be sized until a gap is observed.

## Ordering and scope reduction

Order: 1 → 2 → 3 → 4. Story 1 comes first because the last effort failed on
intention and tone, not on production quality. Story 2 comes before 3 because
a splash that reads as assimilation, rather than as a reset or a stain, is the
hardest motion to get right.

- **Safe stopping points:** A storyboard alone is an illustrated explanation,
  and the one-splash film is a standalone explainer.
- **Reduce scope in this order:** first optional audio, then decorative
  artwork, then the number of extra stories in story 3's "over time" beat.
- **Keep the core:** the splash across boundaries, assimilation into a
  coherent changed product, and the story going to history.

## Open decisions

- **Length of the full film:** the previous effort used about three minutes.
  Settled at about 88 seconds for the lighter tone; about 104 seconds after
  improvements 6–10; about 108 seconds after corrections 11–12 (Terry
  allowed up to 2.5 minutes).
- **Audio:** keep the film silent-first, with optional playful sound effects.
  Decide at release.

## When to surface

Whenever Terry chooses to digress from the TPS and AI work. Story 1 is cheap
enough to run alongside it.

## Breadcrumbs

- The storyboard for one story's splash is done: eleven boards drawn in
  `terry-moves` (`StoryImpactStoryboard`), with the contact sheet at
  [storyboard.png](storyboard.png). Terry delegated the review. The
  coordinator checked the boards against the recovered intention and accepted
  them; Terry's own verdict can still revise them. The example wish is "I wish
  I could split the bill with friends in one tap!"
- The one-story film is done: `StoryImpactOneSplash` in `terry-moves`
  (about 34 seconds) carries the wish through flight, splat, wobble,
  assimilation, and history to the next story, passing exactly through the
  storyboard's boards. No representative viewers were available to the
  delegated coordinator, so no viewer answers are recorded.
- The full film is done: `StoryImpactFilm` (about 88 seconds) adds a title,
  the product space and backlog, the sun and grape stories, a story versus
  feature beat, and the closing line "Stories should be romantic. Products
  should not." Story versus feature comes after several stories, so that the
  product can actually show it.
- The customer feedback loop is done (improvement 6): after the pink story is
  assimilated, a flat cartoon customer nods, gets a light-bulb idea, and the
  new teal ball lands second in the backlog while the two balls behind it
  swap; that idea becomes the second later story. Decided on Terry's behalf:
  the customer reacts after assimilation (customers feel the delivered
  product, not the mess), grape and lime swap behind the idea, and the
  developers are named in the caption rather than drawn. Recoverable from
  `ad445f5`.
- Tests and the domain are done (improvement 7): after the pink story is
  coherent, green test shields pop onto every Behavior column, then the
  Structure rows link to domain concepts from the wish (Payment, Bill, Share,
  Friend). Decided on Terry's behalf: this is the film's one picture of spent
  judgment, which story 10 names. Recoverable from `51f35b4`.
- The crisp ending is done (improvement 8): the product rests under "Neither
  is better. They do different jobs.", then the stage shrinks away and an end
  card in the title's styles lands "Stories should be / romantic. / Products
  should not." with the credit "An idea and film by Terry Yin". Decided on
  Terry's behalf: keep the essay's own last line as the punchline and mirror
  the title as bookends. Recoverable from `0aab574`.
- The two focuses are done (improvement 9): the first story wears a
  "customer-value focused" tag while it hovers, and once it splashes the
  whole wall is outlined as "whole-product focused" until it is coherent.
  Decided on Terry's behalf: the tag hangs from the ball on a string (right
  below it would cross the Structure axis), and the whole-product focus is
  an outline around the whole wall. Recoverable from `b637fdf`.
- Judgment is done (improvement 10): while the first splash is assimilated,
  "judgment-intensive" and "?" thought bubbles show; the test shields are
  captioned "Judgment spent: tests guard what it does…", the only place the
  film says it. Decided on Terry's behalf: the ball going to History gets
  **neither** "judgment archived" nor "judgment forgotten". "Forgotten"
  contradicts Git keeping history available; "archived" would blur that the
  spent judgment lives in the product as decisions while only the
  deliberation (the story) goes to history. Recoverable from `8e7ab0b`.
- One message at a time and a changing shape are done (correction 11): the
  wish bubble shows alone, then the "customer-value focused" tag in its own
  beat ("It's focused on customer value."); "whole-product focused" gives way
  to "judgment-intensive" in the same spot. The product starts at 4 × 4 and
  goes 5 × 4 (pink adds a Behavior column), 5 × 3 (sun folds the plain top
  row away), 6 × 3 (the idea adds a column), easing calmly. Decided on
  Terry's behalf: "the callout that explains what a user story is" is the
  wish bubble; one calm change per story, only at the far column or top row;
  a slightly shorter Behavior step so six columns fit. Recoverable from
  `9272290`.
- Impact and its two values are done (correction 12): once the pink story
  is coherent, an "impact!" burst splits into a "customer value" pill (a
  heart) and an "option value" pill (a key). Customer value: the Behavior
  columns the story touched are outlined and the customer, seeing only
  behavior, gets hearts, nods and the idea. Option value, unseen by users:
  the shields and domain links, re-captioned "judgment spent on tests… and
  on a structure that maps the domain". The customer's idea is the cheap
  story that exercises the option: a smaller splash, fewer knocked cells,
  about half the product work of the sun story, while the key glints.
  Decided on Terry's behalf: the customer reacts after assimilation, to the
  outlined behavior (not at the splash, and not at the next story, which
  would split the pink story's two values apart); option value is explained
  once and exercised once; "judgment spent" is how the option is bought;
  the film stays near two minutes rather than stretching to 2.5.
  Recoverable from `1466af8`.
- The storyboard now has 17 boards (named after the beats they end on); its
  contact sheet is refreshed.
- The animation is finished and ready to share:
  `pnpm -C terry-moves render:story-impact` writes
  `terry-moves/out/story-impact-animation.mp4` and its poster. It is silent
  (no sound assets with a known license; the captions carry it). Nothing has
  been published.

- Intention: [essay](romantic-stories-disciplined-products.md) and
  [flip chart](story-driven-product-space.jpg).
- The rejected effort can be recovered from Git: the original seed
  `e657ee8:Story Driven/seed.md` and the last seed `7a5ac06:Story Driven/seed.md`.
- Concept confirmation only: Open Dough's ADRs (`~/git/open-dough/docs/adrs`,
  for example ADR 0001, where Story is a romantic, speculative account) define
  the same concepts.
- [ADR-0000](../docs/adrs/0000-use-adrs-accepted.md) keeps durable
  decisions with Terry. This seed makes no platform decision.
