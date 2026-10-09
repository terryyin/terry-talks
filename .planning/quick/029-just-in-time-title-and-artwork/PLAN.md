# Clarify the Just in time title and illustrate its definition

## Source and goal

Identity: terry-moves-filmmaking#just-in-time-title-and-artwork
Story: [title and artwork revision](../../../terry-moves/seed.md#just-in-time-title-and-artwork).
Source: Terry's current correction to the delivered English film. Baseline
film is recoverable at `5d273767516c031fdcc33335e59ec7707a6f08d9`.

Deliver one revised 86-second English movie with **Just in time** as the
title, trust explicitly tied to real needs and timely response, and the three
original illustrations paired with its three-part operational definition.
Keep the existing square format, music, logo, credit, unaffected scenes and
shared translation-ready authoring source. No repeated research, new generated
artwork, other language exports or general authoring framework is needed.

## Existing solutions and observed premises

- `TPS and AI/JIT/film-script.json` owns titles, captions and the clock;
  `src/tpsAndAiJit/Scenes.tsx` reads it, and Root registers the actual
  `TPSAndAIJITFilm`. Reading these files and the current Root tests confirms
  the cover hierarchy and the continuous 10–27-second house scene to revise.
- `slides/tps-and-ai/slides.md:990` pairs the three phrases with
  `jit-customer-orders.png`, `jit-assembly-pulls-wheels.png`, and
  `jit-wheel-replenishment.png`. Each original square image was visually
  inspected; all three can be fitted whole in the existing protected art area.
  Reuse their bytes and existing Art/Heading/Shot presentation rather than
  regenerate, copy caption styling or invent an asset pipeline.
- The existing package export command generates MP4, first-frame poster and
  matching SRT. Prior accepted setup names this exact owned worktree and its
  unchanged locked dependency state; an applicable command must succeed again
  after admission, before implementation. Reuse established Node runtime.
- The current six real-Root film tests and two isolated real-CLI delivery tests
  cover scene selection, complete artwork, captions and output parity. Update
  reached title/house expectations; run this focused suite and TypeScript.
- Accepted ADR0000 preserves human ownership of consequential architecture.
  This revision uses established film responsibilities and introduces no
  architectural decision or North Star change.

## Slice

### 1. Viewers see Just in time and its complete original definition artwork
Type: Behavior
Status: planned

Implementation: Correct metadata and cover hierarchy and clarify the trust
message. Within the existing 10–27-second scene, retain a short TPS-house
introduction and show the three complete illustrations sequentially with the
matching concise phrases. Keep minimum-ready-stock wording accurate. Store
the timings, phrases and asset references in the shared script, then regenerate
the English SRT and update the brief. Preview before exporting once.

Proof: The actual Root's focused film and isolated CLI delivery tests observe
the cover, house-to-art transitions, matching captions and original assets.
Run `pnpm --dir terry-moves exec node --experimental-vm-modules node_modules/jest/bin/jest.js tests/tpsAndAiJit --runInBand`
and `pnpm --dir terry-moves exec tsc --noEmit` with the bundled Node PATH.
Inspect changed scenes at phone width in Studio and in the final MP4, including
frame zero, the TPS house, all three definition illustrations and closing.
Run the established `render:tps-and-ai:jit` command once after approval of the
preview. Confirm 1080-square/30fps/86 seconds, complete decode, source/delivery
SRT parity and byte-identical original artwork; retain prior evidence for
unchanged scenes, music and older language exports.

Safe stop: Terry has the revised watchable MP4, poster and matching subtitle
file. Independent post-change refactoring, selective formatting, authorized
commit/publication and scoped wrap-up remain coordinator responsibilities.

## Concern review and execution

One cohesive visible revision; no remaining scope, dependency, architecture
or proof concern was found. No numerical slice limit is supplied. The user
already authorized implementation, final movie delivery and origin sync.
Use the existing owned worktree in Story Branch Mode; preserve unrelated
default-checkout changes. CI remains unobserved because no configured hosted
workflow/observer is available; do not report CI success.
