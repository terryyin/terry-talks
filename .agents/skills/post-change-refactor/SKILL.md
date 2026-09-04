---
name: post-change-refactor
description: >-
  Refactor concepts implicated by the current uncommitted change before
  commit. Use concept-bounded scope even when completion requires untouched
  code, but Jidoka-stop before unapproved cross-subsystem refactoring. Remove
  duplication, unclear naming, shotgun surgery, dead/redundant code, and
  oversized code files; run related checks only when the refactor edits.
  Local slice wrap-up overlay for execute-plan. Use after a slice, before
  commit, or on: refactor change, clean up change, post-change refactor,
  before commit cleanup, tidy current change.
---

<objective>
Clean concepts implicated by the **current uncommitted change** so they are
cohesive, capability-named, and non-speculative, then return control for
commit.

Purpose: local wrap-up gate required by `execute-plan`. Structure-only: no
new Behavior.

Output: refactored tree + `## REFACTOR COMPLETE`, or an impact report +
`## REFACTOR JIDOKA STOP`. **Do not commit** — the caller commits.
</objective>

<context>
**Scope is concept-bounded, not file-bounded.** A candidate must be triggered
by an issue introduced, exposed, or materially aggravated by the current
change or highly related content. Such content represents the same concept,
duplicates the same knowledge, or must change to leave it coherent.
Dependency adjacency alone is neither required nor sufficient.

Find the smallest complete set of representations, callers, and configuration
needed for coherence, including untouched files when needed. Every edit must
serve that candidate; do not initiate nearby cleanup.

Discover scope:

```bash
git status
git diff
git diff --cached
```

**Plan justification (decision boundary):** Keep content justified by the
**current change** or the **immediate next** slice (if a plan note exists).
Anything justified only by "we might need it later" is speculative — remove
it.

**Subsystem boundary — treat each as separate:**
- Shared tooling/theme (`themes/`, `scripts/`, root config: `package.json`,
  `flake.nix`, `vite`/`slidev` config)
- An individual deck (`slides/<deck>/`) — one deck's content is its own
  concept scope
- `TPS and AI/claims/` — a different domain (prose argument) from Slidev code
- `docs/adrs/` — governed by `adr-awareness`; don't restructure decision
  records from inside this skill
- `legacy/` — retired, not maintained; do not refactor it

Refactoring driven by one deck's content does not need to touch another
deck's content. A shared-theme change touching many decks' rendering is
cross-cutting — see the Jidoka gate below and consider whether it should be
an ADR (`adr-awareness`) instead of an ad hoc refactor.

Optional caller context (when spawned from execute-plan):
- Plan path and current slice text (for the immediate-next-slice
  justification boundary)
- Implementer's compact `proof:` block(s), including each exact focused
  command and the behavior or paths it covers

**Invokers:** `execute-plan` (fresh sub-agent before commit), or an
on-demand request ("refactor this", "clean up before commit").
</context>

<process>

<preflight_gate name="discover_scope">
Run the git discovery commands above. If there is no uncommitted change,
report empty scope and emit `## REFACTOR COMPLETE` with no edits.
</preflight_gate>

<preflight_gate name="map_concept_impact">
Before editing, read [the refactor checks](references/refactor-checks.md) and
perform a fast read-only pass over every check. For each candidate, record:

1. The triggering issue and its connection to the current change.
2. The minimum concept-bounded edit set needed for coherent completion.
3. The subsystems that edit set would touch.

Use references as navigation, not automatic scope. Do not inventory general
repository cleanup.
</preflight_gate>

<preflight_gate name="cross_subsystem_jidoka">
If a candidate requires coordinated edits across more than one subsystem
(above), stop before editing unless the human explicitly authorized that
named concept and those subsystems. A generic "clean up" or "refactor"
request does not qualify.

Return the `<output>` Jidoka report; do not enter the edit pass or substitute
a partial refactoring. If discovered while editing, stop before the first
cross-subsystem edit and leave no partial candidate: reverse only this
agent's edits for that candidate, never pre-existing user changes.
</preflight_gate>

After the gates, **decide first**: if `map_concept_impact` recorded no edit
candidates (and the cross-subsystem gate did not stop), skip the edit steps
and `confirm_related_checks`; report "none — already clean" and emit
`## REFACTOR COMPLETE`. Do not run related checks as a pre-triage gate.

If there are edit candidates, execute them **in refactor-check order**, then
`confirm_related_checks`. Do not repeat broad discovery. After checks pass,
return to the caller — **do not commit** from inside this skill.

<step name="confirm_related_checks">
Skip this step when triage recorded no refactor edits.

When the caller provided compact proof, rerun only the handed-off command(s)
whose covered behavior or paths the refactor edits invalidated — not the
whole suite, and not before deciding to edit. If an edit moved the covered
boundary so a handed-off command is no longer the right focused proof, state
why and run a focused replacement. Do not rerun unaffected handed-off proof.
Without a proof handoff, run the check relevant to what this refactor
touched:

- Script/theme code (`.ts`, `.vue`, `.mjs`): `pnpm typecheck`
- Deck/theme rendering: `pnpm build` (or `pnpm dev` preview for a visual
  check)
- Prose only (claims, open questions, ADRs): read through — no build

All relevant checks must pass before returning. If a check breaks because of
the refactor (not the original change), fix it now.
</step>

</process>

<success_criteria>
- Every candidate is triggered by the current change or highly related content
- Edits are the smallest coherent concept-bounded set, including untouched files
- No cross-subsystem refactoring without concept-specific human authorization
- No speculative content beyond the current change / immediate next slice
- Duplication, naming, shotgun, dead-code, and 250-line checks applied
- Invalidated handed-off proof (or related focused checks without a handoff)
  green when this skill edited; skipped when triage made no edits
- Successful and Jidoka handoffs report approximate active elapsed time
- No commit created by this skill
- Final successful output includes `## REFACTOR COMPLETE`
</success_criteria>

<output>
On successful completion, report a short summary to the caller:

1. Which checks led to changes — duplication / naming / shotgun / dead code /
   file size (or "none — already clean").
2. Files renamed, extracted, split, or deleted.
3. Which checks were run and confirmed passing — or
   `skipped — no refactor edits`.
4. Approximate active elapsed time spent on the refactor pass.

```
## REFACTOR COMPLETE
```

Hand control back. **Do not commit.**

On a cross-subsystem gate, report only decision-relevant facts:

1. Triggering issue and its connection to the current change.
2. Concept requiring refactoring.
3. Affected subsystems and representative files.
4. Why a single-subsystem edit would be partial or misleading.
5. Expected risk and focused validation.
6. Choices: authorize it, defer it, or approve a described narrow exception.
7. Approximate active elapsed time spent before the stop.

End with:

```
## REFACTOR JIDOKA STOP
```

Do not emit `## REFACTOR COMPLETE`. The caller must surface the decision and
must not consider refactoring complete or commit until the human decides.
</output>

<out_of_scope>
- Do not initiate unrelated refactoring discovered during concept tracing.
- Do not apply cross-subsystem refactoring without explicit, concept-specific
  human authorization.
- Do not start a new slice or add new Behavior — Structure and remove only.
- Do not run checks when triage recorded no refactor edits.
- Do not commit, push, or amend from inside this skill.
</out_of_scope>
