---
id: story-impact-animation
status: proposed-decomposition
created: 2026-09-28
created_during: A digression from the current near-future direction (the TPS and AI talk); a redo of the story-driven ("3D + 1") animation after Terry rejected the previous effort
trigger_when: When Terry chooses to spend time on the animation; it is not for the TPS and AI talk
scope: four delivered stories, improvement stories 6-10 (all delivered), and one conditional; S/M/L bands unassigned (no project definitions)
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
exception: when the customer reacts. He asked for the two stories below, in
this order. Each is a non-executable candidate. For each one, **Terry** judges
whether the film says what he means, and **representative viewers**
(developers and product people) are the audience it must work for.

<a id="calmer-screen-living-product"></a>
### 11. Viewers read one message at a time and see the product space change shape
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../.planning/quick/021-calmer-screen-living-product/PLAN.md","assessment":"ready","reasons":[],"basis":{"document":"e283a816e421a2682429256bd7da80911eccf85a765fe806dd547b2bcb7c98ac","plan":"56efd8c532cf80a9e5145fa9774441a702e1720b95766f0e28e47b6fe3abad25"}}
```

- **For / why:** Some moments show too much at once, and the product space
  looks frozen in size, even though real products grow and shrink.
- **Outcome:**
  - **One callout at a time.** The "customer-value focused" tag and the callout
    that explains what a user story is must never be on screen together. Show
    them one after the other so each moment carries one message. Check the
    rest of the film for other crowded moments.
  - **The space changes shape.** The Behavior and Structure extents (columns
    and rows) vary across stories, mostly growing but sometimes shrinking, so
    the product is visibly changing, not only expanding. Columns and rows may
    change by different amounts. It **must stay pretty**: tidy and
    deliberate, never jittery. If uneven changes look messy, use fewer and
    calmer changes.
- **Handed to story 12:** when the customer reacts. Terry now thinks the
  customer should react to what they can see, the behavior, and not to internal
  structure, which is invisible to them. The redesign of the reaction belongs
  to the impact story.

#### Goal

Viewers take in one message at a time, and see the product as a living
thing whose shape changes from story to story (mostly growing, once
shrinking), while it stays tidy.

#### Scope

- **Required:**
  - **The tag waits for the wish.** The wish bubble ("I wish I could split
    the bill…", the callout that says what a story is) shows alone. It pops
    away, and only then does the "customer-value focused" tag pop in, in a
    short beat of its own with the caption "It's focused on customer
    value." The tag is gone before the story turns fuzzy.
  - **One focus label at a time while assimilating.** "whole-product
    focused" names the outline while the product wobbles. As the developers
    start assimilating, that label gives way (in the same spot) to
    "judgment-intensive"; the dashed outline itself stays.
  - **The product changes shape.** The product starts at 4 Behavior columns
    × 4 Structure rows. The pink story adds a Behavior column (5 × 4), the
    sun story removes a Structure row (5 × 3), and the customer's idea adds
    a Behavior column (6 × 3). Each change happens once, while that story is
    assimilated: the wall eases to its new size and the new cells pop in
    along the new column, or the removed row's cells pop out before the wall
    eases in. The axes stay put: they are the space the product can grow
    into.
- **Rejection constraints:** nothing jitters: sizes change by whole
  columns or rows with eased motion, never in the same moment as another
  change of size; the "Product" label moves with the wall's top edge by at
  most a few px a frame; paint stays on the (current) wall; labels are not
  covered and stay readable at 360×360.
- **Deferred promises:** changing shape in the middle of a column or row
  (only the far column and the top row change); resizing during the
  opening; any new wording beyond the tag's caption.
- **Decisions made on Terry's behalf (delegated, 2026-09-29):**
  - "The callout that explains what a user story is" is read as the wish
    bubble. The tag gets its own beat and caption rather than sharing the
    fuzzy beat, which already carries its own message.
  - The size sequence 4×4 → 5×4 → 5×3 → 6×3: two growths and one shrink,
    columns and rows changing by different amounts, one calm change per
    story. The pink story's new column is its new behavior (one new cell
    takes pink). The sun story folds the (plain) top row away, a structure
    simplified. The idea grows only behavior, which story 12 uses as the
    cheap, option-exercising story.
  - To fit six columns without crowding the caption, the Behavior step on
    screen gets a little shorter; the axes are sized for the largest
    product.

#### Key examples

1. **Wish, then tag.** While the wish bubble shows, there is no tag; when
   the tag shows, the bubble is gone and the caption reads "It's focused on
   customer value."; while the story is fuzzy there is neither.
2. **One focus label.** During the wobble, "whole-product focused" shows
   and "judgment-intensive" does not; later in the assimilation it is the
   other way round.
3. **Shape over time.** The coherent product after the pink, sun and idea
   stories has 5×4, 5×3 and 6×3 cells; before the pink story it has 4×4.
4. **Tidy growth.** While a column is added, the wall's outline eases out
   and the new cells pop in one after another; no frame shows a cell
   outside the wall.

<a id="two-impacts-two-values"></a>
### 12. Viewers learn that a story's impact delivers two values: customer value and option value

- **For / why:** The film never says the word **impact**, yet impact is the
  point of a story. Terry's idea, restated: *the goal of a story is to make an
  impact, and the impact delivers two values.*
  - **Customer value (business impact):** the user value delivered to the
    user, which the user experiences.
  - **Option value:** the impact on the product's features and structure,
    which external users cannot see. "Option" as in a stock option or real
    option: something you do not have yet and have not paid for, but can buy
    later at low cost. It is not a feature, so you cannot build it directly.
    You get it by keeping things simple, keeping doors open and, above all,
    keeping the structure mapped to the best possible domain model. The
    realistic need of a real user is the chance to shape behavior and
    structure so that future stories in the domain come cheap.
- **Outcome:** In the middle of the film (after the splat has been
  assimilated), "impact" is named explicitly and split into the two values.
  The customer's reaction becomes the **customer value** beat: the customer
  experiences the behavior this story changed. Terry would rather the customer
  did not nod at the mess. A better option to evaluate is to highlight, with a
  boundary, the behavior this story touched, so that the customer reacts to
  that. The coordinator decides where the reaction goes (at the splash, after
  assimilation, or at the next story) as long as it does not break the
  narrative. The **option value** beat shows the invisible side: the tidy,
  domain-mapped structure makes a later story land cheaply. For example, a
  later story splashes and is assimilated visibly faster or more smoothly
  because it "exercises the option".
- **Wording:** there is little room for text. Capture the spirit with the
  fewest words and the best artistic representation, not a lecture.
- **Relation to existing beats:** the tests-and-domain beat (story 7) and
  "Judgment spent" already show part of this. Merge or re-caption them so
  that option value is not said twice.
- **Length:** the whole film may now run **2 to 2.5 minutes** (Terry,
  2026-09-29).

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
  improvements 6–10 (aimed at no more than about 120).
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
