import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'

export const unitedKingdom: CommonwealthCountry = {
  name: 'United Kingdom',
  iso3166Alpha2: 'GB',
  commonwealthStatus: 'member',
  capital: 'London',
  coordinates: { latitude: 51.5074, longitude: -0.1278 },
  independence: 'N/A (sovereign state; devolution dates vary)',
  topMajorCities: ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool'],
  population: 67000000,
  mainLanguages: ['English', 'Welsh', 'Scots Gaelic'],
  currency: 'Pound sterling (GBP)',
  timezone: 'Europe/London',
  foundingLeader: 'Robert Walpole (first PM, Westminster system context)',
  currentLeader: 'Keir Starmer (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Coinbase', 'Kraken', 'Revolut crypto'],
  stablecoin: 'GBP stablecoins limited; USDC/USDT on exchanges',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['GB'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['GB'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['GB'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['GB'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['GB'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['GB'],
  stockExchange: 'London Stock Exchange (LSE)',
}
