#!/usr/bin/env python3
"""Produce saved speech explicitly; rebuild this film's 30s audio offline by default.

Uses the repository's narration_audio PCM, hashing and measured mastering.
The oscillator score is original to this film. No third-party samples are used.
"""

import argparse
from array import array
import json
from pathlib import Path
import tempfile

import numpy as np

from audio_measurement import measure_pcm
from narration_audio import exact_script, master, read_pcm, run, sha256, verify, write_pcm
from see_do_feedback_score import compose_score

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "terry-moves/public/assets/see-do-feedback"
RECORD = ASSETS / "audio-production.json"
RATE, DURATION = 48000, 30
MODEL, VOICE = "gpt-4o-mini-tts", "cedar"
MAX_TEMPO = 1.14
CUES = [
    {"id": "gap", "start": 3.1, "end": 6.3,
     "text": "Every useful product begins with a human gap."},
    {"id": "seeing", "start": 6.6, "end": 9.8,
     "text": "Seeing suffering can awaken passion."},
    {"id": "loop", "start": 10.1, "end": 16.8,
     "text": "We act. AI can help us build. People show us whether it helped. We improve."},
    {"id": "memory", "start": 17.1, "end": 20.3,
     "text": "The product preserves what we learn."},
    {"id": "need", "start": 20.6, "end": 25.7,
     "text": "As building gets faster, we can respond when the need appears."},
    {"id": "closing", "start": 26.1, "end": 29.2,
     "text": "AI helps us do. We must still see."},
]
DIRECTION = """Speak these exact supplied words for a thoughtful 30-second educational
film. Be a warm, lucid, reflective adult narrator, with quiet human concern and
possibility. Natural conversational English, approximately 165 words per minute,
compact but never rushed. Use short natural sentence pauses. Pronounce AI as
the separate letters A I. Give gentle emphasis to human, people, learn, and see
where present. Avoid a sales-announcer delivery or exaggerated drama. Do not
imitate any real person's voice. Speak only the supplied text, with no additions.
"""


def new_record():
    return {"film": "See · Do · Feedback", "durationSeconds": DURATION,
            "disclosure": "AI-generated English narration (OpenAI Cedar); not Terry's recorded voice",
            "narrationModel": MODEL, "voice": VOICE, "direction": DIRECTION,
            "apiGuide": "https://developers.openai.com/api/docs/guides/text-to-speech",
            "takes": {}, "score": {}}


def save(record):
    RECORD.write_text(json.dumps(record, indent=2) + "\n")


def generate(record, ids, retake=False):
    """Paid calls occur only for explicitly requested missing named takes."""
    names = list(dict.fromkeys(ids))
    for name in names:
        if not retake and (name in record["takes"] or (ASSETS / f"cedar-{name}-en.wav").exists()):
            raise ValueError(f"Saved {name} take exists; offline rebuild requires no --generate.")
    from openai import OpenAI
    client = OpenAI(timeout=180, max_retries=0)
    for name in names:
        cue = next(item for item in CUES if item["id"] == name)
        path = ASSETS / f"cedar-{name}-en.wav"
        if retake:
            number = 2
            while (ASSETS / f"cedar-{name}-en-take{number}.wav").exists():
                number += 1
            path = ASSETS / f"cedar-{name}-en-take{number}.wav"
        direction = DIRECTION + f"\nComplete this clause in about {cue['end'] - cue['start'] - .2:.1f} seconds."
        speed = 1.11 if retake else 1.02
        if retake:
            direction += "\nFor this shorter replacement take, use 180 words per minute, with brief natural pauses. Keep every word clear."
        print(f"Generating saved Cedar take: {name} ({path.name})", flush=True)
        with client.audio.speech.with_streaming_response.create(
            model=MODEL, voice=VOICE, input=cue["text"], instructions=direction,
            response_format="wav", speed=speed,
        ) as response:
            response.stream_to_file(path)
        # Streaming WAV may report 0xffffffff frames; normalize the header only.
        pcm = read_pcm(path, 24000)
        write_pcm(path, pcm, 24000)
        if retake and name in record["takes"]:
            record.setdefault("previousTakes", {}).setdefault(name, []).append(record["takes"][name])
        record["takes"][name] = {"file": path.name, "text": cue["text"],
                                 "direction": direction, "requestSpeed": speed,
                                 "sha256": sha256(path), "rawDurationSeconds": len(pcm) / 24000}
        save(record)


def build_narration(record, work):
    timeline = array("h", [0] * (DURATION * RATE))
    placed = []
    for cue in CUES:
        take = record["takes"][cue["id"]]
        exact_script(cue["text"], take["text"], f"Saved {cue['id']} text")
        source = ASSETS / take["file"]
        verify(source, take["sha256"])
        prepared = work / f"{cue['id']}-48k.wav"
        run(["ffmpeg", "-y", "-v", "error", "-i", str(source), "-ac", "1",
             "-ar", str(RATE), "-c:a", "pcm_s16le", str(prepared)])
        pcm = read_pcm(prepared, RATE)
        # Only boundary silence is trimmed; all internal breaths and pauses stay.
        edges = np.flatnonzero(np.abs(np.asarray(pcm, dtype=np.int32)) > 40)
        if not len(edges):
            raise ValueError(f"Silent saved speech: {cue['id']}")
        a, b = max(0, int(edges[0]) - round(.045 * RATE)), min(len(pcm), int(edges[-1]) + round(.085 * RATE))
        cut = pcm[a:b]
        slot = cue["end"] - cue["start"]
        available = slot - .09
        tempo = max(1.0, len(cut) / RATE / available)
        if tempo > MAX_TEMPO:
            raise ValueError(f"{cue['id']} complete take {len(cut) / RATE:.3f}s exceeds {available:.3f}s; retain take and review pacing.")
        if tempo > 1:
            trimmed = work / f"{cue['id']}-trimmed.wav"
            fitted = work / f"{cue['id']}-fitted.wav"
            write_pcm(trimmed, cut, RATE)
            run(["ffmpeg", "-y", "-v", "error", "-i", str(trimmed),
                 "-af", f"atempo={tempo:.9f}", "-ar", str(RATE), "-c:a", "pcm_s16le", str(fitted)])
            cut = read_pcm(fitted, RATE)
        start = cue["start"] + .035
        end = start + len(cut) / RATE
        if end > cue["end"] - .025:
            raise ValueError(f"Fitted complete {cue['id']} take exceeds cue end.")
        destination = round(start * RATE)
        timeline[destination:destination + len(cut)] = cut
        placed.append({**cue, "rawDurationSeconds": take["rawDurationSeconds"],
                       "sourceTrimStartSeconds": a / RATE, "sourceTrimEndSeconds": b / RATE,
                       "trimmedDurationSeconds": (b - a) / RATE, "tempoMultiplier": round(tempo, 6),
                       "placedStartSeconds": start, "placedEndSeconds": end,
                       "placedDurationSeconds": len(cut) / RATE})
    unmastered = work / "narration-unmastered.wav"
    output = ASSETS / "narration-en.wav"
    write_pcm(unmastered, timeline, RATE)
    master(unmastered, output, -18, RATE)
    record["cues"] = placed
    record["narration"] = {"file": output.name, **measure_pcm(output, RATE),
                            "timing": "Complete saved clauses; trim boundary silence only; modest measured tempo correction when needed"}
    save(record)
    for cue in placed:
        print(f"{cue['id']}: raw {cue['rawDurationSeconds']:.3f}s; complete fitted {cue['placedDurationSeconds']:.3f}s; "
              f"tempo {cue['tempoMultiplier']:.4f}; timeline {cue['placedStartSeconds']:.3f}–{cue['placedEndSeconds']:.3f}s")


def build_score(record):
    output = ASSETS / "score.wav"
    composition = compose_score(output, RATE, DURATION, CUES)
    record["score"] = {"file": output.name, **measure_pcm(output, RATE), **composition}
    save(record)


def audit(record):
    """One explicit API measurement of saved narration; ordinary replay stays offline."""
    from openai import OpenAI
    client = OpenAI(timeout=180, max_retries=0)
    with (ASSETS / "narration-en.wav").open("rb") as audio:
        response = client.audio.transcriptions.create(file=audio, model="whisper-1", language="en",
                                                     prompt="Terminology: AI, human, product, passion, feedback.",
                                                     response_format="verbose_json", timestamp_granularities=["word"])
    transcript = response.text.replace("A.I.", "AI").replace("A I", "AI")
    exact_script(" ".join(cue["text"] for cue in CUES), transcript, "Measured final narration transcript")
    record["speechAudit"] = {"model": "whisper-1", "transcript": transcript,
                             "words": [{"word": word.word, "start": word.start, "end": word.end} for word in response.words],
                             "narrationSha256": sha256(ASSETS / "narration-en.wav"), "exactScriptPassed": True}
    save(record)


def measure_mix(record, work):
    narration = np.asarray(read_pcm(ASSETS / "narration-en.wav", RATE), dtype=np.int32)
    score = np.asarray(read_pcm(ASSETS / "score.wav", RATE), dtype=np.int32)
    if len(narration) != DURATION * RATE or len(score) != DURATION * RATE:
        raise ValueError("Final audio length must remain exactly 30 seconds")
    if np.any(narration[:3 * RATE]) or np.any(narration[round(29.2 * RATE):]):
        raise ValueError("Narration must leave opening and closing silence")
    mixed = narration + score
    if np.max(np.abs(mixed)) >= 32768:
        raise ValueError("Unity-gain mix clips; lower the score's authored master gain")
    path = work / "unity-mix.wav"
    write_pcm(path, array("h", mixed.tolist()), RATE)
    record["unityGainMix"] = {"narrationGain": 1, "scoreGain": 1,
                              **measure_pcm(path, RATE), "clippedSamples": 0,
                              "narrationSha256": record["narration"]["sha256"],
                              "scoreSha256": record["score"]["sha256"]}
    save(record)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--generate", nargs="+", choices=[cue["id"] for cue in CUES], help="Explicit paid generation of missing named takes")
    parser.add_argument("--retake", nargs="+", choices=[cue["id"] for cue in CUES], help="Explicit paid replacement; retain earlier raw takes")
    parser.add_argument("--audit", action="store_true", help="Explicit paid transcription audit of saved final narration")
    args = parser.parse_args()
    ASSETS.mkdir(parents=True, exist_ok=True)
    record = json.loads(RECORD.read_text()) if RECORD.exists() else new_record()
    if args.generate:
        generate(record, args.generate)
    if args.retake:
        generate(record, args.retake, retake=True)
    build_score(record)
    with tempfile.TemporaryDirectory(prefix="see-do-feedback-audio-") as temporary:
        build_narration(record, Path(temporary))
        measure_mix(record, Path(temporary))
    if args.audit:
        audit(record)
    elif "speechAudit" in record:
        verify(ASSETS / "narration-en.wav", record["speechAudit"]["narrationSha256"])
    print(json.dumps({key: {field: value for field, value in record[key].items()
                            if field not in ("notes", "direction")}
                      for key in ("narration", "score", "unityGainMix")}, indent=2))


if __name__ == "__main__":
    main()
