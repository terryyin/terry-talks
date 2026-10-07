export type FrameRange = {start: number; end: number};
export type DeclaredRange = FrameRange & {input: string};
export type Composition = {
  id: string;
  fps: number;
  durationInFrames: number;
  width: number;
  height: number;
};

// Seconds are half-open [start, end); frame endpoints (30f-59f) are inclusive.
export const parseChangeRange = (
  input: string,
  {fps, durationInFrames}: Composition,
): DeclaredRange => {
  const match = /^(\d+(?:\.\d+)?)(f?)-(end|\d+(?:\.\d+)?f?)$/.exec(input);
  const invalid = () => new Error(
    `Invalid change range "${input}". Use seconds (76-80), frames (2280f-2399f), or end (76-end).`,
  );
  if (!match) throw invalid();
  const frames = match[2] === 'f';
  const from = Number(match[1]);
  const to = match[3] === 'end' ? null : Number(match[3].replace(/f$/, ''));
  if (to !== null && match[3].endsWith('f') !== frames) throw invalid();
  if (frames && (!Number.isInteger(from) || (to !== null && !Number.isInteger(to)))) throw invalid();
  if (to !== null && (frames ? to < from : to <= from)) {
    throw new Error(`Change range "${input}" ends before it starts or is empty.`);
  }
  const start = frames ? from : Math.max(0, Math.ceil(from * fps - 1e-8));
  const end = to === null ? durationInFrames - 1 : frames ? to : Math.ceil(to * fps - 1e-8) - 1;
  if (start > end || start >= durationInFrames || end >= durationInFrames) {
    throw new Error(`Change range "${input}" is outside the film (frames 0-${durationInFrames - 1}).`);
  }
  return {input, start, end};
};

export const frameRuns = (frames: number[]): FrameRange[] => {
  const runs: FrameRange[] = [];
  for (const frame of [...new Set(frames)].sort((a, b) => a - b)) {
    const last = runs[runs.length - 1];
    if (last && frame === last.end + 1) last.end = frame;
    else runs.push({start: frame, end: frame});
  }
  return runs;
};

const containsFrame = (range: FrameRange, frame: number) =>
  frame >= range.start && frame <= range.end;

export const classifyChanges = (frames: number[], declarations: DeclaredRange[]) => ({
  intended: declarations.map((declaration) => ({
    declaration,
    runs: frameRuns(frames.filter((frame) => containsFrame(declaration, frame))),
  })),
  undeclared: frameRuns(frames.filter((frame) => !declarations.some(
    (declaration) => containsFrame(declaration, frame),
  ))),
});

export const describeFrames = (range: FrameRange, fps: number) =>
  `frames ${range.start}–${range.end} (${(range.start / fps).toFixed(2)}–${(range.end / fps).toFixed(2)} s)`;
