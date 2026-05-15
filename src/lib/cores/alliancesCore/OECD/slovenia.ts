import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const slovenia: OecdCountry = {
  name: 'Slovenia',
  iso3166Alpha2: 'SI',
  capital: 'Ljubljana',
  coordinates: { latitude: 46.0569, longitude: 14.5058 },
  independence:
    '1991 Yugoslav succession; EU 2004; euro participant; OECD member since Jul 2010 — informational',
  topMajorCities: ['Ljubljana', 'Maribor', 'Celje', 'Kranj', 'Velenje'],
  population: 2100000,
  mainLanguages: ['Slovene', 'Italian (border)', 'Hungarian (minority)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Ljubljana',
  foundingLeader: 'Milan Kučan succession reference — informational',
  currentLeader: 'President Nataša Pirc Musar; Prime Minister Robert Golob — verify',
  cryptocurrencyExchanges: ['EU-compliant brokers; Ljubljana fintech corridors — informational'],
  stablecoin: 'EUR stablecoins under MiCA — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['SI'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['SI'],
  stockExchange: 'Ljubljana Stock Exchange',
}
