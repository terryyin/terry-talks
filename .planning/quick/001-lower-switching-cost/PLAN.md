# Lower the switching cost

Audience-facing: a new slide after Continuous improvement towards
perfection, backed by researched claim text. Do not generate the artwork.

**Decisions (do not re-open in slices):**

- Canonical LeSS source: [Why LeSS](https://less.works/less/framework/why-less)
  two optimization goals of adaptiveness:
  1. Ability to change direction with relatively low cost, primarily
     based on discovery through frequent delivery, for…
  2. Maximizing value delivered to customers and end-users.
  Why LeSS also: “The goal of adaptiveness guides continuous improvement
  forever.” Supporting (not competing): 2016 blog “Achieving System
  Optimisation Goals in LeSS” (highest business value + agility as
  “turn on a dime for a dime”); MTS case three-list (highest customer
  value, cheap & easy adaptiveness, learning). Prefer Why LeSS wording.
- Wording: **switching cost** is the LeSS/audience name for that
  leftover cost of changing direction. **Changeover** stays the TPS
  analog (SMED/OTED). Do not collapse the two words.
- User wrote “STED”; no lean term exists. Use **OTED** (One-Touch
  Exchange of Die), already in Claim 5. SMED then OTED on the slide.
- Artwork is **planned only** (G17; G16 is taken). Do **not** generate
  an image. Do **not** add a broken `img` src on the slide. Text-in-art
  is a human exception to the artwork-list “no text” prefix — trail it
  on the G17 item.
- ADR-0000: this is talk/claim content, not a new ADR.

## Status

Slice 1 done. Slice 2–4 planned.

**Learnings:** Why LeSS two-bullet wording is in Claim 18; supporting 2016/MTS lists stay supporting. Slice 2 should cite Claim 18 for the goals, not recopy the full Why LeSS block.

---

### 1. Claim 18 records LeSS optimization goals
Type: Behavior
Status: done

What: A reader of Claim 18 can evaluate that Continuous Improvement
Towards Perfection is guided by LeSS’s two Why-LeSS optimization goals
(low-cost change of direction, for maximizing customer value). Put the
research in Claim 18; keep SMED method and software stack on Claim 5.
Check: read-through; sources listed; no contradiction with the existing
perfection-vision quote (“change direction at any time without additional
cost”).

---

### 2. Claim 5 links switching cost to those goals
Type: Behavior
Status: planned

What: A reader of Claim 5 can evaluate (a) the wording decision,
(b) that lowering switching cost is how the first optimization goal
becomes payable and how feature-team customer-value optimization stays
economical, (c) SMED then OTED as the method ladder, (d) a software
stack that cheapens that cost: common repo → trunk-based development →
one-touch remaining setup → fast deterministic e2e. Close or narrow the
OTED-naming open question if the slide will use OTED. Check: read-through;
Claim 18 cited for the goals themselves.

---

### 3. Slide “Lower the switching cost”
Type: Behavior
Status: planned

What: After “Continuous improvement towards perfection” in
`slides/tps-and-ai/slides.md`, a new slide titled **Lower the switching
cost**. Content from slices 1–2; SMED + OTED as the TPS example. No
image file yet — leave a comment for G17. Update the talk-beat list in
`TPS and AI/main-theme-and-stage-setting.md` so beat 7 mentions this
follow-on slide. Check: read the slide in place; markdown separators
valid.

---

### 4. Planned artwork G17 (instruction only)
Type: Behavior
Status: planned

What: `slides/tps-and-ai/artwork-list.md` gains **G17** — a building:
base **common repo**, then **trunk-based development**, then **one-touch
dev-env setup**, then **fast, deterministic e2e test**. Labels in the
picture (human exception to the no-text prefix). Status planned; no
PNG. Check: item matches other G* entries; next number G17 not G16.
