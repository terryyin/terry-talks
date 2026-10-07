# Terry assembles and rearranges a silent animated scene whose moves connect

Source: [story](../../../terry-moves/seed.md#silent-move-joins).
Identity: `terry-moves-filmmaking#silent-move-joins`

## Goal and scope

- **Goal:** Terry directs a short silent scene as an ordered list of
  supported moves for one actor, reorders the list, and exports the scene.
  The next move always starts where and when the previous one ended, with no
  subtitle placeholders, offset arithmetic, or manual boundary repair. This
  is the first test of the promise that rearrangeable actions connect
  naturally; the authoring path matters more than the scene's art.
- **Included:**
  - A scene script: one actor, its starting place, named places, and an
    ordered list of moves. Supported moves: travel to a place over a
    duration, hop (in place, returns to the settled state), hold for a
    duration, and cut to a place.
  - Timing joins: moves play in list order, each starting the frame after
    the previous one ends; the scene length follows from the moves.
  - Position joins: a travel starts from wherever the previous move left the
    actor; hop and hold keep that position; the first move starts at the
    starting place.
  - Cut: the actor is at the named place on the cut's first frame, with no
    travel; nothing interpolates across it.
  - Attached prop: the Engineer carries a wrench drawn at the hand on every
    frame, with no script entries of its own.
  - Silence: no caption text, no placeholder, no caption line in the output.
  - Feedback: an unknown actor, move kind, or place, or a non-positive
    duration, is reported naming the move and the problem before any frame
    renders.
  - Preview in Remotion Studio and export with the existing render path; a
    revision is a script edit and the same render.
- **Excluded (story's deferred promises):** acquiring or releasing the prop
  (story 5); expressive motion intentions (R08); named regions or anchors
  beyond named places (R04); a second actor or actor interaction; audio;
  Studio visual editing that writes back to the script; migrating existing
  films to this script; caption pacing (a captioned beat stays naturally
  supported through the reused beat model, unverified here).
- **Assumptions:** the first scene is new, with the AI Test Automation
  Engineer carrying a wrench, between three named places on an empty stage,
  1080×1080 at 30 fps like Story Impact. Another actor or prop would use
  the same path.
- **Key examples:** see the story (1–4). Each maps to a slice under
  [proof ownership](#proof-ownership).

## Execution context and decisions

- **Plan location:** `.planning/quick/`. 011 was the highest allocated
  entry, so this plan is 012. Slice statuses: planned, in-progress, done.
- **No ADR or North Star applies.** Only ADR-0000 (use ADRs) exists.
- **Verification gate:** `terry-moves/package.json` `test` is jest, eslint,
  and tsc (`pnpm moves test` from the repo root, as the README documents).
  Local proof per slice is the focused jest spec plus tsc; the whole gate
  runs at slice 1 (a shared type changes) and slice 5 (story complete).
- **Toolchain (observed):** the shell's Node is 24.5, below the project's
  `>=24.9` floor, and jest then fails to load `three` in the old-engine
  specs. Run jest and the gate inside the flake dev shell, which has Node
  24.21, and with `NODE_ENV=test`, because this shell exports
  `NODE_ENV=production`, under which `@testing-library/react` renders fail
  with `React.act is not a function`:

  ```bash
  cd terry-moves
  nix develop -c sh -c 'NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js tests/<spec>'
  nix develop -c sh -c 'NODE_ENV=test pnpm test'     # the whole gate
  npx remotion compositions src/index.ts              # bundles; lists compositions
  ```

  `pnpm install --frozen-lockfile` was run in this worktree (node_modules is
  gitignored); Remotion downloaded its headless shell on first use.
- **PFE (existing solutions):**
  - **Beat timeline (reuse by modularizing):** Story Impact's
    `src/storyImpact/film.ts` already owns named beats with seconds, an
    optional caption, and a pure pose function, plus `timeline()` with
    `poseAt`, `beatRange`, and `captionAt`. Its `Beat.pose` is bound to
    Story Impact's `Pose`, and its `timeline()` applies the caption reading
    pace `paced()`. Slice 1 lifts the pose-generic arithmetic into a shared
    module; Story Impact keeps its exports and its pacing. The silent scene
    uses the shared timeline without pacing, so its durations follow the
    moves exactly (the seed keeps timing policy per film).
  - **Original Subtitle/action engine (assessed, not used):**
    `src/models/Subtitles.ts` requires `text` on every entry, times actions
    by subtitle `leadingBlank`/`offset`, and chains numeric fields in
    `InterpolatesOfField`, which treats a previous value of 0 as absent.
    Its model is subtitle-centric; it is not changed or migrated here.
  - **Actor and prop (reuse directly):** `src/aiTestAutomation/actors.tsx`
    `Engineer` is anchored at the feet, takes local hand targets, and marks
    each arm with `data-hand`; `src/aiTestAutomation/props.tsx` `Wrench`
    draws at stage coordinates. `Protection.tsx` already draws the wrench at
    a wrist point and gives the Engineer that point through `reach()`. The
    scene does the same: hand point = actor position + scale × a fixed local
    hand offset; wrench drawn there.
  - **Motion (reuse directly):** `src/aiTestAutomation/motion.ts` `travel`
    (smoothstep) for travel, `gesture` (anticipation and settled return) for
    the hop's lift.
  - **Composition wiring (reuse pattern):** `StoryImpactOneSplash.tsx` draws
    `poseAt(useCurrentFrame())`; `Root.tsx` registers each film.
  - **Tests (reuse pattern):** `tests/aiTestAutomation/acting.spec.tsx`
    reads the Engineer's transform and `data-hand` to compute the world hand
    point; `tests/storyImpact/*` sample `poseAt` at beat frames and render
    with `@testing-library/react`.
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
  shared `timeline()` over them. Seconds round to whole frames as `beat()`
  already does.
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

## Decisive premises observed (2026-10-07, at `8c5544d`)

| Premise | Observation | Result |
| --- | --- | --- |
| The beat timeline joins beats back to back | Read `film.ts` `beatAt`: `t = (f − from)/(frames − 1)`, so a beat's last frame is `pose(1)` and the next beat's first frame is `pose(0)` | Holds; continuity needs only that the next beat's start state equal the previous end state |
| Pacing leaves captionless beats alone | Read `readingPace.ts`: `readingSeconds('') = 0`, so `needed ≤ authored` and `stretch = 1` | Holds; the shared timeline still drops pacing so a captioned silent beat cannot stretch |
| `Beat`/`timeline` consumers are all Story Impact | grep of `storyImpact/film` imports in `src` and `tests` | `laterStories.ts`, `endingBeats.ts`, `readingPace.ts`, `fullFilm.ts`, `StoryImpactOneSplash.tsx`, `StoryImpactFilm.tsx`, and 5 specs; FPS-only imports elsewhere. Holds |
| Story Impact and acting specs are green | `readingPace`, `StoryImpactOneSplash`, `acting` specs, `NODE_ENV=test` | 49 passed in 3.3 s. Holds |
| The whole jest suite is green at the floor Node | Full jest inside `nix develop` (Node 24.21), `NODE_ENV=test` | 33 suites, 329 tests passed in 29 s. Holds |
| The whole jest suite fails under the shell's Node | Full jest with Node 24.5 | 15 old-engine suites fail to load `three` (ESM). Hence the toolchain note |
| tsc and eslint are clean | `npx tsc`, `npx eslint src` | Both exit 0, no output. Holds |
| Remotion bundles and registers compositions | `npx remotion compositions src/index.ts` | 22 compositions listed, all 30 fps; `StoryImpactOneSplash` 2121 frames, `StoryImpactFilm` 3852 (baseline for slice 1). One pre-existing 404 for a quillustration asset, unrelated |
| Durations round to the seed's frame counts | FPS 30: 1.5 s → 45, 0.6 s → 18, 2 s → 60 | 123 frames = 4.10 s; with a one-frame cut, 124. Holds |
| The Engineer exposes its hand for proof | `actors.tsx`: `data-testid="engineer"` with `translate(x y) scale(s)`, arms with `data-hand`; `acting.spec.tsx` already derives the world hand | Holds |
| An invalid script stops rendering loudly | Not yet observed; slice 4's proof runs `remotion compositions` against an invalid script | Bounded by slice 4; either isolation outcome satisfies the story |

## Proof ownership

| Promise | Slice | Observable proof |
| --- | --- | --- |
| Timing joins, position joins, travel/hop/hold (example 1) | 2 | Joins spec samples first and last frames of each beat in both orders; 123 frames total |
| Attached wrench on every frame | 2, 3 | Render spec: wrench position equals the world hand point on sampled frames, including the cut frame |
| Silence (example 3) | 2 | Render spec: no caption element; the script type has no caption text |
| Preview in Studio | 2 | `remotion compositions` lists `SilentScene 30 1080x1080 123 (4.10 sec)`; Terry opens it in Studio |
| Explicit cut (example 2) | 3 | Joins spec: cut frame at the door, last travel door→desk, 124 frames |
| Useful feedback (example 4) | 4 | Validation spec for unknown place, actor, move kind, and duration 0; `remotion compositions` with an invalid script prints the message |
| Export and revision path | 5 | `pnpm render:silent-scene` writes `out/silent-scene.mp4` of 124 frames; README documents the path; Terry reorders and re-renders |
| Story Impact unchanged | 1 | `tests/storyImpact` green; composition durations unchanged |

## Ordered slices

### 1. A pose-generic beat timeline shared outside Story Impact
Type: Structure
Status: planned

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

### 2. Terry previews a silent scene whose reordered moves connect
Type: Behavior
Status: planned

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
