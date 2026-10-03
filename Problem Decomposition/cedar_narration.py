"""One connected Cedar performance, with measured word alignment and exact-script audit."""

import hashlib
import json
import math
import re


MODEL = "gpt-4o-mini-tts"
VOICE = "cedar"
DIRECTION = """You are a voice actor, not a writer. Read the entire user message EXACTLY,
word for word. Do not paraphrase, rewrite, substitute pronouns, drop words, or add
words. The opening question must match the user message exactly. The user message
is the sole source of spoken words. No introductions, stage directions, bracketed
annotations, or spoken performance instructions. Your transcript contains only
the exact spoken script. Preserve ALL supplied words and their order.
Perform ONE connected sophisticated short educational film for adults, retaining
natural breaths and flow rather than isolated clauses. Warm, intimate,
intelligent, understated storytelling. Pace around 150–160 words per minute,
aiming for 85–95 seconds including natural pauses; do not rush or flatten delivery.
Emotional arc: a warm wish for a better world, then a genuinely curious opening
question with a brief pause to let it land. Observe the three friends with care.
The technical-component list has slight dry irony. The explanation is lucid and
practical; the useful result brings a little relief. Customer reaction feels
like discovery. Make the distinction and transitions to two premises, two goals
and four principles easy to follow without sounding like a list. Stopping gives
confident reassurance. The principles are conversational. The commit slogan is memorable but
not theatrical. The discussion of product health and future potential is
thoughtful and clearly phrased. End with quiet assurance and possibility.
Vary phrasing with the changing situation. No cartoon acting, sales-announcer
delivery, exaggerated drama, vocal fry, or constant upward inflection. None of
these directions are spoken. Only the user script may be spoken, verbatim."""
DIRECTION += "\nArticulate assimilate clearly, with a clean initial vowel and no added consonant."


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


def performance(root, script, run, sample_rate, new_take=False):
    assets = root / "terry-moves" / "public" / "assets" / "problem-decomposition"
    work = root / "terry-moves" / "out" / "problem-decomposition-audio"
    take = assets / "cedar-take.wav"
    evidence = root / "Problem Decomposition" / "cedar-performance.json"
    prepared = work / "cedar-prepared.wav"
    selected_take = work / "cedar-candidate.wav" if new_take else take
    text = narration_text(script)
    if new_take:
        from openai import OpenAI
        client = OpenAI(timeout=600, max_retries=0)
        print("Generating one connected Cedar performance…", flush=True)
        with client.audio.speech.with_streaming_response.create(
            model=MODEL, voice=VOICE, input=text, instructions=DIRECTION,
            response_format="wav",
        ) as response:
            response.stream_to_file(selected_take)
        report = {"model": MODEL, "voice": VOICE, "direction": DIRECTION,
                  "script": text,
                  "takeSha256": hashlib.sha256(selected_take.read_bytes()).hexdigest()}
    else:
        report = json.loads(evidence.read_text())
        assert report["takeSha256"] == hashlib.sha256(take.read_bytes()).hexdigest()
        exact_script(text, report["script"], "Saved performance")
        exact_script(text, report["transcript"], "Saved transcript")
    # Boundaries only: every internal breath and pause remains in the performance.
    trim = ("silenceremove=start_periods=1:start_duration=0.01:start_threshold=-50dB,"
            "areverse,silenceremove=start_periods=1:start_duration=0.01:start_threshold=-50dB,"
            "areverse")
    run(["ffmpeg", "-y", "-v", "error", "-i", str(selected_take), "-af", trim,
         "-ar", str(sample_rate), "-ac", "1", "-c:a", "pcm_s16le", str(prepared)])
    if new_take:
        print("Measuring the actual performance's word boundaries…", flush=True)
        with prepared.open("rb") as audio_file:
            measured = client.audio.transcriptions.create(
                file=audio_file, model="whisper-1", language="en",
                response_format="verbose_json", timestamp_granularities=["word"],
                prompt=text,
            )
        exact_script(text, measured.text, "Measured transcription")
        report["alignmentModel"] = "whisper-1"
        report["transcript"] = measured.text
        report["transcriptSource"] = "whisper-1 transcription of the actual audio"
        report["words"] = [{"word": w.word, "start": w.start, "end": w.end} for w in measured.words]
    if not new_take:
        assert report["preparedSha256"] == hashlib.sha256(prepared.read_bytes()).hexdigest()
    report["preparedSha256"] = hashlib.sha256(prepared.read_bytes()).hexdigest()
    exact_script(text, " ".join(word["word"] for word in report["words"]), "Timed words")
    if new_take:
        take.write_bytes(selected_take.read_bytes())
        write_performance(evidence, report)
    return prepared, report


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


def align(script, pcm, report, sample_rate):
    from array import array
    fps, rate, lead = script["fps"], sample_rate, 0.25
    assert rate % fps == 0
    words = []
    for word in report["words"]:
        # A tokenizer can split a hyphenated word; its full measured span is retained.
        words.extend({**word, "token": token} for token in tokens(word["word"]))
    cursor, previous_end = 0, 0
    captions = []
    for scene in script["scenes"]:
        for caption in scene["captionRanges"]:
            count = len(tokens(caption["spoken"]))
            section = words[cursor:cursor + count]
            assert [w["token"] for w in section] == tokens(caption["spoken"])
            assert section[0]["start"] >= previous_end - 0.03
            caption["speechStart"] = section[0]["start"] + lead
            caption["speechEnd"] = section[-1]["end"] + lead
            caption["wordCues"] = {}
            for word in section:
                caption["wordCues"].setdefault(word["token"], word["start"] + lead)
            previous_end = section[-1]["end"]
            cursor += count
            captions.append(caption)
    assert cursor == len(words)
    duration_frames = math.ceil((lead + len(pcm) / rate + 2.3) * fps)
    assert duration_frames / fps <= 120, "Retain the script; choose a more fluent take if needed."
    # Change the caption at a frame in the natural gap before the next clause.
    # No artificial inter-clause silence is added to the voice.
    boundaries = [0]
    for previous, following in zip(captions, captions[1:]):
        midpoint = (previous["speechEnd"] + following["speechStart"]) / 2
        boundaries.append(round(midpoint * fps))
    boundaries.append(duration_frames)
    for caption, start, end in zip(captions, boundaries, boundaries[1:]):
        caption.update(start=start / fps, end=end / fps)
        assert caption["end"] > caption["start"]
    for scene in script["scenes"]:
        scene["start"] = scene["captionRanges"][0]["start"]
        scene["end"] = scene["captionRanges"][-1]["end"]
        scene["duration"] = scene["end"] - scene["start"]
        print(f"{scene['id']:10s} {scene['start']:7.3f}–{scene['end']:7.3f}s", flush=True)
    script.update(duration=duration_frames / fps, durationInFrames=duration_frames,
                  voice="Cedar (OpenAI synthetic narration; not Terry's recorded voice)",
                  voiceCredit="CEDAR · AI-GENERATED NARRATION", narrationModel=report["model"])
    script.pop("narrationWordsPerMinute", None)
    timeline = array("h", [0] * round(lead * rate))
    timeline.extend(pcm)
    timeline.extend([0] * (duration_frames * (rate // fps) - len(timeline)))
    return timeline
