# Plan note — Artwork find / generate / insert (delete when all slices land)

Multi-session slice plan for landing the list in
[artwork-list.md](artwork-list.md) onto [slides.md](slides.md). Planned
only; execution not started. Slides are referenced by title only.

Deck-local work — no new ADR ([ADR-0000](../../docs/adrs/0000-use-adrs-accepted.md)).

## Convention (every generate/insert slice)

- Files go in `slides/tps-and-ai/public/`.
- Generated prompts start with the sumi-e prefix in `artwork-list.md`.
  Do not add composition, mood, or extra style unless that item's
  prompt already names it for layout. Never ask the generator for text
  or kanji.
- After G1 exists, later generates may pass it as a style reference
  (G14 must).
- Mark the item done in `artwork-list.md` in the same slice.
- Check: the named slide, rendered. Theme CSS change (S0) also needs
  a glance at an untouched slide so the watermark still looks the same.

## Skip / do not generate yet

- Extra Odd-e logos on cover and Thank you — the theme already
  watermarks every slide (`themes/odd-e/images/odd-e-logo.png`).
- **G8** (andon illustration) — only if S12's photo hunt fails license.
- Slides listed in `artwork-list.md` as intentionally without artwork.

## Decisions (needed before those slices)

| ID | Question | Recommendation |
|----|----------|----------------|
| **D1** | G5/G6 vs the Type G photo | Two **follow-on slides** after the photo, so the loom keeps its own moment |
| **D2** | Where G9 (torii) goes | **"Same gates for I and AI" section divider** as full-bleed; the gates content slide stays text-only |
| **D3** | How much of Claim 22 appears | A **two-loop** mermaid (inventory-feeding vs slice-shrinking / Figure 2), not the full engine |

## Order

S0 → S1 → S2 (visual voice; G14 needs G1) → S3–S5 (spots) → S6 then
S7–S8 (photo, then mirrors) → S9 → Finds S10–S12 (S11 is unblocked;
S10 and S12 may stop for a license call) → D2 then S13 → S14–S17 →
S18 → S19–S22.

---

## Slices

### S0 — Structure — done

The Odd-e logo now uses a pointer-transparent `::after` overlay at the
same top-right scale, leaving `.slidev-layout`'s background available for
full-bleed art. Targeted typecheck and deck build passed; static output
confirmed the grey base and watermark are independent. Unlocks S1.

### S1 — Behavior — done

Generated G1 with built-in ChatGPT Images and saved it as
`public/cover-crane-released.png`. The full-bleed cover keeps its title
readable in the empty left space; rendered inspection confirmed the
right-weighted crane, no generated text, and intact Odd-e watermark.

### S2 — Behavior — done

Generated G14 with G1 as the built-in ChatGPT Images style and same-crane
reference, saved as `public/closing-crane-aloft.png`. Static-browser
inspection confirmed a readable quotation in the left negative space,
the matching crane aloft, no generated text, and intact watermark.

### S3 — Behavior — done

Generated G2 as `public/preaching-to-the-buddha.png` and placed it on
**釈迦に説法** with Slidev's built-in `image-right` layout. Targeted
typecheck and deck build passed; rendered inspection confirmed the
illustration sits beside the bullets without crowding them.

### S4 — Behavior — planned

Generate G3 (tethered figures / crates, 4:3); insert on **Constrained
by what they built**, copying S3's placement. No new layout unless S3
had to invent one.

### S5 — Behavior — planned

Generate G4 (tilted balance, 16:9 lower band); insert on **Freedom vs.
entrustment?**. Kanji 任せる / 信頼 stay typeset above the art.

### S6 — Behavior — planned

Find a Type G loom photograph; insert large on the right of **The
loom's closed stop**; attribute on-slide. Wikimedia has a CC0 candidate
(National Museum of Nature and Science, Tokyo). Done when the photo is
in `public/`, licensed, attributed.

### S7 — Behavior — planned

After D1 and S6: generate G5 (watching the loom / watching the AI,
16:9) and insert as the first follow-on (or click-reveal, if D1 goes
the other way). The Type G photo keeps its own moment.

### S8 — Behavior — planned

Generate G6 (called by the stop, 16:9) with G5 as reference; insert as
the second half of the pair.

### S9 — Behavior — planned

Generate G7 (three descending steps, 16:9 wide strip); insert under the
list on **Smart → dumb → gone**. Slide text supplies the labels.

### S10 — Behavior — planned

Find Toyota's **own** TPS overview graphic for the left column of **Two
houses, different layers**. Official page
(global.toyota, Vision & Philosophy → Toyota Production System) is
prose and history photos, not a house. If nothing licensable is found,
leave the left column as sourced text — do not paste an unsourced house
(Claim 2). Attribute on-slide.

### S11 — Behavior — planned

Use Larman & Vodde's Lean Thinking house on the right column of **Two
houses, different layers**. [less.works book images](https://less.works/resources/graphics/book-images)
are Creative Commons for presentations (Figure 3.1). Attribute
on-slide.

### S12 — Behavior — planned

Find an andon cord / andon board photograph for **Stop & Fix** (Toyota
newsroom preferred). If license fails, generate G8 (andon pull, 4:3)
and insert that instead. Attribute whichever lands.

### S13 — Behavior — planned

After D2: generate G9 (torii, same gate, 16:9) and insert on the chosen
slide. If it is the section divider, reuse S0's bleed class.

### S14 — Behavior — planned

Generate G10 (person with lantern entering the machine, 4:3); insert on
**Go-See may mean entering the AI harness**, right half.

### S15 — Behavior — planned

Generate G11 (thin vertical cake slice, square); insert on **Pull,
don't stockpile**, beside the pull sequence.

### S16 — Behavior — planned

Generate G12 (green light on a stockpile, 4:3; accent is green, not
vermilion); insert on **Continuous integration is a practice, not a
system**, right half. The one-liner is the caption.

### S17 — Behavior — planned

Generate G13 (pit-stop changeover, 16:9 wide); insert under the bullets
on **Continuous improvement towards perfection**.

### S18 — Behavior — planned

Own asset on **About me**: Lizard logo or GitHub repo card (from the
Lizard project, not this repo).

### S19 — Behavior — planned

Build a mermaid (or SVG) flow on **One lineage of inspiration**:
TPS → XP / Agile → LeSS → AI-augmented development. Needs crisp text;
not AI art.

### S20 — Behavior — planned

After D3: two-loop mermaid on **AI speeds whichever loop you feed**
(inventory-feeding vs slice-shrinking / Claim 22 Figure 2). Click-reveals
if it still reads. Not the full engine diagram.

### S21 — Behavior — planned

SVG triangle on **The triad**: Jidoka / JIT / Respect for People, with
frees / entrusts / grows on the edges.

### S22 — Behavior — planned

Five Iconify icons on **Five judgments stay human** (value, design,
credentials, undiagnosed failure, ambiguity). Use one family from the
sets already in the lockfile (`carbon` / `ph`). Then read through; delete
this plan file.

## Guardrails

- Split by outcome: generate and insert are one slice per artwork
  item, not a "make all images" layer then an "insert all" layer.
- Do not add theme layouts or a shared art pipeline for future decks.
  S0 is scoped to what G1 needs; later bleed slides reuse the class.
- Do not invent Toyota graphics or present an unsourced house as
  Toyota's.
- Post-change-refactor before each commit; do not leave `pnpm
  typecheck` / `pnpm build` broken across a commit.
