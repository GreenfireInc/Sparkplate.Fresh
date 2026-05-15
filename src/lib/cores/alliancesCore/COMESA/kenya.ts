import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMESA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const kenya: ComesaCountry = {
  name: 'Kenya',
  iso3166Alpha2: 'KE',
  capital: 'Nairobi',
  coordinates: { latitude: -1.2864, longitude: 36.8172 },
  independence: '1963-12-12',
  topMajorCities: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'],
  population: 56000000,
  mainLanguages: ['Swahili', 'English', 'Kikuyu'],
  currency: 'Kenyan shilling (KES)',
  timezone: 'Africa/Nairobi',
  foundingLeader: 'Jomo Kenyatta (first President)',
  currentLeader: 'President William Ruto — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local startups'],
  stablecoin: 'USDT / USDC; regulatory stance evolving — verify',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['KE'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['KE'],
  stockExchange: 'Nairobi Securities Exchange (NSE)',
}
