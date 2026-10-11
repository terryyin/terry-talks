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

<a id="replace-filmed-shot"></a>
### 7. I can replace a filmed shot while preserving its intended presentation

**Identity:** terry-moves-filmmaking#replace-filmed-shot
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../.planning/quick/032-replace-filmed-shot/PLAN.md","assessment":"ready","reasons":[],"basis":{"document":"bbd56275723fe99c50640e7667f0e8cbc4fefa656feaa7c311992ee1b42fc059","plan":"fbc23bb9c00d5031cfae1a4871f4448e2335706a2d04234430183a5a2c03c6a3"}}
```

- **Goal:** Terry swaps the saved media of one filmed shot in a mixed-media
  film, the footage of a speaker beside the animation that explains what the
  speaker says, without rebuilding how that shot is presented. He names a new
  source file for the shot and, only when the new source differs from the
  approved one in geometry or length, states its crop and his trim, hold or
  edit choice. The shot's placement, framing intent, border, pop-in, the
  overlays around it, its audio policy and the animation that follows the
  shot's clock are retained, and the film renders through the same command.
  The first film is Feature Teams, the one film that composites real speaker
  footage: Bas's clip hangs as a portrait inset and the animation follows his
  narration. This is R17's reusable shot workflow on one selected example,
  not a general editor.
- **Scope — required behavior:**
  - One declaration per shot: the Feature Teams speaker shot is declared in
    one place naming its source file, the crop (the region of the source
    frame the inset shows), the play choice (the whole source, or an explicit
    range of source seconds), what the inset does when the played range ends
    before the scene does, and the audio policy. The inset's position, size,
    border, shadow, pop-in and leave, the card and meter above it, and the
    logo are the shot's presentation and are not restated per source. The
    composition, the film's length, the last-moment hold, the ending and the
    cover frame follow from the declaration.
  - Source facts are measured, not typed: the source's duration and pixel
    size come from the file, through a measurement the film checks against
    the file, as the AI test automation workshop checks its saved
    performance, so a replacement file brings its own facts and a stale copy
    cannot survive. Observed 2026-10-11: the clip's length is typed three
    times today, 113.508 s in `film.ts`, 113.5 in `cues.ts`, and as the
    cover's absolute frame 3366 in the render script.
  - Replace by declaration: Terry changes the declared source file and, only
    when needed, its crop and play choice. For a replacement whose
    performance timing is the same, no scene component, cue, test literal or
    render script is edited. The replacement is a saved file under the
    film's public assets in a container Remotion plays, as today's MP4 is;
    recording or generating it is not part of this story.
  - Framing follows intent: with the crop stated in the new source's own
    frame, the new source fills the same inset the same way: the crop fills
    the inset's width and is top-anchored, as today, inside the same border
    and corner radius, with the same pop-in and leave. A source whose pixel
    geometry matches the approved one needs no new crop.
  - Timing follows the explicit choice: the scene's clock stays seconds into
    the shot's slot, as now, and the slot is the played range of the source.
    A source of a different length never changes playback rate and never
    stretches or repeats frames. Terry chooses one of: trim, an explicit
    range of the source so the slot stays as approved; hold, the inset
    freezes its last played frame, silent, while the scene runs to its own
    end; or edit, the slot takes the new length and the last-moment hold,
    ending, total duration and cover follow. A replacement that declares no
    choice plays the whole source with edit, which is the film's behaviour
    today.
  - Audio follows the policy: the shot's policy today is voice, its sound is
    the film's voice and the only sound in Feature Teams; a replacement's own
    sound is used over the played range and nothing else supplies sound. The
    other value is muted, an illustrative shot with no sound, as the TPS and
    AI film's loom shot is; it is declared the same way but not verified in
    this delivery.
  - Reproduction and preservation: with the approved clip declared, the
    film's derived timeline is identical to the approved film's: every
    frame's pose, the inset's placement, the clip's frames, the hold, the
    ending, the total length and the cover frame; the mixed audio is
    sample-identical; and the compare command against the approved revision
    reports the duration and audio unchanged and no picture difference
    beyond the renderer's own run-to-run noise. Observed 2026-10-11:
    rendering the unchanged approved film twice already differs on hundreds
    of frames by a few pixels at a few levels, so byte-identical frames are
    not something this film can promise, and the compare command's exact
    rule says Not preserved for it even with no change. The render command
    produces the film and cover as it does now, with the cover at the
    derived frame instead of a typed one.
  - Review: Terry previews the shot in Studio and renders a still at a named
    shot second to judge framing; the existing compare command shows
    before/after frames of a replaced shot's range. Its audio check reports a
    replaced voice as changed, which is the expected reading of a footage
    replacement, not a failed preservation.
  - Feedback: a declared source file that is missing, a crop outside the
    source frame, a play range outside the source's measured length, or a
    voice-policy source with no audio stream stops the film before rendering
    and names the shot and the problem. Justification: the film's existing
    promises made checkable, the test that the clip plays in full and that
    the film's duration follows it, and the credit "Content and voice by Bas
    Vodde" that the voice policy carries. Under edit, a played range that
    ends before the scene's last cue stops the film and names the range and
    the first unreached cue, so Terry chooses trim or hold, or revises the
    cues knowingly. Justification: the Feature Teams tests promise that the
    story completes within the clip, with the shared card, rising quality and
    joy by its end.
  - Documentation truth: the Terry Moves README gains a Feature Teams section
    naming the shot declaration, how to replace the source, and the trim,
    hold and edit choices, as the silent scene section does. The credits are
    unchanged.
- **Scope — assumptions and deferred promises:**
  - First film, settled by refinement: Feature Teams, the only film with
    speaker footage; its approved render is the preservation baseline and the
    shot is Bas's portrait inset.
  - Same performance assumed: the path preserves presentation; it does not
    re-align the animation's cues to a differently timed performance. A
    replacement that speaks the same words at the same moments, such as a
    re-export, a cleaner encode, or a differently framed or trimmed delivery
    of the same recording, keeps the animation synchronized through the
    declared range. A new performance with different timing is a cue revision
    Terry makes knowingly, like a script edit, and is not verified here.
    Measuring footage against its transcript, as the workshop measures its
    narration, is a later story if it is wanted.
  - Stand-in replacement sources: Terry has no second recording of Bas, so
    the key examples use derived exports of the approved clip (margins cut
    away, leading room added, the tail cut) as replacement files. They
    exercise geometry, trim, hold and edit on real media and claim nothing
    about a new recording's quality.
  - Considered and excluded, not rejected: a Studio control for choosing the
    source or crop; automatic subject framing; an illustration slot, which is
    a shot with no play choice and would be declared the same way, while the
    TPS and AI and Problem Decomposition films keep their stills as they are;
    replacing the shot in a translated edition.
  - Deferred, neither built nor verified here: more than one filmed shot in a
    film, or arranging shots in sequence (R17's "arrange"); transitions
    between shots; generating footage; time stretching; a nonlinear editor;
    subtitle export for Bas's words, which the film does not have today; a
    score or ducking under the voice. None of these is rejected.
- **Key examples:**
  1. *Approved film reproduced.* The shot is declared as
     `assets/Component teams.mp4`, crop left 8.5 % and top 4 % of the frame
     with 83 % of its width, play the whole source, voice. The film's
     derived timeline, dumped frame by frame, is byte-identical to the
     approved film's; the compare command for `FeatureTeamsFilm` against the
     approved revision reports 3768 frames at 30 fps on both sides, mixed
     audio identical, and picture differences only at the renderer's noise
     level. The render command writes the film and the cover, now at the
     frame derived from 108.6 s into the shot.
  2. *Re-framed export, same performance.* Terry exports the clip with the
     grey margins cut away, about 896×1769, declares the new file with a crop
     of its whole frame, and renders. At 0:40 of the shot the inset shows Bas
     at the same size and place inside the same border, the card and meter
     above it and the component labels are unchanged, the cue table is
     untouched, and the film's duration is unchanged. The only changed pixels
     lie inside the inset.
  3. *Longer source, explicit trim.* A re-export with 2 s of leading room is
     declared with play from 2.0 s to its end. The slot, every cue, the total
     duration and the cover are as approved, and the inset pops in on Bas,
     not on the leading room. Left undeclared, the whole source plays and the
     animation runs 2 s ahead of his words, visibly wrong in preview; the fix
     is the trim, not a cue edit.
  4. *Shorter source, hold or edit.* A source cut at 108.6 s, 4.9 s short.
     With hold, the inset freezes Bas's last frame silently, the scene runs
     to its end and the ending starts at the approved time; the duration is
     unchanged. With edit, the slot ends at 108.6 s and the film stops before
     rendering, naming the range and the unreached cue `joy` at 109.3 s;
     Terry picks hold, or trims the scene's cues knowingly, and then the
     last-moment hold, ending, duration and cover follow the shorter slot.
  5. *Useful feedback.* Declaring a file that is not under the public assets,
     a range of 0–120 s on a 113.508 s source, or a voice-policy export saved
     without its audio track stops before rendering and names the shot and
     the problem; the approved film is untouched.
- **Command sketch (illustrative, not a format commitment):**
  ```ts
  // src/featureTeams/shot.ts
  export const speakerShot = {
  	source: 'assets/Component teams.mp4',
  	crop: { left: 0.085, top: 0.04, width: 0.83 }, // of the source frame
  	play: 'full', // or { from: 2.0, to: 115.5 }
  	whenShort: 'edit', // or 'hold'
  	audio: 'voice', // or 'muted'
  } as const satisfies Shot;
  ```
  ```
  pnpm moves compare FeatureTeamsFilm --baseline <approved revision>
  pnpm -C terry-moves render:feature-teams
  ```
- **Architecture:**
  - What changes: the speaker shot becomes a declared shot with measured
    source facts; the composition reads the declaration, and the film's
    length, hold, ending and cover follow it. Crop and play belong to the
    source; placement and presentation belong to the shot.
  - What must not change: the single clock. The scene samples its pose at
    seconds into the shot, cues stay in narration seconds, and the tests keep
    sampling the pure film. No second hand-typed copy of the source's
    duration or geometry may remain.
  - Measurement: how source facts are measured and checked (a saved
    measurement verified against the file as the workshop's performance
    record is, Remotion's media parser when composition metadata is
    calculated, or a producer step) is a planning decision under PFE; the
    workshop's performance record and the compare tool's media handling are
    the existing solutions to assess. Studio preview and tests must still
    work from the declaration.
  - Placement: the shot declaration and inset are film-independent; whether
    they live beside the Feature Teams modules or in a shared module is
    planning's PFE call. The first delivery verifies only Feature Teams.
  - Decisions: only ADR-0000 (use ADRs) is Accepted; no Accepted decision
    constrains or conflicts with this design and nothing is superseded.
- **Known basis and boundary:** R17. Observed 2026-10-11: `FeatureTeamsFilm`
  composites `assets/Component teams.mp4` (1080×1920, 50 fps, 113.508 s,
  with audio, the film's only sound) through `OffthreadVideo` in a sequence
  from the opening, inside an inset with hand-typed crop fractions; the
  animation samples its pose at seconds into the clip from a cue table
  aligned to Bas's transcript; the clip's length is typed in `film.ts`,
  `cues.ts` and as the cover frame in the render script; the compare tool
  checks picture, audio and duration for this composition but has no
  timeline entry for it. The TPS and AI loom shot, a muted frozen frame of a
  video, is the illustrative contrast. The declaration's format, the
  measurement and the module placement are planning decisions; refinement
  establishes the declaration, framing, timing-choice, audio-policy,
  preservation and feedback contract above.
- **Value / effort hypothesis:** Reusable mixed-media editing and the first
  shot whose presentation survives a media swap. Moderate scope; high
  confidence in value; the only steps that cannot be automated are exporting
  the stand-in sources and Terry's framing judgment at preview.
- **Depends on:** None; the approved saved clip is sufficient. Host `ffmpeg`
  is needed only to make the stand-in exports and the compare previews.
- **Safe stopping point:** The Feature Teams film keeps a declared, measured
  speaker shot with offline preservation evidence, even if no second film,
  illustration slot or shot sequence ever follows.

<a id="shot-declaration-owns-measure-and-edit-clock"></a>
### Terry's shot declaration owns measurement check and the edit scene clock

**Identity:** terry-moves-filmmaking#shot-declaration-owns-measure-and-edit-clock
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../.planning/quick/033-shot-declaration-owns-measure-and-edit-clock/PLAN.md","assessment":"ready","reasons":[],"basis":{"document":"ed38274d32623f5b6fa7dc29c5e89aa9379a24b58b87617fefa34647b2a939e5","plan":"791b9a2e3bd3ff8615edf328826619dae7f6c97e17b99d45087bec6748605939"}}
```

#### Goal

When Terry retargets the Feature Teams speaker shot's declared source or
shortens it under `edit` with every cue still reached, measurement check and
the film's last-moment / ending clock follow that declaration, so replacement
does not require editing the measure script and a valid shorter edit does not
leave the inset and ending on the old choreography end.

#### Scope

Make `measure-shot` (write and `--check`) use `speakerShot.source`, refuse a
declaration whose `source` disagrees with the measurement record, and drive
the film's clip-end / last-moment / ending phases from the compiled
`sceneSeconds` in a way that keeps the approved film's pose timeline
byte-identical. Preserve every promise of
`terry-moves-filmmaking#replace-filmed-shot`, including trim, hold, edit
refusal when cues are unreached, README replacement steps, and timeline-dump
preservation for the approved declaration. No new film, second shot, cue
re-alignment, compare-tool Preserved rule change, or Studio control.

Plan: [shot declaration owns measure and edit clock](../.planning/quick/033-shot-declaration-owns-measure-and-edit-clock/PLAN.md).

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

<a id="narration-region-across-scenes"></a>
### Terry can replace a narration region that crosses a scene boundary, with the region commands held by repeatable proof

**Identity:** terry-moves-filmmaking#narration-region-across-scenes
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../.planning/quick/032-narration-region-across-scenes/PLAN.md","assessment":"not-ready","reasons":["Premise unobserved: select() is drivable offline against a temporary root and a cross-scene selection writes a coherent record, take and script; the unreached operation is select(root, script, run, sample_rate, region, candidate) on a fixture film, which the retrospective review was not permitted to run."],"basis":{"document":"28e066fbb541b3257fea2e5ea88aee57ae2027215685b86a70555e898a2c5953","plan":"1b0c11bbdf8927ddbfd7b9bc6128965ddd588ce75bef1262887ca57593cee4a1"}}
```

#### Goal

Terry can audition and select a region of consecutive clauses that runs from
one scene of the AI test automation workshop into the next, as the narration
replacement story defines a region, and the region commands he already has
keep their behavior under proof he can run again without an API.

#### Scope

Accept a region whose first and last clauses lie in different scenes through
the existing audition and selection path, and keep the current single-scene
names working unchanged. Retain repeatable offline proof of the delivered
audition, selection, refusal and re-selection behavior beside the workshop
producer, with its command stated in the film's maintained documentation.
Preserve the approved workshop, its saved takes, record, script, stems, mix
and treatment. This is a bounded correction from the narration replacement
retrospective, with no new film promise and no paid request.

Plan: [narration region across scenes](../.planning/quick/032-narration-region-across-scenes/PLAN.md).

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
  [Story Impact seed](../Story%20Driven/seed.md#terry-voice-over) and
  [conference-readiness seed](../TPS%20and%20AI/seed.md#conference-ready) remain
  separate canonical work.
