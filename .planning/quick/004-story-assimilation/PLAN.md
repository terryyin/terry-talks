# Story assimilation visual proof

Source: [selected story](../../../Story%20Driven/seed.md#visual-proof).
Status: done.

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
Status: done

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

- Delivered `StoryAssimilation` with a scene-local cue timeline built on existing
  `Script`. Extending cue 15 shifts the next caption and complete scene together;
  no independent authoring limitation was demonstrated.
- Local geometry carries the morph without raster assets. The Time arrow was
  reversed during visual review so it leads from history toward the present.
- Explicit `--muted` avoids the default export's empty audio stream extending
  the container beyond 33 seconds. Final output is video-only and exactly 33s.
- Existing `parts/` ignore rule hides new scene files; force-add only the two
  owned files. Existing flower `scene.bin` preload warning originates in
  StoryProductDeveloper.tsx:112–113; this scene loads no artwork and renders fully.
- Independent refactor consolidated identical current/history plane outlines;
  emitted SVG is unchanged. No other refactor candidate was identified.

## Execution evidence

- Implementation: `pnpm -C terry-moves exec jest --runInBand --runTestsByPath
  tests/video_conomponents/StoryAssimilation.spec.tsx` — 3 tests passed. Retiming,
  caption/pause boundaries, changed and preserved scene geometry are covered.
- `pnpm -C terry-moves exec tsc --noEmit` — passed. Both checks passed again
  after the outline refactor; selected-file ESLint --fix passed.
- `pnpm -C terry-moves exec remotion render src/index.ts StoryAssimilation
  out/story-assimilation.mp4 --concurrency=2 --muted` — rendered 990 frames.
- `ffprobe -v error -show_entries
  stream=codec_type,width,height,r_frame_rate,nb_frames,duration
  -show_entries format=duration -of json terry-moves/out/story-assimilation.mp4`
  — 1080 square, 30fps, 990 frames, video-only, 33.000000 seconds.
- Played through at 360px square in local browser and inspected nine exported
  frames spanning arrival, disturbance, reconciliation, restructure and ending.
  Captions fit outside the diagram, the local disturbance remains recognizable,
  coral integrates, history remains and the leftmost region is preserved.
  Agent inspection is not human comprehension evidence. MP4 shown to Terry.
- No CI workflow; no observer created or requiring shutdown. No push authorized
  for this execution. Local commit completes delivery under repository guidance.

