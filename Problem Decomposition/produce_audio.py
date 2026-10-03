#!/usr/bin/env python3
"""Build the film's original audio and measured, frame-aligned caption timeline.

Requires macOS's installed Daniel voice, ffmpeg and ffprobe. No network service,
temporary input or third-party Python package is required. Each caption range in
film-script.json owns its spoken clause, displayed text and measured timing.
"""

from array import array
import json
import math
from pathlib import Path
import subprocess
import sys
import wave


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "Problem Decomposition" / "film-script.json"
WORK = ROOT / "terry-moves" / "out" / "problem-decomposition-audio"
ASSETS = ROOT / "terry-moves" / "public" / "assets" / "problem-decomposition"
SAMPLE_RATE = 48000
VOICE = "Daniel"
WORDS_PER_MINUTE = 160


def run(command):
    return subprocess.run(command, check=True, capture_output=True, text=True)


def read_pcm(path):
    with wave.open(str(path), "rb") as audio:
        assert audio.getnchannels() == 1
        assert audio.getframerate() == SAMPLE_RATE
        assert audio.getsampwidth() == 2
        data = array("h", audio.readframes(audio.getnframes()))
        if sys.byteorder != "little":
            data.byteswap()
        return data


def write_pcm(path, data, channels=1):
    if sys.byteorder != "little":
        data.byteswap()
    with wave.open(str(path), "wb") as audio:
        audio.setnchannels(channels)
        audio.setsampwidth(2)
        audio.setframerate(SAMPLE_RATE)
        audio.writeframes(data.tobytes())
    if sys.byteorder != "little":
        data.byteswap()


def master(source, destination, loudness):
    first = run(["ffmpeg", "-hide_banner", "-i", str(source), "-af",
                 f"loudnorm=I={loudness}:TP=-1.5:LRA=7:print_format=json",
                 "-f", "null", "-"])
    report = first.stderr[first.stderr.rfind("{"):]
    measured, _ = json.JSONDecoder().raw_decode(report)
    correction = (f"loudnorm=I={loudness}:TP=-1.5:LRA=7:"
                  f"measured_I={measured['input_i']}:measured_LRA={measured['input_lra']}:"
                  f"measured_TP={measured['input_tp']}:measured_thresh={measured['input_thresh']}:"
                  f"offset={measured['target_offset']}:linear=true")
    run(["ffmpeg", "-y", "-v", "error", "-i", str(source), "-af", correction,
         "-ar", str(SAMPLE_RATE), "-c:a", "pcm_s16le", str(destination)])
    return measured


def build_narration(script):
    fps = script["fps"]
    assert SAMPLE_RATE % fps == 0
    samples_per_frame = SAMPLE_RATE // fps
    timeline = array("h")
    for scene in script["scenes"]:
        scene_start_frame = len(timeline) // samples_per_frame
        scene["start"] = scene_start_frame / fps
        captions = scene["captionRanges"]
        for index, caption in enumerate(captions):
            phrase = caption["spoken"]
            phrase_start_frame = len(timeline) // samples_per_frame
            original = WORK / f"{scene['id']}-{index}.aiff"
            trimmed = WORK / f"{scene['id']}-{index}.wav"
            run(["say", "-v", VOICE, "-r", str(WORDS_PER_MINUTE), "-o", str(original), phrase])
            # Trim boundaries only. Reversing twice preserves every internal
            # pause and avoids cutting speech at the first sentence break.
            trim = ("silenceremove=start_periods=1:start_duration=0.01:start_threshold=-48dB,"
                    "areverse,silenceremove=start_periods=1:start_duration=0.01:start_threshold=-48dB,"
                    "areverse")
            run(["ffmpeg", "-y", "-v", "error", "-i", str(original), "-af", trim,
                 "-ar", str(SAMPLE_RATE), "-ac", "1", "-c:a", "pcm_s16le", str(trimmed)])
            pcm = read_pcm(trimmed)
            # Short captions get at least 2.2 seconds. Longer ones are limited
            # to 2.8 printed words/second; voice duration normally dominates.
            lead = 0.35 if scene_start_frame == 0 and index == 0 else 0.12
            tail = 2.3 if scene["id"] == "end" else (0.38 if index == len(captions) - 1 else 0.16)
            speech_samples = round(lead * SAMPLE_RATE)
            requested = max(lead + len(pcm) / SAMPLE_RATE + tail,
                            2.2, len(caption["text"].split()) / 2.8)
            frames = math.ceil(requested * fps)
            timeline.extend([0] * speech_samples)
            timeline.extend(pcm)
            remainder = frames * samples_per_frame - speech_samples - len(pcm)
            assert remainder >= 0
            timeline.extend([0] * remainder)
            caption.update({
                "start": phrase_start_frame / fps,
                "end": len(timeline) / SAMPLE_RATE,
                "speechStart": (phrase_start_frame * samples_per_frame + speech_samples) / SAMPLE_RATE,
                "speechEnd": (phrase_start_frame * samples_per_frame + speech_samples + len(pcm)) / SAMPLE_RATE,
            })
        scene["end"] = len(timeline) / SAMPLE_RATE
        scene["duration"] = scene["end"] - scene["start"]
        print(f"{scene['id']:10s} {scene['start']:7.3f}–{scene['end']:7.3f}s", flush=True)
    script["duration"] = len(timeline) / SAMPLE_RATE
    script["durationInFrames"] = len(timeline) // samples_per_frame
    script["voice"] = "Daniel (macOS synthetic narration; not Terry's recorded voice)"
    script["narrationWordsPerMinute"] = WORDS_PER_MINUTE
    assert script["duration"] <= 120, "Compress the chosen script rather than truncate narration."
    raw = WORK / "narration-unmastered.wav"
    write_pcm(raw, timeline)
    report = master(raw, ASSETS / "narration.wav", -18)
    return report


def note(midi):
    return 440 * 2 ** ((midi - 69) / 12)


def build_score(script):
    """An original spacious D-minor bed with quiet wooden/chime accents."""
    count = round(script["duration"] * SAMPLE_RATE)
    # Four open voicings avoid a busy tune behind the argument.
    chords = [(50, 57, 60, 64), (53, 60, 64, 69),
              (48, 55, 62, 64), (55, 62, 64, 69)]
    chord_seconds = 9.0
    accents = [(scene["start"] + 0.5, note(74 + index % 3 * 2))
               for index, scene in enumerate(script["scenes"])
               if scene["id"] in {"problem", "value", "stop", "vertical", "end"}]
    stereo = array("h")
    for frame in range(count):
        t = frame / SAMPLE_RATE
        # The opening question has space before the music enters.
        global_envelope = min(1.0, max(0.0, (t - 3) / 4)) * min(1.0, (script["duration"] - t) / 3)
        index = int(t / chord_seconds)
        phase = t % chord_seconds
        left = right = 0.0
        for offset, midi in enumerate(chords[index % len(chords)]):
            frequency = note(midi)
            breath = (0.70 + 0.30 * math.sin(2 * math.pi * t / 11 + offset))
            crossfade = min(1.0, phase / 1.8) * min(1.0, (chord_seconds - phase) / 1.8)
            partial = (math.sin(2 * math.pi * frequency * t) +
                       0.16 * math.sin(2 * math.pi * frequency * 2 * t + 0.3))
            amplitude = partial * 0.0045 * breath * crossfade
            pan = 0.22 + offset * 0.19
            left += amplitude * math.sqrt(1 - pan)
            right += amplitude * math.sqrt(pan)
        for start, frequency in accents:
            age = t - start
            if 0 <= age < 2.5:
                decay = (1 - math.exp(-age * 120)) * math.exp(-age * 3.5)
                chime = (math.sin(2 * math.pi * frequency * age) +
                         0.22 * math.sin(2 * math.pi * frequency * 2.01 * age)) * decay * 0.013
                left += chime * 0.8
                right += chime * 0.7
        left *= global_envelope
        right *= global_envelope
        stereo.append(round(max(-1, min(1, left)) * 32767))
        stereo.append(round(max(-1, min(1, right)) * 32767))
    raw = WORK / "score-unmastered.wav"
    write_pcm(raw, stereo, channels=2)
    return master(raw, ASSETS / "score.wav", -40)


def treatment(script):
    rows = ["# Problem Decomposition — film treatment", "",
            "The freedom to change your mind. English, 1080 × 1080, 30 fps.", "",
            f"Runtime: **{script['duration']:.2f} seconds**. Narration is the installed macOS Daniel synthetic voice,",
            "not a recording or imitation of Terry. The full article remains the argument's source;",
            "this script is its shorter film presentation. Just in time is embedded in the goals.", "",
            "The recurring example is three friends splitting a restaurant bill. The hook asks",
            "what would remain useful if development stopped tomorrow. Component plans give way",
            "to one working equal split, feedback, and the freedom to leave later capabilities unstarted.", "",
            "| Time | Scene | Spoken narration |", "| --- | --- | --- |"]
    for scene in script["scenes"]:
        narration = " ".join(caption["spoken"] for caption in scene["captionRanges"])
        rows.append(f"| {scene['start']:.2f}–{scene['end']:.2f}s | {scene['label']} | {narration} |")
    rows += ["", "## Production", "",
             "Run `python3 'Problem Decomposition/produce_audio.py'` from the repository checkout.",
             "The source is `film-script.json`. Each caption is timed against its own synthesized",
             "spoken clause, with short reading holds. All boundaries are aligned to video frames.",
             "Each caption range owns both its spoken clause and displayed text. No narration is cut to meet the runtime.",
             "Use `--refresh-docs` to reformat the script and refresh this treatment without synthesizing audio.", "",
             "The score is an original programmatic composition: restrained open chords and sparse chime",
             "accents. It begins after the opening question. Narration is mastered to −18 LUFS and",
             "the score to −40 LUFS; both should play at volume 1 in the composition.", "",
             "Generated files are `terry-moves/public/assets/problem-decomposition/narration.wav` and",
             "`score.wav`. Intermediate phrases and loudness reports are under ignored `terry-moves/out/`.",
             "The audio builder requires macOS Daniel, ffmpeg, and ffprobe, plus Python's standard library.",
             "Playback and Remotion rendering use the committed WAVs and do not require macOS speech."]
    (ROOT / "Problem Decomposition" / "film-treatment.md").write_text("\n".join(rows) + "\n")


def write_script(script):
    """Keep each measured spoken/caption pair as one readable JSON record."""
    encode = lambda value: json.dumps(value, ensure_ascii=False)
    rows = ["{"]
    for key, value in script.items():
        if key != "scenes":
            rows.append(f"  {encode(key)}: {encode(value)},")
            continue
        rows.append('  "scenes": [')
        for scene in value:
            rows.append("    {")
            for field, entry in scene.items():
                if field == "captionRanges":
                    rows.append('      "captionRanges": [')
                    rows.extend(f"        {encode(caption)}," for caption in entry)
                    rows[-1] = rows[-1].removesuffix(",")
                    rows.append("      ],")
                else:
                    rows.append(f"      {encode(field)}: {encode(entry)},")
            rows[-1] = rows[-1].removesuffix(",")
            rows.append("    },")
        rows[-1] = rows[-1].removesuffix(",")
        rows.append("  ],")
    rows[-1] = rows[-1].removesuffix(",")
    SOURCE.write_text("\n".join(rows + ["}", ""]))


def main():
    WORK.mkdir(parents=True, exist_ok=True)
    ASSETS.mkdir(parents=True, exist_ok=True)
    script = json.loads(SOURCE.read_text())
    if "--refresh-docs" not in sys.argv:
        voice = build_narration(script)
        score = build_score(script)
        (WORK / "mastering.json").write_text(json.dumps({"voice": voice, "score": score}, indent=2) + "\n")
    write_script(script)
    treatment(script)
    print(f"Complete: {script['duration']:.3f}s / {script['durationInFrames']} frames.", flush=True)


if __name__ == "__main__":
    main()
