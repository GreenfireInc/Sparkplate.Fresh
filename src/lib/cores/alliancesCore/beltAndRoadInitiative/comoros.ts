import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
export const comoros: BeltAndRoadInitiativeCountry = {
  name: 'Comoros',
  iso3166Alpha2: 'KM',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Moroni',
  coordinates: { latitude: -11.7172, longitude: 43.2473 },
  independence: '1975-07-06',
  topMajorCities: ['Moroni', 'Mutsamudu', 'Fomboni', 'Domoni', 'Tsimbeo'] as [string, string, string, string, string],
  population: 919901,
  mainLanguages: [ 'Arabic', 'French', 'Comorian' ],
  currency: 'Comorian franc (KMF)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Ahmed Abdallah',
  currentLeader: 'Azali Assoumani (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional mobile money bridges'],
  stablecoin: 'USDT / USDC limited; KMF',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['KM'],
  newsOutlets: BRI_NEWS_OUTLETS['KM'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['KM'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['KM'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['KM'],
  rareEarths: BRI_RARE_EARTHS['KM'],
  stockExchange: 'No major national stock exchange',
  bondMarkets: BRI_BOND_MARKETS['KM'],
}
