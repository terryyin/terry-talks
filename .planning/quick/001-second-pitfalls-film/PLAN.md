# Plan: Generate Episode 2 — Removing a Rule Is Not Adding Its Negation

## Source

- Story: [Generate Episode 2: Removing a Rule Is Not Adding Its Negation](../../seeds/SEED-001-pitfalls-second-film.md#second-pitfalls-film)
- Identity: `SEED-001#second-pitfalls-film`
**Source review:** [source-review.md](./source-review.md)
- Article: [Removing a Rule Is Not Adding Its Negation](../../../AI%20Augmented%20Development%20Pitfalls/02-removing-a-rule-is-not-adding-its-negation.md)
- Pattern to reuse: Episode 1 film home
  ([design](../../../AI%20Augmented%20Development%20Pitfalls/01-refinement-film-design.md),
  `terry-moves/src/stories/ScopeRestrictionFilm.tsx`,
  `terry-moves/src/pitfallsScope/`,
  `terry-moves/public/assets/pitfalls-scope/`,
  `scripts/pitfalls-scope-audio.py` + content/sound modules)

## Goal and scope

**Goal:** Terry can share a ~30 s portrait film that helps developers recognize
removal-turned-into-absence-assertion, its maintenance cost, and the corrective
action (describe and verify current capability; retire expired assertions).

**In scope:** Editable Terry Moves film, Studio preview, shareable 9:16 export;
holdings-refresh scenario; visible AI follow-through; Episode 1 presentation
lessons; AI disclosure; matching closing narration and on-screen text; Terry
review before finalize.

**Out of scope:** Platform posting; other pitfalls episodes; other aspect
ratios or languages; changing Episode 1.

**Assumptions:** Parallel Episode 2 film home (do not mutate Episode 1
compositions, assets, or audio records). No generic multi-episode film
framework. Built-in ImageGen for plates (as Episode 1). OpenAI TTS for speech
takes via a sibling offline audio script. Local focused proof is composition /
film-home checks plus developer-operated Studio and export observation; full
`pnpm moves test` when film-home or shared Remotion surfaces change enough that
the suite is the cheapest consumer cover.

## PFE and architecture

**Responsibility:** Produce the second AI Augmented Development Pitfalls
portrait film with the same workplace-story + software-overlay presentation
Episode 1 established.

**Found elsewhere:** Episode 1 already owns that presentation pattern
(scene plates, native overlays, synthetic cast, offline mix pipeline, design /
artwork / audio / caption records beside the article). Reuse by **paralleling**
that home for Episode 2 (`RuleNegationFilm`, `pitfallsNegation/`,
`assets/pitfalls-negation/`, `02-*-film-*.json` / design doc, sibling audio
scripts). Do not relocate Episode 1 into a shared factory; delivery grouping
alone does not justify a pitfalls-film framework.

**ADRs:** Only Accepted ADR-0000 (use ADRs). No new consequential architectural
choice; ordinary plan.

**Cumulative design:** One coherent Episode 2 film model — design locks meaning,
visual home shows it, measured speech and captions finish it, export makes it
reviewable. Special-case Episode 2 content; share Episode 1 *conventions*, not
a new abstraction layer.

## Outside-in proof

| Promise | Owning slice | Observable signal |
| --- | --- | --- |
| Standalone viewer can explain misunderstanding, cost, and corrective action | 1 (locked meaning), 4–6 (shown and heard) | Design sequence + finished preview/export convey all three |
| Mistaken absence artifacts appear after “remove entry requirement” | 4 | Assistant reply / overlays show tests or docs asserting absence, not only a simpler gate |
| Closing matches narration and keeps useful vs expired distinction | 5–6 | Closing text equals narration; film does not teach that all negative checks are waste |
| Terry can review before finalize; posting not required | 6 | Studio preview + portrait mp4 exist; design notes posting out of scope |
| Episode 1 remains intact | 3 | `ScopeRestrictionFilm` and pitfalls-scope assets/records unchanged by Episode 2 work |

## Decisive premises

| Premise | Consuming operation | Observation | Result |
| --- | --- | --- | --- |
| Episode 1 film home is registered and loadable as the reuse pattern | Slices 3–6 approach | `Root.tsx` imports `ScopeRestrictionFilm`; composition id `ScopeRestrictionFilm` 1080×1920×900@30; `public/assets/pitfalls-scope/` has plates + `mix-v4.wav`; `python3` imports `pitfalls_scope_content` with `DURATION=30` and Cedar/Coral/Ash cast | Settled true in this checkout |
| Offline audio rebuild entry exists for a parallel film | Slice 5 approach | `scripts/pitfalls-scope-audio.py` rebuilds from content module; `--generate` is explicit paid OpenAI TTS | Settled true for pattern; paid generate left to probe |
| OpenAI TTS can create at least one Episode 2 raw take in this environment | Slice 5 | Early probe slice 2 | Settled true — `opening.wav` + sidecar under `pitfalls-negation/audio/` |

Named checkout for observations: this preparation workspace
`/Users/terryyin/git/terry-talks/.worktrees/generate-episode-2-removing-a-rule-is-not-adding`.

## Ordered slices

### 1. Film design locks the holdings-refresh story
Type: Behavior
Status: done
Proof: Design doc under `AI Augmented Development Pitfalls/` records sequence,
spoken direction, mobile layout, sound targets, meaning to preserve, and
evaluation nuance; a reader of the sequence alone can recount misunderstanding,
cost, and corrective action without watching Episode 1.

Behavior: Pre: refined story and source article. Trigger: write Episode 2 film
design (parallel to `01-refinement-film-design.md`) with concrete dialogue
direction and beat timings totaling ~30 s. Post: design is the authority for
later scenes, speech, and captions; platform posting marked out of scope.

### 2. Probe paid speech generation for Episode 2
Type: Behavior
Status: done
Proof: One missing raw take for a draft Episode 2 cue is requested through the
sibling audio entry (or the Episode 1 script temporarily pointed at a throwaway
cue path that is reverted if used only for the probe); the take file and
sidecar exist with matching text hash metadata. Failure stops slices that need
synthetic speech and revises the plan.

Behavior: Pre: OpenAI credentials available to the offline script. Trigger:
`--generate` for a single Episode 2 cue (or equivalent minimal request). Post:
paid TTS path confirmed for this film, or plan changes before dependent audio
work. Cheap presence of scripts already observed; this probe owns the
credentialed outcome.

### 3. Episode 2 film home registered beside Episode 1
Type: Structure
Status: done
Proof: New composition (working id `RuleNegationFilm`) appears under
`pnpm moves` / Remotion compositions; Episode 1 `ScopeRestrictionFilm` still
registered; focused typecheck or composition listing green; no edits to
Episode 1 active mix, plates, or `01-film-*.json` required for this slice.

Internal change: Add `terry-moves` story module + asset directory parallel to
`pitfallsScope` / `pitfalls-scope`, wire Root registration and a scene folder
for editable timelines. Enables slice 4’s visible story.

### 4. Studio preview shows removal, mistaken absence, and correction
Type: Behavior
Status: done
Proof: Developer-operated Studio observation of `RuleNegationFilm` (and scene
compositions): hook, old rule → intended change, visible AI absence
follow-through, corrective close with matching on-screen intention; AI
disclosure with series label; mobile-safe overlays. Placeholder or silent audio
allowed until slice 5. Artwork record lists plates and prompts. Focused
Remotion/unit checks when they discriminate composition wiring.

Behavior: Pre: design from slice 1; film home from slice 3. Trigger: implement
scenes, plates (Built-in ImageGen as needed), overlays, captions shell. Post:
preview alone communicates the three evaluation points even before final mix.

### 5. Measured soundtrack and captions complete the audible film
Type: Behavior
Status: planned
Proof: Episode 2 audio/caption/SRT records and mix exist; mix ~30 s, loudness
targets aligned with Episode 1 lessons; phrase captions suppress competing
subs on hook/close; closing narration text equals on-screen close; speech audit
or documented known ambiguities retained. Depends on slice 2 success.

Behavior: Pre: cue texts and timings from design; TTS path probed. Trigger:
sibling offline audio pipeline (`--generate` missing takes, build mix, write
records). Post: film plays with clear audible dialogue and matched captions.

### 6. Portrait export ready for Terry’s review
Type: Behavior
Status: planned
Proof: `pnpm moves render` (or equivalent Remotion render) writes a 1080×1920
~30 s mp4 for `RuleNegationFilm`; Studio preview remains the editable review
surface; design states posting is a later step. Developer-operated check that
export opens and matches the preview’s meaning.

Behavior: Pre: visual film + final mix integrated. Trigger: render shareable
export into the film’s out path. Post: Terry can accept or request changes
before finalize.

## Current decisions

- Parallel Episode 2 home; do not subsume Episode 1 into a shared pitfalls-film
  framework.
- Scenario stays the article’s holdings / entry-started refresh example, with
  mobile-shortened on-screen labels allowed.
- Cast voices: Cedar narrator, Ash developer; Coral only if a beat needs a
  second person.
- Composition working id: `RuleNegationFilm` (rename only if registration
  collision appears).

## Concern evidence

- Slice-plan refinement: not needed — boundaries are one outcome each
  (design → probe → home → visible story → audible finish → export), proof is
  mapped, and cumulative design stays a single Episode 2 parallel to Episode 1
  without accumulating special-case frameworks.
- Remaining slice-specific concerns: none identified. Slice 2 is an authorized
  early probe for the unsettled TTS premise; its failure stops dependent audio
  work and revises the plan rather than leaving readiness blocked on an
  unobserved credentialed claim.

## Learnings

- Episode 2 design doc naming parallels Episode 1’s short thematic title
  (`01-refinement-film-design.md` → `02-rule-negation-film-design.md`) while
  staying `02-*-film-design.md` and aligned with working id `RuleNegationFilm`.
- Slice 1 accepted proof: design-read of
  `AI Augmented Development Pitfalls/02-rule-negation-film-design.md` —
  sequence alone recounts misunderstanding (removal→absence assertion),
  maintenance cost, and corrective action; posting out of scope; evaluation
  nuance preserved; Cedar/Ash cast; ~30 s beat timings.
- Slice 2: paid OpenAI TTS confirmed via sibling
  `scripts/pitfalls-negation-audio.py` + `pitfalls_negation_content.py`;
  probe take `terry-moves/public/assets/pitfalls-negation/audio/opening.*`
  verifies. Hook raw duration ~3.10 s overruns design 0–2.5 s window — slice 5
  must settle speed/direction/placement before mix.
- Slice 3: `RuleNegationFilm` registered parallel to Episode 1
  (`pitfallsNegation/` + story module + Root); compositions list both films;
  placeholder OpeningHook only until slice 4.
- Slice 4: Visible beat sequence + plates (`workplace`, `holdings-work`) +
  `02-film-artwork.json`; stills prove E2 absence follow-through and close;
  silent until slice 5; focused `film.spec.tsx` green.
