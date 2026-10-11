# Terry replaces one narration performance without repairing unrelated scenes

Source: [story](../../../terry-moves/seed.md#replace-narration-performance).
Identity: `terry-moves-filmmaking#replace-narration-performance`

## Goal and scope

Terry names a region of the AI test automation workshop's script (one clause or
a run of consecutive clauses), requests candidate Cedar takes of exactly those
words, auditions each candidate in the context of the retained narration, and
selects one. The producer composes the retained take with the selected take at
the natural gaps, re-derives the measured timeline, and regenerates subtitles,
score, effects, mix and treatment, while the retained take, every unrelated
scene's internal timing, and every scene component stay as approved. Offline
reproduction keeps verifying every saved take by hash and needs no API.

- Included: region naming by scene and clause; candidate request with the
  film's direction and an optional delivery note, only on an explicit flag;
  prompt-free measurement and exact-script audit of each candidate; audition
  files in the ignored work directory, including an in-context version;
  explicit selection by candidate name; composition at the gap midpoints with
  sample-identical retained audio and one mastering pass; timeline derivation
  (region cues from the candidate, later clauses shifted, earlier clauses
  untouched, frame-aligned caption boundaries); sound-effect cues that follow
  the measured script; a performance manifest naming the base take and each
  region take with hashes and measurements; offline reproduction and
  tamper detection; a second region and re-replacement; refusal of a
  mismatched candidate and of a selection beyond the 85 s ceiling; treatment
  and README runtime truth; render through the existing command.
- Deferred, not rejected: motion-led recorded-voice films (Story Impact);
  changing a region's words; the other Cedar films' producers; music, effects
  or whole-film take replacement (the existing `--new-take` stays as it is);
  Terry's recordings as region takes; cross-film reuse; automatic candidate
  choice; a Studio audition control.
- Assumptions: first film is the workshop under its performance-led clock;
  the example region is "It's a compromise." through "not more test code to
  maintain." (`investigate` clauses 4–6, 49.96–55.38 s of speech); Terry
  chooses the real region and winning candidate at audition.
- Key examples: story examples 1–6; proof ownership is mapped below.

## Execution context and decisions

- **Preparation:** established Story Branch preparation, agent Sola-chan,
  assignment published at `91023db195c481bf0b740bf51bd0e182b698d405`;
  workspace
  `/Users/terryyin/git/terry-talks/.worktrees/i-can-replace-one-narration-performance-without`,
  branch `claude/i-can-replace-one-narration-performance-without`, remote
  `origin`, target `master`, integration checkout
  `/Users/terryyin/git/terry-talks`. Execution identity, claim, and increment
  revisions are recorded here once execution starts.
- **Checkout setup:** `nix develop -c sh -c 'pnpm install --frozen-lockfile'`
  passed in this workspace (2026-10-11). The audio producers run with the
  system `python3` (3.9.6) and `ffmpeg` 7.1.1 from Homebrew; the `openai`
  Python package (1.99.9) is in that interpreter's user site, so run the
  producers with plain `python3`, not `python3 -I`. An OpenAI key is present
  in the shell environment of this machine; never print or record it.
- **CI:** no `.github/workflows` and no `.planning/open-dough.json`; push CI
  observation is unavailable. Local planned proof is required.
- **Plan location:** `.planning/quick/`; 030 was the highest allocated entry
  in history, so this plan is 031. Slice statuses: planned, in-progress, done.
- **No ADR or North Star applies.** Only ADR-0000 (use ADRs) exists. The
  seed's Architecture section records the design: a composition of saved
  takes, one derived clock, seams at gap midpoints, composition in the shared
  helper.
- **Verification gate:** `terry-moves/package.json` `test` is jest, eslint
  and tsc. From `terry-moves/`:
  `nix develop -c sh -c 'NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js tests/aiTestAutomation'`
  for the focused suite and `nix develop -c sh -c 'NODE_ENV=test pnpm test'`
  for the gate. Python proof is `python3 -m unittest discover -s scripts -p 'test_*.py'`
  from the repository root (new in slice 3; the project has no Python test
  convention yet, so the tests sit beside the shared helper they prove).
  Offline reproduction is `python3 'AI Test Automation/produce_audio.py'`
  from the repository root, then `git status --short` to show tracked assets
  unchanged. The gate runs at slice 3 (a shared helper and a test-consumed
  record change) and slice 5 (story complete).
- **PFE (existing solutions):** extend `AI Test Automation/produce_audio.py`,
  `cedar_narration.py` and `workshop_soundtrack.py`. `performance()` already
  owns the paid request, boundary trim, prompt-free Whisper measurement,
  exact audit, hashes and the evidence record; the region request reuses the
  same client calls with the region text, and `align()` is reused unchanged
  on composed words. `scripts/narration_audio.py` (`tokens`, `exact_script`,
  `master`, `read_pcm`, `write_pcm`, `write_performance`, `write_script`) is
  the shared home and gains composition. `treatment()` already regenerates
  the treatment from the script. `build_score` and the duck already follow
  scene starts, caption speech ends and actual narration PCM; `build_effects`
  is the only builder with typed absolute times and is modularized in slice
  2. `scripts/film-subtitles.mjs` is unchanged. No existing code composes
  takes or records more than one take: that is the new responsibility.
- **Region naming (decision):** `<sceneId>:<first>-<last>` with 1-based
  clause positions, or `<sceneId>:<n>` for one clause; the example is
  `investigate:4-6`. Unknown scene or clause is reported with the scene's
  clause count.
- **Candidate request (decision):** the request text is the retained clause
  before the region, the region, and the retained clause after it (only the
  sides that exist), performed with the film's `DIRECTION` plus the note.
  The whole requested text is audited exactly against the script, measured
  prompt-free with word timestamps, and boundary-trimmed like the base take.
  The region's span inside the candidate is located by token counts, as
  `align()` locates captions. Candidates are
  `terry-moves/out/ai-test-automation-audio/auditions/<region>/candidate-N.wav`
  with `candidate-N.json` (request text, note, model, voice, direction,
  measurement, hash) and `candidate-N-in-context.wav` (the composed
  narration from the preceding retained clause through the following one).
- **Seams (decision):** in the base take the region span is `[a, b]`, where
  `a` is the midpoint of the gap between the preceding word's end and the
  region's first word start and `b` the midpoint of the gap after its last
  word (the film's caption boundaries, unrounded). The candidate's span
  `[a', b']` is defined the same way from its own measurement. Composed audio
  is `base[:a] + candidate[a':b'] + base[b:]` with a 5 ms linear crossfade at
  each seam; region words are the candidate's words in `[a', b']` offset by
  `a − a'`; later words shift by `(b' − a') − (b − a)`; earlier words are
  untouched. Composition is mastered once, as today.
- **Manifest (decision):** `cedar-performance.json` keeps its existing
  top-level fields describing the base take (`takeSha256`, `transcript`,
  `unpromptedTranscript`, direction and model), with `words` becoming the
  composed timeline words and `preparedSha256` the hash of the composed
  prepared audio, so `align()` and `tests/aiTestAutomation/film.spec.tsx`
  keep consuming them. It adds `regions`: one entry per replaced region with
  its id, words, note, request text, model, voice, direction, candidate
  measurement (relative words), the saved take's path under
  `terry-moves/public/assets/ai-test-automation/regions/` and its SHA-256.
  Offline reproduction verifies the base take, every region take and the
  composed prepared audio against the record and names the first file that
  differs. A later `--new-take` replaces the base take and clears `regions`,
  since the whole script is re-measured.
- **Refusals (decision):** a mismatched candidate is reported at audition
  with the differing tokens and is not written as selectable; `--select` of
  a candidate whose audit failed, or whose composition would exceed the 85 s
  ceiling (lead + composed speech + 2.0 s tail, as `align()` computes), is
  reported with the would-be duration and writes nothing. Messages are
  plain sentences on stderr with a non-zero exit.
- **Execution (2026-10-11):** established start, claim published at
  `f6eb4d6f35eb8bc82693b25ee82af757ab65395c` on `master`, starting revision
  `6d2681a127080ed3217b281d24710f161653c716`; increments publish to
  `refs/heads/claude/i-can-replace-one-narration-performance-without`.
- **Paid request held (decision):** the coordinator makes no paid request
  without Terry's agreement in the conversation. Slices are proved offline
  with fixture candidates; the real audition is obligation G1.
- **Excerpt direction (decision, slice 1):** the film's `DIRECTION` tells the
  actor to start with the opening question and speak the final seven words,
  so a candidate request sends `DIRECTION`, then a two-line `EXCERPT`
  instruction to speak only the user script, then the delivery note. The
  exact string is recorded in each candidate JSON. Revisit with the request
  shape if the first real candidates speak more than the excerpt.
- **Region code home (slice 1):** `AI Test Automation/cedar_regions.py` holds
  region naming, spans, splice, the candidate request and the audition;
  `cedar_narration.py` keeps the base take (`speak`, `prepare`, `measure`,
  `performance`, `align`). Slice 3 moves composition from `cedar_regions.py`
  to the shared helper. The in-context file is unmastered, cut at gap
  midpoints; `--candidates 0` re-processes saved candidates with no API; a
  candidate also keeps `candidate-N-prepared.wav`.
- **Manifest shape (slice 3):** shared `scripts/narration_audio.py` owns
  `compose(base, words, regions, sample_rate)`, `read_manifest`, `verify`,
  `compose_manifest` and `write_performance`. A region entry must carry
  `take` (repository-relative path), `takeSha256`, `firstToken`,
  `tokenCount`, `takeFirstToken` and the candidate's relative `words`; the
  other decided fields (id, note, request text, model, voice, direction) are
  free. `words` is the composed timeline, so a record with regions also
  keeps `baseWords`, the base take's own measurement; slice 4's writer adds
  it on the first selection. Regions apply in list order. With no regions
  `preparedSha256` is the trimmed base file's hash; with regions it is the
  composed file's. Any `ValueError` in the producer is a one-sentence stderr
  stop with exit 1.
- **Selection (slice 4):** `--select <region> <candidate>` checks everything
  before writing, then writes the region take as
  `regions/<scene>-<first>[-<last>]-<first 12 hex of its SHA-256>.wav`, the
  record and the script, and continues as the ordinary reproduction. A
  region entry carries `id`, `spoken`, `candidate`, `note`, `requestText`,
  `model`, `voice`, `direction`, `alignmentModel`, `transcript`,
  `transcriptSource`, `take`, `takeSha256`, `firstToken`, `tokenCount`,
  `takeFirstToken` and `words`. Selecting a region that overlaps a different
  replaced region is refused ("select that region again"); the story does
  not describe overlap. An audition after a selection is heard against the
  current composition. `LEAD`, `TAIL`, `CEILING` and `film_frames` in
  `cedar_narration.py` are the one length rule for `align()` and `select()`.
- **Interim behavior:** after slice 1 candidates can be auditioned but not
  selected; slice 4 adds selection. After slice 3 the manifest exists with
  an empty `regions` list.

## Baseline and proof ownership

Observed in this workspace on 2026-10-11, before any product change:

| Premise | Consuming operation | Observation | Result |
| --- | --- | --- | --- |
| Offline reproduction is deterministic and needs no API | `python3 'AI Test Automation/produce_audio.py'` | Ran in 19 s, printed the ten scene spans and `Complete: 79.933s / 2398 frames`; `git status --short` showed only `terry-moves/seed.md` modified, so `narration.wav`, `score.wav`, `effects.wav`, `mix.wav` and `film-treatment.md` were reproduced byte-identically | Settled |
| The workshop's choreography, captions, subtitles and tests follow the measured script without edits | jest `tests/aiTestAutomation` | Scratch edit of `film-script.json` shifting every time from 55.38 s onward by 0.9 s (27 frames) and `durationInFrames` by 27 with `duration = durationInFrames / 30`: 2 suites, 10 tests passed with no test edit; restored with `git checkout`, SHA-256 `897125052253bc53ed87fe4cd3467777c4b21dbd8965833eb393603b299c80b1` after restore. (A first attempt with `duration += 0.9` failed only the exact `durationInFrames / FPS === duration` assertion through floating error, a scratch artifact.) | Settled: the acting and film contracts derive from cues |
| Score and duck follow measurement | `build_score` | Chords are bounded by scene starts, melody notes by caption `speechEnd`, the duck by RMS of the actual `narration.wav`, the hush by `stopFix`/`sandbox` starts (read, `workshop_soundtrack.py` 81–146) | Settled by code reading; slice 2's byte-identical regeneration and the shifted-cue observation cover it |
| Effects do not follow measurement | `build_effects` | 26 cues typed as absolute seconds (`workshop_soundtrack.py` 151–177), placed by `round(start * SAMPLE_RATE)` | Settled false for the story's promise: slice 2 re-expresses them |
| The gate runs green here | `pnpm test` | `nix develop -c sh -c 'NODE_ENV=test pnpm test'`: 58 suites, 605 tests passed at planning (59 suites, 657 tests after the story branch took master's later work), no lint or tsc diagnostics, 58 s | Settled |
| The paid candidate route is available | `--audition` request and Whisper measurement | `python3 -c "import openai"` succeeds (1.99.9); key present in the environment. The request itself is paid and owner-held; it is slice 1's probe | Open until slice 1; cheap prefix observed |

Promise ownership: region naming, candidate request, audit, work-directory
isolation, in-context audition (1); effects follow the measured script (2);
manifest, hashes, offline reproduction, consumer compatibility (3);
composition, timeline derivation, downstream regeneration, refusals, tamper
detection, second region and re-replacement, treatment truth (4); the real
replacement, README runtime, render, whole gate (5). Story examples: 1 → 1,
4 and 5; 2 → 3 and 4; 3 → 1; 4 → 3 and 4; 5 → 1 and 4; 6 → 4. Terry's
judgment of expressiveness and of the seam is a human evaluation in slices 1
and 5.

Consumers of changed surfaces: `cedar-performance.json` is read by
`film.spec.tsx` (`transcript`, `unpromptedTranscript`, `words`,
`takeSha256`) and `cedar_narration.py`; `film-script.json` by `film.ts`, both
workshop specs, `film-subtitles.mjs`, `workshop_soundtrack.py` and
`treatment()`; `scripts/narration_audio.py` by the workshop, Problem
Decomposition and Problem Decomposition Remake producers (slice 3 runs those
two offline and expects `git status` unchanged); `effects.wav` and `mix.wav`
by `AITestAutomationFilm.tsx`.

## Ordered slices

### 1. Terry auditions candidate takes for one region in context
Type: Behavior
Status: done
Accepted proof (offline, 2026-10-11): `--audition investigate:9` and
`--audition nowhere:1` refuse as decided (exit 1, one sentence); with an
identity fixture and a 0.5 s-silence fixture cut from the base take,
`--audition investigate:4-6 --candidates 0` writes in-context files of
12.11 s and 12.61 s, the identity one sample-identical to the base span
47.36–59.47 s and the other that span plus exactly 0.5 s with retained audio
identical; a transcript edited to "belief" is refused naming `- relief`,
`+ belief` and its in-context file is absent; a stub SDK run showed the
request parameters and record fields; offline reproduction unchanged
(`Complete: 79.933s / 2398 frames`), jest `tests/aiTestAutomation` green.
The paid request and Terry's listening are obligation G1.
Proof: `python3 'AI Test Automation/produce_audio.py' --audition investigate:4-6 --note "more weight on relief" --candidates 3`
(paid, run once with Terry's agreement) writes three `candidate-N.wav`,
`candidate-N.json` with an exact audit that passed and measured words, and
`candidate-N-in-context.wav` under the auditions directory; the in-context
file's duration equals the retained span from the preceding clause's start
to the following clause's end plus the candidate's region delta; `git status
--short` shows no tracked change; an unknown region such as `investigate:9`
and a candidate audit failure (simulated by editing a candidate JSON's
transcript in the work directory) are reported as decided. Terry listens to
the in-context files and says whether at least one seam and delivery are
acceptable; if none is, the request shape (context clauses, note) is the
first thing to revisit before slice 4.

Behavior: the workshop producer accepts `--audition <region> [--note …]
[--candidates N]`, requests each candidate as decided, measures and audits
it, locates the region span, and writes the audition files. The base take,
script and record are untouched.

### 2. Sound effects follow the measured script
Type: Structure
Status: done
Accepted proof (2026-10-11): `effect_cues(script)` in
`workshop_soundtrack.py` resolves all 26 cues from scene, clause, a spoken
word or caption bound, and an offset; the offline producer reproduced
`effects.wav`, `mix.wav` and `sound-cues.json` byte-identically; against the
0.9 s scratch-shifted script cues 1–18 did not move and cues 19–26 moved by
exactly 0.9 s (43,200 samples); script restored to SHA-256 `8971…80b1`; jest
`tests/aiTestAutomation` green.
Proof: `python3 'AI Test Automation/produce_audio.py'` reproduces
`effects.wav` and `mix.wav` byte-identically (`git status --short` clean for
assets) and `sound-cues.json` lists the same 26 times; with the slice-2
scratch-shifted script (the baseline's 0.9 s shift, applied temporarily)
every cue from the region onward moves by 0.9 s and earlier cues do not,
then the script is restored and its SHA-256 verified.

Internal change: each effect cue is expressed as a scene and word cue (or
caption speech bound) plus an offset, resolved from the script at build
time, replacing the absolute literals. Enables slice 4, where the
regenerated effects must land on the shifted actions.

### 3. The performance record is a manifest of saved takes
Type: Structure
Status: done
Accepted proof (2026-10-11): `python3 -m unittest discover -s scripts -p 'test_*.py'`
10 tests (identical region, longer and shorter candidate, regions in order,
differing tokens refused, crossfade on differing audio, manifest round trip
and changed-byte stop naming the file); the offline workshop producer
reproduced every asset byte-identically with `"regions": []` the only record
change; a flipped byte in `cedar-take.wav` stopped the producer naming it;
both Problem Decomposition producers ran offline with `git status`
unchanged; the identity audition still gives +0.00 s; jest
`tests/aiTestAutomation` green; gate `pnpm test` 59 suites, 657 tests.
Proof: new `scripts/test_narration_audio.py` (unittest, synthetic PCM
fixtures) observing: composing with an identical region returns
sample-identical PCM and identical words; a region whose candidate is 0.5 s
longer shifts every later word by 0.5 s, leaves earlier words and the gap
halves unchanged, and offsets the region's words; a shorter candidate shifts
later words earlier; a candidate with different tokens is refused naming the
differing tokens. `python3 'AI Test Automation/produce_audio.py'` with the
rewritten record (empty `regions`) reproduces all assets byte-identically;
the Problem Decomposition and Remake producers run offline with `git status`
unchanged; jest `tests/aiTestAutomation` green; whole gate `pnpm test`.

Internal change: `scripts/narration_audio.py` gains composition of a base
take and region takes into prepared PCM and composed words, and a manifest
reader/writer that verifies every listed hash; `cedar_narration.py`
`performance()` builds the prepared audio through it. External behavior and
every asset are unchanged. Enables slice 4.

### 4. Terry selects a candidate and the film follows it without repair
Type: Behavior
Status: done
Accepted proof (offline fixtures, 2026-10-11; approved state restored and
`film-script.json` back at SHA-256 `8971…80b1`): `--select investigate:4-6
candidate-fixture` (0.5 s inserted after "compromise") gave 80.433 s / 2413
frames; clauses before the region identical, "It's a compromise." keeps its
speech bounds, every later clause +0.5 s with speech length, word spacing
and gaps kept (1e-9 s), bounds frame-aligned; composed audio sample-identical
outside the region; record lists
`regions/investigate-4-6-<12 hex>.wav` with its hash; cue 17 stays at
50.225 s, cue 18 moves 51.97 → 52.47 s, cues 19–26 +0.5 s; treatment states
the base take plus the region and 83.43 s; jest `tests/aiTestAutomation`
green with no test edit; a second no-flag run byte-identical; a flipped byte
in the region take stops the producer naming it; a 6 s fixture is refused at
85.93 s, an edited transcript, unknown candidate and unknown region are
refused, all with tracked files unchanged; `stopFix:1-2` selected second
lists both (80.833 s / 2425 frames) and re-selecting `investigate:4-6`
replaces only its entry and removes its old take (80.633 s / 2419 frames);
unittest 13 tests.
Proof: an offline fixture candidate made with ffmpeg from the base take's own
region span with 0.5 s of silence inserted after "It's a compromise." and a
measurement JSON derived from the base words (no API) placed in the auditions
directory; `python3 'AI Test Automation/produce_audio.py' --select investigate:4-6 candidate-fixture`
then: `git diff` of `film-script.json` touches only the region's cues and
times from the region onward, every later clause's `speechEnd − speechStart`
and gap unchanged, caption boundaries frame-aligned, `durationInFrames`
2413; `cedar-performance.json` lists the region take with its hash; the
region take exists under the assets regions directory; jest
`tests/aiTestAutomation` green with no test edit; `sound-cues.json` cues
after the region 0.5 s later; running the producer again with no flags
reproduces everything byte-identically; flipping one byte of a copy of the
region take makes the producer stop naming it before writing; a fixture
candidate with 6 s inserted is refused with the ceiling message and leaves
tracked files unchanged; selecting a second fixture region (`stopFix:1-2`)
keeps the first and lists both, and re-selecting `investigate:4-6` replaces
only that entry; the regenerated treatment describes the base take plus
replaced regions. Finally restore the approved state with `git checkout` of
the tracked files, remove the fixture region takes, and verify the SHA-256
of `film-script.json` and the assets match the baseline.

Behavior: `--select <region> <candidate>` composes, derives the timeline
through `align()`, writes the manifest, script and region take, regenerates
score, effects, mix and treatment, and refuses as decided; the treatment
text states the composition truthfully.

### 5. Terry's chosen take is in the rendered workshop
Type: Behavior
Status: done
Progress (2026-10-11): with Terry's agreement the paid audition ran once:
`--audition investigate:4-6 --note "more weight on relief" --candidates 3`
wrote `candidate-1`, `-2`, `-3` (wav, json, prepared, in-context) in the
ignored auditions directory. All three passed the exact audit; regions are
6.36 s (+0.35 s), 5.80 s (−0.21 s) and 6.77 s (+0.76 s) against the base
take's 6.01 s, in context 12.46 s, 11.90 s and 12.87 s (the retained
12.11 s span plus each delta); `git status --short` showed no tracked
change. The excerpt direction held: each candidate spoke only the requested
text. Waiting for Terry to listen and name a candidate (or ask for more);
then `--select`, render, README and the gate. The whole gate was green
after slice 4 (59 suites, 657 tests).
Accepted proof (2026-10-11): Terry listened and chose `candidate-1`.
`--select investigate:4-6 candidate-1` gave 80.267 s / 2408 frames; every
clause before "It's a compromise." keeps its speech bounds, word cues and
audio (the clause just before it changes caption one frame later, at the new
gap midpoint; every earlier clause is identical), the three region clauses carry
the candidate's cues, every later clause +0.35 s with speech length, word
spacing and gaps kept, bounds frame-aligned; composed audio sample-identical
to the base take before 49.6175 s and after 55.632 s (the seams less the
crossfade half); the record lists
`regions/investigate-4-6-d73e44c04926.wav`; a no-flag run reproduced script,
record, treatment, stems, mix and region take byte-identically;
`pnpm -C terry-moves render:ai-test-automation` produced the MP4 (ffprobe
83.285 s for 83.267 s of film, the container's audio padding), the poster
and an SRT whose diff is 13 timing lines with no word changed; README and
treatment both state 83.27 s / 80.27 s and the replaced region; no scene
component, test or subtitle script was edited; gate `pnpm test` 59 suites,
657 tests; unittest 13 tests. Terry's listening to the rendered film remains
his evaluation.
Proof: Terry selects a candidate from slice 1 (or requests more) and the
producer applies it; `pnpm -C terry-moves render:ai-test-automation`
produces `out/ai-test-automation.mp4` whose `ffprobe` duration is the new
workshop length plus 3 s, the poster, and the SRT with the same words at the
new times; `AI Test Automation/README.md` runtime figures and the take
description match the treatment; `git status --short` lists only the
intended files; whole gate `pnpm test`. Terry's listening to the rendered
film is the human evaluation.

Behavior: the approved workshop carries Terry's selected delivery for the
region; the README states the new runtime and that the narration is a base
take with the named region replaced. If Terry accepts no candidate, the
mechanism is delivered by slice 4 and the story's observable outcome waits
on a further audition; report that plainly rather than selecting for him.

## Execution complete

Product advice: Reasoned no-change to backlog order. One agreed paid audition
produced three audited candidates (−0.21 s to +0.76 s), and Terry's chosen
take carried through script, subtitles, score, effects, mix and treatment
with no edit to any scene component or test, so the measured clock supports
contained narration revision as the story hypothesised; Terry's listening to
the rendered film remains his evaluation. The retrospective planned one
unqueued correction (`terry-moves-filmmaking#narration-region-across-scenes`,
plan 032, recorded not-ready): a region cannot yet cross a scene boundary
although the story defines it so, and the region commands lack repeatable
proof. Record at wrap-up that the retained clause before a region keeps its
speech and cues but its caption change follows the new gap (one frame here),
that the README runtime and region sentence are hand-synced, and that
`--audition` usage and its paid default live only in the producer docstring.
Restoring a region to the base take, changing a replaced region's bounds, and
carrying the path to the other Cedar films are hypotheses to raise only if
Terry asks; no evidence supports queuing them now.

## Story obligations

### G1. The real candidate request is unobserved
Reported: slice 1 — "The paid request is unobserved."
Story clause: "the producer asks the film's voice (Cedar) for one connected take of the region's words"
Disposition: proved by slice 5: the agreed paid audition wrote three audited candidates and Terry selected `candidate-1` (slice 5 accepted proof)

### G2. A new whole take leaves replaced region take files behind
Reported: slice 4 — "`--new-take` leaves orphans."
Story clause: "the existing whole-take request stays as it is"
Disposition: excluded "the existing whole-take request stays as it is"

## Current decisions

- A region is one or more consecutive clauses named by scene and position;
  the same words are performed.
- Only the region (with its neighbouring clauses as context) is ever
  requested; the base take is never re-requested except by `--new-take`,
  which clears regions.
- Seams at gap midpoints with 5 ms crossfades; sample-identical retained
  audio; one mastering pass; no stretch, no inserted silence.
- Composition and the manifest live in the shared helper; the workshop's
  lead, ceiling and direction stay in its producer.
- Effect cues are resolved from the measured script, never typed as seconds.
- Selection is Terry's explicit choice; refusals write nothing.

## Learnings

- Run jest and the gate in the nix dev shell with `NODE_ENV=test`; run the
  audio producers with the system `python3` so the `openai` user-site package
  is visible, and never with `-I`.
- The base take's boundary trim is not idempotent at the take's own edges:
  re-trimming a fixture cut at the film's start or end loses about 10 ms.
  Keep slice 4's fixture regions interior (`investigate:4-6`, `stopFix:1-2`).
- The seam-to-seam span of `investigate:4-6` is 6.01 s (49.62–55.63 s of the
  prepared take); the 5.42 s in the assumptions is speech only.
- Offline proof helpers used in slice 1 are outside the repository in
  `/tmp/audition-proof/` and are disposable; slice 3's unittest replaces them.
- Effect cues are placed to the millisecond (`round(bound + offset, 3)`), so
  after a real shift a later cue is within 0.5 ms of its anchor. A word
  anchor missing from `wordCues` raises instead of falling back as `film.ts`
  `cue()` does. Cues 17 and 18 sit inside `investigate:4-6` and follow the
  candidate's own caption start and speech start; slice 4 observes that.
- Push CI is confirmed unobserved: the observer reports no `ci.yml` workflow.
- `scripts/narration_audio.py` is 230 lines; slice 4 additions there may
  need a split. `Problem Decomposition Remake/produce_audio.py` keeps its
  own identical `sha256(path)`; left alone as another film's producer.
- Restore an applied fixture selection from saved baseline bytes, then
  remove `regions/` and the auditions directory and run the producer; no
  path checkout is needed. Fixtures built after a selection cut from
  `cedar-prepared.wav` with `baseWords`.
- Fixture candidates are the base take's own audio, so a seam between
  genuinely different takes is proved only by the unit crossfade test until
  a real candidate is selected (G1).
- `scripts/narration_audio.py` (247 lines) and its test file (248) have no
  headroom under the 250-line limit.
- The render logs a 404 for `quillustration_flower_and_water-can/scene.bin`,
  an asset of another composition; the workshop render completes and is not
  affected.
