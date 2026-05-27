import type { CaricomCountry } from './types'
import { CARICOM_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CARICOM_NEWS_OUTLETS } from './newsOutletsByIso'
import { CARICOM_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CARICOM_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CARICOM_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CARICOM_RARE_EARTHS } from './rareEarthsByIso'
import { CARICOM_BOND_MARKETS } from './bondMarketsByIso'
import { CARICOM_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const saintLucia: CaricomCountry = {
  name: 'Saint Lucia',
  iso3166Alpha2: 'LC',
  caricomStatus: 'full_member',
  capital: 'Castries',
  coordinates: { latitude: 14.0101, longitude: -60.9877 },
  independence: '1979-02-22',
  topMajorCities: ['Castries', 'Vieux Fort', 'Micoud', 'Soufrière', 'Dennery'],
  population: 180000,
  mainLanguages: ['English', 'Saint Lucian Creole French', 'French'],
  currency: 'East Caribbean dollar (XCD)',
  timezone: 'America/St_Lucia',
  foundingLeader: 'John Compton (first Prime Minister)',
  currentLeader: 'Philip J. Pierre (Prime Minister)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'XCD peg; USDT/USDC',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['LC'],
  newsOutlets: CARICOM_NEWS_OUTLETS['LC'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['LC'],
  mainExportCommodities: CARICOM_MAIN_EXPORT_COMMODITIES['LC'],
  mainExportedElements: CARICOM_MAIN_EXPORTED_ELEMENTS['LC'],
  rareEarths: CARICOM_RARE_EARTHS['LC'],
  stockExchange: 'Eastern Caribbean Securities Exchange (ECSE)',
  bondMarkets: CARICOM_BOND_MARKETS['LC'],
  mainInternationalAirport: CARICOM_MAIN_INTERNATIONAL_AIRPORTS['LC'],
}
