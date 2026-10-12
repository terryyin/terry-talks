# Cinematic 3D shot preparation evidence

Retained observations supporting the [active plan](./PLAN.md).

## Decisive premises and observed preparation evidence

Observed on 2026-10-12 in the established preparation checkout
`/Users/terryyin/git/terry-talks/.worktrees/i-can-direct-a-cinematic-3d-shot-through-the-scr`,
branch `codex/i-can-direct-a-cinematic-3d-shot-through-the-scr`, product base
`c4c9975f12c1d3e19e21e0cfa9d093ea578a770f`. Dependencies were installed from the
lockfile with Node 24.21.0 and pnpm 11.28.5. Remotion 4.0.533, Three 0.186.1,
R3F 9.8.1 and the existing ANGLE configuration rendered locally using Remotion's
Chrome Headless Shell 149.0.7790.0. Sandbox network initially prevented the
browser download; the authorized retry completed. This is not a route blocker.

The disposable `src/__preparationProbe.tsx` registered `PreparationProbe`, a
320×180/30 fps/30-frame scene: yellow and cyan boxes at different depths,
ambient and directional light, and the existing beat clock sampling camera x
as `elapsedSeconds * 2`. A `reverse` input sampled `29 - frame`. The corrected
version applies camera position `[x,2,6]`, target `[0,0,0]` and projection/world
matrix updates in a layout effect through R3F's actual camera. No mesh, light
or canvas was mocked. Inspected the rendered middle frame. Probe source and
images were retained outside the checkout at `/tmp/cinematic-3d-preparation/`;
all scratch product edits were removed before writing preparation records.
These temporary artifacts are observation evidence, not production assets.

| Premise and consumer | Observation and result | Planning consequence |
| --- | --- | --- |
| Existing camera-prop changes animate in the renderer | Initial forward render produced only 1 distinct PNG across 30 frames; direct frame 15 differed; all 30 reverse counterparts differed. | False. Do not rely on initialization props for camera movement. |
| Explicit sampled camera updates work through real rendering | Corrected forward render produced 30 distinct PNGs. All 30 reverse counterparts were byte-identical to the corresponding forward PNG; a fresh frame 15 was identical. | Supported for this representative geometry/light/camera route. Actual shot and Studio seeking still need slice 1 proof. |
| Existing beat sampler is usable by this 3D scene | The real render consumed `timeline(...).poseAt(frame)` and its reversed order to compute camera positions above. | Reuse it without changing its API. No assumed transfer of silent-scene domain rules. |
| MP4 delivery works in this checkout | The same probe encoded successfully. `ffprobe` reported h264, 320×180, yuv420p, bt709, 30/1 fps, 30 frames. | Encode the actual shot through this route; no claim about its eventual 1080px speed or artistic quality. |
| Focused existing test route runs | 3 suites / 28 tests passed for frame sizing, 3D transforms and silent-scene joins. Canvas mocks make these insufficient pixel proof. | Tests locate reusable numeric boundaries; new real-render proof must discriminate the observed camera failure. |

Literal observation commands (from repository root; scratch source is removed):

```sh
pnpm install --offline --frozen-lockfile --store-dir /Users/terryyin/Library/pnpm/store/v11
pnpm -C terry-moves test:unit --runInBand tests/video_conomponents/ThreeDFrame.spec.tsx tests/video_conomponents/ThreeAnimationEffect.spec.tsx tests/silentScene/joins.spec.ts
pnpm -C terry-moves exec remotion render src/__preparationProbe.tsx PreparationProbe /tmp/cinematic-3d-preparation/sequential --sequence --image-format=png --frames=0-29 --concurrency=1
pnpm -C terry-moves exec remotion still src/__preparationProbe.tsx PreparationProbe /tmp/cinematic-3d-preparation/direct15.png --frame=15
pnpm -C terry-moves exec remotion render src/__preparationProbe.tsx PreparationProbe /tmp/cinematic-3d-preparation/reverse --sequence --image-format=png --frames=0-29 --concurrency=1 --props '{"reverse":true}'
# After the explicit sampled-camera scratch change:
pnpm -C terry-moves exec remotion render src/__preparationProbe.tsx PreparationProbe /tmp/cinematic-3d-preparation/fixed-forward --sequence --image-format=png --frames=0-29 --concurrency=1
pnpm -C terry-moves exec remotion render src/__preparationProbe.tsx PreparationProbe /tmp/cinematic-3d-preparation/fixed-reverse --sequence --image-format=png --frames=0-29 --concurrency=1 --props '{"reverse":true}'
pnpm -C terry-moves exec remotion still src/__preparationProbe.tsx PreparationProbe /tmp/cinematic-3d-preparation/fixed-direct15.png --frame=15
pnpm -C terry-moves exec remotion render src/__preparationProbe.tsx PreparationProbe /tmp/cinematic-3d-preparation/probe.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=1
ffprobe -v error -show_entries stream=codec_name,width,height,pix_fmt,avg_frame_rate,nb_frames,color_space -of json /tmp/cinematic-3d-preparation/probe.mp4
```

PNG comparison used SHA-256 of each complete file: counted distinct forward
hashes, compared forward index `i` against reverse index `29-i`, and compared
direct15 against forward index 15. It discriminated the camera-prop failure
before passing with explicit updates. Do not treat this probe as proof of the
unbuilt film's look, cue joins, authoring revision or saved-take reproduction.
Those are new behavior owned below, not unsettled claims that it already works.
