# Tell and revise an idea through typography

**Identity:** terry-moves-filmmaking#typography-film
**Source:** [refined story](../../../terry-moves/seed.md#typography-film)

## Goal and scope

Make a short English, silent, square film about “Start with the problem, not the
solution,” then meaningfully revise emphasis and pause timing in one passage
through its script. Terry accepted this direction on 2026-10-12. Deliver the
baseline, revision, reusable script path and reproduction instructions. This
plan authorizes no implementation by itself.

Use 1080×1080 at 30 fps and also judge normal playback at 360 pixels square.
An approximately 20–35-second edit is an initial pacing hypothesis, not a hard
runtime constraint. Let actual reading and the argument determine the holds.
Working copy can move from the opening contrast to “What is someone trying to
do?”, a smaller useful outcome, and the closing return to the problem. These
are drafting choices within the accepted idea, not approved final copy.

The supported vocabulary is text/line grouping, size and weight emphasis,
spacing, gentle reveals/settling, and reading holds. Use one treatment. A small
second-idea fixture proves reuse; it is not a second polished film commitment.
Preserve baseline inputs and existing films. Sound, translations, other aspect
ratios, generated assets, arbitrary font import, a visual editor, universal
text fitting and a general typography framework are deferred, not rejection rules.

## Current decisions and reuse

PFE inspected the product's text treatments, film scripts, shared timeline,
composition registration and focused tests, including `visualTreatments`,
`problemDecompositionRemake`, `problemDecomposition`, and `featureTeams`.

- Reuse `terry-moves/src/beatTimeline.ts` for authored beat durations and
  frame sampling. It already owns the clock; do not add a second timing system.
- `visualTreatments/typography/script.ts` and `TypographyTreatment.tsx` encode
  stock/hours/reservation, their statuses, fixed cards and shared brief. Their
  renderer is not an arbitrary-passage solution. Preserve those versions;
  add the small new passage-direction responsibility for this film rather than
  making unrelated films adopt a new format.
- The common rule is an ordered sequence of text groups with explicit emphasis,
  spacing and reveal/hold direction. The renderer consumes sampled direction;
  no branch on the selected slogan or passage identity. The same rule serves
  the baseline, revision and second-idea fixture. A TypeScript data script is
  sufficient; no DSL parser or editor is needed.
- Existing film `ease` helpers and CSS type styling show elementary rendering
  patterns, but helpers tied to another film's JSON are not an architectural
  dependency to copy. Use the installed frame-based Remotion primitives or
  expose a shared responsibility only if the current work genuinely needs it.
- `visualTreatments/versions.ts` demonstrates named preserved versions; its
  registry and selection policy belong to the decomposition comparison. Give
  the new film stable baseline/revision compositions without extending that
  unrelated selection workflow. Add them through the existing root registration.
- The current fonts in the reference treatment are system Arial and Georgia.
  The probe consumed Arial successfully here. Document the actual font and
  render environment; if production chooses a bundled face, retain that local
  asset and its license and verify font loading before assessing fit.
- [ADR-0000 — Use Architectural Decision Records](../../../docs/adrs/0000-use-adrs-accepted.md)
  is the only current Accepted ADR; index and record agree, with no successor.
  It preserves Terry's ownership of durable decisions. This local extension
  conflicts with none and needs no new North Star topic or ADR.

## Preparation observations and limits

Observed on 2026-10-12 in
`/Users/terryyin/git/terry-talks/.worktrees/i-can-tell-an-idea-through-typography-and-restra`,
branch `codex/i-can-tell-an-idea-through-typography-and-restra`, product base
`1dbab876a9b59b98d848afbe387ee2bdebdfa1e3`. All scratch source edits were removed
before recording preparation. Temporary outputs under `/tmp/typography-preparation`
are diagnostics only; execution does not depend on their survival.

| Decisive premise / consuming operation | Observation and result | Limit / consequence |
| --- | --- | --- |
| This checkout can consume script-directed text through the shared clock and export square video | Disposable `src/__typographyPreparationProbe.tsx` built two text beats using the actual `timeline`, sampled them with `useCurrentFrame`, and registered a 1080-square composition. CLI export and ffprobe confirmed silent H.264, 60 frames, 30 fps, 2 seconds. | Establishes local render/font/clock route, not final copy or production readability. |
| The exported picture consumes the two beats' actual text and styling | Extracted frames at 0.7 and 1.7 seconds were inspected: bold “Start with the problem.” and regular “Not the solution.” appeared inside the frame with their authored spacing. | This deliberately short technical probe is not an accepted motion sample or reading-pace decision. |
| Existing typography checks detect a broken clock at the drawing boundary | Six existing typography tests passed; replacing `beatAt(frame)` with `beatAt(frame * 0)` in `poseAt` caused three behavioral assertion failures; restoration passed all six. | Existing regression proof only. New script controls and visual quality need their own observations below. An earlier unused-variable mutation failed compilation and was discarded as evidence. |
| Terry finds the new type performance expressive and readable | Owner-held artistic judgment remains unobserved because the production treatment does not exist yet. | Slice 1 is an early moving-sample probe. Rejection stops dependent finishing and revises the treatment before more production. |

Literal successful observation commands from repository root:

```sh
pnpm -C terry-moves test:unit --runInBand tests/visualTreatments/typographyTreatment.spec.tsx
pnpm -C terry-moves exec remotion render src/__typographyPreparationProbe.tsx TypographyRouteProbe /tmp/typography-preparation/route.mp4 --codec=h264 --concurrency=2 --log=error
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,nb_frames -show_entries format=duration -of json /tmp/typography-preparation/route.mp4
ffmpeg -v error -y -ss 0.7 -i /tmp/typography-preparation/route.mp4 -frames:v 1 /tmp/typography-preparation/problem.png
ffmpeg -v error -y -ss 1.7 -i /tmp/typography-preparation/route.mp4 -frames:v 1 /tmp/typography-preparation/solution.png
```

The disposable probe contained only two one-second beats (text, weight and
spacing), linear clamped opacity/16px settling sampled from beat progress,
an Arial 90px text block on a light background, and composition registration.
It was not a retained implementation or a future production dependency.

## Outside-in proof ownership

| Final promise | Owner | Observable proof |
| --- | --- | --- |
| Clear argument through readable restrained motion at both viewing sizes | 1 for treatment decision, 2 for whole film | Normal-speed playback of actual sample and final export at 1080 and 360 square; Terry judges attention and meaning; inspect transitions and settled frames for clipping/overlap. |
| Wording, size/weight, spacing and pacing are script-directed | 1 for initial path, 3 for complete revision/reuse | Edit inputs and observe changed text, visible styling, group spacing and timing in the same renderer; meaningful behavioral assertions fail when each edited input is ignored. |
| Baseline and meaningful revision both available, meaning retained | 3 | Named compositions/exports side by side, inspect diff restricted to intended direction inputs, watch both complete films, reproduce baseline from retained inputs. |
| Path reusable for another idea | 3 | Different short text and group arrangement render through the same entry point with no renderer edits or slogan-specific branch. |
| Stable frame sampling and repeatable export | 2 and 3 | Compare first/transition/hold/final frames reached by forward play, reverse seek and fresh middle-frame mount; repeat sampled export under the documented font environment. |
| Existing films remain reproducible | Every affected slice | Keep old treatment inputs unchanged; if shared code changes, run all consumers identified by imports and test setup, including the visual-treatment suite. |
| Usable retained inputs and instructions | 3 | Follow documented baseline/revision preview and export commands with retained scripts/assets, and make the documented revision without component editing. |

## Ordered slices

### 1. Preview a directed moving type contrast
Type: Behavior
Status: planned
Proof: The opening contrast plays through the actual script-to-composition path
at both viewing sizes, and Terry evaluates the moving sample before finishing.

Behavior: Given the selected idea and supported type directions → preview a
short contrast using the real renderer and an exported review clip → observe
large/small or weighted emphasis, purposeful spacing, gentle reveal/settling
and readable holds. Include a small script edit in this sample to verify that
direction reaches the picture, not only numeric pose output.

Own the minimal direction model, frame sampling, composition registration and
font choice in this slice. Use the existing clock. Do not build a preset catalog.
Record the actual preview/export commands and the sample's accepted treatment.
Terry's rejection or unavailable review holds the dependent slices; change the
art direction within the story or surface a scope change rather than claiming
artistic acceptance from test output. The sample is interim; slice 2 replaces
its incomplete argument with the whole film.

### 2. Watch the complete idea at a readable pace
Type: Behavior
Status: planned
Proof: Full baseline playback conveys the selected idea at normal speed and both
viewing sizes, and export/seek observations agree with its script.

Behavior: Given the accepted moving treatment → author and export the complete
short argument → the contrast, development and conclusion read coherently in
silence, with unclipped text and enough settled reading time. Refine copy,
line breaks, spacing and holds in the same script path. Use the actual browser
layout and output, not jsdom text alone, to assess fit.

Exercise first frame, reveal/hold joins, beat changes and final frame through
forward playback, reverse seeking and a fresh middle-frame render. Verify
export dimensions, frame rate, duration and absence of an unintended audio
track. Preserve the baseline inputs as the named baseline before revision.
This slice owns complete-film review and any copy/pacing correction needed
within the selected idea.

### 3. Revise emphasis and reuse the same authoring path
Type: Behavior
Status: planned
Proof: A script-only edit yields a meaningfully different readable film, the
baseline stays reproducible, and another short idea uses the same renderer.

Behavior: Given the baseline and its editable script → shift emphasis and pause
timing in one passage → see attention and reading rhythm change while the
argument remains intact. Retain both named versions. Include a spacing edit
in the revision or second-idea fixture so that spacing direction is observed.

Use a compact second-idea example, such as “Make feedback small. Make it useful.”,
with different text grouping and timing. It exercises the same model without
becoming a second finished-film promise. Test through rendered text/styles and
composition duration; disable revised controls temporarily to establish that
the relevant new checks fail, then restore and pass. Do not merely assert a
fixture's own configuration values.

Watch both complete versions and inspect the second example at 360 square.
Replay the baseline from its retained script after the revision. Document the
supported vocabulary, font environment, named compositions, export commands,
and how to author/revise another passage. Follow those instructions once to
verify they reach preview and export without a renderer change.

## Execution boundaries and review

Each slice owns implementation, focused checks, visual proof and cleanup for
one cohesive result. There is no project numeric slice limit; do not invent
one. The early sample bounds visual uncertainty; later slices separately own
the complete argument and authoring revision. No separate infrastructure slice
is justified. The sequence exercises one text-direction model throughout.

Follow the installed execution workflow's post-change refactor, agent commit,
delivery and review gates. Use focused tests for the new authoring boundary;
run the whole visual-treatment suite if its shared clock or rendering helpers
change. Run TypeScript checking when adding composition/script types. Hosted CI
configuration alone does not require every suite locally. Broaden proof only
for actually affected consumers. Manual visual observation is required by these
slices under the manual-testing skill; test output cannot replace film review.

## Learnings

The existing typography treatment is a useful visual precedent, not already a
reusable passage engine. Local technical export is available. Final artistic
quality and normal-speed readability remain the explicit slice-1/2 observations,
not preparation claims.
