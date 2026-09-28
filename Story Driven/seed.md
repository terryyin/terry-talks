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

<a id="release"></a>
### 4. Terry has a finished animation ready to share
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../.planning/quick/015-release/PLAN.md","assessment":"ready","reasons":[],"basis":{"document":"6067ebca6624d56e9e3a6ebb77a126106e5a21d931869a1947a88c2a535813ac","plan":"d128ce64841adaf17940dc5bbf48ffda68fa1e8b3fe9d9e434de5a4a52f17a15"}}
```

- **For / why:** Terry needs a dependable, shareable artifact that explains the
  idea on its own.

#### Goal

Terry has one final square MP4 of the full film that reads cleanly at phone
size, plays without visual glitches, and can be re-rendered from the source
with one documented command.

#### Scope

- **Required:**
  - Resolve the continuity glitches observed in the full film:
    - the "Product Backlog" label jumps when the front ball turns eager or
      leaves the tray;
    - take-off and refill balls cross that label;
    - the flying ball switches abruptly from smooth to fuzzy;
    - splat droplets land past the product wall's edge;
    - the "a feature" label appears late in its beat;
    - the drifting spent ball crosses the "History" label.
  - Readability at phone size: at 360×360 pixels, every caption and the
    axis, backlog and History labels can still be read. Enlarge small text
    such as "how it's built", "what it does" and "(in Git)", or drop it if
    enlarging does not work.
  - A final export, `terry-moves/out/story-impact-animation.mp4`: H.264,
    1080×1080, 30 fps, playable in ordinary players (yuv420p). It is rendered
    from `StoryImpactFilm` with one documented command, and a poster still
    goes with it.
- **Rejection constraints:** The seed's confirmed constraints still apply.
  The storyboard boards and the film's story beats keep their meaning: this
  is polish, not new scenes.
- **Deferred promises:** Audio and sound effects, other formats (vertical,
  landscape, GIF), subtitle files, translations, and publication.
- **Boundary assumptions (made on Terry's behalf):**
  - **Audio:** the film ships silent. It was designed silent-first, the
    captions carry it, and the repo holds no sound assets whose license is
    known. Sound effects can be added later.
  - **Where the export lives:** it stays under the git-ignored
    `terry-moves/out/`. Git keeps the source and the render command, not the
    video.
  - **Timing:** pacing stays as it is (about 88 s). The captions already meet
    the 2.5-second minimum.

#### Key examples

1. **Phone size.** Given stills of every beat scaled down to 360×360, when
   viewed, every caption and every label is legible, and no label is covered.
2. **No jumps.** Given the frames around a ball leaving the tray or turning
   eager, when consecutive frames are compared, the "Product Backlog" label
   moves smoothly or not at all.
3. **Paint stays on the product.** Given any splat frame, every droplet lies
   within the product wall's outline.
4. **Export.** Given the render command, when it runs, it writes
   `out/story-impact-animation.mp4`. ffprobe shows h264, yuv420p, 1080×1080,
   30 fps, and about 88 s, and a poster PNG sits beside it.

- **Evaluation:** Watch it end to end at phone size, with and without sound.
  Terry judges the final effect.
- **Boundary:** Fixes issues observed in the full film. New formats and new
  scenes are new scope, and creating the export does not authorize
  publication.
- **Depends on:** The full film (`StoryImpactFilm`).
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
  Settled at about 88 seconds for the lighter tone.
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

- Intention: [essay](romantic-stories-disciplined-products.md) and
  [flip chart](story-driven-product-space.jpg).
- The rejected effort can be recovered from Git: the original seed
  `e657ee8:Story Driven/seed.md` and the last seed `7a5ac06:Story Driven/seed.md`.
- Concept confirmation only: Open Dough's ADRs (`~/git/open-dough/docs/adrs`,
  for example ADR 0001, where Story is a romantic, speculative account) define
  the same concepts.
- [ADR-0000](../docs/adrs/0000-use-adrs-accepted.md) keeps durable
  decisions with Terry. This seed makes no platform decision.
