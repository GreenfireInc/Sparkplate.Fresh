import type { G20Country } from './types'
import { G20_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G20_NEWS_OUTLETS } from './newsOutletsByIso'
import { G20_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { G20_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { G20_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { G20_RARE_EARTHS } from './rareEarthsByIso'
import { G20_BOND_MARKETS } from './bondMarketsByIso'

export const australia: G20Country = {
  name: 'Australia',
  iso3166Alpha2: 'AU',
  capital: 'Canberra',
  coordinates: { latitude: -35.2809, longitude: 149.13 },
  independence:
    '1901-01-01 Federation of the Commonwealth of Australia; Australia Act 1986 sovereign continuity; G20 founding member (finance track 1999; 2014 Brisbane leaders summit host) — informational',
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
  domesticCourierServices: G20_DOMESTIC_COURIERS['AU'],
  newsOutlets: G20_NEWS_OUTLETS['AU'],
  notableUniversities: G20_NOTABLE_UNIVERSITIES['AU'],
  mainExportCommodities: G20_MAIN_EXPORT_COMMODITIES['AU'],
  mainExportedElements: G20_MAIN_EXPORTED_ELEMENTS['AU'],
  rareEarths: G20_RARE_EARTHS['AU'],
  stockExchange: 'Australian Securities Exchange ASX (Sydney)',
  bondMarkets: G20_BOND_MARKETS['AU'],
}
