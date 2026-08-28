# Judgment-intensive work and judgment-loaded output

Establish one vocabulary owner for the AI & TPS talk, then align the
claims and audience-visible deck with the corrected distinction:

- **Judgment-intensive work** is work in which live, context-sensitive
  intelligence is material to reaching the next valid action or acceptable
  result: understanding the situation, framing what matters, creating or
  adapting a response, weighing consequences, and deciding what counts as
  acceptable.
- Its short gloss is **work that still requires live judgment**. `Still`
  locates the work in the current learning/capability state; it does not make
  the work undesirable.
- Pulled product work and emergent Stop & Fix work use the same cognitive
  resource but play different flow roles. The former responds to a product
  need; the latter contains an abnormality and makes it current work.
- An artifact or system is **judgment-loaded** when its use still demands
  comparable live judgment. This can be appropriate. The failure is declaring
  it done while unowned or unverified, so later people must interpret, rank,
  and re-decide.
- Pair **smart -> dumb -> gone** with **judgment-loaded ->
  judgment-preserved -> judgment-removed**. Work consumes live judgment;
  artifacts and systems carry, preserve, or remove the later demand.
- A justified stop is productive: it halts multiplication or propagation of
  the abnormality while live judgment becomes the current work. Do not claim
  that Stop & Fix produces no output.

Claim 00 owns these names and semantic boundaries. Claim 6 continues to own
the jidoka mechanism and descent. Claim 19 continues to own the halt.

No Accepted ADR conflicts. ADR-0000 says talk-specific claims and content
belong with the talk rather than in a new ADR.

Delete this directory in the last slice's commit once every slice has landed.

## Slices

### 1. Claim 00 defines the vocabulary

- **Type:** Behavior
- **Status:** done
- **Do:** Add `TPS and AI/claims/00-judgment-intensive-work.md` as the
  terminology owner and add it before Claim 1 in `TPS and AI/README.md`.
  Use the explicit display identity **Claim 00** requested by the owner.
  Define the valuable planned and emergent cases, judgment-loaded output,
  the paired triads, the actor-neutral cognitive definition, and the still-open
  audience question about whether `judgment` naturally communicates this
  broad meaning of high-level intelligence.
- **Done when:** The claim can be read independently, distinguishes cognitive
  kind from flow role and artifact state, links ownership to Claims 6 and 19,
  and the claims index links it.

Learning: keeping `still` in the short gloss works once Claim 00 explicitly
states that it locates current learning/capability and does not assign negative
valence. Claim 00 uses the requested visible identity rather than inheriting
the unpadded display convention of later claims.

### 2. Core claims distinguish valuable work from deferred judgment

- **Type:** Behavior
- **Status:** done
- **Do:** Align Claims 4, 6, 19, and 22 plus the companion CLD with Claim 00.
  Neutralize Claim 6's “Smart is a burden,” add positive planned and emergent
  smart examples, replace `judgment-dependent` artifact/mechanism phrasing,
  and state that human-triggered jidoka spends judgment to contain flow before
  more output inherits the abnormality. Preserve each claim's existing
  ownership boundary and the CLD topology.
- **Done when:** Core claims use `judgment-intensive` for work,
  `judgment-loaded` for artifacts/systems, and the same live judgment is shown
  in different flow roles without treating all judgment as waste.

Learning: the CLD topology already carried the right distinction between
adaptive attention and judgment-stacked inventory. Only the variable
definitions and prose needed correction. Claim 19 now names human-triggered
jidoka and treats the stop as containment; the following diagnosis, repair,
and learning remain judgment-intensive work.

### 3. Talk framing uses the vocabulary consistently

- **Type:** Behavior
- **Status:** done
- **Do:** Update `TPS and AI/main-theme-and-stage-setting.md` and
  `TPS and AI/open-questions.md`. Replace the old constrained-work framing
  with unowned judgment-loaded output/inventory, cite Claim 00 as terminology
  owner, pair both triads, and retain only the genuinely open question about
  whether `judgment` conveys the intended contextual/creative/evaluative
  intelligence.
- **Done when:** A planning reader sees the same neutral account of live
  judgment and the same negative account of deferred/repeated judgment as in
  the core claims.

Learning: the settled stacking question no longer belongs in the open-question
queue. The remaining uncertainty is audience comprehension of `judgment` as
the deliberately broad local shorthand for contextual, creative, and
evaluative intelligence. Individual artifacts are judgment-loaded output;
their accumulation is judgment-stacked inventory.

### 4. Slides introduce live judgment and the paired triads

- **Type:** Behavior
- **Status:** planned
- **Do:** In `slides/tps-and-ai/slides.md`, add an early terminology slide
  after the opening diagnostic. Use “Judgment-intensive work” and “work that
  still requires live judgment,” distinguish pulled product work from
  emergent Stop & Fix, and locate the failure in judgment-loaded output. Align
  the constrained-output beat, the generated-output question, and the
  Smart/Dumb/Gone slide. Pair every rung directly with judgment-loaded,
  judgment-preserved, and judgment-removed.
- **Done when:** The new opening makes the user's emotional-valence
  distinction explicit, later artifact wording no longer calls outputs or
  solutions judgment-intensive, and the deck builds without overflow in the
  changed slides.

### 5. Slides show why a justified stop is productive

- **Type:** Behavior
- **Status:** planned
- **Do:** Retitle/reframe the andon-cord slide around emergent
  judgment-intensive work. On the slowing-down slide, add the concise point
  that a justified stop spends live judgment on the abnormality before more
  output inherits it. Pair both triads in the takeaway. Update corresponding
  entries in `slides/tps-and-ai/artwork-list.md` so titles and descriptions do
  not preserve obsolete terminology. Do not claim every stop is good or that
  Stop & Fix produces no artifacts.
- **Done when:** The andon and slowing-down beats present stopping as
  containment rather than as the absence of intelligent work; artwork notes
  match the deck; the deck builds and changed slides pass a visual overflow
  check. Delete this plan directory in this slice's commit.

## Out of scope

- Choosing a replacement for `judgment-intensive` if later audience testing
  shows that `judgment` is too narrow
- Changing the CLD topology or the talk's five human-owned governance calls
- Broad terminology cleanup outside the AI & TPS project
- New artwork or layout/theme components
- An ADR for talk-local terminology
- Pushing to remote
