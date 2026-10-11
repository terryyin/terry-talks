# Terry replaces a filmed shot while preserving its intended presentation

Source: [story](../../../terry-moves/seed.md#replace-filmed-shot).
Identity: `terry-moves-filmmaking#replace-filmed-shot`

## Goal and scope

Terry swaps the saved media of the Feature Teams speaker shot, Bas's portrait
inset beside the animation that follows his narration, without rebuilding how
the shot is presented. The shot becomes one declaration with measured source
facts; a replacement is a new source file plus, only when the new source
differs in geometry or length, its crop and Terry's trim, hold or edit choice.
Placement, framing intent, border, pop-in, the card and meter above the inset,
the audio policy and the animation that follows the shot's clock are retained,
the approved film reproduces frame- and sample-identically, and the film renders
through the same command.

- Included: one shot declaration (source, crop, play choice, when-short
  choice, audio policy); a measured source record checked against the file;
  the film's length, hold, ending, cover frame and the inset's crop maths
  derived from declaration and measurement; replacement by declaration with
  no cue, scene component or test-literal edit for a same-timing source;
  trim (explicit source range), hold (frozen silent inset to the
  choreography's end) and edit (slot takes the new length; unreached cues
  stop the film); voice and muted audio policies, voice verified; feedback
  for a missing or changed file, a crop outside the frame, a range outside
  the measured length, a voice source without audio, and an unreached cue
  under edit; preservation proof through the compare command; a README
  section; render through `render:feature-teams`.
- Deferred, not rejected: re-aligning cues to a differently timed
  performance; an illustration slot; a second shot or shot sequences;
  transitions; generated footage; time stretching; subtitles for Bas's words;
  score or ducking; replacing the shot in a translated edition; a Studio
  control for source or crop; automatic subject framing.
- Assumptions: the first film is Feature Teams and its approved render is the
  preservation baseline; replacements in proof are derived exports of the
  approved clip (margins cut away, leading room added, tail cut, audio
  stripped), made with the host `ffmpeg`, never committed; the measured
  duration is the container duration (113.508 s), the value the film already
  uses.
- Key examples: story examples 1–5; proof ownership is mapped below.

## Execution context and decisions

- **Preparation:** established Story Branch preparation (planning agent
  Yua-chan, assignment `96d3307104c6fd56b1274fa34013610d348de0a5`).
  Execution established start (agent Ai-chan, publisher
  `dashboard-territory.local-terry-talks`): workspace
  `/Users/terryyin/git/terry-talks/.worktrees/i-can-replace-a-filmed-shot-while-preserving-its`,
  branch `cursor/i-can-replace-a-filmed-shot-while-preserving-its`, mode
  `story-branch`, remote `origin`, target `master`, integration checkout
  `/Users/terryyin/git/terry-talks`, `publishedSha`
  `e69fb1c8d6f0e79806513185816f2d6454e98e24`, `startingRevision`
  `2240cb2281279e4d61124f227aaa0b6b7f9509db`, `candidateSha`
  `e69fb1c8d6f0e79806513185816f2d6454e98e24`. Previously published base for
  the first increment is `publishedSha`. Replanning permission: preserved
  (neither `--replan` nor `--no-replan`).
- **Checkout setup:** `nix develop -c sh -c 'pnpm install --frozen-lockfile'`
  passed in this workspace (2026-10-11, ~18 s). Host `ffmpeg`/`ffprobe` are
  on `PATH` outside the nix shell; run them from a plain shell. Run jest
  and remotion inside the nix shell with `NODE_ENV=test`. Applicable command
  check: focused jest `--listTests tests/featureTeams` succeeded from
  `terry-moves/`.
- **CI:** no `.github/workflows` and no `.planning/open-dough.json`; push CI
  observation is unavailable. Local planned proof is required.
  `pendingCi: unobserved` on delivery.
- **Plan location:** `.planning/quick/`; 031 was the highest allocated entry
  in history, so this plan is 032. Slice statuses: planned, in-progress, done.
- **No ADR or North Star applies.** Only ADR-0000 (use ADRs) exists. The
  seed's Architecture section records the design: one declared shot with
  measured source facts, one derived clock, no second hand-typed copy of the
  source's duration or geometry.
- **Verification gate:** `terry-moves/package.json` `test` is jest, eslint
  and tsc. From `terry-moves/`:
  `nix develop -c sh -c 'NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js tests/featureTeams'`
  for the focused suite (13 s) and `nix develop -c sh -c 'NODE_ENV=test pnpm test'`
  for the gate. Exact preservation proof is the timeline digest:
  `tsx scripts/feature-teams-timeline.ts > out/feature-teams-timeline.json`
  dumps `filmPoseAt(f)` for every frame with `OPEN_FRAMES`, `CLIP_FRAMES`,
  `durationInFrames`, `COVER_FRAME` and the inset's placement numbers; the
  dump taken at the baseline (unchanged code) and after the change must be
  byte-identical. Supporting evidence is
  `nix develop -c sh -c 'pnpm compare FeatureTeamsFilm --baseline f0bedba'`
  from `terry-moves/` (16.5 min for this film), read within the measured
  renderer noise below: audio identical, duration identical, and every
  preview pair's pixel differences at most a few levels on a few pixels; it
  cannot say Preserved for this film even when nothing changed. Run it at
  slices 1 and 4 only. The gate runs at slice 1 (a test-consumed composition
  and render-script change) and slice 4 (story complete).
- **PFE (existing solutions):** the measured-record-checked-against-the-file
  pattern exists in the AI test automation workshop: `film.ts` imports
  `cedar-performance.json` and `tests/aiTestAutomation/film.spec.tsx` hashes
  the saved take against `takeSha256`. Reuse that shape, not its code: a
  shot measurement JSON with `sha256`, `durationSeconds`, `width`, `height`,
  `fps` and `hasAudio`, written by a measuring script and verified by hash in
  the Feature Teams spec and by the render script. Deriving
  `durationInFrames` from a declaration already exists in
  `SilentSceneFilm.tsx` (`calculateMetadata` over `compileScene`); the
  compare tool's `remotion compositions` honours it (observed: SilentScene
  171). A frozen video shot exists in `tpsAndAi/Loom.tsx` (`Freeze` +
  `OffthreadVideo muted`); the hold reuses that composition. Trim uses
  `OffthreadVideo trimBefore`/`trimAfter`, the same prop family
  `storyImpact/RecordedNarration.tsx` already uses on `Audio`. Error
  reporting follows `silentScene/compileScene.ts`: a pure compile step throws
  a sentence naming the shot and the problem. No existing code declares a
  shot or measures a video file: those are the new responsibilities, and
  `@remotion/media-parser` is not a dependency, so measurement uses `ffprobe`
  through a node script like the other `scripts/*.mjs`. The compare tool
  (`revision/`) is reused unchanged as supporting evidence only; its
  exact-frame rule cannot certify this film (premises below), and changing
  that rule is a separate product decision reported to Terry, not this
  story's work.
- **Declaration (decision):** `terry-moves/src/featureTeams/shot.ts` exports
  `speakerShot` typed `Shot`: `source` (path under `public/`, as
  `staticFile` takes it), `crop` `{ left, top, width }` as fractions of the
  source frame (height follows the inset's aspect, as today),
  `play: 'full' | { from, to }` in source seconds, `whenShort: 'edit' | 'hold'`,
  `audio: 'voice' | 'muted'`. The approved values are
  `assets/Component teams.mp4`, `{ left: 0.085, top: 0.04, width: 0.83 }`,
  `'full'`, `'edit'`, `'voice'`.
- **Measurement (decision):** `terry-moves/src/featureTeams/shot-measurement.json`
  `{ source, sha256, durationSeconds, width, height, fps, hasAudio }`,
  written by `terry-moves/scripts/measure-shot.mjs` (ffprobe: container
  duration, first video stream's size and rate, presence of an audio stream;
  SHA-256 of the file). `measure-shot.mjs --check` re-hashes the file and
  stops with the shot and file named when the file is missing or its bytes
  differ from the record; `render:feature-teams` runs the check first. The
  record is committed; the measured clip is the approved asset, already
  tracked.
- **Derived clock (decision):** `compileShot(shot, measurement, choreography)`
  in `shot.ts` is pure and returns the slot: `from` (source seconds the
  slot starts at: 0 or `play.from`), `slotSeconds` (measured duration or
  `to − from`), `sceneSeconds` (edit: `slotSeconds`; hold:
  `max(slotSeconds, choreography.end)`), `holdFrom` (hold only: slot end,
  when earlier than scene end), `videoFrames` (`ceil(slotSeconds × FPS)`, as
  `CLIP_FRAMES` is today), and the inset's video placement from the crop and
  the measured size. `cues.ts` keeps the choreography's own end as
  `SCENE_END = 113.5` in narration seconds (its last cue is `joy` 109.3); it
  is a choreography fact, not a copy of the file's length, and under the
  approved declaration the slot's end (113.508 s) governs exactly as the
  literal does today. `film.ts` derives `CLIP_FRAMES`, the scene's end, the
  ending's start, `durationInFrames` and `COVER_FRAME` from the slot with
  the same formulas as today, so the approved frames reproduce; the
  composition sets `calculateMetadata` from the same function.
- **Inset (decision):** `ClipInset` takes the compiled placement; the video
  element uses `trimBefore`/`trimAfter` from `from`/`to` at the film's fps,
  `muted` under the muted policy, and under hold renders the last played
  frame through `Freeze` with no sound from `holdFrom` to the scene's end.
- **Cover still (decision):** `render:feature-teams` becomes
  `node scripts/measure-shot.mjs --check && tsx scripts/render-feature-teams.ts`,
  where the tsx script imports `COVER_FRAME` from the film module and runs
  the same two remotion commands with the derived frame; the spec's
  assertion on `--frame=3366` moves to asserting the script name and the
  derived frame's value.
- **Feedback (decision):** `compileShot` throws plain sentences: crop outside
  `[0, 1]` or `left + width > 1`; range with `from < 0`, `to > durationSeconds`
  or `to ≤ from`; `audio: 'voice'` with `hasAudio: false`; edit with
  `slotSeconds < choreography.lastCue`, naming the range and the first
  unreached cue. `measure-shot.mjs --check` reports a missing or changed file.
  Studio and render surface the thrown sentence; tests assert it.
- **Stand-ins (decision):** proof exports live at
  `terry-moves/public/assets/feature-teams-stand-ins/` (made with `ffmpeg`
  from the approved clip, audio stream copied), are measured with the same
  script, used through a scratch edit of the declaration, and removed with
  the scratch edit reverted before the slice's commit; `git status --short`
  must show no tracked asset changed. They are never committed.
- **Interim behavior:** after slice 1 the declaration exists with only the
  approved values exercised; slices 2 and 3 add replacement and timing
  choices; slice 4 adds the refusals and documentation.

## Baseline and proof ownership

Observed in this workspace on 2026-10-11, before any product change:

| Premise | Consuming operation | Observation | Result |
| --- | --- | --- | --- |
| The Feature Teams suite is green and cheap | jest `tests/featureTeams` | 1 suite, 19 tests passed, 13 s | Settled |
| The clip's facts are what the film types | `ffprobe` on `assets/Component teams.mp4` | video 1080×1920, 50/1, 5675 frames, stream 113.500 s; audio stream 113.508 s; container 113.508 s; the film types 113.508 (`film.ts`), 113.5 (`cues.ts`), 3366 (render script) | Settled: container duration is the film's value |
| Composition metadata can be derived from a declaration and the compare tool sees it | `remotion compositions src/index.ts` | lists SilentScene at 171 frames (its `calculateMetadata`) and FeatureTeamsFilm at 3768 | Settled |
| Trim and mute exist on the video component | `remotion` 4.0.533 `video/props.d.ts` | `trimBefore`, `trimAfter`, `muted`, `volume`, `playbackRate` declared | Settled |
| The compare command can certify the unchanged film as Preserved | `pnpm compare FeatureTeamsFilm` (HEAD f0bedba vs an identical working tree) | Ran end to end in 991 s with the clip in its temporary worktrees: 3768 frames both sides, duration and fps unchanged, mixed WAV samples identical, verdict **Not preserved** with 702 undeclared changed frames in 428 ranges (opening frames 25–31, the clip from 33 s on, the end card to 119 s); all 702 preview pairs differ by at most one luma level | Settled false: byte-exact frames are not reproducible here; exact proof moves to the timeline digest |
| The noise is the renderer's, not the change's | two `remotion render --sequence --image-format=png --frames=1057-1130` runs of the unchanged film | default (config `angle`): 29 of 74 frames differ between runs; `--gl=swangle`: 34 of 74; decoded pixels differ on 2–56 pixels per frame by at most 6 levels, inside the stage (x 220–585, y 87–624), never the inset (x ≥ 740) or the logo | Settled: run-to-run rasterization noise, independent of the GL renderer; the proofs below read rendered frames within this noise |
| Frozen video is silent during a hold | rendered WAV over the hold range | Not observed; `Freeze` is read-only known to wrap a `Sequence` context. If the frozen clip still sounds, the inset mutes explicitly from `holdFrom` (volume 0), which the same proof observes | Open until slice 3; slice 3's WAV check is the observation |
| The whole gate is green here | `pnpm test` | `nix develop -c sh -c 'NODE_ENV=test pnpm test'`: 59 suites, 657 tests passed, no lint or tsc diagnostics, 82 s | Settled |

Promise ownership: declaration, measurement, derived clock and cover,
preservation, consumer-compatible tests (1); framing follows intent,
replacement by declaration (2); trim, hold, edit (3); feedback, voice policy
refusal, README, whole gate (4). Story examples: 1 → 1; 2 → 2; 3 → 3; 4 → 3;
5 → 4. Terry's framing judgment at preview is a human evaluation in slice 2.

Consumers of changed surfaces: `CLIP_SECONDS` and `CLIP_FRAMES`,
`durationInFrames`, `COVER_FRAME`, `OPEN_FRAMES` are read by
`tests/featureTeams/FeatureTeamsFilm.spec.tsx` and
`FeatureTeamsStory.spec.tsx` (timeline/shell/cover vs story cues; cover
asserts the render script's text); `film.ts` and `cues.ts` are read by
`pose.ts`, `Scene.tsx` and `stories/FeatureTeamsFilm.tsx`; `render:feature-teams`
is read by the spec and by Terry. Nothing else imports the Feature Teams
modules (`grep -rn featureTeams src tests`: only those files).

## Story obligations

### G1. Compare stage pixels exceed plan ≤6 sample
Reported: slice 1 — "stage AA often max ~15–17 (up to 55) on few pixels — above the plan's ≤6 sample, same class of renderer noise"
Story clause: "no picture difference beyond the renderer's own run-to-run noise"
Disposition: interim until slices 4

## Ordered slices

### 1. The speaker shot is one declaration with measured facts, and the approved film is unchanged
Type: Structure
Status: done
Accepted proof: timeline `cmp` of `out/feature-teams-timeline-baseline.json` vs
`out/feature-teams-timeline.json` identical; focused
`tests/featureTeams` (2 suites / 21 tests) green after refactor split;
`measure-shot.mjs` / `--check`; `FeatureTeamsFilm` compositions 3768;
`render:feature-teams` film+cover at `COVER_FRAME` 3366; gate
`NODE_ENV=test pnpm test` 59 suites / 659 tests; compare vs `f0bedba`
duration/fps unchanged, mixed WAV identical, inset rectangle ≤6 (G1 holds
stage ≤6 open until slice 4).
Proof: first, with the code unchanged, `scripts/feature-teams-timeline.ts`
is written and its dump saved as the baseline; the slice's own inset
placement numbers (video width 300/0.83, left −0.085 × that, top
−0.04 × that × 1920/1080 − 6, sequence from 108 for 3406 frames) are
recorded in the test from the current composition before it changes. Then
`node scripts/measure-shot.mjs` writes `shot-measurement.json` with the
ffprobe facts above and the clip's SHA-256; `--check` passes, and passes
again after the record is committed; jest `tests/featureTeams` green with
its consumers updated (the cover test asserts the tsx render script and
`COVER_FRAME === 3366`; the spec hashes the clip against the record; the
placement test asserts the recorded numbers; `poseAt` at the scene's end
still holds); `remotion compositions` lists FeatureTeamsFilm at 3768
frames; the timeline dump after the change is byte-identical to the
baseline dump (`cmp`); `pnpm compare FeatureTeamsFilm --baseline f0bedba`
reports duration and fps unchanged, audio identical, and only noise-level
picture differences (every preview pair ≤ 6 levels on a few pixels, none
inside the inset); `pnpm render:feature-teams` writes the film and the
cover at frame 3366; whole gate `pnpm test`.

Internal change: `shot.ts` (declaration, `Shot` type, `compileShot` with
the approved path only: full play, edit, voice), `shot-measurement.json`,
`scripts/measure-shot.mjs`, `scripts/render-feature-teams.ts`; `film.ts`
and `cues.ts` derive every clip quantity from the slot; `ClipInset` takes
its placement from the compiled crop and measured size; the composition
gains `calculateMetadata`. External behavior and every rendered frame are
unchanged. Enables slice 2.

### 2. Terry replaces the source with a re-framed export and the presentation holds
Type: Behavior
Status: planned
Proof: `ffmpeg` makes the stand-in with the margins cut away (crop
`896:1769:92:77` of the source, audio copied) and `measure-shot.mjs` records
it; a scratch declaration names it with crop `{ 0, 0, 1 }`; unit proof in
the Feature Teams spec: `compileShot` maps the stand-in's full frame to the
same inset rectangle, scale and offsets (within a pixel) as the approved
crop maps the approved source; jest green with `cues.ts`, `pose.ts`,
`Scene.tsx` and the spec's story tests untouched (`git diff --stat` names
only `shot.ts` and `shot-measurement.json`); `remotion compositions` still
3768; `remotion still` at the shot's 0:40 (frame 1308) for approved and
stand-in declarations, viewed by Terry: Bas at the same size and place
inside the same border, card, meter and labels unchanged; a pixel diff of
the two stills (decode with ffmpeg to raw RGB and compare in a short
python script, as the baseline noise was measured; `pngjs` is not
installed) shows no pixel outside the inset rectangle `740,440 300×592`
differing by more than the measured noise (6 levels), while the inset holds
whatever difference the re-encode brings; the timeline dump is
byte-identical to the baseline. Revert the
scratch declaration, remove the stand-in, `git status --short` clean.

Behavior: with a declared source of different geometry and its own crop,
the inset shows the same framing and the film's cues, length and overlays
are unchanged; the stand-in's own sound plays under the voice policy.

### 3. A different-length source follows Terry's trim, hold or edit choice
Type: Behavior
Status: planned
Proof: two stand-ins: `lead.mp4` with 2.0 s of leading room (ffmpeg
`tpad`/`adelay`, 115.508 s) and `short.mp4` cut at 108.6 s. Unit proof on
`compileShot`: lead with `play: { from: 2.0, to: 115.508 }` gives the
approved slot, frame count and cover frame; lead with `'full'` gives a slot
2 s longer (the documented wrong preview); short with `hold` gives
`sceneSeconds` 113.5, `holdFrom` 108.6 and the approved `durationInFrames`;
short with `edit` throws naming `108.6` and `joy` at 109.3 s. Render proof
for lead-trim: `remotion still` at frame 1308 matches the approved frame
within the measured noise inside and outside the inset (the same video
samples offset by the room), and the timeline dump is byte-identical to the
baseline; for short-hold: `remotion render --codec=wav --frames=3366-3513`
(108.6–113.5 s of the shot) has silent samples after 108.6 s, and frames
3400 and 3500 as PNG show the same frozen inset picture (inset pixels within
noise between them) with the animation advancing outside it. Jest green with no cue
edit; stand-ins removed and declaration reverted; `git status --short`
clean.

Behavior: trim keeps the slot as approved from an explicit source range;
hold freezes the inset silently from the slot's end to the choreography's
end with the duration unchanged; edit stops with the unreached cue named;
playback rate is never changed.

### 4. Terry gets useful feedback, and the film documents the shot
Type: Behavior
Status: planned
Proof: unit proof on `compileShot` for a crop with `left + width > 1`, a
range `0–120` on the measured 113.508 s, and `audio: 'voice'` with
`hasAudio: false` (a stand-in made with `ffmpeg -an`, measured, so the
record is real), each throwing the decided sentence naming the shot; a
scratch rename of the clip makes `measure-shot.mjs --check` and therefore
`pnpm render:feature-teams` stop before rendering, naming the file, then
the rename is reverted and `--check` passes; `terry-moves/README.md` gains
"Feature Teams" with the declaration, replacement steps and the three
choices, and the credits text is unchanged; whole gate `pnpm test`;
`git status --short` shows only intended files; final
`pnpm compare FeatureTeamsFilm --baseline f0bedba` with the approved
declaration: duration and audio unchanged, picture differences within the
measured noise, and the timeline dump byte-identical to the baseline.

Behavior: a missing or changed file, a crop outside the frame, a range
outside the measured length, and a voice source without audio each stop the
film before rendering with the shot and problem named; the README states
how to replace the shot.

## Current decisions

- One declaration per shot; crop and play belong to the source, placement
  and presentation to the shot.
- Source facts come from `shot-measurement.json`, written by ffprobe and
  verified by SHA-256 in the spec and before every render; no second typed
  copy of duration or geometry remains in `film.ts`, `cues.ts` or the render
  script.
- The scene samples at seconds into the slot; the choreography keeps its own
  end in narration seconds; edit follows the slot, hold freezes to the
  choreography's end, trim is an explicit source range; never a playback-rate
  change.
- Refusals are thrown sentences from a pure compile step or the measuring
  script's check; nothing is rendered after one.
- Stand-in exports are proof material only and are never committed.
- Preservation is proven exactly on the derived timeline and inset
  placement; rendered frames are read within the measured renderer noise
  (≤ 6 levels on a few pixels per frame), because the unchanged film does
  not render byte-identically twice.

## Learnings

- Rendering the unchanged Feature Teams film twice differs on hundreds of
  frames by a few pixels at ≤ 6 levels, with `angle` and with `swangle`
  alike; the compare tool's exact rule therefore reports Not preserved for
  this film with no change. Whether Preserved should tolerate renderer
  noise is a product decision for Terry, outside this story.
- Run jest, remotion and the compare tool inside the nix dev shell with
  `NODE_ENV=test`; ffmpeg and ffprobe are host binaries outside it.
- Slice 1 compare vs `f0bedba` with the declared shot: duration/audio match
  and the inset stays within ≤6, but stage/character AA often peaks ~15–17
  (max 55) on a few pixels — above the plan's stage sample of ≤6. Exact
  preservation for this story remains the timeline dump `cmp`; G1 tracks
  the compare noise reading through slice 4.
