import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const unitedStates: ApecCountry = {
  name: 'United States',
  iso3166Alpha2: 'US',
  capital: 'Washington, D.C.',
  coordinates: { latitude: 38.9072, longitude: -77.0369 },
  independence:
    '1776 United States lineage; dollar-area reserve-currency heavyweight Leaders\' Meeting rotational host APEC economy — informational',
  topMajorCities: ['New York City', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
  population: 342000000,
  mainLanguages: ['English', 'Spanish', 'Chinese community'],
  currency: 'United States dollar (USD)',
  timezone: 'America/New_York',
  foundingLeader:
    'Clinton-era APEC Leaders institutionalisation reference — informational',
  currentLeader: 'President / Vice-President — verify inaugural cycle',
  cryptocurrencyExchanges: ['Coinbase Kraken Gemini regulatory patchwork — informational'],
  stablecoin: 'USDT USDC fiat-backed issuance congressional evolution — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['US'],
  newsOutlets: APEC_NEWS_OUTLETS['US'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['US'],
  stockExchange: 'NYSE / Nasdaq consolidated equities',
}
