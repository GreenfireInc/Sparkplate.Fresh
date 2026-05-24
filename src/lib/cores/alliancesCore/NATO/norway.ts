import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const norway: NatoCountry = {
  name: 'Norway',
  iso3166Alpha2: 'NO',
  capital: 'Oslo',
  coordinates: { latitude: 59.9139, longitude: 10.7522 },
  independence:
    '1905 separation from Sweden sovereignty; EEA participant not EU MS; NATO founding Ally 1949-04-04 — informational',
  topMajorCities: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Drammen'],
  population: 5600000,
  mainLanguages: ['Norwegian', 'Sámi (co-official pockets)', 'English'],
  currency: 'Norwegian krone (NOK)',
  timezone: 'Europe/Oslo',
  foundingLeader: 'Haakon VII-era Atlantic alignment reference — informational',
  currentLeader: 'Monarch Harald V; Prime Minister Jonas Gahr Støre — verify coalition',
  cryptocurrencyExchanges: ['Finanstilsynet registered providers — informational'],
  stablecoin: 'NOK OTC; EUR-stable common — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['NO'],
  newsOutlets: NATO_NEWS_OUTLETS['NO'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['NO'],
  stockExchange: 'Oslo Børs (Euronext)',
}
