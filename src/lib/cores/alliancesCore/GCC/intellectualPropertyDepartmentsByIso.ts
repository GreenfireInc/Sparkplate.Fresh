import type { GccMemberIsoCode } from './gccMemberIsoCodes'
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
 * Intellectual property competent offices by ISO 3166-1 alpha-2 for Gulf Cooperation Council
 * (GCC) members in this module (informational; verify URLs, handles, forms portals, and API
 * bases before production use). Self-contained — no imports from other alliance modules.
 * `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.wipo.int/en/web/country-profiles/directory-ip-offices
 */
export const GCC_INTELLECTUAL_PROPERTY_DEPARTMENTS: Record<
  GccMemberIsoCode,
  IntellectualPropertyDepartmentsRoster
> = {
  BH: roster(
    ip(
      'copyright',
      'Ministry of Information — copyright (Bahrain)',
      'https://www.mia.gov.bh',
      '',
      '',
      '',
      'https://www.mia.gov.bh',
    ),
    ip(
      'trademarks',
      'National Office for Industrial Property (NOIP) — Ministry of Industry and Commerce (Bahrain)',
      'https://www.moic.gov.bh',
      '',
      '',
      '',
      'https://www.moic.gov.bh',
    ),
    ip(
      'patents',
      'National Office for Industrial Property (NOIP) — Ministry of Industry and Commerce (Bahrain)',
      'https://www.moic.gov.bh',
      '',
      '',
      '',
      'https://www.moic.gov.bh',
    ),
  ),
  KW: roster(
    ip(
      'copyright',
      'National Council for Culture, Arts and Letters — copyright (Kuwait)',
      'https://www.nccal.gov.kw',
      '',
      '',
      '',
      'https://www.nccal.gov.kw',
    ),
    ip(
      'trademarks',
      'Ministry of Commerce and Industry — intellectual property (Kuwait)',
      'https://www.moci.gov.kw',
      '',
      '',
      '',
      'https://www.moci.gov.kw',
    ),
    ip(
      'patents',
      'Ministry of Commerce and Industry — intellectual property (Kuwait)',
      'https://www.moci.gov.kw',
      '',
      '',
      '',
      'https://www.moci.gov.kw',
    ),
  ),
  OM: roster(
    ip(
      'copyright',
      'Ministry of Culture, Sports and Youth — copyright (Oman)',
      'https://www.mcsy.gov.om',
      '',
      '',
      '',
      'https://www.mcsy.gov.om',
    ),
    ip(
      'trademarks',
      'Ministry of Commerce, Industry and Investment Promotion — intellectual property (Oman)',
      'https://www.moci.gov.om',
      '',
      '',
      '',
      'https://www.moci.gov.om',
    ),
    ip(
      'patents',
      'Ministry of Commerce, Industry and Investment Promotion — intellectual property (Oman)',
      'https://www.moci.gov.om',
      '',
      '',
      '',
      'https://www.moci.gov.om',
    ),
  ),
  QA: roster(
    ip(
      'copyright',
      'Ministry of Culture — copyright (Qatar)',
      'https://www.moc.gov.qa',
      '',
      '',
      '',
      'https://www.moc.gov.qa',
    ),
    ip(
      'trademarks',
      'Ministry of Commerce and Industry — intellectual property (Qatar)',
      'https://www.moci.gov.qa',
      '',
      '',
      '',
      'https://www.moci.gov.qa',
    ),
    ip(
      'patents',
      'Ministry of Commerce and Industry — intellectual property (Qatar)',
      'https://www.moci.gov.qa',
      '',
      '',
      '',
      'https://www.moci.gov.qa',
    ),
  ),
  SA: roster(
    ip(
      'copyright',
      'Saudi Authority for Intellectual Property (SAIP)',
      'https://www.saip.gov.sa',
      'info@saip.gov.sa',
      '',
      'https://www.linkedin.com/company/saudi-authority-for-intellectual-property/',
      'https://www.saip.gov.sa',
    ),
    ip(
      'trademarks',
      'Saudi Authority for Intellectual Property (SAIP)',
      'https://www.saip.gov.sa',
      'info@saip.gov.sa',
      '',
      'https://www.linkedin.com/company/saudi-authority-for-intellectual-property/',
      'https://www.saip.gov.sa',
    ),
    ip(
      'patents',
      'Saudi Authority for Intellectual Property (SAIP)',
      'https://www.saip.gov.sa',
      'info@saip.gov.sa',
      '',
      'https://www.linkedin.com/company/saudi-authority-for-intellectual-property/',
      'https://www.saip.gov.sa',
    ),
  ),
  AE: roster(
    ip(
      'copyright',
      'Ministry of Economy — Intellectual Property (United Arab Emirates)',
      'https://www.moec.gov.ae/en/ip',
      '',
      '',
      '',
      'https://www.moec.gov.ae/en/ip',
    ),
    ip(
      'trademarks',
      'Ministry of Economy — Intellectual Property (United Arab Emirates)',
      'https://www.moec.gov.ae/en/ip',
      '',
      '',
      '',
      'https://www.moec.gov.ae/en/ip',
    ),
    ip(
      'patents',
      'Ministry of Economy — Intellectual Property (United Arab Emirates)',
      'https://www.moec.gov.ae/en/ip',
      '',
      '',
      '',
      'https://www.moec.gov.ae/en/ip',
    ),
  ),
}
