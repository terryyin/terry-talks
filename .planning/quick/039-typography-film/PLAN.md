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

Observed on 2026-10-12 in `/Users/terryyin/git/terry-talks/.worktrees/i-can-tell-an-idea-through-typography-and-restra`, branch `codex/i-can-tell-an-idea-through-typography-and-restra`, product base `1dbab876a9b59b98d848afbe387ee2bdebdfa1e3`. All scratch source edits were removed before recording preparation. Temporary outputs under `/tmp/typography-preparation` are diagnostics only; execution does not depend on their survival.

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

The disposable probe contained only two one-second beats (text, weight and spacing), linear clamped opacity/16px settling sampled from beat progress, an Arial 90px text block on a light background, and composition registration. It was not a retained implementation or a future production dependency.

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
Status: done
Proof: The opening contrast plays through the actual script-to-composition path
at both viewing sizes, and Terry evaluates the moving sample before finishing.

Behavior: Given the selected idea and supported type directions → preview a
short contrast using the real renderer and an exported review clip → observe
large/small or weighted emphasis, purposeful spacing, gentle reveal/settling
and readable holds. Include a small script edit in this sample to verify that
direction reaches the picture, not only numeric pose output.

Own the minimal direction model, frame sampling, composition registration and font choice in this slice. Use the existing clock. Do not build a preset catalog. Record the actual preview/export commands and the sample's accepted treatment. Terry's rejection or unavailable review holds the dependent slices; change the art direction within the story or surface a scope change rather than claiming artistic acceptance from test output. The sample is interim; slice 2 replaces its incomplete argument with the whole film.

### 2. Watch the complete idea at a readable pace
Type: Behavior
Status: done
Proof: Full baseline playback conveys the selected idea at normal speed and both
viewing sizes, and export/seek observations agree with its script.

Behavior: Given the accepted moving treatment → author and export the complete short argument → the contrast, development and conclusion read coherently in silence, with unclipped text and enough settled reading time. Refine copy, line breaks, spacing and holds in the same script path. Use the actual browser layout and output, not jsdom text alone, to assess fit.

Exercise first frame, reveal/hold joins, beat changes and final frame through forward playback, reverse seeking and a fresh middle-frame render. Verify export dimensions, frame rate, duration and absence of an unintended audio track. Preserve the baseline inputs as the named baseline before revision. This slice owns complete-film review and any copy/pacing correction needed within the selected idea.

### 3. Revise emphasis and reuse the same authoring path
Type: Behavior
Status: done
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

### Execution resume context — 2026-10-12

- Established execution: `terry-moves-filmmaking#typography-film`, publisher `dashboard-territory.local-terry-talks`, agent Hitomi-chan, Story Branch Mode.
- Originating and owned execution checkout: `/Users/terryyin/git/terry-talks/.worktrees/i-can-tell-an-idea-through-typography-and-restra`; branch `codex/i-can-tell-an-idea-through-typography-and-restra`. Existing linked workspace reused; no integration checkout is selected for mutation.
- Accepted claim: `8453a630ed4cd8dec4a4f8039fc7a332752f970a`; starting revision `178f967893f1e3431b7ccd47bb6b1e119f94e0b1`. Authorized remote `origin`, eventual trunk `master`; ordinary increments publish only to the named execution branch.
- Setup: `pnpm install --frozen-lockfile` and `pnpm -C terry-moves test:unit --runInBand tests/visualTreatments/typographyTreatment.spec.tsx` passed in this checkout (six tests). Studio started here at `http://localhost:3000` and was opened and verified in Chrome before edits.
- No numeric slice budget or explicit replanning override. Preserve the existing planning authority. The Git pre-commit hook is absent; selective formatting uses the existing Remotion ESLint configuration on the changed source paths.
- CI: GitHub Actions `ci.yml`, verified active workflow 381584897, display name `CI`, push-triggered. This coordinator's Codex observer targets the execution branch: `hitomi-typography-ae630e11`, directory `/tmp/dough-ci-501/watch-mylquC`, cell 10, session 29372, PID 4360. Claim on trunk has unobserved CI coverage.
- Slice-1 manual observation is bounded to the sample and edited sample: prepare Studio/exports (20%), inspect both compositions and viewing sizes (40%), inspect reveal/hold/beat joins and script-control differences (30%), reserve for confirming any surprise (10%). Terry approved both moving samples on 2026-10-12 and authorized continuation.

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

The existing typography treatment is a useful visual precedent, not already a reusable passage engine. Local technical export is available. Final artistic quality and normal-speed readability are established by slice-1/2 observations, not preparation claims.

## Slice 1 accepted proof

The two opening samples are implemented and approved by Terry: “both looks good to me”, followed by “Okay, then continue” on 2026-10-12. Retain the original opening emphasis for the baseline; both treatments are available for the script-only revision. Review at `http://127.0.0.1:4189/review.html` (ignored local export harness), or use the two named Studio compositions. The source and reproduction instructions live in `terry-moves/src/typographyFilm/README.md`. Baseline export is 9 seconds; the script-edited sample is 11 seconds. Both are silent H.264, 1080×1080, 30 fps, respectively 270 and 330 frames.

Accepted technical proof, inspected at the real script/renderer boundary:

- `pnpm -C terry-moves test:unit --runInBand tests/typographyFilm/direction.spec.tsx` passed six tests. Remotion transport/registration alone is replaced; real script, clock and picture establish text, grouping, CSS, reveal/settling, holds, transitions, composition duration and out-of-order sampling.
- `pnpm -C terry-moves typecheck` passed.
- `pnpm -C terry-moves test:unit --runInBand tests/tpsAndAiJit/film.spec.tsx tests/tpsAndAi/languageEditions.spec.tsx` passed 37 tests for existing real-Root consumers. No shared clock or old film inputs changed, so wider visual-treatment proof is not invalidated.
- Both literal README export commands finished with exit 0. `ffprobe` confirmed the output properties above and no audio stream.
- Coordinator observed both exported samples playing at rate 1 in the review page, at measured CSS 360×360 and 1080×1080. Arrival, settled holds, passage cuts and final text were visible without clipping or overlap. The two samples visibly differ in wording, emphasis, spacing and rhythm. This observation is technical/visual evidence, not Terry's artistic acceptance.
- `python3 /tmp/typography-slice1-mutations.py` used a disposable source copy; ignoring wording, size, weight, tracking, spacing, reveal, settling or hold caused behavioral assertion failures. Baseline and restored copy passed all six tests. Diagnostics are under `/var/folders/65/16p4k5qj42qg7l46k2j0nhj40000gn/T/typography-film-proof-f3_ub2sj`.
- Independent refactor completed: local fps/size constants now feed both explicit compositions; six typography tests and typecheck passed again. Picture/script boundaries are unchanged, so export and playback evidence remains valid. Selective `pnpm -C terry-moves exec eslint src/Root.tsx src/typographyFilm/direction.ts src/typographyFilm/script.ts src/typographyFilm/TypographyFilm.tsx tests/typographyFilm/direction.spec.tsx --fix` and `git diff --check` passed.
- Earlier human-review stop (resolved by Terry's approval): obligation check refused G1 while Terry's judgment was pending. At that stop no slice was marked done and changes remained uncommitted in the owned workspace. Exact observer `/tmp/dough-ci-501/watch-gBaDbV` was stopped with zero unread events, `pendingCi: unobserved`; PID 63085 exited. Studio and the local review server remain available. The stopped observer was subsequently rearmed with the exact new identity above; resume now proceeds with slice-1 delivery.

## Story obligations

### G1. Owner-held artistic judgment
Reported: slice 1 — "Terry's artistic judgment remains pending."
Story clause: "Terry judges the artistic result; objective timing or text checks alone do not establish readable filmmaking."
Disposition: proved by slice 1: Terry reviewed both moving samples and approved continuation in the 2026-10-12 conversation.

### G2. Interim opening needs the complete argument
Reported: slice 1 — "The implementation is an interim opening contrast, not the complete film."
Story clause: "Deliver a short English, silent, square film about “Start with the problem, not the solution.”"
Disposition: proved by slice 2: TypographyProblemBaseline export, complete rendered-script tests, and Terry's continuation after the baseline review prompt.

### G3. Full baseline, revision and second-idea proof remain
Reported: slice 1 — "Complete versions and a second-idea fixture remain for later slices."
Story clause: "Retain the original and revised films, their script inputs, and usable preview/export instructions."
Disposition: proved by slice 3: Named baseline/revision/feedback compositions, README authoring recipe, rendered assertions and unchanged decoded baseline replay.

### G4. Studio cannot save imported script defaults
Reported: slice 1 — "Studio's Save default props action cannot write imported direction objects back to the script."
Story clause: "a visual editor"
Disposition: excluded "a visual editor"

### G5. Unrelated asset warning during composition evaluation
Reported: slice 1 — "Exports logged existing unrelated quillustration_flower_and_water-can/scene.bin 404s."
Story clause: "Terry can communicate an idea through a watchable typography film"
Disposition: no user cost "Terry can communicate an idea through a watchable typography film": The new silent text renderer consumes no such asset; both actual exports finished and displayed the intended samples. Existing asset inputs are unchanged.

### G6. Disposable authoring environment isolation
Reported: slice 3 — "pnpm11 auto-install ran in temp project with symlinked node_modules, potentially altering ignored terry-moves/node_modules resolution."
Story clause: "The same authoring path can express another short idea without copying a bespoke renderer."
Disposition: proved by slice 3: Owned temporary symlinks/services removed; stale ESLint dependency links repaired with force frozen install; 51 focused tests, typecheck and selective ESLint passed. README recipe repeated with independent locked dependencies, successful export and coordinator-observed preview; tracked dependency metadata unchanged.

### G7. Oversized typography test file
Reported: slice 3 — "Tests are now above the refactor skill's 250-line limit; the coordinator already identified their cohesive split."
Story clause: "Terry can communicate an idea through a watchable typography film"
Disposition: proved by slice 3: Independent refactor split direction/revision proof and shared renderedFilm transport; both suites passed 14 tests, typecheck passed, all changed files below 250 lines.

## Slice 2 accepted proof

- Complete baseline: `problemBaseline`, composition `TypographyProblemBaseline`, silent H.264 1080×1080 at 30 fps, 885 frames / 29.5 seconds. README export command and typecheck passed; owner answered the full-baseline review prompt with “continue” twice. Opening samples and actual picture renderer remain unchanged.
- `pnpm -C terry-moves test:unit --runInBand tests/typographyFilm/direction.spec.tsx` passed nine tests. Three new assertions observe the registered full argument, reveal/hold and transition boundaries, closing text, retained opening, fresh mounts and reverse/out-of-order samples. The combined run with `tests/tpsAndAiJit/film.spec.tsx tests/tpsAndAi/languageEditions.spec.tsx` passed all 37 existing Root consumers; an endpoint-only new assertion was corrected and the nine typography tests passed again without production edits.
- Two independent PNG exports of frames `0,24,42,134,135,269,270,294,312,434,435,474,495,584,585,609,627,734,735,759,777,884` to `out/typography-film/baseline-frames-a` and `baseline-frames-b` passed. Coordinator SHA-256 comparison confirmed 22 matching files, byte-identical. Coordinator observed full MP4 playback at rate 1 and measured CSS 360×360 and 1080×1080; argument, seat example and closing were legible without clipping/overlap. Actual Studio frame 495 had no line overflow.
- Independent refactor: none — already clean, no edits or rerun of unchanged proof. Selective ESLint formatting and `git diff --check` passed. Slice 1 was delivered as `eff087733cd749da6b6a1ed1f4094549f7c24944` on the execution branch; its suffix base is the accepted claim.
- Slice 2 delivery accepted `ad0a16b0b4b9471eac810e302b467fea18533876`, suffix base `eff087733cd749da6b6a1ed1f4094549f7c24944`. Conversation interruption ended the prior observer with lost coverage, zero unread events, and PID exit; its slice-1 coverage receipt records success. A new exact owner stream above recovered baseline registration through managed resume without another push.

## Slice 3 accepted proof

- Full revision preserves all words and other passages while changing seat/deadline emphasis, spacing, arrival and settled hold through `problemRevision`; `feedbackExample` uses its own two-line grouping, gaps and rhythm through the identical renderer. The focused typography plus real-Root consumer command passed 51 tests, including four suites after refactoring; typecheck passed. The new reveal assertion at frame 511 discriminates the changed entrance duration.
- `python3 /tmp/typography-slice3-mutations.py` passed its final mutation/restoration audit: all 14 reverted revision controls caused behavioral assertion failures, restored 14 tests passed. Evidence: `/var/folders/65/16p4k5qj42qg7l46k2j0nhj40000gn/T/typography-slice3-5ievgkg8/revision-mutations.json`. Prior renderer-control proof remains valid because the renderer and clock are unchanged.
- README export commands produced silent H.264 1080×1080 at 30 fps: revision 930 frames / 31 seconds, fixture 240 / 8 seconds, retained baseline replay 885 / 29.5 seconds. Coordinator `cmp` of the two decoded baseline `.framemd5` files confirmed every frame identical. Complete baseline/revision were watched at rate 1 through their ends at measured CSS 360×360 and 1080×1080; changed emphasis and pause were visible, meaning retained, no clipping/overlap. The complete fixture was watched at 360×360.
- Actual browser seeking: revision frames `0,435,459,495,519,528,585,630,780,929` and baseline `0,42,135,270,435,495,585,735,884` matched forward/reverse rendered HTML without line overflow. Fresh middle mounts matched at revision 528 and baseline 495. Temporary viewport overrides were reset.
- README's two-string “Keep changes” recipe was followed with its own frozen installation in `/var/folders/65/16p4k5qj42qg7l46k2j0nhj40000gn/T/typography-authoring-38hnen9d`: actual Studio preview and exact export succeeded; renderer/clock files remained byte-identical. Coordinator observed both passages at 1x. Owned temporary services ended with exit 130; no verification remains running. The setup concern is resolved by the isolated repeat and parent setup checks, with no tracked dependency changes.
- Independent refactor moved the unchanged nine opening/baseline assertions to `direction.spec.tsx`, five revision/reuse assertions to `revision.spec.tsx`, and external clock/registration plus real-picture helpers to `renderedFilm.tsx`. Both suites passed 14 tests; typecheck and whitespace checks passed. After force frozen install repaired the stale ESLint links, all 51 affected tests, typecheck and selective ESLint passed. Mutation targets/assertions and all product/export/playback boundaries stayed unchanged.
- Slice 3 delivery accepted `932590417cbf2b4c8e188a927f23478b80ce2b56`, suffix base `ad0a16b0b4b9471eac810e302b467fea18533876`, on the execution branch; exact current CI observation was reused.

## Execution complete

Product advice: No backlog change or correction is required. The delivered baseline, script-only revision and second-idea example support the current varied-films direction; retain music/sound, map and portrait priorities. Retrospective reviewed the attributable claim and three implementation commits against the original plan, current story, shared clock, existing treatment and behavioral proof; no supported architecture or test-cleanup finding. Process review skipped by project default. Final handoff remains conditional on the completion operation's CI verdict.
