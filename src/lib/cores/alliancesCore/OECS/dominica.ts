import type { OecsCountry } from './types'
import { OECS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECS_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OECS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OECS_RARE_EARTHS } from './rareEarthsByIso'
import { OECS_BOND_MARKETS } from './bondMarketsByIso'
import { OECS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { OECS_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { OECS_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const dominica: OecsCountry = {
  name: 'Commonwealth of Dominica',
  iso3166Alpha2: 'DM',
  capital: 'Roseau',
  coordinates: { latitude: 15.3092, longitude: -61.3794 },
  independence:
    '1978-11-03 independent state; OECS Treaty of Basseterre 1981 founding signatory — informational',
  topMajorCities: ['Roseau', 'Portsmouth', 'Marigot', 'Mahaut', 'Saint Joseph'],
  population: 72000,
  mainLanguages: ['English', 'Dominican Creole', 'Kokoy'],
  currency: 'East Caribbean dollar (XCD; ECCB currency union)',
  timezone: 'America/Dominica',
  foundingLeader: 'Patrick John (first Prime Minister)',
  currentLeader: 'Prime Minister Roosevelt Skerrit — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance-style P2P informal — informational'],
  stablecoin: 'XCD USD peg; informal stable settlement — informational',
  domesticCourierServices: OECS_DOMESTIC_COURIERS['DM'],
  newsOutlets: OECS_NEWS_OUTLETS['DM'],
  notableUniversities: OECS_NOTABLE_UNIVERSITIES['DM'],
  mainExportCommodities: OECS_MAIN_EXPORT_COMMODITIES['DM'],
  mainExportedElements: OECS_MAIN_EXPORTED_ELEMENTS['DM'],
  rareEarths: OECS_RARE_EARTHS['DM'],
  stockExchange: 'Eastern Caribbean Securities Exchange (ECSE)',
  bondMarkets: OECS_BOND_MARKETS['DM'],
  mainInternationalAirport: OECS_MAIN_INTERNATIONAL_AIRPORTS['DM'],
  intellectualPropertyDepartments: OECS_INTELLECTUAL_PROPERTY_DEPARTMENTS['DM'],
  securitiesExchangeCommission: OECS_SECURITIES_EXCHANGE_COMMISSIONS['DM'],
}
