# Terry has a finished animation ready to share

Source: [story](../../../Story%20Driven/seed.md#release).
Identity: `story-impact-animation#release`

## Goal and scope

- **Goal:** Polish `StoryImpactFilm` for continuity and phone-size
  readability, then export `terry-moves/out/story-impact-animation.mp4` with a
  poster still, using one documented command.
- **Included:** the six continuity glitches listed in the story, text size at
  360 px, the export command (a `package.json` script in `terry-moves`), and a
  poster still.
- **Excluded:** audio, other formats, subtitle files, publication, and new
  scenes or pacing changes.
- **Preserved:** each beat's meaning and the tests' promises. The storyboard
  may change only through shared label-size or label-placement fixes, and
  those count as intended improvements.
- **Key examples:** the story's examples 1–4, mapped below.

## Execution context and decisions

- **Stack:** Remotion 4.0.518; `src/storyImpact/`. No new dependency. The
  export uses Remotion's h264 codec with `--pixel-format=yuv420p`.
- **Plan location:** `.planning/quick/015-release/`; 014 was the last number.
  Statuses: planned, in-progress, done.
- **Delivery:** Trunk Mode on local `master`, no push. Local gate:
  `pnpm moves test`.
- **Export command:** a `terry-moves` script, `render:story-impact`, runs
  `remotion render src/index.ts StoryImpactFilm out/story-impact-animation.mp4 --codec=h264 --pixel-format=yuv420p`,
  then `remotion still ... out/story-impact-animation-poster.png --frame=<closing frame>`.

## Decisive premises observed (2026-09-28, at `ae23de7`)

- `out/story-impact-film.mp4` rendered at 88.15 s with the default Remotion
  codec, so rendering the full film works.
- The label, droplet, fuzzy-switch and History-crossing issues are recorded
  in the full film's execution learnings (commit `46e74ce`, plan 014).
- `pnpm moves test` passes, with 231 tests.

## Cumulative design and sizing assessment

Two Behavior slices. Slice 1 covers continuity and readability: a set of small
rendering fixes, each observed in stills and guarded by a test where the
glitch is measurable (label position, droplet containment). Slice 2 covers the
export. There is no structural change.

## Proof ownership

| Example | Slice | Proof |
| --- | --- | --- |
| 1. Phone size | 1 | stills of every beat at 360 px, tiled and viewed |
| 2. No jumps | 1 | spec: the backlog label's y changes by at most 2 px per frame across the whole film |
| 3. Paint stays on the product | 1 | spec: every droplet of each story's splat lies inside the wall outline |
| 4. Export | 2 | the render command runs; ffprobe shows the format; the poster exists and is viewed |

## Slices

### 1. The film plays smoothly and reads at phone size
Type: Behavior
Status: planned
Proof: examples 2 and 3 in a spec; stills at 360 px viewed; `pnpm moves test`.

Behavior: given the full film → when it plays → labels stay steady and
uncovered, the flying ball turns fuzzy smoothly, paint stays on the product,
the "a feature" label arrives with its outline, the spent ball passes
the History label without covering it, and all text is legible at 360 px.

### 2. Terry can render the final export with one command
Type: Behavior
Status: planned
Proof: example 4; the MP4 and poster are viewed.

Behavior: given the source → when `pnpm -C terry-moves render:story-impact`
runs → `out/story-impact-animation.mp4` (h264, yuv420p, 1080×1080, 30 fps,
about 88 s) and `out/story-impact-animation-poster.png` are written.
