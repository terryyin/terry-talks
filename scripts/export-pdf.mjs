#!/usr/bin/env node
/**
 * One-touch Slidev PDF export to ~/Downloads.
 *
 * Slidev's CLI export needs the playwright-chromium peer. Adding it with
 * pnpm failed here (workspace root + store v11 vs v3 mismatch), so this
 * script npm-installs that peer into node_modules/.cache and, when a
 * system Chrome/Edge/Chromium exists, skips Playwright's browser download
 * and passes --executable-path instead.
 */
import {
  existsSync,
  lstatSync,
  mkdirSync,
  readlinkSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs'
import { createRequire } from 'node:module'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { spawn, spawnSync } from 'node:child_process'
import { findDecks, pickDeck, rootDir } from './decks.mjs'

const EXPORT_TIMEOUT_MS = 180_000
const EXPORT_WAIT_MS = 1_000
const PLAYWRIGHT_CACHE = join(rootDir, 'node_modules', '.cache', 'slidev-playwright')
const CHROME_CANDIDATES = [
  process.env.SLIDEV_BROWSER,
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
].filter(Boolean)

function filenameFromTitle(title) {
  const slug = title.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return `${slug || 'slides'}.pdf`
}

function findChrome() {
  return CHROME_CANDIDATES.find(existsSync)
}

function canResolvePlaywright() {
  try {
    createRequire(join(rootDir, 'package.json')).resolve('playwright-chromium')
    return true
  } catch {
    return false
  }
}

function ensureSymlink(src, dest) {
  if (existsSync(dest)) {
    try {
      if (lstatSync(dest).isSymbolicLink() && readlinkSync(dest) === src) return
      if (!lstatSync(dest).isSymbolicLink()) return
    } catch {
      return
    }
    rmSync(dest)
  }
  symlinkSync(src, dest)
}

function ensurePlaywright({ skipBrowserDownload }) {
  if (canResolvePlaywright()) return

  mkdirSync(PLAYWRIGHT_CACHE, { recursive: true })
  const pkgPath = join(PLAYWRIGHT_CACHE, 'package.json')
  if (!existsSync(pkgPath)) {
    writeFileSync(pkgPath, `${JSON.stringify({ private: true, name: 'slidev-playwright-cache' }, null, 2)}\n`)
  }

  const installed = join(PLAYWRIGHT_CACHE, 'node_modules', 'playwright-chromium')
  if (!existsSync(installed)) {
    const env = { ...process.env }
    if (skipBrowserDownload) env.PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = '1'
    console.log('Installing playwright-chromium (Slidev PDF export peer)...')
    const result = spawnSync('npm', ['install', 'playwright-chromium', '--no-package-lock'], {
      cwd: PLAYWRIGHT_CACHE,
      env,
      stdio: 'inherit',
    })
    if (result.status !== 0) {
      console.error('Failed to install playwright-chromium via npm.')
      process.exit(result.status ?? 1)
    }
  }

  mkdirSync(join(rootDir, 'node_modules'), { recursive: true })
  for (const name of ['playwright-chromium', 'playwright-core']) {
    const src = join(PLAYWRIGHT_CACHE, 'node_modules', name)
    if (existsSync(src)) ensureSymlink(src, join(rootDir, 'node_modules', name))
  }

  if (!canResolvePlaywright()) {
    console.error('playwright-chromium is still not resolvable from the project root.')
    process.exit(1)
  }
}

function hasFlag(args, name) {
  return args.some(a => a === name || a.startsWith(`${name}=`))
}

function flagValue(args, name) {
  const eq = args.find(a => a.startsWith(`${name}=`))
  if (eq) return eq.slice(name.length + 1)
  const index = args.indexOf(name)
  if (index >= 0) return args[index + 1]
  return undefined
}

const decks = findDecks()
if (decks.length === 0) {
  console.error('No decks found. Expected slides/<deck-slug>/slides.md')
  process.exit(1)
}

const argv = process.argv.slice(2)
let extra = argv
let chosen
if (argv[0] && !argv[0].startsWith('-')) {
  chosen = decks.find(deck => deck.slug === argv[0])
  if (!chosen) {
    console.error(`Unknown deck "${argv[0]}". Expected one of: ${decks.map(d => d.slug).join(', ')}`)
    process.exit(1)
  }
  extra = argv.slice(1)
}
chosen ??= await pickDeck(decks)

const output = flagValue(extra, '--output') || join(homedir(), 'Downloads', filenameFromTitle(chosen.title))
const chrome = findChrome()

ensurePlaywright({ skipBrowserDownload: Boolean(chrome) })

const slidevArgs = ['exec', 'slidev', 'export', chosen.entry]
if (!hasFlag(extra, '--output')) slidevArgs.push('--output', output)
if (!hasFlag(extra, '--timeout')) slidevArgs.push('--timeout', String(EXPORT_TIMEOUT_MS))
if (!hasFlag(extra, '--wait')) slidevArgs.push('--wait', String(EXPORT_WAIT_MS))
if (chrome && !hasFlag(extra, '--executable-path')) {
  slidevArgs.push('--executable-path', chrome)
}
slidevArgs.push(...extra)

console.log(`\nExporting "${chosen.title}" (slides/${chosen.slug})`)
console.log(`→ ${output}\n`)

const child = spawn('pnpm', slidevArgs, {
  cwd: rootDir,
  stdio: 'inherit',
})

child.on('exit', code => process.exit(code ?? 0))
