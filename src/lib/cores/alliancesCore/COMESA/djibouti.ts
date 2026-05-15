import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const djibouti: ComesaCountry = {
  name: 'Djibouti',
  iso3166Alpha2: 'DJ',
  capital: 'Djibouti City',
  coordinates: { latitude: 11.5886, longitude: 43.1456 },
  independence: '1977-06-27 (from France)',
  topMajorCities: ['Djibouti City', 'Ali Sabieh', 'Tadjoura', 'Obock', 'Dikhil'],
  population: 1100000,
  mainLanguages: ['French', 'Arabic', 'Somali'],
  currency: 'Djiboutian franc (DJF)',
  timezone: 'Africa/Djibouti',
  foundingLeader: 'Hassan Gouled Aptidon (first President)',
  currentLeader: 'President Ismail Omar Guelleh — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'International OTC', 'Regional remittance apps'],
  stablecoin: 'USDT / USDC; DJF pegged to USD (currency board)',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['DJ'],
  stockExchange: 'Djibouti Stock Exchange (thin activity)',
}
