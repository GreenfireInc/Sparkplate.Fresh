import type { CaricomCountry } from './types'
import { CARICOM_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CARICOM_NEWS_OUTLETS } from './newsOutletsByIso'
import { CARICOM_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CARICOM_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CARICOM_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CARICOM_RARE_EARTHS } from './rareEarthsByIso'
import { CARICOM_BOND_MARKETS } from './bondMarketsByIso'
import { CARICOM_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const jamaica: CaricomCountry = {
  name: 'Jamaica',
  iso3166Alpha2: 'JM',
  caricomStatus: 'full_member',
  capital: 'Kingston',
  coordinates: { latitude: 17.9712, longitude: -76.7928 },
  independence: '1962-08-06',
  topMajorCities: ['Kingston', 'Montego Bay', 'Spanish Town', 'Portmore', 'Mandeville'],
  population: 2800000,
  mainLanguages: ['English', 'Jamaican Patois', 'Jamaican Sign Language'],
  currency: 'Jamaican dollar (JMD)',
  timezone: 'America/Jamaica',
  foundingLeader: 'Alexander Bustamante (first Prime Minister)',
  currentLeader: 'Andrew Holness (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional OTC'],
  stablecoin: 'USDT informal',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['JM'],
  newsOutlets: CARICOM_NEWS_OUTLETS['JM'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['JM'],
  mainExportCommodities: CARICOM_MAIN_EXPORT_COMMODITIES['JM'],
  mainExportedElements: CARICOM_MAIN_EXPORTED_ELEMENTS['JM'],
  rareEarths: CARICOM_RARE_EARTHS['JM'],
  stockExchange: 'Jamaica Stock Exchange',
  bondMarkets: CARICOM_BOND_MARKETS['JM'],
  mainInternationalAirport: CARICOM_MAIN_INTERNATIONAL_AIRPORTS['JM'],
}
