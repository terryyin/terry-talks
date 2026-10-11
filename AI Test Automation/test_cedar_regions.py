"""Offline proof of workshop region audition and selection, using real PCM/ffmpeg."""

import contextlib
import io
import json
import tempfile
import unittest
from copy import deepcopy
from pathlib import Path
from unittest.mock import patch

from cedar_region_fixture import RATE, Workshop, narration, regions
from narration_audio import gap_span, read_pcm, run, verify, write_performance, write_script


class RegionCommands(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory(prefix="cedar-regions-test-")
        self.addCleanup(temporary.cleanup)
        self.film = Workshop(Path(temporary.name))
        for module in (narration, regions):
            client = patch.object(module, "cedar_client", side_effect=AssertionError("API client reached"))
            mocked = client.start()
            self.addCleanup(client.stop)
            self.addCleanup(mocked.assert_not_called)

    def test_existing_names_and_request_neighbours(self):
        self.assertEqual(regions.clauses(self.film.script, "sandbox:02-03"), ("sandbox:2-3", 1, 3))
        self.assertEqual(regions.clauses(self.film.script, "investigate:1"), ("investigate:1", 3, 4))
        self.assertEqual(regions.request(self.film.script, "sandbox:2-3"), (
            "sandbox:2-3", "Ask first. Then wait. Show the check. Have it tested.",
            "Then wait. Show the check.", (0, 2, 5, 10)))

    def test_audition_keeps_neighbours_and_durable_film(self):
        film = self.film
        folder = film.candidate()
        before = film.stable_files()
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            self.assertEqual(regions.audition(film.root, film.script, run, RATE, "sandbox:2-3", candidates=0), 0)
        pcm = read_pcm(folder / "candidate-1-in-context.wav", RATE)
        a, b = [round(t * RATE) for t in gap_span(film.words, 2, 7, len(film.base) / RATE)]
        _, end = gap_span(film.words, 0, 10, len(film.base) / RATE)
        half_fade, change = round(0.005 * RATE) // 2, round(0.5 * RATE)
        self.assertEqual(len(pcm), round(end * RATE) + change)
        self.assertEqual(pcm[:a - half_fade], film.base[:a - half_fade])
        self.assertEqual(pcm[b + change + half_fade:], film.base[b + half_fade:round(end * RATE)])
        self.assertIn("(+0.50s against the base take)", output.getvalue())
        self.assertEqual(film.stable_files(), before)

    def test_audition_reports_transcript_diff_and_removes_stale_context(self):
        film = self.film
        folder = film.candidate()
        audible = folder / "candidate-1-in-context.wav"
        audible.write_bytes(b"stale audition")
        evidence = folder / "candidate-1.json"
        record = json.loads(evidence.read_text())
        record["transcript"] = record["transcript"].replace("wait", "pause")
        write_performance(evidence, record)
        before = film.stable_files()
        error = io.StringIO()
        with contextlib.redirect_stderr(error):
            self.assertEqual(regions.audition(film.root, film.script, run, RATE, "sandbox:2-3", candidates=0), 1)
        self.assertIn("- wait", error.getvalue())
        self.assertIn("+ pause", error.getvalue())
        self.assertIn("candidate-1 is not offered for selection.", error.getvalue())
        self.assertFalse(audible.exists())
        self.assertEqual(film.stable_files(), before)

    def test_selection_saves_take_record_timeline_and_reproduces_offline(self):
        film = self.film
        folder = film.candidate()
        original = deepcopy(film.script)
        original_bytes = film.take.read_bytes()
        with contextlib.redirect_stdout(io.StringIO()):
            measured = regions.select(film.root, film.script, run, RATE, "sandbox:2-3", "candidate-1")
        self.assertEqual(film.script, original)
        entry, = film.saved()["regions"]
        self.assertEqual((entry["id"], entry["firstToken"], entry["tokenCount"], entry["takeFirstToken"]),
                         ("sandbox:2-3", 2, 5, 2))
        self.assertEqual(entry["spoken"], "Then wait. Show the check.")
        self.assertEqual(entry["candidate"], "candidate-1")
        self.assertTrue(entry["take"].startswith("terry-moves/public/assets/ai-test-automation/regions/sandbox-2-3-"))
        take = film.root / entry["take"]
        self.assertEqual(take.read_bytes(), (folder / "candidate-1.wav").read_bytes())
        verify(take, entry["takeSha256"])
        self.assertEqual(film.take.read_bytes(), original_bytes)
        self.assertEqual(film.saved()["baseWords"], film.words)
        self.assertEqual(measured["scenes"][0]["captionRanges"][0], original["scenes"][0]["captionRanges"][0])
        for new_scene, old_scene in zip(measured["scenes"][1:], original["scenes"][1:]):
            self.assertAlmostEqual(new_scene["start"] - old_scene["start"], 0.5)
            for new, old in zip(new_scene["captionRanges"], old_scene["captionRanges"]):
                self.assertAlmostEqual(new["speechStart"] - old["speechStart"], 0.5)
                self.assertAlmostEqual(new["speechEnd"] - old["speechEnd"], 0.5)
                for token in old["wordCues"]:
                    self.assertAlmostEqual(new["wordCues"][token] - old["wordCues"][token], 0.5)
        write_script(film.script_path, measured)
        prepared, report = narration.performance(film.root, measured, run, RATE)
        self.assertEqual(report, film.saved())
        verify(prepared, report["preparedSha256"])
        pcm = read_pcm(prepared, RATE)
        self.assertEqual(len(pcm) - len(film.base), round(0.5 * RATE))
        a, b = [round(t * RATE) for t in gap_span(film.words, 2, 7, len(film.base) / RATE)]
        half_fade = round(0.005 * RATE) // 2
        self.assertEqual(pcm[:a - half_fade], film.base[:a - half_fade])
        self.assertEqual(pcm[b + round(0.5 * RATE) + half_fade:], film.base[b + half_fade:])
        replayed = deepcopy(measured)
        with contextlib.redirect_stdout(io.StringIO()):
            narration.align(replayed, pcm, report, RATE)
        self.assertEqual(replayed, measured)
        self.assertEqual(json.loads(film.script_path.read_text()), measured)

    def assert_refused_unchanged(self, region, candidate, sentence):
        before, script = self.film.stable_files(), deepcopy(self.film.script)
        with self.assertRaisesRegex(ValueError, sentence):
            regions.select(self.film.root, self.film.script, run, RATE, region, candidate)
        self.assertEqual(self.film.stable_files(), before)
        self.assertEqual(self.film.script, script)

    def test_unknown_candidate_refuses_without_durable_writes(self):
        self.assert_refused_unchanged("sandbox:2-3", "candidate-99", "sandbox:2-3 has no saved candidate 'candidate-99'")

    def test_ceiling_refuses_without_durable_writes(self):
        self.film.candidate()
        ceiling = self.film.script["duration"]
        with patch.object(regions, "CEILING", ceiling):
            self.assert_refused_unchanged("sandbox:2-3", "candidate-1",
                                         "beyond its .* s ceiling, so it is not applied; choose a shorter candidate")

    def test_edited_transcript_refuses_without_durable_writes(self):
        folder = self.film.candidate()
        evidence = folder / "candidate-1.json"
        record = json.loads(evidence.read_text())
        record["transcript"] = record["transcript"].replace("wait", "pause")
        write_performance(evidence, record)
        self.assert_refused_unchanged("sandbox:2-3", "candidate-1",
                                     "candidate-1 measured transcription differs.*- wait.*\\+ pause.*cannot be selected")

    def test_overlap_refuses_without_durable_writes(self):
        self.film.candidate()
        self.film.select()
        self.film.candidate("sandbox:1-2")
        self.assert_refused_unchanged("sandbox:1-2", "candidate-1",
                                     "sandbox:1-2 overlaps the replaced region sandbox:2-3; select that region again")

    def test_second_region_and_reselection_keep_other_take_and_remove_previous(self):
        film = self.film
        film.candidate()
        film.select()
        first, = film.saved()["regions"]
        film.candidate("investigate:1-2", change=0.25)
        film.select("investigate:1-2")
        both = film.saved()
        self.assertEqual([entry["id"] for entry in both["regions"]], ["sandbox:2-3", "investigate:1-2"])
        self.assertEqual(both["regions"][0], first)
        second = both["regions"][1]
        second_bytes = (film.root / second["take"]).read_bytes()
        film.candidate(name="candidate-2", change=0.125)
        film.select(candidate="candidate-2")
        saved = film.saved()
        self.assertEqual(saved["regions"][1], second)
        self.assertEqual((film.root / second["take"]).read_bytes(), second_bytes)
        self.assertFalse((film.root / first["take"]).exists())
        self.assertTrue((film.root / saved["regions"][0]["take"]).exists())
        self.assertEqual(saved["regions"][0]["candidate"], "candidate-2")
        self.assertEqual(saved["baseWords"], film.words)
        prepared, report = narration.performance(film.root, film.script, run, RATE)
        verify(prepared, report["preparedSha256"])
        self.assertEqual(len(read_pcm(prepared, RATE)) - len(film.base), round(0.375 * RATE))


if __name__ == "__main__":
    unittest.main()
