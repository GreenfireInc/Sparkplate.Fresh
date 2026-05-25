import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
export const rwanda: AfricanUnionCountry = {
  name: 'Rwanda',
  iso3166Alpha2: 'RW',
  africanUnionStatus: 'member',
  capital: 'Kigali',
  coordinates: { latitude: -1.9441, longitude: 30.0619 },
  independence: '1962-07-01',
  topMajorCities: ['Kigali', 'Butare (Huye)', 'Gitarama (Muhanga)', 'Musanze', 'Cyangugu'],
  population: 14000000,
  mainLanguages: ['Kinyarwanda', 'French', 'English'],
  currency: 'Rwandan franc (RWF)',
  timezone: 'Africa/Kigali',
  foundingLeader: 'Grégoire Kayibanda',
  currentLeader: 'Paul Kagame (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Blockchain hub initiatives'],
  stablecoin: 'USDT / USDC; central bank exploring CBDC',
  domesticCourierServices: AU_DOMESTIC_COURIERS['RW'],
  newsOutlets: AU_NEWS_OUTLETS['RW'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['RW'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['RW'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['RW'],
  rareEarths: AU_RARE_EARTHS['RW'],
  stockExchange: 'Rwanda Stock Exchange',
  bondMarkets: AU_BOND_MARKETS['RW'],
}
