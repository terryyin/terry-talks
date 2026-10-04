"""One connected Cedar performance, with measured word alignment and exact-script audit."""

import hashlib
import json
import math
from narration_audio import exact_script, narration_text, tokens, write_performance


MODEL = "gpt-4o-mini-tts"
VOICE = "cedar"
DIRECTION = """You are a voice actor, not a writer. Read the entire user message EXACTLY,
word for word, preserving every supplied word and its order. Do not paraphrase,
rewrite, add words, substitute words, or drop words. No introductions, stage
directions, bracketed annotations, or spoken performance instructions.
Perform ONE connected, engaging short educational film for experienced software
professionals. Warm, intelligent, candid and lucid; the listener feels you are
speaking directly to a capable colleague. Natural breaths and varied phrasing.
The complete performance should take approximately 65–70 seconds. Speak at a
measured 130-word-per-minute pace, with a short pause between major ideas.
Let each technical distinction land. The full final sentence must include every
word, finishing with the exact words: with less to maintain. Do not stop early.
Begin immediately with the intriguing sentence 'You probably don’t want to do that.'
Give it quiet, slightly playful confidence; a brief beat lets the question land.
The next question is curious. The overloaded legacy situation has empathy and
clarity. Stress useful, targeted tests: those can help even now. A pile of generated
code sounds like an avoidable burden. High-level engineering is serious but calm.
The isolated environment is practical reassurance. Hands-on testing sounds like
an action a colleague can take. Investigate findings before fixing confirmed
problems. As control returns, the voice becomes lighter and more hopeful.
The final improvements are crisp and connected, never a machine-gun list.
Keep the wider protection is an essential qualification. Finish with memorable,
quiet confidence on 'better protection, with less to maintain.' No cartoon voice,
sales-announcer style, exaggerated drama, constant upward inflection, or vocal fry.
None of these directions may be spoken. Only the user script is spoken verbatim."""

def performance(root, script, run, sample_rate, new_take=False):
    assets = root / "terry-moves" / "public" / "assets" / "ai-test-automation"
    work = root / "terry-moves" / "out" / "ai-test-automation-audio"
    take = assets / "cedar-take.wav"
    evidence = root / "AI Test Automation" / "cedar-performance.json"
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
        report["alignmentModel"] = "whisper-1"
        report["transcript"] = measured.text
        report["transcriptSource"] = "whisper-1 transcription of the actual audio"
        report["words"] = [{"word": w.word, "start": w.start, "end": w.end} for w in measured.words]
        write_performance(work / "cedar-candidate-measurement.json", report)
        exact_script(text, measured.text, "Measured transcription")
    if not new_take:
        assert report["preparedSha256"] == hashlib.sha256(prepared.read_bytes()).hexdigest()
    report["preparedSha256"] = hashlib.sha256(prepared.read_bytes()).hexdigest()
    exact_script(text, " ".join(word["word"] for word in report["words"]), "Timed words")
    if new_take:
        take.write_bytes(selected_take.read_bytes())
        write_performance(evidence, report)
    return prepared, report


def align(script, pcm, report, sample_rate):
    from array import array
    fps, rate = script["fps"], sample_rate
    lead = 0.08  # The hook starts immediately, with no title-card hold.
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
    duration_frames = math.ceil((lead + len(pcm) / rate + 2.0) * fps)
    assert duration_frames / fps <= 75, "Retain the script; choose a more fluent take if needed."
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
