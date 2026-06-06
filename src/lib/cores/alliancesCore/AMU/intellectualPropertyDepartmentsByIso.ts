import type { AmuMemberIsoCode } from './amuMemberIsoCodes'
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

/** OAPI — regional industrial property for Mauritania (Bangui Agreement member). */
const OAPI_TRADEMARKS = ip(
  'trademarks',
  'African Intellectual Property Organization (OAPI)',
  'https://www.oapi.int/en/',
  'oapi@oapi.int',
  '',
  'https://www.linkedin.com/company/oapi/',
  'https://www.oapi.int/en/e-services/',
)

const OAPI_PATENTS = ip(
  'patents',
  'African Intellectual Property Organization (OAPI)',
  'https://www.oapi.int/en/',
  'oapi@oapi.int',
  '',
  'https://www.linkedin.com/company/oapi/',
  'https://www.oapi.int/en/e-services/',
)

function oapiMember(copyright: IntellectualPropertyDepartment): IntellectualPropertyDepartmentsRoster {
  return roster(copyright, OAPI_TRADEMARKS, OAPI_PATENTS)
}

/**
 * Intellectual property competent offices by ISO 3166-1 alpha-2 for Arab Maghreb Union (AMU)
 * founding members (informational; verify URLs, handles, forms portals, and API bases before
 * production use). Pattern:
 *   - Algeria, Morocco, Tunisia: national copyright + national industrial property institutes.
 *   - Libya: national ministries / offices (verify locally — institutional flux).
 *   - Mauritania: national copyright + OAPI for trademarks and patents.
 * Aligns with African Union entries for the same ISO codes in
 * `africanUnion/intellectualPropertyDepartmentsByIso.ts`. `apiEndpoint` is almost always empty.
 * Verify periodically: https://www.wipo.int/en/web/country-profiles/directory-ip-offices
 */
export const AMU_INTELLECTUAL_PROPERTY_DEPARTMENTS: Record<
  AmuMemberIsoCode,
  IntellectualPropertyDepartmentsRoster
> = {
  DZ: roster(
    ip(
      'copyright',
      'Office Algérien du Droit d\'Auteur et des Droits Voisins (OADA)',
      'https://www.oada.dz',
      'contact@oada.dz',
      '',
      '',
      'https://www.oada.dz',
    ),
    ip(
      'trademarks',
      'Institut National de la Propriété Industrielle (INAPI)',
      'https://www.inapi.dz',
      'contact@inapi.dz',
      '',
      '',
      'https://www.inapi.dz',
    ),
    ip(
      'patents',
      'Institut National de la Propriété Industrielle (INAPI)',
      'https://www.inapi.dz',
      'contact@inapi.dz',
      '',
      '',
      'https://www.inapi.dz',
    ),
  ),
  LY: roster(
    ip(
      'copyright',
      'Libyan National Centre for Culture and Arts — copyright',
      'https://www.culture.gov.ly',
      '',
      '',
      '',
      'https://www.culture.gov.ly',
    ),
    ip(
      'trademarks',
      'Libyan Trademark and Patent Office (verify locally)',
      'https://www.mti.gov.ly',
      '',
      '',
      '',
      'https://www.mti.gov.ly',
    ),
    ip(
      'patents',
      'Libyan Trademark and Patent Office (verify locally)',
      'https://www.mti.gov.ly',
      '',
      '',
      '',
      'https://www.mti.gov.ly',
    ),
  ),
  MR: oapiMember(
    ip(
      'copyright',
      'Bureau Mauritanien du Droit d\'Auteur (BUMDA)',
      'https://www.bumda.mr',
      '',
      '',
      '',
      'https://www.bumda.mr',
    ),
  ),
  MA: roster(
    ip(
      'copyright',
      'Bureau Marocain des Droits d\'Auteur (BMDA)',
      'https://www.bmda.org',
      'contact@bmda.org',
      '',
      '',
      'https://www.bmda.org',
    ),
    ip(
      'trademarks',
      'Office Marocain de la Propriété Industrielle et Commerciale (OMPIC)',
      'https://www.ompic.ma',
      'contact@ompic.ma',
      '',
      'https://www.linkedin.com/company/ompic/',
      'https://www.ompic.ma',
    ),
    ip(
      'patents',
      'Office Marocain de la Propriété Industrielle et Commerciale (OMPIC)',
      'https://www.ompic.ma',
      'contact@ompic.ma',
      '',
      'https://www.linkedin.com/company/ompic/',
      'https://www.ompic.ma',
    ),
  ),
  TN: roster(
    ip(
      'copyright',
      'Office National du Droit d\'Auteur (ONDA)',
      'https://www.onda.tn',
      'contact@onda.tn',
      '',
      '',
      'https://www.onda.tn',
    ),
    ip(
      'trademarks',
      'Institut National de la Normalisation et de la Propriété Industrielle (INNORPI)',
      'https://www.innorpi.tn',
      'contact@innorpi.tn',
      '',
      '',
      'https://www.innorpi.tn',
    ),
    ip(
      'patents',
      'Institut National de la Normalisation et de la Propriété Industrielle (INNORPI)',
      'https://www.innorpi.tn',
      'contact@innorpi.tn',
      '',
      '',
      'https://www.innorpi.tn',
    ),
  ),
}
