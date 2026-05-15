import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const zimbabwe: BeltAndRoadInitiativeCountry = {
  name: 'Zimbabwe',
  iso3166Alpha2: 'ZW',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Harare',
  coordinates: { latitude: -17.8252, longitude: 31.0335 },
  independence: '1980-04-18',
  topMajorCities: ['Harare', 'Bulawayo', 'Chitungwiza', 'Mutare', 'Gweru'] as [string, string, string, string, string],
  population: 17073087,
  mainLanguages: [ 'Chibarwe', 'English', 'Kalanga' ],
  currency: 'Zimbabwean dollar (ZWL)',
  timezone: 'UTC+02:00',
  foundingLeader: 'Robert Mugabe (first Prime Minister)',
  currentLeader: 'Emmerson Mnangagwa (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Golix (historical)', 'Local P2P'],
  stablecoin: 'USDT / USDC; USD cash economy',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['ZW'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['ZW'],
  stockExchange: 'Zimbabwe Stock Exchange (ZSE)',
}
