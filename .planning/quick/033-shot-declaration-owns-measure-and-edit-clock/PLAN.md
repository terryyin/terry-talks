# Terry's shot declaration owns measurement check and the edit scene clock

## Source

Identity: terry-moves-filmmaking#shot-declaration-owns-measure-and-edit-clock
**Source:** [shot declaration owns measure and edit clock](../../../terry-moves/seed.md#shot-declaration-owns-measure-and-edit-clock).
Bounded correction from the completed planned
`terry-moves-filmmaking#replace-filmed-shot` execution. Predecessor story
section and plan are recoverable from before-cleanup commit
`b8f6d2d34331e16c8db5039defd470ab567fa550` at
`terry-moves/seed.md#replace-filmed-shot` and
`.planning/quick/032-replace-filmed-shot/PLAN.md`. Attributable published
implementation on `cursor/i-can-replace-a-filmed-shot-while-preserving-its`:
`0f8e4da` (declaration/measurement/derived clock), `62f2bd9` (stand-in inset
mapping), `d205ede` (trim/hold/edit + Freeze), `0d56b73` (refusals + README).
Claim `publishedSha` `e69fb1c8d6f0e79806513185816f2d6454e98e24`; tip
`0d56b73495c99e83aa238ab8fe7b51f6fa4a291f`. Planning-only commits on the
branch before those increments are provenance. Reviewed in execution checkout
`/Users/terryyin/git/terry-talks/.worktrees/i-can-replace-a-filmed-shot-while-preserving-its`
on 2026-10-11.

## Current findings and impact

Observed at tip `0d56b73` in that checkout.

1. **Retargeting `speakerShot.source` does not move measurement check.**
   `terry-moves/scripts/measure-shot.mjs` hardcodes
   `const source = 'assets/Component teams.mp4'` (lines 12–13). Scratch:
   change `speakerShot.source` to
   `assets/feature-teams-stand-ins/retarget.mp4`, run
   `node scripts/measure-shot.mjs --check` → exit 0,
   `speakerShot: assets/Component teams.mp4 matches measurement record`.
   Reverted. The README replacement path ("retarget `source`, re-measure")
   therefore still validates the old file; a missing new file is not caught
   by `--check` or `render:feature-teams`.

2. **`compileShot` accepts a declaration whose source disagrees with the
   measurement record.** Scratch jest: declaration
   `assets/feature-teams-stand-ins/retarget.mp4` with the approved
   measurement compiles; `slot.source` is the new path while
   `measurement.source` stays `assets/Component teams.mp4` and geometry /
   duration still come from the old record. Studio can play the new file
   under stale facts while render check still greens the old asset.

3. **A shorter `edit` that still reaches every cue shortens
   `durationInFrames` via `sceneSeconds`, but `filmPoseAt` leaves and ends
   on `CLIP_SECONDS` (113.5).** Scratch jest: `compileShot` with
   `durationSeconds: 110`, `whenShort: 'edit'` yields `sceneSeconds === 110`
   (joy at 109.3 is reached); at film frame for clip-second 111,
   `filmPoseAt` still has `clipShown === 1` and no end card, because
   `film.ts` phases on `CLIP_SECONDS` / `SCENE_END`, not
   `speakerSlot.sceneSeconds`. Under a real shorter edit wired into the
   film module, the inset would hang past the slot and the last-moment hold
   / ending would not follow the shorter slot the story promised.

No defect in the approved film's preservation proofs as delivered: timeline
`cmp`, duration/audio vs `f0bedba`, and inset noise class remain as slice 4
accepted. G1 and compare **Not preserved** are outside this correction
(product advice only).

## Goal and scope

Terry retargets or short-edits the Feature Teams speaker shot through the
declaration, and measurement check plus the film's scene-end clock follow it,
while the approved declaration keeps its byte-identical pose timeline.

- Included: measure write/`--check` use `speakerShot.source` (via `tsx`
  import of `shot.ts`, already observed:
  `pnpm exec tsx -e 'import { speakerShot } …'` prints the approved path);
  `compileShot` refuses `shot.source !== measurement.source` naming both;
  film clip-end / last-moment / ending phases follow compiled
  `sceneSeconds` without changing the approved timeline dump; unit proof for
  retarget check failure, source mismatch refusal, and short-edit phase
  clock; README sentence stays true without naming a second edit to the
  measure script; approved timeline `cmp` and focused `tests/featureTeams`.
- Excluded: compare-tool Preserved tolerance; cue re-alignment for a new
  performance; muted-policy verification; second shot / shared shot module;
  Studio source picker; translated editions; changing `SCENE_END` / cue
  table values for the approved film.
- Preserve: trim, hold, edit-unreached-cue refusal, voice/crop/range
  refusals, Freeze hold silence, stand-ins never committed, credits,
  `render:feature-teams` check-then-render, exact preservation = timeline
  dump `cmp`.

## Existing solutions and decisive premises

- PFE: keep one declaration in `shot.ts` and one measurement JSON; do not
  add a second source constant. `pnpm exec tsx` already runs
  `scripts/render-feature-teams.ts` and can import `speakerShot` for
  measure/check (observed). `compileShot` is the pure refusal home (same
  shape as crop/range/voice). Film phase boundaries live only in
  `filmPoseAt` (`film.ts`); `durationInFrames` already uses
  `speakerSlot.sceneSeconds`. Approved leave timing must stay at 113.5 s
  into the clip (`CLIP_SECONDS`), while edit shorter than that must leave
  at `sceneSeconds` — use
  `clipEndSeconds = Math.min(speakerSlot.sceneSeconds, CLIP_SECONDS)` (or
  equivalent) so approved `min(113.508, 113.5) === 113.5` preserves the
  timeline and short edit at 110 uses 110.
- Only ADR-0000 is Accepted; no North Star topic. Direction unchanged.

| Premise | Consuming operation | Observation | Result |
| --- | --- | --- | --- |
| Retarget leaves `--check` green on the old file | `node scripts/measure-shot.mjs --check` after scratch `speakerShot.source` change | Exit 0 naming `assets/Component teams.mp4`; reverted | Settled: symptom reproduces |
| Mismatched declaration/measurement compiles | jest compiling retarget source with approved measurement | `slot.source` new path, `measurement.source` old, duration from old record | Settled |
| Short edit clears cues at 110 s but pose clock stays on 113.5 | jest `compileShot` + `filmPoseAt` at clip-second 111 | `sceneSeconds === 110`; `filmPoseAt` still `clipShown === 1` | Settled |
| `tsx` can import `speakerShot` for measure | `pnpm exec tsx -e 'import { speakerShot } from "./src/featureTeams/shot.ts"'` | prints `assets/Component teams.mp4` | Settled |
| Focused Feature Teams suite is green here | jest `tests/featureTeams` | Used throughout the reviewed execution; short-edit suite file green in this review | Settled for planning |

## Proof ownership

| Promise | Owner | Observable proof |
| --- | --- | --- |
| Measure/check follow `speakerShot.source` | 1 | Scratch retarget of declaration to a missing path: `--check` and `render:feature-teams` stop naming that path; approved path still checks green; measure write updates the record for the declared source |
| Declaration/measurement source disagreement is refused | 1 | Unit: `compileShot` throws naming both paths when they differ |
| Short edit that reaches cues ends the clip clock at `sceneSeconds` | 2 | Unit: with in-memory 110 s edit, film phase helper / `filmPoseAt` (after wiring) has inset leave / ending relative to 110, not 113.5; hold and unreached-cue edit keep current proofs |
| Approved film pose timeline unchanged | 1, 2 | timeline dump `cmp` vs baseline; focused `tests/featureTeams` green |

Commands from `terry-moves/` inside nix with `NODE_ENV=test`: jest
`tests/featureTeams`; `node`/`pnpm exec tsx` for measure as the slice leaves
the script entry; timeline
`tsx scripts/feature-teams-timeline.ts` + `cmp` as in plan 032. No compare
vs `f0bedba` required unless timeline `cmp` fails.

## Ordered slices

### 1. Measurement write and check follow the declared source
Type: Behavior
Status: done
Proof: unit refusal when `shot.source !== measurement.source`; scratch
retarget to a missing file makes `--check` (and therefore
`render:feature-teams`) stop naming that file, then revert; approved
`--check` still greens; focused `tests/featureTeams` green; timeline `cmp`
identical (no film clock change yet).

Behavior: `measure-shot` reads `speakerShot.source` (tsx entry importing
`shot.ts`, package script updated if the file becomes `.ts`); write and
`--check` use that path under `public/`. `compileShot` refuses a source
mismatch before other checks. README needs no second "edit the measure
script" step.

Accepted proof (2026-10-11):
- `nix develop --command sh -c 'cd terry-moves && NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js tests/featureTeams --runInBand'` — 4 suites / 27 tests pass. `FeatureTeamsShot.spec.tsx` mismatch-precedence test names both sources despite invalid crop/range/audio; `FeatureTeamsMeasurement.spec.ts` runs the real CLI on matching old bytes, then a missing retarget and observes exit 1 naming it. `FeatureTeamsFilm.spec.tsx` verifies the tsx check-then-render chain.
- `nix develop --command sh -c 'cd terry-moves && NODE_ENV=test node /tmp/shot-declaration-slice1-cli-proof.mjs > /tmp/shot-declaration-slice1-cli-proof.log 2>&1'` — terminal exit 0. Actual checkout retarget makes check and render stop at the named missing file; alternate approved-file copy is measured into a record naming its declared path/facts/hash and checks green. Original declaration/record restored; owned proof asset removed; approved check green. Driver assertions and log inspected.
- `nix develop --command sh -c 'cd terry-moves && NODE_ENV=test pnpm exec tsx scripts/feature-teams-timeline.ts /tmp/shot-declaration-slice1-timeline.json && cmp /tmp/shot-declaration-approved-baseline.json /tmp/shot-declaration-slice1-timeline.json'` — exit 0, byte-identical timeline at approved declaration.
- Independent refactor removed one redundant render-command substring assertion; stronger exact-chain assertion and all accepted proof boundaries remain unchanged. Selective formatter `nix develop --command sh -c 'cd terry-moves && pnpm exec eslint src/featureTeams/shot.ts --fix'` and `git diff --check` pass. No proof gaps or remaining slice 1 consumers; no generator triggered.

### 2. A shorter edit's scene clock follows `sceneSeconds` without moving the approved timeline
Type: Behavior
Status: done
Proof: unit for in-memory 110 s `edit` (cues reached): clip-end / leave /
ending keyed to 110; existing hold and edit-unreached proofs still pass;
approved timeline dump `cmp` identical; focused `tests/featureTeams` green.

Behavior: `filmPoseAt` (and any helper it needs) uses
`Math.min(speakerSlot.sceneSeconds, CLIP_SECONDS)` as the clip-end second
for last-moment hold and ending, so the approved film stays on 113.5 and a
valid shorter edit closes on its slot. No cue table change.

Accepted proof (2026-10-11):
- `nix develop --command sh -c 'cd terry-moves && NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js tests/featureTeams/FeatureTeamsEditClock.spec.ts --runInBand'` — before implementation exit 1; inset remained shown at 110.2 and end card absent at 111.5. Fixture changes only measured duration; actual declaration/compiler/choreography/film functions establish the result.
- `nix develop --command sh -c 'cd terry-moves && NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js tests/featureTeams --runInBand'` — after implementation exit 0, 5 suites / 29 tests. New edit-clock tests observe all cues reached, slot 110, partial inset leave at 110.2/gone at 110.4, last-moment stage before 111.5, ending at 111.5 with that sampled scene through the closing line, shortened duration and final credits. Existing trim/hold/unreached-edit and all slice 1 proof pass. Setup and assertions inspected.
- `nix develop --command sh -c 'cd terry-moves && NODE_ENV=test pnpm exec tsx scripts/feature-teams-timeline.ts /tmp/shot-declaration-slice2-timeline.json && cmp /tmp/shot-declaration-approved-baseline.json /tmp/shot-declaration-slice2-timeline.json'` — exit 0, approved all-frame timeline and metadata byte-identical. No full-render comparison needed.
- Independent refactor clarifies only the nominal choreography end comment in `cues.ts`; no values or accepted runtime boundaries change. Selective formatter `nix develop --command sh -c 'cd terry-moves && pnpm exec eslint src/featureTeams/film.ts src/featureTeams/cues.ts --fix'` and `git diff --check` pass. Clock consumers inspected: FeatureTeamsFilm composition, focused suites, timeline/cover exporter; Root simply mounts the unchanged composition. No generation trigger.

## Current decisions

- One authoritative source path: `speakerShot.source`. Measurement record
  `source` must match; measure script does not keep a parallel constant.
- Approved pose timeline stays exact via `min(sceneSeconds, CLIP_SECONDS)`,
  not by changing `SCENE_END` or retyping 113.508 into the pose clock.
- Stand-in files remain proof-only and uncommitted; retarget proof uses a
  missing path or in-memory measurement, not a committed asset.
- Compare-tool noise / Preserved policy stays a separate product decision.

## Execution complete

Product advice: No new backlog work recommended. The correction keeps shot replacement
in one declaration and preserves the approved pose timeline. Outcome review found no
further correction or refactoring residue; process review skipped by project default.
Review attributes only `f32e7b755e44b9307b9b0e616d5ceb918be894b8` and
`9c38f26e85491bd0e5ef50e3f676f2473f894833`; the claim and earlier history are provenance.
Accepted local proof: 5 suites / 29 tests, declared-source CLI write/check/refusal,
and exact approved all-frame timeline cmp. CI remains unobserved because no push
workflow or adapter exists; no observer was armed, so there is no shutdown resource
or applicable mailbox completion action. Completed plan and worktree remain for wrap-up.

## Execution context

- Established start, Story Branch Mode: owned workspace
  `/Users/terryyin/git/terry-talks/.worktrees/terry-s-shot-declaration-owns-measurement-check`,
  branch `codex/terry-s-shot-declaration-owns-measurement-check`, agent
  Kirara-chan, publisher `dashboard-territory.local-terry-talks`.
  This execution reuses the dashboard-established workspace; originating
  invocation is here. Integration checkout: `/Users/terryyin/git/terry-talks`.
- Starting revision: `236249a314fd3d50bc04d2555e81ef9e1f8d6a7c`.
  Accepted claim / initial candidate: `beee598b4700e3c5251cde982c2188f5cd3073ed`,
  confirmed on `origin/master` and the remote execution branch.
  Increments target `origin/refs/heads/codex/terry-s-shot-declaration-owns-measurement-check`;
  eventual trunk target remains `origin/master`.
- Recorded Ready is changed since review; current source and two-slice scope
  remain aligned. Execution does not renew readiness. No numeric slice budget
  or explicit overrun replanning option; preserve existing planning authority.
- Checkout setup: `nix develop --command pnpm install --frozen-lockfile`
  completed without lockfile changes. From this checkout, baseline
  `nix develop --command sh -c 'cd terry-moves && NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js tests/featureTeams --runInBand && NODE_ENV=test pnpm exec tsx scripts/feature-teams-timeline.ts /tmp/shot-declaration-approved-baseline.json'`
  passed all 3 suites / 25 tests and saved the approved timeline at the claim
  revision before implementation.
- No active Git hooks. Selective formatting uses the project's ESLint formatter
  on changed TypeScript paths only, under nix; staging/commits stay with the
  coordinator. No generation trigger is affected.
- CI: `.planning/open-dough.json` and push workflows are absent. GitHub default
  has no selected push check to observe; no observer armed. Claim and later
  publications have `pendingCi: unobserved`; local proof remains required.
- Slice 1 delivery accepted `f32e7b755e44b9307b9b0e616d5ceb918be894b8` on the
  remote execution branch; suffix base `beee598b4700e3c5251cde982c2188f5cd3073ed`.
  Managed delivery confirms publication; CI unobserved, maintenance not applicable.
- Slice 2 delivery accepted `9c38f26e85491bd0e5ef50e3f676f2473f894833` on the
  remote execution branch; suffix base `f32e7b755e44b9307b9b0e616d5ceb918be894b8`.
  Managed delivery confirms publication; CI unobserved, maintenance not applicable.

## Concern review

Slice-plan refinement was not needed: two slices, measure/check then edit
clock, each with discriminating proof and the second preserving the approved
timeline. No remaining slice-specific concern. No numeric slice limit was
supplied. This plan grants no Take, queue priority, implementation or
publication authority.

## Story obligations

### G1. Full film export not repeated
Reported: slice 1 — "A successful full-film export was not required or run."
Story clause: "keeps the approved film's pose timeline byte-identical"
Disposition: no user cost "keeps the approved film's pose timeline byte-identical": exact timeline cmp proves preservation; actual CLI refusal proves check-before-render, and this correction promises no new export.

### G2. No repeat full renderer or Root registration run
Reported: slice 2 — "The full video renderer and Root registration were not run; neither changed, and the plan accepts exact timeline preservation without another export."
Story clause: "the film's last-moment / ending clock follow that declaration"
Disposition: no user cost "the film's last-moment / ending clock follow that declaration": actual filmPoseAt integration observes short-edit phases and sampled ending, and approved all-frame cmp preserves the renderer's pose input; Root only mounts the unchanged composition with no clock contract of its own.
