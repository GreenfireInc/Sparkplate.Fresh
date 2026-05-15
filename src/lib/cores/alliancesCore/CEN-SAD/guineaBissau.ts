import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const guineaBissau: CensadCountry = {
  name: 'Guinea-Bissau',
  iso3166Alpha2: 'GW',
  capital: 'Bissau',
  coordinates: { latitude: 11.8563, longitude: -15.5834 },
  independence: '1974-09-24 (unilateral); Portugal recognition 1975',
  topMajorCities: ['Bissau', 'Gabú', 'Bafatá', 'Bissorã', 'Bolama'],
  population: 2170000,
  mainLanguages: ['Portuguese', 'Guinea-Bissau Creole', 'Fula'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Bissau',
  foundingLeader: 'Luís Cabral (first President after recognition)',
  currentLeader: 'President Umaro Sissoco Embaló — verify',
  cryptocurrencyExchanges: ['Informal regional P2P'],
  stablecoin: 'USDT informal; CFA peg',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['GW'],
  stockExchange: 'BRVM (cross-listing context for WAEMU)',
}
