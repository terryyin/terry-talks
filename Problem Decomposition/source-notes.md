# Problem decomposition film: source notes

Captured on **2026-10-03** as authoring inputs for
[the consolidated article](problem-decomposition.md). These notes preserve the
original source findings; the article records confirmed meanings and fact checks,
and the [production guide](README.md) describes the finished film.

## Terry's supplied material

[The entire raw draft](raw-content.md) is kept separately, including its
repeated explanation of the goals, later additions, uncertain terminology,
fillers, and transcription slips. The two-minute film is a presentation derived
from this material, not the only record of it.

## Story Impact: continuity with part one

Reference checkout: terry-talks at `66acfdb` when captured.

- [Seed and Terry's intention](../Story%20Driven/seed.md),
  [essay](../Story%20Driven/romantic-stories-disciplined-products.md), and
  [flip chart](../Story%20Driven/story-driven-product-space.jpg).
- [Current composition](../terry-moves/src/stories/StoryImpactFilm.tsx):
  English narration `assets/audios/impact_en.m4a`; Traditional Chinese version
  uses `assets/audios/impact_zh.m4a` with translated subtitles. The older seed's
  silent-film release note predates these recordings; use the current film as
  the style reference.
- [Stage and type](../terry-moves/src/storyImpact/layout.ts): 1080 × 1080;
  Baloo 2 / Comic Neue / Chalkboard SE font stack; thick cartoon outlines and
  flat shadows. Behavior × Structure product wall, Time axis, backlog tray,
  and History box are the established diagram language.
- [Motion](../terry-moves/src/storyImpact/storyBeats.ts): playful springs,
  hopping, squash and stretch, colorful story balls and splashes; the product
  responds deliberately and becomes coherent. Preserve the tone and visual
  family without deciding which metaphors part two must reuse.
- Part one already distinguishes a story's external impact from product
  structure, and introduces customer value and option value. Part two can
  build on this vocabulary. It should still explain its own argument.

## Nearby Open Dough ADR input

The nearby project is `/Users/terryyin/git/open-dough`, with remote
`terryyin/open-dough`. "OpenDOE" is interpreted as Open Dough for this capture.
Relevant ADR files were clean at source commit
`0cbbdb96db1e23ef8d0b74b52b9b44a5392b4dfd`; the links below pin that revision
so later source changes do not erase this capture's provenance.

The [ADR index at capture](https://github.com/terryyin/open-dough/blob/0cbbdb96db1e23ef8d0b74b52b9b44a5392b4dfd/docs/adrs/README.md)
classifies 0000–0006 as Accepted and 0007–0009 as Proposed. Relevant in-file
statuses agree. Proposed lifecycle records are not accepted conceptual input.
These are sources for the explanation, not architectural rules imported into
terry-talks.

### ADR 0002 — Software development lifecycle principles (Accepted)

[Pinned source](https://github.com/terryyin/open-dough/blob/0cbbdb96db1e23ef8d0b74b52b9b44a5392b4dfd/docs/adrs/0002-software-development-lifecycle-principles-accepted.md),
local path `../open-dough/docs/adrs/0002-software-development-lifecycle-principles-accepted.md`.
Revised 2026-10-02, with Terry's clarification of internal solution dependencies.

Relevant input:

- Its two goals are the ability to deliver highest user value first and the
  ability to change direction at extremely low cost. Learning through actual
  delivery is central, and small pieces must have practical transaction cost.
- Do not assume every decomposed story will be implemented. A stopping point
  leaves useful software without complexity justified only by unfinished future
  work. Supporting capabilities are pulled just in time for current value.
- Necessary current domain coherence is part of today's value even if it
  requires substantial cross-component work. This qualifies the draft's
  opposition to future preparation; it does not forbid current design.
- Customer understanding and product focus are shared. Teams pursue external
  value while constructing solutions and coordinating through continuous
  integration. Internal dependencies are encouraged when they support cohesion;
  independently valuable stories do not require isolated implementations.
- Direct communication resolves shared decisions when integration exposes
  them. Blocking story dependencies are exceptional; shared code alone does
  not justify waiting. This informs the draft's multi-team collaboration point.
- Every solution layer should map to clear domain concepts. Cohesion and one
  representation per conceptual solution lower understanding and change costs.
- Simpler solutions embody decisions and leave less judgment for future work;
  speculative mechanisms carry future cost. Improvement follows observed need
  and feedback, toward the optimization goals.

### ADR 0001 — Ubiquitous language (Accepted)

[Pinned source](https://github.com/terryyin/open-dough/blob/0cbbdb96db1e23ef8d0b74b52b9b44a5392b4dfd/docs/adrs/0001-ubiquitous-language-accepted.md),
local path `../open-dough/docs/adrs/0001-ubiquitous-language-accepted.md`.

Relevant input: a story is a romantic, speculative possibility for user or
learning value, may cross features and system boundaries, and is planning input
rather than an enduring description of what the system does. A slice is bounded
executable Behavior work or a Structure change immediately enabling the next
Behavior slice. These distinctions inform the fractal discussion and continuity
with part one. Open Dough's maintainer vocabulary does not prescribe this
film's public terminology.

### 3 Vs: located in a reference, exact recalled ADR unresolved

The current Open Dough ADR store does not contain the phrase Valuable, Visible,
Vertical. It is present in
[the pinned problem-decomposition reference](https://github.com/terryyin/open-dough/blob/0cbbdb96db1e23ef8d0b74b52b9b44a5392b4dfd/src/skills/dough-story-decomposition/references/problem-decomposition.md)
and the installed
[local reference](../.agents/skills/dough-story-decomposition/references/problem-decomposition.md).
Do not attribute these definitions to ADR 0002 without locating that evidence.

- **Valuable:** changes an outcome for a named user/stakeholder; merely enabling
  future work is insufficient.
- **Visible:** the beneficiary can evaluate the result without inspecting the
  implementation.
- **Vertical:** works end to end across all required layers.
- Decomposition is fractal: identify evaluator/result, split independent
  outcomes, order by value and learning, and leave safe stopping points. Return
  to the parent level if its premise is invalidated.

## TPS and AI claims to use during polishing

These are linked to the existing claim files; their provisional status is
preserved. Their capture revision is terry-talks `66acfdb`. The claim files were
unchanged in the working tree at capture. No new external research or source
verification is claimed here.

| Claim | Relevant input for the film |
| --- | --- |
| [17: Thin vertical slices make software flow and confirmation possible](../TPS%20and%20AI/claims/17-jit-vertical-slicing-one-piece-flow.md) | A user-centric slice can pull the needed lower-level solution just in time. Flow also needs limited WIP, few queues and handoffs, and integration. Parallel pieces at different stages and parallel flows across teams are allowed. Finishing one slice before starting another is a possible WIP policy, not the definition of one-piece flow. Quality confirmation and learning usefulness from customer feedback are distinct. Vertical slicing is a software bridge, not Toyota terminology. |
| [4: JIT creates assurance through resourceful capability, not abundance](../TPS%20and%20AI/claims/04-jit-assurance-resourcefulness-not-abundance.md) | Respond capably and resourcefully to actual need rather than relying on stockpiles. Cheap changeover makes responding to a changing mix practical. JIT's need/when/amount framing supports the closing additions to the draft. |
| [8: Technical excellence enables JIT coordination in LeSS](../TPS%20and%20AI/claims/08-technical-excellence-enables-jit-coordination-in-less.md) | Whole Product Focus requires technical excellence. Shared-product continuous integration exposes concrete dependencies and pulls direct collaboration. Relevant to maintaining health while crossing components. |
| [5: SMED, software changeover, and AI-friendly context](../TPS%20and%20AI/claims/05-smed-software-changeover-and-ai-friendly-context.md) | Reduce the cost of switching across components while solving one customer item and changing to the next item. Cohesive code, domain language, types, tests, and reusable setup reduce reconstruction cost. Extra unfinished work is not the answer to changeover cost. |
| [18: Continuous improvement towards perfection](../TPS%20and%20AI/claims/18-continuous-improvement-towards-perfection.md) | The two adaptiveness goals connect low-cost changes of direction, discovery through frequent delivery, and customer/end-user value. Zero leftover switching cost is an optimization challenge, not a claim that all real work has zero cost. |
| [11: Physical production and software differences](../TPS%20and%20AI/claims/11-physical-production-and-software-differences.md) | Needed when refining the premise that a development plan and customer-centric item are hypotheses rather than guarantees of usefulness; manufacturing and software problem solving are not identical. |

## Preserve the tensions for refinement

The draft asks for two goals, then ends with "3rd goal"; says "GPS" where the
surrounding request says TPS; and treats one-at-a-time work more strictly than
Claim 17's definition. The raw words remain intact. Clarify them in the polished
presentation rather than overwriting the source.

Likewise, keep the aspiration to stop without waste while distinguishing
unstarted work from necessary shared design and already incurred learning
cost. Option value is potential enabled by a healthy product, not a mandate to
build anticipated features or preserve every imaginable implementation choice.
