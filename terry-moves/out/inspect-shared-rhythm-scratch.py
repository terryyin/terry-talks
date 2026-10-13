from pathlib import Path
from PIL import Image
import wave, array, json, hashlib

base = Path(__file__).parent
project = base.parent
with wave.open(str(base / 'shared-rhythm-scratch-passage-decoded.wav')) as wav:
    rate = wav.getframerate()
    samples = array.array('h', wav.readframes(wav.getnframes()))
onset = next(i / rate for i in range(round(36.28 * rate), round(36.34 * rate)) if abs(samples[i]) > 100)
assert abs(onset - 36.3) < 1 / 30, onset
images = [Image.open(base / f'shared-rhythm-scratch-passage-cue-{i:02}.png').convert('RGB') for i in range(1, 6)]

def bounds(image, color):
    pixels = image.load()
    coords = [(x, y) for y in range(350, 760) for x in range(130, 950)
              if sum(abs(pixels[x, y][i] - color[i]) for i in range(3)) < 45]
    if not coords:
        return None
    xs, ys = zip(*coords)
    return [min(xs), min(ys), max(xs), max(ys)]

colors = {'pulse': (240, 125, 98), 'answer': (117, 185, 174), 'spark': (239, 200, 117)}
boxes = [{key: bounds(image, color) for key, color in colors.items()} for image in images]
assert all(boxes[0].values())
assert boxes[1]['answer'] and boxes[1]['pulse'] is None and boxes[1]['spark'] is None
assert boxes[3]['answer'][2] - boxes[3]['answer'][0] > boxes[2]['answer'][2] - boxes[2]['answer'][0] + 25
manifest = json.loads((base / 'shared-rhythm-scratch.json').read_text())
assert hashlib.sha256((base / 'shared-rhythm-scratch.wav').read_bytes()).hexdigest() == manifest['wavSha256']
proof = {'composition': 'SharedRhythmRevision', 'props': 'shared-rhythm-scratch-props.json',
         'durationInFrames': 1116, 'scratchPassageStartFrame': 1080, 'scratchImpactFrame': 1089,
         'decodedOnsetSeconds': onset, 'decodedDeltaFrames': (onset - 36.3) * 30,
         'savedScore': manifest, 'frames': dict(zip([1079, 1080, 1088, 1089, 1090], boxes))}
(base / 'shared-rhythm-scratch-passage-proof.json').write_text(json.dumps(proof, indent=2) + '\n')
for name, expected in json.loads((base / 'shared-rhythm-before-scratch-hashes.json').read_text()).items():
    assert hashlib.sha256((project / name).read_bytes()).hexdigest() == expected, name
assert (project / 'scripts/shared-rhythm-score.ts').read_bytes() == (base / 'shared-rhythm-save-cli-before-scratch.ts.txt').read_bytes()
assert not (project / 'src/musicAndSound/scratch.ts').exists()
assert not (project / 'tests/musicAndSound/scratchSaved.spec.tsx').exists()
assert not (project / 'public/assets/shared-rhythm/scratch.wav').exists()
print('Scratch passage: matching saved take, new encoded teal impact1089, decoded onset', onset)
print('Temporary product paths/selection restored; excerpt/revision inputs preserved.')
