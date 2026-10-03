# Problem Decomposition — film treatment

The freedom to change your mind. English, 1080 × 1080, 30 fps.

Runtime: **104.90 seconds**. Narration is OpenAI’s Cedar synthetic voice,
not a recording or imitation of Terry. The full article remains the argument's source;
this script is its shorter film presentation. Just in time is embedded in the goals.

The recurring example is three friends splitting a restaurant bill. The hook asks
what would remain useful if development stopped tomorrow. Component plans give way
to one working equal split, feedback, and the freedom to leave later capabilities unstarted.

| Time | Scene | Spoken narration |
| --- | --- | --- |
| 0.00–7.67s | A useful question | If development stopped tomorrow, what could your customer use? Three friends finish dinner. They need to split the bill. |
| 7.67–15.13s | The distinction | You could plan a database, an API, and a screen. That's solution decomposition: arranging the answer's parts. |
| 15.13–25.77s | The distinction | Problem decomposition asks: what's the smallest useful customer problem we can solve? First, split one bill equally. Later, handle unequal shares. Later, track payments. |
| 25.77–33.87s | Two premises | Two premises: we can seek smaller customer problems. For an uncertain problem, a plan is an attempt, not a guarantee. |
| 33.87–45.90s | Goal 01 · Value + feedback | So optimize for two things. First, deliver value and learn from it. Three people see what they owe. Their reaction can change the next step. Deliver just enough, just in time, to learn. |
| 45.90–54.73s | Goal 02 · Freedom to change | Second, make stopping affordable. If priorities change, equal splitting still works. Leave later work unstarted, without making today depend on it. |
| 54.73–65.43s | Principles · The three Vs | Use three Vs: valuable to a customer, visible in their world, and vertical, working end to end. Finish one customer outcome at a time. That's one-piece flow. |
| 65.43–70.73s | Principles · The same logic | Repeat this logic at smaller scales: stories, scenarios, implementation slices. |
| 70.73–83.90s | Principles · Current purpose | Every commit is your last commit. Strive for useful value now. Each change must serve today's purpose or an already documented need, including product health, not merely prepare the next commit. |
| 83.90–96.93s | Principles · Whole-product health | Care for the whole product. Healthy design preserves the potential to deliver future value affordably. That speculative potential is option value. Unused features can add complexity and close alternatives. |
| 96.93–104.90s | Choose again | Feedback matters when you can act on it. Decompose to deliver, learn, and choose again. |

## Production

Run `python3 'Problem Decomposition/produce_audio.py'` from the repository checkout.
The source is `film-script.json`. One continuous Cedar take retains natural breaths and pauses.
Captions follow measured word boundaries; scene and caption boundaries are frame-aligned.
Each caption range owns both its spoken clause and displayed text. No narration is cut to meet the runtime.
Use `--refresh-docs` to reformat the script and refresh this treatment without synthesizing audio.

The score is an original programmatic composition: restrained open chords and sparse chime
accents. It enters gradually beneath the opening question. Narration is mastered to −18 LUFS and
the score to −40 LUFS; both should play at volume 1 in the composition.

The chosen `cedar-take.wav`, its exact-script audit and Whisper word alignment in
`cedar-performance.json` reproduce narration, timing and score without another API request.
Use `--new-take` only to generate a new performance with `gpt-audio-1.5` / `cedar` and
measure words with `whisper-1`. This needs the OpenAI Python SDK and `OPENAI_API_KEY`.
Whisper word boundaries are automated estimates, not a claim of human listening.
Python, ffmpeg and ffprobe build committed runtime WAVs. Playback and rendering need no API.
