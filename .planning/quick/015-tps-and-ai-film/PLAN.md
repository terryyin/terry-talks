# A square English film of Freedom and Trust

Source: [refined story](../../../TPS%20and%20AI/film-seed.md#english-square-film).
Identity: `tps-and-ai-film#english-square-film`

## Goal and scope

Terry can share a complete film of around 90 seconds, including its ending and
credits, with developers and product people watching on a phone. The film
expresses the talk's argument: preserve learning in the product, free people to
learn and deliver real value, and trust a capable team with the next real problem.
AI makes the choice urgent because it can accelerate learning or unfinished work.

Use the current deck and its notes as argument authority; use the main-theme
document and claims to explain the reasoning rather than inherit their old slide
order. Preserve the distinction between Toyota's TPS account and Terry's
research-informed software synthesis. Confirm any additional factual claim
against a primary source and retain the link beside the script's claim.

Deliver one English-only square MP4 with embedded English subtitles, a matching
SRT, editable authoring inputs, retained local assets, a source-linked brief and
credits, and preview/export instructions in the existing Terry Moves workflow.
Use the deck's warm paper `#ece6dc`, black/gray ink, restrained vermilion
`#b33a2b`, generous space, and crane motif. Pictures must show change and consequence, with a
clear opening and ending; exact wording, shots, and audio remain production
choices. Default to 1080 × 1080 at 30 fps and adjust duration for comfortable
reading rather than padding or rushing to exactly 90 seconds.
Use an initial editorial budget of about 170–190 caption words; observed reading
comfort decides the final wording. Motion must explain causality beyond a
succession of pans and zooms over slides. The coordinator performs the artistic
and fidelity reviews and continues revisions under Terry's delegated authority;
no further approval from Terry is required before the completed film is delivered.

Exclude Japanese translation, external publication, a complete talk recording,
an exhaustive TPS lesson, a new authoring engine or style system, multiple
treatments, and a required narration provider. Audio can support the picture;
the essential argument must remain complete with sound off. Reuse source art
where suitable; new generated media is not a prerequisite.

## Preparation and execution context

- Reuse the established preparation workspace
  `/Users/terryyin/git/terry-talks/.worktrees/tps-and-ai-film-refinement`, branch
  `codex/tps-and-ai-film-refinement`, and Hitomi-chan's Preparing assignment.
  Integration checkout: `/Users/terryyin/git/terry-talks`. Do not announce
  another assignment. The coordinator owns Take, delivery, and disposition,
  including selecting the later execution checkout through the existing workflow.
- This delegated task is planning only. Leave the prior refinement and this
  plan uncommitted for the coordinator. The user's instruction to continue
  automatically authorizes the coordinator's finished-film work; readiness
  records remain evidence, rather than execution authority.
- `.planning/quick/` is the canonical plan root. The highest allocated entry
  was 014; 015 was checked free immediately before writing. Slice statuses
  are `planned`, `in-progress`, and `done`. No numeric slice target or hard
  limit is supplied; each boundary below owns one coherent outcome and proof
  loop, including implementation and cleanup.
- The coordinator must complete checkout-bound execution setup before render
  work: use Node >=24.9.0 and pnpm 11.28.5, install the locked workspace
  dependencies if absent, then run the actual composition entry point and
  one still export. Supported Node v24.19.0 was observed at
  `/Users/terryyin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node`.
  Prefix tool commands with that directory on PATH; the default shell's
  v24.5.0 does not meet the engine. No dependency installation, composition
  run, or render success is claimed by this plan. Setup failure stops
  dependent production until the coordinator resolves it.
- Execute and deliver using the installed `dough-execute-plan` contract,
  including independent post-change refactoring, focused proof, formatting
  affected files, and `git diff --check`. Use the existing ESLint directly
  for changed source files rather than formatting unrelated films.
  Registration/type changes require `pnpm --dir terry-moves exec tsc --noEmit`
  because Root loads the distributed compositions. No blanket full suite or
  Slidev build gate is introduced. No hosted CI workflow/adapter was found;
  report that coverage limit rather than inventing a CI task.

## Existing solutions and current decisions

Execution started on 2026-10-08 under the user's instruction to coordinate and
continue automatically through a good, accurate, attention-grabbing film.
The refined preparation was accepted on `origin/master` at
`cc215566f1cbcd98f61afd8fdfff32adb255cd56` and its workspace retired.
Execution owns `/Users/terryyin/git/terry-talks/.worktrees/tps-and-ai-film`,
branch `codex/tps-and-ai-film`, Story Branch Mode, publisher
`tps-and-ai-film-01a11b61`, starting at that preparation SHA. Its Take was
accepted on `origin/master` at `d62e3aeddce4bc22a8c3145c1cf34bc7f3408711`;
Hibiki-chan is the workspace author. Delivery targets
`origin/refs/heads/codex/tps-and-ai-film`, followed by coordinator story wrap-up
onto `origin/master`. Main's existing untracked `output/` is preserved; refresh
is deferred. Replanning remains authorized within this film's scope.

Checkout setup used bundled Node v24.19.0 with pnpm 11.28.5:
`PATH=/Users/terryyin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm install --frozen-lockfile --offline`.
It installed successfully without lockfile changes. The same PATH prefix ran
`pnpm --dir terry-moves compositions` and
`pnpm --dir terry-moves exec remotion still src/index.ts SilentScene /private/tmp/tps-film-runtime-smoke.png --frame=0`;
both exited 0, and the still exists. An unrelated older composition's ignored
quillustration asset emits a 404 during Root loading; it does not block these
observations and is outside this film's changes.
No `.github` push workflow or configured CI adapter exists in this checkout.
Hosted CI observation is unavailable; local focused and render proof remains
owned. Do not invent a workflow or observer to claim coverage.

PFE inspected whole-product film registrations, timelines, captions, export
scripts, tests, film guides, and the deck's artwork and notes.

| Existing solution | Reuse/change decision |
| --- | --- |
| `terry-moves/src/Root.tsx`, `src/index.ts`, `scripts/moves.mjs` | Add one film registration and use native Studio/still/render. No parallel player or renderer. |
| `Problem Decomposition/film-script.json`, `src/problemDecomposition/film.ts`, `Scene.tsx` | Reuse the pattern of one timed editable script driving scene and caption selection. Keep the TPS film's meaning and choreography in its own small module. |
| `src/beatTimeline.ts` | Available if beats aid authoring; its pose/caption boundary behavior was observed with a local read-only run. Do not add another independent clock or force it into a scene-script approach. |
| `scripts/film-subtitles.mjs` | Reuse its `scenes[].captionRanges` SRT export from the actual film script, using the same English wording as the embedded captions (line-break normalization is acceptable). `pnpm moves srt` currently exports product-developer captions and is not this film's export path. |
| Deck `public/`, artwork inventory G1/G3/G21/G25/G29/G14 | Reuse/adapt the crane, burden, freed team, customer need/feedback, and useful-result illustrations. G25 already has retained Terry Moves copies. Retain other chosen assets under Terry Moves rather than depend on a running Slidev server. |
| Existing square film caption/timing tests | Reuse focused boundary-proof techniques for real script/scene/caption outputs. Existing Story Impact bilingual captions and its film-specific pace policy are not suitable defaults for this English-only film. |

The new responsibility is this film's editorial sequence and ink choreography,
not a generic scene system. Keep one authored timeline and one caption source.
Selected bilingual diagrams must be rebuilt with editable English labels; the
outlined Japanese `jidoka-human-radical.svg` cannot become English by hiding
text nodes. Choose concept illustrations rather than Toyota historical assets
unless a historical beat earns its reading time and attribution.

The only current Accepted ADR is [ADR-0000: Use ADRs for durable
decisions](../../../docs/adrs/0000-use-adrs-accepted.md); its index and record
agree. This bounded film follows the existing tool/content structure and makes
no durable stack or layout change. No new ADR, exception, or North Star topic
is warranted. The maintained filmmaking direction in `terry-moves/seed.md`
already supports scripted films in their own visual style.

## Decisive premises and observations

| Premise and operation that consumes it | Literal observation and result |
| --- | --- |
| The selected argument and examples can be distilled without guessing a new thesis; script authoring consumes them. | Read the refined seed and deck's diagnostic, `Judgment-intensive work`, `Freedom to choose again`, and closing notes. They explicitly state learned checks, the next-train/stairs example, and Freedom and Trust as Terry's synthesis. |
| Existing assets support the visual voice; asset selection and framing consume them. | Read `slides/tps-and-ai/artwork-list.md` G1/G3/G21/G25/G29/G14 and list the named `public/` files. View G1: paper, ink, vermilion crown, open palm and crane, with empty left space. It is landscape, so square framing must be reviewed rather than assumed. G25 names existing film copies. |
| Editable script timing reaches existing render/caption boundaries; the new film extends that pattern. | Read `src/problemDecomposition/film.ts`, its Scene, `ProblemDecompositionRemakeFilm.tsx`, and `tests/problemDecomposition/film.spec.ts`. They select scenes/captions from imported timed JSON and register square films. This establishes the route, not this film's rendering success. |
| Existing SRT output can use this authored script; caption export consumes that schema. | Read `scripts/film-subtitles.mjs` and its callers. It loads project `film-script.json`, flattens `captionRanges`, and writes timed `spoken` wording. Read `src/srt.ts` and `scripts/moves.mjs`: the generic launcher is hard-coded to a different film. Final equivalence still belongs to slice 3. |
| A supported runtime exists, while this checkout needs setup; preview/export consumes it. | `node --version` returned v24.5.0; explicit bundled Node returned v24.19.0; `pnpm --version` returned 11.28.5. Tests for both node_modules directories found neither. `command -v ffmpeg` and `command -v ffprobe` returned Homebrew paths. Coordinator setup and the first actual still are the early state-changing probe before dependent production. |
| No TPS film already owns this responsibility; registration and new module placement consume that gap. | Search the whole product's film/script/caption paths and read Root registrations; the TPS deck and seed exist, but no TPS film registration or authoring module was found. Existing films remain separate consumers. |

## Outside-in proof ownership

| Final promise / key example | Owner and observable proof |
| --- | --- |
| Source fidelity, priority, primary-source checks, preserved qualifications and material credits | 1: read the source-linked brief and timed script against deck notes and actual chosen sources; distinguish conceptual software examples from historical facts. 3: compare the final cut with that brief after edits. |
| A learned rule becomes a safeguard and an actual stop/response; unfamiliar judgment remains open | 2: real rendered sequence visibly moves from recurring interpretation to failed check, stopped work, human response, and later carried check. Focused scene-boundary proof checks the actual film output; watching checks meaning. |
| Useful next-train value remains while feedback makes step-free access next | 2: render/watch the authored customer sequence; the completed result stays visible/useful and the unstarted next work changes. No green check is presented as proof of customer value. |
| Recognizable ink/crane identity, clear cause/consequence, coherent beginning/end | 2: full moving first cut; 3: revised full cut and key frames against deck art. Coordinator judgment supplies an assessment for Terry's review, not a claim that Terry already approved it. |
| One unpaused sound-off phone viewing communicates the complete argument | 3: play the whole final MP4 at normal speed in a 360 × 360 viewport, without zooming, then review the hardest caption/action overlaps. Record what was readable and understood; revise if essential action competes with text. |
| English-only titles, captions, diagram labels, asset lettering and any speech | 1: audit selected assets and authored wording; 3: full playback and shot/key-frame review, including raster/outlined lettering. An authored-text scan alone is insufficient. |
| Square approximately 90-second usable MP4, embedded captions, timed English SRT, editable inputs/assets and reproduction | 3: final H.264/yuv420p render, ffprobe metadata, compare SRT against actual caption intervals/wording, and run the documented preview/export path from retained authoring inputs. |

## Ordered slices

### 1. Terry can read a source-linked, timed English film blueprint
Type: Behavior
Status: done
Proof: Open the brief and timed script, follow each substantive statement to its
source, and read the caption sequence at its authored timing. The argument,
English asset selection, approximate duration, and credit basis are explicit.

Behavior: Given the bilingual presentation and refined outcome, author one
concise editorial brief and editable timed script under `TPS and AI/`, so Terry
can see the proposed coherent argument before production. Establish stakes,
learning becoming a safeguard, useful delivery followed by feedback, and the
crane/closing payoff. Keep the essential meaning in captions and identify the
action that each passage needs to show. Inspect every chosen asset visually;
preserve links/credits and rebuild any necessary bilingual labels in English.
Use the existing caption-range schema if consuming the existing exporter.

After coordinator checkout setup, run `pnpm --dir terry-moves compositions` and
`pnpm --dir terry-moves exec remotion still src/index.ts SilentScene
/tmp/tps-film-runtime-smoke.png --frame=0` with the supported Node on PATH.
Failure stops dependent render work and updates the same plan. This probes the
existing tool route; it is not proof of a finished TPS film. The blueprint is
an accepted interim artifact, replaced by the moving explanation in slice 2.

Accepted proof: `TPS and AI/film-brief.md` and `film-script.json` provide the
source-linked argument, 172 words, 23 captions, eight contiguous scenes and a
94-second cut including credits. Coordinator inspected the script's source IDs,
claim homes, actions and the audit's actual assertions. With bundled Node on PATH,
`node /private/tmp/tps-film-blueprint-audit.mjs` exited 0: frame-aligned,
non-overlapping caption ranges, English audience text, known source references,
seven byte-identical retained images, and the real generic SRT export preserving
every caption and first/last timestamps. The implementation agent visually
opened all seven images; none has baked lettering. `git diff --check` passed.
Independent post-change refactoring returned `none — already clean`; no proof
was invalidated. Formatting selected no TypeScript files in this content slice.
Moving meaning and observed phone readability belong to the next slices.

### 2. Viewers can watch the complete argument in the presentation's ink style
Type: Behavior
Status: done
Proof: Render and watch the full moving first cut from the actual registered TPS
composition. Observe the learned-check stop and response, retained customer
value plus changed next need, the central diagnostic, and a deliberate ending.

Behavior: Given the timed blueprint and retained source art, implement a small
TPS film module and one composition in Terry Moves. Compose square shots with
embedded English captions, visible action/change, and restrained transitions.
The exact shot count is editorial rather than a production rule. Reuse assets
and the existing timeline/scene patterns; do not borrow bilingual rendering or
irrelevant graphics from other films. Add only focused tests for real timeline,
caption, language and decisive scene-state boundaries; do not mirror each prop.

Run the focused suite under `terry-moves/tests/tpsAndAi`, changed-file ESLint,
and TypeScript for registration/import compatibility. Render a full review MP4
using native Remotion, with image and captions present through the ending.
Review actual moving output, not only markup or stills. Record source-fidelity
and artistic concerns for correction in slice 3; the first cut is the accepted
interim version, rather than a completion claim.

Accepted proof: `TPSAndAIFilm` rendered all 2820 frames to
`terry-moves/out/tps-and-ai-review.mp4`. With bundled Node on PATH,
`pnpm --dir terry-moves exec node --experimental-vm-modules node_modules/jest/bin/jest.js tests/tpsAndAi --runInBand`
passed five tests, and `pnpm --dir terry-moves exec tsc --noEmit` passed.
Coordinator inspected the actual caption, SVG transform, persistent receipt,
future-label position, language and ending assertions against the production
components and JSON. The native full render used H.264/yuv420p/bt709, concurrency
4; `ffprobe` confirmed 1080 square, 30 fps, AAC and 94.016 seconds;
`ffmpeg -v error -i terry-moves/out/tps-and-ai-review.mp4 -f null -` decoded
without error. Chrome required automatic sandbox escalation; the authorized
retry exited 0. The independent refactor moved shared choreography offsets
into the script and derived scene reveals from its starts. Exact markup at 46
affected frame states and a byte-identical regenerated WAV preserved the cut;
focused tests and typecheck passed after those edits. Selective ESLint passed.

Manual interim review used a verified 360 × 360 CSS-pixel native video player,
muted, autoplaying from the start through the 94.016-second ending. The browser
viewport override did not apply, so explicit player dimensions supplied the
phone-sized observation. Representative frames and critical stop/feedback
windows retained the source art and readable captions. The completed train
receipt remained while step-free route moved ahead. Slice 3 owns observed
polish: the repair figure touches the headline, a feedback path crosses a face,
a caption breaks after a dangling "the", and the score is too quiet
(-36.1 LUFS before its 0.75 mix). Keep those corrections in the existing final
slice, with final moving/source/English review and export proof.

### 3. Terry receives a polished, mobile-readable film and translation inputs
Type: Behavior
Status: done
Proof: The complete final MP4 passes an unpaused sound-off 360 × 360 playback,
English frame review, source-fidelity review, caption/SRT comparison, metadata
inspection, and documented reproduction from retained inputs.

Behavior: Given the complete first cut, correct pacing, framing, caption/action
competition, transitions, and weak narrative beats from the observed review.
Retain comfortable natural caption phrases; remove explanatory text that fights
for attention. Let the final message land and provide concise readable credits.
Any audio is supporting, has retained provenance, and supplies no unique meaning.
Use the real final caption intervals to export the English SRT, and preserve
all editable inputs/local assets needed to reproduce the cut offline.

Export a final square MP4, default path `terry-moves/out/tps-and-ai.mp4`, with
H.264, yuv420p, and bt709. Inspect it with `ffprobe` for equal dimensions,
duration and successful decode; watch the whole final render and inspect each
shot's representative frames for residual Japanese and meaningful crops.
Compare timed SRT text and intervals with the renderer's caption selection.
Document exact Studio/export/SRT commands in the film's maintained brief or
Terry Moves guide and execute them. Keep exported files available for delivery
even though `terry-moves/out/` is ignored. Rerun focused checks only for changes
or remaining concerns. Before retiring an execution worktree, the coordinator
copies the delivered MP4 and SRT to the stable default checkout's
`/Users/terryyin/git/terry-talks/terry-moves/out/` and verifies those copies open.
Include final MP4/SRT paths and observed limitations in the delivery report.

Accepted proof: the documented `pnpm --dir terry-moves render:tps-and-ai`
with bundled Node on PATH regenerated the score and SRT, rendered all 2820
frames, and exported the settled 93-second poster; exit 0 after authorized
Chrome sandbox escalation. `ffprobe` confirmed 1080 square, 30 fps,
H.264/yuv420p/bt709 and AAC, with a 94.016-second container. Full
`ffmpeg -v error -i terry-moves/out/tps-and-ai.mp4 -f null -` decode passed.
The final mix measured -23.8 LUFS and -10.2 dBFS true peak. All seven focused
tests and TypeScript passed. Coordinator inspected the actual SRT-to-caption
assertions at `tests/tpsAndAi/film.spec.tsx:63`, natural phrase assertions at
line 43, retained receipt/priority and stopped/resumed SVG assertions, and
`/private/tmp/tps-film-final-audit.mjs`; its unchanged source/timing,
23-caption/170-word, SRT equality and decode assertions passed.

Coordinator reviewed 25 actual MP4 frames covering all captions, repair and
ending, plus one uninterrupted muted native-player viewing from 0 through
94.016 seconds at a verified 360 by 360 CSS-pixel size. Captions were readable,
the repair figure cleared its headline, the feedback path avoided faces, the
train result persisted, and the complete English argument and closing hold
were understandable. The caption shortened after the export exposed a lone
"problem." now reads "Keep the train result. A step-free route is next."
Toyota facts remain bounded to its source account; software examples and
Freedom and Trust remain Terry's synthesis. No Japanese appeared in the
authored output or inspected art. Manual review outcome: Good.

Fresh independent post-change refactoring returned `none — already clean`
without invalidating proof. Selective ESLint and whitespace checks passed.
Final MP4 SHA-256:
`bbe8c5d050be472fdf79211c4ea8abb52ac1ccf2ccd977886ead17d11584a110`.
MP4, matching SRT and poster were copied to the stable default checkout's
`terry-moves/out/`; each copy matched its source SHA-256 and the copied MP4
opened with the same verified metadata. Hosted CI remains unobserved because
the project has no configured workflow or observation adapter.

## Concern review and learnings

Slice-plan refinement was not needed: each slice supplies one useful film
boundary with its own proof loop, and the sequence retains one authored clock
and caption source. This review identified no remaining slice-specific concern.
Runtime/render viability was established by the coordinator setup probe.
Production and artistic reviews are recorded above; Terry's delegated authority
allowed corrections through the finished film without another approval stop.
Observed caption, framing and mix concerns were corrected in slice 3.

## Execution complete

Product advice: no queue change. The finished film advances the recorded varied
filmmaking direction within this bounded scope. Its SRT and reproducible source
support the existing translated-edition story without completing or reprioritizing
that separate work. Independent product retrospective found no supported
correction, refactoring, architecture or test-consolidation issue. Process review
was skipped because the optional project preference file is absent.
Hosted CI remains unobserved: no workflow, project adapter or live observer was
configured, so no completion or shutdown receipt is claimed. Local render,
focused checks and coordinator phone-playback proof remain accepted.
