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
Status: done

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

## Accepted slice proof

The cover now titles the film “Just in time”, supported by “Trust the team to
meet real needs, on time.” The opening asks that precise question and the
closing names the capability to meet real needs on time. House 10–15 seconds
introduces TPS; the three original paintings and phrase headings occupy
15–19, 19–23 and 23–27 seconds. Shared `house.definitionViews` owns their
artwork, heading and timing; captions retain their own wording responsibility.

The two focused suites passed with eight existing tests, terminal exit 0,
using the complete Jest command above. Actual Root assertions in
`tests/tpsAndAiJit/film.spec.tsx` observe cover hierarchy, all authored clocks
and captions, incoming/outgoing definition images at start/midpoint/last-frame
and exclusive ends, the preserved Jidoka house default and exact credit hold.
`delivery.spec.tsx` runs the unmodified real CLI in disposable fixtures,
observes fresh source/delivery SRT and mounted-film text/interval parity,
and compares all eight artwork files and the genuine logo with their originals.
TypeScript passed, exit 0. Independent post-change refactoring found no
candidate and made no edits, preserving these observations. Selective
`pnpm --dir terry-moves exec eslint src/tpsAndAiJit/Scenes.tsx src/tpsAndAiJit/film.ts --fix`
passed, exit 0. Whitespace check passed.

The existing package command exported once, exit 0: 2580/2580 frames and
frame-zero poster. `ffprobe` observed H.264/yuv420p/bt709, 1080 square,
30 fps, 86.000 video seconds, AAC stereo 48 kHz (86.016 container seconds).
`ffmpeg -v error -xerror` completely decoded video and audio, exit 0, and
extracted seven changed moments at 360 pixels: 0, 7.5, 13, 17, 21, 25 and
80.5 seconds. Coordinator inspected these actual MP4 frames: readable text,
complete illustrations, correct hierarchy and no caption/art overlap. Studio
preview of cover, house, all three illustrations and closing also passed.
All 17 source/delivery subtitles and intervals match the shared JSON exactly.
Unchanged scenes, music and earlier language exports retain prior accepted proof.

Artifact SHA256: MP4 `202852a749a70f37f10fa778222e92052913bf24ad599cc1a4e854a6b8d1f4cb`;
poster `1a1bc66272f8a44337d4eee373ae2a3c73d350e6d7653278ee5f962ad2ad330c`;
source/delivery SRT `1da7925c287488555caf2e64461405cb2179c15ad9de326ff73e2b77fdaa8f34`.
The reused worktree is retained. Origin/master accepted the claim
`27eed88995ecf0d577949c47138a6e974c3f8b9a`; the same claim was confirmed on
the remote execution branch. No observer was available, so CI is unobserved.

## Execution complete

Product advice: no change. The completed revision improves the existing film
without a new framework or a change to future priorities. Independent product
review found no correction or backlog recommendation; correction 026 remains
separate. Process review was skipped under the project's default. The exact
attributable implementation is `9a0668cb1878b00d93ac9ae7b2a22eae8d9b059d`,
accepted on origin/codex/jidoka-film-remake. CI is unobserved because no
configured workflow or observer is available; no CI shutdown is claimed.
