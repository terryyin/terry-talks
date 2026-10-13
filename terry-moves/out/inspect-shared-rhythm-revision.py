from PIL import Image, ImageChops, ImageStat
import wave, array, hashlib, json, subprocess
from pathlib import Path

base = Path(__file__).parent
project = base.parent
snapshot = json.loads((base / 'shared-rhythm-baseline-proof.json').read_text())
frames = [17, 18, 143, 144, 215, 216, 217, 224, 225, 226, 287, 288, 432, 576, 750, 791, 792, 900, 950, 1079]
colors = {'pulse': (240, 125, 98), 'answer': (117, 185, 174), 'spark': (239, 200, 117)}

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

for name, expected in snapshot['inputSha256'].items():
    assert sha(project / name) == expected, name

def decode(name):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', str(base / f'{name}.mp4'),
                    '-vn', '-acodec', 'pcm_s16le', '-ar', '44100', '-ac', '1', str(base / f'{name}-decoded.wav')], check=True)
    with wave.open(str(base / f'{name}-decoded.wav')) as wav:
        assert wav.getframerate() == 44100
        return array.array('h', wav.readframes(wav.getnframes()))

def extract(name, selected):
    select = '+'.join(f'eq(n\\,{frame})' for frame in selected)
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', str(base / f'{name}.mp4'),
                    '-vf', f'select={select}', '-vsync', '0', str(base / f'{name}-cue-%02d.png')], check=True)
    return {frame: Image.open(base / f'{name}-cue-{index:02}.png').convert('RGB') for index, frame in enumerate(selected, 1)}

original_samples = decode('shared-rhythm-baseline')
baseline_samples = decode('shared-rhythm-baseline-replayed')
revised_samples = decode('shared-rhythm-revision')
replay_samples = decode('shared-rhythm-revision-replayed')
assert original_samples == baseline_samples
assert revised_samples == replay_samples
assert sha(base / 'shared-rhythm-baseline-replayed-decoded.wav') == snapshot['decodedWaveSha256']

baseline_frames = [int(frame) for frame in snapshot['frames']]
baseline_pictures = extract('shared-rhythm-baseline-replayed', baseline_frames)
for frame, picture in baseline_pictures.items():
    assert hashlib.sha256(picture.tobytes()).hexdigest() == snapshot['frames'][str(frame)]['pixelSha256'], frame

revised_pictures = extract('shared-rhythm-revision', frames)
replay_pictures = extract('shared-rhythm-revision-replayed', frames)
for frame in frames:
    assert revised_pictures[frame].tobytes() == replay_pictures[frame].tobytes(), frame

def onset(samples, frame):
    begin, end = round((frame - 1) / 30 * 44100), round((frame + 1) / 30 * 44100)
    return next(index / 44100 for index in range(begin, end) if abs(samples[index]) > 100)

onsets = {}
for cue, prior in snapshot['onsets'].items():
    frame = 225 if cue == 'answer-turns' else prior['frame']
    actual = onset(revised_samples, frame)
    assert abs(actual - frame / 30) < 1 / 30, cue
    delta = (actual - prior['seconds']) * 30
    assert abs(delta - (9 if cue == 'answer-turns' else 0)) < 0.000001, (cue, delta)
    onsets[cue] = {'frame': frame, 'seconds': actual, 'movedFrames': delta}

def bounds(image, color):
    pixels = image.load()
    coords = [(x, y) for y in range(350, 760) for x in range(130, 950)
              if sum(abs(pixels[x, y][i] - color[i]) for i in range(3)) < 45]
    if not coords:
        return None
    xs, ys = zip(*coords)
    return [min(xs), min(ys), max(xs), max(ys)]

observations = {}
for frame, picture in revised_pictures.items():
    observations[str(frame)] = {'pixelSha256': hashlib.sha256(picture.tobytes()).hexdigest(),
                                'bounds': {name: bounds(picture, color) for name, color in colors.items()}}
answer = lambda frame: observations[str(frame)]['bounds']['answer']
width = lambda box: box[2] - box[0]
assert width(answer(225)) > width(answer(224)) + 25
assert width(answer(216)) < width(answer(225)) - 25
unchanged_rms = {}
for frame in baseline_frames:
    if 210 <= frame < 237:
        continue
    rms = ImageStat.Stat(ImageChops.difference(baseline_pictures[frame], revised_pictures[frame])).rms
    assert max(rms) < 1, (frame, rms)
    unchanged_rms[str(frame)] = rms
    assert observations[str(frame)]['bounds'] == snapshot['frames'][str(frame)]['bounds'], frame

assert original_samples[:round(7.15 * 44100)] == revised_samples[:round(7.15 * 44100)]
assert original_samples[round(8.05 * 44100):] == revised_samples[round(8.05 * 44100):]
rest = max(abs(value) for value in revised_samples[round(24.1 * 44100):round(26.3 * 44100)])
tail = max(abs(value) for value in revised_samples[round(30.6 * 44100):round(36 * 44100)])
assert rest == tail == 0
proof = {'composition': 'SharedRhythmRevision', 'inputSha256': snapshot['inputSha256'],
         'revisionSourceSha256': sha(project / 'src/musicAndSound/revision.ts'),
         'revisionWaveSha256': sha(project / 'public/assets/shared-rhythm/revision.wav'),
         'revisionManifestSha256': sha(project / 'public/assets/shared-rhythm/revision.json'),
         'baselineReplayDecodedWaveSha256': sha(base / 'shared-rhythm-baseline-replayed-decoded.wav'),
         'revisionDecodedWaveSha256': sha(base / 'shared-rhythm-revision-decoded.wav'),
         'baselineReplayExactFrames': baseline_frames, 'revisionReplayExactFrames': frames,
         'onsets': onsets, 'frames': observations, 'unchangedFrameRms': unchanged_rms,
         'decodedPeak': max(abs(value) for value in revised_samples), 'restPeak': rest, 'tailPeak': tail}
(base / 'shared-rhythm-revision-proof.json').write_text(json.dumps(proof, indent=2) + '\n')
print(json.dumps({key: proof[key] for key in ['onsets', 'baselineReplayExactFrames', 'revisionReplayExactFrames', 'decodedPeak', 'restPeak', 'tailPeak']}, indent=2))
print('Both replays match decoded PCM and all sampled picture hashes; retained baseline inputs match.')
