#!/usr/bin/env python3
"""Rebuild the square film's 20s audio offline from hash-verified saved audio.

Copies complete mastered narration clauses, with no additional tempo change.
The original score's final resolution moves forward through a quiet crossfade.
Run with --verify to check outputs and sample-exact narration provenance.
"""

import argparse
from array import array
import json
from pathlib import Path
import tempfile

from audio_measurement import measure_pcm
from narration_audio import exact_script, read_pcm, verify, write_pcm

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "terry-moves/public/assets/see-do-feedback"
SOURCE_RECORD = ASSETS / "audio-production.json"
OUTPUT_RECORD = ASSETS / "audio-square.json"
RATE, DURATION = 48000, 20
POSITIONS = {"seeing": 3.0, "loop": 6.0, "memory": 12.5, "closing": 16.7}


def sources():
    record = json.loads(SOURCE_RECORD.read_text())
    for item in (record["narration"], record["score"]):
        verify(ASSETS / item["file"], item["sha256"])
    audit = record["speechAudit"]
    verify(ASSETS / record["narration"]["file"], audit["narrationSha256"])
    if not audit["exactScriptPassed"]:
        raise ValueError("Saved narration requires a passing script audit")
    exact_script(" ".join(cue["text"] for cue in record["cues"]),
                 audit["transcript"], "Hash-verified source narration audit")
    for name in POSITIONS:
        take = record["takes"][name]
        verify(ASSETS / take["file"], take["sha256"])
    narration = read_pcm(ASSETS / record["narration"]["file"], RATE)
    score = read_pcm(ASSETS / record["score"]["file"], RATE)
    if len(narration) != 30 * RATE or len(score) != 30 * RATE:
        raise ValueError("Expected the preserved 30-second mastered sources")
    return record, narration, score


def place_narration(source, pcm):
    timeline = array("h", [0]) * (DURATION * RATE)
    cues, previous_end = [], 0
    for name, seconds in POSITIONS.items():
        cue = next(cue for cue in source["cues"] if cue["id"] == name)
        a = round(cue["placedStartSeconds"] * RATE)
        b = round(cue["placedEndSeconds"] * RATE)
        start = round(seconds * RATE)
        end = start + b - a
        if start < previous_end or end > len(timeline):
            raise ValueError(f"{name} overlaps another clause or exceeds 20 seconds")
        timeline[start:end] = pcm[a:b]
        previous_end = end
        take = source["takes"][name]
        cues.append({"id": name, "text": cue["text"], "sourceFile": source["narration"]["file"],
                     "sourceSha256": source["narration"]["sha256"],
                     "sourceStartSample": a, "sourceEndSample": b,
                     "sourceStartSeconds": a / RATE, "sourceEndSeconds": b / RATE,
                     "savedTakeFile": take["file"], "savedTakeSha256": take["sha256"],
                     "preservedSourceTempoMultiplier": cue["tempoMultiplier"],
                     "additionalTempoMultiplier": 1,
                     "placedStartSample": start, "placedEndSample": end,
                     "placedStartSeconds": start / RATE, "placedEndSeconds": end / RATE,
                     "placedDurationSeconds": (b - a) / RATE})
    return timeline, cues


def shorten_score(pcm):
    # Timeline 15.8–16.2 crossfades source 15.8–16.2 with source 25.8–26.2.
    # The source ending at 30.0 therefore resolves at exactly 20.0 seconds.
    a, b, shift = round(15.8 * RATE), round(16.2 * RATE), 10 * RATE
    timeline = array("h", pcm[:DURATION * RATE])
    for index in range(a, b):
        weight = (index - a + 0.5) / (b - a)
        timeline[index] = round(pcm[index] * (1 - weight) + pcm[index + shift] * weight)
    timeline[b:] = pcm[b + shift:]
    return timeline


def check_provenance(record, source, narration):
    if record["sourceNarrationSha256"] != source["narration"]["sha256"]:
        raise ValueError("Source narration hash changed")
    if record["sourceScoreSha256"] != source["score"]["sha256"]:
        raise ValueError("Source score hash changed")
    expected, cues = place_narration(source, narration)
    if record["cues"] != cues or read_pcm(ASSETS / record["narration"]["file"], RATE) != expected:
        raise ValueError("Narration clauses must remain sample-exact copies of saved mastered speech")
    source_score = read_pcm(ASSETS / source["score"]["file"], RATE)
    if read_pcm(ASSETS / record["score"]["file"], RATE) != shorten_score(source_score):
        raise ValueError("Score differs from the specified saved-source crossfade edit")
    for item in (record["narration"], record["score"]):
        verify(ASSETS / item["file"], item["sha256"])
        if len(read_pcm(ASSETS / item["file"], RATE)) != DURATION * RATE:
            raise ValueError("Final audio must be exactly 20 seconds")


def build(source, narration, score):
    speech, cues = place_narration(source, narration)
    music = shorten_score(score)
    speech_path, score_path = ASSETS / "narration-square-en.wav", ASSETS / "score-square.wav"
    write_pcm(speech_path, speech, RATE)
    write_pcm(score_path, music, RATE)
    record = {"film": "See · Do · Feedback — square hand-drawn edition", "durationSeconds": DURATION,
              "disclosure": source["disclosure"], "narrationModel": source["narrationModel"],
              "voice": source["voice"], "sourceProductionRecord": SOURCE_RECORD.name,
              "sourceNarrationSha256": source["narration"]["sha256"],
              "sourceScoreSha256": source["score"]["sha256"], "cues": cues,
              "narration": {"file": speech_path.name, **measure_pcm(speech_path, RATE),
                            "timing": "Sample-exact copies of complete saved mastered clauses; no new tempo adjustment"},
              "score": {"file": score_path.name, **measure_pcm(score_path, RATE), "credit": source["score"]["credit"],
                        "edit": "Original score 0–16.2s; final 26.2–30s moved to 16.2–20s; linear 0.4s crossfade at 15.8–16.2s"},
              "speechEvidence": {"sourceAuditModel": source["speechAudit"]["model"],
                                 "sourceAuditNarrationSha256": source["speechAudit"]["narrationSha256"],
                                 "method": "Source transcript audit verified against the saved narration hash; complete selected cues copied without changing PCM",
                                 "selectedTranscript": " ".join(cue["text"] for cue in cues),
                                 "sampleExactSourceCopiesPassed": True}}
    mixed = [voice + music for voice, music in zip(speech, music)]
    clipped = sum(abs(sample) >= 32768 for sample in mixed)
    if clipped:
        raise ValueError("Unity-gain narration and score mix clips")
    with tempfile.TemporaryDirectory(prefix="see-do-feedback-square-") as temporary:
        mix_path = Path(temporary) / "unity-mix.wav"
        write_pcm(mix_path, array("h", mixed), RATE)
        record["unityGainMix"] = {"narrationGain": 1, "scoreGain": 1, **measure_pcm(mix_path, RATE),
                                  "clippedSamples": clipped, "narrationSha256": record["narration"]["sha256"],
                                  "scoreSha256": record["score"]["sha256"]}
    OUTPUT_RECORD.write_text(json.dumps(record, indent=2, ensure_ascii=False) + "\n")
    check_provenance(record, source, narration)
    return record


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--verify", action="store_true", help="Verify saved outputs without rebuilding")
    args = parser.parse_args()
    source, narration, score = sources()
    if args.verify:
        record = json.loads(OUTPUT_RECORD.read_text())
        check_provenance(record, source, narration)
    else:
        record = build(source, narration, score)
    print(json.dumps({"verified": True, "durationSeconds": DURATION,
                      "narration": record["narration"], "score": record["score"],
                      "unityGainMix": record["unityGainMix"]}, indent=2))


if __name__ == "__main__":
    main()
