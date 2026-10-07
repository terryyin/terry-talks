# ATDD — the two diagrams Terry presents

This is the source map for the revised film. It comes from direct inspection of
the supplied recording's pictures alongside the full automatic
[transcript](source-transcript.md), rather than from the first film's bill
example. The original drawing sequence organizes the adaptation. Clearer labels,
spacing, animation and small explanatory annotations improve its presentation.

Source: `IMG_6988-compressed.mp4`, 28:52. The seven reference PNGs below were
extracted directly at the named timestamps. Their full frames retain surrounding
context; the unrelated writing on the right of the board is excluded from the
film. A 58-frame survey and a finer 15:02–16:22 gesture sequence were also visually
inspected. The timed transcript is automatic, so account names and old system
names are not reliable enough to reproduce as labels.

## Diagram one: the solution tree and the order of learning

The first drawing is a blue hierarchy on the left of the board. One application
box at the top forks into front-end and back-end boxes. These fork again into
several smaller boxes; the right side has further descendants. A large red
arrow beside the hierarchy points **upward**. In the opening explanation this is
the assumed construction order: implement the lower parts, then integrate them
into the higher solution. It is a dependency/solution tree, not a work-allocation
chart and not the backlog.

At 01:31–01:49 Terry points to individual lower pieces while explaining mistaken
assumptions: the finished feature may need one, omit another, and require an
unexpected piece. The red additions/check marks near the bottom are part of
that explanation. Do not turn them into a prescribed complete architecture.

At 02:03 he changes the direction of attention. Define one narrow end-to-end
scenario at the user-result boundary and implement enough to pass it. A fake can
initially be enough. As scenarios require more, lower structure grows. His green
overlay runs from the top through a narrow portion of the blue hierarchy. The
recreation should keep this relationship: **a small observed outcome pulls its
needed path through the structure**. It should not erase the tree and substitute
an unrelated example.

Terry's later film review clarifies this route: descend into front-end detail,
return to the front end, cross horizontally to the back end, and descend into
back-end detail. Animate that continuous traversal to show one user's scenario
crossing both layers. This explicit author clarification refines the recreated
green trace; the two test probes retain their separate meanings.

At 02:44–03:07 he adds a second test position inside the application. In the
03:05 frame he points at this internal position while saying that a relatively
high internal test can cover many things below. Preserve both green probes:
the first at the end-to-end boundary, the second at a useful internal boundary
with several descendants. His claim is not one unit test per leaf, nor that all
testing must remain end to end.

| Exact picture | What is visible | Spoken evidence |
| --- | --- | --- |
| [01:18 — solution tree](source-frames/01-18-solution-tree.png) | Blue hierarchy, two main branches, uneven deeper descendants, broad upward red arrow; no scenario-circle drawing yet. | 00:17–01:18 defines the structure and apparent bottom-up integration order. |
| [03:05 — two test probes](source-frames/03-05-test-probes.png) | The same hierarchy with green tracing and a green test mark at the top; another green probe beside a higher internal box. Terry points inside the tree. | 02:03–02:39 narrow scenario and growing structure; 02:44–03:07 internal testing at a useful height. |

Presentation labels such as **User result**, **Front end**, **Back end**,
**End-to-end test** and **Internal test** translate the explanation. Most of
those words are spoken rather than written legibly in the boxes. Retain the
blue tree, red upward arrow and green test overlays as the recognizable visual
grammar. Clean spacing can compress the ragged leaves while preserving their
branch relationships; do not pretend the source specifies a complete set of
components.

## Diagram two: one acceptance sheet develops around the circle

Terry next draws a tall blue column of small lined sheets immediately to the
right of the tree. At 03:16–03:29 he calls this a sprint item/backlog and splits
it into small Given / When / Then scenarios. The waiting sheets are independent
meaningful scenarios. **The repeated larger sheets around the circle are
successive states of the one selected scenario**, not more backlog items.

He takes a sheet out and moves clockwise. The blue outlines are broad arrows
with a lined sheet in the tail. Their positions trace an upper-left arrow toward
the upper-right, an upper-right arrow turning down, a right-side downward arrow,
a lower arrow pointing left, and upward arrows returning along the left side.
The circle appears incrementally; it is not initially a finished flowchart.
Small blue connectors, green/red line fills and saved-work marks accumulate
as he talks. A recognizable recreation should keep these large sheet-arrows,
the left-hand waiting column and the clockwise return.

The sheet content grows while the already checked prefix remains green. Red
has two contexts that need clearer labels in the film: unfinished/not-yet
automated work, and a newly automated step that was run and actually failed.
Do not claim the first partial sheet observed every later failure. A green
prefix also must not acquire a whole-scenario pass mark.

The source example is only the small text on these sheets: navigate existing
settings, select an override, press Update, observe the displayed result. This
abstracts uncertain account names and legacy implementation names while
retaining the scenario Terry actually uses. No money example is needed.

| Circle snapshot | The same sheet's state | What Terry does or says |
| --- | --- | --- |
| Take one sheet, 04:44–05:29 | Scenario written; automation incomplete. Existing navigation is the first automation work. | Takes one from the column and asks what to automate first. |
| [05:58 — Given passes](source-frames/05-58-given-pass.png) | First tail has a green prefix and unfinished red remainder. | 05:34–06:18: run the existing step, see it pass, retain the executable evidence. 06:28–06:41: a saved checkpoint is useful although the full scenario is unfinished. |
| [08:02 — selection fails](source-frames/08-02-selection-fail.png) | A second broad arrow is added clockwise; previous green prefix remains, the new step is red. | 06:54–07:28: attempted selection really fails because the UI is missing. 07:49–08:04: explicitly indicates what passed and what did not. |
| 08:36–10:04 — selection passes | Temporary dropdown makes the selection row green after a rerun; remaining work stays unfinished. | Hardcoding is an optional shortcut to reach the meaningful work sooner, not a required implementation method. |
| 10:19–11:20 — Update exposes work | A further right-side sheet adds Update and its missing implementation. | The source system's error behavior is uncertain, so Terry explicitly hypothesizes a failure. Film narration retains **if** rather than asserting the recording observed it. |
| 12:47–14:36 — implement and rerun | A small red / green / blue cycle appears below the right-side sheet. After relevant local work, the wider acceptance rerun passes its first three steps. | Terry asks for a relevant unit/integration test, failure, implementation, pass, then refactor; repeat only for relevant details. At 14:24–14:36 he returns to the outer acceptance automation. |
| [14:55 — Then still fails](source-frames/14-55-result-fail.png) | Lower sheet has the passing prefix and a red result section. | 14:44–14:55: add the result assertion, run it, discover the displayed result is wrong. Local green and earlier action green did not validate Then. |
| 15:18–16:02 — a brief fork | Two thin lower paths leave the now-understood work. One gets a second local red / green / blue loop; another grows the acceptance sheet. | One group implements returned-result behavior; the other finishes acceptance automation. These occur together. |
| 16:04–16:12 — reunion | The branches join into an upward return; completed green sheet appears on the left side of the circle. | Both sides combine, then all the automation passes. |
| [16:45 — full circle](source-frames/16-45-complete-circle.png) | Both local cycles, fork/return paths and final sheet-arrow are present. The original waiting column remains beside them. | 16:15–16:42 names repeated split/rejoin; 16:44–17:09 defines genuinely finished work including cleanup, then the next scenario. |
| [28:45 — unobstructed final board](source-frames/28-45-final-board.png) | Tree and probes, scenario column, full sheet-circle, two little cycles, later **Cohesion** heading and a separate small scope sketch. | Full recording context; scope explained at 27:27–28:09. |

## The collaboration moves with the work

The collaboration is a dynamic dependency of the circle, not an isolated
"teamwork" card at the end. In the 15:02–16:22 frame sequence Terry first points
at the lower, partly green sheet, gestures back toward the shared work, draws
the fork, adds the second little cycle around 15:32, develops the automation
sheet around 15:52–15:57, then brings it upward to the completed result around
16:07–16:12. His hands alternate between the two sides and then the reunion.

The narration supplies the people count: **five together** (15:07–15:14), then
one group on returned-result implementation (15:23–15:38) and **the other two**
on unfinished automation (15:42–16:02). Three plus two is the direct implication
of that five-person example. Animate five recognizable collaborators that remain
together while the next work is unclear. They move with the active scenario
sheet, split briefly into three doing implementation/local TDD and two finishing
acceptance automation, progress simultaneously, and visibly gather at the
integrated complete acceptance result.

The tiny blue dots and upward arrows above early sheets coincide with spoken
commit/push checkpoints (06:28, 07:36, 09:12). They are not reliable evidence of
little people. Their visual counterpart is a modest **saved evidence** mark;
the five people are a clear animation addition grounded in the spoken passage.
The source's commit/push words instruct workshop participants, not the film
producer to publish this repository.

At 16:18–16:42 Terry explicitly limits the split: uncertain direction keeps
people together; clarity allows parallel exploration; they return quickly.
This is not permanent front-end/back-end ownership, fixed separate test and
implementation teams, or a testing handoff after development. The branches
stay inside the same scenario and join before it is declared complete.

## Later refinements without rewriting the walkthrough

- **Cohesion:** the heading is added above the circle. At 18:12–20:15 Terry
  explains keeping conceptually related things together and avoiding duplicated
  domain logic. Show this as deliberate care within finishing, not a claim that
  tests automatically produce a coherent design. His scissors example and
  stored-procedure details can be omitted without losing that point.
- **Existing behavior:** 20:53–21:33 says to protect the existing behavior being
  touched before changing it. The short film places this advice beside the local
  implementation loop where it applies. It does not promise exhaustive legacy
  coverage or require testing every old feature first.
- **Replace a fake under existing feedback:** 23:19–24:16 returns to the dropdown.
  Its hardcoded contents can be replaced under the already passing end-to-end
  check; internal logic may need local tests. No second user scenario is required
  merely to perform that structural work.
- **Then first:** 25:05–25:52 is a late, advanced option. Make the real result
  observation first; fake earlier steps if useful and replace them gradually.
  It must not retrospectively replace the source's main Given → selection →
  Update → result walkthrough. The short film labels it as an advanced option.
- **AI and scope:** 17:22–17:27 allows AI help throughout; 27:27–28:09 bounds work
  by its protective checks. The later small scope sketch can be a closing
  annotation. It is not substituted for either of the two main diagrams.

## Literal reconstruction and editorial clarification

Preserve the topology, direction, accumulation of sheet states, paired local
cycles and fork/rejoin from the pictures. Translate the spoken concepts with
readable labels; retain the setting/update/result example as subordinate text.
Color meanings are also stated with check/cross/waiting symbols so they do not
depend on color alone. Five moving collaborators, run cursors, checkpoint labels
and fading waiting sheets clarify the dynamics; they are not claimed as literal
marks on the original board. Geometry and label wording can be cleaned up, but
the diagram must not become a generic three-station Run / Observe / Keep loop.

The film condenses explanation and Q&A into 407 spoken words. It omits attendee
names, uncertain implementation names, repeated questions, contextual delivery
time estimates and the prediction that AI reduces refactoring. These omissions
do not change the tree/circle argument. Actual narration now measures 149.03
seconds, with exact final spoken-text and timed-word audits. Rendered-motion
proof remains part of the consolidated revision; this source map alone does
not prove a finished film.

Terry’s later hand sketch keeps the parallel-work diamond inside the main
circle. The failed bottom sheet branches to a finishing Scenario A on the
left and front-end TDD on the right; both paths join the finished all-green
sheet above. Two people finish acceptance automation, three implement, and
all five reunite. The film and standalone board now share that persistent
layout, with true circular main arcs and separate first-local-TDD lanes.
