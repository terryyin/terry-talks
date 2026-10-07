# Restaging proof contract

Part of the [executable plan](PLAN.md); retain these mappings and literal
commands when accepting a slice.

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

## Slice 1 accepted proof

- Incorporated the selected `c379fd4` closure, leaving dependency pins/lockfile
  and original registry entries intact. Source code matches except removal of
  unused `storyboardSeconds`. Transcript topic files preserve every timestamped
  utterance; joined SHA-256 is
  `9a377b008b27d59941112e21ea7f33d166339d9227086a048cf35a7fa0025343`.
- The focused ATDD command above passed seven actual scene/board tests in
  `terry-moves/tests/atdd/scenes.spec.tsx`; inspected setup/assertions observe
  source timing, uneven tree/two probes, clockwise sheets/local loops, cue
  states, five identities through 3/2 split/reunion, miniatures and captions.
  `nix develop -c sh -c 'NODE_ENV=test pnpm moves test'` passed 44 suites,
  439 tests, package lint and TypeScript. The typecheck and registry commands
  above passed; native registry retains all 23 existing IDs/durations and adds
  the 4471-frame/30-fps film plus two stills.
- Actual `render:atdd` and complete `diagrams:atdd` commands above passed.
  Both native PNGs match source bytes; circle SVG has 17 unique/resolved marker
  references. Coordinator inspected actual board typography/relationships.
  Owned `terry-moves/out/restaging/default.mp4` is 1080×1080, 4471 decoded
  frames at 30 fps; full ffmpeg video/audio decode passed. Script and MP3 hashes
  match the three source invariants in source-evidence.md.
- Native Studio playback observed tree/probes, local loop, split/unfinished
  sheet, all-five/all-green reunion, cover and closing. QuickTime played the
  exact owned default movie through 94.899→102.400→123.597 seconds, confirming
  encoded split/restored-circle motion and clear heading/caption/logo. Manual
  result: Good. No auditory listening claim. Studio remains available at
  `http://localhost:3000/ATDDFilm` (session 38942, Chrome tab 137231878).
- Independent refactor completed; only a dead export and document structure
  changed. Its typecheck passed; original scene/output/native proof is reusable.
  Selective source ESLint formatting passed. Original automatic-transcript
  whitespace is preserved and excluded from the whitespace check.
