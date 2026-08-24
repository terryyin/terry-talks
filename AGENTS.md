# AGENTS.md

Guidance for Codex (and other AGENTS.md-reading agents) when working in this
repository. Skill contracts: `.agents/skills/`; rules: `.cursor/rules/`.

Same content as `CLAUDE.md` — keep both in sync when editing.

## Project

terry-talks holds Terry's talks, presentations, and (potentially) blogs,
built with Slidev. Content lives alongside slides (e.g. `TPS and AI/`).

## Layout

```
slides/            # Slidev decks
TPS and AI/         # Claims-based writing project (claims/, open-questions.md)
docs/adrs/          # Durable decisions (tooling + content structure)
```

**ADRs:** Solo propose → deliberate → approve in `docs/adrs/`; agents follow
Accepted ADRs via `adr-awareness` (do not approve).
