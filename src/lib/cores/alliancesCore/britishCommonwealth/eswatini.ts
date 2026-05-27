import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const eswatini: CommonwealthCountry = {
  name: 'Eswatini',
  iso3166Alpha2: 'SZ',
  commonwealthStatus: 'member',
  capital: 'Mbabane (administrative); Lobamba (royal/legislative)',
  coordinates: { latitude: -26.3052, longitude: 31.1367 },
  independence: '1968-09-06',
  topMajorCities: ['Mbabane', 'Manzini', 'Big Bend', 'Malkerns', 'Nhlangano'],
  population: 1200000,
  mainLanguages: ['Swati', 'English', 'Zulu'],
  currency: 'Swazi lilangeni (SZL); South African rand circulates',
  timezone: 'Africa/Mbabane',
  foundingLeader: 'Sobhuza II (King)',
  currentLeader: 'Mswati III (King); PM — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT/USDC informal; SZL peg context',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['SZ'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['SZ'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['SZ'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['SZ'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['SZ'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['SZ'],
  stockExchange: 'Eswatini Stock Exchange',
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['SZ'],
}
