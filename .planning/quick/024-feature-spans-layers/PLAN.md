# Viewers are not told that a feature maps to stories

Source: [story](../../../Story%20Driven/seed.md#feature-spans-layers).
Identity: `story-impact-animation#feature-spans-layers`

## Goal and scope

- **Goal:** the ending's pair reads "One story touches many features… /
  …and one feature takes many layers working together."; the feature beat
  shows one Behavior column realized across all Structure rows, with no
  story colors, dots, or counts tied to it.
- **Included:** caption, the feature beat's picture (position-chosen column,
  layer-bar badge instead of story dots, feature-green wash over the column,
  joints popping between layers bottom-up), code comments, specs, README,
  seed breadcrumbs.
- **Excluded:** the story-outline beat's picture; the product's cells;
  Terry's essay (flagged, not edited); the voice-over.
- **Key examples:** the story's three examples, mapped below.

## Execution context and decisions

- **Stack:** Remotion 4.0.518, `terry-moves/src/storyImpact/`
  (`endingBeats.ts`, `outline.tsx`, `poseTypes.ts`). No new dependency.
- **Delivery:** Trunk Mode on local `master`, no push (coordinator
  instruction). Local gate: `pnpm moves test` (jest + eslint + tsc), the
  project's test command named in CLAUDE.md.
- **Approach:** `OutlinePose` gains optional `layers` (how many layer bars
  the name shows), `wash` (0–1 opacity of a fill over the outlined cells) and
  `joints` (0–1: how far the joints between vertically adjacent outlined
  cells have popped on, bottom up). The feature outline uses them with
  `tags: []`; the story outline keeps its own pink tag. The feature column
  is the one on the Structure axis (col 0).

## Decisive premises observed (2026-09-29, at `fc8bf4b`)

- `pnpm moves test` passes: 269 tests, lint and tsc clean.
- The feature column is picked by the most story colors
  (`featureColumnOf` in `endingBeats.ts`) and is col 0, rows 0–2; its tag
  shows yellow and teal story dots (still at frame 3650 viewed).
- Captions re-time from syllables in `paced()` (`readingPace.ts`); the new
  caption (14 syllables) needs 5.0 s vs 3.5 s authored, so the beat
  stretches with no timing edit; the film stays within 120–150 s.
- The only other feature↔story claims: ending comments in
  `endingBeats.ts`, the `OutlinePose` comment in `poseTypes.ts`, the ending
  and caption specs, the seed's intention point 4 and breadcrumb ("Story
  versus feature comes after several stories, so that the product can
  actually show it"). README says only "story versus feature". Terry's essay
  line 72 says "One feature may be changed by many stories" (deferred).

## Proof ownership

| Example | Slice | Proof |
| --- | --- | --- |
| Height of the feature beat | 1 | ending spec: caption, one together outline on col 0 rows 0–2, `tags` empty, `layers` 3, joints 1; render test finds 3 layer bars, 2 joints, no tag dots; still viewed at 1080 and 360 px |
| Story outline fades | 1 | existing ending spec, unchanged |
| Product unchanged | 1 | existing ending spec, unchanged |

## Slices

### 1. The feature beat shows one feature as many layers working together
Type: Behavior
Status: done
Proof: ending and caption specs as mapped; `pnpm moves test`; render
`pnpm -C terry-moves render:story-impact`; stills of the feature beat
viewed at 1080 and 360 px.

Behavior: given the settled product at the ending → the feature beat plays →
the caption reads "…and one feature takes many layers working together.",
the column on the Structure axis is outlined and washed in feature green,
joints pop between its three layers bottom-up, and "a feature" shows layer
bars, not story dots. Comments, README and seed no longer claim a
feature↔story mapping.

Accepted proof: `pnpm moves test` passes (270 tests, eslint and tsc clean);
the ending spec covers the caption, the col-0 outline over rows 0–2, empty
tags, 3 layer bars, 2 joints, no tag dots, and joints after the outline has
risen; stills at frames 3610, 3640, 3690 viewed at 1080 px and 3690 at
360 px (layer bars and joints legible). The feature beat grew from 116 to
142 frames; the film from 4012 to 4038 frames (134.6 s).

## Learnings

- Terry committed `75b6a20` ("a software product is a space…") on master
  during this execution; its syllable spec still expected 13 for the new
  15-syllable caption. Fixed in its own commit so the local gate passes.

## Execution complete

Product advice: retrospective skipped
