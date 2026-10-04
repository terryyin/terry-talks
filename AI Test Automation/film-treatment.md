# AI Test Automation — The Legacy Workshop

A warm, tactile cartoon workshop turns software upkeep into visible physical work.
English; 1080 × 1350 (4:5); 30 fps. Cream paper, ink outlines, coral engineer,
mint AI companion and a modular sky-blue legacy product preserve Story Impact’s visual family.

Runtime: **82.93 seconds**, including a 3-second silent author card.
The measured narration, captions and workshop remain **79.93 seconds**. The roughly 200-word narration is
OpenAI’s Cedar synthetic voice; it is not a recording or imitation of Terry.
The confirmed article remains the idea’s authoritative source. This film distils its argument
for large legacy systems where tickets arrive faster than the team can close them.
The shared Odd-e outer mark and FlipCoin inner animation appear in the upper-right corner throughout.
A distinct warm-paper closing page reads **An idea and film by Terry Yin** and retains the synthetic voice credit.

The film follows one engineer and one eager AI helper through a connected causal story:
a tempting promise of more tests and a plausible diagnosis. PURPOSE defines what the production
code should do; PROOF shows whether it does in the behavior checked. The article bounds this
proof to encoded expectations and observed examples, not a universal guarantee of no bugs.
Only then does the conflict reveal itself: tests are more code before they provide protection.
High-level software engineering must preserve original intent, and AI can pile on complexity.
A prominent STOP AND FIX interrupts the accumulation and makes repair the current work.
**Stop adding complexity. Get the system back under control.** is the explicit instruction.
This turning point follows Terry's Stop & Fix claim: contain the problem and regain control.
The alternative is stated first: AI performs hands-on testing. An isolated repeatable environment
must be easy to set up. Show AI manual checks; it performs similar tests to confirm fixes, explore
for bugs and check that known behavior still works. This is an imperfect compromise that gives
a system already in panic relief without piling on maintained test code. Environments, checking
and human judgment still have costs; there is no promise of perfect AI findings or coverage.
When control returns, useful checks become ordinary repeatable
test code that needs no AI to execute. New features express intent in tests first and let those tests
drive development. The suite keeps evolving: faster feedback, fewer redundant tests, suitable local
checks moved to units, with essential end-to-end protection retained. Spare AI simplifies and fixes.
The closing is: **Less to carry. Fewer bugs to chase.**

| Time | Scene | Spoken narration |
| --- | --- | --- |
| 0.00–4.10s | The tempting shortcut | Ask AI to write more tests? You probably don’t want to do that. |
| 4.10–11.97s | A plausible diagnosis | In a large legacy system, tickets arrive faster than your team can close them. “Not enough automated tests!” You’re probably right. |
| 11.97–16.60s | Purpose and proof | Tests define what your code should do: purpose. And show whether it does: proof. |
| 16.60–27.70s | Protection has an engineering cost | But first, they’re more code. Test automation requires high-level software engineering—and must preserve the original intent. AI can pile on complexity before providing protection. |
| 27.70–33.57s | Stop. And fix. | Stop. And fix. Stop adding complexity. Get the system back under control. |
| 33.57–43.17s | AI performs hands-on testing | A better use of AI here? Hands-on testing. First, an isolated, repeatable environment that’s easy to set up. Show AI your manual checks. |
| 43.17–55.70s | A compromise that creates room to repair | Have it perform similar tests: confirm fixes, explore for bugs, and check that known behavior still works. It’s a compromise. But a system already in panic needs relief— not more test code to maintain. |
| 55.70–65.67s | Regained control, intent-first development | Once you regain control, turn useful checks into test code. No AI needed to run it. For new features, express intent in tests first. Let them drive development. |
| 65.67–73.07s | Keep simplifying the suite | Then simplify. Delete redundant tests. Move suitable checks to fast unit tests. Keep essential end-to-end protection. |
| 73.07–79.93s | Less to carry. Fewer bugs to chase. | Use spare AI to simplify and fix. Less to carry. Fewer bugs to chase. |

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

The original chamber score follows the measured scene boundaries: hopeful F major, bright purpose/proof,
the D-minor upkeep conflict, a decisive stop and hush, B-flat practical action, C-major progress,
then an open F-major resolution. Sparse felt notes
sit in measured speech gaps. The opening question and reply have no music bed. The quiet score ducks
to actual narration activity; sparse paper and wood accents mark visible actions. A tactile stop
and the following quiet create emotional contrast. Checking sounds follow the observed controls
and causal repair states. There is no decorative beeping or stock music.
Narration and final mix target −18 LUFS; score and effects target −40 and −39 LUFS respectively.
The deterministic producer retains separate narration, score and effects stems; all span the measured workshop duration.
The appended author hold is silent; presentation timing leaves the saved performance and its captions unchanged.
Ignored `terry-moves/out/ai-test-automation-audio/` holds actual mix analysis, cue timings and rejected-take evidence.
Signal analysis and transcription support review; they do not claim human audition.
