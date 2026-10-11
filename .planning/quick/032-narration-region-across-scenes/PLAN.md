# Terry replaces a narration region that crosses a scene boundary, under repeatable proof

## Source

Identity: terry-moves-filmmaking#narration-region-across-scenes
Story: [narration region across scenes](../../../terry-moves/seed.md#narration-region-across-scenes).
Bounded correction from the completed planned
`terry-moves-filmmaking#replace-narration-performance` execution
(story section `replace-narration-performance` of `terry-moves/seed.md` and
plan `.planning/quick/031-replace-narration-performance/PLAN.md`, both at
commit `ddb9ff50bc32e87ade6151adb2cd540abd1f032b`), which started at
`6d2681a127080ed3217b281d24710f161653c716`. The attributable published
implementation set on `origin/claude/i-can-replace-one-narration-performance-without`
is `a6a9291` (audition), `dd3e13e` (effects follow the measured script),
`358d950` (manifest of saved takes), `5ed27bd` (selection) and `f52bae4`
(Terry's chosen take). `f6eb4d6` is the claim and `41dc29a` plan progress;
both are provenance. The range `6d2681a..f52bae4` holds only these commits.

## Current findings and impact

Observed at `f52bae4` in the execution checkout on 2026-10-11.

1. **A region that crosses a scene boundary cannot be named.** The story's
   region is "one or more consecutive caption clauses of the film's script",
   and "nothing in the path depends on whether the region lies inside one
   scene". `clauses()` in `AI Test Automation/cedar_regions.py` (lines 19–34)
   accepts only `<scene>:<first>-<last>` within one scene's clause count:
   `sandbox:3-4` is refused with "Scene 'sandbox' has 3 clauses, so
   sandbox:3-4 names no region of it." and `sandbox:3-investigate:1` with the
   naming message. The executed plan decided that name form without recording
   the narrowing as an exclusion or an obligation. Terry cannot re-perform a
   phrase such as "Show AI your manual checks. Have it perform similar
   tests:", which runs from `sandbox` into `investigate`, although everything
   after naming already works on the flat list of clauses.
2. **The region commands have no repeatable proof.** `scripts/test_narration_audio.py`
   (13 tests) covers the shared helper only. Nothing imports
   `cedar_regions.py`: naming, the request text and token spans, the
   in-context audition, selection, the mismatched-transcript, ceiling,
   unknown-candidate and overlap refusals that must write nothing, the second
   region, re-selection and removal of the replaced take (story examples 3, 5
   and 6) were accepted from one-off runs with fixtures kept in
   `/tmp/audition-proof/`, which the executed plan's Learnings call
   disposable. The unittest command itself is recorded only in that plan,
   which wrap-up removes; `terry-moves/package.json` `test` does not run it
   and the repository has no CI. A refusal that stops refusing would
   overwrite the approved film's tracked take, record and script, and the next
   change to this path (finding 1) has nothing to run against.

There is no defect in the delivered film: its narration, script, stems, mix
and treatment reproduce byte-identically and need no re-render.

## Goal and scope

Terry can audition and select a region whose clauses run from one scene into
the next, and the region commands he already has keep their behavior under
proof that runs offline in seconds.

- Included: a name form for a region whose first and last clauses lie in
  different scenes; the refusals for an unknown scene or clause at either end
  and for an end before its start; the existing `<scene>:<first>-<last>` and
  `<scene>:<n>` names unchanged, including the recorded `investigate:4-6`;
  repeatable offline proof of audition and selection beside the workshop
  producer; the proof commands stated in `AI Test Automation/README.md`.
- Excluded: any paid request (every audition in this correction uses
  `--candidates 0` or no producer run at all); a new selection on the
  approved film; naming a region by its exact words; restoring a replaced
  region to the base take; changing a replaced region's bounds; the other
  Cedar films' producers; removing region take files on `--new-take`; a
  generic fixture framework; wiring Python tests into `pnpm test`.
- Preserve: every promise of the reviewed story, in particular that
  candidates stay in the ignored work directory until a selection, that a
  refusal writes nothing, that retained audio is sample-identical outside the
  region and that offline reproduction verifies every saved take by hash.

## Existing solutions and decisive premises

- PFE: `clauses()` is the only place a region name is read; `request()`
  (lines 77–85) already works on the flat list of spoken clauses and passes
  token spans to `candidate_in_context()`, `select()` and the shared
  `select_region()`, which position a region in script tokens. The record id,
  the audition folder and the take file name
  (`name.replace(':', '-')`, line 116) derive from the name. Extend
  `clauses()`; add no second region model. `git grep -n 'investigate:4-6'`
  finds the name only in the record, the README sentence, the generated
  treatment and two message examples, so an additional name form reaches no
  other consumer.
- Test home: the project has no Python test convention beyond
  `scripts/test_narration_audio.py`, which sits beside the helper it proves
  and is 248 lines against the 250-line limit, with `noise`, `spoken` and
  `moved` fixtures on synthetic PCM. The region commands belong to the
  workshop producer, so their proof sits beside it under `AI Test Automation/`.
- Only ADR-0000 (use ADRs) is Accepted; no decision constrains this
  correction and no North Star topic is warranted. The backlog direction is
  unchanged.

| Premise | Consuming operation | Observation | Result |
| --- | --- | --- | --- |
| A cross-scene region is refused today | `request(script, …)` on the approved script | `sandbox:3-4`, `sandbox:3-investigate:1` and `investigate:6-4` each raise the messages quoted above; `investigate:4-6`, `sandbox:3`, `hook:1` and `end:2` return their request text and spans | Settled: the symptom reproduces |
| Everything after naming handles a region that crosses scenes | `audition(root, script, run, 48000, region, candidates=0)` | Scratch run outside the repository on a temporary root with three synthetic scenes (3, 2 and 1 clauses), a noise take, a record and one fixture candidate 0.5 s longer; `clauses` replaced in memory by a stand-in returning flat captions 2–4 (last clause of the first scene, first of the second). Request text "Then wait. Show the check. Have it tested. It is done.", spans (2, 2, 6, 11); output "region 5.00s (+0.50s against the base take); 8.75s in context", 8.75 s being the retained 8.25 s span plus 0.5 s; 0 refused | Settled for audition |
| The audition is drivable offline against a temporary root | same run | The client constructor was replaced by a stop and never reached; `prepare` trimmed the synthetic take and candidate deterministically (960 samples each); the temporary root held every written file; `git status --short` in the checkout stayed empty | Settled |
| Selection is drivable offline against a temporary root, and a cross-scene selection writes a coherent record, take and script | `select(root, script, run, sample_rate, region, candidate)` | Not observed: the review that wrote this plan was forbidden to run a selection. Reading shows every write is under `root` (`record_path(root)`, `root / take`, the work directory from `performance(root, …)`; `cedar_regions.py` 129–163, `cedar_narration.py` 81–105) and no client is constructed | Open. It is cheap to observe (a fixture selection in a temporary root, as the audition above) and slice 1 reaches it first: if selection cannot be driven there without a production change, stop and replan |
| The current proof is green | the three commands below | `python3 -m unittest discover -s scripts -p 'test_*.py'`: 13 tests OK in 1.4 s; `python3 'AI Test Automation/produce_audio.py'`: `Complete: 80.267s / 2408 frames.` with `git status --short` empty; jest `tests/aiTestAutomation`: 2 suites, 11 tests passed | Settled |

## Proof ownership

| Promise | Owner | Observable proof |
| --- | --- | --- |
| The delivered audition behavior is kept (reviewed story example 3 and the audit half of 5) | 1 | Tests drive `audition(…, candidates=0)` on a temporary synthetic film: an audited fixture candidate gets an in-context file whose length is the retained span plus the candidate's region change, with retained samples identical on both sides; a candidate whose transcript differs is reported with the differing tokens, counted as refused and has no in-context file; the take, record and script under the root are byte-identical afterwards |
| The delivered selection behavior is kept (examples 1, 2, 5 and 6) | 1 | Tests drive `select(…)` on the same film: the region take, record entry and returned script appear only under the root; clauses before the region keep their cues, later clauses shift by the region's change; a selection past the ceiling, an unknown candidate, an edited transcript and a region overlapping a replaced one each raise their sentence and leave every file under the root byte-identical; a second region is listed after the first; re-selecting a region replaces only its entry and removes its previous take file |
| Each refusal test discriminates | 1 | For the ceiling, mismatch and overlap tests, one scratch edit disabling the refusal in the checkout makes that test fail; the edit is reverted before any commit |
| The proof can be found and run after the plans are gone | 1 | `AI Test Automation/README.md` states both unittest commands; running them as written passes |
| The approved film is unchanged | 1, 2 | `python3 'AI Test Automation/produce_audio.py'` prints `Complete: 80.267s / 2408 frames.` and `git status --short` lists only the intended source, test and README files |
| A region running from one scene into the next is accepted | 2 | Tests through slice 1's fixtures: the cross-scene name yields the preceding clause, the region and the following clause as request text; its audition writes the in-context file; its selection writes a record entry with that id, a take file named from it and a script whose scene boundary inside the region follows the candidate's cues. On the approved film, `--audition sandbox:3-investigate:1 --candidates 0` exits 0 with no request and no tracked change |
| Names that cannot be a region are refused plainly | 2 | Tests: an unknown scene or an out-of-range clause at either end names that scene's clause count; an end before its start is refused; each is one sentence and writes nothing |
| Existing names keep working | 2 | Tests for `<scene>:<n>` and `<scene>:<first>-<last>` unchanged from slice 1; offline reproduction still reads the recorded `investigate:4-6` |

Commands, from the repository root with the system `python3` (never
`python3 -I`): `python3 -m unittest discover -s scripts -p 'test_*.py'`, the
new discovery under `AI Test Automation/`, and
`python3 'AI Test Automation/produce_audio.py'` followed by
`git status --short`. No jest, lint, tsc or render gate is required: this
correction changes no file that `terry-moves` tests or the film read. If an
asset, the script or the record does change, that is a failure of the
preservation promise, not a reason to widen the gate.

## Ordered slices

### 1. The region audition and selection commands are held by repeatable offline proof
Type: Structure
Status: planned
Proof: the new unittest module beside the workshop producer passes without a
network or key; the ceiling, mismatch and overlap tests each fail under one
scratch edit that disables the refusal; the existing 13 tests pass; the
offline producer reproduces `Complete: 80.267s / 2408 frames.` with
`git status --short` listing only the new test file and the README.

Structure: add tests that drive `audition(…, candidates=0)` and `select(…)`
from `cedar_regions.py` against a temporary root holding a small synthetic
film (script, noise take, record, fixture candidates), with the client
constructor replaced by a failure so no request can be made. They observe the
behavior the reviewed execution accepted from one-off runs, as mapped above,
and change no production behavior. State the two unittest commands in
`AI Test Automation/README.md`. This slice directly owns the evidenced
test-suite weakness (finding 2) and reaches the open selection premise
first; slice 2 then changes naming under this proof.

### 2. Terry names a region that runs from one scene into the next
Type: Behavior
Status: planned
Proof: slice 1's module gains the cross-scene naming, audition, selection and
refusal tests mapped above and passes; on the approved film
`python3 'AI Test Automation/produce_audio.py' --audition sandbox:3-investigate:1 --candidates 0`
exits 0 and `git status --short` shows no tracked asset, script or record
change; offline reproduction is unchanged.

Behavior: with the approved workshop, Terry names a region by its first and
last clause in different scenes and runs `--audition` or `--select` with it →
the producer treats it as that run of consecutive clauses exactly as it treats
a single-scene region: the same request shape, audit, in-context file, record
entry, take file and derived timeline. A name whose scene or clause does not
exist at either end, or whose end precedes its start, is refused in one
sentence naming the scene's clause count. The producer's usage text, the
naming refusal and the README state the form.

## Current decisions

- Name form: `<scene>:<n>-<scene>:<m>`, for example `sandbox:3-investigate:1`,
  beside the unchanged `<scene>:<first>-<last>` and `<scene>:<n>`. The name
  Terry typed, normalized as today, is the record id; the audition folder and
  take file name derive from it as today. No scene id currently contains a
  hyphen or a colon; if that ever changes, the parser's rule is revisited
  then.
- A region is identified by its token span, as `select_region()` already
  does, so the same clauses named two ways are the same region for overlap;
  whether two spellings of one span should share one record id is decided
  only if slice 2's tests show a second entry can arise.
- The proof drives `audition` and `select`, the functions the producer's
  `main()` delegates to, because `main()` is bound to the repository root and
  the soundtrack builders to the real scene ids; the command line itself is
  observed once on the approved film in slice 2.
- Tests may shorten the ceiling through the module's own constant rather than
  synthesize 85 s of audio; they do not widen any production signature for
  testing.
- No paid request and no selection on the approved film belong to this
  correction.

## Concern review

Slice-plan refinement was not needed: two slices, one preserving proof loop
and one naming behavior proved through it. One concern remains: the premise
that `select()` runs in a temporary root is unobserved, because the review
writing this plan could not run a selection. It blocks readiness until a
fixture selection in a temporary root is observed; slice 1 reaches that
operation first. No numeric
slice limit is supplied and none is invented. This plan grants no Take, queue
priority, implementation or publication authority.
