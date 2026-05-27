import type { SadcCountry } from './types'
import { SADC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { SADC_NEWS_OUTLETS } from './newsOutletsByIso'
import { SADC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { SADC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { SADC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { SADC_RARE_EARTHS } from './rareEarthsByIso'
import { SADC_BOND_MARKETS } from './bondMarketsByIso'
import { SADC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const lesotho: SadcCountry = {
  name: 'Lesotho',
  iso3166Alpha2: 'LS',
  capital: 'Maseru',
  coordinates: { latitude: -29.3151, longitude: 27.4869 },
  independence: '1966-10-04',
  topMajorCities: ['Maseru', 'Teyateyaneng', 'Mafeteng', 'Mohaleʼs Hoek', 'Maputsoe'],
  population: 2300000,
  mainLanguages: ['Sesotho', 'English', 'Zulu influences'],
  currency: 'Lesotho loti (LSL); South African rand (ZAR) widely used',
  timezone: 'Africa/Maseru',
  foundingLeader: 'Leabua Jonathan (Prime Minister founding era)',
  currentLeader: 'King Letsie III; Prime Minister Sam Matekane — verify',
  cryptocurrencyExchanges: ['Regional OTC informal'],
  stablecoin: 'Rand-pegged framework; informal USDT',
  domesticCourierServices: SADC_DOMESTIC_COURIERS['LS'],
  newsOutlets: SADC_NEWS_OUTLETS['LS'],
  notableUniversities: SADC_NOTABLE_UNIVERSITIES['LS'],
  mainExportCommodities: SADC_MAIN_EXPORT_COMMODITIES['LS'],
  mainExportedElements: SADC_MAIN_EXPORTED_ELEMENTS['LS'],
  rareEarths: SADC_RARE_EARTHS['LS'],
  stockExchange: 'Maseru Securities Market — verify',
  bondMarkets: SADC_BOND_MARKETS['LS'],
  mainInternationalAirport: SADC_MAIN_INTERNATIONAL_AIRPORTS['LS'],
}
