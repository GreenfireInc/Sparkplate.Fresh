import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const kenya: CommonwealthCountry = {
  name: 'Kenya',
  iso3166Alpha2: 'KE',
  commonwealthStatus: 'member',
  capital: 'Nairobi',
  coordinates: { latitude: -1.286389, longitude: 36.817223 },
  independence: '1963-12-12',
  topMajorCities: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'],
  population: 55000000,
  mainLanguages: ['Swahili', 'English', 'Kikuyu'],
  currency: 'Kenyan shilling (KES)',
  timezone: 'Africa/Nairobi',
  foundingLeader: 'Jomo Kenyatta (first President)',
  currentLeader: 'William Ruto (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Local brokers'],
  stablecoin: 'USDT informal; CBDC exploration — verify',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['KE'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['KE'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['KE'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['KE'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['KE'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['KE'],
  stockExchange: 'Nairobi Securities Exchange',
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['KE'],
}
