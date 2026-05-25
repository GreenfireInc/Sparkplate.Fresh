import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ARAB_LEAGUE_NEWS_OUTLETS } from './newsOutletsByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ARAB_LEAGUE_RARE_EARTHS } from './rareEarthsByIso'
import { ARAB_LEAGUE_BOND_MARKETS } from './bondMarketsByIso'

export const oman: ArabLeagueCountry = {
  name: 'Oman',
  iso3166Alpha2: 'OM',
  arabLeagueStatus: 'member',
  capital: 'Muscat',
  coordinates: { latitude: 23.588, longitude: 58.3829 },
  independence: '1650 (expelled Portuguese); 1970 modern Sultanate transition',
  topMajorCities: ['Muscat', 'Seeb', 'Salalah', 'Bawshar', 'Sohar'],
  population: 5000000,
  mainLanguages: ['Arabic', 'English', 'Baluchi'],
  currency: 'Omani rial (OMR)',
  timezone: 'Asia/Muscat',
  foundingLeader: 'Qaboos bin Said (long-serving modern Sultan)',
  currentLeader: 'Haitham bin Tariq (Sultan)',
  cryptocurrencyExchanges: ['Regional OTC', 'International brokers'],
  stablecoin: 'USDT informal; pegged rial economy',
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['OM'],
  newsOutlets: ARAB_LEAGUE_NEWS_OUTLETS['OM'],
  notableUniversities: ARAB_LEAGUE_NOTABLE_UNIVERSITIES['OM'],
  mainExportCommodities: ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES['OM'],
  mainExportedElements: ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS['OM'],
  rareEarths: ARAB_LEAGUE_RARE_EARTHS['OM'],
  stockExchange: 'Muscat Stock Exchange',
  bondMarkets: ARAB_LEAGUE_BOND_MARKETS['OM'],
}
