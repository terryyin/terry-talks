type Wave = {
  format: number;
  channels: number;
  sampleRate: number;
  bitsPerSample: number;
  blockAlign: number;
  data: Buffer;
};

export type AudioDifference = {
  identical: boolean;
  start?: number;
  end?: number;
  reason?: string;
};

const readWave = (buffer: Buffer): Wave => {
  if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WAVE') {
    throw new Error('Audio comparison requires a RIFF/WAVE file.');
  }
  let format: Omit<Wave, 'data'> | undefined;
  let data: Buffer | undefined;
  for (let offset = 12; offset + 8 <= buffer.length;) {
    const chunk = buffer.toString('ascii', offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    const start = offset + 8;
    if (start + size > buffer.length) throw new Error('Truncated WAV chunk.');
    if (chunk === 'fmt ') {
      if (size < 16) throw new Error('Truncated WAV format.');
      let encoding = buffer.readUInt16LE(start);
      if (encoding === 0xfffe && size >= 40) encoding = buffer.readUInt16LE(start + 24);
      if (encoding !== 1 && encoding !== 3) throw new Error(`Unsupported WAV encoding ${encoding}; use PCM or float.`);
      format = {
        format: encoding,
        channels: buffer.readUInt16LE(start + 2),
        sampleRate: buffer.readUInt32LE(start + 4),
        blockAlign: buffer.readUInt16LE(start + 12),
        bitsPerSample: buffer.readUInt16LE(start + 14),
      };
    }
    if (chunk === 'data') data = buffer.subarray(start, start + size);
    offset = start + size + (size % 2);
  }
  if (!format || !data || !format.sampleRate || !format.blockAlign ||
    format.blockAlign !== format.channels * format.bitsPerSample / 8 || data.length % format.blockAlign !== 0) {
    throw new Error('Invalid WAV sample layout.');
  }
  return {...format, data};
};

// Compare mixed sample frames, ignoring container tags that do not change sound.
export const compareWav = (baseline: Buffer, correction: Buffer): AudioDifference => {
  const before = readWave(baseline);
  const after = readWave(correction);
  const beforeSamples = before.data.length / before.blockAlign;
  const afterSamples = after.data.length / after.blockAlign;
  if (before.format !== after.format || before.channels !== after.channels ||
    before.sampleRate !== after.sampleRate || before.bitsPerSample !== after.bitsPerSample) {
    return {
      identical: false, start: 0,
      end: Math.max(beforeSamples / before.sampleRate, afterSamples / after.sampleRate),
      reason: 'Audio sample format, channel count or sample rate changed.',
    };
  }
  let first: number | undefined;
  let last: number | undefined;
  for (let sample = 0; sample < Math.max(beforeSamples, afterSamples); sample++) {
    const start = sample * before.blockAlign;
    if (!before.data.subarray(start, start + before.blockAlign).equals(after.data.subarray(start, start + after.blockAlign))) {
      first ??= sample;
      last = sample;
    }
  }
  return first === undefined ? {identical: true} : {
    identical: false,
    start: first / before.sampleRate,
    end: last! / before.sampleRate,
    reason: beforeSamples === afterSamples ? 'Mixed audio samples changed.' : 'Mixed audio duration changed.',
  };
};
