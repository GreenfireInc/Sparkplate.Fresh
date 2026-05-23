import type { G20Country } from './types'
import { G20_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G20_NEWS_OUTLETS } from './newsOutletsByIso'
import { G20_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const unitedStates: G20Country = {
  name: 'United States',
  iso3166Alpha2: 'US',
  capital: 'Washington, D.C.',
  coordinates: { latitude: 38.9072, longitude: -77.0369 },
  independence:
    '1776 United States Declaration; Bretton Woods/IMF architect; G20 founding member (finance track 1999 originated by US Treasury convening; 2009 Pittsburgh leaders summit host) — informational',
  topMajorCities: ['New York City', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
  population: 342000000,
  mainLanguages: ['English', 'Spanish', 'Chinese (community)'],
  currency: 'United States dollar (USD)',
  timezone: 'America/New_York',
  foundingLeader:
    'George Washington (constitutional formation reference); Roosevelt-era multilateral monetary order — informational',
  currentLeader: 'President / Vice-President — verify (federal inauguration cycle)',
  cryptocurrencyExchanges: ['Coinbase', 'Kraken', 'Gemini state MSB/licensing patchwork — informational'],
  stablecoin: 'USDT/USDC and USD fiat-backed issuance (federal/stablecoin legislation evolution — informational)',
  domesticCourierServices: G20_DOMESTIC_COURIERS['US'],
  newsOutlets: G20_NEWS_OUTLETS['US'],
  notableUniversities: G20_NOTABLE_UNIVERSITIES['US'],
  stockExchange: 'NYSE/Nasdaq consolidated US equity liquidity (dual listing customary — informational)',
}
