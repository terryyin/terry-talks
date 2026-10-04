---
id: ai-test-automation-film
status: proposed
created: 2026-10-04
scope: one queued short-film story; creative direction and production planning remain open
---

# AI and test automation: reduce complexity before adding more code

## Selected film story

<a id="testing-without-unmanageable-complexity"></a>
### Viewers use AI for testing without adding unmanageable complexity

**Identity:** ai-test-automation-film#testing-without-unmanageable-complexity

#### Goal and audience

For **people working in large software organizations with complex legacy
systems**, make an engaging short film in **Terry Moves** (`terry-moves/`)
that challenges the instinct to ask AI to generate automated tests. Viewers
have some understanding of software technology and the development lifecycle;
deep technical expertise is not assumed.

After watching, a viewer can explain why automatically generating test code
may be the wrong first move when a team already cannot manage its system's
complexity, and describe a more useful sequence: AI performs testing, the team
fixes problems and reduces complexity, useful repeated checks become selected
automated tests, and the suite is continually simplified and accelerated.

Terry evaluates whether the film expresses his argument and catches attention.
Audience comprehension is evaluated by whether a viewer can explain the
condition behind the opening and the recommended sequence.

#### Production brief from Terry

- **Opening hook:** “You probably don't want to do that.” Put this at the
  beginning and connect it immediately to asking AI to write automated tests.
  The surprising answer should create curiosity and earn its explanation.
- **Length:** between **one and two minutes** (60–120 seconds), aiming for
  **about one and a half minutes** (90 seconds).
- **Tone:** interesting and engaging, with enough technical substance for the
  intended audience. This is an attention-grabbing explanation, not a long
  tutorial.
- **Style is open:** a style similar to the recent **Story Impact** or
  **Problem Decomposition** films is welcome. A new genre or visual style is
  also welcome if it serves this more technical subject better. The earlier
  films are references, not a requirement to copy their format or metaphor.
- **Medium:** a new short film authored with Terry Moves, the repository's
  in-tree Remotion workspace.
- **Source:** the complete [supplied transcript](source-transcript.md).
  Compress its spoken repetitions into a concise film while preserving the
  argument. Transcription slips such as “menu test,” “books,” and “unit has”
  mean manual testing, bugs, and unit tests in the brief below; the original
  wording remains available in the source.
- **Priority:** Terry explicitly requested this as the **first queued item**
  in the product backlog. This aligns with the existing direction, “Make
  educational short videos.”

#### The complete argument to preserve

1. **The surprising answer is conditional.** “Should you ask AI to write
   automated tests for you?” The right answer might not be yes. Automated
   tests, including unit and end-to-end tests, can protect things that matter
   and enable the team to do more. Their value must actually be delivered.
2. **A test is code before it delivers value.** It must run, be understood,
   and be maintained. It can break. It adds cognitive load and complexity to
   the system immediately, even when its promised protection has not yet
   materialized.
3. **Recognize the overloaded legacy system.** The team's complexity is
   already beyond what it can handle: people cannot attend to defects fast
   enough, and the bug-fixing backlog grows faster than developers can fix
   it. Adding more test code in that situation can be “adding fuel to the
   fire.” This condition is the reason behind the hook.
4. **AI's efficiency does not erase the maintenance burden.** AI is an
   obedient, efficient tool. Ask it for automated tests, and one immediate
   result is more code for the team to maintain. Useful protection is a
   separate outcome.
5. **First establish a place where testing works.** Provide a stable,
   repeatable testing environment, isolated from other people's work, where
   testing and changing state do not disrupt them. Make sure manual testing
   is possible there. Do it, learn how, and confirm that the relevant checks
   can actually be performed.
6. **Then spend spare AI tokens on performing testing.** Ask AI to carry out
   those manual-style checks, find bugs, and identify places that need
   improvement. The team fixes what it finds. Terry corrects himself in the
   transcript: the recommendation here is to **perform manual testing**, not
   to run an existing automated suite or generate a new one.
7. **Separate executing checks from adding a maintained suite.** AI can do
   repeated testing work in the background without adding test code to the
   repository. That work can reveal improvements without itself increasing
   the system's maintained-code burden. “Manual testing” describes the kind
   of activity; AI performing it does not turn it into a repository of
   automated tests. The isolated environment makes this repeated work
   practical.
8. **Testing is part of a wider improvement effort.** Bug discovery alone
   is not enough. Combine it with fixes and other efforts to gradually bring
   defects and complexity down to a level the team can handle.
9. **Automate selectively when the team is ready.** Accumulated experience
   from repeated checks, including checks AI can perform, gives the team a
   basis for gradually turning useful ones into automated end-to-end tests.
   Keep only the useful ones and take on maintenance the team can now manage.
10. **Test automation is a programming problem.** Terry's framing is that
    it is one of the hardest areas of programming, rather than merely a
    testing task. Building it requires care. Its difficulty is another
    reason to avoid piling it onto an already overwhelmed system.
11. **Spare tokens are not a reason to make more things.** Do not generate
    more features or more tests merely because AI capacity is available.
    Once useful automation exists, use AI to optimize tests and make them
    run as fast as possible.
12. **Use experience to remove waste aggressively.** Running the end-to-end
    suite teaches the team and AI where checks are redundant and resources
    are wasted. Delete tests that do not earn their upkeep. Replace some
    expensive, overlapping end-to-end checks with suitable fast unit tests
    where they can provide the needed protection.
13. **The payoff is a more manageable system and a useful, fast suite.**
    The recommendation is an order of work: learn through testing, fix and
    simplify, automate valuable checks, then optimize and prune. Use AI to
    reduce the burden rather than treating the volume of generated code as
    progress.

#### Key examples and review criteria

- **Opening and payoff:** “You probably don't want to do that” is heard or
  seen at the start, with asking AI to write automated tests as its clear
  referent. By the end, the viewer understands the overload condition and
  when selective automation becomes useful.
- **An overloaded team:** a growing defect backlog and limited capacity make
  the maintenance cost concrete. Tests' potential benefits and their
  immediate code burden both appear in the argument.
- **A useful alternative:** a repeatable, isolated environment → confirm
  manual checks are doable → AI performs them → find and fix bugs. The
  viewer can distinguish this from asking AI to commit a test suite.
- **A path to automation:** combine fixes with complexity reduction; keep
  useful repeated checks; gradually automate them as end-to-end tests when
  manageable. The film retains the point that automation is difficult
  programming work.
- **A disciplined finish:** optimize speed, aggressively delete unnecessary
  tests, and move suitable expensive checks to fast unit tests. Having spare
  tokens alone does not justify more tests or features.
- **Pace and accessibility:** the finished film runs 60–120 seconds, aims
  near 90, and gives this audience enough time to follow its words and
  visuals. The whole argument is preserved here even if narration and
  visuals divide the explanation between them.

#### Creative choices still open

Choose the final title, visual metaphor, genre, aspect ratio, narration,
sound/music, and subtitle treatment during film refinement. The supplied
English transcript is the starting language; additional language versions
have not been requested. The two-minute ceiling and attention-grabbing
opening are confirmed; the precise cut and wording beyond the hook are open.

Possible reference directions, without selecting one:

- **Story Impact:** warm paper, rounded ink outlines, bright colors, playful
  motion, and a visual model whose changing state carries the explanation.
- **Problem Decomposition:** a concrete customer situation and expressive
  motion that carries technical principles through a continuous example.
- **A new technical genre:** an alternative that makes legacy-system
  complexity, temporary testing work, and maintained test code easy to
  distinguish while retaining interest and a clear narrative.

#### References

- [Original source transcript](source-transcript.md)
- [Story Impact intention and film context](../Story%20Driven/seed.md)
- [Story Impact film](../terry-moves/src/stories/StoryImpactFilm.tsx)
- [Problem Decomposition article](../Problem%20Decomposition/problem-decomposition.md)
- [Problem Decomposition film script](../Problem%20Decomposition/film-script.json)
- [Problem Decomposition film](../terry-moves/src/stories/ProblemDecompositionFilm.tsx)
- [Terry Moves authoring and rendering](../terry-moves/README.md)
