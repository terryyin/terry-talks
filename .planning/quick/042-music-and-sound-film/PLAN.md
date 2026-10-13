# Finding a Shared Rhythm

**Identity:** terry-moves-filmmaking#music-and-sound-film
**Source:** [refined story](../../../terry-moves/seed.md#music-and-sound-film)
**Preparation workspace:** `/Users/terryyin/git/terry-talks/.worktrees/i-can-make-a-film-whose-rhythm-follows-music-and`
**Observed source revision:** `046d0ad96a4d0f422025f1c3364b327cb0877fe3`

## Goal and scope

Deliver **Finding a Shared Rhythm**: roughly 36 seconds, 1080×1080 at 30 fps,
original locally authored percussion/plucked-tone score, no speech. Scattered
pulses answer one another, form an ensemble, pause and resolve with distinct
motifs. Musical phrases and accents direct motion, emphasis and cuts. Deliver
baseline and meaningful cue revision, saved media, separate exports, credits
and script-based authoring guidance. Terry delegated creative selection on
2026-10-13; no approval of an unseen film is claimed.

The refined source owns scope and examples. Automatic analysis, arbitrary track
replacement/tempo warping, external services, narration, new character/3D assets,
visual editing, other formats and upload remain deferred. This plan proves a
cue revision; it adds no phrase-replacement promise.

## Execution context

- Established execution: `terry-moves-filmmaking#music-and-sound-film`, publisher
  `dashboard-territory.local-terry-talks`, agent `Koharu-chan`, Story Branch Mode.
- Owned execution checkout: the preparation workspace named above; branch
  `codex/i-can-make-a-film-whose-rhythm-follows-music-and`. Reused linked worktree.
  Base `6fd95c4659804a05217ae68aa4375ee1b787083e`; published Take
  `84e12d19125b0b03f1262403eaa29e83615f6c44` on `origin/master` and the execution branch.
- Integration/default checkout: `/Users/terryyin/git/terry-talks`; execution
  increments target `origin/refs/heads/codex/i-can-make-a-film-whose-rhythm-follows-music-and`.
  Trunk integration remains story wrap-up's responsibility.
- Setup: `pnpm install --frozen-lockfile --offline` and
  `pnpm -C terry-moves typecheck` passed in this checkout on 2026-10-13.
  Package/lock files unchanged. No active Git hooks; selective formatting uses
  ESLint `--fix` on affected source files, followed by focused check-only lint.
- Replanning is allowed within the original scope.
- Studio: `http://localhost:3000`, command session `49424`, opened in Chrome.
- CI: GitHub Actions `terryyin/terry-talks`, workflow `ci.yml` (ID `381584897`,
  name `CI`), observing the execution branch. Codex coordinator `koharu-music`,
  directory `/tmp/dough-ci-501/watch-NVwGUY`, PID `3970`, session `29306`,
  yielded cell `2`. Resumed after confirmed shutdown of the prior observer; claim CI unobserved.

## Current decisions and reuse

- One film-local direction owns phrases and named accents. Derive sound events
  and visual targets from it; quantize consistently at 30 fps within one frame.
  Anticipation may start earlier; impact targets the cue. Derive duration with
  a deliberate tail. Start at 100 BPM: half a beat is nine frames. Move one
  isolated cue within its phrase, leaving other cues and boundaries intact.
- PFE retained: `beatTimeline.ts` supplies sequential passage ranges after
  musical timing; `TPSAndAIFilm.tsx` supplies saved `Audio` playback and the
  existing export path. Jidoka's score generator demonstrates local synthesis,
  but its arrangement/scene clock remains unchanged. Reuse suitable primitives
  only if simpler; create no synthesizer framework or product-wide timing rule.
- Reuse typography's retained baseline/revision selection pattern with one
  renderer, without its reading-time policy. Shapes are performers, phrases
  passages, accents action targets, rests held space. Playback owns aesthetics.
- Save new audio explicitly. Keep baseline source/media byte-for-byte, baseline
  and revision audio paths distinct, with a cue/source fingerprint that rejects
  stale direction/score selection and names the take/regeneration command.
  Preview/export reads saved media. Input hashes and baseline replay own
  preservation proof; existing revision helpers are optional.
- [Accepted ADR-0000](../../../docs/adrs/0000-use-adrs-accepted.md) is the sole
  Accepted record; index agrees. Human ownership of durable decisions remains.
  No conflict, exception, ADR proposal or North Star topic is needed here.

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
Status: done
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

## Accepted slice 1 proof

- Registered `SharedRhythmExcerpt`: 288 frames (9.6 seconds), 1080×1080 at
  30 fps. `script.ts` stages coral disc/drum, teal bar/pluck and amber ring/bell.
  `rhythmTimeline` feeds both synthesis and picture. `matchingRhythmScore`
  rejects stale direction/source/FPS selections at the component and export
  metadata boundaries; ordinary preview/export only reads saved audio.
- `pnpm -C terry-moves test:unit --runInBand tests/musicAndSound`
  passed all six tests; `pnpm -C terry-moves typecheck` passed. Inspected tests
  mount the real Root registration, cue compiler, score guard and SVG renderer;
  only Remotion transport/registration/playback is substituted. The scratch
  passage test proves picture vocabulary, not a newly saved score.
- Rendered `terry-moves/out/shared-rhythm-excerpt.mp4`, H.264/yuv420p/BT.709,
  1080×1080 at 30 fps with AAC, 9.6 seconds. Decoded cue PNGs and PCM are under
  the same ignored directory. `inspect-shared-rhythm-excerpt.py` observes
  sound onsets at frames 18/72/144/252 within 0.005 of a frame, silent rest
  interior, pulse squash at 18, answering cut at 72 and third motif at 144.
- Chrome Studio: normal-speed playback ran at approximately 29.8 fps. Direct
  frame 72 shows `answer-enters`, `translate(730 570) scale(1.2 0.84)`; all
  three performers hold at frame 230. Backward seek 230→72 reproduces exact
  transforms and impact marker. Encoded frame 72 visually agrees with Studio.
- Encoded MP4 played to its ending, unmuted at 1×, at 360×360 and 1080×1080
  in the temporary local review page `http://127.0.0.1:8767/shared-rhythm-review.html`
  (server session `64302`). Shapes and title remain readable. These are picture
  and playback-state observations; no listening verdict is claimed.
- Independent refactor completed; only exact-silence assertions were consolidated.
  All six tests passed again. Production, saved media and render proof unchanged.
- Recovered the missing formatting receipt by running the same selective ESLint
  preparation to terminal exit 0; check-only lint and `git diff --check` passed.
- Terry accepted the excerpt with “LGTM” and “SGTM” on 2026-10-13; G2 resolved.

## Story obligations

### G1. Excerpt is intentionally incomplete
Reported: slice 1 — "The current SharedRhythmExcerpt is an intentionally incomplete 9.6-second study for the full film."
Story clause: "Deliver a watchable H.264 MP4 with the score, a complete ending and appropriate authorship/source credits."
Disposition: receiving slice 2

### G2. Actual listening observation accepted
Reported: slice 1 — "Sound-feel acceptance remains the pending boundary; no listening verdict is claimed."
Story clause: "Judge the whole edit by normal-speed playback with sound"
Disposition: proved by slice 1: Terry’s “LGTM” and “SGTM” responses, recorded in Accepted slice 1 proof

### G3. Scratch passage has only renderer-level evidence
Reported: slice 1 — "The scratch-added passage test proves actual renderer vocabulary/metadata only and claims no saved revised sound."
Story clause: "Given the documented phrase/action vocabulary, author another passage or revise a motif through that home"
Disposition: receiving slice 3

## Verification and delivery

Use installed `dough-execute-plan`, independent post-change refactoring,
`dough-manual-testing` and Remotion guidance. No numeric slice limit is supplied.
New capability tests exercise actual direction→composition wiring, score pairing
and take selection. Scratch-disable cue consumption to confirm revision proof
fails. Assertions supplement real playback; never infer listening from metrics.
Run `pnpm -C terry-moves test:unit --runInBand tests/musicAndSound` and
`pnpm -C terry-moves typecheck`; coordinator formats/lints affected paths.
Render selected compositions via the documented Remotion command with
`--codec=h264 --pixel-format=yuv420p --color-space=bt709` under ignored `out/`.
Trace and verify consumers if shared timing/synthesis changes; unchanged films
need no new render or repository-wide suite.

## Preparation evidence and learnings

The complete literal preparation commands/assertions remain in the committed
plan at `6fd95c4659804a05217ae68aa4375ee1b787083e` (recover with `git show
6fd95c4659804a05217ae68aa4375ee1b787083e:.planning/quick/042-music-and-sound-film/PLAN.md`).
Observed in this checkout on 2026-10-13 at the source revision above:

- Real `beatTimeline` observation moved the second beat 30→45 and duration
  90→105 frames; captions remained empty.
- Existing local synthesis wrote an 86-second mono s16le/44100 Hz WAV outside
  the checkout. Existing scored-composition render encoded 360×360/30 fps
  H.264 + AAC, 1.003 seconds; decoded audio peak −16.3 dB. This proves route
  availability, not the new cues or musical quality. No product/media changed.

## Plan review

Three Behavior slices own excerpt, complete baseline and retained cue revision.
Each promise has an owner; slice 2 replaces the excerpt limitation. Preparation found no remaining slice concern.
Canonical readiness remains its original record; execution proof updates do not renew it.
