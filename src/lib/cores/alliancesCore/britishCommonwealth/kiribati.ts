import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const kiribati: CommonwealthCountry = {
  name: 'Kiribati',
  iso3166Alpha2: 'KI',
  commonwealthStatus: 'member',
  capital: 'South Tarawa',
  coordinates: { latitude: 1.4518, longitude: 172.9719 },
  independence: '1979-07-12',
  topMajorCities: ['Tarawa', 'Betio', 'Bikenibeu', 'Teaoraereke', 'Bairiki'],
  population: 130000,
  mainLanguages: ['English', 'Gilbertese', 'Tuvaluan (regional)'],
  currency: 'Australian dollar (AUD)',
  timezone: 'Pacific/Tarawa',
  foundingLeader: 'Ieremia Tabai (first President)',
  currentLeader: 'Taneti Maamau (President) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'AUD; USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['KI'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['KI'],
  stockExchange: 'No major national exchange — informational',
}
