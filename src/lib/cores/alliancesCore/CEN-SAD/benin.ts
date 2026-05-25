import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CENSAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CENSAD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CENSAD_RARE_EARTHS } from './rareEarthsByIso'
import { CENSAD_BOND_MARKETS } from './bondMarketsByIso'

export const benin: CensadCountry = {
  name: 'Benin',
  iso3166Alpha2: 'BJ',
  capital: 'Porto-Novo',
  coordinates: { latitude: 6.4969, longitude: 2.6036 },
  independence: '1960-08-01 (Republic of Dahomey; present name from 1975)',
  topMajorCities: ['Cotonou', 'Porto-Novo', 'Parakou', 'Djougou', 'Bohicon'],
  population: 13600000,
  mainLanguages: ['French', 'Fon', 'Yoruba'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Porto-Novo',
  foundingLeader: 'Hubert Maga (first Prime Minister post-independence)',
  currentLeader: 'President Patrice Talon — verify',
  cryptocurrencyExchanges: ['Binance (P2P informal)', 'Local OTC'],
  stablecoin: 'USDT/USDC informal; CFA pegged to EUR',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['BJ'],
  newsOutlets: CENSAD_NEWS_OUTLETS['BJ'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['BJ'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['BJ'],
  mainExportedElements: CENSAD_MAIN_EXPORTED_ELEMENTS['BJ'],
  rareEarths: CENSAD_RARE_EARTHS['BJ'],
  stockExchange: 'Regional Bourse Régionale des Valeurs Mobilières (BRVM Abidjan, WAEMU listing)',
  bondMarkets: CENSAD_BOND_MARKETS['BJ'],
}
