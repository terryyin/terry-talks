# Thoughtful reaction proof

Slice 3 retains `AnimeEngineerScene` and registers `AnimeEngineerThoughtful`.
The revised script changes only interior listening cues: slower gaze away,
head inclination, narrower eyes, inward wrist movement and a considered blink.
Both versions share complete entry/exit anchors and the same reply direction,
stage, original artwork, retained takes, caption and mouth schedule.

## Accepted commands and observations

All commands reached terminal exit 0 in the execution checkout:

```sh
pnpm -C terry-moves test:unit --runInBand tests/animeCharacter
pnpm -C terry-moves typecheck
pnpm -C terry-moves exec remotion render src/index.ts AnimeEngineerThoughtful out/anime-engineer-thoughtful.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2
pnpm -C terry-moves exec remotion render src/index.ts AnimeEngineerScene out/anime-engineer-scene.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2
pnpm -C terry-moves exec tsx out/sample-anime-thoughtful-frames.ts
python3 terry-moves/out/inspect-anime-thoughtful-exports.py
```

The 23 anime tests across three suites pass. Seven new tests in
`tests/animeCharacter/thoughtful.spec.tsx` drive real registered components,
compiler and drawing, with the existing external Remotion frame/audio wrapper.
They observe changed gaze/head/brows/lids/wrists; actual picture equality at
every frame outside the cue-derived interval; all-frame caption, speech-mouth
and audio-slot preservation; continuous joins with attached foreground hands
and rear hair behind neck; direct/reverse/fresh equality; changing poses and
frozen-score discrimination; identical retained WAV verification in metadata.
The complete anchors remain equal after authored lead/pause edits move them.
No shared compiler, stage, rig, dependency or input changed; the accepted
24-test conversation proof remains applicable. Typecheck covers registration
and static consumers.

The disposable frame helper bundles the real Root and selects both registered
compositions with local inputs and ANGLE settings matching exports. Its
`out/anime-thoughtful-proof/picture-observations.json` records frames
0, 15, 44, 54, 84, 98, 105, 112, 153, 170, 188, 189, 194, 195, 216, 245, 317.
The actual cue-derived interval is 15 < frame < 189. Every sampled interior
picture changes; sampled outside pictures agree. Forward/reverse pictures
agree exactly, separate fresh browser frames 98/170 agree, and frozen controls
differ. The coordinator inspected helper setup, observations and test assertions;
numeric score values alone were not accepted as picture proof.

The export helper decodes actual MP4s with checked `ffmpeg`/`ffprobe` calls.
`export-observations.json` retains all ten literal command argument arrays:

- Both exports are H.264, 1080 square, 30 fps, 318 frames, 10.600-second video
  with stereo 48-kHz AAC (10.603 seconds).
- Native decoded 16-bit PCM is exactly equal between baseline, revision and
  retained pre-revision baseline: 508,928 stereo sample frames, 2,035,712 bytes,
  SHA-256 `75dd007825cdd103b8d24d53cc13126cccfc14d3d8a8be8ee15a99a614bb5fde`.
  RMS 1160.87 confirms non-silent speech; full speech placement was already
  proved by slice 2.
- All 318 decoded baseline picture hashes reproduce the pre-revision export.
- Fourteen selected decoded pictures agree with registered PNGs within
  2.445–2.583/255 mean encoding/color error.
- Eight interior character crops change 22,719–88,221 pixels independently of
  captions/title; six revised poses are distinct and frozen controls differ.

Disposable helpers and samples remain ignored under `out/`; production and
documented reproduction consume only retained source and saved sound.

## Bounded Studio comparison

The coordinator used this checkout's Studio, both named registrations, audio
enabled, loop off and normal 1x playback. Baseline ran about 29.7–30.5 fps;
revision about 29.8–30.1 fps. Baseline raises eyes and palm quickly; revision
turns inward more slowly with head inclination and a deliberate blink.
Neck/hair layering and attached wrists remain stable, captions fit, the quiet
pause has an empty caption/resting mouth, and the same reply and tail follow.

Baseline direct 194 → 216 → reverse 194 and fresh reload at 194 produced the
same picture SVG. Revised direct 105 → 153 → reverse 105 and fresh reload at
105 produced the same picture SVG; frame 105 closes the authored blink and
keeps a resting mouth. Revised frame 194 equals the baseline handover SVG.
Baseline selection was restored for comparison and both exports were reproduced.
This is bounded visual/playback assessment, not a new owner approval claim.

## Delivery review

Fresh independent refactoring returned `## REFACTOR COMPLETE`. The three anime
registrations now share `composition.tsx` for frame settings, compiled duration
and metadata verification. Public components and selected scripts are unchanged.
The coordinator inspected the helper, three callers and metadata observation
setup. Before/after registration JSON agrees exactly for props, Composition
type, IDs/components, dimensions/fps, default and edited-tail duration, fetched
WAV paths and stale-mouth rejection. Literal commands, both exit 0:

```sh
pnpm -C terry-moves exec tsx out/anime-thoughtful-proof/registration-contract.tsx out/anime-thoughtful-proof/registration-before-refactor.json
pnpm -C terry-moves exec tsx out/anime-thoughtful-proof/registration-contract.tsx out/anime-thoughtful-proof/registration-after-refactor.json
```

Refactoring invalidated registration/metadata checks; the same 23 anime tests
and typecheck passed again. No render/audio/manual boundary changed, so their
accepted proof remains applicable without rerendering. Every changed file is
within 250 lines. Coordinator's selective ESLint fixer and focused lint both
passed; no pre-commit hook is installed. `story-obligations.mjs check --plan
.planning/quick/038-anime-character-scene/PLAN.md --slice 3` passed with five
entries. G3 is proved by this evidence; no remaining slice-3 gap was found.
