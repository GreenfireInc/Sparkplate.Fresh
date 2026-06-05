import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
import { AU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { AU_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { AU_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
export const angola: AfricanUnionCountry = {
  name: 'Angola',
  iso3166Alpha2: 'AO',
  africanUnionStatus: 'member',
  capital: 'Luanda',
  coordinates: { latitude: -8.8383, longitude: 13.2344 },
  independence: '1975-11-11',
  topMajorCities: ['Luanda', 'Huambo', 'Lobito', 'Benguela', 'Lubango'],
  population: 37000000,
  mainLanguages: ['Portuguese', 'Umbundu', 'Kikongo'],
  currency: 'Angolan kwanza (AOA)',
  timezone: 'Africa/Luanda',
  foundingLeader: 'Agostinho Neto',
  currentLeader: 'João Lourenço (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Local OTC'],
  stablecoin: 'USDT / USDC via P2P; no AOA stablecoin',
  domesticCourierServices: AU_DOMESTIC_COURIERS['AO'],
  newsOutlets: AU_NEWS_OUTLETS['AO'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['AO'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['AO'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['AO'],
  rareEarths: AU_RARE_EARTHS['AO'],
  stockExchange: 'Bodiva (Angola Securities Exchange)',
  bondMarkets: AU_BOND_MARKETS['AO'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['AO'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['AO'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['AO'],
}
