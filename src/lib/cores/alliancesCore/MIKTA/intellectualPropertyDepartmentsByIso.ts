import type { MiktaMemberIsoCode } from './miktaMemberIsoCodes'
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
 * Intellectual property competent offices by ISO 3166-1 alpha-2 for MIKTA members
 * (informational; verify URLs, handles, forms portals, and API bases before production use).
 * Self-contained — no imports from other alliance modules. `apiEndpoint` is almost always
 * empty. Verify periodically: https://www.wipo.int/en/web/country-profiles/directory-ip-offices
 */
export const MIKTA_INTELLECTUAL_PROPERTY_DEPARTMENTS: Record<
  MiktaMemberIsoCode,
  IntellectualPropertyDepartmentsRoster
> = {
  MX: roster(
    ip(
      'copyright',
      'Instituto Nacional del Derecho de Autor (INDAUTOR)',
      'https://www.indautor.gob.mx',
      'indautor@indautor.gob.mx',
      'https://x.com/INDAUTORMX',
      '',
      'https://www.indautor.gob.mx/servicios/',
    ),
    ip(
      'trademarks',
      'Mexican Institute of Industrial Property (IMPI)',
      'https://www.gob.mx/impi',
      'impi@impi.gob.mx',
      'https://x.com/IMPI_MX',
      'https://www.linkedin.com/company/impi/',
      'https://www.gob.mx/impi/acciones-y-programas/servicios-en-linea',
    ),
    ip(
      'patents',
      'Mexican Institute of Industrial Property (IMPI)',
      'https://www.gob.mx/impi',
      'impi@impi.gob.mx',
      'https://x.com/IMPI_MX',
      'https://www.linkedin.com/company/impi/',
      'https://www.gob.mx/impi/acciones-y-programas/servicios-en-linea',
    ),
  ),
  ID: roster(
    ip(
      'copyright',
      'Directorate General of Intellectual Property (DGIP) — copyright',
      'https://dgip.go.id',
      'dgip@kemenkumham.go.id',
      '',
      'https://www.linkedin.com/company/directorate-general-of-intellectual-property-indonesia/',
      'https://pdki-indonesia.dgip.go.id',
    ),
    ip(
      'trademarks',
      'Directorate General of Intellectual Property (DGIP)',
      'https://dgip.go.id',
      'dgip@kemenkumham.go.id',
      '',
      'https://www.linkedin.com/company/directorate-general-of-intellectual-property-indonesia/',
      'https://pdki-indonesia.dgip.go.id',
    ),
    ip(
      'patents',
      'Directorate General of Intellectual Property (DGIP)',
      'https://dgip.go.id',
      'dgip@kemenkumham.go.id',
      '',
      'https://www.linkedin.com/company/directorate-general-of-intellectual-property-indonesia/',
      'https://pdki-indonesia.dgip.go.id',
    ),
  ),
  KR: roster(
    ip(
      'copyright',
      'Korea Copyright Commission (KCC)',
      'https://www.copyright.or.kr',
      'help@copyright.or.kr',
      '',
      '',
      'https://www.copyright.or.kr',
    ),
    ip(
      'trademarks',
      'Korean Intellectual Property Office (KIPO)',
      'https://www.kipo.go.kr',
      '',
      '',
      '',
      'https://www.patent.go.kr',
    ),
    ip(
      'patents',
      'Korean Intellectual Property Office (KIPO)',
      'https://www.kipo.go.kr',
      '',
      '',
      '',
      'https://www.patent.go.kr',
    ),
  ),
  TR: roster(
    ip(
      'copyright',
      'Turkish Patent and Trademark Office (TürkPatent) — copyright',
      'https://www.turkpatent.gov.tr',
      '',
      '',
      '',
      'https://www.turkpatent.gov.tr',
    ),
    ip(
      'trademarks',
      'Turkish Patent and Trademark Office (TürkPatent)',
      'https://www.turkpatent.gov.tr',
      '',
      '',
      '',
      'https://www.turkpatent.gov.tr',
    ),
    ip(
      'patents',
      'Turkish Patent and Trademark Office (TürkPatent)',
      'https://www.turkpatent.gov.tr',
      '',
      '',
      '',
      'https://www.turkpatent.gov.tr',
    ),
  ),
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
}
