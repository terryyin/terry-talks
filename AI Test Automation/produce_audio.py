#!/usr/bin/env python3
"""Build connected narration and its measured, frame-aligned caption timeline.

Requires Python, ffmpeg and ffprobe. The chosen continuous Cedar performance and
measured alignment are committed. Only --new-take uses the OpenAI SDK and API.
Each caption range owns its spoken clause, displayed text and measured timing.
"""

import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from narration_audio import master, read_pcm, run, write_pcm, write_script
from cedar_narration import align, narration_text, performance


SOURCE = ROOT / "AI Test Automation" / "film-script.json"
WORK = ROOT / "terry-moves" / "out" / "ai-test-automation-audio"
ASSETS = ROOT / "terry-moves" / "public" / "assets" / "ai-test-automation"
SAMPLE_RATE = 48000


def build_narration(script):
    prepared, report = performance(ROOT, script, run, SAMPLE_RATE, "--new-take" in sys.argv)
    timeline = align(script, read_pcm(prepared, SAMPLE_RATE), report, SAMPLE_RATE)
    raw = WORK / "narration-unmastered.wav"
    write_pcm(raw, timeline, SAMPLE_RATE)
    return master(raw, ASSETS / "narration.wav", -18, SAMPLE_RATE)


def treatment(script):
    rows = ["# AI Test Automation — The Legacy Workshop", "",
            "A warm, tactile cartoon workshop turns software upkeep into visible physical work.",
            "English; 1080 × 1350 (4:5); 30 fps. Cream paper, ink outlines, coral engineer,",
            "mint AI companion and a modular sky-blue legacy product preserve Story Impact’s visual family.", "",
            f"Runtime: **{script['duration']:.2f} seconds**. The {len(narration_text(script).split())}-word narration is",
            "OpenAI’s Cedar synthetic voice; it is not a recording or imitation of Terry.",
            "The confirmed article remains the idea’s authoritative source. This film distils its argument",
            "for large legacy projects whose maintenance problems arrive faster than the team can solve them.", "",
            "The film follows one engineer and one eager AI helper through a connected causal story:",
            "a tempting code spool, the accumulating maintenance queue, useful early protection,",
            "an isolated repeatable environment, finding confirmation and repair, selective automation,",
            "then faster feedback with fewer redundant checks and the wider protection retained.",
            "Useful targeted tests are visibly welcome early. AI observations are investigated before repair.",
            "The product is healthier at the end, with some work still arriving; the story promises control",
            "and better choices rather than a magically defect-free system.", "",
            "| Time | Scene | Spoken narration |", "| --- | --- | --- |"]
    for scene in script["scenes"]:
        narration = " ".join(c["spoken"] for c in scene["captionRanges"])
        rows.append(f"| {scene['start']:.2f}–{scene['end']:.2f}s | {scene['label']} | {narration} |")
    rows += ["", "## Audio and captions", "",
             "Run `python3 'AI Test Automation/produce_audio.py'` to rebuild the saved performance.",
             "One continuous take retains its natural internal breaths and pauses; only leading and trailing",
             "silence is trimmed. There is no time stretching, playback-rate change or chopped-clause assembly.",
             "The hook begins after an 80 ms audio lead. The ending has approximately two seconds of breathing room.",
             "Every caption owns its exact spoken clause, shorter displayed text, measured speech bounds and word cues.",
             "Caption changes use frame-aligned midpoints in the natural gaps; scene boundaries follow those captions.",
             "The SRT contains the full spoken words, including every qualifying condition.", "",
             "The saved `cedar-take.wav`, its SHA-256 and exact-script audit in `cedar-performance.json`, and",
             "Whisper word estimates reproduce narration and timing without another paid API request.",
             "The transcript and word boundaries come from Whisper measuring the actual chosen audio.",
             "They are automated evidence, not a substitute for listening review.",
             "Use `--new-take` only to request a new connected Cedar performance and fresh Whisper alignment.",
             "This requires the OpenAI Python SDK and `OPENAI_API_KEY`. The key is never written to source or logs.",
             "Use `--refresh-docs` to update this treatment from the measured script without regenerating audio.",
             "Narration is mastered to −18 LUFS using measured two-pass normalization. Playback and rendering need no API.",
             "Original score and synchronized sound accents belong to the final animation pass; slice one uses narration alone."]
    (ROOT / "AI Test Automation" / "film-treatment.md").write_text("\n".join(rows) + "\n")


def main():
    WORK.mkdir(parents=True, exist_ok=True)
    ASSETS.mkdir(parents=True, exist_ok=True)
    script = json.loads(SOURCE.read_text())
    if "--refresh-docs" not in sys.argv:
        voice = build_narration(script)
        (WORK / "mastering.json").write_text(json.dumps({"voice": voice}, indent=2) + "\n")
    write_script(SOURCE, script)
    treatment(script)
    print(f"Complete: {script['duration']:.3f}s / {script['durationInFrames']} frames.", flush=True)


if __name__ == "__main__":
    main()
