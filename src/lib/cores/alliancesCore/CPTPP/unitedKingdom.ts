import type { CptppCountry } from './types'
import { CPTPP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CPTPP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const unitedKingdom: CptppCountry = {
  name: 'United Kingdom',
  iso3166Alpha2: 'GB',
  capital: 'London',
  coordinates: { latitude: 51.5074, longitude: -0.1278 },
  independence:
    'Sovereign state; Acts of Union 1707 / 1800 background — informational (CPTPP accession party)',
  topMajorCities: ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Leeds'],
  population: 68000000,
  mainLanguages: ['English', 'Welsh', 'Scots Gaelic'],
  currency: 'Pound sterling (GBP)',
  timezone: 'Europe/London',
  foundingLeader: 'Robert Walpole modern PM precedent / union-era monarchs — informational',
  currentLeader: 'King Charles III; Prime Minister Keir Starmer — verify',
  cryptocurrencyExchanges: ['Coinbase', 'Kraken', 'Gemini EU/UK hubs', 'FCA-register evolution'],
  stablecoin: 'GBP stablecoins (EMI issuers); USDC institutional',
  domesticCourierServices: CPTPP_DOMESTIC_COURIERS['GB'],
  notableUniversities: CPTPP_NOTABLE_UNIVERSITIES['GB'],
  stockExchange: 'London Stock Exchange Group (LSEG)',
}
