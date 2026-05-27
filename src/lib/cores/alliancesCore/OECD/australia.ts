import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OECD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OECD_RARE_EARTHS } from './rareEarthsByIso'
import { OECD_BOND_MARKETS } from './bondMarketsByIso'
import { OECD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

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
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['AU'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['AU'],
  rareEarths: OECD_RARE_EARTHS['AU'],
  stockExchange: 'Australian Securities Exchange (ASX, Sydney)',
  bondMarkets: OECD_BOND_MARKETS['AU'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['AU'],
}
