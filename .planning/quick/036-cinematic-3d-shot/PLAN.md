# Direct and revise a cinematic 3D bottleneck reveal

**Identity:** terry-moves-filmmaking#cinematic-3d-shot
**Source:** [refined story](../../../terry-moves/seed.md#cinematic-3d-shot).
**Authority:** Terry accepted the bottleneck-reveal/browser-3D recommendation on
2026-10-12 and requested slice planning. This plan authorizes no implementation.

## Goal and scope

Terry gets a short silent film that begins close on moving work, pulls back to
reveal work queued at a narrow passage, and holds so the constraint reads. He
can change its framing through a script and reproduce the selected result from
retained inputs. Deliver a watchable original and meaningful framing revision,
with the same scene at any frame regardless of how that frame was reached.

Use authored simple geometry and materials, with intentional depth, camera,
staging and lighting. Working delivery defaults: roughly 12 seconds, 1080×1080,
30 fps, H.264/yuv420p/BT.709. These are production starting points, not limits;
tune pacing within the short silent shot to make the reveal readable. Use one
browser renderer. Defer Blender integration/parity, character rigs, arbitrary
model import, simulation, audio production and a visual editor. Do not make
these exclusions into input rejection rules. Existing films stay unchanged.

## Current design and reuse decisions

- Reuse `@remotion/three` for rendering, and `src/beatTimeline.ts` for ordered
  beat durations and arbitrary-frame sampling. The script owns named stage
  marks, objects, camera cues, timing and lights; the scene applies the sampled
  direction. Geometry/material construction is local to this film. One source
  owns each authored value; do not duplicate camera endpoints or timings in JSX.
- Theatre cueing supplies a useful authoring mechanism: marks become positions,
  cues become timed direction, and order determines the shot. Unlike live
  theatre, evaluate from the requested frame rather than accumulated elapsed
  time. The common rule is to sample each cue's authored start/end state using
  the same clock, with defined holds and continuous joins where authored.
- PFE inspected `Script`, `AnimationContextWrapper`, `ThreeAnimationEffect`,
  `UnderCamera`, `LightSource`, `ThreeDFrameInner`, `beatTimeline` and
  `silentScene/compileScene`. The older action pipeline already owns 3D
  transforms, but its subtitle context and fixed frame lighting do not fit this
  silent shot as directly as the existing generic beat clock and `ThreeCanvas`.
  Reuse those lower-level product/dependency solutions without another clock.
  Do not copy the silent actor's reach/prop ownership rules into this scene.
- Keep camera/light application local to the new composition; do not alter
  `ThreeDFrameInner` defaults or `UnderCamera` merely to configure this shot.
  Set sampled camera position/target explicitly before drawing, updating
  projection/matrices when relevant. Changing the canvas's initial camera props
  alone failed the [retained real render probe](./PREPARATION.md). No per-frame
  accumulated `useFrame` animation, wall-clock time, unseeded randomness or
  warm-up prerequisite.
- No external asset acquisition is needed for the authored geometry. Retain the
  scripts, geometry/material definitions, original/revised direction and export
  settings. Any asset introduced to achieve the agreed look must be saved with
  its source and applicable permissions, not fetched during routine rendering.
- Existing `Root.tsx` composition registration and Remotion CLI are the delivery
  path. Product locations may be capability-named, e.g. `src/cinematicShot/`,
  `tests/cinematicShot/` and `CinematicBottleneck`; never copy this plan number.
  Choose final names once, use them consistently in code, commands and guide.
- [ADR-0000 — Use Architectural Decision Records](../../../docs/adrs/0000-use-adrs-accepted.md)
  is the only Accepted record, confirmed against its index. Durable decisions
  and exceptions stay human-owned. This local composition introduces no
  cross-cutting engine policy, ADR change or North Star topic. No existing
  North Star file was found under the established planning root.

## Decisive premises and observed preparation evidence

The [retained preparation observations](./PREPARATION.md) record setup, exact
commands, renderer results and limits. Changing only initial camera props
failed; explicit sampled updates passed real forward/reverse/fresh-frame proof.
The probe establishes the route, while the actual film proof remains owned below.

## Outside-in proof ownership

| Final promise | Owning slice and observable signal |
| --- | --- |
| Watchable silent bottleneck reveal with depth, movement, staging and lighting | 1: registered composition exported to MP4 and reviewed at normal speed against close view → reveal → readable hold. |
| Script owns direction, with one preview/export clock | 1: real composition consumes the authored object/mark/camera/light cue data; focused tests inspect sampled state at cue boundaries, and real frames show corresponding composition. |
| Sequential, backward and fresh-middle equivalence | 1 for original, 2 for revised: same-renderer PNG comparisons and actual Studio seek/mount observations, including moving-camera and cue-boundary frames. |
| Meaningful framing revision without component repair | 2: change camera cue values in the script only, export and compare original/revised framing with the queue and passage more clearly visible. |
| Saved inputs reproduce the selected shot | 2: retain both directions and selected version, remove only attempt-owned generated outputs and render again from saved source inputs; compare picture sequences and duration/fps, without asset retrieval/generation. |
| Existing films preserved | 1/2: new composition registration only; no old direction/asset/default edits. If shared behavior must change, identify its consumers and add focused regression observation before that change. |

## Ordered slices

### 1. Watch the scripted camera reveal the bottleneck
Type: Behavior
Status: done
Proof: The registered shot plays and exports the close view → pullback → hold, with rendered frame equivalence across traversal orders.

Behavior: Given the authored work pieces, narrow passage, queue, staging marks,
camera/light cues and durations → preview and render the shot → depth and motion
reveal the constraint, with readable lighting and a deliberate closing hold.

- Build one composition and a small film-local authored direction using the
  existing beat clock. Define object staging, camera positions/targets and light
  settings in that direction. Timing comes from the ordered cues. Give moving
  work a deterministic authored path; no physics/throughput simulator is needed.
- Shape the actual film's material, lighting, perspective and camera path until
  the intended relationship reads at normal speed. Geometry can be simple but
  must be intentional: avoid obscured queue/passage, accidental clipping, flat
  undifferentiated silhouettes and unexplained camera jumps.
- Add focused proof through the real script-to-scene boundary for the cue
  start/middle/end states, sampled camera/objects/lights and total duration.
  Supply authored data, not precomputed expected poses as renderer inputs.
- Capture actual pixel frames forward and reverse on the same renderer. Check a
  fresh mount during the move and immediately around cue joins. Include a
  nonzero camera movement and confirm visible change; a frozen camera must fail
  the proof rather than passing because all frames match one another.
- Through `dough-manual-testing` during execution, observe the real registered
  Studio composition: normal playback, backward seek from the hold into the
  moving camera, and direct middle-frame mount. Compare framing and lighting to
  the exported frames. Record exact frames and observations in this plan.
- Render the watchable MP4 and representative close/reveal/hold stills. Inspect
  duration, fps and encoding. Keep evidence for Terry's artistic review; do not
  label the film approved without his actual approval.
- Safe stop: a complete original shot is usable and reproducible from its source;
  the demonstrated authoring revision and final reproduction guide remain slice 2.

### 2. Revise the framing and reproduce the selected take
Type: Behavior
Status: done
Proof: A script-only camera revision yields a visibly clearer reveal; the retained selected direction reproduces the same picture sequence and edit.

Behavior: Given the finished original → change its camera ending position/target
or reveal timing in the script, preview and export → a deliberate revised shot
shows the queue/passage relationship more clearly, and a later export reproduces
that version from the saved inputs.

- Retain the original direction and one meaningful revision, using the same
  evaluator and rendering path. Keep the editable difference at the authored
  camera cue boundary; do not copy the scene or add a revision-specific handler.
  Staging and light settings remain script-owned. No second revision UI or asset
  lifecycle framework is needed.
- Compare original and revised close/reveal/hold frames and watch the revised
  MP4 at normal speed. Verify the actual framing change and its purpose, not
  merely that some pixels changed. If the selected change changes timing,
  derive the new composition duration from the same cues.
- Repeat the relevant real-pixel forward/reverse/fresh-mount proof on the revised
  movement and joins. Reuse slice 1 proof for unchanged boundaries only.
- Identify the retained version to reproduce without implying Terry approved it.
  Render it again after deleting only generated attempt-owned output; compare
  decoded picture frames and duration/fps under the same renderer configuration.
  Binary MP4 equality is not required because encoding metadata is not staging.
  Production rendering reads saved authoring inputs, with no model fetch or
  generation call. If external assets were actually introduced, retain the
  files and their provenance/permissions and include them in this reproduction.
- Add the film-local guide and a concise entry in `terry-moves/README.md`:
  script location, stage/camera/light edits, how cues determine duration,
  original/revised selection, Studio composition, export command, saved inputs,
  and output paths. Run the documented commands against the retained selection.
- Safe stop: Terry has the finished film, its meaningful alternate framing and
  a tested way to revise and reproduce the selected take.

## Execution complete

Product advice: No backlog change recommended. The finished original and revised shot support the current direction of varied films through scripts. Keep the next 3D-character story's priority; rigs, clips and contact still need that story's own assessment.

Retrospective: complete; findings none, correction planning unchanged. Process review skipped (no project opt-in). Attributable implementation publications are `b13477e6d481cf1e363aa3de950cbeaeeceed301` (original) and `e288267020dd77e631b8af58f1ca8a23ff63c042` (revision/reproduction); the established claim and preparation are provenance, with no interleaved unrelated commits. Reviewed the original story/plan, aggregate source/tests/docs, actual images and accepted proof. Geometry/direction and renderer remain film-local, reuse the existing clock, and leave old defaults untouched; ADR-0000's human decision ownership is preserved. Real render evidence guided camera application, numeric tests caught endpoint rounding, and the real-pixel harness validates the integrated result. Seventeen fast authored-direction tests and the real-pixel journey have distinct proof roles; no supported suite cleanup is needed. Artifact reproduction is proved for all 360 decoded pictures; traversal pixels are the exact representative selections recorded above, with all-frame numeric and Studio evidence. Artistic approval is unclaimed. CI for the accepted story-branch revision was pending during review; the coordinator completion operation owns its final verdict and shutdown.

Additional consumer proof: `pnpm -C terry-moves test:unit --runInBand tests/tpsAndAi/languageEditions.spec.tsx tests/tpsAndAiJit/film.spec.tsx` passed 2 suites/37 tests. Inspected their real Root registration, selected-film and media/sequence assertions: the added registration preserves the existing language editions and JIT film. No correction was implemented or proposed.

## Verification and delivery

During execution use focused tests under the new shot's test directory, plus
`pnpm -C terry-moves typecheck` for composition/type integration and selective
ESLint for changed TS/TSX. Real render/Studio checks above own the image promises;
mocked component or pure sampler tests alone cannot satisfy them. Observe new
regression proof fail with camera updates disabled, then pass when restored.
If a shared clock, frame default or camera component actually changes, inspect
all affected consumers and run their focused suites; the current local design
needs no old-film rerenders or full repository test run.

Follow dough-execute-plan for slice-local independent post-change refactoring,
required checks, commits, delivery and CI ownership once execution is explicitly
authorized. Record accepted proof, consequential learnings and slice status in
this plan. No refactoring agent, CI observer, Take or execution is started by
preparation. A concern requiring a different story outcome returns to Terry;
a local rendering failure first changes the affected implementation/proof plan.

## Plan review

Two Behavior slices give separate useful stops: the original watchable reveal,
then a proven revision/reproduction journey. No preparatory Structure slice is
needed. The common model is authored direction sampled by one clock, not a
collection of per-version special cases. Geometry, light and camera work belong
together in the first visible result; revision and saved-version reproduction
belong together in the second. No project numeric slice limit is supplied.

Slice-plan refinement was not needed: boundaries, shared model and proof owners
are coherent, with no remaining slice-specific concern identified. Browser
rendering, sampling and encoding premises were observed in this checkout.
Film quality and the actual shot's frame equivalence remain explicit delivery
proof, not pre-claimed acceptance. Record readiness against the completed seed
and this plan; it grants no execution authority.

## Execution context

Mode: story-branch. Owned execution checkout: `/Users/terryyin/git/terry-talks/.worktrees/i-can-direct-a-cinematic-3d-shot-through-the-scr`; branch: `codex/i-can-direct-a-cinematic-3d-shot-through-the-scr`. Established publisher: `dashboard-territory.local-terry-talks`; agent: Nao-chan. Claim/base: `156758245cc311bcb04ffbac301762b09a27dd36`, starting revision: `dc3e5474c051ef57ba49e386145b496982b06290`. Remote: origin; integration target: master; increment target: execution branch. No integration checkout is mutated. Replanning retains existing planned authority; no numeric slice budget is supplied. Locked offline install and checkout-local typecheck passed on 2026-10-12. No pre-commit hook exists; selective ESLint formatting/checking applies to changed TS/TSX.

CI source: GitHub Actions, verified `ci.yml` (CI, ID 381584897). Coordinator: `nao-cinematic-3d`; observer: `/tmp/dough-ci-501/watch-z8QjqT`; PID 60847; PTY session 25904; yielded cell 8. Observer covers the execution branch. The earlier trunk claim has unobserved CI coverage. Checkout-local Studio: http://localhost:3001 (session 8214).

Slice 1 publication accepted: `b13477e6d481cf1e363aa3de950cbeaeeceed301` on the remote execution branch, suffix base `156758245cc311bcb04ffbac301762b09a27dd36`. Managed delivery reused the retained observer; this accepted SHA is the next increment's base. CI was pending at slice 2 dispatch.

Slice 2 publication accepted: `e288267020dd77e631b8af58f1ca8a23ff63c042` on the same branch, suffix base `b13477e6d481cf1e363aa3de950cbeaeeceed301`; observer reused. This is the execution-complete record's previously published base.

## Accepted slice 1 proof

- Independent post-change refactor completed: `shotFormat` centralizes unchanged 30 fps/1080-square values; preparation evidence extracted verbatim to `PREPARATION.md`. Typecheck passed; numeric, real-pixel, negative-camera, manual and MP4 observations remain applicable. Selective ESLint formatting/check and `git diff --check` passed.
- `pnpm -C terry-moves test:unit --runInBand tests/cinematicShot`: 8 tests passed. Inspected `direction.spec.ts` through authored input → `compileDirection` → existing beat clock: start/middle/end camera, lights and pieces; 360-frame edit; both complete-pose joins; final hold; all 360 numeric poses forward/reverse; five fresh evaluators; mark edit. Returning authored endpoints exactly resolved floating-point discrepancies at joins.
- `pnpm -C terry-moves exec tsx scripts/verify-cinematic-shot.ts`: passed. Inspected `pixelEntry.tsx` → real `DirectedShot`, plus actual registered composition fresh mounts. ANGLE/1080×1080/concurrency 1: 11 forward/reverse PNG pairs (0,30,74,75,76,150,238,239,240,241,359), fresh 74,75,150,239,240, identical adjacent joins, six distinct camera-only pictures with objects/lights fixed. Evidence: `terry-moves/out/cinematic-bottleneck/pixel-proof/result.json`.
- Camera-disabled bundle: `pnpm -C terry-moves exec remotion bundle tests/cinematicShot/pixelEntry.tsx --out-dir out/cinematic-bottleneck/camera-disabled/bundle`; `pnpm -C terry-moves exec tsx /tmp/cinematic-bottleneck-negative/verify-disabled.ts out/cinematic-bottleneck/camera-disabled` failed as intended: only 1/6 camera-only pictures distinct. Production source restored before negative rendering; positive proof above passed afterward.
- `pnpm -C terry-moves typecheck`: passed. Root only adds the new registration; inspected consumers stay film-local. Existing direction, assets, shared clock and defaults are unchanged.
- Exports passed: `pnpm -C terry-moves exec remotion still src/index.ts CinematicBottleneck out/cinematic-bottleneck/close.png --frame=30`, equivalent `reveal.png --frame=150` and `hold.png --frame=300`; `pnpm -C terry-moves exec remotion render src/index.ts CinematicBottleneck out/cinematic-bottleneck/original.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2`. All stills matched corresponding proof hashes. `ffprobe -v error -show_entries stream=codec_name,width,height,pix_fmt,avg_frame_rate,nb_frames,color_space,codec_type -show_entries format=duration -of json terry-moves/out/cinematic-bottleneck/original.mp4`: h264/1080 square/yuv420p/bt709/30 fps/360 frames/12 seconds/video-only.
- Manual scope: normal playback, backwards and fresh-middle visits, cue joins and exported look; existing setup reused, breadth across these journeys then depth at joins, no extra exploration. Studio `http://localhost:3001/CinematicBottleneck`, 1×: observed 4/7,118/121,301/303; seek 300→150 matched exported reveal framing/light; reload mounted directly at 150 with same picture. 74→75 and 239→240 were visibly identical. Saved close30/reveal150/hold300 inspected; native QuickTime original MP4 playback 0→7→12 seconds read smoothly and ended with the constraint visible. Manual result: Good. Artistic approval remains Terry's.

## Story obligations

### G1. Existing GLTF warning during Root exports
Reported: slice 1 — "Root-based rendering logged an existing missing quillustration_flower_and_water-can/scene.bin asset."
Story clause: "The watchable result and reusable direction path both matter."
Disposition: no user cost "The watchable result and reusable direction path both matter.": the missing asset belongs to unchanged StoryProductDeveloper, is unused by the new shot, and did not prevent its successful renders; isolated real-pixel proof had no warning.

### G2. Studio cannot save the imported default
Reported: slice 2 — "Studio's inability to save the imported script-owned default is explicitly documented."
Story clause: "then meaningfully revise the finished shot through its script."
Disposition: no user cost "then meaningfully revise the finished shot through its script.": the guide retains selection by editing script.selectedTake; Studio preview/export props and explicit original export work. A source-writing visual editor is deferred; no duplicate default is introduced to suppress its notice.

## Accepted slice 2 proof

- Independent post-change refactor completed: no code candidates; root README wrapping compacted without word/link/command changes to stay at 250 lines. All accepted proof remains applicable. Selective ESLint formatting/check and `git diff --check` passed.
- `pnpm -C terry-moves test:unit --runInBand tests/cinematicShot`: 17 tests passed; inspected both authored takes through the same evaluator, including every frame's unchanged work/light/FOV, original opening and changed ending camera. `pnpm -C terry-moves typecheck` passed. Take consumers in scene, metadata and pixel harness were exercised.
- `pnpm -C terry-moves exec tsx scripts/verify-cinematic-shot.ts out/cinematic-bottleneck/revised-pixel-proof revised`: passed 11 forward/reverse pairs, 5 fresh registered-composition mounts, both adjacent joins and 6 distinct camera-only pictures. `revised-pixel-proof/result.json` retains exact selection/hashes. Slice 1's negative-camera observation still covers unchanged camera application.
- The guide's full revised MP4/still commands passed, as did its explicit original-props hold command. `python3 terry-moves/out/cinematic-bottleneck/reproduction/compare-stills.py` passed: default revised stills match revised proof, original props match retained original hold, close is identical and reveal/hold differ. Inspected both views: revised camera fits all platform corners, shows a broader opening and clearer queue/exit relationship; no scene/light/action repair.
- Saved-input proof: copied first export to `reproduction/reference.mp4`, removed only generated revised.mp4, reran the guide's render command. `ffmpeg -v error -i terry-moves/out/cinematic-bottleneck/reproduction/reference.mp4 -map 0:v:0 -f framehash -hash sha256 terry-moves/out/cinematic-bottleneck/reproduction/reference.frames.sha256` and corresponding revised.mp4 command produced decoded SHA-256/frame times. Both full ffprobe metadata commands and `python3 terry-moves/out/cinematic-bottleneck/reproduction/compare.py` passed. Inspected assertions/result.json: all 360 decoded pictures/times and metadata equal, 12 s/30 fps/1080 square/h264/yuv420p/bt709/video-only. Saved script/evaluator/geometry/materials/settings/locked dependencies supplied inputs; no asset fetch or generation.
- Manual scope reused slice 1 setup and original observations, then checked revised playback/seek/mount and changed join. Studio default revised at 1×: 7/10,167/170,340/343, near 30 fps; seek300→150 and fresh reload150 matched exported reveal framing, lighting and block at opening. 239→240 visibly identical; unchanged 74/75 manual proof reused, new pixels cover both. Native QuickTime reference MP4 played 0→6.14→12 s, smooth pullback/hold and clearer relationship; reproduction proves final revised MP4's same pictures. Manual result: Good. Artistic approval remains Terry's.
