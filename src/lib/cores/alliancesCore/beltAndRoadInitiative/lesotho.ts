import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const lesotho: BeltAndRoadInitiativeCountry = {
  name: 'Lesotho',
  iso3166Alpha2: 'LS',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Maseru',
  coordinates: { latitude: -29.31, longitude: 27.4786 },
  independence: '1966-10-04',
  topMajorCities: ['Maseru', 'Teyateyaneng', 'Mafeteng', 'Hlotse', "Mohale's Hoek"] as [string, string, string, string, string],
  population: 2116427,
  mainLanguages: [ 'English', 'Sotho', 'Regional languages' ],
  currency: 'Lesotho loti (LSL)',
  timezone: 'UTC+02:00',
  foundingLeader: 'Leabua Jonathan',
  currentLeader: 'Letsie III (King); Sam Matekane (Prime Minister)',
  cryptocurrencyExchanges: ['Luno', 'VALR', 'Binance (P2P)'],
  stablecoin: 'USDT via South African financial links',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['LS'],
  newsOutlets: BRI_NEWS_OUTLETS['LS'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['LS'],
  stockExchange: 'Maseru Securities Market (limited)',
}
