# Illustrated conversation: speaking, listening, and revising a reaction

**Identity:** terry-moves-filmmaking#illustrated-conversation
**Source:** [selected story](../../../terry-moves/seed.md#illustrated-conversation).
**Authority:** Terry accepted the recommended scene and limited-animation route and requested slice planning on 2026-10-12. Execution is authorized by the current dough-execute-plan invocation and established start.

## Goal and scope

Terry can make a watchable English exchange between the existing Engineer and AI, then revise the AI's listening reaction through the same script. Deliver a new square 1080×1080, 30 fps film, roughly 20–30 seconds, with saved speech, speech-shaped mouths, gaze, expression, intentional gestures and pauses, and clear changes of speaker. The duration is a creative target, not a rejection rule. The first film and its revised performance remain available for comparison.

Working dialogue, to polish during the pilot without changing the selected idea:

| Turn | Speaker | Line and intention |
| --- | --- | --- |
| passed | AI | “All tests passed. I think we're ready to ship.” — pleased confidence |
| question | Engineer | “Passing which tests? Did we check what the customer actually needed?” — curious, not scolding |
| reconsider | AI | After a visible listening pause: “I checked the code I wrote. I didn't ask that.” — recognition |
| next | Engineer | “Then let's start there.” — invitation |

The chosen revision changes the AI's response during `question` from quick surprise to slower thoughtfulness, then returns to the same settled pose before `reconsider`. Speech assets, captions and turn boundaries stay fixed. Changing spoken words is not required for this proof. The model must not reject a valid script merely because its turn count differs from this example.

Deferred: a new rig, anime/3D styles, automatic acting inference, a visual editor, automatic lip-sync tooling, music-led timing, translated editions, and SRT export. No queued story is a prerequisite. Preserve existing films and the solved arm behavior. Do not change shared product architecture for hypothetical later rigs.

## Current design and reuse decisions

- **One performance model.** The script owns named turns, speaker/take references, deliberate pauses, and
  directed pose cues for either actor. Compose turn timing once; audio, mouth cues, captions and acting consume
  it. Reaction cues use offsets from named turns and are evaluated on film time, so changing speaker does not
  reset the listener. The director authors intention; the renderer does not infer it from text. Use the smallest
  channels these examples need.
- **Existing drawings.** Extend `terry-moves/src/aiTestAutomation/actors.tsx` with optional timed speech-mouth
  input while preserving the existing mood-based mouth when that input is absent. Speech shape and mood cannot
  both draw competing mouths. Gaze, blink, head/body tilt and articulated hand targets already belong to these
  rigs; reuse `motion.ts` for their interpolation. Keep a single representation of the drawings, including if a
  small extraction becomes necessary. Do not duplicate an Engineer or rewrite its limbs.
- **Timing.** Reuse `terry-moves/src/beatTimeline.ts` for ordered frame ranges. It samples one beat at a time
  and does not itself carry actor state: the conversation's frame sampler owns sustained poses and cues across
  boundaries. Measure each saved take, use whole-frame slots that contain its full audio, and add authored
  pauses. Never shorten a take to fit an estimate. Mouth cue time is local to the actual take; resting in
  silence is distinct from a mood. An empty caption in a pause must be explicit because the shared timeline
  otherwise carries the previous caption forward. No shared timing rewrite is needed for this design.
- **Saved speech.** Start with `gpt-4o-mini-tts`, Cedar for the Engineer and Marin for the AI, as casting
  candidates. Follow the repository's saved-WAV production pattern, with direction, source text, measured
  duration and take hash retained. The current [official speech
  guide](https://developers.openai.com/api/docs/guides/text-to-speech) documents these voices, direction and WAV
  output (checked 2026-10-12). The credentialed request and artistic suitability are the early probe below, not
  facts established by documentation. Credit synthetic voices. Replays/renders use saved assets and make no
  speech requests.
- **Mouth cues.** Author a small editable cue track against the selected recording; supply the mouth drawings
  those sounds need. Use closed/rest, open and rounded shapes as the minimum artistic vocabulary rather than
  amplitude-only flapping. Add distinctions when the pilot needs them. Rhubarb is optional future assistance; no
  installed binary or recognition quality is assumed. Replacing a take requires remeasuring and reviewing its
  cues, not reusing stale timing.
- **Reuse boundaries.** `scripts/narration_audio.py` has PCM, measurement and hash-verification primitives; use
  a primitive if needed, not its narrator's same-words region-splice model. The subtitle-led `models/Script.ts`
  is not the clock for this scene's silence. `visualTreatments` demonstrates named versions and frame-sampled
  acting; reuse that pattern without its shop-specific poses. The existing compare tool observes picture/audio
  but does not know this new turn schedule; it cannot replace the dialogue boundary checks below.
- **Ownership.** Keep the new scene's script, sampler and composition together under a capability-named
  `terry-moves/src/illustratedConversation/`, with focused tests under the corresponding `tests/` directory and
  retained runtime assets under `public/assets/illustrated-conversation/`. Register the composition in the
  existing root. Add the authoring/export recipe to `terry-moves/README.md`. These are working locations, not a
  prohibition on coherent supporting changes.

[ADR-0000 — Use Architectural Decision Records](../../../docs/adrs/0000-use-adrs-accepted.md) is the only Accepted record in the index and agrees with its in-file status. It preserves human ownership of durable decisions; none selects a rig or conflicts with this local extension. No North Star file or new ADR is warranted.

## Outside-in proof ownership

| Final promise | Owning slice | Observable proof |
| --- | --- | --- |
| Saved speech and mouth timing read as speaking, with a responsive listener | 1 | Play the two-turn pilot with sound; inspect rendered mouth shapes at speech/rest boundaries and compare direct/reverse frame samples |
| Pauses, gestures and changes of speaker communicate the selected idea | 2 | Play the complete export at normal speed; observe the AI reconsidering during silence and continuing into its reply |
| Script drives the scene, including silent reactions and captions | 2 | The public composition consumes the authored script; change its pause in a test and observe audio start, pose and captions moving together |
| A reaction can be revised without bespoke scene code or changed speech/timing | 3 | Change only the authored reaction; before/after exports show the intended difference; turn/caption records and rendered audio samples agree |
| Existing rig users remain usable | 1 | Capture omitted-mouth-input behavior before editing, then exercise the existing acting, silent-scene and visual-treatment consumers after the extension |
| Film and revision replay from saved inputs | 3 | Run the documented export from retained assets without a speech request; inspect the resulting picture, audio and duration |

Tests must assert the drawn result, selected source and observable schedule, not only an internal `speaking`
flag or fixture that precomputes the expected acting. Automated checks establish timing/continuity, not Terry's
artistic acceptance.

## Ordered slices

### 1. Watch the question and reply with convincing mouth timing
Type: Behavior
Status: done
Proof: The Engineer's `question`, the listening pause and the AI's `reconsider` play as a small voiced pilot;
both characters are recognizable, speech mouths follow their takes, and the listening response is readable.

Behavior: Given the selected cast and two lines → direct and play them through the new script → Terry sees one
character speak while the other reacts, a meaningful silent pause, and a clear handover of speech.

- **Early probe, before expansion:** audition one short saved take per character using the existing
  speech-production route, then pair them with the smallest real rig/mouth/acting implementation needed to play
  this pilot. Obtain Terry's sound-on judgment of voice distinction, lip timing and the listening pause. Record
  the chosen takes, direction, cue corrections and judgment. No paid request is made during planning; execution
  must have applicable generation authority and credentials. If unavailable, retain the pilot and name the exact
  missing input. If acting is unconvincing, revise this bounded pilot. A need for a different rig, style or
  scene returns to Terry before dependent slices.
- Implement the minimal common script-to-performance path, optional mouth input, measured saved takes, timed
  mouth drawings, a pause, gaze and one reaction. Author mouth cues against the audio, including internal gaps.
  Preserve the rig's old default paths. Missing/changed audio or out-of-take mouth cues must identify the turn
  and required correction before producing a misleading export; these checks serve the selected-take/timing
  contract, not arbitrary cast limits.
- Use the real registered composition for the pilot. Add focused tests that render speech and rest frames,
  sample the same frame after forward/reverse access, and demonstrate that muting a mouth change makes the mouth
  proof fail. Before altering the shared rig, capture its existing omitted-input mouths and expressions across
  the moods this work touches. Run the affected consumer suites, not just the new scene's tests.
- Safe stop: a replayable two-turn pilot with retained takes, no changes to the approved films. This is
  intentionally an incomplete film; slice 2 supplies the setup and resolution. Do not claim the whole story
  complete here.

### 2. Watch the complete exchange and understand the pause
Type: Behavior
Status: done
Proof: A complete exported scene communicates confidence → question → reconsideration → invitation at normal
speed with sound.

Behavior: Given the accepted pilot → add `passed` and `next` through the same script and export → the four turns
form one watchable scene with consistent staging, intentional listening and no cut-off speech or pose reset at a
turn.

- Produce and retain the remaining takes; compose the complete scene from the same turn rule, using measured
  duration rather than estimated reading speed. Stage both faces at a readable size. Add anticipation, a modest
  speaking gesture, listening gaze/expression and settling only where they clarify the exchange. Captions follow
  the shared turn schedule and do not obscure faces.
- Prove one sustained listening cue across the question/pause/reply boundary through the real scene sampler and
  rendered elements. Change an authored pause in a test: later audio/captions must move by that amount while
  each take's local mouth timing stays fixed. Observe first/last speech samples and silence, and mount directly
  at a middle frame as well as seeking backward.
- Export `IllustratedConversation` to a saved H.264/AAC MP4 using the repository's Remotion render path; provide
  a capability-named render command. Inspect the streams/duration and play the whole artifact, not only a
  contact sheet. Terry judges whether the listening pause changes how the answer is understood.
- Safe stop: a finished first conversation exists and is reproducible. The meaningful revision remains owed by
  slice 3; save this version and its export as the comparison baseline before changing the performance.

### 3. Revise the AI's listening through the same script
Type: Behavior
Status: done
Proof: The second export visibly changes the listening performance while its speech, captions and turn timing
remain the first version's; the renderer is unchanged by the demonstrated edit.

Behavior: Given the first film → change only the AI's reaction during `question` from quick surprise to slower
thoughtfulness → review both exports and see the new response, returning to the original settled pose before the
next line.

- Keep a named baseline and revision of the authored script. Adjust gaze, expression, tilt or hand gesture in
  the reaction interval; all already use the same authored cue vocabulary. If the edit needs new scene branches,
  fix that authoring gap within this slice rather than presenting it as a reusable path.
- Compare the actual drawn pose/markup over every frame outside the authored reaction interval, and observe
  visible differences within it. Compare the compiled turn starts, durations, captions and chosen takes across
  versions. Export mixed WAV audio for both through Remotion and compare decoded PCM samples, rather than
  relying only on identical source filenames or lossy MP4 hashes. Verify the two MP4s at normal speed with
  sound. These complementary checks own the film's timing and audio promises without extending the generic
  comparison tool's timeline registry.
- Demonstrate the documented script edit and render recipe. Explain how a turn references its saved take and
  local mouth cues, how to direct either character, how to author silence, and how to review a take change. Run
  the saved-asset export without calling speech generation. Retain source assets, the first/revised scripts and
  their production credits; keep rendered output in the existing ignored export area.
- Safe stop: Terry has the watchable exchange, an observed meaningful revision and a usable authoring/export
  path even if every later style story is dropped.

## Verification and delivery gates

Use the installed Dough execution workflow when execution is separately authorized. Its proof acceptance,
independent post-change refactoring, agent commit and delivery/CI ownership apply to each slice; this plan
changes none of them. Do not publish a deliberate failing test or claim a pilot as final proof. No project
numeric slice target or S/M/L definition was supplied: each slice is bounded by one visible result, with the
pilot isolating the paid/artistic risk.

New checks belong at `tests/illustratedConversation/` and run with `pnpm -C terry-moves test:unit --runInBand
tests/illustratedConversation`. When the shared rigs change, run the whole affected surfaces with `pnpm -C
terry-moves test:unit --runInBand tests/aiTestAutomation tests/silentScene tests/visualTreatments`. Run `pnpm -C
terry-moves typecheck` and lint the changed TS/TSX because the new rig input and composition cross typed
consumers. Run Python tests only if shared Python audio helpers change. Broader CI checks are not invented local
gates for this preparation or for unchanged Slidev content.

At execution's visual/audio acceptance points use `dough-manual-testing`, as this plan explicitly requires
playback/seek observation. Inspect actual exports and retain the setup, commands, observations and Terry's
artistic feedback in this plan. A missing human listening judgment remains unproved, even with green timing
tests. Reuse accepted evidence only while its boundary is unchanged.

## Execution resume context — 2026-10-12

- Identity: `terry-moves-filmmaking#illustrated-conversation`; publisher `dashboard-territory.local-terry-talks`; agent `Julia-chan`.
- Owned workspace: `/Users/terryyin/git/terry-talks/.worktrees/i-can-make-an-illustrated-conversation-with-conv`; branch `codex/i-can-make-an-illustrated-conversation-with-conv`. No integration checkout supplied.
- Starting revision `7948f80f0fe036ec1d207084a3449ac67e7df36a`; established Take / first increment base `bad136dd9c5ed47a56a4ce63c5ee8dbb31cd093a`.
- Story Branch Mode: ordinary authorized publication: remote `origin`, branch `refs/heads/codex/i-can-make-an-illustrated-conversation-with-conv`; eventual trunk `origin/master`. Execution does not integrate or retire the workspace.
- Setup: `pnpm install --frozen-lockfile` succeeded, unchanged lockfile; `pnpm -C terry-moves test:unit --runInBand tests/aiTestAutomation/acting.spec.tsx` passed 1 suite / 7 tests. Studio: `http://localhost:3000`.
- No numeric slice budget or active commit hook/hook path. Preserve planning authority; selectively format/check owned changed TS/TSX with existing ESLint.
- CI setup: GitHub Actions `ci.yml`, verified workflow ID `381584897`, display `CI`, repository `terryyin/terry-talks`; Codex observer covers this execution branch, not the earlier trunk Take. Exact live observer identity stays in the conversation.
- Resumed Codex observer: coordinator `illustrated-conversation-julia`, directory `/tmp/dough-ci-501/watch-juhWNY`, PID `39065`, stream session `51636`, yielded cell `4`; bound to this workspace and authorized execution branch.
- Manual observation budget: approximately ten minutes after export; inspect streams, sound-on normal playback, speech/rest and listener handover seeks, and surprises. Terry's listening judgment gates dependent expansion.

## Historical preparation evidence

See [preparation observations](OBSERVATIONS.md) for the pre-implementation revision, probes, limits and plan review.

## Slice 1 technical proof and review boundary — 2026-10-12

Terry accepted the exported pilot with “LGTM” on 2026-10-12, resolving its sound-on review gate. Independent `dough-post-change-refactor` completed with documentation extraction only. Selective ESLint formatting/checking and `git diff --check` passed; no executable boundary changed during refactoring or formatting. Its unchanged recorded proof is accepted for delivery; no speech regeneration or baseline rerender is needed.

Slice 1 delivered as `4eebdac7548d010145853906912aaa857083e34c` to `origin/refs/heads/codex/i-can-make-an-illustrated-conversation-with-conv`, suffix base `bad136dd9c5ed47a56a4ce63c5ee8dbb31cd093a`; managed delivery accepted and registered it on the resumed observer. Slice 2 reuses the accepted cast, recordings, local mouth timing and 1.2-second question/reply pause; its new opening and invitation receive their own proof.

- `pnpm -C terry-moves test:unit --runInBand tests/illustratedConversation` passed 1 suite / 9 tests. Inspected `tests/illustratedConversation/pilot.spec.tsx`: actual SVG mouth geometry/rest, pre-edit omitted-input markup hashes, rendered listener hands and direct/reverse sampling, composition audio/captions, selected WAV headers/hashes, and registered metadata using a changed script. Setup uses retained WAVs/script and mocked Remotion frame/config/media wrappers; actor drawing and compilation remain real.
- `pnpm -C terry-moves test:unit --runInBand tests/illustratedConversation tests/aiTestAutomation tests/silentScene tests/visualTreatments` passed 13 suites / 151 tests. All named affected rig consumers ran; `pnpm -C terry-moves typecheck` passed. Temporarily forcing the new Mouth to rest failed the actual SVG open-mouth assertion (1 failed / 8 passed); restored the attempt's original bytes and reran the combined passing command.
- `pnpm -C terry-moves render:illustrated-conversation:pilot` succeeded without speech generation. `ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,sample_rate,channels:format=duration -of json terry-moves/out/illustrated-conversation-pilot.mp4` observed H.264 1080×1080 / 30 fps, AAC 48 kHz stereo, 10.603 s. `ffmpeg -hide_banner -i terry-moves/out/illustrated-conversation-pilot.mp4 -af silencedetect=noise=-35dB:d=0.09 -vn -f null -` decoded the complete audio and observed the listening silence at 4.745–6.502 s.
- Manual setup: Studio `http://localhost:3000/IllustratedConversationPilot` and the exported MP4 in QuickTime, volume 1 / unmuted / normal playback through its end. Studio frames 30, 174 and 216 and exported frames 27, 175 and 216 show Engineer speech with resting AI, empty pause caption with concerned AI/hand near face, then rounded AI speech with resting Engineer. Corrected AI arm clearance was observed. This establishes playback/seek and drawing observations, not Terry's voice/lip-fit/acting judgment.
- Cedar question (4.8 s) and Marin reply (3.3 s) were generated once each; direction/text/model/hash/PCM measurements remain in `takes.json`. The generation script rewrote only unknown-length WAV headers from complete received PCM. No speech/transcription requests occur during replay. No shared Python helper changed.
- The prior CI observer `illustrated-conversation-julia`, `/tmp/dough-ci-501/watch-r3LNqI`, PID `96419`, stream `52450`, cell `9` stopped at the review gate with no unread events and confirmed process exit. On accepted-pilot resume, reuse matching proof and rearm observation for delivery. Locked dependencies are unchanged; `pnpm -C terry-moves exec remotion --version` succeeds in this checkout.

## Slice 2 full exchange proof — 2026-10-12

The 582-frame / 19.4-second baseline is `terry-moves/out/illustrated-conversation.mp4`; `passed` (Marin, 2.8 s) and `next` (Cedar, 1.7 s) join the accepted pilot's byte-identical recordings and local mouths. Reuse Terry's pilot acceptance for its unchanged question/reply pause, without claiming new artistic judgment of the expanded film. Studio normal playback, invitation frame 499 and reverse seek to pause 316 show fitted captions, resting listener and sustained reconsideration; actual MP4 played in QuickTime at normal speed. Slice 2 delivered as `31db27cc2d27b577064fd3cc4038402b60c387ca` on the authorized execution branch, suffix base `4eebdac7548d010145853906912aaa857083e34c`, accepted and registered on the same observer.
- `pnpm -C terry-moves test:unit --runInBand tests/illustratedConversation` passed 2 suites / 15 tests after independent refactoring; `pnpm -C terry-moves typecheck` passed. Inspected `fullExchange.spec.tsx`: actual registered component audio/caption/drawn mouths at four measured slots, empty caption/rest during silence, real drawn hands across boundaries/direct-reverse seeking, and all later local mouth samples unchanged after an authored pause shifts audio/captions/pose. Mocked frame/config/media wrappers supply timing preconditions only. Both metadata callbacks invoke shared validation against default/explicit scripts and saved bytes. The refactor removed repeated metadata and extended the pilot's anchor in place, preserving picture/audio. Selective ESLint format/check and whitespace check passed.
- `pnpm -C terry-moves render:illustrated-conversation` succeeded without generation; `ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,sample_rate,channels:format=duration -of json terry-moves/out/illustrated-conversation.mp4` observed H.264 1080×1080 / 30 fps, AAC 48 kHz stereo, 19.413 s. `ffmpeg -v error -i terry-moves/out/illustrated-conversation.mp4 -f null -` decoded all streams. The retained first/last voiced 100 ms check (`python3 /tmp/illustrated-conversation-slice2-audio-check.py`, after decoding mono PCM with ffmpeg) compares all four source recordings with decoded AAC: correlations 0.999532–0.999979; five authored silence interiors have RMS 0.0000.
- `pnpm -C terry-moves exec tsx out/illustrated-conversation-slice2-anchor-check.tsx` proved all 582 real SVG frames and media schedules unchanged after making the question's settled cue explicitly complete. Common question start/end anchors now bound slice 3's reaction edit; an Engineer reply-start anchor preserves held listening when a pause is edited. No shared rig/Python helper changed, so earlier consumer proof remains valid. The first MP4 stays the revision baseline.

## Slice 3 reaction revision proof — 2026-10-12

`thoughtfulConversationScript` changes only the AI's interior `question` cues; the renderer/compiler/rig and saved inputs are unchanged. The baseline and `out/illustrated-conversation-thoughtful.mp4` remain available with the same 582 frames, captions and speech. Independent refactoring preserved the three authored composition nodes and reflowed the implicated README only; selective ESLint format/check and whitespace checks passed.
- `pnpm -C terry-moves test:unit --runInBand tests/illustratedConversation` passed 3 suites / 19 tests; `pnpm -C terry-moves typecheck` passed. Inspected `reactionRevision.spec.tsx`: complete actual component markup matches over all 582 frames outside `[156,299)`; Engineer/captions match inside; surprise eye geometry and articulated hand differ at 190, all take/turn/mouth/caption records agree, frame 299 exactly matches and direct/reverse frame 240 is deterministic. Real saved script/rig/compiler supplies behavior; mocked Remotion frame/config/media wrappers supply timing only. `fullExchange.spec.tsx` exercises every version's actual metadata callback/default/explicit source bytes.
- `pnpm -C terry-moves render:illustrated-conversation:thoughtful` succeeded without speech requests; ffprobe observed H.264 1080×1080 / 30 fps / 19.400 s and AAC 48 kHz stereo / 19.413 s; `ffmpeg -v error -i terry-moves/out/illustrated-conversation-thoughtful.mp4 -f null -` decoded the whole export. Mixed WAV commands `pnpm -C terry-moves exec remotion render src/index.ts IllustratedConversation out/illustrated-conversation-baseline-mix.wav --codec=wav --concurrency=2` and `pnpm -C terry-moves exec remotion render src/index.ts IllustratedConversationThoughtful out/illustrated-conversation-thoughtful-mix.wav --codec=wav --concurrency=2` completed. Python `wave`/`array('h')` decoded both actual mixes and asserted identical layouts and every sample: 48 kHz stereo PCM16, 931,200 sample frames / 1,862,400 samples, zero differences. Float64 ffmpeg decoding independently agreed.
- Manual observation: actual export pair `out/illustrated-conversation-reaction-comparison.png`, rows 190/240/275, baseline left/revision right, shows shorter surprise eyes and slower thoughtful tilt/hand movement with unchanged Engineer/captions. Studio revision frame 190 and actual revised MP4 in QuickTime at normal speed, unmuted volume 1, through elapsed 19 s / terminal play-off confirm playback. Baseline normal playback was observed in slice 2. Guides document the concrete cue edit, either actor's direction, silence, saved-only exports, mixed-audio review and replacement-take measurement/hash/cue reauthoring. No additional artistic approval is claimed beyond Terry's accepted pilot and requested revision direction.

## Story obligations

### G1. Pilot sound-on judgment
Reported: slice 1 — "Terry must hear the actual pilot and assess voice distinction, spoken wording, convincing mouth fit and the listening pause."
Story clause: "Terry judges the acting and usefulness of the authoring path."
Disposition: proved by slice 1: Terry's 2026-10-12 “LGTM” response to the exported pilot's sound-on review request.

### G2. Complete exchange after accepted pilot
Reported: slice 1 — "The complete exchange is not produced; slices 2–3 remain untouched."
Story clause: "The delivery is a watchable exported exchange and a demonstrated revision using that same path"
Disposition: proved by slice 2: fullExchange.spec.tsx, decoded speech/silence checks, full exported MP4 and coordinator's normal playback/seek observations.

### G3. Meaningful reaction revision after first film
Reported: slice 1 — "The reaction revision is not produced; slices 2–3 remain untouched."
Story clause: "a second export shows that change while using the same selected speech and turn timing."
Disposition: proved by slice 3: reactionRevision.spec.tsx all-frame drawings/schedule equality, actual decoded Remotion PCM equality, exported frame comparison and normal-speed playback of both MP4s.
