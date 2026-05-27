import type { EccasCountry } from './types'
import { ECCAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECCAS_NEWS_OUTLETS } from './newsOutletsByIso'
import { ECCAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ECCAS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ECCAS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ECCAS_RARE_EARTHS } from './rareEarthsByIso'
import { ECCAS_BOND_MARKETS } from './bondMarketsByIso'
import { ECCAS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const angola: EccasCountry = {
  name: 'Angola',
  iso3166Alpha2: 'AO',
  capital: 'Luanda',
  coordinates: { latitude: -8.8383, longitude: 13.2344 },
  independence: '1975-11-11 (from Portugal)',
  topMajorCities: ['Luanda', 'Huambo', 'Lobito', 'Benguela', 'Lubango'],
  population: 37000000,
  mainLanguages: ['Portuguese', 'Umbundu', 'Kikongo'],
  currency: 'Angolan kwanza (AOA)',
  timezone: 'Africa/Luanda',
  foundingLeader: 'Agostinho Neto (first President)',
  currentLeader: 'President João Lourenço — verify',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Local OTC'],
  stablecoin: 'USDT / USDC via P2P; no dominant AOA stablecoin',
  domesticCourierServices: ECCAS_DOMESTIC_COURIERS['AO'],
  newsOutlets: ECCAS_NEWS_OUTLETS['AO'],
  notableUniversities: ECCAS_NOTABLE_UNIVERSITIES['AO'],
  mainExportCommodities: ECCAS_MAIN_EXPORT_COMMODITIES['AO'],
  mainExportedElements: ECCAS_MAIN_EXPORTED_ELEMENTS['AO'],
  rareEarths: ECCAS_RARE_EARTHS['AO'],
  stockExchange: 'Bodiva (Angola Securities Exchange)',
  bondMarkets: ECCAS_BOND_MARKETS['AO'],
  mainInternationalAirport: ECCAS_MAIN_INTERNATIONAL_AIRPORTS['AO'],
}
