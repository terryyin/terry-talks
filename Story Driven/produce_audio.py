#!/usr/bin/env python3
"""Generate and align one connected Cedar performance to Story Impact's captions.

Run with --new-take to call OpenAI. Without it, rebuild from the saved, audited
performance using the current TypeScript timeline. Requires OpenAI SDK and ffmpeg.
"""

from array import array
import difflib
import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys
import wave

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'terry-moves/public/assets/story-impact'
WORK = ROOT / 'terry-moves/out/story-impact-audio'
MODEL = 'gpt-4o-mini-tts'
VOICE = 'cedar'
RATE = 48000
DIRECTION = '''Read the user script exactly, word for word, in the supplied order.
No introductions, explanations, paraphrases, additions, omissions or spoken stage directions.
Perform one connected short educational film for adults. Warm, intelligent,
understated storytelling, matching the sophisticated Cedar narration in a product
development explainer. Conversational delivery, clear articulation, natural breaths,
about 150 to 160 words per minute. Keep transitions flowing. SPLAT is a playful
impact, briefly emphasized without shouting. The ghost is a spent story, while
its value remains in a coherent product. The next story passage moves briskly.
Explain customer value and option value lucidly. Read every sentence, including
the final sentence, completely. Never stop early. End with quiet conviction.
The supplied text is the sole source of spoken words. These instructions are not spoken.'''


def run(command):
    return subprocess.run(command, check=True, capture_output=True, text=True)


def write_json(path, data):
    """Keep measured records readable, with each record on one line."""
    fields = []
    for name, value in data.items():
        if isinstance(value, list):
            encoded = '[\n' + ',\n'.join('    ' + json.dumps(record, ensure_ascii=False)
                                        for record in value) + '\n  ]'
        else:
            encoded = json.dumps(value, ensure_ascii=False)
        fields.append('  ' + json.dumps(name) + ': ' + encoded)
    path.write_text('{\n' + ',\n'.join(fields) + '\n}\n')


def tokens(text):
    return re.findall(r'[a-z0-9]+', text.lower().replace('’', "'").replace("'", ''))


def audit(expected, actual):
    if tokens(expected) != tokens(actual):
        changed = [w for w in difflib.ndiff(tokens(expected), tokens(actual))
                   if w.startswith(('+ ', '- '))]
        raise ValueError(f'The spoken take differs from the script: {changed}')


def read_pcm(path):
    with wave.open(str(path), 'rb') as audio:
        assert (audio.getframerate(), audio.getnchannels(), audio.getsampwidth()) == (RATE, 1, 2)
        pcm = array('h', audio.readframes(audio.getnframes()))
    if sys.byteorder != 'little':
        pcm.byteswap()
    return pcm


def write_pcm(path, pcm):
    encoded = array('h', pcm)
    if sys.byteorder != 'little':
        encoded.byteswap()
    with wave.open(str(path), 'wb') as audio:
        audio.setframerate(RATE)
        audio.setnchannels(1)
        audio.setsampwidth(2)
        audio.writeframes(encoded.tobytes())


def main():
    ASSETS.mkdir(parents=True, exist_ok=True)
    WORK.mkdir(parents=True, exist_ok=True)
    timeline = json.loads(run(['pnpm', '-C', str(ROOT / 'terry-moves'), 'exec', 'tsx',
                              str(ROOT / 'scripts/story-impact-narration.ts')]).stdout)
    script = '\n'.join(s['text'] for s in timeline['spans'])
    take = ASSETS / 'cedar-take-en.wav'
    evidence = ROOT / 'Story Driven/cedar-performance-en.json'
    if '--new-take' in sys.argv or '--finish-candidate' in sys.argv:
        from openai import OpenAI
        client = OpenAI(timeout=600, max_retries=0)
        candidate = WORK / 'cedar-candidate-en.wav'
        if '--new-take' in sys.argv:
            print('Generating one connected Cedar performance…', flush=True)
            with client.audio.speech.with_streaming_response.create(
                model=MODEL, voice=VOICE, input=script, instructions=DIRECTION,
                response_format='wav',
            ) as response:
                response.stream_to_file(candidate)
        print('Auditing the actual audio and measuring word boundaries…', flush=True)
        with candidate.open('rb') as audio:
            measured = client.audio.transcriptions.create(
                file=audio, model='whisper-1', language='en', response_format='verbose_json',
                timestamp_granularities=['word'], prompt=script,
            )
        actual = tokens(measured.text)
        expected = tokens(script)
        words = [{'word': w.word, 'start': w.start, 'end': w.end} for w in measured.words]
        transcript = measured.text
        repaired = None
        # A missing closing sentence can be completed in the separate end-card
        # shot. Any omission inside the explanation still rejects the take.
        if actual != expected and actual == expected[:len(actual)]:
            missing = expected[len(actual):]
            if missing == tokens('Products should not.'):
                repaired = 'Products should not.'
                suffix = WORK / 'cedar-closing-sentence.wav'
                with client.audio.speech.with_streaming_response.create(
                    model=MODEL, voice=VOICE, input=repaired, response_format='wav',
                    instructions='Warm, understated conviction. Read the supplied sentence exactly and completely.',
                ) as response:
                    response.stream_to_file(suffix)
                with suffix.open('rb') as audio:
                    closing = client.audio.transcriptions.create(
                        file=audio, model='whisper-1', language='en', response_format='verbose_json',
                        timestamp_granularities=['word'],
                    )
                audit(repaired, closing.text)
                parts = []
                for i, source in enumerate([candidate, suffix]):
                    converted = WORK / f'closing-part-{i}.wav'
                    run(['ffmpeg', '-y', '-v', 'error', '-i', str(source), '-ar', str(RATE),
                         '-ac', '1', '-c:a', 'pcm_s16le', str(converted)])
                    parts.append(read_pcm(converted))
                offset = len(parts[0]) / RATE + 0.12
                joined = parts[0] + array('h', [0]) * round(0.12 * RATE) + parts[1]
                write_pcm(candidate, joined)
                transcript += ' ' + closing.text
                words += [{'word': w.word, 'start': w.start + offset, 'end': w.end + offset}
                          for w in closing.words]
        audit(script, transcript)
        report = {
            'model': MODEL, 'voice': VOICE, 'direction': DIRECTION, 'script': script,
            'transcript': transcript, 'alignmentModel': 'whisper-1',
            'completedClosingSentence': repaired,
            'takeSha256': hashlib.sha256(candidate.read_bytes()).hexdigest(),
            'words': words,
        }
        take.write_bytes(candidate.read_bytes())
    else:
        report = json.loads(evidence.read_text())
        assert report['takeSha256'] == hashlib.sha256(take.read_bytes()).hexdigest()
        audit(script, report['script'])
        audit(script, report['transcript'])

    write_json(evidence, report)
    prepared = WORK / 'cedar-prepared-en.wav'
    run(['ffmpeg', '-y', '-v', 'error', '-i', str(take), '-ar', str(RATE),
         '-ac', '1', '-c:a', 'pcm_s16le', str(prepared)])
    pcm = read_pcm(prepared)
    words = [{**w, 'token': token} for w in report['words'] for token in tokens(w['word'])]
    audit(script, ' '.join(w['token'] for w in words))
    fps = timeline['fps']
    total = timeline['durationInFrames'] * (RATE // fps)
    aligned = array('h', [0]) * total
    cursor = 0
    placements = []
    for span in timeline['spans']:
        count = len(tokens(span['text']))
        section = words[cursor:cursor + count]
        assert [w['token'] for w in section] == tokens(span['text'])
        # Cut only in measured inter-clause gaps, retaining small natural breaths.
        previous_end = words[cursor - 1]['end'] if cursor else 0
        following_start = words[cursor + count]['start'] if cursor + count < len(words) else len(pcm) / RATE
        start = max(previous_end, section[0]['start'] - 0.09)
        end = min(following_start, section[-1]['end'] + 0.13)
        clip = pcm[round(start * RATE):round(end * RATE)]
        available = span['to'] - span['from'] - 0.16
        speed = max(1, len(clip) / RATE / available)
        if speed > 1.2:
            raise ValueError(f"{span['name']} would need {speed:.2f}× speech; retain the script and choose a more fluent take.")
        if speed > 1:
            raw, fitted = WORK / 'clause.wav', WORK / 'clause-fitted.wav'
            write_pcm(raw, clip)
            run(['ffmpeg', '-y', '-v', 'error', '-i', str(raw), '-af', f'atempo={speed:.8f}', str(fitted)])
            clip = read_pcm(fitted)
        at = round((span['from'] + 0.08) * RATE)
        assert at + len(clip) <= round(span['to'] * RATE)
        aligned[at:at + len(clip)] = clip
        placements.append({**span, 'speechFrom': at / RATE, 'speechTo': (at + len(clip)) / RATE,
                           'speed': speed})
        cursor += count
    assert cursor == len(words)
    unmastered = WORK / 'narration-unmastered-en.wav'
    write_pcm(unmastered, aligned)
    run(['ffmpeg', '-y', '-v', 'error', '-i', str(unmastered), '-af',
         'loudnorm=I=-18:TP=-1.5:LRA=7', '-ar', str(RATE), '-c:a', 'libmp3lame',
         '-b:a', '160k', str(ASSETS / 'narration-en.mp3')])
    alignment = {**timeline, 'voice': VOICE, 'model': MODEL, 'placements': placements}
    write_json(ASSETS / 'alignment-en.json', alignment)
    print(f"Aligned {len(placements)} clauses to {total / RATE:.2f}s; maximum speech fit {max(p['speed'] for p in placements):.2f}×.")


if __name__ == '__main__':
    main()
