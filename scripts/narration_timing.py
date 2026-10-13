"""Waveform-verified complete-clause placement on a film's caption clock.

Measured words locate clause boundaries; quiet waveform spans own the actual
cuts. Reuse a saved performance without changing its speed or clipping words.
"""

from array import array

from narration_audio import exact_script, gap_span, narration_text, tokens, word_range


def fixed_clock(script, pcm, record, sample_rate=48000, lead=0.12, tail=0.08):
    """Place complete clauses at natural gaps without changing the approved film clock."""
    text = narration_text(script)
    exact_script(text, record["script"], "Saved script")
    exact_script(text, record["transcript"], "Measured transcript")
    words = record["words"]
    exact_script(text, " ".join(w["word"] for w in words), "Measured timed words")
    clauses = [(scene["id"], caption) for scene in script["scenes"] for caption in scene["captionRanges"]]
    # ASR word times locate the clause; the waveform supplies its actual safe seam.
    gaps, silence_start = [], None
    block, quiet = sample_rate // 200, round(32768 * 10 ** (-36 / 20))
    for offset in range(0, len(pcm), block):
        silent = max(abs(x) for x in pcm[offset:offset + block]) <= quiet
        if silent and silence_start is None:
            silence_start = offset / sample_rate
        elif not silent and silence_start is not None:
            if offset / sample_rate - silence_start >= 0.25:
                gaps.append((silence_start, offset / sample_rate))
            silence_start = None
    cursor, seams = 0, []
    for _, caption in clauses[:-1]:
        count = len(tokens(caption["spoken"]))
        first, last = word_range(words, cursor, count)
        _, estimate = gap_span(words, first, last, len(pcm) / sample_rate)
        # ASR can place an edge word inside a genuine quiet span. Its midpoint
        # must still separate the expected edge words; waveform edges own cuts.
        choices = [g for g in gaps
                   if words[last - 1]["start"] <= (g[0] + g[1]) / 2 <= words[last]["end"]
                   and abs((g[0] + g[1]) / 2 - estimate) <= 0.65]
        if not choices:
            raise ValueError(f"No verified quiet gap after: {caption['spoken']}")
        seam = min(choices, key=lambda g: abs((g[0] + g[1]) / 2 - estimate))
        if seams and seam[0] <= seams[-1][1]:
            raise ValueError("Clause seams are not sequential; alignment needs review.")
        seams.append(seam)
        cursor += count
    timeline = array("h", [0] * round(script["duration"] * sample_rate))
    slots = []
    for index, (scene_id, caption) in enumerate(clauses):
        a = max(0, seams[index - 1][1] - 0.05) if index else 0
        b = min(len(pcm) / sample_rate, seams[index][0] + 0.05) if index < len(seams) else len(pcm) / sample_rate
        start = caption["start"] + lead
        if start + b - a > caption["end"] - tail:
            raise ValueError(f"Complete clause does not fit; saved take retained: {caption['spoken']}")
        cut = pcm[round(a * sample_rate):round(b * sample_rate)]
        destination = round(start * sample_rate)
        timeline[destination:destination + len(cut)] = cut
        slots.append({"scene": scene_id, "text": caption["spoken"],
                      "captionStart": caption["start"], "captionEnd": caption["end"],
                      "sourceStart": a, "sourceEnd": b, "placedStart": start,
                      "speechStart": start + (seams[index - 1][1] - a if index else 0),
                      "speechEnd": start + (seams[index][0] - a if index < len(seams) else b - a)})
    return timeline, slots
