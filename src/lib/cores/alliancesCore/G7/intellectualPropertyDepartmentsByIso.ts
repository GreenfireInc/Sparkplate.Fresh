import type { G7MemberIsoCode } from './g7MemberIsoCodes'
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
 * Intellectual property competent offices by ISO 3166-1 alpha-2 for Group of Seven (G7)
 * members (informational; verify URLs, handles, forms portals, and API bases before production
 * use). Self-contained — no imports from other alliance modules. `apiEndpoint` is almost
 * always empty. Verify periodically:
 * https://www.wipo.int/en/web/country-profiles/directory-ip-offices
 */
export const G7_INTELLECTUAL_PROPERTY_DEPARTMENTS: Record<
  G7MemberIsoCode,
  IntellectualPropertyDepartmentsRoster
> = {
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
  FR: roster(
    ip(
      'copyright',
      'Ministry of Culture (France) — copyright',
      'https://www.culture.gouv.fr',
      '',
      '',
      '',
      'https://www.culture.gouv.fr',
    ),
    ip(
      'trademarks',
      'National Institute of Industrial Property (INPI France)',
      'https://www.inpi.fr',
      'contact@inpi.fr',
      'https://x.com/INPIfr',
      'https://www.linkedin.com/company/inpi/',
      'https://www.inpi.fr/fr/services-et-prestations',
    ),
    ip(
      'patents',
      'National Institute of Industrial Property (INPI France)',
      'https://www.inpi.fr',
      'contact@inpi.fr',
      'https://x.com/INPIfr',
      'https://www.linkedin.com/company/inpi/',
      'https://www.inpi.fr/fr/services-et-prestations',
    ),
  ),
  DE: roster(
    ip(
      'copyright',
      'German Patent and Trade Mark Office (DPMA) — copyright liaison',
      'https://www.dpma.de',
      '',
      '',
      '',
      'https://www.dpma.de',
    ),
    ip(
      'trademarks',
      'German Patent and Trade Mark Office (DPMA)',
      'https://www.dpma.de',
      'poststelle@dpma.de',
      '',
      'https://www.linkedin.com/company/dpma/',
      'https://www.dpma.de/english/services/index.html',
    ),
    ip(
      'patents',
      'German Patent and Trade Mark Office (DPMA)',
      'https://www.dpma.de',
      'poststelle@dpma.de',
      '',
      'https://www.linkedin.com/company/dpma/',
      'https://www.dpma.de/english/services/index.html',
    ),
  ),
  IT: roster(
    ip(
      'copyright',
      'Ministry of Culture — copyright (Italy)',
      'https://www.beniculturali.it',
      '',
      '',
      '',
      'https://www.uibm.gov.it',
    ),
    ip(
      'trademarks',
      'Italian Patent and Trademark Office (UIBM)',
      'https://www.uibm.gov.it',
      '',
      '',
      '',
      'https://www.uibm.gov.it',
    ),
    ip(
      'patents',
      'Italian Patent and Trademark Office (UIBM)',
      'https://www.uibm.gov.it',
      '',
      '',
      '',
      'https://www.uibm.gov.it',
    ),
  ),
  JP: roster(
    ip(
      'copyright',
      'Agency for Cultural Affairs (Government of Japan — Copyright)',
      'https://www.bunka.go.jp/english/',
      '',
      '',
      '',
      'https://www.bunka.go.jp/english/copyright/index.html',
    ),
    ip(
      'trademarks',
      'Japan Patent Office (JPO)',
      'https://www.jpo.go.jp',
      '',
      '',
      '',
      'https://www.j-platpat.inpit.go.jp/',
    ),
    ip(
      'patents',
      'Japan Patent Office (JPO)',
      'https://www.jpo.go.jp',
      '',
      '',
      '',
      'https://www.j-platpat.inpit.go.jp/',
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
