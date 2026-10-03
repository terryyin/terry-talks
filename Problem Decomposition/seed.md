---
id: problem-decomposition-film
status: proposed-decomposition
created: 2026-10-03
created_during: Terry requested a new first-priority short film, part two of Story Impact
trigger_when: Next educational short video; explicitly placed first by Terry
scope: one captured story; effort unassigned pending refinement
---

# Problem decomposition: part two of Story Impact

## Parent problem and desired effect

For **software developers and product people**, problem decomposition is easily
confused with structuring a proposed solution. Terry wants an approximately
**two-minute short film** that explains how to keep splitting external,
user-centric problems, deliver value and learn, and retain the ability to stop
or change direction cheaply. It is **part two of the Story Impact film**, in
the same style.

This seed captures the request. The complete spoken draft is preserved in
[raw-content.md](raw-content.md); it must survive later polishing and shortening.
[Source notes](source-notes.md) capture the related film, nearby Open Dough ADRs,
TPS and AI claims, and questions those inputs raise. These are temporary
authoring inputs to retain until their information has been assimilated; do not
discard them merely because the two-minute script omits some detail.

## Story

<a id="explain-problem-decomposition"></a>
### Viewers understand problem decomposition through a two-minute follow-up to Story Impact
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **Identity:** problem-decomposition-film#explain-problem-decomposition
- **For / why:** Developers and product people need to distinguish breaking
  down a customer problem from organizing a solution, and understand why
  small, independently valuable outcomes make feedback and redirection useful.
- **Outcome:** A short film of about two minutes, recognizable as part two of
  Story Impact, expresses Terry's problem-decomposition philosophy with a
  coherent visual explanation. The complete source material remains available
  while the presentation is polished.
- **Evaluation:** Terry judges fidelity to his intention and continuity of
  style. Representative viewers should be able to explain the distinction,
  the two optimization goals, and why finishing a useful piece before changing
  direction avoids leaving value dependent on unfinished work. Viewer evidence
  is to be gathered later; none is claimed at capture.
- **Value / learning:** A reusable explanation of how customer-value planning
  and whole-product engineering work together. The key learning question is
  whether these ideas can be understood in roughly two minutes without making
  solution structure the decomposition model.
- **Constraints:** Preserve every part of the supplied draft as raw input;
  polish later. Draw further input from nearby Open Dough ADRs and the TPS and
  AI claims. Match the existing Story Impact style. Include just-in-time
  thinking; naming TPS is optional, not required.
- **Dependencies:** No prerequisite story identified. The existing Story
  Impact film is the style reference; its queued voice-over story does not
  block this story (the current film already contains narration).
- **Safe stopping point:** The finished film explains a useful idea on its
  own; it must not depend on an unmade later episode for its message.
- **Effort hypothesis:** Unassigned. Script compression and terminology need
  refinement before estimating or planning implementation.

## Content to retain through polishing

The full draft, including repetition and uncertain wording, is authoritative
as raw input. This inventory helps later editing retain its intentions; it is
not a replacement transcript or an approved script.

1. **Purpose and distinction.** Decomposition is foundational to the
   development lifecycle. External problem decomposition derives a plan for
   attempting to solve a big problem one smaller problem at a time. Solution
   decomposition organizes an already conceived solution for understanding and
   maintenance. Engineers often begin with problems, then slip into speculative
   solution-based subdivision.
2. **Two premises.** A broad user problem can be split recursively into
   narrower user problems and scenarios without opening the solution box.
   Problem solving has no process or plan that guarantees success; a plan is an
   attempt, typically incomplete, with fuzzy boundaries.
3. **First optimization goal: value and feedback.** Each unit independently
   delivers value and enables feedback on delivered value. External customer
   value is the benefit to the paying customer/user and the reality check that
   the product is useful. Option value is the speculative potential to obtain
   likely, valuable future behavior cheaply, without implementing it now.
   Choosing an implementation can close alternatives; option value is harder
   to evaluate than external value.
4. **Second optimization goal: cheap stopping and redirection.** At a completed
   unit boundary, effort already spent has materialized as delivered value and
   feedback. Its value does not wait for integration with future units.
   Unstarted units can be abandoned without wasted preparation, undelivered
   promises, damage to either value, or cleanup just to make stopping safe.
   Feedback may change the plan; that learning only helps if acting on it is
   affordable. Preserve zero extra cost as the draft's aspiration and refine
   the practical wording later.
5. **Vertical slicing / 3 Vs.** User-value units usually cut across the
   necessary technology layers, rather than following components of the
   existing solution. Use Valuable, Visible, Vertical as source input, with
   exact provenance clarified in the source notes.
6. **One at a time / one-piece flow.** Complete useful work, limit unfinished
   parallel starts, and reduce switching cost. Multiple teams work toward
   shared larger goals; integration is their direct communication and
   collaboration responsibility, rather than an excuse to split the plan by
   internal structures. Reconcile this wording with Claim 17's flow definition.
7. **Fractal decomposition.** Apply the same value and stopping-point logic
   from large customer problems to narrower stories/scenarios, then engineering
   actions and small commits (the draft proposes every five to ten minutes).
   Do current-purpose work, avoiding units whose only value is speculative
   future preparation. How commit-sized work embodies value needs polishing.
8. **Whole-product focus.** Plans do not map directly to solution structure.
   Engineers may change any required part and must maintain the whole system's
   coherence, health, and direct domain mapping. Narrow requirement scope
   bounds cognitive load even when changes cross components. Good internal
   design grows organically, increasing option value rather than debt.
9. **Terminology.** Decide whether the higher units are called stories and
   lower units slices or leaves; the draft intentionally avoids committing to
   "stories" throughout. Keep the two premises, two goals, and principles
   distinct.
10. **Just in time.** Deliver user value when needed, and do not produce more
    than can usefully receive feedback. Developers respond resourcefully using
    what is at hand. Cheap stopping avoids continuing in a direction already
    shown to be wrong. Connect both optimization goals to this spirit even if
    the film never names TPS.

## Style reference

Use the current [Story Impact film](../terry-moves/src/stories/StoryImpactFilm.tsx)
and its [original intention](../Story%20Driven/seed.md) as references: playful
cartoon motion, colorful story balls, a tidy product, a square frame, legible
captions, and the visual language of customer value and option value. Its
current implementation has Terry's English narration and a Traditional Chinese
version. Language, narration, and subtitle scope for this new film remain to
be decided; do not infer two-language production from style continuity alone.

## Questions for later refinement

- How should the complete raw material be condensed into about two minutes
  while keeping its intended argument? Capture alone chooses no final script,
  scene sequence, or omissions.
- Confirm "OpenDOE" means the nearby **Open Dough** project. That is the
  working interpretation supported by its ADRs and the previous film's notes.
- Find the exact ADR Terry recalls for the 3 Vs. They are verified in Open
  Dough's decomposition reference, but not found in its current ADR store.
- Reconcile strict "one at a time" with the claims' allowance for parallel
  flows across teams; distinguish a useful WIP policy from a flow definition.
- Preserve two optimization goals: the draft's final "3rd goal" and "GPS"
  references appear to be spoken slips, but have not been silently corrected
  in the transcript.
- Polish option value without implying that building a useful current feature
  always destroys it, and "no waste / zero cost" without implying actual
  development or learning has no cost. Distinguish unstarted future work from
  necessary current design and cohesive shared implementation.
- Decide stories / slices / leaves, the film's language and audio, and whether
  to name TPS. The five-to-ten-minute commit claim needs an intelligible example
  or qualification rather than an assumed release promise.

## Capture boundary

Terry authorized capturing this story first in the backlog, preserving the
inputs, and committing and syncing the capture on the default branch. Film
production, script polishing, executable slice planning, and external film
publication are later work.
