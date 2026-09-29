# Viewers see that a story is customer-value focused and development is whole-product focused

Source: [story](../../../Story%20Driven/seed.md#value-vs-whole-product-focus).
Identity: `story-impact-animation#value-vs-whole-product-focus`

## Goal and scope

- **Goal:** in the pink story, a "customer-value focused" tag hangs from the
  hovering ball (wish and fuzzy), and a dashed "whole-product focused"
  outline encloses the whole wall while it wobbles and is assimilated.
- **Excluded:** the later stories; "judgment-intensive" (story 10).
- **Key examples:** the story's examples 1–3, mapped below.

## Execution context and decisions

- **Stack:** Remotion 4.0.518, `terry-moves/src/storyImpact/`. No new
  dependency.
- **Plan location:** `.planning/quick/019-value-vs-whole-product-focus/`.
  Statuses: planned, done.
- **Delivery:** Trunk Mode on local `master`, no push. Local gate:
  `pnpm moves test`.
- **Approach:** a `tag` pose field (text, pop, fade) drawn by a `storyTag.tsx`
  piece with a string to the story ball; the whole-product outline reuses
  `OutlinePose` (`together` over all cells) with an optional label position.
  A `focus.ts` module adds both to the pink story's wish, fuzzy, flight,
  wobble, assimilate and coherent beats and to the matching boards; the
  general story poses and beats stay unchanged, so the later stories carry
  neither.

## Decisive premises observed (2026-09-29, at `7d04fbc`)

- `pnpm moves test` passes: 246 tests.
- The OneSplash spec compares beat ends with `storyWishes()`,
  `storyIsFuzzy()`, `messyProduct()` and `assimilating()`; those comparisons
  move to the boards, which now carry the labels.
- Free space: below the hover spot and right of x = 480 between y ≈ 420 and
  the tray balls (top ≈ 486); above the tray at (750, 300) after the shout.

## Proof ownership

| Example | Slice | Proof |
| --- | --- | --- |
| 1. The story's focus | 1 | spec: tag shown at the wish and fuzzy board ends, absent by the flight's end |
| 2. The work's focus | 1 | spec: one outline over all 20 cells at the messy and assimilating board ends, none at coherent |
| 3. Once only | 1 | spec: no tag or outline in the sun and idea beats |

## Slices

### 1. The story is tagged customer-value focused and the work whole-product focused
Type: Behavior
Status: done
Proof: examples 1–3 in the film specs; stills viewed; `pnpm moves test`.

Behavior: given the pink story → when it hovers, then splashes → the tag
hangs under it until it flies, then the whole wall is outlined as
"whole-product focused" until the product is coherent.

Accepted proof: `pnpm moves test` passed (249 tests, lint and tsc clean).
Stills of the wish, fuzzy, flight, wobble, assimilate and coherent beats
(frames 480–1040) viewed: the tag reads inside its pill, clear of the
Structure axis, the wish bubble and the tray balls; the whole-product
outline and its name are clear of the Structure label.

## Learnings

- `WOBBLE_SECONDS` moved to `productBeats.ts` (next to
  `ASSIMILATE_SECONDS`) so `focus.ts` can use it without a cycle through
  `film.ts`.

## Execution complete

Product advice: retrospective skipped
