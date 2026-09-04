---
name: execute-plan
description: >-
  Autonomously execute a Behavior/Structure plan under
  .planning/quick/NNN-slug/PLAN.md. Applies local wrap-up on every slice:
  Jidoka, post-change-refactor, plan update, and commit. Parallel waves OK
  when safe. Triggers on: execute plan, run plan, execute slices, start
  plan, do .planning, execute .planning, run the notes.
---

<objective>
Autonomously execute a slice plan with **local wrap-up on every slice**:
Jidoka gates, post-change-refactor, plan update, and commit.

Purpose: Execution overlay for plans written by **slice-planning**.

Output: Slices completed with commits, or a Jidoka stop report ending with
`## PLAN EXECUTION COMPLETE` (all slices done) or a stop summary when
waiting on the developer.
</objective>

<context>
**Plan locations** (first that fits):

1. `.planning/quick/NNN-slug/PLAN.md` (or `*-PLAN.md` in that folder)
2. A path the developer named (legacy `NOTES.md` beside the work, if still
   present)
3. The session task list, when the work was too small for slice-planning

If there is no plan, stop and run **slice-planning** first.

Every executable unit must be **Behavior | Structure**, stop-safe, one
observable behavior or its immediately enabling Structure
(`.cursor/rules/problem-decomposition.mdc`). If it is not, stop and
re-plan with **slice-planning** before implementing.

Reject a story-decomposition seed as execution input. Require a PLAN for
one selected story.

**Coordinator role:** You are a thin coordinator. You do **not** implement
slices yourself (except a single interactive slice, or when the environment
cannot spawn a Task). Delegate each slice to a **fresh** sub-agent so
context does not accumulate.

**Wrap-up ownership (hard):** The **coordinator** owns post-change-refactor,
plan update, and commit. Implementers must **not** commit and must **not**
run post-change-refactor themselves. The coordinator spawns a **fresh**
refactor agent (or a distinct refactor pass) and must see
`## REFACTOR COMPLETE` (or handle `## REFACTOR JIDOKA STOP`) before
committing.

**Resume:** The PLAN file being executed is the source of truth for
remaining slices. Do **not** write `.planning/STATE.md`.

**Parallelism:** Run independent slices in parallel when touch sets do not
overlap and they do not contend on the same plan file. Otherwise sequential.
Each parallel unit still gets its own coordinator-owned refactor → commit
before the next dependent unit starts.

**Commit authorization:** Invoking this skill authorizes **one commit per
closed slice**. Do **not** push unless the developer explicitly asked.
</context>

<process>

<preflight_gate name="jidoka_stop_conditions">
Run with full autonomy **but stop the line** when something requires a
developer's brain.

**Stop and wait when:**

- **Value decision** — multiple valid directions with different
  audience/reader-facing trade-offs; the plan says "TBD", "decide",
  "option A / B", or you discover such a fork during implementation.
- **Design decision** — a structural choice that affects future slices or
  overall architecture (theme/tooling layout, claim/deck structure that
  should be an ADR).
- **Authentication / credentials** — secrets, API keys, login flows, or
  permissions the agent cannot supply.
- **Unexpected failure you cannot diagnose** — typecheck/build fails for
  reasons unrelated to the current change, or an external tool breaks.
- **Ambiguity** — the slice description is unclear and guessing wrong
  would waste a commit.
- **Stale story decomposition** — evidence changes the selected story's
  beneficiary, outcome, evaluation, or boundary; or changes whether/when
  a sibling story should be delivered.

When stopping: explain **what** you learned, **why** you stopped, and
**what decision** the developer needs. Then wait.

**Do NOT stop for:**

- Routine implementation choices (wording inside a decided claim, file
  placement, naming) where existing rules and conventions give a clear
  answer.
- Minor refactoring needed to make the slice fit.
- Check failures caused by your own change (fix them).

**Check Jidoka both before and after each slice:**

- **Before** (coordinator, on the slice *description*) — safe to start
  autonomously? Value/design forks, ambiguity, missing credentials,
  Behavior/Structure grammar.
- **After** (implementer return + refactor return) — did work reveal
  something the plan did not anticipate? Stop even if the slice succeeded.
</preflight_gate>

<step name="coordinator_loop">
```
1. Read the plan (`.planning/quick/NNN-slug/PLAN.md` / named path / session list)
2. Find the next slice whose status is NOT "done"
3. Pre-slice Jidoka + Behavior/Structure check
   → If stop condition → report & STOP
4. DELEGATE implementation only to a fresh sub-agent (see delegation)
5. When implementer finishes:
   a. If Jidoka stop / REVERT & SPLIT → handle as below; do not wrap up
   b. Verify relevant checks were reported green (no intentional
      typecheck/build break) and `git status` shows uncommitted work
      (or a deliberate empty slice with a stated reason). Do not require
      a full build of unrelated decks.
   c. If the implementer already committed → process failure: stop and
      report. Prefer fixing by soft-resetting an unpushed commit only
      when safe and the developer has not forbidden it; otherwise wait.
6. COORDINATOR WRAP-UP (required — do not skip): follow wrap_up.
7. Go to step 1 (next slice)
8. All slices done → delete the spent `.planning/quick/NNN-slug/`
   directory (or leftover disposable NOTES.md) → report & STOP
```

Recognize slices by headings/status. Typical section:

```markdown
### Short capability description
Type: Behavior | Structure
Status: planned / in-progress / done

What changes, for whom, and how you'll know it's done (Behavior)
— or —
Structure change + immediate next Behavior it unlocks
```
</step>

<step name="delegation">
Use the **Task** tool (`subagent_type: "generalPurpose"`).

The implementer prompt **must** include:

1. **Plan file path** (or "session task list") and **which slice** to
   implement (paste the slice text). Do **not** paste this skill or the
   full Jidoka list.
2. **Jidoka:** stop and return on value/design forks, missing credentials,
   undiagnosed unrelated failure, or ambiguity. Do not guess those.
3. **Implementation rules**: `problem-decomposition.mdc`
   (Behavior/Structure, stop-safety, **time budget** ~5 min fuzzy /
   >10 min hard finer-decompose) and `planning.mdc` (proof, slice
   discipline, **do not leave typecheck/build broken**). Checks:
   `pnpm typecheck` / `pnpm build` for code or rendered decks; a
   read-through for prose. Run checks relevant to the change, not
   every deck.
4. **Hard stop before wrap-up:** Do **not** commit, push, mark the plan
   `done`, or run post-change-refactor. Leave the tree uncommitted with
   relevant checks green.
5. **Revert & split** if the slice is too big (`revert_and_split`).
6. **Return**: short summary — ready for wrap-up (checks run), Jidoka
   stop, or reverted and split. Do not claim the slice "done" in git terms.

**Do NOT pass entire plan history** — only the current slice. Resume
context lives in the plan file on disk (or the session task list).
</step>

<step name="wrap_up">
**Coordinator-owned** (after implementer returns with relevant checks
green, uncommitted):

1. **Spawn post-change-refactor** — Fresh Task (`generalPurpose`) that
   reads `.agents/skills/post-change-refactor/SKILL.md` and runs it
   end-to-end on the current uncommitted change. Pass:
   - Slice text being closed
   - Plan file path (for immediate-next-slice justification)
   - Do **not** commit
   - Return must end with `## REFACTOR COMPLETE` or
     `## REFACTOR JIDOKA STOP`
2. **Gate** — Proceed only on `## REFACTOR COMPLETE`. On Jidoka stop or
   missing marker, do not commit.
3. **Reflect & re-plan** — update the plan being executed:
   - Brief learnings that change remaining work.
   - Mark slice **done**; prune obsolete detail from that slice.
   - Adjust future slices when warranted.
   - If the PLAN links a story-decomposition seed, apply the learning
     escalation in `problem-decomposition.mdc`. Update leaf-only
     changes in the PLAN. For a stale story decomposition, add an
     `awaiting story decomposition review` note naming the seed/story
     and affected field; do not alter sibling stories.
   - Last slice: delete the spent `.planning/quick/NNN-slug/` directory
     (or leftover disposable NOTES.md) whose work has all landed
     (include that deletion in this commit).
4. **Post-slice Jidoka** — if learnings need developer judgment: commit
   work so far, then return a Jidoka stop (do not silently continue).
   For stale story decomposition, report the seed/story, evidence,
   affected field, and required human decision.
5. **Commit** — only when the tree would not intentionally break
   `pnpm typecheck` / `pnpm build`. Stage this slice's files, not
   unrelated dirty paths. Message follows the repo's recent convention
   (why, not a dump of files). Do **not** push unless asked.
   If the commit fails on a hook: fix from the hook output, then retry
   with a **new** commit (do not amend unless the developer asked and
   the amend rules are met).
</step>

<step name="revert_and_split">
A slice is **too big** when:

- Changes span many unrelated files with no clear single outcome emerging.
- Checks are not converging after reasonable effort.
- Wall-clock for the slice (implementation + checks) exceeds the
  **time budget** in `problem-decomposition.mdc`: scrutinize after
  **~5 min**; after **>10 min**, finer decompose and retry is
  **required** unless a good reason is stated (and reported to the
  coordinator / developer).

When this happens:

1. Identify the exact tracked and untracked paths created or changed
   by this attempt. Preserve every pre-existing developer change.
2. Safely park or revert only attempt-owned WIP. Never use broad
   `git checkout .`, `git clean -fd`, or another command that can
   discard unrelated dirty state. If ownership cannot be isolated,
   stop for developer judgment.
3. Invoke **slice-planning** to split into Behavior/Structure slices
   sized for the ~5 minute fuzzy goal (including checks).
4. Update the PLAN in `.planning/quick/NNN-slug/` (or session list).
5. Commit the updated plan (still no push unless asked).
6. Return "reverted and split" to the coordinator (include elapsed time
   and whether the 10-minute hard trigger applied).
</step>

</process>

<success_criteria>
- Each slice implemented by a fresh sub-agent (coordinator does not
  accumulate implementation context), except the single-interactive /
  no-Task fallback
- Coordinator owns wrap-up: fresh post-change-refactor →
  `## REFACTOR COMPLETE` → plan update → commit (push only if asked)
- Pre- and post-slice Jidoka checks applied
- Stale story decomposition stops execution after the current safe wrap-up
- Parallel waves only when touch sets and plan writes do not conflict
- Spent `quick/NNN-slug/` directory deleted when the entire plan is done
- Final output includes `## PLAN EXECUTION COMPLETE` when all slices
  finish
</success_criteria>

<output>
When the loop ends (all slices done or a stop condition):

1. **Summary** — which slices were completed this run.
2. **Current state** — the plan being executed and next undone slice for
   resume (if stopped).
3. **Next action** — developer decision needed, or confirm cleanup done.

```
## PLAN EXECUTION COMPLETE
```

(Use when all slices are done. For Jidoka stops, report the stop reason
and wait — do not emit the completion marker until the developer
resolves and work resumes.)
</output>

<out_of_scope>
- Do not implement slices in the coordinator agent (except single
  interactive slice, or when Task cannot be spawned — then still run
  wrap-up as a distinct pass).
- Do not skip coordinator-owned post-change-refactor or commit per slice.
- Do not accept an implementer self-refactor or a missing
  `## REFACTOR COMPLETE` as wrap-up.
- Do not pass full plan history to sub-agents.
- Do not continue past a Jidoka stop without developer input.
- Do not commit with a deliberately broken typecheck/build.
- Do not push unless the developer asked.
- Do not write GSD artifacts (`STATE.md`, `PROJECT.md`, `phases/`, …).
</out_of_scope>
