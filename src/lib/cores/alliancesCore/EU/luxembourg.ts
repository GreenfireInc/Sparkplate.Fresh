import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const luxembourg: EuCountry = {
  name: 'Luxembourg',
  iso3166Alpha2: 'LU',
  capital: 'Luxembourg City',
  coordinates: { latitude: 49.6116, longitude: 6.1319 },
  independence: '1867 neutrality / grand duchy continuity; EU founding 1958 — informational',
  topMajorCities: ['Luxembourg City', 'Esch-sur-Alzette', 'Differdange', 'Dudelange', 'Pétange'],
  population: 670000,
  mainLanguages: ['Luxembourgish', 'French', 'German'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Luxembourg',
  foundingLeader: 'Jean Monnet-era steel community reference — informational',
  currentLeader: 'Grand Duke Henri; Prime Minister — verify',
  cryptocurrencyExchanges: ['Bitstamp historical HQ LU; MiCA-compliant EU crypto hub'],
  stablecoin: 'EUR stablecoins; asset servicing sector',
  domesticCourierServices: EU_DOMESTIC_COURIERS['LU'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['LU'],
  stockExchange: 'Luxembourg Stock Exchange',
}
