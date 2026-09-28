# Terry recognizes his idea in a cartoon storyboard of one story's splash

Source: [story](../../../Story%20Driven/seed.md#intention-storyboard).
Identity: `story-impact-animation#intention-storyboard`

## Goal and scope

- **Goal:** Eleven square cartoon boards with one-line captions, drawn in code
  in `terry-moves`, that read in order as the essay's chain for one story, plus
  one contact sheet of all boards.
- **Included:** the shared cartoon scene pieces (product grid on
  Behavior/Structure, Time axis, backlog tray of paint balls with faces, the
  example story ball and its wish bubble, the paint splat, the messy product,
  the assimilated product, the History box), a storyboard composition with one
  board per frame, and a committed contact sheet under `Story Driven/`.
- **Excluded:** motion and timing between boards, subtitles, audio, the
  "story ≠ feature" beat, several stories over time, and generated image-model
  artwork.
- **Key examples:** the story's examples 1–4, mapped under
  [proof ownership](#proof-ownership).

## Execution context and decisions

- **Stack:** Remotion 4.0.518 with React SVG, 2D only. No three.js: the
  cartoon look is flat, and flat SVG is cheaper to animate later. No ADR
  applies (only ADR-0000, which is process). No North Star exists.
- **Location:** a new folder `terry-moves/src/storyImpact/`. The repo-root
  `.gitignore` ignores any `parts/` directory, so new files must not go under
  `src/parts/`. The composition wrapper is `src/stories/StoryImpactStoryboard.tsx`,
  registered in `src/Root.tsx`.
- **PFE:** The existing `Story` wrapper and actions DSL are driven by
  subtitle timing and actor actions, which suit narrated explainers. A
  storyboard needs a pose per board, so the scene is a pure function of a
  pose; that same pose model is what story 2 will interpolate. The reverted
  effort's code is not restored (Terry rejected its tone and imagery).
- **Scene model:** `scene.ts` holds the grid (5 behavior columns × 4 structure
  rows) and pure pose functions for the product: tidy, splatted, messy, and
  assimilated. A board is a caption plus a pose. Components render a pose;
  they do not decide story content.
- **Plan location:** `.planning/quick/`; 011 is the highest allocated number,
  so this is 012. Slice statuses: planned, in-progress, done.
- **Delivery:** Trunk Mode on local `master`. No push is authorized, so no CI
  observer runs; `pnpm moves test` (jest, eslint, tsc) is the local gate, as
  the terry-moves README states.
- **Render commands:**
  - Boards: `cd terry-moves && npx remotion render src/index.ts StoryImpactStoryboard out/storyboard --sequence --image-format=png`
  - Contact sheet: `ffmpeg -y -i out/storyboard/element-%02d.png -vf "scale=540:540,tile=4x3:padding=12:color=white" -frames:v 1 "../Story Driven/storyboard.png"`
    (the first render wrote `element-0.png`, `element-1.png`; with 11 boards check whether Remotion pads to `element-00.png` and use the matching pattern).

## Decisive premises observed (2026-09-28, at `e89bc2a`)

- `npx remotion compositions src/index.ts` in `terry-moves` bundles and lists
  14 compositions, so Remotion CLI rendering works on this machine.
- `pnpm moves test` passes: 16 suites, 156 tests, lint and tsc clean.
- `ffmpeg` and `ffprobe` exist at `/opt/homebrew/bin`.
- React Testing Library renders components in jsdom
  (`tests/video_conomponents/HealthBar.spec.tsx`), so a board can be rendered
  and its caption read in a test.
- No existing test or code refers to story impact; nothing is preserved.

## Cumulative design and sizing assessment

One pose model grows across the slices: slice 1 establishes the tidy product
and the backlog, slice 2 adds the story ball, splat and messy poses, and slice
3 adds the assimilated product and history. Each later board is a new pose of
the same model, not a new renderer. No numeric slice limit was supplied; each
slice has one proof loop (focused spec plus a render viewed by eye).

## Proof ownership

| Example | Slice | Proof |
| --- | --- | --- |
| 1. Board order | 3 | `StoryImpactStoryboard.spec.tsx` reads all eleven captions in order; the contact sheet is viewed |
| 2. Splash across boundaries | 2 | spec: the splat pose covers ≥3 cells in ≥2 rows and ≥2 columns; the splat board is viewed |
| 3. Changed, not reset and not scarred | 3 | spec: assimilated cells are aligned, carry the story color in ≥2 cells, one cell is split, no smear; board viewed |
| 4. The story leaves | 3 | spec: history pose has the story in History, not in the backlog, and a different ball first in the backlog; board viewed |

Tone and recognition are judged by eye on the rendered PNGs, not by tests.

## Slices

### 1. The product space and the backlog appear as cartoon boards
Type: Behavior
Status: done
Proof: spec renders boards 1–2 and reads their captions; the two PNGs render and are viewed.

Behavior: given the storyboard composition → when boards 1 and 2 are rendered →
board 1 shows the tidy product grid with Behavior and Structure labels, and
board 2 adds the Time axis and a backlog tray of paint balls with faces, each
with its caption.

### 2. A romantic story flies in and splashes the product into a mess
Type: Behavior
Status: planned
Proof: example 2 in the spec; boards 3–7 render and are viewed.

Behavior: given the tidy product and backlog → when boards 3–7 are rendered →
the example ball shows its wish bubble, then looks fuzzy and boundary-free,
then flies in an arc, then splats across at least three cells over grid lines,
then the product is messy with cells knocked out of alignment.

### 3. The splash is assimilated and the spent story goes to history
Type: Behavior
Status: planned
Proof: examples 1, 3 and 4 in the spec; boards 8–11 render; the contact sheet is written and viewed.

Behavior: given the messy product → when boards 8–11 are rendered → the product
is re-sorted into an aligned grid that keeps the story color in the cells where
the change belongs with one cell split, the pale spent ball rests in History,
and the next ball waits at the front of the backlog; the contact sheet shows
all eleven boards in order.

## Accepted proof

- **Slice 1:** `cd terry-moves && npx jest tests/storyImpact` passes 8 tests
  in `tests/storyImpact/StoryImpactStoryboard.spec.tsx` (captions in order;
  board 1 has 20 cells and both axes, no time axis or tray; board 2 adds the
  time axis, tray and ≥3 balls). `pnpm moves test` passed. The render of
  boards 1–2 was viewed and accepted: flat cartoon wall on Behavior ×
  Structure, Time arrow, orange backlog tray with four smiling balls.

## Learnings

- Visual language to keep: paper `#FFF6E5`, ink `#2B2D42` 7px outlines, flat
  tan offset shadows, Chalkboard SE-style rounded bold font, sky/mint checker
  cells, balls pink/sun/grape/lime with faces. Free space for History is the
  top-left; the ball's flight path is the band above the tray and the wall.
- The split-cell field was removed as speculative in slice 1; slice 3 adds it.
