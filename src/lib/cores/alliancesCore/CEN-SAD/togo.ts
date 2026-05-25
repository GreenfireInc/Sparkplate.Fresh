import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CENSAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CENSAD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CENSAD_RARE_EARTHS } from './rareEarthsByIso'
import { CENSAD_BOND_MARKETS } from './bondMarketsByIso'

export const togo: CensadCountry = {
  name: 'Togo',
  iso3166Alpha2: 'TG',
  capital: 'Lomé',
  coordinates: { latitude: 6.1725, longitude: 1.2314 },
  independence: '1960-04-27 (French Togoland)',
  topMajorCities: ['Lomé', 'Sokodé', 'Kara', 'Atakpamé', 'Palimé'],
  population: 9000000,
  mainLanguages: ['French', 'Ewe', 'Kabye'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Lome',
  foundingLeader: 'Sylvanus Olympio (first Prime Minister)',
  currentLeader: 'President Faure Gnassingbé — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Informal crypto markets'],
  stablecoin: 'USDT informal; CFA peg',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['TG'],
  newsOutlets: CENSAD_NEWS_OUTLETS['TG'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['TG'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['TG'],
  mainExportedElements: CENSAD_MAIN_EXPORTED_ELEMENTS['TG'],
  rareEarths: CENSAD_RARE_EARTHS['TG'],
  stockExchange: 'BRVM (WAEMU securities context)',
  bondMarkets: CENSAD_BOND_MARKETS['TG'],
}
