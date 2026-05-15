import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
export const southSudan: AfricanUnionCountry = {
  name: 'South Sudan',
  iso3166Alpha2: 'SS',
  africanUnionStatus: 'member',
  capital: 'Juba',
  coordinates: { latitude: 4.8594, longitude: 31.5713 },
  independence: '2011-07-09',
  topMajorCities: ['Juba', 'Wau', 'Malakal', 'Yei', 'Aweil'],
  population: 11000000,
  mainLanguages: ['English', 'Dinka', 'Nuer'],
  currency: 'South Sudanese pound (SSP)',
  timezone: 'Africa/Juba',
  foundingLeader: 'Salva Kiir Mayardit',
  currentLeader: 'Salva Kiir Mayardit (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Informal P2P', 'Diaspora OTC'],
  stablecoin: 'USDT informal; humanitarian USD economy',
  domesticCourierServices: AU_DOMESTIC_COURIERS['SS'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['SS'],
  stockExchange: 'Juba Stock Exchange (nascent / limited)',
}
