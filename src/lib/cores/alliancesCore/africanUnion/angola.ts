import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
export const angola: AfricanUnionCountry = {
  name: 'Angola',
  iso3166Alpha2: 'AO',
  africanUnionStatus: 'member',
  capital: 'Luanda',
  coordinates: { latitude: -8.8383, longitude: 13.2344 },
  independence: '1975-11-11',
  topMajorCities: ['Luanda', 'Huambo', 'Lobito', 'Benguela', 'Lubango'],
  population: 37000000,
  mainLanguages: ['Portuguese', 'Umbundu', 'Kikongo'],
  currency: 'Angolan kwanza (AOA)',
  timezone: 'Africa/Luanda',
  foundingLeader: 'Agostinho Neto',
  currentLeader: 'João Lourenço (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Local OTC'],
  stablecoin: 'USDT / USDC via P2P; no AOA stablecoin',
  domesticCourierServices: AU_DOMESTIC_COURIERS['AO'],
  stockExchange: 'Bodiva (Angola Securities Exchange)',
}
