# English and Japanese editions of the Jidoka film

## Source

Identity: terry-moves-filmmaking#translated-caption-edition
Story: [translated-caption edition](../../../terry-moves/seed.md#translated-caption-edition).
Terry requests Japanese captions and viewer text, English only where useful,
and two editions that change together without duplicated film authoring.
The accepted English source is `6adf0286802d983ad01843da4da893ee5b9fdc6b`.

## Goal and scope

Deliver the Japanese film and retain the approved English film. Share the
86-second/2580-frame square timeline, paintings, music, scenes and animation;
pair translated wording with its source. Localize headings, house/stop/evidence
labels, the radical annotation and credit as well as all19 captions. Keep
English only for useful acronyms/names. No narration, upload, generic translation
engine or automatic future translation. Both caption exports use the same clock.

## Existing solutions and decisive premises

PFE traced `film.ts`, all nine authored scenes, `TPSAndAIFilm.tsx`, Root,
the shared `film-subtitles.mjs` and all four exporter callers. StoryImpact's
thin locale wrapper/shared-picture pattern is suitable; its caption-only policy
and English fallback are unsuitable here. Reuse TPS's existing absolute clock
and authoring components rather than migrating to legacy accumulated-duration
Story or creating a second film script. Use film-local language text with
complete Japanese coverage. Independent JSX composition registrations remain
editable. ADR0000 and its index agree; no technical conflict or new ADR is needed.
Near-future direction remains varied authored films with connected actions.

On the retained production checkout at the unchanged locked dependency state,
the literal bundled-PATH focused Jest command below passed7/7 on the accepted
English source after preparation refresh. Actual tests invoke the exporter,
select caption intervals through rendered components and observe the paired
paintings, frame0, logo, one-play loom and credits. This establishes the current
consumer and setup baseline; mocks do not establish pixel or moving-film proof.
Read-only asset inspection found English only in covered monitor planes and
the radical SVG's `ninben = person` label. Reuse outlined kanji and localize
that label without duplicating artwork. Existing host Hiragino Gothic/Mincho
fonts were inventoried; actual Japanese glyph/render fit remains an early
slice1 probe, which stops dependent production if it fails.

## Proof

Use PATH `/Users/terryyin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH`.
Run `pnpm --dir terry-moves exec node --experimental-vm-modules node_modules/jest/bin/jest.js tests/tpsAndAi/film.spec.tsx --runInBand`,
extended meaningfully for both locale consumers, shared intervals and actual
SRT/embedded-caption parity. Check any other exporter consumers reached by a
shared exporter change, preserving their English default. Run
`pnpm --dir terry-moves exec tsc --noEmit` for changed distributed props/imports
and the actual Remotion composition route. Render representative Japanese
opening/house/loom/judgment frames to prove fonts, masks and layout before
the complete renders. Inspect actual English comparison frames and Japanese
all-caption/label frames at360pixels; view the complete Japanese film muted
at normal speed. Full render routes, metadata/decode and identical clocks/SRT
intervals own delivery proof. No unrelated full suite is a local gate.

## Execution context

Mode: story-branch. Execution checkout:
`/Users/terryyin/git/terry-talks/.worktrees/jidoka-film-remake`;
branch `codex/jidoka-film-remake`; integration/default checkout
`/Users/terryyin/git/terry-talks`; remote `origin`, trunk `master`, repo
`terryyin/terry-talks`, host `codex`, publisher `jidoka-japanese-01a11b61`.
The owned retained checkout is reused (`created:false`) and its creation record
names `tps-and-ai-film#english-square-film`; this story must not retire it as
newly created. Management context: `/Users/terryyin/git/terry-talks/.git`.
Ready preparation accepted at `6e709f2c7b9aa15559661e4023e0c8b1378e14b1`;
Take accepted at `bbff752f5708edec02326460e3a1908196cdb1f4`, assigned author
Honoka-chan. Both are recoverable on origin/master; the Take is also the initial
published execution-branch base. Recorded readiness is not renewed by execution.

Checkout-bound locked installation from prior production is reused at the same
dependency state. After accepted startup, bundled-PATH
`pnpm --dir terry-moves exec node ../scripts/tps-and-ai-subtitles.mjs` exited0
and generated19 matching English captions. No active Git hooks are installed;
selective ESLint for changed TS/TSX stays with the coordinator.
CI setup was checked in this checkout: no `.planning/open-dough.json` and no
push workflow files exist. GitHub-default workflow cannot be verified, so
observation is unavailable and no observer is armed or shutdown claimed.

## Ordered slices

### 1. Terry can select English or Japanese from the same authored film
Type: Behavior
Status: done
Proof: Actual registered language consumers and exporter tests observe complete
localized text against one shared clock; representative rendered Japanese
frames prove font/layout feasibility and preserved English behavior.

Behavior: Extend the existing film with paired caption/screen wording and a
language selector at the shared full-film boundary. Translate the entire
viewer text, keeping original English defaults. Reuse paintings, timing,
music and individual scene JSX; explicitly register the Japanese composition.
Provide matching SRT export and a Japanese render route alongside English.
Prove all affected consumers, and return only concrete visual/language polish
that slice2 must resolve.

Accepted proof: `film.spec.tsx` invokes the real subtitle wrapper and observes
all19 source/delivery captions against mounted captions at start/midpoint/end
minus one frame. Its `all` case overwrites four source/delivery files with
sentinels, verifies complete English/Japanese outputs immediately, and restores
prior bytes. All four shared exporter callers preserve English defaults.
`languageEditions.spec.tsx` selects components collected from the real Root:
the shared scene code runs through mocked Remotion transport, observing both
languages' labels, generic screens, credits, retained media and identical
sequence/component identity. Combined focused TPS/Root proof passed41/41;
the AI consumer's4 tests also passed. Final type check and actual composition
enumeration exited0; both films are2580/30fps/1080square. Root inspected actual
Japanese stills202/600/1080/1905 and IAB opening/house/loom; glyphs and fit work.
The lower Japanese rule label at36px clears its arrow; English stays42px.
Accepted English script equals6adf028 after excluding only the19 translations.
Independent language review found no corrections. Fresh refactoring removed
unused metadata/exports and strengthened fresh-output proof; selective ESLint
passed16 owned TS/TSX paths after mechanical media-mock repair, followed by
30/30 registered-consumer proof. Viewer output proof remains unchanged.
Slice2 must enlarge the tiny Japanese radical annotation for phone viewing.

### 2. Terry receives polished Japanese and English delivery files
Type: Behavior
Status: planned
Proof: Japanese full muted360pixel playback, every caption/label frame review,
English comparison, fresh complete exports/decode/metadata, matching SRTs and
hash-verified stable delivery copies.

Behavior: Correct observed Japanese wording, line breaks, spacing, fonts or
masking in the shared design. Preserve the approved English presentation.
Produce both MP4s, matching SRTs and frame0 posters. Update the existing brief
with maintained bilingual authoring/reproduction facts. Copy final verified
files into default `terry-moves/out/` without changing unrelated local files.

## Concern review

No slice-plan refinement is needed: two cohesive visual proof loops cover one
bilingual film outcome. No unresolved source/architecture decision remains.
The early actual-font/layout probe owns the only unobserved rendering premise;
failed glyphs or unreadable Japanese stop dependent renders for correction.
Local installation, render and mobile inspection need no external service.
Hosted CI currently has no workflow/adapter/live observer; retain that limitation
truthfully, without manufacturing green or shutdown receipts.
