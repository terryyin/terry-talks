# Terry can correct one visual moment without disturbing the approved film

Source: [story](../../../terry-moves/seed.md#preserve-approved-film).
Identity: `terry-moves-filmmaking#preserve-approved-film`

## Goal and scope

- **Goal:** Terry sees a visual correction before and after, plus one report
  proving that audio, timeline and undeclared frames remain approved.
- **Included:** a comparison command (default `HEAD` versus working tree;
  either side can name a revision); declared seconds/frame ranges with `end`;
  picture/audio/timeline evidence; side-by-side stills; README usage notes.
- **Excluded:** retiming, re-voicing, reordering, editor UI/Studio round trip,
  a second film/new correction, release reproduction (encoded film/poster/SRT),
  and approving or committing the correction for Terry.
- **Preserved:** existing renders and `render:*` scripts, current `pnpm moves`
  subcommands, film source and assets (read-only).
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
- **Workspace prerequisite:** execution installs its own checkout-local
  dependencies with `pnpm install --frozen-lockfile --offline`. Only disposable
  render-input worktrees reuse these dependencies via a symlink; the execution
  checkout never borrows another checkout's installation.
- **Established execution:** Story Branch Mode, Rio-chan, publisher
  `dashboard-territory.local-terry-talks`; checkout and branch suffix
  `i-can-correct-one-visual-moment-without-disturbi` under this repository's
  `.worktrees/` and `codex/`. Integration checkout: `/Users/terryyin/git/terry-talks`.
  Claim `f8d47e57728acff78bacde76ac68c4e83eccd199` is on origin/master and the
  execution branch; start `d6a09eb2f8392b6d05d3af2648fc40c3a115f3cd`. Publish
  increments only to that execution branch; accepted SHAs remain in the conversation.
- **Setup:** locked offline install and checkout-bound `tsc` passed (Node 24.21.0).
  Verification prefix: `nix develop --command env NODE_ENV=test`. Inherited
  production mode disables React's test API; overriding it made the baseline
  `pnpm moves test` pass (36 suites/368 tests, lint, tsc), without product edits.
- **Delivery:** no active hook; existing ESLint formatter selects owned revision
  files. Use agent-commit. No numeric slice limit/new replanning restriction.
- **CI:** no project adapter config or GitHub workflows (`gh workflow list` empty;
  `ci.yml` selector 404). No observer is armed; hosted coverage is unavailable.

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
Status: done

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

Accepted proof (2026-10-07):

- `nix develop --command env NODE_ENV=test pnpm -C terry-moves exec node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand tests/revision`: 5 suites/28 tests passed. Range/WAV fixtures observe parsing, runs, exact samples and differing seconds; report assertions observe verdicts/no-change; isolated Git repositories observe defaults and cleanup after failure; CLI fixtures observe actual fps or explicit missing evidence.
- `nix develop --command env NODE_ENV=test pnpm moves compare ProblemDecompositionFilm --baseline '1334426^' --correction 1334426 --change 0-1.2 --change 76-end`: exit 0, **Preserved**, intended frames 0–35 and 2285–2746, identical audio, 2747 frames/30 fps. Report: `out/revisions/ProblemDecompositionFilm-2026-10-07T07-12-04-379Z/report.md`.
- `nix develop --command env NODE_ENV=test pnpm moves compare ProblemDecompositionFilm --baseline '1334426^' --correction 1334426 --change 76-80`: expected exit 1, **Not preserved**, undeclared 0–35 (0–1.17 s) and 2400–2746 (80–91.53 s). Report: `out/revisions/ProblemDecompositionFilm-2026-10-07T07-14-08-127Z/report.md`.
- `nix develop --command env NODE_ENV=test pnpm moves compare ProblemDecompositionFilm --change 0-1.2 --change 76-end`: exit 0, **Preserved**, HEAD versus working tree, 0 changed frames, no change per declaration. Film source/assets/timeline clean; tool/plan dirty. Report: `out/revisions/ProblemDecompositionFilm-2026-10-07T07-15-37-113Z/report.md`.
- `git worktree list` after all three demonstrations: no temporary compare worktrees; snapshots `/tmp/preserve-approved-film-slice1-worktrees-{positive,negative,nochange}.txt`.
- `nix develop --command env NODE_ENV=test pnpm moves test`: exit 0, 41 suites/396 tests, lint and tsc; `/tmp/preserve-approved-film-slice1-tests.log`. One forced-worker-exit advisory; focused `--runInBand --detectOpenHandles tests/revision` passed without reported handles. Advisory cause unassigned.
- Independent refactor consolidated inclusive containment and timing summaries; `nix develop --command env NODE_ENV=test pnpm -C terry-moves exec node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand tests/revision/ranges.spec.ts tests/revision/report.spec.ts`: 2 suites/20 tests passed. Other accepted boundaries unchanged.
- Installed CLI omits fps for single-frame Stills and has no JSON mode. Such inputs fail explicitly before a verdict; multiframe scripted-film proof is unchanged. Dimensions are picture evidence, not an added preservation veto.

### 2. Terry sees the corrected moments before and after
Type: Behavior
Status: done

Behavior: The same `compare` run writes side-by-side PNGs, baseline on the
left and correction on the right, for the first, middle and last changed
frame of every changed range, both declared and undeclared. `report.md`
links each one under its range. For the replay, Terry opens the stills of the
assimilation range and sees one blue column become three scattered blue cells
(story example 1, "sees"). An unchanged declared range gets one pair from its
midpoint, labelled as unchanged.

Accepted proof (2026-10-07):

- `nix develop --command env NODE_ENV=test pnpm -C terry-moves exec node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand tests/revision`: 6 suites/39 tests passed; `previews.spec.ts` observes first/middle/last, short-run deduplication, unchanged midpoint and missing-side inputs; `report.spec.ts` observes link placement, unchanged labels and both absent-side failure reports.
- `nix develop --command env NODE_ENV=test pnpm moves compare ProblemDecompositionFilm --baseline '1334426^' --correction 1334426 --change 0-1.2 --change 76-end`: **Preserved**, six 2160×1080 preview pairs in `out/revisions/ProblemDecompositionFilm-2026-10-07T07-31-09-582Z/`. Coordinator read back/shown frame 2515 (blue column becomes scattered cells) and cover frame 0; original picture retained, baseline left/correction right.
- `nix develop --command env NODE_ENV=test pnpm moves compare ProblemDecompositionFilm --change 0-1.2 --change 76-end`: **Preserved**, zero changed frames, labelled unchanged pairs at frames 17 and 2513 in `out/revisions/ProblemDecompositionFilm-2026-10-07T07-32-57-220Z/`; report links inspected.
- `nix develop --command env NODE_ENV=test pnpm -C terry-moves exec tsx /tmp/preserve-approved-film-slice2-fixture.ts`: real ffmpeg pass; every original pixel retained, 8×4 pair dimensions, black padding/missing panels and both absent-side failure labels. Evidence `/tmp/preserve-approved-film-slice2-fixture-YZR8hk/` and post-refactor `/tmp/preserve-approved-film-slice2-fixture-dgAd2w/`.
- `nix develop --command env NODE_ENV=test pnpm moves test`: 42 suites/407 tests, lint and tsc passed. No temporary worktrees; `/tmp/preserve-approved-film-slice2-worktrees-final.txt`.
- Independent refactor consolidated frame-file indexing for hashing/previews. `nix develop --command env NODE_ENV=test pnpm -C terry-moves exec node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand tests/revision/render.spec.ts tests/revision/previews.spec.ts tests/revision/report.spec.ts`: 3 suites/22 tests passed, including real indexed hashes and incomplete-sequence rejection with only external Remotion commands stubbed. Other boundaries unchanged.

### 3. A timing change is reported as a preservation failure
Type: Behavior
Status: done

Behavior: When a film has a timeline entry (`ProblemDecompositionFilm` reads
`Problem Decomposition/film-script.json`), the report compares the following
between the two sides:
- `duration`, `fps` and the rendered cover boundary `coverDuration`;
- every scene's `id`, `start` and `end`;
- every caption range's `text`, `start`, `end`, `speechStart` and `speechEnd`.

Any difference makes the verdict **Not preserved**. A timeline failure names
the moved scene or caption and both values (story example 3). Changed picture
ranges carry scene labels, for example "health 76.17–85.73 s, end
85.73–91.53 s". That completes story example 2's naming of the health and end
scenes. The replay still reports **Preserved**.

Execution learning: `Scene.tsx` shows its end-pose cover before `coverDuration`.
This is approved timing too; compare it and label that interval as cover,
clipping any underlying script scene labels until the cover ends.

Accepted proof (2026-10-07):

- `nix develop --command env NODE_ENV=test pnpm -C terry-moves exec node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand tests/revision`: 7 suites/64 tests passed. `timeline.spec.ts` uses full real-script copies to observe all checked fields/order/add/remove, duration/fps/cover veto under `0-end`, exact health values, cover/health/end labels and explicit unregistered coverage limits; real file reads use isolated source directories.
- `nix develop --command env NODE_ENV=test pnpm moves test`: exit 0, 43 suites/432 tests, lint and tsc; `/tmp/preserve-approved-film-slice3-tests.log`.
- `nix develop --command env NODE_ENV=test pnpm moves compare ProblemDecompositionFilm --baseline '1334426^' --correction 1334426 --change 0-1.2 --change 76-end`: **Preserved**, checked timeline/audio identical, cover/health/end labels; `out/revisions/ProblemDecompositionFilm-2026-10-07T07-46-14-690Z/report.md` inspected.
- `nix develop --command env NODE_ENV=test pnpm moves compare ProblemDecompositionFilm --baseline '1334426^' --correction 1334426 --change 76-80`: expected **Not preserved**, undeclared cover 0–35 and health/end 2400–2746 named; `out/revisions/ProblemDecompositionFilm-2026-10-07T07-47-49-087Z/report.md` inspected.
- `python3 /tmp/preserve-approved-film-slice3-timing.py` temporarily moved health.end by 0.1 and ran `nix develop --command env NODE_ENV=test pnpm moves compare ProblemDecompositionFilm --change 0-end`: compare exit 1, runner exit 0, **Not preserved** solely for timeline, end 85.73333333333333 → 85.83333333333333, audio/duration/fps unchanged, all 3 changed frames intended. Report `out/revisions/ProblemDecompositionFilm-2026-10-07T07-49-16-582Z/report.md` inspected.
- Exact original film bytes restored (sha256 `76fb8cc78619152c93e9914b2ac15c1239d6b523bb78503914eb19c0943bdc76`); source/assets/timeline clean, no temporary compare worktrees (`/tmp/preserve-approved-film-slice3-worktrees-final.txt`). README covers defaults, ranges, evidence/verdict/output, dependencies and evidence limits.
- Independent refactor: none — already clean; accepted proof unchanged, no extra tests.

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
