import type { FiveEyesCountry } from './types'
import { FIVE_EYES_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { FIVE_EYES_NEWS_OUTLETS } from './newsOutletsByIso'
import { FIVE_EYES_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { FIVE_EYES_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const unitedStates: FiveEyesCountry = {
  name: 'United States',
  iso3166Alpha2: 'US',
  capital: 'Washington, D.C.',
  coordinates: { latitude: 38.9072, longitude: -77.0369 },
  independence:
    '1776 United States Declaration; UKUSA bilateral signals pact 1946; Multilateral Agreements evolution alongside CAN/AUS/NZ — informational',
  topMajorCities: ['New York City', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
  population: 342000000,
  mainLanguages: ['English', 'Spanish', 'Chinese (community)'],
  currency: 'United States dollar (USD)',
  timezone: 'America/New_York',
  foundingLeader:
    'Franklin D. Roosevelt / Harry S. Truman–era wartime cryptography and institutional continuity (UKUSA genesis — informational)',
  currentLeader: 'President / Vice-President — verify (federal inauguration cycle)',
  cryptocurrencyExchanges: ['Coinbase', 'Kraken', 'Gemini state MSB/licensing patchwork — informational'],
  stablecoin: 'USDT/USDC and USD fiat-backed issuance (federal/stablecoin legislative evolution — informational)',
  domesticCourierServices: FIVE_EYES_DOMESTIC_COURIERS['US'],
  newsOutlets: FIVE_EYES_NEWS_OUTLETS['US'],
  notableUniversities: FIVE_EYES_NOTABLE_UNIVERSITIES['US'],
  mainExportCommodities: FIVE_EYES_MAIN_EXPORT_COMMODITIES['US'],
  stockExchange: 'NYSE/Nasdaq consolidated US equity liquidity (dual listing customary — informational)',
}
