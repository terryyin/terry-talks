# ATDD — Work through one scenario

Content foundation for a revised short film adapted from Terry Yin's 28:52
Chinese workshop. Terry's two whiteboard diagrams and his evolving presentation
now organize the film. The first cut's dinner-bill illustration is removed;
its exported video remains available as the earlier cut.

The [diagram analysis](diagram-analysis.md) maps the literal shapes, changing
colors, gestures and collaboration to exact source frames. The full automatic
[transcript](source-transcript.md) preserves every timestamped source utterance
verbatim in linked topic sections; source provenance remains unchanged.
[film-script.json](film-script.json) contains 407 spoken English words in 14
scenes. The continuous narrated performance is measured at **149.03 seconds
(2:29)**, including the cover and closing hold: 4471 frames at 30 fps. Captions
follow measured word spans; raw audio/transcription evidence is retained.

## The message Terry is delivering

**A solution's dependency tree need not dictate its construction order. Choose
one small, meaningful user scenario, develop its executable evidence in small
steps, and let that feedback guide both implementation and collaboration.
Finish its whole result and required cleanup before taking the next.**

The opening blue tree shows the familiar temptation to build imagined lower
parts before integrating upward. Terry's red upward arrow makes that assumption
explicit. The problem is incomplete knowledge: some planned pieces may be
unnecessary, and required pieces may be missing. His green overlay changes the
starting point to a narrow end-to-end scenario at the user-result boundary.
Implementation grows to satisfy it. Useful tests can later enter at a relatively
high internal boundary and cover several lower pieces together.

The second diagram makes the process concrete. A sprint item becomes several
small Given / When / Then scenarios, each meaningful on its own. Take one sheet
from the waiting column. As Terry draws broad arrows clockwise, he shows
successive snapshots of that **same acceptance test**. Automate an existing
first step, actually run it, see it pass, and preserve the evidence. Add the
missing selection step, run it, and see the real failure. A temporary dropdown
can make that step pass sooner; proper implementation immediately is also an
option. The remaining outcome still lies ahead.

Update exposes relevant implementation work. The team follows that need into
smaller unit/integration test loops: red, green, refactor. They protect existing
behavior in the area being touched. The local loop returns to the outer
acceptance automation, and earlier steps pass. Then the actual displayed-result
assertion is added and run: **the result still fails**. The green action prefix
is useful progress, not completion.

Five people have stayed together around the shared scenario. With the next work
understood, three can develop the returned-result behavior with local tests
while two finish its acceptance automation. The diagram grows two brief lower
paths and a second little cycle. Both paths converge; everyone reunites around
the integrated complete acceptance result. Terry describes repeated splitting
and reunion for parallel exploration, rather than permanent component ownership
or a later testing handoff.

Done includes needed implementation, cleanup and deliberate domain cohesion.
Domain concepts need attention from the beginning, not only during final
cleanup. Temporary shortcuts are replaced as required under the existing
feedback. Only after finishing that one scenario does the next waiting sheet
enter.

The late Q&A offers a more advanced ordering: make the real Then observation
first, then develop Given / When by gradually replacing fakes. This refinement
remains explicitly late in the film; it does not displace the original main
walkthrough. AI can help throughout within the current scenario and relevant
protective checks, with scope expanded deliberately.

## Source order and adaptation

| Source time | Presented content | Film treatment |
| --- | --- | --- |
| 00:17–01:55 | Solution hierarchy; bottom-up integration; mistaken assumptions. | Recreate blue tree and upward red arrow before the green alternative. |
| 02:03–03:07 | One narrow end-to-end test; optional fake; growing lower structure; relatively high internal testing. | Keep the same tree and both green test probes. |
| 03:16–04:39 | Sprint item split into meaningful GWT scenarios; source setting/override/result example. | Recreate the tall waiting-sheet column. Example becomes small annotation, with uncertain names omitted. |
| 04:44–06:41 | Take one; automate existing Given; run, observe, preserve evidence despite unfinished later work. | First broad sheet-arrow has a green prefix and explicitly unfinished remainder. |
| 06:48–08:04 | Selection is missing; actual attempted click fails. | Next clockwise snapshot retains earlier green and adds an observed red step. |
| 08:14–10:04 | Optional hardcoded dropdown; rerun and pass; result is still ahead. | Temporary label remains beside implementation, without a done seal. |
| 10:09–12:42 | Update; hypothesized failure; relevant endpoint/logic work. | Narration retains **if**, since Terry notes the actual system may not expose that error. |
| 12:47–14:36 | Relevant local test, red/green/refactor; repeated detail checks; outer rerun passes first three steps. | Small cycle connects back to the same acceptance sheet. Existing-behavior protection from 20:53–21:33 is placed here where it applies. |
| 14:42–15:04 | Add the final displayed-result assertion; it fails. | Green action rows and red Then remain visible together. |
| 15:07–16:02 | Five together; divide implementation and unfinished acceptance automation once direction is clear. | Five avatars split into three and two; both lower paths progress at once. |
| 16:04–16:42 | Combine, pass all steps; repeated brief split/rejoin. | Five avatars reunite at the complete acceptance result. |
| 16:44–20:15 | Finish all required work and cleanup, then next scenario; cohesion matters from the beginning. | Cohesion is part of done. Cleanup happens before the next sheet is taken. |
| 23:19–24:16 | Replace temporary dropdown under the same passing acceptance feedback. | Small needed-shortcut cleanup, not an invented next customer story. |
| 25:05–25:52 | More advanced Then-first ordering with temporary earlier fakes. | Separate late refinement after the original circle explanation. |
| 26:47–27:16 | Upfront thought about domain concepts and avoiding duplication remains useful. | Deliberate cohesion, not architecture magically arising from tests. |
| 17:22–17:27; 27:27–28:09 | AI help in each detail; protected scope should bound work. | Closing annotation on the two reconstructed diagrams. |

## Distinctions that must remain visible

- The tree is a solution structure; the circle is a development process. They
  are related, but should remain recognizable as Terry's two separate diagrams.
- The waiting small sheets are different valuable scenarios. The large sheets
  moving clockwise are growing snapshots of one selected acceptance test.
- A written scenario, an unfinished automation step, an observed failure, a
  passing prefix and a complete acceptance pass are different states.
- The little local test cycles serve the outer scenario. A unit/integration pass
  does not establish its displayed result; the outer path is rerun.
- Collaboration changes when understanding changes. The two branches are brief
  simultaneous work on one scenario, followed by a visible reunion.
- Cohesion is deliberate conceptual work. Fakes and cleanup are dealt with as
  required to finish; tests do not guarantee all product behavior or good design.

The revised film retains the established Story Impact paper, ink, rounded type,
faces and restrained sound. Those production choices support the source's
diagrams. They do not move the example into the center of the argument.

English remains the established adaptation language; Cedar narration is
synthetic and credited, not a recording or imitation of Terry. Source workshop
imperatives about committing and pushing remain source content, not publishing
instructions to the film producer. This deliverable stays local for review.
