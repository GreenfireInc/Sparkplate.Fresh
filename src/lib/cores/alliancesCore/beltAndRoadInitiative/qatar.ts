import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const qatar: BeltAndRoadInitiativeCountry = {
  name: 'Qatar',
  iso3166Alpha2: 'QA',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Doha',
  coordinates: { latitude: 25.2854, longitude: 51.531 },
  independence: '1971-09-03',
  topMajorCities: ['Doha', 'Al Rayyan', 'Al Wakrah', 'Al Khor', 'Dukhan'] as [string, string, string, string, string],
  population: 3173024,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Qatari riyal (QAR)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Ahmad bin Ali Al Thani (Emir at independence)',
  currentLeader: 'Tamim bin Hamad Al Thani (Emir)',
  cryptocurrencyExchanges: ['Regional OTC', 'International brokers; cautious local licensing'],
  stablecoin: 'USDT / USDC informal; wealth-fund economy',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['QA'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['QA'],
  stockExchange: 'Qatar Stock Exchange',
}
