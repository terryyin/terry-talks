# Casting rehearsal proof

## Slice 1 technical observations — awaiting Terry's assessment

The current uncommitted rehearsal is `AnimeEngineerCasting`: 1080 square,
30 fps, 171 frames (5.7 seconds). Its script directs a 1.6-second silent lead,
the retained 3.3-second reconsider reply and a 0.8-second settle. The original
vector art and its provenance/reproduction guidance live in
`terry-moves/src/animeCharacter/`. Optional continuous face channels reuse the
conversation compiler's clock and easing; scripts omitting them preserve the
old sampled shape. Upper sleeves stay behind the torso; forearms, cuffs and
palms stay in front so a chest gesture remains visible and attached.

Accepted technical proof on the final forearm-layer implementation:

- `pnpm -C terry-moves test:unit --runInBand tests/animeCharacter` — 7 passed.
  `tests/animeCharacter/casting.spec.tsx` observes the actual registered
  component/compiler through the existing selected-frame Remotion harness:
  measured audio/captions, separate take-bound mouth shapes and quiet gaps,
  smooth face deformation plus gaze/head/attached wrist response, script edits
  reaching the face, deterministic entry and a frozen-score discriminator,
  actual saved-WAV metadata and omitted-face compatibility.
- `pnpm -C terry-moves test:unit --runInBand tests/illustratedConversation` —
  24 passed in all four suites (pilot, full exchange, reaction revision, turn
  names). Consumer search for `compileConversation|ActorPose|Performance|PoseCue`
  found those consumers and an unrelated visual-treatment type. The final
  sleeve layering does not affect this accepted shared-compiler proof.
- `pnpm -C terry-moves typecheck` — passed after the final rig correction.
- `pnpm -C terry-moves exec remotion render src/index.ts AnimeEngineerCasting out/anime-engineer-casting.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2`
  — terminal exit 0; actual Root registration and metadata verify retained
  inputs. Final local export: `terry-moves/out/anime-engineer-casting.mp4`.
- `ffprobe -v error -show_entries stream=codec_name,width,height,avg_frame_rate,nb_frames,duration -show_entries format=duration -of json terry-moves/out/anime-engineer-casting.mp4`
  — H.264 1080×1080, 30 fps, 171 frames, 5.7-second video with AAC sound.
- `pnpm -C terry-moves exec tsx out/sample-anime-frames.ts` — terminal exit 0
  on final artwork. The disposable helper bundles the real Root and selects
  the registered composition: all 16 actual PNG forward/reverse pairs agree
  at 0, 9, 21, 41, 47, 48, 58, 69, 91, 98, 105, 112, 144, 146, 147, 170;
  a separate browser's fresh frame 91 agrees; all 16 pictures differ and a
  frozen-score frame 21 differs. Inspectable temporary observations are in
  `terry-moves/out/anime-casting-proof/observations.json`. These diagnostics
  are not production inputs or a prerequisite for future reproduction.

Bounded manual journey under `dough-manual-testing`: use the existing Studio,
cover one complete 1× playback with audio enabled, the reaction/chest/speech-gap
poses, backward entry and fresh mount; reserve a repeat only for an observed
correction. Final foreground-hand source played at approximately 30 fps in
Chrome tab 137233021 at `http://localhost:3001/AnimeEngineerCasting`. Palm at
frame 41 remains visible across the chest. Frame 99 mouth is `rest`, and the
actual `anime-picture` SVG matches exactly after fresh reload at 99. Frame 25
matches exactly between direct entry and backward entry from 99. Earlier
manual observations before the layer correction are superseded by these.
Audible/emotional quality and perceived speech synchronization remain Terry's
judgment; the agent did not claim to hear or artistically accept the performance.
The pending assessment request links Studio and the final MP4.

Diagnosis retained: the first pixel-proof rerun met `EEXIST` on an owned
diagnostic bundle's existing public symlink. Selecting a unique diagnostic
bundle directory addressed that setup collision; final proof reached success.
The compiler consumer suite remained unchanged. Existing unrelated GLTF
preload warnings do not affect the casting composition's render.

## Independent refactor and preparation for delivery

Fresh `dough-post-change-refactor` agent returned `## REFACTOR COMPLETE`.
`neutralFace` now has one home in the pose-owning script contract; the compiler
and rig consume it. `illustratedConversation/metadata.ts` owns the existing
selected-input compilation, fetch, digest and WAV-verification flow; all three
conversation compositions and the casting registration consume that seam.
No arithmetic, authored targets, drawing paths, caption/audio schedule or
composition dimensions changed. Inspected extraction preserves the accepted
MP4, PNG and manual evidence without another render.

After these edits the agent observed terminal passes for
`pnpm -C terry-moves test:unit --runInBand tests/animeCharacter` (7 tests),
`pnpm -C terry-moves test:unit --runInBand tests/illustratedConversation`
(24 tests in four suites), and `pnpm -C terry-moves typecheck`.
The registered metadata assertions in anime `casting.spec.tsx`, conversation
`pilot.spec.tsx` and `turnNames.spec.tsx` exercise the extracted flow using
actual saved WAV bytes, alternate timing/names, stale mouths and bad measurements.
Default/omitted-face assertions and existing drawing hashes still pass.

Coordinator selective formatting (matching the package's source ESLint fixer):
`pnpm -C terry-moves exec eslint src/animeCharacter src/Root.tsx src/illustratedConversation/script.ts src/illustratedConversation/performance.ts src/illustratedConversation/metadata.ts src/illustratedConversation/IllustratedConversation.tsx --fix`
passed without further source edits. The same command without `--fix` passed
focused lint. `git diff --check` passed. No files are staged, committed or
published; Terry's requested moving assessment remains unresolved.

## Rear-hair correction after Terry's review

Terry reported that the rear hair appeared in front of the neck and resembled
a beard, and explicitly requested a fix. At frame 41 the original registered
PNG showed hair `(48,48,71)` at neck coordinate `(550,520)`. Source inspection
found the main closed bob silhouette painted in the foreground head group
after the body and neck. Retained before image: `out/anime-neck-before.png`.

Before repair,
`pnpm -C terry-moves test:unit --runInBand tests/animeCharacter -t 'rear hair paints behind the neck'`
failed at `casting.spec.tsx` with expected paint-order bit 4, received 0.
The regression renders the real registered drawing at 0, 21, 41, 98 and 112,
observes rear hair painting before the neck, the face painting after it, and
matching rear/front head transforms. The correction moves the rear silhouette,
highlight and shadow into a head-rotated layer ahead of the body/neck in SVG
paint order; face, bangs and front locks remain in the foreground head layer.
Speech, timing, choreography and shared compiler are unchanged.

After repair, `pnpm -C terry-moves test:unit --runInBand tests/animeCharacter`
passed all 8 tests and `pnpm -C terry-moves typecheck` passed. The exact MP4
render command recorded above completed again and replaced the current export
with the corrected 171 frames. `pnpm -C terry-moves exec tsx out/sample-anime-frames.ts`
completed with updated final PNGs: all 16 forward/reverse pairs agree, fresh
91 agrees, all sampled pictures change, and frozen 21 differs.
`out/anime-neck-pixel-observations.json` records skin `(216,160,140)` at the
same neck pixel for frames 0, 21, 41, 47, 48, 98 and 112. Coordinator inspection
of corrected frames 41 and 112 confirms visible neck skin below the chin.
These corrected actual frames supersede the earlier forearm-only pixel set;
old exact-SVG manual comparisons are historical, while unchanged motion and
speech observations remain applicable. Overall artistic assessment remains open.

Fresh independent refactoring of this correction returned `## REFACTOR COMPLETE`:
one local `headTransform` now owns the unchanged rear/face rotation string and
pivot. Post-refactor 8 anime tests, typecheck and `git diff --check` passed.
Inspected extraction preserves the current actual movie/PNG/neck-pixel evidence;
shared conversation proof remains unaffected. Coordinator ran selective
`pnpm -C terry-moves exec eslint src/animeCharacter/AnimeEngineer.tsx --fix`
successfully without further source edits, then the same command without
`--fix` passed lint. G4 is proved; G1 overall artistic assessment is still open.

## Owner direction to continue

After reviewing the moving casting sample, requesting the neck/hair correction
and receiving the corrected export, Terry instructed “continue plan execution”.
The coordinator treats that current direction as selection of the corrected
casting for the remaining scene, closing G1 at this early artistic checkpoint.
Technical checks remain evidence of timing, movement and deterministic rendering;
they are not substituted for Terry's direction. Final baseline/revision playback
remains part of the later slices' evaluation.
