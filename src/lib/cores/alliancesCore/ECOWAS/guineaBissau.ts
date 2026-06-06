import type { EcowasCountry } from './types'
import { ECOWAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECOWAS_NEWS_OUTLETS } from './newsOutletsByIso'
import { ECOWAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ECOWAS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ECOWAS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ECOWAS_RARE_EARTHS } from './rareEarthsByIso'
import { ECOWAS_BOND_MARKETS } from './bondMarketsByIso'
import { ECOWAS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { ECOWAS_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { ECOWAS_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const guineaBissau: EcowasCountry = {
  name: 'Guinea-Bissau',
  iso3166Alpha2: 'GW',
  capital: 'Bissau',
  coordinates: { latitude: 11.8636, longitude: -15.5977 },
  independence: '1973-09-24 (Portuguese recognition 1974)',
  topMajorCities: ['Bissau', 'Bafatá', 'Gabú', 'Cacheu', 'Bolama'],
  population: 2100000,
  mainLanguages: ['Portuguese', 'Guinea-Bissau Creole', 'Fula'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Bissau',
  foundingLeader: 'Luís Cabral (post-recognition presidency)',
  currentLeader: 'President Umaro Sissoco Embaló — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional P2P'],
  stablecoin: 'USDT P2P; XOF CFA peg',
  domesticCourierServices: ECOWAS_DOMESTIC_COURIERS['GW'],
  newsOutlets: ECOWAS_NEWS_OUTLETS['GW'],
  notableUniversities: ECOWAS_NOTABLE_UNIVERSITIES['GW'],
  mainExportCommodities: ECOWAS_MAIN_EXPORT_COMMODITIES['GW'],
  mainExportedElements: ECOWAS_MAIN_EXPORTED_ELEMENTS['GW'],
  rareEarths: ECOWAS_RARE_EARTHS['GW'],
  stockExchange: 'BRVM regional access; no deep domestic bourse',
  bondMarkets: ECOWAS_BOND_MARKETS['GW'],
  intellectualPropertyDepartments: ECOWAS_INTELLECTUAL_PROPERTY_DEPARTMENTS['GW'],

  securitiesExchangeCommission: ECOWAS_SECURITIES_EXCHANGE_COMMISSIONS['GW'],
  mainInternationalAirport: ECOWAS_MAIN_INTERNATIONAL_AIRPORTS['GW'],
}
