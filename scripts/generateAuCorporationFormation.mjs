import fs from 'fs'
import path from 'path'
import { AU_CORPORATION_FORMATION_DATA } from './data/auCorporationFormationByIso.mjs'

const ROOT = 'src/lib/cores/alliancesCore/africanUnion'
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

function readIsoCodes() {
  const src = fs.readFileSync(path.join(ROOT, 'auMemberIsoCodes.ts'), 'utf8')
  const m = src.match(/export const AU_MEMBER_ISO_CODES = \[([\s\S]*?)\] as const/)
  if (!m) throw new Error('Could not parse AU_MEMBER_ISO_CODES')
  return [...m[1].matchAll(/'([A-Z]{2})'/g)].map((x) => x[1])
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

let out = `import type { CorporationFormationOffice } from './types'
import type { AuMemberIsoCode } from './auMemberIsoCodes'

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
 * National corporation / company formation office per African Union member state.
 * Informational; verify phone numbers, addresses, filing portals, checklists, social handles,
 * and registration-number taxonomy before production. Self-contained — no imports from other alliance modules.
 */
export const AU_CORPORATION_FORMATION_OFFICES: Record<AuMemberIsoCode, CorporationFormationOffice> = {
`

const isoCodes = readIsoCodes()
for (const iso of isoCodes) {
  const row = AU_CORPORATION_FORMATION_DATA[iso]
  if (!row || row.length !== 11) throw new Error(`Missing or invalid corporation formation data for ${iso}`)
  out += `  ${iso}: ${office(row)},\n`
}
out += `}\n`

fs.writeFileSync(path.join(ROOT, 'corporationFormationOfficesByIso.ts'), out)

const skip = new Set([
  'index.ts',
  'types.ts',
  'auMemberIsoCodes.ts',
  'domesticCouriersByIso.ts',
  'domesticPostServicesByIso.ts',
  'nationalBankingInstitutionsByIso.ts',
  'corporationFormationOfficesByIso.ts',
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

let wired = 0
for (const file of fs.readdirSync(ROOT)) {
  if (!file.endsWith('.ts') || skip.has(file)) continue
  const fp = path.join(ROOT, file)
  let src = fs.readFileSync(fp, 'utf8')
  if (src.includes('AU_CORPORATION_FORMATION_OFFICES')) continue
  const bankingImport = `import { AU_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'\n`
  if (!src.includes(bankingImport)) throw new Error(`No national banking import in ${file}`)
  src = src.replace(
    bankingImport,
    `${bankingImport}import { AU_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'\n`,
  )
  const iso = src.match(/iso3166Alpha2: '([A-Z]{2})'/)[1]
  src = src.replace(
    `  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['${iso}'],\n`,
    `  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['${iso}'],\n  corporationFormationOffice: AU_CORPORATION_FORMATION_OFFICES['${iso}'],\n`,
  )
  fs.writeFileSync(fp, src)
  wired++
}

console.log(`Wrote corporationFormationOfficesByIso.ts (${isoCodes.length} economies)`)
console.log(`Wired ${wired} country files`)
