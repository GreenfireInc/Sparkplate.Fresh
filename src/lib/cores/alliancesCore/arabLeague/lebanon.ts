import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ARAB_LEAGUE_NEWS_OUTLETS } from './newsOutletsByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ARAB_LEAGUE_RARE_EARTHS } from './rareEarthsByIso'
import { ARAB_LEAGUE_BOND_MARKETS } from './bondMarketsByIso'

export const lebanon: ArabLeagueCountry = {
  name: 'Lebanon',
  iso3166Alpha2: 'LB',
  arabLeagueStatus: 'member',
  capital: 'Beirut',
  coordinates: { latitude: 33.8938, longitude: 35.5018 },
  independence: '1943-11-22',
  topMajorCities: ['Beirut', 'Tripoli', 'Sidon', 'Tyre', 'Byblos'],
  population: 5500000,
  mainLanguages: ['Arabic', 'French', 'English'],
  currency: 'Lebanese pound (LBP)',
  timezone: 'Asia/Beirut',
  foundingLeader: 'Bechara El Khoury (President)',
  currentLeader: 'Joseph Aoun (President); Nawaf Salam (Prime Minister)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'OTC', 'Diaspora remittance rails'],
  stablecoin: 'USDT / USDC; USD parallel economy amid crisis',
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['LB'],
  newsOutlets: ARAB_LEAGUE_NEWS_OUTLETS['LB'],
  notableUniversities: ARAB_LEAGUE_NOTABLE_UNIVERSITIES['LB'],
  mainExportCommodities: ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES['LB'],
  mainExportedElements: ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS['LB'],
  rareEarths: ARAB_LEAGUE_RARE_EARTHS['LB'],
  stockExchange: 'Beirut Stock Exchange',
  bondMarkets: ARAB_LEAGUE_BOND_MARKETS['LB'],
}
