import type { EacMemberIsoCode } from './eacMemberIsoCodes'
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
 * Intellectual property competent offices by ISO 3166-1 alpha-2 for East African Community (EAC)
 * members in this module (informational; verify URLs, handles, forms portals, and API bases
 * before production use). Self-contained — no imports from other alliance modules.
 * `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.wipo.int/en/web/country-profiles/directory-ip-offices
 */
export const EAC_INTELLECTUAL_PROPERTY_DEPARTMENTS: Record<
  EacMemberIsoCode,
  IntellectualPropertyDepartmentsRoster
> = {
  BI: roster(
    ip(
      'copyright',
      'Office Burundais des Droits d\'Auteur (OBDA)',
      'https://www.obda.bi',
      '',
      '',
      '',
      'https://www.obda.bi',
    ),
    ip(
      'trademarks',
      'Office Burundais de la Propriété Intellectuelle (OBPI)',
      'https://www.obpi.bi',
      '',
      '',
      '',
      'https://www.obpi.bi',
    ),
    ip(
      'patents',
      'Office Burundais de la Propriété Intellectuelle (OBPI)',
      'https://www.obpi.bi',
      '',
      '',
      '',
      'https://www.obpi.bi',
    ),
  ),
  CD: roster(
    ip(
      'copyright',
      'Office Congolais des Droits d\'Auteur (OCADA)',
      'https://www.ocada.cd',
      '',
      '',
      '',
      'https://www.ocada.cd',
    ),
    ip(
      'trademarks',
      'Office Congolais de la Propriété Intellectuelle (OCPI)',
      'https://www.ocpi.cd',
      'info@ocpi.cd',
      '',
      '',
      'https://www.ocpi.cd',
    ),
    ip(
      'patents',
      'Office Congolais de la Propriété Intellectuelle (OCPI)',
      'https://www.ocpi.cd',
      'info@ocpi.cd',
      '',
      '',
      'https://www.ocpi.cd',
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
  RW: roster(
    ip(
      'copyright',
      'Rwanda Society of Authors (RSAU)',
      'https://www.rsau.rw',
      'info@rsau.rw',
      '',
      '',
      'https://www.rsau.rw',
    ),
    ip(
      'trademarks',
      'Rwanda Development Board — Intellectual Property',
      'https://www.rdb.rw',
      'info@rdb.rw',
      'https://x.com/RwandaDevBoard',
      'https://www.linkedin.com/company/rwanda-development-board/',
      'https://www.rdb.rw',
    ),
    ip(
      'patents',
      'Rwanda Development Board — Intellectual Property',
      'https://www.rdb.rw',
      'info@rdb.rw',
      'https://x.com/RwandaDevBoard',
      'https://www.linkedin.com/company/rwanda-development-board/',
      'https://www.rdb.rw',
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
  TZ: roster(
    ip(
      'copyright',
      'Copyright Society of Tanzania (COSOTA)',
      'https://www.cosota.go.tz',
      'info@cosota.go.tz',
      '',
      '',
      'https://www.cosota.go.tz',
    ),
    ip(
      'trademarks',
      'Business Registrations and Licensing Agency (BRELA)',
      'https://www.brela.go.tz',
      'info@brela.go.tz',
      '',
      'https://www.linkedin.com/company/brela/',
      'https://www.brela.go.tz',
    ),
    ip(
      'patents',
      'Business Registrations and Licensing Agency (BRELA)',
      'https://www.brela.go.tz',
      'info@brela.go.tz',
      '',
      'https://www.linkedin.com/company/brela/',
      'https://www.brela.go.tz',
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
