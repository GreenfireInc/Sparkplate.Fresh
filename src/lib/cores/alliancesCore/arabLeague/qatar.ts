import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

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
  notableUniversities: ARAB_LEAGUE_NOTABLE_UNIVERSITIES['QA'],
  stockExchange: 'Qatar Stock Exchange',
}
