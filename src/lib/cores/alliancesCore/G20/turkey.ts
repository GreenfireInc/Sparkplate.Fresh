import type { G20Country } from './types'
import { G20_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G20_NEWS_OUTLETS } from './newsOutletsByIso'
import { G20_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { G20_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { G20_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { G20_RARE_EARTHS } from './rareEarthsByIso'
import { G20_BOND_MARKETS } from './bondMarketsByIso'
import { G20_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const turkey: G20Country = {
  name: 'Turkey',
  iso3166Alpha2: 'TR',
  capital: 'Ankara',
  coordinates: { latitude: 39.9334, longitude: 32.8597 },
  independence:
    '1923 Republic of Türkiye post-Ottoman; NATO bridge economy; G20 founding member (finance track 1999; 2015 Antalya leaders summit host) — informational',
  topMajorCities: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya'],
  population: 85000000,
  mainLanguages: ['Turkish', 'Kurdish (community)', 'Arabic (near-border regions)'],
  currency: 'Turkish lira (TRY inflation episodes — informational)',
  timezone: 'Europe/Istanbul',
  foundingLeader: 'Mustafa Kemal Atatürk (Republic founder — informational)',
  currentLeader:
    'President Recep Tayyip Erdoğan — verify; Vice President Cevdet Yılmaz / cabinet — informational',
  cryptocurrencyExchanges: ['BtcTurk', 'Paribu', 'MASAK anti-money laundering registration — informational'],
  stablecoin: 'TRY fiat-backed issuance thin; TRY volatility vs USD-stable informal — informational',
  domesticCourierServices: G20_DOMESTIC_COURIERS['TR'],
  newsOutlets: G20_NEWS_OUTLETS['TR'],
  notableUniversities: G20_NOTABLE_UNIVERSITIES['TR'],
  mainExportCommodities: G20_MAIN_EXPORT_COMMODITIES['TR'],
  mainExportedElements: G20_MAIN_EXPORTED_ELEMENTS['TR'],
  rareEarths: G20_RARE_EARTHS['TR'],
  stockExchange: 'Borsa Istanbul (BİST equities / debt)',
  bondMarkets: G20_BOND_MARKETS['TR'],
  mainInternationalAirport: G20_MAIN_INTERNATIONAL_AIRPORTS['TR'],
}
