import type { FiveEyesMemberIsoCode } from './fiveEyesMemberIsoCodes'
import type {
  IntellectualPropertyDepartment,
  IntellectualPropertyDepartmentKind,
  IntellectualPropertyDepartmentsRoster,
} from './types'

function ip(
  kind: IntellectualPropertyDepartmentKind,
  name: string,
  website: string,
  email: string,
  twitter: string,
  linkedin: string,
  formsUrl: string,
  apiEndpoint = '',
): IntellectualPropertyDepartment {
  return { kind, name, website, email, twitter, linkedin, formsUrl, apiEndpoint }
}

function roster(
  copyright: IntellectualPropertyDepartment,
  trademarks: IntellectualPropertyDepartment,
  patents: IntellectualPropertyDepartment,
): IntellectualPropertyDepartmentsRoster {
  return { copyright, trademarks, patents }
}

/**
 * Intellectual property competent offices by ISO 3166-1 alpha-2 for Five Eyes alliance
 * members (informational; verify URLs, handles, forms portals, and API bases before production
 * use). Self-contained — no imports from other alliance modules. `apiEndpoint` is almost
 * always empty. Verify periodically:
 * https://www.wipo.int/en/web/country-profiles/directory-ip-offices
 */
export const FIVE_EYES_INTELLECTUAL_PROPERTY_DEPARTMENTS: Record<
  FiveEyesMemberIsoCode,
  IntellectualPropertyDepartmentsRoster
> = {
  AU: roster(
    ip(
      'copyright',
      'Australian Government — Attorney-General\'s Department (Copyright)',
      'https://www.ag.gov.au/rights-and-protections/copyright',
      '',
      '',
      '',
      'https://www.ag.gov.au/rights-and-protections/copyright',
    ),
    ip(
      'trademarks',
      'IP Australia',
      'https://www.ipaustralia.gov.au',
      'ipaustralia@ipaustralia.gov.au',
      'https://x.com/IPAustralia',
      'https://www.linkedin.com/company/ip-australia/',
      'https://www.ipaustralia.gov.au/apply-online',
    ),
    ip(
      'patents',
      'IP Australia',
      'https://www.ipaustralia.gov.au',
      'ipaustralia@ipaustralia.gov.au',
      'https://x.com/IPAustralia',
      'https://www.linkedin.com/company/ip-australia/',
      'https://www.ipaustralia.gov.au/apply-online',
    ),
  ),
  CA: roster(
    ip(
      'copyright',
      'Canadian Intellectual Property Office (CIPO) — copyright',
      'https://ised-isde.canada.ca/cipo',
      'cipo-opic@canada.ca',
      'https://x.com/CIPOCanada',
      'https://www.linkedin.com/company/canadian-intellectual-property-office/',
      'https://ised-isde.canada.ca/cipo/en/learn-how-to/forms-and-fees.html',
    ),
    ip(
      'trademarks',
      'Canadian Intellectual Property Office (CIPO)',
      'https://ised-isde.canada.ca/cipo',
      'cipo-opic@canada.ca',
      'https://x.com/CIPOCanada',
      'https://www.linkedin.com/company/canadian-intellectual-property-office/',
      'https://ised-isde.canada.ca/cipo/en/learn-how-to/forms-and-fees.html',
    ),
    ip(
      'patents',
      'Canadian Intellectual Property Office (CIPO)',
      'https://ised-isde.canada.ca/cipo',
      'cipo-opic@canada.ca',
      'https://x.com/CIPOCanada',
      'https://www.linkedin.com/company/canadian-intellectual-property-office/',
      'https://ised-isde.canada.ca/cipo/en/learn-how-to/forms-and-fees.html',
    ),
  ),
  NZ: roster(
    ip(
      'copyright',
      'Manatū Taonga — Ministry for Culture and Heritage (Copyright)',
      'https://www.mch.govt.nz',
      'info@mch.govt.nz',
      '',
      '',
      'https://www.mch.govt.nz/copyright',
    ),
    ip(
      'trademarks',
      'Intellectual Property Office of New Zealand (IPONZ)',
      'https://www.iponz.govt.nz',
      'iponz@mbie.govt.nz',
      '',
      'https://www.linkedin.com/company/intellectual-property-office-of-new-zealand/',
      'https://www.iponz.govt.nz/about-iponz/online-services',
    ),
    ip(
      'patents',
      'Intellectual Property Office of New Zealand (IPONZ)',
      'https://www.iponz.govt.nz',
      'iponz@mbie.govt.nz',
      '',
      'https://www.linkedin.com/company/intellectual-property-office-of-new-zealand/',
      'https://www.iponz.govt.nz/about-iponz/online-services',
    ),
  ),
  GB: roster(
    ip(
      'copyright',
      'Intellectual Property Office (UK) — copyright guidance',
      'https://www.gov.uk/government/organisations/intellectual-property-office',
      'enquiries@ipo.gov.uk',
      'https://x.com/The_IPO',
      'https://www.linkedin.com/company/intellectual-property-office/',
      'https://www.gov.uk/government/organisations/intellectual-property-office',
    ),
    ip(
      'trademarks',
      'Intellectual Property Office (UK)',
      'https://www.gov.uk/government/organisations/intellectual-property-office',
      'enquiries@ipo.gov.uk',
      'https://x.com/The_IPO',
      'https://www.linkedin.com/company/intellectual-property-office/',
      'https://www.gov.uk/government/organisations/intellectual-property-office',
    ),
    ip(
      'patents',
      'Intellectual Property Office (UK)',
      'https://www.gov.uk/government/organisations/intellectual-property-office',
      'enquiries@ipo.gov.uk',
      'https://x.com/The_IPO',
      'https://www.linkedin.com/company/intellectual-property-office/',
      'https://www.gov.uk/government/organisations/intellectual-property-office',
    ),
  ),
  US: roster(
    ip(
      'copyright',
      'U.S. Copyright Office',
      'https://www.copyright.gov',
      '',
      'https://x.com/CopyrightOffice',
      'https://www.linkedin.com/company/us-copyright-office/',
      'https://www.copyright.gov/registration/',
    ),
    ip(
      'trademarks',
      'United States Patent and Trademark Office (USPTO)',
      'https://www.uspto.gov',
      '',
      'https://x.com/uspto',
      'https://www.linkedin.com/company/uspto/',
      'https://www.uspto.gov/apply',
      'https://developer.uspto.gov/',
    ),
    ip(
      'patents',
      'United States Patent and Trademark Office (USPTO)',
      'https://www.uspto.gov',
      '',
      'https://x.com/uspto',
      'https://www.linkedin.com/company/uspto/',
      'https://www.uspto.gov/apply',
      'https://developer.uspto.gov/',
    ),
  ),
}
