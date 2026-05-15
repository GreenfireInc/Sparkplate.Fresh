import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const luxembourg: OecdCountry = {
  name: 'Luxembourg',
  iso3166Alpha2: 'LU',
  capital: 'Luxembourg City',
  coordinates: { latitude: 49.6116, longitude: 6.1319 },
  independence:
    '1867 neutrality / grand duchy continuity; EU founding 1958; OECD founding member Sep 1961 — informational',
  topMajorCities: ['Luxembourg City', 'Esch-sur-Alzette', 'Differdange', 'Dudelange', 'Pétange'],
  population: 670000,
  mainLanguages: ['Luxembourgish', 'French', 'German'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Luxembourg',
  foundingLeader: 'Jean Monnet-era steel community reference — informational',
  currentLeader: 'Grand Duke Henri; Prime Minister — verify',
  cryptocurrencyExchanges: ['Bitstamp historical HQ LU; MiCA hub vehicles — informational'],
  stablecoin: 'EUR stablecoins; cross-border fund servicing — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['LU'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['LU'],
  stockExchange: 'Luxembourg Stock Exchange',
}
