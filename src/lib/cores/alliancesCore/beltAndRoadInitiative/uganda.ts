import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
export const uganda: BeltAndRoadInitiativeCountry = {
  name: 'Uganda',
  iso3166Alpha2: 'UG',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Kampala',
  coordinates: { latitude: 0.3476, longitude: 32.5825 },
  independence: '1962-10-09',
  topMajorCities: ['Kampala', 'Nansana', 'Kira', 'Mbarara', 'Mukono'] as [string, string, string, string, string],
  population: 45905417,
  mainLanguages: [ 'English', 'Swahili', 'Regional languages' ],
  currency: 'Ugandan shilling (UGX)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Milton Obote',
  currentLeader: 'Yoweri Museveni (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Chipper Cash'],
  stablecoin: 'USDT / USDC P2P',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['UG'],
  newsOutlets: BRI_NEWS_OUTLETS['UG'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['UG'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['UG'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['UG'],
  rareEarths: BRI_RARE_EARTHS['UG'],
  stockExchange: 'Uganda Securities Exchange',
  bondMarkets: BRI_BOND_MARKETS['UG'],
}
