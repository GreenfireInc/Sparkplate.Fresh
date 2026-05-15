import type { MintCountry } from './types'
import { MINT_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { MINT_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

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
  notableUniversities: MINT_NOTABLE_UNIVERSITIES['TR'],
  stockExchange: 'Borsa Istanbul (BİST equities / debt)',
}
