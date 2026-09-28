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

<a id="intention-storyboard"></a>
### 1. Terry recognizes his idea in a cartoon storyboard of one story's splash
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Terry needs to confirm the visual model and the cartoon tone
  before any motion work is invested.
- **Visible outcome:** A short sequence of square key frames (roughly 8–12)
  with one-line captions, covering:
  - the product grid (Behavior, Structure) and the Time axis;
  - the backlog of paint balls queued along Time;
  - one story shown as a romantic desire;
  - its ball flying in and splatting across several cells;
  - the messy product;
  - the splash assimilated into tidy, re-organized cells that keep the new
    color;
  - the spent ball gone and history quietly behind;
  - the next ball waiting.

  Frames may be rendered stills from `terry-moves` or generated artwork.
- **Evaluation:** Terry reads the frames in order and either says "yes, that is
  my idea, and the tone is right" or marks which frames misstate it.
  Automated checks do not establish acceptance.
- **Value / learning:** Tests the most consequential assumptions, the model and
  the tone, at the lowest cost. The frames also become the brief for later
  stories.
- **Boundary:** Stills and captions only: no motion, timing, or subtitle
  script.
- **Effort hypothesis:** Unbanded. Smallest in this set, with high uncertainty
  that is intentionally front-loaded.
- **Depends on:** None.
- **Safe stopping point:** An approved or annotated storyboard, which is useful
  on its own as an illustrated explanation.

<a id="one-story-journey"></a>
### 2. Viewers watch one story splash onto the product and become part of it
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Viewers need to see, in motion, the chain from desire to a
  changed, coherent product. Terry needs to judge the fun and the rhythm of
  splash and recovery.
- **Visible outcome:** A short square film of about 30–45 seconds, rendered in
  `terry-moves`, that animates the approved storyboard for a single story, with
  captions for this excerpt:
  1. The ball flies in.
  2. It splats across behavior and structure boundaries.
  3. The product wobbles, messy and unstable.
  4. Behavior is reconciled and structure reorganized, into a coherent product
     that is visibly changed.
  5. The spent story drifts back into history.
- **Evaluation:** Terry judges the movement and tone against the storyboard. A
  representative viewer is asked what changed, what remains, and where the
  story went, and their answers are recorded as given.
- **Value / learning:** Tests whether cartoon motion makes assimilation read
  clearly, not as a reset or as a permanent stain.
- **Boundary:** One story, from backlog to history. Several stories over time
  belong to story 3.
- **Effort hypothesis:** Unbanded. Carries the main motion uncertainty.
- **Depends on:** Story 1's storyboard, approved or revised.
- **Safe stopping point:** An independently watchable short explanation with
  editable source and a reproducible render.

<a id="full-cycle"></a>
### 3. Viewers follow the whole idea as stories come and go while the product stays coherent
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Viewers need the complete argument: stories are temporary
  transitions, while the product persists. Terry needs to assess pacing and the
  ending.
- **Visible outcome:** The complete square film, in these beats:
  1. The product space and the backlog along Time.
  2. What makes a story romantic.
  3. Story ≠ feature: one ball colors several cells, and a cell carries colors
     from many past balls.
  4. Story 2's splash and assimilation.
  5. More stories over time. The product keeps changing yet stays coherent and
     unscarred, while spent stories pile up out of the way in history.
  6. A closing line: stories should be romantic; products should not.
- **Evaluation:** After watching silently, viewers can explain what separates a
  story from a feature, why the product has no scars, and where the old stories
  went. Terry judges fidelity, tone, and pacing end to end.
- **Value / learning:** Delivers the full explanation. Tests whether the splash
  language holds across several stories without becoming noisy.
- **Boundary:** Extends story 2's motion language rather than inventing a new
  one. Release polish, audio, and publication are out of scope.
- **Effort hypothesis:** Unbanded. The broadest production work in the set.
- **Depends on:** Story 2.
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
  The lighter tone may suit a shorter film. Settle this during story 1 or 3.
- **Audio:** keep the film silent-first, with optional playful sound effects.
  Decide at release.

## When to surface

Whenever Terry chooses to digress from the TPS and AI work. Story 1 is cheap
enough to run alongside it.

## Breadcrumbs

- Intention: [essay](romantic-stories-disciplined-products.md) and
  [flip chart](story-driven-product-space.jpg).
- The rejected effort can be recovered from Git: the original seed
  `e657ee8:Story Driven/seed.md` and the last seed `7a5ac06:Story Driven/seed.md`.
- Concept confirmation only: Open Dough's ADRs (`~/git/open-dough/docs/adrs`,
  for example ADR 0001, where Story is a romantic, speculative account) define
  the same concepts.
- [ADR-0000](../docs/adrs/0000-use-adrs-accepted.md) keeps durable
  decisions with Terry. This seed makes no platform decision.
