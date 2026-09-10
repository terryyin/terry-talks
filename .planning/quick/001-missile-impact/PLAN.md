# Faithful missile impact study

Source: [selected story](../../../Story%20Driven/seed.md#impact-treatment).

## Goal and scope

Deliver one separate 33-second silent square scene for Terry to evaluate against
his lower flip chart and corrected inward time arrow. Preserve existing exports,
full-film source, excerpt cue wording/timing, and the warm paper/ink language.
No full-film rewrite, release/audio work, platform changes, or publication.

## Outside-in proof and ordered slice

### 1. Watch a missile become a lasting product change
Type: Behavior
Status: done
Proof: Render the registered composition to MP4 and inspect opening, entry,
blast, reconciliation, and ending frames at phone size. Confirm 1080 square,
30 fps, 33 seconds. Focused scene regression covers timing, spent projectile,
multiple changed regions and stable unaffected geometry; visual inspection owns
spatial fidelity, recognizable silhouettes, visible blast, and caption clearance.

Behavior: With a product and right-hand queue visible → play the scene → one
missile enters, explodes inside the upright product, and becomes an assimilated
change in a coherent product, with unaffected regions and history retained.

Promise ownership: This single slice owns all four story examples, all three
axis directions, captions, reproducible output and retained earlier artifacts.
Terry's artistic assessment remains pending after delivery.

## Current decisions

- Reuse the existing 33-second assimilation excerpt timeline and frame shell.
  Add a separate composition; keep previous studies and complete cut available.
- One local SVG scene uses one product geometry across all animation phases;
  no new general animation framework or raster-generation requirement.
- No numeric slice budget is configured. This is one continuous demonstration
  with one render/inspection proof loop; blast readability is the main uncertainty.
- Existing pnpm/Remotion tooling and Jest are the execution boundary. Use focused
  Jest scene tests, TypeScript, Remotion stills/render; format only touched TS/TSX
  via the existing ESLint fixer. No active Git hook is installed. Commit only
  owned changes after explicit staged-file lint, and do not push (AGENTS.md).
- Pre-existing edits in PRODUCT-BACKLOG.md and seed.md must be preserved; leave
  both pre-edited files unstaged, including the in-place story refinement, to avoid
  committing the user's earlier decomposition as part of this slice.

## Assessment

No independent second outcome or speculative preparatory slice was identified.
Visual judgment is the remaining uncertainty, resolved by inspecting the rendered
scene and delivering it for Terry's evaluation, not by broadening production.

## Evidence and learnings

- `pnpm -C terry-moves exec jest --runInBand tests/video_conomponents/StoryMissileImpact.spec.tsx`: 4 tests pass. Inspected assertions for entry before detonation, spent projectile, blast, persistent multi-region changes, fixed upper region/history, judgment hold, and cue shifts.
- `pnpm -C terry-moves exec tsc --noEmit`: pass.
- `pnpm -C terry-moves exec jest --runInBand tests/video_conomponents/StoryAssimilation.spec.tsx tests/video_conomponents/StoryDriven.spec.tsx`: existing 10 tests pass.
- `pnpm -C terry-moves exec remotion render src/index.ts StoryMissileImpact out/story-missile-impact.mp4 --concurrency=2 --muted`: pass, complete 990-frame H.264 render. ffprobe confirms 1080 × 1080, 30 fps, 33 seconds, video only.
- Inspected exported frames 0/145/190/380/690/980 at 360px each in `terry-moves/out/missile-contact-sheet.png`: axes faithful, left-facing queue recognizable, entry precedes internal blast, alternative paths pause before settling, unaffected upper region remains, coral path and new supporting connection persist, captions clear of diagram. This is frame inspection, not a claim of Terry's approval or viewer comprehension.
- Renderer emits a missing flower-model scene.bin request: unrelated existing StoryProductDeveloper import at src/stories/StoryProductDeveloper.tsx:112; that asset is explicitly gitignored. New scene uses inline SVG and complete export/frame inspection succeeded; no scope expansion to repair another composition.
- New src/parts/StoryMissileImpact.tsx matches the root Python-era `parts/` ignore rule; force-add this owned source file, consistent with existing tracked scene modules.
- Independent dough-post-change-refactor review: none — already clean; no edits or redundant tests. Selective ESLint fixer and git diff --check pass. Local delivery only; retain this plan for retrospective and wrap-up. No push or CI observer is authorized/started. Terry's evaluation remains pending; backlog item retained.
