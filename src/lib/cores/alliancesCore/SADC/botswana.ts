import type { SadcCountry } from './types'
import { SADC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { SADC_NEWS_OUTLETS } from './newsOutletsByIso'
import { SADC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { SADC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

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
  newsOutlets: SADC_NEWS_OUTLETS['BW'],
  notableUniversities: SADC_NOTABLE_UNIVERSITIES['BW'],
  mainExportCommodities: SADC_MAIN_EXPORT_COMMODITIES['BW'],
  stockExchange: 'Botswana Stock Exchange (BSE)',
}
