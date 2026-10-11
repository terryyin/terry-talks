"""Shared deterministic audio primitives for the repository's narrated films.

Film sources retain performance direction, asset locations, pacing, timing policy,
and score composition. These helpers own exact-script audits, PCM handling,
measured mastering, the composition of saved takes with its hash-verified
manifest, and the readable serializers used by the film producers.
"""

from array import array
import hashlib
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


def performance_lines(report, indent="  "):
    # Word triples remain inspectable without a hundreds-of-lines generated file.
    lines = []
    for key, value in report.items():
        if key in ("words", "baseWords"):
            lines.append(f"{indent}{json.dumps(key)}: [")
            for offset in range(0, len(value), 6):
                lines.append(f"{indent}  " + ", ".join(json.dumps(w) for w in value[offset:offset + 6]) + ",")
            lines[-1] = lines[-1].removesuffix(",")
            lines.append(f"{indent}],")
        elif key == "regions" and value:
            lines.append(f'{indent}"regions": [')
            for region in value:
                lines += [f"{indent}  {{", *performance_lines(region, indent + "    "), f"{indent}  }},"]
            lines[-1] = lines[-1].removesuffix(",")
            lines.append(f"{indent}],")
        else:
            lines.append(f"{indent}{json.dumps(key)}: {json.dumps(value, ensure_ascii=False)},")
    lines[-1] = lines[-1].removesuffix(",")
    return lines


def write_performance(path, report):
    path.write_text("\n".join(["{", *performance_lines(report), "}", ""]))


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


FADE = 0.005  # Linear crossfade centred on each seam between takes.


def word_range(words, first, count):
    """Measured words holding `count` script tokens from token `first`, as a film's align() counts them."""
    edges, total = {0: 0}, 0
    for index, word in enumerate(words):
        total += len(tokens(word["word"]))
        edges[total] = index + 1
    if first not in edges or first + count not in edges:
        raise ValueError("A measured word spans the region's edge, so the region has no natural gap there")
    return edges[first], edges[first + count]


def gap_span(words, first, last, seconds):
    """Seams at the midpoints of the natural gaps around words[first:last]; a take's own ends otherwise."""
    start = (words[first - 1]["end"] + words[first]["start"]) / 2 if first else 0.0
    end = (words[last - 1]["end"] + words[last]["start"]) / 2 if last < len(words) else seconds
    return start, end


def splice(base, a, b, take, a2, b2, fade):
    """base[:a] + take[a2:b2] + base[b:] in samples, crossfaded over `fade` samples at each seam."""
    pcm = array("h", base[:a])
    pcm.extend(take[a2:b2])
    pcm.extend(base[b:])
    for seam, left, i, right, j in ((a, base, a, take, a2), (a + b2 - a2, take, b2, base, b)):
        half = min(fade // 2, i, j, len(left) - i, len(right) - j)
        for k in range(-half, half):
            mix = (k + half + 0.5) / (2 * half)
            pcm[seam + k] = round(left[i + k] * (1 - mix) + right[j + k] * mix)
    return pcm


def replace_region(base, words, region, take, take_words, take_region, sample_rate):
    """Retained PCM and words with one word range replaced by a take's own range of the same words.

    Region words keep the take's spacing, later words shift by the change in
    region length, and earlier words are untouched.
    """
    (first, last), (take_first, take_last) = region, take_region
    exact_script(" ".join(w["word"] for w in words[first:last]),
                 " ".join(w["word"] for w in take_words[take_first:take_last]), "Region take")
    a, b = (round(t * sample_rate) for t in gap_span(words, first, last, len(base) / sample_rate))
    a2, b2 = (round(t * sample_rate)
              for t in gap_span(take_words, take_first, take_last, len(take) / sample_rate))
    pcm = splice(base, a, b, take, a2, b2, round(FADE * sample_rate))
    move = lambda word, by: {**word, "start": word["start"] + by, "end": word["end"] + by}
    return pcm, (words[:first]
                 + [move(w, (a - a2) / sample_rate) for w in take_words[take_first:take_last]]
                 + [move(w, ((b2 - a2) - (b - a)) / sample_rate) for w in words[last:]])


def compose(base, words, regions, sample_rate):
    """Prepared PCM and timeline words of a base take with region takes applied in order.

    A region is its first script token, its token count, the take's prepared PCM
    and measured words, and the region's first token inside that take.
    """
    for first, count, take, take_words, take_first in regions:
        base, words = replace_region(base, words, word_range(words, first, count), take, take_words,
                                     word_range(take_words, take_first, count), sample_rate)
    return base, words


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def verify(path, recorded):
    if not path.exists() or sha256(path) != recorded:
        raise ValueError(f"{path} differs from the hash in its performance record")


def read_manifest(evidence, root, take):
    """A performance record whose base take and every region take match their recorded hashes."""
    report = json.loads(evidence.read_text())
    verify(take, report["takeSha256"])
    for region in report["regions"]:
        verify(root / region["take"], region["takeSha256"])
    return report


def select_region(report, entry):
    """A record whose region `entry["id"]` uses `entry`: replaced where it is listed, or added last.

    Regions are positioned in script tokens, so every other entry stays as it
    is and the composition is rebuilt from `baseWords`, the base take's own.
    """
    regions = report["regions"]
    end = entry["firstToken"] + entry["tokenCount"]
    for other in regions:
        if (other["id"] != entry["id"] and entry["firstToken"] < other["firstToken"] + other["tokenCount"]
                and other["firstToken"] < end):
            raise ValueError(f"{entry['id']} overlaps the replaced region {other['id']}; select that region again.")
    at = next((n for n, other in enumerate(regions) if other["id"] == entry["id"]), len(regions))
    return {**report, "baseWords": report["baseWords"] if regions else report["words"],
            "regions": regions[:at] + [entry] + regions[at + 1:]}


def compose_manifest(report, prepared, region_prepared, composed, sample_rate):
    """A record's prepared audio file and timeline words from its boundary-trimmed takes.

    With no region replaced these are the base take's own. Otherwise `baseWords`
    measures the base take, and each region lists `firstToken`, `tokenCount`,
    `takeFirstToken` and its take's measured `words`.
    """
    if not report["regions"]:
        return prepared, report["words"]
    pcm, words = compose(
        read_pcm(prepared, sample_rate), report["baseWords"],
        [(region["firstToken"], region["tokenCount"], read_pcm(path, sample_rate),
          region["words"], region["takeFirstToken"])
         for region, path in zip(report["regions"], region_prepared)], sample_rate)
    write_pcm(composed, pcm, sample_rate)
    return composed, words


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


