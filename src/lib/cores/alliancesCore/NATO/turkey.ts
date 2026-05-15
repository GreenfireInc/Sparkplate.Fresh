import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const turkey: NatoCountry = {
  name: 'Turkey',
  iso3166Alpha2: 'TR',
  capital: 'Ankara',
  coordinates: { latitude: 39.9334, longitude: 32.8597 },
  independence:
    '1923 Republic post-Ottoman; NATO Ally since Feb 1952 (Alliance southern flank pillar — informational)',
  topMajorCities: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya'],
  population: 85000000,
  mainLanguages: ['Turkish', 'Kurdish (community)', 'Arabic (border regions)'],
  currency: 'Turkish lira (TRY)',
  timezone: 'Europe/Istanbul',
  foundingLeader: 'Mustafa Kemal Atatürk — informational',
  currentLeader:
    'President Recep Tayyip Erdoğan — verify; Vice President — verify cabinet',
  cryptocurrencyExchanges: ['BtcTurk', 'Paribu', 'MASAK registration — informational'],
  stablecoin: 'TRY volatility; USD-stable informal — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['TR'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['TR'],
  stockExchange: 'Borsa Istanbul (BİST)',
}
