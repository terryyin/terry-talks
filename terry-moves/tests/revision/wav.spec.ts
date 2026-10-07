/** @jest-environment node */
import {compareWav} from '../../revision/wav';

const wav = (samples: number[], channels = 1, sampleRate = 10, tag = '') => {
  const extra = tag ? Buffer.from(`LIST${String.fromCharCode(2, 0, 0, 0)}${tag}`) : Buffer.alloc(0);
  const buffer = Buffer.alloc(44 + extra.length + samples.length * 2);
  buffer.write('RIFF');
  buffer.writeUInt32LE(buffer.length - 8, 4);
  buffer.write('WAVEfmt ', 8);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(channels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * channels * 2, 28);
  buffer.writeUInt16LE(channels * 2, 32);
  buffer.writeUInt16LE(16, 34);
  extra.copy(buffer, 36);
  buffer.write('data', 36 + extra.length);
  buffer.writeUInt32LE(samples.length * 2, 40 + extra.length);
  samples.forEach((sample, index) => buffer.writeInt16LE(sample, 44 + extra.length + index * 2));
  return buffer;
};

describe('approved mixed audio', () => {
  test('identical samples are unchanged even with different container tags', () => {
    expect(compareWav(wav([1, 2, 3]), wav([1, 2, 3], 1, 10, 'ab'))).toEqual({identical: true});
  });

  test('names the first and last differing second across stereo channels', () => {
    const before = wav([0, 0, 1, 1, 2, 2, 3, 3], 2);
    const after = wav([0, 0, 1, 9, 2, 2, 9, 3], 2);
    expect(compareWav(before, after)).toEqual({
      identical: false, start: 0.1, end: 0.3, reason: 'Mixed audio samples changed.',
    });
  });

  test('detects a missing tail and a changed sample rate', () => {
    expect(compareWav(wav([1, 2, 3]), wav([1]))).toEqual({
      identical: false, start: 0.1, end: 0.2, reason: 'Mixed audio duration changed.',
    });
    expect(compareWav(wav([1, 2]), wav([1, 2], 1, 20))).toMatchObject({
      identical: false, start: 0, reason: 'Audio sample format, channel count or sample rate changed.',
    });
  });

  test('fails explicitly if sound cannot be decoded as WAV evidence', () => {
    expect(() => compareWav(Buffer.from('bad'), wav([1]))).toThrow(/RIFF\/WAVE/);
  });
});
