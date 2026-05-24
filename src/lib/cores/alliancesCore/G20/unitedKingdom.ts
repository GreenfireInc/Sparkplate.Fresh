import type { G20Country } from './types'
import { G20_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G20_NEWS_OUTLETS } from './newsOutletsByIso'
import { G20_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const unitedKingdom: G20Country = {
  name: 'United Kingdom',
  iso3166Alpha2: 'GB',
  capital: 'London',
  coordinates: { latitude: 51.5074, longitude: -0.1278 },
  independence:
    'UK state continuity across England/Scotland/Wales/Northern Ireland; IMF/Bretton Woods founder; longstanding G7 member; G20 founding member (finance track 1999; 2009 London leaders summit host — first crisis-era summit) — informational',
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
  domesticCourierServices: G20_DOMESTIC_COURIERS['GB'],
  newsOutlets: G20_NEWS_OUTLETS['GB'],
  notableUniversities: G20_NOTABLE_UNIVERSITIES['GB'],
  stockExchange: 'London Stock Exchange Group (consolidated UK venues — informational)',
}
