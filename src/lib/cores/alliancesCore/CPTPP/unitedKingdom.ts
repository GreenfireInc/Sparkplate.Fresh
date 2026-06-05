import type { CptppCountry } from './types'
import { CPTPP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CPTPP_NEWS_OUTLETS } from './newsOutletsByIso'
import { CPTPP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CPTPP_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CPTPP_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CPTPP_RARE_EARTHS } from './rareEarthsByIso'
import { CPTPP_BOND_MARKETS } from './bondMarketsByIso'
import { CPTPP_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { CPTPP_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { CPTPP_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const unitedKingdom: CptppCountry = {
  name: 'United Kingdom',
  iso3166Alpha2: 'GB',
  capital: 'London',
  coordinates: { latitude: 51.5074, longitude: -0.1278 },
  independence:
    'Sovereign state; Acts of Union 1707 / 1800 background — informational (CPTPP accession party)',
  topMajorCities: ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Leeds'],
  population: 68000000,
  mainLanguages: ['English', 'Welsh', 'Scots Gaelic'],
  currency: 'Pound sterling (GBP)',
  timezone: 'Europe/London',
  foundingLeader: 'Robert Walpole modern PM precedent / union-era monarchs — informational',
  currentLeader: 'King Charles III; Prime Minister Keir Starmer — verify',
  cryptocurrencyExchanges: ['Coinbase', 'Kraken', 'Gemini EU/UK hubs', 'FCA-register evolution'],
  stablecoin: 'GBP stablecoins (EMI issuers); USDC institutional',
  domesticCourierServices: CPTPP_DOMESTIC_COURIERS['GB'],
  newsOutlets: CPTPP_NEWS_OUTLETS['GB'],
  notableUniversities: CPTPP_NOTABLE_UNIVERSITIES['GB'],
  mainExportCommodities: CPTPP_MAIN_EXPORT_COMMODITIES['GB'],
  mainExportedElements: CPTPP_MAIN_EXPORTED_ELEMENTS['GB'],
  rareEarths: CPTPP_RARE_EARTHS['GB'],
  stockExchange: 'London Stock Exchange Group (LSEG)',
  bondMarkets: CPTPP_BOND_MARKETS['GB'],
  intellectualPropertyDepartments: CPTPP_INTELLECTUAL_PROPERTY_DEPARTMENTS['GB'],
  securitiesExchangeCommission: CPTPP_SECURITIES_EXCHANGE_COMMISSIONS['GB'],
  mainInternationalAirport: CPTPP_MAIN_INTERNATIONAL_AIRPORTS['GB'],
}
