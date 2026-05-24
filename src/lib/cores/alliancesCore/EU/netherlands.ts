import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_NEWS_OUTLETS } from './newsOutletsByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const netherlands: EuCountry = {
  name: 'Netherlands',
  iso3166Alpha2: 'NL',
  capital: 'Amsterdam (constitutional); seat of government The Hague',
  coordinates: { latitude: 52.3676, longitude: 4.9041 },
  independence: 'Kingdom constitution continuity; EU founding 1958 — informational',
  topMajorCities: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven'],
  population: 17800000,
  mainLanguages: ['Dutch', 'English', 'Turkish / Arabic (communities)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Amsterdam',
  foundingLeader: 'Willem Drees (post-war reference)',
  currentLeader: 'Monarch Willem-Alexander; Prime Minister Dick Schoof — verify',
  cryptocurrencyExchanges: ['Bitstamp', 'EU MiCA-aligned Dutch AFM registry'],
  stablecoin: 'EUR stablecoins; e-money institutions',
  domesticCourierServices: EU_DOMESTIC_COURIERS['NL'],
  newsOutlets: EU_NEWS_OUTLETS['NL'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['NL'],
  stockExchange: 'Euronext Amsterdam',
}
