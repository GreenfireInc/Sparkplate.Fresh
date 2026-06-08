import fs from 'fs'
import path from 'path'
import { AU_CORPORATION_FORMATION_DATA } from './data/auCorporationFormationByIso.mjs'
import { ALLIANCE_CORPORATION_FORMATION_SUPPLEMENTAL } from './data/allianceCorporationFormationSupplemental.mjs'
import { ALLIANCE_CORPORATION_FORMATION_SUPPLEMENTAL_EXTENDED } from './data/allianceCorporationFormationSupplementalExtended.mjs'

const ROOT = 'src/lib/cores/alliancesCore'
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

const entries = {
  ...AU_CORPORATION_FORMATION_DATA,
  ...ALLIANCE_CORPORATION_FORMATION_SUPPLEMENTAL,
  ...ALLIANCE_CORPORATION_FORMATION_SUPPLEMENTAL_EXTENDED,
}

function readIsoCodes(filePath, constName) {
  const src = fs.readFileSync(path.join(ROOT, filePath), 'utf8')
  const arrayContents = {}
  const arrayRe = /export const (\w+) = \[([\s\S]*?)\] as const/g
  let arrayMatch
  while ((arrayMatch = arrayRe.exec(src)) !== null) {
    arrayContents[arrayMatch[1]] = [...arrayMatch[2].matchAll(/'([A-Z]{2})'/g)].map((x) => x[1])
  }
  const m = src.match(new RegExp(`export const ${constName} = \\[([\\s\\S]*?)\\] as const`))
  if (!m) throw new Error(`Could not parse ${constName}`)
  const direct = [...m[1].matchAll(/'([A-Z]{2})'/g)].map((x) => x[1])
  if (direct.length > 0) return direct
  const spreads = [...m[1].matchAll(/\.\.\.(\w+)/g)].map((x) => x[1])
  if (spreads.length === 0) throw new Error(`No ISO codes found in ${constName}`)
  return spreads.flatMap((name) => {
    if (!arrayContents[name]?.length) throw new Error(`Could not resolve spread ${name} in ${constName}`)
    return arrayContents[name]
  })
}

function office(fields) {
  const [
    name,
    phone,
    address,
    website,
    email,
    twitter,
    instagram,
    linkedin,
    formsUrl,
    checklistsUrl,
    registrationNumberLabel,
  ] = fields
  return `  office(
    '${esc(name)}',
    '${esc(phone)}',
    '${esc(address)}',
    '${esc(website)}',
    '${esc(email)}',
    '${esc(twitter)}',
    '${esc(instagram)}',
    '${esc(linkedin)}',
    '${esc(formsUrl)}',
    '${esc(checklistsUrl)}',
    '${esc(registrationNumberLabel)}',
  )`
}

function writeFormationFile(dir, { isoCodes, constName, isoType, isoImport, comment }) {
  let out = `import type { CorporationFormationOffice } from './types'
import type { ${isoType} } from './${isoImport}'

function office(
  name: string,
  phone: string,
  address: string,
  website: string,
  email: string,
  twitter: string,
  instagram: string,
  linkedin: string,
  formsUrl: string,
  checklistsUrl: string,
  registrationNumberLabel: string,
): CorporationFormationOffice {
  return {
    name,
    phone,
    address,
    website,
    email,
    twitter,
    instagram,
    linkedin,
    formsUrl,
    checklistsUrl,
    registrationNumberLabel,
  }
}

/**
 * National corporation / company formation office per ${comment}.
 * Informational; verify phone numbers, addresses, filing portals, checklists, social handles,
 * and registration-number taxonomy before production. Self-contained — no imports from other alliance modules.
 */
export const ${constName}: Record<${isoType}, CorporationFormationOffice> = {
`
  for (const iso of isoCodes) {
    const row = entries[iso]
    if (!row || row.length !== 11) throw new Error(`Missing corporation formation data for ${iso} (${dir})`)
    out += `  ${iso}: ${office(row)},\n`
  }
  out += `}\n`
  fs.writeFileSync(path.join(ROOT, dir, 'corporationFormationOfficesByIso.ts'), out)
}

function wireCountries(dir, prefix, skip) {
  const full = path.join(ROOT, dir)
  let count = 0
  for (const file of fs.readdirSync(full)) {
    if (!file.endsWith('.ts') || skip.has(file) || file.endsWith('ByIso.ts')) continue
    const fp = path.join(full, file)
    let src = fs.readFileSync(fp, 'utf8')
    if (src.includes(`${prefix}_CORPORATION_FORMATION_OFFICES`)) continue
    const bankingImport = `import { ${prefix}_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'\n`
    if (!src.includes(bankingImport)) throw new Error(`No national banking import in ${file}`)
    src = src.replace(
      bankingImport,
      `${bankingImport}import { ${prefix}_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'\n`,
    )
    const iso = src.match(/iso3166Alpha2: '([A-Z]{2})'/)[1]
    src = src.replace(
      `  nationalBankingInstitutions: ${prefix}_NATIONAL_BANKING_INSTITUTIONS['${iso}'],\n`,
      `  nationalBankingInstitutions: ${prefix}_NATIONAL_BANKING_INSTITUTIONS['${iso}'],\n  corporationFormationOffice: ${prefix}_CORPORATION_FORMATION_OFFICES['${iso}'],\n`,
    )
    fs.writeFileSync(fp, src)
    count++
  }
  console.log(`Wired ${count} files in ${dir}`)
}

const skipByIso = new Set([
  'index.ts',
  'types.ts',
  'corporationFormationOfficesByIso.ts',
  'nationalBankingInstitutionsByIso.ts',
  'domesticPostServicesByIso.ts',
  'domesticCouriersByIso.ts',
  'newsOutletsByIso.ts',
  'notableUniversitiesByIso.ts',
  'mainExportCommoditiesByIso.ts',
  'mainExportedElementsByIso.ts',
  'rareEarthsByIso.ts',
  'bondMarketsByIso.ts',
  'mainInternationalAirportsByIso.ts',
  'intellectualPropertyDepartmentsByIso.ts',
  'securitiesExchangeCommissionByIso.ts',
  'mainInternationalSeaportsByIso.ts',
])

const alliances = [
  {
    dir: 'allianceOfSahelStates',
    isoFile: 'aesMemberIsoCodes.ts',
    isoConst: 'AES_MEMBER_ISO_CODES',
    constName: 'AES_CORPORATION_FORMATION_OFFICES',
    isoType: 'AesMemberIsoCode',
    isoImport: 'aesMemberIsoCodes',
    prefix: 'AES',
    skip: ['aesMemberIsoCodes.ts'],
    comment: 'Alliance of Sahel States member',
  },
  {
    dir: 'AMU',
    isoFile: 'amuMemberIsoCodes.ts',
    isoConst: 'AMU_MEMBER_ISO_CODES',
    constName: 'AMU_CORPORATION_FORMATION_OFFICES',
    isoType: 'AmuMemberIsoCode',
    isoImport: 'amuMemberIsoCodes',
    prefix: 'AMU',
    skip: ['amuMemberIsoCodes.ts'],
    comment: 'AMU founding member',
  },
  {
    dir: 'APEC',
    isoFile: 'apecMemberIsoCodes.ts',
    isoConst: 'APEC_MEMBER_ISO_CODES',
    constName: 'APEC_CORPORATION_FORMATION_OFFICES',
    isoType: 'ApecMemberIsoCode',
    isoImport: 'apecMemberIsoCodes',
    prefix: 'APEC',
    skip: ['apecMemberIsoCodes.ts'],
    comment: 'APEC member economy',
  },
  {
    dir: 'arabLeague',
    isoFile: 'arabLeagueMemberIsoCodes.ts',
    isoConst: 'ARAB_LEAGUE_MEMBER_ISO_CODES',
    constName: 'ARAB_LEAGUE_CORPORATION_FORMATION_OFFICES',
    isoType: 'ArabLeagueMemberIsoCode',
    isoImport: 'arabLeagueMemberIsoCodes',
    prefix: 'ARAB_LEAGUE',
    skip: ['arabLeagueMemberIsoCodes.ts'],
    comment: 'Arab League member state',
  },
  {
    dir: 'ASEAN',
    isoFile: 'aseanMemberIsoCodes.ts',
    isoConst: 'ASEAN_MEMBER_ISO_CODES',
    constName: 'ASEAN_CORPORATION_FORMATION_OFFICES',
    isoType: 'AseanMemberIsoCode',
    isoImport: 'aseanMemberIsoCodes',
    prefix: 'ASEAN',
    skip: ['aseanMemberIsoCodes.ts'],
    comment: 'ASEAN member state',
  },
  {
    dir: 'beltAndRoadInitiative',
    isoFile: 'participantStatesIsoCodes.ts',
    isoConst: 'BELT_AND_ROAD_PARTICIPANT_ISO_CODES',
    constName: 'BRI_CORPORATION_FORMATION_OFFICES',
    isoType: 'BriMemberIsoCode',
    isoImport: 'participantStatesIsoCodes',
    prefix: 'BRI',
    skip: ['participantStatesIsoCodes.ts'],
    comment: 'Belt and Road participant economy',
  },
  {
    dir: 'BRICS',
    isoFile: 'bricsMemberIsoCodes.ts',
    isoConst: 'BRICS_MEMBER_ISO_CODES',
    constName: 'BRICS_CORPORATION_FORMATION_OFFICES',
    isoType: 'BricsMemberIsoCode',
    isoImport: 'bricsMemberIsoCodes',
    prefix: 'BRICS',
    skip: ['bricsMemberIsoCodes.ts'],
    comment: 'BRICS founding member',
  },
  {
    dir: 'britishCommonwealth',
    isoFile: 'commonwealthMemberIsoCodes.ts',
    isoConst: 'COMMONWEALTH_MEMBER_ISO_CODES',
    constName: 'COMMONWEALTH_CORPORATION_FORMATION_OFFICES',
    isoType: 'CommonwealthMemberIsoCode',
    isoImport: 'commonwealthMemberIsoCodes',
    prefix: 'COMMONWEALTH',
    skip: ['commonwealthMemberIsoCodes.ts'],
    comment: 'Commonwealth member state',
  },
  {
    dir: 'CARICOM',
    isoFile: 'caricomMemberIsoCodes.ts',
    isoConst: 'CARICOM_MEMBER_ISO_CODES',
    constName: 'CARICOM_CORPORATION_FORMATION_OFFICES',
    isoType: 'CaricomMemberIsoCode',
    isoImport: 'caricomMemberIsoCodes',
    prefix: 'CARICOM',
    skip: ['caricomMemberIsoCodes.ts'],
    comment: 'CARICOM member or associate territory',
  },
  {
    dir: 'CEN-SAD',
    isoFile: 'censadMemberIsoCodes.ts',
    isoConst: 'CENSAD_MEMBER_ISO_CODES',
    constName: 'CENSAD_CORPORATION_FORMATION_OFFICES',
    isoType: 'CensadMemberIsoCode',
    isoImport: 'censadMemberIsoCodes',
    prefix: 'CENSAD',
    skip: ['censadMemberIsoCodes.ts'],
    comment: 'CEN-SAD member state',
  },
  {
    dir: 'COMESA',
    isoFile: 'comesaMemberIsoCodes.ts',
    isoConst: 'COMESA_MEMBER_ISO_CODES',
    constName: 'COMESA_CORPORATION_FORMATION_OFFICES',
    isoType: 'ComesaMemberIsoCode',
    isoImport: 'comesaMemberIsoCodes',
    prefix: 'COMESA',
    skip: ['comesaMemberIsoCodes.ts'],
    comment: 'COMESA member state',
  },
  {
    dir: 'CPTPP',
    isoFile: 'cptppMemberIsoCodes.ts',
    isoConst: 'CPTPP_MEMBER_ISO_CODES',
    constName: 'CPTPP_CORPORATION_FORMATION_OFFICES',
    isoType: 'CptppMemberIsoCode',
    isoImport: 'cptppMemberIsoCodes',
    prefix: 'CPTPP',
    skip: ['cptppMemberIsoCodes.ts'],
    comment: 'CPTPP party economy',
  },
  {
    dir: 'EAC',
    isoFile: 'eacMemberIsoCodes.ts',
    isoConst: 'EAC_MEMBER_ISO_CODES',
    constName: 'EAC_CORPORATION_FORMATION_OFFICES',
    isoType: 'EacMemberIsoCode',
    isoImport: 'eacMemberIsoCodes',
    prefix: 'EAC',
    skip: ['eacMemberIsoCodes.ts'],
    comment: 'EAC partner state',
  },
  {
    dir: 'ECCAS',
    isoFile: 'eccasMemberIsoCodes.ts',
    isoConst: 'ECCAS_MEMBER_ISO_CODES',
    constName: 'ECCAS_CORPORATION_FORMATION_OFFICES',
    isoType: 'EccasMemberIsoCode',
    isoImport: 'eccasMemberIsoCodes',
    prefix: 'ECCAS',
    skip: ['eccasMemberIsoCodes.ts'],
    comment: 'ECCAS partner state',
  },
  {
    dir: 'ECOWAS',
    isoFile: 'ecowasMemberIsoCodes.ts',
    isoConst: 'ECOWAS_MEMBER_ISO_CODES',
    constName: 'ECOWAS_CORPORATION_FORMATION_OFFICES',
    isoType: 'EcowasMemberIsoCode',
    isoImport: 'ecowasMemberIsoCodes',
    prefix: 'ECOWAS',
    skip: ['ecowasMemberIsoCodes.ts'],
    comment: 'ECOWAS member state',
  },
  {
    dir: 'EU',
    isoFile: 'euMemberIsoCodes.ts',
    isoConst: 'EU_MEMBER_ISO_CODES',
    constName: 'EU_CORPORATION_FORMATION_OFFICES',
    isoType: 'EuMemberIsoCode',
    isoImport: 'euMemberIsoCodes',
    prefix: 'EU',
    skip: ['euMemberIsoCodes.ts'],
    comment: 'EU member state',
  },
  {
    dir: 'fiveEyes',
    isoFile: 'fiveEyesMemberIsoCodes.ts',
    isoConst: 'FIVE_EYES_MEMBER_ISO_CODES',
    constName: 'FIVE_EYES_CORPORATION_FORMATION_OFFICES',
    isoType: 'FiveEyesMemberIsoCode',
    isoImport: 'fiveEyesMemberIsoCodes',
    prefix: 'FIVE_EYES',
    skip: ['fiveEyesMemberIsoCodes.ts'],
    comment: 'Five Eyes member state',
  },
  {
    dir: 'G7',
    isoFile: 'g7MemberIsoCodes.ts',
    isoConst: 'G7_MEMBER_ISO_CODES',
    constName: 'G7_CORPORATION_FORMATION_OFFICES',
    isoType: 'G7MemberIsoCode',
    isoImport: 'g7MemberIsoCodes',
    prefix: 'G7',
    skip: ['g7MemberIsoCodes.ts'],
    comment: 'G7 member state',
  },
  {
    dir: 'G20',
    isoFile: 'g20MemberIsoCodes.ts',
    isoConst: 'G20_SOVEREIGN_MEMBER_ISO_CODES',
    constName: 'G20_CORPORATION_FORMATION_OFFICES',
    isoType: 'G20SovereignMemberIsoCode',
    isoImport: 'g20MemberIsoCodes',
    prefix: 'G20',
    skip: ['g20MemberIsoCodes.ts', 'africanUnion.ts', 'europeanUnion.ts'],
    comment: 'G20 sovereign member state',
  },
  {
    dir: 'GCC',
    isoFile: 'gccMemberIsoCodes.ts',
    isoConst: 'GCC_MEMBER_ISO_CODES',
    constName: 'GCC_CORPORATION_FORMATION_OFFICES',
    isoType: 'GccMemberIsoCode',
    isoImport: 'gccMemberIsoCodes',
    prefix: 'GCC',
    skip: ['gccMemberIsoCodes.ts'],
    comment: 'GCC member state',
  },
  {
    dir: 'IGAD',
    isoFile: 'igadMemberIsoCodes.ts',
    isoConst: 'IGAD_MEMBER_ISO_CODES',
    constName: 'IGAD_CORPORATION_FORMATION_OFFICES',
    isoType: 'IgadMemberIsoCode',
    isoImport: 'igadMemberIsoCodes',
    prefix: 'IGAD',
    skip: ['igadMemberIsoCodes.ts'],
    comment: 'IGAD member state',
  },
  {
    dir: 'IORA',
    isoFile: 'ioraMemberIsoCodes.ts',
    isoConst: 'IORA_MEMBER_ISO_CODES',
    constName: 'IORA_CORPORATION_FORMATION_OFFICES',
    isoType: 'IoraMemberIsoCode',
    isoImport: 'ioraMemberIsoCodes',
    prefix: 'IORA',
    skip: ['ioraMemberIsoCodes.ts'],
    comment: 'IORA member state',
  },
  {
    dir: 'MIKTA',
    isoFile: 'miktaMemberIsoCodes.ts',
    isoConst: 'MIKTA_MEMBER_ISO_CODES',
    constName: 'MIKTA_CORPORATION_FORMATION_OFFICES',
    isoType: 'MiktaMemberIsoCode',
    isoImport: 'miktaMemberIsoCodes',
    prefix: 'MIKTA',
    skip: ['miktaMemberIsoCodes.ts'],
    comment: 'MIKTA member state',
  },
  {
    dir: 'MINT',
    isoFile: 'mintMemberIsoCodes.ts',
    isoConst: 'MINT_MEMBER_ISO_CODES',
    constName: 'MINT_CORPORATION_FORMATION_OFFICES',
    isoType: 'MintMemberIsoCode',
    isoImport: 'mintMemberIsoCodes',
    prefix: 'MINT',
    skip: ['mintMemberIsoCodes.ts'],
    comment: 'MINT member state',
  },
  {
    dir: 'NATO',
    isoFile: 'natoMemberIsoCodes.ts',
    isoConst: 'NATO_MEMBER_ISO_CODES',
    constName: 'NATO_CORPORATION_FORMATION_OFFICES',
    isoType: 'NatoMemberIsoCode',
    isoImport: 'natoMemberIsoCodes',
    prefix: 'NATO',
    skip: ['natoMemberIsoCodes.ts'],
    comment: 'NATO Ally state',
  },
  {
    dir: 'OECD',
    isoFile: 'oecdMemberIsoCodes.ts',
    isoConst: 'OECD_MEMBER_ISO_CODES',
    constName: 'OECD_CORPORATION_FORMATION_OFFICES',
    isoType: 'OecdMemberIsoCode',
    isoImport: 'oecdMemberIsoCodes',
    prefix: 'OECD',
    skip: ['oecdMemberIsoCodes.ts'],
    comment: 'OECD member economy',
  },
  {
    dir: 'OECS',
    isoFile: 'oecsMemberIsoCodes.ts',
    isoConst: 'OECS_MEMBER_ISO_CODES',
    constName: 'OECS_CORPORATION_FORMATION_OFFICES',
    isoType: 'OecsMemberIsoCode',
    isoImport: 'oecsMemberIsoCodes',
    prefix: 'OECS',
    skip: ['oecsMemberIsoCodes.ts'],
    comment: 'OECS member or associate territory',
  },
  {
    dir: 'OPEC',
    isoFile: 'opecMemberIsoCodes.ts',
    isoConst: 'OPEC_MEMBER_ISO_CODES',
    constName: 'OPEC_CORPORATION_FORMATION_OFFICES',
    isoType: 'OpecMemberIsoCode',
    isoImport: 'opecMemberIsoCodes',
    prefix: 'OPEC',
    skip: ['opecMemberIsoCodes.ts'],
    comment: 'OPEC member state',
  },
  {
    dir: 'RCEP',
    isoFile: 'rcepMemberIsoCodes.ts',
    isoConst: 'RCEP_MEMBER_ISO_CODES',
    constName: 'RCEP_CORPORATION_FORMATION_OFFICES',
    isoType: 'RcepMemberIsoCode',
    isoImport: 'rcepMemberIsoCodes',
    prefix: 'RCEP',
    skip: ['rcepMemberIsoCodes.ts'],
    comment: 'RCEP party economy',
  },
  {
    dir: 'SADC',
    isoFile: 'sadcMemberIsoCodes.ts',
    isoConst: 'SADC_MEMBER_ISO_CODES',
    constName: 'SADC_CORPORATION_FORMATION_OFFICES',
    isoType: 'SadcMemberIsoCode',
    isoImport: 'sadcMemberIsoCodes',
    prefix: 'SADC',
    skip: ['sadcMemberIsoCodes.ts'],
    comment: 'SADC member state',
  },
]

for (const a of alliances) {
  const isoCodes = readIsoCodes(`${a.dir}/${a.isoFile}`, a.isoConst)
  for (const iso of isoCodes) {
    if (!entries[iso]) throw new Error(`Still missing corporation formation entry for ${iso} (${a.dir})`)
  }
  writeFormationFile(a.dir, {
    isoCodes,
    constName: a.constName,
    isoType: a.isoType,
    isoImport: a.isoImport,
    comment: a.comment,
  })
  wireCountries(a.dir, a.prefix, new Set([...skipByIso, ...a.skip]))
}

console.log('Done')
