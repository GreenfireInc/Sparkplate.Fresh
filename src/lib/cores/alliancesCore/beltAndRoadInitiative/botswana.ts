import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { BRI_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
export const botswana: BeltAndRoadInitiativeCountry = {
  name: 'Botswana',
  iso3166Alpha2: 'BW',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Gaborone',
  coordinates: { latitude: -24.6282, longitude: 25.9231 },
  independence: '1966-09-30',
  topMajorCities: ['Gaborone', 'Francistown', 'Molepolole', 'Maun', 'Serowe'] as [string, string, string, string, string],
  population: 2359609,
  mainLanguages: [ 'English', 'Tswana', 'Regional languages' ],
  currency: 'Botswana pula (BWP)',
  timezone: 'UTC+02:00',
  foundingLeader: 'Seretse Khama',
  currentLeader: 'Duma Boko (President)',
  cryptocurrencyExchanges: ['Luno', 'VALR', 'Binance (P2P)'],
  stablecoin: 'USDT / USDC on international platforms; no BWP stablecoin',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['BW'],
  newsOutlets: BRI_NEWS_OUTLETS['BW'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['BW'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['BW'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['BW'],
  rareEarths: BRI_RARE_EARTHS['BW'],
  stockExchange: 'Botswana Stock Exchange (BSE)',
  bondMarkets: BRI_BOND_MARKETS['BW'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['BW'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['BW'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['BW'],
}
