import type { EuMemberIsoCode } from './euMemberIsoCodes'
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
 * Bond market venues by ISO 3166-1 alpha-2 for EU member states in this module
 * (informational; verify URLs, handles, and API bases before production use). The EU
 * subset here covers all 27 post-Brexit member states. Pattern:
 *   - National or Euronext-affiliated listed-bond exchanges appear as the primary entry.
 *   - Sovereign primary-market desks (DMO / debt agency / treasury) are listed alongside
 *     exchanges for all members.
 *   - Luxembourg (LU) is a major euro-denominated bond listing hub (LuxSE).
 * `apiEndpoint` is the empty string for virtually all venues — distribution via paid
 * Bloomberg / Refinitiv / vendor feeds. Verify periodically.
 */
export const EU_BOND_MARKETS: Record<EuMemberIsoCode, readonly BondMarketVenue[]> = {
  AT: [
    b(
      'Wiener Börse AG (Vienna Stock Exchange)',
      'https://www.wienerborse.at',
      'info@wienerborse.at',
      'https://x.com/wienerborse',
      'https://www.linkedin.com/company/wiener-boerse-ag/',
      '',
    ),
    b(
      'Oesterreichische Kontrollbank (OeKB — sovereign primary)',
      'https://www.oekb.at',
      'info@oekb.at',
      '',
      '',
      '',
    ),
  ],
  BE: [
    b(
      'Euronext Brussels — Fixed Income',
      'https://www.euronext.com',
      'info@euronext.com',
      'https://x.com/Euronext',
      'https://www.linkedin.com/company/euronext/',
      '',
    ),
    b(
      'Belgian Debt Agency (Agence de la Dette — sovereign primary)',
      'https://www.debtagency.be',
      'info@debtagency.be',
      '',
      '',
      '',
    ),
  ],
  BG: [
    b(
      'Bulgarian Stock Exchange (BSE)',
      'https://www.bse-sofia.bg',
      'info@bse-sofia.bg',
      '',
      'https://www.linkedin.com/company/bulgarian-stock-exchange/',
      '',
    ),
    b(
      'Ministry of Finance — Public Debt Directorate (sovereign primary)',
      'https://www.minfin.bg',
      'info@minfin.bg',
      '',
      '',
      '',
    ),
  ],
  HR: [
    b(
      'Zagreb Stock Exchange (ZSE)',
      'https://www.zse.hr',
      'info@zse.hr',
      'https://x.com/ZSEhr',
      'https://www.linkedin.com/company/zagreb-stock-exchange/',
      '',
    ),
    b(
      'Ministry of Finance — State Debt (sovereign primary)',
      'https://mfin.gov.hr',
      'info@mfin.hr',
      '',
      '',
      '',
    ),
  ],
  CY: [
    b(
      'Cyprus Stock Exchange (CSE)',
      'https://www.cse.com.cy',
      'info@cse.com.cy',
      '',
      'https://www.linkedin.com/company/cyprus-stock-exchange/',
      '',
    ),
    b(
      'Public Debt Management Office — Ministry of Finance (sovereign primary)',
      'https://www.mof.gov.cy',
      'info@mof.gov.cy',
      '',
      '',
      '',
    ),
  ],
  CZ: [
    b(
      'Prague Stock Exchange (PSE)',
      'https://www.pse.cz',
      'info@pse.cz',
      '',
      'https://www.linkedin.com/company/prague-stock-exchange/',
      '',
    ),
    b(
      'Ministry of Finance — Central Government Debt (sovereign primary)',
      'https://www.mfcr.cz',
      'info@mfcr.cz',
      '',
      '',
      '',
    ),
  ],
  DK: [
    b(
      'Nasdaq Copenhagen — Fixed Income',
      'https://www.nasdaq.com/solutions/nasdaq-copenhagen',
      'info@nasdaq.com',
      'https://x.com/Nasdaq',
      'https://www.linkedin.com/company/nasdaq/',
      '',
    ),
    b(
      'Danmarks Nationalbank — Government Debt (sovereign primary)',
      'https://www.nationalbanken.dk',
      'info@nationalbanken.dk',
      'https://x.com/DanmarksNB',
      'https://www.linkedin.com/company/danmarks-nationalbank/',
      '',
    ),
  ],
  EE: [
    b(
      'Nasdaq Baltic — Tallinn (fixed income listings)',
      'https://www.nasdaqbaltic.com',
      'info@nasdaqbaltic.com',
      '',
      'https://www.linkedin.com/company/nasdaq-baltic/',
      '',
    ),
    b(
      'State Treasury — Ministry of Finance (sovereign primary)',
      'https://www.rahandusministeerium.ee',
      'info@fin.ee',
      '',
      '',
      '',
    ),
  ],
  FI: [
    b(
      'Nasdaq Helsinki — Fixed Income',
      'https://www.nasdaq.com/solutions/nasdaq-helsinki',
      'info@nasdaq.com',
      'https://x.com/Nasdaq',
      'https://www.linkedin.com/company/nasdaq/',
      '',
    ),
    b(
      'State Treasury — Ministry of Finance (sovereign primary)',
      'https://www.treasuryfinland.fi',
      'info@treasuryfinland.fi',
      '',
      '',
      '',
    ),
  ],
  FR: [
    b(
      'Euronext Paris — Fixed Income',
      'https://www.euronext.com',
      'info@euronext.com',
      'https://x.com/Euronext',
      'https://www.linkedin.com/company/euronext/',
      '',
    ),
    b(
      'Agence France Trésor (AFT — sovereign primary)',
      'https://www.aft.gouv.fr',
      'info@aft.gouv.fr',
      'https://x.com/AgenceFranceTresor',
      'https://www.linkedin.com/company/agence-france-tresor/',
      '',
    ),
  ],
  DE: [
    b(
      'Frankfurt Stock Exchange (Deutsche Börse) — Xetra Bonds',
      'https://www.deutsche-boerse.com',
      'info@deutsche-boerse.com',
      'https://x.com/deutscheboerse',
      'https://www.linkedin.com/company/deutsche-boerse/',
      '',
    ),
    b(
      'Bundesrepublik Deutschland — Finanzagentur (sovereign primary)',
      'https://www.deutsche-finanzagentur.de',
      'info@finanzagentur.de',
      'https://x.com/Finanzagentur',
      'https://www.linkedin.com/company/deutsche-finanzagentur/',
      '',
    ),
  ],
  GR: [
    b(
      'Athens Exchange (ATHEX) — Fixed Income Market',
      'https://www.athexgroup.gr',
      'info@athexgroup.gr',
      'https://x.com/athexgroup',
      'https://www.linkedin.com/company/athex/',
      '',
    ),
    b(
      'Public Debt Management Agency (PDMA — sovereign primary)',
      'https://www.pdma.gr',
      'info@pdma.gr',
      '',
      '',
      '',
    ),
  ],
  HU: [
    b(
      'Budapest Stock Exchange (BSE)',
      'https://www.bse.hu',
      'info@bse.hu',
      'https://x.com/BudapestSE',
      'https://www.linkedin.com/company/budapest-stock-exchange/',
      '',
    ),
    b(
      'Government Debt Management Agency (ÁKK — sovereign primary)',
      'https://www.allamadossag.hu',
      'info@akk.hu',
      '',
      '',
      '',
    ),
  ],
  IE: [
    b(
      'Euronext Dublin — Fixed Income (Irish Stock Exchange)',
      'https://www.euronext.com',
      'info@euronext.com',
      'https://x.com/Euronext',
      'https://www.linkedin.com/company/euronext/',
      '',
    ),
    b(
      'National Treasury Management Agency (NTMA — sovereign primary)',
      'https://www.ntma.ie',
      'info@ntma.ie',
      'https://x.com/NTMAireland',
      'https://www.linkedin.com/company/ntma/',
      '',
    ),
  ],
  IT: [
    b(
      'Euronext Milan (Borsa Italiana) — MOT / EuroTLX bond segment',
      'https://www.borsaitaliana.it',
      'info@borsaitaliana.it',
      'https://x.com/borsaitaliana',
      'https://www.linkedin.com/company/borsa-italiana/',
      '',
    ),
    b(
      'Ministero dell\'Economia e delle Finanze — Dipartimento del Tesoro (sovereign primary)',
      'https://www.mef.gov.it',
      'info@dt.mef.gov.it',
      '',
      '',
      '',
    ),
  ],
  LV: [
    b(
      'Nasdaq Riga (fixed income listings)',
      'https://www.nasdaqbaltic.com',
      'info@nasdaqbaltic.com',
      '',
      'https://www.linkedin.com/company/nasdaq-baltic/',
      '',
    ),
    b(
      'State Treasury — Ministry of Finance (sovereign primary)',
      'https://www.fm.gov.lv',
      'info@fm.gov.lv',
      '',
      '',
      '',
    ),
  ],
  LT: [
    b(
      'Nasdaq Vilnius (fixed income listings)',
      'https://www.nasdaqbaltic.com',
      'info@nasdaqbaltic.com',
      '',
      'https://www.linkedin.com/company/nasdaq-baltic/',
      '',
    ),
    b(
      'State Debt Management — Ministry of Finance (sovereign primary)',
      'https://www.finmin.lt',
      'info@finmin.lt',
      '',
      '',
      '',
    ),
  ],
  LU: [
    b(
      'Luxembourg Stock Exchange (LuxSE)',
      'https://www.luxse.com',
      'info@luxse.com',
      'https://x.com/LuxembourgSE',
      'https://www.linkedin.com/company/luxembourg-stock-exchange/',
      '',
    ),
    b(
      'Agence de l\'État — Administration de la Dette (sovereign primary)',
      'https://www.aetat.lu',
      'info@aetat.lu',
      '',
      '',
      '',
    ),
  ],
  MT: [
    b(
      'Malta Stock Exchange (MSE)',
      'https://www.borzamalta.com.mt',
      'info@borzamalta.com.mt',
      '',
      'https://www.linkedin.com/company/malta-stock-exchange/',
      '',
    ),
    b(
      'Central Bank of Malta (Malta Government Stocks primary)',
      'https://www.centralbankmalta.org',
      'info@centralbankmalta.org',
      '',
      '',
      '',
    ),
  ],
  NL: [
    b(
      'Euronext Amsterdam — Fixed Income',
      'https://www.euronext.com',
      'info@euronext.com',
      'https://x.com/Euronext',
      'https://www.linkedin.com/company/euronext/',
      '',
    ),
    b(
      'Dutch State Treasury Agency (DSTA — sovereign primary)',
      'https://www.dsta.nl',
      'info@dsta.nl',
      'https://x.com/DSTA_NL',
      'https://www.linkedin.com/company/dutch-state-treasury-agency/',
      '',
    ),
  ],
  PL: [
    b(
      'Warsaw Stock Exchange (GPW) — Catalyst bond market',
      'https://www.gpw.pl',
      'info@gpw.pl',
      'https://x.com/Warsaw_Stock',
      'https://www.linkedin.com/company/warsaw-stock-exchange/',
      '',
    ),
    b(
      'Ministry of Finance — Public Debt (sovereign primary)',
      'https://www.gov.pl/web/finance',
      'info@mf.gov.pl',
      '',
      '',
      '',
    ),
  ],
  PT: [
    b(
      'Euronext Lisbon — Fixed Income Market',
      'https://www.euronext.com',
      'info@euronext.com',
      'https://x.com/Euronext',
      'https://www.linkedin.com/company/euronext/',
      '',
    ),
    b(
      'IGCP — Agência de Gestão da Tesouraria e da Dívida Pública (sovereign primary)',
      'https://www.igcp.pt',
      'info@igcp.pt',
      '',
      '',
      '',
    ),
  ],
  RO: [
    b(
      'Bucharest Stock Exchange (BVB)',
      'https://www.bvb.ro',
      'info@bvb.ro',
      'https://x.com/BVB_Ro',
      'https://www.linkedin.com/company/bucharest-stock-exchange/',
      '',
    ),
    b(
      'Ministry of Public Finance — Public Debt (sovereign primary)',
      'https://www.mfinante.gov.ro',
      'info@mfinante.gov.ro',
      '',
      '',
      '',
    ),
  ],
  SK: [
    b(
      'Bratislava Stock Exchange (BSSE)',
      'https://www.bsse.sk',
      'info@bsse.sk',
      '',
      '',
      '',
    ),
    b(
      'Agentúra pre riadenie dlhu a likvidity (ARDAL — sovereign primary)',
      'https://www.ardal.sk',
      'info@ardal.sk',
      '',
      '',
      '',
    ),
  ],
  SI: [
    b(
      'Ljubljana Stock Exchange (LJSE)',
      'https://www.ljse.si',
      'info@ljse.si',
      '',
      'https://www.linkedin.com/company/ljubljana-stock-exchange/',
      '',
    ),
    b(
      'Ministry of Finance — Public Debt (sovereign primary)',
      'https://www.gov.si',
      'info@mf.gov.si',
      '',
      '',
      '',
    ),
  ],
  ES: [
    b(
      'BME — Bolsa y Mercados Españoles (Fixed Income)',
      'https://www.bme.es',
      'info@bme.es',
      'https://x.com/BME_Markets',
      'https://www.linkedin.com/company/bme/',
      '',
    ),
    b(
      'Agencia de Administración de la Deuda Pública (AADP — sovereign primary)',
      'https://www.aadp.es',
      'info@aadp.es',
      '',
      '',
      '',
    ),
  ],
  SE: [
    b(
      'Nasdaq Stockholm — Fixed Income',
      'https://www.nasdaq.com/solutions/nasdaq-nordic',
      'info@nasdaq.com',
      'https://x.com/Nasdaq',
      'https://www.linkedin.com/company/nasdaq/',
      '',
    ),
    b(
      'Swedish National Debt Office (Riksgälden — sovereign primary)',
      'https://www.riksgalden.se',
      'info@riksgalden.se',
      'https://x.com/Riksgalden',
      'https://www.linkedin.com/company/riksgalden/',
      '',
    ),
  ],
}
