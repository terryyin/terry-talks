---
id: SEED-001
created: 2026-10-29
created_during: Follow-up to publishing AI Augmented Development Pitfalls Episode 1
trigger_when: Terry selects the second film for production
scope: one film
---

# AI Augmented Development Pitfalls: the second film

## Purpose and source

Terry wants to continue the developer-facing series with a film based on
[Removing a Rule Is Not Adding Its Negation](../../AI%20Augmented%20Development%20Pitfalls/02-removing-a-rule-is-not-adding-its-negation.md).
Episode 1 established a realistic workplace storytelling format, a roughly
30-second portrait presentation, and distribution on LinkedIn, YouTube,
TikTok and Facebook. The second film should stand on its own for someone
encountering the series for the first time.

## Selected story

<a id="second-pitfalls-film"></a>
### Generate Episode 2: Removing a Rule Is Not Adding Its Negation

**Identity:** SEED-001#second-pitfalls-film
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../quick/001-second-pitfalls-film/PLAN.md","assessment":"ready","reasons":[],"basis":{"document":"d69ac2af99c3877da87b5c522cc213a9c67565529bd650c2167a5cb0f155aa7d","plan":"34f87991b3aa6bdf8ea1848d2f0f151bb679c1237502b01400b3ad69f8f8a4f0"}}
```

**Goal:** Terry can share a short film that helps developers recognize how
removing an obsolete rule can leave unnecessary tests and documentation behind
when people or AI treat that removal as a lasting requirement about absence,
and can name the corrective action: describe and verify the current capability,
retiring assertions and explanations whose purpose has expired.

**Scope:**

- Produce an editable film in Terry Moves, a reviewable Studio preview, and a
  shareable portrait (9:16, 1080×1920, ~30 s, 30 fps) video export suitable for
  LinkedIn, YouTube, TikTok and Facebook.
- Tell a realistic development conversation with a visible AI assistant
  response. Reuse Episode 1's voice cast roles where useful (Cedar narrates;
  Ash as developer; Coral may appear only if the beat needs a second person).
- Use the source article's holdings-refresh scenario in simplified workplace
  language: refresh once required a connected account *and* an entry workflow
  started; the intended change keeps refresh when the account is connected and
  drops the entry dependency. The mistaken response removes the gate, then adds
  lasting artifacts that assert entry is absent (for example a source scan or
  “does not require entry” documentation). The corrective beat shows a current-
  capability description and a behavioral check that a holding appears after
  scheduled refresh—without preserving the retired concept as a permanent
  negation.
- Carry Episode 1 production lessons: concrete opening hook, visible cause and
  effect, mobile-safe overlays and captions, readable phrase captions, clear
  audible dialogue, AI-content disclosure with the series label, and a closing
  line whose narration and on-screen text match and hold through the final
  frame.
- Preserve the evaluation nuance: useful regression coverage and meaningful
  negative requirements remain valid; the film must not imply that every
  negative assertion is waste.
- Terry reviews the preview before the edition is treated as final. Platform
  posting of the approved export is outside this story.
- Deferred: other pitfalls articles; square or landscape editions; non-English
  editions; changing Episode 1.

**Key examples:**

1. **Standalone understanding** — Pre: a developer has not seen Episode 1.
   Trigger: they watch the finished ~30 s portrait film once. Result: they can
   explain the misunderstanding (removal turned into a permanent absence claim),
   its maintenance cost, and the corrective action (describe and verify current
   behavior; retire expired assertions and explanations).

2. **Visible mistaken preservation** — Pre: the old eligibility
   `account connected AND entry started` is shown, then the intended change to
   `account connected` alone. Trigger: the developer asks the assistant to
   remove the entry requirement. Result: the assistant reply visibly adds
   absence-oriented follow-through (tests and/or docs about entry no longer
   applying), not only the simpler implementation.

3. **Corrective close** — Pre: the mistaken artifacts are on screen. Trigger:
   the closing beat. Result: narration and matching on-screen text ask whether
   the lasting assertion protects a current requirement or meaningful risk, and
   show keeping a coherent current-capability check while retiring the expired
   historical assertion—without teaching that all negative checks are wrong.

4. **Review before finalize** — Pre: Studio preview and export exist in the
   Episode 2 film home. Trigger: Terry reviews the preview. Result: he can
   accept or request changes before the edition is finalized; posting remains
   a later step.

**Story beats (dialogue direction):**

| Beat | Intent | Spoken direction |
| --- | --- | --- |
| Hook | Name the confusion in one line | Narrator: removing a rule is not requiring its opposite |
| Old rule → intended change | Show entry dependency dropped for scheduled refresh | Developer: drop the entry-started check; connected accounts should refresh on a schedule |
| Mistaken AI follow-through | Absence becomes a lasting product concept | Assistant: done—gate removed, plus tests/docs that entry must not be required |
| Cost | History still occupies the suite | Brief visible clutter of absence checks / “does not require entry” prose |
| Correction | Current capability, retired expired purpose | Narrator close matching on-screen text: describe what is true now; keep checks that protect current behavior; retire what only remembers the old rule |

Exact wording is settled during production against measured speech, as Episode 1
did. The holdings labels may be shortened on screen for mobile readability
while preserving the same meaning.

## References

- [Series](../../AI%20Augmented%20Development%20Pitfalls/README.md)
- [Source article](../../AI%20Augmented%20Development%20Pitfalls/02-removing-a-rule-is-not-adding-its-negation.md)
- [Episode 1 design and production lessons](../../AI%20Augmented%20Development%20Pitfalls/01-refinement-film-design.md)
