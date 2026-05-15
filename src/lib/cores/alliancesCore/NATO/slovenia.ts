import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const slovenia: NatoCountry = {
  name: 'Slovenia',
  iso3166Alpha2: 'SI',
  capital: 'Ljubljana',
  coordinates: { latitude: 46.0569, longitude: 14.5058 },
  independence:
    '1991 Yugoslav succession; EU 2004 euro participant; NATO Ally since Mar 2004 — informational',
  topMajorCities: ['Ljubljana', 'Maribor', 'Celje', 'Kranj', 'Velenje'],
  population: 2100000,
  mainLanguages: ['Slovene', 'Italian (border)', 'Hungarian (minority)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Ljubljana',
  foundingLeader: 'Milan Kučan transition reference — informational',
  currentLeader: 'President Nataša Pirc Musar; Prime Minister Robert Golob — verify',
  cryptocurrencyExchanges: ['EU-compliant brokers Ljubljana corridor — informational'],
  stablecoin: 'EUR stablecoins MiCA — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['SI'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['SI'],
  stockExchange: 'Ljubljana Stock Exchange',
}
