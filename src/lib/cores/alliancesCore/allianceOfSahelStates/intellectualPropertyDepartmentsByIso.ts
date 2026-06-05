import type { AesMemberIsoCode } from './aesMemberIsoCodes'
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
 * OAPI — unified trademarks and patents for Burkina Faso, Mali, and Niger (Bangui Agreement
 * members). Copyright remains with each national office per the WIPO directory. No documented
 * public REST API — e-services portal for filings.
 */
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
 * Intellectual property competent offices by ISO 3166-1 alpha-2 for Alliance of Sahel States
 * founding members (informational; verify URLs, handles, forms portals, and API bases before
 * production use). All three AES members (BF, ML, NE) are OAPI / Bangui Agreement states:
 * national copyright office + OAPI for trademarks and patents. Aligns with African Union
 * entries for the same ISO codes in `africanUnion/intellectualPropertyDepartmentsByIso.ts`.
 * `apiEndpoint` is almost always empty. Verify periodically against WIPO’s directory of IP
 * offices: https://www.wipo.int/en/web/country-profiles/directory-ip-offices
 */
export const AES_INTELLECTUAL_PROPERTY_DEPARTMENTS: Record<
  AesMemberIsoCode,
  IntellectualPropertyDepartmentsRoster
> = {
  BF: oapiMember(
    ip(
      'copyright',
      'Office Burkinabè des Droits d\'Auteur (OBDA)',
      'https://www.obda.bf',
      'obda@obda.bf',
      '',
      '',
      'https://www.obda.bf',
    ),
  ),
  ML: oapiMember(
    ip(
      'copyright',
      'Bureau Malien du Droit d\'Auteur (BUMADA)',
      'https://www.bumada.ml',
      '',
      '',
      '',
      'https://www.bumada.ml',
    ),
  ),
  NE: oapiMember(
    ip(
      'copyright',
      'Bureau Nigérien du Droit d\'Auteur (BUNDA)',
      'https://www.bunda.ne',
      '',
      '',
      '',
      'https://www.bunda.ne',
    ),
  ),
}
