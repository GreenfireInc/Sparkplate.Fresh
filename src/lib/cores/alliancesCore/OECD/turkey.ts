import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const turkey: OecdCountry = {
  name: 'Turkey',
  iso3166Alpha2: 'TR',
  capital: 'Ankara',
  coordinates: { latitude: 39.9334, longitude: 32.8597 },
  independence:
    '1923 Republic post-Ottoman; NATO member; OECD founding member Sep 1961 — informational',
  topMajorCities: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya'],
  population: 85000000,
  mainLanguages: ['Turkish', 'Kurdish (community)', 'Arabic (near-border regions)'],
  currency: 'Turkish lira (TRY inflation episodes — informational)',
  timezone: 'Europe/Istanbul',
  foundingLeader: 'Mustafa Kemal Atatürk (Republic founder — informational)',
  currentLeader:
    'President Recep Tayyip Erdoğan — verify; Vice President / cabinet — verify',
  cryptocurrencyExchanges: ['BtcTurk', 'Paribu', 'MASAK registration environment — informational'],
  stablecoin: 'TRY volatility; USD-stable informal rails — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['TR'],
  stockExchange: 'Borsa Istanbul (BİST)',
}
