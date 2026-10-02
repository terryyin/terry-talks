---
id: session-workflow
status: proposed-decomposition
created: 2026-10-03
created_during: Terry requested the first two product backlog items
trigger_when: Now, in the order Terry requested
scope: two queued stories awaiting refinement
---

# Easier session input and quieter story refinement

## Intent

Terry wants to speak additional instructions when starting a session, and to
reduce unnecessary human acknowledgements in the workflow, starting with
story refinement. These are captured ideas, not refined stories or authority
to implement them. The product backlog's educational-video direction remains
unchanged; Terry explicitly gives these stories priority over existing work.

## Stories

<a id="voice-input"></a>
### 1. Terry can dictate additional instructions when starting a session
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **Identity:** session-workflow#voice-input
- **For / why:** Terry can add thoughts by voice to the additional-instruction
  text area when starting a session, reducing the need to type them.
- **Desired outcome:** Spoken instructions become text in that area and are
  included in the session's additional instructions.
- **Approach to investigate:** First determine whether Codex or ChatGPT
  provides a usable voice-input service for this flow. If neither does, consider
  the OpenAI API. Service availability and suitability are unresolved; this
  capture makes no claim that an integration exists.
- **Evaluation example:** Terry starts a session, speaks additional instructions,
  sees the resulting text in the text area, and starts the session with those
  instructions.
- **Questions for refinement:** Identify the session-start surface and the
  applicable service; clarify how Terry reviews or corrects the transcription
  and what happens if voice input fails.
- **Depends on:** No prerequisite story identified.

<a id="quiet-refinement"></a>
### 2. Terry gets a clear refinement outcome without unnecessary acknowledgement
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **Identity:** session-workflow#quiet-refinement
- **For / why:** Terry wants to streamline the process starting from refinement,
  following “no news is good news”: if no human acknowledgement is needed, the
  workflow leaves its result without asking for one.
- **Desired outcome:** Refinement leaves its edits to the canonical story
  uncommitted, with exactly one of these proposed outcomes:
  1. **Ready for slice planning:** A clear note says the story is ready for a
     slice plan.
  2. **Ready for execution:** A clear result says the story is flawless and
     ready for execution.
  3. **Human engagement needed:** The result explicitly lists the responses
     expected from people, so they know what they need to provide.
- **Evaluation examples:** A story that needs planning is left edited and
  marked ready for slice planning without an acknowledgement request. A story
  that qualifies for direct execution is left with that clear result. An
  unresolved human decision produces an explicit list of expected responses.
- **Questions for refinement:** Determine what “flawless” means and the criteria
  for execution without slice planning; establish how the outcomes fit existing
  preparation facts and execution authority. Terry proposes only these three
  outcomes and expects refinement to discover any missing cases. Do not add a
  fourth outcome without surfacing the gap.
- **Depends on:** No dependency on voice input identified.

## Priority and next step

Voice input is first; quieter refinement is second, as Terry requested.
Both stories still need refinement before their implementation approach or
readiness can be assessed.
