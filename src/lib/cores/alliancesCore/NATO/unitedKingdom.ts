import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { NATO_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { NATO_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { NATO_RARE_EARTHS } from './rareEarthsByIso'
import { NATO_BOND_MARKETS } from './bondMarketsByIso'
import { NATO_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const unitedKingdom: NatoCountry = {
  name: 'United Kingdom',
  iso3166Alpha2: 'GB',
  capital: 'London',
  coordinates: { latitude: 51.5074, longitude: -0.1278 },
  independence:
    'UK state continuity; EU exit 2020; NATO founding Ally Washington Treaty 1949-04-04 — informational',
  topMajorCities: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow'],
  population: 68500000,
  mainLanguages: ['English', 'Polish (community)', 'Welsh'],
  currency: 'Pound sterling (GBP)',
  timezone: 'Europe/London',
  foundingLeader:
    'Clement Attlee / Ernest Bevin NATO founding diplomacy reference — informational',
  currentLeader:
    'Monarch Charles III; Prime Minister Sir Keir Starmer — verify',
  cryptocurrencyExchanges: ['Coinbase e-money UK', 'Kraken', 'FCA context — informational'],
  stablecoin: 'GBP stablecoins UK cryptoasset regime evolution — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['GB'],
  newsOutlets: NATO_NEWS_OUTLETS['GB'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['GB'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['GB'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['GB'],
  rareEarths: NATO_RARE_EARTHS['GB'],
  stockExchange: 'London Stock Exchange Group',
  bondMarkets: NATO_BOND_MARKETS['GB'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['GB'],
}
