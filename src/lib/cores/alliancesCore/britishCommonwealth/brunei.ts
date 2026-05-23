import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const brunei: CommonwealthCountry = {
  name: 'Brunei',
  iso3166Alpha2: 'BN',
  commonwealthStatus: 'member',
  capital: 'Bandar Seri Begawan',
  coordinates: { latitude: 4.9031, longitude: 114.9398 },
  independence: '1984-01-01',
  topMajorCities: ['Bandar Seri Begawan', 'Kuala Belait', 'Seria', 'Tutong', 'Bangar'],
  population: 450000,
  mainLanguages: ['Malay', 'English', 'Chinese'],
  currency: 'Brunei dollar (BND); Singapore dollar interchangeable',
  timezone: 'Asia/Brunei',
  foundingLeader: 'Hassanal Bolkiah (Sultan; independence era)',
  currentLeader: 'Hassanal Bolkiah (Sultan)',
  cryptocurrencyExchanges: ['Limited onshore retail crypto; offshore access restricted — verify'],
  stablecoin: 'BND/SGD peg context; USDT via offshore',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['BN'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['BN'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['BN'],
  stockExchange: 'Brunei Investment Agency context; no large public bourse like peers',
}
