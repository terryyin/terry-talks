# The change remains — complete cut production

The production composition is `StoryDrivenDevelopment` in `terry-moves`.
The corrected silent working cut runs **180 seconds** at 1080 × 1080 and 30 fps,
covering all 28 caption windows and four three-second visual holds. Its registered
duration comes directly from the subtitle timeline.

The [subtitle script](subtitle-script.md) remains the editorial authority.
[StoryDrivenCues.ts](../terry-moves/src/parts/StoryDrivenCues.ts) is its explicit
production copy: cue IDs, wording, durations, and preceding blank intervals.
When editing the script, update that copy and the [SRT companion](subtitle-script.srt).
The focused scene test reads the Markdown table and checks every caption's opening
and closing frame, including the four blank intervals. Timeline progress drives
the scene beats; changing an earlier duration shifts subsequent motion with its
captions. The ending's three-second blank hold is explicit in the timeline.

## Current treatment and editable artwork

[StoryDrivenScene.tsx](../terry-moves/src/parts/StoryDrivenScene.tsx) stages the
film using [UprightProduct.tsx](../terry-moves/src/parts/UprightProduct.tsx).
The upright product reveals Behavior toward the lower left, Structure upward,
and horizontal Time pointing from the right toward their joint. The right-hand
backlog contains left-facing missiles; a selected coral missile expresses a
possible transition. A person's desired experience precedes its proposed effect
across several parts of the product.

The selected missile enters the product and is consumed during a visible internal
explosion. [ProductExplosion.tsx](../terry-moves/src/parts/ProductExplosion.tsx)
keeps the blast inside the product boundary. Existing behavior and structure
become disturbed while an unaffected region retains recognizable identity.
Reconciliation reconnects behavior, structure settles into a supporting
arrangement, and judgment's alternatives resolve into explicit decisions. Coral
remains within behavior and structure. The ending retains the changed present,
small product/decision history cards, and a separate next missile; the spent
projectile no longer survives as an independent object.

The [33-second proof](visual-proof.md) (`StoryAssimilation`) and the
`StoryMissileImpact` study remain independently playable. They retain their own
staging; the complete cut uses the upright model. The films share the existing
assimilation rules where appropriate, without replacing the earlier studies'
historical treatment.

The artwork is editable local SVG geometry in the scene, product, and explosion
sources. Warm paper, coral missiles and retained changes, blue structure, and
green behavior carry the visual language. Screen-facing captions occupy a reserved
bottom panel; smaller labels orient the scene. Missile appearance remains an
interim treatment for Terry's artistic judgment. Audio, release polish, branding,
and additional output formats remain deferred.

## Reproduce and inspect

From the repository root:

```sh
pnpm -C terry-moves exec jest --runInBand tests/video_conomponents/StoryDriven.spec.tsx tests/video_conomponents/StoryAssimilation.spec.tsx tests/video_conomponents/StoryMissileImpact.spec.tsx
pnpm -C terry-moves exec tsc --noEmit
pnpm -C terry-moves exec remotion render src/index.ts StoryDrivenDevelopment out/story-driven-development.mp4 --concurrency=2 --muted
ffprobe -v error -show_entries stream=codec_type,width,height,r_frame_rate,nb_frames:format=duration -of json terry-moves/out/story-driven-development.mp4
```

Output: [complete MP4](../terry-moves/out/story-driven-development.mp4).
The output directory is ignored; the render command reproduces the export from
retained source. For editable playback, run `pnpm moves` and select
`StoryDrivenDevelopment`. Review the exported moving cut silently at a
360-pixel square display size.

The renderer may report a missing `scene.bin` requested by the unchanged flower
GLTF preload in `StoryProductDeveloper.tsx`. The SVG complete cut does not use
that asset; this diagnostic is separate from inspection of the exported film.

## Viewing evidence and acceptance boundary

The reproduced export's metadata reports 1080 × 1080, 30 fps, 5,400 frames,
180.000 seconds, and one video stream with no audio stream. Agent inspection of
32 extracted 360 × 360 samples covers the middle of every caption window and
each blank hold. Captions and chapter headings remain clear of the animation;
no clipping was observed. Eight additional impact samples show missile entry,
internal detonation, the expanding blast, and its clearance before the disturbed
product's hold. The unchanged product region and retained coral changes remain
visible through the ending. Small auxiliary history labels are subdued; the
caption supplies the argument.

Local review sheets are [opening](../terry-moves/out/revised-phone-1.png),
[proposal and impact](../terry-moves/out/revised-phone-2.png),
[assimilation](../terry-moves/out/revised-phone-3.png),
[changed present and ending](../terry-moves/out/revised-phone-4.png), and
[impact sequence](../terry-moves/out/revised-impact-sequence.png).
These are extracted export frames, not replacement artwork. The exported MP4 also played from beginning to end in a local browser at
360-pixel square size, reaching its final caption-free hold without a playback
issue. These agent checks do not establish Terry's artistic acceptance or
representative-viewer comprehension; use actual viewer feedback to judge those
outcomes.
