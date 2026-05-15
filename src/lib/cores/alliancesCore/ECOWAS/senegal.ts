import type { EcowasCountry } from './types'
import { ECOWAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const senegal: EcowasCountry = {
  name: 'Senegal',
  iso3166Alpha2: 'SN',
  capital: 'Dakar',
  coordinates: { latitude: 14.7167, longitude: -17.4677 },
  independence: '1960-04-04',
  topMajorCities: ['Dakar', 'Touba', 'Thiès', 'Rufisque', 'Kaolack'],
  population: 18000000,
  mainLanguages: ['French', 'Wolof', 'Pulaar'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Dakar',
  foundingLeader: 'Léopold Sédar Senghor (first President cohort)',
  currentLeader: 'President Bassirou Diomaye Faye — verify',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Wave-linked fintech'],
  stablecoin: 'USDT / USDC; XOF CFA peg via BCEAO',
  domesticCourierServices: ECOWAS_DOMESTIC_COURIERS['SN'],
  stockExchange: 'BRVM (Dakar listings)',
}
