#!/usr/bin/env node
/**
 * Imports May23 research markdown into AU slice of scripts/data/news-outlets-seed.mjs.
 *
 * After running AU import, regenerate all alliance maps (AMU reuses seed DZ/LY/MR/MA/TN; APEC
 * uses NEWS_OUTLETS for AU–VN roster):
 *   node scripts/import-may23-african-union-news-outlets.mjs
 *   node scripts/gen-news-outlets-by-iso.mjs
 *
 * Doc: docs/from/Corey/May23.Research.Media.News.OutletsByCountryPoliticalAlliance
 *
 * Sources (precedence earlier → later overrides where applicable):
 *  - Lowest weight: structured TS {# /SADC/x.ts}+block, {# /IGAD/x.ts}+block,
 *       or ```ts ``` with first line "// /ECCAS|ECOWAS|CEN-SAD|COMESA/..."
 *  - Markdown tables wrapped in `# ... (` /AMU/... `)` or `# ... (` /allianceOfSahelStates/... `)`
 *  - Markdown `# Egypt` (Arab league batch)
 *  - Override: 🇬🇭 Ghana → british Commonwealth block (richer contacts)
 *  - Override 🇺🇬 Uganda → Commonwealth block
 *  - Fill remaining AU CW members from Commonwealth only if TS merge missed them
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { NEWS_OUTLETS } from './data/news-outlets-seed.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const ROOT = path.resolve(__dirname, '..')
const DOC = path.join(
  ROOT,
  'docs/from/Corey/May23.Research.Media.News.OutletsByCountryPoliticalAlliance',
)
const SEED_PATH = path.join(__dirname, 'data/news-outlets-seed.mjs')

const AU_ISO = /** @type {const} */ ([
  'AO', 'BF', 'BI', 'BJ', 'BW', 'CD', 'CF', 'CG', 'CI', 'CM', 'CV', 'DJ', 'DZ',
  'EG', 'EH', 'ER', 'ET', 'GA', 'GH', 'GM', 'GN', 'GQ', 'GW', 'KE', 'KM', 'LR',
  'LS', 'LY', 'MA', 'MG', 'ML', 'MR', 'MU', 'MW', 'MZ', 'NA', 'NE', 'NG', 'RW',
  'SC', 'SD', 'SL', 'SN', 'SO', 'SS', 'ST', 'SZ', 'TD', 'TG', 'TN', 'TZ', 'UG',
  'ZA', 'ZM', 'ZW',
])

/** basename without .ts → ISO */
const FILENAME_ISO = Object.fromEntries(
  [
    ['algeria', 'DZ'], ['angola', 'AO'], ['benin', 'BJ'], ['botswana', 'BW'],
    ['burkinaFaso', 'BF'], ['burundi', 'BI'], ['cameroon', 'CM'], ['capeVerde', 'CV'],
    ['centralAfricanRepublic', 'CF'], ['chad', 'TD'], ['comoros', 'KM'],
    ['democraticRepublicOfTheCongo', 'CD'], ['djibouti', 'DJ'], ['egypt', 'EG'],
    ['equatorialGuinea', 'GQ'], ['eritrea', 'ER'], ['eswatini', 'SZ'], ['ethiopia', 'ET'],
    ['gabon', 'GA'], ['gambia', 'GM'], ['ghana', 'GH'], ['guinea', 'GN'],
    ['guineaBissau', 'GW'], ['ivoryCoast', 'CI'], ['kenya', 'KE'], ['lesotho', 'LS'],
    ['liberia', 'LR'], ['libya', 'LY'], ['madagascar', 'MG'], ['malawi', 'MW'],
    ['mali', 'ML'], ['mauritania', 'MR'], ['mauritius', 'MU'], ['morocco', 'MA'],
    ['mozambique', 'MZ'], ['namibia', 'NA'], ['niger', 'NE'], ['nigeria', 'NG'],
    ['republicOfTheCongo', 'CG'], ['rwanda', 'RW'], ['sahrawiRepublic', 'EH'],
    ['saoTomeAndPrincipe', 'ST'], ['senegal', 'SN'], ['seychelles', 'SC'],
    ['sierraLeone', 'SL'], ['somalia', 'SO'], ['southAfrica', 'ZA'],
    ['southSudan', 'SS'], ['sudan', 'SD'], ['tanzania', 'TZ'], ['togo', 'TG'],
    ['tunisia', 'TN'], ['uganda', 'UG'], ['zambia', 'ZM'], ['zimbabwe', 'ZW'],
  ],
)

const IGAD_ISO = new Set(['DJ', 'ET', 'KE', 'SO', 'SS', 'SD'])

function stripChatUtm(url) {
  if (!url) return ''
  return String(url).replace(/\?utm_source=chatgpt\.com/g, '').trim()
}

function normalizeHttp(u) {
  const s = stripChatUtm(u)
  if (!s) return ''
  return String(s).replace(/^http:\/\//i, 'https://').replace(/twitter\.com\//gi, 'x.com/')
}

function fixTwitter(handleOrUrl) {
  const s = normalizeHttp(handleOrUrl)
  if (/^https?:\/\//i.test(s)) return s
  if (!handleOrUrl) return ''
  const raw = stripChatUtm(handleOrUrl.trim())
  const m = /^@([\w_]+)$/i.exec(raw.trim())
  if (m) return `https://x.com/${m[1]}`
  const at = /\b@([\w_]+)/.exec(raw)
  if (at && !/\[/.test(raw)) return `https://x.com/${at[1]}`
  return raw.startsWith('@') ? `https://x.com/${raw.slice(1)}` : raw
}

function fixInstagram(cell) {
  if (!cell || /^[\u2014–—\s]+$/.test(cell) || /^N\/A$/i.test(cell.trim())) return ''
  const s = normalizeHttp(cell)
  const ig = /https:\/\/(www\.)?instagram\.com\/[^\s)\]]+/i.exec(cell)
  if (ig) return stripChatUtm(ig[0])
  const md = /\(@([\w_.]+)/i.exec(cell)
  if (md) return `https://www.instagram.com/${md[1]}/`
  const m = /^@([\w_.]+)$/i.exec(cell.trim())
  if (m) return `https://www.instagram.com/${m[1]}/`
  return ''
}

function parseMdCells(line) {
  const parts = line.split('|').map((c) => c.trim())
  if (parts.length < 4) return null
  return parts.slice(1, -1)
}

function mdTableLines(tableText) {
  /** @type {string[][]} */
  const out = []
  for (const ln of tableText.split(/\r?\n/)) {
    const line = ln.trimEnd()
    if (!line.startsWith('|')) continue
    const cells = parseMdCells(line)
    if (!cells || !cells.some(Boolean)) continue
    if (cells.every((c) => /^:?-+?:?$/.test(c))) continue
    out.push(cells)
  }
  return out
}

/** Drop markdown header row (Outlet | Website | … | Twitter/X | …) */
function dropOutletTableHeaderRows(rows) {
  return rows.filter((r) => {
    const c0 = stripChatUtm(r[0] || '').replace(/^\*+|\*+$/g, '').trim().toLowerCase()
    const tw = stripChatUtm(r[3] || '').toLowerCase()
    if (c0 === 'outlet' && (tw.includes('twitter') || tw.includes('x')))
      return false
    return true
  })
}

function cellOutletName(cell) {
  const s = stripChatUtm(cell)
  const m = /^\*\*?\[([^\]]+)]\(/.exec(s.trim())
    ?? /^\[([^\]]+)]\(/.exec(s.trim())
  if (m) return m[1].trim()
  return s.trim().replace(/\s*\|.*/, '').trim()
}


/** URL from cell: Markdown link preferred */
function cellUrl(cell) {
  const s = stripChatUtm(cell)
  let m = /\[.+]\(\s*(https?:\/\/[^)\s]+)\s*\)/.exec(s)
  if (m) return normalizeHttp(m[1])
  m = /\bhttps?:\/\/[^\s})\]]+/i.exec(s)
  return m ? normalizeHttp(m[0]) : ''
}

function cellMailto(cell) {
  const s = normalizeHttp(cell)
  const mt = /\bmailto:([\w%+.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/i.exec(cell)
    || /\b([\w%+.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/.exec(cell)
  return mt ? mt[1] : ''
}

function cellTwitter(cell) {
  const link = /\(\s*(https?:\/\/x\.com[^\s)]+)/i.exec(cell)
    ?? /\(\s*(https?:\/\/twitter\.com[^\s)]+)/i.exec(cell)
  if (link) return normalizeHttp(link[1])
  return fixTwitter(cell)
}

/** API/RSS column */
function cellApi(apiCell, websiteFallback) {
  const s = stripChatUtm(apiCell)
  const url = /\b(https?:\/\/[^\s`/]+[^\s`]* rss [^\s`]*[^\s`]*|[\w./]*backend[\w.?=&]*|`?(https?:\/\/[^`\s]+)`?)/i.exec(s)
  let u = url?.[2] || url?.[1]
  if (u && /^https/i.test(u)) return normalizeHttp(u.replace(/^`|`$/g, ''))
  const backtickUrl = /`([^`]*https:[^`]*)`/i.exec(s)
  if (backtickUrl) return normalizeHttp(backtickUrl[1])
  if (/RSS.*https?:\/\//i.test(s)) {
    const h = /\b(https?:\/\/[^\s]+\/feed[^\s]*)\b/i.exec(s)
    if (h) return normalizeHttp(h[1])
  }
  const rel = /\bRSS:\s*`?\/?([^`\s|'"]+)/i.exec(s)
  const base = (websiteFallback || '').replace(/\/?$/, '')
  if (rel && /^https/i.test(base)) {
    const tail = rel[1].replace(/^\/+/, '')
    return tail.startsWith('http') ? normalizeHttp(tail) : normalizeHttp(`${base}/${tail}`)
  }
  return ''
}

/** @typedef {[string,string,string,string,string,string]} Row */

function rowsFromOutletTable(rows) {
  /** @type {Row[]} */
  const pack = []
  for (const parts of rows) {
    if (parts.length < 6) continue
    const name = cellOutletName(parts[0])
    const website = cellUrl(parts[1])
    const email = cellMailto(parts[2])
    const twitter = cellTwitter(parts[3])
    const instagram = fixInstagram(parts[4])
    const api = cellApi(parts[5], website)
    pack.push([name, website, email, instagram, twitter, api])
  }
  return pack
}

function splitTopLevelObjects(arrayInner) {
  const objs = []
  let depth = 0
  let start = -1
  for (let i = 0; i < arrayInner.length; i++) {
    const c = arrayInner[i]
    if (c === '{') {
      if (depth === 0) start = i
      depth++
    } else if (c === '}') {
      depth--
      if (depth === 0 && start >= 0) {
        objs.push(arrayInner.slice(start, i + 1))
        start = -1
      }
    }
  }
  return objs
}

function extractArrayAfterProp(code, propNames) {
  for (const prop of propNames) {
    const idx = code.indexOf(`${prop}:`)
    if (idx === -1) continue
    const open = code.indexOf('[', idx)
    if (open === -1) continue
    let depth = 0
    for (let i = open; i < code.length; i++) {
      const ch = code[i]
      if (ch === '[') depth++
      else if (ch === ']') {
        depth--
        if (depth === 0) return code.slice(open + 1, i)
      }
    }
  }
  return null
}

function strField(obj, key) {
  const re = new RegExp(`\\b${key}\\s*:\\s*(null|undefined|'([^']*)'|"([^"]*)")`, 'm')
  const m = obj.match(re)
  if (!m) return ''
  if (m[1] === 'null' || m[1] === 'undefined') return ''
  return (m[2] ?? m[3] ?? '').trim()
}

/** @returns {Row} */
function outletFromTsObject(obj) {
  const name = strField(obj, 'name')
  const website = normalizeHttp(strField(obj, 'website'))
  const email = strField(obj, 'email')
  const twitter = fixTwitter(strField(obj, 'twitter'))
  const instagram = fixInstagram(strField(obj, 'instagram'))
  let api = strField(obj, 'api')
  if (api === 'null' || !api) api = ''
  api = normalizeHttp(api)
  return [name, website, email, instagram, twitter, api]
}

function packFromTsBlob(code) {
  const majorKey = code.includes('majorOutlets:') ? 'majorOutlets' : 'major'
  const minorKey = code.includes('minorOutlets:') ? 'minorOutlets' : 'minor'
  const majorInner = extractArrayAfterProp(code, [majorKey])
  const minorInner = extractArrayAfterProp(code, [minorKey])
  if (!majorInner || !minorInner) return null
  const majorObjs = splitTopLevelObjects(majorInner).map(outletFromTsObject)
  const minorObjs = splitTopLevelObjects(minorInner).map(outletFromTsObject)
  if (majorObjs.length !== 3 || minorObjs.length !== 4) return null
  return { major: majorObjs, minor: minorObjs }
}

function isoFromRelPath(rel) {
  const base = path.posix.basename(rel.replace(/^\//, ''), '.ts')
  return FILENAME_ISO[base] ?? null
}

function weightFromRel(rel) {
  const r = rel.toLowerCase()
  if (r.includes('/sadc/')) return 5
  if (r.includes('/igad/')) return 12
  if (r.includes('/eccas/')) return 20
  if (r.includes('/ecowas/')) return 30
  if (r.includes('/cen-sad/')) return 40
  if (r.includes('/comesa/')) return 42
  return 60
}

function mergeRecords(records) {
  /** @type {Record<string, { major: Row[], minor: Row[], w: number }>} */
  const best = {}
  for (const { rel, major, minor } of records) {
    if (!rel || !/^\/[A-Za-z-]+\/[\w]+\.ts$/i.test(rel)) continue
    const iso = isoFromRelPath(rel)
    if (!iso || !AU_ISO.includes(iso)) continue
    if (/\/britishcommonwealth\//i.test(rel) || /\/brics\//i.test(rel)) continue
    if (/\/igad\//i.test(rel) && !IGAD_ISO.has(iso)) continue
    const w = weightFromRel(rel)
    const prev = best[iso]
    if (!prev || w < prev.w) best[iso] = { major, minor, w }
  }
  /** @type {Record<string, { major: Row[], minor: Row[] }>} */
  const R = {}
  for (const [iso, v] of Object.entries(best))
    R[iso] = { major: v.major, minor: v.minor }
  return R
}

function collectSadcHeadingBlocks(content) {
  /** @type {{ rel: string, major: Row[], minor: Row[] }[]} */
  const out = []
  const re = /^#\s+.+?\s+(\/[A-Za-z]+\/[\w]+\.ts)\s*\r?\n+```(?:ts[^\n]*)?\r?\n([\s\S]*?)```/gm
  let m
  while ((m = re.exec(content)) !== null) {
    const rel = m[1]
    let block = m[2]
    block = block.replace(/export\s+const\s+\w+\s*=\s*/, '')
    const pack = packFromTsBlob(block)
    if (pack) out.push({ rel, major: pack.major, minor: pack.minor })
  }
  return out
}

function collectCommentPathTs(content) {
  /** @type {{ rel: string, major: Row[], minor: Row[] }[]} */
  const out = []
  for (const mm of content.matchAll(/```(?:ts[^\n]*)?\r?\n([\s\S]*?)```/g)) {
    const block = mm[1]
    const first = block.split(/\r?\n/)[0] || ''
    const p = /^\/{2}\s*(\/[A-Za-z-]+\/[\w]+\.ts)\s*$/.exec(first.trim())
    if (!p) continue
    let body = block.replace(/^\/{2}\s*\/[A-Za-z-]+\/[\w]+\.ts\s*\r?\n/, '')
    body = body.replace(/^import[\s\S]+?;\s*/gm, '')
    body = body.replace(/const\s+\w+\s*(?::[^\n]+)?\s*=\s*/, '')
    body = body.replace(/export\s+default\s+\w+\s*;?\s*$/m, '')
    const pack = packFromTsBlob(body.trim())
    if (pack) out.push({ rel: p[1], major: pack.major, minor: pack.minor })
  }
  return out
}

function parseCommonwealthBlocks(content) {
  /** @type {Record<string, { major: Row[], minor: Row[] }>} */
  const R = {}
  const re = /\(`(\/britishCommonwealth\/[\w]+\.ts)`\)\s*\r?\n+```(?:ts[^\n]*)?\r?\n([\s\S]*?)```/g
  let m
  while ((m = re.exec(content)) !== null) {
    const rel = m[1]
    const iso = isoFromRelPath(rel)
    if (!iso || !AU_ISO.includes(iso)) continue
    let inner = m[2].replace(/export\s+default\s+/, '').replace(/;\s*$/, '')
    const pack = packFromTsBlob(inner)
    if (pack) R[iso] = pack
  }
  return R
}

function parseAmuAndSahelMarkdown(content) {
  /** @type {Record<string, { major: Row[], minor: Row[] }>} */
  const R = {}
  const re = /#\s+[^\n]+?\(`(\/(?:AMU|allianceOfSahelStates)\/[\w]+\.ts)`\)\s*\r?\n+## Major outlets\s*\r?\n+([\s\S]*?)\r?\n+## Minor outlets\s*\r?\n+([\s\S]*?)(?=\r?\n---|\r?\n#\s)/gi
  let m
  while ((m = re.exec(content)) !== null) {
    const rel = m[1]
    const iso = isoFromRelPath(rel)
    if (!iso) continue
    const majorRows = dropOutletTableHeaderRows(mdTableLines(m[2]))
    const minorRows = dropOutletTableHeaderRows(mdTableLines(m[3]))
    if (majorRows.length < 3 || minorRows.length < 4) continue
    const major = rowsFromOutletTable(majorRows.slice(0, 3))
    const minor = rowsFromOutletTable(minorRows.slice(0, 4))
    if (major.length === 3 && minor.length === 4) R[iso] = { major, minor }
  }
  return R
}

function parseArabEgyptBlock(content) {
  const m = /\r?\n#\s+Egypt\s*\r?\n+## Major outlets\s*\r?\n+([\s\S]*?)\r?\n+## Minor outlets\s*\r?\n+([\s\S]*?)(?=\r?\n\r?\n|\r?\n#\s)/.exec(content)
  if (!m) return null
  const majorRows = dropOutletTableHeaderRows(mdTableLines(m[1]))
  const minorRows = dropOutletTableHeaderRows(mdTableLines(m[2]))
  if (majorRows.length < 3 || minorRows.length < 4) return null
  const major = rowsFromOutletTable(majorRows.slice(0, 3))
  const minor = rowsFromOutletTable(minorRows.slice(0, 4))
  return major.length === 3 && minor.length === 4 ? { major, minor } : null
}

/** @typedef {{ major: Row[], minor: Row[] }} Pack */

function clonePack(p) {
  return { major: p.major.map((r) => [...r]), minor: p.minor.map((r) => [...r]) }
}

function fallbackFromSeed() {
  /** @type {Record<string, Pack>} */
  const R = {}
  for (const iso of AU_ISO) {
    R[iso] = {
      major: NEWS_OUTLETS[iso].major.map((r) => [...r]),
      minor: NEWS_OUTLETS[iso].minor.map((r) => [...r]),
    }
  }
  return R
}

function emitAuBlock(packs) {
  let s = ''
  for (const iso of AU_ISO) {
    const p = packs[iso]
    if (!p) throw new Error(`Missing AU ${iso}`)
    s += `  ${iso}: {\n`
    s += `    major: [\n`
    for (const row of p.major)
      s += `      n(${row.map((x) => JSON.stringify(x)).join(', ')}),\n`
    s += `    ],\n`
    s += `    minor: [\n`
    for (const row of p.minor)
      s += `      n(${row.map((x) => JSON.stringify(x)).join(', ')}),\n`
    s += `    ],\n`
    s += `  },\n`
  }
  return s
}

function assertPack(pack, iso) {
  const ok =
    pack
    && pack.major?.length === 3
    && pack.minor?.length === 4
    && [...pack.major, ...pack.minor].every((r) => Array.isArray(r) && r.length === 6)
  if (!ok) throw new Error(`Bad pack shape for ${iso}`)
}

function mergeDeep(target, patch) {
  for (const [iso, pk] of Object.entries(patch))
    assertPack(pk, iso)
  Object.assign(target, patch)
}

function main() {
  const content = fs.readFileSync(DOC, 'utf8')

  const records = [...collectSadcHeadingBlocks(content), ...collectCommentPathTs(content)]

  /** @type {Record<string, Pack>} */
  const merged = clonePackMap(mergeRecords(records))

  mergeDeep(merged, parseAmuAndSahelMarkdown(content))

  const eg = parseArabEgyptBlock(content)
  if (eg) merged.EG = eg

  const CW = parseCommonwealthBlocks(content)
  ;['UG'].forEach((iso) => {
    if (CW[iso]) merged[iso] = clonePack(CW[iso])
  })
  ;['RW', 'SL', 'TZ', 'ZM', 'MZ', 'MU', 'MW', 'NA', 'SC'].forEach((iso) => {
    if (!merged[iso] && CW[iso]) merged[iso] = clonePack(CW[iso])
  })

  /** Nigeria: prefer ECOWAS TS; CW block in doc is fractured */
  if (!merged.NG && CW.NG) merged.NG = clonePack(CW.NG)

  if (CW.GH) merged.GH = clonePack(CW.GH)

  const seedFallback = fallbackFromSeed()
  for (const iso of AU_ISO) {
    if (!merged[iso]) merged[iso] = seedFallback[iso]
    try {
      assertPack(merged[iso], iso)
    }
    catch {
      merged[iso] = seedFallback[iso]
      assertPack(merged[iso], iso)
    }
  }

  const seedRaw = fs.readFileSync(SEED_PATH, 'utf8')
  const startMark = `  // ---------- African Union (55) ----------`
  const endMark = `  // ---------- APEC (21) ----------`
  const i0 = seedRaw.indexOf(startMark)
  const i1 = seedRaw.indexOf(endMark)
  if (i0 === -1 || i1 === -1) throw new Error('Seed splice markers missing')
  const head = seedRaw.slice(0, i0 + startMark.length)
  const tail = seedRaw.slice(i1)
  const injected = `\n${emitAuBlock(merged)}\n`
  fs.writeFileSync(SEED_PATH, `${head}${injected}${tail}`)
  console.log('Updated AU outlets from May23 doc → news-outlets-seed.mjs')
}

/** @param {Record<string, Pack>} obj */
function clonePackMap(obj) {
  /** @type {Record<string, Pack>} */
  const out = {}
  for (const k of Object.keys(obj)) out[k] = clonePack(obj[k])
  return out
}

main()
