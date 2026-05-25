import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
export const morocco: AfricanUnionCountry = {
  name: 'Morocco',
  iso3166Alpha2: 'MA',
  africanUnionStatus: 'member',
  capital: 'Rabat',
  coordinates: { latitude: 34.0209, longitude: -6.8416 },
  independence: '1956-03-02',
  topMajorCities: ['Casablanca', 'Rabat', 'Fes', 'Marrakesh', 'Tangier'],
  population: 38000000,
  mainLanguages: ['Arabic (Darija)', 'Tamazight', 'French'],
  currency: 'Moroccan dirham (MAD)',
  timezone: 'Africa/Casablanca',
  foundingLeader: 'Mohammed V (King)',
  currentLeader: 'Mohammed VI (King); Aziz Akhannouch (Prime Minister)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Rain (regional)', 'Peer OTC'],
  stablecoin: 'USDT informal; Bank Al-Maghrib exploring CBDC',
  domesticCourierServices: AU_DOMESTIC_COURIERS['MA'],
  newsOutlets: AU_NEWS_OUTLETS['MA'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['MA'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['MA'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['MA'],
  rareEarths: AU_RARE_EARTHS['MA'],
  stockExchange: 'Casablanca Stock Exchange',
  bondMarkets: AU_BOND_MARKETS['MA'],
}
