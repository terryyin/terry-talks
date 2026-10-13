# English Jidoka: clearer direction and narration

**Source:** Terry's 2026-10-13 instruction to improve the existing Jidoka film
using useful current Terry Moves features and generate accompanying English narration.
**Execution:** Caller-selected current branch `master`, in
`/Users/terryyin/git/terry-talks`, also the originating and integration checkout.
No new worktree or admission; earlier direct-main and commit/sync authority applies.
**Starting revision / published base:** `5971081485bfa7cff2aa2f1e83d62ffeeb6ec11b`.
**Authorized target:** `origin`, `refs/heads/master`.

## Goal and boundary

Deliver the improved English 1080-square, 30fps, 86-second MP4 with clear English
synthetic narration, mobile-readable subtitles, original paper/ink/red artwork,
Odd-e logo in the upper right and the exact closing credit “Idea and film from Terry”.
Keep the approved factual argument, nine scenes, captions, clock and source assets.
Only the English edition receives new direction and narration. Do not rerender or
repeat research for the approved Japanese, Traditional Chinese or Thai editions.
Keep the separately completed Just in time work and active portrait story intact.

## Existing solutions and preparation

Reuse `typographyFilm/direction.ts` for deterministic type reveal/settling and
`beatTimeline.ts` for staged removal, consumed by the existing Jidoka pictures.
Do not import the typography example's dark stage or the cinematic 3D stage.
The latter has no 2D painting-camera interface; adding one would expand this outcome.
Reuse `scripts/narration_audio.py` for PCM, token/script auditing and mastering,
and the established continuous Cedar/OpenAI speech pattern with retained take and
measured word boundaries. The existing performance producer has another film's
paths, acting direction and performance-led timing, so it cannot be used unchanged
for this film's approved motion-led 86-second clock.

Read-only preparation found that Simple checks first appears at 61s although its
caption starts at 56s. The current film already provides the stable outside-in
boundary: registered `TPSAndAIFilm` and its language editions. Locked offline
`pnpm install --frozen-lockfile --offline` succeeded in this exact checkout;
Remotion Studio built and the English composition loaded at localhost:3028.
The host's OpenAI SDK and configured speech credential are available. Existing
voice model `gpt-4o-mini-tts`, voice `cedar`, is reused; no cloning is involved.
No new factual claim is introduced, so approved primary-source research stands.
ADR-0000 is the only Accepted record; this feature-local revision conflicts with
none of its decision-ownership rules and requires no new architectural decision.

## Slice 1 — Watch and hear the improved English Jidoka film
Type: Behavior
Status: done
Proof: Play the real registered English film and export its complete MP4. The
exact existing narration text is present and each spoken clause fits its caption
window without clipping speech. At 56s known rules, simple checks and STOP arrive
together; clear evidence follows at 61s. Redundant parts disappear in sequence,
needed behavior and safeguards remain; the conclusion settles before the credit.

Generate one connected warm, clear, understated English performance, retaining
the take immediately and measuring its actual transcript/word timing. Fit clauses
at natural between-word gaps to the existing caption clock; preserve every spoken
word and reject overflow rather than truncating it. Keep music quieter under
speech and restore a gentle final musical hold. Ordinary reproduction uses saved
audio and alignment, never a new paid request. Add English-only audio wiring.

Use the existing type and beat samplers for three focused visual improvements in
Judgment, Minimalism and Freedom. Preserve all original paintings, required
subtitle geometry, entire stopped-loom hold, generic computer terminology and
exact credit. Localized pictures retain their approved paths and score-only audio.

Verify actual English composition audio wiring, caption/scene contract and seek
determinism through the affected `tests/tpsAndAi` suite, plus reached helper/other
consumers if their contracts change. Typecheck and selectively lint changed TS.
Audit measured narration against canonical text, window fit, duration, file hashes
and deterministic offline replay. Observe important transitions by direct seeks
and backward seeks in Studio; inspect encoded frames at 360px phone size and the
complete output at normal playback. Confirm square dimensions, fps, runtime,
audio stream and clean decoding with ffprobe/ffmpeg. Do not mistake transcript or
loudness measurements for a human listening review. Document synthetic voice,
retained take, reproducible command and practical validation limits in film brief.

Fresh independent post-change refactoring precedes commit. Root owns selective
staging, commit and managed delivery, then the planned product retrospective and
ordinary wrap-up of this contextual instruction. No unrelated changes are staged.

## Review

One cohesive Behavior slice owns all stated promises and a usable final film.
Separate voice and visual tasks support the same end-to-end evaluation. No
slice-boundary concern was found; slice-plan refinement was not needed. Natural
voice fit and artistic quality are execution observations, not asserted premises.

## Accepted proof

- Registered-film contract, editions and English direction: three Jest suites,
  49 tests passed. Typecheck and selective ESLint formatting/lint passed.
- Nine offline Python tests prove complete waveform placement with late ASR
  times, rejection of internal pauses, missing seams, overflow and changed words,
  silence-only tail correction, and preservation of accepted files on failure.
  Offline replay verifies all 19 slots and exact narration hash
  `8f91aa601978de10b4af2f9484b3e9b12a5f0a1e1c588faa2c80c88f5aca5dbe`.
- One Cedar voice take was retained. The selected measurement's extra tokens
  occupy digital silence; raw evidence and the correction remain in the record.
  Waveform review found clipped joins in the first export; quiet-gap cuts repaired
  them using the same take. The second export is accepted. Independent review
  added a clause-boundary guard; replay proved identical audio and slots, so no
  third render or new synthesis was needed.
- Studio direct and backward seeks showed checks/STOP at 56s, evidence at 61s,
  successive redundant-shell removal and the settled final title/whole painting.
  Normal unmuted Studio playback reached the end. Encoded frames at 360px show
  readable captions, the original art, upper-right logo and exact final credit.
  The actual MP4 also played at normal speed in QuickTime, unmuted at volume 1,
  and reached its 01:26 end. Playback state is observable; subjective listening
  quality remains Terry's review.
- English render command succeeded. `ffprobe` confirms H.264/yuv420p/bt709,
  1080×1080, 30fps and stereo 48kHz AAC; container duration is 86.016 seconds.
  Full ffmpeg decode reports no errors. Encoded mix measures −18.77 LUFS and
  −3.93 dBTP. These measurements do not establish human listening preference.
- Source and delivery English SRT are byte-identical. Other language exports
  were not repeated. No JIT-owned changes were staged.
- Delivery MP4: `terry-moves/out/tps-and-ai-jidoka.mp4`, SHA256
  `79d555f18d6a50d9147db07d82b99f4374c23817ea60cfd73119f2c696eb0c56`.
  Frame-zero poster: `terry-moves/out/tps-and-ai-jidoka-poster.png`.
- Fresh independent post-change refactoring and boundary correction completed;
  no remaining blocking finding. Story-obligations slice check passes (0 entries).

## Observation ownership

Coordinator `jidoka-english-20261013`; Codex stream cell 53, session 71949,
PID 99832, directory `/tmp/dough-ci-501/watch-FRw5nB`, bound to this default
checkout and `terryyin/terry-talks`, target `master`.
Concurrent Just in time work was committed and published by its owner while
this revision was prepared. Before our commit, `origin/master` is verified at
`3ffe9f7fb5a35f77ada16e639033edf64835c38f`; this is the increment's publication
base. The original starting revision remains the intent/attribution baseline.

## Execution complete

Product advice: no change. The independent product review found no required
correction, architecture drift or test consolidation; English-only improvements
support current filmmaking direction. The saved narration and film-specific
caption policy reuse shared primitives coherently. Process review was skipped.
Artistic satisfaction and subjective voice quality remain Terry's review.

Implementation `f012c0ce4d1f3bbfcbca0cdee5ddab27e1278915` was accepted on
`origin/master`. Its CI run 38348566485 was cancelled before jobs started when
the newer unrelated preparation revision `beadbbb303c608fa9604a218684d93c05dc0dcd6`
started run 38348585099 under the workflow's cancel-in-progress concurrency rule.
This is evidenced supersession, not passing validation. The final applicable
revision will be registered on this coordinator's retained observer.
