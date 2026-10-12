# Typography film

The opening sample introduces “Start with the problem, not the solution.”
through one restrained treatment: a warm dark stage, a large bold focus, quieter
supporting type, a small vertical settling motion and a settled reading hold.
It is an interim contrast for artistic review before authoring the complete
argument.

Edit [script.ts](./script.ts), then preview the two named compositions in Studio:

```sh
pnpm moves
```

- `TypographyOpeningContrast`: retained opening, 9 seconds.
- `TypographyOpeningContrastEdited`: script-only sample edit, 11 seconds.
  “Begin with the” becomes larger and bold, “problem.” becomes smaller and
  regular, its group spacing grows, and its entrance and hold take longer.

Studio previews the script. Its visual-editor Save default props action cannot
write these imported direction objects back to the script. Change the source
file to author this film.

Export from the repository root:

```sh
pnpm -C terry-moves exec remotion render src/index.ts TypographyOpeningContrast out/typography-film/opening-contrast.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2 --log=error
pnpm -C terry-moves exec remotion render src/index.ts TypographyOpeningContrastEdited out/typography-film/opening-contrast-edited.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2 --log=error
```

Both are silent, 1080×1080 at 30 fps. Outputs under `terry-moves/out/` are
ignored by Git. Watch each at normal speed at 1080 and 360 pixels square;
inspect the arriving type as well as the reading holds. Terry owns the judgment
of whether emphasis, movement and reading time convey the idea.

## Script directions

[direction.ts](./direction.ts) compiles ordered passages through the existing
`beatTimeline` clock. [TypographyFilm.tsx](./TypographyFilm.tsx) consumes the
sampled direction for both compositions, without passage-specific rendering.

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

For a small experiment, change a group in `openingContrast`, save `script.ts`
and revisit `TypographyOpeningContrast`. Its wording, styles, spacing and
timing all pass through the same renderer. `editedOpeningContrast` retains the
demonstrated edits without modifying the original object's values. The later
complete baseline and revision will use this same path.

## Font and render environment

The sample uses CSS `Arial, sans-serif`, with regular 400 and bold 700 weights.
It uses the host's installed Arial rather than a bundled font asset. The observed
export environment is macOS 26.6.2 (25G83), Apple arm64, Node 24.21.0, pnpm
11.28.5 and Remotion 4.0.533. Arial and Arial Bold are installed at:

```text
/System/Library/Fonts/Supplemental/Arial.ttf
/System/Library/Fonts/Supplemental/Arial Bold.ttf
```

Use Arial on the reproduction host to retain these glyph metrics. The same
files and font stack served the opening and script-edited exports.

Focused checks, from the repository root:

```sh
pnpm -C terry-moves test:unit --runInBand tests/typographyFilm/direction.spec.tsx
pnpm -C terry-moves typecheck
```

The checks observe the registered compositions, rendered text and CSS, reveal
and settling, passage changes, final held text and repeatable frame sampling.
They complement the normal-speed visual review.
