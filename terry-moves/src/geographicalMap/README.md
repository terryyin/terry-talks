# First principles across a fictional bay

From the repository root, run `pnpm moves` and select
`GeographicalMapBaseline`, or open the already running Studio at
`http://localhost:3000/GeographicalMapBaseline`.

This silent 1080×1080 film runs for 77 seconds at 30 fps. It establishes the
inherited coastal road, distinguishes that route from the goal of getting
people to Eastmere, then asks about water, distance, capacity and available
transport. A ferry is a candidate; the comparison does not claim a measured
winner. The final overview retains both options and the two-part takeaway.

`GeographicalMapOpening` remains selectable as the original 14-second excerpt.
It is a reference opening, not the complete film. A saved alternate framing
take and the offline reproduction demonstration remain the next slice.

Edit `script.ts`: `fictionalBay` owns the local coastline, town positions,
road/ferry points, shore landings and names. The ferry's continuous path includes
visible land access legs between each town and its landing. `mapBaseline.cues`
owns the copy, camera endpoints, route reveal, water-label visibility and reading
holds. A cue can add `copy.supporting` lines for a question beneath its headline.
Town/route label offsets are screen pixels;
camera positions and route geometry use the same local map units. The
renderer does not select behavior by cue name, and the shared beat clock
derives the registration duration and every seeked picture from these cues.

All geography is locally authored fiction. There are no real coordinates,
geographic downloads, measured distances or travel-time claims. The opening
uses the locally available Arial font with a sans-serif fallback.

Export the full baseline from the repository root:

```sh
pnpm -C terry-moves exec remotion render src/index.ts GeographicalMapBaseline out/geographical-map/baseline.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2
```

Outputs follow the existing ignored `terry-moves/out/` convention. The script's
cue durations drive both the preview and export. At 30 fps, useful review ranges
are question 420–599, goal 600–779, considerations 780–1379, candidate ferry
1380–1649, comparison 1650–1919 and final overview/takeaway 1920–2309. The ferry
is fully revealed at frame 1500; the comparison camera holds from frame 1710.

To inspect the held comparison through the registered render path:

```sh
pnpm -C terry-moves exec remotion still src/index.ts GeographicalMapBaseline out/geographical-map/comparison.png --frame=1800
```
