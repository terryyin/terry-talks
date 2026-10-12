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
  alone failed the real render probe below. No per-frame accumulated `useFrame`
  animation, wall-clock time, unseeded randomness or warm-up prerequisite.
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

Observed on 2026-10-12 in the established preparation checkout
`/Users/terryyin/git/terry-talks/.worktrees/i-can-direct-a-cinematic-3d-shot-through-the-scr`,
branch `codex/i-can-direct-a-cinematic-3d-shot-through-the-scr`, product base
`c4c9975f12c1d3e19e21e0cfa9d093ea578a770f`. Dependencies were installed from the
lockfile with Node 24.21.0 and pnpm 11.28.5. Remotion 4.0.533, Three 0.186.1,
R3F 9.8.1 and the existing ANGLE configuration rendered locally using Remotion's
Chrome Headless Shell 149.0.7790.0. Sandbox network initially prevented the
browser download; the authorized retry completed. This is not a route blocker.

The disposable `src/__preparationProbe.tsx` registered `PreparationProbe`, a
320×180/30 fps/30-frame scene: yellow and cyan boxes at different depths,
ambient and directional light, and the existing beat clock sampling camera x
as `elapsedSeconds * 2`. A `reverse` input sampled `29 - frame`. The corrected
version applies camera position `[x,2,6]`, target `[0,0,0]` and projection/world
matrix updates in a layout effect through R3F's actual camera. No mesh, light
or canvas was mocked. Inspected the rendered middle frame. Probe source and
images were retained outside the checkout at `/tmp/cinematic-3d-preparation/`;
all scratch product edits were removed before writing preparation records.
These temporary artifacts are observation evidence, not production assets.

| Premise and consumer | Observation and result | Planning consequence |
| --- | --- | --- |
| Existing camera-prop changes animate in the renderer | Initial forward render produced only 1 distinct PNG across 30 frames; direct frame 15 differed; all 30 reverse counterparts differed. | False. Do not rely on initialization props for camera movement. |
| Explicit sampled camera updates work through real rendering | Corrected forward render produced 30 distinct PNGs. All 30 reverse counterparts were byte-identical to the corresponding forward PNG; a fresh frame 15 was identical. | Supported for this representative geometry/light/camera route. Actual shot and Studio seeking still need slice 1 proof. |
| Existing beat sampler is usable by this 3D scene | The real render consumed `timeline(...).poseAt(frame)` and its reversed order to compute camera positions above. | Reuse it without changing its API. No assumed transfer of silent-scene domain rules. |
| MP4 delivery works in this checkout | The same probe encoded successfully. `ffprobe` reported h264, 320×180, yuv420p, bt709, 30/1 fps, 30 frames. | Encode the actual shot through this route; no claim about its eventual 1080px speed or artistic quality. |
| Focused existing test route runs | 3 suites / 28 tests passed for frame sizing, 3D transforms and silent-scene joins. Canvas mocks make these insufficient pixel proof. | Tests locate reusable numeric boundaries; new real-render proof must discriminate the observed camera failure. |

Literal observation commands (from repository root; scratch source is removed):

```sh
pnpm install --offline --frozen-lockfile --store-dir /Users/terryyin/Library/pnpm/store/v11
pnpm -C terry-moves test:unit --runInBand tests/video_conomponents/ThreeDFrame.spec.tsx tests/video_conomponents/ThreeAnimationEffect.spec.tsx tests/silentScene/joins.spec.ts
pnpm -C terry-moves exec remotion render src/__preparationProbe.tsx PreparationProbe /tmp/cinematic-3d-preparation/sequential --sequence --image-format=png --frames=0-29 --concurrency=1
pnpm -C terry-moves exec remotion still src/__preparationProbe.tsx PreparationProbe /tmp/cinematic-3d-preparation/direct15.png --frame=15
pnpm -C terry-moves exec remotion render src/__preparationProbe.tsx PreparationProbe /tmp/cinematic-3d-preparation/reverse --sequence --image-format=png --frames=0-29 --concurrency=1 --props '{"reverse":true}'
# After the explicit sampled-camera scratch change:
pnpm -C terry-moves exec remotion render src/__preparationProbe.tsx PreparationProbe /tmp/cinematic-3d-preparation/fixed-forward --sequence --image-format=png --frames=0-29 --concurrency=1
pnpm -C terry-moves exec remotion render src/__preparationProbe.tsx PreparationProbe /tmp/cinematic-3d-preparation/fixed-reverse --sequence --image-format=png --frames=0-29 --concurrency=1 --props '{"reverse":true}'
pnpm -C terry-moves exec remotion still src/__preparationProbe.tsx PreparationProbe /tmp/cinematic-3d-preparation/fixed-direct15.png --frame=15
pnpm -C terry-moves exec remotion render src/__preparationProbe.tsx PreparationProbe /tmp/cinematic-3d-preparation/probe.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=1
ffprobe -v error -show_entries stream=codec_name,width,height,pix_fmt,avg_frame_rate,nb_frames,color_space -of json /tmp/cinematic-3d-preparation/probe.mp4
```

PNG comparison used SHA-256 of each complete file: counted distinct forward
hashes, compared forward index `i` against reverse index `29-i`, and compared
direct15 against forward index 15. It discriminated the camera-prop failure
before passing with explicit updates. Do not treat this probe as proof of the
unbuilt film's look, cue joins, authoring revision or saved-take reproduction.
Those are new behavior owned below, not unsettled claims that it already works.

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
Status: planned
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
Status: planned
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
