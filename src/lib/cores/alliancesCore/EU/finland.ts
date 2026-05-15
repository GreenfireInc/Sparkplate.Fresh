import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const finland: EuCountry = {
  name: 'Finland',
  iso3166Alpha2: 'FI',
  capital: 'Helsinki',
  coordinates: { latitude: 60.1699, longitude: 24.9384 },
  independence: '1917; EU since 1995-01-01; Euro 1999 — informational',
  topMajorCities: ['Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Turku'],
  population: 5600000,
  mainLanguages: ['Finnish', 'Swedish', 'English'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Helsinki',
  foundingLeader: 'Carl Gustaf Emil Mannerheim era — informational',
  currentLeader: 'President Alexander Stubb; Prime Minister — verify',
  cryptocurrencyExchanges: ['Nordics-friendly EU brokers; Finnish FSA supervise'],
  stablecoin: 'EUR stablecoins; MiCA passport',
  domesticCourierServices: EU_DOMESTIC_COURIERS['FI'],
  stockExchange: 'Nasdaq Helsinki',
}
