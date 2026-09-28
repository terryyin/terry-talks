# Terry can deliver the talk reliably on conference day

Source: [story](../../../TPS%20and%20AI/seed.md#conference-ready).
Identity: `tps-and-ai-talk#conference-ready`

## Goal and scope

- **Goal:** Terry presents on 8 October 2026 at 15:45. The bilingual *Freedom
  and Entrustment* deck should fit the 45-minute talk, with the climax near
  the three-quarter mark. The notes should be glanceable spoken cues. The
  talk must run from his own Mac with the network off, with a PDF and a
  static-build backup.
- **Included:**
  - Spoken-cue notes with elapsed-time checkpoints.
  - One generated-art credit on the end slide, and a check of the
    third-party credits.
  - Offline presenting on the Mac, and a clear PDF fallback for the loom
    video.
  - PDF and static-build backups, with the commands to open them.
  - Applying Terry's rehearsal changes, within 35 slides.
- **Excluded:**
  - Recording, publishing online, and blog posts.
  - Japanese speaker notes and handouts.
  - A venue PC as a primary path, and per-slide time budgets.
  - The timing itself (Terry rehearses) and the USB copy (Terry does it).
- **Preserved:**
  - The Japanese story's result: every slide stays bilingual, and changed
    English gets matching Japanese plus an *Aki reviewed* reset.
  - The slide order, except where Terry directs a change.
  - At most 35 slides.
  - The existing `pnpm present`, `pnpm build`, and `pnpm export:pdf`
    commands.
- **Key examples:** see the story (1–6). Each maps to a slice under
  [proof ownership](#proof-ownership).

## Execution context and decisions

- **Start condition:** Start only after the Japanese
  story's slice 2 (the fully bilingual deck) is on `origin/master`. Both
  stories edit `slides/tps-and-ai/slides.md`, and the checkpoints and the
  rehearsal must sit on the bilingual deck. Slice 3 of the Japanese story
  (Aki's corrections) may land in parallel. If the two conflict, keep both
  changes: Aki's edits touch visible Japanese, and this plan touches notes.
- **Scope of the work:** deck content, one print-mode rule, and one short
  conference-day doc. No ADR applies: only ADR-0000 exists, and it is
  process. No North Star topic applies.
- **Plan location:** `.planning/quick/`. 010 was the highest number already
  allocated, so this plan is 011. Slice statuses are planned, in-progress,
  and done.
- **PFE (existing solutions):**
  - **Notes:** Slidev renders the `<!-- -->` notes blocks in presenter mode,
    so the rewrite needs no tooling.
  - **Fallback image:** The still `loom-jidoka-mechanism.png` already sits
    under the video on "Smart → dumb → gone". The fix is to keep the video
    out of the exported page (for example, a class hidden in Slidev's
    print/export mode), not to add new art.
  - **Static build:** It is served with the system `python3 -m http.server`
    from `dist/`. It cannot open from `file://` because asset paths are
    absolute (`/assets/…`). Add no dependency.
  - **PDF:** `pnpm export:pdf` already writes one page per slide to
    `~/Downloads`.
- **Checkpoints:** Three note lines use the form `⏱ ~MM:SS`, on the first
  line of the note:
  - ~15:00 on slide 10, the main-message quote that ends the opening act.
  - ~34:00 on slide 24, "AI speeds whichever loop you feed".
  - ~40:00 on slide 28, "Takeaways", which starts the closing.
  If slides move, each checkpoint stays on its slide. Its time changes only
  on Terry's instruction.
- **Cue form:** 2–5 short lines per note. Each doughnut example becomes one
  spoken sentence. No `Claim N`, no hashes, and no code identifiers. Terry's
  words stay in his voice: rewrite for brevity, not new content.
- **Conference-day doc:** `slides/tps-and-ai/conference-day.md`. It holds
  the steps to open presenter mode offline, the backup file locations, the
  commands to open the backups, and the checkpoint times. This is the one
  new file. Terry needs it on the day with the network off.
- **Slide-list helper and PNG export:** Use the same commands as the
  [deck checks](../../../slides/tps-and-ai/japanese-review.md#checking-the-deck).
  Use `--range N` to export single slides.

## Decisive premises observed (2026-09-28, at `949673a`)

| Premise | Observation | Result |
| --- | --- | --- |
| The deck is at its accepted state | Slide-list helper | `total 30 climax 24 ratio 0.80`. Holds |
| The build has no runtime network dependency | `pnpm exec slidev build slides/tps-and-ai/slides.md --out <tmp>/dist`, then grep `dist` for external hosts | Exit 0. `webfonts: []`, mermaid is bundled, and the only external URL is the jsdelivr favicon (cosmetic). Holds. The system font renders Japanese on macOS (japanese plan premise) |
| The static build serves locally with no install | `python3 -m http.server 8765` in `dist`; `curl` `/`, `assets/index-*.js`, `loom-warp-stop.mp4` | All three returned 200. Holds. `file://` is not viable (absolute `/assets/` paths) |
| `pnpm present` needs no network to start | `scripts/show.mjs` runs `pnpm exec slidev <entry> --open` locally | Holds by inspection. Terry's real Wi-Fi-off run is the evaluation (slice 3) |
| The PDF shows a usable loom fallback | PNG export of slide 16 (`--range 16`) | **False today.** The video area shows a washed-out frame over the still image, so slice 3 fixes it |
| Removing the hashes from the notes loses no evidence | Each of the 24 hashes in the notes was grepped in `TPS and AI/claims` | All 24 were found in claims. Holds. The story's move-to-claim assumption is not needed |
| The third-party images are already credited on-slide | Artwork list plus a grep of the slides | TPS house (Toyota/Cho, credited in the source line), Lean Thinking house (less.works CC), Type G loom (Wikimedia CC0), dropper (AllAboutLean CC BY-SA). All four are credited. Holds |
| The deck has no automated tests | `package.json` scripts | Proof is the build, the helper, the parser-based note checks, and PNG/PDF inspection |
| The Japanese deck is not yet on master | `010-japanese` worktree: slice 1 done, slices 2 and 3 planned | Hence the start condition above |

## Ordered slices

### 1. Terry glances at spoken cues with timing checkpoints
Type: Behavior
Status: planned

Behavior: Terry opens presenter mode. Every slide's note is 2–5 short spoken
cue lines, with no claim numbers, hashes, or code identifiers. Each doughnut
example is one spoken sentence (story example 1). Slides 10, 24, and 28
start with `⏱ ~15:00`, `⏱ ~34:00`, and `⏱ ~40:00` (story example 2).

Proof:
- A parser check over `slides.md` (the `@slidev/parser` `note` field) shows
  every note with 2–5 non-empty cue lines, not counting the checkpoint line.
  No note contains any of these:
  - a claim reference (`Claim` followed by a number);
  - a 10-hex-digit hash;
  - a backticked camelCase identifier.
- The three checkpoints are on slides 10, 24, and 28.
- The slide-list helper still shows 30 slides with the climax at 24.
- `slidev build` exits 0.
- The visible slides are unchanged: `git diff` touches only `<!-- -->`
  blocks.
- Terry reads the cues in presenter mode and confirms they are in his voice.

### 2. The end slide credits the generated illustrations
Type: Behavior
Status: planned

Behavior: The "Thank you" slide shows "Illustrations generated with AI by
Terry Yin", or Terry's rewording, with its Japanese line beneath in the
deck's `.ja` style. The slide is listed as not yet reviewed by Aki in
`japanese-review.md`. The four third-party credits stay on their slides
(story example 5).

Proof:
- PNG export of slide 30 shows the bilingual credit without overflow.
- PNG export of slide 16 still shows the CC BY-SA credit.
- `grep` finds the four third-party credit lines.
- `japanese-review.md` shows the "Thank you" row without *Aki reviewed*.
- `slidev build` exits 0.

### 3. The talk and its backups run with the network off
Type: Behavior
Status: planned

Behavior: The exported PDF has one page per slide, and "Smart → dumb →
gone" shows the still loom-mechanism image clearly with no video frame over
it (story example 4). Live presenting still plays the video. The static
build and the PDF are produced into a dated backup folder.
`conference-day.md` states:
- how to start presenter mode offline;
- how to serve the static build (`python3 -m http.server` in its folder);
- where the PDF is;
- the three checkpoint times.
Terry turns the network off on the Mac and runs `pnpm present`. The notes,
the Japanese, the mermaid climax diagram, and the looping video all appear.
Terry also opens both backups (story example 3).

Proof:
- `pnpm export:pdf` output has 30 pages, and its page 16 shows the clear
  still image.
- In live `slidev` (a PNG of the dev server with clicks advanced, or Terry's
  run), the video still plays.
- The static build served by `python3 -m http.server`, then a Chrome
  headless screenshot of the climax slide, shows the diagram rendered.
- The build grep still finds no external host besides the favicon.
- Terry's Wi-Fi-off run of `pnpm present` and of both backups is the
  story's evaluation. This slice records his confirmation.

**External-wait exception:** Terry's offline run is a human observation on
his machine.

### 4. Terry's rehearsal changes are applied and the backups refreshed
Type: Behavior
Status: planned

Behavior: Terry reports his timed rehearsal: the times at the three
checkpoints and the slides to change. Each change is applied:
- Overruns are cut in the seed's
  [scope-reduction order](../../../TPS%20and%20AI/seed.md#ordering-and-scope-reduction),
  once Terry has settled the stale items 2–3 (the story's open question).
  Until then, only items 1 and 4 apply, and anything further waits for Terry.
- Protected beats are cut only if Terry says so.
- Changed English gets matching Japanese, and that slide's *Aki reviewed* is
  cleared (story example 6).
- The checkpoints stay on their slides (story example 2).
Once the changes are in, the slice 3 backups are regenerated.

Proof:
- Every change Terry reported maps to a diff hunk, or to a reason he agreed
  for declining it.
- The slide-list helper shows at most 35 slides, with the climax slide
  present.
- The note checks from slice 1 still pass.
- PNGs of the changed slides fit, and their Japanese is updated.
- The review record reflects the changed slides.
- The regenerated PDF page count matches the deck's slide count, and the
  backup folder date is updated.
- Terry's follow-up run hits the checkpoints within about a minute. This is
  the story's evaluation.

**External-wait exception:** This slice waits on Terry's rehearsal, which is
planned for 6–7 October. If he reports no changes, only the backups are
confirmed current, and the slice closes.

## Proof ownership

| Promise | Slice | Observation |
| --- | --- | --- |
| Notes are 2–5 spoken cues with no claim numbers or hashes, and each doughnut example is one sentence | 1 | Parser note check; Terry's read-through |
| Checkpoints at the opening-act end, the climax (~34:00), and the closing start, moving with their slides | 1, 4 | Parser check of slides 10, 24, and 28; re-check after changes |
| Rehearsal changes applied within 35 slides, cut order respected, protected beats kept unless Terry says | 4 | Change-to-hunk mapping; slide-list helper |
| Changed English gets Japanese and loses *Aki reviewed* | 2, 4 | PNGs; `japanese-review.md` |
| Runs offline via `pnpm present` on Terry's Mac | 3 | No external host in the build; Terry's Wi-Fi-off run |
| PDF: one page per slide with a clear loom fallback; static build opens offline | 3, 4 | PDF page count and page 16; served-build screenshot; Terry opens both |
| Third-party credits on-slide; generated-art credit on the end slide | 2 | PNGs of slides 16 and 30; grep |
| At most 35 slides (rejection) | 1–4 | Slide-list helper |
| Existing commands keep working | 1–4 | `slidev build` exit 0; `pnpm export:pdf` succeeds |

## Cumulative design and sizing

Each slice owns one independent result, and there is no shared model to
accumulate special cases:
- the notes, which touch only notes blocks;
- a single end-slide line;
- one print-mode rule plus the backup procedure;
- a feedback loop that is applied last.

Slice 3's print rule targets the one video on the deck. The rule is general
(hide the video when printing) rather than slide-specific.

No numeric slice limit is supplied:
- Slice 1 is the largest, 30 note rewrites under one parser check.
- Slices 3 and 4 depend on Terry's time on the Mac. Slice 4 also depends on
  how much the rehearsal changes, which the cut order bounds.

The stale cut-order items 2–3 are a human decision already recorded in the
story. Slice 4 proceeds with items 1 and 4 until Terry decides. No remaining
slice-design concerns.
