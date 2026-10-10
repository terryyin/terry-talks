# Isolate subtitle exporter proof from film artifacts

## Source

Identity: terry-moves-filmmaking#subtitle-export-test-isolation
Story: [subtitle exporter test isolation](../../../terry-moves/seed.md#subtitle-export-test-isolation).
Bounded correction from the completed planned
`terry-moves-filmmaking#translated-caption-edition` execution, whose earliest
ready plan and story were accepted at `6e709f2c7b9aa15559661e4023e0c8b1378e14b1`.
Completed predecessor story and proof are recoverable at before-cleanup commit
`92872351c343201418f22c49385f9070adb9758a`, repository-relative paths
`terry-moves/seed.md#translated-caption-edition` and
`.planning/quick/025-jidoka-japanese-edition/PLAN.md`.
The attributable published implementation set is
`af16b43d69c3be0d52aee797b1499f3968841c7c` (paired languages and shared consumers)
and `e31110190d7a6676fe14014ac708c54471392a9f` (Japanese polish and maintained brief).
`97b89c2` and `bbff752` are preparation/Take provenance; `6adf028` is the
accepted English baseline and earlier film work is outside that set.

## Current finding and impact

At the reviewed Japanese revision `e311101`,
`terry-moves/tests/tpsAndAi/film.spec.tsx` invoked the actual English/Japanese
CLI against checkout source and delivery SRTs without restoration; the four
wrapper-default case additionally regenerated three neighboring films' tracked
SRTs. The older English test already had this weakness; `af16b43` expanded it
to Japanese and sibling films.

Current truth after the Traditional Chinese integration at
`8f902863f4513c83f1689f559b2eedc64daef4c5`: per-locale cases now restore their
own source/delivery bytes and existence, and `all` restores all six TPS outputs.
The unchanged four-defaults case still rewrites TPS English source/delivery
and all three neighboring source SRTs without restoration. The Chinese
execution ran the focused suite serially inside an external nine-file
snapshot/restore guard; that execution protection does not isolate the tests.
The same planned disposable-repository boundary remains needed; retain the
current three-language caption/CLI coverage when moving those invocations.
This is updated evidence for the existing correction, not a new correction
or authorization to execute it.

Running this proof can replace pre-existing local subtitle bytes. Jest has no
serial-worker policy in `terry-moves/jest.config.js`, and the existing
`tests/aiTestAutomation/film.spec.tsx:53` reads the same AI SRT. Concurrent
rewrite/read interference is a plausible risk, rather than an observed failure.
There is no delivered-film discrepancy or requirement to rerender the movies.

## Goal and scope

Give the real exporter test invocation one disposable filesystem boundary.
Keep production scripts, caller defaults, generated filenames, captions,
translations, fonts, scenes, clocks, media and stable delivery artifacts intact.
Retain every meaningful exporter integration assertion and the Root language
integration proof. Do not replace the exporter with a mock, widen production
APIs solely for tests, alter neighboring film behavior, or add a generic fixture
framework. No full-suite optimization, rerender, upload or backlog change belongs
to this correction.

## Existing solutions and decisive premises

- PFE traced all `exportFilmSubtitles` callers and all test invocations through
  `rg -n 'exportFilmSubtitles|subtitles.mjs|film-en.srt|ai-test-automation.srt|problem-decomposition.srt|problem-decomposition-remake.srt' scripts terry-moves/tests`.
  All real CLI invocations needing relocation are in TPS `film.spec.tsx`;
  neighboring artifact consumers read their checked-in outputs.
- `scripts/film-subtitles.mjs` derives its repository from its module path;
  wrappers also resolve source/delivery paths relative to themselves. An isolated
  probe copied these unmodified production scripts and the four canonical JSON
  inputs to a temporary repository layout, with stale output sentinels. Actual
  `/Users/terryyin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node <temporary-root>/scripts/<wrapper>-subtitles.mjs`
  invocations for all four defaults, and TPS with `en`, `ja`, `all`, each exited 0.
  Sentinels were overwritten and TPS source/delivery bytes matched. Unknown
  language was rejected. All seven real checkout SRTs remained byte-identical;
  the temporary probe was removed. This settles the proposed fixture boundary
  without a new production option or touching delivered artifacts.
- `tests/revision/timeline.spec.ts:154` and `render.spec.ts:32` already use
  `mkdtemp`/`tmpdir` and final cleanup for filesystem proof. Reuse that lifecycle
  pattern with only the script/input files these exporter tests consume;
  there is no existing suitable subtitle fixture helper to reuse directly.
- The current TPS direct-caption and Root-selected-language tests own distinct
  algorithm and integration boundaries. Preserve both; the retrospective found
  no measured cost or behavioral reason for consolidation.
- ADR0000 and its index agree. Test fixture isolation is a reversible local
  correction with no new architectural decision. The existing backlog direction
  remains varied authored films with connected actions; this correction protects
  those films' retained artifacts. No North Star change is warranted.

## Proof ownership

The single slice owns preservation and integration together:

| Promise | Observable proof |
| --- | --- |
| Tests do not mutate existing checkout source/delivery SRTs | Snapshot all four films' source SRTs and TPS delivery SRTs before the focused command; compare bytes and existence immediately after its terminal result. Inspect every exporter subprocess target to confirm its module path is inside a disposable repository. |
| Real CLI defaults and both languages retain text/interval behavior | Run unmodified production wrapper/exporter bytes in disposable fixtures; retain all 19 embedded/exported-caption comparisons and all four defaults. |
| Generation is fresh and errors remain meaningful | Seed only disposable outputs with sentinels; retain immediate complete source/delivery assertions for `all`, and unknown/missing-language rejection. |
| Fixture lifecycle survives a failing case | Ensure cleanup runs through Jest's lifecycle/finally after successful and rejected CLI invocations; no test-owned temporary directories remain. |
| Shared films and neighboring artifact reader still work | Existing TPS Root language integration and AI film artifact tests remain green in the same focused two-worker run. |

Use bundled Node on PATH:
`/Users/terryyin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH`.
The focused command is:
`pnpm --dir terry-moves exec node --experimental-vm-modules node_modules/jest/bin/jest.js tests/tpsAndAi tests/aiTestAutomation/film.spec.tsx --maxWorkers=2`.
Two workers exercise the reached reader alongside exporter proof. Run
`pnpm --dir terry-moves exec tsc --noEmit` if the fixture change adds typed
test imports or declarations. Use the installed post-change refactor and
ordinary execution delivery/review gates. No full-suite or render gate is
required for a test-only filesystem correction.

## Ordered slices

### 1. Real exporter proof leaves Terry's film artifacts untouched
Type: Structure
Status: done
Proof: The focused two-worker TPS/AI command passes, repository SRT bytes and
existence are unchanged, all existing CLI/caption/default/error observations
survive, and disposable fixtures are removed on success and failure.

Structure: Replace the current repository-writing setup in every TPS exporter
case with one small disposable repository fixture lifecycle. Run the current
unmodified production scripts with canonical film JSON inputs in that fixture;
keep fresh-output and real-command integration assertions. Correct the earlier
English case together with the new Japanese/default cases, so no remaining
caller writes a shared repository artifact. This slice directly owns the
evidenced test-suite isolation correction and preserves external film behavior.

Accepted proof: every exporter subprocess in
`terry-moves/tests/tpsAndAi/film.spec.tsx` (four per-language cases, `all`,
four wrapper defaults, both rejections) now targets `inDisposableRepository`,
a `mkdtemp` copy of the unmodified production scripts and four canonical
`film-script.json` inputs removed in `finally`; sentinels are seeded only
there. The focused two-worker command passed 5 suites / 56 tests, before and
after the refactor pass. A sha256-and-existence snapshot of all nine tracked
SRTs and the `terry-moves/out` delivery SRTs was identical across the run
(`terry-moves/out` stayed absent). With two assertions deliberately broken,
five cases failed and no `tps-subtitles-*` directory remained in the system
temporary directory; the probe was reverted. `tsc --noEmit` passed.

Learnings: the suite had grown to four TPS languages (Thai added) since
planning; all four moved together. `tests/tpsAndAiJit/delivery.spec.tsx`
already isolates its own exporter invocation and needed no change. The
unknown-language rejection now also asserts the exporter's message.

## Concern review

Slice-plan refinement is not needed: one cohesive filesystem-isolation change
and one focused proof loop remove the single root cause. No remaining bounded
input, ownership, architectural or proof concern was identified. The safe actual
CLI probe settled the module-relative fixture premise. There is no supplied
numeric slice limit and none is invented. This plan grants no Take, queue
priority, implementation or publication authority.
