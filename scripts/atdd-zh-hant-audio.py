#!/usr/bin/env python3
"""Build ATDD Mandarin narration offline; only --generate makes speech API calls.

Examples: --prepare; --generate all; --generate update-02 --retake; --verify.
Saved clauses are never overwritten. A failed generation resumes missing takes.
"""

import argparse
from array import array
from concurrent.futures import ThreadPoolExecutor, as_completed
import json
import os
from pathlib import Path
import tempfile

import numpy as np

from audio_measurement import measure_pcm
from narration_audio import master, read_pcm, run, sha256, verify, write_pcm

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "ATDD/film-script.json"
TRANSLATION = ROOT / "ATDD/zh-Hant.json"
RECORD = ROOT / "ATDD/narration-zh-hant.json"
SUBTITLES = ROOT / "ATDD/atdd-zh-hant.srt"
ASSETS = ROOT / "terry-moves/public/assets/atdd"
TAKES = ASSETS / "zh-hant-takes"
OUTPUT = ASSETS / "narration-zh-hant.wav"
RATE, FRAMES, FPS = 48000, 4471, 30
DURATION = FRAMES / FPS
MAX_TEMPO = 1.18
MODEL, VOICE = "gpt-4o-mini-tts", "cedar"
DIRECTION = """Read only the exact supplied Traditional Chinese text in natural
Taiwan Mandarin (台灣國語). You are a warm, clear, lucid educational narrator.
Speak fluent connected Mandarin at approximately 300–330 Han characters per
minute. 保持自然流暢的台灣國語，每分鐘約三百至三百三十個中文字。
Use compact conversational delivery and clear articulation, with very brief
natural clause pauses. Do not slow down, elongate words, or add extra pauses
between short phrases. Keep a consistent warm adult voice across film clauses.
Do not imitate Terry or any real person. Do not add, omit, paraphrase, translate
or explain any words. Pronounce AI as the separate English letters A I; retain
any other English words as written. Avoid an announcer or theatrical delivery.
"""


def write_json(path, value):
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(json.dumps(value, indent=2, ensure_ascii=False) + "\n")
    temporary.replace(path)


def load_cues():
    source, translation = json.loads(SOURCE.read_text()), json.loads(TRANSLATION.read_text())
    if (source["fps"], source["durationInFrames"], translation["language"]) != (FPS, FRAMES, "zh-Hant"):
        raise ValueError("The approved ATDD timeline and Traditional Chinese language must be retained")
    translated = translation["narration"]
    if len(translated) != len(source["scenes"]):
        raise ValueError("Translation must contain each source scene in order")
    cues = []
    for scene, localized in zip(source["scenes"], translated):
        if scene["id"] != localized["sceneId"] or len(scene["captionRanges"]) != len(localized["captions"]):
            raise ValueError(f"Translation scene/caption order differs at {scene['id']}")
        for number, (original, caption) in enumerate(zip(scene["captionRanges"], localized["captions"]), 1):
            if not caption["text"].strip() or not caption["spoken"].strip():
                raise ValueError("Caption and spoken translation must both be present")
            cues.append({"id": f"{scene['id']}-{number:02}", "sceneId": scene["id"],
                         "text": caption["spoken"], "captionText": caption["text"],
                         "start": original["start"], "end": original["end"],
                         "preferredStart": original["speechStart"],
                         "preferredEnd": original["speechEnd"]})
    if len(cues) != 28:
        raise ValueError("Expected the approved film's 28 complete narration clauses")
    return cues


def record_for(cues):
    record = json.loads(RECORD.read_text()) if RECORD.exists() else {"takes": {}, "previousTakes": {}}
    record.update({"film": "ATDD", "language": "zh-Hant", "spokenLanguage": "Taiwan Mandarin",
                   "durationInFrames": FRAMES, "fps": FPS, "durationSeconds": DURATION,
                   "disclosure": "AI 生成的國語旁白（OpenAI Cedar），並非 Terry 的錄音或仿聲。",
                   "narrationModel": MODEL, "voice": VOICE, "direction": DIRECTION,
                   "apiGuide": "https://developers.openai.com/api/docs/guides/text-to-speech",
                   "sourceScriptSha256": sha256(SOURCE), "translationSha256": sha256(TRANSLATION),
                   "timingPolicy": "Reuse approved 4471-frame picture and score. Preserve source speech starts when feasible; otherwise move modestly earlier inside the same caption (after caption start + 0.06s). Opening speech remains at 1.45s. Keep complete clauses; trim only boundary silence; atempo ≤ 1.18; no word truncation or internal pause deletion.",
                   "speechAuditStatus": record.get("speechAuditStatus", "Request text and timing are recorded; no independent listening or transcription audit is claimed.")})
    for cue in cues:
        # Sidecars retain completed calls even if the process stops before its manifest update.
        candidates = sorted(TAKES.glob(f"{cue['id']}-take*.json"))
        if cue["id"] not in record["takes"] and candidates:
            takes = [json.loads(path.read_text()) for path in candidates]
            record["takes"][cue["id"]] = max(takes, key=lambda take: take["takeNumber"])
            record["previousTakes"][cue["id"]] = sorted(
                [take for take in takes if take != record["takes"][cue["id"]]], key=lambda take: take["takeNumber"])
    return record


def subtitle_time(seconds):
    milliseconds = round(seconds * 1000)
    return f"{milliseconds // 3600000:02}:{milliseconds // 60000 % 60:02}:{milliseconds // 1000 % 60:02},{milliseconds % 1000:03}"


def prepare(cues, record):
    TAKES.mkdir(parents=True, exist_ok=True)
    # Full narration is preserved in the companion SRT, with the same caption windows.
    SUBTITLES.write_text("\n\n".join(
        f"{index}\n{subtitle_time(max(cue['start'], 1.2))} --> {subtitle_time(cue['end'])}\n{cue['text']}"
        for index, cue in enumerate(cues, 1)) + "\n")
    write_json(RECORD, record)


def validate_take(cue, take):
    # Shared exact_script tokenizes English; literal comparison protects every Chinese word.
    if cue["text"] != take["text"]:
        raise ValueError(f"Saved {cue['id']} text differs literally from the reviewed translation")
    verify(ASSETS / take["file"], take["sha256"])


def generate_one(cue, retake, requested_speed):
    from openai import OpenAI
    version = 1
    while (TAKES / f"{cue['id']}-take{version:02}.wav").exists() or (TAKES / f"{cue['id']}-take{version:02}.json").exists():
        version += 1
    if version != 1 and not retake:
        raise ValueError(f"Unrecorded saved {cue['id']} take exists; refusing to overwrite or silently repeat its call")
    destination = TAKES / f"{cue['id']}-take{version:02}.wav"
    budget = cue["end"] - .12 - cue["preferredStart"]
    direction = DIRECTION + f"\nFinish this complete clause naturally within about {budget:.2f} seconds."
    speed = requested_speed if requested_speed is not None else (1.10 if retake else 1.0)
    if retake:
        direction += "\nThis replacement needs compact pacing, brief natural pauses, and every word clearly spoken."
    print(f"Generating {cue['id']} take {version}, target {budget:.2f}s", flush=True)
    client = OpenAI(timeout=180, max_retries=0)
    with tempfile.TemporaryDirectory(prefix=f"atdd-{cue['id']}-", dir=TAKES) as temporary:
        streamed, normalized = Path(temporary) / "streamed.wav", Path(temporary) / "normalized.wav"
        with client.audio.speech.with_streaming_response.create(
            model=MODEL, voice=VOICE, input=cue["text"], instructions=direction,
            response_format="wav", speed=speed,
        ) as response:
            response.stream_to_file(streamed)
        # Streaming WAV can use an indefinite frame count; only normalize its header.
        pcm = read_pcm(streamed, 24000)
        if not len(pcm):
            raise ValueError(f"Empty speech response for {cue['id']}")
        write_pcm(normalized, pcm, 24000)
        # link() refuses an existing target atomically: saved raw audio is immutable.
        os.link(normalized, destination)
    take = {"file": str(destination.relative_to(ASSETS)), "takeNumber": version,
            "text": cue["text"], "direction": direction, "requestSpeed": speed,
            "model": MODEL, "voice": VOICE, "sha256": sha256(destination),
            "rawDurationSeconds": len(pcm) / 24000, "sampleRate": 24000}
    write_json(destination.with_suffix(".json"), take)
    return take


def generate(cues, record, selected, retake, workers, speed):
    jobs = []
    for cue in cues:
        if cue["id"] not in selected:
            continue
        if cue["id"] in record["takes"] and not retake:
            validate_take(cue, record["takes"][cue["id"]])
            print(f"Reusing saved {cue['id']}; no API call", flush=True)
        else:
            jobs.append(cue)
    failures = []
    with ThreadPoolExecutor(max_workers=workers) as executor:
        pending = {executor.submit(generate_one, cue, retake, speed): cue for cue in jobs}
        for future in as_completed(pending):
            cue = pending[future]
            try:
                take = future.result()
                if cue["id"] in record["takes"]:
                    record["previousTakes"].setdefault(cue["id"], []).append(record["takes"][cue["id"]])
                record["takes"][cue["id"]] = take
                record.pop("narration", None)
                record.pop("cues", None)
                write_json(RECORD, record)
                print(f"Saved {cue['id']}: {take['rawDurationSeconds']:.3f}s", flush=True)
            except Exception as error:
                failures.append(f"{cue['id']}: {error}")
    if failures:
        raise ValueError("Saved all completed takes; resume missing ones with --generate all.\n" + "\n".join(failures))


def build(cues, record):
    missing = [cue["id"] for cue in cues if cue["id"] not in record["takes"]]
    if missing:
        raise ValueError("Missing saved clauses: " + ", ".join(missing) + ". Use explicit --generate all when authorized.")
    timeline, placed, failures = array("h", [0] * round(DURATION * RATE)), [], []
    with tempfile.TemporaryDirectory(prefix="atdd-zh-hant-fit-") as temporary:
        work = Path(temporary)
        for cue in cues:
            take = record["takes"][cue["id"]]
            validate_take(cue, take)
            prepared = work / f"{cue['id']}.wav"
            run(["ffmpeg", "-y", "-v", "error", "-i", str(ASSETS / take["file"]),
                 "-ac", "1", "-ar", str(RATE), "-c:a", "pcm_s16le", str(prepared)])
            pcm = read_pcm(prepared, RATE)
            # Observed synthetic edge noise reaches ~−48 dBFS. A −44 dBFS
            # boundary gate plus retained padding leaves the actual speech intact.
            # Only the first/last edge is used: no internal silence is removed.
            edges = np.flatnonzero(np.abs(np.asarray(pcm, dtype=np.int32)) > 200)
            if not len(edges):
                failures.append(f"{cue['id']}: saved take is silent")
                continue
            a, b = max(0, int(edges[0]) - round(.045 * RATE)), min(len(pcm), int(edges[-1]) + round(.085 * RATE))
            cut = pcm[a:b]
            start, latest_end = cue["preferredStart"], cue["end"] - .12
            # Hold the final title after speech when the complete clause fits that earlier end.
            if cue is cues[-1] and len(cut) / RATE <= (cue["preferredEnd"] - start) * MAX_TEMPO:
                latest_end = cue["preferredEnd"]
            available = latest_end - start - .015
            tempo = max(1.0, len(cut) / RATE / available)
            if tempo > MAX_TEMPO and cue is not cues[0]:
                # English word starts guide the new edition, but the complete
                # translated clause may begin modestly earlier in its own caption.
                # Never cross a caption boundary or the opening cover silence.
                needed = len(cut) / RATE / MAX_TEMPO - available + .005
                start = max(cue["start"] + .06, start - needed)
                available = latest_end - start - .015
                tempo = max(1.0, len(cut) / RATE / available)
            if tempo > MAX_TEMPO:
                failures.append(f"{cue['id']}: complete {len(cut) / RATE:.3f}s needs tempo {tempo:.3f} for {available:.3f}s slot; limit {MAX_TEMPO}")
                continue
            if tempo > 1:
                write_pcm(prepared, cut, RATE)
                fitted = work / f"{cue['id']}-fitted.wav"
                run(["ffmpeg", "-y", "-v", "error", "-i", str(prepared), "-af", f"atempo={tempo:.9f}",
                     "-ar", str(RATE), "-c:a", "pcm_s16le", str(fitted)])
                cut = read_pcm(fitted, RATE)
            end = start + len(cut) / RATE
            if end > latest_end + 1 / RATE:
                failures.append(f"{cue['id']}: fitted complete take exceeds its latest end")
                continue
            destination = round(start * RATE)
            timeline[destination:destination + len(cut)] = cut
            placed.append({**cue, "rawDurationSeconds": take["rawDurationSeconds"], "sourceSha256": take["sha256"],
                           "sourceTrimStartSeconds": a / RATE, "sourceTrimEndSeconds": b / RATE,
                           "boundaryThresholdPcm": 200, "leadingPaddingSeconds": .045, "trailingPaddingSeconds": .085,
                           "trimmedDurationSeconds": (b - a) / RATE, "tempoMultiplier": round(tempo, 9),
                           "placedStartSeconds": start, "placedEndSeconds": end,
                           "earlierThanSourceStartSeconds": cue["preferredStart"] - start,
                           "placedDurationSeconds": len(cut) / RATE, "latestEndSeconds": latest_end})
        if failures:
            raise ValueError("No final audio written; retain all takes and review these complete clauses:\n" + "\n".join(failures))
        unmastered = work / "unmastered.wav"
        write_pcm(unmastered, timeline, RATE)
        master(unmastered, OUTPUT, -18, RATE)
        # loudnorm's resampling filter adds sub-millisecond pre-ringing before
        # the authored onset. Restore the opening's exact silence, outside all
        # saved speech placement, without touching a single speech sample.
        mastered = read_pcm(OUTPUT, RATE)
        opening = round(cues[0]["preferredStart"] * RATE)
        ringing_samples = sum(sample != 0 for sample in mastered[:opening])
        ringing_peak = max((abs(sample) for sample in mastered[:opening]), default=0)
        mastered[:opening] = array("h", [0] * opening)
        write_pcm(OUTPUT, mastered, RATE)
    record["cues"] = placed
    record["narration"] = {"file": OUTPUT.name, **measure_pcm(OUTPUT, RATE),
                           "openingFilterRingingSamplesRemoved": ringing_samples,
                           "openingFilterRingingDurationSeconds": ringing_samples / RATE,
                           "openingFilterRingingPeakPcm": ringing_peak}
    write_json(RECORD, record)
    verify_final(cues, record)


def verify_final(cues, record):
    if "narration" not in record or "cues" not in record:
        raise ValueError("No recorded final narration; build it from saved complete takes first")
    verify(OUTPUT, record["narration"]["sha256"])
    measured = measure_pcm(OUTPUT, RATE)
    if measured["frames"] != round(DURATION * RATE) or abs(measured["integratedLoudnessLUFS"] + 18) > .5 or measured["truePeakDbTP"] > -1.4:
        raise ValueError(f"Final narration duration/master differs from the required production limits: {measured}")
    pcm, previous_end = read_pcm(OUTPUT, RATE), 0
    if any(pcm[:round(1.45 * RATE)]):
        raise ValueError("Opening cover silence must be retained")
    if len(record["cues"]) != len(cues):
        raise ValueError("Every complete clause must be placed exactly once")
    for cue, fitted in zip(cues, record["cues"]):
        validate_take(cue, record["takes"][cue["id"]])
        start, end = fitted["placedStartSeconds"], fitted["placedEndSeconds"]
        if (fitted["id"] != cue["id"] or fitted["text"] != cue["text"] or
                start < max(previous_end, cue["start"]) or end > cue["end"] - .12 + 1 / RATE or
                end <= start or not 1 <= fitted["tempoMultiplier"] <= MAX_TEMPO):
            raise ValueError(f"Complete clause overlap, changed text/order or invalid fit: {cue['id']}")
        previous_end = end
    print(json.dumps({"verified": True, "completeClauses": len(cues), **measured}, indent=2))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--prepare", action="store_true", help="Save translation provenance and SRT without generating or building audio")
    parser.add_argument("--generate", nargs="+", help="Explicit paid generation: all or named scene-NN clauses; existing takes are reused")
    parser.add_argument("--retake", action="store_true", help="With --generate, retain earlier raw takes and create new numbered replacements")
    parser.add_argument("--workers", type=int, choices=range(1, 5), default=3)
    parser.add_argument("--speed", type=float, help="Explicit speech API request speed for new takes; default 1.0 or 1.10 for retakes")
    parser.add_argument("--verify", action="store_true", help="Offline hash, duration, loudness and complete-clause timing checks")
    args = parser.parse_args()
    cues = load_cues()
    record = record_for(cues)
    if args.retake and not args.generate:
        parser.error("--retake requires explicit --generate")
    if args.speed is not None and (not args.generate or not .5 <= args.speed <= 2):
        parser.error("--speed requires --generate and must be between 0.5 and 2")
    if args.verify:
        if args.generate or args.prepare:
            parser.error("--verify is an independent offline verification")
        verify_final(cues, record)
        return
    prepare(cues, record)
    if args.generate:
        available = {cue["id"] for cue in cues}
        selected = available if args.generate == ["all"] else set(args.generate)
        if selected - available:
            parser.error("Unknown clause IDs: " + ", ".join(sorted(selected - available)))
        generate(cues, record, selected, args.retake, args.workers, args.speed)
    if not args.prepare:
        build(cues, record)


if __name__ == "__main__":
    main()
