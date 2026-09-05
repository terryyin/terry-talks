# Slice Wrap-up

The coordinator first checks coverage under `planning.mdc`'s Proof decisions,
including applicable replacement/lifecycle obligations. Return behavioral gaps
to implementation before refactor or acceptance, including gaps refactor finds.
Require typecheck/build-safe uncommitted work: no deliberate `pnpm typecheck` /
`pnpm build` break. Do not run a full build of unrelated decks.

Accept the `proof:` handoff from `delegation.md` by default. Rerun only for a
missing/ambiguous handoff, a boundary changed by wrap-up, or a broader integration
proof the slice closes but the handoff omitted. Placeholders, abbreviations, and
paraphrases are ambiguous: first recover the literal command from the original
handoff if available. Reuse adequate/recovered proof; never randomly sample it.

1. Spawn a fresh general-purpose sub-agent to read and run
   `.agents/skills/post-change-refactor/SKILL.md` end-to-end. Pass only the slice
   text, plan path, implementer's compact `proof:` block(s), no-commit
   constraint, and required completion markers. Restate that it must decide
   whether to edit before running checks: with no refactor edits, run no checks
   and report `skipped — no refactor edits`; with edits, rerun only the
   handed-off proof command(s) invalidated by those edits, or name and run a
   replacement when an edit moved the covered boundary. Explicitly forbid
   `format:changed` and standalone `lint:changed`; formatting and lint ownership
   remain with the coordinator.
2. Proceed only on `## REFACTOR COMPLETE`; stop without committing on a Jidoka
   stop or missing marker.
3. Run `./scripts/run.sh pnpm format:changed` directly once after refactor;
   require success before staging/committing. Let the command select
   components (planning-only is a valid no-op); no pre-filtering or formatting
   agent. Repair mechanical failures and repeat only if that repair invalidates
   preparation. Stop for semantic/design judgment.
4. Update the plan, never `.planning/STATE.md`: record brief relevant learnings,
   mark the slice done, prune obsolete detail, and adjust future leaves. If
   linked story understanding became stale, add an `awaiting story review` note
   naming the seed/story and affected field; route via
   `problem-decomposition.mdc` without altering sibling stories. This PLAN
   edit does not trigger a second formatting pass. Last slice: delete the spent
   `.planning/quick/NNN-slug/` directory (include that deletion in this commit).
5. If post-slice learning needs developer judgment, commit safe work so far,
   then return a Jidoka stop with the required decision. Do not push unless
   asked.
6. Commit only work that would not intentionally break `pnpm typecheck` /
   `pnpm build`. Review the diff, prefer staging all changes so none remain
   local, and make a partial commit only deliberately. The hook runs
   check-only `pnpm lint:changed` on staged components; it must not format or
   mutate the Git index. Resolve mechanical findings; stop for semantic/design
   judgment. Do not run standalone
   `lint:changed`. If a hook repair invalidates preparation, rerun the direct
   formatting command before restaging and retrying. Do not push unless asked.
