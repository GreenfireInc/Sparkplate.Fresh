import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { APEC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { APEC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { APEC_RARE_EARTHS } from './rareEarthsByIso'
import { APEC_BOND_MARKETS } from './bondMarketsByIso'

export const canada: ApecCountry = {
  name: 'Canada',
  iso3166Alpha2: 'CA',
  capital: 'Ottawa',
  coordinates: { latitude: 45.4215, longitude: -75.6972 },
  independence:
    '1867 federation lineage; CPTPP / Indo-Pacific tilt; transpacific trade APEC stalwart — informational',
  topMajorCities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton'],
  population: 40100000,
  mainLanguages: ['English', 'French', 'Mandarin (community)'],
  currency: 'Canadian dollar (CAD)',
  timezone: 'America/Toronto',
  foundingLeader: 'Brian Mulroney Uruguay Round regional trade reference — informational',
  currentLeader: 'Prime Minister — verify federal cycle',
  cryptocurrencyExchanges: ['Bitbuy', 'Newton CSA climate — informational'],
  stablecoin: 'CAD fiat-backed pilots — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['CA'],
  newsOutlets: APEC_NEWS_OUTLETS['CA'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['CA'],
  mainExportCommodities: APEC_MAIN_EXPORT_COMMODITIES['CA'],
  mainExportedElements: APEC_MAIN_EXPORTED_ELEMENTS['CA'],
  rareEarths: APEC_RARE_EARTHS['CA'],
  stockExchange: 'Toronto Stock Exchange (TMX)',
  bondMarkets: APEC_BOND_MARKETS['CA'],
}
