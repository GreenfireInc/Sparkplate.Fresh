import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const nigeria: CensadCountry = {
  name: 'Nigeria',
  iso3166Alpha2: 'NG',
  capital: 'Abuja',
  coordinates: { latitude: 9.0765, longitude: 7.3986 },
  independence: '1960-10-01',
  topMajorCities: ['Lagos', 'Kano', 'Ibadan', 'Abuja', 'Port Harcourt'],
  population: 232000000,
  mainLanguages: ['English', 'Hausa', 'Yoruba'],
  currency: 'Nigerian naira (NGN)',
  timezone: 'Africa/Lagos',
  foundingLeader: 'Nnamdi Azikiwe / Abubakar Tafawa Balewa era — informational',
  currentLeader: 'President Bola Tinubu — verify',
  cryptocurrencyExchanges: ['Luno', 'Yellow Card regional', 'informal OTC (CBN policy evolution — verify)'],
  stablecoin: 'eNaira (CBDC); USDT/USDC informal markets',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['NG'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['NG'],
  stockExchange: 'Nigerian Exchange Group ( NGX )',
}
