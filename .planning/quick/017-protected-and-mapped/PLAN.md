# Viewers see that behavior is protected by tests and structure maps to the domain

Source: [story](../../../Story%20Driven/seed.md#protected-and-mapped).
Identity: `story-impact-animation#protected-and-mapped`

## Goal and scope

- **Goal:** a short two-half beat after the pink story's coherent product:
  green test shields on every Behavior column, then domain-concept chips
  linked to the Structure rows. Both fade as the customer appears.
- **Excluded:** naming it "spent judgment" and "judgment-intensive" (story
  10), later stories, and the ending.
- **Key examples:** the story's examples 1–3, mapped below.

## Execution context and decisions

- **Stack:** Remotion 4.0.518, `terry-moves/src/storyImpact/`. No new
  dependency.
- **Plan location:** `.planning/quick/017-protected-and-mapped/`. Statuses:
  planned, done.
- **Delivery:** Trunk Mode on local `master`, no push. Local gate:
  `pnpm moves test`.
- **Pose model:** an optional `protect` pose field (`shields`, `links`,
  0–1 each, and `fade`), drawn by a new `protect.tsx` piece; two beats,
  `tests` and `domain`, in the one-story film after `coherent`, each ending
  on a new storyboard board. The customer beat fades `protect` out at its
  start, so it starts where the domain beat ends.

## Decisive premises observed (2026-09-29, at `f0ebea3`)

- `pnpm moves test` passes: 242 tests.
- The space right of the Structure axis between its label (bottom ≈ 184)
  and the tray (top 502) is free after the splat (stills viewed); the tray
  is at rest during these beats.

## Proof ownership

| Example | Slice | Proof |
| --- | --- | --- |
| 1. Shields | 1 | spec: shields on the five bottom cells at the tests board; render shows five shields |
| 2. Domain links | 1 | spec: four chips, each on a different row, shields kept; still viewed |
| 3. Clean hand-off | 1 | spec: no `protect` once the customer is half shown; cells unchanged |

## Slices

### 1. Tests guard the behavior and the structure maps the domain
Type: Behavior
Status: planned
Proof: examples 1–3 in the film specs; stills viewed; `pnpm moves test`.

Behavior: given the coherent pink product → when the tests and domain beats
play → shields pop onto every Behavior column, then domain chips link to the
Structure rows → they fade as the customer appears.
