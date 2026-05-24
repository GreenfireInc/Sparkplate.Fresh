#!/usr/bin/env node
/**
 * Parses `docs/from/Corey/May23.Research.Media.News.OutletsByCountryPoliticalAlliance`
 * for CARICOM / CEN-SAD / COMESA / CPTPP country sections and emits NEWS_OUTLETS seed
 * tuples ready to paste into `scripts/data/news-outlets-seed.mjs`.
 *
 * Skips any ISO already present in the seed (avoids regressing richer AU / Arab League /
 * APEC rows). Writes the additions to a temporary file we then splice into the seed.
 *
 * Usage: node scripts/import-may23-news-outlets-batch2.mjs [--apply]
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { NEWS_OUTLETS } from './data/news-outlets-seed.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DOC = path.join(ROOT, 'docs/from/Corey/May23.Research.Media.News.OutletsByCountryPoliticalAlliance')
const SEED = path.join(ROOT, 'scripts/data/news-outlets-seed.mjs')
const ALLIANCE_CORE = path.join(ROOT, 'src/lib/cores/alliancesCore')

const TARGET_ALLIANCES = [
  { folder: 'CARICOM', docKey: 'CARICOM' },
  { folder: 'CEN-SAD', docKey: 'CEN-SAD' },
  { folder: 'COMESA', docKey: 'COMESA' },
  { folder: 'CPTPP', docKey: 'CPTPP' },
  { folder: 'EAC', docKey: 'EAC' },
  { folder: 'ECCAS', docKey: 'ECCAS' },
  { folder: 'ECOWAS', docKey: 'ECOWAS' },
  { folder: 'EU', docKey: 'EU' },
  { folder: 'fiveEyes', docKey: 'fiveEyes' },
  { folder: 'G7', docKey: 'G7' },
  { folder: 'G20', docKey: 'G20' },
  { folder: 'GCC', docKey: 'GCC' },
  { folder: 'IGAD', docKey: 'IGAD' },
  { folder: 'IORA', docKey: 'IORA' },
  { folder: 'MIKTA', docKey: 'MIKTA' },
  { folder: 'MINT', docKey: 'MINT' },
  { folder: 'NATO', docKey: 'NATO' },
  { folder: 'OECD', docKey: 'OECD' },
  { folder: 'OECS', docKey: 'OECS' },
  { folder: 'OPEC', docKey: 'OPEC' },
  { folder: 'RCEP', docKey: 'RCEP' },
  { folder: 'SADC', docKey: 'SADC' },
]

const SHARED_SKIP = new Set([
  'index.ts',
  'types.ts',
  'domesticCouriersByIso.ts',
  'notableUniversitiesByIso.ts',
  'newsOutletsByIso.ts',
])

/** Build map { folder: { moduleBase: 'IS' } } reading iso3166Alpha2 from each country .ts. */
function buildModuleToIso() {
  /** @type {Record<string, Record<string,string>>} */
  const out = {}
  for (const { folder } of TARGET_ALLIANCES) {
    out[folder] = {}
    const dirPath = path.join(ALLIANCE_CORE, folder)
    const memberFile = fs
      .readdirSync(dirPath)
      .find((fn) => /memberIsoCodes\.ts$/i.test(fn))
    const skip = new Set([...SHARED_SKIP, memberFile].filter(Boolean))
    for (const fn of fs.readdirSync(dirPath)) {
      if (!fn.endsWith('.ts') || skip.has(fn)) continue
      const body = fs.readFileSync(path.join(dirPath, fn), 'utf8')
      const m = body.match(/iso3166Alpha2:\s*['"]([A-Z]{2})['"]/)
      if (!m) continue
      out[folder][fn.replace(/\.ts$/, '')] = m[1]
    }
  }
  return out
}

/**
 * Extract a single string field from an outlet object body.
 * Returns '' when missing or when the literal value is `null` / `undefined`.
 */
function extractField(objBody, name) {
  const re = new RegExp(`\\b${name}\\s*:\\s*(?:'([^']*)'|"([^"]*)"|null|undefined)`)
  const m = objBody.match(re)
  if (!m) return ''
  return (m[1] ?? m[2] ?? '').trim()
}

/** Clean stray markdown link-wrapping like "[https://x](https://x)" → "https://x". */
function unwrapMarkdownLink(s) {
  const m = s.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
  return m ? m[1] : s
}

/**
 * Parse an array body (the text between [ and the matching ]) into outlet rows.
 * Each row is `[name, website, email, instagram, twitter, apiEndpoint]`.
 */
function parseOutletArray(arrayBody) {
  /** @type {string[][]} */
  const rows = []
  let depth = 0
  let start = -1
  for (let i = 0; i < arrayBody.length; i++) {
    const ch = arrayBody[i]
    if (ch === '{') {
      if (depth === 0) start = i + 1
      depth++
    } else if (ch === '}') {
      depth--
      if (depth === 0 && start >= 0) {
        const obj = arrayBody.slice(start, i)
        rows.push([
          unwrapMarkdownLink(extractField(obj, 'name')),
          unwrapMarkdownLink(extractField(obj, 'website')),
          extractField(obj, 'email'),
          unwrapMarkdownLink(extractField(obj, 'instagram')),
          unwrapMarkdownLink(extractField(obj, 'twitter')),
          unwrapMarkdownLink(extractField(obj, 'api')),
        ])
        start = -1
      }
    }
  }
  return rows
}

/**
 * Slice the document text into per-country chunks keyed by `${folder}/${baseName}`.
 * Only matches header forms with actual content (markdown header backticks or `//` comments),
 * skipping the bare filename listings at the top of each alliance block.
 */
function sliceCountrySections(doc) {
  /** @type {Map<string,string>} */
  const sections = new Map()
  // Markdown header `# … (`/FOLDER/base.ts`)` or in-code comment `// /FOLDER/base.ts`.
  // Match `/F/b.ts`, `// /F/b.ts`, or bare `/F/b.ts` preceded by whitespace / start of line.
  // The "take last occurrence" logic below ensures bare listings (which appear before the
  // actual data block) are overwritten by the header that immediately precedes the code block.
  const re = /(?:`\/|\/\/\s*\/|(?:^|[\s])\/)([A-Za-z][A-Za-z0-9-]*)\/([A-Za-z][A-Za-z0-9]*)\.ts/gm
  /** @type {Array<{key:string, idx:number}>} */
  const marks = []
  let m
  while ((m = re.exec(doc))) {
    const folder = m[1]
    const base = m[2]
    if (!TARGET_ALLIANCES.find((t) => t.folder === folder)) continue
    marks.push({ key: `${folder}/${base}`, idx: m.index })
  }
  for (let i = 0; i < marks.length; i++) {
    const { key, idx } = marks[i]
    const end = i + 1 < marks.length ? marks[i + 1].idx : doc.length
    // Prefer the LAST occurrence (later ones tend to be the code block; earlier ones may be
    // an intro). Always overwrite so we end up with the final section.
    sections.set(key, doc.slice(idx, end))
  }
  return sections
}

/**
 * Extract balanced bracket span starting at the `[` immediately after a label.
 * Returns the body text between [ and matching ] (exclusive of brackets).
 */
function extractArrayBodyAfter(text, labelRe) {
  const m = text.match(labelRe)
  if (!m) return null
  const startBracket = text.indexOf('[', m.index + m[0].length - 1)
  if (startBracket === -1) return null
  let depth = 0
  for (let i = startBracket; i < text.length; i++) {
    const ch = text[i]
    if (ch === '[') depth++
    else if (ch === ']') {
      depth--
      if (depth === 0) return text.slice(startBracket + 1, i)
    }
  }
  return null
}

const moduleToIso = buildModuleToIso()
const doc = fs.readFileSync(DOC, 'utf8')
const sections = sliceCountrySections(doc)

/** @type {{ folder:string, base:string, iso:string, major:string[][], minor:string[][] }[]} */
const parsed = []
for (const [key, body] of sections) {
  const [folder, base] = key.split('/')
  const iso = moduleToIso[folder]?.[base]
  if (!iso) continue
  const majorBody =
    extractArrayBodyAfter(body, /\bmajorOutlets\s*:\s*\[/) ??
    extractArrayBodyAfter(body, /\bmajor\s*:\s*\[/)
  const minorBody =
    extractArrayBodyAfter(body, /\bminorOutlets\s*:\s*\[/) ??
    extractArrayBodyAfter(body, /\bminor\s*:\s*\[/)
  if (!majorBody || !minorBody) continue
  const major = parseOutletArray(majorBody)
  const minor = parseOutletArray(minorBody)
  if (major.length < 3 || minor.length < 4) continue
  parsed.push({
    folder,
    base,
    iso,
    major: major.slice(0, 3),
    minor: minor.slice(0, 4),
  })
}

/** Format a tuple as `n("...", "...", "...", "...", "...", "...")`. */
function rowToCall(row) {
  return `n(${row.map((s) => JSON.stringify(s)).join(', ')})`
}

/** Emit a NEWS_OUTLETS literal entry for a single ISO pack. */
function emitPack(iso, major, minor) {
  let out = `  ${iso}: {\n`
  out += `    major: [\n`
  for (const r of major) out += `      ${rowToCall(r)},\n`
  out += `    ],\n`
  out += `    minor: [\n`
  for (const r of minor) out += `      ${rowToCall(r)},\n`
  out += `    ],\n`
  out += `  },`
  return out
}

const seen = new Set(Object.keys(NEWS_OUTLETS))
const additions = []
const skippedExisting = []
const missedAlliances = Object.fromEntries(TARGET_ALLIANCES.map((t) => [t.folder, []]))
for (const p of parsed) {
  if (seen.has(p.iso)) {
    skippedExisting.push(`${p.folder}/${p.base} (${p.iso})`)
    continue
  }
  additions.push({ iso: p.iso, folder: p.folder, base: p.base, code: emitPack(p.iso, p.major, p.minor) })
  seen.add(p.iso)
}

for (const { folder } of TARGET_ALLIANCES) {
  const docBases = new Set(parsed.filter((p) => p.folder === folder).map((p) => p.base))
  for (const base of Object.keys(moduleToIso[folder])) {
    if (!docBases.has(base)) missedAlliances[folder].push(base)
  }
}

const groups = Object.fromEntries(TARGET_ALLIANCES.map((t) => [t.folder, []]))
for (const a of additions) groups[a.folder].push(a)

const apply = process.argv.includes('--apply')
let block = ''
for (const folder of Object.keys(groups)) {
  if (!groups[folder].length) continue
  block += `\n  // ---------- ${folder} (${groups[folder].length}) — May23 research doc ----------\n`
  for (const a of groups[folder]) block += a.code + '\n'
}

if (!apply) {
  console.log('NEW entries to add to NEWS_OUTLETS (run with --apply to splice into seed):')
  console.log(block)
  console.log(
    `summary  added=${additions.length}  skipped_existing=${skippedExisting.length}  per_alliance=${Object.entries(groups).map(([k, v]) => `${k}:${v.length}`).join(' ')}`,
  )
  for (const [folder, bases] of Object.entries(missedAlliances)) {
    if (!bases.length) continue
    console.log(`  ${folder}: no doc data for ${bases.join(', ')}`)
  }
  process.exit(0)
}

const seedText = fs.readFileSync(SEED, 'utf8')
const endIdx = seedText.lastIndexOf('}')
if (endIdx === -1) throw new Error('Cannot find seed closing brace')
const before = seedText.slice(0, endIdx).replace(/[\s\n]*$/, '\n')
const after = seedText.slice(endIdx)
const lastChar = before.replace(/\s+$/, '').slice(-1)
const sep = lastChar === ',' ? '' : ','
const newSeed = `${before.replace(/\n*$/, '')}${sep}\n${block}${after}`
fs.writeFileSync(SEED, newSeed)
console.log(`spliced ${additions.length} entries into seed (${Object.entries(groups).map(([k, v]) => `${k}:${v.length}`).join(' ')})`)
for (const [folder, bases] of Object.entries(missedAlliances)) {
  if (!bases.length) continue
  console.log(`  ${folder}: no doc data for ${bases.join(', ')}`)
}
