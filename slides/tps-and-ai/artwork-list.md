# Artwork list — Freedom and Entrustment

Art needed for `slides.md`, oriented by
`TPS and AI/main-theme-and-stage-setting.md`. Slides are referenced by
title only — never by page number — so the list survives inserting or
reordering slides.

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
- **Placement:** large, right half of the slide; the founding jidoka
  artifact deserves a real photograph, not an illustration
- **Source:** [Daderot, "Toyoda Automatic Loom - National Museum of
  Nature and Science, Tokyo - DSC07343.JPG"](https://commons.wikimedia.org/wiki/File:Toyoda_Automatic_Loom_-_National_Museum_of_Nature_and_Science,_Tokyo_-_DSC07343.JPG),
  own work, photographed at the National Museum of Nature and Science,
  Tokyo
- **License:** [CC0 1.0 Universal Public Domain
  Dedication](https://creativecommons.org/publicdomain/zero/1.0/)

### 4. Andon cord / andon board photograph

- **Status:** implemented via generated fallback — `public/andon-pull.png`
- **Slide:** "Stop & Fix"
- **Placement:** right half, behind or beside the bullet list
- **Source/license check:** Toyota USA Newsroom's authentic
  [2018 TMMTX VC 05 andon exhibit
  photo](https://pressroom.toyota.com/album/2018-toyota-motor-manufacturing-texas-tmmtx/)
  is restricted to editorial use by its [Terms &
  Agreements](https://pressroom.toyota.com/terms-agreements/). Toyota
  UK's andon explanation and factory images are likewise
  [copyright-free for editorial purposes
  only](https://media.toyota.co.uk/toyota-auris-hybrid-production-quality-first-and-foremost/).
  No clearly reusable official photo was found, so G8 was generated and
  identified as AI-generated on-slide.

### 5. Own assets — do not add

- **About me:** Lizard logo skipped by owner decision.
- Cover and "Thank you": the theme already watermarks every slide
  (`themes/odd-e/images/odd-e-logo.png`). Do not generate or paste a
  second logo.

---

## Generate (AI)

### G1. Cover — crane released from an open hand

- **Status:** done — `public/cover-crane-released.png`
- **Slide:** cover, "Freedom and Entrustment"
- **Placement:** full-bleed background, art weighted right, title text
  sits in the empty left space
- **Why generated:** the title pair (freedom + entrustment) has no
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
- **Slide:** "Freedom vs. entrustment?"
- **Placement:** lower half; the kanji pair 任せる / 信頼 stays typeset
  in the slide above the art, never generated
- **Prompt:** An antique two-pan balance scale, one pan holding a
  single feather high in the air, the other sunk low under a heavy
  iron key; centered, ample empty margin above; 16:9 lower band.

### G5. Watching the loom / watching the AI (mirrored pair, 1 of 2)

- **Status:** done — `public/watching-the-loom-watching-the-ai.png`
- **Slide:** first follow-on after "The loom's closed stop"
- **Placement:** first of two separate follow-on slides; G6 follows as
  the second, so the Type G photograph (item 3) keeps its own moment
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
- **Slide:** second follow-on after "The loom's closed stop"
- **Placement:** second of two separate follow-on slides, after G5
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
- **Placement:** wide strip under the three-step list; slide text
  supplies the labels
- **Prompt:** Three descending stone steps left to right: on the top
  step a person examines a taut thread with a magnifier; on the middle
  step a simple mechanical latch clamps the same thread; the bottom
  step is empty and clean, the thread passing smoothly with nothing
  attending it; 16:9 wide strip.

### G8. Andon pull (fallback only)

- **Status:** done — `public/andon-pull.png`; generated after the
  authoritative photo search found only editorial-use Toyota media
- **Slide:** "Stop & Fix", only if no authoritative photo (item 4)
  clears licensing
- **Prompt:** A worker's hand pulling an overhead cord above a stopped
  assembly line, nearby workers converging toward the spot; a single
  red lantern glow marks the stop; 4:3.

### G9. Same gate for everyone — torii

- **Status:** done — `public/torii-same-gate.png`
- **Slide:** the "Same gates for 'I' and AI" section divider
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

- **Status:** implemented — `public/thin-vertical-slice.png`
- **Slide:** "Pull, don't stockpile"
- **Placement:** spot illustration beside the pull sequence
- **Prompt:** A many-layered cake with one thin full-height slice
  lifted out on a small plate held by a hand; the rest of the cake
  intact; a short queue of empty plates waits nearby; square.

### G12. Green light on a stockpile

- **Status:** implemented — `public/green-light-stockpile.png`
- **Slide:** "Continuous integration is a practice, not a system"
- **Placement:** right half; the slide's one-liner is the caption
- **Prompt:** A towering mountain of stacked crates inside a warehouse
  with a tiny traffic light glowing on its summit; a lone figure at
  the base looks up; let the single accent color be green (the light)
  instead of vermilion; 4:3.

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

- **Status:** done — `public/switching-cost-stack.png`
- **Slide:** "Lower the switching cost"
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

- **Status:** done — generated at `public/burr-puzzle.png`
- **Slide:** "But how to build one?"
- **Placement:** right half / 4:3
- **Why:** a Burr puzzle (組木 / kumiki) looks like a finished object
  but still needs the sequence in someone's head — judgment-dependent
  work that can be mistaken for done
- **Prompt:** a classic six-piece wooden burr puzzle (Japanese 組木 /
  kumiki): interlocking sticks assembled far enough to look complete,
  one key piece withdrawn a little as the vermilion accent so remaining
  judgment is visible; no text; 4:3

---

## Build in-slide (diagrams and icons, not AI art)

- **"Two houses, different layers"** (left column): original English
  SVG of the commonly taught TPS house. Item 1 above is the source
  trail; labels stay typeset text. The Larman & Vodde house on the
  right stays the sourced figure.
- **"One lineage of inspiration":** simple flow diagram
  TPS → XP / Agile → LeSS → AI-augmented development. Mermaid or SVG;
  needs crisp text. Done — embedded as Mermaid; labels stay typeset
  text.
- **"The engine of freedom and entrustment"** (after "The triad"):
  Figure 1 of the Claim 22 companion CLD — loops R1+R2, six
  variables. Done — embedded as mermaid; labels stay typeset text.
  Optional polish: click-reveal walk of the loop.
- **"AI speeds whichever loop you feed"** (follows the engine slide):
  Figure 2 of the companion CLD — loop R5 with the AI injection,
  four variables. Done — embedded as mermaid; reprises the early
  statement slide's punchline once the engine has been walked.
- **"The triad":** triangle of Jidoka / JIT / Respect for
  People with the frees / entrusts / grows verbs on the edges. Done —
  embedded as inline SVG; labels stay typeset text.
- **"Five judgments stay human":** five icons (value,
  design, credentials, undiagnosed failure, ambiguity) from the
  Iconify sets already available in Slidev — consistent with each
  other, unlike generated icons. Done — embedded as Phosphor
  `scales`, `pencil-ruler`, `key`, `warning-circle`, and `question`;
  labels stay typeset text.

## Slides intentionally without artwork

The diagnostic question ("How do you know…"), the early statement
slide ("AI can produce plausible software faster than a product group
can absorb it" — its planned loop map moved to the dedicated "AI
speeds whichever loop you feed" slide later in the deck), the "The
apparent tradeoff" and "JIT flow in LeSS" section dividers, the
main-message quote, "Jidoka preserves knowledge", "Preferred tests: E2E or unit —
nothing in between", "Let the shared product pull collaboration",
"Respect for People: making things means making people", and "Takeaways". The "Same gates" divider and "The gates do
not care who authored the change" share G9 — whichever does not take
it stays text-only. The stark, text-only look serves the "small
collection of memorable points" goal; the quote slides in particular
should not compete with their own words.

---

## Addendum — how the loom's jidoka mechanism works

A second visual beat for "Smart → dumb → gone", alongside G7's
conceptual steps: show the actual Type G stop mechanism, because the
mechanism *is* the argument — the idea was smart (per-thread
abnormality detection in 1924), the mechanism is dumb (gravity and a
falling piece of metal).

### The mechanism, researched

Each of the Type G's 2,570 warp threads carries a thin sheet-metal
plate — a **dropper** — threaded onto it; the thread's tension alone
holds the plate up. Beneath the droppers a feeler bar sweeps back and
forth with the loom's motion. When a thread breaks, tension vanishes
and the dropper falls a few centimeters into the bar's path. The
jammed bar trips the knock-off linkage, the drive disengages, and the
loom stops before a single defective pick is woven. The sensor is
gravity; the logic is a metal plate in the way of a moving bar — no
power, no electronics, no diagnosis. (The weft side uses a
three-pronged **weft fork** that feels for the thread on each pick
and trips the same knock-off when it swings through unresisted —
same principle, less visual, so the dropper is the subject here.)

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
- **Slide:** "Smart → dumb → gone"
- **Placement:** small inset beside the "Dumb" line, as the real
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

### G15. Loom jidoka mechanism — smart idea, dumb mechanism

- **Status:** done — `public/loom-jidoka-mechanism.png`. **A1 is
  intended to replace this still**; keep both until we decide which
  click-reveal to keep.
- **Slide:** "Smart → dumb → gone"
- **Placement:** click-reveal after G7's strip on the same slide, same
  wide-strip footprint so it swaps in place; slide text supplies all
  labels (dropper, feeler bar, knock-off — never in the image)
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
  compose in the slide. The same notes bind A1.

### A1. Loom warp-stop animation (candidate to replace G15)

- **Status:** done — `public/loom-warp-stop.mp4`. **Intended to replace
  G15**; keep G15 on the slide and in this list until we decide which
  to keep.
- **Slide:** "Smart → dumb → gone"
- **Placement:** same 16:9 wide-strip footprint as G7 / G15. While
  both exist, a further click-reveal after G15 so G7 → G15 → A1 can
  be compared. Slide text supplies all labels — never in the clip.
- **Why animated:** G15's two panels imply the falling action; the
  argument is the *motion* — a bar already moving, then blocked.
  Animation can show that sequence in one scene. Photo item 6 still
  cannot.
- **Style:** same sumi-e voice as generated art (prefix above). G1
  (`public/cover-crane-released.png`) is the style reference; G15 is
  the subject reference. Off-white paper; ink strokes and wash, not
  CAD; vermilion accent **only** on the fallen plate, and only once
  it has fallen. No text, letters, or captions in the picture.
- **Beats (silent, looping):** intact warps, droppers held up, feeler
  bar sweeping with motion as loose strokes; one warp breaks; that
  one plate falls a few centimetres into the bar's path; the bar is
  blocked and all motion stops. Hold the stopped frame, then loop.
- **Accuracy notes:** same as G15. One scene over time, not two
  panels. Do not draw weft fork, shuttle change, andon, or
  electrics.
