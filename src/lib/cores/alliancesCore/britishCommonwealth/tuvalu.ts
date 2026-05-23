import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const tuvalu: CommonwealthCountry = {
  name: 'Tuvalu',
  iso3166Alpha2: 'TV',
  commonwealthStatus: 'member',
  capital: 'Funafuti',
  coordinates: { latitude: -8.5211, longitude: 179.1962 },
  independence: '1978-10-01',
  topMajorCities: ['Funafuti', 'Savave', 'Tanrake', 'Vaitupu', 'Nukulaelae'],
  population: 11000,
  mainLanguages: ['Tuvaluan', 'English', 'Gilbertese (regional)'],
  currency: 'Australian dollar (AUD); Tuvaluan coins',
  timezone: 'Pacific/Funafuti',
  foundingLeader: 'Toaripi Lauti (first Prime Minister)',
  currentLeader: 'Feleti Teo (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'AUD; USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['TV'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['TV'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['TV'],
  stockExchange: 'No national stock exchange — informational',
}
