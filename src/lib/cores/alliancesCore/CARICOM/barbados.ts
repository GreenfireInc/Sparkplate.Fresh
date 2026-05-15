import type { CaricomCountry } from './types'
import { CARICOM_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CARICOM_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const barbados: CaricomCountry = {
  name: 'Barbados',
  iso3166Alpha2: 'BB',
  caricomStatus: 'full_member',
  capital: 'Bridgetown',
  coordinates: { latitude: 13.1, longitude: -59.6167 },
  independence: '1966-11-30',
  topMajorCities: ['Bridgetown', 'Speightstown', 'Oistins', 'Holetown', 'Bathsheba'],
  population: 282000,
  mainLanguages: ['English', 'Bajan Creole', 'Portuguese (small)'],
  currency: 'Barbadian dollar (BBD)',
  timezone: 'America/Barbados',
  foundingLeader: 'Errol Barrow (first Prime Minister)',
  currentLeader: 'Mia Mottley (Prime Minister)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'BBD peg to USD; USDT/USDC',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['BB'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['BB'],
  stockExchange: 'Barbados Stock Exchange',
}
