# Selective commit quality

## Source

Port of doughnut commits `6e9ffde1`, `1e6e69cc`, and `5e0bc028` (2026-09-04):
shared changed-component dispatch, lint-only pre-commit, and explicit
formatting before commit.

## Outcome and boundaries

Developers and agents can prepare formatted changes before committing, while the
pre-commit hook validates affected components without mutating the working tree
or Git index. This keeps deliberate partial commits possible. Agent guidance
prefers committing all changes and leaving no local changes, without making that
an absolute hook-enforced constraint.

Representative behavior: given staged `terry-moves` changes, when a commit is
attempted, then `terry-moves` lint runs without formatting or staging files.

Outside this story: enforcing one worktree per agent, prohibiting partial
commits, changing formatter/linter rules (including applying unused Prettier to
`terry-moves`), mass-formatting existing files, or adding CI.

## Outside-in proof

Script tests exercise the real changed-component command boundary and the
version-controlled pre-commit hook. Skill validation and focused review confirm
the agent workflow delegates formatting before commit.

## Slices

### 1. Selective quality commands share changed-component knowledge
Type: Behavior
Status: done
Proof: Focused script tests show working-tree formatting and staged linting
dispatch only the affected component commands, including untracked formatting
inputs.

Behavior: Given changed files in one or more repository components, when
selective format or lint is requested, then the matching component commands run
from one shared component mapping without duplicating detection logic.

### 2. Pre-commit validates without mutation
Type: Behavior
Status: planned
Proof: A focused hook test demonstrates that a commit attempt invokes
`lint:changed`, never invokes formatting, and never stages files.

Behavior: Given an intended commit, when the pre-commit hook runs, then it
lints the affected staged components and either succeeds or blocks the commit
without changing the worktree or index.

### 3. Agents prepare formatting explicitly
Type: Behavior
Status: planned
Proof: The new skill matches doughnut's format-changed contract, and
execution/rule documentation consistently delegates selective formatting to a
fresh minimal-context agent before staging and committing.

Behavior: Given a completed implementation slice, when an agent prepares to
commit, then a fresh formatting agent runs selective formatting and reports
success or a judgment stop before the coordinator stages the intended changes.

## Current decisions

- The pre-commit hook is check-only; it does not enforce committing every local
  change. This repo still does not push unless asked.
- Formatting examines working-tree changes, including untracked files. Linting
  selects components from staged changes because it validates the intended
  commit.
- The reusable scripts own mechanics. The skill owns agent orchestration and
  does not duplicate component knowledge.
- Components: `terry-moves` (existing ESLint, `eslint --fix` / `eslint src`) and
  `root` (`scripts/*.mjs` syntax check via `node --check` in both modes — there
  is no root formatter). Do not adopt Prettier as a gate; it is an unused
  `terry-moves` dependency and would rewrite a large dirty tree.
- Repo tooling runs through `./scripts/run.sh` so git hooks work inside or
  outside Nix. Git itself needs no runner.
