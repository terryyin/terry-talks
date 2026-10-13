"""Failure boundaries of the motion-led Jidoka narration producer; no API requests."""

from array import array
import importlib.util
from pathlib import Path
from tempfile import TemporaryDirectory
from types import SimpleNamespace
import unittest
from unittest.mock import Mock, patch

spec = importlib.util.spec_from_file_location(
    "jidoka_narration", Path(__file__).with_name("jidoka-narration.py"))
film = importlib.util.module_from_spec(spec)
spec.loader.exec_module(film)


class NarrationBoundaries(unittest.TestCase):
    def test_waveform_gaps_preserve_words_when_asr_boundaries_are_late(self):
        script = {"duration": 4, "scenes": [{"id": "contrast", "captionRanges": [
            {"start": 0, "end": 2, "spoken": "Stop"},
            {"start": 2, "end": 4, "spoken": "Move"}]}]}
        report = {"script": "Stop Move", "transcript": "Stop Move", "words": [
            {"word": "Stop", "start": 0.9, "end": 1.05},
            {"word": "Move", "start": 1.52, "end": 1.9}]}
        pcm = array("h", [0] * round(2.1 * film.RATE))
        pcm[round(0.2 * film.RATE):round(0.8 * film.RATE)] = array("h", [1000] * round(0.6 * film.RATE))
        pcm[round(1.3 * film.RATE):round(1.9 * film.RATE)] = array("h", [2000] * round(0.6 * film.RATE))
        assembled, slots = film.fixed_clock(script, pcm, report)
        self.assertEqual(assembled.count(1000), pcm.count(1000))
        self.assertEqual(assembled.count(2000), pcm.count(2000))
        self.assertLess(slots[1]["sourceStart"], 1.3)
        self.assertLess(slots[1]["speechEnd"], 4)

    def test_no_quiet_clause_boundary_is_rejected(self):
        script = {"duration": 4, "scenes": [{"id": "contrast", "captionRanges": [
            {"start": 0, "end": 2, "spoken": "Stop"},
            {"start": 2, "end": 4, "spoken": "Move"}]}]}
        report = {"script": "Stop Move", "transcript": "Stop Move", "words": [
            {"word": "Stop", "start": 0, "end": 1},
            {"word": "Move", "start": 1, "end": 2}]}
        with self.assertRaisesRegex(ValueError, "No verified quiet gap"):
            film.fixed_clock(script, array("h", [1000] * (2 * film.RATE)), report)

    def test_internal_pause_does_not_replace_a_missing_clause_gap(self):
        script = {"duration": 4, "scenes": [{"id": "contrast", "captionRanges": [
            {"start": 0, "end": 2, "spoken": "Stop now"},
            {"start": 2, "end": 4, "spoken": "Move"}]}]}
        report = {"script": "Stop now Move", "transcript": "Stop now Move", "words": [
            {"word": "Stop", "start": 0.1, "end": 0.5},
            {"word": "now", "start": 1.0, "end": 1.2},
            {"word": "Move", "start": 1.3, "end": 1.6}]}
        pcm = array("h", [0] * (2 * film.RATE))
        pcm[round(0.1 * film.RATE):round(0.5 * film.RATE)] = array("h", [1000] * round(0.4 * film.RATE))
        pcm[film.RATE:round(1.6 * film.RATE)] = array("h", [2000] * round(0.6 * film.RATE))
        with self.assertRaisesRegex(ValueError, "No verified quiet gap"):
            film.fixed_clock(script, pcm, report)

    def test_complete_speech_that_overruns_a_caption_is_rejected(self):
        script = {"duration": 2, "scenes": [{"id": "hook", "captionRanges": [
            {"start": 0, "end": 1, "spoken": "Known rules"}]}]}
        report = {"script": "Known rules", "transcript": "Known rules", "words": [
            {"word": "Known", "start": 0, "end": 0.6},
            {"word": "rules", "start": 0.6, "end": 1.4}]}
        with self.assertRaisesRegex(ValueError, "does not fit"):
            film.fixed_clock(script, array("h", [20] * (2 * film.RATE)), report)

    def test_a_different_spoken_word_is_rejected(self):
        report = {"script": "Leave evidence", "transcript": "Weave evidence", "words": [
            {"word": "Weave", "start": 0, "end": 0.5},
            {"word": "evidence", "start": 0.5, "end": 1}]}
        with self.assertRaisesRegex(ValueError, "differs from the script"):
            film.audit_silent_tail(report, array("h", [10] * film.RATE))

    def test_extra_words_in_audible_audio_are_never_discarded(self):
        report = {"script": "Stop", "transcript": "Stop again", "words": [
            {"word": "Stop", "start": 0, "end": 0.4},
            {"word": "again", "start": 0.5, "end": 0.52}]}
        with self.assertRaisesRegex(ValueError, "audible audio"):
            film.audit_silent_tail(report, array("h", [10] * film.RATE))
        self.assertEqual(report["transcript"], "Stop again")

    def test_impossible_silent_tail_artifact_keeps_original_evidence(self):
        report = {"script": "Stop", "transcript": "Stop again", "words": [
            {"word": "Stop", "start": 0, "end": 0.4},
            {"word": "again", "start": 0.5, "end": 0.52}]}
        film.audit_silent_tail(report, array("h", [0] * film.RATE))
        self.assertEqual(report["transcript"], "Stop")
        self.assertEqual(report["rawTranscript"], "Stop again")
        self.assertEqual(len(report["rawWords"]), 2)
        self.assertEqual(report["alignmentCorrection"]["peakPCM"], 0)

    def test_failed_remeasurement_keeps_the_accepted_alignment_file(self):
        with TemporaryDirectory() as directory:
            work = Path(directory)
            accepted = work / "accepted.json"
            accepted.write_text("accepted alignment")
            prepared = work / "prepared.wav"
            prepared.write_bytes(b"saved voice")
            client = Mock()
            client.audio.transcriptions.create.return_value = SimpleNamespace(
                text="Weave", words=[SimpleNamespace(word="Weave", start=0, end=0.5)])
            with patch.object(film, "RECORD", accepted), patch.object(film, "WORK", work), \
                    patch.object(film, "read_pcm", return_value=array("h", [10] * film.RATE)):
                with self.assertRaisesRegex(ValueError, "differs from the script"):
                    film.measure(client, {"script": "Leave"}, prepared)
            self.assertEqual(accepted.read_text(), "accepted alignment")
            self.assertTrue((work / "candidate-alignment.json").exists())

    def test_failed_reproduction_keeps_the_accepted_audio(self):
        with TemporaryDirectory() as directory:
            work = Path(directory)
            take, prepared, output = (work / name for name in ["take.wav", "prepared.wav", "output.wav"])
            take.write_bytes(b"saved take")
            prepared.write_bytes(b"saved prepared voice")
            output.write_bytes(b"accepted voice")
            source, record = work / "script.json", work / "record.json"
            source.write_text('{"duration": 1}')
            film.write_performance(record, {"takeSha256": film.sha256(take),
                "preparedSha256": film.sha256(prepared), "slots": [],
                "narrationSha256": film.sha256(output)})
            def bad_master(_raw, candidate, _loudness, _rate):
                candidate.write_bytes(b"unexpected audio")
            with patch.object(film, "SOURCE", source), patch.object(film, "RECORD", record), \
                    patch.object(film, "TAKE", take), patch.object(film, "OUTPUT", output), \
                    patch.object(film, "WORK", work), patch.object(film, "ASSETS", work), \
                    patch.object(film, "prepare", return_value=prepared), \
                    patch.object(film, "read_pcm", return_value=array("h", [0] * film.RATE)), \
                    patch.object(film, "fixed_clock", return_value=(array("h", [0] * film.RATE), [])), \
                    patch.object(film, "master", side_effect=bad_master), patch("sys.argv", ["jidoka-narration.py"]):
                with self.assertRaisesRegex(ValueError, "differs from the hash"):
                    film.main()
            self.assertEqual(output.read_bytes(), b"accepted voice")


if __name__ == "__main__":
    unittest.main()
