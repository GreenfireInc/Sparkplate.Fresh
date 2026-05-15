import type { FiveEyesCountry } from './types'
import { FIVE_EYES_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const australia: FiveEyesCountry = {
  name: 'Australia',
  iso3166Alpha2: 'AU',
  capital: 'Canberra',
  coordinates: { latitude: -35.2809, longitude: 149.13 },
  independence:
    '1901 Commonwealth of Australia federation; substantive legislative independence matured over 20th c.; UKUSA signals alignment post-WWII — informational',
  topMajorCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  population: 26700000,
  mainLanguages: ['English', 'Mandarin (community)', 'Arabic (community)'],
  currency: 'Australian dollar (AUD)',
  timezone: 'Australia/Sydney',
  foundingLeader:
    'Sir Robert Menzies–era wartime/coalition context; UKUSA extension to dominions/partners evolution — informational',
  currentLeader: 'Prime Minister Anthony Albanese — verify',
  cryptocurrencyExchanges: ['Independent Reserve', 'BTC Markets', 'CoinSpot (ASIC-regulated AU context — informational)'],
  stablecoin: 'AUD stablecoins (private); regulatory evolution under AU Treasury/ASIC — informational',
  domesticCourierServices: FIVE_EYES_DOMESTIC_COURIERS['AU'],
  stockExchange: 'Australian Securities Exchange (ASX, Sydney)',
}
