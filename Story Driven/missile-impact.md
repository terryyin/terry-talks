# Missile impact scene

**StoryMissileImpact** is a silent 33-second Remotion composition at
1080 × 1080 and 30 fps. Select it in Studio with `pnpm moves`.

The upright product receives one missile from a queue to its right. Structure
rises vertically from the joint; Behavior extends left and approximately 28°
downward. The horizontal Time arrow points toward the joint. An explosion inside
the product disturbs several behaviors and components. After a judgment pause,
changed relationships settle into a coherent product. An unaffected region and
faint history remain, while the selected missile is spent. Captions occupy a
separate bottom panel.

The excerpt uses cues 11, 15, 17, 18 and 23 of the
[subtitle script](subtitle-script.md), in order: six seconds each, a 1.5-second
gap after cue 15, and a 1.5-second ending hold. The
[complete cut](complete-cut.md) and [assimilation scene](visual-proof.md) are
separate compositions.

## Render and edit

From the repository root:

```sh
pnpm -C terry-moves exec remotion render src/index.ts StoryMissileImpact out/story-missile-impact.mp4 --concurrency=2 --muted
```

The export is `terry-moves/out/story-missile-impact.mp4` (H.264, video only).
Editable source: [scene](../terry-moves/src/parts/StoryMissileImpact.tsx) and
[excerpt timeline](../terry-moves/src/parts/StoryAssimilationTimeline.ts).
Caption windows and animation derive from the same timeline.

The focused scene tests cover caption timing and holds, missile entry and
consumption, multi-region change, a stable unaffected region, and retained
assimilation. Use rendered previews to assess spatial relationships and
legibility at phone size.
