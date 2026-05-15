import type { RcepCountry } from './types'
import { RCEP_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const australia: RcepCountry = {
  name: 'Australia',
  iso3166Alpha2: 'AU',
  capital: 'Canberra',
  coordinates: { latitude: -35.2809, longitude: 149.13 },
  independence:
    '1901 Commonwealth federation; RCEP Party (signed Nov 2020; entry into force tranche from 2022-01-02 AU ratification context — informational)',
  topMajorCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  population: 26700000,
  mainLanguages: ['English', 'Mandarin (community)', 'Arabic (community)'],
  currency: 'Australian dollar (AUD)',
  timezone: 'Australia/Sydney',
  foundingLeader: 'Federation founders; post-war multilateral trade openness reference — informational',
  currentLeader: 'Prime Minister Anthony Albanese — verify',
  cryptocurrencyExchanges: ['Independent Reserve', 'BTC Markets', 'CoinSpot ASIC context — informational'],
  stablecoin: 'AUD stablecoins; Treasury/ASIC evolution — informational',
  domesticCourierServices: RCEP_DOMESTIC_COURIERS['AU'],
  stockExchange: 'Australian Securities Exchange (ASX)',
}
