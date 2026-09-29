---
id: story-impact-animation
status: proposed-decomposition
created: 2026-09-28
created_during: A digression from the current near-future direction (the TPS and AI talk); a redo of the story-driven ("3D + 1") animation after Terry rejected the previous effort
trigger_when: When Terry chooses to spend time on the animation; it is not for the TPS and AI talk
scope: four delivered stories, five queued improvement stories (6-10), and one conditional; S/M/L bands unassigned (no project definitions)
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

## Improvement stories after the finished film (2026-09-29)

Terry watched the finished 88-second film, liked it, and asked for these five
improvements. They are listed in his order. Each is a non-executable
candidate: refinement and slice planning come before execution. For each one,
**Terry** judges whether the film now says what he means, and
**representative viewers** (developers and product people) are the audience
it must work for.

<a id="customer-feedback-loop"></a>
### 6. Viewers see a story's business impact come back as a new idea in the backlog
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../.planning/quick/016-customer-feedback-loop/PLAN.md","assessment":"ready","reasons":[],"basis":{"document":"59cd5dcd51f55f7ebd6dcbb25d317016cd79f338d45a0c8f5d2aa6c33d763edf","plan":"4ec2db82b378043720ba735f986f3d8aad7afee046e719591de9f74ef8f46988"}}
```

- **For / why:** Viewers currently see only half of a story's impact. The splash
  on the product (features and structure, which developers must assimilate)
  is shown. The business impact on the customer is not.
- **Outcome:** After the splat, a customer stands in front of the product,
  looks at the splash, and reacts (nods). A light bulb appears over their head,
  and a new idea (a new story ball) flies back into the Product Backlog. It
  goes in as the **second** item, and the two existing items swap places, so
  the backlog is visibly both **inserted into and reordered**.
- **Also in scope:** make the existing product-impact half read more clearly as
  assimilation *by the developers*, so that the two impacts are clearly
  separate.
- **Character decision (Terry agreed, 2026-09-29):** the customer is a **flat
  2D cartoon character** in the film's existing style, not 3D. A 3D figure would clash with the flat, bright genre
  that Terry just approved, and it would cost much more to make and change.
  Use a simple silhouette and face with no copied characters.

#### Goal

Viewers see both impacts of one story as two separate things: the product
impact, which the **developers** assimilate, and the business impact on a
**customer**, which comes back as a new idea that reshapes the backlog. This
closes the loop from the world back to Time.

#### Scope

- **Required:**
  - A customer beat in the pink (first) story, after the product is coherent
    again. A flat 2D cartoon customer pops up in front of the product (the
    free space just below the wall's origin, above the caption bar), looks up
    at the pink cells, and nods. A light bulb pops over their head, a new
    teal ball comes out of it and bounces into the tray as the **second**
    ball, and the two balls behind it swap places. Then the customer leaves.
  - Captions for it, each on screen for at least 2.5 s: "A customer feels the
    impact… and gets a new idea!" then "New ideas join the backlog, and it's
    reordered."
  - The assimilation caption says who does it: "Developers assimilate the
    splash…" (was "Development assimilates the splash…"), on the storyboard
    board as well.
  - The customer's idea is the second later story: after the sun story, the
    teal idea (not the grape) is launched, splats, is assimilated and goes to
    History. The sun story drops no refill ball (the idea took its place);
    the idea story still drops the orange refill.
- **Rejection constraints:** the seed's confirmed constraints (flat, bright,
  playful 2D; no bombs or missiles; Open Dough never named or shown; no copied
  characters). No ball ever covers the "Product Backlog" label.
- **Deferred promises:** customers for the later stories, speech from the
  customer, any customer-journey detail, and drawing the developers as
  characters.
- **Decisions made on Terry's behalf (delegated, 2026-09-29):**
  - **When the customer reacts:** after assimilation, not at the moment of the
    splat. A customer feels a story's business impact through the delivered,
    coherent product; reacting to the fresh mess would suggest customers use
    half-built work. The customer still looks at the story's splash of color,
    now assimilated into the product.
  - **Which items swap:** the new idea goes in second, and the two balls
    behind it (grape and lime) swap, so the queue is sun, idea, lime, grape.
    The front ball (sun) keeps its turn, so the film's next story stays the
    one already eager.
  - **Developers:** made explicit through the caption rather than new
    characters, to keep the film tight.

#### Key examples

1. **The customer reacts.** Given the pink story's coherent product, when the
   customer beat plays, a customer appears below the wall, nods at least once,
   and a light bulb shows over their head.
2. **Inserted and reordered.** Given the backlog sun, grape, lime before the
   beat, when it ends, the backlog is sun, idea (teal), lime, grape, and every
   ball moved there smoothly (no jumps).
3. **The idea becomes a story.** Given the rest of the film, when it ends,
   History holds pink, sun and the teal idea, in that order.
4. **Two impacts read apart.** The product impact is captioned as the
   developers' assimilation; the customer's impact has its own beat and
   caption.

<a id="protected-and-mapped"></a>
### 7. Viewers see that behavior is protected by tests and structure maps to the domain

- **For / why:** Viewers should understand what keeps the assimilated product
  coherent. The film shows the result but not the discipline behind it.
- **Outcome:** A brief, strengthening beat or caption. The **Behavior** side is
  shown protected by automated tests (mostly end-to-end tests), for example as a
  guard or shield on the feature cells. The **Structure** side, the
  architecture, is shown mapping directly to the domain model, for example with
  links from the structure cells to domain concepts. The beat must stay short
  and playful and must not become a lecture.

<a id="crisp-ending"></a>
### 8. Viewers leave with a crisp, powerful ending, and Terry is credited

- **For / why:** The current close ("Stories should be romantic. Products
  should not.") should land harder and leave the viewer with one memorable
  message.
- **Outcome:** A short, punchy final beat that lands the key message, followed
  by an end credit to Terry Yin as the author of the idea and the film.
- **Order note:** it is best refined after stories 6, 7, 9 and 10 have
  shaped the film, but it has no hard prerequisite.

<a id="value-vs-whole-product-focus"></a>
### 9. Viewers see that a story is customer-value focused and development is whole-product focused

- **For / why:** The two sides need two different focuses, and the film does
  not name them.
- **Outcome:** When a story is taken from the backlog, a label beneath the ball
  says it is **customer-value focused**. When it splashes onto the product, the
  film says the work is now **whole-product focused**.
- **Source of the term:** use the whole-product view from Open Dough's
  ADR 0002 (principle 1, "Centralized product focus and customer view", and
  principle 2, "keeping the solution cohesive with the whole product") to
  confirm the concept only. The film still does not name Open Dough.

<a id="judgment-intensive-to-spent"></a>
### 10. Viewers see that assimilation is judgment-intensive and leaves spent judgment in the product

- **For / why:** This is the essay's judgment argument, which Terry now wants in
  the film.
- **Outcome:** While a story is being assimilated, the development work is shown
  as **judgment-intensive** (the term from the TPS and AI talk, Claim 00). The
  resulting product holds **spent judgment** (the essay's "Automated tests
  are an example of spent judgment", and ADR 0002 principle 5, "Reduce the
  judgment left in the repository").
- **Open decision:** the story ball that goes to history (Git) might be labeled
  "judgment archived" or "judgment forgotten". Terry has not decided. Refinement
  proposes one of them, or neither.
- **Relation to story 7:** tests are the spent-judgment example, so refine 7
  and 10 together so that they do not say the same thing twice.

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
