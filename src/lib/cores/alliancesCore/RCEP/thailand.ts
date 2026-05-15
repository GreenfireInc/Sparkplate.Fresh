import type { RcepCountry } from './types'
import { RCEP_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const thailand: RcepCountry = {
  name: 'Thailand',
  iso3166Alpha2: 'TH',
  capital: 'Bangkok',
  coordinates: { latitude: 13.7563, longitude: 100.5018 },
  independence:
    'Constitutional monarchy continuity; ASEAN Bangkok host; RCEP Party Jan 2022 wave — informational',
  topMajorCities: ['Bangkok', 'Chiang Mai', 'Pattaya', 'Hat Yai', 'Nakhon Ratchasima'],
  population: 69800000,
  mainLanguages: ['Thai', 'Isan / Lao varieties', 'English (tourism)'],
  currency: 'Thai baht (THB)',
  timezone: 'Asia/Bangkok',
  foundingLeader: 'Sarit / Bhumibol-era modernisation references — informational',
  currentLeader: 'King Rama X; Prime Minister — verify parliamentary cycle',
  cryptocurrencyExchanges: ['SEC Thai DMA licences evolution — informational'],
  stablecoin: 'BOT CBDC sandbox narratives — informational',
  domesticCourierServices: RCEP_DOMESTIC_COURIERS['TH'],
  stockExchange: 'Stock Exchange of Thailand (SET)',
}
