# Illustrated conversation: speaking, listening, and revising a reaction

**Identity:** terry-moves-filmmaking#illustrated-conversation
**Source:** [selected story](../../../terry-moves/seed.md#illustrated-conversation).
**Authority:** Terry accepted the recommended scene and limited-animation route
and requested slice planning on 2026-10-12. This plan authorizes no execution.

## Goal and scope

Terry can make a watchable English exchange between the existing Engineer and
AI, then revise the AI's listening reaction through the same script. Deliver a
new square 1080×1080, 30 fps film, roughly 20–30 seconds, with saved speech,
speech-shaped mouths, gaze, expression, intentional gestures and pauses, and
clear changes of speaker. The duration is a creative target, not a rejection
rule. The first film and its revised performance remain available for comparison.

Working dialogue, to polish during the pilot without changing the selected idea:

| Turn | Speaker | Line and intention |
| --- | --- | --- |
| passed | AI | “All tests passed. I think we're ready to ship.” — pleased confidence |
| question | Engineer | “Passing which tests? Did we check what the customer actually needed?” — curious, not scolding |
| reconsider | AI | After a visible listening pause: “I checked the code I wrote. I didn't ask that.” — recognition |
| next | Engineer | “Then let's start there.” — invitation |

The chosen revision changes the AI's response during `question` from quick
surprise to slower thoughtfulness, then returns to the same settled pose before
`reconsider`. Speech assets, captions and turn boundaries stay fixed. Changing
spoken words is not required for this proof. The model must not reject a valid
script merely because its turn count differs from this example.

Deferred: a new rig, anime/3D styles, automatic acting inference, a visual editor,
automatic lip-sync tooling, music-led timing, translated editions, and SRT export.
No queued story is a prerequisite. Preserve existing films and the solved arm
behavior. Do not change shared product architecture for hypothetical later rigs.

## Current design and reuse decisions

- **One performance model.** The script owns named turns, speaker/take references,
  deliberate pauses, and directed pose cues for either actor. Compose turn timing
  once; audio, mouth cues, captions and acting consume it. Reaction cues use
  offsets from named turns and are evaluated on film time, so changing speaker
  does not reset the listener. The director authors intention; the renderer
  does not infer it from text. Use the smallest channels these examples need.
- **Existing drawings.** Extend `terry-moves/src/aiTestAutomation/actors.tsx`
  with optional timed speech-mouth input while preserving the existing
  mood-based mouth when that input is absent. Speech shape and mood cannot both
  draw competing mouths. Gaze, blink, head/body tilt and articulated hand targets
  already belong to these rigs; reuse `motion.ts` for their interpolation.
  Keep a single representation of the drawings, including if a small extraction
  becomes necessary. Do not duplicate an Engineer or rewrite its limbs.
- **Timing.** Reuse `terry-moves/src/beatTimeline.ts` for ordered frame ranges.
  It samples one beat at a time and does not itself carry actor state: the
  conversation's frame sampler owns sustained poses and cues across boundaries.
  Measure each saved take, use whole-frame slots that contain its full audio,
  and add authored pauses. Never shorten a take to fit an estimate. Mouth cue
  time is local to the actual take; resting in silence is distinct from a mood.
  An empty caption in a pause must be explicit because the shared timeline
  otherwise carries the previous caption forward. No shared timing rewrite is
  needed for this design.
- **Saved speech.** Start with `gpt-4o-mini-tts`, Cedar for the Engineer and Marin
  for the AI, as casting candidates. Follow the repository's saved-WAV production
  pattern, with direction, source text, measured duration and take hash retained.
  The current [official speech guide](https://developers.openai.com/api/docs/guides/text-to-speech)
  documents these voices, direction and WAV output (checked 2026-10-12). The
  credentialed request and artistic suitability are the early probe below, not
  facts established by documentation. Credit synthetic voices. Replays/renders
  use saved assets and make no speech requests.
- **Mouth cues.** Author a small editable cue track against the selected recording;
  supply the mouth drawings those sounds need. Use closed/rest, open and rounded
  shapes as the minimum artistic vocabulary rather than amplitude-only flapping.
  Add distinctions when the pilot needs them. Rhubarb is optional future
  assistance; no installed binary or recognition quality is assumed. Replacing
  a take requires remeasuring and reviewing its cues, not reusing stale timing.
- **Reuse boundaries.** `scripts/narration_audio.py` has PCM, measurement and
  hash-verification primitives; use a primitive if needed, not its narrator's
  same-words region-splice model. The subtitle-led `models/Script.ts` is not the
  clock for this scene's silence. `visualTreatments` demonstrates named versions
  and frame-sampled acting; reuse that pattern without its shop-specific poses.
  The existing compare tool observes picture/audio but does not know this new
  turn schedule; it cannot replace the dialogue boundary checks below.
- **Ownership.** Keep the new scene's script, sampler and composition together
  under a capability-named `terry-moves/src/illustratedConversation/`, with focused
  tests under the corresponding `tests/` directory and retained runtime assets
  under `public/assets/illustrated-conversation/`. Register the composition in
  the existing root. Add the authoring/export recipe to `terry-moves/README.md`.
  These are working locations, not a prohibition on coherent supporting changes.

[ADR-0000 — Use Architectural Decision Records](../../../docs/adrs/0000-use-adrs-accepted.md)
is the only Accepted record in the index and agrees with its in-file status.
It preserves human ownership of durable decisions; none selects a rig or
conflicts with this local extension. No North Star file or new ADR is warranted.

## Outside-in proof ownership

| Final promise | Owning slice | Observable proof |
| --- | --- | --- |
| Saved speech and mouth timing read as speaking, with a responsive listener | 1 | Play the two-turn pilot with sound; inspect rendered mouth shapes at speech/rest boundaries and compare direct/reverse frame samples |
| Pauses, gestures and changes of speaker communicate the selected idea | 2 | Play the complete export at normal speed; observe the AI reconsidering during silence and continuing into its reply |
| Script drives the scene, including silent reactions and captions | 2 | The public composition consumes the authored script; change its pause in a test and observe audio start, pose and captions moving together |
| A reaction can be revised without bespoke scene code or changed speech/timing | 3 | Change only the authored reaction; before/after exports show the intended difference; turn/caption records and rendered audio samples agree |
| Existing rig users remain usable | 1 | Capture omitted-mouth-input behavior before editing, then exercise the existing acting, silent-scene and visual-treatment consumers after the extension |
| Film and revision replay from saved inputs | 3 | Run the documented export from retained assets without a speech request; inspect the resulting picture, audio and duration |

Tests must assert the drawn result, selected source and observable schedule, not
only an internal `speaking` flag or fixture that precomputes the expected acting.
Automated checks establish timing/continuity, not Terry's artistic acceptance.

## Ordered slices

### 1. Watch the question and reply with convincing mouth timing
Type: Behavior
Status: planned
Proof: The Engineer's `question`, the listening pause and the AI's `reconsider`
play as a small voiced pilot; both characters are recognizable, speech mouths
follow their takes, and the listening response is readable.

Behavior: Given the selected cast and two lines → direct and play them through
the new script → Terry sees one character speak while the other reacts, a
meaningful silent pause, and a clear handover of speech.

- **Early probe, before expansion:** audition one short saved take per character
  using the existing speech-production route, then pair them with the smallest
  real rig/mouth/acting implementation needed to play this pilot. Obtain Terry's
  sound-on judgment of voice distinction, lip timing and the listening pause.
  Record the chosen takes, direction, cue corrections and judgment. No paid
  request is made during planning; execution must have applicable generation
  authority and credentials. If unavailable, retain the pilot and name the exact
  missing input. If acting is unconvincing, revise this bounded pilot. A need for
  a different rig, style or scene returns to Terry before dependent slices.
- Implement the minimal common script-to-performance path, optional mouth input,
  measured saved takes, timed mouth drawings, a pause, gaze and one reaction.
  Author mouth cues against the audio, including internal gaps. Preserve the
  rig's old default paths. Missing/changed audio or out-of-take mouth cues must
  identify the turn and required correction before producing a misleading export;
  these checks serve the selected-take/timing contract, not arbitrary cast limits.
- Use the real registered composition for the pilot. Add focused tests that
  render speech and rest frames, sample the same frame after forward/reverse
  access, and demonstrate that muting a mouth change makes the mouth proof fail.
  Before altering the shared rig, capture its existing omitted-input mouths and
  expressions across the moods this work touches. Run the affected consumer
  suites, not just the new scene's tests.
- Safe stop: a replayable two-turn pilot with retained takes, no changes to the
  approved films. This is intentionally an incomplete film; slice 2 supplies
  the setup and resolution. Do not claim the whole story complete here.

### 2. Watch the complete exchange and understand the pause
Type: Behavior
Status: planned
Proof: A complete exported scene communicates confidence → question →
reconsideration → invitation at normal speed with sound.

Behavior: Given the accepted pilot → add `passed` and `next` through the same
script and export → the four turns form one watchable scene with consistent
staging, intentional listening and no cut-off speech or pose reset at a turn.

- Produce and retain the remaining takes; compose the complete scene from the
  same turn rule, using measured duration rather than estimated reading speed.
  Stage both faces at a readable size. Add anticipation, a modest speaking
  gesture, listening gaze/expression and settling only where they clarify the
  exchange. Captions follow the shared turn schedule and do not obscure faces.
- Prove one sustained listening cue across the question/pause/reply boundary
  through the real scene sampler and rendered elements. Change an authored pause
  in a test: later audio/captions must move by that amount while each take's local
  mouth timing stays fixed. Observe first/last speech samples and silence, and
  mount directly at a middle frame as well as seeking backward.
- Export `IllustratedConversation` to a saved H.264/AAC MP4 using the repository's
  Remotion render path; provide a capability-named render command. Inspect the
  streams/duration and play the whole artifact, not only a contact sheet. Terry
  judges whether the listening pause changes how the answer is understood.
- Safe stop: a finished first conversation exists and is reproducible. The
  meaningful revision remains owed by slice 3; save this version and its export
  as the comparison baseline before changing the performance.

### 3. Revise the AI's listening through the same script
Type: Behavior
Status: planned
Proof: The second export visibly changes the listening performance while its
speech, captions and turn timing remain the first version's; the renderer is
unchanged by the demonstrated edit.

Behavior: Given the first film → change only the AI's reaction during `question`
from quick surprise to slower thoughtfulness → review both exports and see the
new response, returning to the original settled pose before the next line.

- Keep a named baseline and revision of the authored script. Adjust gaze,
  expression, tilt or hand gesture in the reaction interval; all already use the
  same authored cue vocabulary. If the edit needs new scene branches, fix that
  authoring gap within this slice rather than presenting it as a reusable path.
- Compare the actual drawn pose/markup over every frame outside the authored
  reaction interval, and observe visible differences within it. Compare the
  compiled turn starts, durations, captions and chosen takes across versions.
  Export mixed WAV audio for both through Remotion and compare decoded PCM
  samples, rather than relying only on identical source filenames or lossy MP4
  hashes. Verify the two MP4s at normal speed with sound. These complementary
  checks own the film's timing and audio promises without extending the generic
  comparison tool's timeline registry.
- Demonstrate the documented script edit and render recipe. Explain how a
  turn references its saved take and local mouth cues, how to direct either
  character, how to author silence, and how to review a take change. Run the
  saved-asset export without calling speech generation. Retain source assets,
  the first/revised scripts and their production credits; keep rendered output
  in the existing ignored export area.
- Safe stop: Terry has the watchable exchange, an observed meaningful revision
  and a usable authoring/export path even if every later style story is dropped.

## Verification and delivery gates

Use the installed Dough execution workflow when execution is separately
authorized. Its proof acceptance, independent post-change refactoring, agent
commit and delivery/CI ownership apply to each slice; this plan changes none of
them. Do not publish a deliberate failing test or claim a pilot as final proof.
No project numeric slice target or S/M/L definition was supplied: each slice is
bounded by one visible result, with the pilot isolating the paid/artistic risk.

New checks belong at `tests/illustratedConversation/` and run with
`pnpm -C terry-moves test:unit --runInBand tests/illustratedConversation`.
When the shared rigs change, run the whole affected surfaces with
`pnpm -C terry-moves test:unit --runInBand tests/aiTestAutomation tests/silentScene tests/visualTreatments`.
Run `pnpm -C terry-moves typecheck` and lint the changed TS/TSX because the
new rig input and composition cross typed consumers. Run Python tests only if
shared Python audio helpers change. Broader CI checks are not invented local
gates for this preparation or for unchanged Slidev content.

At execution's visual/audio acceptance points use `dough-manual-testing`, as
this plan explicitly requires playback/seek observation. Inspect actual exports
and retain the setup, commands, observations and Terry's artistic feedback in
this plan. A missing human listening judgment remains unproved, even with green
timing tests. Reuse accepted evidence only while its boundary is unchanged.

## Preparation observations and decisive premises

All observations below were made in the owned workspace
`/Users/terryyin/git/terry-talks/.worktrees/i-can-make-an-illustrated-conversation-with-conv`
at product revision `8143267bb1903764b354ca76ad5a7972b08f9609` on 2026-10-12.
They are preparation evidence, not completed slice proof. Scratch edits were
restored; no product implementation is included in this preparation.

| Premise and consuming operation | Literal observation and result | Limit / consequence |
| --- | --- | --- |
| The local focused runner reaches the rigs' existing consumers | `pnpm install --frozen-lockfile` succeeded, leaving the lockfile unchanged. `pnpm -C terry-moves test:unit --runInBand tests/aiTestAutomation/acting.spec.tsx tests/silentScene tests/visualTreatments/characterTreatment.spec.tsx tests/visualTreatments/characterRevision.spec.tsx tests/visualTreatments/treatmentContinuation.spec.tsx` passed 8 suites / 116 tests | A regression baseline, not speech proof |
| Those consumer checks discriminate rendered hand behavior | In a reversible scratch edit of `actors.tsx`, replaced the Arm call's `target` argument with `shoulder`; reran the exact command above: 7 suites and 32 tests failed. Restored the file byte for byte and verified `git diff --quiet -- terry-moves/src/aiTestAutomation/actors.tsx` | Shows consumer coverage of articulation; optional speech/default mouth needs new proof in slice 1 |
| Shared timeline composes silent intervals and supports direct/reverse sampling | `pnpm -C terry-moves exec tsx ../.conversation-preparation-probe.ts` evaluated `timeline([beat('speech',1,'spoken',s=>({s}),30),beat('pause',0.5,'',s=>({s}),30),beat('reply',1,'answer',s=>({s}),30)],30)`: 75 frames, reply from 45, empty caption at 35, pose at 48 = `{s:0.1}` before and after samples 74,2,40,0. Assertions passed; scratch file removed | Cross-turn actor performance is new work, not a feature supplied by this helper |
| Current renderer can draw the reused rig in this checkout | `pnpm -C terry-moves exec remotion still src/index.ts SilentScene out/conversation-preparation-baseline.png --frame=90` succeeded; inspected the PNG showing the Engineer and attached hand/wrench | New mouth quality remains slice 1's probe |
| Saved WAVs can be consumed and audiovisual exports produced locally | `ffprobe -v error -show_entries format=duration:stream=codec_name,sample_rate,channels -of json terry-moves/public/assets/ai-test-automation/cedar-take.wav` read PCM s16le, 24 kHz mono, 78.15 s. `pnpm -C terry-moves exec remotion render src/index.ts AITestAutomationFilm out/conversation-preparation-audio.mp4 --frames=90-119 --codec=h264 --pixel-format=yuv420p --concurrency=2` rendered 30 frames. `ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,sample_rate,channels:format=duration -of json terry-moves/out/conversation-preparation-audio.mp4` found H.264 1080×1350/30 fps and AAC 48 kHz stereo, duration 1.003 s. `ffmpeg -v info -i terry-moves/out/conversation-preparation-audio.mp4 -af volumedetect -vn -f null -` decoded 96,256 samples, mean −23.0 dB, peak −5.7 dB | Proves the existing local export path and non-silent audio, not dialogue synchronization or voice suitability |

The root bundle logged a pre-existing missing
`quillustration_flower_and_water-can/scene.bin` while both selected exports
completed; neither observed composition uses that unrelated 3D asset. Do not
repair it as part of this story or turn it into a missing dialogue prerequisite.

Python could locate the installed OpenAI SDK; existing production code and the
current official guide establish the intended request shape. No credentialed
request, new voice audition or played dialogue was observed. Those paid and
owner-judged premises are explicitly bounded by slice 1, whose failure stops
slices 2–3. All other promises are new behavior with owned implementation proof;
they are not described as already working.

## Plan review

No slice-plan refinement pass was needed: the pilot, finished scene and same-path
revision each have one visible outcome and proof loop. The common turn schedule
and independently sampled performance cues serve all three, without a separate
renderer per version or a framework for deferred styles. This review found no
remaining slice-boundary or proof-ownership concern. The paid/artistic early probe
is an explicit execution gate; readiness does not claim its result.
