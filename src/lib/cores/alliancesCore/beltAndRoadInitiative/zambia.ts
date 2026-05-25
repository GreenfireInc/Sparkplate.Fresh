import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
export const zambia: BeltAndRoadInitiativeCountry = {
  name: 'Zambia',
  iso3166Alpha2: 'ZM',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Lusaka',
  coordinates: { latitude: -15.3875, longitude: 28.3228 },
  independence: '1964-10-24',
  topMajorCities: ['Lusaka', 'Kitwe', 'Ndola', 'Kabwe', 'Chingola'] as [string, string, string, string, string],
  population: 19693423,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'Zambian kwacha (ZMW)',
  timezone: 'UTC+02:00',
  foundingLeader: 'Kenneth Kaunda',
  currentLeader: 'Hakainde Hichilema (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Luno'],
  stablecoin: 'USDT / USDC informal',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['ZM'],
  newsOutlets: BRI_NEWS_OUTLETS['ZM'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['ZM'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['ZM'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['ZM'],
  rareEarths: BRI_RARE_EARTHS['ZM'],
  stockExchange: 'Lusaka Securities Exchange (LuSE)',
  bondMarkets: BRI_BOND_MARKETS['ZM'],
}
