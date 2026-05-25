import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'

export const saintVincentAndTheGrenadines: CommonwealthCountry = {
  name: 'Saint Vincent and the Grenadines',
  iso3166Alpha2: 'VC',
  commonwealthStatus: 'member',
  capital: 'Kingstown',
  coordinates: { latitude: 13.1587, longitude: -61.2248 },
  independence: '1979-10-27',
  topMajorCities: ['Kingstown', 'Georgetown', 'Barrouallie', 'Port Elizabeth', 'Layou'],
  population: 110000,
  mainLanguages: ['English', 'Vincentian Creole', 'French patois (historical)'],
  currency: 'East Caribbean dollar (XCD)',
  timezone: 'America/St_Vincent',
  foundingLeader: 'Milton Cato (first Prime Minister)',
  currentLeader: 'Ralph Gonsalves (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'XCD peg; USDT/USDC',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['VC'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['VC'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['VC'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['VC'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['VC'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['VC'],
  stockExchange: 'Eastern Caribbean Securities Exchange (regional)',
}
