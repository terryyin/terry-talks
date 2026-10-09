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

<a id="subtitle-export-test-isolation"></a>
### Terry can run subtitle exporter proof without changing his film artifacts

**Identity:** terry-moves-filmmaking#subtitle-export-test-isolation
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../.planning/quick/026-subtitle-export-test-isolation/PLAN.md","assessment":"ready","reasons":[],"basis":{"document":"19bf545d9cd23736e96daf492307b61c283a87e31f36966b2e5cd93f59320993","plan":"24d057b1293cc4b8e179778a90cc063e29d650d497cd8ff46e33f1d4b770edd1"}}
```

#### Goal

Terry can run the real subtitle exporter checks without rewriting existing
source or delivery SRTs or interfering with another test's artifact reads.

#### Scope

Isolate the current Jidoka exporter tests in disposable repository fixtures,
retaining real CLI integration, all four English defaults, English/Japanese
wording and interval parity, fresh bilingual generation and language rejection.
Preserve production film behavior and delivery files. This is a bounded test
correction from the Japanese-edition retrospective, with no new film promise.

Plan: [subtitle exporter test isolation](../.planning/quick/026-subtitle-export-test-isolation/PLAN.md).

<a id="just-in-time-title-and-artwork"></a>
### Just in time clearly connects trust with timely response to real needs

**Identity:** terry-moves-filmmaking#just-in-time-title-and-artwork
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../.planning/quick/029-just-in-time-title-and-artwork/PLAN.md","assessment":"ready","reasons":[],"basis":{"document":"9dfa20b33f2df32f2da7ee9d7c3c1f16001cc03118c5be125bee575de3bdce03","plan":"5c568c2d5c2eaef93fdf34d75bb95b7d9756db8866cc2a3d5a4ec041add9f8b2"}}
```

**Goal:** Revise the delivered English film so its title is **Just in time**,
its trust message clearly means trusting the team to meet real needs on time,
and its definition uses Terry's three original presentation illustrations.

**Scope:** One cohesive revision of the existing shared film script and its
reached composition. Show the customer-orders, assembly-pulls-wheels, and
wheel-replenishment artwork with “Only what is needed”, “When needed”, and
“In the amount needed”, respectively. Deliver the revised square MP4, poster,
and matching English SRT. Preserve the approved 86-second clock, music, logo,
credit, other scenes and translation-ready shared source.

**Key examples:** The cover's main heading is “Just in time”, with “Trust the
team to meet real needs, on time” as the supporting message. The TPS house
introduces the pillar, followed by large, complete original illustrations for
each definition phrase. The final caption connects capability with responding
to real needs on time. All new text and artwork are readable at 360-pixel
phone width, and exported caption text and intervals match the shared script.

**Authority:** Terry's current correction and continuing authorization to
coordinate production through a delivered movie and sync with origin.
This does not authorize modifying unrelated in-progress work.

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
