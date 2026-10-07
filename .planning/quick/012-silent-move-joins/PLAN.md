# Terry assembles and rearranges a silent animated scene whose moves connect

Source: [story](../../../terry-moves/seed.md#silent-move-joins).
Identity: `terry-moves-filmmaking#silent-move-joins`

## Goal and scope

Terry directs, reorders and exports a short silent scene through an ordered
script of supported moves. Each move joins the previous end position and next
frame without captions, offsets or manual repair. The authoring path is primary.

- Included: one actor/start place/named places; travel over a duration, settled
  in-place hop, constant hold, and one-frame cut without interpolation.
  Duration follows the list. Travel starts at the previous position; hop/hold
  retain it. The Engineer's wrench follows its hand every frame without moves.
  No caption text, placeholders or caption line. Unknown actor/move/place or
  non-positive duration names the move/problem before rendering. Studio preview,
  existing render export, and script-edit revision are required.
- Deferred: acquiring/releasing props (story 5), expressive intentions (R08),
  regions/anchors (R04), second actor/interactions, audio, Studio write-back,
  existing-film migration, caption pacing. Optional captions remain available
  through the reused beat model, unverified here.
- Assumptions: new scene, Engineer/wrench, three named places, empty stage,
  1080×1080 at 30 fps. Another actor/prop would follow the same path.
- Key examples: story examples 1–4; proof ownership is mapped below.

## Execution context and decisions

- **Execution:** established Story Branch start, publisher
  `dashboard-territory.local-terry-talks`, agent Mihiro-chan; workspace
  `/Users/terryyin/git/terry-talks/.worktrees/i-can-assemble-and-rearrange-a-silent-animated-s`,
  branch `codex/i-can-assemble-and-rearrange-a-silent-animated-s`.
  Starting revision `fe5919a1cfce79b3112e8d9f764a7ff7b4cb1492`; claim
  `5cb4dd4de4470e5dca8994e7e4ec77269a9aaf32` confirmed on origin/master
  and the remote execution branch. Increments publish to that execution branch.
  Slice 1 accepted: `69065414d758130aebdc10632fa36757fab333fd` (CI unobserved).
- **Checkout setup:** `nix develop -c sh -c 'pnpm install --frozen-lockfile && NODE_ENV=test pnpm -C terry-moves exec tsc'`
  passed in this exact workspace with the current lockfile. No active Git hooks;
  the affected component's formatter is `pnpm terry-moves:format`.
- **CI:** no `.github/workflows` or configured `.planning/open-dough.json`
  CI adapter exists. Push CI observation is unavailable; no observer armed.
  The trunk claim is unobserved. Local planned proof remains required.
- **Replanning:** existing planning authority retained. No numeric slice budget
  is configured; use cohesive Behavior/Structure boundaries and safe stops.
- **Plan location:** `.planning/quick/`. 011 was the highest allocated
  entry, so this plan is 012. Slice statuses: planned, in-progress, done.
- **No ADR or North Star applies.** Only ADR-0000 (use ADRs) exists.
- **Verification gate:** `terry-moves/package.json` `test` is jest, eslint,
  and tsc (`pnpm moves test` from the repo root, as the README documents).
  Local proof per slice is the focused jest spec plus tsc; the whole gate
  runs at slice 1 (a shared type changes) and slice 5 (story complete).
- **Toolchain:** shell Node 24.5 is below the `>=24.9` floor and fails
  old-engine `three` imports. Nix supplies Node 24.21. Use `NODE_ENV=test`
  because the shell's production React cannot run testing-library's act:
  from `terry-moves/`, `nix develop -c sh -c 'NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js tests/<spec>'`
  and `nix develop -c sh -c 'NODE_ENV=test pnpm test'` for the gate.
  Bundle/list with `pnpm exec remotion compositions src/index.ts` in Nix.
  Checkout dependencies use `pnpm install --frozen-lockfile`; Remotion downloads
  its headless shell on first use.
- **PFE (existing solutions):** reuse by modularizing Story Impact's
  `src/storyImpact/film.ts` pose-bound Beat/timeline arithmetic; keep its pacing
  and exports. Consumers: `laterStories.ts`, `endingBeats.ts`, `readingPace.ts`,
  `fullFilm.ts`, film composition wrappers and Story Impact specs.
  Do not use/migrate `src/models/Subtitles.ts`: it requires text and offset
  arithmetic; `InterpolatesOfField` treats a prior zero as absent.
  Reuse Engineer (`actors.tsx`, feet anchor/local hand targets/data-hand),
  Wrench (`props.tsx`, stage coordinates), and `Protection.tsx`'s wrist/reach
  pattern. Reuse `motion.ts` travel smoothstep and gesture settled return.
  Follow `StoryImpactOneSplash.tsx` pose sampling and Root registration;
  `tests/aiTestAutomation/acting.spec.tsx` supplies world-hand test patterns.
- **Script form:** a TypeScript module `terry-moves/src/silentScene/script.ts`
  exporting the authored scene as a typed literal; Terry rearranges its
  `moves` array. Places are a record of stage points. Runtime validation
  owns the feedback (slice 4), so the type system is a convenience, not the
  contract.
- **Scene pose:** `{ x, y, lift }` for the actor's feet point and hop
  height. The picture derives the hand and wrench from it. No squash.
- **Compilation:** `compileScene(script)` folds the moves from the starting
  place: each move's start state is the previous move's end state; it
  yields shared `Beat`s (travel: smoothstep from start to place; hop: lift
  by `gesture`; hold: constant; cut: a one-frame beat at the place) and the
  shared `timeline()` over them. Seconds round to whole frames, with at least
  two frames for travel, three for hop (visible lift and settled endpoints),
  and one for hold/cut.
- **Feedback form:** one `Error` per first problem, naming the 1-based move
  index and the move, e.g.
  `move 3 (travel to kitchen): unknown place "kitchen"; places are door, desk, window`.
  Unknown actor, unknown move kind, and non-positive duration read the same
  way. Prefer compiling inside the composition's `calculateMetadata` so an
  invalid silent scene fails only its own composition in Studio; if Remotion
  cannot isolate it, failing at module load is acceptable, since the story
  forbids a silently wrong picture, not a loud stop.
- **Interim behavior:** until slice 4, an invalid script throws an
  unhelpful error or draws a wrong place; slice 4 replaces that.

## Baseline and proof ownership

Preparation at `8c5544d` established back-to-back beat frames with `pose(1)`
then `pose(0)`, captionless pacing unchanged, and Engineer hand observability.
Story Impact owned all Beat/timeline consumers (listed in PFE). Full Jest
passed 33 suites/329 tests at Node 24.21; eslint and tsc passed. Remotion listed
22 compositions, OneSplash 2121 frames and Film 3852, plus the known unrelated
quillustration 404. At 30 fps, 1.5 + 0.6 + 2 seconds yields 123 frames;
a one-frame cut yields 124. Shell Node 24.5 failed old-engine ESM tests.

Promises and observations are owned by the ordered slices: Story Impact
preservation (1); reorder/timing/position, wrench, silence and Studio preview
(2); cut and wrench neighbors (3); invalid-input tests and CLI feedback (4);
export and script revision (5). Story examples 1/3 map to slice 2, example 2
to slice 3, and example 4 to slice 4. Terry's preview/revision evaluation
remains a human evaluation; automated observations are specified below.

## Ordered slices

### 1. A pose-generic beat timeline shared outside Story Impact
Type: Structure
Status: done

Internal change: move `Beat`, `beat`, and the arithmetic of `timeline()`
(`durationInFrames`, `beatRange`, `poseAt`, `captionAt`) into a shared
module generic over the pose type, without reading pace. `storyImpact/film.ts`
re-exports `Beat` bound to its `Pose`, keeps `squeezed`, and defines its
`timeline(authored)` as the shared timeline over `paced(authored)`. No
consumer import changes. Enables slice 2.

Proof:
- `tests/storyImpact` suite green; `npx tsc` and `npx eslint src` clean.
- `npx remotion compositions src/index.ts` still lists `StoryImpactOneSplash`
  at 2121 frames and `StoryImpactFilm` at 3852.
- The whole gate (`pnpm test` in the dev shell) green, since a shared type
  moved.

Accepted proof (execution worktree, commands from `terry-moves/`):
- `nix develop -c sh -c 'NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js tests/storyImpact'`: 11 suites/128 tests passed. Inspected `StoryImpactOneSplash.spec.tsx` beat sums/caption order/rendering, `readingPace.spec.ts` caption spans/end poses, and `StoryImpactFilm.spec.tsx` shared poses/durations/breaths; existing authored beats are setup.
- `nix develop -c sh -c 'NODE_ENV=test pnpm exec tsc'`: pass.
- `nix develop -c sh -c 'NODE_ENV=test pnpm test'`: 33 suites/329 tests, eslint and tsc passed; all known consumers run.
- `nix develop -c sh -c 'NODE_ENV=test pnpm exec remotion compositions src/index.ts'`: pass, 22 compositions, OneSplash 2121 and Film 3852 frames. Existing Root/index registration is setup.
- Independent product refactor: none; accepted boundaries unchanged.

### 2. Terry previews a silent scene whose reordered moves connect
Type: Behavior
Status: done

Behavior: `src/silentScene/script.ts` holds the authored scene (Engineer
with wrench, starts at `door`; places `door`, `desk`, `window`; moves:
travel to `desk` 1.5 s, hop 0.6 s, travel to `window` 2 s).
`compileScene` folds the moves into shared beats and a timeline.
`SilentScene.tsx` draws a plain stage, the Engineer at the pose (lifted on a
hop), and the wrench at the hand. `stories/SilentSceneFilm.tsx` registers
composition `SilentScene`, 1080×1080 at 30 fps, duration from the timeline.
Terry reorders the moves to travel to `window`, hop, travel to `desk`; the
first travel runs door→window, the hop happens at the window, the last
travel runs window→desk, each starting the frame after the previous ends
(story examples 1 and 3).

Proof:
- `tests/silentScene/joins.spec.ts`: for the authored order and the reordered
  script, `poseAt` at each beat's first frame equals the previous beat's last
  frame position; travel ends at its place; hop starts and ends at the same
  point with `lift` 0 and a positive lift mid-beat; hold is constant;
  `durationInFrames` is 123.
- `tests/silentScene/scene.spec.tsx`: on sampled frames of each beat the
  wrench's translate equals the Engineer's world hand point (as
  `acting.spec.tsx` derives it); no element with caption text or a caption
  test id exists.
- `npx remotion compositions src/index.ts` lists
  `SilentScene 30 1080x1080 123 (4.10 sec)`.
- Terry opens `SilentScene` in Studio and scrubs it (evaluation).

Accepted proof (same worktree, commands from `terry-moves/`):
- `nix develop -c sh -c 'NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js tests/silentScene'`: 2 suites/11 tests passed. `joins.spec.ts` uses actual authored/reordered entries and observes contiguous ranges, adjacent poses, travel targets, hop lift/settling, all hold frames, silence and finite tiny-positive moves (travel 2/hop 3/hold 1 frames). `scene.spec.tsx` samples first/middle/last poses and derives actual world hand vs wrench translation, lifted feet and absence of text; setup compiles those scripts.
- `nix develop -c sh -c 'NODE_ENV=test pnpm exec tsc'`: pass.
- `nix develop -c sh -c 'NODE_ENV=test pnpm exec remotion compositions src/index.ts'`: 23 compositions, SilentScene 30 fps/1080×1080/123 frames; real Root/metadata wiring. Chrome Studio loaded and rendered frame 7 without captions at `http://localhost:3000/SilentScene`; Terry's subjective evaluation remains pending.
- Independent refactor: none; all accepted boundaries unchanged.

### 3. An explicit cut relocates the actor without travel
Type: Behavior
Status: planned

Behavior: a `cut to <place>` move becomes a one-frame beat at that place;
the following move starts from there. With `cut to door` inserted between
the hop and the last travel of the reordered script, the Engineer is at the
door on the cut's frame with no travel across, the last travel runs
door→desk, and the scene is one frame longer (story example 2). The wrench
follows across the cut.

Proof:
- `joins.spec.ts`: the frame before the cut is at the window, the cut frame
  is at the door, the next frame begins the door→desk travel;
  `durationInFrames` is 124.
- `scene.spec.tsx`: the wrench is at the hand on the cut frame and its
  neighbors.
- `remotion compositions` lists `SilentScene` at 124 frames.

### 4. An invalid script reports the move and the problem before rendering
Type: Behavior
Status: planned

Behavior: compiling a script whose move names an unknown place, an unknown
actor, an unknown move kind, or a duration ≤ 0 fails with one message naming
the 1-based move, the move itself, and the problem, in the form recorded
under decisions. Studio and the CLI show that message instead of a picture
(story example 4). Replaces the interim behavior.

Proof:
- `tests/silentScene/validation.spec.ts`: travel to `kitchen` reports
  `move 3 (travel to kitchen): unknown place "kitchen"; places are door, desk, window`;
  duration 0, unknown actor, and unknown move kind each report their move
  and problem; the valid script compiles.
- With the script temporarily set to travel to `kitchen`,
  `npx remotion compositions src/index.ts` prints the message; the edit is
  reverted. Record whether `calculateMetadata` isolated the failure to
  `SilentScene`.

### 5. Terry renders and revises the scene through the documented path
Type: Behavior
Status: planned

Behavior: `terry-moves/package.json` gains `render:silent-scene` (H.264,
yuv420p, like the other films, plus a poster still). `terry-moves/README.md`
gains a short "Silent scene" section: where the script is, the supported
moves and the cut, the join rule, the feedback, and the preview and render
commands. A revision is a script edit and the same render.

Proof:
- `pnpm render:silent-scene` writes `out/silent-scene.mp4`; `ffprobe` (or
  Remotion's output) reports 124 frames at 30 fps.
- The whole gate (`pnpm test` in the dev shell) is green.
- Terry reorders two moves, re-renders, and watches the joins (evaluation).

## Current decisions

- Timing policy for this scene is the moves' own durations; no reading pace.
- One actor, one attached prop, places as stage points; no regions.
- Feedback is a thrown `Error` from compilation with the recorded message
  form, raised before any frame renders.

## Learnings

- Run jest in the nix dev shell with `NODE_ENV=test` (see toolchain above).
