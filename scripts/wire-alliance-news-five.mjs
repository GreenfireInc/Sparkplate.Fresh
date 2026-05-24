#!/usr/bin/env node
/**
 * Wires `newsOutlets` + `./newsOutletsByIso` import for additional alliance modules
 * (britishCommonwealth, CARICOM, CEN-SAD, COMESA, CPTPP, EAC, ECCAS, ECOWAS, EU, fiveEyes,
 * G7, G20 (sovereign only — institutional AU/EU entries skipped), GCC, IGAD, IORA,
 * MIKTA, MINT, NATO, OECD, OECS, OPEC, RCEP, SADC).
 * Idempotent via each bloc's `*_NEWS_OUTLETS` import marker.
 *
 * Usage: node scripts/wire-alliance-news-five.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ALLIANCE_CORE = path.join(__dirname, '../src/lib/cores/alliancesCore')

const SHARED_SKIP = [
  'index.ts',
  'types.ts',
  'domesticCouriersByIso.ts',
  'notableUniversitiesByIso.ts',
  'newsOutletsByIso.ts',
]

/** @typedef {{ folder: string, courier: string, news: string, memberIsoCodesFile: string, extraSkip?: string[] }} Job */

/** @type {Job[]} */
const JOBS = [
  {
    folder: 'britishCommonwealth',
    courier: 'COMMONWEALTH_DOMESTIC_COURIERS',
    news: 'COMMONWEALTH_NEWS_OUTLETS',
    memberIsoCodesFile: 'commonwealthMemberIsoCodes.ts',
  },
  {
    folder: 'CARICOM',
    courier: 'CARICOM_DOMESTIC_COURIERS',
    news: 'CARICOM_NEWS_OUTLETS',
    memberIsoCodesFile: 'caricomMemberIsoCodes.ts',
  },
  {
    folder: 'CEN-SAD',
    courier: 'CENSAD_DOMESTIC_COURIERS',
    news: 'CENSAD_NEWS_OUTLETS',
    memberIsoCodesFile: 'censadMemberIsoCodes.ts',
  },
  {
    folder: 'COMESA',
    courier: 'COMESA_DOMESTIC_COURIERS',
    news: 'COMESA_NEWS_OUTLETS',
    memberIsoCodesFile: 'comesaMemberIsoCodes.ts',
  },
  {
    folder: 'CPTPP',
    courier: 'CPTPP_DOMESTIC_COURIERS',
    news: 'CPTPP_NEWS_OUTLETS',
    memberIsoCodesFile: 'cptppMemberIsoCodes.ts',
  },
  {
    folder: 'EAC',
    courier: 'EAC_DOMESTIC_COURIERS',
    news: 'EAC_NEWS_OUTLETS',
    memberIsoCodesFile: 'eacMemberIsoCodes.ts',
  },
  {
    folder: 'ECCAS',
    courier: 'ECCAS_DOMESTIC_COURIERS',
    news: 'ECCAS_NEWS_OUTLETS',
    memberIsoCodesFile: 'eccasMemberIsoCodes.ts',
  },
  {
    folder: 'ECOWAS',
    courier: 'ECOWAS_DOMESTIC_COURIERS',
    news: 'ECOWAS_NEWS_OUTLETS',
    memberIsoCodesFile: 'ecowasMemberIsoCodes.ts',
  },
  {
    folder: 'EU',
    courier: 'EU_DOMESTIC_COURIERS',
    news: 'EU_NEWS_OUTLETS',
    memberIsoCodesFile: 'euMemberIsoCodes.ts',
  },
  {
    folder: 'fiveEyes',
    courier: 'FIVE_EYES_DOMESTIC_COURIERS',
    news: 'FIVE_EYES_NEWS_OUTLETS',
    memberIsoCodesFile: 'fiveEyesMemberIsoCodes.ts',
  },
  {
    folder: 'G7',
    courier: 'G7_DOMESTIC_COURIERS',
    news: 'G7_NEWS_OUTLETS',
    memberIsoCodesFile: 'g7MemberIsoCodes.ts',
  },
  {
    folder: 'G20',
    courier: 'G20_DOMESTIC_COURIERS',
    news: 'G20_NEWS_OUTLETS',
    memberIsoCodesFile: 'g20MemberIsoCodes.ts',
    // Institutional members (AU, EU) use a separate `G20_INSTITUTIONAL_DOMESTIC_COURIERS.XX`
    // shape and are not keyed by ISO in the news map; skip explicitly.
    extraSkip: ['africanUnion.ts', 'europeanUnion.ts'],
  },
  {
    folder: 'GCC',
    courier: 'GCC_DOMESTIC_COURIERS',
    news: 'GCC_NEWS_OUTLETS',
    memberIsoCodesFile: 'gccMemberIsoCodes.ts',
  },
  {
    folder: 'IGAD',
    courier: 'IGAD_DOMESTIC_COURIERS',
    news: 'IGAD_NEWS_OUTLETS',
    memberIsoCodesFile: 'igadMemberIsoCodes.ts',
  },
  {
    folder: 'IORA',
    courier: 'IORA_DOMESTIC_COURIERS',
    news: 'IORA_NEWS_OUTLETS',
    memberIsoCodesFile: 'ioraMemberIsoCodes.ts',
  },
  {
    folder: 'MIKTA',
    courier: 'MIKTA_DOMESTIC_COURIERS',
    news: 'MIKTA_NEWS_OUTLETS',
    memberIsoCodesFile: 'miktaMemberIsoCodes.ts',
  },
  {
    folder: 'MINT',
    courier: 'MINT_DOMESTIC_COURIERS',
    news: 'MINT_NEWS_OUTLETS',
    memberIsoCodesFile: 'mintMemberIsoCodes.ts',
  },
  {
    folder: 'NATO',
    courier: 'NATO_DOMESTIC_COURIERS',
    news: 'NATO_NEWS_OUTLETS',
    memberIsoCodesFile: 'natoMemberIsoCodes.ts',
  },
  {
    folder: 'OECD',
    courier: 'OECD_DOMESTIC_COURIERS',
    news: 'OECD_NEWS_OUTLETS',
    memberIsoCodesFile: 'oecdMemberIsoCodes.ts',
  },
  {
    folder: 'OECS',
    courier: 'OECS_DOMESTIC_COURIERS',
    news: 'OECS_NEWS_OUTLETS',
    memberIsoCodesFile: 'oecsMemberIsoCodes.ts',
  },
  {
    folder: 'OPEC',
    courier: 'OPEC_DOMESTIC_COURIERS',
    news: 'OPEC_NEWS_OUTLETS',
    memberIsoCodesFile: 'opecMemberIsoCodes.ts',
  },
  {
    folder: 'RCEP',
    courier: 'RCEP_DOMESTIC_COURIERS',
    news: 'RCEP_NEWS_OUTLETS',
    memberIsoCodesFile: 'rcepMemberIsoCodes.ts',
  },
  {
    folder: 'SADC',
    courier: 'SADC_DOMESTIC_COURIERS',
    news: 'SADC_NEWS_OUTLETS',
    memberIsoCodesFile: 'sadcMemberIsoCodes.ts',
  },
]

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function patchAlliance(job) {
  const dirPath = path.join(ALLIANCE_CORE, job.folder)
  const skip = new Set([...SHARED_SKIP, job.memberIsoCodesFile, ...(job.extraSkip ?? [])])
  const courierEsc = escapeRe(job.courier)
  let patched = 0

  const importSQ = new RegExp(
    `^(import \\{ ${courierEsc} \\} from '\\./domesticCouriersByIso')\\s*\\n(import \\{ [^}]+ \\} from '\\./notableUniversitiesByIso')`,
    'm',
  )
  const importDQ = new RegExp(
    `^(import \\{ ${courierEsc} \\} from "\\./domesticCouriersByIso")\\s*\\n(import \\{ [^}]+ \\} from "\\./notableUniversitiesByIso")`,
    'm',
  )
  const bodyRe = new RegExp(
    `(domesticCourierServices:\\s*${courierEsc}\\['([A-Z]{2})'\\],)\\s*\\n(\\s*)(notableUniversities:)`,
    'gm',
  )

  for (const fn of fs.readdirSync(dirPath)) {
    if (!fn.endsWith('.ts') || skip.has(fn)) continue
    const fp = path.join(dirPath, fn)
    let s = fs.readFileSync(fp, 'utf8')
    if (s.includes(job.news)) continue

    let norm = s.replace(/\r\n/g, '\n')

    norm = norm.replace(
      importSQ,
      (_, l1, l2) => `${l1}\nimport { ${job.news} } from './newsOutletsByIso'\n${l2}`,
    )
    norm = norm.replace(
      importDQ,
      (_, l1, l2) => `${l1}\nimport { ${job.news} } from "./newsOutletsByIso"\n${l2}`,
    )

    norm = norm.replace(
      bodyRe,
      (_m, dline, iso, sp, nm) =>
        `${dline}\n${sp}newsOutlets: ${job.news}['${iso}'],\n${sp}${nm}`,
    )

    if (norm === s.replace(/\r\n/g, '\n')) {
      console.warn(`${job.folder}: skip (pattern mismatch): ${fn}`)
      continue
    }
    fs.writeFileSync(fp, norm.endsWith('\n') ? norm : `${norm}\n`)
    patched++
  }
  console.log(`${job.folder}: patched ${patched}`)
}

for (const j of JOBS) patchAlliance(j)
console.log('Done.')
