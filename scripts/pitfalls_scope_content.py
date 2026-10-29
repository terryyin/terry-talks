"""Dialogue, placement and caption phrases for the scope-restriction film."""

import json
from pathlib import Path

from narration_audio import tokens

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "AI Augmented Development Pitfalls"
ASSETS = ROOT / "terry-moves/public/assets/pitfalls-scope"
TAKES = ASSETS / "audio"
RECORD = CONTENT / "01-film-audio.json"
CAPTIONS = CONTENT / "01-film-captions.json"
SRT = CONTENT / "01-film.srt"
MIX = ASSETS / "mix-v3.wav"
RATE, DURATION, MODEL = 48000, 30, "gpt-4o-mini-tts"

CAST = [
    {"id": "opening", "role": "narrator", "voice": "cedar", "start": .12, "end": 2.30,
     "text": "An example became a product limit.", "speed": 1.00,
     "direction": "The same warm perceptive narrator, opening with a clear concise observation. Brisk ordinary speech, with gentle emphasis on example and product limit. No announcer or dramatic warning voice."},
    {"id": "owner", "role": "product owner", "voice": "coral", "start": 2.50, "end": 8.85,
     "text": "For early feedback, let’s keep the first user story’s scope small: tag a few contacts, say three.", "speed": 1.14,
     "direction": "The same thoughtful product owner speaking to a colleague during refinement. Connected brisk natural conversation, around 175 to 185 words per minute. Complete this 17-word line in at most 6.25 seconds. Keep words flowing together; no deliberate pauses between words or elongated syllables. Only a tiny purposeful clause pause. Constructive and practical, with light emphasis on this user story's scope. Give say three the quick casual inflection of suggesting an example, never a maximum. No dramatic delivery."},
    {"id": "developer", "role": "developer", "voice": "ash", "start": 9.05, "end": 12.55,
     "text": "I’ll ask the agent to enforce a maximum of three.", "speed": 1.06,
     "direction": "A sincere capable developer speaking to a colleague. Quietly confident, practical, unhurried but compact. No caricature or robot affect."},
    {"id": "demo", "role": "product owner", "voice": "coral", "start": 16.35, "end": 18.75,
     "text": "Why can’t I tag four?", "speed": .99,
     "direction": "The same product owner at the demo, genuinely frustrated and concerned that a straightforward task is blocked. Speak with a sharper questioning edge and audible disappointment; stress FOUR, as in why on earth is four blocked? This is an honest emotional reaction from a capable adult, not merely a curious question. No cartoon shouting, sneering or sarcasm. Preserve the supplied words exactly."},
    {"id": "clarification", "role": "product owner", "voice": "coral", "start": 19.10, "end": 22.85,
     "text": "Three was our example. We never agreed a maximum.", "speed": 1.14,
     "direction": "The same product owner responding to the blocked demo. Firm and concerned, explaining the misunderstanding to a colleague at a brisk connected natural pace around 175 to 185 words per minute. Complete this nine-word line in at most 3.65 seconds. Use a short purposeful sentence-boundary pause; no deliberate pauses between individual words, no elongated syllables. Brief audible stress on EXAMPLE and MAXIMUM, without drawing them out. Professional and explanatory, with residual frustration, no shouting, sarcasm or theatrical performance."},
    {"id": "closing", "role": "narrator", "voice": "cedar", "start": 23.10, "end": 29.75,
     "text": "Clarify what this story must deliver—and what the product must reject. With people and AI.", "speed": 1.00,
     "direction": "The same warm perceptive narrator. A lucid practical takeaway: emphasize what the story must deliver, then what the product must reject. Connected conversational speech with a short natural pause before With people and AI. Pronounce AI as the two English letters A I. Calm clarity, not a promotional sign-off."},
]

CAPTION_PHRASES = {
    "opening": ["An example became a product limit."],
    "owner": ["For early feedback,", "let’s keep the first user story’s scope small:", "tag a few contacts, say three."],
    "developer": ["I’ll ask the agent", "to enforce a maximum of three."],
    "demo": ["Why can’t I tag four?"],
    "clarification": ["Three was our example.", "We never agreed a maximum."],
    "closing": ["Clarify what this story must deliver—", "and what the product must reject.", "With people and AI."],
}


def write_json(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n")


def subtitle_time(milliseconds):
    return f"{milliseconds // 3600000:02}:{milliseconds // 60000 % 60:02}:{milliseconds // 1000 % 60:02},{milliseconds % 1000:03}"


def serialize_captions(captions):
    write_json(CAPTIONS, captions)
    SRT.write_text("\n\n".join(
        f"{index}\n{subtitle_time(c['startMs'])} --> {subtitle_time(c['endMs'])}\n{c['text']}"
        for index, c in enumerate(captions, 1)) + "\n")


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
            start = max(cue["start"] - .06, phrase[0]["start"])
            end = min(cue["end"], phrase[-1]["end"] + .06)
            result.append({"text": content, "startMs": round(start * 1000),
                           "endMs": round(end * 1000), "timestampMs": None,
                           "confidence": None})
    if offset != len(words):
        raise ValueError("Caption phrases do not account for every audited word")
    for current, following in zip(result, result[1:]):
        current["endMs"] = min(current["endMs"], following["startMs"])
    return result
