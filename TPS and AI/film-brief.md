# Jidoka: Free to Move On — English film

A concise square film about Jidoka for AI-augmented software development.
The diagnostic is Terry’s: teams should be more freed than constrained by what
they’ve built. The film explains how discovered judgment can live in simple
mechanisms that stop known failures, preserve usable evidence, and release
attention for the next needed problem.

[film-script.json](film-script.json) owns the scene and caption clock:
**86 seconds at 30 fps, 1080 × 1080**, including a three-second ending hold.
Its **133 English caption words in 19 timed ranges** carry the complete argument
with sound off. There is no narration. Optional `lineBreakAfter` counts the
words before an authored display break; the SRT retains the same wording and
interval. Japanese appears only in the explicitly requested outlined **自働化**
graphic; its explanation remains English.

## Moving argument

| Time | Picture and action | Meaning |
| --- | --- | --- |
| 0–9s | Complete Jidoka title, called-by-stop painting, generic stop display, question and genuine Odd-e logo are already composed at frame zero. The answer follows on the same artwork. | Judge AI use by the freedom created for its teams. |
| 9–19s | The complete burden painting retains its stack, tethered people and distant doorway. | Yesterday’s software can block today’s higher-value work. |
| 19–27s | An English reconstruction of the deck TPS house highlights the Jidoka pillar. | Toyota Production System has two pillars; this film explains Jidoka. |
| 27–39s | The local schematic plays once: thread breaks, dropper falls, detection bar is blocked and drive stops. A fully visible stopped pose is held from source time 9s. The outlined kanji sits beneath the loom, with only the person radical red. | Human wisdom is built into the mechanism; the known abnormality causes a stop. |
| 39–51s | Full watching and called-by-stop paintings share one geometry and dissolve over 0.6s. Generic CHECKING and STOP displays cover only their embedded screen planes. | People can be called by a stop instead of continuously watching the loom or their computer work. |
| 51–66s | Solve, Preserve and Protect accumulate. Known rules meet a closed STOP path; simple checks and clear evidence remain. | Solve unfamiliar problems, preserve the learned judgment and stop known conditions. Leave information the next person or AI can use. |
| 66–75s | Redundant outlines disappear while the necessary-behavior box and self-protection remain. | Keep as little as possible. Removing unnecessary structure preserves needed behavior. |
| 75–83s | The fitted team painting keeps unattended checks at left, all people’s faces/hands and their prototype at right. | Build knowledge into the product and be free to move to the next needed problem. |
| 83–86s | The freedom painting and title settle with **Idea and film from Terry**. | Exact credit holds while the score fades. |

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
  terminal writing is covered with generic CHECKING and STOP vector screen-plane
  overlays. The paintings themselves are unchanged.
- `loom-warp-stop.mp4`: existing 11-second silent local animation. Play from
  its beginning and freeze the fully visible stopped pose at 9 seconds before
  its existing 9.5–10.1-second ending fade. It never loops or restarts.
- `jidoka-human-radical.svg`: unchanged outlined kanji and English ninben label.
- `jidoka-frees-software-team.png`: keep unattended checks, faces, hands and
  prototype together.
- `odd-e-logo.png`: genuine complete 165 × 169 RGBA theme logo.

The paintings are Terry’s original AI-assisted presentation artwork, rather
than Toyota documentary images. Full provenance remains in the source
inventory. The exact terminal credit is **Idea and film from Terry**.

The quiet original instrumental score is retained as `score.wav`. Its source,
`terry-moves/scripts/tps-and-ai-score.mjs`, synthesizes sparse damped oscillator
plucks and open-fifth pads against the same scene clock. It uses no external
recording, sample or music service. The loom stop has a short reduction with
smooth gain edges; the ending fades for three seconds.

## Reproduction and translation inputs

Use Node **>=24.9.0** and pnpm **11.28.5** with the locked workspace dependencies.
On this host prefix node/pnpm commands with
`PATH=/Users/terryyin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH`
for bundled Node 24.19.0. From the repository root:

```sh
pnpm --dir terry-moves exec remotion studio src/index.ts --no-open --port=3028
pnpm --dir terry-moves render:tps-and-ai
```

Open `http://localhost:3028/TPSAndAIFilm`; the nine independent scene compositions
are registered in **TPS-scenes**. The render command regenerates score and SRT,
exports H.264/yuv420p/bt709 MP4 with AAC audio and four rendering workers, then
renders **frame 0** as the poster. Stable delivery filenames are:

- `terry-moves/out/tps-and-ai-jidoka.mp4`
- `terry-moves/out/tps-and-ai-jidoka-poster.png`
- `terry-moves/out/tps-and-ai-jidoka-en.srt`

For source-only regeneration:

```sh
node scripts/tps-and-ai-subtitles.mjs
node terry-moves/scripts/tps-and-ai-score.mjs
```

The subtitle wrapper reuses `scripts/film-subtitles.mjs`, writes
[film-en.srt](film-en.srt) and copies that same file to the distinct Jidoka
output filename. The English JSON/SRT are translation inputs; translate their
wording without creating another clock. Captions use a protected y856–1010 area,
56px text and no more than two authored lines. All other required explanation
is also retained visibly without sound. Rendered files live in ignored `out/`;
source inputs, retained media and deterministic score are checked in. This film
needs no network asset or voice service at render time.
