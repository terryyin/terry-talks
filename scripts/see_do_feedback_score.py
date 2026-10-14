"""Original oscillator score for See · Do · Feedback.

Owns the authored notes, synthesis, breathing room for speech, and score credit.
The producer owns file measurement and the complete production record.
"""

from array import array

import numpy as np

from narration_audio import write_pcm


def compose_score(output, rate, duration, spoken_cues):
    samples = np.zeros(rate * duration, dtype=np.float64)
    notes = []

    def add(at, midi, gain, length, pad=False):
        notes.append({"at": at, "midi": midi, "gain": gain, "length": length, "pad": pad})

    # Open fifths leave emotional room; the major third appears only at the end.
    for at, midi, gain, length in [(0, 50, .012, 10.8), (0, 57, .007, 10.8),
                                   (8.6, 55, .009, 10.3), (8.6, 62, .006, 10.3),
                                   (17.1, 57, .009, 11.5), (17.1, 64, .005, 11.5),
                                   (25.5, 50, .012, 4.5), (25.5, 57, .006, 4.5),
                                   (26.05, 66, .006, 3.95)]:
        add(at, midi, gain, length, True)
    for at, midi, gain, length in [(0.45, 74, .042, 3.2), (1.5, 69, .020, 2.8),
                                   (3.05, 62, .015, 3), (6.55, 74, .031, 3.2),
                                   (8.1, 76, .018, 2.8), (10.1, 69, .024, 3),
                                   (13.5, 76, .030, 2), (15.8, 74, .030, 2),
                                   (17.1, 69, .022, 3), (20.6, 76, .025, 3.2),
                                   (23.35, 78, .018, 2.8), (26.0, 74, .040, 4),
                                   (26.8, 78, .018, 3.2), (27.6, 81, .014, 2.4)]:
        add(at, midi, gain, length)
    for note in notes:
        n = min(round(note["length"] * rate), len(samples) - round(note["at"] * rate))
        t = np.arange(n) / rate
        hz = 440 * 2 ** ((note["midi"] - 69) / 12)
        if note["pad"]:
            envelope = np.minimum(1, t / 1.4) * np.minimum(1, np.maximum(0, (note["length"] - t) / 2.4))
            tone = .8 * np.sin(2 * np.pi * hz * t) + .2 * np.sin(2 * np.pi * hz * 1.0011 * t)
        else:
            envelope = (1 - np.exp(-t * 105)) * np.exp(-t * 1.5)
            tone = np.sin(2 * np.pi * hz * t) + .23 * np.sin(2 * np.pi * hz * 2.003 * t) + .06 * np.sin(2 * np.pi * hz * 3.998 * t)
        start = round(note["at"] * rate)
        samples[start:start + n] += tone * envelope * note["gain"]
    dry = samples.copy()
    for delay, gain in [(.17, .11), (.31, .07), (.49, .035)]:
        offset = round(delay * rate)
        samples[offset:] += dry[:-offset] * gain
    t = np.arange(len(samples)) / rate
    fade = np.minimum(1, t / .45) * np.minimum(1, np.maximum(0, (duration - t) / 1.6))
    # Give narration its space without a pumping compressor.
    duck = np.ones(len(samples))
    for cue in spoken_cues:
        attack = np.clip((t - cue["start"] + .14) / .14, 0, 1)
        release = np.clip((cue["end"] + .2 - t) / .2, 0, 1)
        duck *= 1 - .23 * np.minimum(attack, release)
    master_gain = 2.8
    samples *= fade * duck * master_gain
    write_pcm(output, array("h", np.rint(np.clip(samples, -1, 1) * 32767).astype(np.int16).tolist()), rate)
    return {
        "credit": "Original film score composed and synthesized for Terry; no recordings, samples, or external services",
        "direction": "Warm low open-fifth pad and sparse damped string tones; human feedback responses at 13.5s/15.8s; hopeful D-major resolution at 26s",
        "source": "scripts/see_do_feedback_score.py", "synthesisVersion": "1",
        "masterGain": master_gain, "notes": notes,
    }
