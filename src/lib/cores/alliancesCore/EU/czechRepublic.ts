import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const czechRepublic: EuCountry = {
  name: 'Czech Republic',
  iso3166Alpha2: 'CZ',
  capital: 'Prague',
  coordinates: { latitude: 50.0755, longitude: 14.4378 },
  independence: '1993 Velvet Divorce (Czechia); EU since 2004-05-01 — informational',
  topMajorCities: ['Prague', 'Brno', 'Ostrava', 'Plzeň', 'Liberec'],
  population: 10900000,
  mainLanguages: ['Czech', 'Slovak (minority)', 'Romani'],
  currency: 'Czech koruna (CZK)',
  timezone: 'Europe/Prague',
  foundingLeader: 'Václav Havel (first President ČR)',
  currentLeader: 'President Petr Pavel; Prime Minister — verify',
  cryptocurrencyExchanges: ['European brokers; cautious retail messaging'],
  stablecoin: 'CZK OTC; EUR pairs dominant',
  domesticCourierServices: EU_DOMESTIC_COURIERS['CZ'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['CZ'],
  stockExchange: 'Prague Stock Exchange (PX)',
}
