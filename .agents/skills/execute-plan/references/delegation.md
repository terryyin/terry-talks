# Slice Delegation

Use the **Task tool** (`subagent_type: "generalPurpose"`). Keep wrap-up
coordinator-owned.

The implementer prompt must include:

1. The plan path (or "session task list") and current slice text, but not the
   full plan history or Jidoka list.
2. A Jidoka stop for value/design forks, missing credentials, undiagnosed
   unrelated failures, or ambiguity.
3. `problem-decomposition.mdc` and `planning.mdc`, including the ~5-minute
   fuzzy / >10-minute hard split budget, relevant-check proof, no deliberately
   broken typecheck/build, and capability naming. Checks: `pnpm typecheck` /
   `pnpm build` for code or rendered decks; a read-through for prose. Run
   checks relevant to the change, not every deck.
4. A hard stop before wrap-up: do not commit, push, mark the plan done, or run
   post-change-refactor. Leave relevant checks green and the tree uncommitted.
5. `revert_and_split` when the slice is too big.
6. A short return: ready for wrap-up with checks, Jidoka stop, or reverted and
   split. Do not claim the slice is done in Git terms.

Resume context remains in the plan on disk.
