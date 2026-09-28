# Viewers watch one story splash onto the product and become part of it

Source: [story](../../../Story%20Driven/seed.md#one-story-journey).
Identity: `story-impact-animation#one-story-journey`

## Goal and scope

- **Goal:** A silent, captioned, square film of about 40 seconds,
  `StoryImpactOneSplash`, that carries one story from its wish, through the
  splash and assimilation, into history, with the next story waiting.
- **Included:** a beat timeline over the storyboard's pose model, the motion
  that pose data needs (ball hop and squash, flight, splat growth, cell jiggle,
  cells sliding back, paint draining into the changed cells, a cell splitting,
  the pale ball drifting into History, the next ball hopping forward), timed
  captions, the composition, and an MP4 render.
- **Excluded:** the opening product-space boards, "story ≠ feature", several
  stories, the closing line, audio, and release polish.
- **Key examples:** the story's examples 1–4, mapped under
  [proof ownership](#proof-ownership).

## Execution context and decisions

- **Stack:** Remotion 4.0.518, React SVG. Reuse `src/storyImpact/` pieces and
  poses; the storyboard composition and its boards must keep rendering exactly
  as they do now (its spec stays green).
- **Timeline model:** a new `film.ts` holds an ordered list of beats. Each beat
  has a name, a length in seconds, an optional caption, and a pure function
  from beat progress (0–1) to a `Pose`. `poseAt(frame)` and `captionAt(frame)`
  are pure, so tests can sample any moment. At the end of a beat that
  corresponds to a storyboard board, the pose equals that board's pose builder
  output. Motion needs only a few continuous pose fields (for example a ball
  offset and squash, a cell's paint fill, a spent ball's position); add each
  one only when a beat needs it, and keep pieces free of frame hooks.
- **Motion language:** stories move with springs, squash and stretch,
  overshoot and wobble (Remotion `spring`, or eased curves with overshoot).
  The product moves with eased slides and crisp snaps. Use deterministic
  math only.
- **Captions:** one at a time in the existing caption bar, each on screen for
  at least about 2.5 seconds, in beat order. Caption text follows the
  storyboard's captions where a beat matches a board.
- **PFE:** Remotion's `interpolate`, `spring` and `Easing` cover the easing;
  the older `Story`/subtitle DSL is not used, because its actor actions do not
  drive SVG pose data. No new dependency.
- **Plan location:** `.planning/quick/013-one-story-journey/`; 012 was the
  last allocated number. Statuses: planned, in-progress, done.
- **Delivery:** Trunk Mode on local `master`, no push, so no CI observer.
  Local gate: `pnpm moves test`.
- **Render commands (from `terry-moves/`):**
  - Film: `npx remotion render src/index.ts StoryImpactOneSplash out/story-impact-one-splash.mp4`
  - Stills: `npx remotion still src/index.ts StoryImpactOneSplash out/one-splash/<name>.png --frame=<n>`

## Decisive premises observed (2026-09-28, at `ba1e552`)

- The storyboard composition renders 11 boards from pure pose builders
  (`boards.ts`, `scene.ts`, `assimilation.ts`), and its spec passes 17 tests,
  so beats can reuse those builders as their end poses.
- The pieces take a `Pose` and read no frame (`StoryImpactScene.tsx`), so a
  film component can render `poseAt(frame)` directly.
- Remotion rendering works here (the storyboard rendered 11 PNG frames via
  `npx remotion render ... --sequence`); MP4 output uses the same renderer with
  the default h264 codec. `ffmpeg` is available for extracting stills.

## Cumulative design and sizing assessment

One timeline over one pose model: each slice appends beats and the few pose
fields they need. The storyboard stays a list of fixed poses; the film samples
poses over time from the same builders, so both keep one source of truth for
what each moment shows. No numeric slice limit was supplied; each slice has
one proof loop (focused spec plus stills viewed by eye).

## Proof ownership

| Example | Slice | Proof |
| --- | --- | --- |
| 1. Chain in order | 1–3 | stills at each beat viewed in order; the final render viewed as a strip |
| 2. Passes through the storyboard | 1–3 | `StoryImpactOneSplash.spec.ts`: at each board-matching beat's end, `poseAt` deep-equals the board's pose builder output |
| 3. Changed, not reset, not stained | 3 | spec on the last frame's pose: aligned cells, ≥2 story-colored cells, one split, no smear or splat, pink in history, sun first in the backlog |
| 4. Readable captions | 3 | spec over `captionAt`: captions appear in beat order, each for ≥2.5 s |

## Slices

### 1. The wish takes off and splashes onto the product
Type: Behavior
Status: planned
Proof: spec — beat ends match the wish, fuzzy and splat boards; the composition is registered and lasts 30–45 s once complete (checked in slice 3); stills viewed.

Behavior: given the tidy product with the backlog → when the film plays its
first beats → the front ball hops up with its wish bubble, turns fuzzy,
launches along a squashing and stretching arc, and splats, with the paint
growing across cell and row boundaries and dripping.

### 2. The product wobbles and then assimilates the splash
Type: Behavior
Status: planned
Proof: spec — beat ends match the messy, assimilating and coherent boards; mid-beat poses lie between them; stills viewed.

Behavior: given the fresh splat → when the next beats play → the cells jiggle
out of alignment, then slide back with eased snaps, the paint drains into the
changed cells, one cell splits, and the product ends tidy and changed.

### 3. The spent story drifts into history and the next story steps up
Type: Behavior
Status: planned
Proof: examples 3 and 4 in the spec; MP4 rendered; stills of every beat viewed in order.

Behavior: given the coherent changed product → when the last beats play → a
pale, emptied ball peels off the product and floats into the History box,
then the sun ball hops to the front of the queue, and the film ends there.
