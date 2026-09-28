# The deck's art matches the accepted 30-slide storyline

Source: [correction story](../../../TPS%20and%20AI/seed.md#storyline-art-cleanup).
Identity: `tps-and-ai-talk#storyline-art-cleanup`

## Correction input

- **Provenance:** This correction comes from the execution retrospective of
  `.planning/quick/008-storyline/PLAN.md` at before-cleanup commit `c0f952c` (story
  `tps-and-ai-talk#storyline`). The reviewed commits are `c3c8156`,
  `fd78fa9`, `ec99335`, `a9802f9`, `8faf6cd`, and `e3b5f1d`, from base
  `02616bf`. `8faf6cd` cut the deck from 39 to 30 slides. On 2026-09-28
  Terry accepted option B (30 slides) and did not restore any cut slide.
- **Current findings** (at `e3b5f1d`):
  1. Slice 4 left four images in `slides/tps-and-ai/public/` that no slide
     references: `burr-puzzle.png` (1.8 MB), `green-light-stockpile.png`
     (2.4 MB), `switching-cost-stack.png` (2.4 MB), and `torii-same-gate.png`
     (2.3 MB). About 8.9 MB of unused art ships in every `slidev build`, and
     from there in the conference-ready backups.
  2. `slides/tps-and-ai/artwork-list.md` still maps art to slides that were
     cut or merged:
     - G9 (torii) → the "Same gates" divider, cut
     - G12 (green light) → "Continuous integration is a practice, not a
       system", merged into "Pull, don't stockpile"
     - G17 → "Lower the switching cost", cut
     - G18 (burr) → "But how to build one?", cut
     - G5 and G6 → the "first" and "second follow-on" slides, now one slide
       with a click

     The list says it references slides "by title only … so the list
     survives inserting or reordering slides", so these fields now mislead.
- **Bounded outcome:** Only art that the deck uses stays in `public/`. Every
  artwork-list entry either names a current slide title or says the art is
  retired.
- **Preserved promises and constraints:**
  - The 30-slide deck is unchanged: its text, order, notes, count, and
    climax ratio.
  - Slide 4's accepted proofs still pass.
  - Retired entries keep their prompts, so the art can be regenerated or
    recovered from Git if a cut slide ever returns.
  - Slides are still named by title only.
- **Excluded:** Slide edits, new art, Japanese, and the story wrap-up's
  assimilation work (the seed's "about 33" wording and the main-theme
  subtitle).

## Execution context and decisions

- The work is deck assets and a planning document only. No ADR or North Star
  topic is involved, and PFE does not apply.
- **Plan location:** The plan root is `.planning/quick/`. 008 was the
  highest number allocated, so this plan is 009. Slice statuses are planned,
  in-progress, and done.
- **Retirement wording:** A retired entry's status reads `retired
  2026-09-28 — slide cut in the storyline story; image deleted (recover from
  Git before <deleting commit>)`. Its **Slide** field names the cut slide as
  history. G5 and G6 name the current merged image slide after "The loom's
  closed stop" (click 1 and click 2).
- **Slide-list helper (proof):** Run it from the repository root. It prints
  the title of each slide, the total, and the position of the climax:

  ```sh
  node --input-type=module -e "
  const fs=await import('fs');const p=fs.readdirSync('node_modules/.pnpm').find(d=>d.startsWith('@slidev+parser@'));
  const {parse}=await import(process.cwd()+'/node_modules/.pnpm/'+p+'/node_modules/@slidev/parser/dist/index.mjs');
  const d=await parse(fs.readFileSync('slides/tps-and-ai/slides.md','utf8'),'slides.md');
  d.slides.forEach((s,i)=>console.log(i+1,s.title||'('+(s.frontmatter?.layout||'untitled')+')'));
  const n=d.slides.length,c=d.slides.findIndex(s=>/^AI speeds whichever loop you feed\$/.test(s.title||''))+1;
  console.log('total',n,'climax',c,'ratio',(c/n).toFixed(2));"
  ```

## Decisive premises observed (2026-09-28, at `e3b5f1d`)

| Premise | Observation | Result |
| --- | --- | --- |
| The four images are unreferenced everywhere except the artwork list and plan 008 | `for n in burr-puzzle green-light-stockpile switching-cost-stack torii-same-gate; do grep -rn --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=legacy "$n" .; done` | The only hits are in `artwork-list.md` (lines 262, 292, 341, 376) and in plan 008's note. Holds |
| No other file in `public/` is unreferenced | `for f in public/*; do grep -q "$(basename $f)" slides.md \|\| echo …; done` in `slides/tps-and-ai` | Exactly these four. Holds |
| These artwork-list slide fields are stale | `grep -n -E "^### \|^- \*\*Slide:\*\*" slides/tps-and-ai/artwork-list.md` compared with the helper's titles | G5, G6, G9, G12, G17, G18 are stale. All other fields name current titles. Holds |
| The deck is at the accepted state | Slide-list helper | `total 30 climax 24 ratio 0.80` |

## Ordered slices and proof ownership

### 1. Only used art ships, and the artwork list names current slides
Type: Behavior
Status: planned
Behavior: Terry builds the deck, and only art that some slide shows is in
`public/`. He opens the artwork list and finds every entry either on a
current slide title or marked retired with a recovery note.
Proof:
- `cd slides/tps-and-ai && for f in public/*; do grep -q "$(basename "$f")" slides.md || echo "unreferenced: $f"; done`
  → no output.
- `git ls-files slides/tps-and-ai/public | grep -c -E 'burr-puzzle|green-light-stockpile|switching-cost-stack|torii-same-gate'`
  → `0`.
- Each non-retired `- **Slide:**` field in `artwork-list.md` names a title
  in the helper's list. G9, G12, G17, and G18 show `retired 2026-09-28`.
  G5 and G6 name the merged slide.
- The slide-list helper still shows `total 30 climax 24 ratio 0.80`.
- `pnpm exec slidev build slides/tps-and-ai/slides.md --out <tmp>` exits 0.
- Owns the whole bounded outcome.

Cumulative design and sizing: This is one concept, the mapping from art to
the current deck, with one proof loop. There is no Structure slice and no
concerns.
