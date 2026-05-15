import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
export const ethiopia: AfricanUnionCountry = {
  name: 'Ethiopia',
  iso3166Alpha2: 'ET',
  africanUnionStatus: 'member',
  capital: 'Addis Ababa',
  coordinates: { latitude: 9.032, longitude: 38.7469 },
  independence: 'Never fully colonized; modern state continuity (AU HQ host)',
  topMajorCities: ['Addis Ababa', 'Dire Dawa', 'Mekelle', 'Hawassa', 'Bahir Dar'],
  population: 132000000,
  mainLanguages: ['Amharic', 'Oromo', 'Tigrinya'],
  currency: 'Ethiopian birr (ETB)',
  timezone: 'Africa/Addis_Ababa',
  foundingLeader: 'Haile Selassie (Emperor; modernizing era reference)',
  currentLeader: 'Abiy Ahmed (Prime Minister)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local OTC'],
  stablecoin: 'USDT / USDC P2P; National Bank cautious on crypto',
  domesticCourierServices: AU_DOMESTIC_COURIERS['ET'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['ET'],
  stockExchange: 'Ethiopian Securities Exchange (launch context varies)',
}
