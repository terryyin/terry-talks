"""Shared deterministic audio primitives for the repository's narrated films.

Film sources retain performance direction, asset locations, pacing, timing policy,
and score composition. These helpers own exact-script audits, PCM handling,
measured mastering and the readable serializers used by both film producers.
"""

from array import array
import json
import re
import subprocess
import sys
import wave


def tokens(text):
    # Punctuation, hyphenation, typography and contractions do not change speech.
    return re.findall(r"[a-z0-9]+", text.lower().replace("’", "'").replace("'", ""))


def narration_text(script):
    return " ".join(c["spoken"] for s in script["scenes"] for c in s["captionRanges"])


def exact_script(expected, actual, label):
    if tokens(expected) != tokens(actual):
        import difflib
        differences = list(difflib.ndiff(tokens(expected), tokens(actual)))
        changed = [item for item in differences if item.startswith(("+ ", "- "))]
        raise ValueError(f"{label} differs from the script: {changed}")


def write_performance(path, report):
    # Word triples remain inspectable without a hundreds-of-lines generated file.
    lines = ["{"]
    for key, value in report.items():
        if key == "words":
            lines.append('  "words": [')
            for offset in range(0, len(value), 6):
                lines.append("    " + ", ".join(json.dumps(w) for w in value[offset:offset + 6]) + ",")
            lines[-1] = lines[-1].removesuffix(",")
            lines.append("  ],")
        else:
            lines.append(f"  {json.dumps(key)}: {json.dumps(value, ensure_ascii=False)},")
    lines[-1] = lines[-1].removesuffix(",")
    path.write_text("\n".join(lines + ["}", ""]))


def run(command):
    return subprocess.run(command, check=True, capture_output=True, text=True)


def read_pcm(path, sample_rate):
    with wave.open(str(path), "rb") as audio:
        assert audio.getnchannels() == 1
        assert audio.getframerate() == sample_rate
        assert audio.getsampwidth() == 2
        data = array("h", audio.readframes(audio.getnframes()))
        if sys.byteorder != "little":
            data.byteswap()
        return data


def write_pcm(path, data, sample_rate, channels=1):
    if sys.byteorder != "little":
        data.byteswap()
    with wave.open(str(path), "wb") as audio:
        audio.setnchannels(channels)
        audio.setsampwidth(2)
        audio.setframerate(sample_rate)
        audio.writeframes(data.tobytes())
    if sys.byteorder != "little":
        data.byteswap()


def master(source, destination, loudness, sample_rate):
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
         "-ar", str(sample_rate), "-c:a", "pcm_s16le", str(destination)])
    return measured


def write_script(path, script):
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
    path.write_text("\n".join(rows + ["}", ""]))


