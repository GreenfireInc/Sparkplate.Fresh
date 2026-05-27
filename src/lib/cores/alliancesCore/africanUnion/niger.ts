import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
import { AU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const niger: AfricanUnionCountry = {
  name: 'Niger',
  iso3166Alpha2: 'NE',
  africanUnionStatus: 'suspended',
  capital: 'Niamey',
  coordinates: { latitude: 13.5127, longitude: 2.1254 },
  independence: '1960-08-03',
  topMajorCities: ['Niamey', 'Zinder', 'Maradi', 'Agadez', 'Tahoua'],
  population: 27000000,
  mainLanguages: ['French', 'Hausa', 'Zarma'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Niamey',
  foundingLeader: 'Hamani Diori',
  currentLeader: 'Abdourahamane Tchiani (General; National Council for the Safeguard of the Homeland)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'OTC'],
  stablecoin: 'USDT P2P; XOF peg',
  domesticCourierServices: AU_DOMESTIC_COURIERS['NE'],
  newsOutlets: AU_NEWS_OUTLETS['NE'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['NE'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['NE'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['NE'],
  rareEarths: AU_RARE_EARTHS['NE'],
  stockExchange: 'No liquid national bourse; BRVM regional',
  bondMarkets: AU_BOND_MARKETS['NE'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['NE'],
}
