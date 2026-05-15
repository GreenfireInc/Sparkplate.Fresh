import type { EacCountry } from './types'
import { EAC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EAC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const rwanda: EacCountry = {
  name: 'Rwanda',
  iso3166Alpha2: 'RW',
  capital: 'Kigali',
  coordinates: { latitude: -1.9441, longitude: 30.0619 },
  independence: '1962-07-01',
  topMajorCities: ['Kigali', 'Huye (Butare)', 'Muhanga (Gitarama)', 'Musanze', 'Rusizi'],
  population: 14000000,
  mainLanguages: ['Kinyarwanda', 'French', 'English'],
  currency: 'Rwandan franc (RWF)',
  timezone: 'Africa/Kigali',
  foundingLeader: 'Grégoire Kayibanda (first President)',
  currentLeader: 'President Paul Kagame — verify',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Kigali fintech hubs'],
  stablecoin: 'USDT / USDC; CBDC narratives — verify',
  domesticCourierServices: EAC_DOMESTIC_COURIERS['RW'],
  notableUniversities: EAC_NOTABLE_UNIVERSITIES['RW'],
  stockExchange: 'Rwanda Stock Exchange',
}
