# Corrected story-driven complete cut

Source: [refined story](../../../Story%20Driven/seed.md#revised-complete-cut).
Status: in-progress

## Goal and scope

Deliver a silent, watchable 180-second square working cut using the upright
product, right-hand missile queue, visible internal explosion, and coherent
changed present. Preserve all 28 caption windows and four three-second still
holds. Improve the interim missile treatment for review; artistic acceptance
remains Terry's. Release polish, audio, branding, other formats, publication,
and authoring platform work are deferred.

## Execution context and decisions

- Remotion 4.0.518 / React, existing cue timeline and StoryProductFrame. Make
  local animation changes, no new platform or architectural decision.
  ADR-0000 (docs/adrs/0000-use-adrs-accepted.md) reserves durable decisions to Terry.
- No active plan exists. Highest retained historical allocation is 005; use 006.
- Status: planned / in-progress / done. No numeric slice target or hard limit
  supplied; each slice has one outside-in proof loop. Track elapsed work.
- Focused command: `pnpm -C terry-moves exec jest --runInBand tests/video_conomponents/StoryDriven.spec.tsx tests/video_conomponents/StoryAssimilation.spec.tsx tests/video_conomponents/StoryMissileImpact.spec.tsx`.
- Integration: `pnpm -C terry-moves exec tsc --noEmit`.
- Selective formatting: `pnpm -C terry-moves exec eslint <changed src paths relative to terry-moves> --fix`; whitespace: `git diff --check`.
  Existing format script formats all src, so invoke its ESLint mechanism only
  on owned changed source. No configured core.hooksPath or pre-commit hook;
  use explicit check-only ESLint for changed source before commit.
- No caption edits, so no SRT regeneration trigger. Render triggers on scene
  changes. Preserve old independently playable studies and their behavior.
- Fresh implementation and refactor agents per slice per execution skill;
  coordinator owns formatting, plan updates and commits. No push authorized,
  therefore no CI observer is started. Local delivery follows user instruction.

## Cumulative design and sizing assessment

Use one corrected product model for the full cut, with cue-driven reveal,
disturbance, reconciliation and retained state. Avoid repeating geometry per
chapter or adding unrelated platform abstractions. Preserve the old study when
sharing would change its historical treatment. Slice 1 owns the spatial model;
slice 2 extends its state transitions; slice 3 owns the final exported viewing
artifact. Export is an external runtime step, not a fabricated time exception.
No remaining slice-specific decomposition concerns identified on this assessment.

## Ordered slices and proof ownership

### 1. A possible story approaches the upright product
Type: Behavior
Status: done
Behavior: Start the working cut → introduce dimensions, backlog and desire →
viewers distinguish the upright present from possible changes approaching from
the right, with Structure up, Behavior left/down, Time horizontal toward the joint.
Proof: StoryDrivenScene focused rendering assertions and rendered frames of
cues 03–13. Owns refined examples 1–2, progressive reveals and early continuity.
Retain currently working later argument; slice 2 replaces its old impact treatment.

### 2. Explosive impact becomes a coherent changed present
Type: Behavior
Status: planned
Behavior: Pursue the selected missile → entry and visible internal explosion →
judgment and assimilation leave changed behavior and structure, unaffected
identity, available history and a next possibility after the projectile is spent.
Proof: Full-scene transition assertions and rendered before/impact/after/ending
frames. Owns examples 3–5, improved blast treatment, identity, choices resolving,
retained change, spent projectile, history and next story. Verify the four
still holds and all captions at the scene boundary, including retiming.

### 3. Watch the complete corrected film silently at phone size
Type: Behavior
Status: planned
Behavior: Open the reproduced MP4 at 360-pixel square size → watch all three
minutes silently → captions and corrected argument remain visible through
all scenes and holds, with a coherent changed ending.
Proof: Render `pnpm -C terry-moves exec remotion render src/index.ts StoryDrivenDevelopment out/story-driven-development.mp4 --concurrency=2 --muted`;
inspect video duration, dimensions, fps and absence of audio; inspect representative
phone-size frames and the moving film, fix discovered presentation defects,
and update complete-cut.md with current behavior and reproduction instructions.
Owns example 6, export baseline, caption clearance and readability, retained
editable source/artwork, final continuity. Technical and agent viewing evidence
must not be described as Terry's artistic acceptance or viewer comprehension.

## Learnings and delivery evidence

- Refinement from the preceding turn is uncommitted and belongs to this task;
  include it with the first slice. Backlog order and sibling stories are unchanged.

- Slice 1 review: frame 1455 rendered with clear queue, axes, desire and caption.
  Frame 2190 exposed overlapping intended-change and many-stories labels; fixed
  by clearing its label at cue 12; rendered again and verified clear. Shared assimilation rules were consolidated
  after independent refactor review; old study behavior is preserved by focused
  tests. No scope change or slice-size escalation.
- Render diagnostic: successful still renders emit a missing scene.bin request
  from unchanged StoryProductDeveloper.tsx module-level GLTF preload (lines
  112–113). Its tracked flower scene.gltf references an absent scene.bin; this
  full-cut SVG scene does not use that asset. Retain as unrelated existing asset
  issue, not a waiver of rendered full-cut proof.

- Slice 1 delivered: implementation ~5 minutes plus review/fix/refactor.
  Three focused suites / 16 tests and typecheck passed; after label fix, the
  affected StoryDriven suite / 9 tests passed. Independent refactor completed,
  selective ESLint formatting and check passed; whitespace clean.
  Rendered proof: out/revised-desire.png (1455), out/revised-proposal.png (2190).
