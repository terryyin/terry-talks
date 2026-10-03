# Problem Decomposition — film treatment

The freedom to change your mind. English, 1080 × 1080, 30 fps.

Runtime: **90.67 seconds**. Narration is OpenAI’s Cedar synthetic voice,
not a recording or imitation of Terry. The full article remains the argument's source;
this script is its shorter film presentation. Just in time is embedded in the goals.

This is part two of Story Impact. Its familiar Structure / Behavior / Time stage
persists through the explanation: a wish becomes smaller customer-outcome balls,
each useful impact splashes across the product and is assimilated into its design.
The bill-sharing example gives those balls concrete meaning. Neat solution parts
give way to smaller customer problems, a useful equal split, feedback and affordable stopping.

A four-part chapter rail makes the argument explicit: Distinction → Premises → Goals → Principles.
Two premises establish the planning philosophy. Two goals explain value with feedback
and affordable stopping. Four principles cover the three Vs, one-piece flow, the same
reasoning at smaller scales (including commits), and care for the whole product.

| Time | Scene | Spoken narration |
| --- | --- | --- |
| 0.00–7.57s | Distinction | A story is a wish for a better world. How do we split that wish? Three friends need to know what to pay. |
| 7.57–14.03s | Distinction | Many teams split the solution: database, API, screen. Those are parts of an answer. |
| 14.03–20.17s | Distinction | Problem decomposition splits customer problems: split equally; unequal shares; track payments. |
| 20.17–27.53s | Two premises | Two premises: seek smaller customer problems before choosing solutions. A plan is an attempt, not a guarantee. |
| 27.53–39.40s | Goals · Value + feedback | Two goals. First: deliver value and feedback. One small story crosses the product. Now each friend knows what they owe. Their reaction changes the next step. Just enough, just in time to learn. |
| 39.40–47.00s | Goals · Affordable stopping | Second: make stopping affordable. Completed value keeps working. Leave later stories unstarted, so you can change direction. |
| 47.00–57.20s | Principles · Three Vs / One-piece flow | Four principles. Three Vs: valuable to customers, visible in their world, vertical through the product. One-piece flow: finish one customer outcome together. |
| 57.20–61.93s | Principles · Same reasoning at every scale | Repeat at smaller scales: stories, scenarios, implementation slices. |
| 61.93–72.60s | Principles · Same reasoning at every scale | Every commit is your last commit. Strive for useful value now; serve today's purpose or an already documented need, including product health, not merely prepare the next commit. |
| 72.60–84.90s | Principles · Whole product focus | Care for the whole product. Assimilate each splash into a coherent design. Healthy design preserves speculative future potential: option value. Unused features can add complexity and close alternatives. |
| 84.90–90.67s | Choose again | Smaller problems. Useful impacts. Freedom to choose again. |

## Production

Run `python3 'Problem Decomposition/produce_audio.py'` from the repository checkout.
The source is `film-script.json`. One continuous Cedar take retains natural breaths and pauses.
Its 209 spoken words keep just in time inside the goals and option value secondary and speculative.
Captions follow measured word boundaries; scene and caption boundaries are frame-aligned.
Each caption range owns both its spoken clause and displayed text. No narration is cut to meet the runtime.
Use `--refresh-docs` to reformat the script and refresh this treatment without synthesizing audio.

The score is an original programmatic composition: restrained open chords and sparse chime
accents. It enters gradually beneath the opening question. Narration is mastered to −18 LUFS and
the score to −40 LUFS; both should play at volume 1 in the composition.

The chosen `cedar-take.wav`, its exact-script audit and Whisper word alignment in
`cedar-performance.json` reproduce narration, timing and score without another API request.
Use `--new-take` only to generate a new performance with `gpt-4o-mini-tts` / `cedar` and
measure words with `whisper-1`. This needs the OpenAI Python SDK and `OPENAI_API_KEY`.
The speech endpoint returns audio only; the saved transcript comes from measuring that actual audio.
Whisper word boundaries are automated estimates, not a claim of human listening.
Python, ffmpeg and ffprobe build committed runtime WAVs. Playback and rendering need no API.
