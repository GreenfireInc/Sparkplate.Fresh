import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const solomonIslands: CommonwealthCountry = {
  name: 'Solomon Islands',
  iso3166Alpha2: 'SB',
  commonwealthStatus: 'member',
  capital: 'Honiara',
  coordinates: { latitude: -9.4281, longitude: 159.9726 },
  independence: '1978-07-07',
  topMajorCities: ['Honiara', 'Gizo', 'Auki', 'Kirakira', 'Buala'],
  population: 720000,
  mainLanguages: ['English', 'Solomon Islands Pijin', 'Malaitan languages'],
  currency: 'Solomon Islands dollar (SBD)',
  timezone: 'Pacific/Guadalcanal',
  foundingLeader: 'Peter Kenilorea (first Prime Minister)',
  currentLeader: 'Jeremiah Manele (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['SB'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['SB'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['SB'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['SB'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['SB'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['SB'],
  stockExchange: 'No major national exchange — informational',
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['SB'],
}
