# AI Test Automation — The Legacy Workshop

A warm, tactile cartoon workshop turns software upkeep into visible physical work.
English; 1080 × 1350 (4:5); 30 fps. Cream paper, ink outlines, coral engineer,
mint AI companion and a modular sky-blue legacy product preserve Story Impact’s visual family.

Runtime: **69.53 seconds**. The 169-word narration is
OpenAI’s Cedar synthetic voice; it is not a recording or imitation of Terry.
The confirmed article remains the idea’s authoritative source. This film distils its argument
for large legacy systems where tickets arrive faster than the team can close them.

The film follows one engineer and one eager AI helper through a connected causal story:
a tempting promise of more tests, a plausible diagnosis, and the conflict when added code
creates upkeep before protection. High-level software engineering must preserve original intent;
useful targeted tests can still help while the queue is overloaded.
The alternative is stated first: AI performs hands-on testing. An isolated repeatable environment
must be easy to set up. The AI repeats demonstrated manual checks; humans investigate, confirm and fix
without adding test code to maintain. When control returns, useful checks become ordinary repeatable
test code that needs no AI to execute. New features express intent in tests first and let those tests
drive development. The suite keeps evolving: faster feedback, fewer redundant tests, suitable local
checks moved to units, with essential end-to-end protection retained. Spare AI simplifies and fixes.
The closing is: **Less to carry. Fewer bugs to chase.**

| Time | Scene | Spoken narration |
| --- | --- | --- |
| 0.00–4.30s | The tempting shortcut | Ask AI to write more tests? You probably don’t want to do that. |
| 4.30–12.07s | A plausible diagnosis | In a large legacy system, tickets arrive faster than your team can close them. “Not enough automated tests!” You’re probably right. |
| 12.07–27.47s | The hidden maintenance conflict | But AI can pile on code before it provides protection. More complexity. More upkeep. A harder queue to clear. Test automation requires high-level software engineering—and must protect the original intent. Targeted tests can still help now. |
| 27.47–38.47s | AI performs hands-on testing | A better use of AI here? Hands-on testing. First, make an isolated, repeatable environment easy to set up. Show AI your manual checks; let it repeat them. |
| 38.47–43.07s | Confirm, fix, keep code manageable | Investigate, confirm, fix— without adding test code to maintain. |
| 43.07–53.90s | Turn proven checks into test code | Once you regain control, turn useful checks into repeatable test code: no AI needed to run it. For new features, express your intent in tests first. Let them drive development. |
| 53.90–62.43s | Keep simplifying the suite | Keep improving the suite: faster feedback, fewer redundant tests, suitable local checks moved to units. Keep essential end-to-end protection. |
| 62.43–69.53s | Less to carry. Fewer bugs to chase. | Use spare AI to simplify and fix. Less to carry. Fewer bugs to chase. |

## Audio and captions

Run `python3 'AI Test Automation/produce_audio.py'` to reproduce the saved narration, original score and effects,
and final stereo mix. Use `--narration-only` when reviewing the voice in isolation; the composition prop
`narrationOnly: true` plays that stem. Normal playback uses the finished mix once at volume 1.
One continuous take retains its natural internal breaths and pauses; only leading and trailing
silence is trimmed. There is no time stretching, playback-rate change or chopped-clause assembly.
The opening question begins after an 80 ms audio lead. The ending has approximately two seconds of breathing room.
Every caption owns its exact spoken clause, shorter displayed text, measured speech bounds and word cues.
Caption changes use frame-aligned midpoints in the natural gaps; scene boundaries follow those captions.
The SRT contains the full spoken words, including every qualifying condition.

The saved `cedar-take.wav`, its SHA-256 and exact-script audit in `cedar-performance.json`, and
Whisper word estimates reproduce narration and timing without another paid API request.
The transcript and word boundaries come from Whisper measuring the actual chosen audio.
Script-free transcription of the complete actual narration audits the spoken words and measures word timing.
They are automated evidence, not a substitute for listening review.
Use `--new-take` only to request a new connected Cedar performance and fresh Whisper alignment.
This requires the OpenAI Python SDK and `OPENAI_API_KEY`. The key is never written to source or logs.
Use `--refresh-docs` to update this treatment from the measured script without regenerating audio.
Narration is mastered to −18 LUFS using measured two-pass normalization. Playback and rendering need no API.

The original chamber score follows the measured scene boundaries: hopeful F major, the D-minor upkeep
conflict, B-flat practical action, C-major progress, then an open F-major resolution. Sparse felt notes
sit in measured speech gaps. The opening question and reply have no music bed. The quiet score ducks
to actual narration activity; sparse paper and wood accents mark visible actions. Both characters use
the same checking sound for the same demonstrated action. There is no decorative beeping or stock music.
Narration and final mix target −18 LUFS; score and effects target −40 and −39 LUFS respectively.
The deterministic producer retains separate narration, score and effects stems; all span the film's full duration.
Ignored `terry-moves/out/ai-test-automation-audio/` holds actual mix analysis, cue timings and rejected-take evidence.
Signal analysis and transcription support review; they do not claim human audition.
