import type { CptppCountry } from './types'
import { CPTPP_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const vietnam: CptppCountry = {
  name: 'Vietnam',
  iso3166Alpha2: 'VN',
  capital: 'Hanoi',
  coordinates: { latitude: 21.0285, longitude: 105.8542 },
  independence: '1945-09-02 (declaration); reunification 1975 — informational',
  topMajorCities: ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Hải Phòng', 'Cần Thơ'],
  population: 101000000,
  mainLanguages: ['Vietnamese', 'English', 'French (minor/heritage)'],
  currency: 'Vietnamese đồng (VND)',
  timezone: 'Asia/Ho_Chi_Minh',
  foundingLeader: 'Hồ Chí Minh (Democratic Republic leadership reference)',
  currentLeader: 'Communist Party leadership collective (General Secretary, President, PM) — verify',
  cryptocurrencyExchanges: ['Trading not legal tender; peer OTC despite restrictions — informational'],
  stablecoin: 'No official retail stablecoin; USD cash economy parallels',
  domesticCourierServices: CPTPP_DOMESTIC_COURIERS['VN'],
  stockExchange: 'Ho Chi Minh Stock Exchange (HOSE) / Hanoi Stock Exchange (HNX)',
}
