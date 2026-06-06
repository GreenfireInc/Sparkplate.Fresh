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
export const botswana: AfricanUnionCountry = {
  name: 'Botswana',
  iso3166Alpha2: 'BW',
  africanUnionStatus: 'member',
  capital: 'Gaborone',
  coordinates: { latitude: -24.6282, longitude: 25.9231 },
  independence: '1966-09-30',
  topMajorCities: ['Gaborone', 'Francistown', 'Molepolole', 'Maun', 'Serowe'],
  population: 2500000,
  mainLanguages: ['English', 'Setswana', 'Kalanga'],
  currency: 'Botswana pula (BWP)',
  timezone: 'Africa/Gaborone',
  foundingLeader: 'Seretse Khama',
  currentLeader: 'Duma Boko (President)',
  cryptocurrencyExchanges: ['Luno', 'VALR', 'Binance (P2P)'],
  stablecoin: 'USDT / USDC on international platforms; no BWP stablecoin',
  domesticCourierServices: AU_DOMESTIC_COURIERS['BW'],
  newsOutlets: AU_NEWS_OUTLETS['BW'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['BW'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['BW'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['BW'],
  rareEarths: AU_RARE_EARTHS['BW'],
  stockExchange: 'Botswana Stock Exchange (BSE)',
  bondMarkets: AU_BOND_MARKETS['BW'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['BW'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['BW'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['BW'],
}
