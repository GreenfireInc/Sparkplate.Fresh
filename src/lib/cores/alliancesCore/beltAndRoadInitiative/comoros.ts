import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const comoros: BeltAndRoadInitiativeCountry = {
  name: 'Comoros',
  iso3166Alpha2: 'KM',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Moroni',
  coordinates: { latitude: -11.7172, longitude: 43.2473 },
  independence: '1975-07-06',
  topMajorCities: ['Moroni', 'Mutsamudu', 'Fomboni', 'Domoni', 'Tsimbeo'] as [string, string, string, string, string],
  population: 919901,
  mainLanguages: [ 'Arabic', 'French', 'Comorian' ],
  currency: 'Comorian franc (KMF)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Ahmed Abdallah',
  currentLeader: 'Azali Assoumani (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional mobile money bridges'],
  stablecoin: 'USDT / USDC limited; KMF',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['KM'],
  newsOutlets: BRI_NEWS_OUTLETS['KM'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['KM'],
  stockExchange: 'No major national stock exchange',
}
