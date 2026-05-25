import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
export const kenya: BeltAndRoadInitiativeCountry = {
  name: 'Kenya',
  iso3166Alpha2: 'KE',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Nairobi',
  coordinates: { latitude: -1.2864, longitude: 36.8172 },
  independence: '1963-12-12',
  topMajorCities: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'] as [string, string, string, string, string],
  population: 53330978,
  mainLanguages: [ 'English', 'Swahili', 'Regional languages' ],
  currency: 'Kenyan shilling (KES)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Jomo Kenyatta',
  currentLeader: 'William Ruto (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local blockchain startups'],
  stablecoin: 'USDT / USDC; regulatory environment evolving',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['KE'],
  newsOutlets: BRI_NEWS_OUTLETS['KE'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['KE'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['KE'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['KE'],
  rareEarths: BRI_RARE_EARTHS['KE'],
  stockExchange: 'Nairobi Securities Exchange (NSE)',
  bondMarkets: BRI_BOND_MARKETS['KE'],
}
