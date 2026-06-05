import type { G20SovereignMemberIsoCode } from './g20MemberIsoCodes'
import type { SecuritiesExchangeCommission } from './types'

function sec(
  name: string,
  website: string,
  email: string,
  twitter: string,
  linkedin: string,
  formsUrl: string,
  apiEndpoint = '',
): SecuritiesExchangeCommission {
  return { name, website, email, twitter, linkedin, formsUrl, apiEndpoint }
}

/**
 * Securities and exchange / capital-markets commission by ISO 3166-1 alpha-2 for G20
 * sovereign member states in this module (informational; verify URLs, handles, forms portals,
 * and API bases before production use). Self-contained — no imports from other alliance
 * modules. Institutional members (AU, EU) use their own regulatory frameworks and are not
 * included here. `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.iosco.org/about/membership/
 */
export const G20_SECURITIES_EXCHANGE_COMMISSIONS: Record<
  G20SovereignMemberIsoCode,
  SecuritiesExchangeCommission
> = {
  AR: sec(
    'Comisión Nacional de Valores (CNV Argentina)',
    'https://www.cnv.gob.ar',
    'infoleg@cnv.gob.ar',
    'https://x.com/cnv_argentina',
    'https://www.linkedin.com/company/comisi%C3%B3n-nacional-de-valores-argentina/',
    'https://www.cnv.gob.ar',
  ),
  AU: sec(
    'Australian Securities and Investments Commission (ASIC)',
    'https://asic.gov.au',
    'enquiries@asic.gov.au',
    'https://x.com/ASICConnect',
    'https://www.linkedin.com/company/asic/',
    'https://asic.gov.au/online-services/',
  ),
  BR: sec(
    'Comissão de Valores Mobiliários (CVM Brazil)',
    'https://www.gov.br/cvm',
    'cvm@cvm.gov.br',
    'https://x.com/CVM_Brasil',
    'https://www.linkedin.com/company/cvm---comissão-de-valores-mobiliários/',
    'https://www.gov.br/cvm',
  ),
  CA: sec(
    'Canadian Securities Administrators (CSA)',
    'https://www.securities-administrators.ca',
    'info@csa-acvm.ca',
    'https://x.com/CSA_News',
    'https://www.linkedin.com/company/canadian-securities-administrators/',
    'https://www.securities-administrators.ca',
  ),
  CN: sec(
    'China Securities Regulatory Commission (CSRC)',
    'https://www.csrc.gov.cn',
    'csrc@csrc.gov.cn',
    '',
    'https://www.linkedin.com/company/china-securities-regulatory-commission/',
    'https://www.csrc.gov.cn',
  ),
  FR: sec(
    'Autorité des marchés financiers (AMF France)',
    'https://www.amf-france.org',
    'relationsemet@amf-france.org',
    'https://x.com/AMF_actu',
    'https://www.linkedin.com/company/autorité-des-marchés-financiers-amf/',
    'https://www.amf-france.org',
  ),
  DE: sec(
    'Bundesanstalt für Finanzdienstleistungsaufsicht (BaFin)',
    'https://www.bafin.de',
    'poststelle@bafin.de',
    'https://x.com/BaFin_de',
    'https://www.linkedin.com/company/bafin/',
    'https://www.bafin.de',
  ),
  IN: sec(
    'Securities and Exchange Board of India (SEBI)',
    'https://www.sebi.gov.in',
    'sebi@sebi.gov.in',
    'https://x.com/SEBI_India',
    'https://www.linkedin.com/company/sebi/',
    'https://www.sebi.gov.in',
  ),
  ID: sec(
    'Otoritas Jasa Keuangan (OJK Indonesia)',
    'https://www.ojk.go.id',
    'konsumen@ojk.go.id',
    'https://x.com/ojkindonesia',
    'https://www.linkedin.com/company/otoritas-jasa-keuangan/',
    'https://www.ojk.go.id',
  ),
  IT: sec(
    'Commissione Nazionale per le Società e la Borsa (CONSOB)',
    'https://www.consob.it',
    'consob@consob.it',
    'https://x.com/consob_it',
    'https://www.linkedin.com/company/consob/',
    'https://www.consob.it',
  ),
  JP: sec(
    'Financial Services Agency Japan (FSA)',
    'https://www.fsa.go.jp',
    'info@fsa.go.jp',
    'https://x.com/FSA_JAPAN',
    'https://www.linkedin.com/company/financial-services-agency-japan/',
    'https://www.fsa.go.jp',
  ),
  MX: sec(
    'Comisión Nacional Bancaria y de Valores (CNBV Mexico)',
    'https://www.gob.mx/cnbv',
    'contacto@cnbv.gob.mx',
    'https://x.com/CNBV_mx',
    'https://www.linkedin.com/company/cnbv/',
    'https://www.gob.mx/cnbv',
  ),
  RU: sec(
    'Bank of Russia — financial markets regulation',
    'https://www.cbr.ru',
    'internet@cbr.ru',
    'https://x.com/bankofrussia',
    'https://www.linkedin.com/company/bank-of-russia/',
    'https://www.cbr.ru',
  ),
  SA: sec(
    'Capital Market Authority Saudi Arabia (CMA)',
    'https://www.cma.org.sa',
    'cma@cma.org.sa',
    'https://x.com/CMA_Saudi',
    'https://www.linkedin.com/company/capital-market-authority-saudi-arabia/',
    'https://www.cma.org.sa',
  ),
  ZA: sec(
    'Financial Sector Conduct Authority South Africa (FSCA)',
    'https://www.fsca.co.za',
    'info@fsca.co.za',
    'https://x.com/FSCA_ZA',
    'https://www.linkedin.com/company/financial-sector-conduct-authority/',
    'https://www.fsca.co.za',
  ),
  KR: sec(
    'Financial Services Commission South Korea (FSC)',
    'https://www.fsc.go.kr',
    'fsc@korea.kr',
    'https://x.com/FSC_Korea_EN',
    'https://www.linkedin.com/company/financial-services-commission-south-korea/',
    'https://www.fsc.go.kr',
  ),
  TR: sec(
    'Capital Markets Board of Turkey (SPK)',
    'https://www.spk.gov.tr',
    'spk@spk.gov.tr',
    'https://x.com/SPK_Kurumu',
    'https://www.linkedin.com/company/sermaye-piyasası-kurulu/',
    'https://www.spk.gov.tr',
  ),
  GB: sec(
    'Financial Conduct Authority (FCA United Kingdom)',
    'https://www.fca.org.uk',
    'consumer.queries@fca.org.uk',
    'https://x.com/TheFCA',
    'https://www.linkedin.com/company/financial-conduct-authority/',
    'https://www.fca.org.uk',
  ),
  US: sec(
    'U.S. Securities and Exchange Commission (SEC)',
    'https://www.sec.gov',
    'help@sec.gov',
    'https://x.com/SECGov',
    'https://www.linkedin.com/company/us-securities-and-exchange-commission/',
    'https://www.sec.gov/forms',
  ),
}
