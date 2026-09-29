# Viewers leave with a crisp, powerful ending, and Terry is credited

Source: [story](../../../Story%20Driven/seed.md#crisp-ending).
Identity: `story-impact-animation#crisp-ending`

## Goal and scope

- **Goal:** the closing rest gets the caption "Neither is better. They do
  different jobs."; then the stage shrinks away and an end card lands
  "Stories should be / romantic. / Products should not." in the title's
  styles, followed by the credit "An idea and film by Terry Yin". The poster
  is taken from the card.
- **Excluded:** audio, stories 9 and 10.
- **Key examples:** the story's examples 1–3, mapped below.

## Execution context and decisions

- **Stack:** Remotion 4.0.518, `terry-moves/src/storyImpact/`. No new
  dependency.
- **Plan location:** `.planning/quick/018-crisp-ending/`. Statuses: planned,
  done.
- **Delivery:** Trunk Mode on local `master`, no push. Local gate:
  `pnpm moves test`.
- **Approach:** `title.tsx`'s splash, romantic line and disciplined line take
  their position and size as props, so an `endCard.tsx` reuses them. New
  pose fields: `stageLeave` (0–1, the stage shrinking away) and `endCard`
  (its splash, letter drops, snap, underline and credit). `closing` shortens
  to the rest with its new caption; a new `finale` beat plays the card. The
  render script's poster frame moves to the last frame.

## Decisive premises observed (2026-09-29, at `94d4bee`)

- `pnpm moves test` passes: 245 tests.
- The title's romantic line at 100 px holds 17 characters within the frame
  (title stills viewed), so "romantic." fits at 120 px and "Products should
  not." (20 characters) at 80 px.
- `package.json`'s `render:story-impact` takes the poster at `--frame=2600`,
  which is no longer the closing frame.

## Proof ownership

| Example | Slice | Proof |
| --- | --- | --- |
| 1. The set-up | 1 | spec: caption and eager hop in `closing` |
| 2. The punchline | 1 | spec: card texts render, no product grid, axes or caption at the end; still viewed at 360 px |
| 3. The credit | 1 | spec: credit text at the last frame; last 2 s identical poses |

## Slices

### 1. The film ends on a bold end card and credits Terry Yin
Type: Behavior
Status: done
Proof: examples 1–3 in `StoryImpactFilmEnding.spec.tsx`; stills viewed;
`pnpm moves test`; poster rendered.

Behavior: given the product at rest after story versus feature → when the
closing and finale beats play → the set-up caption shows, the stage shrinks
away, the end card lands the line, and the credit holds.

Accepted proof: `pnpm moves test` passed (lint and tsc clean). Stills of the
closing and finale beats (frames 2850–3104) viewed, and the last frame at
360×360: the lead-in, "romantic.", "Products should not." and the credit are
legible. `remotion still --frame=-1` renders the last frame, so the poster
now follows the film's length.

## Learnings

- The stage and the end card are separate layers of the scene: the stage
  (everything but the paper, title, end card and caption) shrinks as one.

## Execution complete

Product advice: retrospective skipped
