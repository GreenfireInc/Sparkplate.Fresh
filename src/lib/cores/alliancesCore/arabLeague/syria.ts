import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ARAB_LEAGUE_NEWS_OUTLETS } from './newsOutletsByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ARAB_LEAGUE_RARE_EARTHS } from './rareEarthsByIso'
import { ARAB_LEAGUE_BOND_MARKETS } from './bondMarketsByIso'

export const syria: ArabLeagueCountry = {
  name: 'Syria',
  iso3166Alpha2: 'SY',
  arabLeagueStatus: 'member',
  capital: 'Damascus',
  coordinates: { latitude: 33.5138, longitude: 36.2765 },
  independence: '1946-04-17',
  topMajorCities: ['Damascus', 'Aleppo', 'Homs', 'Latakia', 'Hama'],
  population: 23000000,
  mainLanguages: ['Arabic', 'Kurdish', 'Armenian (minority)'],
  currency: 'Syrian pound (SYP)',
  timezone: 'Asia/Damascus',
  foundingLeader: 'Shukri al-Quwatli (Republic era)',
  currentLeader: 'Ahmed al-Sharaa (President; transitional context — verify)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'OTC', 'Sanctions-affected rails'],
  stablecoin: 'USDT informal; heavily depreciated SYP',
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['SY'],
  newsOutlets: ARAB_LEAGUE_NEWS_OUTLETS['SY'],
  notableUniversities: ARAB_LEAGUE_NOTABLE_UNIVERSITIES['SY'],
  mainExportCommodities: ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES['SY'],
  mainExportedElements: ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS['SY'],
  rareEarths: ARAB_LEAGUE_RARE_EARTHS['SY'],
  stockExchange: 'Damascus Securities Exchange (limited)',
  bondMarkets: ARAB_LEAGUE_BOND_MARKETS['SY'],
}
