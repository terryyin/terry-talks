#!/usr/bin/env python3
"""Rebuild the saved narration, original workshop score, accents and final mix.

Requires Python, ffmpeg and ffprobe. The chosen continuous Cedar performance and
measured alignment are committed. Only --new-take uses the OpenAI SDK and API.
Each caption range owns its spoken clause, displayed text and measured timing.
"""

import json
from copy import deepcopy
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from narration_audio import master, read_pcm, run, write_pcm, write_script
from cedar_narration import align, narration_text, performance
from workshop_soundtrack import ASSETS, SAMPLE_RATE, WORK, build_effects, build_mix, build_score


SOURCE = ROOT / "AI Test Automation" / "film-script.json"


def build_narration(script):
    prepared, report = performance(ROOT, script, run, SAMPLE_RATE, "--new-take" in sys.argv)
    measured = deepcopy(script)
    timeline = align(measured, read_pcm(prepared, SAMPLE_RATE), report, SAMPLE_RATE)
    if "--new-take" in sys.argv:
        script.update(measured)
    elif measured != script:
        raise ValueError("Saved performance no longer reproduces the fixed film timeline.")
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
             "Run `python3 'AI Test Automation/produce_audio.py'` to rebuild the saved performance and complete mix.",
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
             "Narration is mastered to −18 LUFS using measured two-pass normalization. Playback and rendering need no API.", "",
             "The original workshop score uses warm open F-major harmony and sparse felt-mallet notes.",
             "It enters after the opening question at 4.1 seconds, gently ducks around actual speech activity,",
             "and resolves into the final breathing room. It is composed and synthesized locally, without sampled music.",
             "Soft paper movements and wooden ticks mark the stop, accumulating tickets, reset, demonstrated and AI checks,",
             "investigation, confirmed repair, selected automation, duplicate deletion and fast local feedback.",
             "The score is mastered to −40 LUFS and accents to −39 LUFS; the stereo mix targets −18 LUFS with a −1.5 dBTP ceiling.",
             "The composition plays only `assets/ai-test-automation/mix.wav` at volume 1; no separate layers are added.",
             "Python with NumPy and ffmpeg reproduces the three 48 kHz PCM layers and final mix deterministically.",
             "Ignored `terry-moves/out/ai-test-automation-audio/` holds mastering, cue and signal-analysis evidence.",
             "The actual final mixed WAV is independently transcribed without supplying the script as a prompt.",
             "Signal analysis and transcription support the review; they do not claim human audition."]
    (ROOT / "AI Test Automation" / "film-treatment.md").write_text("\n".join(rows) + "\n")


def main():
    WORK.mkdir(parents=True, exist_ok=True)
    ASSETS.mkdir(parents=True, exist_ok=True)
    script = json.loads(SOURCE.read_text())
    if "--refresh-docs" not in sys.argv:
        voice = build_narration(script)
        score = build_score(script)
        effects = build_effects(script)
        mix = build_mix(script)
        (WORK / "mastering.json").write_text(json.dumps({"voice": voice, "score": score, "effects": effects}, indent=2) + "\n")
        print(f"Mix: {mix['mix']['input_i']} LUFS / {mix['mix']['input_tp']} dBTP; "
              f"{mix['clippedSamples']} clipped samples.", flush=True)
    if "--new-take" in sys.argv:
        write_script(SOURCE, script)
    treatment(script)
    print(f"Complete: {script['duration']:.3f}s / {script['durationInFrames']} frames.", flush=True)


if __name__ == "__main__":
    main()
