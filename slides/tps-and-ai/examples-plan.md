# Plan note — Doughnut examples on the Tokyo deck (delete when all slices land)

Multi-session slice plan for embedding **narrative lines and code
snippets** from [Claim 13](../../TPS%20and%20AI/claims/13-doughnut-project-examples.md)
into [slides.md](slides.md), oriented by
[main-theme-and-stage-setting.md](../../TPS%20and%20AI/main-theme-and-stage-setting.md).
In progress (S1–S6 landed). Revised after a critical selection
review (2026-08-26). Slides are referenced by title only.

Deck-local work — no new ADR
([ADR-0000](../../docs/adrs/0000-use-adrs-accepted.md)). Independent
of [artwork-plan.md](artwork-plan.md).

## Constraint

At most **five places**. A place is an **on-slide embed** — a visible
narrative line or snippet. A beat living only in speaker notes is not
a place, but it must be **committed in a slice**, never left
"optional" (an optional beat is a dropped beat). Embed on the
existing slide. Add a follow-on slide only if the example is
essential **and** the claim bullets plus snippet cannot coexist —
prefer shrinking the snippet or a spoken second line over a new
slide.

## Decisions

| ID | Question | Recommendation |
|----|----------|----------------|
| **D1 — decided** | Overall theme for narratives and snippets | **Leftover capability, one product.** Every on-stage example answers the diagnostic: after this episode, were people more **freed** or more **constrained** by what they built? Snippets are the **encoded leftover** (a test, a schema, a hook) **dumber than the investigation** — never the generated patch, never git archaeology. One world: doughnut (the LeSS in Action notebook product). Class week + tool name for the collaboration story; current harness for jidoka / gates / tests / Go-See. No student names; hashes stay in speaker notes. |
| **D2 — decided in planning** | Which five places (critical, not decorative) | The five rows below — re-confirmed against the full Claim 13 index in the 2026-08-26 review. Diagnostic, CLD, triad, takeaways, and closing slides stay embed-clean; the inventory statement slide carries a **committed spoken beat** (S2), not a sixth embed. |

### Why this theme

The talk's message is that encoded learning makes freedom responsible,
and visible capability earns entrustment. AI speeds whichever loop you
feed. An example that only proves “we used Cursor” or “here is a clever
patch” feeds the inventory loop. An example that shows **what remained
in the product after judgment** — a closed stop, an unrepresentable
illegal state, a reusable test, a hook that records the real tree —
feeds the encode-and-free loop.

Snippet voice (once D1 is locked): the leftover is **dumber than the
investigation**. Show `prepareStatementCount < 10`, `@Pattern`, a
Cucumber Then on persisted state, `git rev-parse --show-toplevel` — not
the timeout analysis, not the generated controller.

First mention on stage: “doughnut — the notebook product we use in
LeSS in Action.” The deck-earliest doughnut moment carries this line:
the S2 inventory beat (deck position ~7, well before the earliest
embed P1). If S2 ever moves, the intro line moves with it. After the
intro, speak in product language (note, recall, export).

### The five places

| Place | Slide | Claim 13 pick | On-stage form | Why this place (and not a sixth) |
|-------|--------|---------------|---------------|----------------------------------|
| **P1** | *Smart → dumb → gone* | Item 4 P1 N+1 query bound + P2 OS-invalid titles (`@Pattern`) | One narrative line for **dumb**, one for **gone**; at most one short snippet (the query-count assert) | Takeaway 3. The loom is factory; this is the software descent. |
| **P2** | *Preferred tests: E2E or unit — nothing in between* | Item 5 P1 `makeMe` GOOD recall log (shown); P2 persist-after-reload (spoken); P3 mock-forest (spoken counter) | The **code-pattern** slide: one unit snippet | The deck already queued doughnut here; without a snippet the bullets stay abstract. |
| **P3** | *The gates do not care who authored the change* | Item 6 P1 Jidoka stop → person decides UX → Cursor implements detour | Narrative; optional 2–3 lines of “Do not guess the UX” | Takeaway 4. The *Five judgments* slide stays the list only. |
| **P4** | *Go-See may mean entering the AI harness* | Item 7 P1 worktree pre-commit wrote the wrong tree | Narrative + 2-line hook leftover (`$HOOK_DIR/../..` vs `git rev-parse --show-toplevel`) | That slide is currently a slogan. Same product thread as P1's N+1 leftover. |
| **P5** | *Let the shared product pull collaboration* | Item 1 P1 Cursor extract-to-child / `Assimilation.vue` (2026-01) | Narrative walking takeaway 5 — no code dump | The only class-week AI sequence. Without it, every other place is current harness and the LeSS audience never sees multi-person integration. Also closes the S2 `/sync` contrast as the freed pole. |

Review (2026-08-26): every pick re-checked against Claim 13's ranked
**and** also-considered entries; no swap improves the five. The one
selection-level gap: no committed moment showed the diagnostic's
**constrained pole** — generated volume outpacing absorption. Every
embed leaves a freed-pole leftover (even P4's failure story ends in a
fixed hook), and the only ranked constrained episode (item 1 P3
`/sync`) was left optional. Fixed by committing that beat (S2), not
by spending a place: the constrained episode needs no on-slide
artifact, and every chosen place's snippet does.

### Not a place (on purpose)

| Slide / item | Fate |
|--------------|------|
| Diagnostic, CLD, triad, takeaways, closing | Embed-clean; no doughnut beats. |
| *AI can produce plausible software faster…* (inventory statement) | Embed-clean, but **S2 commits** the item 1 P3 `/sync` beat to its speaker notes, told **forward** — in deck order this slide precedes the P5 flagship by ~22 slides, so Claim 13's “callback from the flagship” framing is backwards on stage. The callback runs the other way, at P5. |
| *Pull, don't stockpile* | Claim 13 item 3 skipped (git missed stockpile). Thin-slice artwork already carries it. |
| *Stop & Fix* | Andon already carries the beat. Item 4 P3 Biome `"warn"` stays in speaker notes, paired with the `@focus` check that exits 1 (Claim 13's own pairing) — the spoken contrast is a parked pile vs a stop that will not ship, not only dashboard vs quiet channel. |
| *Continuous integration is a practice, not a system* | Item 2 P2 `@ignore`-to-green stays in speaker notes. |
| *Five judgments stay human* | Already the talk list, not a doughnut hunt. |
| Item 2 P1 FineTuningData merge | Spoken backup if P5's January chain is dropped; do not spend a place. |
| Respect for People, SMED / DoD, tensions | No doughnut needed; tensions already dropped the cleanup episode. |

## Convention (every embed slice)

- One place per slice. Touch only that slide (plus speaker notes).
- Narrative: one or two sentences, present tense, leftover-capability
  test, no hashes, no student names. Tool + week OK on P5 and the S2
  beat.
- Snippet: ≤12 lines, named doughnut leftover, trimmed for the claim.
  Do not paste the generated implementation.
- Default: no new slide. If the existing slide cannot fit, stop
  (Jidoka) before adding one — shrink the snippet first.
- Check: read the named slide in `slides.md`; `pnpm typecheck` / deck
  build only if a code fence or layout change could break render.
- Speaker notes: Claim 13 hashes and the spoken second line / counter.

## Order

S1 (lock D1) → S2 (inventory spoken beat — settles the intro line
and the constrained pole) → P2 (establishes snippet craft) → P1
(deck-earlier jidoka, uses the craft) → P3 → P4 → P5.

S2 before any embed because the intro line and the
freed-vs-constrained framing shape every later narrative. P2 before
P1 so later snippets copy one visible pattern. Remaining embeds
follow deck order.

---

## Slices

### S1 — Structure — done

Locked **D1** in the Decisions table. Read-through vs P1–P5 and
takeaways 1–5: leftover capability, one doughnut product; not
I-era vs AI-era, not one class week only. No `slides.md` change.

### S2 — Behavior — done

Speaker notes on *AI can produce plausible software faster…*: doughnut
intro (first mention) then item 1 P3 `/sync` told forward as the
constrained pole. Hashes in notes. Slide body untouched. P5 still
calls back.

### S3 — Behavior — done

**P2** on *Preferred tests…*: six-line `makeMe` leftover (note /
tracker / MCQ prompt → `controller.answer` → `Grade.GOOD` log).
Three rules kept. Persist-after-reload and mock-forest in notes.
No follow-on slide. Rendered on slide 20 without overflow.

### S4 — Behavior — done

**P1** on *Smart → dumb → gone*: **Dumb** = recall-stats timeout as
a query-count stop; **Gone** = OS-invalid titles unrepresentable
(`@Pattern`); one leftover line
`assertThat(prepareStatementCount, lessThan(10L))`. List, dropper,
and artwork band kept; left column squeezed to 68% so the snippet
sits above the band. Rendered on slide 19.

### S5 — Behavior — done

**P3** on *The gates…*: episode is on-slide (Jidoka stop → person
decides leave-recall / Resume → Cursor implements without
dissolving the stop) plus two leftover plan lines. Slogan kept.
Five judgments untouched. Rendered on slide 23.

### S6 — Behavior — done

**P4** on *Go-See…*: narrative that `git commit` reports success
while the hook records the **main** tree; 2-line leftover
`$HOOK_DIR/../..` vs `git rev-parse --show-toplevel`. Artwork kept.
P1 N+1 callback in notes. Rendered on slide 25.

### S7 — Behavior — planned

**P5** on *Let the shared product pull collaboration*: narrative of
the 2026-01 Cursor extract-to-child chain (shared `Assimilation.vue`,
recorded conflict leftover, lint stop, LoadingModal as user-visible
increment). Tool + week; no student names; no file dump. Spoken
callback (notes): the S2 `/sync` beat — this chain is the same kind
of tool kept small and stoppable, the freed pole of that contrast.
Spoken backup if the January chain drops: item 1 P2 export
properties.

**Check:** takeaway 5 is walked as AI-assisted change → integration
signal → stop-and-fix → user value.

---

## Discoveries (planning)

- S6 (2026-08-26): 2-line hook leftover fits on the image-right
  Go-See slide with a frontmatter squeeze. P1 callback lives in
  notes only — S7’s `/sync` callback can follow that pattern.
- S5 (2026-08-26): leftover plan text (“Do not guess the UX”)
  fits under the episode on the gates slide. Five-judgments
  remains the list-only slide.
- S4 (2026-08-26): 1-line query-count leftover fits with the
  dropper inset and 44% artwork band after squeezing the left
  column. Later embeds on artwork-heavy slides should assume that
  squeeze, not a follow-on slide.
- S3 (2026-08-26): six-line `makeMe` leftover fits with the three
  rules on slide 20. Later snippets can copy that trim (helpers
  collapsed; leftover is the assert). S4’s *Smart → dumb → gone*
  is tighter: artwork band plus a dropper inset already occupy
  the frame — shrink the 1–3 line assert first; Jidoka before a
  new slide.
- S2 (2026-08-26): doughnut intro + `/sync` beat sit in the
  inventory statement notes without crowding the diagnostic. Told
  forward; no P5 mention. Remaining embeds may assume doughnut is
  already named.
- S1 (2026-08-26): D1 lock confirmed against takeaways 1–5 and
  P1–P5. T3/T4 need current-harness leftovers; T5 needs the
  class-week chain; S2 carries the constrained pole. Not I-era vs
  AI-era, not one class week only. Remaining embeds copy this voice.
- Claim 13 already ranked talk-ready episodes (2026-08-26). This plan
  **selects**, it does not re-hunt.
- Item 3 (stockpile vs slice) is skipped: no git episode. Do not
  invent one for *Pull, don't stockpile*.
- P1 and P4 share a product thread (worktree lie → N+1 leftover).
  That is a feature of D1, not a sixth place.
- Items 4–7 are project-owned harness (clearance: no student names).
  Item 1 P1 is a tagged class week (tools + week OK).
- Sibling `doughnut` checkout was not required to lock D1; embed
  slices will copy snippets from that repo when executing S3–S7.
- Critical review (2026-08-26) re-checked every pick against Claim
  13's ranked and also-considered entries; the five places stand.
  Considered and rejected: swapping a harness place for item 2 P1
  (the I-era FineTuningData merge) to get a second class-week story —
  it repeats P5's beat with a weaker chain (spec files meeting, no
  stop-and-fix on a working increment), and D1 already rejected the
  era-contrast theme.
- Same review fixed two gaps rather than swapping examples: the
  constrained pole existed only as an "optional" callback (now
  committed as S2 — the diagnostic is a contrast, and every embed
  shows the freed pole), and Claim 13's "callback from the flagship"
  framing for item 1 P3 is backwards in deck order (the inventory
  statement precedes P5 by ~22 slides). The doughnut intro line is
  now pinned to S2 instead of floating.
