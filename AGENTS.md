# AGENTS.md

Guidance for Codex (and other AGENTS.md-reading agents) when working in this
repository. Skill contracts: `.agents/skills/`; rules: `.cursor/rules/`.

Same content as `CLAUDE.md` — keep both in sync when editing.

## Project

terry-talks holds Terry's talks, presentations, and (potentially) blogs,
built with Slidev, plus in-tree Remotion videos under `terry-moves/`.
Content lives alongside slides (e.g. `TPS and AI/`).

## Layout

```
slides/<deck>/slides.md   # One Slidev deck per talk (frontmatter selects theme)
themes/                    # Local Slidev themes shared across decks (e.g. themes/odd-e)
terry-moves/               # In-tree Remotion videos; run `pnpm moves` (studio/test/render/srt)
legacy/                    # Retired Jupyter/nbconvert toolchain, not maintained:
                            #   legacy/slides (old notebooks), legacy/odde_training_template
                            #   (submodule), legacy/Makefile
TPS and AI/                 # Claims-based writing project (claims/, open-questions.md)
docs/adrs/                  # Durable decisions (tooling + content structure)
.planning/PRODUCT-BACKLOG.md # Ordered unfinished stories (titles + home seeds)
.planning/seeds/            # Non-executable story decompositions
.planning/quick/NNN-slug/   # Ad-hoc executable plans (PLAN.md); delete the folder when landed
```

Run `pnpm present` to pick and launch a talk. (Named `present`, not `show`,
because `show` is a reserved pnpm alias for its own registry-info command —
`pnpm show` would bypass this script even with a same-named entry in
`package.json`.) Run `pnpm moves` for Remotion Studio in `terry-moves/`
(`pnpm moves test` / `render` / `srt` skip the default).

**ADRs:** Solo propose → deliberate → approve in `docs/adrs/`; agents follow
Accepted ADRs via `adr-awareness` (do not approve).

**Workflow:** Unclear value, outcome, or story boundaries →
**story-decomposition** (one seed under `.planning/seeds/`; not
executable). Queue or reprioritize unfinished stories with
**product-backlog** (`.planning/PRODUCT-BACKLOG.md`; details stay in
home seeds). One selected story → **slice-planning** (writes
`.planning/quick/NNN-slug/PLAN.md`), then optional
**slice-plan-refinement** in place when that PLAN is complex, sizing
confidence is low, or execution overruns; skip the extra pass when
slice-planning already produced clear commit-sized leaves. Execute with
**execute-plan** (Jidoka → fresh post-change-refactor agent → coordinator
runs `./scripts/run.sh pnpm format:changed` once → update plan without a
second routine formatting pass → commit per slice; independent check-only
lint hook). `format-changed` remains on-demand; implementers/refactorers
run neither it nor standalone `lint:changed`. After a completed plan,
**execution-retrospective** reconstructs the plan and its commits, audits
the aggregate result and process, and stops after generating any follow-up
PLAN without executing it. Prefer committing all changes
and leaving none local; partial commits are deliberate. The pre-commit
hook lints staged components without formatting or mutating Git state.
Hard decomposition grammar lives in
`.cursor/rules/problem-decomposition.mdc`; planning artifacts/lifecycle
in `.cursor/rules/planning.mdc`. Do not push unless asked. No GSD
(`phases/`, `PROJECT.md`, `STATE.md`, `/gsd-*`) unless the owner asks.
