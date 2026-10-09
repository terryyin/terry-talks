# Publish the Traditional Chinese Jidoka film

## Source and goal

Identity: terry-moves-filmmaking#traditional-chinese-jidoka-edition
Story: [Traditional Chinese Jidoka edition](../../../terry-moves/seed.md#traditional-chinese-jidoka-edition).
Terry's current instruction is “make a Traditional Chinese version.” The
approved English/Japanese edition is at `231a44c8b6d6b7e3b52fc3f84a08ea07c21630fc`.
Deliver one readable Traditional Chinese edition of the same 86-second film,
with embedded captions, SRT and opening poster, keeping all three editions
connected for future changes.

## Scope and decisions

- Translate captions and visible screen text naturally into Traditional Chinese;
  retain useful English names, acronyms and branding. Preserve the argument and
  original term 自働化, including the original person-radical glyph artwork.
  Toyota's Traditional Chinese museum uses 豐田生產方式
  ([source](https://www.tcmit.org/chinese-tw/research/car/car05)); Toyota's TPS
  explanation distinguishes 自働化 through its person radical
  ([source](https://global.toyota/jp/company/plant-tours/production-system/)).
- Keep the single 1080×1080, 30 fps, 2580-frame clock, retained nine scenes,
  media and score. Extend the existing paired authoring homes and thin locale
  composition pattern; no copied Chinese scene tree or second timeline.
- Preserve English/Japanese text, behavior and stable deliveries. Retain the
  original upper-right logo, generic computer screens and localized Terry
  closing credit. No CI wording, new narration, argument rewrite, upload,
  translations of sibling films or generic internationalization platform.
- Use the current installed Node/pnpm/Remotion dependencies. Render font and
  layout suitability is established in an early visual probe within slice 1,
  before the full export in slice 2; a failed probe stops that dependent export
  and requires revision within the existing argument and clock.

## Workspace and established context

The caller explicitly selected the retained workspace
`/Users/terryyin/git/terry-talks/.worktrees/jidoka-film-remake`, branch
`codex/jidoka-film-remake`, starting at the revision above. It is clean and
reused; its creation ref names `tps-and-ai-film#english-square-film`. The default
integration checkout is `/Users/terryyin/git/terry-talks`; authorized publication
target is `origin/master`. This preparation makes no announcement, queue edit,
Take, commit or push under its caller's limits. The owning execution workflow
retains delivery and cleanup responsibility.

The filmmaking seed's accepted direction supports complete, revisable films.
No separate North Star file is present. ADR0000 and its index agree on the sole
Accepted ADR; the local extension follows the existing design and adds no
consequential architectural decision.

## Existing solutions and decisive premises

Execution context: Story Branch Mode, retained checkout and branch above;
publisher `jidoka-zh-hant-01a11b61`, host `codex`, repo `terryyin/terry-talks`.
Prepared contract accepted on origin/master at
`ff478d4373cd0960c6c85366c8b861e9bc597a52`; Take accepted there at
`81106ce0df2a24df73915282293b013882d24842`, assigned author Anri-chan.
The reused execution branch was brought forward to that exact Take through
the installed resume operation without rewriting published history. This is
the first implementation delivery base. Worktree `created:false`; management
context `/Users/terryyin/git/terry-talks/.git`, original creation identity retained.
The same checkout-bound locked dependency installation is reused unchanged;
post-Take bundled-PATH `pnpm --dir terry-moves exec tsc --noEmit` exited0.
No Git hooks are installed; selective ESLint remains coordinator-owned.
Scoped replanning is authorized within this film outcome; no numeric slice
limit is supplied. No hosted workflow or live observer exists; retain the
coverage gap rather than claiming CI or shutdown. Studio is locally owned on
port3033 (PTY7595), IAB tab7, showing the approved shared composition before edits.
Existing default-checkout deliveries were SHA256-snapshotted before changes
in `/private/tmp/jidoka-zh-hant-preserved-deliveries.json`.

1. PFE traced `FilmLanguage`, caption `translations`, `useFilmText`, the actual
   Root registrations, all TPS scene consumers, and all `exportFilmSubtitles`
   callers with `rg` across `terry-moves`, `scripts`, and film content. The
   existing TPS `language.tsx`, `Frame.tsx` and `TPSAndAIFilm.tsx` own exactly
   this locale-selection responsibility: one shared scene tree with a thin
   Japanese wrapper, adjacent viewer wording and one shared score. Extend it.
   Story Impact's `StoryImpactFilmZhHant` uses separate recorded narration and
   its own caption model; it supplies naming precedent, not a suitable TPS
   translation implementation.
2. At the unchanged baseline, the real Root-selected-language integration test
   command below passed 30 tests. Its setup replaces only Remotion transport
   and media, then mounts the actual Root, selected film, language provider and
   shared scenes. Assertions observe both registrations, shared 2580-frame
   clock/choreography/media, caption selection, visible labels/statuses and
   final-frame credits. This settles the existing composition proof entry.
3. Reading `film.ts` and canonical `film-script.json` confirms one scene clock
   and 19 caption intervals; translations are attached to captions. Reading
   the exporter and TPS wrapper confirms generic translation selection already
   fails explicitly for missing text, while the wrapper's allowed selections
   and `all` enumeration currently need extension beyond `en`/`ja`. The other
   three wrapper callers rely on the unchanged default English selection.
   Existing TPS tests own real CLI text/interval parity and all four defaults.
4. Current CJK style branches in Frame, House, Loom, Contrast and Judgment are
   Japanese-specific; they are actual reached consumers of the new locale.
   Their font/layout policy needs deliberate Chinese selection, including the
   small radical annotation mask and screen-status overlay. Reading font files
   confirms host Songti and Hiragino fonts, but does not prove Chinese glyph
   fallback or mobile fit. Slice 1 owns actual Chromium still observations of
   the opening, TPS house, loom annotation, both contrast states, judgment and
   longest caption; these uncertainties are not claimed settled by file presence.
5. Queued correction 026 concerns exporter tests mutating repository SRTs; it
   is not a film dependency. Do not execute it here. During affected local proof,
   snapshot and restore all reached source/delivery SRT bytes and existence,
   run serially, and compare after terminal completion. Keep new Chinese proof
   bounded; the existing four default callers remain affected consumers.
6. `.github/workflows` and `.planning/open-dough.json` are absent. Local checks
   and actual render/playback own delivered-film proof; no hosted CI success or
   observer shutdown may be invented. Publication follows installed execution
   delivery rules and reports the observer coverage gap truthfully.

## Proof ownership

| Promise | Owning slice and observable signal |
| --- | --- |
| Select a complete Chinese film without duplicate choreography | 1: Actual Root-selected composition renders Chinese viewer wording; all three editions observe the same shared scene components, sequence clock and retained media. |
| Accurate and fully localized argument | 1: Independent Traditional Chinese wording review of all 19 captions and visible screen labels; preserve 自働化/radical, TPS meaning, stop/rule/evidence semantics and minimalism's needed behavior. 2: full muted playback confirms the argument on the actual delivered movie. |
| Readable at phone size, original style retained | 1: early actual Chromium still probe at 360px confirms Chinese glyphs, line breaks and crowded regions. 2: actual MP4 decoded frames at each caption midpoint plus opening/final credit and complete muted playback at 360px. |
| Embedded/exported text and intervals match | 1: actual TPS wrapper produces 19 matching entries for `zh-Hant`, exact source/delivery parity and fresh `all` output; missing language text still fails. |
| English/Japanese behavior and delivery files preserved | 1: existing TPS/Root proof stays green, four default exporter callers remain English, protected source/delivery snapshots are restored. 2: compare pre/post delivery hashes and actual representative rendered EN/JA scenes where the changed style branches reach them. |
| Publishable reproducible files | 2: actual named package command finishes; ffprobe observes 1080×1080, 30 fps and 86-second video; full ffmpeg decode succeeds; MP4/SRT/frame-zero poster copied to stable output paths and authoring/reproduction documentation is updated. |

Use bundled Node on PATH:
`/Users/terryyin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH`.
Observed baseline command:
`pnpm --dir terry-moves exec node --experimental-vm-modules node_modules/jest/bin/jest.js tests/tpsAndAi/languageEditions.spec.tsx --runInBand`.
Slice 1 focused proof:
`pnpm --dir terry-moves exec node --experimental-vm-modules node_modules/jest/bin/jest.js tests/tpsAndAi tests/aiTestAutomation/film.spec.tsx --runInBand`,
with the artifact protection above, plus `pnpm --dir terry-moves exec tsc --noEmit`.
Choose representative actual Remotion still frames from the unchanged script
boundaries; retain literal commands and observations during execution. Slice 2
uses `pnpm --dir terry-moves render:tps-and-ai:zh-hant`, following the established
package command pattern. Capture pre-change EN/JA media hashes before any run
that could invalidate preservation evidence. No unrelated full-suite gate is
required. Apply installed post-change refactor and delivery/review gates at
each slice; manual playback observation is explicitly part of this plan.

## Ordered slices

### 1. Select and preview Traditional Chinese through the shared film
Type: Behavior
Status: done
Proof: Real Root registration and selected shared scenes show the reviewed
Chinese argument and screen text; all 19 embedded/exported captions agree;
English/Japanese consumers and default callers remain green. Early actual
Chromium stills confirm glyph coverage and mobile fit before slice 2 proceeds.

Behavior: Given the approved shared English/Japanese film, selecting the new
Traditional Chinese composition runs the same story and media with natural
Chinese captions and viewer labels. Extend the existing caption translations,
viewer-text catalog, locale styling, thin registration and subtitle selection
together. Keep translated word lengths and line breaks within the existing
clock. Record representative render probes and correct any layout discrepancy
before accepting this preview slice; leave the usable selected preview intact.

Accepted proof: the actual Root-selected three-language consumer and real CLI
tests passed3suites/46tests under the literal focused command above. The
external guard `/private/tmp/jidoka-zh-hant-srt-proof.py` restored all9 reached
SRT bytes/existence after the terminal result. Root inspected the real Root
transport setup, shared component/media observations, all19 caption intervals
at start/midpoint/last active frame, fresh six-output all-mode observations,
all four English defaults and explicit unknown/missing-language rejection.
Actual composition enumeration exited0 with all three2580/30/1080 editions;
one unrelated existing StorySimpleExample flower scene.bin404 is outside TPS.
Independent review of all19 actual Chinese captions and the full catalog found
no corrections. Each actual Chromium still0/202/600/1080/1260/1440/1800/1905/
2220/2540 exited0; root inspected all ten at360px plus the IAB opening/house/
loom. HeitiTC/SongtiTC glyphs, line breaks, labels, radical mask, closed-stop
diagram and credit fit. The visual gate is passed. Source JSON equals the
approved baseline after removing only the new Chinese translations.
Fresh refactoring consolidated the five consumers' localized font selection
in the existing language seam, preserving every font string/geometry; protected
46-test proof and tsc were rerun successfully. Current font/layout observations
remain valid. Coordinator selective ESLint on11changedTS/TSX paths exited0.
Only full actual export/playback/decoded-frame review, retained EN/JA render
comparison, stable copies and maintained authoring documentation remain.

### 2. Watch and retain the complete Traditional Chinese edition
Type: Behavior
Status: done
Proof: The actual full package render produces a decodable 86-second square
MP4, matching SRT and opening poster. Full muted phone-size playback and all
caption-midpoint decoded frames pass; EN/JA retained delivery bytes are unchanged.

Behavior: Given the accepted selectable preview, the existing production route
exports the full Chinese edition. Inspect the actual output, polish only
evidenced typography/layout/wording discrepancies, then retain stable files
alongside the English and Japanese versions and document all three edition
commands and shared authoring homes. Playback review owns complete-film pacing
and readability beyond isolated stills. Keep the original score and artwork;
any local polish must preserve EN/JA selections through the affected proof.

Accepted proof: the literal bundled-PATH `pnpm --dir terry-moves
render:tps-and-ai:zh-hant` production command exited0, including frame-zero
poster. ffprobe exited0: H264/yuv420p/bt7091080×1080 at30fps,2580frames,
86.000s video; AAC stereo48kHz and86.016s padded container. Full ffmpeg
`-v error -xerror` decode exited0 without errors. All19Chinese SRT texts and
intervals match canonical JSON; source/delivery bytes agree. Poster pixels
match the accepted frame0probe. Literal commands and metadata are retained
for this execution in ignored `out/zh-hant-production-proof.json`.
Root decoded21actual MP4frames: opening, every caption midpoint and2579;
all were reviewed at360px on three contact pages. No clipping, missing glyph,
overlap or argument discrepancy was found. Complete normal-rate muted
playback on the360px local player reached86.016s with `ended:true`,
`muted:true`, `rate:1`, `error:null`; final credit is present. Manual result:
Good. Six actual current EN/JA Chromium stills600/1080/1905 each exited0;
root compared them at360px with decoded accepted-film references and found
preserved wording/layout/glyphs. This is a visual comparison, not pixel
identity across PNG and compressed MP4. All8protected default delivery hashes
remain unchanged. Root copied the three Chinese outputs to the default
checkout's stable ignored out paths and verified matching SHA256s, including
MP4 `37b0a83d4db21f47c414e5b320e32e14c6005cdb5ca2b377d1b754ab1c7d28da`.
The maintained film brief describes all3editions, shared authoring, reproduction
routes and font policies. No implementation polish or repeated test run was
needed after the accepted font/layout probe. Fresh independent post-change
refactor found the three-edition brief already coherent and accurate; no edits.
Coordinator formatting is a no-op for these Markdown-only changes; diff check
exited0. Slice1 accepted increment is8f902863f4513c83f1689f559b2eedc64daef4c5.

## Concern review

Slice-plan refinement is not needed: one coherent locale-extension rule owns
selectable preview and integration, then one actual delivery loop proves the
complete artifact. The early actual font/layout probe bounds the only rendering
uncertainty before full production. No remaining input, architecture, sizing or
proof concern was identified. No numeric slice target was supplied or invented.
This plan grants no Take, queue priority, implementation or publication authority.
