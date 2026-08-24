# 0000 — Use Architectural Decision Records (ADRs)

**Status:** Accepted  
**Date:** 2026-08-24  
**Decision maker:** Solo owner  

## Context

terry-talks is a single-person project mixing Slidev tooling with written
content (talks, blog-style claims, e.g. `TPS and AI/`). Some choices —
tooling setup, repo layout, how claims/content are structured — need a
durable record so future sessions (human and AI agents) can recall *why*
something was chosen. There is no standing architect role and no team
advice/consensus step — but decisions should not flip silently, and agents
must not invent structure by themselves.

Per-talk or per-post notes live alongside that content (e.g. `TPS and AI/`)
and are not the right place for long-lived, cross-cutting constraints.

## Decision

1. **Solo deliberation process** — You draft, deliberate, and approve. No
   advice round or consensus. Gradual Proposed → Accepted (or Rejected)
   lives in `docs/adrs/README.md` (draft → deliberate / ready-to-accept
   checks → decide → supersede when needed).
2. **Document with ADRs** — Record cross-cutting / hard-to-reverse / often
   re-asked choices under `docs/adrs/`, using `_template.md`, numbered
   files, and statuses Proposed → Accepted | Rejected | Superseded.
3. **Agents consume, do not approve** — Agents must find and follow
   **Accepted** ADRs, cite them when relevant, and surface conflicts. They
   may help draft Proposed text and maintain index/status hygiene when you
   direct a change. They must not treat Propose / Deliberate / Approve as
   their mandate. Skill: `adr-awareness`.
4. **Recommendations** — Accepted ADRs guide daily work. Deviations need an
   explicit human-owned exception or a superseding ADR. Agents challenge
   silent drift.
5. **Change over time** — Adjust an ADR or add a new one that supersedes the
   old. Follow-up work to align the repo still goes through normal
   prioritization — an ADR does not auto-prioritize what gets written or
   built next.

## Consequences

- New Accepted ADRs become part of agent-facing memory for this repo.
- You keep authority; agents keep continuity.
- Rejected and Superseded ADRs remain for archaeology; only Accepted ones
  are current recommendations.
- Content and tooling work stays in their own files; ADRs stay for durable
  decisions.

## Related

- Playbook: [README.md](./README.md)
- Agent skill: `.agents/skills/adr-awareness/SKILL.md`
- Adapted from the same process used in the `pygardon` project; background:
  ADR templates inspired by [Michael Nygard / joelparkerhenderson ADR](https://github.com/joelparkerhenderson/architecture-decision-record)
