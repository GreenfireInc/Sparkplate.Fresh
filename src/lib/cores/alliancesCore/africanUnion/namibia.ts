import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
export const namibia: AfricanUnionCountry = {
  name: 'Namibia',
  iso3166Alpha2: 'NA',
  africanUnionStatus: 'member',
  capital: 'Windhoek',
  coordinates: { latitude: -22.5597, longitude: 17.0832 },
  independence: '1990-03-21',
  topMajorCities: ['Windhoek', 'Walvis Bay', 'Swakopmund', 'Rundu', 'Oshakati'],
  population: 2700000,
  mainLanguages: ['English', 'Oshiwambo', 'Afrikaans'],
  currency: 'Namibian dollar (NAD); South African rand (ZAR) pegged 1:1',
  timezone: 'Africa/Windhoek',
  foundingLeader: 'Sam Nujoma',
  currentLeader: 'Netumbo Nandi-Ndaitwah (President)',
  cryptocurrencyExchanges: ['Luno', 'VALR', 'Binance (P2P)'],
  stablecoin: 'USDT via South African-linked banking',
  domesticCourierServices: AU_DOMESTIC_COURIERS['NA'],
  newsOutlets: AU_NEWS_OUTLETS['NA'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['NA'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['NA'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['NA'],
  rareEarths: AU_RARE_EARTHS['NA'],
  stockExchange: 'Namibia Stock Exchange (NSX)',
  bondMarkets: AU_BOND_MARKETS['NA'],
}
