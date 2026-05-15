import type { SadcCountry } from './types'
import { SADC_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const botswana: SadcCountry = {
  name: 'Botswana',
  iso3166Alpha2: 'BW',
  capital: 'Gaborone',
  coordinates: { latitude: -24.6282, longitude: 25.9231 },
  independence: '1966-09-30',
  topMajorCities: ['Gaborone', 'Francistown', 'Maun', 'Molepolole', 'Serowe'],
  population: 2400000,
  mainLanguages: ['English', 'Setswana', 'Kalanga'],
  currency: 'Botswana pula (BWP)',
  timezone: 'Africa/Gaborone',
  foundingLeader: 'Seretse Khama (first President)',
  currentLeader: 'President Duma Boko — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Compliance evolving — verify'],
  stablecoin: 'Pula floated; informal USD/USDT',
  domesticCourierServices: SADC_DOMESTIC_COURIERS['BW'],
  stockExchange: 'Botswana Stock Exchange (BSE)',
}
