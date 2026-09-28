# Japanese-speaking attendees can follow every slide in Japanese

Source: [story](../../../TPS%20and%20AI/seed.md#japanese).
Identity: `tps-and-ai-talk#japanese`

## Goal and scope

- **Goal:** Every slide of the accepted 30-slide *Freedom and Entrustment*
  deck shows its audience-facing text in Japanese, placed directly under the
  English. The Japanese is set slightly smaller and is visually secondary.
  The Japanese-speaking attendees in Tokyo can then follow Terry's English
  delivery slide by slide.
- **Included:**
  - All audience-facing text: titles, bullets, statement and quote slides,
    labels in the inline SVGs and the mermaid diagrams, captions, and the
    prose in doughnut-example boxes. This covers the cover, About Me, and the
    end slide.
  - TPS terms in Toyota's own Japanese wording.
  - A visible per-slide review status.
  - Applying corrections from Aki (aki@odd-e.com).
- **Excluded:**
  - Speaker notes, which stay in English.
  - Translating the claims.
  - A Japanese-only deck, a language toggle, or alternate slides.
  - Rehearsed timing and offline fonts. These belong to
    [conference-ready](../../../TPS%20and%20AI/seed.md#conference-ready).
  - New art.
- **Preserved:**
  - The accepted English deck: its order, count (30, never more than 35),
    climax at slide 24 (ratio 0.80), speaker notes, and existing commands.
  - English wording may be shortened only to relieve overflow, and only
    without dropping a beat. If a beat would have to go, stop and ask Terry.
- **Key examples:** see the story (1–8). Each one maps to a slice under
  [proof ownership](#proof-ownership).

## Execution context and decisions

- **Scope of the work:** deck content, theme CSS, and a review document. No
  ADR or North Star topic applies.
- **Plan location:** `.planning/quick/`. 009 was the highest number already
  allocated, so this plan is 010. Slice statuses are planned, in-progress,
  and done.
- **PFE (existing solutions):** The theme already has a precedent for
  secondary text, the `.slidev-layout .doughnut-example` rule in
  `themes/odd-e/style.css` (0.88em, `#5c564e`). Add the Japanese style next
  to it in the same file, using the same colour and a note that says which
  deck uses it. Do not add a Vue component or a build step. Mermaid labels
  already use `<br>`, so the Japanese goes on an extra `<br>` line inside the
  node label. The inline SVGs gain `<text>`/`<tspan>` lines in the same
  style. The existing `<title>`/`<desc>` accessibility text stays in English.
- **Markup:** The deck has `mdc: true`. Prefer markdown-aware markup for a
  Japanese line, such as the MDC `{.ja}` attribute on the paragraph or list
  item, so that `**bold**` still renders. A raw `<p>` does not render
  markdown bold, as the premise probe found. The style has two sizes: a
  Japanese title line (about 1.25em under an h1) and a Japanese body line
  (about 0.9em). Keep one rule per size. Do not create per-slide special
  cases unless a layout (cover, quote, image-right) needs a positional fix.
- **Glossary and review record:** `slides/tps-and-ai/japanese-review.md`
  holds two things:
  - **Term glossary.** Jidoka → 自働化 (the kanji with the 人 radical, not
    自動化). Just-in-Time → ジャスト・イン・タイム (JIT). Kaizen → 改善.
    Andon → アンドン. Genchi genbutsu / Go-See → 現地現物. Respect for People
    → 人間性尊重. Entrust → 任せる and trust → 信頼, kept as they are.
    釈迦に説法 stays as it is.
  - **Per-slide table:** the slide title, then *Translated*, *Terry
    checked*, and *Aki reviewed*.
  Slides are named by title only, following the artwork list's convention.
- **Slide-list helper:** Run it from the repository root. It prints the
  titles, the total, and the climax position.

  ```sh
  node --input-type=module -e "
  const fs=await import('fs');const p=fs.readdirSync('node_modules/.pnpm').find(d=>d.startsWith('@slidev+parser@'));
  const {parse}=await import(process.cwd()+'/node_modules/.pnpm/'+p+'/node_modules/@slidev/parser/dist/index.mjs');
  const d=await parse(fs.readFileSync('slides/tps-and-ai/slides.md','utf8'),'slides.md');
  d.slides.forEach((s,i)=>console.log(i+1,s.title||'('+(s.frontmatter?.layout||'untitled')+')'));
  const n=d.slides.length,c=d.slides.findIndex(s=>/^AI speeds whichever loop you feed\$/.test(s.title||''))+1;
  console.log('total',n,'climax',c,'ratio',(c/n).toFixed(2));"
  ```
- **Visual proof:** Export PNGs from a checkout that has `node_modules`. A
  worktree can symlink the root `node_modules`.

  ```sh
  pnpm exec slidev export slides/tps-and-ai/slides.md --format png \
    --output <tmp>/png --timeout 180000 --wait 1500 \
    --executable-path "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  ```

  Then inspect each PNG for four things: a Japanese line under every English
  text element, no overflow or clipping, no overlap with images, and no
  element pushed off the slide's bottom edge.

## Decisive premises observed (2026-09-28, at `e5d3eef`)

| Premise | Observation | Result |
| --- | --- | --- |
| The deck is at its accepted state | Slide-list helper | `total 30 climax 24 ratio 0.80`. Holds |
| The deck builds | `pnpm exec slidev build slides/tps-and-ai/slides.md --out <tmp>` | Exit 0. Holds |
| PNG export works for visual proof | The export command above, run on a two-slide probe deck in the prep worktree | Exit 0, two PNGs. Holds |
| The densest slide fits bilingual | Probe: "The gates do not care who authored the change" with a Japanese title line, two Japanese paragraphs, and Japanese doughnut prose, plus the code block | Everything fits within 1960×1104 with a margin of about 40px at the bottom. Holds, but it is the tightest slide |
| Mermaid nodes carry Japanese beside an image | Probe: the climax diagram with an extra `<br>` Japanese line per node, in the `image-right` layout | The nodes grow to three lines and the diagram still fits the left half. Holds |
| Japanese glyphs render with the theme's fonts | Same probe (mermaid `ui-sans-serif, system-ui`; deck default fonts) | Renders through the system Japanese fallback on macOS. Holds locally; offline and venue fonts are deferred to conference-ready |
| Markdown bold inside raw `<p>` | Same probe | Does not render (the probe used `<b>`). This is why MDC `{.ja}` is preferred |
| Deck has no automated tests | `package.json` scripts: present, build, export, typecheck only | Proof is the build, the helper, and PNG inspection |
| Terms on slides | `grep -n -i -E "nemawashi\|genchi\|go-see\|poka\|jidoka\|kaizen\|andon\|JIT" slides/tps-and-ai/slides.md` | Jidoka, JIT, kaizen, andon, and Go-See / genchi genbutsu appear on slides. Nemawashi and poka-yoke appear only in notes, so they are out of scope |

## Ordered slices

### 1. Attendees follow the opening act in Japanese (slides 1–10)
Type: Behavior
Status: planned

Behavior: Terry pages through slides 1–10 (cover through the main-message
quote). Each English text element has a slightly smaller Japanese line under
it:
- the cover title and subtitle
- About Me
- 釈迦に説法's English lines, with the title not re-translated
- the lineage mermaid nodes
- the diagnostic
- judgment-intensive work
- "Constrained by what they built"
- the statement slide
- "Freedom vs. entrustment?", where the 任せる / 信頼 line is not doubled
- the main-message quote

This slice also establishes the `.ja` style and the review record, with the
glossary and rows 1–10 marked *Translated*.

Proof:
- The slide-list helper shows `total 30 climax 24 ratio 0.80`.
- `slidev build` exits 0.
- Inspect the PNGs for slides 1–10 against the four visual criteria.
- `japanese-review.md` lists all 30 titles, with 1–10 marked *Translated*.

Covers story examples 5 (main-message quote) and 6 (already Japanese). This
slice is also the early check on the format: if the cover or a quote layout
cannot carry the Japanese, record the layout fix here before slice 2.

### 2. Attendees follow the rest of the talk in Japanese (slides 11–30)
Type: Behavior
Status: planned

Behavior: Terry pages through slides 11–30, and every one of them is
bilingual:
- the "Two houses" and "The triad" SVG labels
- the loom sequence and its photo caption, with the source attribution left
  in English
- "Smart → dumb → gone"
- Stop & Fix
- the gates slide, including its doughnut prose, with the code block left in
  English
- Go-See, rendered on first use as 現地現物 (Go-See)
- "Five judgments"
- "Pull, don't stockpile"
- collaboration
- the engine and climax mermaid diagrams
- Respect for People
- continuous improvement
- tensions
- takeaways
- the closing crane quote
- "Thank you"

Glossary terms are used consistently. All 30 review rows are marked
*Translated*.

Proof:
- The slide-list helper still shows `total 30 climax 24 ratio 0.80`.
- `slidev build` exits 0.
- Inspect the PNGs for slides 11–30 against the four visual criteria, then
  re-inspect all 30 once for consistency.
- `grep -n "自動化" slides/tps-and-ai/slides.md` returns nothing (the wrong
  kanji for jidoka).
- The code block in the gates slide is byte-identical to before
  (`git diff` shows only additions around it).

Covers story examples 1, 2, 3, 4, 5 (closing quote), and 7. At the end of
this slice, hand the rendered deck to Terry for his projector-size check
(the story's evaluation). His confirmation fills *Terry checked*. That makes
a safe stopping point: a fully bilingual deck that Terry has checked.

### 3. Aki's review corrections are applied
Type: Behavior
Status: planned

Behavior: Terry forwards Aki's corrections. Each one is applied to the
slides, and the rows Aki covered are marked *Aki reviewed*. Any row not yet
reviewed stays visibly unmarked.

Proof:
- Every correction Aki sent maps to a diff hunk, or to a recorded reason for
  declining it that Terry agreed.
- The slide-list helper still shows 30 slides with the climax at 24.
- `slidev build` exits 0.
- Inspect the PNGs of the changed slides.
- The *Aki reviewed* column matches the slides Aki covered.

Covers story example 8 (late review).

**External-wait exception:** This slice waits on Aki, a human reviewer
outside the session. Terry arranges the review, targeting about 5 October.
If the review is late, the deck ships after slice 2, and the review record
shows which slides are unreviewed.

## Proof ownership

| Promise | Slice | Observation |
| --- | --- | --- |
| Every audience-facing text has Japanese directly under the English, slightly smaller and secondary | 1, 2 | PNG inspection of all 30 slides |
| Count unchanged, at most 35; climax unchanged | 1, 2, 3 | Slide-list helper |
| Readable at projection size, no overflow | 1, 2 | PNG inspection; Terry's projector check after 2 |
| Diagram labels bilingual (SVG, mermaid) | 1 (lineage), 2 (house, triad, engine, climax) | PNG inspection |
| Code and source attributions untranslated | 2 | Gates code block unchanged in `git diff`; loom photo credit in English |
| Terms follow the glossary | 1, 2 | Glossary in `japanese-review.md`; `自動化` grep empty; Go-See first use |
| Existing Japanese not duplicated | 1 | PNGs of slides 3 and 9 |
| Speaker notes English only | 1, 2 | `git diff` touches no `<!-- -->` notes blocks except to shorten English |
| Review status visible | 1, 2, 3 | Columns in `japanese-review.md` |
| Build, export, and `pnpm present` work | 1, 2, 3 | `slidev build` exit 0; PNG export exit 0 |
| Aki's corrections applied | 3 | Correction-to-hunk mapping |

## Cumulative design and sizing

There is one model throughout: an English element followed by a Japanese
line in one shared style. Mermaid and SVG use the same idea: an extra
label line under each English label. No special cases are planned. A
layout-specific positional fix for the cover or a quote is allowed only when
slide 1's PNG shows the need.

Slices 1 and 2 split by slide range. The split exists because slice 1
settles the format and the style before 20 more slides copy them, which
isolates a style or layout mistake early. That is learning and risk
isolation, not splitting by file. Slice 3 is separate because it has its
own external proof loop (Aki's corrections).

No numeric slice limit is supplied. Slice 2 is the largest: 20 slides of
translation under one proof loop. Its sizing risk is in the dense slides,
which the probe bounded. No remaining concerns.
