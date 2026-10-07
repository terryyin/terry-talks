# Restaging source and preparation evidence

Part of the [executable plan](PLAN.md); preparation observations are separate
from accepted execution proof.

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
