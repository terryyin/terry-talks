# The audience follows one arc to a climax in at most 35 slides

Source: [refined story](../../../TPS%20and%20AI/seed.md#storyline).
Identity: `tps-and-ai-talk#storyline`

## Goal and scope

The English [deck](../../../slides/tps-and-ai/slides.md) tells one arc:
- a casual opening with the key message by about slide 5;
- jidoka, then JIT flow, building to the climax **"AI speeds whichever loop
  you feed"** at about 75% of the deck;
- a wind-down to the takeaways, the closing crane, and the end slide.

It has about 33 rendered slides, never more than 35, for a 45-minute talk.

- **Included:**
  - The cover subtitle becomes the listed session title.
  - The slides are reordered around the climax.
  - Slides that repeat a beat are cut or merged.
  - Slide text and speaker notes are aligned with the README talk roles.
  - The Go-See harness slide is restored as a secondary beat.
  - Terry walks through the result in presenter mode.
- **Excluded** (per the seed):
  - Japanese text.
  - Rehearsed timing, reducing notes to spoken text, and PDF or offline
    backups.
  - New research and new artwork. The restored harness image is existing art.
  - Other content that `a2cb854` removed.
- **Assumptions:**
  - Terry is available for the walkthrough by about 2 October.
  - If meeting the ceiling would drop a beat Terry considers core, execution
    stops and asks rather than cutting it. The seed's shortening order is the
    default: the switching-cost follow-on, Preferred tests, section dividers,
    then one tension.

## Execution context and decisions

- This is deck content only (Slidev markdown). The proofs are the rendered
  slide list, a build, and Terry's walkthrough.
- [ADR-0000](../../../docs/adrs/0000-use-adrs-accepted.md) keeps durable
  decisions with Terry. No architectural choice or North Star topic is
  involved. PFE does not apply, because no product responsibility moves.
- **Plan location:** The plan root is `.planning/quick/`. 007 was the highest
  number allocated, so this plan is 008. Slice statuses are planned,
  in-progress, and done. No numeric slice target or hard limit was supplied,
  so each slice has one proof loop.
- **Climax:** The climax is the slide titled "AI speeds whichever loop you
  feed" (Terry, 2026-09-28). Its position is its 1-based index divided by the
  rendered total, and the target band is 0.70–0.80. "The engine of freedom
  and entrustment" may sit directly before it.
- **Talk roles** follow the [README](../../../TPS%20and%20AI/README.md):
  - **Off-stage:** Claims 13 and 15 appear on no slide and in no note
    citation. Doughnut examples are cited by the claim they illustrate.
  - **Supporting:** Claims 2, 7, 9, 11, 14, and 16 appear only qualified or
    secondary.
- **Go-See beat:** The slide "Go-See may mean entering the AI harness" and
  `public/entering-ai-harness.png` are restored from `a2cb854^`. The slide's
  text already tells the mechanism re-verified on 2026-09-28 (see the
  [seed](../../../TPS%20and%20AI/seed.md#storyline) assumptions). It sits in
  the same-gates cluster, before the climax, as Claim 16's secondary beat.
- **Dependencies:** The worktree has no `node_modules`. Run the proof
  commands in a checkout where `pnpm install` has run, such as the main
  checkout.
- **Slide-list helper (proof):** Run from the repository root. It prints the
  total, the climax index, and the ratio:

  ```sh
  node --input-type=module -e "
  const fs=await import('fs');const p=fs.readdirSync('node_modules/.pnpm').find(d=>d.startsWith('@slidev+parser@'));
  const {parse}=await import(process.cwd()+'/node_modules/.pnpm/'+p+'/node_modules/@slidev/parser/dist/index.mjs');
  const d=await parse(fs.readFileSync('slides/tps-and-ai/slides.md','utf8'),'slides.md');
  d.slides.forEach((s,i)=>console.log(i+1,s.title||'('+(s.frontmatter?.layout||'untitled')+')'));
  const n=d.slides.length,c=d.slides.findIndex(s=>/^AI speeds whichever loop you feed\$/.test(s.title||''))+1;
  console.log('total',n,'climax',c,'ratio',(c/n).toFixed(2));"
  ```

- **Build (proof):**
  `pnpm exec slidev build slides/tps-and-ai/slides.md --out "$CLAUDE_JOB_DIR/tmp/dist"`
  (or any temporary `--out` directory) must exit 0.
- **Delivery:** Commits go to the story branch or the current branch, as
  decided at Take. Pushing and landing follow Terry's keep decision.

## Decisive premises observed (2026-09-28, at `f962cbf`)

| Premise | Observation | Result |
| --- | --- | --- |
| The deck renders 38 slides and the climax slide is 15th | Ran the slide-list helper | `total 38 climax 15 ratio 0.39`. Holds |
| The cover subtitle is still the old one | `sed -n 1,40p slides/tps-and-ai/slides.md` | Lines 7 and 25: "What AI-Augmented Development and LeSS Can Learn from the TPS". Holds |
| The diagnostic already appears by slide 5 | Slide list | Slide 5, "How do you know if the organization is using AI right?". Holds; slide 1 must keep it there |
| The early setup line exists | Slide 8 content | Ends with "## **AI speeds whichever loop you feed.**". Holds |
| Off-stage claims are cited in the deck | `grep -n -E "Claim 13\|Claims? [0-9, /and]*1[35]\b" slides/tps-and-ai/slides.md` | Line 785 note "Claims 13 / 24"; line 1042 note "Claims 23, 15, 7". The tensions slide shows the Claim 15 bullet "Extreme conditions interrupt JIT" |
| The Go-See slide and image are recoverable | `git show a2cb854 -- slides/tps-and-ai/slides.md`; `git cat-file -e a2cb854^:slides/tps-and-ai/public/entering-ai-harness.png` | The slide text (with notes citing `1c696d455d` and `0bd1dd2995`) and the image both exist at `a2cb854^` |
| The harness mechanism is still true | doughnut `git show 1c696d455d`, `git show 1c696d455d^:scripts/git-hooks/pre-commit`, current hook at HEAD `a0ab5999db` | The old hook did `cd $HOOK_DIR/../..` then `git add -u`; the fix uses `git rev-parse --show-toplevel`; HEAD keeps it. Holds |
| The build works before any change | Ran the build command above in the main checkout | Exit 0, "built in 7.07s"; the checkout stayed clean |

## Cumulative design and sizing assessment

There is one model throughout. The deck is an ordered list of beats measured
by a single signal: the rendered slide list, giving the total and the
climax's position. Every slice moves that list toward the story's shape and
proves progress with the same helper and build, so no parallel outline file,
hidden slides, or tooling is added. Speaker notes remain the only place
claims are cited.

The slices form this sequence:
- Slice 1 fixes the cover and keeps the opening intact.
- Slice 2 makes the claim roles hold, including the restored Go-See beat, so
  later reordering works on correct beats.
- Slice 3 moves the climax into place.
- Slice 4 cuts the deck to the ceiling while keeping the climax band.
- Slice 5 turns the result into Terry's decision.

Slice 4 is the largest and depends on narrative judgment, not tooling. It is
bounded by the ceiling, the band, and the default shortening order. The
stop-and-ask rule applies if a core beat would be lost. Slices 3 and 4 stay
separate because each leaves a deliverable deck with its own proof: the
climax placed, then the count met. No remaining slice-specific decomposition
concerns were found in this assessment.

## Ordered slices and proof ownership

### 1. The cover names the session attendees chose
Type: Behavior
Status: done
Behavior: Terry opens the deck → the cover reads **Freedom and Entrustment**
over *What AI-Augmented Development Can Learn from the Toyota Production
System*, in both the headmatter `info` and the cover slide. The diagnostic is
still slide 5 or earlier.
Proof:
- `grep -c 'What AI-Augmented Development Can Learn from the Toyota Production System' slides/tps-and-ai/slides.md`
  → ≥ 2.
- `grep -c 'and LeSS Can Learn from the TPS' slides/tps-and-ai/slides.md`
  → `0`.
- The slide-list helper shows the diagnostic at index ≤ 5.
- The build exits 0.
- Owns key example 1 (cover half) and key example 3.

Accepted proof (2026-09-28, current-branch execution on master after Take
`c3c8156`): lines 7 and 25 of the deck carry the new subtitle. The greps
return `2` and `0`. The helper shows slide 1 "Freedom and Entrustment" and
the diagnostic at slide 5 (`total 38 climax 15 ratio 0.39`). The build
exited 0. Learning for wrap-up: `TPS and AI/main-theme-and-stage-setting.md`
("Title") still quotes the old subtitle; it is outside this deck-only plan.

### 2. Every claim appears only in its talk role
Type: Behavior
Status: done
Behavior: Terry reads the tension slide, the notes, and the same-gates
cluster:
- "Tensions and honest limits" no longer shows the Claim 15 bullet.
- Claim 23's honest-CI versus disposable-prototype pair carries the tension.
- Claim 7, if kept, reads as a family resemblance, not a proven extension.
- No note cites Claim 13 or 15; the Biome note cites Claim 24.
- "Go-See may mean entering the AI harness" is back, with its image, next to
  "The gates do not care who authored the change". It is framed as a
  secondary, qualified beat citing Claim 16.
Proof:
- `grep -n -E "Claim 13|Claims? [0-9, /and]*\b1[35]\b|Extreme conditions" slides/tps-and-ai/slides.md`
  → no match.
- `grep -c '^# Go-See may mean entering the AI harness' slides/tps-and-ai/slides.md`
  → `1`, and `slides/tps-and-ai/public/entering-ai-harness.png` exists.
- The slide list shows the Go-See slide adjacent to the gates slide.
- The build exits 0.
- Owns key example 4.

Accepted proof (2026-09-28): before the edit the grep matched lines 785,
1032, and 1042; afterwards it matches nothing. The Go-See slide is restored
with its image as slide 27, directly after the gates slide (26); its note
cites Claim 16 as supporting. The tensions slide keeps Claim 23's pair and
qualifies Claim 7 as a family resemblance. The coordinator also dropped
Claim 16 from the Takeaways note, since a supporting claim is not a
takeaway. The helper shows `total 39 climax 15 ratio 0.38`. The build
exited 0.

### 3. The climax lands after jidoka and JIT
Type: Behavior
Status: done
Behavior: Terry pages through the deck:
- The jidoka material comes first: the loom's closed stop, smart → dumb →
  gone, Stop & Fix, the gates, Go-See, and the five judgments.
- The JIT flow material follows: pull, CI as a practice, and the shared
  product pulling collaboration.
- Then "The engine of freedom and entrustment" leads into "AI speeds
  whichever loop you feed".
- The climax's notes point back to the slide 8 statement it pays off.
- The triad still introduces jidoka frees / JIT entrusts before the jidoka
  section.
Proof:
- The slide-list helper shows every jidoka and JIT slide before the climax.
  The climax is at index total − 7 or later (at the 38–39 total, the ratio is
  at least 0.80).
- `grep -n -A12 '^# AI speeds whichever loop you feed' slides/tps-and-ai/slides.md`
  shows a note referring to the early statement.
- The build exits 0.
- Owns key example 2's ordering half.

Accepted proof (2026-09-28): the engine and climax moved together from
slides 14–15 to 31–32, after "Let the shared product pull collaboration".
The helper shows `total 39 climax 32 ratio 0.82`. Jidoka runs 14–26 and JIT
27–30. The planned `grep -A12` window ends inside the climax's diagram; the
corrected observation is `grep -n -A22 '^# AI speeds whichever loop you feed'`,
which shows the note "Climax: pays off the early statement slide *AI can
produce plausible software faster…*". Slice 2's greps still pass, Go-See
still follows the gates slide, and the build exited 0.

### 4. The deck fits about 33 slides with the climax at three-quarters
Type: Behavior
Status: planned
Behavior: Terry counts the rendered deck → about 33 slides, never more than
35. The climax ratio is 0.70–0.80. Each slide carries one beat Terry can
speak in about 1.3–1.4 minutes. After the climax, only the wind-down
remains: Respect for People, continuous improvement, one tension,
takeaways, closing crane, and end. Cut slides are deleted, not hidden, and
merges keep the cut slide's point where it is still needed. Follow the
seed's shortening order unless a better merge keeps more beats. Stop and ask
Terry before any cut that would drop a beat the main theme lists as core:
the diagnostic, theme, jidoka descent, same gates, JIT flow, one tension, or
the closing.
Proof:
- The slide-list helper shows total ≤ 35 (aim 33) and a climax ratio of
  0.70–0.80.
- `grep -c 'hide: true\|disabled: true' slides/tps-and-ai/slides.md` → `0`.
- Each cut slide appears in `git log -p slides/tps-and-ai/slides.md`.
- Slice 2's grep proofs still pass.
- The build exits 0.
- Owns key examples 1 (count), 2 (position), 5, and 6.

### 5. Terry accepts the arc
Type: Behavior
Status: planned
Behavior: Terry pages through the rendered deck in presenter mode
(`pnpm present`) → he names the climax slide and sees it at about 3/4, and he
confirms no core beat was lost. His requested changes are applied within the
count, band, and role rules.
Proof:
- Terry states agreement. Record the date and any changes here.
- After his changes, the slide-list helper, slice 2's greps, and the build are
  rerun and pass.
- Optionally, Terry tells the arc to a colleague and gets back the key message
  and the takeaways.
- Owns the story's evaluation.
