# Typography film

The complete baseline develops “Start with the problem, not the solution.”
into a small useful outcome: someone wants a seat for tonight; help them find
one. It uses the approved treatment: a warm dark stage, a large bold focus,
quieter supporting type, gentle vertical settling and a settled reading hold.
The two approved opening samples remain available as references.

The retained full revision changes only the direction of “Find a seat for
tonight.” The seat becomes supporting type; the deadline becomes large and
bold after a longer pause. All words and the rest of the argument stay intact.
`problemRevision` derives these changes without modifying `problemBaseline`.

Edit [script.ts](./script.ts), then preview the named compositions in Studio:

```sh
pnpm moves
```

- `TypographyOpeningContrast`: retained opening, 9 seconds.
- `TypographyOpeningContrastEdited`: script-only sample edit, 11 seconds.
  “Begin with the” becomes larger and bold, “problem.” becomes smaller and
  regular, its group spacing grows, and its entrance and hold take longer.
- `TypographyProblemBaseline`: complete retained argument, 29.5 seconds.
  `problemBaseline` keeps the approved opening, asks what someone is trying to
  do, names a smaller useful outcome, and returns to the original advice.
- `TypographyProblemRevision`: complete revised argument, 31 seconds.
  In the outcome passage, “a seat” changes from 132px/700 to 72px/400;
  “for tonight.” changes from 60px/400 to 112px/700 with 44px group spacing.
  The deadline starts at 2 seconds instead of 1.3, settles over 0.9 seconds
  instead of 0.7, and the final reading hold grows from 3 to 3.6 seconds.
- `TypographyFeedbackExample`: 8-second reuse fixture, “Make feedback small.
  Make it useful.” Its first group has two explicit lines, its group gaps are
  36 and 48px, and its two passages each last 4 seconds. It uses the same
  `TypographyFilm` component as both full versions.

Once Studio starts, open `/TypographyProblemBaseline`,
`/TypographyProblemRevision` or `/TypographyFeedbackExample` on its printed
local URL. The usual URL is `http://localhost:3000`.

Studio previews the script. Its visual-editor Save default props action cannot
write these imported direction objects back to the script. Change the source
file to author this film.

Export from the repository root:

```sh
pnpm -C terry-moves exec remotion render src/index.ts TypographyOpeningContrast out/typography-film/opening-contrast.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2 --log=error
pnpm -C terry-moves exec remotion render src/index.ts TypographyOpeningContrastEdited out/typography-film/opening-contrast-edited.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2 --log=error
pnpm -C terry-moves exec remotion render src/index.ts TypographyProblemBaseline out/typography-film/problem-baseline.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2 --log=error
pnpm -C terry-moves exec remotion render src/index.ts TypographyProblemRevision out/typography-film/problem-revision.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2 --log=error
pnpm -C terry-moves exec remotion render src/index.ts TypographyFeedbackExample out/typography-film/feedback-example.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2 --log=error
```

All are silent, 1080×1080 at 30 fps. Outputs under `terry-moves/out/` are
ignored by Git. Watch each at normal speed at 1080 and 360 pixels square;
inspect the arriving type as well as the reading holds. Terry owns the judgment
of whether emphasis, movement and reading time convey the idea.

## Script directions

[direction.ts](./direction.ts) compiles ordered passages through the existing
`beatTimeline` clock. [TypographyFilm.tsx](./TypographyFilm.tsx) consumes the
sampled direction for every composition, without passage-specific rendering.

| Field | Direction |
| --- | --- |
| Passage `id`, `groups` | Named passage and its ordered text groups. |
| Group `lines` | Explicit line breaks; each string is rendered on its own line. |
| `size`, `weight` | Font size in production pixels and CSS font weight. |
| `letterSpacing`, `lineHeight` | Tracking in pixels and unitless line height. |
| `spaceBefore` | Vertical space before this group in pixels. |
| `tone` | `ink`, `quiet` or `accent` within the one retained palette. |
| `motion.delaySeconds` | When the group's entrance starts within its passage. |
| `motion.revealSeconds` | Opacity entrance duration; zero means immediately visible at its delay. |
| `motion.settleSeconds`, `risePixels` | Time and vertical distance for the gentle rise into the final position. |
| Passage `holdSeconds` | Settled reading time after the last reveal or settling motion ends. |

Each passage has at least one group. Author positive font sizes and line
heights, and nonnegative motion and hold durations. The passage duration is its
latest entrance endpoint plus its hold; the shared clock rounds each passage
to frames. The composition's duration follows that same script, so changing a
hold changes the export length without editing the component.

## Author or revise another idea

Keep the approved samples and full versions' inputs intact. `feedbackExample`
is the compact worked example for another idea. To try “Keep changes small.
Keep them useful.” through its existing composition:

1. In `script.ts`, change only `feedbackExample`'s first lead-in from
   `lines: ['Make', 'feedback']` to `lines: ['Keep', 'changes']`, and its second
   lead-in from `lines: ['Make it']` to `lines: ['Keep them']`.
2. Save, then open `http://localhost:3000/TypographyFeedbackExample` while
   `pnpm moves` is running. Play at normal speed, inspect both passages, and
   check the text at a 360-pixel-square viewing size. The composition retains
   the fixture's two-line grouping, emphasis, gaps and 8-second rhythm.
3. Export with the command below. No component or clock changes are needed.

```sh
pnpm -C terry-moves exec remotion render src/index.ts TypographyFeedbackExample out/typography-film/another-idea.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2 --log=error
```

Restore the two fixture strings after an experiment if you want its original
example again. For your own pacing edit, change its group's delay/reveal/settle
or its passage's hold and preview/export again; duration follows those inputs.
For a permanently retained new version, add another named `TypeDirection` in
`script.ts`, an explicit `<Composition id="YourIdea" ...>` alongside the
existing registrations, and its registration component in `Root.tsx`. Use
the same `TypographyFilm` component and compute the duration with
`typographyTimeline(yourDirection, fps).durationInFrames`, as the existing
versions do. Change text groups and direction; the renderer stays shared.

To reproduce the retained baseline after making a revision without replacing
its first export, use:

```sh
pnpm -C terry-moves exec remotion render src/index.ts TypographyProblemBaseline out/typography-film/problem-baseline-replayed.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2 --log=error
```

## Font and render environment

The film uses CSS `Arial, sans-serif`, with regular 400 and bold 700 weights.
It uses the host's installed Arial rather than a bundled font asset. The observed
export environment is macOS 26.6.2 (25G83), Apple arm64, Node 24.21.0, pnpm
11.28.5 and Remotion 4.0.533. Arial and Arial Bold are installed at:

```text
/System/Library/Fonts/Supplemental/Arial.ttf
/System/Library/Fonts/Supplemental/Arial Bold.ttf
```

Use Arial on the reproduction host to retain these glyph metrics. The same
files and font stack serve the opening samples, full versions and reuse fixture.

Focused checks, from the repository root:

```sh
pnpm -C terry-moves test:unit --runInBand tests/typographyFilm/direction.spec.tsx tests/typographyFilm/revision.spec.tsx
pnpm -C terry-moves typecheck
```

The checks observe the registered compositions, rendered text and CSS, reveal
and settling, passage changes, final held text and repeatable frame sampling.
They complement the normal-speed visual review.
