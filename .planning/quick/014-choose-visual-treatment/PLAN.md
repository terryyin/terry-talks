# Choose and continue a visual treatment for Problem Decomposition

Source: [refined story](../../../terry-moves/seed.md#choose-visual-treatment).
Identity: `terry-moves-filmmaking#choose-visual-treatment`

## Goal and scope

Terry compares two short moving explanations of the same source idea, identifies
an interpretation to correct, records an exact artistic choice, and continues
that treatment through its actual authored script and assets. The useful stopping
point is retained samples, decision, and reusable selected direction; producing
the whole film is deferred.

Use the [confirmed article](../../../Problem%20Decomposition/problem-decomposition.md)
as argument authority and the [simple remake treatment](../../../Problem%20Decomposition%20Remake/film-treatment.md)
as the shopper example and Treatment A reference. Both samples distinguish
screen/API/database parts of an imagined solution from a smaller customer
problem. Show the stock question, a usable “In stock: 1 left” result, feedback
that the shop was closed, and opening hours becoming next while reservation
remains unstarted and the stock result stays useful. A plan is an attempt;
affordable stopping concerns completed useful boundaries. The brief retains the
article's distinction/premises/goals/principles skeleton; this passage does not
pretend to cover all of it.

Treatment A uses restrained type, cards, and diagram motion. Treatment B uses
one recognizable shopper's intention, modest relief, and changed attention after
feedback, with readable outcome information. Use matching explanatory wording,
the Problem Decomposition title, and Terry Yin attribution. Character action
must carry meaning; changing the background or adding a stationary figure to A
does not establish B. The fictional commerce example is illustrative.

Include named versions and beat/pose references, moving samples and key poses,
a focused revision that retains its predecessor, pending/revise/selected review
responses, and a continuation using the selected version. Document the reusable
brief → sample → review → revise/select → continue authoring route. Keep required
local assets and authoring inputs; exports may stay in ignored `terry-moves/out/`
when saved inputs reproduce them offline.

Defer complete films, a visual editor or review application, a universal scene
format/theme system, a style catalog, automated artistic scoring, new voice or
video generation, new rigs or prop/dialogue mechanics, and approved-film locking
machinery. Existing supported uses remain allowed; the two initial alternatives
do not create a product-wide count limit.

## Preparation and execution context

- Preparation is retained in
  `/Users/terryyin/git/terry-talks/.worktrees/i-can-choose-a-visual-treatment-that-expresses-m`,
  branch `codex/i-can-choose-a-visual-treatment-that-expresses-m`, starting at
  `38ce8434cc79a318b1467f3af270c1dbec839f28`. The creation ref names this identity.
  Shunka-chan's established Preparing assignment is already published there.
  Integration checkout: `/Users/terryyin/git/terry-talks`; separate publication
  target: `origin/master`. Reuse this workspace and assignment for preparation.
- The current instruction authorizes slice planning. Leave the seed and plan
  uncommitted and unpublished for review under preparation disposition.
  `AGENTS.md` says not to push unless asked. Later execution, publication, and
  retirement use the installed Dough workflows and their actual authority.
- No associated plan existed. The highest allocated current entry was 013;
  014 was checked free immediately before writing. All slices below are
  `planned`. Retain source and plan for execution retrospective/wrap-up; do not
  write execution completion during planning.
- The project supplies no numeric slice target, hard limit, or repeated-overrun
  threshold. Size each slice by one cohesive outcome and proof loop, including
  edits, verification, refactoring, and cleanup. Apply the installed overrun
  reassessment rules. Manual observation budgets below are not slice limits.
- Before implementation, execution must establish Node >=24.9.0 and pnpm
  11.28.5, run `pnpm install --frozen-lockfile` in its own selected checkout,
  and run `pnpm --dir terry-moves compositions` there. This follows the package
  engines, locked workspace setup in `AGENTS.md`/the film guides, and
  `dough-execute-plan`'s checkout-bound setup. Do not copy or symlink another
  checkout's mutable dependencies. No setup-success claim is made here.
- Use the current Remotion 4.0.533 and React 19.3.0 pins. Existing ffmpeg and
  ffprobe are on PATH. Slice 1 explicitly owns the first supported-runtime
  preview probe; failure stops dependent sample/export work.
- For delivery, accept the slice's outside-in proof, run independent
  `dough-post-change-refactor`, format affected files with the installed ESLint
  configuration, check `git diff --check`, and commit only coherent owned work
  under `dough-execute-plan`'s delivery contract. The inspected checkout has no
  pre-commit hook or project selective-format wrapper: resolve the actual
  execution hook contract, and use `pnpm --dir terry-moves exec eslint --fix
  <affected-source-files>` plus its check-only form when no hook owns lint.
  Do not add a new hook or run the whole formatter across unrelated files.
- Local proof is the focused treatment suite and actual preview/export journey.
  Run `pnpm --dir terry-moves exec tsc --noEmit` when adding registrations or
  changing shared types; the registry loads distributed film components, so
  type compatibility matters beyond one fixture. Broaden behavioral suites only
  when a changed shared consumer requires them, as listed below. No Slidev build
  or blanket full-suite local gate is introduced. No hosted CI workflow is
  present in the inspected `.github` location; future execution must report
  actual observer coverage rather than infer it from local tests.

## Existing solutions and design direction

PFE inspected the current film authoring code, whole-product callers/tests,
native Studio/render entry points, revision comparison, and maintained film
guides. Use these domain-coherent responsibilities:

| Existing solution | Decision and boundary |
| --- | --- |
| `src/beatTimeline.ts` | Reuse `beat`, `timeline`, `beatRange`, direct `poseAt`, and captions. Author timing once; do not add another frame clock. Story Impact and SilentScene already consume it. |
| Simple remake `Frame.tsx`, `film.ts` | Reuse `Paper`, `Card`, `Small`, `Strong`, palette and type primitives for A. The existing `Frame`/scene components bind to the full remake's measured clock; do not force them onto a shortened sample or copy their global clock. |
| AI workshop `Engineer` and motion | Reuse the adult character drawing, moods, gaze, head tilt, and existing motion helpers for the shopper. SilentScene already reuses the drawing. Add a shopper role/staging around it; no second limb solver or new rig is needed. |
| Native Remotion compositions/CLI | Reuse Studio selection/seeking and local moving/still exports. Register named sample compositions in the current root. Add a small export wrapper only for these sample versions and their authored key poses. |
| `revision/compare.ts` and `previews.ts` | These compare Git baseline/correction for one composition with preservation semantics. They do not own two creative alternatives or a selection. Leave them unchanged; use ordinary named exports and source/beat links for the treatment review. |
| Saved scripts, assets, Git, film treatment docs | Reuse file-backed authoring and recoverable history. Add a feature-local version/choice record that the continuation actually consumes. No current product code owns this creative-choice lifecycle. |

Keep a common source brief and caption meaning, with each treatment's authored
beats and visual performance. Reuse the generic timeline; visual renderers may
differ because directing with type and directing with a person have different
meanings. Do not store an independent prose storyboard, caption clock, key-pose
coordinate list, and rendering script for the same sequence.

Put authored treatment versions and their frame-to-pose interpretation under a
feature-local `terry-moves/src/visualTreatments/` entry. Maintain the brief and
choice alongside the existing content in `Problem Decomposition Remake/`.
Prefer explicit authored data and a small choice literal/file to a new CLI
protocol. A version identifies the actual script, renderer source revision, and
saved assets used for its reviewed exports. A revision gets a new identity;
keep the predecessor recoverable and its review files available. A selection
must identify that version, not a mutable “latest” alias. Sharing unchanged
authoring data is fine; neither a prose note nor version names alone prove
reproducibility. If the renderer changes, retain the original source revision
and verify the chosen sample before continuing it.

The continuation composes the selected sample's actual beats with a following
opening-hours beat. Keep drawing independent of total-film progress so appending
a beat does not repaint the already selected prefix. Derive duration and
key-pose frame references from the same timeline. Pending/revise/selected are
review meanings, not automatic quality judgments; an unrelated revision does
not authorize itself or switch the selected sample.

This is a local extension of existing timeline, drawing, and saved-film inputs.
The index and in-file status agree on Accepted
[ADR 0000 — Use ADRs for durable decisions](../../../docs/adrs/0000-use-adrs-accepted.md).
It preserves human ownership of cross-cutting decisions. No relevant Accepted
engine/format ADR or existing North Star topic constrains a different approach,
and no new cross-cutting format or platform choice is needed. No ADR exception,
proposal, or North Star document is introduced. Shared files with the restaging
story are ordinary integration work, not a blocking story dependency.

### Consumers and preservation proof

Search results show `Engineer` is used by AI workshop scenes and SilentScene;
their suites are `tests/aiTestAutomation/` and `tests/silentScene/`. Card/type
primitives are consumed by the simple remake's Distinction, Goals, Principles,
and registered full film; there is no current remake-specific test suite.
The timeline is consumed by SilentScene compilation and Story Impact's film
wrapper, including later films and FeatureTeams consumers.

Prefer additive use of these unchanged components. If actor/motion code changes,
run the complete AI workshop and SilentScene suites. If the common timeline
changes, run Story Impact, SilentScene, and FeatureTeams suites and inspect the
affected registered compositions. A primitive change must also be observed in
the original registered remake's affected scene, with real text layout, rather
than asserting a mocked replacement. The shared root change requires a real
composition listing with all previous IDs retained. Re-search actual consumers
if implementation reaches another boundary; do not rely on this list to exclude
a newly affected consumer.

## Observed premises and early probe

Observations were made on 2026-10-07 against this workspace's unchanged product
source at `38ce843`, with its local refinement draft. No source or assets were
changed by the probes.

1. **Existing drawing can consume the desired inputs.** Inspected `Engineer`,
   `Card`, and their imports/callers. In a disposable process, rendered the real
   Engineer with concerned/pleased/surprised moods and a real done-tone Card
   containing the stock result. All rendered, the expected mood/result appeared,
   and actor markup contained no NaN/Infinity. This settles direct component
   reuse, not future animation, browser layout, or artistic fit. Literal command:

   ```sh
   NODE_PATH=/Users/terryyin/git/terry-talks/terry-moves/node_modules /Users/terryyin/git/terry-talks/terry-moves/node_modules/.bin/tsx -e 'const React = require("react"); const {renderToStaticMarkup} = require("react-dom/server"); const {Engineer} = require("./terry-moves/src/aiTestAutomation/actors.tsx"); const {Card} = require("./terry-moves/src/problemDecompositionRemake/Frame.tsx"); const rows=["concerned","pleased","surprised"].map(mood => {const s=renderToStaticMarkup(React.createElement("svg",{},React.createElement(Engineer,{x:280,y:900,mood}))); if (!s.includes(`data-mood="${mood}"`) || /NaN|Infinity/.test(s)) throw Error(mood); return [mood,s.length]}); const card=renderToStaticMarkup(React.createElement(Card,{x:40,y:80,w:900,h:220,tone:"done"},"In stock: 1 left")); if(!card.includes("In stock: 1 left") || !card.includes("rgb") && !card.includes("#147c72")) throw Error("card"); console.log(JSON.stringify({engineer:rows,doneCardRenders:true,scope:"source reuse in a disposable process only; no browser, font-layout, or target-runtime claim"}));'
   ```

2. **The shared timeline supports composing an unchanged prefix.** Consumed the
   actual current SilentScene script through `compileScene`, sampled it and an
   appended timeline through the real `SilentScene` renderer in reverse frame
   order, and compared every prefix frame's SVG markup. All 124 prefix frames
   agreed. The new 24-frame beat began at frame 124, total 148; its caption was
   “When is it open?”. This establishes existing arithmetic/direct seeking,
   not automatic semantic joins or the future sample's picture preservation.
   Literal command:

   ```sh
   NODE_PATH=/Users/terryyin/git/terry-talks/terry-moves/node_modules /Users/terryyin/git/terry-talks/terry-moves/node_modules/.bin/tsx -e 'const React=require("react"); const {renderToStaticMarkup}=require("react-dom/server"); const {timeline,beat}=require("./terry-moves/src/beatTimeline.ts"); const {compileScene}=require("./terry-moves/src/silentScene/compileScene.ts"); const {script}=require("./terry-moves/src/silentScene/script.ts"); const {SilentScene}=require("./terry-moves/src/silentScene/SilentScene.tsx"); const sample=compileScene(script); const end=sample.poseAt(sample.durationInFrames-1); const continuation=timeline([...sample.beats,beat("next question",0.8,"When is it open?",()=>end,30)],30); for (let f=sample.durationInFrames-1;f>=0;f--){const a=renderToStaticMarkup(React.createElement(SilentScene,{pose:sample.poseAt(f)}));const b=renderToStaticMarkup(React.createElement(SilentScene,{pose:continuation.poseAt(f)}));if(a!==b)throw Error(`prefix changed: ${f}`);} console.log(JSON.stringify({sampleFrames:sample.durationInFrames,continuedFrames:continuation.durationInFrames,prefixMarkupEqual:true,newBeat:continuation.beatRange("next question"),newCaption:continuation.captionAt(sample.durationInFrames),scope:"existing source consumer only; no browser or future treatment claim"}));'
   ```

3. **Host setup is not yet the execution setup.** `node --version` and both
   available Homebrew node binaries returned v24.5.0, below the package engine.
   `pnpm --version` returned 11.28.5; `command -v ffmpeg` and `command -v ffprobe`
   found the Homebrew tools. The owned worktree has no node_modules. The separate
   integration checkout at the same product revision has Remotion 4.0.533,
   React/react-dom 19.3.0, and tsx 4.23.15; those dependencies served only the
   disposable source observations above. Correct-runtime installation and
   checkout setup are state-changing and remain execution startup work.
   Slice 1's early probe must then consume the registry/preview at that runtime,
   including actual font layout. Failure stops dependent slices and requires
   revising this plan; it is not a covered production journey today.

The choice/version lifecycle is a new responsibility, not an assumed existing
capability. Slices 3–5 own its construction and observation. No paid generation,
credentialed service, or source incorporation from another branch is required.

## Outside-in proof ownership

| Final promise / source example | Owning slice and observable signal |
| --- | --- |
| Two meaningfully different watchable treatments of the same source argument, title/attribution, relationships and wording; example 1 | 1 and 2: real registered previews plus saved clips and named key poses in 3; watch the question/result/feedback arc and inspect the shared brief. |
| Correct one misleading performance without losing the comparison; example 2 | 3: revise a named candidate through its authored inputs, obtain a new version and actual preview/export, retain/reproduce its predecessor and the other candidate. |
| A render, revision, or “neither” response does not silently select a candidate; example 4 | 4: a real pending/revise record yields no continuation, an exact explicit selection resolves the corresponding version, and adding a revision leaves the choice attached to its prior version. |
| Selected version can continue through its actual script/assets; example 3 | 5: append the opening-hours beat, render/watch the continued sample, compare all prefix images with the selected export and confirm only the new beat extends it. |
| Saved inputs/assets, exact version, decision and authoring route remain usable if full film is deferred | 3–5: versioned local review artifacts, a consumed choice record, offline reproduction and maintained authoring guidance; no inference from prose alone. |

Focused automated boundary command after implementation:

```sh
pnpm --dir terry-moves exec node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand tests/visualTreatments
```

Those tests do not exist yet. Add only meaningful semantic/timeline/version and
continuation boundary examples that use the actual authored input and renderer;
test data establishes the starting brief, not the promised selected output.
Automated markup cannot establish text fit, watchability, or Terry's artistic
choice. The actual registered preview/export owns those gaps. Run the relevant
whole treatment suite after each slice, and conditional existing consumers above.

Add one documented `pnpm --dir terry-moves render:treatments` operation in slice 3
using the existing Remotion CLI for named version clips and timeline-derived key
poses under `out/treatments/<version>/`. In slice 5, extend that same operation
with selected continuation output when a real choice exists. It must not infer
a winner or fabricate a selected output while pending. These are planned commands,
not observed existing commands. Inspect actual files and consume them after the
command; a mocked process call or successful exit alone does not prove export.

## Ordered slices

### 1. Watch the typography treatment of the common brief
Type: Behavior
Status: done
Proof: Real registered native preview and focused treatment tests.

Accepted (execution, Claude/Eimi-chan, Story Branch Mode on
`claude/i-can-choose-a-visual-treatment-that-expresses-m`): runtime is a
job-local Node v24.21.0 prefixed on PATH (host Node 24.5 is below the engine);
`pnpm install --frozen-lockfile` and `pnpm --dir terry-moves compositions`
succeed in this checkout. Probe: real stills of `ProblemDecompositionRemakeFilm`
frames 740/1380 laid out Card text correctly. Sample `TreatmentTypographyV1`
(1080², 30 fps, 870 frames) — beats title 0–89, distinction 90–254, question
255–389, result 390–539, feedback 540–674, next 675–869. Common brief is
`terry-moves/src/visualTreatments/brief.ts` (beat names + shared captions);
treatment A is `visualTreatments/typography/`. Proof: focused suite
`tests/visualTreatments/typographyTreatment.spec.tsx` 6/6, `tsc --noEmit`, 27
compositions listed (all 26 prior IDs kept), stills under ignored
`terry-moves/out/treatments/TreatmentTypographyV1/` inspected; Studio served the
composition (`pnpm moves studio --port=3517 --no-open`). Gaps: playback feel
and Studio seeking remain Terry's to watch; 360px labels are marginal (~8px).
Every Remotion command logs a pre-existing, harmless 404 for another
composition's `scene.bin`.

Behavior: Given the settled brief and supported execution setup, Terry opens
the typography sample in Studio and watches the smaller customer question become
a useful stock result, followed by feedback and a changed priority. The imagined
solution parts remain distinct from customer outcomes. Named beats expose the
question, result, and feedback poses, with title/attribution and readable captions.

First perform the supported-runtime registry/preview probe after execution
startup: select the existing `ProblemDecompositionRemakeFilm` and inspect its
question and done-result scenes. Use the existing root and real card primitives,
not a mocked shell. This settles the runtime path, not the new sample's behavior.
If that composition cannot load or its real text layout cannot be consumed, stop
before dependent work and repair the approach. Once the probe succeeds, author
the short sample with the shared timeline and a feature-local script/pose entry;
use explicit beat durations and captions without narration generation. Add no
full-film clock or generic style framework.

Test the actual authored sample's source distinction and named-beat state
sequence, including a usable result and retained completed/unstarted outcomes.
Run the focused suite, typecheck, and actual composition listing. Open `pnpm moves`
at its printed URL, select the registered sample, play its whole arc, and seek
feedback/result/question out of order. Record composition ID, beat/frame refs,
actual startup command and observations for subsequent slices.

Manual observation budget: 4 active minutes — 1 setup, 1 whole-arc breadth,
1 readable key-pose/seek depth, 1 surprise/confirmation reserve. Installation or
render waits do not consume this budget. One sample is an accepted interim
comparison limitation; slice 2 supplies the second.

Stopping point: Terry retains a usable first interpretation and authored inputs,
without any assertion that a treatment has been selected.

### 2. Watch a character-led alternative of the same passage
Type: Behavior
Status: done
Proof: Real second preview plus the focused treatment suite comparing meaning.

Accepted: `TreatmentCharacterV1` (1080², 30 fps, 915 frames) — title 0–89,
distinction 90–254, question 255–389, result 390–539, feedback 540–719 (6 s for
the walk to the door), next 720–914. One `Engineer` shopper (scale 0.85) on a
home-to-shop street: concerned intent, raised-hand stock question, closed-eye
relief then nod at “✓ In stock: 1 left”, walk to a door that shows CLOSED
(surprised → concerned), then a glance back at the kept result and a hand on the
NEXT “When is it open?” sign; reservation UNSTARTED in the window. Shared
wording (captions, status labels, outcome text) and `TreatmentVersion` live in
`visualTreatments/brief.ts`; `TreatmentCompositions.tsx` has one `treatment(...)`
factory. Proof: `tests/visualTreatments` 12/12 (B: distinction/gaze, stable
identity + finite markup, mood/attention arc, outcome readability, captions equal
to A per beat, appended-beat prefix equality), `tsc`, 28 compositions; stills in
`out/treatments/TreatmentCharacterV1/` and A comparisons inspected at full and
360px. Actor/motion/timeline code unchanged, so their consumer suites were not
required. Fidelity observed; artistic preference left to Terry (glide walk,
subtle glances, modest relief; hand slightly under the hours sign at the end).
CI: the repository has no `ci.yml` workflow; the observer reports it unavailable,
so publications are unobserved.

Behavior: Given A and the same source brief, Terry watches B convey the shopper's
intent, modest relief at the stock answer, and response to closed-shop feedback.
The stock outcome stays useful, opening hours becomes next, and reservation stays
unstarted. The shopper's performance and staging carry the contrast with A.

Reuse the existing adult drawing and motion with stable shopper identity. Add
this treatment's authored performance/visual projection to the same brief and
timeline responsibility. Keep common wording and shared meaning coherent rather
than introducing a second content recognizer. A different pose or palette alone
does not replace meaningful acting through the whole arc.

Exercise both real renderers at their named semantic beats and motion boundaries;
check finite poses and identity, and run the conditional actor consumers if
anything in their responsibility changed. Play B and compare A at the same
question/result/feedback references at full and 360px display. Inspect attention,
expressions, readable result/next-question information, and retained relationships
during motion. Re-seek nonsequentially. Mark observed source fidelity separately
from Terry's eventual artistic preference.

Manual observation budget: 5 active minutes — 1 setup, 2 both-sample breadth,
1 motion/identity/readability depth, 1 reserve.

Stopping point: two watchable, authorable alternatives exist. Neither is approved
merely because it renders; repeatable review/version outputs follow in slice 3.

### 3. Revise a named candidate and retain the comparison
Type: Behavior
Status: done
Proof: The real review/export and authored revision round trip.

Accepted: `pnpm --dir terry-moves render:treatments [ids…]` (wrapper
`terry-moves/scripts/render-treatments.ts`; plan `visualTreatments/exportPlan.ts`;
registry `visualTreatments/versions.ts`) bundles once and writes
`out/treatments/<id>/{<id>.mp4, <beat>-{midway,settled}-<frame>.png,
manifest.json}`; key-pose frames come from each version's `beatRange`. Manifest
records Git revision, a working-tree/listed-input `changedFromRevision` flag,
and input blob hashes. Versions: `TreatmentTypographyV1` (870 f),
`TreatmentCharacterV1` (915 f), `TreatmentCharacterV2` (915 f, same timing;
`character/v2.ts` revises result relief, feedback half-step/chin, and the hand
resting at the hours sign's edge). Human brief/review doc: `Problem
Decomposition Remake/visual-treatments.md`. Proof: suite 4 suites/23 tests;
`tsc`; 29 compositions; two real export runs with A/V1 stills and clips
byte-identical across runs and to pre-change baselines; ffprobe h264 1080²
30 fps with matching frame counts; V1/V2 stills compared. No selection output
exists. Gap: whether V2 is better, and motion feel, are Terry's to watch.

Behavior: Given the samples and their beat references, Terry identifies the
character sample's result/feedback performance for correction. Author the revised
action/emphasis, preview it as a new named version, and retain the old version
and A for comparison. The result remains a smaller useful answer, not a claim
that all shopping needs were solved.

Implement the small repeatable export operation and review record alongside
versioned sample inputs. Outputs include named clips and key poses from the
same timeline; the review links source, version, and beat/frame references.
Do not maintain a second coordinate/timing storyboard. Do not replace an old
version's input or exports silently. Versioned sources must reproduce what was
reviewed, including renderer revision and local assets. An author-controlled
adjustment such as the shopper's relief/attention at the result beat is enough
to demonstrate a real revision; no new prop mechanics are required.

Run `render:treatments`, open the actual clips/key poses, make the revision
through the documented authoring entry, and run it again. Inspect that the new
version's intended performance changes while the predecessor and other candidate
remain available and reproducible. Preserve the shared captions/relationships.
Test the actual version/export selection boundary and named revision data; any
mocked CLI tests supplement, rather than replace, the real operation.

Manual observation budget: 5 active minutes — 1 setup, 1 output breadth,
2 before/after/performance/reproduction depth, 1 reserve. Record the resulting
paths and version/source identities for selection and final preservation proof.

Stopping point: Terry can compare and correct real named alternatives. Rendering
and correction still make no selection; slice 4 owns that lifecycle.

### 4. Record an exact artistic choice, including choosing neither
Type: Behavior
Status: done
Proof: A consumed file-backed choice and focused lifecycle tests.

Accepted: hand-edited record `terry-moves/src/visualTreatments/choice.ts`
(`pending` | `revise` version+beats+note | `selected` exact id), resolver
`selection.ts` (`resolveChoice`; a missing id errors with the id, the
registered ids, and the record location; nothing is ever substituted), and
the Studio composition `TreatmentSelected` (selected → that version's exact
picture/duration/fps; pending/revise → a 90-frame “No treatment selected”
card; a missing id leaves the other compositions listed and makes this one
fail when rendered). After watching the exports, Terry chose
**`TreatmentCharacterV2`** (2026-10-08, answered in the execution
conversation). The record names it exactly. Proof: suite 5 suites/32 tests
(the real record; pending/revise/missing and later-revision fixtures, labelled;
selected-preview markup equal to each version's renderer at every key pose);
`tsc`; listing shows `TreatmentSelected` at 915 frames, 30 fps; real-CLI stills
of `TreatmentSelected` vs `TreatmentCharacterV2` at frames 0/465/539/719/914 are
byte-identical, as is the exported `next-settled-914.png`. The pending card and
the missing-id error were also observed natively with a temporary fixture.

Behavior: Given retained samples, the review record can say pending, request a
revision of a named beat/version, or identify an explicitly selected version.
Pending or revise leaves continuation unselected; a render/new candidate does
not infer a winner. Selection resolves the actual reviewed source/assets, and
creating another version does not move that selection to “latest”.

Keep the choice in the feature's ordinary authored input, readable by Terry and
consumed by a registered selected-sample preview and the continuation entry.
An exact selection previews that version's actual script/assets. The ordinary
sample compositions remain available while the choice is pending or asks for
revision; expose an unselected state without making the whole registry fail.
A missing referenced version must be
reported with enough context to repair the choice; do not substitute another
candidate. This protects an exact selection, not an arbitrary version-count
restriction. Test pending, named correction, exact selection, and adding a later
revision through the real registered selected-preview boundary. Confirm its
metadata and key poses with the native consumer; a loader returning an ID alone
does not prove that the selected picture is the referenced version. The later
continuation consumes this same resolved authored version.

Ask Terry to choose after he can watch the actual outputs, reusing these version
and beat links. Do not treat his earlier selection of the source explanation
as a choice of a completed sample. A test fixture may exercise the selected
path, clearly labelled as such; the real persisted choice remains pending until
Terry supplies it. If he chooses neither, preserve both candidates and return to
the scoped revision path; dependent continuation waits. This is the story's
human artistic operation, not an additional deployment approval.

Manual observation budget: 2 active minutes — 0.5 setup, 0.5 record/output breadth,
0.5 exact-reference depth, 0.5 reserve. Time awaiting Terry's response is excluded.

Stopping point: the review meaning and version are retained faithfully. Without
an actual selection, the story has remaining continuation work and is not complete.

### 5. Continue and reproduce the chosen version
Type: Behavior
Status: planned
Proof: Real selected-input → appended beat → export → offline reproduction journey.

Behavior: Given Terry's exact selected version, add the following opening-hours
beat through its authored entry and preview it with the selected sample. The
chosen type/diagram language or shopper identity/performance persists, stock
remains completed, and reservation remains unstarted. The existing prefix is
the actual selected sequence, not a reconstructed demonstration.

Compose its beats and assets directly, with the selected version's source and
visual choices. Add the following beat using the same directing responsibility;
the sample already points to opening hours, while this beat begins that next
question without inventing a completed hours feature. Extend the existing export
operation and documentation, not a parallel selected-film renderer. Derive total
duration and new pose references from the composed timeline.

Run the focused suite against the real selected input and verify every prefix
frame's pose/caption/markup remains identical. Then use the real native producer
to export both the selected sample and continued version as PNG sequences and
compare every decoded prefix PNG, with unchanged dimensions/fps and expected
appended duration. Watch the clip across the join and seek into the suffix out
of order. If a rendered progress decoration changes the prefix, fix its ownership
rather than ignoring that difference. Do not infer picture preservation from
equal script text, a few stills, or the disposable source probe above.

Use only the retained version/source/assets/choice to reproduce after removing
this slice's regenerable output and restarting the producer. Inspect new clip,
key poses, and continuation again; decode the complete movie with ffmpeg and
confirm metadata with ffprobe. Reuse sufficient prior observations when unchanged.
Leave maintained brief, version/choice meanings, synthetic-voice attribution if
saved narration is used, and literal authoring/export instructions alongside the
existing content, linked from `terry-moves/README.md`. No planning numbers enter
product code or permanent authoring guidance.

Manual observation budget: 6 active minutes — 1 setup, 2 complete output breadth,
2 selected-prefix/join/reproduction depth, 1 reserve.

Stopping point: Terry retains the moving alternatives, corrections, real choice,
and watchable reproducible continuation through a reusable authoring path even
if the full film and all later style stories are cancelled.

## Cumulative design and preparation review

The common domain responsibility is directing a named treatment version of one
brief. Timeline arithmetic, captions, key-pose references, review identity, and
continuation all consume that authored version. The two visual projections
express distinct artistic languages, not one handler per delivery slice.
Existing generic timing and existing drawing remain their own coherent solutions.
No universal engine, independent theme hierarchy, or speculative later-story
structure is needed.

Each slice has one evaluable boundary: first interpretation, contrasting
interpretation, named correction round trip, exact review choice, then selected
continuation/reproduction. Initial single-sample and absent-choice states are
explicit usable interim behavior replaced by slices 2 and 4. Artifact preservation
and artistic fidelity have real consumer proof owners rather than generic unit
assertions. Unsupported-runtime preview is bounded by the first probe; artistic
selection is bounded by the real sample review before dependent continuation.

No additional slice-plan refinement pass was needed after constructing these
boundaries: no independent outcomes are bundled, one result is not fragmented by
files/layers, and no unsupported timing estimate is imposed. No remaining
slice-specific concern was identified. The observations settle only current
reuse premises; future samples and target-runtime consumption are not claimed
already working. All final promises are mapped above. Readiness assessment is
the shared preparation recorder's content-bound judgment and grants no Take,
execution, publication, or automatic artistic selection.
