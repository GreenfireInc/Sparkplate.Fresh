import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const mauritius: ComesaCountry = {
  name: 'Mauritius',
  iso3166Alpha2: 'MU',
  capital: 'Port Louis',
  coordinates: { latitude: -20.1609, longitude: 57.5012 },
  independence: '1968-03-12',
  topMajorCities: ['Port Louis', 'Beau Bassin-Rose Hill', 'Vacoas-Phoenix', 'Curepipe', 'Quatre Bornes'],
  population: 1300000,
  mainLanguages: ['English', 'French', 'Mauritian Creole'],
  currency: 'Mauritian rupee (MUR)',
  timezone: 'Indian/Mauritius',
  foundingLeader: 'Seewoosagur Ramgoolam (first Prime Minister)',
  currentLeader:
    'Prime Minister Navin Ramgoolam; Head of State (President) — verify (COMESA treaty signed Port Louis)',
  cryptocurrencyExchanges: ['Luno', 'Binance (international)', 'VALR (regional)'],
  stablecoin: 'USDT / USDC; offshore financial center activity',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['MU'],
  stockExchange: 'Stock Exchange of Mauritius (SEM)',
}
