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
MIX = ASSETS / "mix-v4.wav"
RATE, DURATION, MODEL = 48000, 30, "gpt-4o-mini-tts"

CAST = [
    {"id": "opening", "role": "narrator", "voice": "cedar", "start": .02, "end": 2.38,
     "text": "She said three. He heard maximum.", "speed": 1.20,
     "direction": "The same warm perceptive narrator, brisk connected ordinary speech. Treat this as one linked six-word thought and finish in two seconds. Keep flowing straight from three to he, with no deliberate sentence pause. Brief light emphasis on three and maximum, with no elongated syllables or theatrical contrast. No announcer or dramatic warning voice."},
    {"id": "owner", "role": "product owner", "voice": "coral", "start": 2.50, "end": 7.72,
     "text": "For early feedback, let’s keep the first user story’s scope small: tag a few contacts, say three.", "speed": 1.14,
     "direction": "The same thoughtful product owner speaking to a colleague during refinement. Connected brisk natural conversation, around 175 to 185 words per minute. Complete this 17-word line in at most 6.25 seconds. Keep words flowing together; no deliberate pauses between words or elongated syllables. Only a tiny purposeful clause pause. Constructive and practical, with light emphasis on this user story's scope. Give say three the quick casual inflection of suggesting an example, never a maximum. No dramatic delivery."},
    {"id": "developer", "role": "developer", "voice": "ash", "start": 7.81, "end": 11.76,
     "text": "Maximum three, to be safe. I’ll ask the agent.", "speed": 1.10,
     "direction": "The same sincere capable developer speaking to a colleague. Quietly confident, practical, connected and compact, around 170 words per minute. Maximum three is the developer's assumption; to be safe is a casual sincere rationale, not a sinister aside. A small sentence-boundary pause before I'll ask the agent. No caricature or robot affect, no elongated syllables."},
    {"id": "demo", "role": "product owner", "voice": "coral", "start": 15.30, "end": 17.75,
     "text": "Why can’t I tag four?", "speed": .99,
     "direction": "The same product owner at the demo, genuinely frustrated and concerned that a straightforward task is blocked. Speak with a sharper questioning edge and audible disappointment; stress FOUR, as in why on earth is four blocked? This is an honest emotional reaction from a capable adult, not merely a curious question. No cartoon shouting, sneering or sarcasm. Preserve the supplied words exactly."},
    {"id": "clarification", "role": "product owner", "voice": "coral", "start": 18.05, "end": 22.10,
     "text": "Three was our example. We never agreed on a maximum.", "speed": 1.10,
     "direction": "The same product owner responding to the blocked demo. Firm and concerned, explaining the misunderstanding to a colleague at a brisk connected natural pace around 175 words per minute. Complete the ten words in under four seconds. Short purposeful sentence-boundary pause; no deliberate pauses between individual words, no elongated syllables. Brief audible stress on EXAMPLE and MAXIMUM without drawing them out. Use natural US English agreed on. Professional and explanatory, with residual frustration, no shouting, sarcasm or theatrical performance."},
    {"id": "closing", "role": "narrator", "voice": "cedar", "start": 22.40, "end": 29.60,
     "text": "An example isn’t a maximum. Make that clear to people and AI.", "speed": 1.00,
     "direction": "The same warm perceptive narrator. A lucid practical takeaway, conversational and decisive. Briefly emphasize example and maximum, then make that clear. Connected speech, small purposeful sentence-boundary pause, no drawn-out dramatic delivery. Pronounce AI as the two English letters A I. Calm clarity, not a promotional sign-off."},
]

CAPTION_PHRASES = {
    "opening": ["She said three. He heard maximum."],
    "owner": ["For early feedback,", "let’s keep the first", "user story’s scope small:", "tag a few contacts, say three."],
    "developer": ["Maximum three, to be safe.", "I’ll ask the agent."],
    "demo": ["Why can’t I tag four?"],
    "clarification": ["Three was our example.", "We never agreed on a maximum."],
    "closing": ["An example isn’t a maximum.", "Make that clear to people and AI."],
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
