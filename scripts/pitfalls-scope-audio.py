#!/usr/bin/env python3
"""Rebuild the 30-second scope film offline; --generate/--audit explicitly use OpenAI.

Saved raw takes are immutable. Re-running --generate reuses completed takes.
"""

import argparse
from array import array
from concurrent.futures import ThreadPoolExecutor
import json
from pathlib import Path
import tempfile
import wave

import numpy as np

from narration_audio import master, read_pcm, run, sha256, tokens, verify, write_pcm
from pitfalls_scope_sound import add_soundtrack, measure_quiet

from pitfalls_scope_content import (
    ASSETS, CAST, DURATION, MIX, MODEL, RATE, RECORD, ROOT, TAKES,
    phrase_captions, serialize_captions, write_json,
)

def saved_takes(cue):
    return sorted([*TAKES.glob(f"{cue['id']}.json"), *TAKES.glob(f"{cue['id']}-take*.json")],
                  key=lambda path: json.loads(path.read_text()).get("takeNumber", 1))


def generate(cue, retake=False):
    from openai import OpenAI
    path = TAKES / f"{cue['id']}.wav"
    sidecar = path.with_suffix(".json")
    if retake:
        number = max([json.loads(p.read_text()).get("takeNumber", 1) for p in saved_takes(cue)] + [0]) + 1
        path = TAKES / f"{cue['id']}-take{number:02}.wav"
        sidecar = path.with_suffix(".json")
    else:
        number = 1
    candidates = saved_takes(cue)
    if candidates and not retake:
        sidecar = candidates[-1]
        path = ASSETS / json.loads(sidecar.read_text())["file"]
    if (path.exists() or sidecar.exists()) and not retake:
        if not path.exists() or not sidecar.exists():
            raise ValueError(f"Incomplete retained take: {path}; do not overwrite it")
        saved = json.loads(sidecar.read_text())
        if saved["text"] != cue["text"]:
            raise ValueError(f"Saved text changed: {cue['id']}")
        verify(path, saved["sha256"])
        print(f"Reusing {cue['id']}; no API request", flush=True)
        return
    budget = cue["end"] - cue["start"]
    speed = cue["speed"]
    direction = (cue["direction"] + f" Finish the complete line naturally within about {budget:.2f} seconds. "
                 "Speak only the supplied exact words, with no additions or omissions. Do not imitate any real person.")
    print(f"Generating {cue['id']}: {cue['voice']}", flush=True)
    with tempfile.TemporaryDirectory(prefix="scope-take-", dir=TAKES) as directory:
        streamed = Path(directory) / "stream.wav"
        with OpenAI(timeout=60, max_retries=0).audio.speech.with_streaming_response.create(
            model=MODEL, voice=cue["voice"], input=cue["text"], instructions=direction,
            response_format="wav", speed=speed,
        ) as response:
            response.stream_to_file(streamed)
        pcm = read_pcm(streamed, 24000)
        if not pcm:
            raise ValueError(f"Empty take: {cue['id']}")
        write_pcm(path, pcm, 24000)
    write_json(sidecar, {**cue, "instructions": direction, "model": MODEL, "takeNumber": number, "requestSpeed": speed,
                        "file": str(path.relative_to(ASSETS)), "sha256": sha256(path),
                        "rawDurationSeconds": len(pcm) / 24000})
    print(f"Saved {cue['id']}: {len(pcm) / 24000:.3f}s", flush=True)


def build():
    previous = json.loads(RECORD.read_text()) if RECORD.exists() else {}
    mixture = np.zeros((RATE * DURATION, 2), dtype=np.float64)
    placed = []
    fallback = []
    with tempfile.TemporaryDirectory(prefix="scope-mix-") as directory:
        work = Path(directory)
        for cue in CAST:
            candidates = saved_takes(cue)
            if not candidates:
                raise ValueError(f"Missing saved take: {cue['id']}")
            take = json.loads(candidates[-1].read_text())
            if take["text"] != cue["text"]:
                raise ValueError(f"Saved {cue['id']} text differs from the current approved script; obtain a retained replacement")
            path = ASSETS / take["file"]
            verify(path, take["sha256"])
            converted = work / f"{cue['id']}.wav"
            run(["ffmpeg", "-y", "-v", "error", "-i", str(path), "-ar", str(RATE), "-ac", "1", "-c:a", "pcm_s16le", str(converted)])
            pcm = np.asarray(read_pcm(converted, RATE), dtype=np.float64)
            edges = np.flatnonzero(np.abs(pcm) > 180)
            if not len(edges):
                raise ValueError(f"Silent take: {cue['id']}")
            a = max(0, int(edges[0]) - round(.05 * RATE))
            b = min(len(pcm), int(edges[-1]) + round(.08 * RATE))
            cut = pcm[a:b]
            budget = cue["end"] - cue["start"]
            tempo = 1.0
            if len(cut) > round(budget * RATE):
                raise ValueError(f"{cue['id']} needs {len(cut) / RATE:.3f}s at natural speed, window is {budget:.3f}s; adjust placement or obtain a new complete performance")
            cut /= 32768
            peak = np.max(np.abs(cut))
            cut *= .68 / max(peak, .001)
            start = round(cue["start"] * RATE)
            end = start + len(cut)
            if end > round(cue["end"] * RATE) or end > len(mixture):
                raise ValueError(f"{cue['id']} overrun")
            mixture[start:end] += cut[:, None]
            prepared = TAKES / f"{cue['id']}-prepared-v4.wav"
            write_pcm(prepared, array("h", np.round(cut * 32767).astype(np.int16)), RATE)
            # Raw sidecars retain their original request windows; the current
            # film record exposes only its measured placement, not stale cues.
            take_metadata = {key: value for key, value in take.items() if key not in ("start", "end")}
            placed.append({**take_metadata, "speechStartSeconds": start / RATE, "speechEndSeconds": end / RATE,
                           "trimmedLeadingSeconds": a / RATE, "trimmedTrailingSeconds": (len(pcm) - b) / RATE,
                           "atempo": tempo, "preparedFile": str(prepared.relative_to(ASSETS)),
                           "preparedSha256": sha256(prepared)})
            parts = tokens(cue["text"])
            fallback.extend({"word": word, "start": cue["start"] + i / len(parts) * len(cut) / RATE,
                             "end": cue["start"] + (i + 1) / len(parts) * len(cut) / RATE}
                            for i, word in enumerate(parts))
        score = add_soundtrack(mixture, RATE, placed)
        raw = work / "raw.wav"
        write_pcm(raw, array("h", np.clip(np.round(mixture.ravel() * 32767), -32768, 32767).astype(np.int16)), RATE, channels=2)
        output = MIX
        mastered = work / "mastered.wav"
        measured = master(raw, mastered, -14, RATE)
        run(["ffmpeg", "-y", "-v", "error", "-i", str(mastered), "-af", "volume=-0.05dB", "-c:a", "pcm_s16le", str(output)])
        inspection = run(["ffmpeg", "-hide_banner", "-i", str(output), "-af",
                          "loudnorm=I=-14:TP=-1.5:LRA=7:print_format=json", "-f", "null", "-"])
        analysis, _ = json.JSONDecoder().raw_decode(inspection.stderr[inspection.stderr.rfind("{"):])
    report = {"film": "ScopeRestrictionFilm", "fps": 30, "durationInFrames": 900, "durationSeconds": 30,
              "sampleRate": RATE, "channels": 2, "disclosure": "AI-generated synthetic voices: OpenAI Cedar, Coral and Ash. Fictional roles; not recordings or imitations of Terry or any real person.",
              "apiGuide": "https://developers.openai.com/api/docs/guides/text-to-speech", "model": MODEL,
              "timingPolicy": "Preserve complete phrases at natural prepared speed; boundary silence only; no time scaling, internal pause deletion or speech truncation.",
              "score": score, "masteringTarget": {"integratedLoudnessLUFS": -14, "maximumTruePeakDbTP": -1.5, "postMasterSafetyGainDb": -.05, "reason": "Requested creative target for this film; not a universal platform standard. A 0.05 dB final margin covers 16-bit quantization after the true-peak limiter."},
              "quietAnalysis": measure_quiet(output, RATE),
              "previousPreviewQuietAnalysis": {"file": "assets/pitfalls-scope/mix-v3.wav", "sha256": sha256(ASSETS / "mix-v3.wav"), "measurement": measure_quiet(ASSETS / "mix-v3.wav", RATE)},
              "clips": placed, "mastering": measured, "mix": {"file": str(output.relative_to(ROOT / "terry-moves/public")), "sha256": sha256(output),
                  "integratedLoudnessLUFS": float(analysis["input_i"]), "truePeakDbTP": float(analysis["input_tp"]), "loudnessRangeLU": float(analysis["input_lra"])},
              "captionTiming": "Provisional proportional phrase timing from placed clips; independent ASR audit not yet performed."}
    old_audit = previous.get("speechAudit", {})
    if old_audit.get("mixSha256") == report["mix"]["sha256"]:
        old_audit.setdefault("normalization", "Case, punctuation, apostrophes and three/four numeric spellings normalized.")
        report["speechAudit"] = old_audit
        if len(old_audit.get("words", [])) == sum(len(tokens(cue["text"])) for cue in CAST):
            report["captionTiming"] = "Actual-audio ASR word timestamps grouped at approved phrase and speaker boundaries; punctuation restored from the script."
            serialize_captions(phrase_captions(old_audit["words"]))
        else:
            serialize_captions(phrase_captions(fallback))
    else:
        serialize_captions(phrase_captions(fallback))
    write_json(RECORD, report)
    return report


def audit(report):
    from openai import OpenAI
    path = ROOT / "terry-moves/public" / report["mix"]["file"]
    verify(path, report["mix"]["sha256"])
    print("Transcribing the actual complete mastered mix independently", flush=True)
    with path.open("rb") as audio:
        response = OpenAI(timeout=120, max_retries=0).audio.transcriptions.create(
            model="whisper-1", file=audio, response_format="verbose_json", language="en",
            timestamp_granularities=["word", "segment"],
        )
    data = response.model_dump()
    expected = " ".join(cue["text"] for cue in CAST)
    number_words = {"3": "three", "4": "four"}
    audit_tokens = lambda text: [number_words.get(token, token) for token in tokens(text)]
    matches = audit_tokens(expected) == audit_tokens(data["text"])
    words = data["words"]
    report["speechAudit"] = {"status": "exact-token-match" if matches else "mismatch", "model": "whisper-1", "method": "Independent ASR of mastered mix; no script prompt supplied; not human listening.",
                             "normalization": "Case, punctuation, apostrophes and three/four numeric spellings normalized.",
                             "text": data["text"], "expected": expected, "words": words, "mixSha256": sha256(path)}
    write_json(RECORD, report)
    if not matches:
        raise ValueError("Independent transcription differs from exact script; retained transcript and word timings for review")
    report["captionTiming"] = "Actual-audio ASR word timestamps grouped at approved phrase and speaker boundaries; punctuation restored from the script."
    write_json(RECORD, report)
    serialize_captions(phrase_captions(words))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--generate", action="store_true", help="Request only missing named raw speech takes (paid API)")
    parser.add_argument("--retake", nargs="+", choices=[cue["id"] for cue in CAST], help="Generate a separately retained replacement with each line's current direction (paid API)")
    parser.add_argument("--audit", action="store_true", help="Independently transcribe the actual mix and derive captions (paid API)")
    parser.add_argument("--verify", action="store_true", help="Verify saved mix/take hashes and exact 30-second stereo container offline")
    args = parser.parse_args()
    TAKES.mkdir(parents=True, exist_ok=True)
    if args.verify:
        report = json.loads(RECORD.read_text())
        for cue in report["clips"]:
            verify(ASSETS / cue["file"], cue["sha256"])
            verify(ASSETS / cue["preparedFile"], cue["preparedSha256"])
        mix = ROOT / "terry-moves/public" / report["mix"]["file"]
        verify(mix, report["mix"]["sha256"])
        with wave.open(str(mix), "rb") as recording:
            assert (recording.getframerate(), recording.getnchannels(), recording.getnframes()) == (RATE, 2, RATE * DURATION)
        print("Saved mix and all speech takes verified; exactly 30 seconds, 48 kHz stereo")
        return
    if args.generate:
        with ThreadPoolExecutor(max_workers=3) as executor:
            list(executor.map(generate, CAST))
    if args.retake:
        for cue in CAST:
            if cue["id"] in args.retake:
                generate(cue, retake=True)
    report = build()
    if args.audit:
        audit(report)
    print(json.dumps({"durationSeconds": 30, "mixSha256": report["mix"]["sha256"],
                      "clips": [{"id": c["id"], "start": c["speechStartSeconds"], "end": c["speechEndSeconds"], "tempo": c["atempo"]} for c in report["clips"]]}, indent=2))


if __name__ == "__main__":
    main()
