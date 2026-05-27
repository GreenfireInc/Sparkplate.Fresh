import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMESA_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMESA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMESA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMESA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMESA_RARE_EARTHS } from './rareEarthsByIso'
import { COMESA_BOND_MARKETS } from './bondMarketsByIso'
import { COMESA_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const zimbabwe: ComesaCountry = {
  name: 'Zimbabwe',
  iso3166Alpha2: 'ZW',
  capital: 'Harare',
  coordinates: { latitude: -17.8252, longitude: 31.0335 },
  independence: '1980-04-18',
  topMajorCities: ['Harare', 'Bulawayo', 'Chitungwiza', 'Mutare', 'Gweru'],
  population: 16000000,
  mainLanguages: ['English', 'Shona', 'Ndebele'],
  currency: 'ZiG / ZWL / multicurrency context — verify legal tender mix',
  timezone: 'Africa/Harare',
  foundingLeader: 'Robert Mugabe (first Prime Minister / President era)',
  currentLeader: 'President Emmerson Mnangagwa — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Local P2P'],
  stablecoin: 'USDT / USDC; USD parallel economy',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['ZW'],
  newsOutlets: COMESA_NEWS_OUTLETS['ZW'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['ZW'],
  mainExportCommodities: COMESA_MAIN_EXPORT_COMMODITIES['ZW'],
  mainExportedElements: COMESA_MAIN_EXPORTED_ELEMENTS['ZW'],
  rareEarths: COMESA_RARE_EARTHS['ZW'],
  stockExchange: 'Zimbabwe Stock Exchange (ZSE)',
  bondMarkets: COMESA_BOND_MARKETS['ZW'],
  mainInternationalAirport: COMESA_MAIN_INTERNATIONAL_AIRPORTS['ZW'],
}
