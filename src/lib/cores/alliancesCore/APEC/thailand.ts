import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const thailand: ApecCountry = {
  name: 'Thailand',
  iso3166Alpha2: 'TH',
  capital: 'Bangkok',
  coordinates: { latitude: 13.7563, longitude: 100.5018 },
  independence:
    'Constitutional monarchy continuity; ASEAN auto-industrial hub Mekong gateways APEC facilitation member — informational',
  topMajorCities: ['Bangkok', 'Chiang Mai', 'Pattaya', 'Hat Yai', 'Nakhon Ratchasima'],
  population: 69800000,
  mainLanguages: ['Thai', 'Isan / Lao varieties', 'English tourism business'],
  currency: 'Thai baht (THB)',
  timezone: 'Asia/Bangkok',
  foundingLeader:
    'Bhumibol modernisation stature reference — informational',
  currentLeader: 'King Rama X; Prime Minister — verify parliamentary cycle',
  cryptocurrencyExchanges: ['SEC Thai DMA operator licences evolving — informational'],
  stablecoin: 'BOT sandbox CBDC — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['TH'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['TH'],
  stockExchange: 'Stock Exchange of Thailand SET',
}
