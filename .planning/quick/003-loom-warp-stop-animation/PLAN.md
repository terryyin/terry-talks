# Loom warp-stop animation (terry-moves)

A1 in `slides/tps-and-ai/artwork-list.md`: a short silent terry-moves
clip of **one** closed stop — a broken **warp** drops a sheet-metal
**dropper** into the path of an already-moving bar, and that blockage
stops the loom.

**Intended to replace G15** (`loom-jidoka-mechanism.png`). Keep G15 on
the slide and in the list until we decide which to keep. Do not delete
the PNG in this plan.

Visual contract is the artwork-list **Common style** (sumi-e prefix),
not a new look. Do **not** execute until asked. Delete this
`003-loom-warp-stop-animation/` directory in the last slice's commit
once every slice has landed.

## Selected mechanism (research locked)

**Abnormality:** one warp yarn breaks (tension gone).

**Physics, in order:**

1. Each warp passes through a thin sheet-metal **dropper**. Intact
   tension holds that dropper **above** a bar.
2. The bar already **reciprocates** (tied to shuttle motion). Clearance
   is the intact state — nothing is “sensing.”
3. A break lets the dropper fall a few centimetres **into the bar’s
   path** (gravity).
4. The fallen dropper **blocks** the bar. Blocked motion trips the loom
   stop. No diagnosis.

This is the Type G **warp-break auto-stop** (drop-wire). Toyota’s *75
Years* names the earlier warp/weft **halting devices** (already on the
1905 power loom) as the origin of jidoka; Type G (1924) still uses the
same idea. Claim 6 already describes this as the **dumb** loom example.

**Out of scope for this clip:** weft fork, non-stop shuttle change
(replenishment, not a stop), warp-tension controller (**gone**),
andon flags, the downstream knock-off linkage.

**Pedagogy vs G15:** the still is two panels; the argument is the
*motion* — a bar already moving, then blocked. A1 is one scene over
time. G15's accuracy notes still bind the clip (plates hang *on*
threads; one plate falls a few centimetres; bar *blocked by* the
plate, not struck; nothing electrical).

**Sources:** same as the artwork-list addendum (Toyota *Birth of
Jidoka*; TCMIT virtual tour; JSME Type G; AllAboutLean). Claim 6 §
“The loom stop is a closed physical question.”

## terry-moves (how this clip is built)

In-tree Remotion package. Preview: `pnpm moves`. Check:
`pnpm moves test` (jest + eslint + tsc). Render: `pnpm moves render`.
GIF: `pnpm --filter terry-moves run buildgif`. Output is
`terry-moves/out/` (gitignored); copy the artefact into
`slides/tps-and-ai/public/` for the deck.

A **story** is a React tree that returns `<Story id=… subtitles=…>`.
Register it in `terry-moves/src/Root.tsx`. Duration = sum of subtitle
`leadingBlank + duration` at 30 fps. Named **actors**
(`<AnimationEffect actor="stop-bar">`) receive **actions** on subtitle
beats (`oscillate`, `move`, `appear` / `disappear`, `glow`,
`persistUntilSubtitleId`). Scene-specific drawings live in
`terry-moves/src/parts/`, not in `video_components/` (those are
generic primitives).

**Fit:** 2D HTML/SVG actors + `AnimationEffect`. Do **not** use
`ThreeDFrame` / GLB for this schematic.

Closest analog: `StorySimpleExample` / `StoryTransparent` (2D actors),
not `StoryFailureVsFailure` (3D). `oscillate` +
`persistUntilSubtitleId` is how the bar runs until the stop beat
(see `StoryBooleanReturns` for persist-until; oscillate tests in
`tests/video_conomponents/Ocilate.spec.ts`).

No Accepted ADR constrains this (only ADR-0000). Talk artwork is not
a durable repo-structure decision.

## Visual style (artwork-list)

A1 follows **Common style for all generated artwork** in
`slides/tps-and-ai/artwork-list.md` — the same three anchors, drawn
rather than prompted:

> Japanese ink-and-wash (sumi-e) illustration on off-white paper, with
> a single vermilion-red accent. No text, no letters, no captions.

- **Style reference:** G1 `public/cover-crane-released.png`
- **Subject reference:** G15 (warp, droppers, feeler bar, cloth)
- **Accent:** vermilion **only** on the fallen plate, and only after
  it has fallen (same as G15)
- **Footprint:** 16:9 wide strip (same as G7 / G15), not square
- **Drawing:** ink strokes and wash, not CAD rectangles. Bar motion
  as loose strokes, like G15's sweep
- **Labels:** none in the clip. Slide text already names dropper /
  feeler bar / knock-off
- **Free (do not freeze):** composition, brush looseness, how much
  of the loom is shown — except what the slide footprint requires

A1 is already listed in the artwork-list addendum (status: planned).
Last slice only updates that status and the public artefact path.

## Design decisions

| Choice | Decision |
|---|---|
| Mechanism | Warp dropper + reciprocating bar only |
| Style | Sumi-e voice (artwork-list prefix); G1 style ref, G15 subject ref |
| Drawing | Side view, ~5–7 warps. Ink/wash, off-white paper. Thin vertical guides OK so the fallen dropper is not shoved aside |
| Motion | `stop-bar` oscillates in X until the blocked beat; one `dropper` `move`s down |
| Captions | **None** in the picture (style rule). No bottom `Subtitles` track |
| Audio | None |
| G15 | Keep. A1 is a candidate replacement; decide later which click to keep |
| Slide | **Smart → dumb → gone** only. Keep the Type G dropper photo. Add A1 as a further v-click after G15 (G7 → G15 → A1) so both can be compared |
| Embed | 16:9 muted looping `<video>` in `slides/tps-and-ai/public/`. GIF only if autoplay is awkward |
| List | A1 already in artwork-list (planned). Last slice: status → done + file path |
| Checks | `pnpm moves test` on story slices; compositions list includes the id. Do not full-render every slice. Render once in the embed slice |

## Learnings

- Root `.gitignore` has Python leftover `parts/`; `WarpStopLoom.tsx` is
  now tracked (force-added in slice 1), so later edits show in
  `git status`. New files under `terry-moves/src/parts/` still need
  `git add -f`.
- Actors: `stop-bar`, `dropper`, `warp`. Story size 1280×720.
- Intact beat oscillates `stop-bar` with `delta: [40, 0]` until
  subtitle id `break` (currently a 2s still placeholder).

## Slices

### 1. Static warp-stop schematic in Studio

- **Type:** Behavior
- **Status:** done
- Still `StoryLoomWarpStop` (1280×720) in Studio: sumi-e side view,
  6 intact warps, droppers up, bar with clearance. No vermilion, no
  text. Part: `WarpStopLoom.tsx`.

### 2. Reciprocating bar while warps are intact

- **Type:** Behavior
- **Status:** done
- Intact beat: `stop-bar` oscillates in X (`delta: [40, 0]`) with
  `persistUntilSubtitleId: 'break'`. Droppers stay up. `break` is a
  2s still placeholder until slice 3.

### 3. Broken warp drops a dropper and the bar stops

- **Type:** Behavior
- **Status:** planned
- **Do:** On the break beat: one warp shows as snapped; its dropper
  `move`s down a few centimetres into the bar’s path; vermilion
  (and optional `glow`) **only** on that fallen plate. Oscillate
  ends at this beat so the bar is visibly blocked/still. Hold the
  stopped frame, then the story may loop. No labels. Do not add
  weft, shuttle, or andon.
- **Done when:** the causal chain is readable in one play-through
  (intact motion → break → fall → stop). `pnpm moves test` passes.

### 4. Render A1, put it on the slide, keep G15

- **Type:** Behavior
- **Status:** planned
- **Do:** Render `StoryLoomWarpStop` (MP4 via `pnpm moves render`, or
  GIF via `buildgif` if video embed is awkward). Copy into
  `slides/tps-and-ai/public/` (name it in artwork-list when the file
  exists). On **Smart → dumb → gone**, add a muted looping `<video>`
  as a **further** v-click after G15 — do not remove G15 or delete
  `loom-jidoka-mechanism.png`. Keep `type-g-dropper-mechanism.jpg`.
  Set A1 in `artwork-list.md` to **done** with the public path. Do
  not change other loom slides.
- **Done when:** `pnpm typecheck` still passes; the slide can click
  G7 → G15 → A1; artwork-list A1 is done and still notes the
  keep-or-drop vs G15 is deferred. Include deletion of this
  `003-loom-warp-stop-animation/` directory in this slice’s commit.

## Out of scope

- Choosing G15 vs A1 as the lasting click-reveal (owner decides later)
- Deleting `loom-jidoka-mechanism.png`
- Weft-fork, shuttle-change, tension-controller, or andon animations
- Replacing the Type G photo or the watching-the-loom / called-by-the-stop art
- New terry-moves action types or 3D assets
- Audio, translations, on-picture captions, or a narrated “talk track”
- An ADR for embedding video in decks
- Pushing to remote
