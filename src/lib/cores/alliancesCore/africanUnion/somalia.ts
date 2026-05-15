import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
export const somalia: AfricanUnionCountry = {
  name: 'Somalia',
  iso3166Alpha2: 'SO',
  africanUnionStatus: 'member',
  capital: 'Mogadishu',
  coordinates: { latitude: 2.0469, longitude: 45.3182 },
  independence: '1960-07-01',
  topMajorCities: ['Mogadishu', 'Hargeisa', 'Bosaso', 'Kismayo', 'Baidoa'],
  population: 18000000,
  mainLanguages: ['Somali', 'Arabic', 'Italian (legacy)'],
  currency: 'Somali shilling (SOS); United States dollar widely used',
  timezone: 'Africa/Mogadishu',
  foundingLeader: 'Aden Abdullah Osman Daar',
  currentLeader: 'Hassan Sheikh Mohamud (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Hawala-linked OTC', 'Diaspora remittance apps'],
  stablecoin: 'USDT informal; USD cash economy',
  domesticCourierServices: AU_DOMESTIC_COURIERS['SO'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['SO'],
  stockExchange: 'No functioning national exchange',
}
