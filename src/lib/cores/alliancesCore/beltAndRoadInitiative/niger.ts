import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const niger: BeltAndRoadInitiativeCountry = {
  name: 'Niger',
  iso3166Alpha2: 'NE',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Niamey',
  coordinates: { latitude: 13.5127, longitude: 2.1254 },
  independence: '1960-08-03',
  topMajorCities: ['Niamey', 'Zinder', 'Maradi', 'Agadez', 'Tahoua'] as [string, string, string, string, string],
  population: 26312034,
  mainLanguages: [ 'French', 'English', 'Regional languages' ],
  currency: 'West African CFA franc (XOF)',
  timezone: 'UTC+01:00',
  foundingLeader: 'Hamani Diori',
  currentLeader: 'Abdourahamane Tchiani (General; National Council for the Safeguard of the Homeland)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'OTC'],
  stablecoin: 'USDT P2P; XOF peg',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['NE'],
  newsOutlets: BRI_NEWS_OUTLETS['NE'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['NE'],
  stockExchange: 'No liquid national bourse; BRVM regional',
}
