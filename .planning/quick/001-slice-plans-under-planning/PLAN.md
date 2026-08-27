# Slice plans live under `.planning/quick/`

**Status:** in progress — slice 1 done; **next: slice 2** (relocate terry-moves NOTES.md)
**Type:** ad-hoc plan (`.planning/quick/`)

Put **slice-planning** output in a numbered folder, as doughnut does for
ad-hoc work. Do not adopt doughnut's GSD milestone tree.

## Goal

Agents writing or executing a slice plan use
`.planning/quick/NNN-slug/PLAN.md` (next free 3-digit `NNN`). Spent plan
directories are deleted when every slice has landed. Root `NOTES.md` and
beside-the-work plan notes are no longer the convention.

## Key design decisions

- **Naming from doughnut `quick/` only.** Path is
  `.planning/quick/NNN-slug/PLAN.md`. `NNN` is the next free 3-digit
  number at write time; `slug` is kebab-case. Do not write a flat
  `.planning/<name>.md`.
- **No GSD.** Do not add `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`,
  `STATE.md`, `config.json`, or `.planning/phases/`. Do not tell agents to
  run `/gsd-new-project`. `execute-plan` still must not write `STATE.md`.
- **Keep terry-talks wrap-up.** Jidoka → post-change-refactor → update
  PLAN → commit. Do **not** push unless asked. No CD deploy gate.
- **Cleanup like doughnut.** While a plan is in progress, keep resume
  status in that PLAN. When the last slice lands, delete the spent
  `NNN-slug/` directory (include that deletion in the last commit). Do
  not leave completed plans as a diary.
- **Product files stay capability-named.** Plan and slice numbers belong
  only under `.planning/`.
- **Tiny work.** A session task list is still enough for work too small
  to need slice-planning. Once slice-planning runs, it always writes a
  `quick/NNN-slug` PLAN.
- **No ADR in this plan.** Layout is owner-directed (this request). ADR-0000
  still governs durable decisions; draft a Proposed ADR only if asked.

## Discoveries

- Doughnut also has `.planning/phases/` plus GSD `PROJECT` / `ROADMAP` /
  `STATE` for milestones. This repo has no roadmap tool; copying that
  tree would invite `/gsd-new-project` without buying a milestone process.
- Commit `43144fe` currently forbids `.planning/` and GSD in skills and
  `AGENTS.md` / `CLAUDE.md`. This plan reverses only the plan-location
  rule.
- In-progress terry-moves work lives at repo-root `NOTES.md`. After this
  convention exists, that file should move to `002-terry-moves-merge`
  (this folder is `001`).
- `.claude/skills/*` are symlinks into `.agents/skills/`; edit the
  `.agents` copies only.

## Slices

### 1. Agent workflow writes and executes `.planning/quick/NNN-slug/PLAN.md`

- **Type:** Behavior
- **Status:** done
- **Do:** Update `planning.mdc`, `slice-planning`, and `execute-plan` so
  written plans go to `.planning/quick/NNN-slug/PLAN.md`, execute-plan
  looks there first, and a finished plan's directory is deleted. Keep
  no-GSD, no-push, no-STATE.md. Align `AGENTS.md` and `CLAUDE.md` layout
  plus workflow lines (keep those two files in sync).
- **Done when:** those files describe the doughnut `quick/NNN-slug`
  convention and no longer say "do not create `.planning/`".

### 2. Relocate the in-progress terry-moves plan

- **Type:** Structure
- **Status:** planned
- **Unlocks:** execute-plan can resume terry-moves from the numbered
  folder (no root `NOTES.md`).
- **Do:** Move repo-root `NOTES.md` to
  `.planning/quick/002-terry-moves-merge/PLAN.md`. Keep the body; add
  `**Type:** ad-hoc plan (\`.planning/quick/\`)` if missing. Do not start
  terry-moves slices.
- **Done when:** no root `NOTES.md`; the terry-moves plan is at
  `002-terry-moves-merge/PLAN.md`.

## Out of scope

- GSD onboard (`/gsd-new-project`, phases, ROADMAP, STATE, config.json).
- Executing the terry-moves merge.
- Writing or accepting an ADR.
- Pushing.
