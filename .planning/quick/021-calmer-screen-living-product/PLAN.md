# Viewers read one message at a time and see the product space change shape

Source: [story](../../../Story%20Driven/seed.md#calmer-screen-living-product).
Identity: `story-impact-animation#calmer-screen-living-product`

## Goal and scope

- **Goal:** the wish bubble and the "customer-value focused" tag never share
  the screen; "whole-product focused" and "judgment-intensive" never share
  it either; the product's size changes 4×4 → 5×4 (pink) → 5×3 (sun) → 6×3
  (idea), each change eased and tidy.
- **Excluded:** story 12's impact and value beats (the customer beat and the
  tests/domain beats stay as they are here); changes inside a column or row.
- **Key examples:** the story's examples 1–4, mapped below.

## Execution context and decisions

- **Stack:** Remotion 4.0.518, `terry-moves/src/storyImpact/`. No new
  dependency.
- **Plan location:** `.planning/quick/021-calmer-screen-living-product/`.
  Statuses: planned, done.
- **Delivery:** Trunk Mode on local `master`, no push. Local gate:
  `pnpm moves test` (jest + eslint + tsc), as in earlier stories.
- **Approach:**
  - A `focus` beat between `wish` and `fuzzy` (caption "It's focused on
    customer value."); the wish beat carries no tag; the fuzzy beat starts
    with the tag fading. Storyboard gains the matching board.
  - The judgment label takes the whole-product label's spot as it fades
    (outline without label while judgment shows).
  - The product's size comes from its cells (`extentOf(cells)`); a pose may
    override it with a fractional `extent` while the wall eases. `layout.ts`
    derives the wall outline and "Product" label from an extent; the axes
    are sized for the largest product (6 × 4). The Behavior step becomes a
    little shorter so six columns fit.
  - `StorySpec.grow` (`{ columns?: ±1, rows?: ±1 }`) is applied by
    `assimilatedCells`; the assimilate beat eases the wall and pops cells in
    (or out, before the wall eases in).
  - Code that assumed 5 × 4 (`protect.tsx` columns, `endingBeats.ts`,
    `splat.tsx` clamping, `focus.ts` every-cell outline, the judgment
    bubbles) reads the current extent instead.

## Decisive premises observed (2026-09-29, at `5e9d525`)

- `pnpm moves test` passes: 253 tests (run).
- `GRID` (5 × 4) is read in `scene.ts`, `layout.ts`, `splat.tsx`,
  `endingBeats.ts`, `protect.tsx` (`COLUMNS = 5`) and three storyboard
  tests (grep `GRID\b|COLUMNS`); nothing else fixes the size.
- The tag and the wish bubble coexist through the whole wish beat
  (`valueWishBeat`, still at 15.5 s in the current render, viewed).
- The whole-product label (760, 300) and the judgment label (760, 385) show
  together during assimilation (still at 31.5 s viewed).

## Proof ownership

| Example | Slice | Proof |
| --- | --- | --- |
| 1. Wish, then tag | 1 | spec: no frame has both `story.bubble` shown and `tag`; the focus beat's caption; fuzzy frames have no tag |
| 2. One focus label | 1 | spec: no frame shows both labels; still viewed |
| 3. Shape over time | 2, 3 | spec: coherent cells 4×4 / 5×4 / 5×3 / 6×3 |
| 4. Tidy growth | 2, 3 | spec: wall extent changes by ≤ 0.1 grid unit per frame; every drawn cell and splat droplet within the current wall; stills viewed |

## Slices

### 1. One message at a time
Type: Behavior
Status: planned
Proof: examples 1–2 in the film specs; stills viewed; `pnpm moves test`.

Behavior: given the pink story → it wishes, then shows its focus, then turns
fuzzy; and while it is assimilated → the tag, the bubble, and the two focus
labels each show alone.

### 2. The product's size follows its cells
Type: Structure
Status: planned
Proof: existing specs stay green with `extentOf` replacing `GRID` (still
5 × 4 everywhere); `pnpm moves test`.

Structure: the wall, "Product" label, shields, feature column, splat
clamping and outlines read the product's extent instead of a constant.
Enables slice 3.

### 3. Each story changes the product's shape
Type: Behavior
Status: planned
Proof: examples 3–4 in the film specs; stills of each resize viewed;
`pnpm moves test`.

Behavior: given the 4×4 product → the pink, sun and idea stories are
assimilated → the wall eases to 5×4, 5×3 and 6×3 with cells popping in or
out tidily; the ending's feature and story outlines work on the 6×3 product.
