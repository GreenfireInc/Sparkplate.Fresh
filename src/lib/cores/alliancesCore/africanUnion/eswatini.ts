import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
import { AU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const eswatini: AfricanUnionCountry = {
  name: 'Eswatini',
  iso3166Alpha2: 'SZ',
  africanUnionStatus: 'member',
  capital: 'Mbabane (administrative); Lobamba (royal and legislative)',
  coordinates: { latitude: -26.3054, longitude: 31.1367 },
  independence: '1968-09-06',
  topMajorCities: ['Manzini', 'Mbabane', 'Big Bend', 'Malkerns', 'Siteki'],
  population: 1200000,
  mainLanguages: ['siSwati', 'English', 'Zulu (minority)'],
  currency: 'Swazi lilangeni (SZL); South African rand (ZAR) accepted',
  timezone: 'Africa/Mbabane',
  foundingLeader: 'Sobhuza II (King)',
  currentLeader: 'Mswati III (King); Russell Dlamini (Prime Minister)',
  cryptocurrencyExchanges: ['Luno', 'VALR', 'Binance (P2P)'],
  stablecoin: 'USDT / USDC via South African rails',
  domesticCourierServices: AU_DOMESTIC_COURIERS['SZ'],
  newsOutlets: AU_NEWS_OUTLETS['SZ'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['SZ'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['SZ'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['SZ'],
  rareEarths: AU_RARE_EARTHS['SZ'],
  stockExchange: 'Eswatini Stock Exchange',
  bondMarkets: AU_BOND_MARKETS['SZ'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['SZ'],
}
