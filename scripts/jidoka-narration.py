#!/usr/bin/env python3
"""Generate explicitly, otherwise reproduce Jidoka's saved English narration offline."""

import argparse
import json
from pathlib import Path

from narration_audio import (
    exact_script, master, narration_text, read_pcm, run, sha256,
    tokens, verify, write_pcm, write_performance,
)

from narration_timing import fixed_clock as place_clauses

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "TPS and AI" / "film-script.json"
RECORD = ROOT / "TPS and AI" / "jidoka-narration.json"
ASSETS = ROOT / "terry-moves" / "public" / "assets" / "tps-and-ai"
TAKE = ASSETS / "cedar-take-en.wav"
OUTPUT = ASSETS / "narration-en.wav"
WORK = ROOT / "terry-moves" / "out" / "jidoka-audio"
RATE = 48000
MODEL, VOICE = "gpt-4o-mini-tts", "cedar"
DIRECTION = """Read the supplied English script exactly, word for word, with no
additions or paraphrases. This is one thoughtful educational short film for
adults about Jidoka and the freedom of software teams. Be warm, calm, lucid and
understated. Speak fluently at approximately 150–160 words per minute, with short
natural pauses at sentence boundaries. Let the opening question sound curious;
the answer confident. Explain built-in human judgment clearly. Give 'Let the stop
call you' a small sense of relief. 'The best part is no part' is a quiet memorable
principle, not an advertising slogan. End with assurance and possibility.
Pronounce Jidoka as jee-DOH-kah; pronounce TPS and AI as their separate letters.
Avoid sales-announcer delivery, exaggerated drama or theatrical character voices.
Read only the supplied script. Never speak these instructions."""


def prepare():
    prepared = WORK / "prepared.wav"
    run(["ffmpeg", "-y", "-v", "error", "-i", str(TAKE), "-ar", str(RATE),
         "-ac", "1", "-c:a", "pcm_s16le", str(prepared)])
    return prepared


def generate(text):
    if TAKE.exists() or RECORD.exists():
        raise ValueError("Saved take already exists; reproduction needs no --generate.")
    from openai import OpenAI
    client = OpenAI(timeout=600, max_retries=0)
    print("Generating one connected English Cedar performance…", flush=True)
    with client.audio.speech.with_streaming_response.create(
        model=MODEL, voice=VOICE, input=text, instructions=DIRECTION,
        response_format="wav",
    ) as response:
        response.stream_to_file(TAKE)
    # Retain immediately, even if the later alignment request fails.
    record = {"model": MODEL, "voice": VOICE,
              "disclosure": "OpenAI synthetic English narration; not Terry's voice",
              "direction": DIRECTION, "script": text, "takeSha256": sha256(TAKE)}
    write_performance(RECORD, record)
    return client, record


def measure(client, record, prepared):
    print("Measuring the saved performance's actual words…", flush=True)
    with prepared.open("rb") as audio:
        result = client.audio.transcriptions.create(
            file=audio, model="whisper-1", language="en",
            prompt="Terminology: TPS, Toyota Production System, Jidoka, AI.",
            response_format="verbose_json", timestamp_granularities=["word"],
        )
    record.update(alignmentModel="whisper-1", transcript=result.text,
                  words=[{"word": w.word, "start": w.start, "end": w.end}
                         for w in result.words], preparedSha256=sha256(prepared))
    for key in ("rawTranscript", "rawWords", "alignmentCorrection"):
        record.pop(key, None)
    # Preserve a refused measurement without replacing the accepted alignment.
    candidate = WORK / "candidate-alignment.json"
    write_performance(candidate, record)
    audit_silent_tail(record, read_pcm(prepared, RATE))
    write_performance(candidate, record)


def audit_silent_tail(record, pcm):
    """Reject mismatches except measured extra tokens occupying demonstrable silence."""
    expected = tokens(record["script"])
    words, count, last = record["words"], 0, 0
    for last, word in enumerate(words, 1):
        count += len(tokens(word["word"]))
        if count >= len(expected):
            break
    prefix, tail = words[:last], words[last:]
    exact_script(record["script"], " ".join(w["word"] for w in prefix), "Measured prefix")
    if not tail:
        return
    start, end = tail[0]["start"], tail[-1]["end"]
    samples = pcm[round(start * RATE):round(end * RATE)]
    if end - start > 0.04 or not samples or max(abs(x) for x in samples) > 2:
        raise ValueError("Measured additional words occupy audible audio; candidate rejected.")
    record.update(rawTranscript=record["transcript"], rawWords=words,
                  transcript=" ".join(w["word"] for w in prefix), words=prefix,
                  alignmentCorrection={"reason": "Trailing ASR hallucination in measured digital silence",
                                       "start": start, "end": end,
                                       "peakPCM": max(abs(x) for x in samples)})


def fixed_clock(script, pcm, record):
    """Preserve Jidoka's approved clock through the shared waveform placer."""
    return place_clauses(script, pcm, record, sample_rate=RATE)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--generate", action="store_true", help="Generate one new take explicitly")
    parser.add_argument("--measure", action="store_true", help="Measure a retained unaligned take; no new voice")
    args = parser.parse_args()
    script = json.loads(SOURCE.read_text())
    WORK.mkdir(parents=True, exist_ok=True)
    ASSETS.mkdir(parents=True, exist_ok=True)
    client = None
    if args.generate:
        client, record = generate(narration_text(script))
    else:
        record = json.loads(RECORD.read_text())
        verify(TAKE, record["takeSha256"])
    prepared = prepare()
    if args.generate or args.measure:
        if client is None:
            from openai import OpenAI
            client = OpenAI(timeout=600, max_retries=0)
        measure(client, record, prepared)
    else:
        verify(prepared, record["preparedSha256"])
    pcm, slots = fixed_clock(script, read_pcm(prepared, RATE), record)
    if not (args.generate or args.measure) and slots != record["slots"]:
        raise ValueError("Caption clock changed; review saved alignment before selecting a new take.")
    raw = WORK / "narration-unmastered.wav"
    write_pcm(raw, pcm, RATE)
    candidate = WORK / "narration-candidate.wav"
    master(raw, candidate, -18, RATE)
    if args.generate or args.measure:
        record.update(slots=slots, narrationSha256=sha256(candidate), duration=script["duration"],
                      timing="Complete clauses placed at natural gaps on the approved caption clock")
        candidate.replace(OUTPUT)
        write_performance(RECORD, record)
    else:
        verify(candidate, record["narrationSha256"])
        candidate.replace(OUTPUT)
    print(f"Verified {len(slots)} complete clauses; {script['duration']}s narration track: {OUTPUT}", flush=True)


if __name__ == "__main__":
    main()
