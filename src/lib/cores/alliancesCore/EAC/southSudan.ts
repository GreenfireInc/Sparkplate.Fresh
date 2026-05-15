import type { EacCountry } from './types'
import { EAC_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const southSudan: EacCountry = {
  name: 'South Sudan',
  iso3166Alpha2: 'SS',
  capital: 'Juba',
  coordinates: { latitude: 4.8594, longitude: 31.5713 },
  independence: '2011-07-09',
  topMajorCities: ['Juba', 'Wau', 'Malakal', 'Yei', 'Aweil'],
  population: 11000000,
  mainLanguages: ['English', 'Dinka', 'Nuer'],
  currency: 'South Sudanese pound (SSP)',
  timezone: 'Africa/Juba',
  foundingLeader: 'Salva Kiir Mayardit (founding President)',
  currentLeader: 'President Salva Kiir Mayardit — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Informal P2P', 'Diaspora OTC'],
  stablecoin: 'USDT informal; humanitarian USD economy',
  domesticCourierServices: EAC_DOMESTIC_COURIERS['SS'],
  stockExchange: 'Juba Stock Exchange (nascent / limited)',
}
