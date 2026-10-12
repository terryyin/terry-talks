# Readable portrait edition of Story Impact

**Identity:** terry-moves-filmmaking#portrait-film-edition
**Source:** [refined story](../../../terry-moves/seed.md#portrait-film-edition)
**Preparation workspace:** `/Users/terryyin/git/terry-talks/.worktrees/i-can-publish-a-readable-portrait-edition-of-an`
**Observed source revision:** `7a28651c7532b9940ece971ae5f8c070a15e3cb5`

## Goal and scope

Terry can export and revise a readable 1080×1920 portrait edition of the current
English `StoryImpactFilm`. Preserve the cleaned English voice, both English and
Japanese captions, approved beat order, timing, cover and ending. Keep the square
edition's presentation unchanged. Deliver a complete publishable MP4 and a
meaningful retained layout revision through the same authoring path.

The review surface is the entire film at normal speed, full resolution and
360×640 display size. Both languages and important labels must be readable
without zooming, and the action must remain visible. Size changes alone are not
acceptance. No new translation, film, soundtrack, automatic aspect-ratio engine,
platform-specific overlay treatment or upload is promised.

This is preparation only. Execution requires its own instruction. The named
preparation worktree may be retired after landing; later execution records its
actual checkout and reuses these observations only where the boundary matches.

## Design and reuse

- One performance feeds explicit presentation choices. Reuse `fullFilm`,
  `releaseFrame`, `RecordedNarration`, caption translations and existing scene
  pieces. Keep timing and content out of the portrait layout configuration.
- Expose the existing scene's stage, title/end card and caption presentation
  where necessary. A small authored portrait configuration owns region bounds,
  placement and typography. Fit coherent action as a group where sufficient;
  restage individual relationships only where real readability requires it.
  Moving an endpoint must move its connecting trajectory in the same geometry.
  Keep font sizes and wrapping appropriate to the output presentation.
- Responsive publishing supplies the mechanism: one manuscript/performance,
  format-specific master/staging. Its limit is spatial meaning and continuous
  motion; independently reflowing every actor can break the explanation.
- PFE found relevant square geometry and caption line-breaking in
  `src/storyImpact/layout.ts` and `caption.tsx`, plus the scene separation in
  `StoryImpactScene.tsx`. Reuse these responsibilities; do not copy the beats
  or make a parallel portrait performance. Legacy `Anchor` wraps an animated
  point, not an edition layout model. Feature Teams geometry serves its own
  panel/inset and is not a general portrait solution.
- `layout.ts` exports are consumed by ATDD, Feature Teams, Problem Decomposition,
  Story Impact previews and the Chinese edition. Keep existing defaults stable;
  an edition parameter must not mutate global `STAGE` or global geometry. If
  a shared helper changes, trace and verify all consumers of that actual change.
- [Accepted ADR-0000 — Use Architectural Decision Records](../../../docs/adrs/0000-use-adrs-accepted.md)
  is the sole Accepted ADR. It preserves human ownership of durable decisions;
  no conflict or exception is needed. This local presentation extension warrants
  no new ADR proposal or North Star topic.

## Outside-in proof ownership

| Promise | Owner | Observable proof |
| --- | --- | --- |
| Readable 9:16 staging, coherent flight/impact and both languages | Slice 1, completed across all beats in slice 2 | Registered portrait frames and playback at 1080×1920 and 360×640; inspect caption holds, flight extremes and overlaps, not just text presence. |
| Full explanation, cover, ending and credits retained | Slice 2 | Review the complete encoded portrait film in order, including later stories, growing History and story-versus-feature ending; compare original content and timing. |
| Same performance, narration and caption timing | Slices 1–2; repeated for revision in slice 3 | Actual composition metadata, frame-to-caption/pose wiring and narration sequence match the source; compare full decoded mixed audio with the square source. |
| Original square presentation preserved | Slices 1–3 at changed boundaries | Existing Story Impact suite; before/after square pixel/audio comparison using the existing revision CLI with no declared picture changes; focused consumer suites when shared exports change. |
| One meaningful authored revision affects multiple beats | Slice 3 | Change caption-region height and stage placement in one retained config; registered preview and export visibly follow it at two or more separated beats without renderer/beat edits. |
| Baseline and revised portrait takes can be reselected/exported | Slice 3 | Replay documented commands from retained inputs, select each take and inspect resulting frames, dimensions, duration and audio. |
| Publishable file and usable workflow | Slices 2–3 | Real H.264/yuv420p/BT.709 MP4 inspected with ffprobe and played; README supplies copyable selection, edit and export commands and actual output paths. |

Geometry assertions supplement real text shaping and normal-speed observation.
Use the real composition/frame wiring; mock only transport or the current frame
where necessary, not layout or caption mapping being asserted. New portrait
checks must fail if its layout selection is ignored, Japanese text disappears,
or a revision setting is not consumed. Terry owns artistic approval; report
agent observations and any actual feedback without claiming unseen approval.

## Ordered slices

### 1. Watch the first story land in a readable portrait stage
Type: Behavior
Status: planned
Proof: Registered portrait playback from cover through the first impact and
assimilation, with readable paired captions and no loss of the axes, backlog,
flight or affected product. Real frames cover dense text, motion extremes and
transitions at full and phone display size; focused registration/presentation
checks discriminate missing portrait selection and missing caption languages.

Behavior: Given the existing English film, select its portrait edition in
Studio and play the opening through the first story becoming coherent. The
same cover, poses, captions and voice play at the same frames, with portrait
staging and a separate readable bilingual caption region.

Introduce the smallest explicit presentation choice through the existing scene
and its composition. Include necessary shared-geometry refactoring with this
visible result, preserve square defaults, and give the portrait settings a
clear authoring home. Allow Japanese wrapping without changing translation
text or timing. Capture the square baseline before changing presentation;
verify applicable square and shared-helper consumers after the change.

The safe stopping point is a verified portrait excerpt through `coherent`.
The full timeline remains shared; later beats may still need portrait tuning.
Label this as an incomplete edition and do not present a full export as ready.
Slice 2 owns and removes that interim limitation.

### 2. Export the complete preserved explanation in portrait
Type: Behavior
Status: planned
Proof: Full portrait MP4 plays through every beat and passes phone-size visual
review; metadata and decoded audio match the preserved performance. Every
caption pair, title/end card, important label and action remains legible and
unclipped. Original square output retains its picture and audio.

Behavior: Given the working portrait excerpt, play and export the entire film.
The customer/idea, testing/domain concepts, later impacts and growing History,
then story-versus-feature and final card remain understandable, with original
English narration and both caption languages at their original times.

Extend/tune the same presentation rule across the complete film, avoiding
beat-name exceptions unless a distinct spatial requirement actually needs one.
Inspect every caption pair and transition, widest wall/History extent, flight
paths, value annotations, outlines and closing. Retain 30 fps and the current
3852-frame release (3816 performance frames plus 36 cover frames); derive these
from the source rather than introducing a second timing authority.

Render a full 1080×1920 H.264/yuv420p/BT.709 MP4 under ignored `terry-moves/out/`
with a distinct name. Confirm dimensions, fps, duration and audio stream with
ffprobe, then play the file. Compare decoded mixed audio against the same source
revision's square composition, not MP4 container bytes. Use the existing
`pnpm moves compare StoryImpactFilm --baseline <pre-change-sha>` path with no
`--change` declarations to verify the square remains unchanged. That tool has
no Story Impact timeline adapter: supplement its picture/audio/duration proof
with direct beat/caption/cover wiring checks; do not claim it proves that timeline.

Document selection and export. This slice replaces the incomplete excerpt with
a whole usable portrait film. The retained authoring revision is still owned
by slice 3. No upload occurs.

### 3. Revise the focal layout once and reproduce both portrait takes
Type: Behavior
Status: planned
Proof: One authoring edit changes caption-region height and focal-stage
placement in multiple separated beats through the same renderer. Both saved
portrait configurations export correctly; all content, timing and audio stay
preserved and the original square edition is unchanged.

Behavior: Given the complete portrait edition, Terry changes its caption-region
height and stage placement through the documented settings. Preview and export
show the new arrangement across the film without hand-editing shots; reselecting
the baseline restores its original portrait arrangement.

Retain baseline and revised configuration, with distinct outputs or a clear take
selector. Use a meaningful visibly different arrangement that still meets the
phone-size reading requirement; do not deliberately break the baseline to make
the revision useful. Demonstrate both an early action beat and a later dense
beat, then review the revised film as a whole for collisions. Replay both
export commands from retained source/assets; record inputs, font requirements,
paths and actual results. Do not duplicate narration, beats or caption content.

## Verification and delivery

Execution uses installed `dough-execute-plan`, including independent post-change
refactoring, relevant proof, agent commits and authorized delivery. Each slice
includes its implementation, focused verification and cleanup. No numerical
slice target or hard limit is supplied; do not invent one.

Run `pnpm -C terry-moves test:unit --runInBand tests/storyImpact` after changes to
Story Impact presentation, plus actual affected consumer suites (not unrelated
films by default). Add focused portrait registration/layout/revision tests to
this surface. Run `pnpm -C terry-moves typecheck` for changed TypeScript contracts
and lint affected code with the existing configuration. Broaden proof only if
shared-helper changes or an observed failure warrant it.

For required visual observation during execution, use `dough-manual-testing`:
real registered composition, normal-speed film, direct middle-frame and backward
seeks, full and 360×640 display sizes. New composition IDs/spec paths are chosen
and recorded when introduced; do not treat hypothetical commands as observations.
The existing render path is `pnpm -C terry-moves exec remotion render src/index.ts
<composition> <output> --codec=h264 --pixel-format=yuv420p --color-space=bt709`.
Use the installed Remotion skills for implementation/render specifics.

## Preparation evidence and remaining product proof

Observed in the named checkout on 2026-10-13, at the source revision above:

- `pnpm -C terry-moves test:unit --runInBand tests/storyImpact/StoryImpactJapaneseSubtitles.spec.tsx tests/storyImpact/StoryImpactNarration.spec.tsx`
  passed 39 tests. This reaches the selected composition's caption mapping,
  cover and narration sequencing, substituting media transport; it does not
  establish browser typography or decoded audio identity.
- Discrimination: temporarily changed `secondaryCaption={jaCaption(caption)}`
  to `secondaryCaption={jaCaption('')}` in `src/stories/StoryImpactFilm.tsx` and
  ran `pnpm -C terry-moves test:unit --runInBand tests/storyImpact/StoryImpactJapaneseSubtitles.spec.tsx`.
  Result: 25 failed, 10 passed. Restored the source byte-for-byte and reran the
  combined command above: 39 passed. No scratch source change remains.
- `pnpm -C terry-moves exec remotion still src/index.ts StoryImpactFilm /tmp/portrait-preparation-story-impact.png --frame=240 --log=error`
  completed; the inspected square frame shows the product/Structure/Behavior
  scene and both English/Japanese captions. This reaches the actual registered
  composition and font/browser render, not a synthetic layout fixture.
- The source timeline evaluated through `pnpm -C terry-moves exec tsx -e
  "import {fullFilm,fullFilmBeats} from './src/storyImpact/fullFilm'; import {FPS} from './src/storyImpact/film'; console.log(JSON.stringify({fps:FPS,frames:fullFilm.durationInFrames,beats:fullFilmBeats.map(b=>({name:b.name,...fullFilm.beatRange(b.name)}))}));"`
  reports 3816 performance frames at 30 fps. First `coherent` ends at performance
  frame 1477; later stories and finale occupy the same shared timeline.
- `pnpm -C terry-moves exec remotion render src/index.ts StoryImpactFilm /tmp/portrait-preparation-story-impact.mp4 --frames=240-269 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --scale=0.3333333333 --concurrency=2 --log=error`
  completed. `ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate -show_entries format=duration -of json /tmp/portrait-preparation-story-impact.mp4`
  reports H.264 360×360 at 30 fps, AAC audio, 1.003 seconds. This settles the
  existing local encode/audio-asset route, not full portrait quality or render
  time. The same unrelated asset warning appeared and did not stop this output.
- `pnpm -C terry-moves exec tsx /tmp/portrait-comparison-probe.ts` ran a
  disposable adapter over the existing `revision/sources.ts` `withFilmSources`,
  `revision/render.ts` `readComposition`, `renderFilm`, `changedFrames`, and
  `revision/wav.ts` `compareWav`. Its source arguments were the named checkout,
  baseline `7a28651c7532b9940ece971ae5f8c070a15e3cb5`, and working-tree correction.
  For each side it read the real composition, passed a copy of that metadata
  with `durationInFrames: 2` to `renderFilm` (PNG frames 0–1; the helper's WAV
  render still covers the whole composition), then compared both results.
  Both compositions reported 1080×1080, 30 fps, 3852 frames; changed sampled
  frames were `[]`; full mixed audio was `identical: true`. Temporary render
  inputs were cleaned by `withFilmSources`. This settles the actual comparison
  adapter/asset/audio route and sampled repeatability, not a full-film pixel
  preservation verdict. Execution still owns the complete comparison.
- pnpm populated ignored dependencies from its existing store; package/lock
  files are unchanged. The render logged an unrelated missing
  `quillustration_flower_and_water-can/scene.bin`; the selected 2D still completed.

The new portrait presentation, readability and revision path are implementation
obligations, not asserted existing capabilities. The observed route covers the
existing film's real caption rendering; no paid or credentialed premise is needed.

## Plan review

Three Behavior slices own distinct proof loops: a readable first-story excerpt,
the complete publishable edition, and a retained authoring revision. All consume
one performance and one coherent presentation model. Slice 1's incomplete later
beats are explicitly replaced by slice 2, not dropped. No unsupported generic
framework, independent product outcome, or missing proof owner was found in this
review. Slice-plan refinement was not needed. Readiness is recorded only through
the canonical story recorder after reviewing this plan and its source.
