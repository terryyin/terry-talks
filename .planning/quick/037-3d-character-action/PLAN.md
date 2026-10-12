# Direct and revise a 3D robot greeting

**Identity:** terry-moves-filmmaking#3d-character-action
**Source:** [refined story](../../../terry-moves/seed.md#3d-character-action).
**Authority:** On 2026-10-12 Terry accepted the recommended robot greeting and
script-directed compatible-GLB route. This is preparation, not implementation
authority; execution needs its own instruction.

## Goal and scope

Terry gets a watchable short silent film: RobotExpressive walks in, turns toward
the viewer while stepping, settles and waves. He changes the gesture to a
thumbs-up through its script and reproduces both takes from retained inputs.
Intentional timing, readable acting and acceptable visible foot contact matter
alongside named-clip selection and reliable arbitrary-frame seeking.

Use one compatible actor and its saved Walking, Idle, Wave and ThumbsUp clips.
There is no turn clip: stage a turn during the walk, with the support-foot
treatment below, not a stationary swivel of planted feet. A roughly 6–8 second,
1080×1080, 30 fps, H.264/yuv420p/BT.709 film is a production starting point;
tune pace, staging and framing to make the greeting work. Keep the full body
and feet legible when judging contact. A reusable script owns action order,
timing, facing and the chosen staging values, with no duplicated JSX clock.

Defer arbitrary rigs, automatic retargeting, universal motion blending, speech,
anime production, advanced simulation, an offline renderer and a visual editor.
These are delivery boundaries, not arbitrary input rejection rules. Other valid
cases handled by the same model need no special prohibition. No sibling story
is a mandatory dependency; this story supplies the staging it needs.

## Current design and reuse decisions

- One direction compiles into frame-addressable clip samples, blend weights
  and world placement. The renderer applies that sampled state to the selected
  rig. Time within a clip, world facing/translation and total scene duration
  each have one owner. No animation advances using wall time, R3F `useFrame`,
  mixer deltas from previous playback, or completion events.
- Reuse `src/beatTimeline.ts` for ordered timing where its semantics fit; the
  film adds clip/transition sampling and the selected rig's locomotion handling.
  The existing silent-scene compiler demonstrates deriving starts/joins from
  action order; do not copy its 2D arm reach or prop ownership into 3D acting.
- The audio-sequencer analogy maps samples to clips, offsets to local times,
  gain envelopes to weights and transport position to the requested frame.
  Unlike audio, pose mixing needs a compatible skeleton and cannot itself
  establish floor contact. Treat grounding separately from clip crossfades.
- Direct Three actions can be started once, paused, assigned explicit times and
  effective weights (including zero for inactive actions), then evaluated with
  a zero-delta mixer update before drawing. Clone the rig for the composition
  instance, including its skeleton. Dispose its local resources appropriately.
  Avoid history-dependent fade state; restore all sampled fields on every frame.
- Preparation found a concrete loading failure: inner `Suspense fallback={null}`
  swallowed the asset load from ThreeCanvas's Remotion-aware loading boundary.
  Removing it fixed blank first/fresh frames. Preserve the asset-wait boundary
  and explicitly prove the first frame and direct entry into a gesture.
- Candidate locomotion: sample the selected walk, determine support changes,
  derive root translation while turning so the active support-foot point stays
  horizontally planted. Precompute from the complete authored script or derive
  it analytically; never integrate from whichever frame the user visited last.
  The preparation method was feasible for this rig. Execution must assess sole
  rotation, support changes and settling as well as a stationary foot point;
  adjust clip phase, timing or the local contact treatment within this story.
  A coordinate check alone does not accept the performance.
- Keep the film and character-specific responsibility local, e.g.
  `src/characterAction/`, `tests/characterAction/`, and a `RobotGreeting`
  composition with a retained `RobotGreetingThumbsUp` revision. These are
  capability names, not required file-by-file tasks. Add registration through
  existing `Root.tsx` and exports through the Remotion CLI/package scripts.
- PFE found `AnimatedGlb` only exposes global playback and plays all clips; its
  watering consumer in `StoryProductDeveloper` relies on the old behavior.
  `GLBAnimationActioner`, `Script` and `AnimationContextWrapper` tie it to subtitle
  timing. Reuse dependencies and timing concepts without changing that default
  consumer merely to implement this silent actor. Any actual shared change
  requires tracing and proving its affected consumers before delivery.
- During landing, trunk completed the cinematic-shot story. Its maintained
  `src/cinematicShot/README.md` replaces the old story link. Inspection of its
  scene and `scripts/verify-cinematic-shot.ts` found useful camera-application
  and real-render traversal examples, but its object choreography, frame list
  and camera-only assertions belong to that film. Reuse suitable mechanics
  when implementing the actor proof; preserve the existing caller if a shared
  helper is extracted. No shared timeline, dependency or renderer configuration
  changed in that publication, so it does not invalidate the actor probe.
- Save the exact selected GLB, provenance, source's CC0 statement and creator
  credit with the product. Render from local files. The asset SHA-256 is
  `047f5e5fb3bb6d378bd1df16ca6137f2a596c99b3a1b5690b4020c05aaf6f319`.
  Source: [RobotExpressive](https://github.com/mrdoob/three.js/tree/dev/examples/models/gltf/RobotExpressive),
  Tomás Laulhé, with Don McCurdy's modifications. No purchase or credentialed
  asset service is needed for this route.
- [ADR-0000 — Use Architectural Decision Records](../../../docs/adrs/0000-use-adrs-accepted.md)
  is the only Accepted record, with matching index/status and no supersession.
  Durable architecture decisions stay human-owned; it prescribes no renderer.
  This is local design, with no ADR conflict or warranted North Star topic.
  No North Star file or numeric slice time limit was found in project guidance.

## Decisive premises and preparation evidence

Observed on 2026-10-12 in
`/Users/terryyin/git/terry-talks/.worktrees/i-can-direct-a-3d-character-performing-a-short-a`,
branch `codex/i-can-direct-a-3d-character-performing-a-short-a`, product base
`96c9eddb43fdb666cb37c38667e02d25dd1e2fa5`. `pnpm install --frozen-lockfile`
succeeded with Node 24.21.0 and pnpm 11.28.5. The installed Remotion 4.0.533,
Three 0.186.1 and Chrome Headless Shell 149.0.7790.0 rendered with the existing
ANGLE configuration. These are observations of this checkout, not assumptions
borrowed from the sibling 3D-camera story.

The disposable `src/__characterProbe.tsx` registered a 480×320, 30 fps,
150-frame composition with the real GLB, lights, ground and grid. It sampled
Walking for the approach, turned yaw from pi/2 to zero during frames 45–90,
blended to Wave beginning at 3 seconds over 0.3 seconds, then to Idle at 4.5.
It reconstructed a support-foot-constrained path from those clip samples.
`reverse` sampled frame `149-current`; `gesture` selected Wave or ThumbsUp;
`frozen` held the skeleton at frame zero to check proof discrimination.

| Premise / consuming operation | Observation | Limit carried into execution |
| --- | --- | --- |
| The selected saved asset loads into this renderer | Actual GLTFLoader and browser render consumed the 463,988-byte self-contained GLB, including its two skins. Walking, Idle, Wave and ThumbsUp were found by name. | Save this actor; no arbitrary-rig compatibility claim. |
| Explicit clip-time/weight sampling is independent of playback history | Corrected render produced 150 distinct PNGs; all 150 reverse counterparts were byte-identical. Fresh frame 100 matched forward frame 100. | Repeat on actual registered composition, action boundaries and Studio seeking; this is route proof, not accepted final-film proof. |
| The observation catches a broken loading boundary | First version with nested null Suspense mismatched forward/reverse at frames 0 and 149; a fresh frame 100 also differed. Removing that boundary made the same checks pass. | First-frame and fresh-mount checks must see the actor, not just compare two empty images. |
| Equality proof distinguishes motion from a frozen skeleton | Frozen frame 100 differed from expected frame 100; all corrected forward frames were distinct. | Keep a motion/expected-pose assertion alongside equality. |
| The chosen rig can turn during a walk with controlled support | Actual foot bones sampled across 150 frames; selected support point's maximum horizontal drift 4.44e-16 model units, maximum root step 0.2399 units; yaw changed 90 degrees. Inspected rendered approach, turn and gesture frames. | One foot point is not the whole sole. Normal-speed contact, weight transfer, visual smoothness and final staging remain slice 2 acceptance. |
| A different named gesture changes the performance | Fresh frame 110 with ThumbsUp visibly differed from Wave; both poses were inspected. | Actual script revision and its joins/reproduction belong to slice 3. |
| MP4 output works through this checkout's CLI | Probe encoded successfully; ffprobe: h264, 480×320, yuv420p, bt709, 30/1 fps, 150 frames. | Actual film export still required; no 1080px performance estimate is inferred. |
| Existing focused test route runs | 2 suites, 19 tests passed: silent-scene joins and GLB animation timing. | Numeric legacy tests do not prove this character's rendering or contact. |

Observation commands, from repository root (scratch files were removed before
writing these records; no production implementation is retained):

```sh
node terry-moves/__character-inspect.mjs
pnpm -C terry-moves exec remotion render src/__characterProbe.tsx CharacterProbe /tmp/3d-character-refinement/forward-fixed --sequence --image-format=png --concurrency=1
pnpm -C terry-moves exec remotion render src/__characterProbe.tsx CharacterProbe /tmp/3d-character-refinement/reverse-fixed --sequence --image-format=png --concurrency=1 --props='{"reverse":true}'
pnpm -C terry-moves exec remotion still src/__characterProbe.tsx CharacterProbe /tmp/3d-character-refinement/fresh-fixed.png --frame=100
pnpm -C terry-moves exec remotion still src/__characterProbe.tsx CharacterProbe /tmp/3d-character-refinement/frozen.png --frame=100 --props='{"frozen":true}'
pnpm -C terry-moves exec remotion still src/__characterProbe.tsx CharacterProbe /tmp/3d-character-refinement/thumbs-up.png --frame=110 --props='{"gesture":"ThumbsUp"}'
pnpm -C terry-moves exec remotion render src/__characterProbe.tsx CharacterProbe /tmp/3d-character-refinement/probe.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=1
ffprobe -v error -show_entries stream=codec_name,width,height,pix_fmt,avg_frame_rate,nb_frames,color_space -of json /tmp/3d-character-refinement/probe.mp4
pnpm -C terry-moves test:unit --runInBand tests/silentScene/joins.spec.ts tests/video_conomponents/GLBAnimation.spec.ts
```

Temporary observation copies/results are in `/tmp/3d-character-refinement/`:
`failed-probe.tsx`, `corrected-probe.tsx`, `inspect.mjs`,
`asset-motion-inspection.txt`, `render-results.json`, frame directories and MP4.
They are diagnostic evidence, not retained production inputs or a dependency
of the delivered film. SHA-256 comparison paired forward index i with reverse
index 149-i and separately checked fresh frame 100; the results are above.

## Outside-in proof ownership

| Final promise | Owning slice and observable proof |
| --- | --- |
| Intended named animation on the compatible actor | 1: real registered gesture scene, beginning/middle/end frames; no unintended clips. |
| Watchable walk → turn → settle → wave with acceptable feet and joins | 2: full export and Studio playback, normal-speed review with visible feet and selected transition-frame inspection. |
| Script owns action order/timing/staging with natural supported joins | 2: actual script-to-render journey; move durations derive the clock and sampled placements. 3: gesture replacement uses the same model and updates its joins. |
| Same performance on forward/backward/fresh entry | 1 for gesture, 2 for movement and transitions, 3 for revised joins: real pixels plus Studio seek/mount observation, with expected-pose and motion discrimination. |
| Meaningful gesture revision through the authoring path | 3: change Wave to ThumbsUp in retained direction and compare exported performances, without component choreography edits. |
| Saved assets, permissions and scripts reproduce the selected result | 1 saves asset/provenance; 3 rerenders original/revision from retained inputs with routine acquisition disabled, compares pictures and metadata, and documents commands/selected take. |
| Existing films remain usable | Each slice preserves old consumers; any actual shared change owns affected consumer regressions in that slice. No unchanged film rerender is required solely because registration grows. |

## Ordered slices

### 1. Direct a named greeting gesture at any frame
Type: Behavior
Status: planned
Proof: The registered scene shows the selected robot performing Wave with a
defined settled entry/exit; forward, backward and fresh-frame views agree.

Behavior: Given saved RobotExpressive inputs and a script naming its gesture →
preview/export the gesture → the intended animation appears and is stable at
any requested frame, including first load and a fresh middle mount.

Deliver the saved actor with provenance, the small direction/clip-sampling path,
local scene and composition registration. Use a simple readable stage. Establish
an Idle/gesture join through explicit clip times and weights. A request naming
an absent clip must identify that missing input instead of silently playing
another action; intended named selection is the reason for this failure behavior.
Keep timings in the direction and the common ordered clock.

Focused proof goes through the real registered composition and actual asset;
mocked rig/loader output is insufficient. Compare representative forward,
reverse and fresh frames including the first load, gesture apex and both joins.
Show an intended changing pose, and discriminate the known blank-first-frame
failure and a frozen skeleton. Apply `dough-manual-testing` during execution to
observe actual Studio seek/pause/remount behavior alongside rendered-frame proof.

Safe stop: a usable named gesture rehearsal with reliable seeking. Locomotion
is intentionally absent at this boundary and is owned by slice 2; this slice
does not claim to have delivered the whole greeting story.

### 2. Watch the robot approach, turn and greet naturally
Type: Behavior
Status: planned
Proof: One watchable original film communicates the greeting through a grounded
walk, stepping turn, settle and wave, with readable joins and consistent seeking.

Behavior: Given the gesture direction path → author the approach and turn before
the gesture → the robot enters, changes facing through steps, settles and waves
without distracting sliding, floating, floor penetration or pose discontinuities.

Extend the same frame-addressable model with world placement/facing and the
selected rig's contact treatment. Start from the observed support-foot method;
inspect support changes, foot orientation and the transition to the gesture.
Tune phase, turn pacing and settling together. Any contact/pose cache must be
derived entirely from saved inputs, fps and direction, so direct frame access
has no warm-up requirement. Keep the turn in this cohesive locomotion slice.

Finish stage, lighting, camera framing and timing to make the intention clear;
feet must remain observable in acceptance. Register the actual export command.
Export the whole film and inspect it at normal speed through the manual-testing
workflow, then inspect the specific frames around footfall, turn, settle and
gesture joins. Numeric support-point checks supplement that review. Record
what was watched and why its contact and joins are acceptable; hiding feet or
passing coordinates alone is not acceptance. Repeat real forward/reverse/fresh
frame proof across movement and joins. Reuse slice 1 proof where unchanged.

Safe stop: a finished original greeting and script direction; the meaningful
alternate take and reproduction promise still belong to slice 3.

### 3. Revise the greeting and reproduce either take
Type: Behavior
Status: planned
Proof: A script-only Wave → ThumbsUp revision produces a recognizably different,
equally usable performance; both saved takes can be rendered again locally.

Behavior: Given the original direction → change the supported gesture to
ThumbsUp through the same authoring path → preview/export a distinct greeting
whose entry/exit, duration and settled state remain coherent without repairing
component choreography or a second timing table.

Keep original and revision as explicit direction variants, with shared unchanged
staging and the same sampler. Retain the selected take and explain how to edit,
preview and export either. Review the revision at normal speed and repeat the
affected transition, fresh-entry and backward-seek proof. Do not create a
ThumbsUp-specific orchestration branch; both gestures exercise the same rule.

Remove only attempt-owned generated outputs and reproduce from the saved actor,
directions and local export settings, without acquisition or generation. Compare
the decoded pictures/frame sequence and duration/fps to the accepted outputs,
not MP4 bytes whose container metadata may vary. Confirm source/permissions,
asset identity, both directions and the export guide suffice. Reuse unchanged
locomotion proof unless this revision actually changes its boundary.

## Verification, delivery and review

Use focused tests at the script-to-sampled-performance boundary for clip choice,
timing, joins and any input failures introduced. Rendering and real Studio
observations own visible performance and seeking. New checks must fail when the
behavior they claim is disabled; the preparation's loading/frozen mutations are
concrete counterexamples. Choose the complete affected consumer suite when a
shared contract actually changes; lint/typecheck the touched TypeScript through
the existing package commands. No broad local suite or unchanged-film renders
are added merely from hosted CI configuration.

Execution follows the installed `dough-execute-plan` workflow for independent
post-change refactoring, focused verification, delivery and CI ownership. This
preparation starts no execution/refactor agent or CI observer. Keep accepted
proof, consequential learnings and remaining obligations in this plan during
execution; leave all slices planned until their actual work/proof is delivered.

The three slices isolate named-clip/asset loading risk first, then deliver the
cohesive full performance, then prove its meaningful revision and reproduction.
They extend one sampling rule; they do not divide by files or add a framework
for later anime/retargeting stories. Preparation settled asset consumption,
frame reconstruction, a bounded contact mechanism, gesture variation and encode
routes in this checkout. Final artistic acceptance is execution work, not an
unobserved claim about current product behavior.

Slice-plan refinement was not needed: this review found no remaining concern
about slice boundaries, cumulative design, sizing or proof ownership. Record
readiness against the completed story and plan; this judgment grants neither
Take nor execution authority.
