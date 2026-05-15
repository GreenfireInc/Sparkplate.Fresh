import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const somalia: CensadCountry = {
  name: 'Somalia',
  iso3166Alpha2: 'SO',
  capital: 'Mogadishu',
  coordinates: { latitude: 2.0469, longitude: 45.3182 },
  independence: '1960-07-01 (union of Italian Somaliland and British Somaliland — informational)',
  topMajorCities: ['Mogadishu', 'Hargeisa', 'Bossaso', 'Kismayo', 'Baidoa'],
  population: 18800000,
  mainLanguages: ['Somali', 'Arabic', 'English'],
  currency: 'Somali shilling (SOS)',
  timezone: 'Africa/Mogadishu',
  foundingLeader: 'Aden Abdullah Osman Daar (first President)',
  currentLeader: 'President Hassan Sheikh Mohamud — verify federal vs regional administrations',
  cryptocurrencyExchanges: ['Hawala-adjacent digital; diaspora OTC'],
  stablecoin: 'Informal USDT/USDC',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['SO'],
  stockExchange: 'No functioning national equities market',
}
