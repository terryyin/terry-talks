"""Cross-scene naming through real offline workshop audition and selection."""

import contextlib
import io
import json
import unittest
from copy import deepcopy

from cedar_region_fixture import RATE, WorkshopTestCase, narration, regions
from narration_audio import gap_span, read_pcm, run, tokens, verify


REGION = "sandbox:3-investigate:1"


class CrossSceneRegions(WorkshopTestCase):
    def test_cross_scene_names_normalize_and_request_retained_neighbours(self):
        script = self.film.script
        self.assertEqual(regions.clauses(script, "sandbox:03-investigate:01"), (REGION, 2, 4))
        self.assertEqual(regions.clauses(script, "sandbox:3-end:1"), ("sandbox:3-end:1", 2, 6))
        self.assertEqual(regions.clauses(script, "sandbox:02-02"), ("sandbox:2", 1, 2))
        self.assertEqual(regions.clauses(script, "sandbox:2-sandbox:3"), ("sandbox:2-sandbox:3", 1, 3))
        self.assertEqual(regions.request(script, REGION), (
            REGION, "Then wait. Show the check. Have it tested. It is done.",
            "Show the check. Have it tested.", (2, 2, 6, 11)))

    def test_cross_scene_audition_preserves_retained_pcm_and_durable_files(self):
        film = self.film
        folder = film.candidate(REGION)
        before = film.stable_files()
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            self.assertEqual(regions.audition(film.root, film.script, run, RATE, REGION, candidates=0), 0)
        pcm = read_pcm(folder / "candidate-1-in-context.wav", RATE)
        duration = len(film.base) / RATE
        a, b = [round(t * RATE) for t in gap_span(film.words, 4, 10, duration)]
        start, end = [round(t * RATE) for t in gap_span(film.words, 2, 13, duration)]
        half_fade, change = round(0.005 * RATE) // 2, round(0.5 * RATE)
        self.assertEqual(len(pcm), end - start + change)
        self.assertEqual(pcm[:a - start - half_fade], film.base[start:a - half_fade])
        self.assertEqual(pcm[b - start + change + half_fade:], film.base[b + half_fade:end])
        self.assertIn("(+0.50s against the base take)", output.getvalue())
        self.assertEqual(film.stable_files(), before)

    def test_cross_scene_selection_uses_candidate_cues_and_replays_offline(self):
        film = self.film
        folder = film.candidate(REGION)
        candidate = json.loads((folder / "candidate-1.json").read_text())
        original = deepcopy(film.script)
        base_bytes = film.take.read_bytes()
        measured = film.select(REGION)
        entry, = film.saved()["regions"]
        self.assertEqual((entry["id"], entry["firstToken"], entry["tokenCount"], entry["takeFirstToken"]),
                         (REGION, 4, 6, 2))
        self.assertEqual(entry["spoken"], "Show the check. Have it tested.")
        self.assertEqual(entry["words"], candidate["words"])
        self.assertEqual(entry["candidate"], "candidate-1")
        self.assertEqual(entry["take"], "terry-moves/public/assets/ai-test-automation/regions/"
                         f"sandbox-3-investigate-1-{candidate['takeSha256'][:12]}.wav")
        take = film.root / entry["take"]
        self.assertEqual(take.read_bytes(), (folder / "candidate-1.wav").read_bytes())
        verify(take, entry["takeSha256"])
        self.assertEqual(film.take.read_bytes(), base_bytes)
        self.assertEqual(film.saved()["baseWords"], film.words)
        self.assertEqual(measured["scenes"][0]["captionRanges"][0], original["scenes"][0]["captionRanges"][0])
        # Locate the new internal scene boundary from the saved candidate's own measurements.
        start, _ = gap_span(film.words, 4, 10, len(film.base) / RATE)
        take_pcm = read_pcm(folder / "candidate-1-prepared.wav", RATE)
        take_start, _ = gap_span(candidate["words"], 2, 8, len(take_pcm) / RATE)
        offset = (round(start * RATE) - round(take_start * RATE)) / RATE
        boundary = round(((candidate["words"][4]["end"] + candidate["words"][5]["start"]) / 2
                          + offset + narration.LEAD) * measured["fps"])
        self.assertEqual(round(measured["scenes"][1]["start"] * measured["fps"]), boundary)
        self.assertEqual(measured["scenes"][0]["end"], boundary / measured["fps"])
        self.assertNotEqual(measured["scenes"][1]["start"], original["scenes"][1]["start"])
        for caption, words in ((measured["scenes"][0]["captionRanges"][2], candidate["words"][2:5]),
                               (measured["scenes"][1]["captionRanges"][0], candidate["words"][5:8])):
            self.assertAlmostEqual(caption["speechStart"], words[0]["start"] + offset + narration.LEAD)
            self.assertAlmostEqual(caption["speechEnd"], words[-1]["end"] + offset + narration.LEAD)
            for word in words:
                self.assertAlmostEqual(caption["wordCues"][tokens(word["word"])[0]],
                                       word["start"] + offset + narration.LEAD)
        self.assertAlmostEqual(measured["scenes"][2]["start"] - original["scenes"][2]["start"], 0.5)
        prepared, report = narration.performance(film.root, measured, run, RATE)
        self.assertEqual(report, film.saved())
        verify(prepared, report["preparedSha256"])
        pcm = read_pcm(prepared, RATE)
        self.assertEqual(len(pcm) - len(film.base), round(0.5 * RATE))
        a, b = [round(t * RATE) for t in gap_span(film.words, 4, 10, len(film.base) / RATE)]
        half_fade = round(0.005 * RATE) // 2
        self.assertEqual(pcm[:a - half_fade], film.base[:a - half_fade])
        self.assertEqual(pcm[b + round(0.5 * RATE) + half_fade:], film.base[b + half_fade:])
        replayed = deepcopy(measured)
        with contextlib.redirect_stdout(io.StringIO()):
            narration.align(replayed, pcm, report, RATE)
        self.assertEqual(replayed, measured)
        self.assertEqual(json.loads(film.script_path.read_text()), measured)

    def test_bad_names_refuse_in_one_sentence_before_any_write(self):
        known = "sandbox (3), investigate (2), end (1)"
        cases = {
            "sandbox:3-investigate": "Name a region as <scene>:<n>, <scene>:<first>-<last> or <scene>:<n>-<scene>:<m>, such as sandbox:3-investigate:1, not 'sandbox:3-investigate'.",
            "missing:1-investigate:1": f"The script has no scene 'missing'; its scenes and clause counts are {known}.",
            "sandbox:3-missing:1": f"The script has no scene 'missing'; its scenes and clause counts are {known}.",
            "sandbox:0-investigate:1": "Scene 'sandbox' has 3 clauses, so sandbox:0-investigate:1 names no region of it.",
            "sandbox:4-investigate:1": "Scene 'sandbox' has 3 clauses, so sandbox:4-investigate:1 names no region of it.",
            "sandbox:3-investigate:0": "Scene 'investigate' has 2 clauses, so sandbox:3-investigate:0 names no region of it.",
            "sandbox:3-investigate:3": "Scene 'investigate' has 2 clauses, so sandbox:3-investigate:3 names no region of it.",
            "investigate:1-sandbox:3": "The end of investigate:1-sandbox:3 precedes its start; scene 'investigate' has 2 clauses and scene 'sandbox' has 3 clauses.",
            "sandbox:3-2": "The end of sandbox:3-2 precedes its start; scene 'sandbox' has 3 clauses and scene 'sandbox' has 3 clauses.",
        }
        film = self.film
        before = {path.relative_to(film.root): path.read_bytes() for path in film.root.rglob("*") if path.is_file()}
        script = deepcopy(film.script)
        for region, sentence in cases.items():
            for operation in ("audition", "select"):
                with self.subTest(region=region, operation=operation):
                    with self.assertRaises(ValueError) as refusal:
                        if operation == "audition":
                            regions.audition(film.root, film.script, run, RATE, region, candidates=0)
                        else:
                            regions.select(film.root, film.script, run, RATE, region, "candidate-1")
                    self.assertEqual(str(refusal.exception), sentence)
                    self.assertEqual(sentence.count("."), 1)
                    self.assertEqual({path.relative_to(film.root): path.read_bytes()
                                      for path in film.root.rglob("*") if path.is_file()}, before)
                    self.assertEqual(film.script, script)

    def test_same_span_under_another_spelling_refuses_without_durable_writes(self):
        film = self.film
        film.candidate()
        film.select()
        alternate = "sandbox:2-sandbox:3"
        film.candidate(alternate)
        before, script = film.stable_files(), deepcopy(film.script)
        with self.assertRaisesRegex(ValueError, "sandbox:2-sandbox:3 overlaps the replaced region sandbox:2-3"):
            regions.select(film.root, film.script, run, RATE, alternate, "candidate-1")
        self.assertEqual(film.stable_files(), before)
        self.assertEqual(film.script, script)
        self.assertEqual([entry["id"] for entry in film.saved()["regions"]], ["sandbox:2-3"])


if __name__ == "__main__":
    unittest.main()
