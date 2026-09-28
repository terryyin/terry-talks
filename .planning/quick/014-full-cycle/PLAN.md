# Viewers follow the whole idea as stories come and go while the product stays coherent

Source: [story](../../../Story%20Driven/seed.md#full-cycle).
Identity: `story-impact-animation#full-cycle`

## Goal and scope

- **Goal:** The complete, silent, captioned square film `StoryImpactFilm`,
  about 80 seconds, from the title to the closing line, rendered to MP4.
- **Included:** opening beats (title, product space, Time and backlog), the
  one-story beats reused, two more shorter stories (sun, grape) with the
  backlog refilled and History stacking spent balls, a story ≠ feature beat,
  the closing line, the composition and its render.
- **Excluded:** audio, phone-size readability polish, the known label
  overlaps, publication, and anything leaving the product.
- **Preserved:** `StoryImpactStoryboard` renders byte-identical boards, and
  `StoryImpactOneSplash` keeps its poses (its spec stays green unchanged).
- **Key examples:** the story's examples 1–5, mapped under
  [proof ownership](#proof-ownership).

## Execution context and decisions

- **Stack:** Remotion 4.0.518, React SVG, the `src/storyImpact/` pose model and
  beat timeline. No new dependency. No ADR applies beyond ADR-0000.
- **Timeline reuse:** `film.ts` today holds one list of beats for the one-story
  film. The full film is a second list that reuses those beat functions for
  the pink story. Timeline arithmetic (`poseAt`, `captionAt`, `beatRange`,
  duration) must work for any beat list, so it becomes a small function of a
  beat list instead of module-level state; both films use it.
- **Several stories:** the pink story's poses are built from `tidyCells()`,
  `exampleBall`, `IMPACT` and a fixed set of changed cells. Later stories need
  the same poses built from the product *as it is before that story* and from
  that story's ball, impact spot, changed cells and reorganized cell. Slice 2
  generalizes this, and the pink story must produce exactly the same poses as
  now.
- **Shorter later stories:** the sun and grape stories skip the wish bubble
  and the fuzzy beat (already explained once). Each: launch, flight, splat,
  wobble, assimilate, history, about 9–10 s. Their changed cells cross rows
  and columns; the sun story changes one cell the pink story changed, which
  ends split between pink and sun.
- **Backlog refill:** a new ball (for example teal) rolls into the back of the
  tray after each story leaves, so the backlog keeps 3 balls.
- **History stack:** History shows spent balls side by side or stacked, in
  spent order, inside the same box.
- **Story ≠ feature:** outline the pink story's cells with a dashed pink
  outline and the caption "One story touches many features…", then outline one
  Behavior column that holds several story colors, caption "…and one feature
  carries many stories."
- **Plan location:** `.planning/quick/014-full-cycle/`; 013 was the last
  allocated number. Statuses: planned, in-progress, done.
- **Delivery:** Trunk Mode on local `master`, no push, no CI observer. Local
  gate: `pnpm moves test`.
- **Render (from `terry-moves/`):**
  `npx remotion render src/index.ts StoryImpactFilm out/story-impact-film.mp4`

## Decisive premises observed (2026-09-28, at `6c897e8`)

- `film.ts` defines one module-level `beats` list and derives `poseAt`,
  `captionAt`, `beatRange` and `filmDurationInFrames` from it (read at
  `6c897e8`), so a second film needs that arithmetic parameterized.
- `assimilation.ts` hard-codes `CHANGED_CELLS` and `REORGANIZED_CELL` around
  `IMPACT` and builds from `tidyCells()`; `scene.ts` builds splat and knocked
  cells from `exampleSplat` around `IMPACT` (read at `6c897e8`). Later stories
  therefore need these parameterized.
- `pnpm moves test` passed after the one-story film (198 tests), and the
  storyboard renders deterministically (byte-identical re-renders).

## Cumulative design and sizing assessment

One pose model and one timeline mechanism. The full film is a new beat list;
later stories are the same beat functions applied to a different story spec
and product-before state, not new renderers. Slice 2 is the only Structure
slice, and it directly enables slice 3. No numeric slice limit was supplied;
each slice has one proof loop (focused spec plus stills).

## Proof ownership

| Example | Slice | Proof |
| --- | --- | --- |
| 1. The whole chain | 1, 3, 4 | stills at every beat viewed in order after the final render |
| 2. Stays coherent across stories | 3 | `StoryImpactFilm.spec.ts`: at each story's assimilation end, cells aligned, no smear/splat, story-colored cell count grows |
| 3. Story ≠ feature | 4 | spec: outlined story cells span ≥2 columns and ≥2 rows; outlined column has ≥2 story colors |
| 4. History out of the way | 3 | spec: last frame's history is [pink, sun, grape]; none in the backlog |
| 5. Captions and length | 4 | spec: captions in beat order, each ≥75 frames; 75–90 s |

## Slices

### 1. The film opens on the product space and the backlog, then plays the first story
Type: Behavior
Status: planned
Proof: spec — title, product-space and backlog beats; the pink story's beats in the full film equal the one-story film's poses; one-splash spec unchanged and green; stills viewed.

Behavior: given nothing on screen → when `StoryImpactFilm` starts → a title
appears, the axes grow and the tidy cells pop in (ending on the first board's
pose), the Time arrow grows and the balls bounce into the tray (ending on the
second board's pose), and then the pink story plays from its wish to the next
ball stepping up.

### 2. Story poses are built from any story and the product before it
Type: Structure
Status: planned
Proof: storyboard PNGs byte-identical; storyboard and one-splash specs unchanged and green; a spec that the pink story built through the general form deep-equals today's poses.

Internal change: splash, messy, assimilating, coherent and history poses (and
their beats) take a story spec (ball, impact spot, changed cells, reorganized
cell) and the product's cells and history before it. Enables slice 3.

### 3. More stories come and go while the product stays coherent
Type: Behavior
Status: planned
Proof: examples 2 and 4 in the spec; stills of the sun and grape stories viewed.

Behavior: given the pink story in history → when the next beats play → the sun
and then the grape story each launch, splat across boundaries, wobble, and are
assimilated into an aligned, unscarred product with more story-colored cells
(one pink cell becomes pink and sun), each spent ball joins History, and a new
ball rolls into the back of the tray.

### 4. Story ≠ feature and the closing line end the film
Type: Behavior
Status: planned
Proof: examples 3 and 5 in the spec; the MP4 renders; the full chain of stills is viewed.

Behavior: given several stories assimilated → when the final beats play → one
story's cells are outlined across columns and rows, then one feature column
with several story colors is outlined, and the closing line "Stories should be
romantic. Products should not." holds on the tidy product with the next ball
waiting.
