# Listen to your code

A 20-second, 1080 × 1080 film in English and Traditional Chinese for LinkedIn, based on Terry's original
Odd-e poster and his October 20, 2026 brief. The film asks how we can perceive
design friction when AI increasingly writes and reviews code, and what we might
learn from signals beyond code. It deliberately leaves both questions open.

[The research](research.md) connects Terry's current design principles with
eight primary sources on AI coding, review, verification and learning. The film
uses no adoption percentages: the evidence supports “AI writes. AI reviews.”
without establishing the share of all code worldwide that AI writes, or how
much code all developers read.

The attached colleague post is preserved as [source material](source-reference.png).
Its text is not the film script. Terry's present brief owns the direction.

## Preview and export

From the repository root:

```sh
pnpm moves
```

Select **ListenToCodeFilm** or **ListenToCodeFilmZhHant**. The six shared scenes are also independently registered
for editing. The film uses local Poppins and Noto Sans TC fonts and bundled illustration/audio;
playback requires no remote assets.

```sh
python3 scripts/listen-to-code-score.py
pnpm -C terry-moves exec remotion render src/index.ts ListenToCodeFilm out/listen-to-your-code.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2
pnpm -C terry-moves exec remotion still src/index.ts ListenToCodeFilm out/listen-to-your-code-cover.png --frame=0
```

The MP4 is 600 frames at 30 fps with stereo AAC audio and H.264 video. All
essential meaning is on screen so it works with sound muted.

## Traditional Chinese edition

The Chinese edition reuses the approved English edition's exact scenes, timing,
illustrations, music and question-mark animation. Its opening slogan is bilingual:
**Listen to your code / 聆聽你的程式碼**. Subsequent scene copy is Traditional Chinese;
Odd-e stays in Latin lettering. There is no narration or personal credit.

```sh
pnpm -C terry-moves exec remotion render src/index.ts ListenToCodeFilmZhHant out/listen-to-your-code-zh-hant.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2
pnpm -C terry-moves exec remotion still src/index.ts ListenToCodeFilmZhHant out/listen-to-your-code-zh-hant-cover.png --frame=0
```

| Scene | Traditional Chinese copy |
| --- | --- |
| Slogan | Listen to your code / 聆聽你的程式碼 |
| Product and code | 產品服務使用者。程式碼卻在掙扎。 |
| Listening | 我們聆聽程式碼，理解產品的設計。 |
| AI | AI 撰寫。AI 審查。 |
| Strain | 小改動，大阻力。也是改善設計的契機。 |
| First question | 如果我們讀的程式碼變少，現在，該如何聆聽？ |
| Second question | 除了程式碼，還能如何看出產品是否已準備好迎接改變？ |
| Ending | 這是個開放的問題。 |

The bundled Noto Sans TC font subset covers the edition's complete text and
punctuation. Its [license, upstream source and local reproduction notes](../terry-moves/public/assets/fonts/noto-sans-tc-listen/README.md)
are saved with the font. The complete public font was downloaded first and
subsetting was performed locally. Additional Chinese copy may require expanding
the subset's saved character list. English typography remains Poppins.

## Direction

The original headphone, open code book, cable and musical staves become a fresh
screen-print illustration. Forest green, lime, warm paper and charcoal retain
the poster's character. The code creature represents difficulty within the
internal solution. It does not disappear through a magical AI fix.

| Time | Movement |
| --- | --- |
| 0–2 seconds | The clean poster cover: listen to your code. |
| 2–7 seconds | The product serves a customer while the code creature strains inside; its rhythm reaches the listening developer. |
| 7–9.5 seconds | AI writes; AI reviews. The rhythm accelerates. |
| 9.5–12 seconds | “Small change. Big strain.” reuses the same code-creature artwork, linking the strain to a chance to improve the design. |
| 12–15 seconds | If we read less code, how do we hear it now? |
| 15–20 seconds | Beyond code, what reveals a product's readiness for change? |

“Ready for change” means a coherent solution to the current domain that leaves
future change affordable. It does not mean implementing speculative flexibility.
The research also keeps open whether an alternative information channel is
needed, and whether it could offer comparable insight.

## Artwork and sound

`terry-moves/public/assets/listen-to-code/listener.png` is an AI-generated,
transparent illustration developed from the supplied poster. Text, timing,
animated musical staves, code marks and the strain motif remain editable in
Remotion. An editable circle-and-text interpretation retains the Odd-e mark.
The opening keeps its large poster mark; all subsequent scenes carry a smaller
mark in the upper-right corner, with colors adapted to the paper and ink.
The closing musical line draws a distinct question mark with an open hook,
short upright stem and separate dot.

`terry-moves/public/assets/listen-to-code/inside-product.png` is the new
personified-code tableau, made with built-in image generation. Its
[saved prompt and direction](inside-product-artwork.md) describe the normally
served customer, the code creature braced inside its constraining structure,
and the rhythm that reaches a developer. The artwork carries the explanation;
restrained camera motion lets viewers read it. The caption is descriptive:
“The product serves. The code strains.” It neither diagnoses the exterior
service as good or bad nor depicts an automatic cure.

**Still listening** is an original procedural instrumental for this film, with
no sampled recording or narration. Its warm plucked motif becomes a mechanical
exchange, develops beating tones at the strain, then leaves space for the
questions. The ending remains suspended. The current score and motion share
cue times at 0, 2, 7, 9.5, 12 and 15 seconds. A gentle, slightly awkward rhythm
travels toward the listener during the new tableau before the machine exchange.

`scripts/listen-to-code-score.py` reproduces the exact 960,000-sample stereo
48 kHz WAV offline with NumPy, already used by this repository's audio tooling.
`score-v4.wav` and `score-v4.json` hold the current soundtrack and its seed,
cue points and sample levels; the earlier `score.wav` is retained. The current
master measured −14.40 LUFS integrated and −2 dBFS true peak with FFmpeg loudnorm,
before the film's 0.9 volume setting. There is no voiceover or personal name.

The deliverables are a local review draft. Nothing has been posted to LinkedIn.
