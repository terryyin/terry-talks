"""Produce explicitly selected missing takes once; verification/replay makes no API requests."""
import argparse
import json
import sys
import wave
from pathlib import Path
from narration_audio import sha256, verify, read_pcm, write_pcm

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'terry-moves/public/assets/illustrated-conversation'
MANIFEST = ASSETS / 'takes.json'
MODEL = 'gpt-4o-mini-tts'
CAST = {
    'passed': {
        'actor': 'ai', 'voice': 'marin',
        'text': "All tests passed. I think we're ready to ship.",
        'direction': 'Speak these exact words as the same warm helpful colleague, quietly pleased and confident in completed work. A small natural pause after passed. Conversational, never a sales pitch or robot voice; gentle emphasis on ready to ship. Only speak the supplied words.',
    },
    'question': {
        'actor': 'engineer', 'voice': 'cedar',
        'text': 'Passing which tests? Did we check what the customer actually needed?',
        'direction': 'Speak these exact words as a thoughtful engineer talking to a trusted colleague. Curious, warm, quietly questioning; never scolding or theatrical. A small natural breath between the two questions. Put gentle emphasis on which tests and actually needed. Natural conversational pace. Only speak the supplied words.',
    },
    'reconsider': {
        'actor': 'ai', 'voice': 'marin',
        'text': "I checked the code I wrote. I didn't ask that.",
        'direction': 'Speak these exact words as a helpful colleague realizing a limitation. Start reflective, slightly subdued; a small natural pause after wrote, then honest recognition on I did not ask that. Warm and candid, no robot affect, no caricature or sales voice. Natural conversational pace. Only speak the supplied words.',
    },
    'next': {
        'actor': 'engineer', 'voice': 'cedar',
        'text': "Then let's start there.",
        'direction': 'Speak these exact words as the same thoughtful engineer inviting a trusted colleague to work together. Warm, calm and constructive, a slight smile; no scolding and no dramatic finish. Natural conversational pace. Only speak the supplied words.',
    },
}


def measure(path):
    with wave.open(str(path), 'rb') as recording:
        return {'sampleRate': recording.getframerate(), 'channels': recording.getnchannels(),
                'sampleFrames': recording.getnframes(), 'sampleWidth': recording.getsampwidth(),
                'durationSeconds': recording.getnframes() / recording.getframerate()}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--generate', nargs='+', choices=CAST, metavar='TAKE', help='Explicitly request only these named paid takes; refuses to overwrite saved takes.')
    args = parser.parse_args()
    if args.generate:
        report = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {'credit': 'Cedar and Marin · OpenAI synthetic voices', 'takes': {}}
        names = list(dict.fromkeys(args.generate))
        if any(name in report['takes'] or (ASSETS / f'{name}.wav').exists() for name in names):
            raise ValueError('A selected take already exists; review a separately named replacement instead of overwriting.')
        from openai import OpenAI
        client = OpenAI(timeout=180, max_retries=0)
        ASSETS.mkdir(parents=True, exist_ok=True)
        for name in names:
            direction = CAST[name]
            path = ASSETS / f'{name}.wav'
            print(f'Generating {name}: {direction["voice"]}', flush=True)
            with client.audio.speech.with_streaming_response.create(
                model=MODEL, voice=direction['voice'], input=direction['text'],
                instructions=direction['direction'], response_format='wav',
            ) as response:
                response.stream_to_file(path)
            # Streaming WAV headers can declare an unknown (0xffffffff) length.
            # Rewrite only the container header from all received PCM; never trim speech.
            pcm = read_pcm(path, 24000)
            write_pcm(path, pcm, 24000)
            report['takes'][name] = {**direction, 'model': MODEL, 'file': f'assets/illustrated-conversation/{name}.wav',
                           'sha256': sha256(path), **measure(path)}
            # Retain each completed request before starting another paid request.
            MANIFEST.write_text(json.dumps(report, indent=2) + '\n')
    report = json.loads(MANIFEST.read_text())
    for name, take in report['takes'].items():
        path = ROOT / 'terry-moves/public' / take['file']
        verify(path, take['sha256'])
        if measure(path) != {key: take[key] for key in measure(path)}:
            raise ValueError(f'{name}: take measurement changed; remeasure the take and review its mouth cues.')
        print(f'{name}: {take["durationSeconds"]:.3f}s, SHA-256 verified', flush=True)


if __name__ == '__main__':
    try:
        main()
    except Exception as error:
        print(f'Conversation speech failed: {type(error).__name__}: {error}', file=sys.stderr)
        raise SystemExit(1)
