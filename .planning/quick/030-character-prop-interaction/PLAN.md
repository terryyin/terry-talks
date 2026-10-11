# Terry casts the Engineer into a new scene and directs a believable prop interaction

Source: [story](../../../terry-moves/seed.md#character-prop-interaction).
Identity: `terry-moves-filmmaking#character-prop-interaction`

## Goal and scope

Terry directs the existing cartoon Engineer, through the silent scene script,
to reach for a wrench resting on a desk, pick it up, carry it through later
moves, and put it down on another surface. Reordering moves that keep
ownership coherent plays without repair; a reorder that contradicts ownership
or reach is reported before any frame renders. The prop gains its own place,
contact, and ownership on top of story 1's delivered joins.

- Included: the Engineer cast with its existing art and rig; props declared
  with a starting state; places that can hold a prop declare a surface; pick
  up (hand to grip, take, settle into carry) and put down (bring to the
  current place's surface, release, return to rest) within their durations
  without moving the actor; the held prop drawn at the hand on every frame
  through travel, hop, hold, and cut; a released prop resting visibly where
  it was put down and available for a later pick up; contact (prop grip at
  the drawn hand, fixed arm lengths, reachable targets only); gaze toward the
  prop during reach and release; unchanged timing and position joins;
  before-render feedback for out-of-reach pick up, pick up while holding, put
  down with nothing held, put down with no surface, unknown prop, and story
  1's existing cases; Studio preview, the existing render path, and
  script-edit revision.
- Deferred, not rejected: casting the AI companion; two hands or two held
  props; handoffs between characters; expressive intentions (R08); scripted
  moods, head tilt, or blinks beyond the reach gaze; props that change state;
  floor-level props; captions or audio; Studio write-back; migrating the AI
  test automation film. Automatic walking to an out-of-reach prop was
  considered and excluded as an inferred join.
- Assumptions: new silent scene, 1080×1080 at 30 fps, Engineer at scale 1,
  wrench resting on a desk, a window with a surface, a door without one. A
  different prop or surface uses the same path.
- Key examples: story examples 1–5; proof ownership is mapped below.

## Execution context and decisions

- **Preparation:** established Story Branch preparation, agent Akiho-chan,
  assignment published at `4da65865e45b1b6861f75a2c0d258b3e85350a35`;
  workspace
  `/Users/terryyin/git/terry-talks/.worktrees/i-can-bring-an-existing-character-into-a-new-sce`,
  branch `claude/i-can-bring-an-existing-character-into-a-new-sce`, remote
  `origin`, target `master`, integration checkout
  `/Users/terryyin/git/terry-talks`. Execution identity, claim, and increment
  revisions are recorded here once execution starts.
- **Execution:** Story Branch Mode, agent Yuma-chan, publisher
  `dashboard-territory.local-terry-talks`; claim published on `master` and
  the execution branch at `6888ae90ebcae3b95d354f7d5f8c14e7ea05b7cf`
  (starting revision `6d3f24f6d9f75c2bc03668a5ae47a2bb90d4fa03`). Increments
  publish to `refs/heads/claude/i-can-bring-an-existing-character-into-a-new-sce`.
- **Checkout setup:** `nix develop -c sh -c 'pnpm install --frozen-lockfile'`
  passed in this workspace (2026-10-10). No Git hooks; the component's
  formatter is `pnpm terry-moves:format` from the repo root.
- **CI:** no `.github/workflows` and no `.planning/open-dough.json`; push CI
  observation is unavailable and no observer is armed. Local planned proof is
  required.
- **Plan location:** `.planning/quick/`; 029 was the highest allocated entry
  in history, so this plan is 030. Slice statuses: planned, in-progress, done.
- **No ADR or North Star applies.** Only ADR-0000 (use ADRs) exists; this
  work extends the existing silent scene script and compiler without a new
  consequential boundary.
- **Verification gate:** `terry-moves/package.json` `test` is jest, eslint,
  and tsc (`pnpm moves test` from the repo root, per the README). Local proof
  per slice is the focused jest spec plus tsc; the whole gate runs at slice 1
  (a shared actor module changes, consumed by four AI test automation scenes
  and the silent scene) and slice 5 (story complete).
- **Toolchain:** shell Node 24.5 is below the `>=24.9` floor; Nix supplies
  the right Node. Use `NODE_ENV=test`. From `terry-moves/`:
  `nix develop -c sh -c 'NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js tests/<spec>'`,
  `nix develop -c sh -c 'NODE_ENV=test pnpm exec tsc'`,
  `nix develop -c sh -c 'NODE_ENV=test pnpm exec remotion compositions src/index.ts'`,
  and `nix develop -c sh -c 'NODE_ENV=test pnpm test'` for the gate. `tsx`
  is installed for scratch scripts.
- **PFE (existing solutions):** extend story 1's `src/silentScene/script.ts`,
  `compileScene.ts`, `SilentScene.tsx`, and `stories/SilentSceneFilm.tsx`;
  they already own the scene script, state folding, validation feedback, the
  per-frame pose, and the composition. Reuse `articulatedArm` in
  `src/aiTestAutomation/motion.ts` as the single reach rule: a target is
  reachable exactly when the solver's hand coincides with it, so the compiler
  must not duplicate the radius formula. Modularize `actors.tsx`: the
  Engineer's right shoulder, arm lengths, and rest hand are inline literals
  consumed by `Arm`; export them as rig data the compiler reads (slice 1).
  Reuse `Wrench` from `props.tsx`, `travel` and `gesture` easing, the
  Engineer's `gaze` prop, story 1's carry wrist offset `{ x: 90, y: -180 }`,
  and `Protection.tsx`/`Learning.tsx`'s hand-to-prop interpolation pattern.
  `tests/silentScene/scene.spec.tsx` already derives the real world hand from
  `data-hand`; `tests/aiTestAutomation/acting.spec.tsx` solves arms the same
  way. No existing model owns prop ownership or surfaces; that is the new
  responsibility, added to the scene compiler's folded state.
- **Script form (decision):** places remain stage points and may add a
  `surface` point (where a prop rests and is put down). `props` maps a prop
  name to its starting state: resting at a named place with a surface, or
  held. New moves: pick up a named prop over a duration, and put down a named
  prop over a duration; `describeMove` prints `pick up wrench` / `put down
  wrench`. A prop may start held so story 1's attached-wrench scripts and
  fixtures remain valid with one added declaration; at most one prop is held
  at any time (one carrying hand). Runtime validation owns the contract.
- **Scene pose (decision):** the per-frame pose grows from `{ x, y, lift }`
  to carry the Engineer's local right-hand target, the gaze, which prop is
  held (if any), and each resting prop's stage point. The picture draws the
  Engineer with that hand and gaze, the held prop at actor origin plus hand,
  and each resting prop at its point on a minimal drawn surface slab so the
  wrench reads as lying on something. Exact field names are execution's
  choice; the joins rule (next beat's first frame equals the previous last
  frame) applies to the whole pose.
- **Interaction timing (decision):** pick up spends its first half moving the
  hand from its current position to the grip (eased like travel), takes the
  prop at the midpoint, and spends the second half settling into the carry
  position; put down mirrors it: carry to the surface grip, release at the
  midpoint, hand back to rest. Minimum three frames (start, contact, end).
  The grip is the prop's drawing origin at the surface point; local target =
  surface − feet point at scale 1. Gaze during both moves is the sign of the
  prop's horizontal offset from the actor; 0 otherwise. The actor's position
  does not change.
- **Feedback form (decision):** one `Error` per first problem in story 1's
  form, e.g.
  `move 3 (pick up wrench): wrench rests at desk, out of reach from window; travel or cut to desk first`,
  `move 2 (put down wrench): nothing is held`,
  `move 4 (pick up wrench): wrench is already in hand`,
  `move 4 (put down wrench): door has no surface; surfaces are desk, window`,
  `move 2 (pick up spanner): unknown prop "spanner"; props are wrench`,
  `scene start: wrench rests at door, which has no surface; surfaces are desk, window`,
  and a second held prop at start reports that only one prop can be held.
  Raised in `calculateMetadata` as story 1 does; module-load failure is an
  acceptable fallback per story 1's recorded decision.
- **Interim behavior:** until slice 3 the authored scene has no put down and
  ends with the wrench in hand; slice 3 adds it. Until slice 4 a
  contradictory script may throw a generic error rather than the recorded
  message; slice 4 replaces that.

## Baseline and proof ownership

Observed in this workspace on 2026-10-10, before any product change:

| Premise | Consuming operation | Observation | Result |
| --- | --- | --- | --- |
| The rig puts the hand exactly on a reachable target and clamps beyond reach, so compiler-chosen targets give contact | `articulatedArm` with the Engineer's right shoulder `(42,-228)`, lengths 67/68 | `nix develop -c sh -c 'NODE_ENV=test pnpm exec tsx <scratch>'` calling the real solver: rest hand `(65,-164)` and story 1 wrist `(90,-180)` give hand-to-target 0; desk-height grip local `(80,-130)` (feet `(540,820)` → surface `(620,690)`), distance 105.11, hand-to-target 0; local `(90,-100)` at distance 136.7 clamps 1.7 px off; a window surface from the desk `(310,-130)` clamps 150 px off; the floor `(60,0)` clamps 94 px off | Settled: contact holds within 135 px of the shoulder; story example 3's out-of-reach case and the floor exclusion are real geometry |
| Focused suites and toolchain run here | jest, tsc, Remotion bundling | `nix develop … jest.js tests/silentScene tests/aiTestAutomation`: 5 suites/49 tests passed; `pnpm exec tsc`: no diagnostics; `remotion compositions src/index.ts`: SilentScene 30 fps 1080×1080 124 frames | Settled |
| Growing the pose breaks existing full-pose assertions, which execution must align | `toEqual` on `poseAt` in story 1 specs | Scratch edit adding `gaze: 0` to hold/cut poses, `jest tests/silentScene`: 2 suites failed, 5 tests failed, 34 passed; reverted with `git checkout` | Settled: `joins.spec.ts` and `validation.spec.ts` whole-pose assertions are consumers to align in slice 2 |
| A compile failure surfaces at `calculateMetadata` before any frame, with the recorded message | `remotion compositions` / Studio feedback | Temporary edit of `script.ts` move 4 to `kitchen`, `nix develop -c sh -c 'NODE_ENV=test pnpm exec remotion compositions src/index.ts'`: exit 1, `Error: move 4 (travel to kitchen): unknown place "kitchen"; places are door, desk, window` at `calculateMetadata`; script restored with `git checkout`, SHA256 `926ff00266d0938822544c3e2a6b8f84ccdeacf37d0f345b712ff45aaa0ea25c` before and after | Settled for the CLI; Studio isolation to the one composition is story 1's accepted observation and slice 4 re-observes it |

Promise ownership: Engineer identity and rig data (1); props at rest,
pick up, carry through moves, contact and gaze, initially held props, Studio
preview (2); put down, rest after release, later pick up, compatible reorder
(3); feedback before render (4); README, export, revision, full gate (5).
Story examples: 1 → slices 2 and 3; 2 → 3; 3 and 4 → 4; 5 → 2 and 3.
Terry's believability judgment remains a human evaluation.

Consumers of changed surfaces: `actors.tsx` is drawn by `Problem.tsx`,
`Learning.tsx`, `Protection.tsx`, `Selective.tsx`, `SilentScene.tsx`, and
`visualTreatments/character/CharacterTreatment.tsx`, and asserted by
`tests/aiTestAutomation` and `tests/visualTreatments` (slice 1 runs the gate). `ScenePose` and
`SceneScript` are consumed by the three `tests/silentScene` specs and
`fixtures.ts` (slices 2–4 run that directory). The README's silent scene
section states 124 frames and "the wrench stays in the Engineer's hand"
(slice 5).

## Ordered slices

### 1. The Engineer's reach is shared rig data
Type: Structure
Status: done
Accepted: `engineerRig` (`rightShoulder`, `upper`, `lower`, `restRightHand`,
`carryHand`) exported from `actors.tsx`; `tests/aiTestAutomation/acting.spec.tsx`
"draws the Engineer's right arm from the exported rig" observes the drawn
shoulder, elbow, and hand against the rig and solver; whole gate 58 suites /
606 tests, eslint, tsc; markup of 2523 renders byte-identical to the previous
revision before the refactor pass. Terry authorized collapsing the rest-hand
literal onto the rig in `Problem.tsx`, `Learning.tsx`, and
`visualTreatments/character/CharacterTreatment.tsx`; focused jest (11 suites /
91 tests, including `tests/visualTreatments`) and tsc passed after it.
Proof: `tests/aiTestAutomation` and `tests/silentScene` stay green; one
focused assertion that the drawn right arm's `data-shoulder` and solved hand
match the exported rig; whole gate `pnpm test` because a shared actor module
changes; `tsc`.

Internal change: `actors.tsx` exports the Engineer's rig (right shoulder,
upper and lower lengths, rest right hand, and the carry offset moved from
`SilentScene.tsx`), and `Arm`/`Engineer`/`SilentScene` read it instead of
inline literals. Pictures are unchanged. Enables slice 2, where the compiler
needs the same numbers to choose reachable targets.

### 2. The Engineer picks up a resting wrench and carries it through the scene
Type: Behavior
Status: done
Accepted: script form `Place = Point & { surface? }`, `props: { name: 'held' |
{ at: place } }`, move `{ kind: 'pick up', prop, seconds }`; pose `{ x, y,
lift, hand, gaze, held, resting }`; `SilentScene` takes `{ pose, places }`
with test ids `surface`, `resting-prop`, `carried-prop`.
`tests/silentScene/scene.spec.tsx` "picking up the wrench that rests on the
desk" reads the drawn `data-hand`, arm segments, `Wrench` transform, and
pupils; the held-from-start cases cover every frame of story 1's fixtures.
jest `tests/silentScene` 3 suites / 53 tests, tsc, `remotion compositions`
SilentScene 147 frames, whole gate 58 suites / 620 tests with eslint and tsc.
Stills at frames 30, 50, 57, 100 inspected (wrench on the desk slab, hand on
it at contact, then carried); Studio itself was not opened. The gaze eases in
and out across the move (0 on its first and last frames) so the whole-pose
join holds; contact is frame `floor(frames / 2)`. Story 1's unknown-move-kind
message now lists `pick up` among the kinds.
Proof: `tests/silentScene` with a story-example fixture (desk and window
surfaces, wrench resting on the desk; travel to desk 1.5 s, pick up 0.8 s,
travel to window 2 s, hop 0.6 s) observing: the resting prop at the desk
surface and no carried prop on every frame before contact; at the pick up's
midpoint frame the real `data-hand` at the grip and the gaze toward the
wrench; on the first, middle, and last frames of each later move the carried
prop at actor origin plus real hand, the arm segments solved at 67/68, and no
resting prop; the pick up's last frame hand at the carry offset; adjacent
beats still equal across the join; the `original` fixture declared as
initially held keeps the wrench at the hand on every frame (story 1
preserved); `tsc`; `remotion compositions` reports SilentScene 147 frames;
Studio shows the wrench on the desk, then in hand.

Behavior: the script declares `props` and place surfaces; `compileScene`
folds prop state (resting point or held) and the hand target through every
move, rejecting unreachable grips only as a generic error for now;
`SilentScene.tsx` draws surfaces, resting props, the Engineer with the folded
hand and gaze, and the held prop at the hand. The authored `script.ts`
becomes the story's first scene without the put down (interim). Align the
whole-pose assertions named above.

### 3. The Engineer puts the wrench down where it stays
Type: Behavior
Status: done
Accepted: move `{ kind: 'put down', prop, seconds }` shares the pick up's
reach, midpoint contact, and settle; the authored scene is story example 1
at 171 frames. `tests/silentScene/putDown.spec.tsx` "putting the wrench down
on the window surface", "the hop moved between the pick up and the travel to
the window", and "returning to a wrench that was put down at the window",
plus `scene.spec.tsx` "a cut while carrying a picked-up wrench…", read the
drawn picture through `tests/silentScene/picture.tsx`. jest `tests/silentScene`
4 suites / 74 tests, tsc, `remotion compositions` 171 frames; whole gate 58
suites / 641 tests with eslint and tsc before the spec split. Surfaces moved
to local grip `(120,-130)` — desk `(660,690)`, window `(970,590)`, about 125
of the 135 px reach — after the first stills showed the released wrench's
head hidden behind the resting hand; stills at frames 30, 57, 141, 170 then
showed the whole wrench clear of the hand at rest. The baseline table's
`(80,-130)` grip is historical. Studio itself was not opened.
Proof: `tests/silentScene` with the full story example 1 (put down 0.8 s at
the window before the hop): the carried prop until the put down's midpoint,
then the resting prop at the window surface with no carried prop, the hand
at rest on the put down's last frame and through the hop, the wrench still
at the window after the hop, 171 frames; the compatible reorder (hop between
pick up and travel) shows the hop at the desk with the carried prop
following the lifted hand and the rest of the scene unchanged; a fixture
that puts the wrench down at the window, returns, and picks it up again takes
it from the window surface; `tsc`; `remotion compositions` reports 171
frames; Studio shows the wrench on the window surface after release.

Behavior: put down lowers the held prop to the current place's surface,
releases it there, and returns the hand to rest; the released prop rests at
that surface for later moves and pick ups. `script.ts` gains the put down,
completing the first scene. Replaces the slice 2 interim scene.

### 4. A contradictory script reports the move, the prop, and the fix before rendering
Type: Behavior
Status: done
Accepted: `rehearse` in `compileScene.ts` walks the script by name once,
raises every problem in story 1's form, and hands the timeline the staging
before and after each move. `tests/silentScene/validation.spec.ts` "a prop
move that contradicts reach or ownership is reported before a timeline is
returned" asserts each message with exact `Error` equality and, for example
3's `cut to desk`, the drawn hand at the desk grip on the contact frame.
Messages worded in execution: `scene start: wrench and spanner are both held;
only one prop can be held`; `scene start: wrench rests at unknown place
"kitchen"; places are …`; `move N (pick up spanner): the Engineer at window
already holds wrench; put down wrench first`; `move N (put down spanner):
spanner rests at window, not in hand; the Engineer at window holds wrench`;
`…wrench rests at desk, but the desk surface is beyond the Engineer's reach
from desk; move the surface closer`; `…wrench is in hand at window, but the
window surface is beyond the Engineer's reach; move the surface closer`.
jest `tests/silentScene` 4 suites / 90 tests, tsc, eslint; whole gate 59
suites / 657 tests before the refactor pass. A temporary out-of-reach edit of
`script.ts` made `remotion compositions` exit 1 with the recorded message at
`calculateMetadata`; restored to SHA256
`8ac389b07eec35f546cb9409022edd987f6acdf9c841574508527294f026de76` and 171
frames. Studio was not opened (G8).
Proof: `tests/silentScene/validation.spec.ts` observing the recorded messages
for story examples 3 and 4: pick up after travel to window (out of reach,
naming desk and window) and the same script compiling after `cut to desk` is
inserted, with contact on the frame after the cut; put down before pick up;
a second pick up while held; put down at the door; an unknown prop; a prop
starting at a place without a surface; two props held at start; story 1's
messages unchanged; `tsc`; a temporary out-of-reach edit to `script.ts`
makes `remotion compositions` exit 1 with the message at `calculateMetadata`
and Studio show it before any picture, then exact restoration gives 171
frames (restore byte-for-byte and verify).

Behavior: compilation validates prop declarations and every pick up and put
down against the folded state and the rig's reach, raising story 1's
`Error` form with the recorded messages. Replaces the slice 2 generic error.

### 5. Terry renders and revises the prop scene through the documented path
Type: Behavior
Status: done
Accepted: README "Silent scene" rewritten against the code (places and
surfaces, props, six move entries, minimum frames, middle-frame contact,
feedback messages, 171 frames). `pnpm render:silent-scene` on the default
script and on the example 2 reorder, both exit 0; `ffprobe` on both: h264,
yuv420p, bt709, 1080×1080, 30/1, 171 frames, one stream, 5.7 s, no audio.
Posters show the wrench on the window surface on the final frame (identical
in both, as the scenes end alike); frame 78 of the reorder shows the Engineer
hopping at the desk holding the wrench. `script.ts` restored to SHA256
`8ac389b07eec35f546cb9409022edd987f6acdf9c841574508527294f026de76`. Whole gate
exit 0: 59 suites / 657 tests, eslint, tsc. Studio (headless Chromium on
`remotion studio`): SilentScene previews at 1080×1080, 30 fps, 00:05.21 with
the wrench on the desk; with the out-of-reach edit Studio shows only `Error`
and the recorded message, no picture. Retained under git-ignored
`terry-moves/out/`: `silent-scene-example-1.mp4`,
`silent-scene-example-2-reorder.mp4`, posters, and the two Studio captures.
For Terry's believability evaluation: the surfaces read as short floating
shelves (the desk slab is near shoe height and overlaps the shoe during the
reorder's hop), the resting wrench stands upright, the carried wrench is
drawn over the hand, and the hand at rest by the window ends close to the
wrench head.
Proof: `pnpm render:silent-scene` on the default script and on the example 2
reorder, both outputs retained with distinct names, `ffprobe` showing 171
frames, 30 fps, 1080 square, H.264/yuv420p, no audio; posters inspected for
the wrench on the window surface at the final frame; script restored
byte-for-byte; README section reviewed; whole gate `pnpm test`.

Behavior: `terry-moves/README.md`'s "Silent scene" section describes props,
surfaces, the pick up and put down entries, ownership and reach feedback, and
the new frame count; the existing `render:silent-scene` script is the export
and a revision is a script edit followed by the same render.

## Execution complete

Product advice: No backlog change. The retrospective found no defect,
regression, or residue needing a correction; process review was not enabled.
The work follows the near-future direction: reordering compatible moves needs
no repair and contradictions are reported before rendering. What remains is
Terry's own believability evaluation of the rendered scene (floating shelf
surfaces, the upright resting wrench, the carried wrench drawn over the hand).
If that staging does not convince, it is a small follow-up on the picture, not
on the script or compiler. A second kind of prop needs prop art chosen by
name before it can be cast; no queued story depends on that yet.

## Current decisions

- One carrying hand; a prop is resting at a surface or held, never both or
  neither; initial state may be either.
- Reachability is decided by the shared arm solver, not a duplicated radius.
- Feedback is a thrown `Error` from compilation in the recorded form, raised
  before any frame renders.
- Timing policy is the moves' own durations; no reading pace.

## Story obligations

### G1. Only the right arm is rig data
Reported: slice 1 — "Only the right arm is in the rig. The left shoulder `(-48,-229)`, left rest hand, stop-pose hand `(105,-278)` and the AI companion's shoulders and 48/46 lengths remain inline."
Story clause: "casting the AI companion or another character through this path; two hands or holding two props at once"
Disposition: excluded "casting the AI companion or another character through this path; two hands or holding two props at once"

### G2. The authored scene has no put down yet
Reported: slice 2 — "The authored scene has no put down and ends with the wrench in hand."
Story clause: "Put down brings the held prop to the current place's surface, releases it there, and returns the hand to rest within the move's duration"
Disposition: proved by slice 3: `tests/silentScene/putDown.spec.tsx` "putting the wrench down on the window surface" and "the authored scene is the pick up, carry, put down example"

### G3. Contradictory pick ups and prop declarations get a generic error
Reported: slice 2 — "A pick up that is out of reach, names an unknown or non-resting prop, or happens while a prop is held throws the generic `move N (pick up <prop>): cannot pick up <prop> here`."
Story clause: "The message names the prop, where it rests or who holds it, and where the Engineer is"
Disposition: proved by slice 4: `tests/silentScene/validation.spec.ts` "a prop move that contradicts reach or ownership is reported before a timeline is returned"

### G4. The resting wrench stands upright on a thin slab
Reported: slice 2 — "The wrench rests upright (standing on the slab), not lying down: the grip is the wrench's drawing origin, so the slab top is drawn 48 px below the surface point"
Story clause: "A resting prop is drawn at that surface on every frame until it is picked up"
Disposition: proved by slice 2: `tests/silentScene/scene.spec.tsx` "the wrench lies on the desk surface and nothing is carried on every frame before contact"; how the resting wrench reads is part of Terry's believability evaluation.

### G5. Every prop is drawn as the wrench
Reported: slice 2 — "Every prop is drawn as a `Wrench`, whatever its name; there is no prop-name-to-art mapping."
Story clause: "a wrench resting on a desk, and a window with a surface"
Disposition: no user cost "directs one believable prop interaction through the scene script": the first scene's only prop is the wrench, and a second kind of prop art is not a promise of this story.

### G6. Contradictory put downs get a generic error
Reported: slice 3 — "Contradictory put downs throw the generic interim message, not the recorded ones."
Story clause: "when a put down happens while nothing is held, when a put down happens at a place with no surface"
Disposition: proved by slice 4: `tests/silentScene/validation.spec.ts` "the put down moved to before the pick up reports that nothing is held" and "putting the wrench down at the door reports the place and the places that have a surface"

### G7. The wrench's draw order flips at contact
Reported: slice 3 — "A carried wrench is drawn in front of the Engineer and a resting one behind, so at frame 141 the wrench moves from in front of the hand to behind it."
Story clause: "The prop is never drawn in two places and never disappears"
Disposition: proved by slice 3: `tests/silentScene/putDown.spec.tsx` "on the middle frame the real hand is at the surface grip, the wrench is released there, and the gaze is toward it" observes one resting wrench and no carried one; the one-frame layer change while the hand is on the wrench is part of Terry's believability evaluation.

### G8. Remotion Studio has not been observed
Reported: slice 4 — "Studio was not observed; the CLI `calculateMetadata` observation is the only real-path evidence."
Story clause: "Terry previews the scene in Remotion Studio and renders it with the existing render path"
Disposition: proved by slice 5: headless Chromium captures of `remotion studio` at `/SilentScene`, retained as `terry-moves/out/silent-scene-studio.png` and `silent-scene-studio-out-of-reach.png`; frames after the first were observed through the render, not scrubbed in Studio

## Learnings

- Run jest, tsc, tsx, and Remotion in the nix dev shell with `NODE_ENV=test`.
- `engineerRig` points are actor-local from the feet at scale 1 and `as const`;
  reachability is `articulatedArm(rig.rightShoulder, target, rig.upper,
  rig.lower, -1).hand` coinciding with the target. `eslint` covers `src` and
  `revision` only, so specs are checked by jest and tsc.
- A pre-change render baseline without touching the stash or branches:
  `git archive` the previous revision with `AI Test Automation/` alongside
  `terry-moves/` and symlink `node_modules`.
- Build poses from explicit `x`/`y`, never by spreading a place (places may
  carry `surface`). Decide the contact frame by frame index, not by comparing
  seconds; normalise an eased signed gaze with `|| 0` so `-0` does not break
  whole-pose equality. Put down needs the same join treatment as pick up:
  gaze 0 and the hand exactly at its settled point on the first and last
  frames.
- Not yet observed by a spec: fps other than 30, more than one prop, a pick
  up at its three-frame minimum, and a cut while carrying a picked-up prop.
- Pick up and put down share one `case` with a single guard; slice 4 splits
  it by cause and needs the current place's name tracked beside `position`
  to say where the Engineer is.
