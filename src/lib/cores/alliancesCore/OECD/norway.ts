import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const norway: OecdCountry = {
  name: 'Norway',
  iso3166Alpha2: 'NO',
  capital: 'Oslo',
  coordinates: { latitude: 59.9139, longitude: 10.7522 },
  independence:
    '1905 separation from Sweden sovereignty; EEA not full EU; OECD founding member Sep 1961 — informational',
  topMajorCities: ['Oslo', 'Bergen', 'Stavanger', 'Trondheim', 'Drammen'],
  population: 5600000,
  mainLanguages: ['Norwegian', 'Sámi (co-official pockets)', 'English'],
  currency: 'Norwegian krone (NOK)',
  timezone: 'Europe/Oslo',
  foundingLeader: 'Christian Michelsen 1905 union dissolution reference — informational',
  currentLeader: 'Monarch Harald V; Prime Minister Jonas Gahr Støre — verify coalition',
  cryptocurrencyExchanges: ['Nordic brokers; Finanstilsynet AML registration — informational'],
  stablecoin: 'NOK OTC; EUR-stable common — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['NO'],
  stockExchange: 'Oslo Stock Exchange (Euronext Oslo Børs)',
}
