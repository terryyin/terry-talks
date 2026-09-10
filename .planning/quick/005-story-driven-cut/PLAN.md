# Complete story-driven cut

Source: [selected story](../../../Story%20Driven/seed.md#complete-cut).
Status: done.

## Goal and scope

A complete 180-second, 1080-square, silent cut of the 28-cue subtitle script,
using the proof's visual language. Preserve all four 3-second pauses, the final
hold, the existing 33-second composition, and the coherent current product.
No upper triangle, reset, destroyed history, feature/component equivalence,
audio production, release polish, or generic authoring platform work.

## Context and delivery

- Established `.planning/quick/NNN-slug/PLAN.md`; 005 follows historical 004.
  Statuses planned / in-progress / done. User authorized the whole workflow.
- React/Remotion in terry-moves. Existing Script owns subtitle timing; shared
  product geometry and cue wording should remain coherent across both cuts.
  ADR-0000 retains human ownership of cross-cutting decisions; this is local
  film authoring within the current stack.
- Direct pnpm commands. Focused Jest at scene/timeline boundaries; tsc --noEmit;
  real Remotion renders with --muted; ffprobe dimensions/duration/frame count;
  moving playback and representative frames at 360px square.
- Coordinator runs ESLint --fix on owned TS/TSX paths, then checks the staged
  diff in a separate tool call before commit. No configured hook/format wrapper.
  Existing parts/ ignore rule requires force-adding named new scene files.
- No numeric slice limit supplied. Each slice has one viewable outcome and
  render-review loop; stop and refine if its scope or integration cannot converge.
- Commit locally; no push request for this story. No GitHub Actions workflow,
  therefore no observer; report CI unavailable rather than green.

## Ordered slices and proof

### 1. Follow the imagined change into product impact
Type: Behavior
Status: done

Behavior: Opening StoryDrivenDevelopment plays the first 96 seconds (cues 1–15
and their pauses): story/present distinction, progressive dimensions, backlog,
human desire, cross-boundary transition, feature history, and local disturbance.
The new composition is an explicitly interim opening cut; slice 2 extends it
in place to the complete argument. Preserve the existing proof composition.

Proof: Real 2880-frame opening render; inspect introduction, desire/transition,
and contact/disturbance. Focused caption and visual scene checks prove the
progressive dimensions and retiming; existing proof tests stay green. This
slice owns opening story examples 1 and 2 and interim output only.

### 2. Follow assimilation through decisions into the coherent present
Type: Behavior
Status: done

Behavior: The same composition now plays all 28 cues over 180 seconds, completing
reconciliation, judgment, decisions, assimilation, history and next possibility.
Remove the interim duration/description. Keep the product recognizable and
changed at the ending. Preserve the 33-second proof.

Proof: Render all 5400 frames with --muted, ffprobe 180s/1080x1080/30fps/video-only,
inspect the whole moving cut and chapter/caption/pause frames at phone size.
Focused scene tests verify final changed/preserved geometry, resolved alternatives,
history and next story, exact script cue windows, all pauses and cue-duration
changes shifting dependent beats. Existing proof remains green. This slice owns
examples 3–5 and final delivery across examples 1–2.

## Cumulative design and constraints

Use a single product-space model and caption wording shared where the two cuts
overlap; varying cue timing is legitimate, competing copies of geometry are not.
Do not over-generalize the engine. Keep scene-specific orchestration local.
The full Markdown script remains authoritative; demonstrate that production cue
wording/timings match it, with an explicit update path. Generated assets are
conditional on explanatory value, not a quota.

The renderer proves delivery, not human comprehension. Terry has authorized the
proof treatment's expansion. Preserve actual viewer feedback separately if it
arrives; do not invent endorsement. Retrospective precedes wrap-up.

## Learnings and evidence

- Opening delivered as 96s / 2880 frames / 1080-square video-only MP4.
  Render: `pnpm -C terry-moves exec remotion render src/index.ts
  StoryDrivenDevelopment out/story-driven-opening.mp4 --concurrency=2 --muted`.
  ffprobe confirms dimensions, frames and duration.
- Focused Jest `pnpm -C terry-moves exec jest --runInBand
  tests/video_conomponents/StoryAssimilation.spec.tsx
  tests/video_conomponents/StoryDriven.spec.tsx`: 7 tests pass, including all
  source caption windows, retiming, two opening visual holds and proof regression.
  `pnpm -C terry-moves exec tsc --noEmit` and selected-file ESLint pass.
- Reviewed moving 360px playback and five representative frames. Dimensions,
  desire, history and disturbance are legible; captions remain in their own area.
- Shared ProductSpace preserves proof behavior. Extraction initially added two
  arrowheads; fixed before delivery. Frame360 comparison to lossy baseline MP4
  SSIM .98818 with no material visible difference. Existing proof tests pass.
- Independent refactor extracted neutral CueTimeline and StoryProductFrame,
  preserving emitted markup. Focused tests and tsc passed after refactoring;
  renderer evidence remains applicable. No framework expansion.
- Static footer avoids movement during planned pauses. Opening duration derives
  from the script boundary before assimilation, not a second absolute timestamp.
- Slice 2 must remove the interim composition duration and opening-only docs,
  retain this shared model, and finish judgment/history at full script timing.

- Complete cut delivered as 180s / 5400 frames / 1080-square / 30fps,
  video-only MP4 using the documented muted render command. All 28 subtitle
  windows and four pauses match the script. Focused Jest: 10 tests pass;
  TypeScript and selected-file ESLint pass.
- Reviewed phone-size playback and caption midpoint contact sheets. Captions
  fit; tentative judgment resolves, changed and unaffected regions remain,
  and a new possibility appears independently of the spent story history.
  A historical trace initially hidden behind the current plane was exposed
  in depth space and the complete render regenerated before acceptance.
- Independent refactor unified stroke geometry and judgment anchor positions,
  and moved chapter labels into an ordered table. All 10 tests and TypeScript
  pass afterward; title equivalence checked across 10,860 normal/retimed frames.
  Emitted visuals and timing unchanged, so final render evidence remains valid.
- No remaining implementation findings or production questions at delivery.
  Audience comprehension and final presentation remain release evaluation.
  No CI workflow exists and no push was performed.
