import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const poland: EuCountry = {
  name: 'Poland',
  iso3166Alpha2: 'PL',
  capital: 'Warsaw',
  coordinates: { latitude: 52.2297, longitude: 21.0122 },
  independence: '1989 democratic transition; EU since 2004-05-01 — informational',
  topMajorCities: ['Warsaw', 'Kraków', 'Łódź', 'Wrocław', 'Poznań'],
  population: 36600000,
  mainLanguages: ['Polish', 'German (minority)', 'Ukrainian (community)'],
  currency: 'Polish złoty (PLN)',
  timezone: 'Europe/Warsaw',
  foundingLeader: 'Lech Wałęsa (solidarity-to-presidency reference)',
  currentLeader: 'President Karol Nawrocki — verify; Prime Minister Donald Tusk — verify',
  cryptocurrencyExchanges: ['Zonda (BitBay legacy)', 'European MiCA passporting'],
  stablecoin: 'PLN pairs; EUR-stable conversion common',
  domesticCourierServices: EU_DOMESTIC_COURIERS['PL'],
  stockExchange: 'Warsaw Stock Exchange (GPW)',
}
