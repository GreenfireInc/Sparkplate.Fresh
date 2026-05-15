import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const papuaNewGuinea: CommonwealthCountry = {
  name: 'Papua New Guinea',
  iso3166Alpha2: 'PG',
  commonwealthStatus: 'member',
  capital: 'Port Moresby',
  coordinates: { latitude: -9.4438, longitude: 147.1803 },
  independence: '1975-09-16',
  topMajorCities: ['Port Moresby', 'Lae', 'Arawa', 'Mount Hagen', 'Madang'],
  population: 10000000,
  mainLanguages: ['English', 'Tok Pisin', 'Hiri Motu'],
  currency: 'Papua New Guinean kina (PGK)',
  timezone: 'Pacific/Port_Moresby',
  foundingLeader: 'Michael Somare (first Prime Minister)',
  currentLeader: 'James Marape (Prime Minister)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['PG'],
  stockExchange: 'PNG National Stock Exchange',
}
