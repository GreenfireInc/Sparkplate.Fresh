import type { EccasCountry } from './types'
import { ECCAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECCAS_NEWS_OUTLETS } from './newsOutletsByIso'
import { ECCAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ECCAS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ECCAS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ECCAS_RARE_EARTHS } from './rareEarthsByIso'
import { ECCAS_BOND_MARKETS } from './bondMarketsByIso'
import { ECCAS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const gabon: EccasCountry = {
  name: 'Gabon',
  iso3166Alpha2: 'GA',
  capital: 'Libreville',
  coordinates: { latitude: 0.4162, longitude: 9.4673 },
  independence: '1960-08-17',
  topMajorCities: ['Libreville', 'Port-Gentil', 'Franceville', 'Oyem', 'Moanda'],
  population: 2500000,
  mainLanguages: ['French', 'Fang', 'Myene'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Libreville',
  foundingLeader: "Léon M'ba (first Prime Minister / President)",
  currentLeader:
    'Transitional presidency Brice Clotaire Oligui Nguema — verify (constitutional order)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'CFA-region OTC'],
  stablecoin: 'USDT P2P; XAF peg via BEAC',
  domesticCourierServices: ECCAS_DOMESTIC_COURIERS['GA'],
  newsOutlets: ECCAS_NEWS_OUTLETS['GA'],
  notableUniversities: ECCAS_NOTABLE_UNIVERSITIES['GA'],
  mainExportCommodities: ECCAS_MAIN_EXPORT_COMMODITIES['GA'],
  mainExportedElements: ECCAS_MAIN_EXPORTED_ELEMENTS['GA'],
  rareEarths: ECCAS_RARE_EARTHS['GA'],
  stockExchange: 'Regional CEMAC markets; Libreville financial hub — verify listings',
  bondMarkets: ECCAS_BOND_MARKETS['GA'],
  mainInternationalAirport: ECCAS_MAIN_INTERNATIONAL_AIRPORTS['GA'],
}
