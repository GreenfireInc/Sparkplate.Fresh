import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const algeria: ArabLeagueCountry = {
  name: 'Algeria',
  iso3166Alpha2: 'DZ',
  arabLeagueStatus: 'member',
  capital: 'Algiers',
  coordinates: { latitude: 36.7539, longitude: 3.0588 },
  independence: '1962-07-05',
  topMajorCities: ['Algiers', 'Oran', 'Constantine', 'Annaba', 'Blida'],
  population: 46200000,
  mainLanguages: ['Arabic', 'Tamazight (Berber)', 'French'],
  currency: 'Algerian dinar (DZD)',
  timezone: 'Africa/Algiers',
  foundingLeader: 'Ahmed Ben Bella',
  currentLeader: 'Abdelmadjid Tebboune (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'KuCoin', 'Regional OTC brokers'],
  stablecoin: 'USDT / USDC common in informal crypto markets; no official DZD stablecoin',
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['DZ'],
  notableUniversities: ARAB_LEAGUE_NOTABLE_UNIVERSITIES['DZ'],
  stockExchange: 'Algiers Stock Exchange',
}
