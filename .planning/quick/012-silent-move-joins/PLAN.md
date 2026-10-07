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
  Slice 2 accepted: `ce49a406c371f7b2fa787aa73d0f3c6ec83cfc2f` (CI unobserved).
  Slice 3 accepted: `a40c14fe5b20222c0c214c1924b8b409ccb949fa` (CI unobserved).
  Slice 4 accepted: `5d3db3af22f4f06e73aa6932d31f82d1be194b42` (CI unobserved).
  Slice 5 accepted: `8db6c61a4f5be498d18d4c5d0d29d830a42058f9` (CI unobserved).
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

Accepted proof (same worktree, commands from `terry-moves/`):
- `nix develop -c sh -c 'NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js tests/silentScene'`: 2 suites/11 tests passed. `joins.spec.ts` uses actual authored/reordered entries and observes contiguous ranges, adjacent poses, travel targets, hop lift/settling, all hold frames, silence and finite tiny-positive moves (travel 2/hop 3/hold 1 frames). `scene.spec.tsx` samples first/middle/last poses and derives actual world hand vs wrench translation, lifted feet and absence of text; setup compiles those scripts.
- `nix develop -c sh -c 'NODE_ENV=test pnpm exec tsc'`: pass.
- `nix develop -c sh -c 'NODE_ENV=test pnpm exec remotion compositions src/index.ts'`: 23 compositions, SilentScene 30 fps/1080×1080/123 frames; real Root/metadata wiring. Chrome Studio loaded and rendered frame 7 without captions at `http://localhost:3000/SilentScene`; Terry's subjective evaluation remains pending.
- Independent refactor: none; all accepted boundaries unchanged.

### 3. An explicit cut relocates the actor without travel
Type: Behavior
Status: done

Behavior: a `cut to <place>` move becomes a one-frame beat at that place;
the following move starts from there. With `cut to door` inserted between
the hop and the last travel of the reordered script, the Engineer is at the
door on the cut's frame with no travel across, the last travel runs
door→desk, and the scene is one frame longer (story example 2). The wrench
follows across the cut.

Accepted proof (same worktree, commands from `terry-moves/`):
- `nix develop -c sh -c 'NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js tests/silentScene'`: 2 suites/14 tests passed, including after refactoring. `joins.spec.ts` compiles the authored cut sequence, observing ranges 60/18/1/45, frame 77 at window, 78/79 at door and 123 at desk; independent original/reordered fixtures still prove 123 frames. `scene.spec.tsx` derives real world hand vs wrench at cut/neighbors and sampled beats, no text.
- `nix develop -c sh -c 'NODE_ENV=test pnpm exec tsc'`: pass before/after refactor.
- `nix develop -c sh -c 'NODE_ENV=test pnpm exec remotion compositions src/index.ts'`: 23 compositions, SilentScene 124 frames; duration/registration boundaries unchanged by refactor. Chrome Studio showed the door pose at frame 78.
- Refactor consolidated compiler destination state; tiny expectations now use their own fixture. Inspected edits and rerun observations preserve joins and attachment.

### 4. An invalid script reports the move and the problem before rendering
Type: Behavior
Status: done

Behavior: compiling a script whose move names an unknown place, an unknown
actor, an unknown move kind, or a duration ≤ 0 fails with one message naming
the 1-based move, the move itself, and the problem, in the form recorded
under decisions. Studio and the CLI show that message instead of a picture
(story example 4). Replaces the interim behavior.

Accepted proof (same worktree, commands from `terry-moves/`):
- `nix develop -c sh -c 'NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js tests/silentScene'`: 3 suites/39 tests passed before/after refactor. `validation.spec.ts` drives public compileScene with independent story fixtures, exact move 3 kitchen error, unknown actor/kind/start/cut, own-place names, first-error order and finite positive durations; actual valid script remains 124 frames. Join/render consumers all passed.
- `nix develop -c sh -c 'NODE_ENV=test pnpm exec tsc'`: pass before/after refactor.
- `nix develop -c sh -c 'NODE_ENV=test pnpm exec remotion compositions src/index.ts'`: temporarily changing actual final travel to kitchen gives expected exit 1, move 4 kitchen error at calculateMetadata; exact restoration gives exit 0 and SilentScene 124 frames. Repeated after compiler refactor. Studio showed the error before any scene picture with disabled playback; StoryImpactOneSplash remained usable (frame 0→1). CLI aggregate listing fails globally. Only the temporary tab was closed.
- Refactor gave destination classification, move descriptions and supported-kind names one compiler definition; inspected unchanged test assertions and rerun metadata signals preserve behavior.

### 5. Terry renders and revises the scene through the documented path
Type: Behavior
Status: done

Behavior: `terry-moves/package.json` gains `render:silent-scene` (H.264,
yuv420p, like the other films, plus a poster still). `terry-moves/README.md`
gains a short "Silent scene" section: where the script is, the supported
moves and the cut, the join rule, the feedback, and the preview and render
commands. A revision is a script edit and the same render.

Accepted proof (same worktree, commands from `terry-moves/`):
- `nix develop -c sh -c 'NODE_ENV=test pnpm render:silent-scene'`: three terminal passes on default script, actual swapped first/final travel entries (hop/cut retained), and exactly restored script. Both revised outputs retained; final default MP4/poster match restored source.
- `/opt/homebrew/bin/ffprobe -v error -show_entries stream=codec_type,codec_name,width,height,pix_fmt,r_frame_rate,avg_frame_rate,nb_frames,color_space,color_transfer,color_primaries -show_entries format=duration -of json out/silent-scene.mp4` and `/opt/homebrew/bin/ffprobe -v error -show_entries stream=codec_type,codec_name,width,height,pix_fmt,r_frame_rate,avg_frame_rate,nb_frames,color_space,color_transfer,color_primaries -show_entries format=duration -of json out/silent-scene-reordered.mp4`: both 124 frames, 30/1 fps, 1080 square, H.264/yuv420p/BT.709, 4.133333 seconds, only video/no audio. Both PNG posters are 1080 square; inspected default desk vs revised window, wrench attached/no captions.
- `nix develop -c sh -c 'NODE_ENV=test pnpm test'`: 36 suites/368 tests, eslint/tsc passed. Public joins/render/validation observations and existing film consumers retained. One worker teardown warning appeared, absent in slice 1; cause unclassified. `nix develop -c sh -c 'NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js tests/silentScene --detectOpenHandles'`: 3 suites/39 tests passed with no open-handle diagnostics; does not explain the full-gate warning.
- Script restored byte-for-byte (SHA256 `926ff00266d0938822544c3e2a6b8f84ccdeacf37d0f345b712ff45aaa0ea25c`); owned temporary backups removed. Terry's subjective evaluation remains unobserved.
- Independent refactor extracted preserved Story Impact guidance to `Story Driven/README.md` with qualified paths/commands and a link; documentation-only, all accepted runtime proof unchanged. Read-only link/path checks and whitespace passed.

## Execution complete

Product advice: keep the queue unchanged. Numeric continuation meets this
bounded one-actor story; the next queued story, preserving an approved film
during a focused revision, remains relevant. Broader motion or staging promises
need their own examples and Terry's evaluation of this authoring path.

Retrospective: all five planned slices delivered, reviewed as the uncontaminated
aggregate from the claim through the five accepted revisions listed above.
No correction or refactoring residue established; existing Story Impact pacing
and other film contracts remain covered. No new automated E2E tests drove
development; proof combines public compiler/render tests with actual
Studio/CLI/export observations. The suite retains distinct old subtitle, motion and film
contracts; no evidence supports consolidation here. Process review skipped by
project default. Plan unchanged apart from evidence/completion records.
Limits: full-gate worker teardown warning unclassified; focused open-handle
diagnostic found none. Terry's subjective evaluation remains unobserved.
CI unavailable: no workflow/adapter or observer armed, so no observer shutdown
is required. Local accepted proof is retained; no CI success is claimed.

## Current decisions

- Timing policy for this scene is the moves' own durations; no reading pace.
- One actor, one attached prop, places as stage points; no regions.
- Feedback is a thrown `Error` from compilation with the recorded message
  form, raised before any frame renders.

## Learnings

- Run jest in the nix dev shell with `NODE_ENV=test` (see toolchain above).
