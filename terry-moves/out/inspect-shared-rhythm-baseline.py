from PIL import Image, ImageChops, ImageStat
import wave, array, hashlib, json
from pathlib import Path

base = Path(__file__).parent
project = base.parent
frames = [17, 18, 143, 144, 215, 216, 217, 287, 288, 432, 576, 750, 791, 792, 900, 950, 1079]
colors = {'pulse': (240, 125, 98), 'answer': (117, 185, 174), 'spark': (239, 200, 117)}

with wave.open(str(base / 'shared-rhythm-baseline-decoded.wav')) as wav:
    rate = wav.getframerate()
    samples = array.array('h', wav.readframes(wav.getnframes()))

cues = [('alone-first', 18), ('answer-arrives', 144), ('answer-turns', 216), ('spark-arrives', 288), ('ensemble-pulse-one', 576), ('return-pulse', 792), ('resolve-pulse', 900)]
onsets = {}
for cue, frame in cues:
    target = frame / 30
    begin = round((target - 1 / 30) * rate)
    end = round((target + 1 / 30) * rate)
    onset = next(index / rate for index in range(begin, end) if abs(samples[index]) > 100)
    assert abs(onset - target) < 1 / 30, (cue, onset, target)
    onsets[cue] = {'frame': frame, 'seconds': onset, 'deltaFrames': (onset - target) * 30}
    print(f'{cue}: decoded onset {onset:.6f}s; picture target {target:.6f}s; delta {(onset-target)*30:.4f} frames')

rest_peak = max(abs(value) for value in samples[round(24.1 * rate):round(26.3 * rate)])
tail_peak = max(abs(value) for value in samples[round(30.6 * rate):round(36 * rate)])
assert rest_peak < 10, rest_peak
assert tail_peak < 10, tail_peak
print('Encoded rest/tail interior peaks:', rest_peak, tail_peak)
print('Decoded peak sample:', max(abs(value) for value in samples))

def bounds(image, color):
    pixels = image.load()
    coordinates = []
    for y in range(350, 760):
        for x in range(130, 950):
            p = pixels[x, y]
            if sum(abs(p[i] - color[i]) for i in range(3)) < 45:
                coordinates.append((x, y))
    if not coordinates:
        return None
    xs, ys = zip(*coordinates)
    return [min(xs), min(ys), max(xs), max(ys)]

observations = {}
images = {}
for index, frame in enumerate(frames, 1):
    path = base / f'shared-rhythm-baseline-cue-{index:02}.png'
    image = Image.open(path).convert('RGB')
    images[frame] = image
    shape_bounds = {name: bounds(image, color) for name, color in colors.items()}
    observations[str(frame)] = {
        'path': path.name,
        'pixelSha256': hashlib.sha256(image.tobytes()).hexdigest(),
        'bounds': shape_bounds,
    }
    print('Encoded picture', frame, shape_bounds)

assert observations['18']['bounds']['pulse'][2] - observations['18']['bounds']['pulse'][0] > observations['17']['bounds']['pulse'][2] - observations['17']['bounds']['pulse'][0] + 30
assert observations['143']['bounds']['answer'] is None
assert observations['144']['bounds']['answer'] is not None
assert observations['216']['bounds']['answer'][2] - observations['216']['bounds']['answer'][0] > observations['215']['bounds']['answer'][2] - observations['215']['bounds']['answer'][0] + 25
assert observations['287']['bounds']['spark'] is None
assert observations['288']['bounds']['spark'] is not None
assert all(observations['576']['bounds'].values())
assert all(observations['792']['bounds'].values())
rest_rms = ImageStat.Stat(ImageChops.difference(images[750], images[791])).rms
assert max(rest_rms) < 1, rest_rms
print('Decoded held-rest RGB RMS:', rest_rms)

inputs = [
    'src/musicAndSound/baseline.ts', 'src/musicAndSound/script.ts',
    'src/musicAndSound/direction.ts', 'src/musicAndSound/score.ts',
    'public/assets/shared-rhythm/baseline.wav', 'public/assets/shared-rhythm/baseline.json',
]
snapshot = {
    'composition': 'SharedRhythmBaseline', 'fps': 30, 'durationInFrames': 1080,
    'inputSha256': {name: hashlib.sha256((project / name).read_bytes()).hexdigest() for name in inputs},
    'decodedWavePath': 'shared-rhythm-baseline-decoded.wav',
    'decodedWaveSha256': hashlib.sha256((base / 'shared-rhythm-baseline-decoded.wav').read_bytes()).hexdigest(),
    'onsets': onsets, 'restPeak': rest_peak, 'tailPeak': tail_peak,
    'frames': observations,
}
(base / 'shared-rhythm-baseline-proof.json').write_text(json.dumps(snapshot, indent=2) + '\n')
print('Input and decoded-output snapshot saved: shared-rhythm-baseline-proof.json')
