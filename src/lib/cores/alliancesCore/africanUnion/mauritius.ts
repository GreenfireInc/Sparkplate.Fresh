import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
export const mauritius: AfricanUnionCountry = {
  name: 'Mauritius',
  iso3166Alpha2: 'MU',
  africanUnionStatus: 'member',
  capital: 'Port Louis',
  coordinates: { latitude: -20.1609, longitude: 57.5012 },
  independence: '1968-03-12',
  topMajorCities: ['Port Louis', 'Beau Bassin-Rose Hill', 'Vacoas-Phoenix', 'Curepipe', 'Quatre Bornes'],
  population: 1300000,
  mainLanguages: ['English', 'French', 'Mauritian Creole'],
  currency: 'Mauritian rupee (MUR)',
  timezone: 'Indian/Mauritius',
  foundingLeader: 'Seewoosagur Ramgoolam',
  currentLeader: 'Navin Ramgoolam (Prime Minister)',
  cryptocurrencyExchanges: ['Luno', 'Binance (international)', 'VALR (regional)'],
  stablecoin: 'USDT / USDC; offshore financial center activity',
  domesticCourierServices: AU_DOMESTIC_COURIERS['MU'],
  newsOutlets: AU_NEWS_OUTLETS['MU'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['MU'],
  stockExchange: 'Stock Exchange of Mauritius (SEM)',
}
