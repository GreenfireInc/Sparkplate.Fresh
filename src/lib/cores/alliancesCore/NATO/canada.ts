import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const canada: NatoCountry = {
  name: 'Canada',
  iso3166Alpha2: 'CA',
  capital: 'Ottawa',
  coordinates: { latitude: 45.4215, longitude: -75.6972 },
  independence:
    '1867 Dominion federation; patriation 1982; NATO founding Ally Washington Treaty 1949-04-04 — informational',
  topMajorCities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton'],
  population: 40100000,
  mainLanguages: ['English', 'French', 'Mandarin (community)'],
  currency: 'Canadian dollar (CAD)',
  timezone: 'America/Toronto',
  foundingLeader: 'Louis St-Laurent / Pearson NATO institutional reference — informational',
  currentLeader: 'Prime Minister — verify (federal electoral cycle)',
  cryptocurrencyExchanges: ['Bitbuy', 'Newton', 'CSA provincial licensing — informational'],
  stablecoin: 'CAD fiat-backed tokens; OSFI guidance evolution — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['CA'],
  stockExchange: 'Toronto Stock Exchange (TMX)',
}
