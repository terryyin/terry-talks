# Viewers see that assimilation is judgment-intensive and leaves spent judgment in the product

Source: [story](../../../Story%20Driven/seed.md#judgment-intensive-to-spent).
Identity: `story-impact-animation#judgment-intensive-to-spent`

## Goal and scope

- **Goal:** in the pink story's assimilation, a "judgment-intensive" label
  and three bobbing "?" bubbles; the tests beat's caption becomes "Judgment
  spent: tests guard what it does…". No label on the ball going to History.
- **Excluded:** the later stories; any other wording change.
- **Key examples:** the story's examples 1–3, mapped below.

## Execution context and decisions

- **Stack:** Remotion 4.0.518, `terry-moves/src/storyImpact/`. No new
  dependency.
- **Plan location:** `.planning/quick/020-judgment-intensive-to-spent/`.
  Statuses: planned, done.
- **Delivery:** Trunk Mode on local `master`, no push. Local gate:
  `pnpm moves test`.
- **Approach:** a `judgment` pose field (`show`, `fade`, `bob` seconds)
  drawn by a `judgment.tsx` piece; `focus.ts` adds it to the pink story's
  assimilate and coherent beats next to the whole-product outline, and to
  the assimilating board.

## Decisive premises observed (2026-09-29, at `fdd5b9e`)

- `pnpm moves test` passes: 249 tests.
- "whole-product focused" sits at (760, 300); below it, down to the tray
  balls' top (≈ 486), the space is free during assimilation (stills viewed).

## Proof ownership

| Example | Slice | Proof |
| --- | --- | --- |
| 1. Judgment-intensive | 1 | spec: label and three bubbles at the assimilating board, none at coherent; still viewed |
| 2. Spent judgment | 1 | spec: caption runs (film and storyboard) |
| 3. History stays plain | 1 | spec: no `judgment` or `tag` while the spent skin drifts |

## Slices

### 1. Assimilation is judgment-intensive and the judgment is spent
Type: Behavior
Status: done
Proof: examples 1–3 in the film specs; stills viewed; `pnpm moves test`.

Behavior: given the pink story's splash → while it is assimilated → the
"judgment-intensive" label and "?" bubbles show, then fade as it becomes
coherent; the shields are captioned as spent judgment.

Accepted proof: `pnpm moves test` passed (252 tests, lint and tsc clean).
Stills of the assimilate, coherent and tests beats (frames 900–1140) viewed:
"judgment-intensive" sits under "whole-product focused", clear of the tray;
three "?" bubbles bob over the wall and fade with the outline.

## Learnings

- The known "snap!" mark now also crowds a "?" bubble near the wall's left
  edge; the final polish pass moves it.

## Execution complete

Product advice: retrospective skipped
