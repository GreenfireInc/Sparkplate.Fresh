import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const nauru: CommonwealthCountry = {
  name: 'Nauru',
  iso3166Alpha2: 'NR',
  commonwealthStatus: 'member',
  capital: 'Yaren (de facto)',
  coordinates: { latitude: -0.522778, longitude: 166.931503 },
  independence: '1968-01-31',
  topMajorCities: ['Denigomodu', 'Meneng', 'Aiwo', 'Anabar', 'Boe'],
  population: 13000,
  mainLanguages: ['English', 'Nauruan', 'Pacific Creole'],
  currency: 'Australian dollar (AUD)',
  timezone: 'Pacific/Nauru',
  foundingLeader: 'Hammer DeRoburt (first President)',
  currentLeader: 'David Adeang (President) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'AUD; USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['NR'],
  stockExchange: 'No national stock exchange — informational',
}
