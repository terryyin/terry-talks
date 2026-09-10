# Missile impact — corrected scene

A separate silent 33-second study for evaluating the lower flip chart's product
and impact metaphor. Select **StoryMissileImpact** in Remotion Studio (`pnpm moves`).
The previous [visual proof](visual-proof.md) and [complete cut](complete-cut.md)
remain available for comparison.

The upright product receives one missile from a queue to its right. Structure
rises from the joint; Behavior extends left in perspective. The horizontal Time
arrow points toward the joint, following Terry's correction to the photograph.
A visible explosion inside the product disturbs several behaviors and components.
After a judgment pause, changed relationships settle into a coherent product.
An unaffected region and faint history remain, while the selected missile is spent.

The existing excerpt uses cues 11, 15, 17, 18 and 23 of the
[subtitle script](subtitle-script.md), unchanged and in order: six seconds each,
a 1.5-second gap after cue 15, and a 1.5-second ending hold. This scene does not
change the three-minute script or apply the treatment to the full film.

## Render

From the repository root:

```sh
pnpm -C terry-moves exec remotion render src/index.ts StoryMissileImpact out/story-missile-impact.mp4 --concurrency=2 --muted
```

The local export is `terry-moves/out/story-missile-impact.mp4`, 1080 × 1080 at
30 fps. Editable source: [scene](../terry-moves/src/parts/StoryMissileImpact.tsx)
and [shared excerpt timeline](../terry-moves/src/parts/StoryAssimilationTimeline.ts).

## Evaluate

Watch silently at phone size. Identify the product, queue, entry and explosion;
then compare the ending with the opening. Is the changed product coherent and
recognizable? Is the missile spent? Are changed and unaffected regions clear?
Terry's visual judgment and viewer comprehension remain to be evaluated before
expanding this treatment throughout the full cut.

## Local verification

The export was checked as 990 H.264 frames, 1080 × 1080 at 30 fps, 33 seconds,
with no audio stream. Opening, entry, blast, judgment, reshape, and ending frames
were inspected at 360px width: the upper region stays fixed, the blast is internal,
and the final coral route and supporting connection remain clear of the captions.
Four focused scene regressions and TypeScript pass. This establishes a renderable
study for review; it does not establish artistic approval or viewer comprehension.
