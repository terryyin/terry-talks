# CLAUDE.md

Guidance for Claude Code when working in this repository. Project-local Open
Dough skills live under `.claude/skills/`.

Same content as `AGENTS.md` — keep both in sync when editing.

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
```

Run `pnpm present` to pick and launch a talk. (Named `present`, not `show`,
because `show` is a reserved pnpm alias for its own registry-info command —
`pnpm show` would bypass this script even with a same-named entry in
`package.json`.) Run `pnpm moves` for Remotion Studio in `terry-moves/`
(`pnpm moves test` / `render` / `srt` skip the default).

**ADRs:** Solo propose → deliberate → approve in `docs/adrs/`; agents follow
Accepted ADRs via `dough-adr-awareness` (do not approve).

**Workflow:** Use the installed `dough-*` skills as the authoritative workflow.
Do not recreate project-local variants of their rules, scripts, or supporting
documents. Do not push unless asked. No GSD (`phases/`, `PROJECT.md`,
`STATE.md`, `/gsd-*`) unless the owner asks.
