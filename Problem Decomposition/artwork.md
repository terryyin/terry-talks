# Film artwork

Original AI-generated artwork made with the built-in ImageGen tool on 3 October
2026 for this film. The two customer scenes were replaced on 4 October with
shared TPS-deck sumi-e artwork, as recorded below. All selected assets are saved in
`terry-moves/public/assets/problem-decomposition/`; no runtime dependency on the
Codex image-generation directory. These are illustrations, not photographs of
identified people. The diagrams, typography, receipt, phone UI and animation
are authored in the Remotion source.

## Original art direction

Mature contemporary ink and gouache editorial illustration: expressive adults,
natural proportions and gestures, confident contours, uneven painted pigment,
subtle paper texture, warm restaurant light and deep cobalt shadows. Three
recognizable diners carry the human example. Warm ivory `#f2eadb`, navy
`#172c42`, cobalt `#334c9b`, terracotta `#cc6347`, ochre `#e1ae5d`. No childish
mascots, emoji, toy rendering, corporate stock vectors, logos or diagram text.

## Prompts and outputs

### Original dinner.png (superseded)

Prompt: a landscape 3:2 cinematic medium shot of three adult friends (30–45)
finishing dinner in a warmly lit city restaurant at night. An East Asian man
with swept dark hair and cobalt overshirt, a Black woman with natural short hair
and ochre sweater, and a light-brown-skinned woman with wavy dark hair and
terracotta jacket. Nuanced concern, curiosity and affectionate wry humor as they
lean toward a long receipt. Dark phone with blank ivory screen on the table.
All faces visible; about 15% clear ivory space at top for later typography.
Artful pendant light, atmospheric windows, layered painted environment, elegant
silhouettes. Shared art direction above; no text, lettering, watermark, speech
bubble or explanatory diagram.

- Original output: exec-555ff29b-3516-4f03-8cd1-2fb50c9cf94e.png
- 1536 × 1024
- SHA-256: 7ead5db147aa27450208fdad55965c364608800d3b1e5bf31fc0e0d18dbbb95b

### Original dinner-relief.png (superseded)

Edit prompt: use dinner.png as strict character and style reference. Preserve
three identities, clothing, restaurant and landscape composition. Change poses
and expressions to a useful outcome: center woman holds the blank-screen phone
toward friends, man leans back with relief and an open hand, right woman looks
up with a knowing natural laugh and lifted eyebrow, raising a hand to ask the
next question. Adult emotion, no exaggerated cartoon joy. Same receipt, plates,
warm light and painted texture; no text, logos or speech bubbles.

- Original output: exec-4c666114-b043-465d-96de-acb4378b7464.png
- 1536 × 1024
- SHA-256: da60e2a0cc5c265a8a89ad0158e79232200be0242efe68351eeb41f2bcafaf12

### engineers.png

Prompt: one transparent-background landscape editorial illustration of three
adult software engineers collaborating at one shared workbench around one
central laptop. East Asian woman in cobalt, Black man with curls and glasses
in ivory/ochre, light-brown-skinned woman in terracotta. Varied natural poses,
explaining hand, sketching hand, all attention toward the shared work. Mature
faces and articulate hands; same ink/gouache texture and palette. Half-length
figures with desk, cleanly isolated alpha around group, padded full silhouettes.
No environment, text, code lettering, logo, gears or diagrams.

- Original output: exec-508bf5b7-1ce7-4c78-81d5-9276a8b87af7.png
- 1536 × 1024 RGBA (generated with transparent_background=true)

No existing Story Impact character art was modified. These prompts summarize
the generation instructions; the original tool calls remain in the chat history.

## Shared TPS replacements, 4 October 2026

The two customer scenes now follow the TPS deck's Japanese ink-and-wash
(sumi-e) style: monochrome washes with one vermilion accent, transparent
surroundings and fading edges. The three friends retain their identities.
The first scene emphasizes the train as one smaller problem among fare and
access. The second contains a train result in the phone and shifts the red
focus to a possible accessible route. These pictorial thoughts express
customer concerns, not a timetable or an assurance that the whole journey
has been solved.

The deck uses byte-identical copies under `slides/tps-and-ai/public/`.
Replacement changes only these two runtime film assets. Narration, script,
captions, timing, scene code, engineer artwork and music stay unchanged.
The previous versions are recoverable at revision `62c78ba`.

### Current dinner.png

- Built-in imagegen, `transparent_background=true`.
- Inputs: the deck's `cover-crane-released.png` for style and the original
  `pull-customer-need.png` for characters and story.
- Original output: `exec-e6cd5be4-ed53-4959-8f3f-458d8a31db35.png`.
- Saved film asset: `terry-moves/public/assets/problem-decomposition/dinner.png`.
- Saved deck asset: `slides/tps-and-ai/public/pull-customer-need.png`.
- 1536 × 1024 RGBA.
- SHA-256: `fbb9caf0ab7e3b0790dbd949b64c8c27e9d20af8f726845bcf67cf2c3c57712e`.

Complete prompt:

```text
Use case: style-transfer.
Asset type: shared teaching illustration for a TPS slide deck and the existing Problem Decomposition film.
Japanese ink-and-wash (sumi-e) illustration on off-white paper, with a single vermilion-red accent. No text, no letters, no captions.
Input image 1 (crane): STYLE REFERENCE ONLY. Match its monochrome ink medium, delicate gray washes, natural paper space, and restrained vermilion emphasis. Do not include a crane.
Input image 2 (three diners): edit target and CHARACTER/STORY reference. Completely redraw this scene in the deck's ink style. Replace the dense restaurant painting with a sparse, expressive spot illustration on a genuinely transparent background. Preserve exactly three adult friends: left East Asian man with swept dark hair and open overshirt, center Black woman with short natural curls and sweater, right light-brown-skinned woman with wavy dark hair and jacket. Clothing becomes black and gray ink, no cobalt, gold, orange, skin-tone color, or other colored pigment.

Primary idea: after dinner they want to get home, and must choose a small useful customer problem first. This must clearly be a travel question, not splitting the restaurant bill. The three are close together at a small table with only a few visibly empty dinner dishes. Center friend holds a phone with a blank pale screen, studying it with a thoughtful questioning expression. Left friend leans toward her, slightly worried about the last train, open hand. Right friend listens with a curious lifted eyebrow and a small tentative hand gesture. Make faces and articulate gestures readable at thumbnail size.
Above the central group, three compact, simple pictorial thought motifs share the same loose wash: a recognizable train silhouette (the first question, with the ONLY vermilion accent), a very faint coin (fare), and faint steps beside a smooth ramp (accessible route). They represent QUESTIONS, not already finished routes. Keep train prominent; coin and steps secondary and small. No connecting arrows, lettering, question marks, numerical clocks, check marks, speech text, receipt or decorative background. Do not make a comic grid or a diagram.
Composition: landscape 3:2, about 1536x1024. The friends, phone, sparse table and small thought motifs form one coherent group filling most of the canvas with safe padding around all faces and essentials. Important gestures and symbols close to center so they remain visible in the film's 270x180 inset. Soft gray ground washes fade to transparent edges. No rectangular background, room panorama, logos, watermark. Mature human proportions and clear silhouettes, not childish cartoons or corporate vectors.
```

### Current dinner-relief.png

- Built-in imagegen, `transparent_background=true`.
- Inputs: the new `dinner.png` for character/style consistency and the original
  `pull-customer-feedback.png` for story and pose.
- Original output: `exec-66ed4a94-5603-4663-a7a6-a79069d4d218.png`.
- Saved film asset: `terry-moves/public/assets/problem-decomposition/dinner-relief.png`.
- Saved deck asset: `slides/tps-and-ai/public/pull-customer-feedback.png`.
- 1536 × 1024 RGBA.
- SHA-256: `8a5d0833a1036a34e8a48e4f67296252a46694f2d48a1eb7d1e0bc29bc138762`.

Complete prompt:

```text
Use case: style-transfer.
Asset type: second of a paired teaching illustration, shared by the TPS slides and existing Problem Decomposition film.
Japanese ink-and-wash (sumi-e) illustration on off-white paper, with a single vermilion-red accent. No text, no letters, no captions.
Input image 1 is the first newly drawn customer scene: use it as strict CHARACTER, MEDIUM, COMPOSITION and TRANSPARENT-EDGE reference.
Input image 2 is the original dinner-relief scene: STORY AND POSE reference only. Replace its dense colored restaurant style entirely.
Create the matching AFTER / FEEDBACK scene. Preserve exactly the three friends and their identities, grayscale clothing and left-to-right positions from image 1, the sparse used dinner dishes, the 3:2 framing, table height and large readable faces. The center Black woman now holds the phone outward to show a simple black TRAIN PICTOGRAM on the pale screen, with no text, timetable numbers or check mark. She smiles with modest relief because a useful train result exists. The left man visibly relaxes with a small pleased smile and an open palm toward the result. The right woman is engaged rather than merely happy: she has an inquisitive raised eyebrow, one clear open hand turned toward her friends, and the other indicating the phone. Her attentive expression says 'great, and what about the route?'

Primary idea: finishing a useful result makes the customer's NEXT question concrete and changes what matters next. Move the sole vermilion focus to a small pictorial thought vignette above the right woman's head: recognizable steps obstructing a route, with a simple smooth path curving beside the steps as a possible accessible alternative. Red emphasizes the steps/new route concern; it is not a connecting flow arrow or a meaningless decorative line. This is a thought about access, not an actual restaurant staircase. The train thought and fare-coin motif from image 1 are absent; the achieved train result is now contained in the phone. One small thought vignette, one usable phone, three expressive people, no other conceptual symbols. Keep motif near center-right so it fits the film's tiny inset and rounded top crop.
Background genuinely transparent. Soft neutral wash beneath the table fades out at the edges, no framed room or opaque rectangular paper. Monochrome ink except the restrained single vermilion focus on the route question. No cobalt, orange, gold, colored clothing, logos, watermark, text, numbers, labels, question marks or diagram arrows. Natural adult hands and proportions, mature expressive brushwork. Safe padding around essential faces and the thought motif. Landscape 1536x1024.
```
