# Story assimilation visual proof

Source: [selected story](../../../Story%20Driven/seed.md#visual-proof).
Status: planned.

## Goal and scope

Deliver one 33-second, silent 1080-square MP4 showing an incoming story crossing
behavior and structure, disturbing part of the product, then assimilating into
a coherent changed product. Preserve an unaffected region and available history.
Use cues 11, 15, 17, 18, 23 of the maintained subtitle script with six seconds each,
a 1.5-second pause after disturbance, and a 1.5-second final hold. Keep the full
script unchanged. Use existing Remotion and local vector geometry; no framework
change, generated raster asset requirement, audio, triangle, or full-film work.

## Execution context

- Plan directory restored by Terry in this conversation; 004 follows highest
  historical allocation 003. Slice statuses: planned / in-progress / done.
- Existing React/Remotion stack; scene-local conceptual geometry and timeline.
  ADR-0000 reserves durable architecture decisions for Terry; no new one is needed.
- One behavior and one render-review loop; no numeric slice budget is specified.
  Track elapsed time and stop if the coherent transformation cannot converge.
- Use pnpm directly. Focused proof: `pnpm -C terry-moves exec jest --runInBand
  --runTestsByPath tests/video_conomponents/StoryAssimilation.spec.tsx`, plus
  `pnpm -C terry-moves exec tsc --noEmit` and a real Remotion render.
- Coordinator formatting: `pnpm -C terry-moves exec eslint --fix` with explicitly
  owned TS/TSX paths. No active commit hook or selective-format wrapper exists;
  direct ESLint on those paths provides the current check without creating tooling.
- Commit owned changes. Repository says push only when asked; the prior push
  request applied to the preceding commits. This execution will commit locally.
- No `.github/workflows` exists: CI monitoring unavailable, no observer started.
  Do not claim CI green. Local render and focused proof own validation.

## Ordered slices

### 1. Watch a story become part of a changed product
Type: Behavior
Status: planned

Behavior: Given the existing script, opening the registered StoryAssimilation
composition or playing its exported MP4 shows a complete arrival → crossing →
disturbance → coherent changed-state journey, with readable synchronized captions.

Proof: Render the full 990-frame video; inspect moving playback and key frames at
phone scale. Assert exported size and duration using ffprobe. Focused component
and timeline checks demonstrate cue/pause boundaries and changed versus preserved
geometry through the rendered scene boundary; check that altering a cue duration
moves dependent beats without unrelated manual timestamp repairs.

| Promise | Owning observation |
| --- | --- |
| Same product, several affected behaviors/components, unaffected region | Before/contact/disturbance/after render inspection and scene assertions |
| Changed coherent ending; no separate attached stroke | After-state inspection and scene assertion |
| Behavior, structure, time, depth; no triangle or destroyed history | Complete render inspection |
| Silent phone-size captions, exact excerpt, pauses and ending hold | Caption tests, small-size visual inspection, ffprobe |
| Editable source and playable export | Registered composition, maintained production notes and MP4 |
| Art-direction evaluation | Playable scene supplied to Terry; agent review is not human comprehension evidence |

## Current decisions

Script timings own beats; avoid independent absolute animation timing tables.
Use vector shapes for an exact morph, distinguish roles through both shape and
color, and keep subtitles separated from motion. The Markdown script remains the
source for the full film; the excerpt is explicitly local to this visual proof.
A passing render proves delivery, not audience endorsement. Record any actual
viewer feedback without inventing it; full-film treatment remains subject to it.

## Learnings

None yet.
