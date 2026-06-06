import type { IgadMemberIsoCode } from './igadMemberIsoCodes'
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
 * Intellectual property competent offices by ISO 3166-1 alpha-2 for Intergovernmental Authority
 * on Development (IGAD) members in this module (informational; verify URLs, handles, forms
 * portals, and API bases before production use). Self-contained — no imports from other alliance
 * modules. `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.wipo.int/en/web/country-profiles/directory-ip-offices
 */
export const IGAD_INTELLECTUAL_PROPERTY_DEPARTMENTS: Record<
  IgadMemberIsoCode,
  IntellectualPropertyDepartmentsRoster
> = {
  DJ: roster(
    ip(
      'copyright',
      'Ministry of Culture and Communication — copyright (Djibouti)',
      'https://www.communication.gouv.dj',
      '',
      '',
      '',
      'https://www.communication.gouv.dj',
    ),
    ip(
      'trademarks',
      'Ministry of Economy and Finance — industrial property (Djibouti)',
      'https://www.finances.gouv.dj',
      '',
      '',
      '',
      'https://www.finances.gouv.dj',
    ),
    ip(
      'patents',
      'Ministry of Economy and Finance — industrial property (Djibouti)',
      'https://www.finances.gouv.dj',
      '',
      '',
      '',
      'https://www.finances.gouv.dj',
    ),
  ),
  ET: roster(
    ip(
      'copyright',
      'Ethiopian Intellectual Property Authority — copyright',
      'https://www.eipa.gov.et',
      'info@eipa.gov.et',
      '',
      '',
      'https://www.eipa.gov.et',
    ),
    ip(
      'trademarks',
      'Ethiopian Intellectual Property Authority (EIPA)',
      'https://www.eipa.gov.et',
      'info@eipa.gov.et',
      '',
      '',
      'https://www.eipa.gov.et',
    ),
    ip(
      'patents',
      'Ethiopian Intellectual Property Authority (EIPA)',
      'https://www.eipa.gov.et',
      'info@eipa.gov.et',
      '',
      '',
      'https://www.eipa.gov.et',
    ),
  ),
  SO: roster(
    ip(
      'copyright',
      'Ministry of Information, Culture and Tourism — copyright (Somalia)',
      'https://www.mict.gov.so',
      '',
      '',
      '',
      'https://www.mict.gov.so',
    ),
    ip(
      'trademarks',
      'Ministry of Commerce and Industry — industrial property (Somalia)',
      'https://www.moci.gov.so',
      '',
      '',
      '',
      'https://www.moci.gov.so',
    ),
    ip(
      'patents',
      'Ministry of Commerce and Industry — industrial property (Somalia)',
      'https://www.moci.gov.so',
      '',
      '',
      '',
      'https://www.moci.gov.so',
    ),
  ),
  SS: roster(
    ip(
      'copyright',
      'Ministry of Culture, Museums and National Heritage — copyright (South Sudan)',
      'https://www.mc.gov.ss',
      '',
      '',
      '',
      'https://www.mc.gov.ss',
    ),
    ip(
      'trademarks',
      'Ministry of Justice — industrial property (South Sudan; verify locally)',
      'https://www.moj.gov.ss',
      '',
      '',
      '',
      'https://www.moj.gov.ss',
    ),
    ip(
      'patents',
      'Ministry of Justice — industrial property (South Sudan; verify locally)',
      'https://www.moj.gov.ss',
      '',
      '',
      '',
      'https://www.moj.gov.ss',
    ),
  ),
  SD: roster(
    ip(
      'copyright',
      'Sudan Copyright Office (Ministry of Culture)',
      'https://www.moc.gov.sd',
      '',
      '',
      '',
      'https://www.moc.gov.sd',
    ),
    ip(
      'trademarks',
      'Registrar General of Patents, Designs and Trademarks (Sudan)',
      'https://www.mot.gov.sd',
      '',
      '',
      '',
      'https://www.mot.gov.sd',
    ),
    ip(
      'patents',
      'Registrar General of Patents, Designs and Trademarks (Sudan)',
      'https://www.mot.gov.sd',
      '',
      '',
      '',
      'https://www.mot.gov.sd',
    ),
  ),
  KE: roster(
    ip(
      'copyright',
      'Kenya Copyright Board (KECOBO)',
      'https://www.copyright.go.ke',
      'info@copyright.go.ke',
      'https://x.com/KECOBO',
      'https://www.linkedin.com/company/kenya-copyright-board/',
      'https://www.copyright.go.ke',
    ),
    ip(
      'trademarks',
      'Kenya Industrial Property Institute (KIPI)',
      'https://www.kipi.go.ke',
      'info@kipi.go.ke',
      'https://x.com/KIPI_Kenya',
      'https://www.linkedin.com/company/kenya-industrial-property-institute/',
      'https://www.kipi.go.ke',
    ),
    ip(
      'patents',
      'Kenya Industrial Property Institute (KIPI)',
      'https://www.kipi.go.ke',
      'info@kipi.go.ke',
      'https://x.com/KIPI_Kenya',
      'https://www.linkedin.com/company/kenya-industrial-property-institute/',
      'https://www.kipi.go.ke',
    ),
  ),
  UG: roster(
    ip(
      'copyright',
      'Uganda Registration Services Bureau — Copyright Registry',
      'https://www.ursb.go.ug',
      'info@ursb.go.ug',
      '',
      'https://www.linkedin.com/company/uganda-registration-services-bureau/',
      'https://www.ursb.go.ug',
    ),
    ip(
      'trademarks',
      'Uganda Registration Services Bureau (URSB) — Industrial Property',
      'https://www.ursb.go.ug',
      'info@ursb.go.ug',
      '',
      'https://www.linkedin.com/company/uganda-registration-services-bureau/',
      'https://www.ursb.go.ug',
    ),
    ip(
      'patents',
      'Uganda Registration Services Bureau (URSB) — Industrial Property',
      'https://www.ursb.go.ug',
      'info@ursb.go.ug',
      '',
      'https://www.linkedin.com/company/uganda-registration-services-bureau/',
      'https://www.ursb.go.ug',
    ),
  ),
}
