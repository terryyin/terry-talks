# DearDough Process Findings

## DD-001 — Finish layout adjustment before full export

Inspect the final still after all layout adjustments, then start the full video
export. This avoids exporting a layout that is already being changed.

### Occurrences

- Execution: .planning/quick/001-missile-impact/PLAN.md / f425b06
  - Tool: Codex
  - Evidence: Behavior-angle feedback turn: a full render started after the first still; Structure label and missile/blast placement then changed, requiring another full render.
  - Observed effect: Two 990-frame exports for one small visual adjustment.
  - Inference: Completing placement adjustments before the full export would avoid one render; no measured time or token saving is claimed.
