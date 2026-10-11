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
| Selection is drivable offline against a temporary root, and a cross-scene selection writes a coherent record, take and script | `select(root, script, run, sample_rate, region, candidate)`, followed by `write_script`, `performance` and `align` | Fresh 2026-10-12 observation in this preparation's named checkout, using the synthetic film and literal command below: cross-scene candidate selected; saved take/hash, record/token span and serialized script agree; offline replay reproduces them; retained PCM matches outside the join fades; no API client or tracked write | Settled: no production change is needed to drive selection on a temporary root |
| The current proof is green | the three commands below | `python3 -m unittest discover -s scripts -p 'test_*.py'`: 13 tests OK in 1.4 s; `python3 'AI Test Automation/produce_audio.py'`: `Complete: 80.267s / 2408 frames.` with `git status --short` empty; jest `tests/aiTestAutomation`: 2 suites, 11 tests passed | Settled |

## Selection premise observation

On 2026-10-12, Mana-chan ran the command below from the established owned
workspace
`/Users/terryyin/git/terry-talks/.worktrees/terry-can-replace-a-narration-region-that-crosse`,
branch `codex/terry-can-replace-a-narration-region-that-crosse`, at
`8c5dffd6ace904711721d2b09ba545678a35974c`. The approved script's cross-scene
naming refusal reproduced first. Only `clauses()` was replaced in memory
to supply the proposed name and flat caption range; selection, trimming,
composition, alignment, manifest verification and script serialization were
the checkout's existing implementations. Both client constructors failed if
reached. All fixture writes were under a temporary root, which was removed.

Inspected setup: the temporary root's
`AI Test Automation/film-script.json`, `cedar-performance.json`, base take,
prepared base and `auditions/sandbox:3-investigate:1/candidate-1.{wav,json}`.
Inspected outcomes: the selected region take, saved record, serialized
measured script, composed PCM and a fresh offline `performance()`/`align()`
replay in that same root.

Result: the command exited 0. Audition refused no candidate and produced
8.75 s in context; selection wrote region `sandbox:3-investigate:1` with
first token 4, token count 6 and take-first token 2. Its region is 0.50 s
longer. The scene boundary inside the region followed the candidate's gap
midpoint, from frame 160 to frame 167 at 30 fps; the later scene moved 15
frames. It is the gap midpoint, rounded to a frame, rather than the full
duration change that moves a boundary inside the changed gap. Offline replay
matched the saved words, prepared hash and serialized script; retained samples
matched outside the 5 ms join fades. Every tracked file's SHA-256 stayed the
same and the checkout remained clean. No API client was reached.

The command is preparation evidence, not delivery proof or completed slices.
Slice 1 still owns the repeatable tests and refusal discrimination; slice 2
still owns accepting the name through the real parser. The current shared
helper suite also passed:
`PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s scripts -p 'test_*.py'`
(13 tests, 0.310 s).

Literal command (run before this preparation record made the checkout dirty):

```sh
PYTHONDONTWRITEBYTECODE=1 PYTHONPATH='scripts:AI Test Automation' python3 - <<'PY'
import contextlib
import io
import json
import random
import subprocess
import tempfile
from array import array
from copy import deepcopy
from pathlib import Path
from unittest.mock import patch
import cedar_narration as narration
import cedar_regions as regions
from narration_audio import (gap_span, narration_text, read_pcm, run, sha256,
                             tokens, verify, write_pcm, write_performance, write_script)

checkout = Path.cwd()
tracked = subprocess.check_output(["git", "ls-files", "-z"]).split(b"\0")
before = {p: sha256(checkout / p.decode()) for p in tracked if p and (checkout / p.decode()).is_file()}
rate, name, change = 48000, "sandbox:3-investigate:1", 0.5
approved = json.loads((checkout / "AI Test Automation/film-script.json").read_text())
try:
    regions.request(approved, name)
except ValueError as refusal:
    print(f"Current naming refusal: {refusal}")
else:
    raise AssertionError("The reported naming symptom no longer reproduces")

with tempfile.TemporaryDirectory(prefix="narration-region-readiness-") as temporary:
    root = Path(temporary)
    work = root / "terry-moves/out/ai-test-automation-audio"
    assets = root / "terry-moves/public/assets/ai-test-automation"
    for folder in (work, assets, root / "AI Test Automation"):
        folder.mkdir(parents=True, exist_ok=True)
    script = {"fps": 30, "scenes": [
        {"id": scene, "captionRanges": [{"spoken": clause, "text": clause} for clause in clauses]}
        for scene, clauses in (
            ("sandbox", ["Ask first.", "Then wait.", "Show the check."]),
            ("investigate", ["Have it tested.", "It is done."]),
            ("end", ["Finish now."]))]}
    text = narration_text(script)
    words = [{"word": word, "start": 0.25 + index * 0.75, "end": 0.5 + index * 0.75}
             for index, word in enumerate(text.split())]
    source = random.Random(32)
    base_take, base_prepared = assets / "cedar-take.wav", work / "cedar-prepared.wav"
    write_pcm(base_take, array("h", (source.randrange(-9000, 9000) for _ in range(round(11.25 * rate)))), rate)
    narration.prepare(base_take, base_prepared, run, rate)
    base = read_pcm(base_prepared, rate)
    report = {"model": "fixture", "voice": "fixture", "direction": "synthetic PCM; no speech request",
              "script": text, "transcript": text, "unpromptedTranscript": text,
              "words": words, "regions": [], "takeSha256": sha256(base_take),
              "preparedSha256": sha256(base_prepared)}
    write_performance(narration.record_path(root), report)
    with contextlib.redirect_stdout(io.StringIO()):
        narration.align(script, base, report, rate)
    original = deepcopy(script)
    script_path = root / "AI Test Automation/film-script.json"
    write_script(script_path, script)
    script_before, record_before = sha256(script_path), sha256(narration.record_path(root))
    with patch.object(regions, "clauses", return_value=(name, 2, 4)), \
         patch.object(narration, "cedar_client", side_effect=AssertionError("API client reached")) as client, \
         patch.object(regions, "cedar_client", side_effect=AssertionError("API client reached")):
        _, request_text, spoken, spans = regions.request(script, name)
        assert spans == (2, 2, 6, 11)
        folder = work / "auditions" / name
        folder.mkdir(parents=True)
        candidate_take, candidate_prepared = folder / "candidate-1.wav", folder / "candidate-1-prepared.wav"
        excerpt = base[round(1.5 * rate):round(9.75 * rate)]
        at = round(3.75 * rate)
        extra = array("h", (source.randrange(-9000, 9000) for _ in range(round(change * rate))))
        write_pcm(candidate_take, excerpt[:at] + extra + excerpt[at:], rate)
        narration.prepare(candidate_take, candidate_prepared, run, rate)
        candidate_words = [{**word, "start": word["start"] - 1.5 + (change if index >= 7 else 0),
                           "end": word["end"] - 1.5 + (change if index >= 7 else 0)}
                          for index, word in enumerate(words) if 2 <= index < 13]
        write_performance(folder / "candidate-1.json", {
            "region": name, "note": "", "requestText": request_text, "model": "fixture", "voice": "fixture",
            "direction": "synthetic PCM", "alignmentModel": "fixture", "transcript": request_text,
            "transcriptSource": "synthetic measured-word fixture", "words": candidate_words,
            "takeSha256": sha256(candidate_take), "preparedSha256": sha256(candidate_prepared)})
        assert regions.audition(root, script, run, rate, name, candidates=0) == 0
        assert sha256(script_path) == script_before and sha256(narration.record_path(root)) == record_before
        selected = regions.select(root, script, run, rate, name, "candidate-1")
        assert script == original
        write_script(script_path, selected)  # Same serializer as produce_audio.main().
        saved = json.loads(narration.record_path(root).read_text())
        entry, = saved["regions"]
        assert (entry["id"], entry["firstToken"], entry["tokenCount"], entry["takeFirstToken"]) == (name, 4, 6, 2)
        assert entry["spoken"] == spoken and saved["baseWords"] == words
        assert (root / entry["take"]).read_bytes() == candidate_take.read_bytes()
        verify(root / entry["take"], entry["takeSha256"])
        composed_path, reproduced = narration.performance(root, selected, run, rate)
        verify(composed_path, saved["preparedSha256"])
        assert reproduced == saved
        composed = read_pcm(composed_path, rate)
        assert len(composed) - len(base) == round(change * rate)
        a, b = (round(t * rate) for t in gap_span(words, 4, 10, len(base) / rate))
        half_fade = round(0.005 * rate) // 2
        assert composed[:a - half_fade] == base[:a - half_fade]
        assert composed[b + round(change * rate) + half_fade:] == base[b + half_fade:]
        old, new = original["scenes"], selected["scenes"]
        assert new[0]["captionRanges"][:2] == old[0]["captionRanges"][:2]
        expected_boundary = round(((words[6]["end"] + words[7]["start"] + change) / 2 + narration.LEAD) * 30) / 30
        assert new[0]["end"] == new[1]["start"] == expected_boundary
        assert new[2]["start"] == old[2]["start"] + change
        replayed = deepcopy(selected)
        with contextlib.redirect_stdout(io.StringIO()):
            narration.align(replayed, composed, saved, rate)
        assert replayed == selected == json.loads(script_path.read_text())
        client.assert_not_called()
        print(json.dumps({"result": "PASS", "region": entry["id"],
                          "tokenSpan": [entry["firstToken"], entry["tokenCount"]],
                          "audioChangeSeconds": (len(composed) - len(base)) / rate,
                          "sceneBoundaryBefore": old[1]["start"], "sceneBoundaryAfter": new[1]["start"],
                          "replayMatchesRecordAndScript": True, "retainedSamplesMatchOutsideFades": True}))
after = {p: sha256(checkout / p.decode()) for p in tracked if p and (checkout / p.decode()).is_file()}
assert before == after, "A tracked file changed"
assert not subprocess.check_output(["git", "status", "--porcelain"]).strip(), "Checkout is not clean"
print("All tracked files unchanged; temporary film removed; no API client reached.")
PY
```

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
test-suite weakness (finding 2); the preparation observation has settled its
selection premise, and slice 2 then changes naming under this proof.

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
and one naming behavior proved through it. The fresh fixture observation above
settles the previously open selection premise in the named preparation
checkout. This review found no remaining slice-specific concern; the goal,
bounded correction scope and proof ownership remain unchanged. Both slices
remain planned. No numeric slice limit is supplied and none is invented.
This plan grants no Take, queue priority, implementation or publication
authority.
