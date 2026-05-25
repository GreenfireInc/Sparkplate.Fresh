import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
export const sudan: BeltAndRoadInitiativeCountry = {
  name: 'Sudan',
  iso3166Alpha2: 'SD',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Khartoum',
  coordinates: { latitude: 15.5007, longitude: 32.5599 },
  independence: '1956-01-01',
  topMajorCities: ['Omdurman', 'Khartoum', 'Khartoum North', 'Port Sudan', 'Kassala'] as [string, string, string, string, string],
  population: 51662000,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Sudanese pound (SDG)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Ismail al-Azhari',
  currentLeader: 'Abdel Fattah al-Burhan (General; Chair, Sovereignty Council)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'OTC', 'Informal P2P amid conflict'],
  stablecoin: 'USDT informal; banking disruption during conflict',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['SD'],
  newsOutlets: BRI_NEWS_OUTLETS['SD'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['SD'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['SD'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['SD'],
  rareEarths: BRI_RARE_EARTHS['SD'],
  stockExchange: 'Khartoum Stock Exchange (operations disrupted)',
  bondMarkets: BRI_BOND_MARKETS['SD'],
}
