# Preserve conversation timing across authored turn names

**Identity:** terry-moves-filmmaking#conversation-turn-name-timing
**Source:** [bounded correction](../../../terry-moves/seed.md#conversation-turn-name-timing).
**Authority:** Automatic execution retrospective may plan this correction; it does not authorize its execution or backlog placement.

## Goal and scope

Terry can rename a unique turn without changing its saved speech slot or losing
speech, captions, mouth timing or acting. Separate authored turn identity from
the beat clock's generated names within the conversation compiler. Preserve the
existing duplicate-name rejection (ambiguous acting references), all selected
assets, baseline/revised output and the shared `beatTimeline` API. No new film,
casting, generation, editor, arbitrary reserved-name rejection or timing framework.

## Provenance and current findings

Review of `terry-moves-filmmaking#illustrated-conversation` at delivered
`0262e7f1e58026ed6549aad31fc2ee046ef633c5` includes slice commits
`4eebdac7548d010145853906912aaa857083e34c` and
`31db27cc2d27b577064fd3cc4038402b60c387ca`. All three selected films use unaffected names.

`compileConversation` passes authored IDs directly to `beat`, adds generated
`lead` and `<id>:pause` beats, then uses `clock.beatRange(turn.id)`. That lookup
selects the first matching beat, so a unique authored ID can silently select a
generated interval. Current public-boundary observations in the owned execution
workspace reach the faulty schedule:

```sh
pnpm -C terry-moves exec tsx -e 'import {compileConversation} from "./src/illustratedConversation/performance.ts"; import {conversationScript} from "./src/illustratedConversation/script.ts"; const script=structuredClone(conversationScript); script.turns[0].id="lead"; script.acting=script.acting.map(c=>c.turn==="passed"?{...c,turn:"lead"}:c); const turn=compileConversation(script,30).turns[0]; console.log(JSON.stringify({from:turn.from,durationInFrames:turn.durationInFrames}));'
```

Observed `{from:0,durationInFrames:36}` instead of the retained take's
`{from:36,durationInFrames:84}`. Appending a copy of `reconsider` as
`question:pause` similarly gives `{from:300,durationInFrames:36}` instead of
`{from:522,durationInFrames:99}`. This can truncate or overlap audio while the
overall duration still appears plausible. Missing coverage was exposed by review;
current tests exercise adding a differently named turn but not this collision.

## Current design, reuse and constraints

Keep the shared beat clock and its frame arithmetic; only the conversation
compiler owns the authored-ID-to-clock-range relationship. Reuse the predecessor plan's existing-solution finding, recoverable at
`de80837d82276980bff1a97e65cbad86df34a52b:.planning/quick/034-illustrated-conversation/PLAN.md`
under `Current design and reuse decisions`: `beatTimeline` supplies ordered ranges, while
the conversation sampler owns film-time acting. Do not solve this with a list
of forbidden user names or per-name branches. The existing renderer/audio nodes
must receive the corrected schedule through the same public path.

ADR-0000 (Accepted in index and record) leaves durable decisions human-owned;
this local correction creates none. The backlog's near-future direction favors
scripts whose actions rearrange naturally. No new ADR/North Star or prerequisite.

## Outside-in proof and ordered slice

Execution context: story-branch in
`/Users/terryyin/git/terry-talks/.worktrees/preserve-audio-timing-when-a-conversation-turn-i`,
branch `codex/preserve-audio-timing-when-a-conversation-turn-i`, agent Tsukasa-chan,
publisher `dashboard-territory.local-terry-talks`. Established claim accepted on
`origin/master` at `344840b58430bbe38f9476101197af838cdc0665`; starting revision
`a28f2c0294033831d77fa674a3eabc2a099622ae`. Readiness remains changed since review;
source scope still agrees. No numeric slice limit; existing replanning authority retained.
Checkout setup: `pnpm install --frozen-lockfile` and focused conversation command
succeeded against the current lockfile (3 suites, 19 tests).

CI: GitHub Actions `ci.yml` (verified ID 381584897, name CI), observing the remote
execution branch from this checkout. Coordinator `tsukasa-timing`, directory
`/tmp/dough-ci-501/watch-TsaXT7`, PID 19100, PTY session 72831, yielded cell 9.
The earlier trunk claim's CI is unobserved by this branch observer.

### 1. Rename a turn and retain its complete speaking performance
Type: Behavior
Status: done
Proof: A registered conversation consuming the renamed/extended script retains each measured full audio slot and matching captions/mouth/acting; current films remain unchanged.

Behavior: Given the retained four-turn script → rename `passed` to `lead` and
update its acting references, or append a valid `question:pause` turn → media,
captions and performance use the authored turn's real position and complete take.

- Drive the real registered composition/metadata and compiler with those scripts.
  First observe failing media starts/durations and speaking/caption drawings;
  setup supplies the retained assets and authored edits, not a corrected schedule.
- Apply one common mapping rule for private clock ranges and public turn IDs.
  Preserve unique authored identities for acting, captions, errors and audio.
  Keep duplicate authored-ID rejection and missing/changed-asset checks intact.
- Assert measured take containment and direct/reverse frame sampling. Compare
  all original/revised frame markup and compiled media/caption records before
  and after the correction; the existing films must remain unchanged. No paid
  speech or unchanged full MP4 rerender is needed if the all-frame/media proof holds.
- Safe stop: the corrected authoring path accepts collision-prone unique names,
  while retained films and assets are preserved.

Accepted proof: `turnNames.spec.tsx` drives the registered full composition and
its metadata with authored edits and actual retained WAV bytes. Before repair,
`pnpm -C terry-moves test:unit --runInBand tests/illustratedConversation/turnNames.spec.tsx`
failed four assertions: audio slots `[0,36]` versus `[36,84]` and `[300,36]`
versus `[522,99]`, plus resting/missing-turn drawings at the real speaking
positions. Duplicate-name rejection already passed.

The same scenarios now prove every media start, complete measured duration and
source, captions and take-local mouths, authored acting and right-hand drawing,
silence, and direct/reverse sampling. `pilot.spec.tsx`, `fullExchange.spec.tsx`
and `reactionRevision.spec.tsx` cover all other compiler consumers and retained
asset validation. Terminal focused proof after the independent test-harness
refactor: `pnpm -C terry-moves test:unit --runInBand tests/illustratedConversation`
passed 4 suites / 24 tests; `pnpm -C terry-moves typecheck` passed.

Disposable public-composition probe captured and compared all 318 pilot, 582
full and 582 thoughtful frame markups, compiled turn/take/media records and
captions. Both
`CONVERSATION_CAPTURE=before pnpm -C terry-moves test:unit --runInBand tests/illustratedConversation/unchangedOutput.probe.spec.tsx`
and the post-repair command without `CONVERSATION_CAPTURE` passed exact equality.
Probe removed after proof; inspectable source and baseline remain at
`/tmp/conversation-turn-name-timing-probe.spec.tsx` and
`/tmp/conversation-turn-name-timing-before.json`. Production/asset boundaries
were unchanged by refactoring, so this proof remains valid.

Learning: clock names now derive solely from private beat order, with one
turn-to-clock mapping. Authored identities remain public for media, acting and
errors; the shared clock API and frame arithmetic are unchanged. Independent
refactoring consolidated only repeated test rendering/fetch setup in
`testSupport.tsx`, retaining all observations. Selective ESLint formatting and
`git diff --check` passed; no generation trigger or outstanding obligation.

## Verification, readiness and delivery

Use `pnpm -C terry-moves test:unit --runInBand tests/illustratedConversation`
and `pnpm -C terry-moves typecheck`, plus selective lint/format for changed TS.
The owned workspace's frozen installation is usable: those focused suites passed
3 suites / 19 tests and typecheck on the reviewed implementation; the public
collision probes above executed successfully and exposed the incorrect result.
New regression assertions must fail for that observed cause before repair.
No shared rig/Python helper change requires repeating their accepted consumer proof.

One outcome and one public proof loop need no slice refinement or numeric budget.
No remaining scope or proof-route concern was identified. Readiness records the
reviewed plan only; selecting/taking/executing the correction remains a separate action.
