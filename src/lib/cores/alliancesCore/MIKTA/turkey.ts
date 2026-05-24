import type { MiktaCountry } from './types'
import { MIKTA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { MIKTA_NEWS_OUTLETS } from './newsOutletsByIso'
import { MIKTA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { MIKTA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const turkey: MiktaCountry = {
  name: 'Turkey',
  iso3166Alpha2: 'TR',
  capital: 'Ankara',
  coordinates: { latitude: 39.9334, longitude: 32.8597 },
  independence:
    '1923 Republic of Türkiye post-Ottoman; NATO bridge economy; G20 / MIKTA cross-regional middle-power voice — informational',
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
  domesticCourierServices: MIKTA_DOMESTIC_COURIERS['TR'],
  newsOutlets: MIKTA_NEWS_OUTLETS['TR'],
  notableUniversities: MIKTA_NOTABLE_UNIVERSITIES['TR'],
  mainExportCommodities: MIKTA_MAIN_EXPORT_COMMODITIES['TR'],
  stockExchange: 'Borsa Istanbul (BİST equities / debt)',
}
