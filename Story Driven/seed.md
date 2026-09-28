---
id: story-impact-animation
status: proposed-decomposition
created: 2026-09-28
created_during: Redo of the story-driven ("3D + 1") animation after Terry rejected the previous effort; not the current near-future direction (TPS and AI talk)
trigger_when: After the TPS and AI talk is conference-ready, or when Terry selects the animation again
scope: four queued candidate stories plus one conditional; S/M/L bands unassigned (no project definitions)
---

# Story impact animation: romantic stories, disciplined products

## Parent problem and desired effect

For **developers and product people** who treat stories as features or as a
lasting description of the system, Terry's idea exists only as an
[essay](romantic-stories-disciplined-products.md), a
[flip chart](story-driven-product-space.jpg), and its working implementation,
Open Dough (`~/git/open-dough`). It should become a short
animation that explains the idea. The idea is a product space of **Behavior ×
Structure** that moves through **Time**, plus one more element: a **Product
Backlog** of romantic, fuzzy stories. Each story impacts the product and is
assimilated into coherent behavior and structure. Judgment is spent into
decisions, and the spent story leaves the present for history. This is the
"3D + 1".

**Terry** evaluates whether the film expresses his intention. **Representative
viewers** evaluate whether they can say, after watching, what a story is for,
what remains in the product, and where the story went.

### Why redo it

The previous effort (script, visual proof, complete cut, and missile study,
built from `e657ee8` to `7a5ac06`) is reverted. Terry was not satisfied with it,
and it drifted toward a literal spectacle: a single projectile, one big
explosion inside the product, and one long recovery. The intention is better
expressed by Open Dough, which is where Terry actually practises the idea.

## The intention, recovered

These are the points the film must carry. The Open Dough source for each is in
[Breadcrumbs](#breadcrumbs).

1. **Three related dimensions, not a hierarchy.** Story, Feature (behavior),
   and Structure are separate. A story *changes* the product. Features and
   structure *describe* the product after the story is complete. A story can
   cut diagonally across many features and components, and one feature or
   component carries decisions from many stories.
2. **A story is romantic.** It is fictional, fuzzy, emotion-provoking, and it
   crosses boundaries. It is shaped by a human desire and a desired
   (business) impact. That makes it good for planning and bad for describing
   the system.
3. **Impact, twice.** The story carries an impact we want in the world, and it
   makes a physical impact the product must survive.
4. **The impact arrives as slices, not as one missile.** Decomposition is
   fractal: problem → story → slices. Each slice moves the product along
   exactly one axis:
   - A **Structure** slice reshapes the organization without changing
     behavior, and prepares the next Behavior slice.
   - A **Behavior** slice changes what the product does, with outside-in proof.
5. **Disturbance is local and brief.** Each slice disturbs the product only
   inside its uncommitted change. Refactoring then restores coherence before
   commit. At every slice boundary the product is green and coherent, which
   makes it a safe stopping point. There is never a lasting battlefield.
6. **Assimilation reshapes what already exists.** Before adding, look across
   the whole product and reuse, change, or modularize what is there (Proudly
   Found Elsewhere). Each concept keeps one representation. The ripple reaches
   existing blocks, so the change is not a new block bolted on.
7. **Judgment is spent into decisions.** Deliberation turns into closed
   decisions, encoded in tests (green or red, no judgment needed to run),
   feature docs, and ADRs. Humans own the decisions. The resulting product
   leaves as little judgment as possible for the future.
8. **The spent story goes to history.** It is committed, then deleted from the
   current snapshot. Git keeps it: available, but not in the way. The product
   describes what IS, not what WAS, and carries no scars or historical
   negations.
9. **The backlog is a living queue along Time.** A near-future direction orders
   it. Items are reordered by value and learning, some are dropped and never
   land, one is Taken at a time, and a correction can jump to the front.
10. **Learning feeds back.** A retrospective compares the result with the
    intention and returns learning to the backlog. The product ends coherent
    and ready for the next story. It is not finished.

Stories and products are opposites that serve different purposes, and neither
is better. The film should give them different movement qualities: stories are
expressive and irregular, and the product is legible and deliberate. Neither
should be shown as morally better.

## Confirmed and carried-forward constraints

Carried forward from Terry's answers during the previous decomposition. Terry
did not withdraw them when he rejected the animation itself:

- The audience is developers and product people. The film is in English and
  silent-first: it must be understood without audio.
- Use only the lower diagram of the flip chart. The upper "ABC of
  Architecture" triangle stays out.
- Author, render, and keep the source in `terry-moves`. Generated artwork is
  allowed where it helps. It is not a quota, and no image model name is
  assumed.
- A finished export does not authorize external publication.

The square frame, the three-minute length, and the 1080 × 1080 / 30 fps
delivery were properties of the rejected effort. They are proposals here,
listed under [Open decisions](#open-decisions).

## Alternatives and decision

| Approach | Value | Decision |
| --- | --- | --- |
| Do nothing; keep the essay and Open Dough as the explanation | No production cost | Reject for now: the idea stays hard to share outside Open Dough users |
| Restore and polish the reverted cut | Reuses work | Reject: Terry rejected it, and its model (one missile, one explosion) contradicts the recovered intention |
| Slowly reveal the flip chart with captions | The strongest simpler alternative, cheap and faithful to the sketch | Keep as the fallback. It cannot show slices landing, coherence returning, or a story leaving for history |
| **Check the intention in cheap storyboard frames, then animate one story's journey, then the full cycle** | Tests Terry's recognition before motion work, which is where the last effort failed | **Recommended** |

The highest learning priority: **does Terry recognize his intention in the
model above before anyone animates it?** The last effort was polished before
this was established.

## Candidate story decomposition

These are non-executable candidates. None of them authorizes execution.

<a id="intention-storyboard"></a>
### 1. Terry recognizes his intention in a key-frame storyboard of one story's full cycle
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Terry needs to confirm the visual model before any motion work
  is invested.
- **Visible outcome:** A short sequence of square key frames (roughly 8–12)
  with one-line captions, covering:
  - the product space (Behavior, Structure, Time) and the living backlog;
  - a romantic story shaped by a desire;
  - the story taken and split into Structure and Behavior slices;
  - each slice briefly disturbing, then restored to coherence;
  - existing blocks reshaped;
  - judgment settling into tests and decisions;
  - the spent story committed and dropped into history;
  - learning feeding the backlog, and the next story approaching.

  Frames may be rendered stills from `terry-moves` or generated artwork.
- **Evaluation:** Terry reads the frames in order and either says "yes, that is
  my idea" or marks which frames misstate it. Automated checks do not establish
  acceptance.
- **Value / learning:** Tests the most consequential assumption, the visual
  model, at the lowest cost. The frames also become the brief for later
  stories.
- **Boundary:** Stills and captions only: no motion, timing, or subtitle
  script. The frames may reuse the carried-forward palette (warm paper, dark
  ink, blue structure, green behavior, coral story), but that palette is not
  yet approved.
- **Effort hypothesis:** Unbanded. Smallest in this set, with high uncertainty
  that is intentionally front-loaded.
- **Depends on:** None.
- **Safe stopping point:** An approved or annotated storyboard. On its own it is
  a slide-ready explanation of the idea.

<a id="one-story-journey"></a>
### 2. Viewers watch one story become part of a coherent product
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Viewers need to see, in motion, the causal chain from desire to
  a changed coherent product. Terry needs to judge the rhythm of impact and
  recovery.
- **Visible outcome:** A short film of about 30–45 seconds, rendered in
  `terry-moves`, that animates the approved storyboard for a single story.
  Captions are written for this excerpt.
  1. The story splits into slices.
  2. A Structure slice lands first and reshapes existing blocks, and behavior
     stays the same.
  3. A Behavior slice lands, with a brief local disturbance.
  4. Coherence returns after each slice.
  5. Tests and decisions settle.
  6. The spent story drops into history.
- **Evaluation:** Terry judges the movement against the storyboard. A
  representative viewer is asked what changed, what remains, and where the
  story went, and their answers are recorded as given.
- **Value / learning:** Tests whether motion conveys "disturbance is brief and
  local, and coherence returns at every step." Terry specifically rejected the
  previous treatment of this.
- **Boundary:** One story, from Taken to history. Backlog reordering, dropped
  stories, and the retrospective loop belong to story 3.
- **Effort hypothesis:** Unbanded. Carries the main motion uncertainty.
- **Depends on:** Story 1's storyboard, approved or revised.
- **Safe stopping point:** An independently watchable short explanation with
  editable source and a reproducible render.

<a id="full-cycle"></a>
### 3. Viewers follow the whole idea: a living backlog feeding a product that stays coherent over time
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Viewers need the complete argument: stories are temporary
  transitions while the product persists. Terry needs to assess pacing and the
  ending.
- **Visible outcome:** The complete film. It opens with the three dimensions
  and the romantic nature of stories. It shows the backlog as a living queue:
  ordered by direction, reordered by value and learning, one story dropped, and
  a correction jumping ahead. It includes story 2's journey. It shows several
  stories over time leaving a product with no scars, while history accumulates
  out of the way. It ends with the retrospective feeding learning back and the
  next story approaching.
- **Evaluation:** After watching silently, viewers can explain what separates a
  story from a feature, why the product has no scars, and where the old stories
  went. Terry judges fidelity and pacing end to end.
- **Value / learning:** Delivers the full explanation. Tests whether the model
  holds across many stories without becoming noisy.
- **Boundary:** Extends story 2's motion language rather than inventing a new
  one. Release polish, audio, branding, and publication are out of scope.
- **Effort hypothesis:** Unbanded. The broadest production work in the set.
- **Depends on:** Story 2.
- **Safe stopping point:** A complete, watchable working cut with editable
  source and a reproducible export.

<a id="release"></a>
### 4. Terry has a finished animation ready to share
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Terry needs a dependable artifact for talks, courses, and the
  Open Dough introduction.
- **Visible outcome:** The final export with resolved readability, pacing, and
  continuity, plus any agreed audio treatment.
- **Evaluation:** Watch it end to end at the intended viewing size, with and
  without sound. Terry judges the final effect.
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

Order: 1 → 2 → 3 → 4. Story 1 comes first because the last effort failed on the
intention, not on production quality. Story 2 comes before 3 because
"coherence returns after each slice" is the hardest motion to get right, and it
decides whether the full film is worth making.

- **Safe stopping points:** A storyboard alone is a useful slide sequence. The
  short journey film is a standalone explainer.
- **Reduce scope in this order:** first the optional audio, then decorative
  artwork, then some queue events in story 3 (a dropped story, a correction
  jumping ahead).
- **Keep the core:** slices landing on both axes, coherence restored, judgment
  becoming decisions, and the spent story going to history.

## Open decisions

These are proposals, not Terry's decisions. They are recorded because they
change the stories' outcomes:

- **Format and length:** carry forward the square frame and about three
  minutes for story 3, or choose again (for example, 16:9 so it can drop into
  talks). This is proposed to be settled during story 1.
- **Open Dough visibility:** keep the film tool-neutral about the idea, or end
  by naming Open Dough as the working implementation. The proposal is
  tool-neutral, with an optional closing credit.
- **The projectile:** keep a projectile at all, or let a fuzzy coral story
  split into slices before contact. The proposal is a fuzzy story that splits,
  with no weapon imagery. Terry's earlier bomb/missile direction belonged to
  the rejected effort, and he should confirm whether it still stands.
- **Where human judgment appears:** show it as a figure (humans own decisions,
  agents carry delegated judgment) or keep it abstract. The proposal is
  abstract, with an optional human hand at the moment of decision.

## When to surface

After the TPS and AI talk is conference-ready, which is the current
near-future direction, or earlier if Terry selects story 1. Story 1 is cheap
enough to run alongside that work.

## Breadcrumbs

- Intention: [essay](romantic-stories-disciplined-products.md) and
  [flip chart](story-driven-product-space.jpg).
- The rejected effort, recoverable from Git: seed `e657ee8:Story Driven/seed.md`
  (the original intention, before it drifted to the missile) and
  `7a5ac06:Story Driven/seed.md`. Plan `7a5ac06:.planning/quick/006-revised-story-driven-cut/PLAN.md`.
- Open Dough (`~/git/open-dough`):
  - ADR 0001 defines Story as a "romantic, speculative account".
  - ADR 0008 (Proposed) describes story, feature, and structure as three related
    dimensions.
  - ADR 0002 principles cover whole product, PFE / one representation, reducing
    the judgment left in the repository, and stop-and-fix.
  - ADR 0005 §5 covers deleting spent evidence.
  - `dough-story-decomposition/references/problem-decomposition.md` covers the
    3V gate and Behavior/Structure slices.
  - `dough-post-change-refactor` covers restabilizing before commit.
  - `dough-story-wrap-up` covers assimilating lasting knowledge, the
    before-cleanup commit, and deleting spent history.
  - `dough-execution-retrospective` covers the learning loop.
  - `dough-pfe` covers Proudly Found Elsewhere.
- [ADR-0000](../docs/adrs/0000-use-adrs-accepted.md) keeps durable
  decisions with Terry. This seed makes no platform decision.
