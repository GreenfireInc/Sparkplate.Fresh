import type { CptppCountry } from './types'
import { CPTPP_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const mexico: CptppCountry = {
  name: 'Mexico',
  iso3166Alpha2: 'MX',
  capital: 'Mexico City',
  coordinates: { latitude: 19.4326, longitude: -99.1332 },
  independence: '1810–1821 (Spain; modern constitutional state evolution)',
  topMajorCities: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana'],
  population: 132000000,
  mainLanguages: ['Spanish', 'Indigenous languages (Nahuatl etc.)', 'English'],
  currency: 'Mexican peso (MXN)',
  timezone: 'America/Mexico_City',
  foundingLeader: 'Agustín de Iturbide / early republic figures — informational',
  currentLeader: 'President Claudia Sheinbaum — verify',
  cryptocurrencyExchanges: ['Bitso', 'VOLTA', 'Global platforms (travel context)'],
  stablecoin: 'USDT / USDC; CBDC exploratory discourse',
  domesticCourierServices: CPTPP_DOMESTIC_COURIERS['MX'],
  stockExchange: 'Mexican Stock Exchange (Bolsa Mexicana de Valores)',
}
