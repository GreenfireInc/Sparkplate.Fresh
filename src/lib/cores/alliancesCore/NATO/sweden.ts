import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const sweden: NatoCountry = {
  name: 'Sweden',
  iso3166Alpha2: 'SE',
  capital: 'Stockholm',
  coordinates: { latitude: 59.3293, longitude: 18.0686 },
  independence:
    'Constitutional monarchy continuity; EU since 1995 (euro opt-out); NATO Ally since Mar 2024 — informational',
  topMajorCities: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås'],
  population: 10600000,
  mainLanguages: ['Swedish', 'English', 'Arabic / Somali / Persian (immigrant communities)'],
  currency: 'Swedish krona (SEK)',
  timezone: 'Europe/Stockholm',
  foundingLeader: 'Olof Palme neutrality-to-partnership reference — informational',
  currentLeader: 'Monarch Carl XVI Gustaf; Prime Minister Ulf Kristersson — verify',
  cryptocurrencyExchanges: ['European brokers; Nasdaq Nordic crypto ETP — informational'],
  stablecoin: 'EUR/USD-stable pairs; Riksbank e-krona pilots — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['SE'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['SE'],
  stockExchange: 'Nasdaq Stockholm',
}
