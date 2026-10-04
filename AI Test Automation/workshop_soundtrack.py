"""Original workshop score, causal accents and deterministic stereo mix.

The film's production entry point owns narration and documents. This module
owns its composed soundtrack, PCM layers and measured final stereo mix.
"""

from array import array
import hashlib
import json
from pathlib import Path
import wave

import numpy as np

from narration_audio import master, run, write_pcm


ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / "terry-moves" / "out" / "ai-test-automation-audio"
ASSETS = ROOT / "terry-moves" / "public" / "assets" / "ai-test-automation"
SAMPLE_RATE = 48000


def note(midi):
    return 440 * 2 ** ((midi - 69) / 12)


def stereo_pcm(path):
    with wave.open(str(path), "rb") as source:
        assert source.getframerate() == SAMPLE_RATE and source.getsampwidth() == 2
        channels = source.getnchannels()
        samples = np.frombuffer(source.readframes(source.getnframes()), dtype="<i2").astype(float)
    samples = samples.reshape(-1, channels) / 32768
    return np.repeat(samples, 2, axis=1) if channels == 1 else samples


def write_stereo(path, samples):
    if np.max(np.abs(samples)) >= 1:
        raise ValueError(f"Unmastered audio clips: {path.name}")
    pcm = array("h", np.rint(samples.reshape(-1) * 32767).astype(np.int16))
    write_pcm(path, pcm, SAMPLE_RATE, channels=2)


def add_sound(track, start, sound, gain=1, pan=0.5):
    first = round(start * SAMPLE_RATE)
    last = min(len(track), first + len(sound))
    if first < 0 or last <= first:
        raise ValueError("A sound cue falls outside the fixed film.")
    track[first:last, 0] += sound[:last - first] * gain * np.sqrt(1 - pan)
    track[first:last, 1] += sound[:last - first] * gain * np.sqrt(pan)


def felt(midi, duration=2.5):
    """A soft original mallet tone: rounded attack, damped inharmonic wood partials."""
    t = np.arange(round(duration * SAMPLE_RATE)) / SAMPLE_RATE
    frequency = note(midi)
    attack = 1 - np.exp(-t * 85)
    tone = (np.sin(2 * np.pi * frequency * t) * np.exp(-t * 2.3)
            + 0.19 * np.sin(2 * np.pi * frequency * 2.003 * t) * np.exp(-t * 4.7)
            + 0.035 * np.sin(2 * np.pi * frequency * 3.009 * t) * np.exp(-t * 9))
    return tone * attack * np.minimum(1, (duration - t) / 0.18)


def paper(rng, duration=0.28):
    """Soft paper movement, with a smoothed grain rather than a piercing hiss."""
    t = np.arange(round(duration * SAMPLE_RATE)) / SAMPLE_RATE
    grain = np.convolve(rng.normal(0, 1, len(t)), np.ones(23) / 23, mode="same")
    envelope = np.sin(np.pi * t / duration) ** 2
    return grain * envelope * (0.75 + 0.25 * np.sin(2 * np.pi * 37 * t))


def wooden_tick(midi=62, duration=0.16):
    t = np.arange(round(duration * SAMPLE_RATE)) / SAMPLE_RATE
    attack = 1 - np.exp(-t * 480)
    frequency = note(midi)
    return attack * np.exp(-t * 35) * (
        np.sin(2 * np.pi * frequency * t)
        + 0.2 * np.sin(2 * np.pi * frequency * 2.68 * t))


def build_score(script):
    """Original F-major chamber miniature: roomy felt notes and warm open harmony."""
    length = round(script["duration"] * SAMPLE_RATE)
    score = np.zeros((length, 2))
    # Harmony follows the workshop's recovery rather than looping a stock music bed.
    scenes = {scene["id"]: scene for scene in script["scenes"]}
    sections = [
        (scenes["overload"]["start"], scenes["upkeep"]["start"], (41, 48, 57, 64)),  # F major 9: a plausible hope.
        (scenes["upkeep"]["start"], scenes["sandbox"]["start"], (38, 45, 53, 60)),  # D minor 7: the upkeep conflict.
        (scenes["sandbox"]["start"], scenes["selective"]["start"], (46, 53, 57, 60)),  # B-flat major 9: practical action.
        (scenes["selective"]["start"], scenes["optimize"]["start"], (48, 55, 62, 64)),  # C major 9: intent guides code.
        (scenes["optimize"]["start"], script["duration"], (41, 48, 57, 62)),  # F major 6: lighter work.
    ]
    for first, last, chord in sections:
        duration = last - first
        t = np.arange(round(duration * SAMPLE_RATE)) / SAMPLE_RATE
        envelope = np.minimum(1, t / 1.7) * np.minimum(1, (duration - t) / 1.8)
        for index, midi in enumerate(chord):
            frequency = note(midi)
            # Slowly breathing pure/soft overtones leave the consonants of speech open.
            breath = 0.85 + 0.15 * np.sin(2 * np.pi * t / 7 + index * 0.8)
            tone = (np.sin(2 * np.pi * frequency * t)
                    + 0.065 * np.sin(2 * np.pi * frequency * 2 * t + 0.4))
            add_sound(score, first, tone * breath * envelope, 0.009, 0.22 + index * 0.18)
    # Sparse felt-note entrances follow measured clause endings.
    melody = [(scenes["overload"]["captionRanges"][0]["speechEnd"] + 0.18, 65),
              (scenes["overload"]["captionRanges"][2]["speechEnd"] + 0.18, 69),
              (scenes["upkeep"]["captionRanges"][1]["speechEnd"] + 0.18, 62),
              (scenes["upkeep"]["captionRanges"][3]["speechEnd"] + 0.12, 65),
              (scenes["sandbox"]["captionRanges"][0]["speechEnd"] + 0.18, 69),
              (scenes["investigate"]["captionRanges"][1]["speechEnd"] + 0.12, 70),
              (scenes["selective"]["captionRanges"][1]["speechEnd"] + 0.15, 67),
              (scenes["optimize"]["captionRanges"][2]["speechEnd"] + 0.12, 65),
              (scenes["end"]["captionRanges"][1]["speechEnd"] + 0.15, 69)]
    for index, (start, midi) in enumerate(melody):
        add_sound(score, start, felt(midi), 0.025, 0.38 if index % 2 else 0.62)
    # Narration stays central. A gentle duck follows actual PCM activity, never estimated timing.
    voice = stereo_pcm(ASSETS / "narration.wav")[:, 0]
    block = SAMPLE_RATE // 100
    frames = voice.reshape(-1)[:len(voice) // block * block].reshape(-1, block)
    rms = np.sqrt(np.mean(frames ** 2, axis=1))
    smooth = np.convolve(rms, np.ones(21) / 21, mode="same")
    activity = np.interp(np.arange(length), np.arange(len(smooth)) * block, smooth)
    score *= (1 - 0.25 * np.minimum(1, activity / 0.045))[:, None]
    # No opening swell; leave the question and contrarian reply exposed.
    t = np.arange(length) / SAMPLE_RATE
    score *= (np.minimum(1, np.maximum(0, (t - scenes["overload"]["start"]) / 2))
              * np.minimum(1, np.maximum(0, (script["duration"] - t) / 1.35)))[:, None]
    raw = WORK / "score-unmastered.wav"
    write_stereo(raw, score)
    return master(raw, ASSETS / "score.wav", -40, SAMPLE_RATE)


def build_effects(script):
    """Sparse tactile actions, synchronized with the final animation's causal beats."""
    effects = np.zeros((round(script["duration"] * SAMPLE_RATE), 2))
    rng = np.random.default_rng(20261004)
    # Each cue has a meaning; the film has no continuous beeping or decorative chatter.
    cues = [
        (2.85, "engineer pauses the offer", "tick", 57, 0.030, 0.38),
        (5.70, "first ticket arrives", "paper", 0, 0.054, 0.63),
        (6.70, "second ticket arrives", "paper", 0, 0.049, 0.61),
        (7.70, "third ticket arrives", "paper", 0, 0.045, 0.59),
        (13.40, "code spool becomes upkeep", "paper", 0, 0.057, 0.62),
        (25.70, "one targeted check protects intent", "felt", 69, 0.024, 0.50),
        (35.80, "engineer demonstrates the manual check", "tick", 65, 0.033, 0.42),
        (36.65, "same starting state is restored", "paper", 0, 0.055, 0.55),
        (37.60, "AI repeats the demonstrated action", "tick", 65, 0.033, 0.57),
        (38.95, "finding is handed to the engineer", "paper", 0, 0.044, 0.50),
        (40.95, "repair is followed by a successful retest", "felt", 69, 0.025, 0.46),
        (46.45, "ordinary test code runs without AI", "paper", 0, 0.048, 0.52),
        (52.60, "feature satisfies the intent-first test", "felt", 72, 0.021, 0.50),
        (57.10, "a duplicate check is removed", "paper", 0, 0.057, 0.47),
        (59.20, "a suitable local check moves to a unit", "tick", 72, 0.031, 0.44),
        (61.20, "essential end-to-end protection stays", "felt", 65, 0.022, 0.52),
        (65.50, "a lighter queue leaves room to work", "felt", 69, 0.020, 0.48),
    ]
    for start, _, kind, midi, gain, pan in cues:
        sound = paper(rng) if kind == "paper" else wooden_tick(midi) if kind == "tick" else felt(midi, 1.4)
        add_sound(effects, start, sound, gain, pan)
    (WORK / "sound-cues.json").write_text(json.dumps([
        {"time": t, "action": action, "sound": kind} for t, action, kind, *_ in cues
    ], indent=2) + "\n")
    raw = WORK / "effects-unmastered.wav"
    write_stereo(raw, effects)
    return master(raw, ASSETS / "effects.wav", -39, SAMPLE_RATE)


def measure(path):
    analysis = run(["ffmpeg", "-hide_banner", "-i", str(path), "-af",
                    "loudnorm=I=-18:TP=-1.5:LRA=7:print_format=json", "-f", "null", "-"])
    return json.JSONDecoder().raw_decode(analysis.stderr[analysis.stderr.rfind("{"):])[0]


def build_mix(script):
    layers = [stereo_pcm(ASSETS / name) for name in ("narration.wav", "score.wav", "effects.wav")]
    assert all(len(layer) == round(script["duration"] * SAMPLE_RATE) for layer in layers)
    raw = WORK / "mix-unmastered.wav"
    write_stereo(raw, sum(layers))
    master(raw, ASSETS / "mix.wav", -18, SAMPLE_RATE)
    mix = stereo_pcm(ASSETS / "mix.wav")
    report = {
        "duration": len(mix) / SAMPLE_RATE, "sampleRate": SAMPLE_RATE, "channels": 2,
        "voice": measure(ASSETS / "narration.wav"),
        "score": measure(ASSETS / "score.wav"),
        "effects": measure(ASSETS / "effects.wav"),
        "mix": measure(ASSETS / "mix.wav"),
        "samplePeakDbfs": float(20 * np.log10(np.max(np.abs(mix)))),
        "clippedSamples": int(np.count_nonzero(np.abs(mix) >= 1)),
        "mixSha256": hashlib.sha256((ASSETS / "mix.wav").read_bytes()).hexdigest(),
    }
    (WORK / "mix-analysis.json").write_text(json.dumps(report, indent=2) + "\n")
    return report
