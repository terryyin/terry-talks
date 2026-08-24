---
name: slice-planning
description: >-
  Decompose work into stop-safe Behavior/Structure slices — one observable
  outcome per slice — before touching multiple files. Use when planning a new
  slide/deck, a claims edit, or a tooling change, or when a fix/edit attempt
  has overrun its time-box. Triggers on: plan, decompose, slice, break down,
  task too large, stuck.
---

<objective>
Decompose work into stop-safe **slices**: each is **Behavior** or **Structure**,
with one observable outcome (or one Structure change for the immediate next
Behavior only).

This repo has no roadmap tool (no GSD, no `.planning/`) — a slice is simply
the unit of work you commit.
</objective>

<context>
| Location | Nature |
|----------|--------|
| `slides/<deck>/` | Slidev deck — content is Behavior (what the audience sees) |
| `themes/<theme>/` | Shared theme — changes here are Structure unless they add a new visible layout/style |
| `scripts/` | Tooling — Behavior is what the script does when run |
| `TPS and AI/claims/` | Claims-based writing — Behavior is a claim a reader can evaluate |
| `docs/adrs/` | Governed by `adr-awareness`, not this skill |
| `legacy/` | Retired, not maintained — do not plan new slices here |

Track slices with the session's task list. Only write a standalone plan note
for work that will span multiple sessions (e.g. a `NOTES.md` beside the deck
or claim being built) — delete it once every slice in it has landed.
</context>

<process>

<step name="time_box_recompose">
When a fix / edit / "make it work" attempt overruns the time-box:

| Elapsed | Action |
|---------|--------|
| > 5 min | Scrutinize the breakdown — too coarse? Prefer a finer decompose, revert WIP, retry on a smaller slice |
| > 10 min | **Hard trigger** unless there's a good reason (long build, external wait): stop, revert/stash WIP, cut a smaller Behavior/Structure slice |

For the hard trigger: stop, summarize what you learned, `git stash` (or
revert) uncommitted WIP, decompose the remaining work into smaller slices,
then report and wait (or execute the first smaller slice if already
authorized).
</step>

<step name="decompose">
Split by **outcome**, not by layer (don't turn one visible change into
separate "update theme CSS" → "update component" → "update slide" slices).

- Order slices common/general → more specific.
- First slice: the narrowest concrete outcome; generalize only after real
  repetition (a second deck or claim actually needing the same structure).
- A shared-theme change needed by one slide → do the Structure slice first,
  scoped to only what that one Behavior needs — not every future deck.
- Still too big → split one aspect of the outcome per slice (one slide, one
  claim, one script flag).
- Size so one attempt can finish within **5 minutes**, checks included.
</step>

<step name="verify_led_beats">
When a slice spans several visible beats (a multi-slide sequence, a
multi-section claim), alternate:

1. Draft the smallest visible unit.
2. Check it — `pnpm typecheck` / `pnpm build` for code or rendered decks; a
   read-through for prose (claims, open questions, ADRs).
3. Repeat until the whole slice reads/builds clean.

Land a commit after a beat (or a few) reach a clean check — not mid-draft.
Don't deliberately leave `pnpm build` or `pnpm typecheck` broken across a
commit.
</step>

<step name="write_plan">
For multi-session work only, state per slice:

- **Type:** Behavior | Structure
- **Status:** planned / in-progress / done
- Behavior: what changes, for whom, and how you'll know it's done
- Structure: internal change + which **immediate next** Behavior it unlocks

Delete the note once every slice in it has landed.
</step>

</process>

<guardrails>
- NEVER plan Structure that only serves slices beyond the immediate next Behavior
- NEVER leave a stray planning note behind after the work has landed
- NEVER plan a slice that deliberately ends with a broken build/typecheck —
  land only after a clean check
</guardrails>

<success_criteria>
- [ ] Every slice is Behavior or Structure, stop-safe, one observable outcome
- [ ] No plan file left behind for work that already landed
- [ ] Clear next action (execute, decide, or wait)
</success_criteria>
</output>
