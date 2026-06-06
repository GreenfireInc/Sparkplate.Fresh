import type { CaricomMemberIsoCode } from './caricomMemberIsoCodes'
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

/** Eastern Caribbean Securities Regulatory Commission — shared by AG, DM, GD, KN, LC, VC. */
const ECSRC = sec(
  'Eastern Caribbean Securities Regulatory Commission (ECSRC)',
  'https://www.ecsrc.com',
  'ecsrc@ecsrc.com',
  '',
  '',
  'https://www.ecsrc.com',
)

/**
 * Securities and exchange / capital-markets commission by ISO 3166-1 alpha-2 for CARICOM
 * full and associate members in this module (informational; verify URLs, handles, forms
 * portals, and API bases before production use). Self-contained — no imports from other
 * alliance modules. `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.iosco.org/about/membership/
 */
export const CARICOM_SECURITIES_EXCHANGE_COMMISSIONS: Record<
  CaricomMemberIsoCode,
  SecuritiesExchangeCommission
> = {
  AG: ECSRC,
  BS: sec(
    'Securities Commission of the Bahamas (SCB)',
    'https://www.scb.gov.bs',
    'info@scb.gov.bs',
    '',
    'https://www.linkedin.com/company/securities-commission-of-the-bahamas/',
    'https://www.scb.gov.bs',
  ),
  BB: sec(
    'Financial Services Commission Barbados (FSC)',
    'https://www.fsc.gov.bb',
    'info@fsc.gov.bb',
    '',
    '',
    'https://www.fsc.gov.bb',
  ),
  BZ: sec(
    'International Financial Services Commission Belize (IFSC)',
    'https://www.ifsc.gov.bz',
    'info@ifsc.gov.bz',
    '',
    '',
    'https://www.ifsc.gov.bz',
  ),
  DM: ECSRC,
  GD: ECSRC,
  GY: sec(
    'Guyana Securities Council (GSC)',
    'https://www.gsc.gov.gy',
    '',
    '',
    '',
    'https://www.gsc.gov.gy',
  ),
  HT: sec(
    'Haiti — capital-markets oversight via Banque de la République d\'Haïti (no dedicated SEC)',
    'https://www.brh.ht',
    '',
    '',
    '',
    'https://www.brh.ht',
  ),
  JM: sec(
    'Financial Services Commission Jamaica (FSC Jamaica)',
    'https://www.fscjamaica.org',
    'info@fscjamaica.org',
    'https://x.com/FSCJamaica',
    'https://www.linkedin.com/company/financial-services-commission-jamaica/',
    'https://www.fscjamaica.org',
  ),
  MS: sec(
    'Montserrat Financial Services Commission (FSC Montserrat)',
    'https://www.fscmontserrat.org',
    'info@fscmontserrat.org',
    '',
    '',
    'https://www.fscmontserrat.org',
  ),
  KN: ECSRC,
  LC: ECSRC,
  VC: ECSRC,
  SR: sec(
    'Centrale Bank van Suriname — capital-markets oversight (no dedicated SEC)',
    'https://www.cbvs.sr',
    'info@cbvs.sr',
    '',
    '',
    'https://www.cbvs.sr',
  ),
  TT: sec(
    'Trinidad and Tobago Securities and Exchange Commission (TTSEC)',
    'https://www.ttsec.org.tt',
    'info@ttsec.org.tt',
    'https://x.com/TTSECtt',
    'https://www.linkedin.com/company/ttsec/',
    'https://www.ttsec.org.tt',
  ),
  AI: sec(
    'Anguilla Financial Services Commission (FSC Anguilla)',
    'https://www.fsc.org.ai',
    'info@fsc.org.ai',
    '',
    '',
    'https://www.fsc.org.ai',
  ),
  BM: sec(
    'Bermuda Monetary Authority (BMA)',
    'https://www.bma.bm',
    'info@bma.bm',
    'https://x.com/Bermuda_BMA',
    'https://www.linkedin.com/company/bermuda-monetary-authority/',
    'https://www.bma.bm',
  ),
  VG: sec(
    'British Virgin Islands Financial Services Commission (FSC BVI)',
    'https://www.bvifsc.vg',
    'info@bvifsc.vg',
    '',
    'https://www.linkedin.com/company/bvi-financial-services-commission/',
    'https://www.bvifsc.vg',
  ),
  KY: sec(
    'Cayman Islands Monetary Authority (CIMA)',
    'https://www.cima.ky',
    'contactus@cima.ky',
    'https://x.com/CaymanCIMA',
    'https://www.linkedin.com/company/cayman-islands-monetary-authority/',
    'https://www.cima.ky',
  ),
  TC: sec(
    'Turks and Caicos Islands Financial Services Commission (TCI FSC)',
    'https://www.tcifsc.tc',
    'info@tcifsc.tc',
    '',
    '',
    'https://www.tcifsc.tc',
  ),
}
