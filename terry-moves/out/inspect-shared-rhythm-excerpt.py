from PIL import Image
import wave, array
from pathlib import Path

base = Path(__file__).parent
with wave.open(str(base / 'shared-rhythm-excerpt-decoded.wav')) as wav:
    rate = wav.getframerate()
    samples = array.array('h', wav.readframes(wav.getnframes()))
for cue, frame in [('first-pulse', 18), ('answer-enters', 72), ('spark-enters', 144), ('together-pulse', 252)]:
    target = frame / 30
    begin = round((target - 1 / 30) * rate)
    end = round((target + 1 / 30) * rate)
    onset = next(index / rate for index in range(begin, end) if abs(samples[index]) > 100)
    assert abs(onset - target) < 1 / 30, (cue, onset, target)
    print(f'{cue}: decoded onset {onset:.6f}s; picture target {target:.6f}s; delta {(onset-target)*30:.4f} frames')
rest = samples[round(7.3 * rate):round(8.3 * rate)]
print('Encoded rest interior peak:', max(abs(value) for value in rest))
assert max(abs(value) for value in rest) < 10
frames = [17, 18, 19, 71, 72, 144, 230, 251, 252]
colors = {'pulse': (240, 125, 98), 'answer': (117, 185, 174), 'spark': (239, 200, 117)}

def bounds(image, color):
    pixels = image.convert('RGB').load()
    coordinates = []
    for y in range(350, 760):
        for x in range(130, 950):
            p = pixels[x, y]
            if sum(abs(p[i] - color[i]) for i in range(3)) < 45:
                coordinates.append((x, y))
    if not coordinates:
        return None
    xs, ys = zip(*coordinates)
    return (min(xs), min(ys), max(xs), max(ys))

for index, frame in enumerate(frames, 1):
    image = Image.open(base / f'shared-rhythm-excerpt-cue-{index:02}.png')
    result = {name: bounds(image, color) for name, color in colors.items()}
    print('Encoded picture', frame, result)
    if frame == 17:
        before = result['pulse']
    if frame == 18:
        impact = result['pulse']
        assert impact[2] - impact[0] > before[2] - before[0] + 30
    if frame == 71:
        assert result['answer'] is None
    if frame == 72:
        assert result['answer'] is not None
    if frame == 144:
        assert result['spark'] is not None
