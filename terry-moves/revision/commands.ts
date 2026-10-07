import {spawn} from 'node:child_process';
import {appendFile} from 'node:fs/promises';

export const runCommand = (command: string, args: string[], cwd: string, log?: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {cwd, stdio: ['ignore', 'pipe', 'pipe']});
    let output = '';
    let error = '';
    child.stdout.on('data', (chunk: Buffer) => {output += chunk.toString();});
    child.stderr.on('data', (chunk: Buffer) => {error += chunk.toString();});
    const interrupt = () => child.kill('SIGTERM');
    process.once('SIGINT', interrupt);
    process.once('SIGTERM', interrupt);
    child.on('error', reject);
    child.on('close', async (code) => {
      process.removeListener('SIGINT', interrupt);
      process.removeListener('SIGTERM', interrupt);
      try {
        if (log) await appendFile(log, `$ ${command} ${args.join(' ')}\n${output}${error}\n`);
        if (code === 0) resolve(output);
        else reject(new Error(`${command} ${args[0]} failed (${code}). ${log ? `See ${log}.` : error.trim()}`));
      } catch (failure) {reject(failure);}
    });
  });
