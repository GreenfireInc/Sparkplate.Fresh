import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
export const guineaBissau: AfricanUnionCountry = {
  name: 'Guinea-Bissau',
  iso3166Alpha2: 'GW',
  africanUnionStatus: 'suspended',
  capital: 'Bissau',
  coordinates: { latitude: 11.8636, longitude: -15.5977 },
  independence: '1973-09-24',
  topMajorCities: ['Bissau', 'Bafatá', 'Gabú', 'Cacheu', 'Bolama'],
  population: 2100000,
  mainLanguages: ['Portuguese', 'Guinea-Bissau Creole', 'Fula'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Bissau',
  foundingLeader: 'Luís Cabral',
  currentLeader: 'Umaro Sissoco Embaló (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional P2P'],
  stablecoin: 'USDT P2P; XOF peg',
  domesticCourierServices: AU_DOMESTIC_COURIERS['GW'],
  newsOutlets: AU_NEWS_OUTLETS['GW'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['GW'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['GW'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['GW'],
  rareEarths: AU_RARE_EARTHS['GW'],
  stockExchange: 'No significant national exchange; BRVM regional access',
  bondMarkets: AU_BOND_MARKETS['GW'],
}
