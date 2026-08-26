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

- **Slide:** "The loom's closed stop"
- **Placement:** large, right half of the slide; the founding jidoka
  artifact deserves a real photograph, not an illustration
- **Source:** Wikimedia Commons ("Toyoda automatic loom, Type G") or
  the Toyota Commemorative Museum of Industry and Technology. Verify
  license; attribute.

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

- **Slide:** "釈迦に説法"
- **Placement:** spot illustration, right side
- **Prompt:** A tiny enthusiastic figure gesturing mid-lecture at the
  foot of a large serene seated Buddha who listens with a gentle,
  amused smile; affectionate humor, not mockery; square composition.

### G3. Constrained by what they built

- **Slide:** "Constrained by what they built"
- **Placement:** spot illustration, right half
- **Prompt:** Three small figures tethered by threads to a towering,
  teetering stack of identical crates leaning over them; they look
  toward a small bright doorway ahead that they cannot walk to; 4:3.

### G4. The apparent tradeoff — tilted balance

- **Slide:** "Freedom vs. entrustment?"
- **Placement:** lower half; the kanji pair 任せる / 信頼 stays typeset
  in the slide above the art, never generated
- **Prompt:** An antique two-pan balance scale, one pan holding a
  single feather high in the air, the other sunk low under a heavy
  iron key; centered, ample empty margin above; 16:9 lower band.

### G5. Watching the loom / watching the AI (mirrored pair, 1 of 2)

- **Slide:** "The loom's closed stop"
- **Placement:** pairs with G6 as a before/after beat around the Type G
  photograph (item 3) — either click-reveals on that slide or a
  follow-on slide, so the photo keeps its own moment
- **Prompt:** A weary factory worker with a sad face, chin in hand,
  seated and forced to keep watching a power loom that runs by itself;
  the scene reflects below as a dark mirrored shadow in which the same
  slumped figure becomes a modern developer sadly watching a computer
  work by itself, the screen showing only abstract glowing lines, no
  readable text; identical posture in both halves; 16:9.

### G6. Called by the stop (mirrored pair, 2 of 2)

- **Slide:** "The loom's closed stop"
- **Placement:** second half of the pair with G5
- **Why this mirror:** the closed stop summons human judgment exactly
  when it is needed — the developer arrives to an agent that halted
  itself and flagged the abnormality, and the lightbulb is the learning
  the stop makes possible
- **Prompt:** A factory worker walking happily toward a loom that has
  stopped itself, a small red flag raised where the thread broke, a
  glowing lightbulb above the worker's head; the scene reflects below
  as a dark mirrored shadow in which the same striding figure becomes
  a developer walking eagerly toward a computer whose AI agent has
  halted itself and raised the same small red flag on the screen, the
  same lightbulb above the developer's head; vermilion accent on the
  flags and lightbulbs; 16:9.

### G7. Smart → dumb → gone

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
- **"AI speeds whichever loop you feed":** the two-loop
  causal map from Claim 22 (inventory-feeding loop vs
  slice-shrinking loop). Labels matter, so SVG/mermaid, possibly with
  Slidev click-reveals.
- **"The triad":** triangle of Jidoka / JIT / Respect for
  People with the frees / entrusts / grows verbs on the edges. SVG.
- **"Five judgments stay human":** five icons (value,
  design, credentials, undiagnosed failure, ambiguity) from the
  Iconify sets already available in Slidev — consistent with each
  other, unlike generated icons.

## Slides intentionally without artwork

The diagnostic question ("How do you know…"), the "The apparent
tradeoff" and "JIT flow in LeSS" section dividers, the main-message
quote, "Jidoka preserves knowledge", "Preferred tests: E2E or unit —
nothing in between", "Let the shared product pull collaboration",
"Respect for People: grow people who can think", "Tensions and honest
limits", and "Takeaways". The "Same gates" divider and "The gates do
not care who authored the change" share G9 — whichever does not take
it stays text-only. The stark, text-only look serves the "small
collection of memorable points" goal; the quote slides in particular
should not compete with their own words.
