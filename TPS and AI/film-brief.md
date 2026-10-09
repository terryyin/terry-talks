# Jidoka: Free to Move On — English, Japanese, Traditional Chinese and Thai films

Four concise square editions about Jidoka for AI-augmented software development.
The diagnostic is Terry’s: teams should be more freed than constrained by what
they’ve built. The film explains how discovered judgment can live in simple
mechanisms that stop known failures, preserve usable evidence, and release
attention for the next needed problem.

[film-script.json](film-script.json) owns the single scene and caption clock:
**86 seconds at 30 fps, 1080 × 1080**, including a three-second ending hold.
Its **133 English caption words in 19 timed ranges** and their Japanese,
Traditional Chinese and Thai translations carry the complete argument with sound off.
There is no narration. Each caption keeps English in `spoken`, Japanese in
`translations.ja`, Traditional Chinese in `translations['zh-Hant']` and Thai in
`translations.th`, beside
the same `start`, `end` and `sourceIds`. English `lineBreakAfter` counts words
before an authored display break; the translated editions use
authored newline breaks. All four SRTs retain their wording and the same intervals.

The editions share one scene tree, choreography, paintings, loom clip and music.
[`language.tsx`](../terry-moves/src/tpsAndAi/language.tsx) keeps adjacent screen
wording in a private catalog and selects it through the language hooks and
provider used by those shared scene components. Maintain all four languages
together when wording changes. All translated editions localize headings,
house and stop labels, evidence, the radical annotation and credits; useful
**AI/TPS** acronyms and the **Odd-e/Terry** names remain. The Chinese edition
retains the original **自働化** spelling and calls TPS **豐田生產方式**.

## Moving argument

| Time | Picture and action | Meaning |
| --- | --- | --- |
| 0–9s | Complete Jidoka title, called-by-stop painting, generic stop display, question and genuine Odd-e logo are already composed at frame zero. The answer follows on the same artwork. | Judge AI use by the freedom created for its teams. |
| 9–19s | The complete burden painting retains its stack, tethered people and distant doorway. | Yesterday’s software can block today’s higher-value work. |
| 19–27s | The deck TPS house is reconstructed in the selected language and highlights the Jidoka pillar. | Toyota Production System has two pillars; this film explains Jidoka. |
| 27–39s | The local schematic plays once: thread breaks, dropper falls, detection bar is blocked and drive stops. A fully visible stopped pose is held from source time 9s. The outlined kanji sits beneath the loom, with only the person radical red. | Human wisdom is built into the mechanism; the known abnormality causes a stop. |
| 39–51s | Full watching and called-by-stop paintings share one geometry and dissolve over 0.6s. Generic localized checking and stop displays cover only their embedded screen planes. | People can be called by a stop instead of continuously watching the loom or their computer work. |
| 51–66s | Localized solve, preserve and protect labels accumulate. Known rules meet a closed stop path; simple checks and clear evidence remain. | Solve unfamiliar problems, preserve the learned judgment and stop known conditions. Leave information the next person or AI can use. |
| 66–75s | Redundant outlines disappear while the necessary-behavior box and self-protection remain. | Keep as little as possible. Removing unnecessary structure preserves needed behavior. |
| 75–83s | The fitted team painting keeps unattended checks at left, all people’s faces/hands and their prototype at right. | Build knowledge into the product and be free to move to the next needed problem. |
| 83–86s | The freedom painting and title settle with the selected edition's Terry credit. | Exact credit holds while the score fades. |

## Fidelity and sources

The [current deck and notes](../slides/tps-and-ai/slides.md) own Terry’s argument;
[the artwork inventory](../slides/tps-and-ai/artwork-list.md) owns the retained
illustrations’ prompts and provenance. Caption `sourceIds` resolve to the
script’s source records.

| Source | Exact home and boundary |
| --- | --- |
| `diagnostic` | Deck slides 5–6: AI-use diagnostic and constrained-by-output painting. This is Terry’s synthesis, not an empirical guarantee of AI productivity. |
| `house` | Deck slide 11, **Two houses, different layers**. The TPS house is the deck’s original reconstruction of the commonly taught house, not an official Toyota graphic. Only its Jidoka pillar is highlighted in this film. |
| `jidoka` | Deck slides 14–17: loom’s closed stop, watching and called. [Toyota TPS](https://global.toyota/en/company/vision-and-philosophy/production-system/) describes Jidoka and Just-in-Time, building human wisdom into machines, detection/stopping and reduced continuous watching. [Toyota plant tour](https://global.toyota/en/company/plant-tours/production-system/) describes stopping, notifying and human response. [Toyota’s historical account](https://www.toyota-global.com/company/history_of_toyota/75years/text/taking_on_the_automotive_business/chapter1/section1/item4.html) supports warp/weft stops and freedom from watching. These primary sources were checked on 9 October 2026. No origin date is asserted. |
| `judgment` | Deck slides 13, 16 and 19: preserved knowledge, closed mechanical decision and software stops. The software application is Terry’s synthesis. A simple check enforces a **known condition**; it neither diagnoses nor repairs the problem, and does not guarantee all software quality. People still investigate and improve the work. |
| `minimalism` | Deck slide 18, **Smart → Dumb → Gone**. The software principle is Terry’s synthesis: remove unnecessary parts while retaining the product’s needed behavior and essential safeguards. |
| `freedom` | Deck slide 20, **Jidoka frees people**. Knowledge lives in the product so developers can take the next valuable problem. This preserves responsible ability to move on, without inventing an exact closing slogan. |

The loom is a schematic teaching cutaway; its linkage is not a reconstruction
of a historical Type G. Its stop executes a prior judgment: a thread break is
abnormal and must stop weaving. The break remains visible after the stop.
The kanji is the deck’s outlined SVG: **亻** (ninben, person) alone is vermilion.
The radical signifies embedded human wisdom rather than continuous supervision.

## Artwork, brand and music

Retain warm paper **#ece6dc**, charcoal **#262420**, gray **#5c564e** and restrained
vermilion **#b33a2b**. Local media lives in
[`terry-moves/public/assets/tps-and-ai/`](../terry-moves/public/assets/tps-and-ai/).
Copies are byte-identical to the deck originals, with the logo copied from
[`themes/odd-e/images/odd-e-logo.png`](../themes/odd-e/images/odd-e-logo.png).
The complete mark stays at x934/y40, 72 × 74 pixels, above every shot.

- `constrained-by-what-they-built.png`: full stack, tethered people and doorway;
  no square crop or invented trail across people.
- `watching-the-loom-watching-the-ai.png` and `called-by-the-stop.png`: retain
  both upper loom and lower developer relationships. Their embedded Claude Code
  terminal writing is covered with generic **CHECKING**, **確認中** or **檢查中**
  and **STOP** or **停止** vector screen-plane overlays. The paintings themselves
  are unchanged.
- `loom-warp-stop.mp4`: existing 11-second silent local animation. Play from
  its beginning and freeze the fully visible stopped pose at 9 seconds before
  its existing 9.5–10.1-second ending fade. It never loops or restarts.
- `jidoka-human-radical.svg`: byte-identical outlined kanji and English ninben
  label. Both translated editions overlay the annotation area, masking the small
  English label and connector and showing **にんべん＝人** in Japanese or
  **人字旁＝人** in Chinese at 33px in the 1080px frame. The glyph outlines and
  red radical stay unchanged.
- `jidoka-frees-software-team.png`: keep unattended checks, faces, hands and
  prototype together.
- `odd-e-logo.png`: genuine complete 165 × 169 RGBA theme logo.

The paintings are Terry’s original AI-assisted presentation artwork, rather
than Toyota documentary images. Full provenance remains in the source
inventory. The exact English terminal credit remains **Idea and film from Terry**;
the Japanese credit is **発案・映像制作：Terry** and the Chinese credit is
**發想與影片製作：Terry**.

The quiet original instrumental score is retained as `score.wav`. Its source,
`terry-moves/scripts/tps-and-ai-score.mjs`, synthesizes sparse damped oscillator
plucks and open-fifth pads against the same scene clock. It uses no external
recording, sample or music service. The loom stop has a short reduction with
smooth gain edges; the ending fades for three seconds.

## Reproduction and shared authoring

Use Node **>=24.9.0** and pnpm **11.28.5** with the locked workspace dependencies.
On this host prefix node/pnpm commands with
`PATH=/Users/terryyin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH`
for bundled Node 24.19.0. From the repository root:

```sh
pnpm --dir terry-moves exec remotion studio src/index.ts --no-open --port=3028
pnpm --dir terry-moves render:tps-and-ai
pnpm --dir terry-moves render:tps-and-ai:ja
pnpm --dir terry-moves render:tps-and-ai:zh-hant
```

Select **TPSAndAIFilm** for English, **TPSAndAIFilmJa** for Japanese or
**TPSAndAIFilmZhHant** for Traditional Chinese in Studio
(`http://localhost:3028/TPSAndAIFilm` or
`http://localhost:3028/TPSAndAIFilmJa` or
`http://localhost:3028/TPSAndAIFilmZhHant`). All four registrations use the shared
full film; thin wrappers select the translated editions' language. The nine
independent scene compositions remain registered in **TPS-scenes** and default
to English.

Each render command regenerates the shared score and its language's SRT,
exports H.264/yuv420p/bt709 MP4 with AAC audio and four rendering workers, then
renders **frame 0** as the poster. Stable delivery filenames are:

| File | English | Japanese | Traditional Chinese |
| --- | --- | --- | --- |
| MP4 | `terry-moves/out/tps-and-ai-jidoka.mp4` | `terry-moves/out/tps-and-ai-jidoka-ja.mp4` | `terry-moves/out/tps-and-ai-jidoka-zh-hant.mp4` |
| Frame 0 poster | `terry-moves/out/tps-and-ai-jidoka-poster.png` | `terry-moves/out/tps-and-ai-jidoka-ja-poster.png` | `terry-moves/out/tps-and-ai-jidoka-zh-hant-poster.png` |
| SRT | `terry-moves/out/tps-and-ai-jidoka-en.srt` | `terry-moves/out/tps-and-ai-jidoka-ja.srt` | `terry-moves/out/tps-and-ai-jidoka-zh-hant.srt` |

For source-only regeneration:

```sh
node scripts/tps-and-ai-subtitles.mjs
node scripts/tps-and-ai-subtitles.mjs ja
node scripts/tps-and-ai-subtitles.mjs zh-Hant
node scripts/tps-and-ai-subtitles.mjs all
node terry-moves/scripts/tps-and-ai-score.mjs
```

The subtitle wrapper accepts `en` (the default), `ja`, `zh-Hant`, `th` or `all`. It reuses
`scripts/film-subtitles.mjs`, writes [film-en.srt](film-en.srt) and/or
[film-ja.srt](film-ja.srt) and/or [film-zh-hant.srt](film-zh-hant.srt) from the
shared canonical JSON, and copies each file to its corresponding delivery SRT
above. Maintain caption wording in the JSON;
regenerate the SRTs after edits. `all` exports all four editions.

Captions use the same protected y856–1010 area and no more than two authored
lines: English retains 56px text and its word-count display breaks; Japanese
and Chinese use 48px text, authored newlines and zero letter spacing. Translated
headings have a 74px cap. Japanese uses Hiragino Kaku Gothic ProN for sans text
and Hiragino Mincho ProN for headings; Chinese uses Heiti TC for sans text and
Songti TC for headings. The locale's sans/serif pair is selected centrally by
`useLocalizedFilmFonts`. The exact fallback families in `language.tsx` are:

| Edition | Sans | Serif |
| --- | --- | --- |
| Japanese | `'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Noto Sans JP', Meiryo, sans-serif` | `'Hiragino Mincho ProN', 'Yu Mincho', serif` |
| Traditional Chinese | `'Heiti TC', 'PingFang TC', 'Noto Sans TC', sans-serif` | `'Songti TC', 'Noto Serif TC', serif` |

The current macOS rendering host supplies Hiragino, Heiti TC and Songti TC.
On a different host, provide these families or validate the listed fallbacks
through an actual render before export. The original glyph artwork and localized
33px annotation remain shared.
All other required explanation is also retained visibly without sound.
Rendered files live in ignored `out/`; source inputs, retained media and
deterministic score are checked in. These films need no network asset or voice
service at render time.

## Thai edition

Thai captions are adjacent to the other translations in `translations.th`;
Thai screen labels share the same `language.tsx` catalog. Select
`TPSAndAIFilmTh` in Studio or run `pnpm --dir terry-moves render:tps-and-ai:th`.
The export writes `terry-moves/out/tps-and-ai-jidoka-th.mp4`,
`tps-and-ai-jidoka-th-poster.png` and `tps-and-ai-jidoka-th.srt`; the checked-in
subtitle is [film-th.srt](film-th.srt). `node scripts/tps-and-ai-subtitles.mjs th`
regenerates only Thai subtitles; `all` includes all four languages.

Thai uses the rendering host's Thonburi body font and Sathu headings, with
Noto Sans/Serif Thai fallbacks. Captions retain 48px text and two authored lines;
1.35 line height gives Thai vowel and tone marks room. Jidoka, TPS, AI,
Just-in-Time and Terry remain useful original terms. Scenes, timing, imagery,
score and the original 自働化 glyph artwork stay shared with the other editions.
