import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const australia: OecdCountry = {
  name: 'Australia',
  iso3166Alpha2: 'AU',
  capital: 'Canberra',
  coordinates: { latitude: -35.2809, longitude: 149.13 },
  independence:
    '1901 Commonwealth of Australia federation; substantive legislative sovereignty maturity; OECD member since Jun 1971 — informational',
  topMajorCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  population: 26700000,
  mainLanguages: ['English', 'Mandarin (community)', 'Arabic (community)'],
  currency: 'Australian dollar (AUD)',
  timezone: 'Australia/Sydney',
  foundingLeader: 'Federal founders era; multicultural migration policy reference — informational',
  currentLeader: 'Prime Minister Anthony Albanese — verify',
  cryptocurrencyExchanges: ['Independent Reserve', 'BTC Markets', 'CoinSpot (ASIC-regulated context — informational)'],
  stablecoin: 'AUD stablecoins (private); Treasury/ASIC supervisory evolution — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['AU'],
  newsOutlets: OECD_NEWS_OUTLETS['AU'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['AU'],
  stockExchange: 'Australian Securities Exchange (ASX, Sydney)',
}
