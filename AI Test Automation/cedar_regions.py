"""Candidate Cedar takes of one script region, auditioned between its retained neighbours."""

import json
import re
import sys
from array import array
from narration_audio import exact_script, read_pcm, tokens, write_pcm, write_performance
from cedar_narration import DIRECTION, MODEL, VOICE, cedar_client, measure, performance, prepare, sha256, speak


EXCERPT = """This request is an excerpt of that film. Speak only the user script,
from its first word to its last, in the same connected performance."""
FADE = 0.005  # Linear crossfade centred on each seam.


def clauses(script, region):
    """`<sceneId>:<first>-<last>` or `<sceneId>:<n>`, 1-based, as its name and flat caption slice."""
    named = re.fullmatch(r"([^:]+):(\d+)(?:-(\d+))?", region)
    if not named:
        raise ValueError(f"Name a region as <scene>:<first>-<last> or <scene>:<n>, "
                         f"such as investigate:4-6, not {region!r}.")
    scene, first, last = named[1], int(named[2]), int(named[3] or named[2])
    counts = {s["id"]: len(s["captionRanges"]) for s in script["scenes"]}
    if scene not in counts:
        known = ", ".join(f"{name} ({count})" for name, count in counts.items())
        raise ValueError(f"The script has no scene {scene!r}. Its scenes and clause counts are {known}.")
    if not 1 <= first <= last <= counts[scene]:
        raise ValueError(f"Scene {scene!r} has {counts[scene]} clauses, so {region} names no region of it.")
    offset = sum(list(counts.values())[:list(counts).index(scene)])
    name = f"{scene}:{first}" + (f"-{last}" if last > first else "")
    return name, offset + first - 1, offset + last


def word_range(words, first, count):
    """Measured words holding `count` script tokens from token `first`, as align() counts them."""
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
    """Retained PCM and words with one word range replaced by a take's own range.

    Region words keep the take's spacing, later words shift by the change in
    region length, and earlier words are untouched.
    """
    (first, last), (take_first, take_last) = region, take_region
    a, b = (round(t * sample_rate) for t in gap_span(words, first, last, len(base) / sample_rate))
    a2, b2 = (round(t * sample_rate)
              for t in gap_span(take_words, take_first, take_last, len(take) / sample_rate))
    pcm = splice(base, a, b, take, a2, b2, round(FADE * sample_rate))
    move = lambda word, by: {**word, "start": word["start"] + by, "end": word["end"] + by}
    return pcm, (words[:first]
                 + [move(w, (a - a2) / sample_rate) for w in take_words[take_first:take_last]]
                 + [move(w, ((b2 - a2) - (b - a)) / sample_rate) for w in words[last:]])


def request_candidate(folder, name, region, text, spoken, note, run, sample_rate):
    """The paid step: one Cedar take of the region with its neighbours, measured without a prompt."""
    client = cedar_client()
    take, prepared = folder / f"{name}.wav", folder / f"{name}-prepared.wav"
    direction = f"{DIRECTION}\n{EXCERPT}" + (f"\nDelivery note for “{spoken}”: {note}" if note else "")
    print(f"Generating {name} for {region}…", flush=True)
    speak(client, text, direction, take)
    prepare(take, prepared, run, sample_rate)
    write_performance(folder / f"{name}.json", {
        "region": region, "requestText": text, "note": note,
        "model": MODEL, "voice": VOICE, "direction": direction,
        "takeSha256": sha256(take), "preparedSha256": sha256(prepared),
        **measure(client, prepared)})


def candidate_in_context(folder, name, text, context, before, count, size, base, words, run, sample_rate):
    """Audit a saved candidate and write it between its retained neighbours. Needs no API.

    The context starts at script token `context` and holds `size` tokens: `before`
    retained ones, the region's `count`, then the following clause.
    """
    record = json.loads((folder / f"{name}.json").read_text())
    take, prepared = folder / f"{name}.wav", folder / f"{name}-prepared.wav"
    audible = folder / f"{name}-in-context.wav"
    audible.unlink(missing_ok=True)  # Only an audited candidate is offered in context.
    if not take.exists() or record["takeSha256"] != sha256(take):
        raise ValueError(f"{take.name} differs from its record")
    exact_script(text, record["requestText"], f"{name} request")
    exact_script(text, record["transcript"], f"{name} measured transcription")
    exact_script(text, " ".join(word["word"] for word in record["words"]), f"{name} timed words")
    prepare(take, prepared, run, sample_rate)
    if record["preparedSha256"] != sha256(prepared):
        raise ValueError(f"{prepared.name} differs from its record")
    region = word_range(words, context + before, count)
    pcm, composed = replace_region(base, words, region, read_pcm(prepared, sample_rate), record["words"],
                                   word_range(record["words"], before, count), sample_rate)
    start, end = gap_span(composed, *word_range(composed, context, size), len(pcm) / sample_rate)
    write_pcm(audible, pcm[round(start * sample_rate):round(end * sample_rate)], sample_rate)
    replaced = gap_span(words, *region, len(base) / sample_rate)
    return audible, end - start, (len(pcm) - len(base)) / sample_rate, replaced[1] - replaced[0]


def audition(root, script, run, sample_rate, region, note="", candidates=1):
    """Request `candidates` new takes of one region and write every saved one in context."""
    name, first, last = clauses(script, region)
    spoken = [c["spoken"] for s in script["scenes"] for c in s["captionRanges"]]
    size = lambda spoken_clauses: len(tokens(" ".join(spoken_clauses)))
    before, replaced, after = spoken[max(first - 1, 0):first], spoken[first:last], spoken[last:last + 1]
    text = " ".join(before + replaced + after)
    token_spans = (size(spoken[:first]) - size(before), size(before), size(replaced),
                   size(before + replaced + after))
    prepared, report = performance(root, script, run, sample_rate)
    base = read_pcm(prepared, sample_rate)
    # Auditions stay beside the prepared base take in the ignored work directory.
    folder = prepared.parent / "auditions" / name
    folder.mkdir(parents=True, exist_ok=True)
    numbered = (re.fullmatch(r"candidate-(\d+)", record.stem) for record in folder.glob("*.json"))
    latest = max((int(found[1]) for found in numbered if found), default=0)
    for number in range(latest + 1, latest + 1 + candidates):
        request_candidate(folder, f"candidate-{number}", name, text, " ".join(replaced), note, run, sample_rate)
    refused = 0
    for record in sorted(folder.glob("*.json")):
        try:
            audible, seconds, change, original = candidate_in_context(
                folder, record.stem, text, *token_spans, base, report["words"], run, sample_rate)
            print(f"{record.stem}: region {original + change:.2f}s ({change:+.2f}s against the base take); "
                  f"{seconds:.2f}s in context at {audible}", flush=True)
        except ValueError as problem:
            refused += 1
            print(f"{problem}. {record.stem} is not offered for selection.", file=sys.stderr, flush=True)
    return refused
