# Plan note — Claim 13 example search (delete when all slices land)

Multi-session slice plan for pulling doughnut examples per the queue in
[Claim 13](13-doughnut-project-examples.md). Items 1–5 done; next is 6.

**Learnings:** Spell out Whole Product Focus (not WPF) in the index.
Treat AI-assisted only when a commit message or trailer names Cursor
or Claude — not `AiController` / prompt-feature commits, and not an
author named Cursor Agent. Scan author-date windows, not ancestry;
Phase 1 bookmark commit counts can differ from the author-date
window (2023-10-30 listed 362, window had 181). Other agents may
commit unrelated files — only edit Claim 13 / this NOTES. Skip
post-change-refactor (prose).

## Deliverable — the "one place"

A new section in Claim 13 itself: **"Examples pulled — prioritized"**,
one subsection per queue item. Claim 13 stays the index; owning claims
are NOT touched (Terry has not asked to pull examples into them), and
the deck is NOT edited — each entry only *names* the target slide and
how it would be used.

Entry format per example:

- **Priority** (1–3 within the item)
- **Example** — commit hashes / file paths + one-line story
- **Source** — tagged week range, or latest code
- **Slide** — which slide in `slides/tps-and-ai/slides.md`
- **Use** — spoken beat, bullet, or shown artifact
- **Clearance** — needs Terry's public-discussability check? (open
  question in Claim 13)

## Where each item's evidence lives

| Queue item | Source |
|---|---|
| 1. Flagship AI sequence (Claim 8) | git — 4 tagged AI-era weeks |
| 2. WPF + CI (Claims 3, 8, 21) | git — 4 tagged I-era weeks |
| 3. Bottom-up batch vs slice (Claim 17) | git — reuse scans from items 1–2 |
| 4. Judgment descent (Claims 6, 20, 24) | **latest code** (types, checks, CI config) |
| 5. Preferred tests (Claim 6) | **latest code** (current test harness) |
| 6. Same gates for "I" and AI (Claim 6) | latest harness config + one git episode |
| 7. Go-See harness failure (Claim 16) | latest harness docs/plan notes; may end as a question for Terry |

## Slices

Priority across items = queue order (talk leverage, already fixed in
Claim 13). Priority within an item = how completely the example matches
the look-fors, then how safely discussable on stage. Each git-scan
slice is time-boxed; if a week overruns 5 minutes, narrow the scan
(merge commits, revert/fix message patterns, cross-author file
collisions) instead of reading every commit.

### S0 — Structure — done

Empty "Examples pulled — prioritized" index in Claim 13 (format legend
+ 7 stubs). Next: 1a records into subsection 1.

### 1a — Behavior — done

Unranked item-1 pool in Claim 13 from 2025-01-06 and 2026-01-26 (five
candidates: extract-to-child + Assimilation conflict; Claude Add
button; Cursor test refactor; counters: disable-tests-to-green,
Cursor volume that shipped). 1b ranks.

### 1b — Behavior — done

Item 1 ranked: (1) Cursor extract-to-child / Assimilation.vue
2026-01-26; (2) Claude restore note properties on export 2026-07-27;
(3) Cursor `/sync` volume 2026-07-27. 2025-04-14 had no Cursor/Claude
trailers. Also-considered hashes kept for items 2, 3, 6.

### 2a — Behavior — done

Unranked item-2 pool from 2023-10-30 and 2024-06-03: FineTuningData
merge (positive); `@ignore`-then-delete unused feature (Claim 21
counter); KJ/nivraman assessment merge; Teh O Beng ignore-then-mock;
nivraman approved-column revert. No delayed-mainline branches.
2b ranks and adds 2023-11-20 / 2024-08-19.

### 2b — Behavior — done

Item 2 ranked: (1) Fisher/Leo FineTuningData merge 2023-10-30;
(2) `@ignore`-then-delete unused feature 2023-10-30; (3) KJ/nivraman
assessment merge 2024-06-03. 2023-11-20 / 2024-08-19 hashes in
also-considered (item 3 stockpile pointer: andreas `20ea977a2c`).

### 3 — Behavior — done

Observation-in-class beats git. Parked specs / same-story layering /
volume ≠ one person stockpiling infra first. Ask Terry who (if anyone)
built backend/API/component before a user-visible increment. Parallel
contrast: FineTuningData week already on item 2.

### 4a — Behavior — done

Latest-code smart→dumb candidates: RecallStatsPerformanceTest N+1
bound (`0bd1dd2995`); DeletableEntityFkClosureTest (`eb6a1db962`).
History shows investigation origin. `@focus` check left for 4b.

### 4b — Behavior — done

Gone: OS-invalid titles blocked on write DTOs; spelling tracker has
no MCQ choice UI. Control: `@focus` tags fail CI. SET NULL is not
poka-yoke. Biome leftover `"warn"` left for 4c. Gradle has no
warnings-as-errors.

### 4c — Behavior — done

Counter: Biome leftover `"warn"` (CI `biome check` without
`--error-on-warnings`). Item 4 ranked: (1) recall-stats N+1 stop;
(2) OS-invalid titles gone; (3) Biome warn pile on *Stop & Fix*.

### 5 — Behavior — planned

Current test harness: one unit test driving a stable boundary with
`makeMe`/crafted data (no mock forest), one E2E asserting a user-valued
state change (not presentation), optionally one counter (test that
duplicates code structure, protects no behavior). Target slide:
*Preferred tests: E2E or unit — nothing in between* — its notes already
point at Claim 13. Use: shown harness text, evidence that a good AI
episode leaves reusable capability.

### 6 — Behavior — planned

Latest harness config for the gates (no-commit-on-red hook, execute-plan
Jidoka — e.g. Jidoka-stop trail in recent doughnut commit messages) plus
one episode where the same stop bound a person and an agent, or the
counter (someone/something tempted to delete a failing test). 1–2
examples. Target slide: *The gates do not care who authored the change*
(takeaway 4).

### 7 — Behavior — planned

One best Go-See failure — wrong context, misleading tool call, rule
that did not fire, or permission failure — from doughnut harness docs,
plan notes, or logs. If the artifacts cannot show one, record a
concrete question for Terry instead of forcing a weak example. Target
slide: *Go-See may mean entering the AI harness*. Use: the single
story making genchi genbutsu concrete.

### 8 — Behavior — planned

Read-through of the whole new Claim 13 section; confirm per-item
priorities; update the claim's status line; list every example needing
Terry's public-discussability clearance against the open question.
Delete this NOTES file.

## Guardrails

- Stay inside tagged week ranges; expand past the 8 tagged weeks only
  if an item comes up empty, and say so in the entry.
- Do not pull examples into owning claims; do not edit the deck.
- Post-class intervals stay out of scope (dropped with Claim 23).
