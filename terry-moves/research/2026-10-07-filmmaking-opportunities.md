# Terry Moves filmmaking research and candidate backlog

7 October 2026. Research proposals for Terry to review before changing the product backlog.

Terry Moves can grow into a way to direct varied films through rearrangeable scripts. Its strongest starting point is the combination of the existing action engine, the newer beat and pose models, and production techniques already proven in recent films. The main opportunity is to make those capabilities easier to reuse while expanding the available visual languages through small, finished film examples.

The proposed direction is: **Make varied, well-directed films through rearrangeable scripts, with reusable motion, characters, scenes and media.** Educational shorts remain a useful proving ground. This wording is a proposal; the canonical backlog and its current direction remain unchanged.

## What the script should mean

A film script should be able to describe silent movement, a conversation, a diagram, a camera move or a filmed shot. Narration and subtitles can accompany those events without defining every event or becoming the mandatory clock. Some films should follow a recorded performance; others should follow action durations, musical cues or deliberate silence.

The most useful initial promise is bounded: when Terry rearranges compatible moves involving the same actors, the next move starts from their resulting state. He can explicitly choose a cut or reset. When the rearrangement asks for an impossible action, he receives a useful explanation. Numeric interpolation cannot establish that a character still holds a prop, that an object has changed identity or that a new scene is logically compatible. Those are separate directing responsibilities.

For a generated or recorded video clip, rearrangement normally means editing approved footage. Making a person perform a new connecting action may require a new asset. Remotion can assemble and composite that footage, but a crossfade cannot guarantee physical or narrative continuity.

## What the engine already supports

The original engine attaches typed actions to named actors. It supports movement, scale, rotation, appearance, oscillation, code changes, connectors, camera look-at and GLB animation. Its public entry model is still `Subtitle`, whose `text` field is required. Empty text permits silent action, but the representation and documentation put subtitles at the center. See `terry-moves/src/models/Subtitles.ts:3,76,108,125,133` and `terry-moves/README.md`.

Automatic numeric continuation already exists. `InterpolatesOfField` passes a previous range's value into a later range, and existing tests exercise multiple moves and combinations. A new continuity story should extend this behavior rather than describe automatic connection as wholly absent. See `terry-moves/src/models/InterpolatesOfField.ts:32`, `terry-moves/src/models/InterpolateRanges.ts:66,75`, and `terry-moves/tests/video_conomponents/AnimationContext.spec.ts:4,50`.

Story Impact offers an especially relevant model: a beat has a name, duration, optional caption and a pure function from progress to pose. Its timeline can sample any frame. Later stories also consume a previous product state. These are promising existing solutions to assess before choosing a shared film representation. They currently belong to Story Impact, and each beat authors its own transition; rearranging the list does not automatically synthesize a compatible transition. See `terry-moves/src/storyImpact/film.ts:20,67,91`, `terry-moves/src/storyImpact/fullFilm.ts:12`, and `terry-moves/src/storyImpact/laterStories.ts:56,77`.

The newer films distinguish spoken text, displayed text, measured word cues and scene timing. That separation should survive any generalization. The AI workshop intentionally follows saved speech as its clock; that is appropriate for that film and should not become a rule for every film. See `terry-moves/src/aiTestAutomation/film.ts:5,18`, `terry-moves/src/problemDecomposition/film.ts:16`, and `terry-moves/src/problemDecompositionRemake/film.ts:4,11`.

| Area | Current capability | Improvement with practical value |
| --- | --- | --- |
| Screen positioning | Pixel coordinates, vectors, small anchors and separate film layouts | Named regions and actor anchors with explicit coordinate spaces |
| Grid and projection | Story Impact projects grid coordinates onto an oblique wall; Feature Teams has panel and row helpers | Reuse appropriate layout concepts without treating every screen, diagram and world coordinate as the same matrix |
| Character movement | Workshop characters have articulated arms, reachable hand targets, gaze, blinks, emotion and gestures | Cast those capabilities into another film and another character design |
| Character dialogue | Speech cues and expressions exist | Synchronize mouths and listening behavior with a saved dialogue performance |
| 3D | ThreeCanvas, camera actions, lights, GLTF nodes, GLB playback and older 3D stories | Named motion clips, usable camera direction and reproducible seeking in a finished scene |
| Filmed footage | Feature Teams already embeds real talking-person footage | Reusable shot replacement, framing and overlay composition |
| Quality checks | Semantic, geometry, reading, limb and continuity tests exist in individual films | Shared rendered previews and diagnostics that retain those useful checks |
| Audio production | Exact-script audits, mastering, transcription evidence and common subtitle export exist | Reuse production tools while preserving each film's performance and timing policy |

Relevant locations include `terry-moves/src/storyImpact/layout.ts:30`, `terry-moves/src/featureTeams/layout.ts:6`, `terry-moves/src/aiTestAutomation/motion.ts:9`, `terry-moves/src/aiTestAutomation/actors.tsx:20`, `terry-moves/src/video_components/ThreeDFrame.tsx:13`, `terry-moves/src/video_components/AnimatedGlb.tsx:16`, `terry-moves/src/stories/FeatureTeamsFilm.tsx:12`, `scripts/narration_audio.py:1`, and `scripts/film-subtitles.mjs:13`.

### The matrix question

A general named matrix positioning system was not found in the inspected engine. Three.js transform matrices do appear, but they are different from the authoring responsibility Terry described: placing things clearly on screen.

Three related capabilities deserve different evaluation examples:

1. **Screen composition:** place a title above an actor, reserve caption space, and retain readable framing in square or portrait output.
2. **Actor relationships:** attach a hand to a tool, point a connector at a moving node, or align a label with an actor's edge.
3. **World and camera projection:** frame an object in a 3D room and keep an overlay attached to its projected location.

Story Impact's `wallPoint` already expresses grid-to-screen projection. It is valuable for that wall, but its fixed 1080-square stage is not a general screen layout. A useful first improvement is an author-visible placement example with named regions and anchors. Mathematical matrix utilities can serve that example internally if needed.

## What recent production histories reveal

The most consequential rework concerned artistic direction and fidelity to Terry's explanation. Rendering and TypeScript checks remained useful, but films often passed them before Terry rejected the argument, geometry, tone or performance.

| Production | Observed back and forth | Delivered improvement | Remaining opportunity |
| --- | --- | --- | --- |
| ATDD | The first adaptation favored a bill-splitting example and omitted the original whiteboard diagrams and collaborative circle. Later polishing changed the fork too far from Terry's sketch | The current worktree restores the source diagrams, group split/reunion, shared circular curve and integrated diamond | Preserve required visual relationships in a source-linked storyboard; reuse semantic connector geometry |
| Problem decomposition | A proposed Story Impact sequel lost recognizable motifs and the distinction/premises/goals/principles skeleton. Several revisions restored these; Terry eventually requested a separate, simpler interpretation | A restrained typography/diagram remake with a shopper example | Separate argument, series identity, metaphor and visual style; compare treatments through short motion samples |
| AI test automation | Terry found the initial performance boring and a character's stretching arm unnatural | Fixed-length articulated arms, stronger conflict, STOP AND FIX staging and emotional reactions | Reuse good articulation and expressive direction in other films; do not reopen the fixed arm defect |
| Narration | Clause-by-clause macOS Daniel narration was rejected as annoying and low quality | Connected, scenario-directed Cedar takes, measured word cues, and later restored/cleaned Terry recordings where requested | Audition and direct performances through a reusable workflow that also permits silence and dialogue |
| Limited revisions | A decomposition revision was explicitly restricted to scattered blue assimilation cells, with no new voice and unchanged timing. ATDD geometry revisions also retained narration | Saved assets, hashes, equality checks and careful local changes preserved selected tracks | Make the edit boundary explicit and detect unintended changes to locked tracks |
| Covers and branding | Odd-e endings, Terry credits, silent closing holds and representative posters were requested separately across films | Film-specific covers and endings | Reuse a presentation profile while retaining each film's choice of cover and holds |
| Review | Temporary contact-sheet, frame extraction, phone preview and short-render scripts recurred | Useful per-film evidence and geometry/semantic tests | A shared review workflow with stable beat/frame references and comparisons to the source and previous take |

The ATDD worktree now exports diagrams from the same drawing components used in its animation. Within that worktree, `terry-moves/src/atdd/circleLayout.ts:38–64` preserves the circumference and connector clearance; `terry-moves/src/atdd/pieces.tsx:36–42` uses tangent-oriented SVG markers; `terry-moves/src/atdd/geometry.ts:3–24` rounds routes while preserving endpoints. These are proven local solutions to assess before adding another generic connector system. They are not yet shared capabilities on the main checkout.

Some "same style" requests combine several different expectations: palette, character design, motion, recurring series motifs, metaphor and argument structure. A useful treatment comparison should say which of these it preserves. Styling a concept attractively does not establish that it says what Terry intended.

The revision that changed only blue cells is an especially useful future benchmark. If Terry can make that edit through a script, see a focused preview, and verify unchanged audio and timing, the product has removed an observed production burden. A hypothetical all-purpose editor is a weaker first proof.

### Chat coverage

Eight Codex chats were inspected through 50 completed turns across nine pages. Titles below are the exact titles returned by Codex; IDs locate the evidence without reproducing private transcripts or internal reasoning.

| Chat | ID | Turns inspected |
| --- | --- | --- |
| Capture problem decomposition film | `01a0ff84-7020-7553-8776-d4a07b7d5afb` | 11 |
| Create ATDD short film | `01a106ed-c56b-7a73-9dc0-da823eb01086` | 9 |
| Add AI testing film backlog item | `01a10431-7065-7bd3-a7f2-5be903da4272` | 10 |
| Improve story impact film | `01a104af-a0cf-7190-8179-93d2c676022a` | 2 |
| Refine next backlog story | `01a08a05-8691-7c73-8779-485b3d8f6403` | 3 |
| Refine first backlog item | `01a089ec-aa0b-7c01-8e0c-b0cfdba56327` | 3 |
| Refine first backlog story | `01a089a8-5356-7791-9c12-861797b1948a` | 9 |
| Add component teams video backlog | `01a0f041-4cc3-7ab3-bb92-f78b8a636c23` | 3 |

The immediately preceding chat, **Research Remotion version and film**, was also consulted for its prior comparison of agent guidance. It is separate from the eight production-history chats above.

Story Impact's September cartoon remake and the Feature Teams implementation did not have discoverable original Codex production chats in the accessible inventory. Seeds and selected Git history supply partial provenance: `f813072` records the rejected Story Impact revert, `7ffd902` the cartoon redirection, and `91a3be6` the Feature Teams implementation. These sources do not reconstruct the entire conversation. The Feature Teams seed records a portrait speaker inset, synchronized animation and explanatory staging, corroborating an existing mixed-media direction.

## Current Remotion opportunities

The project locks Remotion **4.0.533**, matching the latest release observed during this research. The release was published on 5 October 2026. Its relevant changes include multiple-clip reordering, timeline duration inference for Series and TransitionSeries, annotation integration and copying sequence context for agents. These are immediate opportunities to investigate in the installed version, rather than reasons to upgrade again. [Remotion 4.0.533 release](https://github.com/remotion-dev/remotion/releases/tag/v4.0.533)

Studio now supports visual and timeline edits that write back into code. However, editable markup requires recognizable source structure. Independent items need independent JSX nodes; a programmatic loop can be treated as one collective item, and complex computed values can become read-only. A script-first model therefore needs a deliberate round-trip experiment before promising direct editing of every beat. [Studio interactivity](https://www.remotion.dev/docs/studio/interactivity), [interactivity best practices](https://www.remotion.dev/docs/studio/interactivity-best-practices)

There is already local experience with this. `Problem Decomposition Remake/README.md:9–11` records working controls for some headings and cards, but unsuccessful direct scene clip selection/trim and default-prop extraction for that composition in the tested Studio version. These are observations about one composition, not proof that Remotion's overall feature is broken or unavailable. The next story should establish which source shape works with Terry Moves' script and what remains source-only.

Remotion's transition library provides reusable scene presentations and timing. Transitions render both neighboring scenes and shorten the total duration through overlap. That arithmetic matters for narration and musical cues. Transitions can improve editing polish; they do not solve actor identity, prop contact or semantic state between scenes. [Transitions](https://www.remotion.dev/docs/transitioning)

Text measurement and fitting utilities can reduce repeated label fixes, and SVG path utilities can support drawing, travel and morphing. Captions can be imported, transcribed, displayed and exported through official utilities. These are existing building blocks to assess against current local helpers. [Layout utilities](https://www.remotion.dev/docs/layout-utils), [SVG paths](https://www.remotion.dev/docs/paths), [captions](https://www.remotion.dev/docs/captions)

### Practices worth borrowing from other projects

| Project | Observable approach | What Terry Moves could absorb |
| --- | --- | --- |
| Banger.Show | 3D model import, camera keyframes, mixed 2D and 3D content, and properties that react to audio | Treat cameras, environment, sound and motion as a directed performance; make musical films a distinct style |
| Abekyo Editor | Published JSON project schema, project validation, browser editing and scriptable rendering | Keep a clear, inspectable film description that humans and agents can both edit and validate |
| Remocn Studio | Source-backed visual direction, frame crops, explicit motion roles, reusable components and review evidence | Give feedback a precise frame/element reference; preserve accepted intent and reuse successful motions |
| GitHub Unwrapped | Personalized films generated from data, with cached assets and renders | Separate reusable editorial structure from changing content; avoid regenerating unchanged inputs |
| Remotion motion design systems | Parameterized animated assets organized as compositions | Offer a small library of useful shots and motifs with previews, rather than continually inventing them in whole films |

These are documented patterns, not a comparative quality or performance benchmark. Banger.Show demonstrates a broader 3D and music use case; Abekyo and Remocn demonstrate ways to combine agent editing with human direction; none establishes that adopting their code would be preferable to extending the current engine. [Banger.Show](https://banger.show/), [audio reactivity guide](https://banger.show/guides/audio-reactivity), [Abekyo Editor](https://github.com/abekyo/abekyo-editor), [Remocn Studio](https://github.com/Remocn/remocn-studio), [GitHub Unwrapped](https://github.com/remotion-dev/github-unwrapped), [motion design systems](https://www.remotion.dev/docs/design-systems)

The official Remotion skills cover current APIs, timing, multimedia, interactivity and rendering. iart's motion design skills cover composition, timing, art direction and animation principles. These can improve agent knowledge, but guidance should serve a concrete authoring improvement. The official guidance is now installed at `.agents/skills/remotion-best-practices` through a separate concurrent change; this research installed nothing. [Official Remotion skills](https://github.com/remotion-dev/skills), [iart motion design skills](https://github.com/iart-ai/motion-design-skills)

## Routes to richer film styles

All of Terry's suggested styles are plausible within a Remotion production. The practical route depends on what must remain editable: poses and camera parameters, an authored animation's timeline, or the edit of finished footage. Remotion supplies orchestration and rendering; character design, model authoring, performance capture and video generation supply different kinds of assets.

### Illustrated and anime characters

| Route | Verified building block | Fit and limitation |
| --- | --- | --- |
| Richer SVG characters with mouth cues | Existing local character articulation plus Rhubarb's timestamped mouth shapes | A strong first route for reproducible cartoon dialogue. Attractive artwork, pose design and listening behavior still need to be authored |
| Rive | Remotion's official wrapper plays a named linear animation/artboard; Rive has bone-based animation | Useful for authored illustrated actions. State-machine inputs and arbitrary pose mixing are not documented as solved by the Remotion wrapper |
| Lottie | Official wrapper supports JSON animation playback, speed, reverse, loop and trimming | Useful for authored character/effect clips. New acting depends on what the asset contains |
| Live2D Cubism | Web SDK and MotionSync support detailed deformation and viseme blending | A credible anime dialogue route. A deterministic adapter or baked/rendered asset path remains to be proven |
| Generated performance | Runway Act-Two accepts a character image/video and a driving performance | Can transfer richer expression and motion. It requires a performed reference and produces footage, so small pose edits may require regeneration |

Rhubarb can produce JSON mouth cues from saved speech, with six basic and three optional mouth shapes. Its English recognizer and less precise language-independent phonetic mode should be tested against the selected language and artwork. A mouth cue is a timed mouth shape, not a subtitle. [Rhubarb lip sync](https://github.com/DanielSWolf/rhubarb-lip-sync)

Rive and Lottie can expand the asset vocabulary without replacing the script. The important first result is a useful authored action that can be trimmed or retimed and sampled reproducibly. Avoid treating an animation file as a fully controllable character rig. [Remotion Rive wrapper](https://www.remotion.dev/docs/rive/remotionrivecanvas), [Rive bones](https://github.com/rive-app/help-center/blob/master/editor/manipulating-shapes/bones/README.md), [Remotion Lottie wrapper](https://www.remotion.dev/docs/lottie/lottie)

Live2D's MotionSync exposes viseme blend and smoothing controls, but its ordinary Web sample advances mutable state with elapsed time and can select random idle motion. Copying that playback pattern directly would not establish reliable Remotion seeking. Compare baking curves, importing finished footage and a frame-driven adapter in a small pilot. The SDK, runtime and chosen model can also have distinct reuse terms. [MotionSync Web settings](https://docs.live2d.com/en/cubism-sdk-manual/motion-sync-setting-web/), [official Web sample](https://github.com/Live2D/CubismWebSamples/blob/develop/Samples/TypeScript/Demo/src/lappmodel.ts), [licensing](https://github.com/Live2D/CubismWebSamples/blob/develop/LICENSE.md)

Naturalness should be judged through a short exchange: anticipation before a gesture, eyes leading the head, a purposeful reach, body/prop contact, a settle, a pause and a listening reaction. Adding springs to every channel is not sufficient evidence of believable acting. The workshop already supplies part of this vocabulary; its reuse is a more concrete first step than a universal character format.

### Three dimensional animation

Remotion's ThreeCanvas documentation requires frame-based animation so playback can pause and seek backward. That matters because render workers may evaluate frames independently. Drei's common `useAnimations` implementation advances its mixer with elapsed `useFrame` delta; Three's `AnimationMixer.setTime()` supplies absolute-time sampling. Reuse loaders and clips while proving a suitable clock and state-reset policy. [ThreeCanvas](https://www.remotion.dev/docs/three-canvas), [drei animation source](https://github.com/pmndrs/drei/blob/master/src/core/useAnimations.tsx), [AnimationMixer](https://threejs.org/docs/pages/AnimationMixer.html)

The local `AnimatedGlb.tsx:19–33` starts every imported action and sets mixer time inside `useFrame`. This is a concrete reason to investigate named clip selection and seek behavior. It is not proof that a particular existing film flickers or renders incorrectly. A pilot should compare sequential frames, random-order frames, reverse seeking and mounting at a middle frame, including blends and secondary motion.

GLB/GLTF assets can supply rigs and motion clips. VRM adds a useful humanoid convention, and Pixiv's official examples include expressions, gaze and Mixamo retargeting. Compatible bones, root motion, contact, foot sliding and model permissions still need to be checked on the chosen actor. [drei GLTF loader](https://drei.docs.pmnd.rs/loaders/gltf-use-gltf), [three-vrm examples](https://github.com/pixiv/three-vrm/blob/dev/packages/three-vrm/examples/index.html), [Mixamo conversion example](https://github.com/pixiv/three-vrm/blob/dev/packages/three-vrm/examples/humanoidAnimation/loadMixamoAnimation.js), [Mixamo FAQ](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html)

A better environment can improve a film before complex modeling is introduced. Drei supports environment maps, environment intensity and rotation; its documentation advises against relying on CDN presets in production. Poly Haven supplies CC0 HDRIs, models and textures that could be retained as local assets. [Environment documentation](https://drei.docs.pmnd.rs/staging/environment), [Poly Haven licence](https://polyhaven.com/license)

Blender is useful both for authoring assets and for rendering richer shots. Its glTF exporter supports transforms, pose bones, shape keys and baking constrained-object animations, with documented limits. Treat glTF export as a chosen subset, not full Blender scene parity. Complex materials, hair, cloth or simulation may be easier to render offline and bring into the same shot-editing workflow. [Blender glTF documentation](https://docs.blender.org/manual/en/5.1/addons/import_export/scene_gltf2.html), [command-line animation rendering](https://docs.blender.org/manual/en/dev/advanced/command_line/render.html)

The first 3D film should include intentional framing, light, camera movement, staging and sound. A rotating model establishes basic integration; a watchable short scene establishes more useful filmmaking capability. New GPU/rendering paths can remain separate experiments until a chosen film needs them.

### Realistic people and environments

Veo 3.1's API supports text/image-guided shots, reference images, native audio, first/last-frame interpolation and extension of its generated clips. Base shots are short, and options impose duration/resolution restrictions. References and seeds do not establish guaranteed identity or determinism. This makes it a plausible external shot generator, with approved clips saved before Remotion rendering. [Veo API documentation](https://ai.google.dev/gemini-api/docs/veo?hl=en)

Runway's SDK exposes `POST /v1/character_performance` for Act-Two. Its request model accepts a character image/video and a 3–30-second driving performance, with controls such as expression intensity and body control. The performance guide favors one visible subject, clear framing and natural motion. It is a different route from text-to-video: Terry or another authorized performer supplies the acting that is transferred to a chosen character. [SDK endpoint mapping](https://docs.dev.runwayml.com/api-details/sdks/), [request types](https://raw.githubusercontent.com/runwayml/sdk-python/main/src/runwayml/types/character_performance_create_params.py), [Act-Two performance guide](https://help.runwayml.com/hc/en-us/articles/42311337895827-Performance-Capture-with-Act-Two)

An initial realistic film can use a fictional person in a single environment. Judge movement, anatomy, object contact, environmental stability and whether the action says what the script intended. A later multi-shot example should check wardrobe, identity, location, lighting, eye-line and screen direction across edits. A convincing single clip does not prove these properties across a whole film.

Generation should happen in a separate preparation step with saved candidate takes, selected assets and provenance. Routine renders should consume approved local media. Measure total cost per approved shot and revision turnaround, including rejected takes; listed price per output second is not the cost of producing an accepted scene. Pricing is provider-specific and changes. [Google pricing](https://ai.google.dev/gemini-api/docs/pricing.md), [Runway API pricing](https://docs.dev.runwayml.com/guides/pricing/)

### Other useful styles

Restrained typography, evolving diagrams, mixed speaker/animation films, music-led abstract pieces, maps and data stories deserve their own short examples. They broaden the product without requiring realistic characters. Current local films already demonstrate the first three. Remotion supplies SVG path, text-layout and audio-visualization utilities; its official maps guidance covers route and geographic camera work. [Path utilities](https://www.remotion.dev/docs/paths), [layout utilities](https://www.remotion.dev/docs/layout-utils), [audio visualization](https://www.remotion.dev/docs/audio/visualization), [maps guidance](https://github.com/remotion-dev/skills)

## Candidate backlog

The labels below are local research references, not canonical story identities, backlog entries, readiness assessments or executable plans. Each candidate names an outcome Terry can evaluate. Relative scope describes uncertainty and breadth, not a delivery estimate; this repository has no established S/M/L definitions.

### Improvements to script authoring and direction

| Candidate | First evaluable outcome | Basis and boundary | Relative scope |
| --- | --- | --- | --- |
| **R01 Rearrange silent moves with automatic joins** | Terry rearranges three moves of the same actor and the film connects their positions without manual timing or subtitle placeholders | Reuse action actors, numeric chaining and the beat/pose pattern. Include a deliberate cut and a prop already attached throughout; acquisition/release belongs to R02. Improve directing, not only a data type name | Moderate; high confidence in value |
| **R02 Carry actor and prop state across beats** | A character still holds the acquired prop in a later compatible beat; incompatible rearrangement receives a useful explanation or an explicit authored boundary | Extend the first continuity proof to persistent identity, ownership and visibility. Start with one supported interaction; do not promise inferred continuity for arbitrary scenes | Moderate to substantial; medium feasibility confidence |
| **R03 Compare visual treatments before producing a whole film** | Terry watches a small set of key poses and a short moving sample of two treatments and chooses the one that conveys his idea | Recent remakes show the value of deciding tone, metaphor and diagram fidelity early. Preserve his source idea and accepted choices | Moderate; high confidence in value |
| **R04 Place actors through named regions and anchors** | Terry can place an actor beside another actor, reserve caption space and direct a move without repeated pixel arithmetic | Assess wall, panel and anchor helpers. Start with screen composition; world projection and full graph layout remain separate examples | Moderate; high confidence in value |
| **R05 Change pacing or a voice take without repairing every cue** | Terry lengthens a beat or selects another recorded take; associated motion and captions follow the chosen timing policy | Reuse reading pace, recorded narration and measured speech cues. Support motion-led and performance-led films. Approved audio must not be silently regenerated | Moderate; high confidence in value |
| **R06 Find script and asset problems before rendering** | A missing actor or asset, ambiguous duplicate beat ID, invalid duration or incompatible assignment to an exclusive track produces a useful authoring message | Existing missing-ID errors and typed actions are useful starting points. Preserve intentional beat reuse and supported layered motion; bound initial diagnostics to the chosen script contract | Local to moderate; high confidence in value |
| **R07 Edit a scripted scene visually and retain the script** | Terry moves, retimes or reorders one suitable scene in Studio, then edits its source, with both edits preserved | Evaluate native Studio first. Current remake controls are partial. One successful round trip is the acceptance signal, not the existence of a newer dependency | Moderate; medium confidence |
| **R08 Direct expressive motion through reusable intentions** | The same travel/reach/settle action can feel deliberate, playful or nervous without new choreography for every use | Reuse workshop gestures and Story Impact timing. Preserve direct custom motion as an escape hatch; begin with a small useful vocabulary | Moderate; high confidence in value |
| **R09 Cast an existing cartoon character into another film** | A character looks, reaches for, holds and releases a prop while contact and limb lengths remain believable | Workshop acting is already solved locally. The improvement is reuse in another scene/character, not another repair of its existing arms | Moderate; high confidence in value |

### New visual languages and film styles

| Candidate | First evaluable outcome | Basis and boundary | Relative scope |
| --- | --- | --- | --- |
| **R10 Make a convincing illustrated dialogue scene** | Two characters speak and listen in a short exchange, with mouth timing, expression, gaze and pauses that Terry accepts | Begin with one reusable rig and saved speech. Speaking alone is insufficient: listening and turn-taking matter | Substantial; medium confidence |
| **R11 Make an anime style performance shot** | A short character shot preserves a designed appearance while conveying a recorded performance's emotion and movement | Compare asset/rig and performance-transfer routes before choosing infrastructure. One successful shot does not establish production of a complete anime film | Substantial exploratory work |
| **R12 Direct a 3D environment and camera shot** | Terry scripts a short shot with staging, camera framing, lights and an environment, and the render matches arbitrary-frame seeking | Reuse ThreeCanvas and camera actions. Evaluate a room or object scene first, with a real rendered output | Moderate to substantial; medium confidence |
| **R13 Direct named 3D character motion clips** | A GLB actor plays an intended idle/walk/gesture sequence with acceptable joins and correct seeking | Current wrapper plays every imported animation. Named clip choice and useful transitions are new outcomes; begin with a compatible rig | Substantial; medium confidence |
| **R14 Combine a cinematic 3D render with scripted overlays** | A Blender-rendered shot enters a Terry Moves film with correct camera timing, audio and overlays | Keep an offline 3D route available when lighting, simulation or asset complexity exceeds a useful browser workflow | Moderate to substantial; exploratory |
| **R15 Make a realistic generated people shot** | A short shot contains believable human action in a real-looking environment and fits the script's duration and edit | Generate externally, choose and cache an approved clip, then assemble in Remotion. Evaluate action, anatomy, environment and motion at normal playback | Moderate to substantial; provider and quality uncertainty |
| **R16 Preserve identity and setting across generated shots** | Two or three shots form a coherent small scene with consistent character, wardrobe, location and screen direction | Depends on an acceptable R15/R11 shot. References and editorial selection help, but continuity remains a quality question | Substantial exploratory work |
| **R17 Replace and arrange mixed media shots from the script** | Terry swaps a recorded/generated clip or illustration while timing, crop, audio and overlays retain their intended behavior | Feature Teams already composites footage. Extend that capability to a reusable shot workflow rather than rebuilding video playback | Moderate; high confidence in value |

### Review and finishing improvements

| Candidate | First evaluable outcome | Basis and boundary | Relative scope |
| --- | --- | --- | --- |
| **R18 Review exact moments without another full render** | Terry names a beat or frame, receives a contact sheet/boundary preview, and can compare the revised short range with the previous take | Existing storyboard poses and geometry tests help. A visual note should retain the beat/frame/source reference through subsequent edits | Moderate; high confidence in value |
| **R19 Reproduce the reviewed release from saved inputs** | A release command produces the expected film, cover and subtitles and identifies stale or missing approved inputs | Reuse current render/audio/subtitle tools. Include content/asset version evidence; routine reproduction should stay offline | Moderate; high confidence in value |
| **R20 Start each film with the intended brand and visual language** | Terry chooses a project look and the film's type, color, captions, cover and credits remain consistent while allowing film-specific direction | Late branding repeats in histories. Start with established Terry/Odd-e assets and a new film; avoid a large theme framework | Local to moderate; high confidence |
| **R21 Deliver square portrait and wide cuts with readable staging** | One chosen film exports useful aspect-ratio variants without obscured action or illegible labels | Depends on adequate screen layout for the chosen film. Recompose focal content; changing canvas dimensions alone is insufficient | Moderate; medium confidence |
| **R22 Deliver another language edition with appropriate pacing** | A chosen film exports translated captions or speech with correct reading time, type and visual labels | Extend existing translations and exact transcript evidence. Shared semantic beats need not imply identical durations between languages | Moderate; medium confidence |
| **R23 Move diagram nodes without breaking their relationships** | Moving or resizing a node preserves connector endpoints, direction, topology and label clearance | Reuse ATDD's current circle/tree geometry on a second example. Begin with authored routing constraints; general pathfinding is a later question | Moderate; high confidence |
| **R24 Make an intentional film driven by music and sound** | A short film coordinates rhythm, visual emphasis and sound without requiring narration | Use audio-reactive properties and deliberate musical cues selectively. Acceptance is an engaging edit, not a waveform demonstration | Moderate; medium confidence |
| **R25 Tell a geographical story through a camera and map** | A short film follows a route or place change with readable labels and purposeful 2D/3D framing | A distinct optional style. Assess existing map integrations; include attribution, offline reproducibility and asset access for the chosen example | Moderate to substantial; exploratory |
| **R26 Revise one generated asset without paying to recreate the rest** | Editing one shot or voice line regenerates only the intended asset, preserves accepted takes and shows retry/cost evidence | Reuse existing selected-take and hash records. Start with one provider and one film; production render must consume saved approved assets | Moderate; high confidence in value, provider uncertainty |
| **R27 Revise selected visuals while preserving approved tracks** | Terry makes the scattered-blue-cell edit or a local diagram correction while audio, timing and unrelated shots stay unchanged, with evidence of preservation | Reuse hashes/equality checks and measured timing. Support selective locks and a focused preview; a requested reorder may explicitly unlock timing | Moderate; high confidence in value |
| **R28 Make a film whose performance is typography** | A short film uses type, spacing, emphasis and restrained motion to convey an idea without character or footage requirements | The simple remake supplies a relevant local example. Reuse text/path utilities and show readable motion at normal playback; this is a style example, not a typography framework | Moderate; medium confidence |

## Suggested ordering

The candidate list is a menu, not a proposal to enqueue all 28 items. The strongest first story is **R01**, because it directly tests Terry Moves' defining promise. Add **R03** and **R27** early: a successful engine does not establish that a chosen treatment expresses Terry's idea, or that a local revision preserves accepted work. R02 extends continuity into one semantic interaction once the simpler proof succeeds.

R04, R05 and R06 should enter as the first film reveals concrete placement, timing and diagnosis needs. R07 can run as a separate small editing experiment. Its result may remove the need for a custom editor or show exactly where native Studio cannot preserve the script model.

Do not wait for every authoring improvement before exploring new visual styles. In parallel with core work, choose one **R10 illustrated dialogue**, **R12/R13 3D scene**, or **R15 realistic generated shot**. Each should end in a short film that Terry can judge. These examples reveal asset and directing requirements before a broad character or scene framework is built.

R08/R09 make proven motion and acting reusable. R17/R18/R19 reduce repeated production and review work. R20 can be folded into the first new branded film if it remains small. Choose R21/R22 when distribution or a language edition creates the need. R11/R14/R16/R24/R25/R28 are distinct style opportunities whose order should follow creative interest and the earlier evidence.

### Small films that would test the direction

| Film example | What it should establish | Useful result even if later work stops |
| --- | --- | --- |
| Silent prop interaction | Rearrange compatible actions; actor/prop state survives; an explicit cut behaves as directed | A genuinely useful silent script and a clear continuity boundary |
| Illustrated conversation | Emotional acting, listening, mouth timing and readable staging | A finished reusable dialogue shot and evidence about required assets |
| 3D character in a room | Camera, light, named motion and seeking yield an acceptable rendered shot | A practical 3D production route for one known rig |
| Realistic person in an environment | External generation produces an editable, acceptable clip at tolerable iteration cost | A saved shot and a measured decision about continuing this style |

Each example should compare the time and back-and-forth needed to make a small revision with the recent manual workflow. Also judge the film at normal speed, on a phone where relevant, and with sound. A low number of edits does not compensate for poor storytelling or stiff movement.

## Alternatives and boundaries

**Continue making every film through bespoke Codex code.** This remains the strongest immediate alternative: it already produces films and allows unrestricted art direction. It is insufficient as the whole product direction because recent work repeats geometry, timing, staging, review and reproduction responsibilities. Keep it as a creative escape hatch while proving reusable behavior in small films.

**Adopt a complete external editor.** This could help mixed-media editing, but it may constrain the script and duplicate the workflow. Try installed Studio capabilities and assess external concepts before replacing the current authoring system.

**Use generated video for every scene.** This offers visual reach, but exact choreography and small edits can require regeneration, and continuity is not assured. It is better evaluated as one asset route inside a scripted film than treated as a replacement for deterministic animation.

**Build a universal film engine first.** This is too broad to evaluate and risks preserving hypothetical requirements. Prefer shared concepts discovered in multiple useful films. Do not require migrating all existing films as the first improvement.

Cross-cutting choices remain Terry's decisions under **ADR 0000, Use Architectural Decision Records** (`docs/adrs/0000-use-adrs-accepted.md`; index `docs/adrs/README.md`). It is the only current Accepted ADR found. No Accepted technical ADR mandates subtitle-driven timing or prohibits a new film style. This research neither approves an architecture nor drafts a new ADR.

## Research coverage and current state

The engine assessment uses the main checkout baseline at `6c53732` and the current film sources, tests and production guides. During the final report check, a separate concurrent commit advanced the checkout to `dbe4e71`, installing official Remotion guidance without changing the inspected engine. Relevant ATDD material also lives in `/Users/terryyin/.codex/worktrees/atdd-short-film/terry-talks`, branch `codex/atdd-short-film`, whose visible revision was `c379fd4`. Findings about that film must not be inferred from the main checkout alone.

History findings distinguish observed requests, actions and delivered outcomes from current gaps. Internal reasoning is not reproduced. Some earlier film provenance is available through seeds and Git rather than discoverable Codex chats. This is a research and source review, not a fresh render benchmark or regression certification.

The current `.planning/PRODUCT-BACKLOG.md` direction is "Make educational short videos." Its two listed stories concern conference readiness and Terry's recorded voice for Story Impact. Recorded Story Impact narration already exists in the current implementation, so the queued voice-over item's status warrants separate reconciliation. R05 proposes broader performance reuse; it must not duplicate the old story or expand its scope implicitly. The report leaves the backlog, story seeds, planning state and ADR statuses unchanged.
