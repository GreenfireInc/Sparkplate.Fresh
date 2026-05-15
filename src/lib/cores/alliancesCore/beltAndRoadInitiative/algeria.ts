import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const algeria: BeltAndRoadInitiativeCountry = {
  name: 'Algeria',
  iso3166Alpha2: 'DZ',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Algiers',
  coordinates: { latitude: 36.7539, longitude: 3.0588 },
  independence: '1962-07-05',
  topMajorCities: ['Algiers', 'Oran', 'Constantine', 'Annaba', 'Blida'] as [string, string, string, string, string],
  population: 47400000,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Algerian dinar (DZD)',
  timezone: 'UTC+01:00',
  foundingLeader: 'Ahmed Ben Bella',
  currentLeader: 'Abdelmadjid Tebboune (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'KuCoin', 'Regional OTC brokers'],
  stablecoin: 'USDT / USDC common in informal crypto markets; no official DZD stablecoin',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['DZ'],
  stockExchange: 'Algiers Stock Exchange',
}
