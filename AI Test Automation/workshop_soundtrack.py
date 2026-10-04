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
    """Original chamber miniature: the code conflict stops before repair can breathe."""
    length = round(script["duration"] * SAMPLE_RATE)
    score = np.zeros((length, 2))
    # Harmony follows the workshop's recovery rather than looping a stock music bed.
    scenes = {scene["id"]: scene for scene in script["scenes"]}
    sections = [
        (scenes["overload"]["start"], scenes["purpose"]["start"], (41, 48, 57, 64)),  # F major 9: a plausible hope.
        (scenes["purpose"]["start"], scenes["upkeep"]["start"], (41, 48, 60, 65)),  # Clearer F major: purpose and proof.
        (scenes["upkeep"]["start"], scenes["stopFix"]["start"], (38, 45, 53, 60)),  # D minor 7: the upkeep conflict.
        # Stop & Fix has no harmony bed. The actual silence is part of the decision.
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
    melody = [("overload", 0, 0.18, 65),
              ("overload", 2, 0.18, 69),
              ("purpose", 0, 0.10, 72),
              ("purpose", 1, 0.08, 77),
              ("upkeep", 0, 0.18, 50),
              ("upkeep", 1, 0.18, 53),
              ("sandbox", 0, 0.18, 69),
              ("investigate", 5, 0.12, 70),
              ("selective", 1, 0.15, 67),
              ("optimize", 2, 0.12, 65),
              ("end", 1, 0.15, 69)]
    for index, (scene_id, caption, gap, midi) in enumerate(melody):
        scene = scenes[scene_id]
        start = scene["captionRanges"][caption]["speechEnd"] + gap
        duration = min(2.5, scene["end"] - start)
        if duration > 0.03:
            add_sound(score, start, felt(midi, duration), 0.025, 0.38 if index % 2 else 0.62)
    # Narration stays central. A gentle duck follows actual PCM activity, never estimated timing.
    voice = stereo_pcm(ASSETS / "narration.wav")[:, 0]
    block = SAMPLE_RATE // 100
    frames = voice.reshape(-1)[:len(voice) // block * block].reshape(-1, block)
    rms = np.sqrt(np.mean(frames ** 2, axis=1))
    smooth = np.convolve(rms, np.ones(21) / 21, mode="same")
    activity = np.interp(np.arange(length), np.arange(len(smooth)) * block, smooth)
    score *= (1 - 0.40 * np.minimum(1, activity / 0.045))[:, None]
    # No opening swell; leave the question and contrarian reply exposed.
    t = np.arange(length) / SAMPLE_RATE
    score *= (np.minimum(1, np.maximum(0, (t - scenes["overload"]["start"]) / 2))
              * np.minimum(1, np.maximum(0, (script["duration"] - t) / 1.35)))[:, None]
    # No musical carry-over across the stop, including preceding felt-note tails.
    stop, resume = scenes["stopFix"]["start"], scenes["sandbox"]["start"]
    hush = np.where(t < stop, np.clip((stop - t) / 0.12, 0, 1),
                    np.clip((t - resume) / 0.65, 0, 1))
    score *= hush[:, None]
    raw = WORK / "score-unmastered.wav"
    write_stereo(raw, score)
    return master(raw, ASSETS / "score.wav", -40, SAMPLE_RATE)


def build_effects(script):
    """Sparse tactile actions, synchronized with the final animation's causal beats."""
    effects = np.zeros((round(script["duration"] * SAMPLE_RATE), 2))
    rng = np.random.default_rng(20261004)
    # Each cue has a meaning; the film has no continuous beeping or decorative chatter.
    cues = [
        (2.65, "engineer pauses the offer", "tick", 57, 0.024, 0.38),
        (6.45, "first ticket lands", "paper", 0, 0.050, 0.63),
        (7.10, "second ticket lands", "paper", 0, 0.047, 0.61),
        (7.75, "third ticket lands", "paper", 0, 0.044, 0.59),
        (15.16, "purpose is checked against SAVE behavior", "tick", 65, 0.029, 0.42),
        (17.38, "test code becomes a maintenance burden", "paper", 0, 0.051, 0.62),
        (25.90, "AI piles additional weight onto upkeep", "paper", 0, 0.056, 0.58),
        (28.00, "STOP palm halts the accumulating code", "tick", 45, 0.066, 0.43),
        (30.60, "code is withdrawn instead of accumulated", "paper", 0, 0.035, 0.60),
        (32.00, "repair becomes the current work", "tick", 58, 0.022, 0.44),
        (39.325, "isolated environment is reset at the control", "paper", 0, 0.044, 0.55),
        (42.00, "engineer demonstrates the manual SAVE check", "tick", 65, 0.030, 0.42),
        (44.235, "engineer repairs the demonstrated SAVE defect", "tick", 58, 0.025, 0.46),
        (45.40, "AI presses SAVE to confirm the repair", "tick", 65, 0.030, 0.57),
        (46.82, "AI explores RELOAD in a second tab", "paper", 0, 0.035, 0.57),
        (47.98, "AI checks the known SEARCH behavior", "tick", 65, 0.028, 0.57),
        (50.225, "the new RELOAD finding reaches the engineer", "paper", 0, 0.039, 0.50),
        (51.97, "the engineer works on the new RELOAD defect", "tick", 58, 0.022, 0.46),
        (58.96, "learned checks settle into ordinary test code", "paper", 0, 0.044, 0.52),
        (60.80, "the mechanical test completes without AI", "tick", 67, 0.025, 0.52),
        (63.18, "the new-feature intent first becomes a failing test", "paper", 0, 0.032, 0.50),
        (65.12, "implemented feature satisfies the intent-first test", "felt", 72, 0.021, 0.50),
        (67.68, "a redundant check is physically removed", "paper", 0, 0.049, 0.47),
        (70.02, "a suitable local check runs as a fast unit", "tick", 72, 0.028, 0.44),
        (75.20, "spare AI works on a fix", "tick", 58, 0.023, 0.53),
        (76.10, "a lighter burden leaves room to work", "felt", 69, 0.019, 0.48),
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
