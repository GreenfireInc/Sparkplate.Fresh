import type { BeltAndRoadInitiativeCountry } from './types'

export const burundi: BeltAndRoadInitiativeCountry = {
  name: 'Burundi',
  iso3166Alpha2: 'BI',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Gitega',
  coordinates: { latitude: -3.4264, longitude: 29.9306 },
  independence: '1962-07-01',
  topMajorCities: ['Bujumbura', 'Gitega', 'Ngozi', 'Ruyigi', 'Muyinga'] as [string, string, string, string, string],
  population: 12332788,
  mainLanguages: [ 'French', 'Kirundi', 'Regional languages' ],
  currency: 'Burundian franc (BIF)',
  timezone: 'UTC+02:00',
  foundingLeader: 'Mwambutsa IV (King at independence)',
  currentLeader: 'Évariste Ndayishimiye (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Local P2P', 'Yellow Card (regional)'],
  stablecoin: 'USDT informal; no BIF stablecoin',
  stockExchange: 'Burundi Stock Exchange (BSE) — thin liquidity',
}
