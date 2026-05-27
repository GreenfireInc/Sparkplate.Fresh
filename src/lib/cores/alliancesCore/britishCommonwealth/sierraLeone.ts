import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const sierraLeone: CommonwealthCountry = {
  name: 'Sierra Leone',
  iso3166Alpha2: 'SL',
  commonwealthStatus: 'member',
  capital: 'Freetown',
  coordinates: { latitude: 8.484, longitude: -13.2299 },
  independence: '1961-04-27',
  topMajorCities: ['Freetown', 'Bo', 'Kenema', 'Makeni', 'Koidu'],
  population: 8500000,
  mainLanguages: ['English', 'Krio', 'Mende'],
  currency: 'Sierra Leonean leone (SLE)',
  timezone: 'Africa/Freetown',
  foundingLeader: 'Milton Margai (first Prime Minister)',
  currentLeader: 'Julius Maada Bio (President) — verify',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['SL'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['SL'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['SL'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['SL'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['SL'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['SL'],
  stockExchange: 'Sierra Leone Stock Exchange',
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['SL'],
}
