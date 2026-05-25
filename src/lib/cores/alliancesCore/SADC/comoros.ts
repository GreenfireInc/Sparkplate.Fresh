import type { SadcCountry } from './types'
import { SADC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { SADC_NEWS_OUTLETS } from './newsOutletsByIso'
import { SADC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { SADC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { SADC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { SADC_RARE_EARTHS } from './rareEarthsByIso'
import { SADC_BOND_MARKETS } from './bondMarketsByIso'

export const comoros: SadcCountry = {
  name: 'Comoros',
  iso3166Alpha2: 'KM',
  capital: 'Moroni',
  coordinates: { latitude: -11.6945, longitude: 43.2551 },
  independence: '1975-07-06 (from France)',
  topMajorCities: ['Moroni', 'Mutsamudu', 'Fomboni', 'Domoni', 'Ouani'],
  population: 867000,
  mainLanguages: ['Comorian (Shikomori)', 'Arabic', 'French'],
  currency: 'Comorian franc (KMF)',
  timezone: 'Indian/Comoro',
  foundingLeader: 'Ahmed Abdallah (first President post-independence)',
  currentLeader: 'President Azali Assoumani — verify',
  cryptocurrencyExchanges: ['Informal P2P'],
  stablecoin: 'Euro peg via KMF framework',
  domesticCourierServices: SADC_DOMESTIC_COURIERS['KM'],
  newsOutlets: SADC_NEWS_OUTLETS['KM'],
  notableUniversities: SADC_NOTABLE_UNIVERSITIES['KM'],
  mainExportCommodities: SADC_MAIN_EXPORT_COMMODITIES['KM'],
  mainExportedElements: SADC_MAIN_EXPORTED_ELEMENTS['KM'],
  rareEarths: SADC_RARE_EARTHS['KM'],
  stockExchange: 'No national stock exchange',
  bondMarkets: SADC_BOND_MARKETS['KM'],
}
