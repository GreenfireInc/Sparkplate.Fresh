import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
export const nigeria: AfricanUnionCountry = {
  name: 'Nigeria',
  iso3166Alpha2: 'NG',
  africanUnionStatus: 'member',
  capital: 'Abuja',
  coordinates: { latitude: 9.0765, longitude: 7.3986 },
  independence: '1960-10-01',
  topMajorCities: ['Lagos', 'Kano', 'Ibadan', 'Abuja', 'Port Harcourt'],
  population: 223000000,
  mainLanguages: ['English', 'Hausa', 'Yoruba'],
  currency: 'Nigerian naira (NGN)',
  timezone: 'Africa/Lagos',
  foundingLeader: 'Abubakar Tafawa Balewa (Prime Minister)',
  currentLeader: 'Bola Tinubu (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Luno', 'Quidax', 'Busha', 'Yellow Card'],
  stablecoin: 'USDT / USDC P2P dominant; cNGN stablecoin pilots',
  domesticCourierServices: AU_DOMESTIC_COURIERS['NG'],
  newsOutlets: AU_NEWS_OUTLETS['NG'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['NG'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['NG'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['NG'],
  rareEarths: AU_RARE_EARTHS['NG'],
  stockExchange: 'Nigerian Exchange Group (NGX)',
  bondMarkets: AU_BOND_MARKETS['NG'],
}
