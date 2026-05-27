import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OECD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OECD_RARE_EARTHS } from './rareEarthsByIso'
import { OECD_BOND_MARKETS } from './bondMarketsByIso'
import { OECD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const unitedKingdom: OecdCountry = {
  name: 'United Kingdom',
  iso3166Alpha2: 'GB',
  capital: 'London',
  coordinates: { latitude: 51.5074, longitude: -0.1278 },
  independence:
    'UK state continuity (England/Scotland/Wales/NI); EU exit 2020; OECD founding member May 1961 — informational',
  topMajorCities: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow'],
  population: 68500000,
  mainLanguages: ['English', 'Polish (community)', 'Welsh'],
  currency: 'Pound sterling (GBP)',
  timezone: 'Europe/London',
  foundingLeader:
    'Clement Attlee / Winston Churchill post-war Atlantic economic order reference — informational',
  currentLeader:
    'Monarch Charles III head of state; Prime Minister Sir Keir Starmer head of government — verify',
  cryptocurrencyExchanges: ['Coinbase e-money UK', 'Kraken entities', 'FCA-register context — informational'],
  stablecoin: 'GBP stablecoins under evolving UK cryptoasset regime — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['GB'],
  newsOutlets: OECD_NEWS_OUTLETS['GB'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['GB'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['GB'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['GB'],
  rareEarths: OECD_RARE_EARTHS['GB'],
  stockExchange: 'London Stock Exchange Group',
  bondMarkets: OECD_BOND_MARKETS['GB'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['GB'],
}
