import {parseChangeRange} from '../../revision/ranges';
import {Comparison, preservationVerdict, reportMarkdown} from '../../revision/report';
import {changedFrames, RenderedFilm} from '../../revision/render';

const composition = {id: 'Film', fps: 30, durationInFrames: 2747, width: 1080, height: 1080};
const comparison: Comparison = {
  compositionId: 'Film', baseline: 'approved', correction: 'corrected',
  before: composition, after: composition,
  declarations: ['0-1.2', '76-end'].map((range) => parseChangeRange(range, composition)),
  changed: [...Array.from({length: 36}, (_, frame) => frame), ...Array.from({length: 462}, (_, frame) => frame + 2285)],
  audio: {identical: true},
};

describe('film preservation report', () => {
  test('the real correction shape is preserved inside both declared moments', () => {
    const report = reportMarkdown(comparison);
    expect(preservationVerdict(comparison)).toBe('Preserved');
    expect(report).toContain('Intended picture change: frames 0–35 (0.00–1.17 s)');
    expect(report).toContain('Intended picture change: frames 2285–2746 (76.17–91.53 s)');
    expect(report).toContain('mixed WAV samples are identical');
    expect(report).toContain('2747 frames, 30 fps, 91.57 s');
    expect(report).toContain('Every frame outside the declarations is unchanged');
  });

  test('a narrow declaration names the cover and the later picture changes', () => {
    const narrow = {...comparison, declarations: [parseChangeRange('76-80', composition)]};
    expect(preservationVerdict(narrow)).toBe('Not preserved');
    expect(reportMarkdown(narrow)).toContain('Undeclared picture change: frames 0–35 (0.00–1.17 s)');
    expect(reportMarkdown(narrow)).toContain('Undeclared picture change: frames 2400–2746 (80.00–91.53 s)');
  });

  test('a changed voice cannot be approved by declaring picture ranges', () => {
    const changedAudio = {...comparison, audio: {identical: false, start: 1, end: 2, reason: 'Mixed audio samples changed.'}};
    expect(preservationVerdict(changedAudio)).toBe('Not preserved');
    expect(reportMarkdown(changedAudio)).toContain('First differing second 1.00000 s; last differing second 2.00000 s');
  });

  test('duration or fps changes fail even if no picture differences were supplied', () => {
    expect(preservationVerdict({...comparison, changed: [], after: {...composition, fps: 25}})).toBe('Not preserved');
    const changedDuration = {...comparison, changed: [], after: {...composition, durationInFrames: 2748}};
    expect(preservationVerdict(changedDuration)).toBe('Not preserved');
    expect(reportMarkdown(changedDuration)).toContain('durationInFrames: 2747 → 2748');
  });

  test('dimensions are picture evidence and do not add a separate preservation restriction', () => {
    expect(preservationVerdict({...comparison, after: {...composition, width: 1920}})).toBe('Preserved');
  });

  test('an unchanged correction reports no change for every declaration', () => {
    const unchanged = {...comparison, changed: []};
    expect(preservationVerdict(unchanged)).toBe('Preserved');
    expect(reportMarkdown(unchanged).match(/No change in this declared range/g)).toHaveLength(2);
    expect(reportMarkdown(unchanged)).toContain('0 changed frame(s)');
  });

  test('comparison observes every frame, including added or removed frames', () => {
    const film = (hashes: string[]): RenderedFilm => ({
      composition: {...composition, durationInFrames: hashes.length},
      frames: new Map(hashes.map((hash, index) => [index, hash])), frameDirectory: '', audio: Buffer.alloc(0),
    });
    expect(changedFrames(film(['a', 'b', 'c']), film(['a', 'new', 'c', 'tail']))).toEqual([1, 3]);
    expect(changedFrames(film(['a', 'b']), film(['a']))).toEqual([1]);
  });
});
