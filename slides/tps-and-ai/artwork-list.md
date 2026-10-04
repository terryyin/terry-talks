# Artwork list — Freedom and Trust

Art needed for `slides.md`, oriented by
`TPS and AI/main-theme-and-stage-setting.md`. Slides are referenced by
title only — never by page number — so the list survives inserting or
reordering slides.

Only art some slide shows stays in `public/`. When a slide is cut, its
entry's status becomes **retired**, and the status names a Git revision
that still holds the image. Its image is deleted, and its prompt stays,
so the art can be regenerated or recovered if the slide returns.

Four source categories:

- **Find (authoritative)** — real artifacts where authenticity matters,
  especially with Toyota and LeSS experts in the room. Check license and
  attribute on-slide.
- **Generate (AI)** — conceptual illustrations. Prompts below.
- **Build in-slide** — diagrams and icons that need crisp, editable text;
  AI image generators garble text (and kanji especially), so these are
  SVG/mermaid/Iconify work, not AI art.
- **Animate (terry-moves)** — a short Remotion clip when the argument is
  the *action* a still cannot show. Same visual voice as generated art
  (sumi-e prefix below); still no text in the picture. List the clip
  here like any other artefact.

## Common style for all generated artwork

Consistency comes from a few fixed anchors; everything else is
deliberately left open so each image can find its own best expression.

**Fixed — prepend this prefix to every prompt:**

> Japanese ink-and-wash (sumi-e) illustration on off-white paper, with
> a single vermilion-red accent. No text, no letters, no captions.

These three anchors — one medium, one background, one accent color —
are what make the deck read as one visual voice (the ink medium already
implies black strokes and natural negative space, so those need no
extra words). Per-item prompts may override the accent color when the
subject demands it (e.g. G12's green light).

**Free — do not add to prompts:** composition, framing, brushwork
looseness, level of detail, perspective, how figures are stylized,
mood. Where an item's prompt does name one of these (e.g. "empty space
on the left"), it is because the slide layout requires it, not a style
rule.

Rules: never ask the generator for text or kanji — typeset those in the
slide. Full-bleed backgrounds are 16:9; spot illustrations square or 4:3.

## How to regenerate

These images were made with ChatGPT Images. To replace one:

1. Prepend the sumi-e prefix above to that item's **Prompt**. Do not add
   composition, mood, or extra style unless the prompt already names it
   for layout.
2. Save over the named file in `slides/tps-and-ai/public/`.
3. After G1 exists, pass `public/cover-crane-released.png` as a style
   reference on later generates. G14 must: same crane, same voice.
4. Check the named slide, rendered. Full-bleed art is the layout
   background; the Odd-e mark is a theme overlay, not part of the
   image — leave logos out of the generation.

Do not invent Toyota graphics or present an unsourced house as Toyota's.
Do not add extra Odd-e logos on cover or Thank you. The Lizard asset on
**About Me** is skipped by owner decision.

---

## Find from authoritative sources

### 1. The TPS house (Cho / Toyota 1998 teaching)

- **Status:** implemented in-slide — original English SVG on
  "Two houses, different layers". Not a Toyota file.
- **Slide:** "Two houses, different layers", left column
- **Placement:** left-column visual; the layer explanation is typeset
  **below** both houses, never in the picture
- **Closest official published structure:** Toyota Motor Corporation,
  *The Toyota Production System — Leaner manufacturing for a greener
  planet* (Public Affairs Division, Tokyo, 1998). Roof of high
  productivity with highest quality and on-time delivery; pillars
  **Jidoka** and **Just-in-Time**; foundation of waste elimination,
  people, suppliers, and kaizen. The house metaphor itself is the
  commonly taught Cho teaching diagram (Art Smalley: internal Toyota
  education, 1970s–80s), not a current Toyota download.
- **Reusable reconstruction found and not used on-slide:** Wilmjakob
  Herlyn's [TPS-Haus.tif](https://commons.wikimedia.org/wiki/File:TPS-Haus.tif)
  is a [CC0](https://creativecommons.org/publicdomain/zero/1.0/) German
  illustration of that 1998 booklet. Faithful, but German and too dense
  for this two-column slide.
- **Ruled out:** Toyota's current
  [TPS page](https://global.toyota/en/company/vision-and-philosophy/production-system/index.html)
  and [Virtual Plant Tour](https://global.toyota/en/company/plant-tours/production-system/index.html)
  explain the two pillars and do not offer a house as a downloadable
  asset; [Terms of Use](https://global.toyota/en/terms-of-use/index.html)
  reserve reuse of site graphics, and
  [Downloadable Assets](https://global.toyota/en/downloadable-assets/index.html)
  has no TPS overview. Toyota Motor Europe's 2007 house (Nigel Thurlow
  recreation of an internal Visio) is the most "inside Toyota" drawing
  in circulation — copyrighted, not for reuse. Liker, *The Toyota Way*
  (2004) p.33 is the English house most people recognize — also
  copyrighted.
- **What we drew:** original English SVG of that Cho / 1998 structure
  (QCD roof; Jidoka left, Just-in-Time right; people and kaizen in the
  centre; standardized work, heijunka, and stability as foundation).
  Attributed as a reconstruction, not as Toyota's official graphic.
  Pillar meanings still cite Toyota's current TPS page.

### 2. Larman & Vodde's Lean Thinking house

- **Status:** implemented — `public/lean-thinking-house.png`
- **Slide:** "Two houses, different layers", right column
- **Placement:** the right column's visual anchor
- **Source:** Larman & Vodde, *Scaling Lean and Agile Development*,
  [Figure 3.1: Lean Thinking
  House](https://less.works/book-original/scaling-book-images/scaling-agile-lean-development-thinking-tools/chapter-3-toyota-house-en.pdf)
- **License:** [Creative Commons for presentations per
  less.works](https://less.works/resources/graphics/book-images);
  attributed on-slide

### 3. Toyoda Type G automatic loom photograph

- **Status:** done — `public/toyoda-type-g-automatic-loom.jpg`
- **Slide:** "The loom's closed stop"
- **Placement:** left half of the slide, beside the 自働化 lettering.
  A real photograph anchors the history. The caption identifies the
  Type G as the 1924 example; the stopping devices originated in
  Sakichi's earlier power looms.
- **Source:** [Daderot, "Toyoda Automatic Loom - National Museum of
  Nature and Science, Tokyo - DSC07343.JPG"](https://commons.wikimedia.org/wiki/File:Toyoda_Automatic_Loom_-_National_Museum_of_Nature_and_Science,_Tokyo_-_DSC07343.JPG),
  own work, photographed at the National Museum of Nature and Science,
  Tokyo
- **License:** [CC0 1.0 Universal Public Domain
  Dedication](https://creativecommons.org/publicdomain/zero/1.0/)

### 4. Andon cord / andon board photograph

- **Status:** retired from the slide 2026-10-02; generated fallback retained
  as `public/andon-pull.png`
- **Former slide:** "Stop & Fix is emergent judgment-intensive work",
  replaced by "Build the stop into the software"
- **Former placement:** inset right of the software-methods table;
  the software flow now carries this explanation directly
- **Source/license check:** Toyota USA Newsroom's authentic
  [2018 TMMTX VC 05 andon exhibit
  photo](https://pressroom.toyota.com/album/2018-toyota-motor-manufacturing-texas-tmmtx/)
  is restricted to editorial use by its [Terms &
  Agreements](https://pressroom.toyota.com/terms-agreements/). Toyota
  UK's andon explanation and factory images are likewise
  [copyright-free for editorial purposes
  only](https://media.toyota.co.uk/toyota-auris-hybrid-production-quality-first-and-foremost/).
  No clearly reusable official photo was found, so G8 was generated and
  identified as AI-generated on the former slide.

### 5. Own assets — do not add

- **About me:** Lizard logo skipped by owner decision.
- Cover and "Thank you": the theme already watermarks every slide
  (`themes/odd-e/images/odd-e-logo.png`). Do not generate or paste a
  second logo.

---

## Generate (AI)

### G1. Cover — crane released from an open hand

- **Status:** done — `public/cover-crane-released.png`
- **Slide:** cover, "Freedom and Trust"
- **Placement:** full-bleed background, art weighted right, title text
  sits in the empty left space
- **Why generated:** the title pair (freedom + trust) has no
  single authoritative artifact; a released crane carries both
- **Style reference:** this file *is* the style reference for later
  generates (G14 must use it)
- **Prompt:** An open human palm releasing a red-crowned crane taking
  flight upward, wings spread, motion implied by a few loose
  brushstrokes; composition weighted to the right with large empty
  space on the left; 16:9.

### G2. Preaching to the Buddha

- **Status:** done — `public/preaching-to-the-buddha.png`
- **Slide:** "釈迦に説法"
- **Placement:** spot illustration, right side
- **Prompt:** A tiny enthusiastic figure gesturing mid-lecture at the
  foot of a large serene seated Buddha who listens with a gentle,
  amused smile; affectionate humor, not mockery; square composition.

### G3. Constrained by what they built

- **Status:** done — `public/constrained-by-what-they-built.png`
- **Slide:** "Constrained by what they built"
- **Placement:** spot illustration, right half
- **Prompt:** Three small figures tethered by threads to a towering,
  teetering stack of identical crates leaning over them; they look
  toward a small bright doorway ahead that they cannot walk to; 4:3.

### G4. The apparent tradeoff — tilted balance

- **Status:** done — `public/freedom-entrustment-balance.png`
- **Slide:** "Freedom vs. trust?"
- **Placement:** lower half; “Trust people with real work” / 信頼して任せる
  stays typeset in the slide above the art, never generated
- **Prompt:** An antique two-pan balance scale, one pan holding a
  single feather high in the air, the other sunk low under a heavy
  iron key; centered, ample empty margin above; 16:9 lower band.

### G20. Freedom and trust — level balance

- **Status:** done — `public/jidoka-jit-balanced-scale.png`
- **Slide:** "The engine of freedom and trust"
- **Placement:** centered beneath the CLD, on a transparent background
- **Generation:** built-in imagegen; G4 supplied as the style/composition reference
- **Meaning:** the left automatic stop represents Jidoka/autonomation;
  the right single part with a pull card represents Just-in-time. The beam
  and pans are level, answering G4's apparent freedom/trust tradeoff.
- **Final prompt:** Use case: stylized-concept. Asset type: a low, wide spot illustration beneath a causal loop diagram in a Slidev talk. Create a NEW companion variation of the supplied antique balance-scale illustration. Reference image 1 supplies the sumi-e ink-and-watercolor style, antique scale construction, soft charcoal contours, sparse vermilion accents, and restrained visual mood. Make the scale perfectly BALANCED: its crossbeam is exactly horizontal and the two shallow pans hang at exactly the same height. Replace both original objects entirely: no feather and no key. LEFT pan: a compact mechanical loom automatic-stop/interlock device, a small bronze lever and catch with a subtle vermilion stop indicator, representing jidoka/autonomation that guards against known mistakes. RIGHT pan: exactly one simple wooden production part with a single blank cream kanban pull card tied to it, representing just-in-time response to actual need, without a pile or stockpile. Keep the objects simple and identifiable at small size; each pan holds one symbolic group of comparable visual weight. Low compact chains and modest-height central pedestal, wide horizontal composition with both pans fully visible, generous clean edges but little internal empty margin, center the subject so it can fit a short footer banner. Hand-painted Japanese brushwork, black/grey ink, sparse warm bronze, tiny vermilion accent. The output must have a genuinely TRANSPARENT background so the illustration can sit seamlessly on warm paper slide color. No paper texture background, no white rectangle, no scenery, no labels, no letters, no watermark, no other objects. The only shadows are a light painted ground shadow under the pedestal. The physical scale must be horizontal and unambiguously in equilibrium.

### G21. Jidoka frees the software team

- **Status:** done — `public/jidoka-frees-software-team.png`
- **Slide:** "Jidoka frees people"
- **Placement:** wide lower illustration; transparent ground blends into the
  paper. The layout crops unused transparent margins, keeping the checks,
  people's faces, hands and shared prototype visible.
- **Generation:** built-in imagegen; G1 supplied as the sumi-e style reference.
- **Meaning:** healthy executable checks run without a watcher; developers
  spend their attention exploring a new need with a user. The vermilion
  accent belongs to the prototype they are discussing, not an ignored failure.
- **Generation prompt (complete):**

  > Japanese ink-and-wash (sumi-e) illustration on off-white paper, with a single vermilion-red accent. No text, no letters, no captions.
  >
  > Create a refined, spacious teaching illustration for a presentation about Jidoka freeing software developers by preserving their knowledge in executable checks. Use the attached image only as a reference for the hand-painted ink contours, delicate warm gray washes and restrained vermilion accent. Do not include a crane.
  >
  > A single coherent horizontal scene, transparent surrounding background, landscape 3:2. On the far left, a small unattended software workstation is quietly doing its routine checks: a monitor with three simple abstract rows ending in black check marks, a compact laptop and a few neat connected blocks. It is calm and clearly healthy, not showing a warning, failure or alarm. This unattended workstation occupies only one quarter of the composition, with no person monitoring it.
  >
  > On the larger right side, two software developers and one user are leaning together around a low open worktable, actively exploring a new problem. One developer holds a pencil over a simple paper prototype; the user points to an unmet need in the sketch; the other developer operates an open laptop. Give each person a distinct readable action and engaged, relaxed body language. All three are peers, with no boss hovering. Put the ONLY small vermilion accent on a single geometric feature of the paper prototype that they are discussing, to draw attention to the new problem. No colored screens, red lines or red clothes.
  >
  > The developers have turned their attention away from the quiet guarded workstation toward useful discovery with the user. Preserve plenty of open ground between the left workstation and the right group so that this shift in attention is visible. Sparse environment, no office clutter, no factory, cages, shackles, shields, doors, arrows, connecting lines, fantasy robots or decorative symbols. Prioritize people, hands, laptop and the shared prototype, with readable silhouettes and credible anatomy. Background truly transparent; warm pale gray wash may remain inside the figures and furniture. Fade all ground washes gently to transparency. Illustration only, no titles or writing anywhere.

### G22. Just-in-Time — use pulls replenishment

- **Status:** retired 2026-10-03, replaced by G24's three vignettes.
  Former asset `public/jit-pull-replenishment.png` removed from public.
  This uncommitted asset remains recoverable from the original built-in
  generation at `/Users/terryyin/.codex/generated_images/01a0faef-d3e4-73e1-b082-5f5307e77aa7/exec-3193eeb2-f0ee-4ba9-81b4-385627f55b48.png`.
- **Slide:** "Just-in-Time"
- **Former placement:** Wide production-line illustration beneath the three parts of the JIT definition. A typeset arrow above it returned the replenishment signal upstream.
- **Generation:** built-in imagegen; G1 supplied as the style reference. Final targeted edits used the preceding output as the edit target.
- **Meaning:** Downstream takes a needed bracket and its kanban from a small ready stock; upstream replenishes the withdrawal. The stock is intentional and limited. The scene is a simplified conceptual illustration, not a Toyota plant photograph or a copy of Toyota artwork.

- **Initial generation prompt (complete):**

  > Japanese ink-and-wash (sumi-e) illustration on off-white paper, with a single vermilion-red accent. No text, no letters, no captions.
  >
  > Create an original conceptual illustration for teaching Toyota's Just-in-Time pull and replenishment system. The supplied crane image is a style reference only; no crane in this image. Use a truly transparent surrounding background and retain pale warm washes inside the figures and equipment.
  >
  > A wide, low horizontal production-line scene, about 2.7:1. Make all important subjects fill the canvas with little unused margin above and below. LEFT: a worker at a compact guarded machine is making ONE small metal mounting bracket, with one completed replacement bracket on the workbench. CENTER: a small neat three-position parts rack is the intentionally limited buffer. Two positions each contain one identical finished bracket; the third position is visibly vacant because a bracket has just been withdrawn. No stockpiles, no huge bins or piles of raw parts. RIGHT: a second worker has just taken ONE of those same brackets for the next assembly process, holding it in one hand and the removed blank vermilion kanban card in the other. Immediately behind this worker, a faint simple car chassis at an assembly station makes the downstream purpose recognizable. The card is the only red accent and clearly belongs to the withdrawn bracket's rack position.
  >
  > Show these connected stages at a consistent scale: upstream making a replacement, a small ready stock, downstream taking a needed part. Emphasize that the downstream withdrawal authorizes replenishment upstream. Calm, capable people working at a sustainable pace. Hands and all individual brackets must be readable. Credible protected machinery, normal workwear, no toy robots, no heroic scrambling, no overseer. No Toyota logos or historical claims. No arrows or connecting lines: these will be added as precise editable graphics in the slide. No writing, labels or numerals on the card, machines or clothing. Keep all objects fully visible, and fade the light ground wash gently into transparency.

- **Targeted edit prompt 1 (complete):**

  > Edit this sumi-e production-line illustration, preserving the three-stage composition, the people, identical brackets, two filled rack positions and one empty position, downstream car chassis, scale, brushwork, and transparent background.
  >
  > Make two precise corrections. FIRST: leave only ONE vermilion kanban card, the one held by the downstream worker on the right. Recolor the extra card clipped above the empty rack position to pale neutral gray. Do not introduce any other red accents. SECOND: the upstream worker's hands must be clearly outside the machine's cutting zone. Add a closed, simple clear safety guard around the drill spindle and clamped bracket. Move the worker's hands away from the spindle: one hand operates the external side control while the other rests outside on the bench near the single completed replacement bracket. The metal part under the spindle is held by a proper clamp, not by fingers. Do not alter the two finished brackets on the rack or the one held by the downstream worker. No text, letters, numerals, logos, arrows or captions. Keep all important subjects fully visible.

### G23. Entrust a resourceful response

- **Status:** done — `public/jit-resourceful-response.png`
- **Slide:** "JIT entrusts people"
- **Placement:** Right-side spot illustration beside ある物で工夫する and its English gloss. The words remain editable slide text.
- **Generation:** built-in imagegen; G1 supplied as the style reference. Final targeted edits used the preceding output as the edit target.
- **Meaning:** A real customer's cart is blocked by a raised doorway. Capable people use available boards and supports to create and check a useful ramp. This is an analogy for Terry's reading of JIT and Ebata's teaching, not a literal Toyota production practice or permission to bypass standards.

- **Initial generation prompt (complete):**

  > Japanese ink-and-wash (sumi-e) illustration on off-white paper, with a single vermilion-red accent. No text, no letters, no captions.
  >
  > Create an original conceptual illustration of the Japanese teaching "be resourceful with what you have": capable people observe a real user's need, collaborate and respond using available materials. The supplied crane image is a style reference only; do not include a crane. This is an explanatory analogy for a presentation, not a picture of an actual Toyota event or a claim about Toyota's assembly process. Transparent surrounding background, 4:3 composition, subjects large and readable with little unused border.
  >
  > A small doorway has a modest raised threshold. On the LEFT, a customer stands with a small wheeled cart carrying one ordinary crate. The cart has stopped at the threshold; the customer's calm gesture makes the practical difficulty obvious. On the RIGHT and CENTER, two capable craftspeople have responded by making a short, solid wooden ramp from a few boards and simple support blocks already available beside their workbench. The ramp connects the floor smoothly to the threshold. One craftsperson kneels and carefully checks the ramp's fit and support with a small measuring square. The other sets the final board into place and indicates the usable route to the customer. The customer and craftspeople look at the same concrete problem and solution, as peers. Give everyone distinct credible hands and clear actions.
  >
  > A few remaining boards and the measuring tool show what they had available, not an abundance of supplies. The ramp must be mechanically plausible, supported, simple and safe looking, with no gaps or unstable balance. Put the only small vermilion accent on the final board being fitted, drawing attention to the team's useful adaptation. Sparse background: only the low doorway, cart, workbench, a few materials and people. No warehouse, stockpile, supervisor, desperate emergency, magic, arrows, text, writing or logos. Keep the customer's cart, the threshold and the whole finished route visible so the need and response are understandable without words. Fade the ground wash to transparency.

- **Targeted edit prompt 1 (complete):**

  > Edit this sumi-e resourcefulness illustration to make the customer's usable route through the doorway completely unambiguous. Preserve the customer with the loaded cart on the left, the two craftspeople, the spare boards and simple measuring tool on the right, the ink-and-wash style, and the transparent background.
  >
  > The short vermilion wooden ramp must run from the customer's floor immediately ahead of the cart UP to the center of the raised doorway opening. Its high end must visibly rest on the sill BETWEEN the two upright doorposts, with the open passage behind it. It must not terminate at a solid wall or doorpost. Adjust its orientation and shorten it if necessary so the customer could roll the cart straight up and through the doorway. Keep the whole route clearly visible, with the ramp supported by simple blocks and no gaps. Adjust the standing craftsperson's hand to touch the correctly placed upper end; the kneeling craftsperson checks the lower fit and support. Keep the route, cart, ramp surface and both endpoints unobstructed by people. The vermilion accent stays only on the ramp. No text, arrows, captions or new objects.

- **Targeted edit prompt 2 (complete):**

  > Make one final precise correction to this resourcefulness illustration. Preserve the people, cart, doorway, tool and spare materials, ink-and-wash style, transparent background, and all other proportions. Replace the narrow plank ramp with a SHORT WIDE RAMP PLATFORM made from three adjacent boards. It must be wider than the distance between the cart's two wheels, so BOTH wheels can roll safely up it. Its upper edge spans the center of the open doorway between the posts, securely resting on the sill; its lower edge is on the floor directly ahead of the cart. Align this simple platform with the cart's path through the OPEN passage, with no doorpost blocking either wheel. Show the whole platform and its clearly supported edges. The center board keeps the existing vermilion accent; the two adjoining boards are neutral wood wash. Adjust only the craftsperson's hand as needed to meet the new upper edge. No text, symbols or additional objects.

### G24. Customer need pulls assembly and wheel replenishment

- **Status:** done — three transparent assets:
  - Customer orders: `public/jit-customer-orders.png`
  - Assembly pulls wheels: `public/jit-assembly-pulls-wheels.png`
  - Wheel replenishment: `public/jit-wheel-replenishment.png`
- **Slide:** "Just-in-Time"
- **Placement:** three equal columns below the unchanged JIT definition,
  with editable quantity labels and vermilion demand arrows between them.
- **Generation:** built-in imagegen; G1 supplied as a style reference.
- **Meaning:** two customer orders call for two cars and eight road wheels.
  Assembly pulls eight; the preceding wheel process replenishes eight.
  The final vignette contains seven finished wheels plus one being assembled.
  This is a simplified quantity example, not a Toyota schedule or container size.
  Minimum ready stock and replenishment remain explicit on the slide and in notes.

- **Customer orders — complete generation prompt:**

  > Japanese ink-and-wash (sumi-e) illustration on off-white paper, with a single vermilion-red accent. No text, no letters, no captions.
  >
  > Create one of three matching, abstract teaching vignettes for a Just-in-Time presentation. The supplied crane is a STYLE reference only, not a subject. Transparent surrounding background. Square canvas, clean readable silhouettes, sparse detail, simplified objects, no factory panorama or clutter. The main subjects should fill most of the square with all figures and essential objects visible. Ground washes fade to transparency. All counting and arrows will be editable slide text outside the image. Do not paint numbers, labels, logos, connecting arrows or words.
  >
  > Show exactly TWO distinct adult customers, one woman and one man, side by side in ordinary modern clothing. Each wants ONE car. Above each person's head, show one simple outlined thought bubble containing the silhouette of ONE small passenger car, a total of TWO separate car symbols. Their relaxed gestures indicate an actual wish or order, not distress or a sales pitch. Give each bubble a tiny vermilion underline or dot as the demand accent. No dealer or factory, no extra people, no actual cars on the ground, no wheels as loose objects. Keep the two customers and their two car wishes clearly separated and readable.

- **Assembly pulls wheels — complete generation prompt:**

  > Japanese ink-and-wash (sumi-e) illustration on off-white paper, with a single vermilion-red accent. No text, no letters, no captions.
  >
  > Create one of three matching, abstract teaching vignettes for a Just-in-Time presentation. The supplied crane is a STYLE reference only, not a subject. Transparent surrounding background. Square canvas, clean readable silhouettes, sparse detail, simplified objects, no factory panorama or clutter. The main subjects should fill most of the square with all figures and essential objects visible. Ground washes fade to transparency. All counting and arrows will be editable slide text outside the image. Do not paint numbers, labels, logos, connecting arrows or words.
  >
  > Show ONE modern factory assembler at a simplified vehicle assembly station with exactly TWO passenger-car bodies, one in the foreground and one immediately behind it in the same short production sequence. Both are at the normal stage BEFORE their road wheels are installed. Clear open wheel arches and visible hubs, no tires attached yet. This is scheduled assembly, not a broken car or repair shop. The worker points calmly to the near car's exposed hub, indicating the need for road-wheel assemblies. A small blank vermilion kanban card in the other hand represents the pull signal. The two car bodies need only enough ink contours to be unmistakably cars; keep machinery to a simple support stand. No stacks of components, no loose wheels, no extra cars or workers, no tools blocking the hub. Make the assembler and two bodies readable at thumbnail size.

- **Wheel replenishment — complete generation prompt:**

  > Japanese ink-and-wash (sumi-e) illustration on off-white paper, with a single vermilion-red accent. No text, no letters, no captions.
  >
  > Create one of three matching, abstract teaching vignettes for a Just-in-Time presentation. The supplied crane is a STYLE reference only, not a subject. Transparent surrounding background. Square canvas, clean readable silhouettes, sparse detail, simplified objects, no factory panorama or clutter. The main subjects should fill most of the square with all figures and essential objects visible. Ground washes fade to transparency. All counting and arrows will be editable slide text outside the image. Do not paint numbers, labels, logos, connecting arrows or words.
  >
  > Show ONE worker at a simple wheel-assembly bench preparing the demanded road wheels. Depict exactly EIGHT identical road-wheel assemblies in total in this vignette: ONE wheel is held upright in a simple secure assembly jig at the bench, with the worker fitting its rim and tire; the other SEVEN completed wheels stand separately and visibly on a small low ready rack, FOUR in a back row and THREE in the front row. The wheel in the jig plus the seven on the rack totals eight. All are the same size and design, black tires with simple gray rims. No loose spare tires, duplicate rims, extra wheels, piles or large inventory. A small blank vermilion pull card clipped to the bench is the only red accent. The worker responds to the signal, with readable hands outside any hazardous machinery. Keep the eight wheels easy to count, separated enough to see every circle. The drawing is a simplified conceptual quantity example, not a specific Toyota plant.

### G5. Watching the loom / watching the AI (mirrored pair, 1 of 2)

- **Status:** done — `public/watching-the-loom-watching-the-ai.png`
- **Slide:** the untitled image slide after "The loom's closed stop",
  first image (captioned "Watching the loom / watching the AI")
- **Placement:** full-bleed on that slide before its click; G6 replaces
  it on the click, so the Type G photograph (item 3) keeps its own moment
- **Generate from:** G1 as style reference. If the Claude Code terminal
  leaks outside the monitor, mask-correct only the display pixels.
- **Prompt:** A weary factory worker with a sad face, chin in hand,
  seated and forced to keep watching a power loom that runs by itself;
  the scene reflects below as a dark mirrored shadow in which the same
  slumped figure becomes a modern developer sadly watching a computer
  work by itself, the monitor showing a recognizable Claude Code
  terminal; identical posture in both halves; 16:9.

### G6. Called by the stop (mirrored pair, 2 of 2)

- **Status:** done — `public/called-by-the-stop.png`
- **Slide:** the untitled image slide after "The loom's closed stop",
  second image (captioned "Called by the stop")
- **Placement:** full-bleed on that slide, replacing G5 on the click
- **Generate from:** G5, so the pair stays consistent; G1 as style
  reference. If the Claude Code terminal leaks outside the monitor,
  mask-correct only the display pixels.
- **Why this mirror:** the closed stop summons human judgment exactly
  when it is needed — the developer arrives to an agent that halted
  itself and flagged the abnormality, and the lightbulb is the learning
  the stop makes possible
- **Prompt:** A factory worker walking happily toward a loom that has
  stopped itself, a small red flag raised where the thread broke, a
  glowing lightbulb above the worker's head; the scene reflects below
  as a dark mirrored shadow in which the same striding figure becomes
  a developer walking eagerly toward a computer whose recognizable
  Claude Code terminal has halted at an abnormality and is awaiting
  human judgment, the same lightbulb above the developer's head;
  vermilion accent on the flags and lightbulbs; 16:9.

### G7. Smart → dumb → gone

- **Status:** done — `public/smart-dumb-gone.png`
- **Slide:** "Smart → dumb → gone"
- **Replaced:** 2026-10-02, using the built-in image generation tool.
  The previous descending-steps artwork and its prompt are recoverable
  at Git revision `12b8ca3`. The owner rejected its unexplained red line.
- **Placement:** the main body, a transparent three-scene panorama.
  Only three brief bilingual captions sit below it. The loom still,
  photograph, and animation now have their own follow-up slide.
- **Meaning:** a craftsperson spends judgment in design; a keyed joint
  embodies a simple yes/no check; a one-piece bracket removes the joint
  and its assembly question. The needed bracket function remains.
  This is an original conceptual illustration, not a Toyota artifact.
- **Reference:** G1 is the style reference only.
- **Initial generation prompt (complete):**

  > Japanese ink-and-wash (sumi-e) illustration on off-white paper, with a single vermilion-red accent. No text, no letters, no captions.
  > Use case: illustration-story.
  > Asset: a wide, quiet three-stage visual for a presentation about spending judgment in design, encoding it in a simple mechanism, then eliminating an unnecessary part. New artwork; reference image 1 is only the ink-and-wash style reference.
  > Make three equally spaced scenes from left to right, on the same baseline, with generous clear gaps. Wide 3:1 composition. Transparent surrounding background, with paper-colored washes only within the painted subjects. No decorative scenery, bamboo, ropes, threads, connecting lines, arrows, borders, logos or typography.
  > The SAME simple L-shaped wooden bracket is the visual anchor throughout, with matching proportions and clear large silhouettes.
  > LEFT: a thoughtful craftsperson actively designs that bracket at a small workbench. Their hands compare two possible joints beside a sheet of geometric sketches. This is creation and careful decision making, not someone watching a machine run. The paper and joint samples visibly carry the thinking.
  > MIDDLE: a large clear close-up of the completed bracket made from two wooden members. Its single keyed interlocking joint has an obvious asymmetric tongue and matching socket: the shape itself only permits the correct fit. Show the simple joint clearly, with no electronics, gears, magic intelligence, or person. A small wrong-orientation sample sits immediately above the matching socket and is visibly blocked by the shape; a small vermilion mark at that contact makes the stop clear. The main correctly assembled bracket remains easy to see. This is a physical yes-or-no check, carrying the designer's earlier decision.
  > RIGHT: the same functional L-shaped bracket carved as ONE continuous piece of wood. Smooth continuous wood grain around the corner, completely solid and seamless. No joint, connector, pin, screw, socket, extra mechanism, or person. This should visually reveal that the assembly problem has disappeared because the unnecessary joint no longer exists.
  > Keep the final two objects equally large and readable. Restrained detail; the audience must grasp the difference from a distance. Preserve natural hand-painted ink contours and subtle wash from the reference.

- **Final targeted edit prompt (complete):**

  > Edit only the middle scene of this three-stage sumi-e teaching illustration. Preserve the left craftsperson, the right one-piece bracket, the scene positions, proportions, ink-and-wash style, paper-colored washes, and transparent background exactly.
  > Remove the small unattached wooden member floating above the middle bracket and remove its red burst marks. Keep the large middle L-shaped bracket made of two members. Make its existing keyed joint especially clear: a visibly asymmetric tongue seated in the matching socket, so the geometry plainly permits only the correct orientation. Put the single small vermilion accent on the joint's actual key surface, precisely where the tongue and socket meet. No floating symbol, extra component, arrows, lines, text, or decorative marks. The middle should read as a simple self-enforcing fit check; the right remains one continuous piece without a joint. The whole illustration should feel quieter and simpler.

### G8. Andon pull (fallback only)

- **Status:** retired from the slide 2026-10-02; retained as
  `public/andon-pull.png`; generated after the
  authoritative photo search found only editorial-use Toyota media
- **Former slide:** "Stop & Fix is emergent judgment-intensive work", only if no
  authoritative photo (item 4) clears licensing
- **Prompt:** A worker's hand pulling an overhead cord above a stopped
  assembly line, nearby workers converging toward the spot; a single
  red lantern glow marks the stop; 4:3.

### G9. Same gate for everyone — torii

- **Status:** retired 2026-09-28 — slide cut in the storyline story;
  image deleted (recover from Git at `6c71a23`) — was
  `public/torii-same-gate.png`
- **Slide:** (cut) the "Same gates for 'I' and AI" section divider
- **Placement:** full-bleed section divider background
- **Prompt:** A single torii gate on a straight path; a human developer
  and a small friendly robot approach side by side, both stopped at
  the same white line before the gate, identical distance and posture;
  16:9.

### G10. Entering the AI harness

- **Status:** implemented — `public/entering-ai-harness.png`
- **Slide:** "Go-See may mean entering the AI harness"
- **Placement:** spot illustration, right half; crop the generation to
  4:3
- **Prompt:** A person holding a paper lantern steps through the
  doorway of a large humming machine whose interior is a swirling loop
  of gears and threads; the lantern light reaches only a few steps in;
  4:3.

### G11. Thin vertical slice

- **Status:** retired 2026-10-04 — the pull explanation now uses the
  Problem Decomposition film's customer example. Recover the former
  `public/thin-vertical-slice.png` from Git at `f16450a`.
- **Former slide:** "Pull, don't stockpile"
- **Placement:** spot illustration beside the pull sequence
- **Prompt:** A many-layered cake with one thin full-height slice
  lifted out on a small plate held by a hand; the rest of the cake
  intact; a short queue of empty plates waits nearby; square.

### G12. Green light on a stockpile

- **Status:** restored 2026-10-04 — `public/green-light-stockpile.png`,
  recovered unchanged from Git at `80dfe6a`.
- **Slide:** "Continuous integration is a practice, not a system"
- **Placement:** right half; the original one-liner sits on the left.
  This standalone warning follows the two pull slides and precedes
  "Let the shared product pull collaboration".
- **Prompt:** A towering mountain of stacked crates inside a warehouse
  with a tiny traffic light glowing on its summit; a lone figure at
  the base looks up; let the single accent color be green (the light)
  instead of vermilion; 4:3.

### G25. Customer need and feedback — shared with the decomposition film

- **Status:** regenerated with built-in imagegen on 4 October 2026 in the
  deck's sumi-e style. The deck and film use byte-identical RGBA copies.
- **Slides:** "Pull: smaller customer problems" and "Freedom to choose again"
- **Deck assets:** `public/pull-customer-need.png` and
  `public/pull-customer-feedback.png`.
- **Original assets:** `terry-moves/public/assets/problem-decomposition/dinner.png`
  and `terry-moves/public/assets/problem-decomposition/dinner-relief.png`.
- **Placement:** right half, faces fully visible, transparent surrounding
  background and fading ground wash; English
  and Japanese customer problems stay editable on the left.
- **Story:** three friends need to get home. A useful next-train result
  makes the next question concrete: does the route have stairs? Keep that
  result and reprioritize the unstarted remainder toward a step-free route.
- **Source and complete replacement prompts:** [film artwork](../../Problem%20Decomposition/artwork.md#shared-tps-replacements-4-october-2026).
  The cover crane is the style reference. The film's three adult friends keep
  their identities. Small pictorial thoughts make the customer problems visible:
  the train is the first red focus, then a possible accessible route is the next.
  A train pictogram on the phone represents a delivered result. These are
  conceptual customer scenes, not Toyota history.

### G13. Pit-stop changeover (SMED)

- **Status:** implemented — `public/pit-stop-changeover.png`
- **Slide:** "Continuous improvement towards perfection"
- **Placement:** wide strip under the two bullets
- **Prompt:** A pit-stop scene: a small race car paused while four crew
  figures swap a wheel in choreographed motion, tools laid ready on a
  cart; conveys a changeover measured in seconds; 16:9 wide.

### G14. Closing — the crane aloft

- **Status:** done — `public/closing-crane-aloft.png`
- **Slide:** the closing quote ("Encode the known…")
- **Placement:** full-bleed background; companion piece to G1 so the
  deck visually returns to its theme
- **Style reference:** G1 (`public/cover-crane-released.png`) — required,
  not optional
- **Prompt:** The same red-crowned crane from the cover now high in the
  sky, wings fully extended, the open palm far below and small; large
  empty space for a quotation; 16:9.

### G16. Tension loop — honest CI and disposable prototypes

- **Status:** done — `public/tension-loop.png`
- **Slide:** "Tensions and honest limits"
- **Placement:** wide strip under the bullet list; the first bullet
  supplies the two labels (Honest CI / disposable prototypes) — never
  in the image
- **Why generated:** the tension is conceptual — one endless band whose
  two lobes have opposite characters says "both, forever, in the same
  system" without argument text
- **Prompt:** A single continuous ribbon forming a wide horizontal
  infinity loop. The left lobe is tightly woven, solid and even, like
  load-bearing cloth; the right lobe frays into loose, provisional,
  sketchy strokes shedding small scraps of crumpled paper that drift
  downward and fade. The ribbon stays one unbroken band through both
  characters; vermilion accent at the central crossing point; 16:9
  wide strip.

### G17. Switching-cost stack

- **Status:** retired 2026-09-28 — slide cut in the storyline story;
  image deleted (recover from Git at `6c71a23`) — was
  `public/switching-cost-stack.png`
- **Slide:** (cut) "Lower the switching cost"
- **Placement:** wide strip under the three bullets (same footprint as
  G13 / G16: 16:9 wide)
- **Exception:** the common style prefix says “No text, no letters, no
  captions.” The owner asked for labels **in the picture**. This item
  overrides that rule.
- **Why generated:** the argument is a stack of readiness that cheapens
  switching cost; a still building with named storeys is the claim, not
  a pit-stop analogy (that's G13 on the previous slide).
- **Prompt:** A four-storey Japanese storehouse / kura or simple
  pagoda-like building, on off-white paper, single vermilion accent. It
  must read as **one building**: a wide load-bearing **base**, then
  three receding **layers** stacked on it — not four separate boxes,
  not a flowchart, not a city skyline. Bottom to top (ground = base):
  (1) Base (widest, stone or packed-earth foundation): label **common
  repo**; (2) next storey: label **trunk-based development** — a single
  thick wooden post or trunk-like pillar through this storey (one
  history, not many branches); (3) next storey: label **one-touch env
  setup** — one hand or one latch as the vermilion accent (OTED:
  remaining setup is one motion); (4) top storey / roof: label **fast,
  deterministic e2e** — a small even lantern or taut plumb that is
  either clearly on or off, never flickering. Labels sit **on** their
  storey (painted on the beam or lintel), not in a legend beside the
  building. English, sentence case as given. No extra slogans, no
  SMED/OTED letters in the picture (slide text owns the method names).
  16:9 wide strip with empty paper left and right if needed so the
  building stays readable under bullets.
- **Accuracy notes for the worker (must survive generation):** when
  regenerating, prepend the sumi-e prefix but **drop** “No text, no
  letters, no captions.” Keep Prompt's four labels in the picture,
  large, Latin, readable, spelled exactly.

### G18. Burr puzzle (組木)

- **Status:** retired 2026-09-28 — slide cut in the storyline story;
  image deleted (recover from Git at `6c71a23`) — was
  `public/burr-puzzle.png`
- **Slide:** (cut) "But how to build one?"
- **Placement:** right half / 4:3
- **Why:** a Burr puzzle (組木 / kumiki) looks like a finished object
  but still needs the sequence in someone's head — judgment-loaded
  output that can be mistaken for done
- **Prompt:** a classic six-piece wooden burr puzzle (Japanese 組木 /
  kumiki): interlocking sticks assembled far enough to look complete,
  one key piece withdrawn a little as the vermilion accent so remaining
  judgment is visible; no text; 4:3

### G19. Shared product pulls collaboration (ukiyo-e panorama)

- **Status:** retouched 2026-10-03 with the built-in image tool —
  transparent artwork at `public/integration-coordination.png`
- **Slide:** "Let the shared product pull collaboration"
- **Placement:** dominant wide panorama under the title; true alpha
  background. The example and fuller explanation are in speaker notes.
  One short bilingual footer carries the message: "Integrate continuously.
  Collaborate just in time." Two small native SVG arrows connect the
  conflict and collaboration, leaving the artwork free of long labels.
- **Exception (medium):** the common prefix is sumi-e ink-wash. The
  owner asked for **浮世絵** (ukiyo-e woodblock). This item **replaces**
  the medium: bold black outlines, flat color fields, a limited
  palette, on off-white paper. Keep the deck's vermilion accent. Do
  **not** prepend the sumi-e prefix. Do **not** pass G1 as a style
  reference — it would pull the scene back into wash.
- **Exception (text):** retain only **A B** and **A C** on the shared
  trunk. The original customer callouts and long arrow captions were
  removed in the 2026-10-03 simplification. One lantern with light rays
  and wind curls represents the customer's two needs for the same product.
- **Why generated:** Claim 8's overlap — continuous integration pulls
  the right people; their coordination results in integration — is a
  spatial story the bullets cannot show. Two small feature teams pull
  from one customer, collide on one trunk, then coordinate by
  themselves into one cohesive product. No manager in the picture.
- **Original generation prompt (archived; the retouch prompts below
  supersede the background, framing, captions and arrows):** A single
  panoramic 浮世絵 (ukiyo-e woodblock print),
  three times as wide as it is tall (3:1), on off-white paper. One
  continuous Edo-style workshop scene reading left to right — not
  four boxed comic panels, not a flowchart, not a git graph with many
  branches.

  Four zones in one print:

  (1) **Far left — the customer.** A patron facing the workshop
  expresses two desired outcomes for **one eventual product**, not
  two solution parts for separate teams: one lantern that is
  **bright** and **wind resistant**. Show one lantern in a single
  thought/request area with the two callouts **needs a lantern that
  is bright** and **needs the same lantern to be wind resistant**.
  This is the source of pull, not a manager directing work.

  (2) **Middle left — two teams on one trunk.** One workshop split by
  a single horizontal wooden trunk-beam (one shared mainline).
  **Above the beam:** a two-person pair at one desk, pair-programming
  with a small mechanical companion (the AI) and a whiteboard of
  abstract marks beside them — exactly two people plus the companion,
  no readable letters on the board. **Below the beam:** three people
  in a mob around one shared desk — exactly three people, one screen.
  Across the five humans, include one or two women and visibly varied
  ages, including at least one older person.

  Show two separate integrations in clear temporal order along the
  trunk. First, a short arrow from the upper pair lands at an earlier,
  left-hand integration point marked **A B**; this first **A** and
  **B** are both ordinary ink-black. Later and farther right, a short
  arrow from the lower mob lands at a second integration point marked
  **A C**. This second **A** is vermilion-red because it conflicts
  with the already-integrated black A; **C** remains ink-black. Put a
  small vermilion-red **×** on the lower team's push arrow to make the
  conflict visible. No lower-team arrow points to the first A. Latin
  capitals, large, readable. Vermilion is reserved for the later,
  conflicting A and the × that marks that same conflict.

  (3) **Middle right — self-coordination.** The same five people (the
  pair and the mob, no extra coordinator) gathered by themselves
  around one shared plan, working out one lantern design that is both
  bright and wind resistant while staying simple and cohesive. Keep
  the same one or two women and varied ages visible; do not replace
  or add people. The AI companion may remain with them but is not a
  sixth human. Informal, face to face, no dais, no supervisor.

  (4) **Far right — the product.** The simple, classic thing they are
  building: one well-proportioned classic lantern that is visibly
  bright and wind resistant, with one cohesive design — not two
  solution parts or styles bolted together. Empty paper around it so
  it reads as the result.

  Two labeled arrows arc **over and under** the middle zones, from
  the trunk-conflict (middle left) to the gathering (middle right):
  an **upper** arrow arching above the two teams, labeled
  **integration pulls collaboration**; a **lower** arrow arching
  below, labeled **coordination results in immediate integration**.
  With the customer as the left tip and the product as the right tip,
  the arcs make the whole print read as one **rounded diamond**
  (lens): narrow at both ends, widest in the middle. English,
  sentence case as given. No other slogans, no kanji, no logos, no
  CI-server boxes.
- **Original generation accuracy notes (archived):** when
  regenerating, do **not** prepend the sumi-e prefix. Keep Prompt's
  labels large, Latin, readable, and spelled exactly. The customer's
  two needs belong to the same lantern, never separate components or
  team assignments. Counts: one customer; pair zone = two humans +
  one AI companion; mob = three humans; gathering = those same five
  humans, nobody added. Across those five, show one or two women and
  at least one older person, and preserve their identities in the
  gathering.

  The trunk is one horizontal beam between the two teams. Sequence
  left to right: **upper team → black A B integrated first → lower
  team later pushes A C → conflict at the second, red A → collaboration
  is pulled**. The first A and B are black. The lower arrow points
  only to the later A C; the later A and a small × on that arrow are
  vermilion, while C is black. The two A's are separate in time and
  position; they do not coincide. No manager. The right-hand product
  is one cohesive lantern satisfying both outcomes. The labeled
  arrows arc above and below the middle zones — never squeezed into
  the horizontal gap — so the print keeps its rounded-diamond
  silhouette. If the tool cannot emit 3:1, generate 16:9 with the
  diamond as a wide strip and empty paper above and below, then crop
  to 3:1.

---

+
- **2026-10-03 retouch prompt — background extraction and simplification:**

  Retouch the supplied ukiyo-e panorama for an elegant presentation slide. Preserve its distinctive Edo workshop woodblock style, characters, black outlines, muted indigo and warm natural wood colors, and one vermilion conflict accent. Make the background genuinely transparent (alpha), including the empty spaces around and between subjects: no paper texture, no beige rectangle, no backdrop, no opaque white ground. Keep the objects filled; don't make faces or clothes transparent.

  This is the main illustration on a slide titled "Let the shared product pull collaboration". Tell one clear visual story, reading left to right: a customer wants one bright, wind-resistant lantern; two small teams change one shared product; their integrations expose a conflict; the relevant people meet directly to resolve it; one coherent lantern emerges. No manager.

  Keep a wide continuous composition approximately 2.6:1, with generous empty transparent space, no boxes or panels. Simplify distracting fine details, decorative hatching and paper grain, while preserving the beautiful woodblock craft and clear silhouettes.

  Left tip: one customer with one small thought bubble. In that bubble show ONLY ONE lantern, rays of light and wind curls around its enclosure, to show both needs belong to the same lantern. Remove all words from the bubble.

  Middle left: above one horizontal wooden shared-mainline beam, exactly two people working at one laptop with one small friendly AI companion. Below the beam, exactly three people working at one shared screen. Include the varied ages and one or two women from the reference. Show the two integrations in temporal order along the same beam: earlier 'A B' in ink-black; later 'A C' with ONLY the later conflicting A in vermilion, C black. One short black arrow from the upper team to the earlier A B. One short black arrow from the lower team toward later A C, clearly stopped by a strong small vermilion X. These are the ONLY letters in the whole image. No detailed computer text.

  Middle right: exactly the same five humans, gathered informally around one simple shared lantern drawing, with the AI companion. Correct the extra sixth human in the supplied gathering. Make faces and hands distinct enough to understand that the relevant teams are now talking directly. The drawing shows one lamp combining brightness and protection from wind. No manager, no supervisor, no extra person.

  Right tip: one elegant single cohesive lantern with protective enclosure, bright light rays and a few wind curls around the outside. It is a completed whole product, not separate components bolted together. Give it a little breathing room.

  Replace the reference's huge outer oval arrows and all long arrow labels with two much smaller clean curved arrows confined to the center of the composition: one curves from the red integration conflict toward the five-person gathering; one curves back from that gathering to the shared beam, showing collaboration leads to integration. Their endpoints must visibly connect these two locations, not the customer. Keep arrows ink-black and secondary to the people and product. The wooden mainline still continues toward the finished lantern.

  No long text, no slogans, no captions, no kanji, no logos. Absolutely remove 'integration pulls collaboration', 'coordination results in immediate integration', and all customer-need words. Crop close enough that the workshop scene occupies the canvas well, with a modest transparent safety margin. True transparent PNG.

- **2026-10-03 final refinement prompt — precise object edit:**

  Refine this transparent ukiyo-e workshop panorama with two precise corrections. Keep the same aspect ratio, canvas, customer with one lantern bubble, upper two-person team and AI, lower three-person team, wooden beam with black A B then red A and black C, red X on the lower push, final glowing wind-resistant lantern, colors and beautiful woodblock illustration. Preserve genuine alpha transparency everywhere outside subjects.

  1. At the RIGHT-HAND GATHERING ONLY there are six humans. Remove the extra seated person seen from behind in the bottom-left foreground of that gathering: the black head and gray/brown striped robe immediately in front of the woman in a white floral kimono. Remove that person's body completely and leave that space transparent. Keep exactly these five humans gathered around the single shared lantern sketch: two people from the upper team (indigo woman at upper left, older man at upper right), and the three from the lower team (white floral woman on the left, dark indigo man on the lower right, gray-haired older man on the far right). Move the lantern sketch gently left/down as necessary so all five can reach it. No new humans.

  2. Remove ONLY the two long curved loop arrows around the gathering/conflict. Remove the thin upper arc above the AI, and the thin lower arc from the gathering back to the beam. We will typeset clear loop arrows separately on the slide. Keep both short arrows from each team to the wooden beam, and the red X. Keep the broad wooden beam arrow continuing left to right.

  Do not add text or labels. No letters apart from the existing A B and A C. Do not add a paper background, gradient, vignette, shadow rectangle or white matte. True transparent PNG.

- **Selected generated file:**
  `/Users/terryyin/.codex/generated_images/01a0faef-d3e4-73e1-b082-5f5307e77aa7/exec-2c41e45a-bcaf-42e8-b5b0-fbb125e277b6.png`.
  Copied into the existing project asset. RGBA, 2022 × 778; alpha spans
  0–255. The gathering contains exactly the same five humans as the two
  teams; the AI is their companion. The loop arrows are native slide SVG:
  red from conflict to collaboration, stone from collaboration to the beam.

---

## Build in-slide (diagrams and icons, not AI art)

In-slide diagrams keep the generated-art anchors, translated for
crisp type: paper `#ece6dc`, ink nodes `#292524` / `#fffaf3`, stone
strokes `#78716c`, vermilion `#b33a2b` for the verbs (triad edge
words, CLD polarity labels, one destination/injection node). Mermaid
cannot take theme CSS (it renders in a shadow root); this deck's
`setup/mermaid.ts` is the seam. Do not use Mermaid's default
lavender/purple, and do not ask Mermaid for brushwork (`look:
handDrawn` is a different medium). If the argument is *spatial*
(a triangle, a true causal-loop shape), draw SVG like the triad —
Mermaid only auto-places.

- **"Two houses, different layers"** (left column): original English
  SVG of the commonly taught TPS house. Item 1 above is the source
  trail; labels stay typeset text. The Larman & Vodde house on the
  right stays the sourced figure.
- **"One lineage of inspiration":** simple flow diagram
  TPS → XP / Agile → LeSS → AI-augmented development. Mermaid or SVG;
  needs crisp text. Done — embedded as Mermaid; labels stay typeset
  text. Vermilion accent on the last node (where we are now).
- **"The engine of freedom and trust"** (after the JIT-flow beat):
  Figure 1 of the Claim 22 companion CLD — loops R1+R2, five
  plain-language variables. Done — embedded as mermaid; labels stay
  typeset text. Room to learn and freedom to follow real need use the
  vermilion accent; learning and earned-confidence links show their delays.
  Jidoka/autonomation and Just-in-time label the endpoints, with a direct
  safeguards-to-confidence link and the level balance (G20) below the CLD.
  Optional polish: click-reveal walk of the loop.
- **"AI speeds whichever loop you feed"** (early, after judgment-intensive work):
  Figure 2 of the companion CLD — the reinforcing pressure trap,
  four variables. Done — embedded as mermaid with plain-language labels:
  pressure for more AI solutions adds artifacts requiring judgment,
  raises effort for people and AI, slows problem solving, and feeds pressure.
  Vermilion accent on pressure to ask AI for more solutions.
- **"The triad":** triangle of Jidoka / JIT / Respect for
  People with the frees / entrusts / grows verbs on the edges. Done —
  embedded as inline SVG; labels stay typeset text.
- **"Build the stop into the software":** original inline SVG of one
  human- or AI-authored change passing through the same executable checks.
  Pass continues; fail calls Stop & Fix. A return arrow captures learning
  in the checks. Vermilion identifies the failed branch and its response;
  routine flow and learning use stone. Detailed examples stay in notes.
- **"The loom's closed stop":** done —
  `public/jidoka-human-radical.svg`. Large 自働化 lettering with only
  亻, the person radical (にんべん / ninben) inside 働, in vermilion.
  The complete kanji outlines come from Hiragino Mincho ProN W6;
  the radical is its own original contour, recolored without moving
  or replacing strokes. All three main characters are paths, so font
  substitution cannot alter the artwork. A small leader identifies
  the radical as a person. This is vector lettering, not generated
  Japanese text. The slide explicitly names Jidoka / Autonomation
  and gives Toyota's meaning, automation with a human touch.
  Toyota's [plant tour](https://global.toyota/en/company/plant-tours/production-system/)
  supplies the mother-weaving origin story;
  [The Birth of Jidoka](https://www.toyota-global.com/company/history_of_toyota/75years/text/taking_on_the_automotive_business/chapter1/section1/item4.html)
  connects the stopping devices to jidoka. The photograph remains
  the real Type G artifact from item 3 above.


## Slides intentionally without artwork

The diagnostic question ("How do you know…"), the main-message quote,
"Jidoka preserves knowledge", "Respect for People: making things
means making people", and "Takeaways". The stark, text-only look serves the "small
collection of memorable points" goal; the quote slides in particular
should not compete with their own words.

---

## Addendum — how the loom's jidoka mechanism works

A follow-up slide, "Dumb: the rule becomes a stop", after G7's
conceptual example: show the actual Type G stop mechanism, because the
mechanism *is* the argument — people learned which abnormality must
stop production, then a closed physical mechanism preserved that
judgment through gravity and a falling piece of metal. The Type G is
the example here; Toyota documents warp halting on its 1905 power
loom already, so do not date the origin of this judgment to 1924.

### The mechanism, researched

A warp thread supports a thin metal **dropper**. A break releases it
to fall into an oscillating detection bar's path below. Obstructing
the bar activates the stopping mechanism. This is the sequence
confirmed by the museum; A1 should expose it in a simplified cutaway.
The stop prevents continued defective weaving. Do not promise zero
defective picks or an exact stopping time from these sources.

The detection is mechanical, using gravity and the loom's motion;
the loom itself is powered. Do not describe the whole machine as
requiring no power. The detailed stop linkage is schematic unless
separately verified. Warp stopping, weft stopping, and non-stop
shuttle changing are separate functions; this animation explains only
the warp stop. Detection does not diagnose or repair the break.

Sources: [Toyota 75-year history, "The Birth of
Jidoka"](https://www.toyota-global.com/company/history_of_toyota/75years/text/taking_on_the_automotive_business/chapter1/section1/item4.html);
Toyota Commemorative Museum virtual tour — ["Warp break auto-stop
mechanism"](https://www.tcmit.org/vgt/textile/english/scene-10-iframe/target-04/)
and ["Warps and
droppers"](https://www.tcmit.org/vgt/textile/english/scene-13-iframe/target-03/);
[JSME Mechanical Engineering Heritage
No. 16](https://www.jsme.or.jp/kikaiisan/heritage_016_en.html);
[AllAboutLean, "The Toyoda Model G Loom (with
Videos)"](https://www.allaboutlean.com/toyoda-model-g/).

### 6. Dropper mechanism photo

- **Status:** done — `public/type-g-dropper-mechanism.jpg`
- **Slide:** "Dumb: the rule becomes a stop"
- **Placement:** right-side inset, as the real
  artifact anchoring G15's illustration
- **Source:** Christoph Roser's ["Toyoda Model G Automatic Loom Detail
  Warp Break Stop"](https://www.allaboutlean.com/jidoka-3/model-g-warp-break-stop/)
  photograph from AllAboutLean's [Model G
  post](https://www.allaboutlean.com/toyoda-model-g/); the attachment
  page identifies Roser as the creator and explicitly licenses this
  file under [CC-BY-SA
  4.0](https://creativecommons.org/licenses/by-sa/4.0/), attributed
  on-slide
- **Checked and ruled out:** Wikimedia Commons has only whole-machine
  Type G photos (no mechanism close-up); the museum's own animations
  and virtual-tour media are copyrighted; Sakichi's public-domain
  patent drawings show full looms, unreadable at slide size.
- **Limit:** a photo shows the parts but not the falling action, and
  the action carries the argument — hence G15, and A1 as a candidate
  to replace G15.

### G15. Loom jidoka mechanism — live judgment, closed mechanism

- **Status:** done — `public/loom-jidoka-mechanism.png`.
- **Slide:** "Dumb: the rule becomes a stop"
- **Placement:** large initial before/after view, occupying two thirds
  of the slide width. One click replaces it with A1 in the same footprint.
  The right column keeps the real photograph and two short binary labels.
- **Why generated:** no free-licensed explanatory diagram exists, and
  only an illustration can show the before/after action
- **Prompt:** Two-panel before-and-after of a loom's warp stop, side
  by side. Left panel, running: a row of taut vertical threads, each
  holding up a small thin rectangular metal plate at the same height;
  beneath the plates a horizontal bar mid-sweep, its motion implied
  by loose strokes; cloth forming below. Right panel, stopped: one
  thread hangs slack and broken, its plate fallen a short distance
  and jammed against the now-halted bar; every other plate still
  raised; all motion gone. Vermilion accent only on the fallen plate;
  16:9 wide strip.
- **Accuracy notes for the worker (must survive generation):** the
  plates hang *on* the threads and tension holds them up; exactly one
  plate falls, and it falls only a few centimeters; the bar is
  *blocked by* the fallen plate, not struck by it; nothing electrical
  anywhere in the scene. If the generator cannot keep the two panels
  mechanically consistent, generate the two panels separately and
  compose in the slide. A1's revised brief below is authoritative for
  the animation; this describes the existing still.

### A1. Loom warp-stop animation

- **Status:** regenerated 2026-09-08 — `public/loom-warp-stop.mp4`.
  Silent 11-second loop, 1280×720 at 30 fps; revised sequence checked
  frame by frame. Moved to the larger follow-up layout on 2026-10-02.
- **Slide:** "Dumb: the rule becomes a stop"
- **Placement:** one click replaces G15 with this animation, occupying
  two thirds of the slide width. The same geometry stays in place.
  Explanation belongs in the short side captions or narration, never
  inside the clip.
- **Context and purpose:** the audience has heard "Jidoka preserves
  knowledge," seen "The loom's closed stop," compared watching a
  loom with watching AI, and seen "Called by the stop." The next
  question is how such a stop is built. A1 answers by making the
  physical cause of the stop legible. The takeaway is **earlier human
  judgment becomes an enforced stop, freeing attention for the next
  problem**. This supports the talk's freedom-and-trust theme.
- **Story boundary:** this demonstrates **dumb / judgment-preserved**.
  The break still happens; the mechanism stops work without asking
  someone to interpret a warning. Diagnosis, repair, and improvement
  remain work for people. **Gone / judgment-removed** would require
  preventing the failure; do not portray the dropper as doing that.
  In software, the corresponding move is a closed assertion or
  invariant whose failure actually blocks progress. The clip stays
  with the loom; the presenter makes that connection.
- **Context anchors:** [main theme](../../TPS%20and%20AI/main-theme-and-stage-setting.md),
  [Claim 6 — learned judgment](../../TPS%20and%20AI/claims/06-jidoka-embeds-routine-judgment.md),
  and [Claim 10 — freedom and trust](../../TPS%20and%20AI/claims/10-freedom-and-trust-reinforce-through-jidoka.md).
- **References:** use G1 (`public/cover-crane-released.png`) for
  style and item 6 (`public/type-g-dropper-mechanism.jpg`) for physical
  orientation. G15 is a continuity reference, not authority for the
  geometry. The museum's [warp-stop explanation](https://www.tcmit.org/vgt/textile/english/scene-10-iframe/target-04/)
  establishes the causal sequence; Toyota's [history](https://www.toyota-global.com/company/history_of_toyota/75years/text/taking_on_the_automotive_business/chapter1/section1/item4.html)
  establishes freedom from constant watching; [JSME's Type G account](https://www.jsme.or.jp/kikaiisan/heritage_016_en.html)
  distinguishes stopping from shuttle replenishment. Sources checked
  2026-09-08. Create an original illustration, not a copy of museum
  animation frames.
- **Generation prompt (complete; includes the common prefix):**

  > Japanese ink-and-wash (sumi-e) illustration on off-white paper,
  > with a single vermilion-red accent. No text, no letters, no
  > captions. Create a silent 16:9 instructional animation of the
  > Toyoda loom's mechanical warp stop. Use one stable cutaway view,
  > with a small representative group of warp threads and hanging
  > metal droppers, the detection bar below, and a simplified visible
  > connection to the loom's stopping mechanism. Keep the important
  > contacts large enough to follow in a slide's lower strip. Show
  > ink strokes and wash, not a CAD rendering.
  >
  > Establish normal operation: taut warps support the droppers clear
  > of the oscillating bar. One warp visibly snaps; its dropper loses
  > support and falls into the bar's path. The bar's next movement is
  > obstructed, activating the connected stop; the loom's weaving
  > motion ceases. Make those events readable in that order. The
  > dropper is a detector, not a brake absorbing the loom's momentum.
  > Add vermilion only to the fallen dropper, after it falls. Hold on
  > the broken thread and stopped mechanism. Nobody pulls a lever or
  > decides whether to stop. Nothing repairs itself. After the hold,
  > fade through blank paper before replaying the intact starting
  > scene, clearly separating replay from a restart of the machine.
- **Timing and production:** build in `terry-moves` with separately
  controllable parts. Aim for roughly 10–12 seconds: establish motion
  for 3 seconds, show the break-to-stop sequence in instructional
  slow motion over 2–3 seconds, hold for 4 seconds, then reset through
  paper. These are presentation timings, not measured machine timing.
  Preserve the drawing and camera across the sequence; do not morph
  between unrelated generated frames. Deliver a silent looping MP4
  at `public/loom-warp-stop.mp4`.
- **Rebuild command (from the repository root):**

  ```sh
  pnpm -C terry-moves exec remotion render src/index.ts StoryLoomWarpStop ../slides/tps-and-ai/public/loom-warp-stop.mp4 --codec=h264 --concurrency=2 --muted
  ```

- **Review before replacement:** at the actual slide size, a viewer
  must be able to follow break → fall → obstruction → stop. Exactly
  one dropper falls a short distance; retain the broken yarn ends and
  the other supported droppers. Do not stop the bar before contact,
  pass it through the plate, or show continued weaving after the stop.
  Do not import G15's vertical-thread layout if it misrepresents the
  real warp orientation. Omit invented precision in linkage geometry,
  electrics, warning lamps, AI imagery, weft forks, and shuttle changes.
- **Presenter's bridge (not rendered):** "We already learned that a
  broken warp must stop the loom. Here that judgment lives in the
  mechanism. It does not know why the thread broke. It stops, so a
  person can attend to the exception instead of watching every thread.
  Our software checks should preserve learned judgment the same way."
