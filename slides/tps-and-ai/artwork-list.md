# Artwork list — Freedom and Entrustment

Art needed for `slides.md`, oriented by
`TPS and AI/main-theme-and-stage-setting.md`. Slides are referenced by
title only — never by page number — so the list survives inserting or
reordering slides.

Three source categories:

- **Find (authoritative)** — real artifacts where authenticity matters,
  especially with Toyota and LeSS experts in the room. Check license and
  attribute on-slide.
- **Generate (AI)** — conceptual illustrations. Prompts below.
- **Build in-slide** — diagrams and icons that need crisp, editable text;
  AI image generators garble text (and kanji especially), so these are
  SVG/mermaid/Iconify work, not AI art.

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

---

## Find from authoritative sources

### 1. Toyota's official TPS overview graphic

- **Slide:** "Two houses, different layers", left column
- **Placement:** the left column's visual anchor
- **Source:** Toyota Global website, Vision & Philosophy → Toyota
  Production System page. Must be Toyota's own graphic — the speaker
  note explicitly forbids presenting an unsourced house-shaped diagram
  as Toyota's (Claim 2). Attribute on-slide.

### 2. Larman & Vodde's Lean Thinking house

- **Slide:** "Two houses, different layers", right column
- **Placement:** the right column's visual anchor
- **Source:** less.works (Lean Thinking page) or the Larman/Vodde
  scaling books. Check reuse permission; attribute on-slide.

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

- **Slide:** "Stop & Fix"
- **Placement:** right half, behind or beside the bullet list
- **Source:** Toyota Global newsroom press photos (preferred for
  authenticity). If no licensable photo is found, fall back to the
  generated illustration in item G8 below.

### 5. Own assets

- **Slide:** "About me": Lizard logo or GitHub repo card (own
  project, own asset)
- **Slides:** cover and "Thank you" — Odd-e logo (company asset; the
  theme may already provide it — check `themes/odd-e` before adding)

---

## Generate (AI) — prompts ready, not yet generated

### G1. Cover — crane released from an open hand

- **Status:** done — `public/cover-crane-released.png`
- **Slide:** cover, "Freedom and Entrustment"
- **Placement:** full-bleed background, art weighted right, title text
  sits in the empty left space
- **Why generated:** the title pair (freedom + entrustment) has no
  single authoritative artifact; a released crane carries both
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

- **Slide:** "Stop & Fix", only if no authoritative photo (item 4)
  clears licensing
- **Prompt:** A worker's hand pulling an overhead cord above a stopped
  assembly line, nearby workers converging toward the spot; a single
  red lantern glow marks the stop; 4:3.

### G9. Same gate for everyone — torii

- **Slide:** the "Same gates for 'I' and AI" section divider, or
  "The gates do not care who authored the change"
- **Placement:** section divider background, or right half of the
  gates slide
- **Prompt:** A single torii gate on a straight path; a human developer
  and a small friendly robot approach side by side, both stopped at
  the same white line before the gate, identical distance and posture;
  16:9.

### G10. Entering the AI harness

- **Slide:** "Go-See may mean entering the AI harness"
- **Placement:** spot illustration, right half
- **Prompt:** A person holding a paper lantern steps through the
  doorway of a large humming machine whose interior is a swirling loop
  of gears and threads; the lantern light reaches only a few steps in;
  4:3.

### G11. Thin vertical slice

- **Slide:** "Pull, don't stockpile"
- **Placement:** spot illustration beside the pull sequence
- **Prompt:** A many-layered cake with one thin full-height slice
  lifted out on a small plate held by a hand; the rest of the cake
  intact; a short queue of empty plates waits nearby; square.

### G12. Green light on a stockpile

- **Slide:** "Continuous integration is a practice, not a system"
- **Placement:** right half; the slide's one-liner is the caption
- **Prompt:** A towering mountain of stacked crates inside a warehouse
  with a tiny traffic light glowing on its summit; a lone figure at
  the base looks up; let the single accent color be green (the light)
  instead of vermilion; 4:3.

### G13. Pit-stop changeover (SMED)

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
- **Prompt:** The same red-crowned crane from the cover now high in the
  sky, wings fully extended, the open palm far below and small; large
  empty space for a quotation; 16:9.

---

## Build in-slide (diagrams and icons, not AI art)

- **"One lineage of inspiration":** simple flow diagram
  TPS → XP / Agile → LeSS → AI-augmented development. Mermaid or SVG;
  needs crisp text.
- **"The engine of freedom and entrustment"** (after "The triad"):
  Figure 1 of the Claim 22 companion CLD — loops R1+R2, six
  variables. Done — embedded as mermaid; labels stay typeset text.
  Optional polish: click-reveal walk of the loop.
- **"AI speeds whichever loop you feed"** (follows the engine slide):
  Figure 2 of the companion CLD — loop R5 with the AI injection,
  four variables. Done — embedded as mermaid; reprises the early
  statement slide's punchline once the engine has been walked.
- **"The triad":** triangle of Jidoka / JIT / Respect for
  People with the frees / entrusts / grows verbs on the edges. SVG.
- **"Five judgments stay human":** five icons (value,
  design, credentials, undiagnosed failure, ambiguity) from the
  Iconify sets already available in Slidev — consistent with each
  other, unlike generated icons.

## Slides intentionally without artwork

The diagnostic question ("How do you know…"), the early statement
slide ("AI can produce plausible software faster than a product group
can absorb it" — its planned loop map moved to the dedicated "AI
speeds whichever loop you feed" slide later in the deck), the "The
apparent tradeoff" and "JIT flow in LeSS" section dividers, the
main-message quote, "Jidoka preserves knowledge", "Preferred tests: E2E or unit —
nothing in between", "Let the shared product pull collaboration",
"Respect for People: grow people who can think", "Tensions and honest
limits", and "Takeaways". The "Same gates" divider and "The gates do
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

### 6. Dropper mechanism photo (find — checked, viable but limited)

- **Slide:** "Smart → dumb → gone"
- **Placement:** small inset beside the "Dumb" line, as the real
  artifact anchoring G15's illustration
- **Source:** AllAboutLean's Model G post (link above) photographs the
  museum's demonstration model — droppers hanging on warps. Roser's
  own images are CC-BY-SA 4.0 per his [permission
  page](https://www.allaboutlean.com/permission-for-images/); verify
  the license on the specific image's attachment page and attribute
  on-slide: "By Christoph Roser at AllAboutLean.com under the free
  CC-BY-SA 4.0 license", with links to the post and license.
- **Checked and ruled out:** Wikimedia Commons has only whole-machine
  Type G photos (no mechanism close-up); the museum's own animations
  and virtual-tour media are copyrighted; Sakichi's public-domain
  patent drawings show full looms, unreadable at slide size.
- **Limit:** a photo shows the parts but not the falling action, and
  the action carries the argument — hence G15.

### G15. Loom jidoka mechanism — smart idea, dumb mechanism

- **Status:** not yet generated — instruction ready, worker to pick up
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
  compose in the slide.
