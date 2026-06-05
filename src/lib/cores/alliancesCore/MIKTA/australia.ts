import type { MiktaCountry } from './types'
import { MIKTA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { MIKTA_NEWS_OUTLETS } from './newsOutletsByIso'
import { MIKTA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { MIKTA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { MIKTA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { MIKTA_RARE_EARTHS } from './rareEarthsByIso'
import { MIKTA_BOND_MARKETS } from './bondMarketsByIso'
import { MIKTA_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { MIKTA_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { MIKTA_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const australia: MiktaCountry = {
  name: 'Australia',
  iso3166Alpha2: 'AU',
  capital: 'Canberra',
  coordinates: { latitude: -35.2809, longitude: 149.13 },
  independence:
    '1901-01-01 Federation of the Commonwealth of Australia (six colonies); Statute of Westminster Adoption 1942; Australia Act 1986; Five Eyes / G20 / MIKTA middle-power voice — informational',
  topMajorCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  population: 26700000,
  mainLanguages: ['English', 'Mandarin (community)', 'Australian Aboriginal languages (heritage)'],
  currency: 'Australian dollar (AUD)',
  timezone: 'Australia/Sydney',
  foundingLeader:
    'Sir Edmund Barton (first Prime Minister 1901); Sir Henry Parkes federation advocate — informational',
  currentLeader: 'Prime Minister Anthony Albanese — verify',
  cryptocurrencyExchanges: ['Independent Reserve', 'BTC Markets', 'CoinJar / Swyftx AUSTRAC registration regime — informational'],
  stablecoin: 'AUDD (Novatti) and AUDC pilots; ANZ A$DC bank-issued settlement experiments — informational',
  domesticCourierServices: MIKTA_DOMESTIC_COURIERS['AU'],
  newsOutlets: MIKTA_NEWS_OUTLETS['AU'],
  notableUniversities: MIKTA_NOTABLE_UNIVERSITIES['AU'],
  mainExportCommodities: MIKTA_MAIN_EXPORT_COMMODITIES['AU'],
  mainExportedElements: MIKTA_MAIN_EXPORTED_ELEMENTS['AU'],
  rareEarths: MIKTA_RARE_EARTHS['AU'],
  stockExchange: 'Australian Securities Exchange ASX (Sydney)',
  bondMarkets: MIKTA_BOND_MARKETS['AU'],
  mainInternationalAirport: MIKTA_MAIN_INTERNATIONAL_AIRPORTS['AU'],
  intellectualPropertyDepartments: MIKTA_INTELLECTUAL_PROPERTY_DEPARTMENTS['AU'],
  securitiesExchangeCommission: MIKTA_SECURITIES_EXCHANGE_COMMISSIONS['AU'],
}
