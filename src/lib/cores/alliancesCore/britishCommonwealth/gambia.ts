import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const gambia: CommonwealthCountry = {
  name: 'Gambia',
  iso3166Alpha2: 'GM',
  commonwealthStatus: 'member',
  capital: 'Banjul',
  coordinates: { latitude: 13.4549, longitude: -16.579 },
  independence: '1965-02-18',
  topMajorCities: ['Serekunda', 'Brikama', 'Banjul', 'Bakau', 'Farafenni'],
  population: 2700000,
  mainLanguages: ['English', 'Mandinka', 'Wolof'],
  currency: 'Gambian dalasi (GMD)',
  timezone: 'Africa/Banjul',
  foundingLeader: 'Dawda Jawara (first Prime Minister)',
  currentLeader: 'Adama Barrow (President)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal; no major GMD stablecoin',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['GM'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['GM'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['GM'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['GM'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['GM'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['GM'],
  stockExchange: 'Gambia Stock Exchange',
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['GM'],
}
