import type { OpecMemberIsoCode } from './opecMemberIsoCodes'
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
 * Intellectual property competent offices by ISO 3166-1 alpha-2 for OPEC member states in this
 * module (informational; verify URLs, handles, forms portals, and API bases before production
 * use). Self-contained — no imports from other alliance modules. `apiEndpoint` is almost
 * always empty. Verify periodically:
 * https://www.wipo.int/en/web/country-profiles/directory-ip-offices
 */
export const OPEC_INTELLECTUAL_PROPERTY_DEPARTMENTS: Record<
  OpecMemberIsoCode,
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
  IR: roster(
    ip(
      'copyright',
      'Iran Intellectual Property Center (IIPC) — copyright',
      'https://iipc.ir',
      '',
      '',
      '',
      'https://iipc.ir',
    ),
    ip(
      'trademarks',
      'Iran Intellectual Property Center (IIPC)',
      'https://iipc.ir',
      '',
      '',
      '',
      'https://iipc.ir',
    ),
    ip(
      'patents',
      'Iran Intellectual Property Center (IIPC)',
      'https://iipc.ir',
      '',
      '',
      '',
      'https://iipc.ir',
    ),
  ),
  IQ: roster(
    ip(
      'copyright',
      'Ministry of Culture, Tourism and Antiquities — copyright (Iraq) (verify locally)',
      'https://www.mocul.gov.iq',
      '',
      '',
      '',
      'https://www.mocul.gov.iq',
    ),
    ip(
      'trademarks',
      'Central Organization for Standardization and Quality Control — industrial property (Iraq) (verify locally)',
      'https://www.cosqc.gov.iq',
      '',
      '',
      '',
      'https://www.cosqc.gov.iq',
    ),
    ip(
      'patents',
      'Ministry of Industry and Minerals — patents (Iraq) (verify locally)',
      'https://www.industry.gov.iq',
      '',
      '',
      '',
      'https://www.industry.gov.iq',
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
  VE: roster(
    ip(
      'copyright',
      'Autonomous Service of Intellectual Property (SAPI Venezuela) — copyright',
      'https://www.sapi.gob.ve',
      '',
      '',
      '',
      'https://www.sapi.gob.ve',
    ),
    ip(
      'trademarks',
      'Autonomous Service of Intellectual Property (SAPI Venezuela)',
      'https://www.sapi.gob.ve',
      '',
      '',
      '',
      'https://www.sapi.gob.ve',
    ),
    ip(
      'patents',
      'Autonomous Service of Intellectual Property (SAPI Venezuela)',
      'https://www.sapi.gob.ve',
      '',
      '',
      '',
      'https://www.sapi.gob.ve',
    ),
  ),
}
