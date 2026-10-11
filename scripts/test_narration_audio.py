"""Composition of saved takes and the hash-verified performance manifest, on synthetic PCM."""

import json
import random
import tempfile
import unittest
from array import array
from pathlib import Path
from narration_audio import (FADE, compose, compose_manifest, read_manifest, read_pcm, select_region, sha256,
                             splice, verify, write_pcm, write_performance)

RATE = 8000
SPOKEN = "Ask first. It's a compromise, needs relief. Not more code."  # Region: tokens 2-6 of 10.
FIRST, COUNT = 2, 5


def noise(seconds, seed):
    source = random.Random(seed)
    return array("h", (source.randrange(-9000, 9000) for _ in range(round(seconds * RATE))))


def spoken(text=SPOKEN, start=0.25, pause=0.5):
    """Measured words 0.25 s long with `pause` between them."""
    return [{"word": word, "start": start + n * (0.25 + pause), "end": start + n * (0.25 + pause) + 0.25}
            for n, word in enumerate(text.split())]


def moved(words, by):
    return [{**word, "start": word["start"] + by, "end": word["end"] + by} for word in words]


def samples(seconds):
    return round(seconds * RATE)


class Composition(unittest.TestCase):
    def setUp(self):
        self.base, self.words = noise(7.5, 1), spoken()  # Region words 2-6 lie between seams at 1.5 and 5.25 s.

    def excerpt(self, change):
        """A take of words 1-7 cut from the base at 1.0-6.0 s, `change` seconds longer in the gap after word 3."""
        cut, words = self.base[samples(1.0):samples(6.0)], moved(self.words[1:8], -1.0)
        at = samples(2.0)  # Midpoint of the gap between "a" and "compromise," inside the take.
        cut = cut[:at] + noise(change, 2) + cut[at:] if change > 0 else cut[:at + samples(change)] + cut[at:]
        return cut, words[:3] + moved(words[3:], change)

    def test_identical_region_returns_the_same_samples_and_words(self):
        take, take_words = self.excerpt(0)
        pcm, words = compose(self.base, self.words, [(FIRST, COUNT, take, take_words, 1)], RATE)
        self.assertEqual(pcm, self.base)
        for composed, original in zip(words, self.words):
            self.assertEqual(composed["word"], original["word"])
            self.assertAlmostEqual(composed["start"], original["start"], 9)
            self.assertAlmostEqual(composed["end"], original["end"], 9)
        self.assertEqual(len(words), len(self.words))

    def test_longer_candidate_shifts_only_what_follows_it(self):
        take, take_words = self.excerpt(0.5)
        pcm, words = compose(self.base, self.words, [(FIRST, COUNT, take, take_words, 1)], RATE)
        a, b = samples(1.5), samples(5.25)
        self.assertEqual(len(pcm), len(self.base) + samples(0.5))
        self.assertEqual(pcm[:a], self.base[:a])  # Retained audio is sample-identical on both sides.
        self.assertEqual(pcm[b + samples(0.5):], self.base[b:])
        self.assertEqual(pcm[a:b + samples(0.5)], take[samples(0.5):samples(4.75)])
        self.assertEqual(words[:2], self.words[:2])
        for composed, original in zip(words[7:], self.words[7:]):
            self.assertAlmostEqual(composed["start"] - original["start"], 0.5, 9)
            self.assertAlmostEqual(composed["end"] - original["end"], 0.5, 9)
        # The take sits 1.0 s into the base, so its region words are offset by the seam difference.
        for composed, measured in zip(words[2:7], take_words[1:6]):
            self.assertEqual(composed["word"], measured["word"])
            self.assertAlmostEqual(composed["start"] - measured["start"], 1.0, 9)
            self.assertAlmostEqual(composed["end"] - measured["end"], 1.0, 9)
        # Each seam keeps the base's half of its gap and the candidate's half.
        self.assertAlmostEqual(words[2]["start"] - words[1]["end"], 0.5, 9)
        self.assertAlmostEqual(words[7]["start"] - words[6]["end"], 0.5, 9)
        self.assertAlmostEqual(words[4]["start"] - words[3]["end"], 1.0, 9)

    def test_shorter_candidate_shifts_later_words_earlier(self):
        take, take_words = self.excerpt(-0.25)
        pcm, words = compose(self.base, self.words, [(FIRST, COUNT, take, take_words, 1)], RATE)
        self.assertEqual(len(pcm), len(self.base) - samples(0.25))
        self.assertEqual(words[:2], self.words[:2])
        for composed, original in zip(words[7:], self.words[7:]):
            self.assertAlmostEqual(composed["start"] - original["start"], -0.25, 9)
        self.assertEqual(pcm[samples(5.0):], self.base[samples(5.25):])

    def test_regions_apply_in_order_on_the_composed_timeline(self):
        take, take_words = self.excerpt(0.5)
        last = (7, 3, self.base[samples(5.25):] + noise(0.25, 3), moved(self.words[7:], -5.25), 0)
        pcm, words = compose(self.base, self.words, [(FIRST, COUNT, take, take_words, 1), last], RATE)
        self.assertEqual(len(pcm), len(self.base) + samples(0.75))
        self.assertEqual(pcm[:samples(1.5)], self.base[:samples(1.5)])
        self.assertAlmostEqual(words[9]["end"] - self.words[9]["end"], 0.5, 9)

    def test_candidate_with_different_tokens_is_refused_naming_them(self):
        take, take_words = self.excerpt(0)
        take_words[5] = {**take_words[5], "word": "belief."}
        with self.assertRaises(ValueError) as refusal:
            compose(self.base, self.words, [(FIRST, COUNT, take, take_words, 1)], RATE)
        self.assertIn("- relief", str(refusal.exception))
        self.assertIn("+ belief", str(refusal.exception))

    def test_seams_crossfade_differing_audio_without_a_step(self):
        fade = round(FADE * RATE)
        base, take = array("h", [8000] * 4000), array("h", [-8000] * 4000)
        pcm = splice(base, 1000, 3000, take, 500, 1500, fade)
        self.assertEqual(len(pcm), 3000)
        for seam, before, after in ((1000, 8000, -8000), (2000, -8000, 8000)):
            ramp = list(pcm[seam - fade // 2:seam + fade // 2])
            self.assertEqual(set(pcm[seam - 200:seam - fade // 2]), {before})
            self.assertEqual(set(pcm[seam + fade // 2:seam + 200]), {after})
            self.assertEqual(ramp, sorted(ramp, reverse=before > after))
            self.assertEqual(len(set(ramp)), fade)  # Every sample of the fade moves.
            self.assertEqual(ramp, [-level for level in reversed(ramp)])  # Centred on the seam.
            steps = [abs(x - y) for x, y in zip([before] + ramp, ramp + [after])]
            self.assertLessEqual(max(steps), 16000 / fade + 1)

    def test_differing_candidate_audio_leaves_retained_audio_outside_the_fades(self):
        _, take_words = self.excerpt(0)
        pcm, _ = compose(self.base, self.words, [(FIRST, COUNT, noise(5.0, 4), take_words, 1)], RATE)
        half = round(FADE * RATE) // 2
        self.assertEqual(pcm[:samples(1.5) - half], self.base[:samples(1.5) - half])
        self.assertEqual(pcm[samples(5.25) + half:], self.base[samples(5.25) + half:])
        self.assertNotEqual(pcm[samples(1.5):samples(5.25)], self.base[samples(1.5):samples(5.25)])


class Recorded(unittest.TestCase):
    def setUp(self):
        folder = tempfile.TemporaryDirectory()
        self.addCleanup(folder.cleanup)
        self.root = Path(folder.name)
        self.take, self.region = self.root / "take.wav", self.root / "regions" / "ask-2.wav"
        self.region.parent.mkdir()
        self.words = spoken()
        base = noise(7.5, 1)
        write_pcm(self.take, base, RATE)
        write_pcm(self.region, base[samples(1.0):samples(3.0)] + noise(0.5, 2) + base[samples(3.0):samples(6.0)], RATE)
        self.evidence = self.root / "performance.json"

    def record(self, regions):
        composed, words = compose_manifest({"regions": regions, "words": self.words, "baseWords": self.words},
                                           self.take, [self.region] * len(regions), self.root / "composed.wav", RATE)
        report = {"takeSha256": sha256(self.take), "words": words, "preparedSha256": sha256(composed),
                  **({"baseWords": self.words} if regions else {}), "regions": regions}
        write_performance(self.evidence, report)
        return composed, report


class Manifest(Recorded):
    def replaced(self):
        words = moved(self.words[1:8], -1.0)
        return [{"id": "ask:2", "firstToken": FIRST, "tokenCount": COUNT, "takeFirstToken": 1,
                 "take": "regions/ask-2.wav", "takeSha256": sha256(self.region),
                 "words": words[:3] + moved(words[3:], 0.5)}]

    def flip(self, path):
        data = bytearray(path.read_bytes())
        data[-1] ^= 1
        path.write_bytes(data)

    def test_record_without_regions_is_the_base_take_itself(self):
        composed, report = self.record([])
        self.assertEqual(composed, self.take)
        self.assertEqual(read_manifest(self.evidence, self.root, self.take), report)
        verify(composed, report["preparedSha256"])

    def test_record_with_a_region_round_trips_and_reproduces_its_composition(self):
        composed, report = self.record(self.replaced())
        self.assertEqual(json.loads(self.evidence.read_text()), report)
        self.assertLess(max(map(len, self.evidence.read_text().splitlines())), 400)
        saved = read_manifest(self.evidence, self.root, self.take)
        again, words = compose_manifest(saved, self.take, [self.region], self.root / "again.wav", RATE)
        verify(again, saved["preparedSha256"])
        self.assertEqual(words, saved["words"])
        self.assertEqual(len(read_pcm(again, RATE)), samples(8.0))
        self.assertAlmostEqual(words[9]["start"] - self.words[9]["start"], 0.5, 9)

    def test_changed_byte_stops_naming_the_first_file_that_differs(self):
        composed, report = self.record(self.replaced())
        for changed in (composed, self.region, self.take):
            self.flip(changed)
            with self.assertRaises(ValueError) as stop:
                read_manifest(self.evidence, self.root, self.take)
                verify(composed, report["preparedSha256"])
            self.assertIn(str(changed), str(stop.exception))
        self.region.unlink()
        self.flip(self.take)  # The base take is whole again; the region take is missing.
        with self.assertRaises(ValueError) as stop:
            read_manifest(self.evidence, self.root, self.take)
        self.assertIn(str(self.region), str(stop.exception))


class Selection(Recorded):
    """Selecting a take for a region of a record: words 2-6 as `ask:2`, words 8-9 as `ask:3`."""

    def entry(self, name, first, count, change):
        """A take cut from the base at the retained word before its region, `change` seconds longer."""
        cut = self.words[first - 1]["start"]
        base, path = read_pcm(self.take, RATE), self.root / "regions" / f"{name}-{change}.wav"
        at = samples(cut + 1.25)  # The midpoint of the gap after the region's first word.
        write_pcm(path, base[samples(cut):at] + noise(change, 5) + base[at:], RATE)
        words = moved(self.words[first - 1:], -cut)
        return {"id": name, "firstToken": first, "tokenCount": count, "takeFirstToken": 1, "take": str(path),
                "takeSha256": sha256(path), "words": words[:2] + moved(words[2:], change)}

    def composed(self, report):
        path, words = compose_manifest(report, self.take, [Path(region["take"]) for region in report["regions"]],
                                       self.root / "composed.wav", RATE)
        return read_pcm(path, RATE), words

    def test_first_selection_keeps_the_base_measurement(self):
        _, report = self.record([])
        first = self.entry("ask:2", FIRST, COUNT, 0.5)
        chosen = select_region(report, first)
        self.assertEqual((chosen["baseWords"], chosen["regions"]), (self.words, [first]))
        self.assertEqual(report["regions"], [])  # The record read is not changed.
        self.assertEqual(len(self.composed(chosen)[0]), samples(8.0))

    def test_second_region_composes_onto_the_first_and_reselection_replaces_only_its_own(self):
        _, report = self.record([])
        first, second = self.entry("ask:2", FIRST, COUNT, 0.5), self.entry("ask:3", 8, 2, 0.25)
        both = select_region({**select_region(report, first), "words": "the composed timeline"}, second)
        self.assertEqual((both["baseWords"], both["regions"]), (self.words, [first, second]))
        pcm, words = self.composed(both)
        self.assertEqual(len(pcm), samples(7.5 + 0.5 + 0.25))
        self.assertAlmostEqual(words[7]["start"] - self.words[7]["start"], 0.5, 9)
        self.assertAlmostEqual(words[9]["start"] - self.words[9]["start"], 0.75, 9)
        again = self.entry("ask:2", FIRST, COUNT, 0.125)
        replaced = select_region({**both, "words": words}, again)
        self.assertEqual((replaced["baseWords"], replaced["regions"]), (self.words, [again, second]))
        self.assertIs(replaced["regions"][1], second)
        pcm, words = self.composed(replaced)
        self.assertEqual(len(pcm), samples(7.5 + 0.125 + 0.25))
        self.assertEqual(words[:2], self.words[:2])
        self.assertAlmostEqual(words[7]["start"] - self.words[7]["start"], 0.125, 9)
        self.assertAlmostEqual(words[9]["start"] - self.words[9]["start"], 0.375, 9)

    def test_region_overlapping_another_replaced_region_is_refused_naming_it(self):
        _, report = self.record([])
        chosen = select_region(report, self.entry("ask:2", FIRST, COUNT, 0.5))
        with self.assertRaises(ValueError) as refusal:
            select_region(chosen, self.entry("ask:2-3", 6, 4, 0.25))
        self.assertIn("ask:2-3 overlaps the replaced region ask:2", str(refusal.exception))


if __name__ == "__main__":
    unittest.main()
