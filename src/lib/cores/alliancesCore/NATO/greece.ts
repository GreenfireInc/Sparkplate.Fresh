import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const greece: NatoCountry = {
  name: 'Greece',
  iso3166Alpha2: 'GR',
  capital: 'Athens',
  coordinates: { latitude: 37.9838, longitude: 23.7275 },
  independence:
    '1830 kingdom lineage; EU since 1981; NATO Ally since Feb 1952 — informational',
  topMajorCities: ['Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa'],
  population: 10400000,
  mainLanguages: ['Greek', 'English (tourism)', 'Albanian (community)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Athens',
  foundingLeader: 'Ioannis Kapodistrias-era reference — informational',
  currentLeader: 'President / Prime Minister — verify',
  cryptocurrencyExchanges: ['EU gateways — informational'],
  stablecoin: 'EUR stablecoins — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['GR'],
  newsOutlets: NATO_NEWS_OUTLETS['GR'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['GR'],
  stockExchange: 'Athens Stock Exchange',
}
