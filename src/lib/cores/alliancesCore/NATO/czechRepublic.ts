import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const czechRepublic: NatoCountry = {
  name: 'Czech Republic',
  iso3166Alpha2: 'CZ',
  capital: 'Prague',
  coordinates: { latitude: 50.0755, longitude: 14.4378 },
  independence:
    '1993 Velvet Divorce lineage; EU since 2004; NATO Ally since Mar 1999 — informational',
  topMajorCities: ['Prague', 'Brno', 'Ostrava', 'Plzeň', 'Liberec'],
  population: 10900000,
  mainLanguages: ['Czech', 'Slovak (minority)', 'Romani'],
  currency: 'Czech koruna (CZK)',
  timezone: 'Europe/Prague',
  foundingLeader: 'Václav Havel first president ČR reference — informational',
  currentLeader: 'President Petr Pavel; Prime Minister — verify',
  cryptocurrencyExchanges: ['European brokers; cautious Czech National Bank stance — informational'],
  stablecoin: 'CZK OTC; EUR-stable dominant — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['CZ'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['CZ'],
  stockExchange: 'Prague Stock Exchange (PX)',
}
