# The change remains — visual proof

A silent 33-second editorial study of a story becoming part of a changed product.
The Remotion composition is **StoryAssimilation**, at 1080 × 1080 and 30 fps.
Its editable scene is [StoryAssimilation.tsx](../terry-moves/src/parts/StoryAssimilation.tsx);
its [local cue timeline](../terry-moves/src/parts/StoryAssimilationTimeline.ts)
uses cues 11, 15, 17, 18 and 23 from the [maintained script](subtitle-script.md).
The excerpt preserves their wording and order, with six seconds per caption,
a 1.5-second gap after cue 15 and a 1.5-second ending hold. It does not change
the three-minute film script.

## Treatment

Warm paper and a fixed perspective make the product recognizable throughout.
Blue square components and connections establish structure; green curved routes
cross those components to represent behavior. The time direction leads from
faint earlier states in depth toward the present. The leftmost region stays in place.

The coral story draws itself across several paths and connections. Its arrival
is expressive; selected components move out of alignment without breaking apart.
After the caption clears, deliberate motion reconciles behavior and then settles
the structure into a different arrangement. Coral remains within an existing
behavior path and a new structural connection. The independent incoming stroke
fades completely. History remains visible behind the current product.

Large screen-facing captions occupy a reserved bottom panel. Short editorial
headings indicate the phase without replacing the subtitle argument. Precise
local SVG geometry supplies the needed expression and morphing; generated raster
artwork would not add a necessary element to this proof.

## Preview and render

From the repository root:

```sh
pnpm moves
pnpm -C terry-moves exec remotion render src/index.ts StoryAssimilation out/story-assimilation.mp4 --concurrency=2 --muted
```

Select `StoryAssimilation` in Studio. The render is written to
`terry-moves/out/story-assimilation.mp4` (a local generated artifact).

Edit the scene's cue text or duration in `StoryAssimilationTimeline.ts` to revise
the proof. Caption windows, animation progress and composition length derive
from the same cue list through the existing `Script` contract. Cue identifiers
bind the causal phases. The focused regression demonstrates that extending cue
15 by two seconds shifts the subsequent caption and complete scene by 60 frames.
The full-film Markdown remains authoritative for wording; a regression compares
the selected text against that source to expose drift.

## Viewing questions

Watch the exported scene without audio at the intended viewing size. Identify
what changed, what remains of the incoming story, and which moment is most
memorable. Use that feedback to judge the treatment before expanding the film.
