import type { G7Country } from './types'
import { G7_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const canada: G7Country = {
  name: 'Canada',
  iso3166Alpha2: 'CA',
  capital: 'Ottawa',
  coordinates: { latitude: 45.4215, longitude: -75.6972 },
  independence:
    '1867 Dominion of Canada constitution; patriation of constitution 1982; G7 founding summit participant (post-1976 pattern — informational)',
  topMajorCities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton'],
  population: 40100000,
  mainLanguages: ['English', 'French', 'Mandarin (community)'],
  currency: 'Canadian dollar (CAD)',
  timezone: 'America/Toronto',
  foundingLeader: 'Sir John A. Macdonald (Confederation-era reference); post-war Pearson/Trudeau multilateral stature — informational',
  currentLeader: 'Prime Minister — verify (federal electoral cycle)',
  cryptocurrencyExchanges: ['Bitbuy', 'Newton', 'CSA/PRU provincial licensing environment — informational'],
  stablecoin: 'CAD fiat-backed tokens (regulated money services / evolving OSFI guidance — informational)',
  domesticCourierServices: G7_DOMESTIC_COURIERS['CA'],
  stockExchange: 'Toronto Stock Exchange (TMX)',
}
