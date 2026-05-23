import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ARAB_LEAGUE_NEWS_OUTLETS } from './newsOutletsByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const comoros: ArabLeagueCountry = {
  name: 'Comoros',
  iso3166Alpha2: 'KM',
  arabLeagueStatus: 'member',
  capital: 'Moroni',
  coordinates: { latitude: -11.7172, longitude: 43.2473 },
  independence: '1975-07-06',
  topMajorCities: ['Moroni', 'Mutsamudu', 'Fomboni', 'Domoni', 'Tsimbeo'],
  population: 900000,
  mainLanguages: ['Comorian (Shikomor)', 'Arabic', 'French'],
  currency: 'Comorian franc (KMF)',
  timezone: 'Indian/Comoro',
  foundingLeader: 'Ahmed Abdallah',
  currentLeader: 'Azali Assoumani (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional mobile money bridges'],
  stablecoin: 'USDT / USDC limited; KMF',
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['KM'],
  newsOutlets: ARAB_LEAGUE_NEWS_OUTLETS['KM'],
  notableUniversities: ARAB_LEAGUE_NOTABLE_UNIVERSITIES['KM'],
  stockExchange: 'No major national stock exchange',
}
