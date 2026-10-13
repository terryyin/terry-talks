#!/usr/bin/env python3
"""Reproduce the final TPS film's saved English voice offline; generate only explicitly."""

import argparse
from array import array
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
from narration_audio import (
    FADE, exact_script, gap_span, master, narration_text, read_pcm, run, sha256,
    splice, verify, word_range, write_pcm, write_performance,
)
from narration_timing import fixed_clock

PROJECT = Path(__file__).resolve().parent
SOURCE, RECORD = PROJECT / "film-script.json", PROJECT / "narration-en.json"
ASSETS = ROOT / "terry-moves/public/assets/tps-and-ai-finale"
WORK = ROOT / "terry-moves/out/tps-and-ai-finale-audio"
TAKE, OUTPUT = ASSETS / "cedar-take-en.wav", ASSETS / "narration-en.wav"
RATE = 48000
MODEL, VOICE = "gpt-4o-mini-tts", "cedar"
DIRECTION = """Read the supplied English script exactly, word for word and in order.
Do not add, omit, replace, or paraphrase words. This is the thoughtful conclusion
of a three-part educational film for software people. Be warm, lucid, candid and
understated, with quiet confidence, never an announcer or sales voice. Speak
fluently at approximately 165–175 words per minute. Leave a distinct, brief
natural breath between sentences and complete clauses, around a third of a second.
Complete words and comfortable articulation matter more than the suggested pace.
Jidoka frees people; Just in time entrusts them: let the opening pair feel balanced.
Responsibility and authority with the same people is the central connection.
Respect and continuous improvement support independent judgment and learning.
The final questions are an invitation to reflect; end with assurance and possibility.
Pronounce Jidoka as jee-DOH-kah and AI as separate letters. Say Just in time normally.
Avoid exaggerated drama, theatrical acting, constant upward inflection, artificial
stretching or rushed words. Read only the supplied script; never these instructions."""


def client():
    from openai import OpenAI
    return OpenAI(timeout=600, max_retries=0)


def generate(text):
    if TAKE.exists() or RECORD.exists():
        raise ValueError("A retained take exists; reproduce offline or measure it explicitly.")
    api = client()
    print("Generating one connected English Cedar performance…", flush=True)
    with api.audio.speech.with_streaming_response.create(
        model=MODEL, voice=VOICE, input=text, instructions=DIRECTION,
        response_format="wav",
    ) as response:
        response.stream_to_file(TAKE)
    # Retain immediately, before a measurement or timing audit can fail.
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
    print("Measuring the retained performance's actual words…", flush=True)
    with prepared.open("rb") as audio:
        result = api.audio.transcriptions.create(
            file=audio, model="whisper-1", language="en",
            prompt="Terminology: TPS, Toyota Way, Jidoka, Just in time, AI.",
            response_format="verbose_json", timestamp_granularities=["word"],
        )
    candidate = {**record, "alignmentModel": "whisper-1", "transcript": result.text,
                 "transcriptSource": "Actual audio transcription with terminology-only prompt",
                 "words": [{"word": w.word, "start": w.start, "end": w.end} for w in result.words],
                 "preparedSha256": sha256(prepared)}
    write_performance(WORK / "candidate-alignment.json", candidate)
    exact_script(record["script"], candidate["transcript"], "Actual transcript")
    exact_script(record["script"], " ".join(w["word"] for w in candidate["words"]), "Actual timed words")
    # An accepted measurement remains reusable even when caption placement needs review.
    write_performance(RECORD, candidate)
    return candidate


def performance(record, prepared):
    if "closingRepair" not in record:
        verify(prepared, record["preparedSha256"])
        return read_pcm(prepared, RATE)
    region = record["closingRepair"]
    take = ROOT / region["take"]
    verify(take, region["takeSha256"])
    verify(prepared, record["basePreparedSha256"])
    corrected = prepare(take, "cedar-closing-context-prepared.wav")
    verify(corrected, region["preparedSha256"])
    first2, last2 = word_range(region["words"], region["takeFirstToken"], region["tokenCount"])
    exact_script(region["selectedScript"], " ".join(w["word"] for w in region["words"][first2:last2]),
                 "Selected saved closing words")
    base, words = read_pcm(prepared, RATE), record["baseWords"]
    repair, repair_words = read_pcm(corrected, RATE), region["words"]
    first, last = word_range(words, region["firstToken"], region["baseTokenCount"])
    a, b = (round(t * RATE) for t in gap_span(words, first, last, len(base) / RATE))
    a2, b2 = (round(t * RATE) for t in gap_span(repair_words, first2, last2, len(repair) / RATE))
    pcm = splice(base, a, b, repair, a2, b2, round(FADE * RATE))
    move = lambda w, by: {**w, "start": w["start"] + by, "end": w["end"] + by}
    placed_words = (words[:first] + [move(w, (a - a2) / RATE) for w in repair_words[first2:last2]]
                    + [move(w, ((b2 - a2) - (b - a)) / RATE) for w in words[last:]])
    if "ending" in record:
        ending = record["ending"]
        ending_take = ROOT / ending["take"]
        verify(ending_take, ending["takeSha256"])
        ending_prepared = prepare(ending_take, "cedar-keep-learning-prepared.wav")
        verify(ending_prepared, ending["preparedSha256"])
        exact_script(ending["script"], " ".join(w["word"] for w in ending["words"]), "Saved ending words")
        offset = len(pcm) / RATE + ending["appendGap"]
        pcm.extend(array("h", [0] * round(ending["appendGap"] * RATE)))
        pcm.extend(read_pcm(ending_prepared, RATE))
        placed_words.extend(move(w, offset) for w in ending["words"])
    composed = WORK / "cedar-composed.wav"
    write_pcm(composed, pcm, RATE)
    verify(composed, record["preparedSha256"])
    if placed_words != record["words"]:
        raise ValueError("Composed words differ from saved actual audio measurements.")
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
    mode.add_argument("--generate", action="store_true", help="Generate one paid take explicitly")
    mode.add_argument("--measure", action="store_true", help="Measure a retained take; no new voice")
    mode.add_argument("--place", action="store_true", help="Accept a reviewed new caption clock; no API request")
    args = parser.parse_args()
    script = json.loads(SOURCE.read_text())
    ASSETS.mkdir(parents=True, exist_ok=True)
    WORK.mkdir(parents=True, exist_ok=True)
    api = None
    if args.generate:
        api, record = generate(narration_text(script))
    else:
        record = json.loads(RECORD.read_text())
        verify(TAKE, record["takeSha256"])
    if args.measure and "closingRepair" in record:
        raise ValueError("The selected performance has measured retained corrections; reproduce it offline.")
    prepared = prepare()
    if args.generate or args.measure:
        record = measure(api or client(), record, prepared)
    selected = performance(record, prepared)
    pcm, slots = fixed_clock(script, selected, record, sample_rate=RATE)
    accepting = args.generate or args.measure or args.place
    if not accepting and slots != record["slots"]:
        raise ValueError("Caption clock changed; explicitly review placement of the saved take.")
    raw, candidate = WORK / "narration-unmastered.wav", WORK / "narration-candidate.wav"
    write_pcm(raw, pcm, RATE)
    master(raw, candidate, -18, RATE)
    measured = final_measurement(candidate)
    if accepting:
        record.update(slots=slots, narrationSha256=sha256(candidate), sampleRate=RATE,
                      duration=script["duration"], mastering=measured,
                      timing="Complete clauses placed at waveform-verified quiet gaps; no time compression")
        candidate.replace(OUTPUT)
        write_performance(RECORD, record)
    else:
        verify(candidate, record["narrationSha256"])
        candidate.replace(OUTPUT)
    print(f"Verified {len(slots)} complete clauses on the {script['duration']}s clock; "
          f"{measured['integratedLufs']} LUFS, {measured['truePeakDbtp']} dBTP: {OUTPUT}", flush=True)


if __name__ == "__main__":
    main()
