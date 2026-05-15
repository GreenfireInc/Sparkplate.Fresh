import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
export const rwanda: AfricanUnionCountry = {
  name: 'Rwanda',
  iso3166Alpha2: 'RW',
  africanUnionStatus: 'member',
  capital: 'Kigali',
  coordinates: { latitude: -1.9441, longitude: 30.0619 },
  independence: '1962-07-01',
  topMajorCities: ['Kigali', 'Butare (Huye)', 'Gitarama (Muhanga)', 'Musanze', 'Cyangugu'],
  population: 14000000,
  mainLanguages: ['Kinyarwanda', 'French', 'English'],
  currency: 'Rwandan franc (RWF)',
  timezone: 'Africa/Kigali',
  foundingLeader: 'Grégoire Kayibanda',
  currentLeader: 'Paul Kagame (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Blockchain hub initiatives'],
  stablecoin: 'USDT / USDC; central bank exploring CBDC',
  domesticCourierServices: AU_DOMESTIC_COURIERS['RW'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['RW'],
  stockExchange: 'Rwanda Stock Exchange',
}
