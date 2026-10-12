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

<a id="3d-character-action"></a>
### 10. I can direct a 3D character performing a short action

**Identity:** terry-moves-filmmaking#3d-character-action
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../.planning/quick/037-3d-character-action/PLAN.md","assessment":"ready","reasons":[],"basis":{"document":"d4e3daa08ba9963ccc17ce8b4a6c2c10b692af44f114f81ebfc789e6b2c402b5","plan":"572d1e43cde71e2f44eb8ca803b73bb95d36d520360c1b37411b6f475ddc969a"}}
```

**Goal.** Terry can direct recognizable 3D acting in a watchable short film,
then meaningfully revise the performance through its script. The usable result
includes the film, retained production inputs and a reusable direction path;
displaying a model or demonstrating an animation adapter alone is insufficient.

**Scope.** One compatible character performs intended named actions in a short
scripted sequence. The selected walk, turn and gesture read clearly, their joins
look natural at normal playback, and foot placement/contact remain acceptable
for those actions. Direction owns action order and timing; a supported revision
must not require repairing component choreography or an independent clock.
Preview, export, backward seeking and a fresh mount in the middle give the same
intended performance. Retain the selected character, compatible motion inputs,
their source/permissions and the original/revised scripts so routine reproduction
does not depend on reacquiring assets.

Arbitrary rigs, automatic retargeting, universal blending, advanced secondary
motion, speech and the later anime-character outcome are deferred promises,
not rejection rules. One supported example does not impose a product-wide actor
or action limit. No mandatory sibling dependency is established: the [cinematic shot](src/cinematicShot/README.md)
may offer staging, but this story owns any staging its action needs.
The selected scene is a short silent RobotExpressive greeting: walk in, turn
toward the viewer and wave. The meaningful revision replaces the wave with a
thumbs-up. Terry accepted this recommendation on 2026-10-12.

**Key examples.**

- Given the selected compatible actor and actions → play/export the scripted
  walk, turn and gesture → only the intended performance plays, its joins read
  naturally, and visible feet do not distract through sliding, floating or
  penetration. Evaluate the complete motion at normal speed, including the turn.
- Given that film → change a supported gesture or action sequence in the script
  → obtain a visibly different performance with usable timing and joins, without
  editing a second representation of the choreography.
- Given a frame within a clip or transition → arrive by forward playback,
  backward seeking or a fresh middle-frame mount → see the same skeletal pose,
  world position, facing and relevant expression. A frozen actor does not satisfy
  this example merely because every sampled image matches.
- Given saved inputs and the selected take → reproduce the original and revision
  → recover their intended performance without downloading or regenerating the
  actor or motion. Document the editable direction and preview/export route.

**Exploration and decision (Terry, 2026-10-12).** Terry accepted the robot
greeting and compatible-GLB recommendation and instructed preparation to proceed.

| Candidate | Fit against acting, revision, joins and seeking |
| --- | --- |
| Extend the existing GLB wrapper with named clip switches | Strongest simpler reuse option: the project already loads animated GLTF and supplies a frame-derived time. Selecting one clip addresses accidental simultaneous playback. Hard switches alone do not establish natural walk/turn/gesture joins; adding transition timing would lead toward the next candidate. |
| Compatible GLB actor with a script of timed, blended clips — selected | Reuses browser rendering and the existing frame timeline; keeps clip choice, local time, world motion and blend weights reconstructible at any requested frame. A saved actor with compatible clips avoids a retargeting prerequisite. The preparation probe established rendering, frame reconstruction and a support-foot-based turning candidate; final contact and performance remain execution acceptance. |
| Author and bake the performance offline, then import the rendered shot | Offers direct control over poses and contact, but the reusable revision path must actually consume the script, retain rig/scene inputs and rerender the changed performance. A hand-edited movie would miss the story's revision promise. No offline route was validated in this preparation. |

The borrowed mechanism is an **audio sequencer**: a saved sample corresponds to
a motion clip, a sequenced region to an action, region offset to local clip time,
gain envelopes to pose-blend weights, and transport position to the requested
Remotion frame. Adapt it by deriving the active clips, times and weights directly
from that frame, instead of waiting for playback events. This is a candidate
mechanism, not proof: overlapping audio needs no shared skeleton or grounded
contact, whereas blended character poses do. A smooth blend can still slide feet.

The selected greeting gives the actions a readable intention and makes the
revision change the acting. Turn while stepping into the final facing, then
settle before the gesture; the story does not require a stationary pivot.

**Architecture.** Keep one authored direction and one frame-addressable
evaluation path for preview/export. Reuse `src/beatTimeline.ts` for ordered
timing where its semantics fit, and the installed Three/Remotion rendering
stack. A character adapter would own clip sampling and applying a pose to its
rig; world translation/facing and skeletal motion need explicit ownership to
avoid moving the actor twice or depending on a previous frame.

PFE inspected `AnimatedGlb`, `GLBAnimationActioner`, `AnimationContextWrapper`,
`Script`, `GLTFNode`, `beatTimeline` and `silentScene/compileScene`.
`AnimatedGlb` starts every loaded action and uses R3F's render loop to set mixer
time. Its current consumer is the watering asset in `StoryProductDeveloper`;
changing its default playback would affect that film. The older action context
owns subtitle timing and global GLB time, not clip names and transition weights.
The silent-scene compiler offers a useful pattern for deriving joins from ordered
actions, but its 2D arm reach and prop-ownership rules do not solve skeletal
3D contact. Preserve those domain boundaries. Final placement remains a local
design choice; no universal character
engine, new product-wide format or dependency on sibling work is
established here.

The [Remotion ThreeCanvas guidance](https://www.remotion.dev/docs/three-canvas)
requires frame-driven animation; Three's
[AnimationAction API](https://threejs.org/docs/pages/AnimationAction.html)
provides local clip time and effective weights. The preparation probe observed
direct clip-time/weight sampling through actual rendering, including reverse
order and a fresh middle-frame mount. Use these frame-derived values instead
of relying on accumulated mixer time or event-driven fades. Let ThreeCanvas's
loading boundary wait for the asset: an inner null-fallback Suspense in the
probe allowed empty first/fresh frames until removed.

The only current Accepted record is
[ADR-0000 — Use Architectural Decision Records](../docs/adrs/0000-use-adrs-accepted.md),
with matching index/in-file status and no supersession. It preserves human
ownership of durable decisions and specifies no renderer or rig format. No
conflict was found. These are story-local design proposals, not an ADR proposal
or approval.

**Observed basis and limits.** R13 in the
[filmmaking research](research/2026-10-07-filmmaking-opportunities.md) identifies
named motion as the gap. Inspection here confirmed the wrapper's all-actions
loop; this is a code observation, not a rendered symptom reproduction. Existing
saved GLB/GLTF assets inspected by filename offered no established actor with
the required walk/turn/gesture performance.

On 2026-10-12 a disposable download of
[RobotExpressive and its README](https://github.com/mrdoob/three.js/tree/dev/examples/models/gltf/RobotExpressive)
was inspected outside tracked product files. The source identifies Tomás Laulhé
as creator, Don McCurdy's modifications and CC0 1.0. The 463,988-byte GLB has
SHA-256 `047f5e5fb3bb6d378bd1df16ca6137f2a596c99b3a1b5690b4020c05aaf6f319`,
two skins, no external buffer/image URI, and named clips including `Idle`,
`Walking`, `Wave` and `ThumbsUp`. There is **no dedicated turn clip**. File
inspection establishes those contents. A subsequent disposable browser probe
in this workspace loaded the actual actor, rendered 150 distinct frames with
identical reverse-order counterparts and an identical fresh frame 100, changed
Wave to a visibly different ThumbsUp pose, and encoded an MP4. A frozen-skeleton
mutation changed the expected frame, so equality alone cannot hide no motion.

The probe sampled a walking cycle while turning the actor's facing by 90 degrees
over continuing steps. A deterministic path precomputed from clip samples held
the selected support-foot point horizontally; observed drift was below 1e-12
model units. This establishes a feasible local mechanism, not full sole contact,
smoothness or artistic acceptance. The finished film still needs normal-speed
review of planted feet, weight changes, joins, staging and gesture readability.
Do not silently substitute a sliding root rotation for that acceptance.

**Plan.** [Direct and revise a 3D robot greeting](../.planning/quick/037-3d-character-action/PLAN.md)
records the consuming observations, their limits and the ordered execution proof.

**Safe stopping point.** Terry can make and revise the selected actor's
supported actions even if anime, speech and advanced simulation are never added.

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
  demonstrates this visual style, and `TreatmentTypographyV1` in
  `terry-moves/src/visualTreatments/` directs one passage with type and cards
  through the shared beat timeline ([treatment guide](../Problem%20Decomposition%20Remake/visual-treatments.md)).
  The new outcome is reusable direction and revision, not another bespoke copy
  or a general typography framework.
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
- Story 5's refinement settled its first scene on the same silent-scene path:
  the Engineer takes a wrench from a desk, carries it, and puts it down on
  another surface. An out-of-reach pick up gets feedback rather than inferred
  travel, matching the accepted boundary on automatic joins.
- Story 6's refinement settled its first film on the AI test automation
  workshop under its performance-led clock, with Terry choosing the region
  and the winning candidate at audition; replacing a performance in a
  motion-led recorded-voice film (Story Impact's path) waits for a later
  selection.
- Story 7's refinement settled its first film on Feature Teams' speaker
  shot, proved with same-performance replacements derived from the approved
  clip; re-aligning the animation to a differently timed performance, and an
  illustration slot, wait for a later selection. Planning found that the
  unchanged Feature Teams film does not render byte-identically twice, so
  the compare command's exact rule cannot certify it; whether Preserved
  should tolerate renderer noise is Terry's decision, outside this story.
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
