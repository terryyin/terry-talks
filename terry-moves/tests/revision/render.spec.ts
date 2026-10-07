/** @jest-environment node */
import {mkdtemp, mkdir, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {runCommand} from '../../revision/commands';
import {readComposition, renderFilm} from '../../revision/render';

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

describe('rendered frame evidence', () => {
  let directory: string;
  let renderedFrames: [string, string][];
  const composition = {id: 'Film', fps: 30, width: 4, height: 2, durationInFrames: 2};

  beforeEach(async () => {
    directory = await mkdtemp(join(tmpdir(), 'render-test-'));
    renderedFrames = [['element-0000.png', 'a'], ['element-1.png', 'b'], ['notes.png', 'ignored']];
    jest.mocked(runCommand).mockReset().mockImplementation(async (_command, args) => {
      const output = args[5];
      if (args.includes('--sequence')) {
        await mkdir(output);
        for (const [name, content] of renderedFrames) await writeFile(join(output, name), content);
      } else {
        await writeFile(output, 'mixed audio');
      }
      return '';
    });
  });
  afterEach(async () => {await rm(directory, {recursive: true, force: true});});

  test('hashes every indexed frame regardless of filename padding and ignores unrelated files', async () => {
    const film = await renderFilm({directory, description: 'approved'}, composition, join(directory, 'rendered'), join(directory, 'render.log'));
    expect(film.frames).toEqual(new Map([
      [0, 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb'],
      [1, '3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d'],
    ]));
    expect(film.audio).toEqual(Buffer.from('mixed audio'));
  });

  test('rejects an incomplete sequence before it can become preservation evidence', async () => {
    renderedFrames = [['element-0000.png', 'a']];
    await expect(renderFilm({directory, description: 'approved'}, composition, join(directory, 'rendered'), join(directory, 'render.log')))
      .rejects.toThrow('Incomplete frame sequence for Film; expected every frame 0-1.');
  });
});
