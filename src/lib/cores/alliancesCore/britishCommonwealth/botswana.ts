import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const botswana: CommonwealthCountry = {
  name: 'Botswana',
  iso3166Alpha2: 'BW',
  commonwealthStatus: 'member',
  capital: 'Gaborone',
  coordinates: { latitude: -24.6282, longitude: 25.9231 },
  independence: '1966-09-30',
  topMajorCities: ['Gaborone', 'Francistown', 'Molepolole', 'Maun', 'Serowe'],
  population: 2400000,
  mainLanguages: ['English', 'Setswana', 'Kalanga'],
  currency: 'Botswana pula (BWP)',
  timezone: 'Africa/Gaborone',
  foundingLeader: 'Seretse Khama (first President)',
  currentLeader: 'Mokgweetsi Masisi (President)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT/USDC via P2P; no major BWP stablecoin',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['BW'],
  stockExchange: 'Botswana Stock Exchange (BSE)',
}
