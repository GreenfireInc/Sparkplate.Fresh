import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const canada: OecdCountry = {
  name: 'Canada',
  iso3166Alpha2: 'CA',
  capital: 'Ottawa',
  coordinates: { latitude: 45.4215, longitude: -75.6972 },
  independence:
    '1867 Dominion federation; constitution patriation 1982; OECD founding member Sep 1961 — informational',
  topMajorCities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton'],
  population: 40100000,
  mainLanguages: ['English', 'French', 'Mandarin (community)'],
  currency: 'Canadian dollar (CAD)',
  timezone: 'America/Toronto',
  foundingLeader: 'John A. Macdonald confederation reference; Pearson multilateral stature — informational',
  currentLeader: 'Prime Minister — verify (federal electoral cycle)',
  cryptocurrencyExchanges: ['Bitbuy', 'Newton', 'CSA provincial licensing environment — informational'],
  stablecoin: 'CAD fiat-backed tokens; OSFI/OSCB guidance evolution — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['CA'],
  newsOutlets: OECD_NEWS_OUTLETS['CA'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['CA'],
  stockExchange: 'Toronto Stock Exchange (TMX)',
}
