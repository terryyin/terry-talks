---
id: story-impact-animation
status: proposed-decomposition
created: 2026-09-28
created_during: A digression from the current near-future direction (the TPS and AI talk); a redo of the story-driven ("3D + 1") animation after Terry rejected the previous effort
trigger_when: When Terry chooses to spend time on the animation; it is not for the TPS and AI talk
scope: four delivered stories, improvement stories 6-10 (6 and 7 delivered), and one conditional; S/M/L bands unassigned (no project definitions)
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

<a id="crisp-ending"></a>
### 8. Viewers leave with a crisp, powerful ending, and Terry is credited
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../.planning/quick/018-crisp-ending/PLAN.md","assessment":"ready","reasons":[],"basis":{"document":"9a430deb8dd0f7dbc61321bd3ea606a57effd67b23eaf2994bb83d80d0e52b20","plan":"6bd262ad1b5ab38c7634bcfe9bf1c82f2d85b0a1784538ce2bcc8d0e0bb9c5cf"}}
```

- **For / why:** The current close ("Stories should be romantic. Products
  should not.") should land harder and leave the viewer with one memorable
  message.
- **Outcome:** A short, punchy final beat that lands the key message, followed
  by an end credit to Terry Yin as the author of the idea and the film.
- **Order note:** it is best refined after stories 6, 7, 9 and 10 have
  shaped the film, but it has no hard prerequisite.

#### Goal

Viewers leave with the essay's one memorable message, "Stories should be
romantic. Products should not.", landed as a bold end card that mirrors the
opening title, and know the idea and film are Terry Yin's.

#### Scope

- **Required:**
  - After story versus feature, the product rests with the next ball eager
    (as now), captioned "Neither is better. They do different jobs." (the
    essay's "neither side is better", which the film's movement qualities
    already show but no caption says).
  - Then the whole stage shrinks away, like the title did at the start, and
    an end card plays on the empty paper in the title's own style: "Stories
    should be" pops in, "romantic." drops in letter by letter, big and
    bright, onto a paint splash, then "Products should not." snaps in over a
    ruled underline. The caption bar is gone for the card.
  - A credit then pops in under it: "An idea and film by Terry Yin". The
    card holds still for at least 2 s at the end.
  - The poster still is taken from the end card.
- **Rejection constraints:** the seed's style constraints; the card must be
  legible at 360×360; Open Dough is not credited or named.
- **Deferred promises:** music or sound, a logo, links or other credits.
- **Decisions made on Terry's behalf (delegated, 2026-09-29):**
  - The punchline is the essay's own final line, kept word for word, rather
    than a new slogan; the end card gives it the weight the caption bar
    could not.
  - The end card reuses the title's romantic and disciplined styles, so the
    film opens and closes on the same pair: bookends.
  - A final pass on the ending may follow stories 9 and 10 if they change
    what the ending should land.

#### Key examples

1. **The set-up.** Given the product at rest after story versus feature,
   the caption reads "Neither is better. They do different jobs." and the next
   ball hops eagerly.
2. **The punchline.** When the end card has played, it shows "Stories should
   be", "romantic." and "Products should not.", with no product, axes or
   caption bar.
3. **The credit.** The last frame shows "An idea and film by Terry Yin", and
   the last 2 s do not move.

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
