#!/usr/bin/env node
/**
 * Adds `newsOutlets: BRI_NEWS_OUTLETS['XX']` to each beltAndRoadInitiative country record
 * and inserts the `./newsOutletsByIso` import. Idempotent via `BRI_NEWS_OUTLETS` guard.
 *
 * Usage: node scripts/wire-belt-road-news-outlets.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BRI_DIR = path.resolve(__dirname, '../src/lib/cores/alliancesCore/beltAndRoadInitiative')

const SKIP = new Set([
  'index.ts',
  'types.ts',
  'domesticCouriersByIso.ts',
  'notableUniversitiesByIso.ts',
  'participantStatesIsoCodes.ts',
  'newsOutletsByIso.ts',
])

let patched = 0
for (const fn of fs.readdirSync(BRI_DIR)) {
  if (!fn.endsWith('.ts') || SKIP.has(fn)) continue
  const filePath = path.join(BRI_DIR, fn)
  let s = fs.readFileSync(filePath, 'utf8')
  if (s.includes('BRI_NEWS_OUTLETS')) continue

  let norm = s.replace(/\r\n/g, '\n')
  norm = norm.replace(
    /^import \{ BRI_DOMESTIC_COURIERS \} from '\.\/domesticCouriersByIso'\s*\nimport \{ BRI_NOTABLE_UNIVERSITIES \} from '\.\/notableUniversitiesByIso'/m,
    `import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'\nimport { BRI_NEWS_OUTLETS } from './newsOutletsByIso'\nimport { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'`,
  )
  norm = norm.replace(
    /^import \{ BRI_DOMESTIC_COURIERS \} from "\.\/domesticCouriersByIso"\s*\nimport \{ BRI_NOTABLE_UNIVERSITIES \} from "\.\/notableUniversitiesByIso"/m,
    `import { BRI_DOMESTIC_COURIERS } from "./domesticCouriersByIso"\nimport { BRI_NEWS_OUTLETS } from "./newsOutletsByIso"\nimport { BRI_NOTABLE_UNIVERSITIES } from "./notableUniversitiesByIso"`,
  )

  norm = norm.replace(
    /(domesticCourierServices:\s*BRI_DOMESTIC_COURIERS\['([A-Z]{2})'\],)\s*\n(\s*)(notableUniversities:)/gm,
    (_m, dline, iso, sp, nm) =>
      `${dline}\n${sp}newsOutlets: BRI_NEWS_OUTLETS['${iso}'],\n${sp}${nm}`,
  )

  if (norm === s.replace(/\r\n/g, '\n')) {
    console.warn('skip (pattern mismatch?):', fn)
    continue
  }
  fs.writeFileSync(filePath, norm.endsWith('\n') ? norm : `${norm}\n`)
  patched++
}
console.log(`patched ${patched} BRI economy files`)
