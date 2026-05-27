import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CENSAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CENSAD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CENSAD_RARE_EARTHS } from './rareEarthsByIso'
import { CENSAD_BOND_MARKETS } from './bondMarketsByIso'
import { CENSAD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const libya: CensadCountry = {
  name: 'Libya',
  iso3166Alpha2: 'LY',
  capital: 'Tripoli',
  coordinates: { latitude: 32.8872, longitude: 13.1913 },
  independence: '1951-12-24 (United Kingdom of Libya)',
  topMajorCities: ['Tripoli', 'Benghazi', 'Misrata', 'Al Bayda', 'Sabha'],
  population: 6940000,
  mainLanguages: ['Arabic', 'Berber languages (Tamazight)', 'Italian (small community)'],
  currency: 'Libyan dinar (LYD)',
  timezone: 'Africa/Tripoli',
  foundingLeader: 'King Idris I (monarchy era)',
  currentLeader: 'Government of National Unity / divided authorities — verify seat',
  cryptocurrencyExchanges: ['Informal OTC under sanctions context'],
  stablecoin: 'Informal USD/USDT',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['LY'],
  newsOutlets: CENSAD_NEWS_OUTLETS['LY'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['LY'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['LY'],
  mainExportedElements: CENSAD_MAIN_EXPORTED_ELEMENTS['LY'],
  rareEarths: CENSAD_RARE_EARTHS['LY'],
  stockExchange: 'Libyan Stock Exchange (limited operations — verify)',
  bondMarkets: CENSAD_BOND_MARKETS['LY'],
  mainInternationalAirport: CENSAD_MAIN_INTERNATIONAL_AIRPORTS['LY'],
}
