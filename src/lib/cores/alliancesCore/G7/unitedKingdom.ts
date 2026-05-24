import type { G7Country } from './types'
import { G7_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G7_NEWS_OUTLETS } from './newsOutletsByIso'
import { G7_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { G7_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const unitedKingdom: G7Country = {
  name: 'United Kingdom',
  iso3166Alpha2: 'GB',
  capital: 'London',
  coordinates: { latitude: 51.5074, longitude: -0.1278 },
  independence:
    'UK state continuity across England/Scotland/Wales/Northern Ireland; IMF/Bretton Woods founder; longstanding G7 member — informational',
  topMajorCities: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow'],
  population: 68500000,
  mainLanguages: ['English', 'Polish (community)', 'Welsh'],
  currency: 'Pound sterling (GBP)',
  timezone: 'Europe/London',
  foundingLeader:
    'Clement Attlee / Winston Churchill (post-war treasury and Atlantic economic alliance reference — informational)',
  currentLeader:
    'Monarch Charles III head of state; Prime Minister Sir Keir Starmer head of government — verify',
  cryptocurrencyExchanges: ['Coinbase e-money UK', 'Kraken entities', 'FCA-register context — informational'],
  stablecoin: 'GBP stablecoins under evolving UK PSD3/cryptoasset regime — informational',
  domesticCourierServices: G7_DOMESTIC_COURIERS['GB'],
  newsOutlets: G7_NEWS_OUTLETS['GB'],
  notableUniversities: G7_NOTABLE_UNIVERSITIES['GB'],
  mainExportCommodities: G7_MAIN_EXPORT_COMMODITIES['GB'],
  stockExchange: 'London Stock Exchange Group (consolidated UK venues — informational)',
}
