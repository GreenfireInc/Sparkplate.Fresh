import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
export const syria: BeltAndRoadInitiativeCountry = {
  name: 'Syria',
  iso3166Alpha2: 'SY',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Damascus',
  coordinates: { latitude: 33.5138, longitude: 36.2765 },
  independence: '1946-04-17',
  topMajorCities: ['Damascus', 'Aleppo', 'Homs', 'Latakia', 'Hama'] as [string, string, string, string, string],
  population: 25620000,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Syrian pound (SYP)',
  timezone: 'UTC+02:00',
  foundingLeader: 'Shukri al-Quwatli (Republic era)',
  currentLeader: 'Ahmed al-Sharaa (President; transitional context — verify)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'OTC', 'Sanctions-affected rails'],
  stablecoin: 'USDT informal; heavily depreciated SYP',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['SY'],
  newsOutlets: BRI_NEWS_OUTLETS['SY'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['SY'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['SY'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['SY'],
  rareEarths: BRI_RARE_EARTHS['SY'],
  stockExchange: 'Damascus Securities Exchange (limited)',
  bondMarkets: BRI_BOND_MARKETS['SY'],
}
