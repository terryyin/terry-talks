# Fictional bay: opening excerpt

From the repository root, run `pnpm moves` and select
`GeographicalMapOpening`, or open the already running Studio at
`http://localhost:3000/GeographicalMapOpening`.

This silent 1080×1080 opening runs for 14 seconds at 30 fps. It establishes the
two towns and the inherited coastal road; the complete first-principles
argument and ferry comparison are still to come.

Edit `script.ts`: `fictionalBay` owns the local coastline, town positions,
road points and names. `mapOpening.cues` owns the copy, camera endpoints,
route reveal and reading holds. Town/route label offsets are screen pixels;
camera positions and route geometry use the same local map units. The
renderer does not select behavior by cue name, and the shared beat clock
derives the registration duration and every seeked picture from these cues.

All geography is locally authored fiction. There are no real coordinates,
geographic downloads, measured distances or travel-time claims. The opening
uses the locally available Arial font with a sans-serif fallback.

To inspect a held opening frame through the registered render path:

```sh
pnpm -C terry-moves exec remotion still src/index.ts GeographicalMapOpening out/geographical-map-opening.png --frame=330
```
