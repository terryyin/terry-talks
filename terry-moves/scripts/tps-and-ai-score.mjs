import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Original instrumental composition for this film. No recordings, samples, or external services.
// A damped string/piano-like oscillator and low open-fifth pad follow the authored scene clock.
const script = JSON.parse(readFileSync(new URL('../../TPS%20and%20AI/film-script.json', import.meta.url), 'utf8'));
const rate = 44100;
const masterGain = 5.5;
const samples = new Float64Array(Math.round(script.duration * rate));
const frequency = (midi) => 440 * 2 ** ((midi - 69) / 12);
const notes = [];
const pluck = (at, midi, gain = 0.055, length = 4.5) => notes.push({ at, midi, gain, length, pad: false });
const pad = (at, midi, gain, length) => notes.push({ at, midi, gain, length, pad: true });
const scene = (id) => script.scenes.find((item) => item.id === id);

// Sparse five-note motif. A lower unsettled harmony accompanies the burden; the stop has space.
for (const [id, harmony, melody] of [
  ['hook', [50, 57, 64], [74, 69, 76]],
  ['burden', [46, 53, 60], [69, 70, 65]],
  ['house', [50, 57, 62], [69, 74]],
  ['loom', [50, 57, 62], [69, 74, 72]],
  ['contrast', [48, 55, 62], [76, 74, 79]],
  ['judgment', [50, 57, 64], [74, 69, 76]],
  ['minimalism', [55, 62, 69], [74, 81]],
  ['freedom', [55, 62, 69], [74, 76, 81]],
  ['closing', [50, 57, 66], [78, 76, 74]],
]) {
  const shot = scene(id);
  const duration = shot.end - shot.start;
  harmony.forEach((midi, i) => pad(shot.start, midi, i === 0 ? 0.011 : 0.008, duration + 1.5));
  melody.forEach((midi, i) => pluck(shot.start + 0.75 + i * Math.min(3.1, duration / melody.length), midi));
  if (id !== 'loom') pluck(shot.start + duration * 0.55, harmony[1] + 12, 0.025);
}
pluck(scene('contrast').captionRanges[1].start, 69, 0.035);
pluck(scene('closing').creditStart - 0.8, 74, 0.04, 4.5);

for (const { at, midi, gain, length, pad: sustained } of notes) {
  const hz = frequency(midi);
  const start = Math.round(at * rate);
  const frames = Math.min(Math.round(length * rate), samples.length - start);
  for (let n = 0; n < frames; n++) {
    const t = n / rate;
    const envelope = sustained
      ? Math.min(1, t / 1.6) * Math.min(1, Math.max(0, (length - t) / 2.2))
      : (1 - Math.exp(-t * 110)) * Math.exp(-t * 1.22);
    const tone = sustained
      ? Math.sin(t * hz * Math.PI * 2) * 0.8 + Math.sin(t * hz * 1.0011 * Math.PI * 2) * 0.2
      : Math.sin(t * hz * Math.PI * 2) + 0.32 * Math.sin(t * hz * 2.003 * Math.PI * 2) + 0.13 * Math.sin(t * hz * 3.998 * Math.PI * 2);
    samples[start + n] += tone * gain * envelope;
  }
}
// Fixed, low-level reflections retain note clarity rather than a synthetic wash.
const dry = samples.slice();
for (const [delay, gain] of [[0.173, 0.12], [0.317, 0.08], [0.491, 0.045]]) {
  const offset = Math.round(delay * rate);
  for (let n = offset; n < samples.length; n++) samples[n] += dry[n - offset] * gain;
}
const wav = Buffer.alloc(44 + samples.length * 2);
wav.write('RIFF', 0); wav.writeUInt32LE(wav.length - 8, 4); wav.write('WAVEfmt ', 8);
wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(1, 22);
wav.writeUInt32LE(rate, 24); wav.writeUInt32LE(rate * 2, 28); wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34);
wav.write('data', 36); wav.writeUInt32LE(samples.length * 2, 40);
const stopAt = scene('loom').start + 5.5;
for (let n = 0; n < samples.length; n++) {
  const seconds = n / rate;
  const fade = Math.min(1, seconds / 0.8, Math.max(0, (script.duration - seconds) / 3));
  const stopSpace = 1 - 0.7 * Math.min(1, Math.max(0, (seconds - stopAt) / 0.08), Math.max(0, (stopAt + 1.2 - seconds) / 0.12));
  wav.writeInt16LE(Math.round(Math.max(-1, Math.min(1, samples[n] * fade * stopSpace * masterGain)) * 32767), 44 + n * 2);
}
const output = new URL('../public/assets/tps-and-ai/score.wav', import.meta.url);
writeFileSync(output, wav);
console.log(`Original ${script.duration}s mono PCM score: ${fileURLToPath(output)}`);
