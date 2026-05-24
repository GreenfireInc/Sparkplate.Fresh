import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMESA_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMESA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const ethiopia: ComesaCountry = {
  name: 'Ethiopia',
  iso3166Alpha2: 'ET',
  capital: 'Addis Ababa',
  coordinates: { latitude: 9.032, longitude: 38.7469 },
  independence:
    'Never formally colonised as single unit; Ethiopian Empire continuity; AU host state — informational',
  topMajorCities: ['Addis Ababa', 'Dire Dawa', 'Mekelle', 'Hawassa', 'Bahir Dar'],
  population: 132000000,
  mainLanguages: ['Amharic', 'Oromo', 'Tigrinya'],
  currency: 'Ethiopian birr (ETB)',
  timezone: 'Africa/Addis_Ababa',
  foundingLeader: 'Haile Selassie (Emperor; modern federal state reference)',
  currentLeader: 'Prime Minister Abiy Ahmed — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local OTC'],
  stablecoin: 'USDT / USDC P2P; National Bank cautious on crypto',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['ET'],
  newsOutlets: COMESA_NEWS_OUTLETS['ET'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['ET'],
  stockExchange: 'Ethiopian Securities Exchange — verify launch / listings',
}
