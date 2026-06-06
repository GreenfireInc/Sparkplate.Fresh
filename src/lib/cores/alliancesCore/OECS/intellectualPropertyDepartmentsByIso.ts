import type { OecsMemberIsoCode } from './oecsMemberIsoCodes'
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
 * Intellectual property competent offices by ISO 3166-1 alpha-2 for Organisation of Eastern
 * Caribbean States (OECS) members in this module (informational; verify URLs, handles, forms
 * portals, and API bases before production use). Self-contained — no imports from other alliance
 * modules. `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.wipo.int/en/web/country-profiles/directory-ip-offices
 */
export const OECS_INTELLECTUAL_PROPERTY_DEPARTMENTS: Record<
  OecsMemberIsoCode,
  IntellectualPropertyDepartmentsRoster
> = {
  AG: roster(
    ip(
      'copyright',
      'Antigua and Barbuda Intellectual Property Office (Commerce Division) — copyright',
      'https://abip.gov.ag',
      '',
      '',
      '',
      'https://abip.gov.ag',
    ),
    ip(
      'trademarks',
      'Antigua and Barbuda Intellectual Property Office (Commerce Division)',
      'https://abip.gov.ag',
      '',
      '',
      '',
      'https://abip.gov.ag',
    ),
    ip(
      'patents',
      'Antigua and Barbuda Intellectual Property Office (Commerce Division)',
      'https://abip.gov.ag',
      '',
      '',
      '',
      'https://abip.gov.ag',
    ),
  ),
  DM: roster(
    ip(
      'copyright',
      'Commerce and Intellectual Property Office (Dominica) — copyright',
      'https://www.dominica.gov.dm',
      '',
      '',
      '',
      'https://www.dominica.gov.dm',
    ),
    ip(
      'trademarks',
      'Commerce and Intellectual Property Office (Dominica)',
      'https://www.dominica.gov.dm',
      '',
      '',
      '',
      'https://www.dominica.gov.dm',
    ),
    ip(
      'patents',
      'Commerce and Intellectual Property Office (Dominica)',
      'https://www.dominica.gov.dm',
      '',
      '',
      '',
      'https://www.dominica.gov.dm',
    ),
  ),
  GD: roster(
    ip(
      'copyright',
      'Corporate Affairs and Intellectual Property Office (Grenada) — copyright',
      'https://www.gov.gd',
      '',
      '',
      '',
      'https://www.gov.gd',
    ),
    ip(
      'trademarks',
      'Corporate Affairs and Intellectual Property Office (Grenada)',
      'https://www.gov.gd',
      '',
      '',
      '',
      'https://www.gov.gd',
    ),
    ip(
      'patents',
      'Corporate Affairs and Intellectual Property Office (Grenada)',
      'https://www.gov.gd',
      '',
      '',
      '',
      'https://www.gov.gd',
    ),
  ),
  MS: roster(
    ip(
      'copyright',
      'Montserrat — intellectual property (UK extension; verify locally)',
      'https://www.gov.ms',
      '',
      '',
      '',
      'https://www.gov.ms',
    ),
    ip(
      'trademarks',
      'Montserrat — intellectual property (verify locally)',
      'https://www.gov.ms',
      '',
      '',
      '',
      'https://www.gov.ms',
    ),
    ip(
      'patents',
      'Montserrat — intellectual property (verify locally)',
      'https://www.gov.ms',
      '',
      '',
      '',
      'https://www.gov.ms',
    ),
  ),
  KN: roster(
    ip(
      'copyright',
      'Ministry of Justice and Legal Affairs (Saint Kitts and Nevis) — copyright',
      'https://www.gov.kn',
      '',
      '',
      '',
      'https://www.gov.kn',
    ),
    ip(
      'trademarks',
      'Commerce and Intellectual Property Office (Saint Kitts and Nevis)',
      'https://www.gov.kn',
      '',
      '',
      '',
      'https://www.gov.kn',
    ),
    ip(
      'patents',
      'Commerce and Intellectual Property Office (Saint Kitts and Nevis)',
      'https://www.gov.kn',
      '',
      '',
      '',
      'https://www.gov.kn',
    ),
  ),
  LC: roster(
    ip(
      'copyright',
      'Ministry of Commerce — copyright (Saint Lucia)',
      'https://www.govt.lc',
      '',
      '',
      '',
      'https://www.govt.lc',
    ),
    ip(
      'trademarks',
      'Registry of Companies and Intellectual Property (Saint Lucia)',
      'https://www.govt.lc',
      '',
      '',
      '',
      'https://www.govt.lc',
    ),
    ip(
      'patents',
      'Registry of Companies and Intellectual Property (Saint Lucia)',
      'https://www.govt.lc',
      '',
      '',
      '',
      'https://www.govt.lc',
    ),
  ),
  VC: roster(
    ip(
      'copyright',
      'Ministry of Legal Affairs (Saint Vincent and the Grenadines) — copyright',
      'https://www.gov.vc',
      '',
      '',
      '',
      'https://www.gov.vc',
    ),
    ip(
      'trademarks',
      'Commerce and Intellectual Property Office (Saint Vincent and the Grenadines)',
      'https://www.gov.vc',
      '',
      '',
      '',
      'https://www.gov.vc',
    ),
    ip(
      'patents',
      'Commerce and Intellectual Property Office (Saint Vincent and the Grenadines)',
      'https://www.gov.vc',
      '',
      '',
      '',
      'https://www.gov.vc',
    ),
  ),
  AI: roster(
    ip(
      'copyright',
      'Anguilla — intellectual property (UK extension; verify locally)',
      'https://www.gov.ai',
      '',
      '',
      '',
      'https://www.gov.ai',
    ),
    ip(
      'trademarks',
      'Anguilla Financial Services Commission — intellectual property',
      'https://www.fsc.org.ai',
      '',
      '',
      '',
      'https://www.fsc.org.ai',
    ),
    ip(
      'patents',
      'Anguilla Financial Services Commission — intellectual property',
      'https://www.fsc.org.ai',
      '',
      '',
      '',
      'https://www.fsc.org.ai',
    ),
  ),
}
