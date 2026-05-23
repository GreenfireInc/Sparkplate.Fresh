import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const ivoryCoast: BeltAndRoadInitiativeCountry = {
  name: 'Côte d\'Ivoire',
  iso3166Alpha2: 'CI',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Yamoussoukro',
  coordinates: { latitude: 6.8276, longitude: -5.2893 },
  independence: '1960-08-07',
  topMajorCities: ['Abidjan', 'Bouaké', 'Daloa', 'Yamoussoukro', 'San-Pédro'] as [string, string, string, string, string],
  population: 31719275,
  mainLanguages: [ 'French', 'English', 'Regional languages' ],
  currency: 'West African CFA franc (XOF)',
  timezone: 'UTC',
  foundingLeader: 'Félix Houphouët-Boigny',
  currentLeader: 'Alassane Ouattara (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Luno (regional)'],
  stablecoin: 'USDT / USDC; XOF pegged via CFA',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['CI'],
  newsOutlets: BRI_NEWS_OUTLETS['CI'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['CI'],
  stockExchange: 'BRVM (Abidjan — regional hub)',
}
