import {resolve} from 'node:path';
import {compareFilm} from './compare';

const usage = `Usage: pnpm moves compare <CompositionId> [--baseline <revision>] [--correction <revision>] [--change <range>]…
Defaults: baseline HEAD; correction working tree.
Ranges: seconds 0-1.2, frames 0f-35f, or 76-end. Repeat --change for each intended moment.`;

const main = async () => {
  const [compositionId, ...args] = process.argv.slice(2);
  if (!compositionId || compositionId.startsWith('-') || !/^[\w-]+$/.test(compositionId)) throw new Error(usage);
  let baseline: string | undefined;
  let correction: string | undefined;
  const changes: string[] = [];
  for (let index = 0; index < args.length; index += 2) {
    const flag = args[index];
    const value = args[index + 1];
    if (!value || value.startsWith('--')) throw new Error(`Missing value for ${flag}.\n${usage}`);
    if (flag === '--baseline') baseline = value;
    else if (flag === '--correction') correction = value;
    else if (flag === '--change') changes.push(value);
    else throw new Error(`Unknown option ${flag}.\n${usage}`);
  }
  const result = await compareFilm({repository: resolve('..'), compositionId, baseline, correction, changes});
  console.log(`${result.verdict}\nReport: ${result.report}`);
  if (result.verdict === 'Not preserved') process.exitCode = 1;
};

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
