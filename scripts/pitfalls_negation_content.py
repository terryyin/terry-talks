"""Dialogue, placement and caption phrases for the rule-negation film."""

import json
from pathlib import Path

from narration_audio import tokens

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "AI Augmented Development Pitfalls"
ASSETS = ROOT / "terry-moves/public/assets/pitfalls-negation"
TAKES = ASSETS / "audio"
RECORD = CONTENT / "02-film-audio.json"
CAPTIONS = CONTENT / "02-film-captions.json"
SRT = CONTENT / "02-film.srt"
MIX = ASSETS / "mix-v1.wav"
RATE, DURATION, MODEL = 48000, 30, "gpt-4o-mini-tts"

# Design: 02-rule-negation-film-design.md. Closing spoken cue equals on-screen close.
CAST = [
    {
        "id": "opening",
        "role": "narrator",
        "voice": "cedar",
        "start": 0.02,
        "end": 2.50,
        "text": "Removing a rule is not requiring its opposite.",
        "speed": 1.22,
        "direction": (
            "The same warm perceptive narrator as the pitfalls series. "
            "Brisk connected ordinary speech naming the confusion as one linked "
            "thought. Finish the complete eight-word line in about 2.3 seconds. "
            "Keep flowing; brief light emphasis on removing and opposite, with no "
            "elongated syllables or theatrical contrast. No announcer or dramatic "
            "warning voice."
        ),
    },
    {
        "id": "drop_entry",
        "role": "developer",
        "voice": "ash",
        "start": 2.60,
        "end": 5.20,
        "text": "Drop the entry-started check.",
        "speed": 1.08,
        "direction": (
            "The same sincere capable developer speaking while looking at a "
            "holdings eligibility card. Quietly confident, practical, connected "
            "and compact. Light stress on entry-started as the obsolete gate. "
            "No caricature or robot affect, no elongated syllables."
        ),
    },
    {
        "id": "refresh_schedule",
        "role": "developer",
        "voice": "ash",
        "start": 5.65,
        "end": 8.85,
        "text": "Connected accounts should refresh on a schedule.",
        "speed": 1.10,
        "direction": (
            "The same sincere capable developer stating the intended change "
            "before asking the assistant. Connected brisk natural conversation. "
            "Brief light emphasis on Connected and schedule. No caricature, no "
            "elongated syllables, no theatrical pause."
        ),
    },
    {
        "id": "cost",
        "role": "narrator",
        "voice": "cedar",
        "start": 14.60,
        "end": 18.70,
        "text": "History still occupies the suite.",
        "speed": 1.05,
        "direction": (
            "The same warm perceptive narrator. A lucid practical observation of "
            "the maintenance cost, conversational and decisive. Brief emphasis on "
            "History and occupies. Connected speech, no drawn-out dramatic delivery."
        ),
    },
    {
        "id": "closing",
        "role": "narrator",
        "voice": "cedar",
        "start": 19.20,
        "end": 29.50,
        "text": (
            "Describe what is true now. Keep checks that protect current behavior. "
            "Retire what only remembers the old rule."
        ),
        "speed": 1.02,
        "direction": (
            "The same warm perceptive narrator. A lucid practical takeaway, "
            "conversational and decisive. Treat the three sentences as one "
            "continuous close. Short purposeful sentence-boundary pauses only; "
            "no elongated syllables. Brief audible stress on true now, Keep, and "
            "Retire. Calm clarity that protects current capability without "
            "teaching that every negative check is waste. Not a promotional sign-off."
        ),
    },
]

CAPTION_PHRASES = {
    "opening": ["Removing a rule is not requiring its opposite."],
    "drop_entry": ["Drop the entry-started check."],
    "refresh_schedule": ["Connected accounts should", "refresh on a schedule."],
    "cost": ["History still occupies the suite."],
    "closing": [
        "Describe what is true now.",
        "Keep checks that protect current behavior.",
        "Retire what only remembers the old rule.",
    ],
}


def write_json(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n")


def subtitle_time(milliseconds):
    return (
        f"{milliseconds // 3600000:02}:{milliseconds // 60000 % 60:02}:"
        f"{milliseconds // 1000 % 60:02},{milliseconds % 1000:03}"
    )


def serialize_captions(captions):
    write_json(CAPTIONS, captions)
    SRT.write_text(
        "\n\n".join(
            f"{index}\n{subtitle_time(c['startMs'])} --> {subtitle_time(c['endMs'])}\n{c['text']}"
            for index, c in enumerate(captions, 1)
        )
        + "\n"
    )


def phrase_captions(words):
    result, offset = [], 0
    for cue in CAST:
        for content in CAPTION_PHRASES[cue["id"]]:
            count = len(tokens(content))
            phrase = words[offset:offset + count]
            if len(phrase) != count:
                raise ValueError("Caption phrase exceeds the audited word count")
            offset += count
            # Restore script punctuation and preserve speaker boundaries; Whisper
            # word timestamps have no sentence punctuation and can lead speech.
            start = max(cue["start"] - 0.06, phrase[0]["start"])
            end = min(cue["end"], phrase[-1]["end"] + 0.06)
            result.append(
                {
                    "text": content,
                    "startMs": round(start * 1000),
                    "endMs": round(end * 1000),
                    "timestampMs": None,
                    "confidence": None,
                }
            )
    if offset != len(words):
        raise ValueError("Caption phrases do not account for every audited word")
    for current, following in zip(result, result[1:]):
        current["endMs"] = min(current["endMs"], following["startMs"])
    return result
