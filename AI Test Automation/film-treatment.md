# AI Test Automation — The Legacy Workshop

A warm, tactile cartoon workshop turns software upkeep into visible physical work.
English; 1080 × 1350 (4:5); 30 fps. Cream paper, ink outlines, coral engineer,
mint AI companion and a modular sky-blue legacy product preserve Story Impact’s visual family.

Runtime: **60.87 seconds**. The 143-word narration is
OpenAI’s Cedar synthetic voice; it is not a recording or imitation of Terry.
The confirmed article remains the idea’s authoritative source. This film distils its argument
for large legacy projects whose maintenance problems arrive faster than the team can solve them.

The film follows one engineer and one eager AI helper through a connected causal story:
a tempting code spool, the accumulating maintenance queue, useful early protection,
an isolated repeatable environment, finding confirmation and repair, selective automation,
then faster feedback with fewer redundant checks and the wider protection retained.
Useful targeted tests are visibly welcome early. AI observations are investigated before repair.
The product is healthier at the end, with some work still arriving; the story promises control
and better choices rather than a magically defect-free system.

| Time | Scene | Spoken narration |
| --- | --- | --- |
| 0.00–4.10s | A tempting shortcut | You probably don’t want to do that. Ask AI to write more tests? |
| 4.10–13.63s | Maintenance overload | In a large legacy project, where maintenance problems arrive faster than your team can solve them, that can mean more code to understand, run, and maintain. |
| 13.63–24.60s | Protection has an upkeep | Useful, targeted tests can make fixes safer—even now. But generating a pile can add to your overload. Reliable test automation requires high-level software engineering. |
| 24.60–32.77s | Learn in isolation | Start with an isolated, repeatable test environment. Learn the checks yourself. Then let AI perform hands-on testing. |
| 32.77–38.17s | Investigate, then fix | Investigate its findings and fix confirmed problems—without generating a maintained suite. |
| 38.17–42.70s | Automate what proves useful | As you regain control, automate the workflows that repeatedly prove useful. |
| 42.70–54.63s | Improve the protection | Then improve the suite: make feedback faster, delete redundant tests, and move suitable local checks from expensive end-to-end tests into unit tests. Keep the wider protection you still need. |
| 54.63–60.87s | Better protection, less upkeep | Spend your spare AI capacity on better protection, with less to maintain. |

## Audio and captions

Run `python3 'AI Test Automation/produce_audio.py'` to rebuild the saved performance and complete mix.
One continuous take retains its natural internal breaths and pauses; only leading and trailing
silence is trimmed. There is no time stretching, playback-rate change or chopped-clause assembly.
The hook begins after an 80 ms audio lead. The ending has approximately two seconds of breathing room.
Every caption owns its exact spoken clause, shorter displayed text, measured speech bounds and word cues.
Caption changes use frame-aligned midpoints in the natural gaps; scene boundaries follow those captions.
The SRT contains the full spoken words, including every qualifying condition.

The saved `cedar-take.wav`, its SHA-256 and exact-script audit in `cedar-performance.json`, and
Whisper word estimates reproduce narration and timing without another paid API request.
The transcript and word boundaries come from Whisper measuring the actual chosen audio.
They are automated evidence, not a substitute for listening review.
Use `--new-take` only to request a new connected Cedar performance and fresh Whisper alignment.
This requires the OpenAI Python SDK and `OPENAI_API_KEY`. The key is never written to source or logs.
Use `--refresh-docs` to update this treatment from the measured script without regenerating audio.
Narration is mastered to −18 LUFS using measured two-pass normalization. Playback and rendering need no API.

The original workshop score uses warm open F-major harmony and sparse felt-mallet notes.
It enters after the opening question at 4.1 seconds, gently ducks around actual speech activity,
and resolves into the final breathing room. It is composed and synthesized locally, without sampled music.
Soft paper movements and wooden ticks mark the stop, accumulating tickets, reset, demonstrated and AI checks,
investigation, confirmed repair, selected automation, duplicate deletion and fast local feedback.
The score is mastered to −40 LUFS and accents to −39 LUFS; the stereo mix targets −18 LUFS with a −1.5 dBTP ceiling.
The composition plays only `assets/ai-test-automation/mix.wav` at volume 1; no separate layers are added.
Python with NumPy and ffmpeg reproduces the three 48 kHz PCM layers and final mix deterministically.
Ignored `terry-moves/out/ai-test-automation-audio/` holds mastering, cue and signal-analysis evidence.
The actual final mixed WAV is independently transcribed without supplying the script as a prompt.
Signal analysis and transcription support the review; they do not claim human audition.
