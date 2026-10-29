#!/usr/bin/env python3
"""Original 20-second instrumental: cover, the code within, AI, inquiry.

Offline and deterministic. Uses the same NumPy audio tooling as other films.
Run from any directory; writes only this film's score and cue/level metadata.
"""

import json
from pathlib import Path
import wave

import numpy as np


RATE = 48000
SECONDS = 20
DEST = Path(__file__).resolve().parents[1] / "terry-moves/public/assets/listen-to-code"
mix = np.zeros((RATE * SECONDS, 2), dtype=np.float64)
rng = np.random.default_rng(20261020)


def add(start, signal, pan=0.0, level=1.0):
    """Equal-power stereo placement; trim tails at the actual film boundary."""
    first = round(start * RATE)
    count = min(len(signal), len(mix) - first)
    if count <= 0:
        return
    angle = (pan + 1) * np.pi / 4
    mix[first:first + count, 0] += signal[:count] * np.cos(angle) * level
    mix[first:first + count, 1] += signal[:count] * np.sin(angle) * level


def pluck(at, frequency, length=1.8, level=0.13, pan=0.0, detune=0.0):
    t = np.arange(round(length * RATE)) / RATE
    attack = 1 - np.exp(-t * 220)
    tone = (
        np.sin(2 * np.pi * frequency * t) * np.exp(-t * 2.3)
        + 0.22 * np.sin(2 * np.pi * frequency * 2 * t) * np.exp(-t * 5)
        + 0.11 * np.sin(2 * np.pi * frequency * 3.002 * t) * np.exp(-t * 8)
    )
    if detune:
        tone += 0.3 * np.sin(2 * np.pi * (frequency + detune) * t) * np.exp(-t * 2)
    sound = tone * attack * np.minimum(1, np.maximum(0, (length - t) / 0.08))
    add(at, sound, pan, level)
    for delay, gain in [(0.137, 0.2), (0.281, 0.12), (0.457, 0.065)]:
        add(at + delay, sound, -pan, level * gain)


def pad(at, length, frequencies, level=0.027):
    t = np.arange(round(length * RATE)) / RATE
    envelope = np.sin(np.pi * np.clip(t / length, 0, 1)) ** 1.4
    for i, frequency in enumerate(frequencies):
        sound = (
            np.sin(2 * np.pi * frequency * t)
            + 0.25 * np.sin(2 * np.pi * frequency * 1.002 * t)
        ) * envelope
        add(at, sound, (i % 3 - 1) * 0.45, level)


def tick(at, level=0.018, pan=0.0):
    t = np.arange(round(0.055 * RATE)) / RATE
    noise = rng.normal(size=len(t))
    filtered = np.r_[0.0, np.diff(noise)]
    sound = (0.5 * filtered + np.sin(2 * np.pi * 1800 * t)) * np.exp(-t * 105)
    add(at, sound, pan, level)


# 0–2: the familiar listening invitation.
pad(0, 2.6, [146.832, 220.0, 329.628], 0.027)
for at, note, pan in [(0.12, 293.665, -0.25), (0.62, 440.0, 0.15), (1.12, 659.255, 0.35)]:
    pluck(at, note, pan=pan)

# 2–7: a functioning exterior, an awkward internal rhythm, a human listening.
# The rhythm moves from the creature's side toward the listener's side.
pad(2, 5.2, [146.832, 220.0, 329.628], 0.018)
for i, note in enumerate([293.665, 440.0, 587.33, 440.0, 659.255]):
    pluck(2.15 + i, note, length=1.8, level=0.09, pan=-0.45 + i * 0.2, detune=2 + i * 0.5)
for i in range(9):
    at = 2.5 + i * 0.5
    pluck(at, 293.665 if i % 2 else 440.0, length=0.6, level=0.043, pan=-0.55 + i * 0.13)

# 7–9.5: the phrase becomes a faster machine exchange, no alien menace.
notes = [293.665, 440.0, 659.255, 587.33]
pad(7, 2.7, [146.832, 220.0], 0.018)
for i in range(10):
    at = 7 + i * 0.25
    pluck(at, notes[i % 4], length=0.65, level=0.085, pan=(-0.55 if i % 2 else 0.55))
    tick(at, pan=(-0.45 if i % 2 else 0.45))

# 9.5–12: a small perturbation propagates through that established rhythm.
pad(9.5, 2.7, [146.832, 155.563, 220.0], 0.022)
for i in range(10):
    at = 9.5 + i * 0.25
    pluck(at, notes[i % 4], length=0.9, level=0.075, pan=np.sin(i) * 0.6, detune=3.5 + i * 0.35)
    tick(at, level=0.016 + i * 0.0007, pan=np.cos(i) * 0.5)
for at in [10.1, 10.8, 11.4]:
    pluck(at, 311.127, length=1.1, level=0.07, pan=-0.3, detune=5)

# 12: the mechanism stops. Leave a breath before the first question.
pluck(12.2, 440.0, length=2.8, level=0.11, pan=-0.15)
pluck(13.5, 523.251, length=2.0, level=0.095, pan=0.2)
pad(12.5, 2.5, [146.832, 220.0], 0.014)

# 15–20: space, two questions, a suspended ending rather than a resolution.
pad(15.0, 5, [146.832, 220.0, 329.628], 0.018)
pluck(15.15, 293.665, length=3.5, level=0.13, pan=-0.2)
pluck(16.55, 440.0, length=3.0, level=0.10, pan=0.25)
pluck(18.1, 659.255, length=1.9, level=0.085, pan=0.05)

# Restrained master: no clipping, no abrupt start/end, exact 960,000 samples.
fade_in = np.minimum(1, np.arange(len(mix)) / (RATE * 0.018))
fade_out = np.minimum(1, np.arange(len(mix))[::-1] / (RATE * 0.65))
mix *= (fade_in * fade_out)[:, None]
mix -= np.mean(mix, axis=0)
peak = float(np.max(np.abs(mix)))
mix *= (10 ** (-2.0 / 20)) / peak
pcm = np.rint(np.clip(mix, -1, 1) * 32767).astype("<i2")
DEST.mkdir(parents=True, exist_ok=True)
with wave.open(str(DEST / "score-v4.wav"), "wb") as output:
    output.setnchannels(2)
    output.setsampwidth(2)
    output.setframerate(RATE)
    output.writeframes(pcm.tobytes())

metadata = {
    "title": "Still listening — the code within",
    "authorship": "Original procedural instrumental composed for this film; no sampled recording or voice.",
    "durationSeconds": SECONDS,
    "sampleRate": RATE,
    "samples": len(mix),
    "channels": 2,
    "peakDbfs": round(20 * np.log10(np.max(np.abs(mix))), 3),
    "rmsDbfs": round(20 * np.log10(np.sqrt(np.mean(mix ** 2))), 3),
    "cues": {"listen": 0, "insideProduct": 2, "aiWritesAndReviews": 7, "strain": 9.5, "howDoWeHear": 12, "beyondCode": 15},
    "seed": 20261020,
}
(DEST / "score-v4.json").write_text(json.dumps(metadata, indent=2) + "\n")
print(json.dumps(metadata))
