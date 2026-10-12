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

## Design and preparation

[Retained route decisions and preparation evidence](PREPARATION.md) establish
the compatible actor, explicit clip sampling, loading boundary and candidate
support-foot treatment. These decisions remain applicable; final performance
and actual-composition proof belong to the slices below.

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

## Execution context

Established start resumed on 2026-10-12 by Mihiro-chan, publisher
`dashboard-territory.local-terry-talks`, in Story Branch Mode. Execution and
originating checkout:
`/Users/terryyin/git/terry-talks/.worktrees/i-can-direct-a-3d-character-performing-a-short-a`;
branch `codex/i-can-direct-a-3d-character-performing-a-short-a`. No integration
checkout is selected. Authorized remote is `origin`, final trunk `master`;
increments publish to the execution branch. Starting revision
`4c3adb0cca1ea532bf80189af6aa0ff52d411a2b`; accepted Take and first delivery base
`9249ef94937b237e93b74191b56d5976783df139`. The existing claim is retained;
no second start was made. Current planning authority permits bounded refinement.

Checkout setup: `pnpm install --frozen-lockfile` completed against the unchanged
lockfile, then `pnpm -C terry-moves typecheck` passed. Studio runs from this
checkout at `http://localhost:3000`. No active Git hooks are configured;
coordinator uses selective `pnpm -C terry-moves exec eslint <owned TS paths> --fix`
before each slice commit. No asset generator is required for the saved GLB.

CI: GitHub Actions, verified workflow `ci.yml` (ID 381584897, name `CI`), with
push triggers. Codex observer coordinator `mihiro-robot`, directory
`/tmp/dough-ci-501/watch-aBCjG3`, PID 13748, session 33498, yielded cell 10;
checkout and observed target are the execution checkout and branch above.
Take publication on trunk is unobserved by this branch observer; increment
delivery registers every accepted branch revision on this retained stream.

Manual observation uses the active story and existing Studio session. Allow a
five-minute observation pass per slice: first cover first load, pose and joins,
then backward seeking/pause/remount; reserve the remainder for confirming
surprises. Slice 2 adds full normal-speed playback with visible feet and selected
footfall/turn/settling frames; slice 3 reviews the alternate gesture and joins.

## Ordered slices

### 1. Direct a named greeting gesture at any frame
Type: Behavior
Status: done
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

Accepted observations (2026-10-12); independent refactor: none — already clean.
Selective ESLint formatting passed; no product proof boundary changed:
- `pnpm -C terry-moves typecheck` passed.
- `pnpm -C terry-moves test:unit --runInBand tests/characterAction/direction.spec.ts`
  passed all six tests. Inspected ordered duration/ranges, active named Wave,
  normalized/eased joins, explicit inactive samples and fresh/reverse evaluation.
- `pnpm -C terry-moves exec tsx scripts/verify-character-action.ts /tmp/3d-character-slice1-proof`
  passed to terminal completion. Inspected the saved-GLB assertion, real elbow
  measurements, missing-clip diagnostic, traversal wrapper and separately
  bundled production `src/index.ts`. Twelve forward/reverse PNG pairs match;
  joins 23/24 and 89/90 match; eight fresh production frames (0,24,28,50,89,90,96,119)
  match. Every sample differs from a blank stage, and frozen frame 50 matches
  settled frame 0 while differing from the actual Wave apex. Result and pictures
  remain at `/tmp/3d-character-slice1-proof/` as disposable observation evidence.
- Manual Studio pass at `http://localhost:3000/RobotGreeting`: visible actor and
  feet at frame 0; sensible entry 28, raised hand/head tilt at 50, return 96;
  backward seek 96→50 and reload at 50/96 preserve poses. Playback at 1x (~29.7 fps)
  and pause at 49 behaved correctly. No rehearsal discrepancy found.
- Root change adds registration only. Legacy `AnimatedGlb`/watering code is
  unchanged. Its discovery warning comes from the existing GLTF reference to
  absent `scene.bin`; the published Take already contains that reference and no
  binary. It does not affect the new self-contained actor or its pixel proof.

### 2. Watch the robot approach, turn and greet naturally
Type: Behavior
Status: done
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

Accepted slice 2 proof (2026-10-12); refactor removed unused contact metadata, typecheck passed; selective ESLint formatting passed. Accepted rendering/contact proof unchanged:
- `pnpm -C terry-moves test:unit --runInBand tests/characterAction/direction.spec.ts` (7 tests) and `pnpm -C terry-moves typecheck` passed.
- `pnpm -C terry-moves exec tsx scripts/verify-character-action.ts /tmp/3d-character-slice2-proof` passed: 33 forward/reverse PNG pairs and 10 fresh production frames agree; blank/frozen counterexamples discriminate. Inspected actual foot matrices/sole vertices, all 213 reverse/repeated samples and fresh rig assertions (1e-10 tolerance), production/traversal loading and result.json.
- Contact supplements: support drift 9.16e-16, sole error 7.86e-16, planted heading change 7.29e-7 rad; max root step 0.216 units. Actual footfalls 0,7,20,38,52,70; turn 30–63; joins 83/84,116/117,182/183. Inspected turn-footfall PNGs 38/39 and 52/53, Studio joins 83/84/94, turn 45/63 and apex 145.
- `pnpm -C terry-moves render:robot-greeting` and `ffprobe -v error -show_entries stream=codec_name,width,height,pix_fmt,avg_frame_rate,nb_frames,color_space,duration -show_entries format=duration -of json terry-moves/out/robot-greeting.mp4` passed: H.264,1080×1080,yuv420p,BT.709,30fps,213frames,7.100s.
- Whole Studio 1x playback and exported MP4 at QuickTime Normal speed reviewed with full feet: approach, stepping turn, weight transfer, small settling shuffle, regard, wave and settled ending read clearly; no distracting floating, penetration or discontinuity seen. Backward 94→63/reload63 agree. Final camera first0/apex145 rechecked; contact shadows clarify grounding.
- Restoring uncompensated foot rotation before each mixer sample prevents cumulative correction when Three skips unchanged writes. Normalizing sampled bone quaternions removes Float32 exact-key entry differences; repeated/backward/fresh proof covers both. Legacy consumers and shared timing unchanged.

### 3. Revise the greeting and reproduce either take
Type: Behavior
Status: done
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

Accepted slice 3 proof (2026-10-12); independent refactor reused selectedTake in the proof CLI and clarified the guide; typecheck passed. Selective ESLint passed after explicit Node-global imports, and syntax proof passed again; rendering/reproduction boundaries unchanged:
- `pnpm -C terry-moves test:unit --runInBand tests/characterAction/direction.spec.ts` (10 tests), `pnpm -C terry-moves typecheck`, and `node --check terry-moves/scripts/reproduce-character-action.mjs` passed. Inspected shared direction authoring, fixed registrations, active unchanged movement, clip replacement, normalized joins and duration-derived exit assertions.
- `pnpm -C terry-moves exec tsx scripts/verify-character-action.ts /tmp/3d-character-slice3-fixed-proof thumbs-up` passed: 11 reverse pairs/8 fresh production frames; joins116/117,173/174 exact; actual ThumbsUp elbow/full saved clip/Idle exit, distinct Wave comparison, blank/frozen discrimination; all204 repeated/reverse foot matrices and fresh rig samples agree1e-10. Inspected real GLB setup, assertions and result.json.
- `pnpm -C terry-moves render:robot-greeting:thumbs-up` and `ffprobe -v error -show_entries stream=codec_name,width,height,pix_fmt,avg_frame_rate,nb_frames,color_space,duration -show_entries format=duration -of json terry-moves/out/robot-greeting-thumbs-up.mp4` passed: H.264,1080square,yuv420p,BT.709,30fps,204frames,6.8s.
- Fixed Studio registration: fresh143, entry121/exit178, backward178→143 agree and show a distinct clear thumb pose; whole alternate MP4 reviewed at QuickTime Normal speed, with full feet and smooth joins/settled ending. Unchanged locomotion retains slice2 proof.
- `pnpm -C terry-moves exec node scripts/reproduce-character-action.mjs record /tmp/3d-character-slice3-reproduction` then `pnpm -C terry-moves exec node scripts/reproduce-character-action.mjs reproduce /tmp/3d-character-slice3-reproduction` passed. Inspected exact two output removals, saved asset identity/local-source bundle, installed browser and request interception, all decoded-frame comparisons and metadata. All213 original pictures (including before-edit baseline) and204 accepted alternate pictures reproduce; duration/fps match; external requests blocked with forbidden/interceptionErrors empty and local actor request present. accepted.json/result.json/network.json retain observations outside generated out/.
- Shared authoring consumes the full saved gesture with its authored duration; no gesture-specific choreography. Original remains selected. Source/CC0/credit, pinned GLB, both directions, local encoding and edit/preview/export/reproduction guide are retained; no shared legacy contract changed.

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

## Story obligations

### G1. Full locomotion and contact
Reported: slice 1 — "Full locomotion/contact acceptance, alternate rendered take, final MP4 and reproduction remain slices 2–3."
Story clause: "The selected walk, turn and gesture read clearly, their joins look natural at normal playback, and foot placement/contact remain acceptable for those actions."
Disposition: proved by slice 2: verify-character-action.ts actual sole/heading/matrix assertions and rendered forward/reverse/fresh frames, plus full Studio and exported MP4 normal-speed observation above

### G2. Alternate take and reproduction
Reported: slice 1 — "Full locomotion/contact acceptance, alternate rendered take, final MP4 and reproduction remain slices 2–3."
Story clause: "Given saved inputs and the selected take → reproduce the original and revision → recover their intended performance without downloading or regenerating the actor or motion. Document the editable direction and preview/export route."
Disposition: proved by slice 3: script-only registered ThumbsUp, actual pose/joins/seek proof, manual export review, and reproduce-character-action.mjs all decoded pictures plus local-only request/metadata assertions above

## Execution complete

Product advice: Keep the current backlog order. The saved compatible actor, scripted clips and grounded stepping turn provide an accepted local route; future styles keep their own asset/rig evaluation.

Retrospective: no required correction. Product review compared the original
source and preparation with published increments 59109c63a2e90af07fcabe16b40e420b03cc2688,
87a34d978aa2e4845d3990f7ffc1ece2f7cbccbb and a212cedf0de8ea57170da51376df616315a78616;
9249ef94937b237e93b74191b56d5976783df139 is claim provenance. The shared clock is unchanged; compatible-actor/contact responsibility remains local.
ADR-0000/index agree; no conflict or supersession. Real renderer/rig proof drove
the loading and quaternion corrections; fast timing variations stay in unit
proof, while pixels, visible contact and full decoded reproduction retain
integration ownership. Inspected legacy GLB timing, silent joins and cinematic
shot coverage serve unchanged distinct boundaries; no supported suite-cleanup
correction found. Process review skipped by missing project opt-in; no process
log accessed. All slice obligations proved. Branch CI remains pending until
the coordinator's completion receipt; retrospective completion does not assert
CI success.
