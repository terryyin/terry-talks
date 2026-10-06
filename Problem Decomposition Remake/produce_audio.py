#!/usr/bin/env python3
"""Reproduce the selected Cedar performance; only --new-voice calls the API."""

from array import array
import argparse
import hashlib
import json
import math
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from narration_audio import (exact_script, master, narration_text, read_pcm, run,
                             tokens, write_pcm, write_performance, write_script)

PROJECT = ROOT / "Problem Decomposition Remake"
ASSETS = ROOT / "terry-moves/public/assets/problem-decomposition-remake"
WORK = ROOT / "terry-moves/out/problem-decomposition-remake-audio"
SOURCE = PROJECT / "film-script.json"
EVIDENCE = PROJECT / "cedar-performance.json"
TAKE = ASSETS / "cedar-take.wav"
RATE = 48000
MODEL, VOICE = "gpt-4o-mini-tts", "cedar"
DIRECTION = """Read the user message EXACTLY, word for word, as one connected
educational short film for adults. Preserve every word and its order. Do not add,
omit, paraphrase, or speak any instructions. The input is the sole spoken script.
Warm, intimate, lucid and thoughtful. A capable colleague explaining a useful
idea beside you, with natural breaths and pauses. Aim for 150 to 160 words per
minute, about 100 seconds, without rushing or stretching words artificially.
Start with clear gentle curiosity: splitting software and splitting the customer's
problem are different. The shopper example is a practical, caring situation:
people do not want a wasted trip. Let the small stock check feel immediately
useful. The two premises are steady and modest, with an audible pause between
them. The two goals are conversational: useful value first, then the freedom to
choose again. The feedback example offers reassuring possibility. Emphasize
unfinished waste and damage gently, without sounding alarmist. Introduce the
four principles clearly, each with breathing room. Valuable, visible, vertical
are distinct meaningful words, not a jingle. One-piece flow means finishing
together. Every commit is your last commit is a memorable, calm maxim, not an
order. Product health and future possibilities are thoughtful, not abstract
grand claims. Finish with quiet conviction and a natural brief pause between
Smaller problems, Useful answers, and Freedom to choose again.
Vary phrasing with the meaning. No cartoon acting, sales-announcer delivery,
exaggerated drama, vocal fry or constant upward inflection. These directions
are not spoken. Only the exact user script is spoken."""


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def performance(script, new_voice):
    text = narration_text(script)
    candidate = WORK / "cedar-candidate.wav" if new_voice else TAKE
    if new_voice:
        from openai import OpenAI
        client = OpenAI(timeout=600, max_retries=0)
        print("Generating one connected Cedar performance…", flush=True)
        with client.audio.speech.with_streaming_response.create(
            model=MODEL, voice=VOICE, input=text, instructions=DIRECTION,
            response_format="wav",
        ) as response:
            response.stream_to_file(candidate)
        report = {"model": MODEL, "voice": VOICE, "direction": DIRECTION,
                  "script": text, "takeSha256": sha(candidate)}
    else:
        report = json.loads(EVIDENCE.read_text())
        assert report["takeSha256"] == sha(TAKE), "Selected take changed."
        exact_script(text, report["script"], "Saved performance")
        exact_script(text, report["transcript"], "Saved measured transcript")
    # Remove silence at the boundaries only; keep every internal breath and pause.
    trim = ("silenceremove=start_periods=1:start_duration=0.01:start_threshold=-50dB,"
            "areverse,silenceremove=start_periods=1:start_duration=0.01:start_threshold=-50dB,"
            "areverse")
    prepared = WORK / "cedar-prepared.wav"
    run(["ffmpeg", "-y", "-v", "error", "-i", str(candidate), "-af", trim,
         "-ar", str(RATE), "-ac", "1", "-c:a", "pcm_s16le", str(prepared)])
    if new_voice:
        print("Measuring the actual audio's words and timings…", flush=True)
        with prepared.open("rb") as audio_file:
            measured = client.audio.transcriptions.create(
                file=audio_file, model="whisper-1", language="en",
                response_format="verbose_json", timestamp_granularities=["word"],
                prompt=text,
            )
        exact_script(text, measured.text, "Measured transcription")
        report.update(alignmentModel="whisper-1", transcript=measured.text,
                      transcriptSource="whisper-1 transcription of the actual audio",
                      words=[{"word": word.word, "start": word.start, "end": word.end}
                             for word in measured.words])
    else:
        assert report["preparedSha256"] == sha(prepared), "Preparation changed."
    report["preparedSha256"] = sha(prepared)
    exact_script(text, " ".join(word["word"] for word in report["words"]), "Timed words")
    if new_voice:
        TAKE.write_bytes(candidate.read_bytes())
        write_performance(EVIDENCE, report)
    return read_pcm(prepared, RATE), report


def align(script, pcm, report):
    fps = script["fps"]
    assert RATE % fps == 0
    lead = script["coverDuration"] + 0.25
    words = [{**word, "token": token} for word in report["words"]
             for token in tokens(word["word"])]
    cursor, previous_end, captions = 0, 0, []
    for scene in script["scenes"]:
        for caption in scene["captionRanges"]:
            count = len(tokens(caption["spoken"]))
            section = words[cursor:cursor + count]
            assert [word["token"] for word in section] == tokens(caption["spoken"])
            assert section[0]["start"] >= previous_end - 0.03
            assert section[-1]["end"] >= section[0]["start"]
            caption.update(speechStart=section[0]["start"] + lead,
                           speechEnd=section[-1]["end"] + lead, wordCues={})
            for word in section:
                caption["wordCues"].setdefault(word["token"], word["start"] + lead)
            previous_end = section[-1]["end"]
            cursor += count
            captions.append(caption)
    assert cursor == len(words)
    frames = math.ceil((lead + len(pcm) / RATE + 2.3) * fps)
    assert frames / fps <= 120, "Keep the script; select a more fluent performance."
    # Each cut lands in the natural pause between measured spoken clauses.
    boundaries = [0]
    for previous, following in zip(captions, captions[1:]):
        boundaries.append(round((previous["speechEnd"] + following["speechStart"]) / 2 * fps))
    boundaries.append(frames)
    for caption, start, end in zip(captions, boundaries, boundaries[1:]):
        assert end > start
        caption.update(start=start / fps, end=end / fps)
    for scene in script["scenes"]:
        scene.update(start=scene["captionRanges"][0]["start"],
                     end=scene["captionRanges"][-1]["end"])
        scene["duration"] = scene["end"] - scene["start"]
        print(f"{scene['id']:12s} {scene['start']:7.3f}–{scene['end']:7.3f}s", flush=True)
    script.update(duration=frames / fps, durationInFrames=frames,
                  voice="Cedar (OpenAI synthetic narration; not Terry's recorded voice)",
                  voiceCredit="CEDAR · AI-GENERATED NARRATION", narrationModel=MODEL)
    timeline = array("h", [0] * round(lead * RATE))
    timeline.extend(pcm)
    timeline.extend([0] * (frames * (RATE // fps) - len(timeline)))
    return timeline


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--new-voice", action="store_true",
                        help="Generate one new take and measure it with Whisper.")
    args = parser.parse_args()
    WORK.mkdir(parents=True, exist_ok=True)
    ASSETS.mkdir(parents=True, exist_ok=True)
    script = json.loads(SOURCE.read_text())
    pcm, report = performance(script, args.new_voice)
    timeline = align(script, pcm, report)
    raw = WORK / "narration-unmastered.wav"
    destination = ASSETS / "narration.wav"
    write_pcm(raw, timeline, RATE)
    measured = master(raw, destination, -18, RATE)
    # Measure the final asset independently instead of treating the target as proof.
    audit = run(["ffmpeg", "-hide_banner", "-i", str(destination), "-af",
                 "loudnorm=I=-18:TP=-1.5:LRA=7:print_format=json", "-f", "null", "-"])
    final, _ = json.JSONDecoder().raw_decode(audit.stderr[audit.stderr.rfind("{"):])
    (WORK / "mastering.json").write_text(json.dumps(
        {"source": measured, "final": final, "narrationSha256": sha(destination)}, indent=2) + "\n")
    write_script(SOURCE, script)
    print(f"Complete: {script['duration']:.3f}s / {script['durationInFrames']} frames; "
          f"{final['input_i']} LUFS, {final['input_tp']} dBTP.", flush=True)


if __name__ == "__main__":
    main()
