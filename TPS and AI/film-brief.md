# Freedom and Trust — English film

A square film from Terry Yin's bilingual *TPS and AI* talk. The question is
whether AI-assisted work leaves a team more free to meet the next real need.
Faster generation establishes the stakes; **Freedom and Trust** is the argument.
The product carries what people have learned, while people keep the ability,
authority, time, and support to understand the unfamiliar.

[film-script.json](film-script.json) owns the scene and caption clock. The film
is **94 seconds at 30 fps**, including the three-second title/credit hold.
Its 170 English caption words appear as embedded subtitles and matching
SRT text. A caption's optional `lineBreakAfter` counts the words before its
authored display break; the wording and interval stay the same in the SRT.
There is no narration. The original instrumental bed supports the pictures;
all essential meaning remains complete with sound off.

The original instrumental score is retained as
`terry-moves/public/assets/tps-and-ai/score.wav`. Its deterministic source is
`terry-moves/scripts/tps-and-ai-score.mjs`: authored sparse oscillator notes and
open-fifth pads follow the film's scene clock, with a quiet pause at the stop and
an open final harmony. It contains no sampled recordings or external music.
Regenerate it with `node terry-moves/scripts/tps-and-ai-score.mjs`; it has no
dependencies beyond Node and the editable film script.

## The moving argument

| Time | What changes on screen | What the viewer should understand |
| --- | --- | --- |
| 0–9 | The open palm and crane emerge in ink. Sparse output marks accumulate, then hold under the question. | More generated software does not by itself demonstrate more freedom. |
| 9–21 | Outputs become a burden. A taut red thread leads toward the next need, while the team remains tethered to what it built. | Understanding and ownership can become the constraint; AI can amplify that loop. This is a possibility, not a verdict on all generated work. |
| 21–42 | A learned rule becomes a gate. An empty list fails; downstream work freezes. A human response repairs the cause before work resumes with the check retained. | Encode known judgment. An actual stop contains failure, and people investigate and improve the work. |
| 42–54 | The retained gate becomes the quiet unattended checks in the source illustration. Attention moves to the people exploring a new need. | The next person need not rediscover the rule. The team can act on the check; unfamiliar problems and customer value still require judgment. |
| 54–66 | One current customer problem crosses the working product. A concrete next-train result appears; fare and route outcomes remain unstarted. | Deliver a small useful outcome, rather than filling a warehouse with future work. |
| 66–78 | The completed train result stays. A stairs question redirects the red focus to a step-free route, ahead of fare checking. | Useful value can produce feedback and preserve the freedom to choose again. The next route is a problem to investigate, not a proven solution. |
| 78–84 | A customer uses the result while a developer listens. The thread becomes an open path. | Spend freed attention on learning together; entrust capable people with responsibility and support. |
| 84–94 | The path resolves into the aloft crane. Two closing sentences land separately, then a calm title/credit hold. | Build products that free people. Trust them with the next real problem. |

The thread is an authored graphic over the source art, not a claim that still
illustrations contain physical animation. Frame-driven reveals, a blocked and
resumed work path, persistent result cards, and visible reprioritization supply
the action. Camera movement only supports those changes. Do not reduce the film
to a succession of zoomed slides.

## Fidelity and sources

The [current deck and speaker notes](../slides/tps-and-ai/slides.md) are the
authority for the talk's argument. The [main theme](main-theme-and-stage-setting.md)
and [claims](README.md) explain its reasoning; their older slide counts and order
do not define this cut. Research claims remain Provisional. Each caption's
`sourceIds` points to the `sources` record in the editable script.

| Source ID | Claim boundary and exact source |
| --- | --- |
| `diagnostic` | Terry's opening and closing diagnostic and crane statement; [Claim 10](claims/10-freedom-and-trust-reinforce-through-jidoka.md) and [Claim 3](claims/03-jidoka-enables-jit-trusts-respect-grows.md). Freedom and Trust is Terry's synthesis, not a Toyota quotation or a demonstrated guarantee of AI use. |
| `judgment` | Deck **Judgment-intensive work** and **Jidoka preserves knowledge**; [Claim 00](claims/00-judgment-intensive-work.md) and [Claim 6](claims/06-jidoka-embeds-routine-judgment.md). The document/list/test example is conceptual software work. A known check preserves a learned rule; it does not diagnose every failure or prove customer value. |
| `amplifier` | Deck **AI speeds whichever loop you feed** and [Claim 22](claims/22-cld-shows-tps-reasoning-for-less-ai.md). [DORA's 2025 report summary](https://dora.dev/research/2025/dora-report/) supports the organizational amplifier framing. The opening says generation **can** outrun comprehension; the burden is a conditional consequence. No causal percentage, universal productivity gain, or empirical validation of Terry's loop is asserted. |
| `jidoka` | [Toyota's TPS account](https://global.toyota/en/company/vision-and-philosophy/production-system/) describes building human wisdom into equipment, detecting abnormalities, stopping, responding, improving, and removing continuous watching. The gate is Terry's software application, based on the deck and [Claim 19](claims/19-stop-and-fix.md). Its downstream path must actually stop; a red warning that work ignores is insufficient. |
| `pull` | Deck **Pull: smaller customer problems** and **Freedom to choose again**, plus [Claim 17](claims/17-jit-vertical-slicing-one-piece-flow.md) and [Claim 11](claims/11-physical-production-and-software-differences.md). The three friends and **22:45** are conceptual illustrations, not real travel information or Toyota history. Toyota's JIT account defines what, when, and how much is needed. Entrusting software teams and changing the next unstarted story are Terry's interpretation. Useful delivery enables feedback; it does not guarantee a feature hypothesis is correct. |
| `people` | Deck **Respect for People**, closing diagnostic, and closing notes; [Claim 12](claims/12-respect-for-people-who-can-think.md) and [Claim 3](claims/03-jidoka-enables-jit-trusts-respect-grows.md). Responsibility includes time, support, and the authority to improve. Visible capability and reciprocal support warrant trust; freedom does not remove standards or accountability. |

The Toyota and DORA primary pages were checked on 8 October 2026.
The film introduces no additional historical fact or
quantitative claim. The artwork depicts metaphors and conceptual software use;
the film does not present them as documentary events at Toyota.

## Visual treatment and retained artwork

Keep the deck's warm paper **#ece6dc**, charcoal/black ink, gray **#5c564e**,
and restrained vermilion **#b33a2b**. Space and deliberate pauses matter as much
as the red focus. Retained assets live in
[`terry-moves/public/assets/tps-and-ai/`](../terry-moves/public/assets/tps-and-ai/).
They are byte-identical copies of the presentation's originals. The
[artwork inventory](../slides/tps-and-ai/artwork-list.md) retains their full
prompts, generation history, and intended meanings.

| Asset / inventory | Visual audit and square treatment |
| --- | --- |
| `cover-crane-released.png` / G1 | Off-white paper; large red-crowned crane and open palm on the right; empty left. No lettering. A fitted wide art window keeps wing, head, and palm. A center-cover square crop would lose the bookend relationship. |
| `constrained-by-what-they-built.png` / G3 | Crate stack, tethered people, distant red doorway. No lettering. Fit the complete landscape in the upper art area so stack and destination remain visible together. |
| `jidoka-frees-software-team.png` / G21 | Transparent surrounding ground; unattended healthy checks at left, three peers' faces/hands and prototype at right. No lettering. Keep the whole horizontal relationship; do not crop the quiet mechanism away. |
| `pull-customer-need.png` / G25 | Transparent ground; three friends, phone, train/fare/stairs pictograms. No lettering. Fit the group and thoughts together; add only essential editable English labels outside faces and hands. |
| `pull-customer-feedback.png` / G25 | Same three friends; train pictogram on phone, stairs/route thought at top. No lettering. Carry the result card through the transition and keep faces, phone, and next-need pictogram. |
| `takeaways-useful-software.png` / G29 | Transparent portrait; customer holds train phone while a peer listens. No lettering. Size to preserve both faces, hands, and phone rather than filling the square by cropping. |
| `closing-crane-aloft.png` / G14 | Same red-crowned crane aloft, tiny palm below; off-white paper and empty left. No lettering. Fit a wide window so both the flight and released hand survive. |

The seven chosen illustrations contain no Japanese, outlined glyphs, logos,
or other baked writing.
The source `jidoka-human-radical.svg`, slide screenshots, historical photographs,
and dense bilingual diagrams are omitted. The rule, stop path, outcomes, and
phone result are newly typeset in English. No new image generation is required.

The seven conceptual illustrations were created with AI for Terry's material;
G25 was regenerated on 4 October 2026 and G21/G29 on 6 October 2026 using the
cover's style. They are original presentation assets, rather than reused Toyota
graphics or third-party historical photography. End credit: **Terry Yin ·
AI-assisted illustrations**. Source attribution and full provenance remain here
so the phone edition need not carry unreadable URLs or exhaustive credits.

## Mobile edition and reproduction

Output is **1080 × 1080**, with the action above a protected caption area.
Main captions use **56 px** text and natural phrase breaks. Important diagram
and customer labels use **50–59 px** or larger. At 360 × 360 these become about
18.7 px and 17–20 px. The longest caption is 66 characters; the highest nominal
rate is 2.57 words/second. The quiet score retains its opening and closing fades
and the pause around the stop.

Run these commands from the repository root with Node **>=24.9.0** and pnpm
**11.28.5** on PATH. On this host, bundled Node 24.19.0 is available at
`/Users/terryyin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin`;
prefix a command with `PATH=/Users/terryyin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH`
when the shell's default Node is older.

```sh
pnpm --dir terry-moves exec remotion studio src/index.ts --no-open --port=3028
```

Open `http://localhost:3028/TPSAndAIFilm`. The individual shots also appear in
the **TPS-scenes** folder for focused editing.

```sh
pnpm --dir terry-moves render:tps-and-ai
```

This regenerates the original score and English subtitles, renders the complete
H.264/yuv420p/bt709 MP4 with four rendering workers, and exports the settled title
frame at 93 seconds as its poster. Delivery files are:

- `terry-moves/out/tps-and-ai.mp4`
- `terry-moves/out/tps-and-ai-en.srt`
- `terry-moves/out/tps-and-ai-poster.png`

For subtitle-only or score-only edits:

```sh
node scripts/tps-and-ai-subtitles.mjs
node terry-moves/scripts/tps-and-ai-score.mjs
```

The subtitle wrapper uses the existing shared exporter and writes
[film-en.srt](film-en.srt), then copies it to the delivery directory. Edit the
English source in `film-script.json` and regenerate the SRT before making the
separate Japanese translation. The source, composition, score generator and
retained artwork are checked in; rendered delivery files live in the ignored
`terry-moves/out/` directory. Rendering needs the locked workspace dependencies
and Remotion's installed Chrome runtime, but no network asset, voice provider,
or external music service.
