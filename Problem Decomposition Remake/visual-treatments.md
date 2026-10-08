# Visual treatments of one passage

Short moving samples that interpret the same passage of the Problem Decomposition argument in different visual languages, so Terry can compare them, correct one, and later choose one to continue. Each sample is a named version; a revision is a new version and its predecessor stays available.

## Common brief

- **Title and attribution:** Problem Decomposition · Terry Yin.
- **Authority:** the [confirmed article](../Problem%20Decomposition/problem-decomposition.md) for the argument; this project's [film treatment](film-treatment.md) for the fictional shopper example. The article's skeleton is distinction, premises, goals and principles. This passage covers only its distinction and the stock/feedback/opening-hours example; it does not stand for the whole argument.
- **Passage:** screen, API and database are parts of an imagined answer, not customer outcomes. A smaller customer question (“Is it in stock?”) gets a usable result (“In stock: 1 left”), which is not the whole shopping problem. Feedback — “The shop was closed when I arrived.” — makes opening hours next; reservation stays unstarted; the stock result stays useful.
- **Shared wording:** captions, outcome questions/results, status labels and the feedback quote live once in `terry-moves/src/visualTreatments/brief.ts`. Every version uses them unchanged. The shopper, store and stock quantity are fictional.
- **Beats, in order:** title, distinction, question, result, feedback, next. Each version's authored script sets their durations; that script is the only timing source.

## Versions

| Version | Treatment | What it interprets | Authored inputs (under `terry-moves/src/visualTreatments/`) |
| --- | --- | --- | --- |
| `TreatmentTypographyV1` | A — typography | Restrained type, cards and diagram motion: solution parts set apart, the stock card becomes a usable result, feedback arrives, hours turns to next. | `typography/script.ts`, `typography/TypographyTreatment.tsx` |
| `TreatmentCharacterV1` | B — character | One shopper: worried intent at home, asks the stock question, closed-eye relief and a nod at the answer, walks to the shop and finds it closed, glances back at the kept result, then reaches for the opening-hours sign. | `character/script.ts`, `character/CharacterTreatment.tsx` |
| `TreatmentCharacterV2` | B — character, revision of V1 | V1's review found the response to the stock answer and to the closed door read too weakly, and the hand ended partly hidden under the hours sign. V2 revises only those: a breath out with a hand to the chest and a look up at the kept answer with one small nod (relief, not “all shopping solved”); at the closed door a half step back in surprise, then a hand to the chin; the hand finally rests against the hours sign's edge, in front of it. Other beats, timing and wording are V1's. | `character/v2.ts` (revised result/feedback/next), reusing V1's script and renderer |

`versions.ts` registers every version with the files its picture depends on; `TreatmentCompositions.tsx` registers one Studio composition per version under the same ID. Rendering or revising a version does not choose it; only the review record below does. Terry selected `TreatmentCharacterV2` on 2026-10-08; the record names it exactly.

## Render and review

From the repository root (Node ≥24.9 and locked dependencies installed):

```sh
pnpm --dir terry-moves render:treatments                         # every version
pnpm --dir terry-moves render:treatments TreatmentCharacterV2    # named versions only
```

For each version, under ignored `terry-moves/out/treatments/<version>/`, it writes:

- `<version>.mp4` — the whole sample, H.264, 1080×1080, the composition's fps and duration;
- `<beat>-midway-<frame>.png` and `<beat>-settled-<frame>.png` — two key poses for every beat, at frames derived from that version's timeline (halfway through the beat and its last frame);
- `manifest.json` — the composition's size, fps and duration, each beat's caption and frame range, the clip and key-pose paths, and the source: the Git revision used to render, whether the working tree or any listed input differed from it, and each input file's Git blob hash.

The same versions open in Studio with `pnpm moves`. Compare versions at the same beat by their key poses; V1 and V2 share timing, so their frame numbers match.

## Revising a version

Never change a reviewed version's performance or timing in place: its exports and manifest must stay reproducible. To correct one, add a new version file that reuses the predecessor's unchanged beats and supplies only the revised ones (as `character/v2.ts` does), register it in `versions.ts` with its inputs, and render it by name. To reproduce an earlier export exactly, check out the manifest's revision and run the same command; the blob hashes show whether the inputs match.

## Choosing a version

The review decision lives in one hand-edited record, `terry-moves/src/visualTreatments/choice.ts` (`treatmentChoice`). It says one of:

- **`pending`** — no version chosen yet, with an optional note. Choosing neither without a specific correction in mind stays here.
- **`revise`** — no version chosen; names one version and the beats to correct, with a note on what to correct, e.g. `{ decision: 'revise', version: 'TreatmentCharacterV2', beats: ['feedback'], note: '…' }`. The version and beats must exist. Act on it as in *Revising a version*: both candidates stay available.
- **`selected`** — continue exactly one version, named by its registered id, e.g. `{ decision: 'selected', version: 'TreatmentCharacterV2' }` — the current state. There is no “latest”: registering a later revision does not move the choice; to change it, edit the id.

To choose, watch the exported clips and key poses, then edit the record to `selected` with the exact version id. Rendering, exporting, revising or adding versions never changes the record, and `render:treatments` never produces a selected output.

Studio's `TreatmentSelected` composition previews the record. When it is `selected`, it plays exactly that version's picture, duration and fps. When it is `pending` or `revise`, it shows a short “No treatment selected” card with the decision and note; every version's own composition stays available. If the record names an unregistered version, nothing is substituted: the composition listing logs, and rendering `TreatmentSelected` fails with, the missing id, the registered ids and the record's location.
