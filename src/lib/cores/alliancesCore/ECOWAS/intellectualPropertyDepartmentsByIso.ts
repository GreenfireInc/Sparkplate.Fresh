import type { EcowasMemberIsoCode } from './ecowasMemberIsoCodes'
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
 * Intellectual property competent offices by ISO 3166-1 alpha-2 for Economic Community of West
 * African States (ECOWAS) members in this module (informational; verify URLs, handles, forms
 * portals, and API bases before production use). Self-contained — no imports from other alliance
 * modules. `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.wipo.int/en/web/country-profiles/directory-ip-offices
 */
export const ECOWAS_INTELLECTUAL_PROPERTY_DEPARTMENTS: Record<
  EcowasMemberIsoCode,
  IntellectualPropertyDepartmentsRoster
> = {
  BJ: oapiMember(
    ip(
      'copyright',
      'Bureau Béninois du Droit d\'Auteur et des Droits Voisins (BURIDA)',
      'https://www.burida.bj',
      'contact@burida.bj',
      '',
      '',
      'https://www.burida.bj',
    ),
  ),
  CV: roster(
    ip(
      'copyright',
      'Instituto Cabo-verdiano do Livro e do Disco (ICLD)',
      'https://www.icld.cv',
      'icld@icld.cv',
      '',
      '',
      'https://www.icld.cv',
    ),
    ip(
      'trademarks',
      'Instituto Nacional da Propriedade Intelectual (INPI Cabo Verde)',
      'https://www.inpi.cv',
      'inpi@inpi.cv',
      '',
      '',
      'https://www.inpi.cv',
    ),
    ip(
      'patents',
      'Instituto Nacional da Propriedade Intelectual (INPI Cabo Verde)',
      'https://www.inpi.cv',
      'inpi@inpi.cv',
      '',
      '',
      'https://www.inpi.cv',
    ),
  ),
  GM: roster(
    ip(
      'copyright',
      'National Centre for Arts and Culture (NCAC) — copyright',
      'https://www.ncac.gm',
      'info@ncac.gm',
      '',
      '',
      'https://www.ncac.gm',
    ),
    ip(
      'trademarks',
      'Registrar General\'s Department — Industrial Property (The Gambia)',
      'https://www.moj.gov.gm',
      '',
      '',
      '',
      'https://www.moj.gov.gm',
    ),
    ip(
      'patents',
      'Registrar General\'s Department — Industrial Property (The Gambia)',
      'https://www.moj.gov.gm',
      '',
      '',
      '',
      'https://www.moj.gov.gm',
    ),
  ),
  GH: roster(
    ip(
      'copyright',
      'Copyright Office, Registrar General\'s Department',
      'https://rgd.gov.gh',
      'info@rgd.gov.gh',
      '',
      '',
      'https://rgd.gov.gh',
    ),
    ip(
      'trademarks',
      'Registrar General\'s Department — Industrial Property',
      'https://rgd.gov.gh',
      'info@rgd.gov.gh',
      '',
      'https://www.linkedin.com/company/registrar-generals-department-ghana/',
      'https://rgd.gov.gh',
    ),
    ip(
      'patents',
      'Registrar General\'s Department — Industrial Property',
      'https://rgd.gov.gh',
      'info@rgd.gov.gh',
      '',
      'https://www.linkedin.com/company/registrar-generals-department-ghana/',
      'https://rgd.gov.gh',
    ),
  ),
  GN: oapiMember(
    ip(
      'copyright',
      'Bureau Guinéen du Droit d\'Auteur (BGDA)',
      'https://www.bgda.gn',
      '',
      '',
      '',
      'https://www.bgda.gn',
    ),
  ),
  GW: oapiMember(
    ip(
      'copyright',
      'Instituto Nacional de Direitos de Autor (INDA — Guinea-Bissau)',
      'https://www.inda.gw',
      '',
      '',
      '',
      'https://www.inda.gw',
    ),
  ),
  CI: oapiMember(
    ip(
      'copyright',
      'Bureau Ivoirien du Droit d\'Auteur (BURIDA)',
      'https://www.burida.ci',
      'contact@burida.ci',
      '',
      '',
      'https://www.burida.ci',
    ),
  ),
  LR: roster(
    ip(
      'copyright',
      'Liberia Copyright Office (Ministry of Commerce and Industry)',
      'https://www.moci.gov.lr',
      '',
      '',
      '',
      'https://www.moci.gov.lr',
    ),
    ip(
      'trademarks',
      'Liberia Intellectual Property Office (LIPO)',
      'https://www.lipo.gov.lr',
      'info@lipo.gov.lr',
      '',
      '',
      'https://www.lipo.gov.lr',
    ),
    ip(
      'patents',
      'Liberia Intellectual Property Office (LIPO)',
      'https://www.lipo.gov.lr',
      'info@lipo.gov.lr',
      '',
      '',
      'https://www.lipo.gov.lr',
    ),
  ),
  NG: roster(
    ip(
      'copyright',
      'Nigerian Copyright Commission (NCC)',
      'https://www.copyright.gov.ng',
      'info@copyright.gov.ng',
      'https://x.com/NCC_NG',
      'https://www.linkedin.com/company/nigerian-copyright-commission/',
      'https://www.copyright.gov.ng',
    ),
    ip(
      'trademarks',
      'Trademarks, Patents and Designs Registry (Federal Ministry of Industry, Trade and Investment)',
      'https://www.fmiti.gov.ng',
      'info@fmiti.gov.ng',
      '',
      '',
      'https://www.fmiti.gov.ng',
    ),
    ip(
      'patents',
      'Trademarks, Patents and Designs Registry (Federal Ministry of Industry, Trade and Investment)',
      'https://www.fmiti.gov.ng',
      'info@fmiti.gov.ng',
      '',
      '',
      'https://www.fmiti.gov.ng',
    ),
  ),
  SN: oapiMember(
    ip(
      'copyright',
      'Bureau Sénégalais du Droit d\'Auteur (BSDA)',
      'https://www.bsda.sn',
      'contact@bsda.sn',
      '',
      '',
      'https://www.bsda.sn',
    ),
  ),
  SL: roster(
    ip(
      'copyright',
      'Sierra Leone Copyright Office',
      'https://www.mic.gov.sl',
      '',
      '',
      '',
      'https://www.mic.gov.sl',
    ),
    ip(
      'trademarks',
      'National Intellectual Property Office of Sierra Leone (NIPOSL)',
      'https://www.niposl.gov.sl',
      'info@niposl.gov.sl',
      '',
      '',
      'https://www.niposl.gov.sl',
    ),
    ip(
      'patents',
      'National Intellectual Property Office of Sierra Leone (NIPOSL)',
      'https://www.niposl.gov.sl',
      'info@niposl.gov.sl',
      '',
      '',
      'https://www.niposl.gov.sl',
    ),
  ),
  TG: oapiMember(
    ip(
      'copyright',
      'Office Togolais des Droits d\'Auteur et des Droits Voisins (OTDAV)',
      'https://www.otdav.tg',
      '',
      '',
      '',
      'https://www.otdav.tg',
    ),
  ),
}
