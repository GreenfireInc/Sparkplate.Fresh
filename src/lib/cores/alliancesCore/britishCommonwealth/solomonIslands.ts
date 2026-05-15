import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const solomonIslands: CommonwealthCountry = {
  name: 'Solomon Islands',
  iso3166Alpha2: 'SB',
  commonwealthStatus: 'member',
  capital: 'Honiara',
  coordinates: { latitude: -9.4281, longitude: 159.9726 },
  independence: '1978-07-07',
  topMajorCities: ['Honiara', 'Gizo', 'Auki', 'Kirakira', 'Buala'],
  population: 720000,
  mainLanguages: ['English', 'Solomon Islands Pijin', 'Malaitan languages'],
  currency: 'Solomon Islands dollar (SBD)',
  timezone: 'Pacific/Guadalcanal',
  foundingLeader: 'Peter Kenilorea (first Prime Minister)',
  currentLeader: 'Jeremiah Manele (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['SB'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['SB'],
  stockExchange: 'No major national exchange — informational',
}
