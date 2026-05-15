import type { FiveEyesCountry } from './types'
import { FIVE_EYES_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const unitedKingdom: FiveEyesCountry = {
  name: 'United Kingdom',
  iso3166Alpha2: 'GB',
  capital: 'London',
  coordinates: { latitude: 51.5074, longitude: -0.1278 },
  independence:
    'UKUSA Agreement 1946 (UK-US signals intelligence pact; Five Eyes nomenclature later); UK constituent nations — informational',
  topMajorCities: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow'],
  population: 68500000,
  mainLanguages: ['English', 'Polish (community)', 'Welsh'],
  currency: 'Pound sterling (GBP)',
  timezone: 'Europe/London',
  foundingLeader: 'Winston Churchill / Clement Attlee–era wartime Anglo-American cryptography bridge (UKUSA — informational)',
  currentLeader:
    'Monarch Charles III head of state; Prime Minister Sir Keir Starmer head of government — verify',
  cryptocurrencyExchanges: ['Coinbase e-money UK', 'Kraken entities', 'FCA-register context — informational'],
  stablecoin: 'GBP stablecoins under evolving UK PSD3/cryptoasset regime — informational',
  domesticCourierServices: FIVE_EYES_DOMESTIC_COURIERS['GB'],
  stockExchange: 'London Stock Exchange Group (post-Brexit consolidated venues — informational)',
}
