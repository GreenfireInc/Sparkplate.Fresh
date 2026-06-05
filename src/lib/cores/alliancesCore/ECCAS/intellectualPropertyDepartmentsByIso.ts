import type { EccasMemberIsoCode } from './eccasMemberIsoCodes'
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
 * Intellectual property competent offices by ISO 3166-1 alpha-2 for Economic Community of
 * Central African States (ECCAS) members in this module (informational; verify URLs, handles,
 * forms portals, and API bases before production use). Self-contained — no imports from other
 * alliance modules. `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.wipo.int/en/web/country-profiles/directory-ip-offices
 */
export const ECCAS_INTELLECTUAL_PROPERTY_DEPARTMENTS: Record<
  EccasMemberIsoCode,
  IntellectualPropertyDepartmentsRoster
> = {
  AO: roster(
    ip(
      'copyright',
      'Instituto Angolano da Propriedade Intelectual (IAPI) — copyright',
      'https://www.iapi.gov.ao',
      'geral@iapi.gov.ao',
      '',
      '',
      'https://www.iapi.gov.ao',
    ),
    ip(
      'trademarks',
      'Instituto Angolano da Propriedade Intelectual (IAPI)',
      'https://www.iapi.gov.ao',
      'geral@iapi.gov.ao',
      '',
      '',
      'https://www.iapi.gov.ao',
    ),
    ip(
      'patents',
      'Instituto Angolano da Propriedade Intelectual (IAPI)',
      'https://www.iapi.gov.ao',
      'geral@iapi.gov.ao',
      '',
      '',
      'https://www.iapi.gov.ao',
    ),
  ),
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
  CM: oapiMember(
    ip(
      'copyright',
      'Cameroon Copyright Office (Ministry of Arts and Culture)',
      'https://www.minac.gov.cm',
      '',
      '',
      '',
      'https://www.minac.gov.cm',
    ),
  ),
  CF: oapiMember(
    ip(
      'copyright',
      'Office Centrafricain du Droit d\'Auteur (OCADA)',
      'https://www.ocada-rca.cf',
      '',
      '',
      '',
      'https://www.ocada-rca.cf',
    ),
  ),
  TD: oapiMember(
    ip(
      'copyright',
      'Agence Tchadienne du Droit d\'Auteur (ATCHADA)',
      'https://www.atchada.td',
      '',
      '',
      '',
      'https://www.atchada.td',
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
  GQ: oapiMember(
    ip(
      'copyright',
      'Office of Copyright and Related Rights (Equatorial Guinea)',
      'https://www.guineaecuatorialpress.com',
      '',
      '',
      '',
      'https://www.guineaecuatorialpress.com',
    ),
  ),
  GA: oapiMember(
    ip(
      'copyright',
      'Bureau Gabonais du Droit d\'Auteur (BGDA)',
      'https://www.bgda.ga',
      '',
      '',
      '',
      'https://www.bgda.ga',
    ),
  ),
  CG: oapiMember(
    ip(
      'copyright',
      'Office Congolais du Droit d\'Auteur (OCAD)',
      'https://www.ocad.cg',
      '',
      '',
      '',
      'https://www.ocad.cg',
    ),
  ),
  ST: roster(
    ip(
      'copyright',
      'Instituto Nacional do Livro e do Disco (INLD — São Tomé e Príncipe)',
      'https://www.inld.st',
      '',
      '',
      '',
      'https://www.inld.st',
    ),
    ip(
      'trademarks',
      'Instituto Nacional da Propriedade Industrial (INPI STP)',
      'https://www.inpi.st',
      'inpi@inpi.st',
      '',
      '',
      'https://www.inpi.st',
    ),
    ip(
      'patents',
      'Instituto Nacional da Propriedade Industrial (INPI STP)',
      'https://www.inpi.st',
      'inpi@inpi.st',
      '',
      '',
      'https://www.inpi.st',
    ),
  ),
}
