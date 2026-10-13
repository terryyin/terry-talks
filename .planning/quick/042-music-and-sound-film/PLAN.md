# Finding a Shared Rhythm

**Identity:** terry-moves-filmmaking#music-and-sound-film
**Source:** [refined story](../../../terry-moves/seed.md#music-and-sound-film)
**Preparation workspace:** `/Users/terryyin/git/terry-talks/.worktrees/i-can-make-a-film-whose-rhythm-follows-music-and`
**Observed source revision:** `046d0ad96a4d0f422025f1c3364b327cb0877fe3`

## Goal and scope

Give Terry a complete, revisable sound-led film: scattered individual pulses
become a shared rhythm, pause, then resolve as an ensemble with distinct motifs.
Target roughly 36 seconds, 1080×1080 at 30 fps, with an original locally authored
percussion/plucked-tone score and no speech. Music phrases and accents direct
motion, visual emphasis and cuts. Deliver the baseline and a meaningful cue
revision with saved media, separate MP4s, credits, and usable authoring guidance.

Terry delegated the creative recommendation on 2026-10-13. The direction is
selected for preparation; no artistic approval of the future film is claimed.
Exact notes, palette and choreography can evolve within this bounded idea.
Automatic analysis, third-party tracks/services, arbitrary track replacement,
tempo warping, narration, character/3D production, a visual editor, other formats
and upload are deferred. The existing story asks for a cue or phrase revision;
this plan proves the cue route and adds no phrase-replacement promise.

This is preparation only. Execution needs its own instruction. Preparation may
retire this checkout after landing; execution records its actual checkout and
reuses observations only where their boundary still matches.

## Current decisions and reuse

- One film-local musical direction owns phrase lengths and named accent times.
  Derive score events and visual targets from those cues. Keep the media file
  selected explicitly with its matching direction; do not maintain independent
  literal sound and visual clocks. Convert to composition frames consistently
  at 30 fps, keeping audio targets within one video frame of their intended
  visual target. A visual anticipation may start earlier; its impact is the
  cue target. Derive total duration and leave a deliberate ending/tail.
- Start at 100 BPM as a practical composing choice: half a beat is 0.3 seconds,
  or nine frames. About fifteen four-beat bars gives 36 seconds. Bar count and
  BPM are authoring values, not production acceptance gates. For the revision,
  move an isolated accent within a phrase; do not move every downstream phrase.
- Borrow choreography's cue score: phrases become passages, accents become
  action targets, rests become holds, motifs become performers. The analogy
  organizes direction; it does not establish aesthetic quality.
- PFE: `src/beatTimeline.ts` already owns sequential frame timing and sampling
  with optional captions. Reuse it for passage ranges where that meaning fits,
  applying musical timing before construction as its existing contract says.
  `src/stories/TPSAndAIFilm.tsx` plays a saved score with `Audio` and uses the
  existing composition/export route. Reuse that playback responsibility.
- `scripts/tps-and-ai-score.mjs` demonstrates local synthesis and WAV output,
  but its melody, scene IDs and source clock belong to Jidoka. This film needs
  a musical-event-to-audio responsibility, not a copy of that scene-specific
  arrangement. Reuse or narrowly expose suitable synthesis primitives if that
  is simpler; keep Jidoka's output stable if changing its implementation.
  Do not build a synthesizer framework or make all films music-led.
- The typography film's `script.ts`, composition selection and README show
  retained baseline/revision directions consumed by one renderer. Reuse that
  pattern, not its reading-time policy. Existing `revision/` comparison helpers
  may assist preservation, but this plan does not depend on their supporting
  a new composition: explicit saved-input hashes and baseline replay own proof.
- Preserve saved baseline media byte-for-byte during the revision. Generate a
  new audio take explicitly; ordinary preview/export reads it. Keep baseline
  and revision directions and audio paths distinct and discoverable. A small
  cue/source fingerprint or equivalent check should detect a stale pairing
  before exporting misleading synchronization, naming the take and regeneration
  action. This is necessary to keep the cue-following promise after edits, not
  a separate asset-management project.
- [Accepted ADR-0000 — Use Architectural Decision Records](../../../docs/adrs/0000-use-adrs-accepted.md)
  is the sole Accepted ADR; the index agrees. It reserves durable decisions to
  the human. No conflict, exception, ADR proposal or North Star topic is needed
  for this local film and its supported authoring path.

## Outside-in proof ownership

| Promise | Owner | Observable proof |
| --- | --- | --- |
| Sound-led action, emphasis, a cut and deliberate rest without speech | Slice 1, completed across the film in slice 2 | Actual registered excerpt/film played with sound; audible accent onset and selected visual target agree within one frame; phrase transition directs a visible change, and the rest is heard and seen. |
| A complete intentional progression and ending | Slice 2 | Entire encoded film reviewed at normal speed, full size and 360×360; distinct motifs, response, ensemble, pause and resolution remain understandable. Record observations and Terry's actual feedback separately. |
| One cue edit moves sound and its visual response | Slice 3 | Baseline versus half-beat revision: decoded audio onset and real rendered impact/cut move nine frames at 100 BPM/30 fps; unrelated cue targets and phrase boundaries do not move. |
| Reusable script-based direction | Slices 1 and 3 | Renderer consumes named direction; a scratch additional passage/motif edit previews through the same renderer without passage-ID conditionals, then is reverted or deliberately retained as documentation. |
| Retained approved media and reproducible takes | Slice 3 | Hash baseline source/audio before revision; replay each documented selection/export; baseline hashes remain unchanged and sampled decoded picture/audio match its initial export. Keep both full exports separate. |
| Preview agrees with export and is safe to seek | Slices 1–3 at changed boundaries | Direct middle-frame and backward seeks reproduce the same poses; compare cue frames in Studio and encoded output. No wall-clock animation state. |
| Saved score matches the selected cue direction | Slice 1, revision proof in slice 3 | Alter a cue without saving a matching new score → preview/export reports the stale pairing; explicitly create/select the revised take → encoded sound and visual target align. |
| Publishable MP4, retained inputs and credits | Slices 2–3 | ffprobe reports H.264/yuv420p/BT.709, 1080×1080 at 30 fps with audio; normal-speed playback has no unintended clicks, clipped ending or missing passages. Credits/source notes and actual replay commands accompany the takes. |

New tests must observe actual direction-to-composition wiring, not mock the cue
resolver or score selection they claim to prove. Disable cue consumption in a
scratch edit to confirm the revision proof fails. Assertions supplement real
playback, which owns the artistic signal. Report what was actually seen/heard;
do not infer a listening verdict from waveform statistics.

## Ordered slices

### 1. Watch a short passage follow its musical cues
Type: Behavior
Status: planned
Proof: An 8–10 second registered excerpt with saved original audio plays an
isolated pulse, answering motif, phrase change/cut and brief rest. Actual audio
onsets and rendered target frames align; middle/backward seeks are deterministic.
Stale direction/audio pairing produces actionable feedback before export.

Behavior: Given a short authored musical direction and its explicitly saved
score, select the excerpt in Studio and play it with sound. Visual anticipation,
impact, emphasis and transition follow the named cues rather than narration or
a separately edited time list.

Include the small musical-direction representation, local sound generation,
saved-take pairing, shape/motif rendering and composition registration in this
one vertical result. Adapt existing synthesis only to the extent justified by
the motif. Check the render/audio route with this actual new composition. Use
the same direction/renderer that will consume the full piece, not a disposable
parallel demo. Review the excerpt's musical and visual feel before expanding
it; revise within the selected idea if it is mechanical or unclear. If evidence
requires another idea/source/provider, stop that dependent path for a scope
decision rather than silently changing the story.

Safe stopping point: a playable, editable excerpt, explicitly incomplete.
Slice 2 replaces its limited duration with the complete film. Slice 3 owns the
retained full-film revision; do not claim it from this excerpt alone.

### 2. Export the complete sound-led film
Type: Behavior
Status: planned
Proof: A full roughly 36-second baseline MP4 shows the complete arc, coordinated
sound/action, intentional pause and resolved ending. All passages play at normal
speed with sound, at full size and 360×360, and metadata matches the composition.

Behavior: Given the working motif and cue path, author the full direction and
explicitly save its baseline score. Preview/export Finding a Shared Rhythm →
individual motifs begin apart, answer one another, form an ensemble, pause and
return together without erasing their identities or needing spoken explanation.

Use the same cue rule across passages. Make at least one cut or clear framing
change musical; do not satisfy the scope only by scaling shapes to amplitude.
Tune sound density, anticipation, timbre, visual hierarchy, rest and ending as
one edit. Keep credits readable and allow the musical release to end cleanly.
Retain the original direction, generated score and synthesis inputs; document
authorship and any actual source provenance. No paid asset or service is needed.

Export H.264/yuv420p/BT.709 to a distinct path under ignored `terry-moves/out/`.
Inspect streams and complete playback. Document the composition selection,
explicit score-generation step and export command. Capture the baseline input
hashes and output observations before slice 3 changes direction. This replaces
slice 1's excerpt limitation; the whole film is usable even before the retained
revision is demonstrated.

### 3. Move an accent and reproduce both saved takes
Type: Behavior
Status: planned
Proof: A half-beat authoring edit moves a selected isolated sound accent and its
visual impact/cut together by nine frames at the chosen tempo. Both full takes
can be selected/exported again; unrelated cues and baseline inputs stay intact.

Behavior: Given the baseline, derive a revised direction with the selected cue
half a beat later inside the same phrase, explicitly save a separate score, and
select it in preview/export. Its action follows the cue without renderer edits;
selecting the baseline again restores the original sound and performance.

Choose an isolated cue with room for the delay and its release. Check stale
pairing feedback before generating/selecting the new score. Prove decoded
audio onset as well as the visual target, not only a changed cue-data value.
Check unaffected targets and phrase boundaries; the allowed changed interval
includes the moved sound's envelope and its visual anticipation/release.
Review the revised full film for accidental collisions and musical awkwardness.

Replay both exports from retained inputs without regeneration. Compare baseline
input/audio hashes and matching decoded samples/frames with the pre-revision
observation; do not demand byte-identical MP4 containers. Document selecting a
take, revising a cue, explicitly saving audio, previewing, exporting and authoring
another passage using the supported motif/action vocabulary. Exercise that
last editing example through the same composition in a reversible scratch
change, then restore it. No second finished film is promised.

## Verification and delivery

Execution uses installed `dough-execute-plan`, including independent post-change
refactoring, relevant proof, agent commits and authorized delivery. Slices include
their implementation, focused checks and cleanup. No numeric slice target or
hard limit is supplied; boundedness follows the three distinct proof loops.

Use `dough-manual-testing` for the required sound/visual observations and the
installed Remotion skill for implementation specifics. Preview the registered
composition. New tests under the film's capability-named test directory should
exercise cue-to-rendered-action, score pairing and retained-take selection.
Choose actual composition IDs/spec names during execution and record them;
prospective commands below are not claimed observations:

```sh
pnpm -C terry-moves test:unit --runInBand <new-film-test-directory>
pnpm -C terry-moves typecheck
pnpm -C terry-moves exec eslint <affected-source-paths>
pnpm -C terry-moves exec remotion render src/index.ts <composition> <output> --codec=h264 --pixel-format=yuv420p --color-space=bt709
```

If shared timing/synthesis changes, trace its consumers before editing and run
their relevant suites or output comparisons too. Prefer keeping existing films'
contracts unchanged; a shared change needs its own preservation evidence.
Do not run unrelated film renders or a repository-wide suite by default.

## Preparation evidence and learnings

Observed in the named checkout on 2026-10-13 at the source revision above:

- `pnpm install --frozen-lockfile --offline` succeeded from the local store;
  package and lock files remained unchanged. This prepares the real local
  Remotion route rather than relying on another checkout's dependencies.
- The following direct observation reached existing timeline sampling (not
  merely its type declarations). It passed: the second beat moves from frame
  30 to 45, total duration from 90 to 105, and captions stay empty. This settles
  sequential frame timing for silent authored durations, not the future music
  cue compiler or score synchronization:

  ```sh
  node --input-type=module <<'JS'
  import assert from 'node:assert/strict';
  import {timeline} from './terry-moves/src/beatTimeline.ts';
  const make = seconds => timeline([
    {name:'first',seconds,pose:t=>({section:'first',t})},
    {name:'second',seconds:2,pose:t=>({section:'second',t})}
  ],30);
  const before=make(1), after=make(1.5);
  assert.equal(before.beatRange('second').from,30);
  assert.equal(after.beatRange('second').from,45);
  assert.equal(before.durationInFrames,90);
  assert.equal(after.durationInFrames,105);
  assert.equal(before.poseAt(30).section,'second');
  assert.equal(after.poseAt(30).section,'first');
  assert.equal(after.poseAt(45).section,'second');
  assert.equal(after.captionAt(45),'');
  JS
  ```

- Local synthesis ran through the existing score generator, diverting only its
  output into `/tmp/music-preparation-generated-score.wav` and preserving the
  original script's input resolution. The consuming command was
  `node --input-type=module` with this observation body:

  ```js
  import {readFileSync} from 'node:fs';
  import {pathToFileURL} from 'node:url';
  const scoreURL=pathToFileURL(process.cwd()+'/terry-moves/scripts/tps-and-ai-score.mjs');
  const observed=readFileSync(scoreURL,'utf8')
    .replace('import.meta.url',JSON.stringify(scoreURL.href))
    .replace("new URL('../public/assets/tps-and-ai/score.wav', import.meta.url)",
      "new URL('file:///tmp/music-preparation-generated-score.wav')");
  await import('data:text/javascript;base64,'+Buffer.from(observed).toString('base64'));
  ```

  It wrote the existing 86-second score. `ffprobe -v error -show_entries
  stream=codec_name,sample_rate,channels -show_entries format=duration -of json
  /tmp/music-preparation-generated-score.wav` reported PCM s16le, 44100 Hz,
  mono, 86 seconds. This settles available local synthesis/file output, not
  the new percussion voice or whether a future score sounds good.
- `pnpm -C terry-moves exec remotion render src/index.ts TPSAndAIFilm
  /tmp/music-preparation-existing-score.mp4 --frames=30-59 --codec=h264
  --pixel-format=yuv420p --color-space=bt709 --scale=0.3333333333 --concurrency=2
  --log=error` completed. `ffprobe -v error -show_entries
  stream=codec_name,width,height,r_frame_rate -show_entries format=duration
  -of json /tmp/music-preparation-existing-score.mp4` reported H.264 360×360,
  30 fps, AAC audio and 1.003 seconds. `ffmpeg -hide_banner -i
  /tmp/music-preparation-existing-score.mp4 -vn -af volumedetect -f null -`
  decoded 96256 samples with mean -25.5 dB and peak -16.3 dB. This reaches actual
  registered scored-film encoding and non-silent audio decoding. It does not
  prove artistic quality or new-film synchronization. An unrelated missing
  `quillustration_flower_and_water-can/scene.bin` warning did not stop the route.

No product source or approved media was changed during observations. Temporary
outputs live outside the checkout. New musical direction, stale-pair feedback,
percussion quality, complete playback and revision preservation are explicit
implementation obligations, not assumed existing capabilities. No paid,
credentialed or human-held infrastructure premise is required for this route.

## Plan review

Three Behavior slices own one coherent cue model and three useful proof loops:
the musical excerpt, complete baseline film, and retained authoring revision.
The first tests the artistic mechanism early; slice 2 explicitly replaces its
incomplete-film limitation. The third proves the defining revision and saved
media promise. Each promise has an owner; no independent product outcome,
speculative framework or unobserved existing-tool premise blocks preparation.
Slice-plan refinement was not needed; this review found no remaining
slice-specific concern. Readiness is recorded through the canonical story
recorder after reviewing this plan and its source, not granted by this prose.
