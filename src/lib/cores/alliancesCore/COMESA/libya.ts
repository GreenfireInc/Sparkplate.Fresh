import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMESA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const libya: ComesaCountry = {
  name: 'Libya',
  iso3166Alpha2: 'LY',
  capital: 'Tripoli',
  coordinates: { latitude: 32.8872, longitude: 13.1913 },
  independence: '1951-12-24',
  topMajorCities: ['Tripoli', 'Benghazi', 'Misrata', 'Bayda', 'Zawiya'],
  population: 7000000,
  mainLanguages: ['Arabic (Libyan)', 'Berber (Tamazight)', 'Italian (legacy)'],
  currency: 'Libyan dinar (LYD)',
  timezone: 'Africa/Tripoli',
  foundingLeader: 'King Idris I',
  currentLeader:
    'Fragmented administrations — GNU Presidential Council chairs (Mohamed al-Menfi GNU Tripoli baseline) — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional OTC; fragmented regulatory environment'],
  stablecoin: 'USDT informal; banking fragmentation',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['LY'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['LY'],
  stockExchange: 'Libyan Stock Market (limited operations)',
}
