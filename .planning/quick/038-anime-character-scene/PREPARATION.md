# Preparation evidence

## Preparation observations and their limits

Observed on 2026-10-12 in
`/Users/terryyin/git/terry-talks/.worktrees/i-can-make-an-anime-style-character-perform-a-sh`,
branch `codex/i-can-make-an-anime-style-character-perform-a-sh`,
product base `55c540da5cf980fae17ab8e11c87576e8bd51931`.
The probe was disposable and removed before writing this plan. It did not
implement or select the production artwork. Diagnostic copies/results remain
in `/tmp/anime-route-preparation/`; execution must not depend on their survival.

| Premise / consuming operation | Observation | Limit or consequence |
| --- | --- | --- |
| Existing selected speech can be consumed locally | `python3 scripts/illustrated-conversation-speech.py` verified four WAV hashes/measurements; actual probe metadata also verified selected bytes before export. | Reuse question/reconsider and their mouth tracks; no speech generation prerequisite. |
| This checkout can render the selected shape of scene | Offline frozen-lockfile installation succeeded. Disposable `AnimeRouteProbe` consumed `compileConversation(pilotScript, 30)`, a separate vector human drawing, off-screen question, visible reply, real WAVs and captions. H.264 export contained 318 frames at 540×540, 30 fps, 10.6 seconds, with AAC sound. | Technical route proof, not finished-film or 1080px quality acceptance. |
| Same script sample reaches the drawing regardless of request order | Ten distinct PNGs at frames 0, 30, 80, 120, 158, 175, 195, 216, 285, 317 matched their reverse-order counterparts byte for byte. A fresh still at frame 120 matched its sample. | Repeat at the production rig's first frame, expression/gesture joins, speech boundaries and actual Studio seeks. |
| A script reaction edit changes the rendered character | At frame 120, the thoughtful script changed gaze/tilt/hand pose in the new drawing; inspected baseline/revised PNGs differed. The frozen-pose control also differed from the baseline. | Demonstrates cue-to-picture flow, not an accepted emotional reading or sufficient facial deformation. |
| Reaction-only editing can preserve the composed soundtrack | Baseline/revised WAV exports decoded to identical non-silent PCM: stereo 16-bit, 48 kHz, 508800 samples/channel. PCM SHA-256 `0e3befba9bebf3205341a5c54fc1872147e78c5202f7f6a72d445d35cd6e0a61`. | Repeat for actual final compositions; equal asset names alone do not prove the mix. |
| Existing acting regression checks discriminate broken direction | All four illustrated-conversation suites passed (24 tests). Scratch replacement of `poseAt` with the actor's initial pose made two reaction-revision tests fail (zero changed frames and identical revised drawing); restoration passed all three tests in that suite. | Protects existing consumers, not the new rig's visual or emotional quality. |
| Final anime design and acting satisfy Terry | This is an owner-held artistic judgment about a yet-unmade result, not a settled technical fact. | Slice 1 is the bounded moving casting probe. Terry reviews its actual result; rejection stops dependent production and changes the art/route plan before more work. |

Literal observation commands, from repository root (the scratch entry was
`terry-moves/src/__animePreparationProbe.tsx` and is now removed):

```sh
pnpm install --offline --frozen-lockfile
python3 scripts/illustrated-conversation-speech.py
pnpm -C terry-moves test:unit --runInBand tests/illustratedConversation
pnpm -C terry-moves exec remotion render src/__animePreparationProbe.tsx AnimeRouteProbe /tmp/anime-route-preparation/probe-fixed.mp4 --codec=h264 --pixel-format=yuv420p --concurrency=2
pnpm -C terry-moves exec remotion render src/__animePreparationProbe.tsx AnimeRouteProbe /tmp/anime-route-preparation/forward --sequence --image-format=png --concurrency=1 --props='{"sampleMode":true}'
pnpm -C terry-moves exec remotion render src/__animePreparationProbe.tsx AnimeRouteProbe /tmp/anime-route-preparation/reverse --sequence --image-format=png --concurrency=1 --props='{"sampleMode":true,"reverse":true}'
pnpm -C terry-moves exec remotion still src/__animePreparationProbe.tsx AnimeRouteProbe /tmp/anime-route-preparation/fresh.png --frame=120
pnpm -C terry-moves exec remotion still src/__animePreparationProbe.tsx AnimeRouteProbe /tmp/anime-route-preparation/revised.png --frame=120 --props='{"revised":true}'
pnpm -C terry-moves exec remotion still src/__animePreparationProbe.tsx AnimeRouteProbe /tmp/anime-route-preparation/frozen.png --frame=120 --props='{"frozen":true}'
pnpm -C terry-moves exec remotion render src/__animePreparationProbe.tsx AnimeRouteProbe /tmp/anime-route-preparation/baseline.wav --codec=wav
pnpm -C terry-moves exec remotion render src/__animePreparationProbe.tsx AnimeRouteProbe /tmp/anime-route-preparation/revised.wav --codec=wav --props='{"revised":true}'
pnpm -C terry-moves test:unit --runInBand tests/illustratedConversation/reactionRevision.spec.tsx
ffprobe -v error -show_entries stream=codec_name,width,height,avg_frame_rate,nb_frames,duration -of json /tmp/anime-route-preparation/probe-fixed.mp4
```

Python `hashlib.sha256` compared `forward/element-i.png` against
`reverse/element-(9-i).png` and the fresh/revised/frozen images against index 3.
Python `wave` compared decoded PCM and its format, rather than container bytes.
The diagnostic source is `probe-source.tsx`; results are `observations.json`,
`audio-observations.json`, `mutation.log` and `restored.log` in that temporary
directory. The first scratch movie had an invalid SVG hand-path interpolation;
only the corrected `probe-fixed.mp4` and subsequent samples support this record.
