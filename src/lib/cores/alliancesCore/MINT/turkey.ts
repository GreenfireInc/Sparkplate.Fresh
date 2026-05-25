import type { MintCountry } from './types'
import { MINT_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { MINT_NEWS_OUTLETS } from './newsOutletsByIso'
import { MINT_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { MINT_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { MINT_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { MINT_RARE_EARTHS } from './rareEarthsByIso'
import { MINT_BOND_MARKETS } from './bondMarketsByIso'

export const turkey: MintCountry = {
  name: 'Turkey',
  iso3166Alpha2: 'TR',
  capital: 'Ankara',
  coordinates: { latitude: 39.9334, longitude: 32.8597 },
  independence:
    '1923 Republic of Türkiye post-Ottoman; NATO bridge economy; large consumer market MINT acronym context — informational',
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
  domesticCourierServices: MINT_DOMESTIC_COURIERS['TR'],
  newsOutlets: MINT_NEWS_OUTLETS['TR'],
  notableUniversities: MINT_NOTABLE_UNIVERSITIES['TR'],
  mainExportCommodities: MINT_MAIN_EXPORT_COMMODITIES['TR'],
  mainExportedElements: MINT_MAIN_EXPORTED_ELEMENTS['TR'],
  rareEarths: MINT_RARE_EARTHS['TR'],
  stockExchange: 'Borsa Istanbul (BİST equities / debt)',
  bondMarkets: MINT_BOND_MARKETS['TR'],
}
