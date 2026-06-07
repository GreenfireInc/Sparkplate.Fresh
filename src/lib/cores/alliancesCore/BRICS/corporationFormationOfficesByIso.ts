import type { CorporationFormationOffice } from './types'
import type { BricsMemberIsoCode } from './bricsMemberIsoCodes'

function office(
  name: string,
  phone: string,
  address: string,
  website: string,
  email: string,
  twitter: string,
  instagram: string,
  linkedin: string,
  formsUrl: string,
  checklistsUrl: string,
  registrationNumberLabel: string,
): CorporationFormationOffice {
  return {
    name,
    phone,
    address,
    website,
    email,
    twitter,
    instagram,
    linkedin,
    formsUrl,
    checklistsUrl,
    registrationNumberLabel,
  }
}

/**
 * National corporation / company formation office per BRICS founding member.
 * Informational; verify phone numbers, addresses, filing portals, checklists, social handles,
 * and registration-number taxonomy before production. Self-contained — no imports from other alliance modules.
 */
export const BRICS_CORPORATION_FORMATION_OFFICES: Record<BricsMemberIsoCode, CorporationFormationOffice> = {
  BR:   office(
    'REDESIM / Junta Comercial (Brazil Business Registration)',
    '+55 61 2021 5000',
    'SAIN, Bloco I, Brasilia, Brazil',
    'https://www.gov.br/empresas-e-negocios',
    '',
    '',
    '',
    '',
    'https://www.gov.br/empresas-e-negocios/pt-br/empreendedor',
    'https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/quero-empreender',
    'CNPJ (Cadastro Nacional da Pessoa Juridica)',
  ),
  RU:   office(
    'Federal Tax Service of Russia (State Registration)',
    '+7 495 913 0009',
    'Neglinnaya St., 23, Moscow, Russia',
    'https://www.nalog.gov.ru',
    '',
    '',
    '',
    '',
    'https://service.nalog.ru/gosreg',
    'https://www.nalog.gov.ru/rn77/yul/interest/reg_ur/',
    'OGRN',
  ),
  IN:   office(
    'Ministry of Corporate Affairs India (MCA21)',
    '+91 11 2306 3386',
    '5th Floor, A Wing, Shastri Bhawan, New Delhi, India',
    'https://www.mca.gov.in',
    'helpdesk@mca.gov.in',
    '',
    '',
    '',
    'https://www.mca.gov.in/content/mca/global/en/mca/e-filing-services.html',
    'https://www.mca.gov.in/content/mca/global/en/acts-rules/ebooks/company-incorporation.html',
    'Corporate Identification Number (CIN)',
  ),
  CN:   office(
    'State Administration for Market Regulation (Enterprise Registration)',
    '+86 10 8865 0000',
    'No. 8 Sanlihe East Road, Xicheng District, Beijing, China',
    'https://www.samr.gov.cn',
    '',
    '',
    '',
    '',
    'https://zwfw.samr.gov.cn',
    'https://www.gov.cn/fuwu/2015-12/09/content_5022390.htm',
    'Unified Social Credit Code',
  ),
  ZA:   office(
    'Companies and Intellectual Property Commission (CIPC South Africa)',
    '+27 86 100 2472',
    'the dti Campus, 77 Meintjies Street, Sunnyside, Pretoria, South Africa',
    'https://www.cipc.co.za',
    'info@cipc.co.za',
    'https://x.com/theCIPC',
    '',
    'https://www.linkedin.com/company/cipc/',
    'https://www.cipc.co.za/?page_id=3781',
    'https://www.cipc.co.za/?page_id=3791',
    'Enterprise Number',
  ),
}
