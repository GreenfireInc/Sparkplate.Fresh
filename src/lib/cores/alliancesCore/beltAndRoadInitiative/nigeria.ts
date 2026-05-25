import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
export const nigeria: BeltAndRoadInitiativeCountry = {
  name: 'Nigeria',
  iso3166Alpha2: 'NG',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Abuja',
  coordinates: { latitude: 9.0765, longitude: 7.3986 },
  independence: '1960-10-01',
  topMajorCities: ['Lagos', 'Kano', 'Ibadan', 'Abuja', 'Port Harcourt'] as [string, string, string, string, string],
  population: 223800000,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'Nigerian naira (NGN)',
  timezone: 'UTC+01:00',
  foundingLeader: 'Abubakar Tafawa Balewa (Prime Minister)',
  currentLeader: 'Bola Tinubu (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Luno', 'Quidax', 'Busha', 'Yellow Card'],
  stablecoin: 'USDT / USDC P2P dominant; cNGN stablecoin pilots',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['NG'],
  newsOutlets: BRI_NEWS_OUTLETS['NG'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['NG'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['NG'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['NG'],
  rareEarths: BRI_RARE_EARTHS['NG'],
  stockExchange: 'Nigerian Exchange Group (NGX)',
  bondMarkets: BRI_BOND_MARKETS['NG'],
}
