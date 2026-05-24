import type { FiveEyesCountry } from './types'
import { FIVE_EYES_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { FIVE_EYES_NEWS_OUTLETS } from './newsOutletsByIso'
import { FIVE_EYES_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { FIVE_EYES_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const canada: FiveEyesCountry = {
  name: 'Canada',
  iso3166Alpha2: 'CA',
  capital: 'Ottawa',
  coordinates: { latitude: 45.4215, longitude: -75.6972 },
  independence:
    '1867 Dominion of Canada constitution; Westminster Statute-era autonomy; patriation of constitution 1982; UKUSA extension — informational',
  topMajorCities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton'],
  population: 40100000,
  mainLanguages: ['English', 'French', 'Mandarin (community)'],
  currency: 'Canadian dollar (CAD)',
  timezone: 'America/Toronto',
  foundingLeader: 'Post-war Canadian integration under King/St-Laurent administrations (UKUSA context — informational)',
  currentLeader: 'Prime Minister — verify (federal electoral cycle)',
  cryptocurrencyExchanges: ['Bitbuy', 'Newton', 'CSA/PRU provincial licensing environment — informational'],
  stablecoin: 'CAD fiat-backed tokens (regulated money services / evolving OSFI/OSCB guidance — informational)',
  domesticCourierServices: FIVE_EYES_DOMESTIC_COURIERS['CA'],
  newsOutlets: FIVE_EYES_NEWS_OUTLETS['CA'],
  notableUniversities: FIVE_EYES_NOTABLE_UNIVERSITIES['CA'],
  mainExportCommodities: FIVE_EYES_MAIN_EXPORT_COMMODITIES['CA'],
  stockExchange: 'Toronto Stock Exchange (TMX)',
}
