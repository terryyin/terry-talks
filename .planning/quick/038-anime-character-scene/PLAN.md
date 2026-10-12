# Direct and revise an anime engineer's reaction

**Identity:** terry-moves-filmmaking#anime-character-scene
**Source:** [refined story](../../../terry-moves/seed.md#anime-character-scene)

## Goal and scope

Terry can make a watchable short scene with an original adult anime engineer,
then change a surprised listening reaction into a thoughtful one through the
script while preserving the character design and speech. Terry accepted the
authored 2D route and this scene on 2026-10-12. This is preparation for execution,
not authority to start implementation.

Use a waist-up composition: an off-screen colleague asks “Passing which tests?
Did we check what the customer actually needed?”, the engineer listens and
pauses, then replies “I checked the code I wrote. I didn't ask that.” Retain the
existing English WAVs and their synthetic-voice provenance. The two-turn pilot
offers an initial 10.6-second clock at 30 fps (0.5-second lead, 4.8-second
question, 1.2-second listening pause, 3.3-second reply, 0.8-second tail).
Pacing holds may be directed in the script; audio lengths come from saved takes.
A 1080-square production frame follows the existing dialogue convention.

Deliver the baseline film, meaningful reaction revision, editable direction,
retained artwork/rig and sound inputs, and preview/export/reproduction guidance.
Both versions need expressive, coordinated movement and stable appearance at
normal playback with sound, and deterministic frame sampling during seeking.

New spoken lines/voices, Live2D integration, performance-transfer services,
arbitrary rig support, full-body action, multi-shot continuity and a universal
character format are deferred promises, not product rejection rules. The current
3D story is independent. No product-wide actor-count limit follows from this cast.

## Current design decisions

- One script owns speech selection, pauses and acting cues; one compiled film
  clock drives sound, captions, pose and mouth. The character drawing consumes
  that performance. Do not add a second component-local choreography schedule.
- PFE found `illustratedConversation/script.ts` and `performance.ts` already own
  measured speech slots, take-bound mouth cues, silent pauses and frame-sampled
  gaze/tilt/hand targets. Reuse those responsibilities, exposing a coherent part
  if necessary. The existing `ai` reply slot can be cast as the visible human
  engineer; it does not require a robot drawing. Keep that mapping in the scene's
  cast rather than spreading renamed identities through unrelated films.
- The existing compiler interpolates numeric pose fields but switches `mood`
  discretely. It does not already supply smooth facial deformation. Slice 1 owns
  the selected rig's expression transitions and silhouette/gesture requirements.
  If this requires extending the shared sampled pose, preserve existing callers'
  appearance/defaults and exercise all conversation consumers. Do not duplicate
  the speech clock or generalize hypothetical future rigs to avoid that work.
- Start with locally authored vector layers and frame-derived deformation;
  the disposable probe established that this representation can consume the
  existing performance and sound. Retain whichever production art inputs the
  accepted sample actually uses. Routine renders consume local selected inputs.
- `beatTimeline.ts` is the existing ordered clock. `silentScene/compileScene.ts`
  solves travel/prop contact, not facial acting. `featureTeams/shot.ts` handles
  saved footage, not rig direction. `visualTreatments/versions.ts` demonstrates
  named baseline/revision preservation but its registry belongs to another film.
  None needs to become a prerequisite or universal registry for this scene.
- [ADR-0000 — Use Architectural Decision Records](../../../docs/adrs/0000-use-adrs-accepted.md)
  is the only current Accepted record (index/in-file status agree, no successor).
  It retains human ownership of durable decisions and specifies no rig or renderer.
  No conflict or additional North Star topic is needed for this local extension.

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

## Outside-in proof ownership

| Final promise | Owner and observable proof |
| --- | --- |
| Recognizable original anime design with expressive, smooth performance | 1: moving casting sample accepted by Terry; 2: full scene at normal speed with sound, including listening and handover. A still or numeric equality cannot accept acting. |
| Selected off-screen question, pause and visible reply form a usable film | 2: real registered preview and export; hear full saved speech, observe quiet mouth during listening/clause gaps, empty pause caption, readable staging and complete tail. |
| One script makes a meaningful surprised → thoughtful revision | 3: change only retained acting direction; actual revised pixels and playback differ coherently while design, takes, mouth timing and captions remain appropriate. |
| Direct, reverse and fresh entry show the same intended performance | 1 for sample; 2 for complete scene; 3 for revised joins. Compare real frame pixels with expected pose/mouth observations and a frozen-motion control. |
| Baseline and revised performance remain available and reproducible | 1 retains production art/inputs; 3 registers both named versions, rerenders from local inputs, checks pictures and audio, and documents authoring and preview/export commands. |
| Existing films keep their behavior | Every slice touching shared performance code owns the full conversation consumer suite and any additional consumers found by search. Reuse old baseline proof where unaffected. |

## Ordered slices

### 1. Cast the engineer through a moving performance sample
Type: Behavior
Status: planned
Proof: A registered sample of the actual original character listens briefly,
changes expression/pose and speaks the saved reply; direct/reverse/fresh entry
agrees. Terry can judge the design and acting in motion with sound.

Behavior: Given the selected original adult anime engineer direction and saved
reply → preview/export a small casting rehearsal → see a designed anime face,
coordinated gaze/head/hand movement and speech with usable expression transitions.

Own the new artwork/rig and the minimal shared-performance adaptation it needs.
Start with the retained reply plus a short directed silent lead; use the actual
audio/mouth track, not placeholder amplitude flapping. Establish separate facial
features and purposeful deformation/pose transitions sufficient for this scene.
Retain art source, selected recording references and provenance. A prototype
recoloring the old geometric actors does not satisfy this outcome.

Add focused script-to-render proof through the real registered composition.
Compare first, middle, speech-gap and fresh/reverse frames; verify motion and
expected mouth/face changes alongside equality. Exercise the full existing
conversation suite if its compiler/types/metadata are adapted. Use
`dough-manual-testing` during execution for the sample's Studio playback/seek
journey, then obtain Terry's assessment of the visible moving result.

This is the permitted early probe for the owner-held artistic premise. If the
sample is rejected, retain the result and feedback, stop slices 2–3, and revise
the design or return a route/scope change to refinement. Do not silently substitute
Live2D/generated footage or call the technical probe artistic acceptance.

Safe stop: a reusable, accepted moving character rehearsal. The full question
and listening arc are intentionally absent here and belong to slice 2.

### 2. Watch the complete question, listening pause and reply
Type: Behavior
Status: planned
Proof: The original film communicates surprise and reconsideration in the
complete scene at normal playback with sound, and its actual export matches
the directed timing and intended character on arbitrary frame entry.

Behavior: Given the accepted character sample → author the off-screen question,
surprised listening reaction, pause and visible reply in one script → preview
and export a watchable full scene with natural transitions and stable design.

Reuse the measured takes and cues; stage the speaker's gaze and gesture around
the off-screen colleague and allow a purposeful settle before/during the reply.
Fit captions and voice credits without obscuring acting. Clear captions and
rest the speech mouth in the listening pause; keep expressive acting alive there.
Use frame-derived motion including any secondary hair/clothing response, without
requiring a simulation whose output depends on visited frames.

Proof owns the complete audio/visual composition, not only compiler output:
play it at normal speed with sound, inspect starts/ends and expression/gesture
joins, and check backward seeks and a fresh mount during the handover. Confirm
the export contains full speech and correct duration, and the same sampled
poses as preview. Keep a visible motion assertion so identical frozen frames
cannot pass. Address stiffness, snapping, layer separation or mouth/voice drift
within this slice before claiming the original film accepted.

Safe stop: Terry has the complete original scene and its editable direction.
The delivered meaningful alternative performance remains owned by slice 3.

### 3. Revise surprise into thoughtfulness and reproduce both versions
Type: Behavior
Status: planned
Proof: Editing the named reaction in the script produces a coherent thoughtful
version with the same design and soundtrack; both registered versions reproduce
from saved inputs through documented commands.

Behavior: Given the original film → change its listening cues to a slower gaze
away, head inclination and considered hand gesture → obtain the revised acting
without changing the drawing's choreography, saved takes or mouth schedule.

Keep named baseline/revision scripts and compositions. Shape their entry/exit
poses so the revised reaction flows into the same reply; choose the revision's
affected interval from its actual cues instead of imposing the earlier film's
frame numbers. Both versions retain the chosen character appearance.

Compare complete normal-speed performances with sound. Check observable changed
acting within the directed interval, stable design and preserved intended poses
outside it, and direct/reverse/fresh sampling at revised transitions. Compare
decoded actual soundtrack PCM for equality, not only script references. Restore
the baseline selection and reproduce both exports using retained inputs with no
acquisition/generation step. Document the editable cues, retained input locations,
the exact preview/export commands and which performance each version selects.

Safe stop: the whole story is usable even if no other anime story is built.

## Verification, delivery and sizing

Execution follows the installed `dough-execute-plan` workflow, including its
independent post-change refactoring and commit/delivery gates. No numeric slice
budget or S/M/L definition is supplied; each Behavior has one bounded observable
outcome and its implementation, focused proof and cleanup stay together.

Use new focused anime composition/rig tests plus
`pnpm -C terry-moves test:unit --runInBand tests/illustratedConversation` for
changes reaching the shared performance boundary. The observed 24-test suite
is small enough to run whole. Run `pnpm -C terry-moves typecheck` when the shared
pose contract or root composition registration changes, since static consumers
cross the scene boundary; lint the affected files. Search and include additional
consumers if implementation changes their contracts. Do not rerender unrelated
films or run the Slidev/Python suites solely because this scene is added.

Use real rendering and the bounded manual journeys in the slices for artistic
and seeking claims. Automated checks protect timing, changed motion, continuity
and retained assets; they do not accept emotion. Record literal proof commands,
observations and Terry's artistic decisions during execution in this plan.

The sequence uses one performance/clock model and one retained character design.
It separates the early artistic risk, complete-scene behavior and meaningful
revision without adding a framework or an independent infrastructure outcome.
Slice-plan refinement was not needed: this review found no remaining concern
about slice boundaries, cumulative design, sizing or proof ownership. Artistic
acceptance is explicitly owned by the early sample and final playback, not
assumed from preparation's technical render.
