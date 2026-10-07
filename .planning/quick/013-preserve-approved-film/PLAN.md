# Terry can correct one visual moment without disturbing the approved film

Source: [story](../../../terry-moves/seed.md#preserve-approved-film).
Identity: `terry-moves-filmmaking#preserve-approved-film`

## Goal and scope

- **Goal:** Terry asks for a small visual correction to an approved film. He
  sees the corrected moments before and after. He also gets one report showing
  that the audio, the timeline and every frame outside the declared moments are
  unchanged, so he does not rewatch the whole film.
- **Included:**
  - One command that compares two versions of a film. The baseline defaults to
    the committed state (`HEAD`) and the correction to the uncommitted working
    tree. Either side can name a Git revision instead.
  - Declared change ranges, given in seconds or frames, with `end` allowed.
  - Picture, audio and timeline evidence.
  - Side-by-side before/after stills.
  - Usage notes in the terry-moves README.
- **Excluded:**
  - Retiming, re-voicing and reordering (story 6 and others).
  - Any editor UI or Studio round trip.
  - A second film or a new diagram correction.
  - Release reproduction (R19): the encoded film, poster and SRT.
  - Approving or committing the correction on Terry's behalf.
- **Preserved:**
  - Existing renders and their `render:*` scripts.
  - `pnpm moves` with its current subcommands.
  - The film's source and its assets. The tool only reads them.
- **Key examples:** see the story (1–4). Each maps to a slice under
  [proof ownership](#proof-ownership).

## Execution context and decisions

- **Plan location:** `.planning/quick/`. The highest established entry was 012
  (`012-silent-move-joins` in the sibling preparation), so this plan is 013.
  Slice statuses are planned, in-progress and done.
- **No ADR or North Star topic applies.** Only ADR-0000, which covers process,
  exists, and the project has no North Star location. This is a local tool for
  one film shape, not a shared architectural choice.
- **PFE (existing solutions):**
  - **Rendering:** reuse the Remotion CLI already used by the `render:*`
    scripts. `remotion render … --sequence --image-format=png --frames=0-N`
    renders every frame as an image. `remotion render … --codec=wav` renders
    the mixed audio only. Neither encodes the film. Do not add
    `@remotion/renderer` or `@remotion/bundler` as direct dependencies unless
    the CLI proves insufficient.
  - **Baseline checkout:** `git worktree add --detach <tmp> <rev>`. The
    checkout then gets a `terry-moves/node_modules` symlink to the workspace's
    installed `node_modules`, and is removed afterwards. This reuses Git and the
    installed dependencies. There is no copy or reinstall.
  - **Preservation checks:** there is no existing revision or diff tool. The
    hash checks in `tests/storyImpact/StoryImpactNarration.spec.tsx` and
    `tests/aiTestAutomation/film.spec.tsx` show the `node:crypto` sha256
    idiom, which this tool reuses for frames and audio. The decomposition
    film's timeline is `Problem Decomposition/film-script.json`, imported by
    `src/problemDecomposition/film.ts`, which is the same file the film renders
    from.
  - **Image composition:** `ffmpeg` (Homebrew, already used by the film's
    `produce_audio.py`) makes the side-by-side stills with `hstack`. The
    Remotion-bundled `remotion ffmpeg` reports a version mismatch, so it is not
    used.
- **Placement:** a Node-side TypeScript tool in `terry-moves/revision/`, outside
  the Remotion bundle, run with `tsx`. It is exposed as
  `pnpm moves compare <CompositionId> [--baseline <rev>] [--correction <rev>]
  [--change <from>-<to>]…`. A small film entry maps
  `ProblemDecompositionFilm` to its timeline file. A composition without an
  entry still gets picture, audio, duration and fps evidence. Pure parts are
  unit-tested in jest under `terry-moves/tests/revision/`:
  - range parsing;
  - grouping changed frames into time ranges;
  - the timeline diff;
  - the WAV sample diff.
- **Output:** `terry-moves/out/revisions/<composition>-<timestamp>/`, which is
  ignored through the existing `out` rule. It holds:
  - `report.md`;
  - the preview PNGs.

  Rendered frame sequences go to a temporary directory and are deleted after
  hashing, at about 650 MB per side as PNG. Only the preview frames are kept.
- **Verdict:** the report says **Preserved** only if three things hold: the
  audio is identical, the timeline is identical, and no frame outside the
  declared ranges differs. Otherwise it says **Not preserved**, and names each
  difference with its kind, its frame and second range, and its scene label
  where the timeline is known. Changed frames inside a declared range are
  listed as the intended change. A declared range with no change is reported
  too (example 4), because it is not an error.
- **Local verification gate:** none is stated for local work beyond the
  project's `pnpm moves test` (jest, lint and `tsc`). Hosted CI runs whatever
  it runs. Slices run focused jest specs and then `pnpm moves test`, because
  the new tool is compiled by `tsc` and linted by the package's eslint.
- **Workspace prerequisite:** this preparation worktree has no
  `terry-moves/node_modules`. Execution runs `pnpm install --offline`, or
  symlinks the integration checkout's `node_modules`, before the first render.

## Decisive premises observed (2026-10-07, at `8f3b6b9`)

Observations were made in throwaway worktrees at `1334426^` and `1334426`
under the job tmp directory, using the integration checkout's
`terry-moves/node_modules` (Remotion 4.0.533) through a symlink.

| Premise | Consumed by | Observation | Result |
| --- | --- | --- | --- |
| A past revision still renders with today's installed dependencies (the package and lockfile changed after `1334426`) | Slice 1 baseline checkout | `remotion still src/index.ts ProblemDecompositionFilm … --frame=2400` in the `1334426^` worktree | Rendered. An unrelated 404 for an ignored `quillustration…/scene.bin` asset of another composition is harmless. Holds |
| Rendering is deterministic, so byte equality means no change | Slice 1 frame comparison | The same frame rendered twice at `1334426^` | Identical sha256 (`15f15df2…`). Holds |
| Rendering every frame is affordable | Slice 1 picture evidence | `remotion render … --sequence --image-format=png --frames=0-2746` on each side | 2747 frames per side in about 39 s. About 650 MB per side as PNG; JPEG takes 25 s. Holds: compare every frame, not samples |
| Mixed audio renders cheaply and reproducibly without the picture | Slice 1 audio evidence | `remotion render … --codec=wav` on each side | About 11 s each. Both sides have identical sha256 (`ab3a3ccc…`). Holds |
| The replay's real changed ranges are known | Slices 1–2 key examples 1 and 2 | sha256 of every frame on both sides, grouped into runs | Frames **0–35** (0–1.17 s: the cover, which `Scene.tsx` draws as the exact final pose) and **2285–2746** (76.17–91.53 s, from the assimilation cue to the end) differ. All other frames are identical. The story's example 1 was corrected to declare the cover |
| The changed moment is the blue cells | Slice 2 preview | Side-by-side of frame 2400 with `ffmpeg … hstack` | Before: one blue column. After: three scattered blue cells. Only the product wall differs. Holds |
| The decomposition timeline is one JSON file | Slice 3 timeline evidence | `src/problemDecomposition/film.ts` imports `Problem Decomposition/film-script.json` (`duration`, `fps`, `scenes[].start/end/captionRanges`) | Holds. Unchanged between `1334426^` and `1334426` |
| Host `ffmpeg` is available | Slice 2 | `which ffmpeg` gives `/opt/homebrew/bin/ffmpeg` | Holds |
| `out/` is ignored | Output location | `terry-moves/.gitignore` contains `out` | Holds |

## Ordered slices

### 1. A correction is checked frame by frame and by audio against the approved film
Type: Behavior
Status: planned

Behavior: Terry, or the agent acting for him, runs
`pnpm moves compare ProblemDecompositionFilm --baseline 1334426^ --correction 1334426 --change 0-1.2 --change 76-end`.
The tool checks out each revision as a detached temporary worktree and
renders every frame plus the WAV for each side. It writes `report.md`, which
contains:
- an audio verdict;
- the composition duration and fps;
- the changed frame ranges inside each declared range (the intended change);
- any changed range outside the declarations, as a frame range and a second
  range.

The overall verdict is **Preserved** here (story example 1, picture and audio
part). With `--change 76-80` instead, the report is **Not preserved**. It
lists 0–1.17 s and 80–91.53 s as undeclared picture changes (story example 2,
in times). With no `--baseline` or `--correction`, the tool compares `HEAD`
with the working tree. With an unchanged tree, every declared range reports no
change and the verdict is **Preserved** (story example 4). Temporary worktrees
and frame sequences are removed even when rendering fails.

Proof:
- Jest unit specs cover:
  - range parsing: seconds, frames, `end`, and rejection of a reversed or
    malformed range with a useful message;
  - grouping changed frame indexes into runs and classifying them as declared
    or undeclared;
  - the WAV comparison: identical, and differing with the first and last
    differing second.
- Demonstration: the replay command above prints **Preserved**, with the
  declared changes at frames 0–35 and 2285–2746. The `--change 76-80` run
  prints **Not preserved**, naming 0–1.17 s and about 80.0–91.53 s.
  `pnpm moves compare ProblemDecompositionFilm` on a clean tree prints
  **Preserved**. Record the literal commands and verdicts in this plan.
- `git worktree list` after each run shows no leftover temporary worktree.
- `pnpm moves test` passes.

### 2. Terry sees the corrected moments before and after
Type: Behavior
Status: planned

Behavior: The same `compare` run writes side-by-side PNGs, baseline on the
left and correction on the right, for the first, middle and last changed
frame of every changed range, both declared and undeclared. `report.md`
links each one under its range. For the replay, Terry opens the stills of the
assimilation range and sees one blue column become three scattered blue cells
(story example 1, "sees"). An unchanged declared range gets one pair from its
midpoint, labelled as unchanged.

Proof:
- A jest spec for choosing preview frames per range (first, middle and last;
  a single-frame range; an unchanged range).
- Demonstration: the replay's preview of the 76.17–91.53 s range is read back
  and shows the blue-cell difference. A preview of the cover range exists.
  Terry's look at the replay preview is the story evaluation.
- `pnpm moves test` passes.

### 3. A timing change is reported as a preservation failure
Type: Behavior
Status: planned

Behavior: When a film has a timeline entry (`ProblemDecompositionFilm` reads
`Problem Decomposition/film-script.json`), the report compares the following
between the two sides:
- `duration` and `fps`;
- every scene's `id`, `start` and `end`;
- every caption range's `text`, `start`, `end`, `speechStart` and `speechEnd`.

Any difference makes the verdict **Not preserved**. A timeline failure names
the moved scene or caption and both values (story example 3). Changed picture
ranges carry scene labels, for example "health 76.17–85.73 s, end
85.73–91.53 s". That completes story example 2's naming of the health and end
scenes. The replay still reports **Preserved**.

Proof:
- Jest specs on the timeline diff. Fixtures are two copies of the real
  `film-script.json` structure: identical, one with a scene boundary moved,
  and one with the duration changed. Expected messages name `health` and the
  values. Further specs cover labelling a time range by scene.
- Demonstration: shift one scene boundary in the working tree's
  `film-script.json` by 0.1 s. `pnpm moves compare ProblemDecompositionFilm`
  then prints **Not preserved** with the scene named. Revert afterwards.
- The replay run prints **Preserved** with scene labels.
- The README's `pnpm moves compare` section describes the defaults,
  `--change`, the three kinds of evidence, the output location and the
  verdict.
- `pnpm moves test` passes.

## Proof ownership

| Promise | Slice | Observation |
| --- | --- | --- |
| Baseline is the committed state by default and the correction the working tree. Either side can name a revision | 1 | Clean-tree demonstration; replay run by revision |
| Declared ranges, one or more, may run to `end` | 1 | Range-parsing specs; replay with two ranges |
| Every frame outside the declared ranges is unchanged, or the difference is named with its time | 1 | Frame-run specs; replay **Preserved**; `76-80` **Not preserved** with times |
| Approved audio is unchanged (placement and mix) | 1 | WAV specs; replay audio verdict |
| Timeline unchanged: scene and caption boundaries, captions, duration | 3 | Timeline-diff specs; shifted-boundary demonstration |
| Timing or audio change is a failure, not an accepted visual correction (rejection) | 1, 3 | WAV-differs spec; timeline demonstration verdict |
| Focused before/after preview without encoding the film | 2 | Preview-frame specs; replay preview showing the blue cells |
| Undeclared changes are named with time and kind; scenes are named where the timeline is known | 1, 3 | `76-80` run; scene-label specs |
| No-change correction reports no invented change | 1 | Clean-tree **Preserved** with "no change" per range |
| First supported film: the problem decomposition film | 1–3 | All demonstrations use `ProblemDecompositionFilm` |
| Existing renders and `pnpm moves` subcommands keep working | 1–3 | `pnpm moves test`; existing scripts are untouched by the diff |

## Cumulative design and sizing

There is one model: two rendered sides, three kinds of evidence (picture,
audio and timeline), and the declared ranges that classify picture
differences. Each slice adds one kind of observation to the same report, with
no per-film special cases beyond the single timeline entry. Composition
duration and fps come from the rendered output, so any composition gets
picture and audio evidence. The scene labels belong to the timeline evidence,
not a separate mechanism.

No numeric slice limit is supplied. Slice 1 is the largest: the temporary
worktrees, two renders, hashing and the report. It is one proof loop, and
each replay run takes about 2 minutes, measured above. Slices 2 and 3 extend
the same run.
