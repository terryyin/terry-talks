---
name: slice-planning
description: >-
  Decompose work into stop-safe Behavior/Structure slices — one observable
  outcome per slice — before touching multiple files. Writes
  .planning/quick/NNN-slug/PLAN.md. Use when planning a new slide/deck, a
  claims edit, or a tooling change, or when a fix/edit attempt has overrun
  its time-box. Triggers on: plan, decompose, slice, break down, task too
  large, stuck.
---

<objective>
Decompose work into stop-safe **slices**: each is **Behavior** or **Structure**,
with one observable outcome (or one Structure change for the immediate next
Behavior only).

A slice is the unit of work you commit. Execution is **execute-plan**, not
this skill.

Output: `.planning/quick/NNN-slug/PLAN.md` + `## SLICE PLAN WRITTEN`.
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
| `.planning/quick/NNN-slug/` | Ad-hoc plans — this skill writes `PLAN.md` here |

**Where to put the plan:** `.planning/quick/NNN-slug/PLAN.md`. `NNN` is the
next free 3-digit number under `quick/` at write time; `slug` is kebab-case
from the outcome. Do not write `NOTES.md` beside the work, a flat
`.planning/<name>.md`, or GSD files (`phases/`, `PROJECT.md`, `STATE.md`,
…). A session task list is enough only for work too small to invoke this
skill.

**History:** keep resume-useful status in the PLAN while in progress;
**execute-plan** deletes the spent `NNN-slug/` directory once every slice
has landed.
</context>

<process>

<step name="time_box_recompose">
When a fix / edit / "make it work" attempt overruns the time-box:

| Elapsed | Action |
|---------|--------|
| > 5 min | Scrutinize the breakdown — too coarse? Prefer a finer decompose, revert WIP, retry on a smaller slice |
| > 10 min | **Hard trigger** unless there's a good reason (long build, external wait): stop, revert/stash WIP, cut a smaller Behavior/Structure slice |

For the hard trigger: stop, summarize what you learned, `git stash` (or
revert) uncommitted WIP, decompose remaining work into smaller slices,
write or update `.planning/quick/NNN-slug/PLAN.md`, then report and wait
(or hand the first smaller slice to **execute-plan** if already authorized).
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

Leave checks green for wrap-up — **execute-plan** commits; the implementer
does not. Don't deliberately leave `pnpm build` or `pnpm typecheck` broken.
</step>

<step name="write_plan">
Create `.planning/quick/NNN-slug/` (next free `NNN`) and write `PLAN.md`.
State per slice:

- **Type:** Behavior | Structure
- **Status:** planned / in-progress / done
- Behavior: what changes, for whom, and how you'll know it's done
- Structure: internal change + which **immediate next** Behavior it unlocks

In `PLAN.md`, number slices (`### 1. Capability heading`) with a capability
name — those numbers stay in the plan file, not in product paths.

Do not implement the slices here. Hand execution to **execute-plan** when
the developer asks (or already asked in the same turn).
</step>

</process>

<guardrails>
- NEVER plan Structure that only serves slices beyond the immediate next Behavior
- NEVER leave a spent `quick/NNN-slug/` directory after the work has landed
- NEVER plan a slice that deliberately ends with a broken build/typecheck —
  land only after a clean check
- NEVER implement feature/content work during planning (except a tiny
  fix discovered while reading)
- NEVER write GSD artifacts (`PROJECT.md`, `STATE.md`, `phases/`, …) or a
  flat `.planning/<name>.md`
- NEVER encode plan or slice numbers in product file names
</guardrails>

<success_criteria>
- Every slice is Behavior or Structure, stop-safe, one observable outcome
- Plan written to `.planning/quick/NNN-slug/PLAN.md`
- Final output includes `## SLICE PLAN WRITTEN`
</success_criteria>

<output>
Report to the developer:

1. Plan location and slice summary.
2. Key design decisions.
3. Discoveries affecting remaining work.

```
## SLICE PLAN WRITTEN
```

Then wait unless they already asked to execute — in that case invoke
**execute-plan**.
</output>

<out_of_scope>
- Do not implement slices during planning.
- Do not add GSD project files or `.planning/phases/`.
- Do not plan a slice that deliberately ends with a broken
  typecheck/build.
</out_of_scope>
