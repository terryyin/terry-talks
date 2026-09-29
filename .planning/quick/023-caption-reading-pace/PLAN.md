# Viewers, and Terry reading aloud, have time to read every caption

Source: [story](../../../Story%20Driven/seed.md#caption-reading-pace).
Identity: `story-impact-animation#caption-reading-pace`

## Goal and scope

- **Goal:** every caption holds for a reading time computed from its
  syllables (`max(3.0 s, 1.0 s + syllables ÷ 3.5/s)`, about 1.2× overall);
  the beats under a caption slow evenly to fit; six 1.0 s breathing pauses
  leave the caption line empty while the picture moves; the film stays
  within 2–2.5 minutes.
- **Excluded:** the voice-over; title and end-card holds; any change of
  wording, look, or motion design; hand-tuned per-caption seconds.
- **Key examples:** the story's examples 1–4, mapped below.

## Execution context and decisions

- **Stack:** Remotion 4.0.518, `terry-moves/src/storyImpact/`. No new
  dependency (the syllable rule is a small heuristic in code).
- **Plan location:** `.planning/quick/023-caption-reading-pace/`.
  Statuses: planned, done.
- **Delivery:** Trunk Mode on local `master`, no push (coordinator
  instruction). Local gate: `pnpm moves test` (jest + eslint + tsc).
- **Approach:**
  - A reading-pace module owns `syllables(text)`, `readingSeconds(caption)`
    and the pacing of a beat list: group beats into caption spans (a
    captioned beat and the caption-less beats after it); a span's length is
    `max(authored, pause + readingSeconds)`; when it grows, each beat's
    `seconds` is multiplied by the same factor. A beat's pose already maps
    progress 0–1 to its authored motion, so it still ends on the same pose.
  - `timeline()` paces every beat list it is given, so the one-story film
    and the full film share the rule.
  - A beat may carry `pause` (seconds of empty caption at the start of its
    span); `captionAt` returns `''` there.
  - `bounce` samples springs between frames (Remotion's `spring` accepts
    fractional frames), so slowed motion stays smooth.
  - Specs: caption runs follow the reading rule; boards still match; the
    film is 120–150 s; README lengths updated.

## Decisive premises observed (2026-09-29, at `37feacf`)

- `pnpm moves test` passes: 261 tests, lint and tsc clean.
- Current caption runs (tsx script over `fullFilm.captionAt`): 25 captions
  in 99.0 s; film 108.4 s; title 3.2 s and finale 6.2 s uncaptioned.
- A beat's `pose(t)` maps progress to seconds with its own authored frame
  count (`beat` in `film.ts`), so changing `seconds` re-times it without
  changing its last pose.
- Remotion `spring` handles fractional frames (`springCalculation` in
  `node_modules/remotion/dist/cjs/spring/spring-utils.js` uses
  `frameClamped % 1`); `bounce` in `motion.ts` currently rounds to frames.
- A prototype syllable rule matches hand counts for all 25 captions; the
  rule gives 118.5 s of captions (1.197×).

## Proof ownership

| Example | Slice | Proof |
| --- | --- | --- |
| 1. Too short | 1 | spec: "Spent stories pile up…" run ≈ 4.7 s; `idea-history` last pose unchanged |
| 2. Already long enough | 1, 2 | spec: every caption run ≥ its reading time and ≥ its old span; "More stories…" span keeps 7.8 s |
| 3. A breath after the splat | 2 | spec: empty caption for 1.0 s at the start of `wobble`, then the caption for its reading time; wobble ends on its board |
| 4. Reworded | 1 | spec: pacing a span whose caption gains words grows it by the added syllables ÷ 3.5 |

## Accepted proof

- Slice 1: `tests/storyImpact/readingPace.spec.ts` (syllable counts, rule,
  examples 1, 2, 4, every beat ends on its authored pose) and the film specs
  (each caption run ≥ its reading time); `pnpm moves test`: 267 passed, lint
  and tsc clean. Film 128.2 s before pauses.
- Slice 2: film specs (six 1.0 s breaths in order, example 3, runs ≥
  reading time, film 120–150 s); `pnpm moves test`: 269 passed, lint and
  tsc clean. `pnpm -C terry-moves render:story-impact`: 133.2 s mp4 and
  poster; 16 stills viewed as a contact sheet (breath frames show no
  caption, the look is unchanged). Captions total 117.8 s against 99.0 s
  (1.19×).

## Learnings

- Sampling springs between frames moves a settle point by up to half a
  frame: the one-story "next" hold is now 1.48 s, so its spec asks for 1.4 s.

## Slices

### 1. Captions hold for their syllable reading time
Type: Behavior
Status: done
Proof: reading-pace spec (syllable counts, rule, rewording); film specs
(each run ≥ reading time, boards still match); `pnpm moves test`.

Behavior: given captions with too little time → the film is built → each
caption shows at least its reading time, the beats under it slowed evenly,
and every beat ends on the same pose.

### 2. The film breathes at six places
Type: Behavior
Status: done
Proof: film specs (empty caption runs at the six places, film 120–150 s);
render, contact-sheet stills viewed; caption timing table; `pnpm moves test`.

Behavior: given the paced film → it plays → after the SPLAT, before the key
line, between the two values, before "More stories…", before the ending and
before the punch line, the caption line is empty for 1.0 s while the
picture moves, then the caption shows for its full reading time.

## Execution complete

- Both slices delivered in Trunk Mode on local `master` (not pushed, per
  the coordinator's instruction); no CI was observed.
- Product advice: retrospective skipped
