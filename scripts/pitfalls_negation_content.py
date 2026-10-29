"""Dialogue placement for the rule-negation film (Episode 2).

Draft narrator hook for paid TTS confirmation without mutating Episode 1.
Later audio work expands CAST, captions, and mix.
"""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "terry-moves/public/assets/pitfalls-negation"
TAKES = ASSETS / "audio"
MODEL = "gpt-4o-mini-tts"

# Design authority: 02-rule-negation-film-design.md — hook 0–2.5 s, Cedar.
CAST = [
    {
        "id": "opening",
        "role": "narrator",
        "voice": "cedar",
        "start": 0.02,
        "end": 2.50,
        "text": "Removing a rule is not requiring its opposite.",
        "speed": 1.05,
        "direction": (
            "The same warm perceptive narrator as the pitfalls series. "
            "Brisk connected ordinary speech naming the confusion. "
            "Brief light emphasis on removing and opposite, with no elongated "
            "syllables or theatrical contrast. No announcer or dramatic warning voice."
        ),
    },
]


def write_json(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n")
