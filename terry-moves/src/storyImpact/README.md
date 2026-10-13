# Story Impact portrait edition

`StoryImpactFilmPortrait` is the current **incomplete portrait edition**. Its
opening through the first story becoming coherent (release frames 0–1513) is
the reviewable excerpt; later beats still await portrait review. Select it in
Studio with `pnpm moves`. The same release clock, cleaned English voice and
English/Japanese captions feed the original and portrait compositions.

Its authored canvas, connected focal stage, title/end card placement and
bilingual reading region live in [`presentation.ts`](presentation.ts), under
`PORTRAIT_PRESENTATION`. Edit this master to revise staging or type; the
performance and caption translations remain in their existing homes.

Render the excerpt from the repository root:

```bash
pnpm -C terry-moves exec remotion render src/index.ts StoryImpactFilmPortrait out/story-impact-portrait-opening.mp4 --frames=0-1513 --codec=h264 --pixel-format=yuv420p --color-space=bt709
```

See [the film guide](../../../Story%20Driven/README.md) for the storyboard,
English and Traditional Chinese narration, animation model and square export.
