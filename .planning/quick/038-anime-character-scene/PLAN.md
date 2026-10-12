# Direct and revise an anime engineer's reaction

**Identity:** terry-moves-filmmaking#anime-character-scene
**Source:** [refined story](../../../terry-moves/seed.md#anime-character-scene)

## Goal and scope

Terry can make a watchable short scene with an original adult anime engineer,
then change a surprised listening reaction into a thoughtful one through the
script while preserving the character design and speech. Terry accepted the
authored 2D route and this scene on 2026-10-12. This is preparation for execution,
not authority to start implementation.

Use a waist-up composition: an off-screen colleague asks “Passing which tests?
Did we check what the customer actually needed?”, the engineer listens and
pauses, then replies “I checked the code I wrote. I didn't ask that.” Retain the
existing English WAVs and their synthetic-voice provenance. The two-turn pilot
offers an initial 10.6-second clock at 30 fps (0.5-second lead, 4.8-second
question, 1.2-second listening pause, 3.3-second reply, 0.8-second tail).
Pacing holds may be directed in the script; audio lengths come from saved takes.
A 1080-square production frame follows the existing dialogue convention.

Deliver the baseline film, meaningful reaction revision, editable direction,
retained artwork/rig and sound inputs, and preview/export/reproduction guidance.
Both versions need expressive, coordinated movement and stable appearance at
normal playback with sound, and deterministic frame sampling during seeking.

New spoken lines/voices, Live2D integration, performance-transfer services,
arbitrary rig support, full-body action, multi-shot continuity and a universal
character format are deferred promises, not product rejection rules. The current
3D story is independent. No product-wide actor-count limit follows from this cast.

## Current design decisions

- One script owns speech selection, pauses and acting cues; one compiled film
  clock drives sound, captions, pose and mouth. The character drawing consumes
  that performance. Do not add a second component-local choreography schedule.
- PFE found `illustratedConversation/script.ts` and `performance.ts` already own
  measured speech slots, take-bound mouth cues, silent pauses and frame-sampled
  gaze/tilt/hand targets. Reuse those responsibilities, exposing a coherent part
  if necessary. The existing `ai` reply slot can be cast as the visible human
  engineer; it does not require a robot drawing. Keep that mapping in the scene's
  cast rather than spreading renamed identities through unrelated films.
- The existing compiler interpolates numeric pose fields but switches `mood`
  discretely. It does not already supply smooth facial deformation. Slice 1 owns
  the selected rig's expression transitions and silhouette/gesture requirements.
  If this requires extending the shared sampled pose, preserve existing callers'
  appearance/defaults and exercise all conversation consumers. Do not duplicate
  the speech clock or generalize hypothetical future rigs to avoid that work.
- Start with locally authored vector layers and frame-derived deformation;
  the disposable probe established that this representation can consume the
  existing performance and sound. Retain whichever production art inputs the
  accepted sample actually uses. Routine renders consume local selected inputs.
- `beatTimeline.ts` is the existing ordered clock. `silentScene/compileScene.ts`
  solves travel/prop contact, not facial acting. `featureTeams/shot.ts` handles
  saved footage, not rig direction. `visualTreatments/versions.ts` demonstrates
  named baseline/revision preservation but its registry belongs to another film.
  None needs to become a prerequisite or universal registry for this scene.
- [ADR-0000 — Use Architectural Decision Records](../../../docs/adrs/0000-use-adrs-accepted.md)
  is the only current Accepted record (index/in-file status agree, no successor).
  It retains human ownership of durable decisions and specifies no rig or renderer.
  No conflict or additional North Star topic is needed for this local extension.

## Preparation observations and their limits

[Retained preparation evidence](PREPARATION.md) records the disposable route
probe, literal commands, observations and their limits. It established local
rendering, deterministic sampling and audio reuse; production artwork and
artistic acceptance remained unproved. Execution does not depend on temporary
probe files surviving.

## Outside-in proof ownership

| Final promise | Owner and observable proof |
| --- | --- |
| Recognizable original anime design with expressive, smooth performance | 1: moving casting sample accepted by Terry; 2: full scene at normal speed with sound, including listening and handover. A still or numeric equality cannot accept acting. |
| Selected off-screen question, pause and visible reply form a usable film | 2: real registered preview and export; hear full saved speech, observe quiet mouth during listening/clause gaps, empty pause caption, readable staging and complete tail. |
| One script makes a meaningful surprised → thoughtful revision | 3: change only retained acting direction; actual revised pixels and playback differ coherently while design, takes, mouth timing and captions remain appropriate. |
| Direct, reverse and fresh entry show the same intended performance | 1 for sample; 2 for complete scene; 3 for revised joins. Compare real frame pixels with expected pose/mouth observations and a frozen-motion control. |
| Baseline and revised performance remain available and reproducible | 1 retains production art/inputs; 3 registers both named versions, rerenders from local inputs, checks pictures and audio, and documents authoring and preview/export commands. |
| Existing films keep their behavior | Every slice touching shared performance code owns the full conversation consumer suite and any additional consumers found by search. Reuse old baseline proof where unaffected. |

## Execution context

- Established execution: Rio-chan, publisher `dashboard-territory.local-terry-talks`, Story Branch Mode; execution and originating checkout `/Users/terryyin/git/terry-talks/.worktrees/i-can-make-an-anime-style-character-perform-a-sh`, branch `codex/i-can-make-an-anime-style-character-perform-a-sh` (reused owned linked worktree). No integration-checkout mutation is required.
- Remote `origin` (`terryyin/terry-talks`), trunk `master`; increments publish to `refs/heads/codex/i-can-make-an-anime-style-character-perform-a-sh`. Published claim/base `e629dbbb6eb54c2024cca1c73717e2e8fd2180ad`, starting revision `f7192950c57b28884ffe6ac6f00ded480295b5a6`; initial candidate equals the published claim. Claim CI on trunk is unobserved by this execution.
- Published increments: casting `28122c834ccf693661ea8a80cea8211bd0a6dd33` (base `e629dbbb6eb54c2024cca1c73717e2e8fd2180ad`), full scene `876da6b7a1787aadb48f411f191e210a6387eabb` (base casting SHA), both on the story branch with the current observer. Full scene SHA is the next increment's published base.
- Checkout setup: `pnpm install --frozen-lockfile` passed without lock changes; `pnpm -C terry-moves typecheck` passed on the current dependency state. Resumed Studio session 23108 serves this checkout at `http://localhost:3001`.
- No numeric slice budget or additional replanning override is supplied; existing planning authority applies. No Git pre-commit hook is installed; coordinator uses the package's ESLint fixer with owned changed TypeScript paths for selective formatting, then checks those paths with ESLint.
- CI: GitHub Actions, verified active selector `ci.yml`, display name `CI`, workflow ID 381584897. Resumed Codex stream coordinator `rio-anime`, directory `/tmp/dough-ci-501/watch-Dbnc8T`, PID 5886, PTY session 49933, cell 12; checkout/runtime both resolve to this execution checkout. It observes the authorized story branch, and managed delivery receives these owner inputs.


## Execution progress

Slices 1–2 are accepted and published: [casting proof](CASTING-PROOF.md) retains
Terry's direction and the hair correction; [full-scene proof](FULL-SCENE-PROOF.md)
retains full-film tests, exports, Studio observation and signed-mouth correction.
Slice 3's [revision proof](REVISION-PROOF.md) covers 23 tests, typecheck, both
reproduced films, exact audio equality and revised Studio playback/seeking.
Independent registration refactoring and selective formatting/lint passed;
slice 3 is accepted and ready for managed delivery.

## Story obligations

### G1. Owner assessment of the moving character
Reported: slice 1 — "Terry's artistic assessment and perceived speech synchronization remain pending."
Story clause: "Terry's acceptance of the direction does not pre-accept the yet-unseen final artwork or performance."
Disposition: proved by slice 1: Terry's direction to continue plan execution after sample review and proved hair correction; CASTING-PROOF.md

### G2. Complete off-screen question and listening scene
Reported: slice 1 — "The full off-screen question is intentionally absent from the casting rehearsal."
Story clause: "Deliver the moving scene and its revised listening reaction through the selected authored 2D route"
Disposition: proved by slice 2: FULL-SCENE-PROOF.md

### G3. Named meaningful alternative performance
Reported: slice 1 — "The named final reaction revision is not implemented by the casting rehearsal."
Story clause: "Deliver the moving scene and its revised listening reaction through the selected authored 2D route"
Disposition: proved by slice 3: REVISION-PROOF.md

### G4. Rear hair obscures the neck
Reported: slice 1 — "Terry observed rear hair in front of the neck, resembling a beard, and requested a correction."
Story clause: "the moving character conveys the intended action and emotion with a stable designed appearance."
Disposition: proved by slice 1: CASTING-PROOF.md#rear-hair-correction-after-terrys-review

### G5. Inverted resting-mouth emotion response
Reported: slice 2 — "Negative smile cues deepened a smiling curve rather than conveying the intended reconsideration."
Story clause: "the moving character conveys the intended action and emotion with a stable designed appearance."
Disposition: proved by slice 2: FULL-SCENE-PROOF.md#consequential-correction-and-diagnosis

## Ordered slices

### 1. Cast the engineer through a moving performance sample
Type: Behavior
Status: done
Proof: A registered sample of the actual original character listens briefly,
changes expression/pose and speaks the saved reply; direct/reverse/fresh entry
agrees. Terry can judge the design and acting in motion with sound.

Behavior: Given the selected original adult anime engineer direction and saved
reply → preview/export a small casting rehearsal → see a designed anime face,
coordinated gaze/head/hand movement and speech with usable expression transitions.

Own the new artwork/rig and the minimal shared-performance adaptation it needs.
Start with the retained reply plus a short directed silent lead; use the actual
audio/mouth track, not placeholder amplitude flapping. Establish separate facial
features and purposeful deformation/pose transitions sufficient for this scene.
Retain art source, selected recording references and provenance. A prototype
recoloring the old geometric actors does not satisfy this outcome.

Add focused script-to-render proof through the real registered composition.
Compare first, middle, speech-gap and fresh/reverse frames; verify motion and
expected mouth/face changes alongside equality. Exercise the full existing
conversation suite if its compiler/types/metadata are adapted. Use
`dough-manual-testing` during execution for the sample's Studio playback/seek
journey, then obtain Terry's assessment of the visible moving result.

This is the permitted early probe for the owner-held artistic premise. If the
sample is rejected, retain the result and feedback, stop slices 2–3, and revise
the design or return a route/scope change to refinement. Do not silently substitute
Live2D/generated footage or call the technical probe artistic acceptance.

Safe stop: a reusable, accepted moving character rehearsal. The full question
and listening arc are intentionally absent here and belong to slice 2.

### 2. Watch the complete question, listening pause and reply
Type: Behavior
Status: done
Proof: The original film communicates surprise and reconsideration in the
complete scene at normal playback with sound, and its actual export matches
the directed timing and intended character on arbitrary frame entry.

Behavior: Given the accepted character sample → author the off-screen question,
surprised listening reaction, pause and visible reply in one script → preview
and export a watchable full scene with natural transitions and stable design.

Reuse the measured takes and cues; stage the speaker's gaze and gesture around
the off-screen colleague and allow a purposeful settle before/during the reply.
Fit captions and voice credits without obscuring acting. Clear captions and
rest the speech mouth in the listening pause; keep expressive acting alive there.
Use frame-derived motion including any secondary hair/clothing response, without
requiring a simulation whose output depends on visited frames.

Proof owns the complete audio/visual composition, not only compiler output:
play it at normal speed with sound, inspect starts/ends and expression/gesture
joins, and check backward seeks and a fresh mount during the handover. Confirm
the export contains full speech and correct duration, and the same sampled
poses as preview. Keep a visible motion assertion so identical frozen frames
cannot pass. Address stiffness, snapping, layer separation or mouth/voice drift
within this slice before claiming the original film accepted.

Safe stop: Terry has the complete original scene and its editable direction.
The delivered meaningful alternative performance remains owned by slice 3.

### 3. Revise surprise into thoughtfulness and reproduce both versions
Type: Behavior
Status: done
Proof: Editing the named reaction in the script produces a coherent thoughtful
version with the same design and soundtrack; both registered versions reproduce
from saved inputs through documented commands.

Behavior: Given the original film → change its listening cues to a slower gaze
away, head inclination and considered hand gesture → obtain the revised acting
without changing the drawing's choreography, saved takes or mouth schedule.

Keep named baseline/revision scripts and compositions. Shape their entry/exit
poses so the revised reaction flows into the same reply; choose the revision's
affected interval from its actual cues instead of imposing the earlier film's
frame numbers. Both versions retain the chosen character appearance.

Compare complete normal-speed performances with sound. Check observable changed
acting within the directed interval, stable design and preserved intended poses
outside it, and direct/reverse/fresh sampling at revised transitions. Compare
decoded actual soundtrack PCM for equality, not only script references. Restore
the baseline selection and reproduce both exports using retained inputs with no
acquisition/generation step. Document the editable cues, retained input locations,
the exact preview/export commands and which performance each version selects.

Safe stop: the whole story is usable even if no other anime story is built.

## Verification, delivery and sizing

Execution follows the installed `dough-execute-plan` workflow, including its
independent post-change refactoring and commit/delivery gates. No numeric slice
budget or S/M/L definition is supplied; each Behavior has one bounded observable
outcome and its implementation, focused proof and cleanup stay together.

Use new focused anime composition/rig tests plus
`pnpm -C terry-moves test:unit --runInBand tests/illustratedConversation` for
changes reaching the shared performance boundary. The observed 24-test suite
is small enough to run whole. Run `pnpm -C terry-moves typecheck` when the shared
pose contract or root composition registration changes, since static consumers
cross the scene boundary; lint the affected files. Search and include additional
consumers if implementation changes their contracts. Do not rerender unrelated
films or run the Slidev/Python suites solely because this scene is added.

Use real rendering and the bounded manual journeys in the slices for artistic
and seeking claims. Automated checks protect timing, changed motion, continuity
and retained assets; they do not accept emotion. Record literal proof commands,
observations and Terry's artistic decisions during execution in this plan.

The sequence uses one performance/clock model and one retained character design.
It separates the early artistic risk, complete-scene behavior and meaningful
revision without adding a framework or an independent infrastructure outcome.
Slice-plan refinement was not needed: this review found no remaining concern
about slice boundaries, cumulative design, sizing or proof ownership. Artistic
acceptance is explicitly owned by the early sample and final playback, not
assumed from preparation's technical render.
