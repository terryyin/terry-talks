# Problem Decomposition — film treatment

The freedom to change your mind. English, 1080 × 1080, 30 fps.

Runtime: **91.57 seconds**. Narration is OpenAI’s Cedar synthetic voice,
not a recording or imitation of Terry. The full article remains the argument's source;
this script is its shorter film presentation. Just in time is embedded in the goals.

This is part two of Story Impact. Its familiar Structure / Behavior / Time stage
persists through the explanation: a wish becomes smaller customer-outcome balls,
each useful impact splashes across the product and is assimilated into its design.
Three friends getting home after dinner give those balls concrete meaning: find the next
train, check the fare, find a step-free route. A conceived answer's database, API and screen
layers give way to customer problems, a useful train result, feedback and freedom to change
without waste or damage at completed boundaries. The train board is illustrative, not live travel information.

A four-part chapter rail makes the argument explicit: Distinction → Premises → Goals → Principles.
Two premises establish the planning philosophy. Two goals explain value with feedback
and affordable stopping. Four principles cover the three Vs, one-piece flow, the same
reasoning at smaller scales (including commits), and care for the whole product.
The three Vs animate value, visibility and the story's impact across required layers.
One-piece flow leaves its splash through the last-commit principle; Whole Product Focus
then assimilates that same impact into a coherent product, supporting customer and option value.
The closing frame is also the opening cover, held silently for 1.20 seconds before the voice lead.

| Time | Scene | Spoken narration |
| --- | --- | --- |
| 0.00–7.77s | Distinction | A story is a wish for a better world. How do we split that wish? Three friends want to get home after dinner. |
| 7.77–16.17s | Distinction | If we already know the answer, divide its structure: database, API, screen. But software development is also about discovering the answer. |
| 16.17–22.20s | Distinction | Problem decomposition splits customer problems: find the next train; check the fare; find a step-free route. |
| 22.20–28.63s | Two premises | Two premises: seek smaller customer problems before choosing solutions. A plan is an attempt, not a guarantee. |
| 28.63–40.17s | Goals · Value + feedback | Two goals. First: deliver value and feedback. One small story crosses the product. Now they know when the next train leaves. Their reaction changes the next step. Just enough, just in time to learn. |
| 40.17–49.13s | Goals · No waste, no damage | Second: change direction without waste or damage. Keep completed value; leave later stories unstarted. Nothing half-built to abandon. Nothing broken to repair. |
| 49.13–58.73s | Principles · Three Vs / One-piece flow | Four principles. Three Vs: valuable to customers, visible in their world, vertical through the product. One-piece flow: finish one customer outcome together. |
| 58.73–63.37s | Principles · Same reasoning at every scale | Repeat at smaller scales: stories, scenarios, implementation slices. |
| 63.37–73.37s | Principles · Same reasoning at every scale | Every commit is your last commit. Strive for useful value now; serve today's purpose or an already documented need, including product health, not merely prepare the next commit. |
| 73.37–85.73s | Principles · Whole product focus | Care for the whole product. Assimilate each splash into a coherent design. Customer value now; speculative future potential at a cost: option value. Unused features can add complexity and close alternatives. |
| 85.73–91.57s | Choose again | Smaller problems. Useful impacts. Freedom to choose again. |

## Production

Run `python3 'Problem Decomposition/produce_audio.py'` from the repository checkout.
The source is `film-script.json`. One continuous Cedar take retains natural breaths and pauses.
Its 230 spoken words keep just in time inside the goals and option value secondary and speculative.
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
