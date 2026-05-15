import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const slovenia: EuCountry = {
  name: 'Slovenia',
  iso3166Alpha2: 'SI',
  capital: 'Ljubljana',
  coordinates: { latitude: 46.0569, longitude: 14.5058 },
  independence: '1991 Yugoslav succession; EU 2004-05-01; Euro 2007 — informational',
  topMajorCities: ['Ljubljana', 'Maribor', 'Celje', 'Kranj', 'Velenje'],
  population: 2100000,
  mainLanguages: ['Slovene', 'Italian (border)', 'Hungarian (minority)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Ljubljana',
  foundingLeader: 'Milan Kučan (transition reference)',
  currentLeader: 'President Nataša Pirc Musar; Prime Minister Robert Golob — verify',
  cryptocurrencyExchanges: ['EU-compliant brokers Ljubljana fintech corridor'],
  stablecoin: 'EUR stablecoins under MiCA',
  domesticCourierServices: EU_DOMESTIC_COURIERS['SI'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['SI'],
  stockExchange: 'Ljubljana Stock Exchange',
}
