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

export const montserrat: OecsCountry = {
  name: 'Montserrat',
  iso3166Alpha2: 'MS',
  capital: 'Brades (de facto; Plymouth evacuated)',
  coordinates: { latitude: 16.7425, longitude: -62.1874 },
  independence:
    'British Overseas Territory (UK internal self-government); OECS Treaty of Basseterre participant — informational',
  topMajorCities: ['Brades', 'Little Bay', 'St. Peters', 'Salem', 'Woodlands'],
  population: 4400,
  mainLanguages: ['English', 'Montserrat Creole', 'Regional Spanish (neighbor communities)'],
  currency: 'East Caribbean dollar (XCD; ECCB currency union)',
  timezone: 'America/Montserrat',
  foundingLeader: 'William Henry Bramble-era Chief Minister reference — informational',
  currentLeader: 'Premier — verify; Governor (UK appointed) — verify',
  cryptocurrencyExchanges: ['Regional remittance OTC — informational'],
  stablecoin: 'XCD peg; informal USD-stable — informational',
  domesticCourierServices: OECS_DOMESTIC_COURIERS['MS'],
  newsOutlets: OECS_NEWS_OUTLETS['MS'],
  notableUniversities: OECS_NOTABLE_UNIVERSITIES['MS'],
  mainExportCommodities: OECS_MAIN_EXPORT_COMMODITIES['MS'],
  mainExportedElements: OECS_MAIN_EXPORTED_ELEMENTS['MS'],
  rareEarths: OECS_RARE_EARTHS['MS'],
  stockExchange: 'Eastern Caribbean Securities Exchange regional access — informational',
  bondMarkets: OECS_BOND_MARKETS['MS'],
  mainInternationalAirport: OECS_MAIN_INTERNATIONAL_AIRPORTS['MS'],
  intellectualPropertyDepartments: OECS_INTELLECTUAL_PROPERTY_DEPARTMENTS['MS'],
  securitiesExchangeCommission: OECS_SECURITIES_EXCHANGE_COMMISSIONS['MS'],
}
