# First principles across a fictional bay

From the repository root, start Studio:

```sh
pnpm moves
```

Select `GeographicalMapBaseline` or `GeographicalMapWideComparison`. At the
default port their previews are `http://localhost:3000/GeographicalMapBaseline`
and `http://localhost:3000/GeographicalMapWideComparison`; use the printed port
if Studio selects another one. Scrub directly to frame 1800 to compare the
held shots, then play from frame 1650 through the return at normal speed.

This silent 1080×1080 film runs for 77 seconds at 30 fps. It establishes the
inherited coastal road, distinguishes that route from the goal of getting
people to Eastmere, then asks about water, distance, capacity and available
transport. A ferry is a candidate; the comparison does not claim a measured
winner. The final overview retains both options and the two-part takeaway.

`GeographicalMapOpening` remains selectable as the original 14-second excerpt.
The two complete takes have identical geography, copy and timing. The baseline
comparison holds at center `(500, 325)`, scale `1.12`; the saved wider take
holds at `(500, 300)`, scale `0.88`. It shows more coast and surrounding land
while keeping the route and town labels at their original screen sizes.

Edit `script.ts`: `fictionalBay` owns the local coastline, town positions,
road/ferry points, shore landings and names. The ferry's continuous path includes
visible land access legs between each town and its landing. `mapBaseline.cues`
owns the copy, camera endpoints, route reveal, water-label visibility and reading
holds. A cue can add `copy.supporting` lines for a question beneath its headline.
Town/route label offsets are screen pixels;
camera positions and route geometry use the same local map units. The
renderer does not select behavior by cue name, and the shared beat clock
derives the registration duration and every seeked picture from these cues.

To revise this comparison, edit `wideComparison` in `script.ts`. Its camera is
assigned to the comparison cue's `to` endpoint and the following return cue's
`from` endpoint. Edit both when changing another shot, so the camera does not
jump at the join. `moveSeconds` is the travel time between endpoints;
`holdSeconds` is the reading hold after arrival. Copy and route values remain
in the saved direction rather than in the renderer.

To save another take, export a new `MapDirection` that copies `mapBaseline`
and replaces the desired cue fields without mutating the original. Add a
`Composition` following `GeographicalMapWideComparisonComposition`: use a
distinct ID, `GeographicalMapFilm`, your direction as `defaultProps`, and
`mapTimeline(yourDirection, filmFormat.fps).durationInFrames`. Include that
registration in `src/Root.tsx`. Camera edits need no picture/renderer changes.
Export to a distinct filename to retain the original.

All geography is locally authored fiction; the local vector coast, bay, towns
and routes in `script.ts` need no provider credit, token or download. There are
no real coordinates, measured distances or travel-time claims. The map has no
image, audio or video inputs. Its retained inputs are `script.ts`, `direction.ts`,
`GeographicalMapFilm.tsx`, `src/beatTimeline.ts`, `src/Root.tsx`, `src/index.ts`,
the repository's locked packages and the locally installed Arial font.

Export both full takes from the repository root:

```sh
pnpm -C terry-moves exec remotion render src/index.ts GeographicalMapBaseline out/geographical-map/baseline.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2
pnpm -C terry-moves exec remotion render src/index.ts GeographicalMapWideComparison out/geographical-map/revision.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2
```

Outputs follow the existing ignored `terry-moves/out/` convention. The script's
cue durations drive both the preview and export. At 30 fps, useful review ranges
are question 420–599, goal 600–779, considerations 780–1379, candidate ferry
1380–1649, comparison 1650–1919 and final overview/takeaway 1920–2309. The ferry
is fully revealed at frame 1500; the comparison camera holds from frame 1710.
The framing revision differs at frames 1651–2009: comparison motion/hold and
the return motion. Frame 1650 has the shared start, and both takes have reached
the same final overview from frame 2010. Every other authored state is unchanged.
H.264 predictive compression can change decoded pixels around those boundaries;
use lossless stills when comparing the takes' exact authored pictures.

To inspect the held comparison through the registered render path:

```sh
pnpm -C terry-moves exec remotion still src/index.ts GeographicalMapBaseline out/geographical-map/comparison.png --frame=1800
pnpm -C terry-moves exec remotion still src/index.ts GeographicalMapWideComparison out/geographical-map/comparison-wide.png --frame=1800
```

For a 360-pixel review image, append `--scale=0.3333333333` and use another
output filename. Normal-speed playback is still needed to judge reading holds.

## Reproduce without external network access

Install the locked dependencies once with `pnpm install --frozen-lockfile`.
The first Remotion render also installs its matching Chrome Headless Shell;
retain `terry-moves/node_modules/.remotion/chrome-headless-shell/` for the
offline replay. Dependency/browser installation is preparation, not a map input.
On the verified Mac, run the following commands after that preparation. The
sandbox denies external networking in the render and its child processes while
allowing loopback asset/bundle serving:

```sh
sandbox-exec -p '(version 1) (allow default) (deny network*) (allow network-outbound (remote ip "localhost:*")) (allow network-inbound (local ip "localhost:*")) (allow network-bind (local ip "*:*"))' pnpm -C terry-moves exec remotion render src/index.ts GeographicalMapBaseline out/geographical-map/baseline-offline.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2
sandbox-exec -p '(version 1) (allow default) (deny network*) (allow network-outbound (remote ip "localhost:*")) (allow network-inbound (local ip "localhost:*")) (allow network-bind (local ip "*:*"))' pnpm -C terry-moves exec remotion render src/index.ts GeographicalMapWideComparison out/geographical-map/revision-offline.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2
```

Confirm frame rate, frame count and duration, then compare every decoded frame
and its timestamp with the first export. MP4 container bytes are not the proof:

```sh
ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,width,height,r_frame_rate,nb_frames,color_space -show_entries format=duration -of json terry-moves/out/geographical-map/baseline-offline.mp4
ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,width,height,r_frame_rate,nb_frames,color_space -show_entries format=duration -of json terry-moves/out/geographical-map/revision-offline.mp4
ffmpeg -v error -i terry-moves/out/geographical-map/baseline.mp4 -map 0:v:0 -f framemd5 terry-moves/out/geographical-map/baseline.framemd5
ffmpeg -v error -i terry-moves/out/geographical-map/baseline-offline.mp4 -map 0:v:0 -f framemd5 terry-moves/out/geographical-map/baseline-offline.framemd5
ffmpeg -v error -i terry-moves/out/geographical-map/revision.mp4 -map 0:v:0 -f framemd5 terry-moves/out/geographical-map/revision.framemd5
ffmpeg -v error -i terry-moves/out/geographical-map/revision-offline.mp4 -map 0:v:0 -f framemd5 terry-moves/out/geographical-map/revision-offline.framemd5
cmp terry-moves/out/geographical-map/baseline.framemd5 terry-moves/out/geographical-map/baseline-offline.framemd5
cmp terry-moves/out/geographical-map/revision.framemd5 terry-moves/out/geographical-map/revision-offline.framemd5
```

Both offline replays were verified on the environment below: 2310 decoded
frames and their timestamps match each take's first full export, at 1080×1080,
30 fps and 77 seconds. Compare each take with its own replay, since the two
framings intentionally differ.

The reproduction environment is macOS 26.6.2 (25G83), Apple arm64, Node
24.21.0, pnpm 11.28.5, locked Remotion 4.0.533 and Chrome Headless Shell
149.0.7790.0; the comparison uses FFmpeg 7.1.1. The renderer uses
`Arial, sans-serif`. Arial is an OS font, not redistributed in this repository.
The files used on this host are:

| Font | Local path | SHA-256 |
| --- | --- | --- |
| Regular | `/System/Library/Fonts/Supplemental/Arial.ttf` | `525979822591a3447cfc49d943d6f7683508e25543407871c0ed8fed05fd2bd9` |
| Bold | `/System/Library/Fonts/Supplemental/Arial Bold.ttf` | `d72db21f9242aedd6b917d8549ad5921766b24d5f8d0becfda2ff4c620b3c2e0` |
| Italic | `/System/Library/Fonts/Supplemental/Arial Italic.ttf` | `ce1d2f1ab89db45f9796100eee960f5702a40e84c225c2b48c3ec3e81d153f98` |

Use this font/environment for matching pictures. Another host's Arial or a
sans-serif fallback can change shaping and pixels, so inspect text fit there.
The root also registers an unrelated 3D composition whose missing
`assets/quillustration_flower_and_water-can/scene.bin` can log a 404; this map
uses none of that asset.
