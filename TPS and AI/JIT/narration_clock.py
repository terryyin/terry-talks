"""Place complete measured English clauses on Just in time's accepted caption clock."""

from array import array

from narration_audio import exact_script, gap_span, narration_text, tokens, word_range

RATE = 48000


def fixed_clock(script, pcm, record):
    """Keep every complete measured clause on the accepted, unchanged caption clock."""
    text, words = narration_text(script), record["words"]
    exact_script(text, record["script"], "Saved performance script")
    exact_script(text, record["transcript"], "Actual audio transcript")
    exact_script(text, " ".join(w["word"] for w in words), "Actual timed words")
    if any(w["start"] < 0 or w["end"] < w["start"] for w in words):
        raise ValueError("Measured words have invalid timing.")
    if any(a["end"] > b["start"] + 0.03 for a, b in zip(words, words[1:])):
        raise ValueError("Measured words overlap; complete-clause cuts are unsafe.")
    timeline = array("h", [0] * round(script["duration"] * RATE))
    cursor, previous_end, slots = 0, 0, []
    for scene in script["scenes"]:
        for caption in scene["captionRanges"]:
            count = len(tokens(caption["spoken"]))
            first, last = word_range(words, cursor, count)
            exact_script(caption["spoken"], " ".join(w["word"] for w in words[first:last]),
                         f"Complete clause {scene['id']}")
            a, b = gap_span(words, first, last, len(pcm) / RATE)
            # Surplus natural silence can be removed; words and internal pauses stay intact.
            a = max(a, words[first]["start"] - 0.14)
            b = min(b, words[last - 1]["end"] + 0.18)
            if a > words[first]["start"] or b < words[last - 1]["end"]:
                raise ValueError(f"No natural gap around complete clause: {caption['spoken']}")
            start = caption["start"] + 0.1
            available = caption["end"] - 0.08 - start
            if b - a > available:
                raise ValueError(
                    f"Saved take retained: {scene['id']} {caption['start']}–{caption['end']}s "
                    f"needs {b - a:.3f}s, has {available:.3f}s: {caption['spoken']}")
            if caption["start"] < previous_end or caption["end"] > script["duration"]:
                raise ValueError("Accepted caption slots overlap or exceed the film.")
            cut = pcm[round(a * RATE):round(b * RATE)]
            destination = round(start * RATE)
            timeline[destination:destination + len(cut)] = cut
            slots.append({"scene": scene["id"], "text": caption["spoken"],
                          "captionStart": caption["start"], "captionEnd": caption["end"],
                          "sourceStart": a, "sourceEnd": b, "placedStart": start,
                          "speechStart": start + words[first]["start"] - a,
                          "speechEnd": start + words[last - 1]["end"] - a})
            previous_end = caption["end"]
            cursor += count
    if cursor != len(tokens(text)) or word_range(words, 0, cursor)[1] != len(words):
        raise ValueError("Not every measured word was placed in the film.")
    if len(timeline) != round(script["duration"] * RATE):
        raise ValueError("Narration changed the accepted film duration.")
    return timeline, slots
