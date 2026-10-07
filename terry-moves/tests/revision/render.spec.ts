import {runCommand} from '../../revision/commands';
import {readComposition} from '../../revision/render';

jest.mock('../../revision/commands', () => ({runCommand: jest.fn()}));

describe('rendered composition timing evidence', () => {
  test('reads actual film timing from the installed CLI listing', async () => {
    jest.mocked(runCommand).mockResolvedValue('Film    30      1080x1080      2747 (91.57 sec)\n');
    await expect(readComposition({directory: '/film', description: 'approved'}, 'Film', '/report/render.log')).resolves.toEqual({
      id: 'Film', fps: 30, width: 1080, height: 1080, durationInFrames: 2747,
    });
  });

  test('does not invent fps when the CLI omits it for a Still', async () => {
    jest.mocked(runCommand).mockResolvedValue('Cover    1080x1080      Still\n');
    await expect(readComposition({directory: '/film', description: 'approved'}, 'Cover', '/report/render.log')).rejects.toThrow(
      /single-frame Still without its fps. Actual fps evidence is unavailable; no preservation verdict was produced/,
    );
  });
});
