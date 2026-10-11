"""Candidate Cedar takes of one script region, auditioned between its retained neighbours."""

import contextlib
import io
import json
import re
import sys
from copy import deepcopy
from narration_audio import (exact_script, gap_span, read_pcm, replace_region, select_region,
                             sha256, tokens, verify, word_range, write_pcm, write_performance)
from cedar_narration import (CEILING, DIRECTION, MODEL, VOICE, align, cedar_client, composition, film_frames,
                             measure, performance, prepare, record_path, region_prepared, speak)


EXCERPT = """This request is an excerpt of that film. Speak only the user script,
from its first word to its last, in the same connected performance."""


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
    verify(take, record["takeSha256"])
    exact_script(text, record["requestText"], f"{name} request")
    exact_script(text, record["transcript"], f"{name} measured transcription")
    exact_script(text, " ".join(word["word"] for word in record["words"]), f"{name} timed words")
    prepare(take, prepared, run, sample_rate)
    verify(prepared, record["preparedSha256"])
    region = word_range(words, context + before, count)
    pcm, composed = replace_region(base, words, region, read_pcm(prepared, sample_rate), record["words"],
                                   word_range(record["words"], before, count), sample_rate)
    start, end = gap_span(composed, *word_range(composed, context, size), len(pcm) / sample_rate)
    write_pcm(audible, pcm[round(start * sample_rate):round(end * sample_rate)], sample_rate)
    replaced = gap_span(words, *region, len(base) / sample_rate)
    return audible, end - start, (len(pcm) - len(base)) / sample_rate, replaced[1] - replaced[0]


def request(script, region):
    """A region's name, the text asked of a candidate, the region's own words, and its token spans:
    the context's first script token, the retained tokens before the region, the region's, the context's."""
    name, first, last = clauses(script, region)
    spoken = [c["spoken"] for s in script["scenes"] for c in s["captionRanges"]]
    size = lambda spoken_clauses: len(tokens(" ".join(spoken_clauses)))
    before, replaced, after = spoken[max(first - 1, 0):first], spoken[first:last], spoken[last:last + 1]
    return (name, " ".join(before + replaced + after), " ".join(replaced),
            (size(spoken[:first]) - size(before), size(before), size(replaced), size(before + replaced + after)))


def audition(root, script, run, sample_rate, region, note="", candidates=1):
    """Request `candidates` new takes of one region and write every saved one in context."""
    name, text, replaced, token_spans = request(script, region)
    prepared, report = performance(root, script, run, sample_rate)
    base = read_pcm(prepared, sample_rate)
    # Auditions stay beside the prepared base take in the ignored work directory.
    folder = prepared.parent / "auditions" / name
    folder.mkdir(parents=True, exist_ok=True)
    numbered = (re.fullmatch(r"candidate-(\d+)", record.stem) for record in folder.glob("*.json"))
    latest = max((int(found[1]) for found in numbered if found), default=0)
    for number in range(latest + 1, latest + 1 + candidates):
        request_candidate(folder, f"candidate-{number}", name, text, replaced, note, run, sample_rate)
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


def region_entry(name, spoken, candidate, saved, first, count, take_first):
    """The record's entry for a region whose take is the saved candidate, kept under the film's assets."""
    take = (f"terry-moves/public/assets/ai-test-automation/regions/"
            f"{name.replace(':', '-')}-{saved['takeSha256'][:12]}.wav")
    return {"id": name, "spoken": spoken, "candidate": candidate,
            **{key: saved[key] for key in ("note", "requestText", "model", "voice", "direction", "alignmentModel",
                                           "transcript", "transcriptSource")},
            "take": take, "takeSha256": saved["takeSha256"],
            "firstToken": first, "tokenCount": count, "takeFirstToken": take_first, "words": saved["words"]}


def select(root, script, run, sample_rate, region, candidate):
    """Make a saved candidate its region's take; the measured script the composition gives. Needs no API.

    Everything is checked before the region take and the record are written.
    """
    name, text, replaced, (context, before, count, size) = request(script, region)
    prepared, report = performance(root, script, run, sample_rate)
    work = prepared.parent
    folder = work / "auditions" / name
    if not (folder / f"{candidate}.json").exists():
        raise ValueError(f"{name} has no saved candidate {candidate!r} in {folder}.")
    try:
        candidate_in_context(folder, candidate, text, context, before, count, size,
                             read_pcm(prepared, sample_rate), report["words"], run, sample_rate)
    except ValueError as problem:
        raise ValueError(f"{problem}. {candidate} cannot be selected.")
    saved = json.loads((folder / f"{candidate}.json").read_text())
    entry = region_entry(name, replaced, candidate, saved, context + before, count, before)
    take = entry["take"]
    record = select_region(report, entry)
    trimmed = [folder / f"{candidate}-prepared.wav" if listed is entry else path
               for listed, path in zip(record["regions"], region_prepared(work, record["regions"]))]
    composed, words = composition(work, record, trimmed, sample_rate)
    pcm = read_pcm(composed, sample_rate)
    seconds = film_frames(script, pcm, sample_rate) / script["fps"]
    if seconds > CEILING:  # align() asserts the same ceiling; this refusal says what to do.
        raise ValueError(f"Selecting {candidate} for {name} would make the workshop {seconds:.2f} s long, "
                         f"beyond its {CEILING} s ceiling, so it is not applied; choose a shorter candidate.")
    record.update(words=words, preparedSha256=sha256(composed))
    measured = deepcopy(script)
    with contextlib.redirect_stdout(io.StringIO()):  # The producer prints the scene spans when it rebuilds.
        align(measured, pcm, record, sample_rate)
    replaced_takes = {listed["take"] for listed in report["regions"]} - {listed["take"] for listed in record["regions"]}
    (root / take).parent.mkdir(parents=True, exist_ok=True)
    (root / take).write_bytes((folder / f"{candidate}.wav").read_bytes())
    for old in replaced_takes:
        (root / old).unlink(missing_ok=True)  # A region keeps only its current take.
    write_performance(record_path(root), record)
    print(f"Selected {candidate} for {name}: “{replaced}” is now {take}.", flush=True)
    return measured
