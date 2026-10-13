#!/usr/bin/env python3
"""Reproduce Just in time's saved English narration offline; --new-voice calls the API."""

import argparse
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
sys.path.insert(0, str(Path(__file__).resolve().parent))
from narration_audio import (FADE, exact_script, gap_span, master, narration_text,
                             read_pcm, run, sha256, splice, tokens, verify,
                             word_range, write_pcm, write_performance)
from narration_clock import RATE, fixed_clock

PROJECT = ROOT / "TPS and AI" / "JIT"
SOURCE = PROJECT / "film-script.json"
RECORD = PROJECT / "narration-en.json"
ASSETS = ROOT / "terry-moves/public/assets/tps-and-ai-jit"
WORK = ROOT / "terry-moves/out/tps-and-ai-jit-audio"
TAKE = ASSETS / "cedar-take-en.wav"
OUTPUT = ASSETS / "narration-en.wav"
MODEL, VOICE = "gpt-4o-mini-tts", "cedar"
DIRECTION = """Speak the supplied English script exactly, word for word, in order,
including the final sentence. Do not add, omit or paraphrase any words. Only the
user script is spoken; none of these directions are spoken. Perform one connected
thoughtful educational short film for experienced software people. Warm, lucid,
candid and understated, as a capable colleague beside you. Speak fluently at
approximately 165 words per minute, with brief natural pauses between clauses.
Complete words and natural breath matter more than the suggested pace. The
opening question is gently curious; more output alone does not earn trust is
steady and clear. Introduce the Toyota Production System calmly, then give the
three phrases only what is needed, when needed, in the amount needed distinct
meaningful emphasis. Minimum stock and dependable flow are practical facts.
Trusting capable people is confident and generous. Be resourceful with what you
have is an invitation, not an order. Let the useful customer outcome feel concrete.
Trust the team and AI, then handle complexity together, resourcefully, form one
connected idea; quality in the shared working product gives that trust substance.
Feedback and leaving later work unstarted preserve the freedom to choose again.
The final integration passage is collaborative, clear and reassuring, never a
technical checklist. End with quiet conviction on real needs, on time. Pronounce
AI as its separate letters. No announcer voice, exaggerated drama, cartoon acting,
vocal fry, constant upward inflection, rushed words or artificial stretching.
Read only the exact supplied script."""


def client():
    from openai import OpenAI
    return OpenAI(timeout=600, max_retries=0)


def generate(text):
    if TAKE.exists() or RECORD.exists():
        raise ValueError("A saved take exists; reuse it offline or explicitly measure it.")
    api = client()
    print("Generating one connected English Cedar performance…", flush=True)
    with api.audio.speech.with_streaming_response.create(
        model=MODEL, voice=VOICE, input=text, instructions=DIRECTION,
        response_format="wav",
    ) as response:
        response.stream_to_file(TAKE)
    # Retain the performance before any subsequent measurement can fail.
    record = {"model": MODEL, "voice": VOICE,
              "disclosure": "OpenAI synthetic English narration; not Terry's recorded voice",
              "direction": DIRECTION, "script": text, "takeSha256": sha256(TAKE)}
    write_performance(RECORD, record)
    return api, record


def prepare(take=TAKE, name="cedar-prepared.wav"):
    prepared = WORK / name
    run(["ffmpeg", "-y", "-v", "error", "-i", str(take), "-ar", str(RATE),
         "-ac", "1", "-c:a", "pcm_s16le", str(prepared)])
    return prepared


def measure(api, record, prepared):
    print("Measuring actual words and timing without a script prompt…", flush=True)
    with prepared.open("rb") as audio:
        measured = api.audio.transcriptions.create(
            file=audio, model="whisper-1", language="en",
            response_format="verbose_json", timestamp_granularities=["word"],
        )
    record.update(alignmentModel="whisper-1", transcript=measured.text,
                  transcriptSource="whisper-1 actual audio transcription without a script prompt",
                  words=[{"word": w.word, "start": w.start, "end": w.end}
                         for w in measured.words], preparedSha256=sha256(prepared))
    # Preserve the measurement even if the exact-word or timing audit rejects it.
    write_performance(RECORD, record)


def repair_quality(record, script):
    """Select only a measured corrected clause; retain the main take and its audit."""
    exact_script(narration_text(script), record["script"], "Saved script before repair")
    take = ASSETS / "cedar-quality-context-en.wav"
    if take.exists() or "qualityRepair" in record:
        raise ValueError("A retained quality take exists; do not generate another automatically.")
    captions = [c for s in script["scenes"] for c in s["captionRanges"]]
    index = next(i for i, c in enumerate(captions)
                 if c["spoken"].startswith("Earn trust through quality"))
    first = sum(len(tokens(c["spoken"])) for c in captions[:index])
    count = len(tokens(captions[index]["spoken"]))
    context = " ".join(c["spoken"] for c in captions[index - 2:index + 2])
    context_first = sum(len(tokens(c["spoken"])) for c in captions[index - 2:index])
    api = client()
    print("Recording one connected context take; only the quality clause will be selected…", flush=True)
    instructions = DIRECTION + "\nSay 'in THE shared, working product', exactly as written."
    with api.audio.speech.with_streaming_response.create(
        model=MODEL, voice=VOICE, input=context, instructions=instructions,
        response_format="wav",
    ) as response:
        response.stream_to_file(take)
    record["qualityRepair"] = {"take": str(take.relative_to(ROOT)),
                               "takeSha256": sha256(take), "model": MODEL,
                               "voice": VOICE, "direction": instructions,
                               "script": context, "firstToken": first,
                               "tokenCount": count, "takeFirstToken": context_first,
                               "reason": "Both independent ASR models heard 'a'; accepted caption says 'the'."}
    write_performance(RECORD, record)
    prepared = prepare(take, "cedar-quality-context-prepared.wav")
    with prepared.open("rb") as audio:
        measured = api.audio.transcriptions.create(
            file=audio, model="whisper-1", language="en", response_format="verbose_json",
            timestamp_granularities=["word"],
        )
    region = record["qualityRepair"]
    region.update(transcript=measured.text, alignmentModel="whisper-1",
                  transcriptSource="Actual context audio measured without a script prompt",
                  preparedSha256=sha256(prepared),
                  words=[{"word": w.word, "start": w.start, "end": w.end} for w in measured.words])
    write_performance(RECORD, record)
    exact_script(context, region["transcript"], "Repair context transcript")
    exact_script(context, " ".join(w["word"] for w in region["words"]), "Repair timed words")
    record.update(baseWords=record["words"], baseTranscript=record["transcript"],
                  baseTranscriptSource=record["transcriptSource"],
                  basePreparedSha256=record["preparedSha256"])
    return record


def performance(record, prepared, selecting=False):
    """Rebuild the recorded clause correction from hash-verified actual PCM and word measurements."""
    if "qualityRepair" not in record:
        verify(prepared, record["preparedSha256"])
        return read_pcm(prepared, RATE)
    region = record["qualityRepair"]
    take = ROOT / region["take"]
    verify(take, region["takeSha256"])
    verify(prepared, record["basePreparedSha256"])
    corrected = prepare(take, "cedar-quality-context-prepared.wav")
    verify(corrected, region["preparedSha256"])
    exact_script(region["script"], region["transcript"], "Saved context transcript")
    exact_script(region["script"], " ".join(w["word"] for w in region["words"]), "Saved context words")
    pcm, words = read_pcm(prepared, RATE), record["baseWords"]
    take_pcm, take_words = read_pcm(corrected, RATE), region["words"]
    first, last = word_range(words, region["firstToken"], region["tokenCount"])
    first2, last2 = word_range(take_words, region["takeFirstToken"], region["tokenCount"])
    a, b = (round(t * RATE) for t in gap_span(words, first, last, len(pcm) / RATE))
    a2, b2 = (round(t * RATE) for t in gap_span(take_words, first2, last2, len(take_pcm) / RATE))
    pcm = splice(pcm, a, b, take_pcm, a2, b2, round(FADE * RATE))
    move = lambda w, by: {**w, "start": w["start"] + by, "end": w["end"] + by}
    words = (words[:first]
             + [move(w, (a - a2) / RATE) for w in take_words[first2:last2]]
             + [move(w, ((b2 - a2) - (b - a)) / RATE) for w in words[last:]])
    composed = WORK / "cedar-composed.wav"
    write_pcm(composed, pcm, RATE)
    if selecting:
        region.update(selectedTranscript=" ".join(w["word"] for w in take_words[first2:last2]),
                      originalTranscript=" ".join(w["word"] for w in record["baseWords"][first:last]))
        record.update(words=words, transcript=" ".join(w["word"] for w in words),
                      transcriptSource="Composition of actual Whisper-measured main take and selected quality-clause take",
                      preparedSha256=sha256(composed))
        write_performance(RECORD, record)
    else:
        verify(composed, record["preparedSha256"])
        if words != record["words"]:
            raise ValueError("Composed words differ from the saved actual-audio measurements.")
    return pcm


def final_measurement(path):
    audit = run(["ffmpeg", "-hide_banner", "-i", str(path), "-af",
                 "loudnorm=I=-18:TP=-1.5:LRA=7:print_format=json", "-f", "null", "-"])
    measured, _ = json.JSONDecoder().raw_decode(audit.stderr[audit.stderr.rfind("{"):])
    if abs(float(measured["input_i"]) + 18) > 0.5 or float(measured["input_tp"]) > -1.45:
        raise ValueError(f"Narration mastering needs review: {measured}")
    return {"integratedLufs": float(measured["input_i"]),
            "truePeakDbtp": float(measured["input_tp"]),
            "loudnessRangeLu": float(measured["input_lra"])}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--new-voice", action="store_true",
                      help="Generate one paid take and measure it; refuses to overwrite a saved take.")
    mode.add_argument("--measure", action="store_true",
                      help="Measure a retained take explicitly; does not generate new speech.")
    mode.add_argument("--repair-quality", action="store_true",
                      help="Generate one context take to replace only the article-mismatched quality clause.")
    args = parser.parse_args()
    script = json.loads(SOURCE.read_text())
    ASSETS.mkdir(parents=True, exist_ok=True)
    WORK.mkdir(parents=True, exist_ok=True)
    api = None
    if args.new_voice:
        api, record = generate(narration_text(script))
    else:
        record = json.loads(RECORD.read_text())
        verify(TAKE, record["takeSha256"])
    if args.measure and "qualityRepair" in record:
        raise ValueError("The selected performance includes a measured repair; reproduce its saved evidence offline.")
    prepared = prepare()
    if args.new_voice or args.measure:
        measure(api or client(), record, prepared)
    if args.repair_quality:
        record = repair_quality(record, script)
    selected = performance(record, prepared, selecting=args.repair_quality)
    pcm, slots = fixed_clock(script, selected, record)
    raw = WORK / "narration-unmastered.wav"
    write_pcm(raw, pcm, RATE)
    master(raw, OUTPUT, -18, RATE)
    measured = final_measurement(OUTPUT)
    if args.new_voice or args.measure or args.repair_quality:
        record.update(slots=slots, narrationSha256=sha256(OUTPUT),
                      sampleRate=RATE, duration=script["duration"], mastering=measured,
                      timing="Complete clauses placed at natural gaps on the unchanged caption clock; no time compression")
        write_performance(RECORD, record)
    else:
        if slots != record["slots"]:
            raise ValueError("Caption clock changed; review alignment of the saved take.")
        verify(OUTPUT, record["narrationSha256"])
    print(f"Verified {len(slots)} complete clauses on the {script['duration']}s clock; "
          f"{measured['integratedLufs']} LUFS, {measured['truePeakDbtp']} dBTP: {OUTPUT}", flush=True)


if __name__ == "__main__":
    main()
