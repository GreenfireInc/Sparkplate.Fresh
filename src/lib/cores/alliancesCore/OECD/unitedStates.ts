import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const unitedStates: OecdCountry = {
  name: 'United States',
  iso3166Alpha2: 'US',
  capital: 'Washington, D.C.',
  coordinates: { latitude: 38.9072, longitude: -77.0369 },
  independence:
    '1776 United States Declaration; Bretton Woods anchor; OECD founding member Sep 1961 — informational',
  topMajorCities: ['New York City', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
  population: 342000000,
  mainLanguages: ['English', 'Spanish', 'Chinese (community)'],
  currency: 'United States dollar (USD)',
  timezone: 'America/New_York',
  foundingLeader:
    'Franklin D. Roosevelt post-war international economic institutions reference — informational',
  currentLeader: 'President / Vice-President — verify (federal inauguration cycle)',
  cryptocurrencyExchanges: ['Coinbase', 'Kraken', 'Gemini MSB state patchwork — informational'],
  stablecoin: 'USDT/USDC and USD fiat-backed issuance (federal legislation evolution — informational)',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['US'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['US'],
  stockExchange: 'NYSE / Nasdaq consolidated US equity liquidity',
}
