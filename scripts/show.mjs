#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createInterface } from 'node:readline/promises'
import { spawn } from 'node:child_process'

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))
const slidesDir = join(rootDir, 'slides')

function extractTitle(mdPath) {
  const text = readFileSync(mdPath, 'utf-8')
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (match) {
    const titleLine = match[1].split(/\r?\n/).find(line => /^title:/.test(line))
    if (titleLine) {
      return titleLine.replace(/^title:\s*/, '').trim().replace(/^["']|["']$/g, '')
    }
  }
  return null
}

function findDecks() {
  if (!existsSync(slidesDir)) return []
  return readdirSync(slidesDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => ({ slug: entry.name, entry: join(slidesDir, entry.name, 'slides.md') }))
    .filter(deck => existsSync(deck.entry))
    .map(deck => ({ ...deck, title: extractTitle(deck.entry) || deck.slug }))
}

async function pickDeck(decks) {
  if (decks.length === 1) return decks[0]

  console.log('\nAvailable presentations:\n')
  decks.forEach((deck, i) => {
    console.log(`  ${i + 1}. ${deck.title}  (slides/${deck.slug})`)
  })

  const rl = createInterface({ input: process.stdin, output: process.stdout })
  try {
    for (;;) {
      const answer = (await rl.question(`\nSelect a presentation [1-${decks.length}]: `)).trim()
      const index = Number(answer) - 1
      if (Number.isInteger(index) && index >= 0 && index < decks.length) return decks[index]
      console.log('Invalid selection, try again.')
    }
  } finally {
    rl.close()
  }
}

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
