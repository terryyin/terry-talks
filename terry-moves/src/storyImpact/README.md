# Story Impact portrait edition

Select `StoryImpactFilmPortrait` or `StoryImpactFilmPortraitRevised` in Studio
with `pnpm moves`. Both are complete 1080×1920 editions, from the cover through
the later stories, growing History, story-versus-feature explanation and Terry
Yin credit. Their 30 fps release clock,
cleaned English voice and English/Japanese captions are shared with
`StoryImpactFilm`; the portrait presentation gives the paired captions their
own larger reading region.

The authored canvas, connected focal stage, title/end card placement and
bilingual reading region live in [`presentation.ts`](presentation.ts), under
`PORTRAIT_PRESENTATION` (baseline) and `PORTRAIT_REVISED_PRESENTATION` (revised).
The retained revision raises the connected action from y=340 to y=200 and expands
the caption region from y=1430–1860 (430px) to y=1260–1860 (600px). Its title/end
cards and 54px English/48px Japanese type stay the same. Edit the revised master
to change staging or caption room across the film; select the baseline ID to
restore the original take. Keep performance and translations in their existing
homes. The stage's translation and scale move connected action together, including flight
paths and their endpoints; the captions have separate bounds, sizes and wrapping.

Run these commands from the repository root:

```bash
pnpm install --frozen-lockfile
pnpm moves
```

Keep Studio open and run the export in another terminal:

```bash
pnpm -C terry-moves exec remotion render src/index.ts StoryImpactFilmPortrait out/story-impact-portrait.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709
pnpm -C terry-moves exec remotion render src/index.ts StoryImpactFilmPortraitRevised out/story-impact-portrait-revised.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709
```

The exports write `terry-moves/out/story-impact-portrait.mp4` and
`terry-moves/out/story-impact-portrait-revised.mp4`: H.264/yuv420p,
BT.709, 1080×1920 at 30 fps, with AAC stereo narration. Their 3,852 video frames
(128.4 seconds) come from the shared performance plus the 36-frame cover hold.
The original square edition is selected as `StoryImpactFilm` and exported with
`pnpm -C terry-moves render:story-impact`.

Use the committed [`narration-en-cleaned.m4a`](../../public/assets/story-impact/narration-en-cleaned.m4a)
and [`recordingTimeline.json`](recordingTimeline.json); this export needs no audio regeneration.
Use Node 24.9 or later and the project's pnpm version from `package.json`
(`pnpm@11.28.5` for this take), with `pnpm-lock.yaml` unchanged. The fonts are selected
from installed system fonts, rather than bundled font files: the reviewed macOS
export uses `Chalkboard SE` for English and `Hiragino Kaku Gothic ProN` for
Japanese. The fallback stacks are declared in `layout.ts` and `ja.ts`. To
reproduce this take, keep those fonts available; another fallback changes text
shaping and needs a fresh check of both languages and labels at 360×640.

After editing the master, inspect the customer and domain labels, every caption
hold, the flight and impact extremes, the full History box, both ending outlines
and credits in Studio and in the exported file at 1080×1920 and 360×640.

See [the film guide](../../../Story%20Driven/README.md) for the storyboard,
English and Traditional Chinese narration, animation model and square export.
