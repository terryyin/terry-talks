# Viewers learn that a story's impact delivers two values: customer value and option value

Source: [story](../../../Story%20Driven/seed.md#two-impacts-two-values).
Identity: `story-impact-animation#two-impacts-two-values`

## Goal and scope

- **Goal:** after the pink story is coherent, name "impact" and split it into
  two value pills; the customer reacts to the outlined Behavior it touched
  (customer value); the shields and domain links follow, captioned as option
  value bought with spent judgment; the customer's idea is the cheap story
  that exercises the option.
- **Excluded:** option value on the sun story; audio; storyboard contact
  sheet layout beyond the boards the beats end on.
- **Key examples:** the story's examples 1–4, mapped below.

## Execution context and decisions

- **Stack:** Remotion 4.0.518, `terry-moves/src/storyImpact/`. No new
  dependency.
- **Plan location:** `.planning/quick/022-two-impacts-two-values/`.
  Statuses: planned, done.
- **Delivery:** Trunk Mode on local `master`, no push. Local gate:
  `pnpm moves test`.
- **Approach:**
  - A `values` pose field (burst pop and fade, how far the pills have
    sprung, each pill's brightness, the key's glint) drawn by a new
    `values.tsx`: a yellow comic burst "impact!" at about (790, 330), the
    "customer value" pill (heart) resting at about (790, 780) beside the
    customer, the "option value" pill (key) at about (880, 62) top right.
  - One-story order becomes coherent → impact → customer → new-idea →
    tests → domain → history → next. Tests and domain beats build on the
    stage after the idea joined the backlog.
  - The customer beat outlines the pink story's Behavior columns (adjacent
    columns in one band, no name tag) and the customer gains `hearts`.
  - `StorySpec.splash` (splat radius, default 1) makes the idea's splash
    smaller, so fewer cells are knocked; its wobble, assimilate and coherent
    beats are shorter than the sun story's. The wall's growth window widens
    so a fast column still eases under 0.1 grid unit a frame.
  - Boards follow the new beats; captions test lists update.

## Decisive premises observed (2026-09-29, at `b54d22f`)

- `pnpm moves test` passes: 257 tests (run after story 11).
- The top-right corner (x 750–1040, y 35–90) and the band right of the
  customer below "Product Backlog" (x 600–1000, y 740–830) are free in the
  coherent and customer frames (stills viewed at story 11).
- `knockedCells` reaches `splat.radius + 0.9` and smears within
  `radius + 0.25` (read in `scene.ts`), so a smaller radius knocks fewer
  cells.
- A later story's assimilate beat squeezes the 4-s motion (`squeezed` in
  `film.ts`); the wall-easing test bounds each frame's change at 0.1.

## Proof ownership

| Example | Slice | Proof |
| --- | --- | --- |
| 1. Impact named | 1 | spec: impact beat caption, burst then pills sprung by its end; still viewed |
| 2. Customer sees behavior | 1 | spec: customer only in the customer and new-idea beats, on coherent cells, with Behavior bands on the pink columns; hearts before bulb; still viewed |
| 3. Option value unseen | 1 | spec: tests/domain captions, no customer, option pill brightest; still viewed |
| 4. Option exercised | 2 | spec: idea's knocked cells fewer than sun's, idea's wobble→coherent frames fewer than sun's, option pill shown in the idea's beats; stills viewed |

## Slices

### 1. The first story's impact delivers customer value and option value
Type: Behavior
Status: planned
Proof: examples 1–3 in the film specs; stills viewed; `pnpm moves test`.

Behavior: given the pink story coherent → the film plays on → "impact!"
splits into two pills, the customer reacts to the outlined behavior and gets
the idea, then the shields and domain links are shown as option value.

### 2. The customer's idea exercises the option
Type: Behavior
Status: planned
Proof: example 4 in the film specs; stills viewed; `pnpm moves test`.

Behavior: given the pink story's option → the customer's idea launches →
the option pill shows, and its splash is smaller and assimilated faster
than the sun story's.
