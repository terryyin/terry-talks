#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))
const movesDir = join(rootDir, 'terry-moves')

const usage = `Usage: pnpm moves [studio|test|render|srt] [...args]

  (default)  Remotion Studio for terry-moves
  studio     same as default
  test       terry-moves test script
  render     remotion render (composition picker / extra args)
  srt        generate SRT from product-developer subtitles
`

const [subcommand = 'studio', ...rest] = process.argv.slice(2)

function withRest(base) {
  return rest.length ? [...base, '--', ...rest] : base
}

const pnpmArgs = {
  studio: withRest(['start']),
  test: withRest(['test']),
  render: withRest(['run', 'build']),
  srt: withRest(['srt']),
}[subcommand]

if (!pnpmArgs) {
  console.error(usage)
  process.exit(1)
}

const child = spawn('pnpm', pnpmArgs, {
  cwd: movesDir,
  stdio: 'inherit',
})

child.on('exit', code => process.exit(code ?? 0))
