import fs from 'fs'
import path from 'path'
import { AU_NATIONAL_BANKING_DATA } from './data/auNationalBankingByIso.mjs'

const ROOT = 'src/lib/cores/alliancesCore/africanUnion'
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

function readIsoCodes() {
  const src = fs.readFileSync(path.join(ROOT, 'auMemberIsoCodes.ts'), 'utf8')
  const m = src.match(/export const AU_MEMBER_ISO_CODES = \[([\s\S]*?)\] as const/)
  if (!m) throw new Error('Could not parse AU_MEMBER_ISO_CODES')
  return [...m[1].matchAll(/'([A-Z]{2})'/g)].map((x) => x[1])
}

function bank(fields) {
  const [
    name,
    phone,
    address,
    mobileAppIos,
    mobileAppAndroid,
    website,
    email,
    twitter,
    instagram,
    linkedin,
    generalRoutingNumber,
    swiftCode,
    apiEndpoint,
  ] = fields
  return `    bank(
      '${esc(name)}',
      '${esc(phone)}',
      '${esc(address)}',
      '${esc(mobileAppIos)}',
      '${esc(mobileAppAndroid)}',
      '${esc(website)}',
      '${esc(email)}',
      '${esc(twitter)}',
      '${esc(instagram)}',
      '${esc(linkedin)}',
      '${esc(generalRoutingNumber)}',
      '${esc(swiftCode)}',
      '${esc(apiEndpoint)}',
    )`
}

let out = `import type { NationalBankingInstitution } from './types'
import type { AuMemberIsoCode } from './auMemberIsoCodes'

function bank(
  name: string,
  phone: string,
  address: string,
  mobileAppIos: string,
  mobileAppAndroid: string,
  website: string,
  email: string,
  twitter: string,
  instagram: string,
  linkedin: string,
  generalRoutingNumber: string,
  swiftCode: string,
  apiEndpoint: string,
): NationalBankingInstitution {
  return {
    name,
    phone,
    address,
    mobileAppIos,
    mobileAppAndroid,
    website,
    email,
    twitter,
    instagram,
    linkedin,
    generalRoutingNumber,
    swiftCode,
    apiEndpoint,
  }
}

/**
 * Three main national banking institutions per African Union member state — retail and commercial
 * banks commonly used by citizens and foreign nationals. Informational; verify phone numbers,
 * branch addresses, routing codes, SWIFT/BIC, mobile apps, social handles, and API bases before production.
 * Self-contained — no imports from other alliance modules.
 */
export const AU_NATIONAL_BANKING_INSTITUTIONS: Record<
  AuMemberIsoCode,
  readonly [NationalBankingInstitution, NationalBankingInstitution, NationalBankingInstitution]
> = {
`

const isoCodes = readIsoCodes()
for (const iso of isoCodes) {
  const banks = AU_NATIONAL_BANKING_DATA[iso]
  if (!banks || banks.length !== 3) throw new Error(`Missing or invalid bank data for ${iso}`)
  for (const b of banks) {
    if (b.length !== 13) throw new Error(`Bank entry for ${iso} must have 13 fields`)
  }
  out += `  ${iso}: [\n${banks.map(bank).join(',\n')},\n  ],\n`
}
out += `}\n`

fs.writeFileSync(path.join(ROOT, 'nationalBankingInstitutionsByIso.ts'), out)

const skip = new Set([
  'index.ts',
  'types.ts',
  'auMemberIsoCodes.ts',
  'domesticCouriersByIso.ts',
  'domesticPostServicesByIso.ts',
  'nationalBankingInstitutionsByIso.ts',
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
  if (src.includes('AU_NATIONAL_BANKING_INSTITUTIONS')) continue
  const postImport = `import { AU_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'\n`
  if (!src.includes(postImport)) throw new Error(`No domestic post import in ${file}`)
  src = src.replace(
    postImport,
    `${postImport}import { AU_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'\n`,
  )
  const iso = src.match(/iso3166Alpha2: '([A-Z]{2})'/)[1]
  src = src.replace(
    `  domesticPostService: AU_DOMESTIC_POST_SERVICES['${iso}'],\n`,
    `  domesticPostService: AU_DOMESTIC_POST_SERVICES['${iso}'],\n  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['${iso}'],\n`,
  )
  fs.writeFileSync(fp, src)
  wired++
}

console.log(`Wrote nationalBankingInstitutionsByIso.ts (${isoCodes.length} economies)`)
console.log(`Wired ${wired} country files`)
