import type { EcowasCountry } from './types'
import { ECOWAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECOWAS_NEWS_OUTLETS } from './newsOutletsByIso'
import { ECOWAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ECOWAS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ECOWAS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ECOWAS_RARE_EARTHS } from './rareEarthsByIso'
import { ECOWAS_BOND_MARKETS } from './bondMarketsByIso'
import { ECOWAS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const gambia: EcowasCountry = {
  name: 'The Gambia',
  iso3166Alpha2: 'GM',
  capital: 'Banjul',
  coordinates: { latitude: 13.4549, longitude: -16.5791 },
  independence: '1965-02-18',
  topMajorCities: ['Serekunda', 'Brikama', 'Bakau', 'Banjul', 'Farafenni'],
  population: 2700000,
  mainLanguages: ['English', 'Mandinka', 'Wolof'],
  currency: 'Gambian dalasi (GMD)',
  timezone: 'Africa/Banjul',
  foundingLeader: 'Dawda Jawara (first Prime Minister)',
  currentLeader: 'President Adama Barrow — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Afriex (diaspora)'],
  stablecoin: 'USDT / USDC P2P',
  domesticCourierServices: ECOWAS_DOMESTIC_COURIERS['GM'],
  newsOutlets: ECOWAS_NEWS_OUTLETS['GM'],
  notableUniversities: ECOWAS_NOTABLE_UNIVERSITIES['GM'],
  mainExportCommodities: ECOWAS_MAIN_EXPORT_COMMODITIES['GM'],
  mainExportedElements: ECOWAS_MAIN_EXPORTED_ELEMENTS['GM'],
  rareEarths: ECOWAS_RARE_EARTHS['GM'],
  stockExchange: 'Gambia Stock Exchange (limited)',
  bondMarkets: ECOWAS_BOND_MARKETS['GM'],
  mainInternationalAirport: ECOWAS_MAIN_INTERNATIONAL_AIRPORTS['GM'],
}
