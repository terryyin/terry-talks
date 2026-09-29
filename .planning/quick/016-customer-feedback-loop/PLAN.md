# Viewers see a story's business impact come back as a new idea in the backlog

Source: [story](../../../Story%20Driven/seed.md#customer-feedback-loop).
Identity: `story-impact-animation#customer-feedback-loop`

## Goal and scope

- **Goal:** a customer beat after the pink story's coherent product: a flat
  2D customer nods at the change, a light bulb pops, and a new teal idea ball
  lands second in the tray while the two balls behind it swap. The idea is
  the second later story. The assimilation caption names the developers.
- **Excluded:** customers for other stories, developer characters, and the
  other improvement stories (7–10).
- **Key examples:** the story's examples 1–4, mapped below.

## Execution context and decisions

- **Stack:** Remotion 4.0.518, `terry-moves/src/storyImpact/`. No new
  dependency.
- **Plan location:** `.planning/quick/016-customer-feedback-loop/`; 015 was
  the last number. Statuses: planned, done.
- **Delivery:** Trunk Mode on local `master`, no push (the coordinator's
  instruction). Local gate: `pnpm moves test` (jest, lint, tsc).
- **Pose model:** a new optional `customer` pose field (drawn by a new
  `customer.tsx` piece). The flying idea ball is a backlog ball with a large
  `dx` and `hop`, so the tray draws it and the label test covers it.
- **Beat placement:** the customer beat joins the one-story film's beats
  after `coherent`, so the one-story film and the full film stay identical
  for the pink story. The pink story's `history` and `next` beats then use
  the reordered queue.

## Decisive premises observed (2026-09-29, at `c40851a`)

- `pnpm moves test` passes: 22 suites, 238 tests (about 20 s).
- The free space below the wall's origin (x ≈ 480–580, y ≈ 700–870) holds
  no label: stills of the current film viewed.
- The film test pins captions to `boards` captions and History to pink, sun,
  grape; both change here on purpose.

## Proof ownership

| Example | Slice | Proof |
| --- | --- | --- |
| 1. The customer reacts | 1 | spec: customer shown, nods (head dips), bulb shows; still viewed |
| 2. Inserted and reordered | 1 | spec: queue ids before and after; each ball moves ≤ 40 px a frame; no ball covers the backlog label (release spec) |
| 3. The idea becomes a story | 1 | spec: History order at the end |
| 4. Two impacts read apart | 1 | spec: caption runs; stills viewed |

## Slices

### 1. A customer turns the story's impact into a new idea in the backlog
Type: Behavior
Status: planned
Proof: examples 1–4 in `StoryImpactFilm.spec.tsx`; stills of the beat
viewed; `pnpm moves test`.

Behavior: given the pink story's coherent product → when the customer beat
plays → a customer nods, a bulb pops, the teal idea lands second and the two
balls behind it swap; later the idea is launched after the sun and ends in
History.
