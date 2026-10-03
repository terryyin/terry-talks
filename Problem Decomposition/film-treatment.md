# Problem Decomposition — film treatment

The freedom to change your mind. English, 1080 × 1080, 30 fps.

Runtime: **113.23 seconds**. Narration is the installed macOS Daniel synthetic voice,
not a recording or imitation of Terry. The full article remains the argument's source;
this script is its shorter film presentation. Just in time is embedded in the goals.

The recurring example is three friends splitting a restaurant bill. The hook asks
what would remain useful if development stopped tomorrow. Component plans give way
to one working equal split, feedback, and the freedom to leave later capabilities unstarted.

| Time | Scene | Spoken narration |
| --- | --- | --- |
| 0.00–8.00s | A useful question | If development stopped tomorrow, what could your customer use? Three friends finish dinner. They need to split the bill. |
| 8.00–16.07s | The distinction | You could plan a database, an API, and a screen. That's solution decomposition: arranging the answer's parts. |
| 16.07–28.57s | The distinction | Problem decomposition asks: what's the smallest useful customer problem we can solve? First, split one bill equally. Later, handle unequal shares. Later, track payments. |
| 28.57–36.97s | Two premises | Two premises: we can seek smaller customer problems. For an uncertain problem, a plan is an attempt, not a guarantee. |
| 36.97–50.23s | Goal 01 · Value + feedback | So optimize for two things. First, deliver value and learn from it. Three people see what they owe. Their reaction can change the next step. Deliver just enough, just in time, to learn. |
| 50.23–60.83s | Goal 02 · Freedom to change | Second, make stopping affordable. If priorities change, equal splitting still works. Leave later work unstarted, without making today depend on it. |
| 60.83–72.27s | Principles · The three Vs | Use three Vs: valuable to a customer, visible in their world, and vertical, working end to end. Finish one customer outcome at a time. That's one-piece flow. |
| 72.27–78.90s | Principles · The same logic | Repeat this logic at smaller scales: stories, scenarios, implementation slices. |
| 78.90–91.80s | Principles · Current purpose | Every commit is your last commit. Strive for useful value now. Each change must serve today's purpose or an already documented need, including product health, not merely prepare the next commit. |
| 91.80–105.33s | Principles · Whole-product health | Care for the whole product. Healthy design preserves the potential to deliver future value affordably. That speculative potential is option value. Unused features can add complexity and close alternatives. |
| 105.33–113.23s | Choose again | Feedback matters when you can act on it. Decompose to deliver, learn, and choose again. |

## Production

Run `python3 'Problem Decomposition/produce_audio.py'` from the repository checkout.
The source is `film-script.json`. Each caption is timed against its own synthesized
spoken clause, with short reading holds. All boundaries are aligned to video frames.
Each caption range owns both its spoken clause and displayed text. No narration is cut to meet the runtime.
Use `--refresh-docs` to reformat the script and refresh this treatment without synthesizing audio.

The score is an original programmatic composition: restrained open chords and sparse chime
accents. It begins after the opening question. Narration is mastered to −18 LUFS and
the score to −40 LUFS; both should play at volume 1 in the composition.

Generated files are `terry-moves/public/assets/problem-decomposition/narration.wav` and
`score.wav`. Intermediate phrases and loudness reports are under ignored `terry-moves/out/`.
The audio builder requires macOS Daniel, ffmpeg, and ffprobe, plus Python's standard library.
Playback and Remotion rendering use the committed WAVs and do not require macOS speech.
