import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ARAB_LEAGUE_NEWS_OUTLETS } from './newsOutletsByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ARAB_LEAGUE_RARE_EARTHS } from './rareEarthsByIso'
import { ARAB_LEAGUE_BOND_MARKETS } from './bondMarketsByIso'

export const sudan: ArabLeagueCountry = {
  name: 'Sudan',
  iso3166Alpha2: 'SD',
  arabLeagueStatus: 'member',
  capital: 'Khartoum',
  coordinates: { latitude: 15.5007, longitude: 32.5599 },
  independence: '1956-01-01',
  topMajorCities: ['Omdurman', 'Khartoum', 'Khartoum North', 'Port Sudan', 'Kassala'],
  population: 48000000,
  mainLanguages: ['Arabic (Sudanese)', 'English', 'Nubian languages'],
  currency: 'Sudanese pound (SDG)',
  timezone: 'Africa/Khartoum',
  foundingLeader: 'Ismail al-Azhari',
  currentLeader: 'Abdel Fattah al-Burhan (General; Chair, Sovereignty Council)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'OTC', 'Informal P2P amid conflict'],
  stablecoin: 'USDT informal; banking disruption during conflict',
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['SD'],
  newsOutlets: ARAB_LEAGUE_NEWS_OUTLETS['SD'],
  notableUniversities: ARAB_LEAGUE_NOTABLE_UNIVERSITIES['SD'],
  mainExportCommodities: ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES['SD'],
  mainExportedElements: ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS['SD'],
  rareEarths: ARAB_LEAGUE_RARE_EARTHS['SD'],
  stockExchange: 'Khartoum Stock Exchange (operations disrupted)',
  bondMarkets: ARAB_LEAGUE_BOND_MARKETS['SD'],
}
