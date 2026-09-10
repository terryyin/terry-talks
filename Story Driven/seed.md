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

- **For / why:** Terry needs evidence that the proposed genre makes the idea clearer and more interesting.
- **Visible outcome:** A short square scene rendered in `terry-moves`, driven by an excerpt of the script, showing a story arrive, cross boundaries, disturb, and become assimilated into a visibly changed product. Generate and incorporate raw artwork where it improves the scene's expression or completeness. Proposed length: roughly 20–30 seconds, subject to the chosen excerpt.
- **Evaluation:** Terry and a representative viewer can distinguish the before and after states, explain what remains of the story, and read the subtitles comfortably. Terry can judge the actual movement, texture, depth, and rhythm.
- **Value / learning:** Tests the riskiest visual assumption: that the abstract spatial metaphor explains assimilation rather than resembling arbitrary destruction or a reset.
- **Boundary:** One complete explanatory scene, with only the necessary tooling improvements included. Artwork generation and integration belong to this outcome rather than a separate asset-production story. A static moodboard alone does not satisfy this outcome. The spatial model contains no triangle.
- **Effort uncertainty:** Highest visual and capability uncertainty; band pending agreed definitions.
- **Input:** The [timed subtitle script](subtitle-script.md) supplies the excerpt; its wording can still evolve after the rendered evidence.
- **Safe stopping point:** Keep an independently viewable short explanation and the style decision. Revisit the metaphor before full production if viewers misunderstand it.

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
