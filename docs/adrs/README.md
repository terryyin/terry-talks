# Architectural Decision Records (ADRs)

Solo playbook for **proposing, deliberating, and approving** durable
decisions about this repo — both technical (Slidev/tooling setup) and
structural (how talks, claims, and blog content are organized). Agents
**use, cite, and help maintain** Accepted ADRs — they do not own approval.
See `.agents/skills/adr-awareness/SKILL.md`.

terry-talks is a single-person project: there is no advice round, team
announce, or consensus step. The gradual path from Proposed to Accepted is
**your** deliberation, not a committee.

## When to write an ADR

Write one when the choice is **cross-cutting**, **hard to reverse**, or
**likely to be re-asked** ("why do we structure it this way?"). Skip local,
easily reversible, or obviously one-shot choices (e.g. wording of a single
slide).

ADRs are not a to-do list. Near-term work (a specific talk, a specific
claim) stays in its own file under the relevant project directory (e.g.
`TPS and AI/`). An ADR records a durable constraint or choice that should
outlive a single talk or post.

## Lifecycle (you own every status change)

| Status | Meaning |
|--------|---------|
| **Proposed** | Draft under deliberation; not yet binding for agents |
| **Accepted** | Current recommendation you and agents should follow |
| **Rejected** | Considered and declined; keep the record and reasoning |
| **Superseded** | Replaced by a newer ADR; keep history, do not treat as current |

Only you move an ADR to Accepted, Rejected, or Superseded. Agents may draft
text and help with hygiene when you direct a status change — they must not
approve on their own.

### Steps

1. **Draft** — Copy `_template.md` to `NNNN-short-title.md` (next free
   number). Status: `Proposed`. Fill Context, Decision, Consequences
   (optional Pros / Cons / Prerequisites / Assumptions). Add it to the
   index below.
2. **Deliberate** — Leave it Proposed until you are ready. Use whatever
   helps you decide without inventing a team process:
   - Re-read Context / Decision / Consequences after a pause
   - Ask an agent to stress-test alternatives and failure modes (still
     Proposed)
   - Draft or outline if uncertainty is about the content itself
   - Walk the **ready-to-accept** checks below
   Do not treat a draft as Accepted while it is still `Proposed`.
3. **Decide** — When deliberation is done, you Accept or Reject yourself.
   Rename to `…-accepted.md` or `…-rejected.md`, set Status, and update the
   index. That status change is the approval moment.
4. **Supersede** — To change course, add a new ADR and mark the old one
   `Superseded by ADR-NNNN` with a link. Do not silently rewrite history.

### Ready-to-accept checks (solo gate)

Before renaming to Accepted, confirm:

- [ ] Decision is clear enough that future-you (and agents) can follow it
- [ ] Consequences and main alternatives were written down
- [ ] You are willing to treat silent drift as wrong (or will supersede)
- [ ] Follow-up work, if any, still goes through normal planning — the ADR
      does not auto-prioritize what gets written next

If any check fails, keep Status `Proposed` and continue deliberating.

## Recommendations, not law

Accepted ADRs are **recommendations**. You may deviate when context demands
it. Prefer an explicit exception note (commit/PR/message pointing at the
ADR) or a superseding ADR over silent drift. Agents challenge conflicts;
they do not invent exceptions.

## Layout

| Path | Role |
|------|------|
| `docs/adrs/_template.md` | Copy this for new ADRs |
| `docs/adrs/NNNN-slug.md` | Proposed |
| `docs/adrs/NNNN-slug-accepted.md` | Accepted |
| `docs/adrs/NNNN-slug-rejected.md` | Rejected |
| `docs/adrs/README.md` | This playbook |

Number sequentially from `0000`. Prefer capability/topic-named titles, not
talk or date names.

## Index

| ADR | Status | Title |
|-----|--------|-------|
| [0000](./0000-use-adrs-accepted.md) | Accepted | Use ADRs for durable decisions |

Keep this table current when you accept, reject, or supersede an ADR.
