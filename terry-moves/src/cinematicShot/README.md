# Cinematic bottleneck

A silent 12-second shot starts close on moving work, pulls back to reveal the
queue at one narrow opening, and holds for four seconds. The revised take is
the retained selection for reproduction.
Its higher, more face-on ending view fits the whole platform and makes the
opening, queue and exiting work easier to read.

## Direct the shot

Edit [script.ts](script.ts). `originalDirection` retains the first take;
`revisedDirection` shares its stage, action, timing, materials and lighting and
changes only the reveal camera's ending position and target. `directions` names
the takes and `selectedTake` chooses the default for Studio and export.

- `marks` are stage positions in meters; work pieces start at named marks and
  cue `moves` send them to another mark. `stage` owns the platform, wall, opening
  and rails. `materials` owns their surface finish and colors.
- `start.camera` sets the opening position, look-at target and field of view.
  A cue's `camera` sets its ending pose; a cue without one holds the previous
  pose. Revise the camera cue in `revisedDirection` to try another framing.
- `lightPositions` and `lightColors` set the lights; `start.lights` and cue
  `lights` set their intensities. Unspecified cue lighting holds its last state.
- Ordered cue `seconds` determine the edit. At `shotFormat.fps`, the shared beat
  clock rounds each duration to frames. The composition metadata and frame
  evaluator both derive duration from the selected take's cues. There is no
  separate duration to maintain. The retained edit is 75 + 165 + 120 = 360
  frames at 30 fps.

[direction.ts](direction.ts) evaluates any requested frame directly.
[CinematicBottleneck.tsx](CinematicBottleneck.tsx) applies that sampled camera,
work and lighting to authored geometry using the same path in Studio and export.
No warmed-up playback, fetched models or generated assets are required.

`ThreeCanvas` camera props initialize the camera. Sampled direction updates the
actual R3F camera before drawing, including projection and world matrices.
Camera, work and lighting are evaluated from the requested frame, so playback,
backward seeks and direct middle-frame mounts use the same direction.

## Preview and export

From the repository root, run `pnpm moves` and select `CinematicBottleneck`.
The default is `revised`. In Studio's Props editor, use `{"take":"original"}`
to inspect the first take or `{"take":"revised"}` to return to the selection.
Props select the saved direction; they do not create a second scene.
To retain a different default, edit `selectedTake` in the script. Studio's Props
selection applies to the preview/export; it cannot save this script-owned
default back to the source.

Export the retained selection from the repository root:

```bash
pnpm -C terry-moves exec remotion render src/index.ts CinematicBottleneck out/cinematic-bottleneck/revised.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --gl=angle --concurrency=2
pnpm -C terry-moves exec remotion still src/index.ts CinematicBottleneck out/cinematic-bottleneck/revised-close.png --frame=30 --gl=angle
pnpm -C terry-moves exec remotion still src/index.ts CinematicBottleneck out/cinematic-bottleneck/revised-reveal.png --frame=150 --gl=angle
pnpm -C terry-moves exec remotion still src/index.ts CinematicBottleneck out/cinematic-bottleneck/revised-hold.png --frame=300 --gl=angle
```

The export is silent H.264/yuv420p/BT.709 at 1080×1080, 30 fps. `shotFormat` in
the script owns the size and fps. To render either saved take explicitly, add
`--props='{"take":"original"}'` or `--props='{"take":"revised"}'` to the command
and choose a matching output name. For example, inspect the original hold:

```bash
pnpm -C terry-moves exec remotion still src/index.ts CinematicBottleneck out/cinematic-bottleneck/original-selection-hold.png --frame=300 --gl=angle --props='{"take":"original"}'
```

## Saved inputs and reproduction

Keep this directory's script, evaluator and scene; `src/beatTimeline.ts`,
`src/Root.tsx` and `src/index.ts`; and the workspace's package/lock files and
Remotion configuration. Geometry and materials are authored locally, with no
external assets to acquire. Use the installed locked dependencies and the same
ANGLE renderer and export settings above.

The original MP4 and `close.png`, `reveal.png`, `hold.png` remain under
`terry-moves/out/cinematic-bottleneck/`. The selected alternate is `revised.mp4`
with `revised-close.png`, `revised-reveal.png`, `revised-hold.png`. These outputs
are generated and ignored by Git; preserve copies if comparing takes.

To reproduce the selection, preserve any desired comparison copy, remove only
the generated `revised.mp4`, and run its export command again. Compare decoded
picture frames and duration/fps when checking two exports; MP4 container bytes
may differ without a picture or edit change.

For the saved 12-second edit, check forward/reverse traversal, fresh mounts,
cue joins and visible camera movement through the real renderer:

```bash
pnpm -C terry-moves exec tsx scripts/verify-cinematic-shot.ts out/cinematic-bottleneck/revised-pixel-proof revised
```

The command writes its rendered pictures and comparison result to that output
directory. Use `original` as the last argument to check the other saved take.
