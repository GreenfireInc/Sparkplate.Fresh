import type { MiktaCountry } from './types'
import { MIKTA_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const australia: MiktaCountry = {
  name: 'Australia',
  iso3166Alpha2: 'AU',
  capital: 'Canberra',
  coordinates: { latitude: -35.2809, longitude: 149.13 },
  independence:
    '1901-01-01 Federation of the Commonwealth of Australia (six colonies); Statute of Westminster Adoption 1942; Australia Act 1986; Five Eyes / G20 / MIKTA middle-power voice — informational',
  topMajorCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  population: 26700000,
  mainLanguages: ['English', 'Mandarin (community)', 'Australian Aboriginal languages (heritage)'],
  currency: 'Australian dollar (AUD)',
  timezone: 'Australia/Sydney',
  foundingLeader:
    'Sir Edmund Barton (first Prime Minister 1901); Sir Henry Parkes federation advocate — informational',
  currentLeader: 'Prime Minister Anthony Albanese — verify',
  cryptocurrencyExchanges: ['Independent Reserve', 'BTC Markets', 'CoinJar / Swyftx AUSTRAC registration regime — informational'],
  stablecoin: 'AUDD (Novatti) and AUDC pilots; ANZ A$DC bank-issued settlement experiments — informational',
  domesticCourierServices: MIKTA_DOMESTIC_COURIERS['AU'],
  stockExchange: 'Australian Securities Exchange ASX (Sydney)',
}
