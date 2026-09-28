---
id: story-impact-animation
status: proposed-decomposition
created: 2026-09-28
created_during: A digression from the current near-future direction (the TPS and AI talk); a redo of the story-driven ("3D + 1") animation after Terry rejected the previous effort
trigger_when: When Terry chooses to spend time on the animation; it is not for the TPS and AI talk
scope: four queued candidate stories plus one conditional; S/M/L bands unassigned (no project definitions)
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

**Kept out of the picture:** the upper "ABC of Architecture" triangle, and human
judgment. The essay's judgment argument, including automated tests as spent
judgment, is not depicted. The essay's historical-negation argument is also
left out of the film.

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
- Open Dough is not named or depicted. Human judgment is not depicted.
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

<a id="full-cycle"></a>
### 3. Viewers follow the whole idea as stories come and go while the product stays coherent
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"unselected"}
```

- **For / why:** Viewers need the complete argument: stories are temporary
  transitions, while the product persists. Terry needs to assess pacing and the
  ending.

#### Goal

A viewer watches one complete, silent, captioned square film and comes away
with the whole idea: the product is a Behavior × Structure space moving through
Time; stories are romantic, boundary-crossing wishes that splash onto it;
development assimilates each splash into a coherent, changed product; spent
stories go to history; and a story is not a feature.

#### Scope

- **Required:**
  - A `terry-moves` composition, `StoryImpactFilm`: 1080×1080, 30 fps, about
    75–90 seconds, reproducibly rendered to an MP4.
  - The beats, in order:
    1. **Title:** "Romantic stories, disciplined products" (short).
    2. **Product space:** the axes grow and the tidy cells pop into place.
       Caption from the storyboard's first board.
    3. **Time and backlog:** the Time arrow grows, the tray slides in, and the
       balls bounce into it. Caption from the second board.
    4. **One story:** the one-story film's beats, from the wish to the story in
       history, reused as they are (not re-animated).
    5. **More stories over time:** at least two further stories (sun, then
       grape), each shorter: fly, splat across boundaries, wobble, assimilate,
       and go to history. New balls roll into the back of the tray, so the
       backlog never runs dry. Each story changes a different set of cells
       that crosses rows and columns; at least one cell changed by the pink
       story is changed again and ends split between two story colors. The
       product is aligned with no smear after every story, and the History box
       shows the spent balls stacked out of the way.
    6. **Story ≠ feature:** one story's cells are outlined together (they
       cross several Behavior columns and Structure rows), then one Behavior
       column, a feature, is outlined and shows colors from several stories.
    7. **Closing line:** "Stories should be romantic. Products should not." The
       tidy product rests; the next ball waits in the tray. Hold, then end.
  - Captions stay one at a time, each on screen for at least about 2.5
    seconds, in beat order.
- **Rejection constraints:** The seed's confirmed constraints still apply. No
  story may leave the product unaligned, smeared, or dripping at its end (no
  scars), and no story may leave it unchanged (no reset).
- **Deferred promises:** Audio, readability polish at phone size, the known
  label overlaps, and publication (story 4). Things *leaving* the product,
  and the essay's negation argument, are not shown.
- **Boundary assumptions (made on Terry's behalf):**
  - Length about 80 seconds. That is shorter than the rejected three-minute
    cut, which suits the lighter tone.
  - "Story ≠ feature" comes after several stories, not before the first
    splash as first listed. Only then does the product actually show one
    story across several features and one feature carrying several stories.
  - A cell carries several stories by being split among their colors: its
    current state is tidy, and not a record of scars.
  - The one-story film (`StoryImpactOneSplash`) stays available and unchanged.

#### Key examples

1. **The whole chain.** Given the rendered film, stills at each beat show, in
   order: title, product space, backlog, the pink story's wish to history,
   the sun and grape stories each splashing and being assimilated, story ≠
   feature, and the closing line.
2. **Stays coherent across stories.** At the end of each story's assimilation,
   every cell is aligned with no smear or splat, and more cells carry story
   colors than before that story.
3. **Story ≠ feature.** At the story ≠ feature beat, the outlined story cells
   span at least two columns and two rows, and the outlined column holds cells
   of at least two different story colors.
4. **History out of the way.** At the end, History holds every spent story
   (pink, sun, grape) in the order they were spent, and none of them is in
   the backlog.
5. **Captions and length.** Captions show in beat order, each for at least
   about 2.5 seconds, and the film runs 75–90 seconds.

- **Evaluation:** After watching silently, viewers can explain what separates a
  story from a feature, why the product has no scars, and where the old stories
  went. Terry judges fidelity, tone, and pacing end to end.
- **Value / learning:** Delivers the full explanation. Tests whether the splash
  language holds across several stories without becoming noisy.
- **Boundary:** Extends the one-story film's motion language rather than
  inventing a new one. Release polish, audio, and publication are out of
  scope.
- **Depends on:** The one-story film (`StoryImpactOneSplash`).
- **Safe stopping point:** A complete, watchable working cut with editable
  source and a reproducible export.

<a id="release"></a>
### 4. Terry has a finished animation ready to share
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Terry needs a dependable, shareable artifact that explains the
  idea on its own.
- **Visible outcome:** The final square export with resolved readability,
  pacing, and continuity, plus any agreed audio treatment.
- **Evaluation:** Watch it end to end at phone size, with and without sound.
  Terry judges the final effect.
- **Boundary:** Fixes issues observed in story 3. New formats and new scenes
  are new scope, and creating the export does not authorize publication.
- **Effort hypothesis:** Unbanded. Depends on feedback and on whether audio is
  added.
- **Depends on:** Story 3.
- **Safe stopping point:** The final export, its source, and its artwork are
  kept so the film can be re-rendered.

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
  The lighter tone may suit a shorter film. Settle this during story 3.
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

- Intention: [essay](romantic-stories-disciplined-products.md) and
  [flip chart](story-driven-product-space.jpg).
- The rejected effort can be recovered from Git: the original seed
  `e657ee8:Story Driven/seed.md` and the last seed `7a5ac06:Story Driven/seed.md`.
- Concept confirmation only: Open Dough's ADRs (`~/git/open-dough/docs/adrs`,
  for example ADR 0001, where Story is a romantic, speculative account) define
  the same concepts.
- [ADR-0000](../docs/adrs/0000-use-adrs-accepted.md) keeps durable
  decisions with Terry. This seed makes no platform decision.
