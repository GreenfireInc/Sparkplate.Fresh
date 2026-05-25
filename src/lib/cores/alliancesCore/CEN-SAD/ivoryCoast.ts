import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CENSAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CENSAD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CENSAD_RARE_EARTHS } from './rareEarthsByIso'
import { CENSAD_BOND_MARKETS } from './bondMarketsByIso'

export const ivoryCoast: CensadCountry = {
  name: "Côte d'Ivoire",
  iso3166Alpha2: 'CI',
  capital: 'Yamoussoukro',
  coordinates: { latitude: 6.8276, longitude: -5.2893 },
  independence: '1960-08-07',
  topMajorCities: ['Abidjan', 'Yamoussoukro', 'Bouaké', 'Daloa', 'San-Pédro'],
  population: 28300000,
  mainLanguages: ['French', 'Baoulé', 'Dioula'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Abidjan',
  foundingLeader: 'Félix Houphouët-Boigny (first President)',
  currentLeader: 'President Alassane Ouattara — verify',
  cryptocurrencyExchanges: ['Regional licensed platforms evolution', 'Binance P2P'],
  stablecoin: 'USDT informal alongside CFA',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['CI'],
  newsOutlets: CENSAD_NEWS_OUTLETS['CI'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['CI'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['CI'],
  mainExportedElements: CENSAD_MAIN_EXPORTED_ELEMENTS['CI'],
  rareEarths: CENSAD_RARE_EARTHS['CI'],
  stockExchange: 'Bourse Régionale des Valeurs Mobilières (BRVM) — seat Abidjan',
  bondMarkets: CENSAD_BOND_MARKETS['CI'],
}
