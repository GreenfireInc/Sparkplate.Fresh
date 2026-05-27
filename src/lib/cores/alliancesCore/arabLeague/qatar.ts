import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ARAB_LEAGUE_NEWS_OUTLETS } from './newsOutletsByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ARAB_LEAGUE_RARE_EARTHS } from './rareEarthsByIso'
import { ARAB_LEAGUE_BOND_MARKETS } from './bondMarketsByIso'
import { ARAB_LEAGUE_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const qatar: ArabLeagueCountry = {
  name: 'Qatar',
  iso3166Alpha2: 'QA',
  arabLeagueStatus: 'member',
  capital: 'Doha',
  coordinates: { latitude: 25.2854, longitude: 51.531 },
  independence: '1971-09-03',
  topMajorCities: ['Doha', 'Al Rayyan', 'Al Wakrah', 'Al Khor', 'Dukhan'],
  population: 2900000,
  mainLanguages: ['Arabic', 'English', 'Urdu/Hindi (expatriate)'],
  currency: 'Qatari riyal (QAR)',
  timezone: 'Asia/Qatar',
  foundingLeader: 'Ahmad bin Ali Al Thani (Emir at independence)',
  currentLeader: 'Tamim bin Hamad Al Thani (Emir)',
  cryptocurrencyExchanges: ['Regional OTC', 'International brokers; cautious local licensing'],
  stablecoin: 'USDT / USDC informal; wealth-fund economy',
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['QA'],
  newsOutlets: ARAB_LEAGUE_NEWS_OUTLETS['QA'],
  notableUniversities: ARAB_LEAGUE_NOTABLE_UNIVERSITIES['QA'],
  mainExportCommodities: ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES['QA'],
  mainExportedElements: ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS['QA'],
  rareEarths: ARAB_LEAGUE_RARE_EARTHS['QA'],
  stockExchange: 'Qatar Stock Exchange',
  bondMarkets: ARAB_LEAGUE_BOND_MARKETS['QA'],
  mainInternationalAirport: ARAB_LEAGUE_MAIN_INTERNATIONAL_AIRPORTS['QA'],
}
