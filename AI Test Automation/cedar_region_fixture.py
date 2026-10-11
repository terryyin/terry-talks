"""A temporary synthetic workshop and saved candidates; no speech generation."""

import contextlib
import io
import json
import random
import sys
from array import array
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

import cedar_narration as narration
import cedar_regions as regions
from narration_audio import (gap_span, narration_text, read_pcm, run, sha256,
                             write_pcm, write_performance, write_script)


RATE = 48000


class Workshop:
    def __init__(self, root):
        self.root = root
        self.work = root / "terry-moves/out/ai-test-automation-audio"
        self.assets = root / "terry-moves/public/assets/ai-test-automation"
        self.script_path = root / "AI Test Automation/film-script.json"
        for folder in (self.work, self.assets, self.script_path.parent):
            folder.mkdir(parents=True)
        self.script = {"fps": 30, "scenes": [
            {"id": scene, "captionRanges": [{"spoken": clause, "text": clause} for clause in clauses]}
            for scene, clauses in (
                ("sandbox", ["Ask first.", "Then wait.", "Show the check."]),
                ("investigate", ["Have it tested.", "It is done."]),
                ("end", ["Finish now."]))]}
        text = narration_text(self.script)
        self.words = [{"word": word, "start": 0.25 + n * 0.75, "end": 0.5 + n * 0.75}
                      for n, word in enumerate(text.split())]
        self.take = self.assets / "cedar-take.wav"
        prepared = self.work / "cedar-prepared.wav"
        write_pcm(self.take, self.noise(11.25), RATE)
        narration.prepare(self.take, prepared, run, RATE)
        self.base = read_pcm(prepared, RATE)
        self.record_path = narration.record_path(root)
        self.report = {"model": "fixture", "voice": "fixture", "direction": "synthetic PCM",
                       "script": text, "transcript": text, "unpromptedTranscript": text,
                       "words": self.words, "regions": [], "takeSha256": sha256(self.take),
                       "preparedSha256": sha256(prepared)}
        write_performance(self.record_path, self.report)
        with contextlib.redirect_stdout(io.StringIO()):
            narration.align(self.script, self.base, self.report, RATE)
        write_script(self.script_path, self.script)

    @staticmethod
    def noise(seconds):
        source = random.Random(32)
        return array("h", (source.randrange(-9000, 9000) for _ in range(round(seconds * RATE))))

    def candidate(self, region="sandbox:2-3", name="candidate-1", change=0.5):
        region, text, _, (context, before, count, size) = regions.request(self.script, region)
        start, end = gap_span(self.words, context, context + size, len(self.base) / RATE)
        # Change an internal gap, keeping the candidate's neighbouring clauses intact.
        shifted = context + before + 1
        seam = (self.words[shifted - 1]["end"] + self.words[shifted]["start"]) / 2
        cut = self.base[round(start * RATE):round(end * RATE)]
        at = round((seam - start) * RATE)
        cut = cut[:at] + self.noise(change) + cut[at:]
        words = [{**word, "start": word["start"] - start + (change if n >= shifted else 0),
                  "end": word["end"] - start + (change if n >= shifted else 0)}
                 for n, word in enumerate(self.words) if context <= n < context + size]
        folder = self.work / "auditions" / region
        folder.mkdir(parents=True, exist_ok=True)
        take, prepared = folder / f"{name}.wav", folder / f"{name}-prepared.wav"
        write_pcm(take, cut, RATE)
        narration.prepare(take, prepared, run, RATE)
        record = {"region": region, "requestText": text, "note": "fixture", "model": "fixture",
                  "voice": "fixture", "direction": "synthetic PCM", "alignmentModel": "fixture",
                  "transcript": text, "transcriptSource": "synthetic measured-word fixture",
                  "words": words, "takeSha256": sha256(take), "preparedSha256": sha256(prepared)}
        write_performance(folder / f"{name}.json", record)
        return folder

    def stable_files(self):
        """Durable film and candidate evidence; generated ignored work audio is scratch."""
        return {path.relative_to(self.root): path.read_bytes() for path in self.root.rglob("*")
                if path.is_file() and (self.work not in path.parents or
                                      ("auditions" in path.parts and
                                       (path.suffix == ".json" or path.name.endswith(".wav") and
                                        not path.name.endswith(("-prepared.wav", "-in-context.wav")))))}

    def saved(self):
        return json.loads(self.record_path.read_text())

    def select(self, region="sandbox:2-3", candidate="candidate-1"):
        with contextlib.redirect_stdout(io.StringIO()):
            measured = regions.select(self.root, self.script, run, RATE, region, candidate)
        write_script(self.script_path, measured)  # Same boundary as produce_audio.main().
        self.script = measured
        return measured
