import type { OpecCountry } from './types'
import { OPEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OPEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { OPEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const nigeria: OpecCountry = {
  name: 'Nigeria',
  iso3166Alpha2: 'NG',
  capital: 'Abuja',
  coordinates: { latitude: 9.0765, longitude: 7.3986 },
  independence:
    '1960 independence from UK; OPEC member since Jul 1971; NNPC / OPEC quota politics — informational',
  topMajorCities: ['Lagos', 'Kano', 'Ibadan', 'Abuja', 'Port Harcourt'],
  population: 230000000,
  mainLanguages: ['English', 'Hausa', 'Yoruba / Igbo regional'],
  currency: 'Nigerian naira (NGN; parallel FX-market episodes — informational)',
  timezone: 'Africa/Lagos',
  foundingLeader: 'Abubakar Tafawa Balewa federation reference — informational',
  currentLeader: 'President Bola Ahmed Tinubu — verify',
  cryptocurrencyExchanges: ['SEC cautious licensing; Patricia / Nigerian P2P with CBN evolution — informational'],
  stablecoin: 'e-Naira CBDC experimentation; informal USDT pricing — informational',
  domesticCourierServices: OPEC_DOMESTIC_COURIERS['NG'],
  newsOutlets: OPEC_NEWS_OUTLETS['NG'],
  notableUniversities: OPEC_NOTABLE_UNIVERSITIES['NG'],
  stockExchange: 'Nigerian Exchange Group NGX (Lagos equities)',
}
