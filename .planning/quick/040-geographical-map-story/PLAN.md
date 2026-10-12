# First principles across a fictional bay

**Identity:** terry-moves-filmmaking#geographical-map-story
**Source:** [selected story](../../../terry-moves/seed.md#geographical-map-story)
**Preparation workspace:** `/Users/terryyin/git/terry-talks/.worktrees/i-can-tell-a-geographical-story-through-an-anima`
**Preparation branch:** `codex/i-can-tell-a-geographical-story-through-an-anima`
**Observed base:** `05c87cfe414d61195efc597576159c4b6e5a6136`

Execution authorized on 2026-10-12 through the established start. The story is Taken; execution reuses the named checkout and branch. Preparation observations below retain their original boundaries.

## Goal and scope

Give Terry a complete, watchable, revisable geographical film about first principles. Two towns face one another across a fictional bay. An inherited road skirts the coast; reconsidering the goal and constraints exposes a ferry as an option, without making a shorter line an automatic winner. The camera moves from overview to detail and returns to both options for the takeaway: “Start with what must be true. Reconsider what we've inherited.”

Deliver a baseline, a meaningful script-only comparison-framing revision, local map inputs, preview/export access and reproduction instructions. Labels remain readable through camera motion. The fictional setting stays explicit. Water, distance, capacity and available transport are considerations, not invented measured facts. Animation is illustrative, not a travel-time race.

Use silent English text/action, initially 1080×1080 at 30 fps, consistent with the existing local film path. These are production defaults, not product input restrictions. Choose enough reading holds for the actual copy rather than a fixed arbitrary running time. No narration/music, real-world transport advice, provider integration, geocoding, optimization, globe/terrain, or other editions are committed. No new geographic dependency is required for authored fictional vectors. Both takes use the same renderer and clock.

## Current design and reuse

- Reuse `terry-moves/src/beatTimeline.ts` for ordered cue durations and frame sampling. Reuse the script → direction → registered composition convention illustrated by typography and cinematic films. Keep duration derived from the same cues that drive preview/export.
- Add film-local geography and direction under a capability-named location such as `terry-moves/src/geographicalMap/`. One local map coordinate system owns coastline, town/landing positions and route paths; one camera transform projects it. Text placement and font sizing operate in screen space so zoom does not shrink important labels. Camera movement is authored, not a live map engine's independent animation.
- The geography is a locally authored fictional asset/data object. No real coordinates, real projection or Natural Earth download is assumed. Keep explicit coastline/land/water relationships so this reads as geography, rather than two abstract nodes. Connect both options to the same towns; show access legs if ferry landings are separate from town markers.
- The renderer consumes direction values rather than recognizing particular beat names. A revised shot changes its framing endpoints/hold through the same model. The baseline's narrower comparison and revised wider comparison must both remain coherent and readable; do not manufacture a broken baseline to demonstrate improvement.
- Existing 3D camera code is an example of frame evaluation, not a geographic camera to reuse directly. No current local map renderer was found. Shared clock changes are not expected; if needed, identify and verify all affected consumers before editing them.
- [Accepted ADR-0000](../../../docs/adrs/0000-use-adrs-accepted.md) preserves human ownership of durable decisions. It specifies no map stack; this local renderer introduces no conflict or new cross-product architecture rule. No North Star topic is warranted.

## Outside-in proof ownership

| Promise | Owner | Observation |
| --- | --- | --- |
| Locate both towns, follow the coast road, read labels during purposeful motion, recognize fiction | Slice 1 | Registered opening played normally; actual browser pictures at overview, moving camera and held detail; at 1080 and 360-pixel viewing sizes. |
| Complete first-principles argument, constraints, possible ferry, balanced comparison and return | Slice 2 | Whole baseline MP4 reviewed in order, with all four considerations and final takeaway; Terry/viewer can distinguish goal from inherited solution. |
| Direct/backward seeks reproduce the same map state and cue joins | Slices 1–2 | Sample registered film at identical frames after fresh mounts and reverse order; compare real rendered pictures and inspect boundaries; unit proof supplements this. |
| Meaningful framing edit uses the authoring path without renderer edits; retained baseline survives | Slice 3 | Save alternate script direction, preview/export it through the same composition path; visibly changed comparison, unchanged route/copy, original reselected and re-rendered. |
| Required inputs retained and both takes reproducible without map-service access | Slice 3 | Documented commands regenerate both MP4s with external network denied while local asset/bundle serving remains available; inspect decoded frames and timing, not MP4 container byte identity. |
| Reusable authoring path | Slices 1 and 3 | Script owns place/route/cue/framing values; README gives concrete edits and preview/export commands; changed comparison consumes those inputs without a second renderer. |

Automated checks must reach the registered film's actual direction and rendered SVG/HTML. Replace only the clock/registration where necessary; do not mock the route geometry, camera transform or label positions that assertions claim to prove. Rendered text existence alone does not prove readability. Browser/pixel observations and normal-speed review cover cropping, overlap and pacing. Terry owns the artistic judgment; an agent may report its observations but must not claim Terry approved a film he has not seen.

## Ordered slices

### 1. Locate the towns and follow the familiar journey
Type: Behavior
Status: done
Proof: The opening plays through a registered composition; both towns and the road are geographically connected and readable through the overview-to-detail move. Focused boundary tests exercise direction through the actual rendered map, and real browser frames agree for forward, backward and direct sampling.

Behavior: Given local fictional bay geography and ordered opening directions, select the map film in Studio and play. Viewers see the explicit fictional setting, locate the origin and destination across water, and follow the road around the coast. Labels remain screen-readable as the camera moves and holds.

Implement the minimal shared model for authored coastline, named places, route paths, reveal progress, camera framing and labels alongside this visible opening. Register it through `src/Root.tsx`; derive duration from the existing beat clock. Keep all required inputs local. Establish script ownership and a usable preview command. Verify opening, mid-move, cue joins and settled states, including fresh middle-frame renders. The safe stopping point is a coherent opening excerpt; the complete argument and ferry comparison remain owned by slice 2, so this excerpt must not be presented as a completed story.

### 2. Explain the problem independently of the inherited road
Type: Behavior
Status: done
Proof: A full baseline export and normal-speed review show the question, constraints, candidate ferry and final overview/takeaway in order. Focused rendered-film checks observe these states through the registration; actual pictures at transitions and comparison holds demonstrate readable labels and retained geographic orientation.

Behavior: Given the working opening, continue playback. The film asks whether we need to follow the existing road or get people to the other town. It makes water, distance, capacity and available transport visible as things to reason from; the ferry is presented as a possible crossing, then both options return in the overview. No fabricated speed, fare, capacity or verdict makes the ferry the winner. A viewer can state the goal, inherited assumption, remaining constraints and the reason to consider another option.

Extend the same direction model with the argument's cues, route comparison and reading holds. Reuse geography and camera rules from slice 1, not a separate ferry renderer. Export the complete baseline H.264/yuv420p/BT.709 film. Inspect it at full size and 360-pixel viewing width, including movement and reading holds. Present it to Terry for judgment; record actual feedback and unresolved obligations truthfully. Same-scope visual corrections belong here. This slice replaces slice 1's incomplete excerpt with a complete film; the retained revision and full reproduction demonstration remain owned by slice 3.

### 3. Revise the comparison shot and reproduce both takes
Type: Behavior
Status: done
Proof: Script-only framing changes visibly alter the comparison while both routes and labels remain readable. Both saved takes use the same renderer; reselection and export reproduce their authored states from retained inputs. Document and replay the full preview/edit/export/reproduce journey.

Behavior: Given the baseline and its retained inputs, Terry edits the comparison shot to hold both the road and ferry together in a wider frame. The preview and export follow the new direction, while the original is still selectable and unchanged. Repeat the documented exports with map-service/network access denied (except local serving); both takes retain their geometry, text, timing and framing without fetching geographic inputs.

Retain baseline/revision direction objects and distinct outputs or an explicit take selector. Use the same path for the demonstrated edit, not a composition- specific branch. Choose a revision that visibly changes emphasis while preserving orientation and the argument. Verify changed and unchanged portions independently at their actual beat ranges, plus duration/frame rate and fresh middle-frame sampling. Preserve fonts or document the exact locally available font and render environment needed for reproduction. Describe all authored inputs and credits (fictional geography is locally authored); keep generated output under the existing ignored `terry-moves/out/` convention. The README gives copyable Studio and export commands, where to edit route/place/camera direction, and how to retain another take. This completes the outcome without publishing the film to a service.

## Verification and delivery gates

Run each new slice's focused tests with `pnpm -C terry-moves test:unit --runInBand <actual-spec-paths>` and `pnpm -C terry-moves typecheck` for the new TypeScript registration and direction contracts. Apply lint to affected code using the existing ESLint configuration. The exact new spec paths and composition IDs must be recorded when introduced, not presented here as existing commands. Use real Remotion still/render commands for the registered film and retained outputs, with frame numbers derived from the script. Manual visual observation is an explicit requirement of these slices; use `dough-manual-testing` for that bounded observation during execution.

Execution follows installed `dough-execute-plan`, including independent post-change refactoring, applicable proof, agent commits and authorized delivery. This plan does not grant execution or push authority for implementation. No full repository test run is required for this preparation-only change. If a shared clock or existing registration contract changes during implementation, expand verification to its actual consumers rather than assuming local isolation.

## Preparation observations and remaining product proof

Observed in the named preparation checkout, 2026-10-12:

- `pnpm -C terry-moves test:unit --runInBand tests/typographyFilm/direction.spec.tsx tests/typographyFilm/revision.spec.tsx` passed 14 tests. These execute the actual typography script, shared beat clock and rendered markup, substituting only Remotion clock/registration. They prove the existing script/duration/revision route, not the future map renderer.
- Discrimination: temporarily replaced `return beats[index].pose(t);` with `return beats[index].pose(t * 0);` in `src/beatTimeline.ts`, then ran that same literal command. Six behavior assertions failed and eight passed. Restored the file byte-for-byte and reran: all 14 passed. An initial mutation using literal `0` was rejected for unused `t` before tests and is not behavioral evidence. All scratch code edits are gone.
- `pnpm -C terry-moves exec remotion still src/index.ts TypographyProblemBaseline /tmp/geographical-map-preparation-timing.png --frame=435 --log=error` succeeded. The inspected 1080-square image displays the expected opening “Find” at that beat's first frame. This reaches the real registered browser composition and render path; it does not demonstrate map layout.
- `pnpm -C terry-moves exec remotion render src/index.ts TypographyFeedbackExample /tmp/geographical-map-preparation-render.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --scale=0.3333333333 --concurrency=2 --log=error` succeeded. `ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate -show_entries format=duration -of json /tmp/geographical-map-preparation-render.mp4` reports H.264, 360×360, 30 fps, 8 seconds. This settles availability of local encoding, not the new film's quality or its full-resolution render time.
- The existing root import emits 404s for unrelated `assets/quillustration_flower_and_water-can/scene.bin`; both selected 2D renders still completed. This map plan uses no GLTF input and does not own repairs to unrelated compositions. Check the new film's actual export rather than treating this warning as either map failure or proof that it will work.
- pnpm populated this worktree's ignored dependency installation from its store. Package and lock files were unchanged. No map library or external data was installed. Source inspection establishes the absence of a reusable map-film implementation; new map behavior and layout are implementation obligations, not claims of existing success.

All cheap decisive premises relied on here (shared timing/revision behavior and local real-render/encoding availability) have result-bearing observations. Human review of the new film's meaning and quality belongs to slices 2–3 after there is a concrete artifact; no paid, credentialed or unobserved existing-map premise is used to justify readiness.

## Plan review

Three Behavior slices each own one visible proof loop: coherent opening, complete explanation, and retained revision/reproduction. The cumulative model stays one authored map and frame-sampled direction; there are no story-number branches or speculative provider interfaces. No numeric slice target or hard limit is supplied; boundedness includes implementation, focused proof and cleanup for each result. No remaining slice-specific concern was identified in this review, so a separate slice-plan refinement pass was not needed.

## Execution context

- Identity: `terry-moves-filmmaking#geographical-map-story`; publisher `dashboard-territory.local-terry-talks`; agent Maki-chan.
- Story Branch Mode; owned execution/preparation checkout is the path above. Integration/default checkout: `/Users/terryyin/git/terry-talks` (untouched). Remote `origin`, trunk `master`; increments target `refs/heads/codex/i-can-tell-a-geographical-story-through-an-anima`.
- Starting revision `add7a55773ed6848b1f15ddb54ef51fc71f50bb7`; accepted claim and first published base `1fe374589dccc7541aecefcc269417208588a314`. Established workspace reused, no second Take.
- `pnpm install --frozen-lockfile` and `pnpm -C terry-moves typecheck` passed in this checkout with unchanged locked metadata. Commands need no wrapper.
- No active Git commit hooks. Selective formatting uses the existing ESLint fixer against affected source paths; lint stays with the coordinator.
- No numeric slice target/limit or exceptions configured; replanning retains the existing bounded plan authority, without expanding story scope.
- CI: GitHub Actions `ci.yml` (verified active workflow 381584897, name CI). Codex observer coordinator `maki-map-532058d4`, directory `/tmp/dough-ci-501/watch-N5hfTI`, PID 16425, PTY 74393, exec cell 9. Observes the story branch, not trunk; claim CI on trunk is unobserved.
- Studio: `http://localhost:3000`, PTY 3762; kept open for authoring/review.

## Story obligations

### G1. Zoomed road highlight stops before destination
Reported: slice 1 — "The held real render stops the highlighted road before Eastmere despite complete reveal progress."
Story clause: "see the established road around the bay"
Disposition: proved by slice 1: corrected reveal path and real `terry-moves/out/geographical-map/proof/opening-419-fixed.png` reaches both markers; moving `opening-225-small-fixed.png` remains readable.

### G2. Opening excerpt does not yet explain first principles
Reported: slice 1 — "The full argument and ferry comparison remain slices 2–3; this is explicitly an opening excerpt."
Story clause: "Water, distance, capacity and available transport enter the comparison; a ferry appears as a possibility."
Disposition: proved by slice 2: baseline.spec.tsx six rendered-film assertions plus 77-second baseline MP4 normal-speed review and decoded twelve-cue storyboard.

### G3. Saved framing revision and reproduction are not yet delivered
Reported: slice 1 — "The retained take revision remains slice 3."
Story clause: "Deliver the watchable film, a reusable script-directed authoring path, a saved meaningful camera-framing revision through that path, and the inputs and instructions to reproduce both versions."
Disposition: proved by slice 3: retained mapWideComparison script, revision.spec.tsx, both complete normal/offline exports matching every decoded frame/timestamp, and README author/edit/export/reproduction journey.

### G4. Encoded cross-take difference range includes compression effects
Reported: slice 3 — "Baseline-versus-revision H.264 hashes differ on 621 frames spanning 1624–2249."
Story clause: "the original take remains selectable and reproducible without renderer edits"
Disposition: proved by slice 3: original baseline retained and all2310 decoded frames/timestamps reproduced exactly offline; exhaustive unchanged authored states and identical lossless1649/2010 pictures bound the source edit to1651–2009. Cross-take compression differences do not imply an altered original or source-state drift.

## Slice 1 accepted proof

- Actual registration `GeographicalMapOpening`, 420 frames/14s, 1080 square at 30fps. New suite `tests/geographicalMap/opening.spec.tsx` passes 5 tests via `pnpm -C terry-moves test:unit --runInBand tests/geographicalMap/opening.spec.tsx`; `pnpm -C terry-moves typecheck` passes. Inspected setup in `renderedFilm.tsx` mocks only Remotion registration/clock; real direction, shared timeline, map geometry/projection and SVG execute. Assertions sample road on land, connect endpoints to towns, observe water between towns, fixed font sizes, cue joins, movement/holds and fresh direct/reverse sampling.
- Manual observation under `dough-manual-testing`: bounded opening journey, ~10min allocated to breadth/motion/holds with selective-depth reserve. Studio played at 1x; browser overview0/moving225/held300 located both towns and road; 270px browser preview supplements exact360px render. `remotion still src/index.ts GeographicalMapOpening` sampled 0,149,150,225,300,419 with `--frame=N --log=error` into `out/geographical-map/proof/opening-N.png`. Inspected actual pictures.
- Full-size419 exposed an SVG dash/vector-effect interaction: attribute progress1 alone did not paint the full road at scale1.16. Removed non-scaling vector effect from revealed path and compensated stroke width by camera scale. Required tests/typecheck rerun passed; `opening-419-fixed.png` reaches both markers. Moving225 proof refreshed after correction at full and360px (`--scale=0.3333333333`). `cmp terry-moves/out/geographical-map/proof/opening-225-fixed.png terry-moves/out/geographical-map/proof/opening-225-fixed-reseek.png` passed after fresh browser renders.
- Agent and coordinator inspected corrected full/moving pictures; town, bay and road labels are legible without clipping/overlap at1080 and360px. Final opening manual result: Good. Excerpt remains explicitly incomplete until slice2, and retained revision/reproduction belongs to slice3.
- Successful stills retain known unrelated root `scene.bin`404 from preparation; new map uses no such asset and its actual pictures completed.

Slice 1 delivery: independent refactor consolidated existing camera/window/format values without behavior changes; affected 5-test suite and typecheck passed. Selective `pnpm -C terry-moves exec eslint src/geographicalMap src/Root.tsx --fix` passed; obligation check passed.

Accepted slice 1 publication: `ea85613ef7361b878718e12e31aa279c5decd006` on the retained story branch; candidate same SHA, suffix base `1fe374589dccc7541aecefcc269417208588a314`, observation reused `/tmp/dough-ci-501/watch-N5hfTI`. This is slice 2's previously published base.

## Slice 2 proof and review

- `GeographicalMapBaseline`: 2310 frames /77s, same renderer/clock/local geography as opening. Question420–599, goal600–779, four considerations780–1379, ferry1380–1649 (complete1500), comparison1650–1919 (settled1710), overview/takeaway1920–2309 (overview2010).
- `pnpm -C terry-moves test:unit --runInBand tests/geographicalMap/opening.spec.tsx tests/geographicalMap/baseline.spec.tsx` passed 11 tests in2 suites; `pnpm -C terry-moves typecheck` passed. Inspected actual direction/render and `baseline.spec.tsx` assertions: ordered goal/four prompts, route town endpoints/land access/water crossing/shore markers, stationary road, label fade, balanced comparison, final exact thought, continuous cue joins and fresh forward/reverse/direct samples. Shared clock and unrelated films unchanged.
- `pnpm -C terry-moves exec remotion render src/index.ts GeographicalMapBaseline out/geographical-map/baseline.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2 --log=error` completed. `ffprobe -v error -show_entries stream=codec_name,width,height,pix_fmt,r_frame_rate,color_space,color_transfer,color_primaries,nb_frames -show_entries format=duration -of json terry-moves/out/geographical-map/baseline.mp4` confirmed H264,1080square,yuv420p,BT709,30fps,2310frames,77s.
- Real registered still1440/1770/2309 and fresh1440 were rendered with `pnpm -C terry-moves exec remotion still src/index.ts GeographicalMapBaseline out/geographical-map/proof/baseline-TAG.png --frame=FRAME --log=error`; inspected moving ferry/accesslegs, held comparison and final overview. `cmp terry-moves/out/geographical-map/proof/baseline-moving.png terry-moves/out/geographical-map/proof/baseline-reseek.png` passed. Unit proof covers all joins.
- Bounded manual full-film journey, ~10min observation budget with selective-depth reserve: actual Studio goal700/capacity1120/comparison1770 pictures inspected; exported MP4 played from beginning through ending at1x/360px in local viewer. Actual video state reported width360/rate1 at24.75s,45.75s,76.85s; labels/copy clear. Full-size playback also started at1x/1080px; inspected capacity at36.39s and full-size decoded/registered motion/comparison/end pictures. Decoded `proof/baseline-storyboard.png` covers all12 cues in order at360px.
- Baseline presented to Terry via asynchronous review request and `http://127.0.0.1:8766/geographical-map/review.html`. No feedback received yet; artistic approval is not claimed. The deliverable provides the promised opportunity to judge it. Same-scope feedback can still be incorporated if supplied.

Full-size baseline playback terminal observation: HTMLvideo width1080/rate1/currentTime77/duration77/endedtrue, after inspected final overview at74.51s. Whole baseline reviewed in order at1080 and360; final manual result: Good. Terry feedback remains unreceived, not inferred.

Slice 2 delivery: independent refactor gave town/landing coordinates one home, unchanged rendered values; affected11-test suite and typecheck passed. Selective ESLint fix passed and obligation check passed.

Accepted slice2 publication: `66e15fc851a4c6d1a3b6251ea13543cb9134f771` on retained story branch, same candidate with suffixbase `ea85613ef7361b878718e12e31aa279c5decd006`. Initial receipt reported lost observer worker. Exact old request matched repository/checkout/mode/target; result stopped with lost coverage/unread0; PID16425 absent. Rearmed same coordinator after confirmed worker exit. Current observer `/tmp/dough-ci-501/watch-czi2fN`, PID13822, PTY95880, exec cell7; all later deliveries use it.

Slice2 observer recovery confirmed remote candidate already published with pushCount0; managed delivery reattaches the accepted revision to the new retained stream without another commit.

## Slice 3 accepted proof

- Saved `mapWideComparison` widens comparison from1.12/(500,325) to0.88/(500,300), carries that endpoint into the return, and uses the same `GeographicalMapFilm`/clock/geography/copy/holds. Registered `GeographicalMapWideComparison` is2310frames/77s,1080square,30fps. Picture renderer/timeline untouched; explicit registration added.
- `pnpm -C terry-moves test:unit --runInBand tests/geographicalMap/opening.spec.tsx tests/geographicalMap/baseline.spec.tsx tests/geographicalMap/revision.spec.tsx` passed15tests/3suites; `pnpm -C terry-moves typecheck` passed. Inspected all new revision tests and actual direction/registration/rendered harness. All2310poses compare content and camera, proving changed1651–2009/unchanged1650and2010+; real markup samples observe routes, label fonts, continuity, holds, fresh direct/reverse seeks and retained baseline. Initial new-test y<944 bound wrongly included inherited comparison-start label948.2; corrected bound958 inside map ending974, supported by accepted actual pictures, without product change.
- `pnpm -C terry-moves exec remotion render src/index.ts GeographicalMapWideComparison out/geographical-map/revision.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2 --log=error` completed. Both full exports repeated under README's tested macOS sandbox profile denying external networking while allowing loopback: `baseline-offline.mp4`/`revision-offline.mp4` both completed.
- All four files probed as H264,1080square,30fps,2310frames,77s,BT709. README's four literal FFmpeg framemd5 commands and two cmp commands completed; normal/offline baseline and normal/offline revision match every decoded frame and timestamp, PTS0–2309. Evidence in `out/geographical-map/{baseline,baseline-offline,revision,revision-offline}.framemd5`. Original baseline stays intact.
- Fresh registered lossless baseline/revision still1649 and2010 pairs (`proof/slice3-{baseline,revision}-{1649,2010}.png`) are identical. Frame1800 differs only in the map: pixel bbox(70,377,1009,966), with copy unchanged. Encoded cross-take hashes differ on621frames/1624–2249 due to compression/lookahead/GOP effects; source-state and lossless observations establish the authored change boundary independently.
- Root sampled registered1770/1965/1770fresh and360px1770 with `remotion still` into `proof/revision-{comparison,return,reseek,comparison-small}.png`; `cmp terry-moves/out/geographical-map/proof/revision-comparison.png terry-moves/out/geographical-map/proof/revision-reseek.png` passed. Actual full/360 pictures and live Studio1770 retain both routes and legible labels in a visibly wider frame.
- Bounded manual journey (~10min observation budget): selected revision in exported MP4 viewer; full playback360 reached77s at1x, then comparison55s through77s played at360 and1080. Actual ending1080/rate1/time77/endedtrue; moving return observed67.48s at360. Prior unchanged baseline observations reused. Final manual result: Good. README documents full preview/edit/export/reproduce journey, shared endpoints, local fiction inputs/credits, exact fonts and environment. No artistic approval from Terry is inferred.
- Interruption recovery restarted owned Studio PTY51009 atlocalhost:3000 and local output viewer PTY70491 at127.0.0.1:8766; inputs and prior rendered files preserved.

Slice 3 delivery: independent refactor consolidated SVG geometry observations in `tests/geographicalMap/mapObservations.ts` and updated all3specs without changed assertions; affected15-test suite/typecheck passed. Renderer/scripts/pixels/offline proof unchanged. Selective ESLint fix and obligation check passed.
