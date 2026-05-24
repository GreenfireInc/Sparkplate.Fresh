#!/usr/bin/env node
/**
 * Emits authoritative `newsOutletsByIso.ts` files under `src/lib/cores/alliancesCore/*`.
 *
 * Modules: africanUnion (55), AMU (5), APEC (21), arabLeague (22), ASEAN (11),
 * allianceOfSahelStates (3), BRICS (5), beltAndRoadInitiative (roster parsed from participantStatesIsoCodes),
 * britishCommonwealth (56), CARICOM (20), CEN-SAD (25), COMESA (20), CPTPP (12),
 * EAC (8), ECCAS (10), ECOWAS (12), EU (27), fiveEyes (5),
 * G7 (7), G20 (19 sovereign), GCC (6), IGAD (7), IORA (23),
 * MIKTA (5), MINT (4), NATO (32), OECD (36), OECS (8), OPEC (12), RCEP (15), SADC (16).
 *
 * Data: `scripts/data/news-outlets-seed.mjs`. Modules with `stubMissingIso` emit explicit placeholder tuples
 * (marked "not seeded … verify") for ISO codes absent from the seed until coverage grows (e.g. BRI).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { NEWS_OUTLETS } from './data/news-outlets-seed.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const ALLIANCE_DIR = path.join(ROOT, 'src/lib/cores/alliancesCore')

/**
 * Parses `export const Name = ['AA', ... ] as const` (single-letter ISO2 codes quoted).
 *
 * @param {string} filePath
 * @param {string} constName
 * @returns {string[]}
 */
function parseQuotedIsoConstArray(filePath, constName) {
  const body = fs.readFileSync(filePath, 'utf8')
  const esc = constName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`export\\s+const\\s+${esc}\\s*=\\s*\\[([\\s\\S]*?)\\]\\s*as\\s+const`)
  const m = body.match(re)
  if (!m) throw new Error(`Cannot find export const ${constName} array in ${filePath}`)
  const raw = [...m[1].matchAll(/'\s*([A-Z]{2})\s*'/g)].map((x) => x[1])
  /** @type {string[]} */
  const out = []
  const seen = new Set()
  for (const iso of raw) {
    if (seen.has(iso)) continue
    seen.add(iso)
    out.push(iso)
  }
  return out
}

const BRI_ROSTER_ISO = parseQuotedIsoConstArray(
  path.join(ALLIANCE_DIR, 'beltAndRoadInitiative/participantStatesIsoCodes.ts'),
  'BELT_AND_ROAD_PARTICIPANT_ISO_CODES',
)

const COMMONWEALTH_ROSTER_ISO = parseQuotedIsoConstArray(
  path.join(ALLIANCE_DIR, 'britishCommonwealth/commonwealthMemberIsoCodes.ts'),
  'COMMONWEALTH_MEMBER_ISO_CODES',
)

const CARICOM_ISO_PATH = path.join(ALLIANCE_DIR, 'CARICOM/caricomMemberIsoCodes.ts')
const CARICOM_ROSTER_ISO = [
  ...parseQuotedIsoConstArray(CARICOM_ISO_PATH, 'CARICOM_FULL_MEMBER_ISO_CODES'),
  ...parseQuotedIsoConstArray(CARICOM_ISO_PATH, 'CARICOM_ASSOCIATE_MEMBER_ISO_CODES'),
]

const CENSAD_ROSTER_ISO = parseQuotedIsoConstArray(
  path.join(ALLIANCE_DIR, 'CEN-SAD/censadMemberIsoCodes.ts'),
  'CENSAD_MEMBER_ISO_CODES',
)

const COMESA_ROSTER_ISO = parseQuotedIsoConstArray(
  path.join(ALLIANCE_DIR, 'COMESA/comesaMemberIsoCodes.ts'),
  'COMESA_MEMBER_ISO_CODES',
)

const CPTPP_ROSTER_ISO = parseQuotedIsoConstArray(
  path.join(ALLIANCE_DIR, 'CPTPP/cptppMemberIsoCodes.ts'),
  'CPTPP_MEMBER_ISO_CODES',
)

const EAC_ROSTER_ISO = parseQuotedIsoConstArray(
  path.join(ALLIANCE_DIR, 'EAC/eacMemberIsoCodes.ts'),
  'EAC_MEMBER_ISO_CODES',
)

const ECCAS_ROSTER_ISO = parseQuotedIsoConstArray(
  path.join(ALLIANCE_DIR, 'ECCAS/eccasMemberIsoCodes.ts'),
  'ECCAS_MEMBER_ISO_CODES',
)

const ECOWAS_ROSTER_ISO = parseQuotedIsoConstArray(
  path.join(ALLIANCE_DIR, 'ECOWAS/ecowasMemberIsoCodes.ts'),
  'ECOWAS_MEMBER_ISO_CODES',
)

const EU_ROSTER_ISO = parseQuotedIsoConstArray(
  path.join(ALLIANCE_DIR, 'EU/euMemberIsoCodes.ts'),
  'EU_MEMBER_ISO_CODES',
)

const FIVE_EYES_ROSTER_ISO = parseQuotedIsoConstArray(
  path.join(ALLIANCE_DIR, 'fiveEyes/fiveEyesMemberIsoCodes.ts'),
  'FIVE_EYES_MEMBER_ISO_CODES',
)

const G7_ROSTER_ISO = parseQuotedIsoConstArray(
  path.join(ALLIANCE_DIR, 'G7/g7MemberIsoCodes.ts'),
  'G7_MEMBER_ISO_CODES',
)

const G20_ROSTER_ISO = parseQuotedIsoConstArray(
  path.join(ALLIANCE_DIR, 'G20/g20MemberIsoCodes.ts'),
  'G20_SOVEREIGN_MEMBER_ISO_CODES',
)

const GCC_ROSTER_ISO = parseQuotedIsoConstArray(
  path.join(ALLIANCE_DIR, 'GCC/gccMemberIsoCodes.ts'),
  'GCC_MEMBER_ISO_CODES',
)

const IGAD_ROSTER_ISO = parseQuotedIsoConstArray(
  path.join(ALLIANCE_DIR, 'IGAD/igadMemberIsoCodes.ts'),
  'IGAD_MEMBER_ISO_CODES',
)

const IORA_ROSTER_ISO = parseQuotedIsoConstArray(
  path.join(ALLIANCE_DIR, 'IORA/ioraMemberIsoCodes.ts'),
  'IORA_MEMBER_ISO_CODES',
)

const MIKTA_ROSTER_ISO = parseQuotedIsoConstArray(
  path.join(ALLIANCE_DIR, 'MIKTA/miktaMemberIsoCodes.ts'),
  'MIKTA_MEMBER_ISO_CODES',
)

const MINT_ROSTER_ISO = parseQuotedIsoConstArray(
  path.join(ALLIANCE_DIR, 'MINT/mintMemberIsoCodes.ts'),
  'MINT_MEMBER_ISO_CODES',
)

const NATO_ROSTER_ISO = parseQuotedIsoConstArray(
  path.join(ALLIANCE_DIR, 'NATO/natoMemberIsoCodes.ts'),
  'NATO_MEMBER_ISO_CODES',
)

const OECD_ROSTER_ISO = parseQuotedIsoConstArray(
  path.join(ALLIANCE_DIR, 'OECD/oecdMemberIsoCodes.ts'),
  'OECD_MEMBER_ISO_CODES',
)

const OECS_ROSTER_ISO = parseQuotedIsoConstArray(
  path.join(ALLIANCE_DIR, 'OECS/oecsMemberIsoCodes.ts'),
  'OECS_MEMBER_ISO_CODES',
)

const OPEC_ROSTER_ISO = parseQuotedIsoConstArray(
  path.join(ALLIANCE_DIR, 'OPEC/opecMemberIsoCodes.ts'),
  'OPEC_MEMBER_ISO_CODES',
)

const RCEP_ROSTER_ISO = parseQuotedIsoConstArray(
  path.join(ALLIANCE_DIR, 'RCEP/rcepMemberIsoCodes.ts'),
  'RCEP_MEMBER_ISO_CODES',
)

const SADC_ROSTER_ISO = parseQuotedIsoConstArray(
  path.join(ALLIANCE_DIR, 'SADC/sadcMemberIsoCodes.ts'),
  'SADC_MEMBER_ISO_CODES',
)

/** @type {Record<string, { dir: string, isoConst: string, isoFile: string, isoType: string, mapConst: string, stubMissingIso?: boolean }>} */
const MODULES = {
  africanUnion: {
    dir: 'africanUnion',
    isoConst: 'AU_MEMBER_ISO_CODES',
    isoFile: 'auMemberIsoCodes',
    isoType: 'AuMemberIsoCode',
    mapConst: 'AU_NEWS_OUTLETS',
  },
  APEC: {
    dir: 'APEC',
    isoConst: 'APEC_MEMBER_ISO_CODES',
    isoFile: 'apecMemberIsoCodes',
    isoType: 'ApecMemberIsoCode',
    mapConst: 'APEC_NEWS_OUTLETS',
  },
  arabLeague: {
    dir: 'arabLeague',
    isoConst: 'ARAB_LEAGUE_MEMBER_ISO_CODES',
    isoFile: 'arabLeagueMemberIsoCodes',
    isoType: 'ArabLeagueMemberIsoCode',
    mapConst: 'ARAB_LEAGUE_NEWS_OUTLETS',
  },
  ASEAN: {
    dir: 'ASEAN',
    isoConst: 'ASEAN_MEMBER_ISO_CODES',
    isoFile: 'aseanMemberIsoCodes',
    isoType: 'AseanMemberIsoCode',
    mapConst: 'ASEAN_NEWS_OUTLETS',
  },
  AMU: {
    dir: 'AMU',
    isoConst: 'AMU_MEMBER_ISO_CODES',
    isoFile: 'amuMemberIsoCodes',
    isoType: 'AmuMemberIsoCode',
    mapConst: 'AMU_NEWS_OUTLETS',
  },
  allianceOfSahelStates: {
    dir: 'allianceOfSahelStates',
    isoConst: 'AES_MEMBER_ISO_CODES',
    isoFile: 'aesMemberIsoCodes',
    isoType: 'AesMemberIsoCode',
    mapConst: 'AES_NEWS_OUTLETS',
  },
  BRICS: {
    dir: 'BRICS',
    isoConst: 'BRICS_MEMBER_ISO_CODES',
    isoFile: 'bricsMemberIsoCodes',
    isoType: 'BricsMemberIsoCode',
    mapConst: 'BRICS_NEWS_OUTLETS',
  },
  beltAndRoadInitiative: {
    dir: 'beltAndRoadInitiative',
    isoConst: 'BELT_AND_ROAD_PARTICIPANT_ISO_CODES',
    isoFile: 'participantStatesIsoCodes',
    isoType: 'BriMemberIsoCode',
    mapConst: 'BRI_NEWS_OUTLETS',
    stubMissingIso: true,
  },
  britishCommonwealth: {
    dir: 'britishCommonwealth',
    isoConst: 'COMMONWEALTH_MEMBER_ISO_CODES',
    isoFile: 'commonwealthMemberIsoCodes',
    isoType: 'CommonwealthMemberIsoCode',
    mapConst: 'COMMONWEALTH_NEWS_OUTLETS',
    stubMissingIso: true,
  },
  CARICOM: {
    dir: 'CARICOM',
    isoConst: 'CARICOM_MEMBER_ISO_CODES',
    isoFile: 'caricomMemberIsoCodes',
    isoType: 'CaricomMemberIsoCode',
    mapConst: 'CARICOM_NEWS_OUTLETS',
    stubMissingIso: true,
  },
  CENSAD: {
    dir: 'CEN-SAD',
    isoConst: 'CENSAD_MEMBER_ISO_CODES',
    isoFile: 'censadMemberIsoCodes',
    isoType: 'CensadMemberIsoCode',
    mapConst: 'CENSAD_NEWS_OUTLETS',
    stubMissingIso: true,
  },
  COMESA: {
    dir: 'COMESA',
    isoConst: 'COMESA_MEMBER_ISO_CODES',
    isoFile: 'comesaMemberIsoCodes',
    isoType: 'ComesaMemberIsoCode',
    mapConst: 'COMESA_NEWS_OUTLETS',
    stubMissingIso: true,
  },
  CPTPP: {
    dir: 'CPTPP',
    isoConst: 'CPTPP_MEMBER_ISO_CODES',
    isoFile: 'cptppMemberIsoCodes',
    isoType: 'CptppMemberIsoCode',
    mapConst: 'CPTPP_NEWS_OUTLETS',
    stubMissingIso: true,
  },
  EAC: {
    dir: 'EAC',
    isoConst: 'EAC_MEMBER_ISO_CODES',
    isoFile: 'eacMemberIsoCodes',
    isoType: 'EacMemberIsoCode',
    mapConst: 'EAC_NEWS_OUTLETS',
    stubMissingIso: true,
  },
  ECCAS: {
    dir: 'ECCAS',
    isoConst: 'ECCAS_MEMBER_ISO_CODES',
    isoFile: 'eccasMemberIsoCodes',
    isoType: 'EccasMemberIsoCode',
    mapConst: 'ECCAS_NEWS_OUTLETS',
    stubMissingIso: true,
  },
  ECOWAS: {
    dir: 'ECOWAS',
    isoConst: 'ECOWAS_MEMBER_ISO_CODES',
    isoFile: 'ecowasMemberIsoCodes',
    isoType: 'EcowasMemberIsoCode',
    mapConst: 'ECOWAS_NEWS_OUTLETS',
    stubMissingIso: true,
  },
  EU: {
    dir: 'EU',
    isoConst: 'EU_MEMBER_ISO_CODES',
    isoFile: 'euMemberIsoCodes',
    isoType: 'EuMemberIsoCode',
    mapConst: 'EU_NEWS_OUTLETS',
    stubMissingIso: true,
  },
  fiveEyes: {
    dir: 'fiveEyes',
    isoConst: 'FIVE_EYES_MEMBER_ISO_CODES',
    isoFile: 'fiveEyesMemberIsoCodes',
    isoType: 'FiveEyesMemberIsoCode',
    mapConst: 'FIVE_EYES_NEWS_OUTLETS',
    stubMissingIso: true,
  },
  G7: {
    dir: 'G7',
    isoConst: 'G7_MEMBER_ISO_CODES',
    isoFile: 'g7MemberIsoCodes',
    isoType: 'G7MemberIsoCode',
    mapConst: 'G7_NEWS_OUTLETS',
    stubMissingIso: true,
  },
  G20: {
    dir: 'G20',
    isoConst: 'G20_SOVEREIGN_MEMBER_ISO_CODES',
    isoFile: 'g20MemberIsoCodes',
    isoType: 'G20SovereignMemberIsoCode',
    mapConst: 'G20_NEWS_OUTLETS',
    stubMissingIso: true,
  },
  GCC: {
    dir: 'GCC',
    isoConst: 'GCC_MEMBER_ISO_CODES',
    isoFile: 'gccMemberIsoCodes',
    isoType: 'GccMemberIsoCode',
    mapConst: 'GCC_NEWS_OUTLETS',
    stubMissingIso: true,
  },
  IGAD: {
    dir: 'IGAD',
    isoConst: 'IGAD_MEMBER_ISO_CODES',
    isoFile: 'igadMemberIsoCodes',
    isoType: 'IgadMemberIsoCode',
    mapConst: 'IGAD_NEWS_OUTLETS',
    stubMissingIso: true,
  },
  IORA: {
    dir: 'IORA',
    isoConst: 'IORA_MEMBER_ISO_CODES',
    isoFile: 'ioraMemberIsoCodes',
    isoType: 'IoraMemberIsoCode',
    mapConst: 'IORA_NEWS_OUTLETS',
    stubMissingIso: true,
  },
  MIKTA: {
    dir: 'MIKTA',
    isoConst: 'MIKTA_MEMBER_ISO_CODES',
    isoFile: 'miktaMemberIsoCodes',
    isoType: 'MiktaMemberIsoCode',
    mapConst: 'MIKTA_NEWS_OUTLETS',
    stubMissingIso: true,
  },
  MINT: {
    dir: 'MINT',
    isoConst: 'MINT_MEMBER_ISO_CODES',
    isoFile: 'mintMemberIsoCodes',
    isoType: 'MintMemberIsoCode',
    mapConst: 'MINT_NEWS_OUTLETS',
    stubMissingIso: true,
  },
  NATO: {
    dir: 'NATO',
    isoConst: 'NATO_MEMBER_ISO_CODES',
    isoFile: 'natoMemberIsoCodes',
    isoType: 'NatoMemberIsoCode',
    mapConst: 'NATO_NEWS_OUTLETS',
    stubMissingIso: true,
  },
  OECD: {
    dir: 'OECD',
    isoConst: 'OECD_MEMBER_ISO_CODES',
    isoFile: 'oecdMemberIsoCodes',
    isoType: 'OecdMemberIsoCode',
    mapConst: 'OECD_NEWS_OUTLETS',
    stubMissingIso: true,
  },
  OECS: {
    dir: 'OECS',
    isoConst: 'OECS_MEMBER_ISO_CODES',
    isoFile: 'oecsMemberIsoCodes',
    isoType: 'OecsMemberIsoCode',
    mapConst: 'OECS_NEWS_OUTLETS',
    stubMissingIso: true,
  },
  OPEC: {
    dir: 'OPEC',
    isoConst: 'OPEC_MEMBER_ISO_CODES',
    isoFile: 'opecMemberIsoCodes',
    isoType: 'OpecMemberIsoCode',
    mapConst: 'OPEC_NEWS_OUTLETS',
    stubMissingIso: true,
  },
  RCEP: {
    dir: 'RCEP',
    isoConst: 'RCEP_MEMBER_ISO_CODES',
    isoFile: 'rcepMemberIsoCodes',
    isoType: 'RcepMemberIsoCode',
    mapConst: 'RCEP_NEWS_OUTLETS',
    stubMissingIso: true,
  },
  SADC: {
    dir: 'SADC',
    isoConst: 'SADC_MEMBER_ISO_CODES',
    isoFile: 'sadcMemberIsoCodes',
    isoType: 'SadcMemberIsoCode',
    mapConst: 'SADC_NEWS_OUTLETS',
    stubMissingIso: true,
  },
}

/** Module rosters — mirrors *_MEMBER_ISO_CODES files (belt roster parsed live). */
const ROSTERS = {
  africanUnion: [
    'AO','BF','BI','BJ','BW','CD','CF','CG','CI','CM','CV','DJ','DZ','EG','EH','ER','ET','GA','GH','GM','GN','GQ','GW','KE','KM','LR','LS','LY','MA','MG','ML','MR','MU','MW','MZ','NA','NE','NG','RW','SC','SD','SL','SN','SO','SS','ST','SZ','TD','TG','TN','TZ','UG','ZA','ZM','ZW',
  ],
  APEC: ['AU','BN','CA','CL','CN','HK','ID','JP','MY','MX','NZ','PG','PE','PH','RU','SG','KR','TW','TH','US','VN'],
  arabLeague: ['DZ','BH','KM','DJ','EG','IQ','JO','KW','LB','LY','MR','MA','OM','PS','QA','SA','SO','SD','SY','TN','AE','YE'],
  ASEAN: ['BN','KH','ID','LA','MY','MM','PH','SG','TH','TL','VN'],
  AMU: ['DZ','LY','MR','MA','TN'],
  allianceOfSahelStates: ['ML','NE','BF'],
  BRICS: ['BR','RU','IN','CN','ZA'],
  beltAndRoadInitiative: BRI_ROSTER_ISO,
  britishCommonwealth: COMMONWEALTH_ROSTER_ISO,
  CARICOM: CARICOM_ROSTER_ISO,
  CENSAD: CENSAD_ROSTER_ISO,
  COMESA: COMESA_ROSTER_ISO,
  CPTPP: CPTPP_ROSTER_ISO,
  EAC: EAC_ROSTER_ISO,
  ECCAS: ECCAS_ROSTER_ISO,
  ECOWAS: ECOWAS_ROSTER_ISO,
  EU: EU_ROSTER_ISO,
  fiveEyes: FIVE_EYES_ROSTER_ISO,
  G7: G7_ROSTER_ISO,
  G20: G20_ROSTER_ISO,
  GCC: GCC_ROSTER_ISO,
  IGAD: IGAD_ROSTER_ISO,
  IORA: IORA_ROSTER_ISO,
  MIKTA: MIKTA_ROSTER_ISO,
  MINT: MINT_ROSTER_ISO,
  NATO: NATO_ROSTER_ISO,
  OECD: OECD_ROSTER_ISO,
  OECS: OECS_ROSTER_ISO,
  OPEC: OPEC_ROSTER_ISO,
  RCEP: RCEP_ROSTER_ISO,
  SADC: SADC_ROSTER_ISO,
}

function jsonStr(s) { return JSON.stringify(s) }

/** @typedef {{ major: unknown[], minor: unknown[] }} Pack */

/** Structured placeholder when NEWS_OUTLETS has no ISO pack (stub-capable alliances). */
function stubNewsPackTuples(iso) {
  /** @param {number} idx @param {string} tier */
  const row = (idx, tier) =>
    [`${iso}: ${tier} outlet ${idx} — not seeded in news-outlets-seed.mjs; verify nationally`, '', '', '', '', '']
  return {
    major: [row(1, 'Major'), row(2, 'Major'), row(3, 'Major')],
    minor: [row(1, 'Minor'), row(2, 'Minor'), row(3, 'Minor'), row(4, 'Minor')],
  }
}

/** Emit authoritative byIso TS with optional stubbing when seed lacks an ISO row. */
function emitAuthoritative(name) {
  const { dir, isoFile, isoType, mapConst, stubMissingIso } = MODULES[name]
  /** @type {string[]} */
  const isoList = ROSTERS[name]
  const allowStubMissing = !!stubMissingIso
  let stubCount = 0

  if (!allowStubMissing) {
    const missing = isoList.filter((iso) => !NEWS_OUTLETS[iso])
    if (missing.length)
      throw new Error(`${name}: missing NEWS_OUTLETS seed for ISO ${missing.join(', ')}`)
  }

  /** @type {string[]} */
  const docIntro = [` * Three major + four minor national news outlets per ${dir} economy (informational; verify).`]
  if (allowStubMissing)
    docIntro.push(
      ' * ',
      ' * ISOs absent from NEWS_OUTLETS use explicit placeholders (marked "not seeded ... verify"); add seed rows then rerun.',
    )

  let out = ''
  out += `import type { NewsOutlet } from './types'\n`
  out += `import type { ${isoType} } from './${isoFile}'\n\n`
  out += `function n(\n  name: string,\n  website: string,\n  email: string,\n  instagram: string,\n  twitter: string,\n  apiEndpoint: string,\n): NewsOutlet {\n  return { name, website, email, instagram, twitter, apiEndpoint }\n}\n\n`
  out += `/**\n`
  for (const l of docIntro) out += `${l}\n`
  out += ` */\n`
  out += `export const ${mapConst} = {\n`

  for (const iso of isoList) {
    let pack /** @type {Pack} */
    pack = NEWS_OUTLETS[iso]
    if (!pack) {
      if (!allowStubMissing)
        throw new Error(`${name}: internal gap — missing pack for ${iso}`)
      pack = stubNewsPackTuples(iso)
      stubCount++
    }
    out += `  ${iso}: {\n`
    out += `    major: [\n`
    for (const row of pack.major) {
      out += `      n(${/** @type {string[]} */(row).map(jsonStr).join(', ')}),\n`
    }
    out += `    ],\n`
    out += `    minor: [\n`
    for (const row of pack.minor) {
      out += `      n(${/** @type {string[]} */(row).map(jsonStr).join(', ')}),\n`
    }
    out += `    ],\n`
    out += `  },\n`
  }

  out += `} as const satisfies Record<${isoType}, {\n  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]\n  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]\n}>\n`

  const filePath = path.join(ALLIANCE_DIR, dir, 'newsOutletsByIso.ts')
  fs.writeFileSync(filePath, out)
  const suffix = stubCount ? ` (${stubCount} stubs)` : ''
  console.log(`wrote ${dir}/newsOutletsByIso.ts (${isoList.length} entries${suffix})`)
}

for (const moduleName of Object.keys(MODULES)) {
  emitAuthoritative(moduleName)
}

console.log('Done.')
