---
id: terry-moves-filmmaking
status: proposed-decomposition
created: 2026-10-07
created_during: Terry Moves filmmaking research, user-value review, and Terry's instruction to change the near-future direction and queue the agreed stories
trigger_when: Now; Terry selected this direction and asked for these stories at the top of the product backlog
scope: 18 queued stories; S/M/L bands unassigned (no project definitions)
---

# Terry Moves filmmaking: varied films directed through rearrangeable scripts

## Parent problem and desired effect

For **Terry**, making and revising films currently requires substantial bespoke
Codex work on choreography, diagram geometry, pacing, assets, and presentation.
Some films technically succeed while their argument, metaphor, or performance
still misses his intent. Terry wants to use Terry Moves to make great films in
varied visual styles, through a script he can rearrange while supported actions
connect naturally. The script can describe silent action; it need not be the
subtitles or the narration.

Terry evaluates the usefulness of the authoring workflow and the artistic result.
Viewers evaluate whether the film communicates its intended idea. Every story
must leave Terry with an immediately usable outcome even if all later stories
are cancelled. New-style stories deliver a watchable film, a reusable authoring
path, and a meaningful revision through that path. A library, adapter, attractive
still, or bespoke demonstration by itself does not deliver that benefit.

## Confirmed direction and selection

On 2026-10-07 Terry accepted the revised 18-story list and instructed that the
near-future direction change and these stories go at the top of the backlog in
the proposed order. The direction is:

> Use Terry Moves to make great films in varied visual styles through scripts
> whose rearrangeable actions connect naturally.

The agreed boundaries are:

- Script-driven direction remains central. Captions, speech, music, and silent
  action can supply different timing policies for a chosen film.
- Each story represents Terry's interest and delivers a complete usable benefit.
  Necessary internals belong inside the outcome they serve.
- Matrix or layout helpers, anchors, diagnostics, motion presets, focused
  previews, release reproduction, credits, and saved-asset handling are supporting
  work within the relevant story, rather than separately queued infrastructure.
- Start with concrete supported examples. Automatic joins do not promise that
  arbitrary reordered scenes or incompatible actions acquire coherent meaning.
- Rich characters, 3D, and generated realistic footage are separate creative
  opportunities. All authoring improvements need not finish before a new style
  is tried; Terry can reprioritize one when his creative interest calls for it.
- The existing conference-readiness and Story Impact voice-over stories stay
  below the additions. Their scope and lifecycle are unchanged.

This seed records the accepted selection and known details. The stories remain
unrefined preparation input; production choices and precise acceptance examples
will be settled when a story is selected. No implementation plan is introduced.

## Alternatives and decision

| Alternative | Assessment |
| --- | --- |
| Defer improvements and keep the current engine | Avoids investment, but leaves Terry's reported revision burden and limited range of styles. |
| Keep making every film with bespoke Codex code | The strongest simpler alternative: already useful and flexible. Retain it as an escape hatch, but repeated timing, staging, geometry, and review work makes it insufficient as the whole product direction. |
| Adopt a complete external editor | May help specific editing tasks. Evaluate existing Remotion Studio controls when needed; current observations do not establish a reliable visual-edit-to-script round trip for every composition. |
| Generate every scene as video | Expands visual reach but does not guarantee exact choreography, selective revisions, or continuity. Treat generated footage as a selected asset route within a scripted film. |
| Build a universal engine or matrix system first | Has no immediate film benefit and would encode hypothetical requirements. Shared concepts should follow repeated useful examples. |
| Deliver the agreed usable stories | Selected by Terry. First test whether rearranging silent actions gives useful continuity without manual repair; then preserve approved work and expand styles through finished, revisable films. |

## Story decomposition

All stories are for Terry. Qualitative effort notes describe breadth, uncertainty,
and assumptions, not delivery estimates. S/M/L bands remain unassigned because
the project has no definitions. The research references R01–R28 below are
provenance labels; the recorded identities are the canonical work identities.

<a id="preserve-approved-film"></a>
### 2. I can correct one visual moment without disturbing the approved film

**Identity:** terry-moves-filmmaking#preserve-approved-film
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../.planning/quick/013-preserve-approved-film/PLAN.md","assessment":"ready","reasons":[],"basis":{"document":"6a13faa075edf4c853ad4ba3ae1abd85fe5f4a5c2538a48fa85c0b04f8c06cee","plan":"65089f24ae9818b4b753e656e05e0cb9c30ade95f604d029696a01b9a632971a"}}
```

**Goal.** Terry can ask for a small visual correction to a film he has already
approved and trust the answer without rewatching the whole film. He sees the
corrected moment before and after. He also gets evidence that the narration,
timing and the rest of the picture did not change. This reduces revision
anxiety and repeated review. It serves the direction of revisable films through
scripts: an approved film stays approved when one detail changes.

**Scope.**

- *Approved baseline.* The approved film is a Git revision of that film. By
  default this is the committed state, and the correction is the uncommitted
  change. Terry or the agent can name another revision, for example to replay
  a past revision.
- *Declared correction.* Each correction names the film and the moments it
  intends to change: one or more time or frame ranges. A range may extend to
  the end of the film when the change correctly persists into later shots. In
  the decomposition film, for example, the assimilated cells remain on the
  product wall until the end. The opening cover shows that final pose, so it
  changes too.
- *Focused before/after preview.* Terry gets a comparison of the declared
  moments at the baseline and the correction, without encoding either film.
  It uses the same picture, side by side or as matched stills.
- *Preservation evidence.* A single report compares the correction with the
  baseline. It states that the approved audio is unchanged: the same narration
  and score, placed and mixed as before. It states that the timeline is
  unchanged: the same scene and caption boundaries, captions and total
  duration. It also states that every frame outside the declared ranges is
  unchanged. Any
  difference outside the declaration names the time and the kind of change, so
  that Terry reviews only that.
- *Which films.* The workflow works on an existing film whose timeline comes
  from its script and whose audio comes from saved assets. The first supported
  film is the problem decomposition film (`ProblemDecompositionFilm`). Other
  films of the same shape need no separate design.
- *Rejection constraint.* A correction that changes timing or audio is
  reported as a preservation failure, not accepted as a visual correction.
  This follows the story's own promise to leave the approved performance and
  timing untouched. An intentionally different narration duration belongs to
  [story 6](#replace-narration-performance).
- *Deferred.* This story does not cover:
  - retiming, reordering or re-voicing;
  - a general visual editor or Studio round trip;
  - proving a second film or a new diagram correction;
  - reproducing a full release (film, cover and subtitles) from saved inputs.

  Naturally supported films of the same shape are not rejected.

**Key examples.**

1. *Replay of a real correction.* The baseline is the decomposition film
   before `1334426`, and the correction is `1334426`, which scattered the
   assimilated blue cells across product columns. Two moments are declared:
   the opening cover, which shows the final pose, and the assimilation cue
   (about 76 s) to the end of the film. Terry sees the assimilation moment
   before and after: one blue column becomes three scattered blue cells. The
   report shows that the audio, the scene and caption timeline and the total
   duration are unchanged. It also shows that every frame between the cover
   and the assimilation cue is unchanged.
2. *Too narrow a declaration is caught.* The same correction is declared only
   for the assimilation beat. The report flags changed picture in the cover and
   in the later health and end scenes, and names their times. Terry either
   widens the declaration or rejects the side effect.
3. *Accidental timing change is caught.* A correction also nudges a scene
   boundary or the total duration, for example after editing
   `film-script.json`. The report fails on the timeline and names the scene
   that moved, even though the declared visual change looks right.
4. *No change.* A correction with no effective change yields an empty
   before/after difference and a fully preserved report. It does not invent a
   change.

- **Known basis.** R27, with the focused-preview aspects of R18. Hash and
  equality checks already exist for narration takes in Story Impact and
  AI Test Automation. Scene-boundary alignment tests already exist for the
  decomposition film. Reuse them; release reproduction (R19) stays out.
- **Depends on:** None; uses an existing film.
- **Safe stopping point:** Local visual revisions remain useful without any
  new film style or wider authoring system.

<a id="restage-diagrams"></a>
### 3. I can restage an animated diagram without repairing its relationships

**Identity:** terry-moves-filmmaking#restage-diagrams
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../.planning/quick/013-restage-diagrams/PLAN.md","assessment":"ready","reasons":[],"basis":{"document":"1cb2057f66401ed6c8503d1f0910a0ac5f661c4d732a84563537c7a227298d4f","plan":"291964cb10ab7d329d0b7e90a7963e915e447fc817df296c4c2256058dfb6d9d"}}
```

#### Goal

Terry can improve an animated diagram's composition and readability by changing
its authored positions and sizes, without separately repairing its arrows,
labels, or relationship-dependent motion. The revised film must communicate
the same relationships throughout the animation. This reduces the repeated
geometry work within the accepted script-driven filmmaking direction.

#### Scope

- Use the existing ATDD scenario circle and solution tree as the two concrete
  examples in the selected circle/tree family. Their source is available on
  `codex/atdd-short-film` at `c379fd4`, but is absent from this preparation's
  `7c6f984` baseline. Bringing the source and saved assets needed for these
  examples into Terry Moves belongs to this delivery; it is not a prerequisite
  story or authority to incorporate unrelated work from that branch.
- Restage through authored script/scene data: change the circle's placement
  and available space, move the backlog, change a sheet or participant's size,
  and move or resize tree nodes. Terry edits the intended staging inputs once;
  dependent drawing and motion follow without editing individual SVG paths,
  arrowhead angles, label coordinates, or collaborator waypoints.
- Preserve node identity, topology, edge direction, and the meaning and order
  of visible states. The circle remains one clockwise circumference with its
  integrated fork and reunion. The six sheets are successive states of one
  scenario; the five collaborators retain their identities through the 3/2
  split and reunion. The tree retains its uneven hierarchy and the scenario
  traversal through front-end and back-end detail. These are source-specific
  requirements from `ATDD/diagram-analysis.md` and the accepted layout correction
  in `.planning/quick/012-atdd-film/PLAN.md` at `c379fd4`, rather than
  restrictions inferred from the example counts.
- Attach connectors to the current node outlines with their authored clearance;
  keep arrowheads aligned with the arriving route. Labels and badges follow
  their owners and remain readable in the demonstrated layouts. Authored route
  lanes and designated label reservations govern connector and collaborator
  clearance, including intermediate animation poses, not just final boards.
- Demonstrate a meaningful before/after staging revision in both diagrams using
  the same relationship-authoring responsibility. Circle and tree routing can
  remain different domain rules. A second colorway or whole-diagram transform
  alone does not demonstrate independent node restaging or reuse.
- Keep the examples watchable and revisable in Terry Moves with saved local
  media. Restaging preserves the existing argument, narration, beat timing, and
  visual state sequence. This is a property of the selected restaging operation,
  not a general approved-film locking or comparison workflow from story 2.

**Deferred promises:** a visual drag editor or visual-edit-to-script round trip;
automatic graph layout, arbitrary obstacle avoidance, or a general constraint
solver; 3D world projection; topology editing or new narration; a universal
matrix system; and migration of every existing diagram. Naturally supported
uses remain allowed. This story supplies no new rejection rule, node-count
limit, or guarantee that overlapping placements and insufficient route space
can be made readable automatically.

#### Key examples

1. **Make room around the circle.** Given the animated ATDD circle with its
   compact backlog and local loops, Terry moves its center, changes its radius,
   and moves the backlog through the staging data. On preview, the sheets and
   their connecting arcs share the new circumference; backlog-to-scenario and
   local-loop routes still join their intended outlines, point in the same
   direction, and clear the designated labels. Narration and beat timing stay
   the same. The result is visible during motion as well as on the complete board.
2. **Resize within the split and reunion.** Given the same circle, Terry enlarges
   a sheet and a collaborator without changing their identities or authored
   route roles. Through the existing split and reunion, connectors keep their
   clearance from the resized sheet, its label and badge stay legible, three
   people still take the front-end route and two finish the scenario, and all
   five reunite at the completed sheet. Their paths use the reserved lanes and
   do not sweep across the designated sheet labels. A sound final still with a
   broken intermediate journey does not meet this example.
3. **Restage the solution tree.** Given the existing tree and green scenario
   traversal, Terry widens the front-end box and moves the back-end branch and
   its descendants. The parent/child connectors follow the new box edges; the
   green trace still descends through front-end detail, returns, crosses to the
   back end, and descends into its detail. The end-to-end and internal test
   probes retain their distinct attachments and meanings. Labels remain readable
   without a second edit to trace points or probe positions.
4. **Revise again through the same authoring path.** Given either revised
   example, Terry changes another supported placement or size and previews the
   relevant motion again. The same inputs drive nodes, attachments, labels, and
   route landmarks. There is no new per-revision repair code or duplicated
   coordinate list. Existing static diagram exports, when carried with the
   source examples, use the same drawing as the animation.

#### Alternatives and recommendation

All candidates are judged against independent restaging, faithful relationships
during motion, readable authored layouts, and reuse in the second example.

| Candidate | Assessment |
| --- | --- |
| Keep bespoke coordinates; translate or scale the whole diagram | Strongest simpler existing solution. It preserves relative geometry for global placement, but cannot move the backlog, resize one sheet, or restage a branch without repairing dependent coordinates. Keep such transforms where sufficient. |
| Extend the existing DOM-measured actor connectors | Already names source and target actors and draws a bent directed edge. Useful existing identity vocabulary, but its separate numeric radii and center-based curve do not own sheet outlines, the common circumference, label reservations, tree traversal, or collaborator lanes. It is not a complete solution to this story. |
| Adapt parametric drawing to authored diagram relationships | Recommended design direction: retain stable identities and authored relationships, then derive attachments, labels, and route landmarks from each current pose. Reuse and extend ATDD's outline clearance, shared arcs, tangent markers, rounded routes, and existing motion. This addresses the observed duplicated geometry while keeping circle/tree rules explicit. |
| Adopt a general graph/constraint-layout solver | A different allocation of responsibility: the solver chooses geometry from constraints. It could reduce placement work, but preserving this film's exact circle, fork, traversal, and choreography is not demonstrated. The accepted authored-route scope provides no need to commit to this broader capability. |

**Borrowed mechanism and limit:** parametric CAD sketches retain relationships
between geometric objects while dimensions change; FreeCAD's
[Sketcher documentation](https://github.com/FreeCAD/FreeCAD-documentation/blob/main/wiki/Sketcher_Workbench.md)
describes geometric and dimensional constraints. Here the geometric objects map
to identified nodes, dimensions to staging inputs, coincident/tangent relations
to outline attachments and route direction, and construction geometry to
authored route landmarks. Adapt that mechanism as forward derivation from the
current animated pose. The analogy does not establish film readability or
performance: CAD's general solver neither decides narrative meaning nor finds
clear collaborator motion. No CAD dependency or bidirectional solver is proposed.

#### Investigation evidence

Read-only investigation on 2026-10-07 established:

- **Available source, not integrated capability:** the clean ATDD worktree at
  `/Users/terryyin/.codex/worktrees/atdd-short-film/terry-talks`, revision
  `c379fd4`, contains `src/atdd/`, `ATDD/film-script.json`, diagram/source
  documentation, saved narration and score, and `ATDDFilm` plus the two static
  diagram compositions. This preparation contains none of `src/atdd/`.
- **Reusable rules and remaining duplication:** `circleLayout.ts` derives arcs
  and clearance from sheet outlines, but initializes checkpoint positions only
  once. `diagrams.tsx` derives tree parent edges from node dimensions while its
  scenario route, test-probe routes, backlog routes, and team positions contain
  independent coordinates. `CollaborationDiamond.tsx` likewise holds fixed
  collaborator waypoints. `geometry.ts` preserves endpoints when rounding bends;
  `pieces.tsx` owns the sheet outline and tangent-oriented arrow markers.
- **Observed consumer behavior:** using the source worktree's installed `tsx`,
  React, and `react-dom/server`, rendered `ScenarioCircle` to SVG markup, changed
  `circle.x` from 610 to 690 and `circle.radius` from 280 to 320 in that disposable
  process, then rendered again. The new arc appeared in the drawing, but the
  first checkpoint stayed at `(610, 205)` and the drawing kept its old node
  origin. This settles that changing the current circle object alone does not
  deliver restaging; it does not claim a successful implementation.
- **Source components can be consumed locally:** separate SVG-markup renders of
  the existing circle at the midpoints of phases 9 and 10 and the growing tree
  near scene 1's end completed with no `NaN` or `Infinity`. These observations
  establish local source availability, not visual readability, media playback,
  or the quality of a revised film. No source files or assets were changed.
- **Existing alternative checked across the product:** the legacy
  `video_components/private/Connector.tsx` resolves actor IDs and bounding boxes
  but uses separately authored source/target radii. Its tests cover fixed
  bounding-box fixtures and connector timing. Story Impact/Feature Teams use
  pose and layout helpers; Slidev's Mermaid diagrams serve slide layout rather
  than these animated sheet and collaborator relationships. None is an already
  demonstrated complete restaging solution.

The recommendation is a design proposal supported by these observations, not
an assertion that new layouts already work. The remaining quality hypothesis
is whether derived outlines and authored lanes keep both revised journeys
readable. The cheapest settling observation once execution is authorized is a
short before/after motion preview of the concrete examples, including split and
reunion and the tree's cross-layer traversal. The current observation cannot
settle that future behavior without implementing it; no paid service or new
performance recording is required.

#### Architecture

The consequential responsibility is coherent geometry ownership: node drawing,
connector attachment, labels, and relationship-dependent motion consume the
same current pose and authored relationships. Keep topology separate from
placement so a geometry revision cannot silently reconnect identities. Share
domain-correct outline, attachment, and route derivation where the two examples
need it; do not force different circle and tree rules into one representation
merely to share code. Frame evaluation must derive the requested pose directly,
so seeking in Studio does not rely on a previous frame having run.

This is a bounded extension of existing diagram/pose responsibilities. It does
not choose a repository-wide scene format, replace the script engine, or grant
an exception. The ADR index and record agree that
[ADR 0000 — Use Architectural Decision Records](../docs/adrs/0000-use-adrs-accepted.md)
is Accepted; it requires human ownership of durable cross-cutting choices.
There is no current Accepted diagram-engine decision or conflict. Any later
cross-cutting format or engine choice requires that ADR process rather than
being smuggled into this local design.

- **Depends on:** None; the source needed for the existing examples is locally
  available and incorporation is part of this story.
- **Safe stopping point:** Terry can restage both supported animated diagrams
  through their authored inputs even if a broader layout system is never built.
- **Value / effort hypothesis:** Faster faithful diagram revision. The work
  spans source incorporation, coherent animated geometry, and two meaningful
  revisions; it needs slice planning. No S/M/L band or delivery date is assigned.

<a id="choose-visual-treatment"></a>
### 4. I can choose a visual treatment that expresses my idea before producing the whole film

**Identity:** terry-moves-filmmaking#choose-visual-treatment
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Terry can reject a mistaken metaphor, tone, or interpretation
  while the correction is still small.
- **Outcome and scope:** Compare two short moving treatments of the same
  explanation, including key poses, and carry the chosen treatment into
  production. Record the essential argument and any selected series motifs,
  diagram relationships, and branding that both treatments must preserve.
- **Evaluation example:** Terry watches two samples of one idea and chooses
  the one whose tone and action convey it. The selected sample can be continued
  into the film without discarding its approved direction. A supporting example
  must not silently replace the source argument or its diagrams.
- **Known basis and boundary:** R03 with relevant visual-language aspects of
  R20. The decomposition remakes lost recognizable motifs and the intended
  argument; the first ATDD adaptation omitted its source diagrams. This is a
  reusable treatment decision workflow, not two complete films or a universal
  theme system.
- **Value / effort hypothesis:** Earlier artistic feedback and fewer large
  remakes. Moderate scope; high confidence in value; the first source idea and
  two treatments remain to choose.
- **Depends on:** None.
- **Safe stopping point:** Terry retains the samples, decision, and usable
  chosen treatment even if the full film is deferred.

<a id="character-prop-interaction"></a>
### 5. I can bring an existing character into a new scene and direct a believable interaction

**Identity:** terry-moves-filmmaking#character-prop-interaction
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Terry can reuse a character and direct recognizable action
  without new bespoke choreography or visibly stretching limbs.
- **Outcome and scope:** Cast an existing cartoon character into another
  scene; direct reaching for, acquiring, carrying, and releasing a prop. Keep
  contact, reach limits, character identity, ownership, and visibility coherent
  across the supported interaction and its compatible beats.
- **Evaluation example:** A character picks up an object, carries it into the
  next beat, and puts it down. Terry changes one supported action or its order
  and exports again. The held object stays at the hand until release; a reorder
  that contradicts ownership has useful feedback or an explicit authored cut.
- **Known basis and boundary:** R02/R09 and useful expressive-motion aspects
  of R08. AI-testing characters already have articulated arms, hand targets,
  gaze, blinks, moods, and head tilt. Reuse that delivered work. This story adds
  semantic prop interaction beyond story 1's permanently attached prop; it does
  not infer every physical interaction.
- **Value / effort hypothesis:** Reusable character action in a new film.
  Moderate to substantial scope; high confidence in value, with supported
  interaction and contact policy to refine.
- **Depends on:** Story 1's supported movement-join contract for the agreed
  cross-beat interaction; existing character art is available.
- **Safe stopping point:** Terry retains a complete reusable prop scene even
  if dialogue, anime, and 3D character work never follow.

<a id="replace-narration-performance"></a>
### 6. I can replace one narration performance without repairing unrelated scenes

**Identity:** terry-moves-filmmaking#replace-narration-performance
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Terry can improve emotion and delivery without redoing the
  rest of an approved film.
- **Outcome and scope:** Audition and select a replacement recorded or
  synthetic performance for one region. Associated motion and captions follow
  its measured timing under the selected film's policy. Preserve unrelated
  performances, choreography, and approved assets; do not regenerate them.
- **Evaluation example:** Terry replaces a flat line or connected passage
  with a more expressive take of a different duration. Its scene and captions
  follow the selected delivery. Subsequent scenes may shift in absolute start
  time automatically, but their internal timing and approved performances do
  not require repair.
- **Known basis and boundary:** R05 and the selected-asset aspects of R26.
  Recent work rejected fixed-pace isolated clauses and improved connected
  auditions; measured cues and cleaned Terry recordings already exist. This is
  broader reuse, not a replacement or completion of the existing Story Impact
  voice-over story. The chosen motion-led or performance-led timing policy must
  be explicit; uniform subtitle-led timing is not assumed.
- **Value / effort hypothesis:** Better voice performance with contained
  revision cost. Moderate scope; high confidence in value; first region and
  timing policy remain to select.
- **Depends on:** None; can use existing narration and alignment workflows.
- **Safe stopping point:** A selected film can receive isolated new takes
  without requiring a new character, style, or voice provider.

<a id="replace-filmed-shot"></a>
### 7. I can replace a filmed shot while preserving its intended presentation

**Identity:** terry-moves-filmmaking#replace-filmed-shot
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Terry can swap footage or an illustration without rebuilding
  its presentation in the film.
- **Outcome and scope:** Replace saved speaker footage or an illustration
  through the script while retaining intended crop, timing, overlays, and audio
  policy. A different-duration source uses an explicit trim, hold, or edit choice.
- **Evaluation example:** Terry replaces the saved speaker shot beside an
  explanation. The new media fits the selected framing, the explanatory overlay
  remains synchronized, and audio follows the chosen policy. He can render and
  revise the shot through the same reusable path.
- **Known basis and boundary:** R17; Feature Teams already composites real
  speaker footage and animation. Generalize the useful replacement journey for
  a selected example. Generating the footage, arbitrary time stretching, and a
  complete nonlinear editor are outside this outcome.
- **Value / effort hypothesis:** Reusable mixed-media editing. Moderate
  scope; high confidence in value; media/audio policy depends on the example.
- **Depends on:** None; approved saved media is sufficient.
- **Safe stopping point:** Recorded and illustrated films can use the
  workflow independently of generated people or 3D production.

<a id="illustrated-conversation"></a>
### 8. I can make an illustrated conversation with convincing speaking and listening

**Identity:** terry-moves-filmmaking#illustrated-conversation
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Terry can tell a scene through character performance rather
  than a narrator accompanying passive shapes.
- **Outcome and scope:** Make a short exchange with mouth timing, gaze,
  expression, gestures, reactions, pauses, and readable turn-taking. Start with
  a chosen reusable illustrated rig and saved speech. Revise one turn through
  the same authoring path and export a watchable scene.
- **Evaluation example:** While one character speaks, the other listens and
  reacts; their roles then change. Terry changes a line or reaction and the
  resulting performance still feels intentional at normal playback with sound.
- **Known basis and boundary:** R10 and existing AI-testing acting. Recorded
  mouth cues and authored Rive/Lottie animation are candidate routes, not
  selected designs. A validated nonlinear/state-machine rig adapter is not
  already established. This story does not repeat the solved arm repair or
  require prop acquisition, a universal rig, or anime art.
- **Value / effort hypothesis:** A reusable dialogue capability and evidence
  about performance quality. Substantial scope; medium confidence in feasibility;
  rig, voice, and acceptable acting remain to select.
- **Depends on:** None of the queued stories is mandatory; reuse existing
  acting and saved speech where suitable.
- **Safe stopping point:** Terry can make and revise illustrated exchanges
  even if realistic, anime, or 3D characters are never added.

<a id="cinematic-3d-shot"></a>
### 9. I can direct a cinematic 3D shot through the script

**Identity:** terry-moves-filmmaking#cinematic-3d-shot
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Terry can use depth, camera, staging, and lighting to convey
  an idea beyond current 2D treatments.
- **Outcome and scope:** Make an intentional object or environment shot with
  scripted staging, camera movement, and lighting. Render it, then meaningfully
  revise framing or staging through the same path. Save required assets so the
  approved shot can be reproduced.
- **Evaluation example:** Terry changes a camera move or object placement in
  a short scene. Exported frames match intended staging when viewed sequentially,
  sought backward, or mounted directly at a middle frame.
- **Known basis and boundary:** R12 and relevant environment/asset aspects
  of R14. Existing 3D frame, camera, light, and GLB infrastructure is a starting
  point. Browser 3D and offline Blender-rendered media are alternatives to
  evaluate for the chosen shot; full Blender scene parity and character rigging
  are not requirements. A rotating model alone does not establish filmmaking.
- **Value / effort hypothesis:** An immediately usable cinematic 3D route.
  Moderate to substantial scope; medium feasibility confidence, with asset and
  render-route uncertainty.
- **Depends on:** None; object/environment work does not require story 10.
- **Safe stopping point:** Terry retains a finished revisable 3D shot without
  needing a humanoid rig or imported character motions.

<a id="3d-character-action"></a>
### 10. I can direct a 3D character performing a short action

**Identity:** terry-moves-filmmaking#3d-character-action
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Terry can direct recognizable 3D acting instead of merely
  displaying a static model or playing every imported animation.
- **Outcome and scope:** Use one compatible character and intended named
  actions, with acceptable joins in a short scripted sequence. Revise the action
  sequence and reproduce the shot reliably, including arbitrary-frame seeking.
- **Evaluation example:** Terry directs a supported walk, turn, and gesture,
  then changes a gesture or sequence. The intended clips play, their joins read
  naturally, and feet/contact remain acceptable for the chosen actions. Seeking
  or mounting in the middle matches the rendered performance.
- **Known basis and boundary:** R13. The current wrapper starts all imported
  actions, so named selection and joins are useful improvements. GLB/VRM,
  compatible authored clips, and retargeting are candidate routes. Choose one
  rig and check permissions and compatibility; do not promise arbitrary rigs,
  automatic retargeting, or every blend/secondary-motion case.
- **Value / effort hypothesis:** A reusable supported 3D acting workflow.
  Substantial scope; medium confidence, driven by chosen asset/clip quality.
- **Depends on:** None as a mandatory backlog dependency; story 9 may provide
  reusable staging, but this story owns any staging necessary for its action.
- **Safe stopping point:** Terry can make and revise the selected actor's
  supported actions without adding anime, speech, or advanced simulation.

<a id="anime-character-scene"></a>
### 11. I can make an anime-style character perform a short scene

**Identity:** terry-moves-filmmaking#anime-character-scene
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Terry can use richer designed characters with expressive,
  smooth performance rather than only geometric figures.
- **Outcome and scope:** Choose one character design and production route;
  produce a short moving scene and revise a line or action while preserving the
  intended appearance and emotional performance. Retain the authoring inputs
  and selected assets for reuse.
- **Evaluation example:** Terry changes a delivered line or supported action
  and obtains a usable revised scene with the same selected character design.
  He judges movement and emotion with sound at normal playback.
- **Known basis and boundary:** R11. Authored rigs, Live2D, or transferred
  recorded performance are alternatives, with different edit and asset
  requirements. No inspected production validates one route yet. One selected
  route must deliver usable revision; a generic adapter or universal anime
  generator is not the outcome.
- **Value / effort hypothesis:** A new expressive visual language.
  Substantial exploratory scope; production quality and route remain uncertain.
- **Depends on:** None; illustrated dialogue is a possible reuse source,
  not a required route.
- **Safe stopping point:** Terry retains a reusable production path for the
  selected design even if broader anime films are deferred.

<a id="realistic-generated-scene"></a>
### 12. I can make a realistic scene with a person in an environment

**Identity:** terry-moves-filmmaking#realistic-generated-scene
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Terry can tell an idea through believable people acting in
  a real-looking setting, extending the film's visual range.
- **Outcome and scope:** Generate, audition, select, save, and incorporate a
  short moving shot of a fictional person performing meaningful action in one
  environment. Revise the intended shot without recreating approved assets.
  Routine film renders consume saved approved footage.
- **Evaluation example:** Terry directs one action, judges candidate takes,
  and chooses a convincing shot. He revises that action or framing and compares
  the new take. Anatomy, contact, movement, and environmental stability support
  the script; a still with camera motion is insufficient.
- **Known basis and boundary:** R15 with regeneration/caching aspects of
  R26. Veo and Runway offer different external generation/performance routes;
  neither has been validated in this repository. Preserve candidates and
  provenance; measure revision turnaround and cost per approved shot including
  rejects. Provider selection, spending limits, and first action are refinement
  decisions, not authorization to purchase or generate during backlog work.
- **Value / effort hypothesis:** A usable generated live-action asset route.
  Moderate to substantial exploratory scope; provider access, editability, cost,
  and acceptable quality are uncertain.
- **Depends on:** None; any necessary saved-shot assembly is included here.
- **Safe stopping point:** Terry has one finished revisable realistic scene
  and retained assets even if multi-shot continuity proves unattractive.

<a id="generated-scene-continuity"></a>
### 13. I can tell a scene across generated shots with a consistent cast and setting

**Identity:** terry-moves-filmmaking#generated-scene-continuity
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Terry can construct a coherent scene rather than a sequence
  of convincing but unrelated generated clips.
- **Outcome and scope:** Produce a small sequence of generated shots whose
  cast, wardrobe, location, lighting, eye-line, and screen direction support the
  same scene. Replace one shot while preserving the selected surrounding takes.
- **Evaluation example:** Across two or three cuts, viewers recognize the
  same person and setting and understand the spatial action. Terry revises one
  shot and the sequence remains coherent at normal playback.
- **Known basis and boundary:** R16 and relevant R26 asset preservation.
  References, selected takes, and editorial choices may help; seeds and
  reference images do not guarantee identity or deterministic generation. This
  is an observable quality outcome, not just joining several videos.
- **Value / effort hypothesis:** A reusable path to an actual generated scene.
  Substantial exploratory scope; continuity and accepted-shot cost remain risks.
- **Depends on:** Story 12 establishes an acceptable realistic single-shot
  production route first.
- **Safe stopping point:** Terry retains a complete coherent small sequence
  and its selected takes without needing long-form generated filmmaking.

<a id="typography-film"></a>
### 14. I can tell an idea through typography and restrained motion

**Identity:** terry-moves-filmmaking#typography-film
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Terry can choose a clear, expressive style when characters
  or complex scenes would distract from the explanation.
- **Outcome and scope:** Make and revise a short film through script-directed
  type, spacing, emphasis, and restrained movement. Preserve readability and the
  argument; the authoring path should be reusable for another idea.
- **Evaluation example:** Terry changes the emphasis, spacing, or timing of
  a passage. The resulting motion still guides attention and the text remains
  readable at normal playback and at the intended viewing size.
- **Known basis and boundary:** R28. The simple decomposition remake already
  demonstrates this visual style. The new outcome is reusable direction and
  revision, not another bespoke copy or a general typography framework.
- **Value / effort hypothesis:** A lower-asset, reusable filmmaking style.
  Moderate scope; medium confidence; choose the first idea and supported type
  vocabulary during refinement.
- **Depends on:** None.
- **Safe stopping point:** Terry can make typography films without richer
  rigs, 3D assets, or generated footage.

<a id="music-and-sound-film"></a>
### 15. I can make a film whose rhythm follows music and sound

**Identity:** terry-moves-filmmaking#music-and-sound-film
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Terry can tell or evoke an idea through rhythm and sound
  without requiring spoken narration.
- **Outcome and scope:** Make a deliberate short edit whose motion, emphasis,
  and cuts follow chosen musical phrases or sound cues. Revise a cue or phrase
  through the authoring workflow and retain the approved media.
- **Evaluation example:** Terry moves a musical accent or replaces a phrase;
  its intended visual response follows the new cue. The complete piece feels
  intentional with sound, rather than merely displaying an audio waveform.
- **Known basis and boundary:** R24. Existing films already separate voice,
  score, effects, and ducking. Audio-reactive properties and deliberate cueing
  are alternatives to use selectively; the story need not make every visual
  property react automatically. Retain appropriate music/source credits.
- **Value / effort hypothesis:** A distinct reusable sound-led style.
  Moderate scope; medium confidence; the piece, sound rights, and cue policy
  remain to select.
- **Depends on:** None.
- **Safe stopping point:** Terry can make and revise the supported sound-led
  piece independently of narration and character performance.

<a id="geographical-map-story"></a>
### 16. I can tell a geographical story through an animated map

**Identity:** terry-moves-filmmaking#geographical-map-story
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Terry can communicate a route, place change, or geographical
  relationship through purposeful movement and framing.
- **Outcome and scope:** Make a short route/place-change story with readable
  labels and intentional camera movement, then revise a waypoint or shot through
  the same authoring path. Retain the required map inputs for reproduction.
- **Evaluation example:** Terry changes one stop or camera framing. Viewers
  can still locate the route and understand the place change, and labels remain
  readable through the movement.
- **Known basis and boundary:** R25 and external Remotion map guidance.
  There is no inspected local map film to reuse as a demonstrated workflow.
  Choose 2D or 3D framing, data/asset access, provider, and attribution for the
  selected example; a universal geographic platform is not required.
- **Value / effort hypothesis:** A new explanatory film style. Moderate to
  substantial exploratory scope; map dependencies and reproduction remain
  uncertain.
- **Depends on:** None; 3D is an optional route.
- **Safe stopping point:** Terry retains a complete revisable geographical
  film without building unrelated data visualization capabilities.

<a id="portrait-film-edition"></a>
### 17. I can publish a readable portrait edition of an existing film

**Identity:** terry-moves-filmmaking#portrait-film-edition
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Terry can reach viewers on a vertical phone screen without
  losing important action or forcing unreadable labels.
- **Outcome and scope:** Recompose one existing film into a portrait export.
  Revise its focal layout through the authoring workflow while preserving the
  explanation and the approved performance. Produce a publishable file;
  uploading it is a separate instruction.
- **Evaluation example:** A chosen square film becomes a portrait edition.
  Terry watches it at phone size: key action stays visible, labels and captions
  are readable, and a meaningful layout change can be made without hand-editing
  every shot. Merely changing canvas dimensions does not satisfy the outcome.
- **Known basis and boundary:** A narrowed R21 using relevant R04 layout
  work. Existing films already include square and portrait outputs and repeated
  phone-size review. Reuse their helpers for one selected film; all aspect
  ratios and automatic adaptation of every composition are outside scope.
- **Value / effort hypothesis:** A useful distribution edition. Moderate
  scope; medium confidence, depending on the chosen film's composition.
- **Depends on:** An existing selected film; none of the new stories is
  mandatory.
- **Safe stopping point:** Terry can export and revise that portrait edition
  even if no wider aspect-ratio system follows.

<a id="translated-caption-edition"></a>
### 18. I can publish a translated-caption edition of an existing film

**Identity:** terry-moves-filmmaking#translated-caption-edition
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Terry can make a chosen film understandable to another
  language audience without producing it again from scratch.
- **Outcome and scope:** Create a translated-caption edition with suitable
  typography, punctuation, fitting, and reading pace, plus the matching film
  and subtitle export. Revise a translated passage through the same workflow.
  Produce publishable files; uploading them is a separate instruction.
- **Evaluation example:** Terry selects a language and corrects a translated
  passage. Captions update consistently in preview and export, fit the intended
  viewing size, and have readable timing under the edition's selected policy.
  The approved source film remains reproducible.
- **Known basis and boundary:** A narrowed R22. Story Impact already has
  Traditional Chinese captions and narration; subtitle exporters and measured
  timing are existing foundations. A new spoken-language performance,
  translating every diagram label, and language-specific picture changes are
  separate scope unless explicitly selected later.
- **Value / effort hypothesis:** A reusable caption-edition workflow.
  Moderate scope; medium confidence; language, translation review, and handling
  of passages that need more reading time remain to decide.
- **Depends on:** An existing selected film; none of the new stories is
  mandatory.
- **Safe stopping point:** Terry retains the translated edition and its
  revision workflow independently of multilingual voice production.

## Ordering and scope reduction

The backlog follows the accepted order above. Story 1 tests the defining silent
script promise. Stories 2 and 3 reduce evidenced revision pain; story 4 catches
artistic misinterpretation before a whole film is built. Stories 5–8 add reusable
performance and media direction. Stories 9–16 offer distinct creative choices,
followed by two narrowed distribution editions.

Only story 5's cross-beat interaction and story 13's multi-shot generation name
earlier new-story prerequisites. Other earlier positions express priority rather
than mandatory technical preparation. In particular, Terry can choose one new
style early without finishing every authoring improvement first.

Each story owns the preview, diagnostics, assets, export, and credits needed for
its selected outcome. Standalone technical frameworks have been filtered out.
Native visual editing with script preservation remains an unqueued option to
revisit if a chosen story reveals a concrete benefit.

If the near-term budget shrinks, first defer style or distribution stories for
which Terry has no upcoming film, preserving his selected creative experiment.
Do not cancel queued stories silently. Stop after any delivered story with its
usable workflow and assets intact; no story's benefit depends merely on building
the rest of this list.

## Open decisions

- Story 1's refinement settled its first scene on a new silent scene with the
  AI Test Automation Engineer carrying a wrench, rather than an existing film;
  that story should reveal where numeric continuation is sufficient and where
  an explicit authored boundary is needed. Later new-style stories still choose
  their first film and source idea when selected.
- Which new style does Terry most want to use in an upcoming film? The accepted
  queue can be reprioritized to test that interest early.
- For character and generated-media stories, choose the design/rig/provider,
  permitted assets, performance quality, and acceptable iteration cost when
  selected. Research establishes opportunities, not demonstrated local quality.
- For editions, choose the film, target format or language, reviewer, and pacing
  policy. These choices affect bounded scope rather than justify a universal
  adaptation system.
- The old Story Impact voice-over entry requires separate lifecycle
  reconciliation against its full promises; existing recorded narration alone
  does not establish completion. Do not duplicate, expand, or remove it here.
- Project S/M/L definitions remain absent; no bands or delivery dates are assigned.

## When to surface

Now: Terry selected this direction and ordered these stories ahead of the
existing queue. Select and refine one story when deciding the next usable film
capability; backlog membership does not imply execution readiness.

## Breadcrumbs

- Terry's 2026-10-07 requests in this Codex chat: research recent production and
  external Remotion practices; preserve script-driven direction; require usable
  Valuable/Visible/Vertical stories; accept the revised 18-story list; change
  the near-future direction and add the stories at the top with known details.
- [Filmmaking research and evidence](research/2026-10-07-filmmaking-opportunities.md)
  contains production-history coverage, current engine observations, primary
  external sources, and the original R01–R28 menu. Its unchanged-backlog statement
  describes the research stage before this seed and queue update.
- [Product backlog](../.planning/PRODUCT-BACKLOG.md) carries global priority.
  [Story Impact seed](../Story%20Driven/seed.md#terry-voice-over) and
  [conference-readiness seed](../TPS%20and%20AI/seed.md#conference-ready) remain
  separate canonical work.
