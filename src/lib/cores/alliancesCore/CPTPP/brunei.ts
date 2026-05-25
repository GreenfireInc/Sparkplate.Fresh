import type { CptppCountry } from './types'
import { CPTPP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CPTPP_NEWS_OUTLETS } from './newsOutletsByIso'
import { CPTPP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CPTPP_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CPTPP_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CPTPP_RARE_EARTHS } from './rareEarthsByIso'
import { CPTPP_BOND_MARKETS } from './bondMarketsByIso'

export const brunei: CptppCountry = {
  name: 'Brunei',
  iso3166Alpha2: 'BN',
  capital: 'Bandar Seri Begawan',
  coordinates: { latitude: 4.9031, longitude: 114.9398 },
  independence: '1984-01-01 (from United Kingdom)',
  topMajorCities: ['Bandar Seri Begawan', 'Kuala Belait', 'Seria', 'Tutong', 'Bangar'],
  population: 460000,
  mainLanguages: ['Malay', 'English', 'Chinese (Mandarin & dialects)'],
  currency: 'Brunei dollar (BND); Singapore dollar (SGD) pegged interchange',
  timezone: 'Asia/Brunei',
  foundingLeader: 'Hassanal Bolkiah (Sultan; independence era)',
  currentLeader: 'Sultan Hassanal Bolkiah — verify',
  cryptocurrencyExchanges: ['Limited domestic venues; regional Singapore rails'],
  stablecoin: 'BND / SGD peg context; USDT informal access',
  domesticCourierServices: CPTPP_DOMESTIC_COURIERS['BN'],
  newsOutlets: CPTPP_NEWS_OUTLETS['BN'],
  notableUniversities: CPTPP_NOTABLE_UNIVERSITIES['BN'],
  mainExportCommodities: CPTPP_MAIN_EXPORT_COMMODITIES['BN'],
  mainExportedElements: CPTPP_MAIN_EXPORTED_ELEMENTS['BN'],
  rareEarths: CPTPP_RARE_EARTHS['BN'],
  stockExchange: 'Brunei Darussalam Central Moneymarket (money market; thin equity market — verify)',
  bondMarkets: CPTPP_BOND_MARKETS['BN'],
}
