# Terry restages animated diagrams without repairing their relationships

Source: [refined story](../../../terry-moves/seed.md#restage-diagrams).
Identity: `terry-moves-filmmaking#restage-diagrams`

## Goal and scope

Terry changes authored diagram positions and sizes once and previews the same
relationships through the motion. Arrows, labels, test probes, and collaborators
follow their owners and authored route roles without a second coordinate repair.
Deliver this in the existing ATDD scenario circle and solution tree, including a
second meaningful revision through the same authoring path.

Include the selected source incorporation, staging inputs, current-pose geometry,
outline attachments, directed routes, designated label reservations, readable
labels/badges, native preview, and film/diagram reproduction needed for the four
story examples. Preserve the circle's clockwise six-state progression and
integrated fork, the five identities through the 3/2 split and reunion, the tree's
uneven hierarchy and front-end/back-end traversal, and its two distinct test
probes. Preserve the argument, saved narration/score, caption/state sequence, and
beat timing. Static diagram outputs use the film's drawing components.

Defer a visual editor, automatic graph placement or arbitrary obstacle avoidance,
a general solver/matrix system, 3D projection, topology editing, new narration,
audio regeneration, approved-film locking machinery, engine replacement, and
migration of unrelated diagrams. These are unpromised capabilities, not input
rejections. Authored routes need adequate space; the fixtures do not establish
production node-count limits or a whitelist of permitted layouts.

## Execution context and current decisions

- Preparation used this workspace and branch:
  `/Users/terryyin/git/terry-talks/.worktrees/i-can-restage-an-animated-diagram-without-repair`,
  `codex/i-can-restage-an-animated-diagram-without-repair`, starting revision
  `7c6f9844e01363eb3d3bbd5baa68a4b209750967`, Aino-chan. Its creation ref names
  this identity. Integration checkout: `/Users/terryyin/git/terry-talks`;
  separately recorded target: `origin/master`. Landing retires this preparation
  workspace; a later authorized execution selects its workspace through the
  installed `dough-execute-plan` workflow.
- Preparation authorized planning only; the subsequent `land` instruction
  authorizes publication of the seed and plan. Neither instruction authorizes
  Take or implementation. `AGENTS.md` says not to push unless asked; a later
  execution instruction resolves delivery authority through the installed workflow.
- `.planning/quick/012-silent-move-joins/PLAN.md` was the highest allocated plan
  at the preparation baseline, so this story received path 013. Concurrent work
  also allocated 013 with another slug; the full paths and identities are distinct.
  Slice vocabulary is `planned`, `in-progress`, `done`; all below are planned.
  Retain this plan and its source for retrospective/wrap-up after execution.
  Do not create an execution-complete record during preparation.
- No numeric slice target, hard limit, or repeated-overrun threshold is supplied
  by the project or this request. Size by one outcome/proof loop, including edits,
  focused verification, refactoring, and cleanup. Apply the installed overrun
  reassessment rules; do not turn the manual observation budgets below into slice
  time limits.
- PFE from the story remains applicable: extend ATDD's shared circumference and
  sheet-outline clearance, `Flow` tangent markers, rounded endpoint-preserving
  routes, and existing frame/cue motion. Reuse the current Story Impact drawing
  primitives without replacing its film. Legacy DOM-measured actor connectors
  do not own these outlines, lanes, tree traces, or collaborators.
- Staging is an authored TypeScript scene-data literal, using the existing
  script/scene convention. Add one clear maintained entry such as
  `terry-moves/src/atdd/staging.ts`; Terry edits this literal and runs the same
  composition/export commands. Do not introduce a second clock, a JSON/CLI
  protocol, a new action engine, or a variant-selection UI for this story.
- Stable node identities/topology stay distinct from placement. Derive each
  requested frame's outlines, attachments, label reservations, and route
  landmarks from the current staging and animated pose. Evaluate a requested
  frame directly, without accumulating state from earlier frames. Keep circular
  arc and tree route rules distinct where their domain meanings differ; share
  outline/attachment/route responsibility when the actual examples justify it.
- The actual registered film also has a heading, caption band, and corner logo.
  Include those occupied areas when checking demonstrated layout readability,
  and evaluate clearances after the relevant camera/group transforms. A diagram
  tested in isolation cannot establish that the complete film remains clear.
- This is feature-local geometry ownership, following existing SVG/pose
  structure. The catalog and in-file status agree on Accepted
  [ADR 0000 — Use ADRs for durable decisions](../../../docs/adrs/0000-use-adrs-accepted.md).
  There is no Accepted diagram-engine decision, conflict, or existing North Star
  topic. No new cross-cutting format or difficult-to-reverse architecture is
  needed, so no North Star or ADR proposal is added.

## Source incorporation and consumer boundary

Use committed source at `c379fd4` from branch `codex/atdd-short-film`, available
in `/Users/terryyin/.codex/worktrees/atdd-short-film/terry-talks`. Read that
worktree; do not modify it or import its whole branch. In particular its
`package.json`, root registry, Story Impact changes, audio helpers, old plan,
and unrelated talk/film changes are not replacements for current files.

The selected closure is `terry-moves/src/atdd/`,
`terry-moves/src/stories/ATDDFilm.tsx`, its `AnimatedOddeLogo` dependency if not
already present, `ATDD/film-script.json`, the source/fidelity/performance
documentation and referenced source/diagram assets needed by these examples,
and saved `public/assets/atdd/narration.mp3` and `score.mp3`. Preserve source
provenance and synthetic-narration attribution. Carry the two existing diagram
export scripts. Add registrations and render/export commands to the current
files rather than replacing them. Keep the current lockfile and dependency pins.
Adapt carried documentation to the supported saved-media reproduction path;
do not advertise or import an unverified narration-regeneration dependency chain.
Retain command names `render:atdd` and `diagrams:atdd`; use owned output
`terry-moves/out/atdd-restaged.mp4` and its poster for the former and the existing
`ATDD/diagrams/` SVG/PNG outputs for the latter. Save the first unchanged
target-runtime movie as `terry-moves/out/restaging/default.mp4` before revising.

Observed callers of the geometry/drawing responsibility:

| Consumer | Obligation |
| --- | --- |
| `diagrams.tsx` and `CollaborationDiamond.tsx` | Circle sheets/arcs, fork/merge, local loops, labels, and collaborator routes consume current staging coherently. |
| `SolutionTree` in `diagrams.tsx` | Parent edges, scenario trace/cursor, labels, and both test probes consume the same identified tree nodes. |
| `ATDDScene` in `Scene.tsx` | Actual animated states and camera transforms consume the staging; test the complete scene rather than only helper results. |
| Cover/closing miniatures and `DiagramBoard` in `Scene.tsx` | Preserve miniature/static presentation while using the same revised drawing. |
| `ATDDFilm.tsx`, current `Root.tsx` | Preserve existing registry entries; film and both still compositions use the authored staging and unchanged timeline/media. |
| `scripts/export-atdd-diagrams.tsx` | Imports `DiagramBoard` and writes standalone SVG, optionally embedding a local font. Verify generated markers and actual labels; do not edit generated paths. |
| `scripts/export-atdd-diagrams.sh` and package commands | Run that SVG producer and Remotion's two native PNG still compositions; observe all outputs, not just the inner SVG call. |

Product-wide searches found no existing ATDD spec or feature/step-definition
caller outside these paths at the source revision. Existing
`tests/problemDecomposition/scenes.spec.tsx` supplies a suitable high-level
`renderToStaticMarkup` pattern; legacy connector tests use bounding-box stubs and
do not prove ATDD restaging. Reassess callers if execution changes this boundary.

## Decisive premises and observations

Observed on 2026-10-07 in preparation at `7c6f984`, with source at `c379fd4`.
These are preparation observations, not completed-slice proof.

| Premise and consuming operation | Literal observation | Result / consequence |
| --- | --- | --- |
| The source and consumer closure are available for incorporation | `git ls-tree -r --name-only c379fd4 terry-moves/src/atdd ATDD terry-moves/scripts`; run the consumer searches below | Drawing, script, fidelity references, media registrations, and both generator callers exist; target `src/atdd/` is absent. No existing ATDD tests or feature/step-definition callers were found. |
| Source can bundle and register its actual compositions | In `$ATDD_SOURCE/terry-moves`: `pnpm exec remotion compositions src/index.ts` | Exit 0: `ATDDFilm` 1080×1080, 30 fps, 4471 frames; `ATDDSolutionTree` and `ATDDScenarioCycle` stills. Installed Remotion is 4.0.518. An unrelated legacy quillustration asset reports a pre-existing 404; this is not evidence that ATDD media fails. |
| The existing layout does not already fulfill the restaging promise | Run the consumer probe below | The changed arc reaches rendered SVG, while the first checkpoint remains `(610,205)` and the old sheet origin remains in the drawing. The observed defect requires coherent pose derivation, not a second independent coordinate repair. |
| Saved media and an encoded predecessor exist | In `$ATDD_SOURCE`: `ffprobe -v error -show_entries format=duration:stream=codec_name,sample_rate,channels -of json terry-moves/public/assets/atdd/narration.mp3` and the same command for `score.mp3`; `ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=width,height,r_frame_rate,nb_read_frames:format=duration -of json terry-moves/out/atdd-work-through-one-scenario-v8.mp4` | Both MP3s are 48 kHz and 149.064 s; narration mono, score stereo. Predecessor is 1080×1080, 30 fps, 4471 decoded frames, container duration 149.077333 s. It is source-worktree evidence, not a target-runtime baseline. |
| A supported Node wrapper is available for the target test command | `node --version`; `printenv NODE_ENV`; `nix develop -c node --version` | Ambient Node 24.5.0 is below `>=24.9.0`; `NODE_ENV=production`. Nix provides 24.21.0. Use the dev shell and `NODE_ENV=test` for Jest. No target `node_modules` exists yet. |
| Shared drawing dependencies need no whole-film substitution | `git diff 7c6f984 c379fd4 -- terry-moves/src/storyImpact/face.tsx terry-moves/src/storyImpact/pieces.tsx terry-moves/src/storyImpact/motion.ts terry-moves/src/storyImpact/caption.tsx terry-moves/src/storyImpact/layout.ts terry-moves/src/storyImpact/scene.ts terry-moves/src/parts/OddeLogo.tsx terry-moves/src/parts/OddeLogoInner.tsx terry-moves/src/video_components/AutonomousComponents/FlipCoin.tsx` | No differences for these consumed primitives. ATDD's source package and its installed older runtime still differ from target pins; source bundling does not establish target compatibility. |

`ATDD_SOURCE` in the observation commands denotes the source worktree path above,
not the owned execution checkout. The consumer searches and input-hash capture
were:

```sh
ATDD_SOURCE=/Users/terryyin/.codex/worktrees/atdd-short-film/terry-talks
rg -n -e SolutionTree -e ScenarioCircle -e circleArc -e sheetOrigin -e forkToCycle -e cycleToMerge -e roundedLine -e diamondPerson -e DiagramBoard -e ATDDFilm "$ATDD_SOURCE/terry-moves" --glob '*.{ts,tsx,mjs,sh,json}' -g '!node_modules/**' -g '!pnpm-lock.yaml'
rg -n -i 'atdd|scenariocircle|solutiontree|circlearc|diagramboard' "$ATDD_SOURCE/terry-moves/tests" "$ATDD_SOURCE/scripts"
rg --files "$ATDD_SOURCE" -g '*.feature' -g '*steps*' -g '!node_modules/**'
shasum -a 256 "$ATDD_SOURCE/ATDD/film-script.json" "$ATDD_SOURCE/terry-moves/public/assets/atdd/narration.mp3" "$ATDD_SOURCE/terry-moves/public/assets/atdd/score.mp3"
```

The first search returns the consumers listed above; the test/script and
feature/step searches return no matches. The fresh consumer probe was:

```sh
ATDD_SOURCE=/Users/terryyin/.codex/worktrees/atdd-short-film/terry-talks
"$ATDD_SOURCE/terry-moves/node_modules/.bin/tsx" -e '
const source="/Users/terryyin/.codex/worktrees/atdd-short-film/terry-talks";
const React=require(source+"/terry-moves/node_modules/react");
const {renderToStaticMarkup}=require(source+"/terry-moves/node_modules/react-dom/server");
const l=require(source+"/terry-moves/src/atdd/circleLayout.ts");
const {ScenarioCircle}=require(source+"/terry-moves/src/atdd/diagrams.tsx");
const before=renderToStaticMarkup(React.createElement(ScenarioCircle,{staticBoard:true}));
const origin=l.sheetOrigin(l.checkpoints[0]);
l.circle.x+=80; l.circle.radius+=40;
const after=renderToStaticMarkup(React.createElement(ScenarioCircle,{staticBoard:true}));
console.log({drawingChanged:before!==after,arcConsumed:after.includes(l.circleArc(0)),
  checkpoint:l.checkpoints[0],oldOriginRetained:after.includes(`translate(${origin.x} ${origin.y})`)});
'
```

The probe modifies module state only in its disposable process. It yielded
`drawingChanged: true`, `arcConsumed: true`, `oldOriginRetained: true`.

Unobserved current-state premise: the selectively incorporated source reproduces
on the target's React/Remotion/TypeScript pins. Settling this requires installing
dependencies and incorporating/bundling source in the owned checkout, so slice 1
is the early compatibility probe and stops all dependent slices on failure.
Do not downgrade packages or substitute unrelated source to manufacture success.
If mechanical adaptation within the selected closure suffices, verify it there;
if an engine/format or product-boundary decision is needed, stop that path.

Source invariants, captured before incorporation:

| Input | SHA-256 |
| --- | --- |
| `ATDD/film-script.json` | `1a672d63b2f30e1c7b0ec5d40ccbbea957ac5589daa0c1234a1bc04bb6a9ecea` |
| `public/assets/atdd/narration.mp3` | `5e7e009b11d643d3443d3899048aeb3dc20fab32ba0380ba755b311d65deaff1` |
| `public/assets/atdd/score.mp3` | `8b7868020d1ee4e20886bec9b7d5613c1212f832756ac0e9a1cc941a3f0cb077` |

## Proof ownership and verification

| Final promise | Owning slice | Observable proof |
| --- | --- | --- |
| Usable source, current runtime, existing films retained | 1 | Native bundle/registry, default boards and representative movie frames against source references; current test/type gate; owned target-runtime baseline. |
| Circle placement/radius, backlog and local-loop attachments/direction/labels (example 1) | 2 | Actual scene/static-board rendering from edited staging; independent outline/attachment invariants and native main/local-loop motion at full and 360px display. |
| Sheet/participant size, identities, 3/2 split, integrated fork, five-person reunion, clear lanes throughout motion (example 2) | 3 | Production scene frame sweep plus native split/rejoin playback and label/participant bounds; preserve states and identities through the journey. |
| Second meaningful diagram: tree hierarchy, moved/resized nodes, front-end/back-end trace, both probes and labels (example 3) | 4 | Rendered tree scene from edited staging; hierarchy/trace/probe invariants and native growing-tree playback. |
| Another edit uses the same authoring path, without per-revision repair (example 4) | 5 | Edit only the maintained staging input again, run the actual film and all diagram producers, and inspect their resulting artifacts. |
| Argument, narration, score, caption/state sequence, beat timing | 1 baseline, 5 final | Source file hashes and script equality; actual film stays 4471 frames/30 fps; decoded mixed audio equals the owned default baseline made with the same target runtime. |
| Preview, covers/miniatures, closing, shared SVG/PNG/film drawing | 2–4 affected consumers, 5 complete | Studio's actual registered film, native movie frames including covers/closing, and standalone SVG/PNG observations with unique resolved markers. |
| Direct frame seeking/replay | 2–4 | Actual scene markup/geometry for the same requested time is unchanged when times are visited out of order; verify seeking on the native preview in slice 5. |

Add high-level `tests/atdd/` specs that provide authored staging and time to the
production scene/boards. Do not stub the node poses, computed endpoints, routes,
or collaborators that the product promises to derive. Derive assertions from
identified relationships and rendered outlines, not a duplicate of the geometry
algorithm or whole-output snapshots. Use small pure-contract tests only for
meaningful boundary geometry not sufficiently observed by the scene specs.
Coverage of text and moving clearances also requires native observation; SVG
markup, helper tests, a successful bundle, or a final still alone cannot prove it.

From the owned checkout, after dependency setup in slice 1:

```sh
nix develop -c sh -c 'pnpm install --frozen-lockfile'
nix develop -c sh -c 'cd terry-moves && NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js tests/atdd --runInBand'
nix develop -c sh -c 'pnpm -C terry-moves exec tsc --noEmit'
nix develop -c sh -c 'pnpm -C terry-moves exec remotion compositions src/index.ts'
```

The new `tests/atdd` path is planned proof, not an already passing suite.
For slice 1, select an existing representative render suite such as
`tests/problemDecomposition/scenes.spec.tsx` before the new source regression
spec exists. Inspect setup/assertions and run all ATDD specs at each behavior
boundary; include affected consumers outside that suite if shared code changes.
Run `NODE_ENV=test pnpm moves test` inside the dev shell at incorporation and
completion: incorporation adds a registry/dependency closure, and final
reproduction changes its shared caller surface. This broader gate is a selected
local integration check using the README/package test command, not an inferred
CI rule. No hosted CI configuration was found in this checkout.

Each delivered slice follows installed `dough-execute-plan` proof acceptance,
fresh independent `dough-post-change-refactor`, affected generation, selective
formatting, owned staging/commit, and review. Current source formatting is
ESLint: use `pnpm -C terry-moves exec eslint --fix <owned changed src paths>`
to keep it selective, then `git diff --check`. No active Git commit hook was
found at preparation; recheck the actual hook contract before a future commit.
Do not introduce a hook as part of this story. Reuse accepted proof unless a
later edit invalidates its implementation, setup, consumer, or observation.

Native observation during execution uses `dough-manual-testing` under each
active slice, with the explicit bounded coverage and active budgets below.
Use existing Studio/render commands and saved media; retain observations in
this plan at delivery, not a separate execution log. Generated artifacts come
from their generators. Planning does not render new media or run implementation.

The actual producer and encoded-media proof commands after slice 1 wires them:

```sh
nix develop -c sh -c 'pnpm -C terry-moves render:atdd'
nix develop -c sh -c 'pnpm -C terry-moves diagrams:atdd'
ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=width,height,r_frame_rate,nb_read_frames:format=duration -of json terry-moves/out/atdd-restaged.mp4
ffmpeg -v error -i terry-moves/out/atdd-restaged.mp4 -f null -
ffmpeg -v error -i terry-moves/out/restaging/default.mp4 -map 0:a:0 -vn -c:a pcm_s16le -f hash -hash sha256 -
ffmpeg -v error -i terry-moves/out/atdd-restaged.mp4 -map 0:a:0 -vn -c:a pcm_s16le -f hash -hash sha256 -
```

The two decoded-audio hashes must match. Reuse the captured source input hashes;
repeat those checks in the owned checkout before final acceptance. Read/watch
the generated artifacts at their named paths; these are future proof commands,
not assertions that an output already exists in this preparation workspace.

## Ordered slices

### 1. The existing ATDD diagrams reproduce on the current toolchain
Type: Structure
Status: planned

Internal change: selectively incorporate the committed source closure and wire
its film, boards, saved media, and diagram producers into current Terry Moves.
Preserve all existing registry entries, commands, pins, and shared film code.
This is the early target-compatibility probe and enables slice 2 immediately.
Establish a source-linked default-staging regression baseline before geometry
changes. Keep its captured output under owned `terry-moves/out/restaging/` for
later comparison; leave the predecessor in the source worktree unchanged.

Proof: install through the current lockfile in the dev shell, typecheck, and run
the integration gate. Bundle/list the actual registry; observe ATDD's three
compositions and retain existing composition IDs/durations from this checkout.
Render the unchanged full ATDD film and both diagram formats through the actual
carried producers. Check 4471 video frames/30 fps, source hashes, and media decode;
compare source-linked circle/tree, local-loop, split/rejoin, and cover/closing
appearance. Store this target-runtime default film as the audio/timing
predecessor for slice 5. Manual coverage: source reproduction breadth and native
media playback, 6 active minutes with one minute reserved for confirmation.

Stopping point: unchanged original ATDD is usable on the current toolchain;
no restaging success is claimed. A compatibility or native-media failure stops
dependent slices and triggers reassessment; a passing source-worktree bundle is
not a substitute for this proof.

### 2. Terry moves the circle and backlog without repairing their connectors
Type: Behavior
Status: planned

Behavior: given the reproduced circle, Terry edits the maintained staging inputs
for circle center/radius, sheet placement/size, and backlog placement. The circle's
nodes, common arcs, attached labels/badges, backlog entry/next routes, and the
first external local-loop/return lanes follow the new staging through their
existing reveal/compact/focus motion. Derive outline clearance from the drawn
sheet shape and size, preserving tangent markers and authored directed topology.
Expose this staging through the existing scene/board drawing, rather than adding
layout recognizers or manually restaging a second coordinate list.

Proof: the ATDD high-level suite observes baseline and edited layouts at existing
main-cycle/local-loop times, current node outlines/attachments, clockwise arcs,
direction, and label reservations. It visits times out of order. Native preview
compares the main-cycle/local-loop journey and completed board at full and 360px
display. Check the relevant miniature/static callers. Manual coverage: main
cycle, compact backlog, first local loop/return, 5 active minutes including one
minute for a second authored edit or a suspected clearance collision.

Stopping point and interim behavior: restaging is demonstrated for the circle
board and main/local-loop journey. The split/reunion's fixed collaborator lanes
are not yet a supported revised journey; slice 3 replaces those fixed landmarks
before the revised staging is selected as the complete film default. The default
full film remains at the coherent source staging in this interval. Do not add
frame-rejection gates to encode this temporary delivery boundary.

### 3. Resized sheets and collaborators keep the split and reunion readable
Type: Behavior
Status: planned

Behavior: given the restaged circle, Terry changes a sheet's and a participant's
size. The integrated fork/merge and five collaborators use identified node and
lane landmarks from the same current pose. The failed scenario still branches
to unfinished finishing work on the left and local front-end TDD on the right;
three people take the front-end route, two finish, and all five reunite by the
completed sheet. Label/badge reservations and participant footprints remain
clear along the authored approach lanes, including the staged return through
the sheet gap. Camera focus/zoom follows the revised content without changing
the authored timing or creating another copy of the circle.

Proof: extend the same production-scene suite over the split/reunion frame
intervals, recording identities, states, current outline attachments, and
participant/label clearance. Assert the journey's semantic order rather than
only the end pose. Observe native split, finishing-before-finished, pre-pass
merge, all-green reunion, and restored circle at full and 360px display.
Manual coverage: those transitions and enlarged actor/sheet clearance, 6 active
minutes including one minute for confirmation. Run the whole focused ATDD suite.

Stopping point: the revised circle is a complete usable animated diagram,
including its collaboration, without a later tree or generic layout system.
Remove slice 2's limited revised-journey boundary and select the coherent revised
circle through the same maintained staging input.

### 4. Terry restages the solution tree while its scenario and probes follow
Type: Behavior
Status: planned

Behavior: given the existing solution tree, Terry widens the front-end box and
moves the back-end branch and descendants through the same staging-authoring
responsibility. Parent/child connections follow current box edges and dimensions;
labels remain attached. The green scenario path and cursor still descend through
front-end detail, return, cross to the back end, and descend into back-end detail.
The end-to-end and internal test probes retain their distinct attachments and
meanings. Express route landmarks relative to identified nodes and authored
lanes, with endpoint-preserving rounded bends; no second list of copied box
positions. Reuse the circle's suitable outline/attachment responsibilities and
keep the tree's hierarchy/traversal rule explicit.

Proof: the same ATDD suite renders `ATDDScene` during the growing-tree scene and
`DiagramBoard` from baseline and edited staging. Observe unchanged hierarchy and
trace order, current edge attachments, the cursor's actual rendered route, probe
attachments, and label reservations. Native playback covers the complete
front-end return/cross-layer/back-end path and both probes; inspect the exported
board and cover miniature. Manual coverage: growing-tree motion and labels,
5 active minutes including one minute for confirmation. Run the focused suite,
typecheck, and any newly affected shared consumers.

Stopping point: both meaningful diagram examples can be restaged through one
coherent authoring responsibility, with appropriate different routing rules.
No broad graph solver, hierarchy whitelist, or separate tree-only restaging
engine is justified by this second example.

### 5. Another staging edit reaches the film and every diagram output
Type: Behavior
Status: planned

Behavior: given both revised examples, Terry edits their maintained staging data
again and runs the same documented preview/render/export commands. The registered
film, covers/closing, static SVGs, and PNGs all consume that second edit through
the shared drawing. This proves the authoring/reproduction round trip rather
than leaving only a test fixture or a one-off successful preview. Keep the
original source media/script and the owned default comparison intact.

Proof: capture the second edit's owned diff and confirm it contains staging data
only, with no repaired paths, arrowhead angles, text positions, or collaborator
waypoints. Run the actual film producer and complete diagram shell producer;
inspect both SVGs and PNGs, including resolved unique marker IDs and actual
typography, and watch the relevant encoded tree/main/local/split/rejoin intervals
at full and 360px display. Seek the native film out of sequence. Compare the full
result with slice 1's same-runtime default: unchanged script/media hashes,
4471 frames at 30 fps, identical decoded audio, and unchanged captions/state
timing. Decode the final movie completely. Run the integration gate and leave
feature-local authoring/reproduction guidance with the maintained ATDD material.
Manual coverage: complete output breadth plus two revised motion journeys,
8 active minutes including two minutes for recovery/confirmation. Completion
requires these actual consumer observations; command exit or markup alone fails
this proof obligation.

Stopping point: Terry retains watchable, reproducible, repeatedly revisable
diagrams, their saved assets and source fidelity, and an authoring path documented
without planning identifiers in product code. Further style or engine work can
be cancelled without losing this value.

## Cumulative design and preparation review

The common rule is forward derivation of owned geometric relationships from
identified nodes and the current pose. The circle, its collaborators, and the
tree extend that rule; they do not add recognizers for specific fixture layouts.
Circle arcs and hierarchical traversal remain different because their route
meanings differ, not because different slices own them. Use no universal scene
format or speculative future-story structure.

The source-incorporation Structure slice isolates an observed version/integration
risk and immediately enables circle restaging. Main-circle revision, collaboration
clearance, second-diagram traversal, and the real reproduction round trip each
have one externally evaluable boundary and one focused proof loop. Slice 2's
interim journey is explicit and replaced by slice 3; the unchanged default remains
usable. Native output fidelity and source preservation have owning proof rather
than being inferred from a generic geometry test.

No further slice-plan refinement pass was needed after constructing these
boundaries: none combines independent outcomes or fragments one result by files,
layers, or testing activity. No remaining slice-specific concern was identified.
Target-runtime source compatibility remains explicitly owned by the early probe
in slice 1; it is not claimed observed. All promised final behavior is mapped.
Readiness assessment belongs to the shared preparation recorder and grants no
execution or publication authority.
