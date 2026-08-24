# AGENTS.md

Guidance for Codex (and other AGENTS.md-reading agents) when working in this
repository. Skill contracts: `.agents/skills/`; rules: `.cursor/rules/`.

Same content as `CLAUDE.md` — keep both in sync when editing.

## Project

terry-talks holds Terry's talks, presentations, and (potentially) blogs,
built with Slidev. Content lives alongside slides (e.g. `TPS and AI/`).

## Layout

```
slides/<deck>/slides.md   # One Slidev deck per talk (frontmatter selects theme)
themes/                    # Local Slidev themes shared across decks (e.g. themes/odd-e)
legacy/                    # Retired Jupyter/nbconvert toolchain, not maintained:
                            #   legacy/slides (old notebooks), legacy/odde_training_template
                            #   (submodule), legacy/Makefile
TPS and AI/                 # Claims-based writing project (claims/, open-questions.md)
docs/adrs/                  # Durable decisions (tooling + content structure)
```

Run `pnpm present` to pick and launch a talk. (Named `present`, not `show`,
because `show` is a reserved pnpm alias for its own registry-info command —
`pnpm show` would bypass this script even with a same-named entry in
`package.json`.)

**ADRs:** Solo propose → deliberate → approve in `docs/adrs/`; agents follow
Accepted ADRs via `adr-awareness` (do not approve).

**Workflow:** Break work into stop-safe Behavior/Structure slices via
`slice-planning`; run `post-change-refactor` on the uncommitted change before
each commit.
