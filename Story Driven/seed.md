---
id: story-driven-animation
status: proposed-decomposition
created: 2026-09-10
---

# Story Driven animation

## Parent problem and desired effect

For viewers trying to understand story-driven product development, turn the supplied essay and sketch into a memorable explanation of how a story changes a product and is assimilated into coherent behavior and structure. Deliver a three-minute, square animation using the existing `terry-moves` project, with the subtitle script driving the animation.

Confirmed primary audience: developers and product people who treat stories as features or as a lasting description of a system. Terry evaluates the explanation and creative direction; representative viewers evaluate whether the meaning comes through. Terry confirmed English and silent-first: the full explanation must be understandable without audio.

The material consists of the essay, sketch, and [timed subtitle script](subtitle-script.md). The animation should make the transition visible: a story crosses boundaries, disturbs the product, and becomes a coherent change rather than a permanent attachment. Making the film now advances the existing product-backlog direction and provides a concrete opportunity to improve animation authoring.

## Confirmed scope

- Three-minute animation, with a 1:1 square frame.
- Use the lower three-dimensional sketch: behavior / functionality / features, structure / design / components / architecture, and time. Do not include the upper triangle in the animation. Explain the distinction between behavior and structure only where it helps viewers understand product change and assimilation; a separate architecture lesson is not required.
- Use `terry-moves`; its script is the subtitle text and drives the animation's story and timing.
- When raw artwork would make the film more complete or interesting, use ChatGPT image generation (Terry's requested capability: “ChatGPT Image 2.5”) to create suitable source assets. Confirm the available image-generation capability when producing assets; the exact model name is not verified here. Compose, animate, synchronize, and render the film in `terry-moves`.
- Describe how the animation should engage viewers and achieve its explanatory effect.
- Use production needs to reveal opportunities to improve `terry-moves`, then ultimately produce the animation.
- This document is decomposition input, not an executable plan. Source documents are reference material, not repository instructions.

## Alternatives and proposed direction

| Approach | What it offers | Limitation / recommendation |
| --- | --- | --- |
| Defer; keep the essay and sketch | No production effort; the full argument remains available | Does not deliver the requested animation or learn from making it |
| Slowly reveal the diagram with captions | Strongest smaller alternative: a simple way to explain the axes | Useful fallback, but weak at making disturbance and assimilation felt; provisionally reject as the final treatment |
| Tactile paper construction | Warm, approachable folds and layers can reveal dimensions | Can make assimilation look like attaching more pieces unless transformations are carefully designed |
| Cinematic glass or metal sculpture | Strong depth and physical presence | Surface spectacle may compete with the explanation and increase production uncertainty |
| Expressive abstract animation with precise editorial geometry | The visual language itself can move from romantic possibility to disciplined product | Recommended; prove comprehension and appeal in a short scene before expanding |

Terry considers the proposal reasonable. Continue with abstract editorial animation as the working direction and judge its treatment through the rendered visual proof. The triangle is explicitly excluded; generated source artwork is available where it serves the film.

A reference for expressive shape transformation is Evelyn Lambart and Norman McLaren's *Begone Dull Care*: the NFB describes painted shapes, color, and fluid lines interpreting jazz. Borrow the principle of expressive motion, while letting our subtitle script lead the film rather than music. This is inspiration, not a request to reproduce the film or use its assets.

Reference: [National Film Board — Begone Dull Care](https://www.nfb.ca/film/begone_dull_care/).

## Proposed creative concept: the change remains; the story is spent

A loose coral stroke carries a human desire toward an ordered product plane. The plane has distinct behavior and structure directions, with time extending away from it. The stroke refuses to fit a single cell: it crosses multiple behaviors and components, briefly pulling the arrangement out of coherence.

Through assimilation, the arrangement changes and settles. Coral remains in the resulting behaviors and structure, but the incoming stroke no longer exists as a separate object. The product is recognizably changed, not restored to its original state. A subsequent story can approach a coherent present.

Show history receding along time while the current product remains clear. Do not imply history has been destroyed, that each feature maps to exactly one component, that every story changes every part, or that development literally requires catastrophic damage.

Possible opening line, for discussion: “A story imagines a world that does not exist. A product has to work in the world that does.”

Possible closing image: the camera holds on the newly coherent product, then a small new stroke appears at the edge of the time axis. It suggests continuing evolution without implying an endless wound.

## Proposed appeal and communication requirements

- Let motion explain causality: desire approaches, impact disturbs, judgment resolves, the changed product settles. Decorative movement should not obscure this sequence.
- Give stories and products distinct movement qualities: expressive, irregular arrival versus legible, deliberate organization. Neither should be portrayed as morally better.
- Establish the three dimensions before rotating the view. Use a stable viewpoint for crucial relationships and screen-facing subtitles that remain readable.
- Introduce one conceptual change at a time. Leave breathing room after impact and after assimilation so viewers can notice the difference.
- Keep one recognizable product through the transformation. Replacing it with unrelated graphics would hide what changed.
- Generate source artwork when it adds expressive value: for example, a distinctive story stroke, tactile paper or ink textures, or an illustration grounding the human desire. Keep assets consistent with the chosen palette and visual language, and suitable for animation within the square composition. Essential meaning and labels must remain legible when the assets move.
- Use shape, motion, and labels as well as color. A proposed palette is warm paper, dark ink, blue structure, green behavior, and coral story impact.
- Design for the square frame from the beginning. Judge caption legibility and competing visual detail at phone viewing size; final resolution remains open.
- Keep the script as the primary text. Short scene labels orient the viewer; avoid a second paragraph competing with subtitles.
- Evaluate appeal through a rendered scene: can a viewer identify what moved, what changed, and why the ending feels coherent? Ask which moment they remember and where attention dropped.
- Confirmed silent-first viewing in English: the meaning survives without audio. Optional sound could emphasize tension and release; narration and music remain later decisions.

## Candidate story decomposition

Terry has endorsed the proposal as reasonable and supplied the scope clarifications above. The candidates below incorporate them; remaining open decisions are listed separately. Exact S/M/L estimates are deferred: no project effort-band definitions were found in the guidance consulted. Risk descriptions below are not time estimates.

<a id="visual-proof"></a>
### 1. Terry can judge the art direction through one complete animated transformation

#### Goal

Terry can judge the abstract editorial art direction from one complete, playable
transformation rendered in `terry-moves`. A developer or product viewer can
compare the product before and after the story and explain what remains of the
change. This supplies evidence for the full animation's riskiest assumption:
that the spatial metaphor makes assimilation understandable and interesting.

#### Scope

- Render one silent, square scene showing the same recognizable product before,
  during, and after a story's arrival. Preserve visible depth and the behavior,
  structure, and time directions from the lower sketch.
- Let the story cross several behaviors and structural connections, disturb
  that region, and become integrated into a changed, coherent arrangement.
  Keep an unaffected region recognizable so the example does not suggest that
  every story changes everything.
- Drive captions and transformation beats from the selected subtitle script.
  Working excerpt: cues 11, 15, 17, 18, and 23 of the
  [timed script](subtitle-script.md), retaining their wording and order.
  At six seconds each, with a 1.5-second pause after disturbance and a
  1.5-second final hold, this gives a 33-second proof. The earlier 20–30-second
  estimate was provisional; the complete causal sequence and readable pacing
  govern the cut. This excerpt does not change the full script's timing.
- Use expressive motion for the incoming story and deliberate motion for the
  product's reorganization. Coral can remain in changed behavior and structure
  after the incoming stroke ceases to be a separate attachment. Use shape and
  motion as well as color to communicate the relationship.
- Keep captions screen-facing, separated from the principal transformation,
  and readable at phone viewing size. Short axis labels provide orientation;
  visual notes must not become a competing paragraph of explanation.
- Produce a playable video and retain editable source and any incorporated
  artwork. Working export choice: 1080 × 1080 MP4, with no audio dependency.
  This is a proof-delivery choice, not a new final-film export constraint.
- Use generated source artwork when it improves expression or completeness.
  Assess that need against the rendered scene; precise geometry may carry
  the product model without generated imagery. If assets are generated, retain
  their source and integrate them into the same visual treatment.
- **Rejection constraints:** Terry explicitly excluded the upper triangle.
  Following the existing creative constraints, do not portray assimilation as
  restoration of the original state, destruction of history, catastrophic
  damage, or a permanent story-shaped attachment. Do not imply one feature
  necessarily maps to one component.
- **Deferred promises:** The complete three-minute film, narration, music,
  translations, publishing, alternative aspect ratios, and reusable authoring
  improvements are outside this delivery. Record observed authoring friction
  for the conditional sibling instead of inventing a platform project.

#### Key examples

1. **Follow the impact:** Given the organized product and an approaching story,
   when the excerpt plays, the story crosses more than one behavior and
   structural connection. The viewer can follow its arrival and the local
   disturbance without losing the identity of the product.
2. **Recognize assimilation:** Given that disturbance, when the scene resolves,
   both behavior and structure form a coherent arrangement that differs from
   the starting state. The effect of the story remains within the product;
   the incoming stroke no longer stands apart as an attached object.
3. **See continuity:** Given affected and unaffected regions, when comparing
   the first stable state with the final hold, the viewer can identify both
   what changed and what remained. History can recede along time without
   being erased or competing with the present.
4. **Watch without audio:** Given the exported square video at phone viewing
   size, when it plays without sound, captions remain legible and synchronized
   with the transformation. The final hold lasts beyond the last caption.
5. **Evaluate the treatment:** Given the playable excerpt, Terry can judge the
   actual motion, depth, rhythm, and visual texture. Ask a representative viewer
   what changed, what remains of the story, and which moment they remember.
   Record actual feedback separately from the agent's visual inspection;
   a render or test pass must not be reported as human comprehension evidence.

#### UI and review approach

Begin from a stable view of the product with short behavior, structure, and time
labels. Show enough of the incoming stroke to establish its trajectory before
contact. Hold the view through disturbance and reorganization so a viewer can
compare the two states. Reserve caption space within the square composition.
Judge the whole moving scene, including the pauses, rather than only stills.

#### Open decisions and safe stopping point

No new audience, language, sound, or art-direction decision blocks production.
The excerpt, duration, and export settings above are working choices within the
existing scope. Actual viewer comprehension and Terry's judgment of the
rendered treatment remain to be observed; do not infer approval from silence.
If the rendered metaphor is misunderstood, retain the proof and seek a treatment
decision before expanding to the full film. A usable short explanation remains
valuable if later production is deferred.

Execution plan: [animated transformation](../.planning/quick/004-story-assimilation/PLAN.md).

<a id="authoring-improvement"></a>
### 2. The author can revise the proven scene through its script without repairing unrelated timing — conditional

- **For / why:** Terry or the animation author needs to iterate on wording and pacing without disproportionate manual repair.
- **Visible outcome:** If the short scene exposes a concrete authoring problem, the author changes one real subtitle cue or duration and previews a coherent revised scene through the ordinary authoring workflow.
- **Evaluation:** Demonstrate the same edit before and after the improvement and identify the manual work removed. Existing expected authoring behavior remains intact.
- **Value / learning:** A demonstrated reduction in revision friction that remains useful beyond the final render.
- **Boundary:** Select only after observing an actual gap. This is a candidate example of a useful improvement, not a claim that the current system lacks this capability. If another gap is more consequential, including friction using generated artwork, revise this candidate with Terry instead of silently expanding it. Scene-specific artwork and visual work belong in the film stories; using external image generation does not itself require building image generation into `terry-moves`.
- **Effort uncertainty:** Unsizeable until a concrete problem is observed; no generic platform overhaul is implied.
- **Depends on:** The [visual proof](#visual-proof) provides evidence. Omit if the workflow already handles the revision well.
- **Safe stopping point:** Leave a working, demonstrably improved authoring interaction even if the longer film is deferred.

<a id="complete-cut"></a>
### 3. Viewers can follow the whole argument in a complete three-minute square cut

- **For / why:** Viewers need the entire causal journey, and Terry needs to assess pacing across the whole film.
- **Visible outcome:** A complete rendered cut in `terry-moves`, driven by the subtitle script, using the proven visual language throughout. Generate additional source artwork where needed and integrate it consistently with the proven scene. Simpler treatments are acceptable where they communicate the idea clearly.
- **Evaluation:** After watching, viewers can explain story versus product state and identify how behavior and structure change over time. Terry can assess the opening, transitions, reading pace, and ending without imagined missing sections.
- **Value / learning:** Delivers the full explanation and reveals whether the style and pacing work across three minutes.
- **Boundary:** Whole-film coherence and comprehension. Do not require every shot to have maximal visual complexity.
- **Effort uncertainty:** Breadth of production and editorial rework; band pending agreed definitions. Reduce decorative breadth before fragmenting this into disconnected scene stories.
- **Depends on:** The [visual proof](#visual-proof), using the [timed subtitle script](subtitle-script.md). The [authoring improvement](#authoring-improvement) is required only if the observed problem prevents practical production.
- **Safe stopping point:** A complete, watchable film with any presentation limitations clearly identified.

<a id="release"></a>
### 4. Terry has a finished square animation ready to share

- **For / why:** Terry needs a dependable viewing artifact that communicates the idea without presentation distractions.
- **Visible outcome:** The final three-minute, 1:1 animation with resolved readability, pacing, visual continuity, and agreed audio treatment, rendered from the maintained `terry-moves` source.
- **Evaluation:** Watch the exported file end to end at intended viewing size; confirm its duration, square framing, readable synchronized subtitles, and absence of accidental clipping or incomplete scenes. Check that generated artwork is visually consistent and holds up in motion, and that no triangle has entered the treatment. Terry judges the final explanatory and artistic effect.
- **Value / learning:** A finished communication artifact ready for use; creation does not imply permission to publish it externally.
- **Boundary:** Address observed issues from the complete cut and finish the agreed presentation treatment. New genres, additional formats, and unrelated tool features are new scope.
- **Effort uncertainty:** Depends on actual cut feedback and whether narration or music is included; band pending definitions.
- **Depends on:** The [complete cut](#complete-cut).
- **Safe stopping point:** Retain the final export, editable source, and generated artwork used by the film so it can be rendered again. No external posting is required for completion.

## Ordering and scope reduction

The [timed subtitle script](subtitle-script.md) supplies the complete explanation. Prove the visual treatment through one transformation before producing the complete cut and finishing it. The conditional authoring story is selected only when the short scene demonstrates an independent improvement worth making.

First reduce decorative complexity, extra visual metaphors, and optional music. Omit speculative authoring enhancements. Preserve the square format, three-minute intent, script-driven workflow, and clear transformation in both behavior and structure. Do not silently cut an agreed narration requirement.

## Assumptions and open scope

- **Audience and emphasis:** Confirmed developer/product audience; assimilation is the central message, with judgment becoming decisions as its explanation.
- **Language and sound:** Confirmed English and silent-first; the complete explanation must work without audio. Optional voiceover, speaker, and music remain later decisions. Any added narration would need to fit the script timing or prompt an explicit revision.
- **Art direction:** Abstract editorial animation is the working direction following Terry's positive feedback; the rendered proof will settle the detailed treatment. Generated artwork may enrich it without changing the script-led animation workflow.
- **Concrete example:** A single human desire could anchor the metaphor; its domain remains open. Prefer one understandable example over several abstract claims if viewers need grounding.
- **Essay coverage:** Prioritize story versus state, crossing boundaries, assimilation, and a coherent present. Historical negations and the detailed automated-testing analogy are proposed omissions from the three-minute film, not rejected ideas.
- **Meaning of three-dimensional:** Preserve the three conceptual dimensions and visible depth. This does not yet commit to photorealism, custom 3D assets, or a particular rendering technology.
- **Tooling ambition:** Film-led, evidenced improvements are proposed. Broader reusable authoring investment would change story selection and priorities.
- **Delivery:** Three minutes and 1:1 are confirmed; resolution, exact timing tolerance, export format, branding, and distribution destination remain open for later refinement.
- **Sizing:** Project S/M/L definitions are missing. Do not treat the risk descriptions as agreed estimates.

## Existing project evidence and architecture boundary

The [terry-moves README](../terry-moves/README.md) documents square story dimensions, subtitle text with duration and actions, camera movement, optional audio, and rendering. This is documentation-level evidence only: implementation capabilities and gaps have not been audited as part of decomposition.

[ADR-0000 — Use Architectural Decision Records](../docs/adrs/0000-use-adrs-accepted.md) reserves durable, cross-cutting decisions for the human-owned ADR process. This seed makes no platform architecture decision. Any future improvement with that scope should be checked against the current accepted decisions when selected.

## When to surface

Now, under the existing product-backlog direction to create the story-driven development animation. Candidate selection and refinement follow Terry's framing feedback; no implementation is authorized by this seed alone.

## References

- [Romantic Stories, Disciplined Products](romantic-stories-disciplined-products.md)
- [Original sketch: product space and backlog over time](story-driven-product-space.jpg)
- [Product backlog](../.planning/PRODUCT-BACKLOG.md)
- [Animation project](../terry-moves/)
