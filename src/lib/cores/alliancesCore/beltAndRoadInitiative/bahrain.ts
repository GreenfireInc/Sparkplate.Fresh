import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const bahrain: BeltAndRoadInitiativeCountry = {
  name: 'Bahrain',
  iso3166Alpha2: 'BH',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Manama',
  coordinates: { latitude: 26.2235, longitude: 50.5876 },
  independence: '1971-08-15',
  topMajorCities: ['Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'A\'ali'] as [string, string, string, string, string],
  population: 1594654,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Bahraini dinar (BHD)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Isa bin Salman Al Khalifa (Emir)',
  currentLeader: 'Hamad bin Isa Al Khalifa (King); Salman bin Hamad Al Khalifa (Crown Prince & Prime Minister)',
  cryptocurrencyExchanges: ['Rain', 'Binance (regional)', 'International OTC'],
  stablecoin: 'USDT / USDC; CBDC pilots in Gulf context',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['BH'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['BH'],
  stockExchange: 'Bahrain Bourse',
}
