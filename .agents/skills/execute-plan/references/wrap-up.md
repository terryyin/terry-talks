# Slice Wrap-up

The coordinator owns this sequence after the implementer returns with relevant
checks green, no intentional typecheck/build break, and uncommitted changes.

1. Spawn a fresh Task (`generalPurpose`) to read and run
   `.agents/skills/post-change-refactor/SKILL.md` end-to-end. Pass only the slice
   text, plan path, no-commit constraint, and required completion markers.
2. Proceed only on `## REFACTOR COMPLETE`; stop without committing on a Jidoka
   stop or missing marker.
3. Spawn a fresh minimal-context Task (`generalPurpose`) to read and run
   `.agents/skills/format-changed/SKILL.md` end-to-end. Pass only the skill path
   and instruction to prepare current changes. It must not stage, commit, push,
   revert, or update the plan.
4. Proceed only on `## FORMAT CHANGED COMPLETE`; stop without staging or
   committing on a Jidoka stop or missing marker.
5. Update the plan, never `.planning/STATE.md`: record brief relevant learnings,
   mark the slice done, prune obsolete detail, and adjust future leaves. If a
   linked story decomposition became stale, add an
   `awaiting story-decomposition review` note naming the seed/story and affected
   field without altering sibling stories. Last slice: delete the spent
   `.planning/quick/NNN-slug/` directory (include that deletion in this commit).
6. If post-slice learning needs developer judgment, commit safe work so far,
   then return a Jidoka stop with the required decision. Do not push unless
   asked.
7. Commit only work that would not intentionally break `pnpm typecheck` /
   `pnpm build`. Review the diff, prefer staging all changes so none remain
   local, and make a partial commit only deliberately. The hook runs check-only
   `pnpm lint:changed` on staged components. Resolve mechanical findings
   directly; stop for semantic/design judgment. After any file change, rerun
   the fresh format-changed step before restaging and retrying. Do not push
   unless asked.
