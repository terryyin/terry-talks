# Readable portrait edition of Story Impact

**Identity:** terry-moves-filmmaking#portrait-film-edition
**Source:** [refined story](../../../terry-moves/seed.md#portrait-film-edition)
**Preparation workspace:** `/Users/terryyin/git/terry-talks/.worktrees/i-can-publish-a-readable-portrait-edition-of-an`
**Observed source revision:** `7a28651c7532b9940ece971ae5f8c070a15e3cb5`

## Execution context

- Identity: `terry-moves-filmmaking#portrait-film-edition`; agent `Honoka-chan`; publisher `dashboard-territory.local-terry-talks`.
- Mode: Story Branch; owned reused execution checkout is the preparation workspace named above, branch `codex/i-can-publish-a-readable-portrait-edition-of-an`. Remote `origin`; eventual trunk target `master`. No
  integration checkout is selected for mutation in this execution.
- Established start: starting revision `a6bba00046969ec401dc8de4e33707317463814a`; published claim/candidate `5c4bcfcd9df8f1a6c698e74e87b6955aa51b682f` on remote trunk and execution branch. This is the first increment's
  published base.
- Checkout setup: `pnpm install --frozen-lockfile` succeeded without metadata changes; the 39 Japanese-caption/narration tests succeeded in this checkout.
- Replanning permission: preserve existing planned authority; no explicit overrun flag or numerical slice budget was supplied.
- CI source: GitHub Actions, verified active `ci.yml` (display name `CI`), repository `terryyin/terry-talks`, target execution branch above. The trunk claim has `pendingCi: unobserved` by this branch observer.
- Codex observer: coordinator `honoka-portrait`, directory `/tmp/dough-ci-501/watch-YQbU8q`, PID `18300`, session `96304`, yielded cell `9`; runtime is this checkout's `.agents/skills/dough-execute-plan`.

- Slice 1 publication accepted `2e58aeb10d2046cb634e08e405a47b42c0c088d0` on `refs/heads/codex/i-can-publish-a-readable-portrait-edition-of-an`; suffix base `5c4bcfcd9df8f1a6c698e74e87b6955aa51b682f`. Observer reused, maintenance not applicable. This accepted SHA is the next increment's published base.

- Slice 2 publication accepted `3ff2e9b2ca909174409eea923f24a75cba1b847e` on the same execution target; suffix base `2e58aeb10d2046cb634e08e405a47b42c0c088d0`. Observer reused; this is slice 3's published base.

## Goal and scope

Terry can export and revise a readable 1080×1920 portrait edition of the current English `StoryImpactFilm`. Preserve the cleaned English voice, both English and Japanese captions, approved beat order, timing, cover and ending. Keep the square edition's presentation unchanged. Deliver a complete publishable MP4 and a meaningful retained layout revision through the same authoring path.

The review surface is the entire film at normal speed, full resolution and 360×640 display size. Both languages and important labels must be readable without zooming, and the action must remain visible. Size changes alone are not acceptance. No new translation, film, soundtrack, automatic aspect-ratio engine, platform-specific overlay treatment or upload is promised.

This is preparation only. Execution requires its own instruction. The named preparation worktree may be retired after landing; later execution records its actual checkout and reuses these observations only where the boundary matches.

## Design and reuse

- One performance feeds explicit presentation choices. Reuse `fullFilm`, `releaseFrame`, `RecordedNarration`, caption translations and existing scene pieces. Keep timing and content out of the portrait layout
  configuration.
- Expose the existing scene's stage, title/end card and caption presentation where necessary. A small authored portrait configuration owns region bounds, placement and typography. Fit coherent action as a group where
  sufficient; restage individual relationships only where real readability requires it. Moving an endpoint must move its connecting trajectory in the same geometry. Keep font sizes and wrapping appropriate to the output
  presentation.
- Responsive publishing supplies the mechanism: one manuscript/performance, format-specific master/staging. Its limit is spatial meaning and continuous motion; independently reflowing every actor can break the
  explanation.
- PFE found relevant square geometry and caption line-breaking in `src/storyImpact/layout.ts` and `caption.tsx`, plus the scene separation in `StoryImpactScene.tsx`. Reuse these responsibilities; do not copy the beats or
  make a parallel portrait performance. Legacy `Anchor` wraps an animated point, not an edition layout model. Feature Teams geometry serves its own panel/inset and is not a general portrait solution.
- `layout.ts` exports are consumed by ATDD, Feature Teams, Problem Decomposition, Story Impact previews and the Chinese edition. Keep existing defaults stable; an edition parameter must not mutate global `STAGE` or
  global geometry. If a shared helper changes, trace and verify all consumers of that actual change.
- [Accepted ADR-0000 — Use Architectural Decision Records](../../../docs/adrs/0000-use-adrs-accepted.md) is the sole Accepted ADR. It preserves human ownership of durable decisions; no conflict or exception is needed.
  This local presentation extension warrants no new ADR proposal or North Star topic.

## Outside-in proof ownership

| Promise | Owner | Observable proof |
| --- | --- | --- |
| Readable 9:16 staging, coherent flight/impact and both languages | Slice 1, completed across all beats in slice 2 | Registered portrait frames and playback at 1080×1920 and 360×640; inspect caption holds, flight extremes and overlaps, not just text presence. |
| Full explanation, cover, ending and credits retained | Slice 2 | Review the complete encoded portrait film in order, including later stories, growing History and story-versus-feature ending; compare original content and timing. |
| Same performance, narration and caption timing | Slices 1–2; repeated for revision in slice 3 | Actual composition metadata, frame-to-caption/pose wiring and narration sequence match the source; compare full decoded mixed audio with the square source. |
| Original square presentation preserved | Slices 1–3 at changed boundaries | Existing Story Impact/consumer suites; complete pre-change/current composition graph equality at every release frame, full mixed-audio equality and actual native render/font observations. Retain the revision CLI no-change results and its intrinsic raster-repeatability limitation. |
| One meaningful authored revision affects multiple beats | Slice 3 | Change caption-region height and stage placement in one retained config; registered preview and export visibly follow it at two or more separated beats without renderer/beat edits. |
| Baseline and revised portrait takes can be reselected/exported | Slice 3 | Replay documented commands from retained inputs, select each take and inspect resulting frames, dimensions, duration and audio. |
| Publishable file and usable workflow | Slices 2–3 | Real H.264/yuv420p/BT.709 MP4 inspected with ffprobe and played; README supplies copyable selection, edit and export commands and actual output paths. |

Geometry assertions supplement real text shaping and normal-speed observation. Use the real composition/frame wiring; mock only transport or the current frame where necessary, not layout or caption mapping being asserted. New portrait checks must fail if its layout selection is ignored, Japanese text disappears, or a revision setting is not consumed. Terry owns artistic approval; report agent
observations and any actual feedback without claiming unseen approval.

## Ordered slices

### 1. Watch the first story land in a readable portrait stage
Type: Behavior
Status: done
Proof: Registered portrait playback from cover through the first impact and
assimilation, with readable paired captions and no loss of the axes, backlog,
flight or affected product. Real frames cover dense text, motion extremes and
transitions at full and phone display size; focused registration/presentation
checks discriminate missing portrait selection and missing caption languages.

Behavior: Given the existing English film, select its portrait edition in Studio and play the opening through the first story becoming coherent. The same cover, poses, captions and voice play at the same frames, with
portrait staging and a separate readable bilingual caption region.

Introduce the smallest explicit presentation choice through the existing scene and its composition. Include necessary shared-geometry refactoring with this visible result, preserve square defaults, and give the portrait settings a clear authoring home. Allow Japanese wrapping without changing translation text or timing. Capture the square baseline before changing presentation; verify applicable
square and shared-helper consumers after the change.

The safe stopping point is a verified portrait excerpt through `coherent`. The full timeline remains shared; later beats may still need portrait tuning. Label this as an incomplete edition and do not present a full export as ready. Slice 2 owns and removes that interim limitation.

### 2. Export the complete preserved explanation in portrait
Type: Behavior
Status: done
Proof: Full portrait MP4 plays through every beat and passes phone-size visual
review; metadata and decoded audio match the preserved performance. Every
caption pair, title/end card, important label and action remains legible and
unclipped. Original square output retains its picture and audio.

Behavior: Given the working portrait excerpt, play and export the entire film. The customer/idea, testing/domain concepts, later impacts and growing History, then story-versus-feature and final card remain
understandable, with original English narration and both caption languages at their original times.

Extend/tune the same presentation rule across the complete film, avoiding beat-name exceptions unless a distinct spatial requirement actually needs one. Inspect every caption pair and transition, widest wall/History extent, flight paths, value annotations, outlines and closing. Retain 30 fps and the current 3852-frame release (3816 performance frames plus 36 cover frames); derive these from the
source rather than introducing a second timing authority.

Render a full 1080×1920 H.264/yuv420p/BT.709 MP4 under ignored `terry-moves/out/` with a distinct name. Confirm dimensions, fps, duration and audio stream with ffprobe, then play the file. Compare decoded mixed audio against the same source revision's square composition, not MP4 container bytes. Record the existing `pnpm moves compare StoryImpactFilm --baseline <pre-change-sha>` no-`--change`
native observation. Because unchanged source also varies at raster edges, establish unchanged square presentation with complete independent pre-change/current composition graph equality at every release frame, metadata and decoded audio, supported by native font/frame observation. Its comparison CLI has no Story Impact timeline adapter; use direct beat/caption/cover wiring checks and claim no
bit-identical full PNG sequence. See the evidence and reassessment below.

Document selection and export. This slice replaces the incomplete excerpt with a whole usable portrait film. The retained authoring revision is still owned by slice 3. No upload occurs.

### 3. Revise the focal layout once and reproduce both portrait takes
Type: Behavior
Status: done
Proof: One authoring edit changes caption-region height and focal-stage
placement in multiple separated beats through the same renderer. Both saved
portrait configurations export correctly; all content, timing and audio stay
preserved and the original square edition is unchanged.

Behavior: Given the complete portrait edition, Terry changes its caption-region height and stage placement through the documented settings. Preview and export show the new arrangement across the film without hand-editing
shots; reselecting the baseline restores its original portrait arrangement.

Retain baseline and revised configuration, with distinct outputs or a clear take selector. Use a meaningful visibly different arrangement that still meets the phone-size reading requirement; do not deliberately break the baseline to make the revision useful. Demonstrate both an early action beat and a later dense beat, then review the revised film as a whole for collisions. Replay both export
commands from retained source/assets; record inputs, font requirements, paths and actual results. Do not duplicate narration, beats or caption content.

## Execution complete

Product advice: Keep `terry-moves-filmmaking#music-and-sound-film` next. The local authored master meets this edition's observed requirements; generalizing presentation needs another demonstrated film requirement. No correction or backlog change is recommended.

## Verification and delivery

Execution uses installed `dough-execute-plan`, including independent post-change refactoring, relevant proof, agent commits and authorized delivery. Each slice includes its implementation, focused verification and cleanup. No numerical slice target or hard limit is supplied; do not invent one.

Run `pnpm -C terry-moves test:unit --runInBand tests/storyImpact` after changes to Story Impact presentation, plus actual affected consumer suites (not unrelated films by default). Add focused portrait registration/layout/revision tests to this surface. Run `pnpm -C terry-moves typecheck` for changed TypeScript contracts and lint affected code with the existing configuration. Broaden proof only if
shared-helper changes or an observed failure warrant it.

For required visual observation during execution, use `dough-manual-testing`: real registered composition, normal-speed film, direct middle-frame and backward seeks, full and 360×640 display sizes. New composition IDs/spec paths are chosen and recorded when introduced; do not treat hypothetical commands as observations. The existing render path is `pnpm -C terry-moves exec remotion render
src/index.ts <composition> <output> --codec=h264 --pixel-format=yuv420p --color-space=bt709`. Use the installed Remotion skills for implementation/render specifics.

## Preparation evidence and remaining product proof

Observed in the named checkout on 2026-10-13, at the source revision above:

- `pnpm -C terry-moves test:unit --runInBand tests/storyImpact/StoryImpactJapaneseSubtitles.spec.tsx tests/storyImpact/StoryImpactNarration.spec.tsx` passed 39 tests. This reaches the selected composition's caption
  mapping, cover and narration sequencing, substituting media transport; it does not establish browser typography or decoded audio identity.
- Discrimination: temporarily changed `secondaryCaption={jaCaption(caption)}` to `secondaryCaption={jaCaption('')}` in `src/stories/StoryImpactFilm.tsx` and ran `pnpm -C terry-moves test:unit --runInBand
  tests/storyImpact/StoryImpactJapaneseSubtitles.spec.tsx`. Result: 25 failed, 10 passed. Restored the source byte-for-byte and reran the combined command above: 39 passed. No scratch source change remains.
- `pnpm -C terry-moves exec remotion still src/index.ts StoryImpactFilm /tmp/portrait-preparation-story-impact.png --frame=240 --log=error` completed; the inspected square frame shows the product/Structure/Behavior scene
  and both English/Japanese captions. This reaches the actual registered composition and font/browser render, not a synthetic layout fixture.
- The source timeline evaluated through `pnpm -C terry-moves exec tsx -e "import {fullFilm,fullFilmBeats} from './src/storyImpact/fullFilm'; import {FPS} from './src/storyImpact/film';
  console.log(JSON.stringify({fps:FPS,frames:fullFilm.durationInFrames,beats:fullFilmBeats.map(b=>({name:b.name,...fullFilm.beatRange(b.name)}))}));"` reports 3816 performance frames at 30 fps. First `coherent` ends at
  performance frame 1477; later stories and finale occupy the same shared timeline.
- `pnpm -C terry-moves exec remotion render src/index.ts StoryImpactFilm /tmp/portrait-preparation-story-impact.mp4 --frames=240-269 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --scale=0.3333333333
  --concurrency=2 --log=error` completed. `ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate -show_entries format=duration -of json /tmp/portrait-preparation-story-impact.mp4` reports H.264
  360×360 at 30 fps, AAC audio, 1.003 seconds. This settles the existing local encode/audio-asset route, not full portrait quality or render time. The same unrelated asset warning appeared and did not stop this output.
- `pnpm -C terry-moves exec tsx /tmp/portrait-comparison-probe.ts` ran a disposable adapter over the existing `revision/sources.ts` `withFilmSources`, `revision/render.ts` `readComposition`, `renderFilm`,
  `changedFrames`, and `revision/wav.ts` `compareWav`. Its source arguments were the named checkout, baseline `7a28651c7532b9940ece971ae5f8c070a15e3cb5`, and working-tree correction. For each side it read the real
  composition, passed a copy of that metadata with `durationInFrames: 2` to `renderFilm` (PNG frames 0–1; the helper's WAV render still covers the whole composition), then compared both results. Both compositions
  reported 1080×1080, 30 fps, 3852 frames; changed sampled frames were `[]`; full mixed audio was `identical: true`. Temporary render inputs were cleaned by `withFilmSources`. This settles the actual comparison
  adapter/asset/audio route and sampled repeatability, not a full-film pixel preservation verdict. Execution still owns the complete comparison.
- pnpm populated ignored dependencies from its existing store; package/lock files are unchanged. The render logged an unrelated missing `quillustration_flower_and_water-can/scene.bin`; the selected 2D still completed.

The new portrait presentation, readability and revision path are implementation obligations, not asserted existing capabilities. The observed route covers the existing film's real caption rendering; no paid or credentialed premise is needed.

## Story obligations

### G1. Later portrait beats remain incomplete
Reported: slice 1 — "Later beats remain explicitly labeled incomplete."
Story clause: "the cover, product space/backlog, first story's flight and impact, later stories/History, and ending convey the same explanation at the same times"
Disposition: proved by slice 2: full encoded portrait out/story-impact-portrait.mp4, all 25 caption panels plus dense/flight states, complete 1× phone/full-resolution playback and direct/backward seeks; StoryImpactPortrait.spec.tsx observes shared poses/cards and caption timing across every beat.

### G2. Complete preservation proof awaits the full edition
Reported: slice 1 — "Complete square pixel/audio preservation, portrait decoded audio comparison, later beats/end/credits and full-film review belong to slice 2."
Story clause: "The square edition remains available with its current presentation."
Disposition: proved by slice 2: out/portrait-proof/full-graph-preservation.json establishes all 3852 actual square frames against the complete 5c4 pre-change graph; out/portrait-proof/audio-comparison.json and native comparison reports establish identical complete mixed audio and metadata. Fonts/native frames and full portrait playback support preserved presentation; raw full-PNG bit repeatability remains explicitly unclaimed.

### G3. Retained revision proof remains
Reported: slice 1 — "Retained baseline/revised takes and demonstrated multi-beat authored revision belong to slice 3."
Story clause: "Both portrait takes can be reselected and exported."
Disposition: proved by slice 3: baseline and revised configurations remain selectable in Studio and independently export through the documented commands; registered frames 350, 2210 and 3431 visibly adopt the stage/caption revision and baseline reselection restores the prior graph. Both complete H.264 takes retain metadata and identical decoded audio; revised whole-film phone/full-resolution playback and seeks pass.

### G4. Opening manual observation returned to coordinator
Reported: slice 1 — "Parent owns normal-speed playback and middle/backward-seek acceptance."
Story clause: "Review at full resolution and at a 360×640 phone-size display, at normal speed"
Disposition: proved by slice 1: coordinator observed Studio opening playback, full-resolution registered flight frame 915, encoded 360×640 and 1080×1920 opening playback at 1× through ended=true (50.475 seconds), direct seek 915 and backward seek 350 in out/portrait-proof/review.html; both captions and key labels fit, action remained visible.

### G5. Unrelated asset warning in successful renders
Reported: slice 1 — "Renders emitted the already observed unrelated quillustration_flower_and_water-can/scene.bin 404; every selected render succeeded."
Story clause: "Terry can publish Story Impact to viewers watching a vertical phone screen, preserving its explanation and approved performance while making the action, labels, and bilingual captions readable."
Disposition: no user cost "Terry can publish Story Impact to viewers watching a vertical phone screen": the unrelated 3D asset is not consumed by this 2D composition; all selected registered PNG and H.264 renders completed with the promised action and captions visible.

## Accepted slice proof

### Slice 1

- Changed boundary: registered `StoryImpactFilmPortrait` passes one authored presentation through the original English `FilmFrame`; `fullFilm`, release clock, narration and caption content remain shared. Square defaults
  and `layout.ts` exports remain stable. `Paper` and `CaptionBar` optional contracts reach ATDD; its suite was included.
- `pnpm -C terry-moves test:unit --runInBand tests/storyImpact tests/atdd` passed 17 suites / 221 tests. `StoryImpactPortrait.spec.tsx` exercises the actual composition/scene with frame and media transport substituted,
  checks canvas, focal transform, original clock/voice, cover and every distinct opening caption pair through coherent, typography and Japanese wrapping. Coordinator inspected its setup/assertions and the product
  changes.
- `pnpm -C terry-moves typecheck` passed.
- `pnpm -C terry-moves exec remotion render src/index.ts StoryImpactFilmPortrait out/portrait-proof/portrait-opening-stills --frames=0,240,350,500,700,870,915,1010,1270,1450 --image-format=png --concurrency=2
  --log=error` and the same frame selection at `--scale=0.3333333333` in `out/portrait-proof/portrait-phone-stills` completed. Registered full/phone frames cover cover, dense captions, tag, flight, impact, assimilation
  and coherent. Full 915 and phone 350/700/915 inspected for actual shaping and fit.
- `pnpm -C terry-moves exec remotion render src/index.ts StoryImpactFilmPortrait out/story-impact-portrait-opening.mp4 --frames=0-1513 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2 --log=error`
  completed. ffprobe reports H.264/yuv420p/BT.709, 1080×1920, 30 fps, AAC, 50.475-second container duration. Normal playback and seek observations are G4.
- Nine square registered PNGs before/after are pixel-identical at frames 0,240,500,700,870,915,1010,1270,1450, captured before edits at `5c4bcfc` and compared with Pillow `ImageChops.difference(...).getbbox() is None`.
  Complete square picture/audio comparison remains G2; no timeline adapter or artistic approval is claimed.

- Independent post-change refactor completed: extracted the portrait workflow into `terry-moves/src/storyImpact/README.md`; product/tests unchanged, so accepted proof reused. `git diff --check` passed. PLAN reflow
  preserved every word while meeting the skill's file limit.
- Selective formatter/check `pnpm -C terry-moves exec eslint src/Root.tsx src/stories/StoryImpactFilm.tsx src/storyImpact/StoryImpactScene.tsx src/storyImpact/caption.tsx src/storyImpact/pieces.tsx
  src/storyImpact/presentation.ts --fix` passed; no active Git hook. No generated source trigger changed.

## Current execution learning

Full native comparisons vary even for unchanged pre-change source. Single-worker and software-renderer trials also vary; all temporary comparator edits were restored byte-for-byte (SHA-256 `82b270fac8b252ba46ea031f5f76b69ccc3ba221e258b451485adf667b5fe29d`). The original square identity-group structure was restored, while every portrait SVG stayed unchanged. Exact raster repeatability is an invalid
proof assumption here. The story evaluation remains preserved presentation: G2 now uses positive complete independent pre-change/current selected-composition graph equality at every release frame, unchanged metadata and full decoded mixed audio, supported by physical-font/native frame and playback observations. Only transport is substituted; only the nonvisual focal-stage test attribute is
ignored. Native verdicts remain `Not preserved` (final software trial matches 3848/3852 frames). No bit-identical full PNG sequence or renderer repair is claimed. This changes the technical proof method, not the source promise.

### Slice 2 proof

- `pnpm -C terry-moves test:unit --runInBand tests/storyImpact tests/atdd`: 347 tests / 17 suites passed; `pnpm -C terry-moves typecheck` passed. The real selected composition checks both ends of all 25 caption holds and
  first/middle/last frames of all 37 source beats, including leaving transforms and cards; transport only is substituted.
- `pnpm -C terry-moves exec remotion render src/index.ts StoryImpactFilmPortrait out/story-impact-portrait.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=4 --log=error` completed; ffprobe
  confirms 1080×1920, 30 fps, 3852 frames / 128.4 seconds, H.264/yuv420p/BT.709 with AAC stereo (128.405-second container).
- `pnpm -C terry-moves exec remotion render src/index.ts StoryImpactFilmPortrait out/portrait-proof/portrait-mixed.wav --codec=wav --log=error` and the same square render to `out/portrait-proof/square-mixed.wav`
  completed. `compareWav` over both entire files returned `{identical:true}` in `out/portrait-proof/audio-comparison.json`; native pre-change/current comparison reports also confirm full mixed-audio identity.
- `pnpm -C terry-moves exec tsx /tmp/portrait-full-graph-probe.ts` passed. Retained runner/spec/log/result under `out/portrait-proof/` compare actual separate complete 5c4/current composition graphs at all 3852 frames:
  SVG, metadata and every actual narration sequence/trim/rate attribute match. Coordinator inspected the real setup/assertions and RecordedNarration; temporary baseline/test were removed.
- `pnpm moves compare StoryImpactFilm --baseline 5c4bcfcd9df8f1a6c698e74e87b6955aa51b682f` and unchanged-baseline `--correction 5c4bcfcd9df8f1a6c698e74e87b6955aa51b682f` establish the native limitation above. Final trial
  report: `out/revisions/StoryImpactFilm-2026-10-13T01-44-27-068Z/report.md`; unchanged exact comparison rules, no `--change` declarations.
- Discriminating copies of the real film module: late Japanese removal fails 15 later caption holds while 10 early holds pass; ignored presentation fails all 26 selected caption/registration cases. Commands/mutants/logs
  are retained in `out/portrait-proof/discrimination/results.json` and `.tsx.txt`; production was not mutated.
- Coordinator observed complete encoded playback 0→ended at 1×, both 360×640 and 1080×1920, plus direct seek 2210 and backward seek 350 using the byte-range review server. All 25 phone caption panels,
  domain/History/outlines/credit and later flight extremes are readable/unobscured; actual installed font tables establish Chalkboard SE and Hiragino Kaku Gothic ProN. No artistic approval is claimed.


- Slice 2 independent refactor corrected the guide's input links only; all accepted product proof reused. Selective formatter `pnpm -C terry-moves exec eslint src/stories/StoryImpactFilm.tsx
  src/storyImpact/StoryImpactScene.tsx src/storyImpact/presentation.ts --fix` and `git diff --check` passed; no generator trigger or active hook.

### Slice 3 proof

- Both portrait IDs use the same original `FilmFrame` with production `defaultProps`. Retained revision raises connected action 140px (y=200) and expands caption height 170px (600px); baseline remains y=340/430px. Timing, voice, texts and shared geometry are unchanged. Coordinator inspected actual registration, configs and test setup/assertions.
- `pnpm -C terry-moves test:unit --runInBand tests/storyImpact` passed 445 tests / 13 suites; `pnpm -C terry-moves typecheck` passed. Real selected scenes observe both ends of all 25 caption holds per take, first/middle/last frames of all 37 beats, cover/cards/clock, and actual layout revision then restoration at release frames 350, 2210 and 3431. Registration forwards real `defaultProps`; only frame/registration/media transport is substituted. The copied ignored-revision mutant fails all four selected retained-layout tests; setup/mutant/results are retained in `out/portrait-proof/revision-discrimination/`.
- Both exact guide commands `pnpm -C terry-moves exec remotion render src/index.ts StoryImpactFilmPortrait out/story-impact-portrait.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709` and the revised ID/output `StoryImpactFilmPortraitRevised out/story-impact-portrait-revised.mp4` completed. ffprobe asserts 1080×1920, 30 fps, 3852 frames / 128.4 seconds, H.264/yuv420p/BT.709, AAC stereo for each. Complete revised WAV and decoded MP4 audio comparisons are identical; inputs, hashes, commands, metadata, Node/pnpm and installed fonts are retained in `out/portrait-proof/revision-export-replay.json` and `revision-audio-comparison.json`.
- `pnpm -C terry-moves exec tsx /tmp/portrait-full-graph-probe.ts` again passed every square release frame. `pnpm -C terry-moves exec tsx /tmp/portrait-baseline-graph-probe.ts` proves every baseline portrait graph/metadata/actual narration attribute identical to accepted `3ff2e9b`, with nothing ignored. Coordinator inspected its separate complete imports and actual `defaultProps` forwarding. Retained spec/log/result: `out/portrait-proof/baseline-portrait-graph-*`. No native raster-repeatability claim.
- Coordinator inspected all revised native 360×640 caption panels and motion extremes, full History/outlines/credit; observed actual Studio early/later revision and baseline restoration; played revised encoded film at 1× from cover to ended=true (128.405 seconds) at 360×640 and 1080×1920, then direct seek 2210 and backward seek 350. Both texts and labels fit, action remains unobscured. Terry's artistic approval is not claimed.

- Independent post-change refactor consolidated the unchanged portrait registration rule in private `portraitComposition`; public IDs, actual renderer/default props and metadata stay unchanged. Coordinator inspected the factory and reused complete graph/audio/native/manual proof. `pnpm -C terry-moves test:unit --runInBand tests/storyImpact/StoryImpactPortrait.spec.tsx` passed 282 tests; typecheck passed. Selective formatter `pnpm -C terry-moves exec eslint src/Root.tsx src/stories/StoryImpactFilm.tsx src/storyImpact/presentation.ts --fix` and whitespace check passed; no generator or hook trigger.

- Slice 3 publication accepted `31e7fa88302664daf1107b7db68c1c942ea4d481` on the execution branch; suffix base `3ff2e9b2ca909174409eea923f24a75cba1b847e`, observer reused, maintenance not applicable. This is the completion record's published base.

## Plan review

Three Behavior slices own distinct proof loops: a readable first-story excerpt, the complete publishable edition, and a retained authoring revision. All consume one performance and one coherent presentation model. Slice 1's incomplete later beats are explicitly replaced by slice 2, not dropped. No unsupported generic framework, independent product outcome, or missing proof owner was found in this
review. Slice-plan refinement was not needed. Readiness is recorded only through the canonical story recorder after reviewing this plan and its source.

Automatic retrospective completed against original plan `a6bba000` and accepted increments `2e58aeb`, `3ff2e9b`, `31e7fa8`; claim/preparation and older map-film work are provenance, excluded from implementation attribution. No correction finding: one performance, coherent presentation/registration, stable shared defaults, focused real-composition tests and native/manual journey proof. Complete graph/audio preservation supports the bounded technical-method reassessment; native pixel-repeatability remains unclaimed. No automated browser-E2E-driven development is claimed. Plans unchanged; process review skipped by default preference; product direction and queued sound-led film support the advice above. CI remains pending the execution completion operation.
