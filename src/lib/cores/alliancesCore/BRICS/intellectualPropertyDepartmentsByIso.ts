import type { BricsMemberIsoCode } from './bricsMemberIsoCodes'
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
 * Intellectual property competent offices by ISO 3166-1 alpha-2 for BRICS founding members
 * (informational; verify URLs, handles, forms portals, and API bases before production use).
 * China and Russia align with APEC entries; South Africa with African Union; Brazil and India
 * use national institutes per WIPO directory naming. `apiEndpoint` is almost always empty.
 * Verify periodically: https://www.wipo.int/en/web/country-profiles/directory-ip-offices
 */
export const BRICS_INTELLECTUAL_PROPERTY_DEPARTMENTS: Record<
  BricsMemberIsoCode,
  IntellectualPropertyDepartmentsRoster
> = {
  BR: roster(
    ip(
      'copyright',
      'Ministry of Culture — copyright (Brazil)',
      'https://www.gov.br/cultura',
      '',
      '',
      '',
      'https://www.gov.br/cultura',
    ),
    ip(
      'trademarks',
      'National Institute of Industrial Property (INPI Brazil)',
      'https://www.gov.br/inpi',
      'inpi@inpi.gov.br',
      'https://x.com/inpi_brasil',
      'https://www.linkedin.com/company/inpi-brasil/',
      'https://www.gov.br/inpi/pt-br/servicos',
    ),
    ip(
      'patents',
      'National Institute of Industrial Property (INPI Brazil)',
      'https://www.gov.br/inpi',
      'inpi@inpi.gov.br',
      'https://x.com/inpi_brasil',
      'https://www.linkedin.com/company/inpi-brasil/',
      'https://www.gov.br/inpi/pt-br/servicos',
    ),
  ),
  CN: roster(
    ip(
      'copyright',
      'National Copyright Administration of the People\'s Republic of China (NCAC)',
      'https://www.ncac.gov.cn',
      '',
      '',
      '',
      'https://www.ncac.gov.cn',
    ),
    ip(
      'trademarks',
      'China National Intellectual Property Administration (CNIPA)',
      'https://www.cnipa.gov.cn',
      '',
      '',
      '',
      'https://cponline.cnipa.gov.cn',
    ),
    ip(
      'patents',
      'China National Intellectual Property Administration (CNIPA)',
      'https://www.cnipa.gov.cn',
      '',
      '',
      '',
      'https://cponline.cnipa.gov.cn',
    ),
  ),
  IN: roster(
    ip(
      'copyright',
      'Copyright Office of India',
      'https://copyright.gov.in',
      '',
      '',
      '',
      'https://copyright.gov.in',
    ),
    ip(
      'trademarks',
      'Office of the Controller General of Patents, Designs and Trade Marks (CGPDTM)',
      'https://ipindia.gov.in',
      'cgoffice@nic.in',
      '',
      'https://www.linkedin.com/company/office-of-the-controller-general-of-patents-designs-and-trade-marks/',
      'https://ipindiaonline.gov.in',
    ),
    ip(
      'patents',
      'Office of the Controller General of Patents, Designs and Trade Marks (CGPDTM)',
      'https://ipindia.gov.in',
      'cgoffice@nic.in',
      '',
      'https://www.linkedin.com/company/office-of-the-controller-general-of-patents-designs-and-trade-marks/',
      'https://ipindiaonline.gov.in',
    ),
  ),
  RU: roster(
    ip(
      'copyright',
      'Ministry of Culture of the Russian Federation — copyright',
      'https://culture.gov.ru',
      '',
      '',
      '',
      'https://culture.gov.ru',
    ),
    ip(
      'trademarks',
      'Federal Service for Intellectual Property (Rospatent)',
      'https://rospatent.gov.ru',
      'fips@rupto.ru',
      '',
      '',
      'https://rospatent.gov.ru/ru/services',
    ),
    ip(
      'patents',
      'Federal Service for Intellectual Property (Rospatent)',
      'https://rospatent.gov.ru',
      'fips@rupto.ru',
      '',
      '',
      'https://rospatent.gov.ru/ru/services',
    ),
  ),
  ZA: roster(
    ip(
      'copyright',
      'Companies and Intellectual Property Commission (CIPC) — Copyright Tribunal liaison',
      'https://www.cipc.co.za',
      'info@cipc.co.za',
      'https://x.com/the_cipc',
      'https://www.linkedin.com/company/cipc/',
      'https://www.cipc.co.za',
    ),
    ip(
      'trademarks',
      'Companies and Intellectual Property Commission (CIPC)',
      'https://www.cipc.co.za',
      'info@cipc.co.za',
      'https://x.com/the_cipc',
      'https://www.linkedin.com/company/cipc/',
      'https://www.cipc.co.za',
    ),
    ip(
      'patents',
      'Companies and Intellectual Property Commission (CIPC)',
      'https://www.cipc.co.za',
      'info@cipc.co.za',
      'https://x.com/the_cipc',
      'https://www.linkedin.com/company/cipc/',
      'https://www.cipc.co.za',
    ),
  ),
}
