# Before we build, we must see

A 30-second English film, 1920×1080 at 30 fps. The cover is visible on the
first frame. The complete Odd-e logo stays in the upper-left corner, including
the final four-second hold: **Film and idea from Terry**.

Terry extends Scott H. Young’s learning loop into a model of purposeful
software creation. Seeing recognizes a human need; care motivates action;
human experience guides improvement. AI assists the doing. The product
preserves the knowledge gained through that loop.

Original inspiration: [Scott H. Young, See–Do–Feedback: The Right Way to
Practice](https://www.scotthyoung.com/blog/2022/04/21/see-do-feedback/).
Young’s original “see” concerns studying examples. Seeing a human problem,
suffering becoming motivation, and the product retaining knowledge are
Terry’s extension, credited separately in the film.

## Preview and export

From the repository root:

```sh
pnpm moves
```

Open `/SeeDoFeedbackFilm` on Studio’s printed local URL. The seven scenes
also have their own compositions under `See-Do-Feedback-Scenes`.

```sh
pnpm -C terry-moves render:see-do-feedback
```

This reproduces the audio from saved takes, then exports
`terry-moves/out/before-we-build.mp4` and
`terry-moves/out/before-we-build-cover.png`. It requires the existing Python
audio tooling, NumPy and ffmpeg. Ordinary replay makes no speech-service
requests. Outputs are ignored by Git.

## Direction

One person and one bridge carry the idea. A gap blocks the person; seeing
changes the gap into something worth addressing. AI helps assemble a first
bridge. The person’s trial reveals a difficulty, and feedback makes the next
step better. The improved bridge remains as learned capability when a new
need appears. The ending returns to the opening ring as an eye.

| Seconds | Scene | Meaning |
| --- | --- | --- |
| 0–3 | Cover | Before we build, we must see. |
| 3–6.5 | Gap | A need is felt before it is understood. |
| 6.5–10 | Seeing | Seeing suffering can awaken passion. |
| 10–17 | Loop | Act, try, and improve through human feedback. |
| 17–20.5 | Memory | The product preserves what we learn. |
| 20.5–26 | Need | Faster building brings response closer to the need. |
| 26–30 | Closing | AI helps us do. We must still see. |

Each scene has its own source file. The parent composition’s `Series.Sequence`
nodes own the edit timing. `Stage.tsx` shares the person, bridge, palette,
type and branding. All motion follows the Remotion frame clock.

## Sound

`public/assets/see-do-feedback/audio-production.json` retains the speech
script, synthetic voice disclosure, raw take hashes, measured placement,
transcription audit, original score directions and output measurements.
The voice is OpenAI’s synthetic Cedar; it does not imitate Terry.
The film displays **AI-generated narration** in its closing credits.

Both audio tracks last exactly 30 seconds and play at unity gain. Narration
leaves the opening three seconds silent and ends before 29.2 seconds.
The original restrained score uses sparse string tones and a warm pad;
no external music recordings or samples are used.

To reproduce the retained sound independently:

```sh
python3 scripts/see-do-feedback-audio.py
```

Only explicit `--generate`, `--retake` or `--audit` options make service
requests. Retakes preserve earlier performances.
