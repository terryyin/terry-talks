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

<a id="cinematic-3d-shot"></a>
### 9. I can direct a cinematic 3D shot through the script

**Identity:** terry-moves-filmmaking#cinematic-3d-shot
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../.planning/quick/036-cinematic-3d-shot/PLAN.md","assessment":"ready","reasons":[],"basis":{"document":"88a9d30496d378258170db01ab58ea8e21d9ccf3dd66f2fd54e38ce392d7e940","plan":"61a2a4c15743b4e38c047710984730cc831e1ffe5ca9da5674a14e4860f1e806"}}
```

**Goal.** Terry can convey an idea through depth, purposeful camera movement,
staging and lighting, then meaningfully revise the finished shot through its
script. The first film reveals a bottleneck: local activity initially fills
the view; the camera pulls back to expose work queued at a narrow passage.
The watchable result and reusable direction path both matter.

**Scope.** One short, silent object/environment shot, using browser 3D. Its
script owns staging, camera direction, timing and lighting; the exported shot
and Studio preview consume that same direction. Deliver a finished original,
a meaningful scripted framing revision, and retained inputs that reproduce the
selected result without reacquiring or regenerating assets. A frame's intended
picture is independent of playback history, including backward seeking and a
fresh middle-frame mount. The scene should communicate the constraint through
composition, depth and motion; a rotating model or attractive still is insufficient.

Begin with authored simple geometry and materials, so this film needs no external
model acquisition. Lighting gives the queue, passage and moving work readable
volume and separation. Approximate duration and delivery defaults belong to the
plan and may be tuned to make the reveal read. Full Blender parity, a second
rendering backend, character rigs, arbitrary model compatibility, physical queue
simulation, voice/music and a visual editor are deferred promises, not rejection
rules. No sibling-story prerequisite is required.

**Key examples.**

- Given a close view of moving work → play/export the shot → the pullback reveals
  the queue and narrow passage, then holds long enough to read the relationship.
  Depth and lighting make the objects' spatial arrangement legible.
- Given the original shot → revise the camera's ending position/target or reveal
  timing in its script → export a deliberately clearer view of the queue and
  passage without repairing JSX choreography or a second timing source.
- Given a frame during the camera move → view it sequentially, seek backward to
  it, or mount directly there → the camera, objects and lighting yield the same
  intended picture. Repeat for the revised shot and cue boundaries.
- Given retained original/revised directions and the selected take → reproduce
  it from saved inputs → the same staging and edit return, without regeneration.
  Routine documentation identifies the editable script and export command.

**Exploration and decision (Terry, 2026-10-12).** Terry accepted the bottleneck
reveal and the browser-3D recommendation, then requested slice planning.

| Candidate | Fit and trade-off |
| --- | --- |
| Existing browser script actions alone | Simplest reuse candidate: existing object, camera-target and light-intensity actions. Keep these where useful, but the subtitle-oriented API and default frame lights should not scatter silent-shot direction across components. |
| Browser 3D with a theatre-style cue sheet — selected | Named stage marks map to positions; timed cues map to camera/object/light direction; cue order and duration determine the shot. Reuse existing frame/timeline mechanisms where their meaning fits. Live theatre relies on previous cues; this adaptation reconstructs every frame directly. Cues do not guarantee a good composition, so normal-speed visual review remains necessary. |
| Scripted Blender render consumed as saved footage | Credible alternate for a look requiring another renderer, but adds scene/source retention and a separate render/import cycle. No Blender route was validated here and this delivery promises one route. Revisit only if observed visual limitations invalidate the selected direction. |

**Architecture.** Keep one authored source for shot direction and one
frame-addressable evaluation path for preview and export. Reuse
`@remotion/three` and `src/beatTimeline.ts`; keep the chosen shot's geometry and
camera/light application local. `ThreeDFrameInner` hard-codes ambient and point
lights and `UnderCamera` consumes the older animation context. Direct reuse of
`ThreeCanvas` avoids changing these existing consumers just to remove defaults.
Do not introduce a universal shot engine or constrain later character stories.

The planning probe found that changing `ThreeCanvas` camera initialization props
alone leaves sequential frames at the initial pose. Applying the sampled camera
position/target explicitly before drawing produced 30 distinct forward frames,
identical reverse-order counterparts and an identical fresh middle-frame render.
Carry this discovery into the actual shot's rendering proof; the probe is not
acceptance of the film. See the plan for setup, commands, results and limits.

The only current Accepted record is
[ADR-0000 — Use Architectural Decision Records](../docs/adrs/0000-use-adrs-accepted.md),
with matching index/in-file status. It leaves durable decisions human-owned and
mandates no renderer. No conflict or supersession was found. This local design
creates no new product-wide architecture policy or ADR.

**Basis.** Research R12 and the asset/environment aspects of R14. The
[Remotion Three documentation](https://www.remotion.dev/docs/three) supports
frame-driven R3F rendering; [Blender's command-line documentation](https://docs.blender.org/manual/en/5.1/advanced/command_line/arguments.html)
explains its alternate offline route. Neither documentation is artistic proof.

**Safe stopping point.** Terry retains a finished, revisable object/environment
shot without requiring humanoid rigging or another rendering route.

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
