#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { findDecks, pickDeck, rootDir } from './decks.mjs'

const decks = findDecks()
if (decks.length === 0) {
  console.error('No decks found. Expected slides/<deck-slug>/slides.md')
  process.exit(1)
}

const chosen = await pickDeck(decks)
console.log(`\nStarting "${chosen.title}" (slides/${chosen.slug})...\n`)

const child = spawn('pnpm', ['exec', 'slidev', chosen.entry, '--open'], {
  cwd: rootDir,
  stdio: 'inherit',
})

child.on('exit', code => process.exit(code ?? 0))
