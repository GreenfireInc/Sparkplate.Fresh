import fs from 'fs'
import path from 'path'
import { AU_NATIONAL_BANKING_DATA } from './data/auNationalBankingByIso.mjs'

const ROOT = 'src/lib/cores/alliancesCore/allianceOfSahelStates'
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

const isoCodes = ['BF', 'ML', 'NE']

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
import type { AesMemberIsoCode } from './aesMemberIsoCodes'

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
 * Three main national banking institutions per AES founding member — retail and commercial
 * banks commonly used by citizens and foreign nationals. Informational; verify phone numbers,
 * branch addresses, routing codes, SWIFT/BIC, mobile apps, social handles, and API bases before production.
 * Self-contained — no imports from other alliance modules.
 */
export const AES_NATIONAL_BANKING_INSTITUTIONS: Record<
  AesMemberIsoCode,
  readonly [NationalBankingInstitution, NationalBankingInstitution, NationalBankingInstitution]
> = {
`

for (const iso of isoCodes) {
  const banks = AU_NATIONAL_BANKING_DATA[iso]
  if (!banks || banks.length !== 3) throw new Error(`Missing bank data for ${iso}`)
  out += `  ${iso}: [\n${banks.map(bank).join(',\n')},\n  ],\n`
}
out += `}\n`

fs.writeFileSync(path.join(ROOT, 'nationalBankingInstitutionsByIso.ts'), out)
console.log('Wrote AES nationalBankingInstitutionsByIso.ts')
