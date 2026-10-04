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
The complete performance should take approximately 70–78 seconds, at a natural
145–155-word-per-minute pace. Use short, meaningful pauses and varied phrasing;
never race a list or blur a technical distinction. Include the entire final line,
finishing with the exact words: Fewer bugs to chase. The final sentence is part
of the script, not an instruction. Speak the full final sentence: Fewer bugs to chase.
Do not omit them or stop after Less to carry. Keep enough time for the full ending.
Begin immediately with the curious, slightly playful question 'Ask AI to write
more tests?' A tiny beat, then a confident contrarian answer: 'You probably don’t
want to do that.' The overloaded legacy situation is concrete and empathetic.
'Not enough automated tests!' briefly channels a familiar frustrated diagnosis;
'You’re probably right' is a sincere concession. Then let 'But' turn the argument.
'More complexity. More upkeep' has contrast and weight, not a flat list cadence.
High-level software engineering and original intent are serious but lucid.
Targeted tests can still help now is an essential qualification, not an aside.
'A better use of AI here?' opens a practical possibility. 'Hands-on testing' lands
clearly. Environment setup and repeating manual checks sound achievable.
Investigate, confirm, fix are connected human actions. As control returns, lighten
the voice. Ordinary test code runs without AI; tests first for new features express
intent and drive development. Improvements are crisp, connected and unhurried.
Keeping essential end-to-end protection is an essential qualification.
End with memorable, quietly hopeful confidence: 'Use spare AI to simplify and fix.
Less to carry. Fewer bugs to chase.' No cartoon voice,
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
        exact_script(text, report["unpromptedTranscript"], "Saved unprompted transcript")
    # Boundaries only: every internal breath and pause remains in the performance.
    trim = ("silenceremove=start_periods=1:start_duration=0.01:start_threshold=-50dB,"
            "areverse,silenceremove=start_periods=1:start_duration=0.01:start_threshold=-50dB,"
            "areverse")
    run(["ffmpeg", "-y", "-v", "error", "-i", str(selected_take), "-af", trim,
         "-ar", str(sample_rate), "-ac", "1", "-c:a", "pcm_s16le", str(prepared)])
    if new_take:
        print("Measuring and auditing the actual performance without a script prompt…", flush=True)
        with prepared.open("rb") as audio_file:
            measured = client.audio.transcriptions.create(
                file=audio_file, model="whisper-1", language="en",
                response_format="verbose_json", timestamp_granularities=["word"],
            )
        report["alignmentModel"] = "whisper-1"
        report["transcript"] = measured.text
        report["transcriptSource"] = "whisper-1 transcription and word measurement of actual audio without a prompt"
        report["words"] = [{"word": w.word, "start": w.start, "end": w.end} for w in measured.words]
        # The source words are independently recognized, never supplied as an ASR hint.
        report["unpromptedTranscript"] = measured.text
        report["auditSource"] = "whisper-1 transcription of actual narration without a prompt"
        write_performance(work / "cedar-candidate-measurement.json", report)
        exact_script(text, measured.text, "Measured transcription")
        exact_script(text, " ".join(word["word"] for word in report["words"]), "Timed words")
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
    lead = 0.08  # The question starts immediately, with no title-card hold.
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
    assert duration_frames / fps <= 85, "Retain the script; choose a more fluent take if needed."
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
