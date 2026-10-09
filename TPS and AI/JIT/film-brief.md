# Just in time

The English second part of TPS and AI follows the approved Jidoka film's warm
paper, dry typography, original talk artwork, quiet score and square format.
The cover leads with **Just in time**, supported by “Trust the team to meet
real needs, on time.” Its argument is Terry's: confidence in a team comes from
its ability to respond to real needs on time. More AI output alone does not earn that
trust. A useful small outcome pulls work; quality, feedback, continuous
integration and timely collaboration make trust dependable.

[film-script.json](film-script.json) owns **86 seconds at 30 fps, 1080 × 1080**,
the seven scenes, timed English captions, definition illustrations, viewer headings, focused panorama
views and final credit. There is no narration. Captions carry the complete
argument with sound off and occupy the approved y856–1010 area, using 56px text
and no more than two authored lines. `lineBreakAfter` counts words before a
display break without changing the standalone subtitle wording. The exact
**Idea and film from Terry** credit occupies the final three seconds, replacing
the captions.

## The moving argument

| Time | Picture and meaning |
| --- | --- |
| 0–10s | Just in time on the cover, with trust in the team's timely response to real needs beneath it. Full green-signal stockpile tower and person. More AI output alone does not earn that trust. |
| 10–15s | Shared TPS house, highlighting Just-in-Time as its other pillar. |
| 15–19s | Only what is needed. Complete original customer-orders illustration. |
| 19–23s | When needed. Complete original assembly-pulls-wheels illustration. |
| 23–27s | In the amount needed. Complete original wheel-replenishment illustration, with minimum stock and dependable flow. |
| 27–38s | Trust capable people. Whole resourceful-response painting. People meet the actual obstacle with available materials and a checked ramp. |
| 38–50s | Whole customer-need painting. A small useful customer outcome pulls the necessary work, including any AI assistance. |
| 50–62s | Make trust dependable. Whole feedback painting. Quality in the shared working product earns trust; feedback chooses the next response and later work remains unstarted. |
| 62–78s | Original integration panorama in five successive focused views: actual need, teams, stop, collaboration, coherent result. The heading is “Integrate continuously. Collaborate just in time.” |
| 78–86s | Trust the team. Hold the people collaborating and the complete resulting product. Build the capability to meet real needs on time; Terry's exact credit holds from 83 seconds as the score fades. |

## Sources and boundaries

The [Just-in-Time section of the talk](../../slides/tps-and-ai/slides.md), starting around
line 990, and claims
[3](../claims/03-jidoka-enables-jit-trusts-respect-grows.md),
[4](../claims/04-jit-assurance-resourcefulness-not-abundance.md),
[8](../claims/08-technical-excellence-enables-jit-coordination-in-less.md) and
[17](../claims/17-jit-vertical-slicing-one-piece-flow.md) own the argument.
Every caption's `sourceIds` resolves to a record in the JSON.

[Toyota's TPS explanation](https://global.toyota/en/company/vision-and-philosophy/production-system/)
supports the Just-in-Time definition and synchronized flow with minimum ready stocks.
Low inventory does not mean zero stock, eliminating support, or starting every
part from scratch only after an order. Toyota's operational account remains
distinct from Terry's software application.

“Just in time entrusts capable people” is Terry's interpretation. “Be resourceful with
what you have” is inspired by Kazumasa Ebata's oral teaching, as recorded in
[claim 14](../claims/14-ebata-jit-teaching-in-print.md); it is not an authenticated
Toyota or Ohno quotation. Resourcefulness still depends on competence, quality,
standards and support. The ramp picture is a teaching analogy.

[LeSS: Continuous Integration](https://less.works/less/technical-excellence/continuous-integration)
supports frequent small mainline changes and a working product. A green
automated build alone does not establish that practice. A concrete dependency
pulling collaboration is Terry's synthesis, grounded in claim 8. These primary
sources were checked during film preparation on 9 October 2026.

## Shared appearance and assets

The eight Just-in-Time paintings in the JSON's `artwork` records are byte-identical copies
from `slides/tps-and-ai/public/`, held in
[`terry-moves/public/assets/tps-and-ai/`](../../terry-moves/public/assets/tps-and-ai/).
The first seven are fitted whole. `house.definitionViews` owns the three
definition illustrations' timings, phrases and asset references. Their captions
state the definition without quantity arithmetic; the final illustration retains
visible ready stock. Focused integration views crop the unchanged
2022 × 778 panorama in source coordinates and preserve causal order. The first
view's authored clip excludes a stray neighboring figure while preserving the
complete customer and thought bubble. The final
view keeps all collaborating faces, hands and the completed lantern.

[`tpsAndAi/Frame.tsx`](../../terry-moves/src/tpsAndAi/Frame.tsx) supplies the
existing `Paper`, `Art`, `Heading`, shared `CaptionText`, palette and genuine Odd-e logo at x934/y40,
72 × 74 pixels. `HousePicture` accepts a JIT highlight while retaining Jidoka
as its default. The existing Jidoka language provider, script, editions, media
and routes remain their own source.

The approved `score.wav` is reused byte-for-byte at the existing volume 0.75.
It is the original sparse oscillator and open-fifth instrumental, already
authored for 86 seconds with a final three-second fade. The JIT export does not
regenerate it. No image, font, voice or audio service is needed during rendering.

## Reproduction and future language editions

Use the locked dependencies with Node >=24.9.0 and pnpm 11.28.5. From the
repository root:

```sh
pnpm --dir terry-moves exec remotion studio src/index.ts --no-open --port=3033
pnpm --dir terry-moves render:tps-and-ai:jit
```

On this host prefix commands with
`PATH=/Users/terryyin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH`.
Select **TPSAndAIJITFilm** in Studio at
`http://localhost:3033/TPSAndAIJITFilm`. Its independent scene previews appear
under **TPS-JIT-scenes**.

The dedicated render command exports the source SRT, copies it to delivery,
renders H.264/yuv420p/bt709 MP4 with the retained score, and renders frame zero
as the poster:

| Delivery | Stable path |
| --- | --- |
| MP4 | `terry-moves/out/tps-and-ai-jit.mp4` |
| Frame-zero poster | `terry-moves/out/tps-and-ai-jit-poster.png` |
| English SRT | `terry-moves/out/tps-and-ai-jit-en.srt` |

`node scripts/tps-and-ai-jit-subtitles.mjs` regenerates only
[film-en.srt](film-en.srt) and the JIT delivery SRT through the existing generic
exporter. Edit the JSON rather than either generated SRT.

Future translations belong beside the English `spoken` text in each caption's
`translations`, beside viewer headings in each scene's `translations`, and in
the closing scene's `creditTranslations`. Keep their intervals and source IDs
shared. A new language edition should reuse this action tree, scene clock,
paintings and score; add a thin language selection and validate its text shaping
and fit. Empty translation maps reserve that authoring location without adding
a localization framework or an unrequested translated export.

Source and media are tracked; production exports and temporary proof live in
ignored `terry-moves/out/`. Existing Jidoka delivery artifacts are preserved.
