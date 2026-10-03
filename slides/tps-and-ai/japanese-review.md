# Japanese review — Freedom and Trust

Every slide of `slides.md` carries its audience-facing text in Japanese,
directly under the English, for the Japanese-speaking attendees at the
Tokyo LeSS Conference. Speaker notes, code blocks, source attributions,
and SVG `<title>`/`<desc>` accessibility text stay in English.

Slides are referenced by title only — never by page number — following
the convention in `artwork-list.md`.

## Markup

- Body line: `[日本語]{.ja}` on the line right after the English, inside
  the same paragraph or list item.
- Title line: `[日本語]{.ja-title}` as its own paragraph right after an
  h1/h2.
- Mermaid node: an extra `<br><small>日本語</small>` line in the label.
  Long Japanese breaks onto a second `<br>` line: Mermaid measures the
  node before the Japanese fallback font renders, so a line wider than
  the English gets clipped.
- Raw HTML (`<p>`, `<div>`): `<span class="ja">日本語</span>` inside the
  same element, with `<strong>` for bold.
- Inline SVG: an extra, smaller `<text class="ja">` line under each
  English label (on dark boxes: no class, the box's light ink at
  `opacity="0.8"`).
- Style: `themes/odd-e/style.css` (`.ja`, `.ja-title`, `svg text.ja`).

## Term glossary

TPS terms use Toyota's own Japanese wording.

| English | Japanese | Note |
| --- | --- | --- |
| Jidoka | 自働化 | 人 radical; never 自動化 |
| Just-in-Time | ジャスト・イン・タイム (JIT) | |
| Kaizen | 改善 | |
| Andon | アンドン | |
| Genchi genbutsu / Go-See | 現地現物 | First use: 現地現物 (Go-See) |
| Respect for People | 人間性尊重 | |
| Entrust / trust | 任せる / 信頼 | Trust people with work: 信頼して任せる |
| Preaching to the Buddha | 釈迦に説法 | Kept as is; not re-translated |

Deck terms, kept consistent across slides. The table gives the base
form; running sentences may inflect or shorten it to fit the grammar or
the slide (e.g. 解釈・順位づけ・決め直し on "Judgment-intensive work",
作ったものがチームを縛る on the "AI can produce plausible software…"
slide).

| English | Japanese |
| --- | --- |
| TPS (Toyota Production System) | TPS / トヨタ生産方式 |
| Freedom and trust | 自由と信頼 |
| AI-augmented development | AI拡張開発 |
| Judgment-intensive work | 判断集約型の仕事 |
| Live judgment | その場の判断 |
| Judgment-loaded output | 判断を抱えたアウトプット |
| Interpret, rank, and re-decide | 解釈し、優先順位をつけ、決め直す |
| Constrained / freed by what they built | 自ら作ったものに縛られる / 解放される |
| Stop & Fix | Stop & Fix（止めて直す） |
| AI speeds whichever loop you feed | AIは、あなたが回すほうのループを加速する |
| Product group | プロダクトグループ |
| Closed stop | 閉じた停止 |
| Encode (the known) | 仕組みに組み込む |
| Encoded jidoka | 組み込まれた自働化 |
| Smart → dumb → gone | 賢い → 単純 → 消える |
| Judgment-loaded / -preserved / -removed | 判断を抱える / 判断を保存 / 判断が不要 |
| Adaptive attention | 適応的な注意 |
| Warranted trust | 裏づけのある信頼 |
| Coercive control | 強制的な管理 |
| delay (loop-diagram edge) | 遅れて |
| Pull, don't stockpile | プルせよ、溜め込むな |
| Next bite | 次のひと口 |
| Stockpile / inventory | 在庫 |
| Technical excellence | 技術的卓越性 |
| Shared product | 共有プロダクト |
| Not overproducing | 作りすぎない |
| Making things means making people | モノづくりは人づくり |
| Five judgments stay human | 五つの判断は人間に残る |
| SMED | SMED（シングル段取り） |
| Definition of Done | 完成の定義（Definition of Done） |

## Keeping the deck bilingual

- A slide whose English changes gets its Japanese updated in the same
  change, and its *Aki reviewed* cell is cleared until Aki reviews it again.
- Each English element gets one short Japanese line. When a slide is
  cramped, shorten the Japanese before shrinking the type or moving art.
- Mermaid sizes nodes before the Japanese fallback font renders, so keep
  each Japanese node line no wider than the node's longest English line and
  split it with `<br>` if needed.
- Never put Japanese inside a `#` heading line: the Slidev title must stay
  English (the helper below finds the climax by its title).

## Checking the deck

Run from the repository root. The slide-list helper prints each slide's
title, the total, and the climax position:

```sh
node --input-type=module -e "
const fs=await import('fs');const p=fs.readdirSync('node_modules/.pnpm').find(d=>d.startsWith('@slidev+parser@'));
const {parse}=await import(process.cwd()+'/node_modules/.pnpm/'+p+'/node_modules/@slidev/parser/dist/index.mjs');
const d=await parse(fs.readFileSync('slides/tps-and-ai/slides.md','utf8'),'slides.md');
d.slides.forEach((s,i)=>console.log(i+1,s.title||'('+(s.frontmatter?.layout||'untitled')+')'));
const n=d.slides.length,c=d.slides.findIndex(s=>/^AI speeds whichever loop you feed\$/.test(s.title||''))+1;
console.log('total',n,'climax',c,'ratio',(c/n).toFixed(2));"
```

Export PNGs to inspect fit (every slide: Japanese under each English
element, no clipping, no overlap with images, nothing off the bottom).
`--with-clicks` adds v-click states. Export needs `playwright-chromium`
resolvable from `node_modules`; it is not in the lockfile.

```sh
pnpm exec slidev export slides/tps-and-ai/slides.md --format png \
  --output <tmp>/png --timeout 180000 --wait 1500 \
  --executable-path "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```

## Per-slide status

*Translated*: the Japanese is on the slide. *Terry checked*: Terry has
paged through it at projector size. *Aki reviewed*: Aki's corrections, if
any, are applied. A blank cell means not yet. Terry checked all 30 on 2026-09-28; Aki's
review is still to come, so the *Aki reviewed* column is blank.

| Slide | Translated | Terry checked | Aki reviewed |
| --- | --- | --- | --- |
| Freedom and Trust (cover) | ✓ | | |
| About Me | ✓ | ✓ | |
| 釈迦に説法 | ✓ | | |
| One lineage of inspiration | ✓ | ✓ | |
| How do you know if the organization is using AI right? | ✓ | ✓ | |
| Judgment-intensive work | ✓ | ✓ | |
| Constrained by what they built | ✓ | ✓ | |
| AI can produce plausible software faster than a product group can absorb it | ✓ | ✓ | |
| Freedom vs. trust? | ✓ | | |
| The main-message quote ("TPS shows how a system…") | ✓ | ✓ | |
| Two houses, different layers | ✓ | ✓ | |
| The triad | ✓ | ✓ | |
| Jidoka preserves knowledge | ✓ | ✓ | |
| The loom's closed stop | ✓ | ✓ | |
| The untitled image slide after "The loom's closed stop" | ✓ | ✓ | |
| Smart → dumb → gone | ✓ | ✓ | |
| Stop & Fix is emergent judgment-intensive work | ✓ | ✓ | |
| The gates do not care who authored the change | ✓ | ✓ | |
| Go-See may mean entering the AI harness | ✓ | ✓ | |
| Five judgments stay human | ✓ | ✓ | |
| Pull, don't stockpile | ✓ | ✓ | |
| Let the shared product pull collaboration | ✓ | ✓ | |
| The engine of freedom and trust | ✓ | | |
| AI speeds whichever loop you feed | ✓ | ✓ | |
| Respect for People: making things means making people | ✓ | ✓ | |
| Continuous improvement towards perfection | ✓ | ✓ | |
| Tensions and honest limits | ✓ | ✓ | |
| Takeaways | ✓ | ✓ | |
| The closing quote ("Encode the known…") | ✓ | ✓ | |
| Thank you | ✓ | ✓ | |
