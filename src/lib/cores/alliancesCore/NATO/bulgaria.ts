import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const bulgaria: NatoCountry = {
  name: 'Bulgaria',
  iso3166Alpha2: 'BG',
  capital: 'Sofia',
  coordinates: { latitude: 42.6977, longitude: 23.3219 },
  independence:
    '1908 principality sovereignty continuity; EU since 2007; NATO Ally since Mar 2004 — informational',
  topMajorCities: ['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Ruse'],
  population: 6800000,
  mainLanguages: ['Bulgarian', 'Turkish (minority)', 'Romani'],
  currency: 'Bulgarian lev (BGN); euro adoption roadmap — verify',
  timezone: 'Europe/Sofia',
  foundingLeader: 'Alexander Battenberg-era reference — informational',
  currentLeader: 'President / Prime Minister — verify',
  cryptocurrencyExchanges: ['EU CASP passporting; localized brokers'],
  stablecoin: 'BGN peg mechanism toward euro preparedness — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['BG'],
  stockExchange: 'Bulgarian Stock Exchange',
}
