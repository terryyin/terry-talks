# Complete scene proof

Slice 2 reuses the selected original artwork through `AnimeEngineerPerformance`.
`AnimeEngineerScene` registers the baseline; `animeSceneScript` supplies the
full off-screen question, 36-frame listening pause, visible reply and tail.
Full poses bound `listeningReaction` at question entry (frame 15) and before
the reply (frame 189); the future revision owns their interior. Source and
retained inputs/reproduction commands are documented in the anime README.

## Accepted focused and actual-export observations

- `pnpm -C terry-moves test:unit --runInBand tests/animeCharacter` — 16 tests
  passed across casting and scene suites. Actual registrations/components,
  compiler and drawing remain real; existing `testSupport.tsx` supplies only
  current frame/config/audio wrappers and actual saved bytes for metadata.
  `scene.spec.tsx` observes complete WAV slots (15/144 and 195/99), actual
  full captions/blank pause/tail, quiet listening/clause-gap mouths with
  continuing acting, positive/neutral/negative closed-mouth expression,
  changing brows/lids/gaze/head/attached hands, hair-neck paint order,
  continuous joins, direct/reverse/fresh entry and frozen-score discrimination,
  a longer script pause moving audio/caption/pose together, and WAV verification.
- `pnpm -C terry-moves typecheck` — passed on unchanged checkout dependencies;
  covers Root, both anime registrations/stage, pose and metadata consumers.
  Consumer search found casting/full anime and existing conversation callers.
  Shared compiler/types/metadata remain unchanged, so the retained passing
  24-test conversation proof stays applicable.
- `pnpm -C terry-moves exec tsx out/sample-anime-scene-frames.ts` — passed:
  real Root/registration with saved-input metadata, 17 PNG forward/reverse
  pairs at 0, 15, 36, 54, 108, 144, 158, 159, 180, 194, 195, 205, 216, 238,
  245, 259, 317 agree; a separate browser's fresh 194 agrees; all pictures
  differ and frozen 54 differs. `out/anime-scene-proof/observations.json`.
- `pnpm -C terry-moves exec tsx out/sample-anime-frames.ts` — refreshed casting
  proof passed for all 16 forward/reverse/fresh/motion/frozen observations.
- Both final actual MP4 commands reached terminal exit 0:

```sh
pnpm -C terry-moves exec remotion render src/index.ts AnimeEngineerScene out/anime-engineer-scene.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2
pnpm -C terry-moves exec remotion render src/index.ts AnimeEngineerCasting out/anime-engineer-casting.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2
ffprobe -v error -show_entries stream=codec_name,width,height,avg_frame_rate,nb_frames,duration,sample_rate,channels -show_entries format=duration -of json terry-moves/out/anime-engineer-scene.mp4
ffmpeg -v error -y -i terry-moves/out/anime-engineer-scene.mp4 -map 0:a:0 -ac 1 -ar 24000 -c:a pcm_s16le terry-moves/out/anime-scene-proof/decoded-sound.wav
ffmpeg -v error -y -i terry-moves/out/anime-engineer-scene.mp4 -vf 'select=eq(n\,54)+eq(n\,180)+eq(n\,216)+eq(n\,245)+eq(n\,317)' -fps_mode vfr terry-moves/out/anime-scene-proof/export-%02d.png
python3 terry-moves/out/inspect-anime-scene-export.py
```

The full scene is H.264 1080×1080, 30 fps, 318 frames, 10.600 seconds with AAC.
Actual decoded question at 0.5 seconds and reply at 6.5 seconds correlate
0.999926/0.999918 with the complete saved takes; full-film correlation is
0.999922 and silent-pause RMS is 0.117 int16 units. Five decoded export poses
match registered PNGs within encoding/color error 2.49–2.62/255. Eight
character-only crops vary and the frozen character control differs.
`out/anime-scene-proof/export-observations.json` retains those observations.

## Bounded manual journey

The earlier Studio server had ended across turns. Coordinator restarted the
owned checkout with `pnpm -C terry-moves exec remotion studio src/index.ts --no-open --port=3001`;
session 23108 serves the printed URL `http://localhost:3001`.
Chrome tab 137233021 opened `AnimeEngineerScene`. Final-source complete 1×
playback with sound enabled and loop off showed approximately 29.7–30.5 fps:
full question captions fit two lines without covering acting; early eyes and
palm rise, then gaze/brows/hands settle into reconsideration. The pause at
179/180 has empty caption and resting mouth with continuing pose movement;
216 shows the reply caption and rounded speech mouth. Neck skin and wrists
remain visible through the joins. Last silent frame 194 matches exact
`anime-picture` SVG between direct entry, backward entry from 216, and a fresh
reload at 194. The full performance reaches its tail and returns to start.
This is visual/manual judgment of the authored performance and retained
audio/timing proof; it does not claim Terry approved an unseen final version.

## Consequential correction and diagnosis

Manual observation exposed an inverted closed-mouth smile response: negative
values deepened a U-shaped smile while positive values flattened it. The
registered signed-smile regression failed before correction. The minimal
control point `-0.5 + smile*25` preserves endpoints, stroke and design while
zero/positive/negative cues now convey neutral/smile/concern. The final test
and `python3 terry-moves/out/inspect-anime-smile-correction.py` pass; changed
pixels are confined to resting mouths, while sampled spoken-mouth frames and
other stage/character pixels remain identical. Actual final decoded soundtrack
is byte-identical to its pre-correction version (`smile-sound-preservation.json`).
The affected casting export was refreshed to remain reproducible from current art.

An earlier stage-extraction byte discrepancy came from CLI/project ANGLE versus
the retained helper's default renderer. Before the expression correction,
`pnpm -C terry-moves exec tsx out/check-casting-stage-extraction.ts` reproduced
old casting frame 41 byte-for-byte in the matching renderer environment.
`casting-extraction-observations.json` preserves that diagnosis; the later
intentional mouth correction did not conceal a staging regression.

## Independent refactoring

Fresh `dough-post-change-refactor` review returned `## REFACTOR COMPLETE`.
`script.ts` now owns one focused entry pose and one retained reply/settle cue
list shared by casting and full-scene scores. No public score, cue order/value,
timing, drawing or metadata changed. Post-edit 16 anime tests, typecheck and
source/test whitespace checks passed. A temporary pre/post serialization
comparison confirmed both public scores are byte-identical as JSON.
Accepted actual movie, PCM, PNG and manual observations therefore remain valid
without repeating their renders. No other refactor concern remained.
