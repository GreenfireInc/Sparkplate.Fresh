import type { FiveEyesCountry } from './types'
import { FIVE_EYES_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { FIVE_EYES_NEWS_OUTLETS } from './newsOutletsByIso'
import { FIVE_EYES_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { FIVE_EYES_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { FIVE_EYES_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { FIVE_EYES_RARE_EARTHS } from './rareEarthsByIso'
import { FIVE_EYES_BOND_MARKETS } from './bondMarketsByIso'
import { FIVE_EYES_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

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
  newsOutlets: FIVE_EYES_NEWS_OUTLETS['GB'],
  notableUniversities: FIVE_EYES_NOTABLE_UNIVERSITIES['GB'],
  mainExportCommodities: FIVE_EYES_MAIN_EXPORT_COMMODITIES['GB'],
  mainExportedElements: FIVE_EYES_MAIN_EXPORTED_ELEMENTS['GB'],
  rareEarths: FIVE_EYES_RARE_EARTHS['GB'],
  stockExchange: 'London Stock Exchange Group (post-Brexit consolidated venues — informational)',
  bondMarkets: FIVE_EYES_BOND_MARKETS['GB'],
  mainInternationalAirport: FIVE_EYES_MAIN_INTERNATIONAL_AIRPORTS['GB'],
}
