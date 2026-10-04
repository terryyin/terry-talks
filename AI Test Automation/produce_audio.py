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
            "for large legacy systems where tickets arrive faster than the team can close them.", "",
            "The film follows one engineer and one eager AI helper through a connected causal story:",
            "a tempting promise of more tests, a plausible diagnosis, and the conflict when added code",
            "creates upkeep before protection. High-level software engineering must preserve original intent;",
            "useful targeted tests can still help while the queue is overloaded.",
            "The alternative is stated first: AI performs hands-on testing. An isolated repeatable environment",
            "must be easy to set up. The AI repeats demonstrated manual checks; humans investigate, confirm and fix",
            "without adding test code to maintain. When control returns, useful checks become ordinary repeatable",
            "test code that needs no AI to execute. New features express intent in tests first and let those tests",
            "drive development. The suite keeps evolving: faster feedback, fewer redundant tests, suitable local",
            "checks moved to units, with essential end-to-end protection retained. Spare AI simplifies and fixes.",
            "The closing is: **Less to carry. Fewer bugs to chase.**", "",
            "| Time | Scene | Spoken narration |", "| --- | --- | --- |"]
    for scene in script["scenes"]:
        narration = " ".join(c["spoken"] for c in scene["captionRanges"])
        rows.append(f"| {scene['start']:.2f}–{scene['end']:.2f}s | {scene['label']} | {narration} |")
    rows += ["", "## Audio and captions", "",
             "Run `python3 'AI Test Automation/produce_audio.py' --narration-only` to rebuild the saved narration alone.",
             "The first revision preview uses the composition prop `narrationOnly: true`; its provisional art",
             "does not claim final synchronization of the previous score or effects. Animation and sound are the next pass.",
             "One continuous take retains its natural internal breaths and pauses; only leading and trailing",
             "silence is trimmed. There is no time stretching, playback-rate change or chopped-clause assembly.",
             "The opening question begins after an 80 ms audio lead. The ending has approximately two seconds of breathing room.",
             "Every caption owns its exact spoken clause, shorter displayed text, measured speech bounds and word cues.",
             "Caption changes use frame-aligned midpoints in the natural gaps; scene boundaries follow those captions.",
             "The SRT contains the full spoken words, including every qualifying condition.", "",
             "The saved `cedar-take.wav`, its SHA-256 and exact-script audit in `cedar-performance.json`, and",
             "Whisper word estimates reproduce narration and timing without another paid API request.",
             "The transcript and word boundaries come from Whisper measuring the actual chosen audio.",
             "Script-free transcription of the complete actual narration audits the spoken words and measures word timing.",
             "They are automated evidence, not a substitute for listening review.",
             "Use `--new-take` only to request a new connected Cedar performance and fresh Whisper alignment.",
             "This requires the OpenAI Python SDK and `OPENAI_API_KEY`. The key is never written to source or logs.",
             "Use `--refresh-docs` to update this treatment from the measured script without regenerating audio.",
             "Narration is mastered to −18 LUFS using measured two-pass normalization. Playback and rendering need no API.", "",
             "The previous original workshop score and effects remain unchanged at this narration-only stage.",
             "Their cues must be retargeted to the revised measured speech and simpler acting before final delivery.",
             "The standard composition prop remains `narrationOnly: false`, which plays the final mix once at volume 1.",
             "Do not use that default as a finished revision until the new mix has been produced and audited.",
             "Ignored `terry-moves/out/ai-test-automation-audio/` holds mastering and rejected-take evidence.",
             "Signal analysis and transcription support review; they do not claim human audition."]
    (ROOT / "AI Test Automation" / "film-treatment.md").write_text("\n".join(rows) + "\n")


def main():
    WORK.mkdir(parents=True, exist_ok=True)
    ASSETS.mkdir(parents=True, exist_ok=True)
    script = json.loads(SOURCE.read_text())
    if "--refresh-docs" not in sys.argv:
        voice = build_narration(script)
        if "--narration-only" in sys.argv:
            (WORK / "narration-mastering.json").write_text(json.dumps(voice, indent=2) + "\n")
            print("Narration only: existing soundtrack cues have not been retargeted.", flush=True)
        else:
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
