"""Original deterministic ambience, action cues and quiet-gap measurement."""

import wave

import numpy as np


SEED = 20261030


def _rms(signal):
    return float(np.sqrt(np.mean(np.square(signal))))


def _db(value):
    return float(20 * np.log10(max(value, 1e-12)))


def _place(mixture, mono, when, rate):
    first = round(when * rate)
    last = min(len(mixture), first + len(mono))
    mixture[first:last] += mono[: last - first, None]


def _click(rng, rate, duration, pitch, amplitude):
    t = np.arange(round(duration * rate)) / rate
    noise = rng.normal(0, 1, len(t))
    noise = noise - np.convolve(noise, np.ones(11) / 11, mode="same")
    sound = 0.58 * noise + 0.42 * np.sin(2 * np.pi * pitch * t)
    return amplitude * sound * np.exp(-t * 155) * np.minimum(1, t / 0.0015)


def add_soundtrack(mixture, rate, placed_clips):
    """Add a mono-compatible bed and precisely placed cues in place; return provenance."""
    rng = np.random.default_rng(SEED)
    t = np.arange(len(mixture)) / rate
    seconds = len(mixture) / rate
    # Soft open fifth in the speech-adjacent midrange, with filtered air.
    pad = (
        0.75 * np.sin(2 * np.pi * 440 * t)
        + 0.34 * np.sin(2 * np.pi * 660.08 * t + 0.6)
        + 0.18 * np.sin(2 * np.pi * 880.17 * t + 1.4)
    )
    texture = np.convolve(rng.normal(0, 1, len(t)), np.ones(33) / 33, mode="same")
    texture -= np.convolve(texture, np.ones(321) / 321, mode="same")
    pad = 0.76 * pad / _rms(pad) + 0.24 * texture / _rms(texture)
    pad *= 0.0135 / _rms(pad)
    pad *= 0.96 + 0.04 * np.sin(2 * np.pi * t / 8)
    duck = np.ones(len(t))
    for clip in placed_clips:
        start, end = clip["speechStartSeconds"], clip["speechEndSeconds"]
        attack = np.clip((t - (start - 0.08)) / 0.08, 0, 1)
        release = np.clip(((end + 0.18) - t) / 0.18, 0, 1)
        duck = np.minimum(duck, 1 - 0.58 * np.minimum(attack, release))
    fade = np.minimum(np.clip(t / 0.06, 0, 1), np.clip((seconds - t) / 0.35, 0, 1))
    bed = pad * duck * fade
    mixture += bed[:, None]
    # Card simplifies to Connected at the intended-change scene start (~5.5 s).
    _place(mixture, _click(rng, rate, 0.040, 1520, 0.048), 5.52, rate)
    # Typing into the assistant request before Ask assistant (~9.0 s absolute).
    typing = [8.55, 8.68, 8.79, 8.91, 9.02, 9.11, 9.22, 9.31, 9.42]
    for index, when in enumerate(typing):
        _place(mixture, _click(rng, rate, 0.045, 1450 + index % 3 * 190, 0.043), when, rate)
    # Assistant completion timed to visible reply (~9.8 s).
    cue_t = np.arange(round(0.26 * rate)) / rate
    completion = np.zeros(len(cue_t))
    for offset, pitch in [(0, 660), (0.10, 880)]:
        local = cue_t - offset
        active = np.maximum(local, 0)
        envelope = np.where(
            local >= 0, np.minimum(active / 0.006, 1) * np.exp(-active * 19), 0
        )
        completion += 0.030 * np.sin(2 * np.pi * pitch * active) * envelope
    _place(mixture, completion, 9.80, rate)
    # Soft dismiss of the retired assertion in the close (~20.2 s absolute).
    _place(mixture, _click(rng, rate, 0.038, 1280, 0.046), 20.15, rate)
    cue_t = np.arange(round(0.22 * rate)) / rate
    dismiss = (
        0.032
        * np.sin(2 * np.pi * (480 * cue_t - 260 * cue_t**2))
        * np.minimum(cue_t / 0.007, 1)
        * np.exp(-cue_t * 16)
    )
    _place(mixture, dismiss, 20.20, rate)
    return {
        "origin": "Original offline synthesis; no stock audio or legacy test tones.",
        "seed": SEED,
        "bed": (
            "Soft open-fifth midrange pad and filtered air; ducked 7.5 dB under "
            "speech; extends through 30 seconds with a 350 ms final fade."
        ),
        "bedRmsDbFSBeforeMaster": round(_db(_rms(bed)), 2),
        "bedUnduckedTargetRmsDbFSBeforeMaster": round(_db(0.0135), 2),
        "typingSeconds": typing,
        "events": [
            {"event": "eligibility simplify click", "startSeconds": 5.52, "durationSeconds": 0.040},
            {"event": "assistant completion", "startSeconds": 9.80, "durationSeconds": 0.26},
            {"event": "retire dismiss click", "startSeconds": 20.15, "durationSeconds": 0.038},
            {"event": "retire soft dismiss", "startSeconds": 20.20, "durationSeconds": 0.22},
        ],
    }


def _longest_run(low, first, last, step):
    best, current, best_first = 0, 0, first
    for index in range(first, last):
        current = current + 1 if low[index] else 0
        if current > best:
            best, best_first = current, index - current + 1
    return {
        "durationSeconds": round(best * step, 3),
        "startSeconds": round(best_first * step, 3) if best else None,
        "endSeconds": round((best_first + best) * step, 3) if best else None,
    }


def measure_quiet(path, rate):
    """Measure the mastered file, with fully observed 500 ms smoothing windows."""
    with wave.open(str(path), "rb") as audio:
        assert audio.getframerate() == rate and audio.getsampwidth() == 2
        pcm = np.frombuffer(audio.readframes(audio.getnframes()), dtype="<i2").astype(float)
        pcm = pcm.reshape(-1, audio.getnchannels()) / 32768
    block = round(0.02 * rate)
    blocks = len(pcm) // block
    power = np.mean(pcm[: blocks * block].reshape(blocks, block, -1) ** 2, axis=(1, 2))
    smoothed = np.convolve(power, np.ones(25) / 25, mode="valid")
    quiet = smoothed <= 10 ** (-45 / 10)
    raw_quiet = power <= 10 ** (-45 / 10)
    windows = {}
    for start, end in [(0, len(pcm) / rate), (8.5, 10.5), (10.5, 14.5)]:
        first = max(0, int(np.ceil(start / 0.02)))
        last = min(len(quiet), int(np.floor((end - 0.5) / 0.02)) + 1)
        windows[f"{start:g}–{end:g}s"] = {
            "longestSmoothedLowRun": _longest_run(quiet, first, max(first, last), 0.02),
            "longestRaw20msLowRun": _longest_run(
                raw_quiet, round(start / 0.02), min(blocks, round(end / 0.02)), 0.02
            ),
            "minimumSmoothedRmsDbFS": (
                round(_db(np.sqrt(np.min(smoothed[first:last]))), 2) if last > first else None
            ),
            "minimumRaw20msRmsDbFS": round(
                _db(np.sqrt(np.min(power[round(start / 0.02) : min(blocks, round(end / 0.02))]))),
                2,
            ),
            "rmsDbFS": round(_db(_rms(pcm[round(start * rate) : round(end * rate)])), 2),
        }
    return {
        "method": (
            "Stereo channel-mean power in nonoverlapping 20 ms blocks; moving mean of "
            "25 block powers (500 ms), valid windows only; low means RMS <= -45 dBFS. "
            "Smoothed-run times identify starts of consecutive qualifying 500 ms windows."
        ),
        "thresholdDbFS": -45,
        "blockMilliseconds": 20,
        "smoothingMilliseconds": 500,
        "windows": windows,
    }
