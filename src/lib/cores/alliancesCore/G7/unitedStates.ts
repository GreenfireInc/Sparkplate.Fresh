import type { G7Country } from './types'
import { G7_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const unitedStates: G7Country = {
  name: 'United States',
  iso3166Alpha2: 'US',
  capital: 'Washington, D.C.',
  coordinates: { latitude: 38.9072, longitude: -77.0369 },
  independence:
    '1776 United States Declaration; Bretton Woods/IMF architect; recurrent G7 host/presidency — informational',
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
  domesticCourierServices: G7_DOMESTIC_COURIERS['US'],
  stockExchange: 'NYSE/Nasdaq consolidated US equity liquidity (dual listing customary — informational)',
}
