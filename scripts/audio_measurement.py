"""Deterministic loudness, peak, duration and hash measurements of saved mono PCM."""

import json
import math

from narration_audio import read_pcm, run, sha256


def measure_pcm(path, sample_rate):
    pcm = read_pcm(path, sample_rate)
    peak = max((abs(sample) for sample in pcm), default=0) / 32768
    report = run(["ffmpeg", "-hide_banner", "-i", str(path), "-af",
                  "loudnorm=I=-18:TP=-1.5:LRA=7:print_format=json", "-f", "null", "-"])
    loudness, _ = json.JSONDecoder().raw_decode(report.stderr[report.stderr.rfind("{"):])
    return {"sampleRate": sample_rate, "channels": 1, "frames": len(pcm),
            "durationSeconds": len(pcm) / sample_rate,
            "samplePeakDbFS": round(20 * math.log10(peak), 3) if peak else None,
            "truePeakDbTP": float(loudness["input_tp"]),
            "integratedLoudnessLUFS": float(loudness["input_i"]), "sha256": sha256(path)}
