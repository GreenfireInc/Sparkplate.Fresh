import type { ArabLeagueMemberIsoCode } from './arabLeagueMemberIsoCodes'
import type { BondMarketVenue } from './types'

function b(
  name: string,
  website: string,
  email: string,
  twitter: string,
  linkedin: string,
  apiEndpoint: string,
): BondMarketVenue {
  return { name, website, email, twitter, linkedin, apiEndpoint }
}

/**
 * Bond market venues by ISO 3166-1 alpha-2 for League of Arab States members (informational;
 * verify URLs, handles, and API bases before production use). The Arab League spans the
 * Gulf sovereign-bond hubs (SA Tadawul / Sukuk, AE ADX/DFM, QA QSE, KW Boursa Kuwait),
 * North African listed markets (DZ SGBV, MA Casablanca, TN BVMT, EG EGX), Levant exchanges
 * (JO ASE, LB BSE, PS Palestine Exchange, IQ ISX), and central-bank-only desks where no
 * liquid listed bond venue exists (DJ, KM, MR, SO, YE). Multiple venues are listed where
 * they coexist (AE: ADX + DFM + Nasdaq Dubai; MA: Casablanca + Trésor; EG: EGX + MoF DMU).
 * `apiEndpoint` is the empty string for virtually all venues — distribution via paid
 * Bloomberg / Refinitiv / vendor feeds. Verify periodically.
 */
export const ARAB_LEAGUE_BOND_MARKETS: Record<
  ArabLeagueMemberIsoCode,
  readonly BondMarketVenue[]
> = {
  DZ: [
    b(
      'Bourse d\'Alger (Société de Gestion de la Bourse des Valeurs — SGBV)',
      'https://www.sgbv.dz',
      'contact@sgbv.dz',
      '',
      '',
      '',
    ),
  ],
  BH: [
    b(
      'Bahrain Bourse',
      'https://www.bahrainbourse.com',
      'info@bahrainbourse.com',
      'https://x.com/BahrainBourse',
      'https://www.linkedin.com/company/bahrain-bourse/',
      '',
    ),
    b(
      'Central Bank of Bahrain (CBB — sovereign Sukuk primary)',
      'https://www.cbb.gov.bh',
      'info@cbb.gov.bh',
      'https://x.com/CentralBankBH',
      'https://www.linkedin.com/company/central-bank-of-bahrain/',
      '',
    ),
  ],
  KM: [
    b(
      'Banque Centrale des Comores (T-bills desk; no listed bond venue)',
      'https://www.banque-comores.km',
      'bcc@banque-comores.km',
      '',
      '',
      '',
    ),
  ],
  DJ: [
    b(
      'Banque Centrale de Djibouti (T-bills desk; no listed bond venue)',
      'https://banque-centrale.dj',
      'info@banque-centrale.dj',
      '',
      '',
      '',
    ),
  ],
  EG: [
    b(
      'Egyptian Exchange (EGX)',
      'https://www.egx.com.eg',
      'egxinfo@egx.com.eg',
      'https://x.com/EGX_Egypt',
      'https://www.linkedin.com/company/the-egyptian-exchange/',
      '',
    ),
    b(
      'Ministry of Finance — Debt Management Unit (sovereign primary)',
      'https://www.mof.gov.eg',
      'contact@mof.gov.eg',
      '',
      '',
      '',
    ),
  ],
  IQ: [
    b(
      'Iraq Stock Exchange (ISX)',
      'https://www.isx-iq.net',
      'info@isx-iq.net',
      '',
      '',
      '',
    ),
    b(
      'Central Bank of Iraq (government bond auctions)',
      'https://cbi.iq',
      'info@cbi.iq',
      '',
      '',
      '',
    ),
  ],
  JO: [
    b(
      'Amman Stock Exchange (ASE)',
      'https://www.ase.com.jo',
      'info@ase.com.jo',
      'https://x.com/ASEJO',
      'https://www.linkedin.com/company/amman-stock-exchange/',
      '',
    ),
    b(
      'Ministry of Finance — Public Debt Department (sovereign primary)',
      'https://www.mof.gov.jo',
      'info@mof.gov.jo',
      '',
      '',
      '',
    ),
  ],
  KW: [
    b(
      'Boursa Kuwait (Kuwait Stock Exchange)',
      'https://www.boursakuwait.com.kw',
      'info@boursakuwait.com.kw',
      'https://x.com/BoursaKuwait',
      'https://www.linkedin.com/company/boursa-kuwait/',
      '',
    ),
    b(
      'Central Bank of Kuwait (CBK — sovereign bond auctions)',
      'https://www.cbk.gov.kw',
      'info@cbk.gov.kw',
      '',
      'https://www.linkedin.com/company/central-bank-of-kuwait/',
      '',
    ),
  ],
  LB: [
    b(
      'Beirut Stock Exchange (BSE)',
      'https://www.bse.com.lb',
      'info@bse.com.lb',
      '',
      '',
      '',
    ),
    b(
      'Ministry of Finance — Public Debt Management (sovereign primary)',
      'https://www.finance.gov.lb',
      'info@finance.gov.lb',
      '',
      '',
      '',
    ),
  ],
  LY: [
    b(
      'Libyan Stock Market (LSM)',
      'https://www.lsm.ly',
      'info@lsm.ly',
      '',
      '',
      '',
    ),
  ],
  MR: [
    b(
      'Banque Centrale de Mauritanie (T-bills desk; no listed bond venue)',
      'https://www.bcm.mr',
      'bcm@bcm.mr',
      '',
      '',
      '',
    ),
  ],
  MA: [
    b(
      'Bourse de Casablanca',
      'https://www.casablanca-bourse.com',
      'contact@casablanca-bourse.com',
      '',
      'https://www.linkedin.com/company/bourse-de-casablanca/',
      '',
    ),
    b(
      'Trésor du Royaume du Maroc — Direction du Trésor (sovereign primary)',
      'https://www.finances.gov.ma',
      'contact@dtfe.gov.ma',
      '',
      '',
      '',
    ),
  ],
  OM: [
    b(
      'Muscat Securities Market (MSM)',
      'https://www.msx.om',
      'info@msx.om',
      'https://x.com/MuscatSecMarket',
      'https://www.linkedin.com/company/muscat-securities-market/',
      '',
    ),
    b(
      'Central Bank of Oman (CBO — government development bonds)',
      'https://www.cbo.gov.om',
      'info@cbo.gov.om',
      '',
      '',
      '',
    ),
  ],
  PS: [
    b(
      'Palestine Exchange (PEX)',
      'https://www.pex.ps',
      'info@pex.ps',
      'https://x.com/PalestineEx',
      'https://www.linkedin.com/company/palestine-exchange/',
      '',
    ),
  ],
  QA: [
    b(
      'Qatar Stock Exchange (QSE)',
      'https://www.qe.com.qa',
      'info@qe.com.qa',
      'https://x.com/QatarExchange',
      'https://www.linkedin.com/company/qatar-stock-exchange/',
      '',
    ),
    b(
      'Ministry of Finance — Public Debt Management (sovereign primary)',
      'https://www.mof.gov.qa',
      'info@mof.gov.qa',
      '',
      '',
      '',
    ),
  ],
  SA: [
    b(
      'Saudi Exchange (Tadawul) — Sukuk & Bonds Market',
      'https://www.saudiexchange.sa',
      'info@saudiexchange.sa',
      'https://x.com/SaudiExchange',
      'https://www.linkedin.com/company/saudi-exchange/',
      '',
    ),
    b(
      'Ministry of Finance — Debt Management Office (sovereign primary)',
      'https://www.mof.gov.sa',
      'info@mof.gov.sa',
      '',
      '',
      '',
    ),
  ],
  SO: [
    b(
      'Central Bank of Somalia (T-bills desk; no listed bond venue)',
      'https://www.centralbank.gov.so',
      'info@centralbank.gov.so',
      '',
      '',
      '',
    ),
  ],
  SD: [
    b(
      'Khartoum Stock Exchange (KSE) — Sukuk and bonds',
      'https://www.kse.sd',
      'info@kse.sd',
      '',
      'https://www.linkedin.com/company/khartoum-stock-exchange/',
      '',
    ),
  ],
  SY: [
    b(
      'Damascus Securities Exchange (DSE — limited activity; verify status)',
      'http://www.dse.sy',
      'info@dse.sy',
      '',
      '',
      '',
    ),
  ],
  TN: [
    b(
      'Bourse de Tunis (BVMT)',
      'https://www.bvmt.com.tn',
      'bvmt@bvmt.com.tn',
      '',
      'https://www.linkedin.com/company/bourse-de-tunis/',
      '',
    ),
  ],
  AE: [
    b(
      'Abu Dhabi Securities Exchange (ADX)',
      'https://www.adx.ae',
      'info@adx.ae',
      'https://x.com/ADXUAE',
      'https://www.linkedin.com/company/abu-dhabi-securities-exchange/',
      '',
    ),
    b(
      'Dubai Financial Market (DFM)',
      'https://www.dfm.ae',
      'info@dfm.ae',
      'https://x.com/DubaiFinancialMarket',
      'https://www.linkedin.com/company/dubai-financial-market/',
      '',
    ),
    b(
      'Nasdaq Dubai (international bond listing hub)',
      'https://www.nasdaqdubai.com',
      'info@nasdaqdubai.com',
      '',
      'https://www.linkedin.com/company/nasdaq-dubai/',
      '',
    ),
  ],
  YE: [
    b(
      'Central Bank of Yemen (T-bills desk; no listed bond venue)',
      'https://www.centralbank.gov.ye',
      'info@centralbank.gov.ye',
      '',
      '',
      '',
    ),
  ],
}
