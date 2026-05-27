import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
import { AU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const ivoryCoast: AfricanUnionCountry = {
  name: "Côte d'Ivoire (Ivory Coast)",
  iso3166Alpha2: 'CI',
  africanUnionStatus: 'member',
  capital: 'Yamoussoukro',
  coordinates: { latitude: 6.8276, longitude: -5.2893 },
  independence: '1960-08-07',
  topMajorCities: ['Abidjan', 'Bouaké', 'Daloa', 'Yamoussoukro', 'San-Pédro'],
  population: 29000000,
  mainLanguages: ['French', 'Baoulé', 'Dioula'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Abidjan',
  foundingLeader: 'Félix Houphouët-Boigny',
  currentLeader: 'Alassane Ouattara (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Luno (regional)'],
  stablecoin: 'USDT / USDC; XOF pegged via CFA',
  domesticCourierServices: AU_DOMESTIC_COURIERS['CI'],
  newsOutlets: AU_NEWS_OUTLETS['CI'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['CI'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['CI'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['CI'],
  rareEarths: AU_RARE_EARTHS['CI'],
  stockExchange: 'BRVM (Abidjan — regional hub)',
  bondMarkets: AU_BOND_MARKETS['CI'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['CI'],
}
