# Slice Delegation

Use a fresh general-purpose sub-agent. Keep wrap-up coordinator-owned.

The implementer prompt must include:

1. The plan path (or "session task list") and current slice text, but not the
   full plan history or Jidoka list.
2. A Jidoka stop for value/design forks, missing credentials, undiagnosed
   unrelated failures, or ambiguity.
3. `problem-decomposition.mdc` and `planning.mdc`, including the ~5-minute
   fuzzy / >10-minute hard split budget, relevant-check proof, no deliberately
   broken typecheck/build, and capability naming. Checks: `pnpm typecheck` /
   `pnpm build` for code or rendered decks; a read-through for prose. Run
   checks relevant to the change, not every deck. Do not run a broader suite
   unless the slice's proof names that suite.
4. A hard stop before wrap-up: do not commit, push, mark the plan done, run
   post-change-refactor, run `format:changed`, or run standalone `lint:changed`.
   Leave relevant checks green and the tree uncommitted.
5. `revert_and_refine` when the slice is too big; the coordinator will invoke
   **slice-plan-refinement** on the existing PLAN.
6. A short return: ready for wrap-up with one or more compact proof blocks,
   Jidoka stop, or reverted and ready for refinement. Do not claim the slice is
   done in Git terms. Use this repeatable shape for every green focused command:

   ```text
   proof:
     command: <exact focused check command>
     covers: <behavior or paths this command covers>
     result: pass
   ```

   The command must be literal and complete. A placeholder, abbreviation, or
   paraphrase is missing or ambiguous proof.

Resume context remains in the plan on disk.
