# Before we build, we must see

A 20-second English film, 1080×1080 at 30 fps. The cover is visible from frame
zero. Odd-e stays in the upper-right corner. Every text element uses locally
bundled Poppins. The ending holds **Film and idea from Terry** for three seconds.

## Terry’s diagram

The reference is `public/assets/see-do-feedback/source-sketch.jpeg`, recovered
from Terry’s original ChatGPT attachment. `Diagram.tsx` redraws its arrangement:
Suffer above Passion, the double downward marker arrow, See → Do, and the two
broad curved arrows between Do and Feedback. The redraw uses thick, uneven
marker paths with Poppins labels on a plain white background.

The diagram stays on screen for the complete middle passage. Its arrows draw
in, two colored ink traces travel around the loop, and the drawing settles.
Human / AI / Human notes distinguish seeing, doing, and feedback. There are
no characters or bridge illustrations.

Terry extends Scott H. Young’s learning loop into a model of software creation:
see a human problem, act, use human experience to improve, and preserve the
learning in the product. Original inspiration: [Scott H. Young, See–Do–Feedback:
The Right Way to Practice](https://www.scotthyoung.com/blog/2022/04/21/see-do-feedback/).
Young’s original “see” means studying examples; recognizing human suffering is
Terry’s extension. The film credits them separately.

## Preview and export

From the repository root:

```sh
pnpm moves
```

Open `/SeeDoFeedbackFilm` on Studio’s printed URL. Cover, Diagram and Closing
have their own compositions under `See-Do-Feedback-Scenes`.

```sh
pnpm -C terry-moves render:see-do-feedback
```

The export verifies saved audio, then creates
`terry-moves/out/before-we-build-square.mp4` and
`terry-moves/out/before-we-build-square-cover.png`.

| Seconds | Picture |
| --- | --- |
| 0–2.5 | Before we build, we must see. |
| 2.5–17 | Terry’s diagram and the animated feedback loop. |
| 17–20 | Closing thought and Film and idea from Terry. |

The parent `Series.Sequence` nodes own film edit timing; the standalone
compositions own each scene’s editable preview. Timing and metadata stay inline
for Studio editing. All animation follows the Remotion frame clock.
`Stage.tsx` owns plain paper, Poppins and the upper-right
brand. `font.ts` waits for local font loading before export; the font license
is saved in `public/assets/fonts/poppins/OFL.txt`.

## Retained sound

The narration uses complete sample-exact clauses from the saved Cedar
performance, with no new speech generation or additional tempo change. The
original quiet score crossfades into its resolution. Both new tracks are
exactly 20 seconds; the final spoken word finishes before 19.72 seconds.
The ending discloses **AI-generated narration**.

`public/assets/see-do-feedback/audio-square.json` records source hashes,
selected clauses, sample positions, edited score and mix measurements.
The source performance and its transcript audit remain in
`audio-production.json` with their retained original files.

```sh
python3 scripts/see-do-feedback-square-audio.py          # offline rebuild
python3 scripts/see-do-feedback-square-audio.py --verify # no writes
```

These commands use existing Python audio tooling and ffmpeg. No service
requests occur. Earlier takes and the first film are recoverable from Git.
