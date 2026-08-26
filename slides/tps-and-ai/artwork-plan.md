# Plan note — Artwork find / generate / insert (delete when all slices land)

Multi-session slice plan for landing the list in
[artwork-list.md](artwork-list.md) onto [slides.md](slides.md). Planned
work through S17 has landed; the remaining slices below reflect the
current artwork list. Slides are referenced by title only.

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
- The Lizard asset on **About Me** — skipped by owner decision.
- Slides listed in `artwork-list.md` as intentionally without artwork.

## Decisions (needed before those slices)

| ID | Question | Recommendation |
|----|----------|----------------|
| **D1 — decided** | G5/G6 vs the Type G photo | Two **follow-on slides** after the photo, so the loom keeps its own moment |
| **D2 — decided** | Where G9 (torii) goes | **"Same gates for I and AI" section divider** as full-bleed; the gates content slide stays text-only |

## Order

S0 → S1 → S2 (visual voice; G14 needs G1) → S3–S5 (spots) → S6 then
S7–S8 (photo, then mirrors) → S9 → Finds S10–S12 (S11 is unblocked;
S10 and S12 may stop for a license call) → D2 then S13 → S14–S17 →
S18 (mechanism photo) → S19 (G15 action) → S20–S22.

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

### S4 — Behavior — done

Generated G3 as `public/constrained-by-what-they-built.png` and placed it
on **Constrained by what they built** using S3's built-in `image-right`
layout. Targeted typecheck and deck build passed; rendered inspection
confirmed the image and bullets remain uncrowded.

### S5 — Behavior — done

Generated G4 as `public/freedom-entrustment-balance.png` and placed it as
a lower band on **Freedom vs. entrustment?**, keeping 任せる / 信頼
typeset above. Targeted typecheck and deck build passed; rendered
inspection confirmed the text and illustration remain distinct.

### S6 — Behavior — done

Added Daderot's CC0 Type G loom photograph as
`public/toyoda-type-g-automatic-loom.jpg`, placed it large on the right
of **The loom's closed stop**, and attributed the source, license, and
museum exhibit on-slide. Targeted typecheck and deck build passed;
rendered inspection confirmed the attribution remains readable.

### S7 — Behavior — done

Generated G5 as `public/watching-the-loom-watching-the-ai.png` and added
it as the first separate follow-on after **The loom's closed stop**.
Targeted typecheck and deck build passed; rendered sequence inspection
confirmed the Type G photograph keeps its own moment.

### S8 — Behavior — done

Generated G6 as `public/called-by-the-stop.png` from G5 and added it as
the second separate follow-on. A requested masked correction makes only
the monitor displays in G5 and G6 recognizable as Claude Code; all
pixels outside each screen mask remain unchanged. Targeted typecheck,
deck build, and rendered sequence inspection passed.

### S9 — Behavior — done

Generated G7 as `public/smart-dumb-gone.png` and placed it as a wide
strip under the three-step list on **Smart → dumb → gone**. Targeted
typecheck and deck build passed; rendered inspection confirmed the
typeset labels remain readable above the art.

### S10 — Behavior — done

Toyota's official TPS pages provide no downloadable overview graphic,
and its terms reserve reuse of site graphics except designated downloads.
Kept the left column as sourced text, documented the license evidence,
and added on-slide attribution. Targeted typecheck, deck build, and
rendered slide inspection passed.

### S11 — Behavior — done

Added Larman & Vodde's Lean Thinking house (Figure 3.1) as
`public/lean-thinking-house.png` in the right column of **Two houses,
different layers**, with an on-slide source and Creative Commons
presentation attribution. Targeted typecheck, deck build, and rendered
slide inspection passed.

### S12 — Behavior — done

Toyota newsroom and media-library andon images were restricted to
editorial use, so generated G8 as `public/andon-pull.png` and placed it
beside **Stop & Fix** with an AI-generated attribution. Targeted
typecheck, deck build, and rendered slide inspection passed.

### S13 — Behavior — done

Generated G9 as `public/torii-same-gate.png` and placed it full-bleed on
the **Same gates for "I" and AI** section divider with a readable
typeset title. The following gates content slide stays text-only.
Targeted typecheck, deck build, and rendered sequence inspection passed.

### S14 — Behavior — done

Generated G10 as `public/entering-ai-harness.png`, cropped it to 4:3,
and placed it on the right half of **Go-See may mean entering the AI
harness**. Targeted typecheck, deck build, and rendered slide inspection
passed.

### S15 — Behavior — done

Generated G11 as the square `public/thin-vertical-slice.png` and placed
it beside the pull sequence on **Pull, don't stockpile**. Targeted
typecheck, deck build, and rendered slide inspection passed.

### S16 — Behavior — done

Generated G12 as the 4:3 `public/green-light-stockpile.png`, with green
as the sole accent, and placed it on the right half of **Continuous
integration is a practice, not a system**. The one-liner remains the
caption. Targeted typecheck, deck build, and rendered inspection passed.

### S17 — Behavior — done

Generated G13 as the 16:9 `public/pit-stop-changeover.png` and placed it
as a wide band under the bullets on **Continuous improvement towards
perfection**. Targeted typecheck, deck build, and rendered slide
inspection passed.

### S18 — Behavior — done

Verified that the exact AllAboutLean attachment identifies Christoph
Roser as creator and explicitly licenses the photograph under CC BY-SA
4.0. Saved it as `public/type-g-dropper-mechanism.jpg`, documented the
evidence, and placed it as a small attributed inset beside **Dumb** on
**Smart → dumb → gone**. Targeted typecheck, deck build, and rendered
slide inspection passed.

### S19 — Behavior — done

Generated G15 as the 16:9 `public/loom-jidoka-mechanism.png` and
click-revealed it in G7's footprint on **Smart → dumb → gone**. The
two consistent panels show exactly one thin vertical dropper falling a
short distance onto the feeler bar, with no electrical mechanism or
generated labels. Targeted typecheck, deck build, and rendered
before/after click inspection passed.

### S20 — Behavior — planned

Build a Mermaid or SVG flow on **One lineage of inspiration**:
TPS → XP / Agile → LeSS → AI-augmented development. Keep all text crisp
and editable; this is not AI art.

### S21 — Behavior — planned

SVG triangle on **The triad**: Jidoka / JIT / Respect for People, with
frees / entrusts / grows on the edges.

### S22 — Behavior — planned

Five Iconify icons on **Five judgments stay human** (value, design,
credentials, undiagnosed failure, ambiguity). Use one family from the
sets already in the lockfile (`carbon` / `ph`). Keep each label typeset
and verify the five judgments remain scannable.

## Guardrails

- Split by outcome: generate and insert are one slice per artwork
  item, not a "make all images" layer then an "insert all" layer.
- Do not add theme layouts or a shared art pipeline for future decks.
  S0 is scoped to what G1 needs; later bleed slides reuse the class.
- Do not invent Toyota graphics or present an unsourced house as
  Toyota's.
- Post-change-refactor before each commit; do not leave `pnpm
  typecheck` / `pnpm build` broken across a commit.
