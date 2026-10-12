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

<a id="anime-character-scene"></a>
### 11. I can make an anime-style character perform a short scene

**Identity:** terry-moves-filmmaking#anime-character-scene
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../.planning/quick/038-anime-character-scene/PLAN.md","assessment":"ready","reasons":[],"basis":{"document":"4b30df19df085b054b4179ed22aa7298911771b632a7ffd67a4fc1ad63bd4d72","plan":"2e94dd7970955b96e02cf21c856acb13cfedba57407ccf1a187e4fd1d74d68fa"}}
```

**Goal.** Terry can direct a richer anime-style character in a watchable short
scene, then meaningfully revise its performance while retaining the selected
design. This expands the film's expressive range and leaves a reusable authoring
path, not only a finished clip or an attractive still.

**Scope.** Deliver the moving scene and its revised listening reaction through
the selected authored 2D route, and retain the direction, artwork/rig, selected
sound assets and reproduction instructions.
The revised scene preserves the character's intended appearance and conveys its
intended emotion. Terry judges both versions at normal playback with sound.
Script direction remains the authoring entry point; any required asset-production
step must be explicit and reproducible from retained inputs. A hand-edited clip
with no usable revision path does not deliver the goal.

Terry selected an original adult anime engineer in a waist-up shot, an authored
2D rig, the retained English question/reply exchange and a script revision from
a surprised reaction to a thoughtful one on 2026-10-12. This delivery owns that
action revision; new dialogue recording is deferred. A universal anime generator,
arbitrary rig import, a full anime film and continuity across generated shots
are deferred promises, not rejection rules. One selected design does not impose
a product-wide character limit. There is no mandatory sibling dependency;
illustrated dialogue is a reuse candidate and the 3D-character story is independent.

**Key examples.**

- Given the selected design and a short directed scene → preview and export it
  → the moving character conveys the intended action and emotion with a stable
  designed appearance. Judge the full performance with sound; camera movement
  over a still or an isolated mouth flap does not establish expressive acting.
- Given that scene → revise surprise into a thoughtful listening reaction through
  script cues → obtain a visibly different, coherent performance with the same
  character design, speech and mouth timing. Keep the baseline available for
  comparison; editing a second component choreography does not satisfy this edit.
- Given a frame during listening, speech or their handover → reach it through
  forward playback, a reverse seek or a fresh mount → see the same intended
  changing pose, mouth and caption, rather than history-dependent animation.
- Given the retained inputs and selected assets → reproduce either version
  → recover the selected performance without reacquiring or regenerating its
  approved assets. New performance production belongs to an explicit revision,
  not routine preview/export.

**Exploration and decision (Terry, 2026-10-12).** Terry accepted the recommended
authored 2D route and scene. Candidates were compared against expressive
movement, stable design, useful revision and reuse:

| Candidate | Fit and consequential limit |
| --- | --- |
| Authored 2D anime rig in the existing frame-driven film path — selected | Strongest simpler route. Existing conversation code separates saved speech, mouth cues and acting cues from the drawing. New artwork and articulation keep direct script edits. Final anime appearance, deformation and emotional quality need visual acceptance; recoloring the current geometric actors would not settle that premise. |
| Live2D character with authored motion/parameter tracks | Detailed deformation and speech controls are credible building blocks. A selected model and a reproducible rendering path are still needed; the ordinary Web sample advances elapsed-time state and chooses random idle motions. Compare baked tracks/footage with a deterministic adapter before committing to runtime integration. |
| Transfer a recorded performance to a character reference | A performer supplies coordinated expression and gesture. Runway Act-Two documents this route, but it needs a driving recording and external generation. Small revisions can require a new performance/take, with identity and motion judged again. A saved clip alone does not establish this story's authoring path. |

Borrow from **theatrical puppetry**: the puppet maps to retained character
artwork/rig, the performance score to script cues, control channels to gaze,
expression, pose and mouth, and rehearsal to playback of the selected scene.
Adapt this by keeping design separate from performance, so one score revision
can change the acting without redesigning the character. Its consequential
limit is that a puppeteer supplies continuous judgment of weight and timing;
interpolated cues do not supply that judgment. The mechanism supports the
authored-rig candidate but is not evidence of convincing performance.

**Architecture.** Keep the authored performance, character representation and
retained production assets as distinct responsibilities, with one film clock
for their assembly. Sample the selected rig's pose from that clock. It needs
the same intended result after forward playback, reverse seeking or a fresh
middle-frame mount;
elapsed-time state must not silently change exports. This is a consequential
production concern, not a proposal for a universal character framework.

PFE inspected `illustratedConversation/script.ts`, `performance.ts`, its
renderer and tests, `aiTestAutomation/actors.tsx`, `beatTimeline.ts`,
`silentScene/compileScene.ts`, `featureTeams/shot.ts` and
`visualTreatments/versions.ts`. The conversation path owns measured speech slots,
take-bound mouth cues, silent pauses and frame-sampled acting; reuse or expose
that responsibility where the chosen scene fits. It currently names two fixed
actors and geometric pose fields, so it is not already an arbitrary anime rig.
`beatTimeline` provides ordered timing without requiring those actor types.
The silent-scene compiler owns travel and prop contact, not facial deformation.
The filmed-shot path handles saved clip measurement/crop/play decisions, not
performance generation. Named treatment versions provide a preservation pattern,
but their registry is specific to another film. Do not couple this scene to
unrelated registries or change existing films merely to share a label.

The ADR index and record agree that
[ADR-0000 — Use Architectural Decision Records](../docs/adrs/0000-use-adrs-accepted.md)
is the only current Accepted decision, with no supersession. It preserves
Terry's authority over durable architectural decisions and mandates no character
format or renderer. No conflict was found; these are local design candidates,
not an ADR proposal or approval.

**Observed basis and limits.** R11 in the
[filmmaking research](research/2026-10-07-filmmaking-opportunities.md) supplies
the original opportunity. On 2026-10-12, running
`python3 scripts/illustrated-conversation-speech.py` in this preparation workspace
verified all four retained WAV hashes and measurements: question 4.8 s,
reconsider 3.3 s, passed 2.8 s and next 1.7 s. It made no generation request.
This establishes reusable sound assets. A later disposable vector-character
probe consumed the actual two-turn script and WAVs and exported a 10.6-second
movie. Ten sampled pictures matched their reverse-order counterparts; a fresh
middle frame matched; script-revised and frozen controls differed. Baseline and
revised soundtrack PCM matched exactly. All 24 existing conversation tests passed;
disabling directed acting made the revision tests fail, and restoration passed.
These observations establish the technical route, not accepted production art
or emotional quality. Existing numeric poses interpolate, but moods switch
discretely; smooth facial transitions are necessary new work. No Live2D or
transferred-performance route was validated. Scratch code was removed; the plan
records commands, observations and limits.

Current primary references are Live2D's
[MotionSync controls](https://docs.live2d.com/en/cubism-sdk-manual/motion-sync-setting-web/),
its [Web sample update loop](https://github.com/Live2D/CubismWebSamples/blob/develop/Samples/TypeScript/Demo/src/lappmodel.ts),
and Runway's [Act-Two production guide](https://help.runwayml.com/hc/en-us/articles/42311337895827-Performance-Capture-with-Act-Two).
They establish available mechanisms, not a validated local production route.

**Selected scene.** An original adult anime engineer in a waist-up shot using an
authored 2D rig, listening to the retained off-screen question, pausing and
replying. The exact saved question is “Passing which tests? Did we check what
the customer actually needed?”; the reply is “I checked the code I wrote. I
didn't ask that.” Compare a surprised reaction with a thoughtful reaction while
preserving the design and speech. The recording's internal `ai` role identifies
the reply take, not a requirement to draw a robot; the new visible engineer
performs that role, while the questioner stays off screen. First establish a
short moving casting/acting sample using the actual speech, then finish the
scene and its revision. Terry's acceptance of the direction does not pre-accept
the yet-unseen final artwork or performance.

**Plan.** [Direct and revise an anime engineer's reaction](../.planning/quick/038-anime-character-scene/PLAN.md)
owns the moving casting sample, complete scene and meaningful reaction revision.

**Safe stopping point.** Terry retains the finished scene, meaningful revision
and reusable production path for the selected design even if broader anime
films are deferred. Production quality and route effort remain uncertain until
the selected performance is observed.

<a id="generated-scene-continuity"></a>
### 13. I can tell a scene across generated shots with a consistent cast and setting

**Identity:** terry-moves-filmmaking#generated-scene-continuity
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"unselected"}
```

**Goal.** Terry can direct a watchable small scene across generated realistic
shots, then revise one shot while viewers still recognize the cast and setting
and understand the spatial action. This expands the available film styles and
leaves a reusable script-driven production and revision path.

**Scope.** Deliver a coherent short sequence and one meaningful shot replacement.
Cast, wardrobe, location, lighting, eye-line and screen direction must support
the same scene across the cuts. Retain the reference assets, selected takes and
editorial choices needed to reproduce both edits without regenerating approved
media. A replacement leaves the selected surrounding takes intact. Terry judges
the artistic result at normal playback; reference similarity or joined video
files alone do not establish continuity.

Two or three cuts are an acceptance example, not a product limit. Long-form
filmmaking, arbitrary cast/scene combinations, automatic continuity correction,
multi-provider orchestration and guaranteed repeatable generation are deferred
promises. Reordering shots does not promise new connecting action. No new
rejection rule follows from those deferrals.

**Key examples.**

- Given selected references and a directed sequence → preview/export the edit
  → the same cast, wardrobe and setting remain recognizable across two or three
  cuts, and gaze, movement and geography make the action understandable.
- Given that coherent sequence → revise one shot's direction and select its
  replacement → the revised edit remains coherent at normal playback while
  the surrounding selected takes are preserved. Retain the earlier edit for
  comparison; silently regenerating its neighbors does not meet this example.
- Given either edit and its retained media → reproduce it → recover the same
  selected footage and editorial choices without another generation request.

**Exploration and direction (Terry, 2026-10-12).** Terry accepted the
reference-guided approach and proposed scene below, and suggested an existing
project resource. The concrete provider/access route remains to be located.
Compare these
against coherent moving footage, independent shot revision and preservation:

| Candidate | Fit and consequential limit |
| --- | --- |
| Assemble existing generated footage through the saved-shot path | Simplest existing route when suitable clips, references and alternate takes already exist. It can prove editorial preservation; unrelated stock clips or a single finished movie do not establish a reusable generation/revision path. No suitable supplied set has been established. |
| Generate individual shots from a shared cast/setting reference pack, then select and retain takes — selected direction | Supports independently directed coverage and replacing only the selected shot. Review both its incoming and outgoing cut. Actual identity, geography and motion remain empirical quality questions; references cannot guarantee success or a bounded number of retries. |
| Generate a continuous master take, optionally extend it, then cut/reframe it | Gives contiguous action within the selected source and fewer independent identity changes. Cropping does not supply a genuinely new camera angle; regenerating the master may change all shots. A local replacement must still prove its joins with the retained neighbors. |

Borrow from **versioned build inputs**: immutable source inputs map to retained
reference assets and takes, a build manifest maps to the edit's selected takes
and trims, and a revision changes one selection while keeping the other inputs.
Adapt this within the reference-guided candidate so both edits remain replayable
and only the intended take needs new production. The consequential break in the
analogy is that a generative operation is not a deterministic compiler: the same
prompt and seed may yield different footage, and matching file hashes prove
preservation, not perceptual continuity. Keep the resulting media, not just its
recipe; human review owns the visual judgment.

**Architecture.** Separate external production of candidate footage from local
selection and film assembly. Routine preview/export consumes retained media;
production requests belong to an explicit revision step. Reference direction
owns the intended continuity, measured media owns clip facts, and the script
owns shot selection and editorial timing. File validation can establish that an
approved take is unchanged; it cannot decide whether a face, eye-line or action
matches across a cut. Keep those responsibilities distinct without introducing
a generic provider framework before an available route is selected.

PFE inspected `featureTeams/shot.ts`, `scripts/measure-shot.mjs`, their
`tests/featureTeams/` consumers, `scripts/illustrated-conversation-speech.py`
and `visualTreatments/versions.ts`. The saved-shot path already measures and
validates sources and supports trim/hold/edit choices, but its placement is tied
to the Feature Teams inset; it is not a general full-frame scene assembler.
The speech producer demonstrates separately named retained replacements and
verification without generation; its audio API is not a video producer.
Treatment versions preserve comparison choices for another film, not generated
cast continuity. Reuse the relevant responsibilities where they fit; do not
couple the new scene to those unrelated film registries.

The ADR index and record agree that
[ADR-0000 — Use Architectural Decision Records](../docs/adrs/0000-use-adrs-accepted.md)
is the only current Accepted decision, with no supersession. It preserves Terry's
authority over durable decisions and selects no video provider or asset schema.
No conflict or status mismatch was found. This is local design guidance, not an
ADR proposal or approval.

**Observed basis and limits.** R16 and R26 in the
[filmmaking research](research/2026-10-07-filmmaking-opportunities.md) remain the
original opportunity and preservation rationale. Current primary documentation
was checked on 2026-10-12: [Veo](https://ai.google.dev/gemini-api/docs/veo)
documents reference images, first/last-frame control and extension, and explicitly
does not guarantee determinism from a seed. Google's
[video overview](https://ai.google.dev/gemini-api/docs/video) also points to
conversational video editing through Gemini Omni Flash. Runway's
[Image References guide](https://help.runwayml.com/hc/en-us/articles/40042718905875-Creating-with-Gen-4-Image-References)
documents reference-guided character/environment imagery; that is a possible
keyframe-production step, not observed proof of moving-shot continuity.
Documentation establishes candidate mechanisms, not account access, accepted
output, revision cost or a working local video-production route. This session's
available tool inventory contained no video-generation connector. No generation
request or film-quality experiment was made during this exploration.

**Selected scene and revision (Terry, 2026-10-12).** An adult engineer in a blue
work jacket notices a stopped machine, approaches it, then examines a red
indicator. Deliver three shots and replace the middle shot with a closer angle,
preserving the selected first and last takes. Terry accepted both this scene
and the reference-guided recommendation in the follow-up instruction. Neither
the final footage nor any production provider has been accepted by implication.

**Resource search (2026-10-12).** Inspection covered this owned workspace and
the integration checkout `/Users/terryyin/git/terry-talks`, including tracked
production scripts/research, ignored media and local environment-file names.
The environment exposes OpenAI credential variable names; values were not read
or printed. No Gemini, Runway, Kling, fal or Replicate credential variable was
found, and the checkouts have no `.envrc.local` or inspected `.env` file.
Located media includes the Feature Teams speaker clip, loom footage and existing
Remotion exports; none establishes the selected realistic engineer or an
independently revisable generated-shot set. No available video-production tool
was identified. This does not rule out an account or resource Terry can name.

The retired story's investigation is recoverable at commit `ee3dbce` in this
seed. It records Terry's lack of Gemini API access at that time and the request
to use OpenAI. A fresh check of the
[official OpenAI deprecation notice](https://developers.openai.com/api/docs/deprecations#2026-03-24-sora-2-video-generation-models-and-videos-api)
confirms the Videos API and Sora 2 removal on 2026-09-24, with no replacement
listed. Existing OpenAI credentials therefore do not supply this video route.
No paid request was attempted. The retired story's US$5 allowance belonged to
that retired work and is not a new production allowance for this scene.

**Open resource input and prerequisite.** An acceptable realistic single-shot
production route must be established first. Terry retired the earlier
single-shot story without implementation on 2026-10-12 after the requested
OpenAI video API proved unavailable; retirement did not meet this prerequisite.

- **Terry identifies the suggested resource:** give a file/directory, tool or
  service name/access location, not a credential value. The selected direction
  is reference-guided generation with retained takes; it need not be decided
  again. Once the resource is identified, inspect its fit and access, settle the
  single-shot prerequisite and continue into slice planning. Do not substitute
  still-image motion or existing unrelated footage for the selected outcome.

**Retirement decision (Terry, 2026-10-12).** Terry instructed that this story be
dropped if it relies on an audio/video-generation API or tool, because that work
is not a current priority. The selected outcome does require external video
generation; audio generation is optional. Drop the story and end its preparation.
No film was produced, no generation was purchased, and no executable plan or
readiness assessment was created. Preserve the accepted direction, scene and
investigation in Git history before removing the active story.

**Safe stopping point.** Terry retains a complete coherent sequence, its revised
edit and selected takes without needing long-form generated filmmaking.
Continuity and cost per accepted shot remain unobserved risks. The preparation
draft retains the open decisions; it supplies no execution readiness or plan.

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
