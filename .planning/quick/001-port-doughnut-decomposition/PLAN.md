# Port doughnut problem → story → leaf decomposition

**Source:** doughnut `3e518e3994a9a38c7ff5127a7265d903b2acac33` (chore(documentation): enhance agent and planning guidelines).

**Outcome and boundaries:** Agents in terry-talks follow the same routing as doughnut: unresolved value/outcome → **story-decomposition** (non-executable seed); one selected story → **slice-planning**; execution leaves → **execute-plan**. Keep this repo’s overlays: no GSD unless the owner asks, no push unless asked, proof is typecheck/build/read-through (not E2E/`@wip`). Do not add doughnut-only files this repo never had (`agent-map.md`, `general.mdc`, `gsd-coexistence.mdc`). Do not change talk/claim content.

**Outside-in proof:** A reader can open the always-apply rules and skills and see the doughnut split (problem-decomposition grammar vs planning artifacts; seed vs PLAN; execute-plan rejects seeds and escalates stale stories), with terry-talks locations and wrap-up.

## Current decisions

- Port doughnut’s *decisions and skill contracts*, not its GSD/Nix/CI stack.
- Seed YAML keeps doughnut’s fields; `planted_during` is talk/claim context, not a milestone.
- `.claude/skills/story-decomposition` is a symlink, matching the other skills.

## 1. Split always-apply planning rules

Type: Behavior
Status: done
Proof: `problem-decomposition.mdc` (always-apply grammar) + `planning.mdc` (route, seeds/`quick/`, proof, cleanup).

## 2. Add story-decomposition skill

Type: Behavior
Status: done
Proof: `.agents/skills/story-decomposition/SKILL.md` + `.claude/skills` symlink.

## 3. Thin slice-planning to a selected-story PLAN writer

Type: Behavior
Status: done
Proof: input gate, cites problem-decomposition + planning.mdc, writes only `.planning/quick/`.

## 4. Update execute-plan for seeds and stale stories

Type: Behavior
Status: done
Proof: rejects seeds; problem-decomposition for leaf/time-box; stale-story Jidoka; safer revert.

## 5. Align AGENTS.md and CLAUDE.md

Type: Behavior
Status: planned
Proof: both files stay in sync; workflow names story-decomposition, seeds, problem-decomposition, and selected-story slice-planning.

Behavior: With a new agent reading the project digest → it sees the same routing as the rules/skills.

## Learnings

- Keep one GSD overlay in `planning.mdc` (route section). Do not reintroduce doughnut “phase outcome” wording in remaining terry-talks files.

