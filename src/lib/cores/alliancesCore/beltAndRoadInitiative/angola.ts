import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const angola: BeltAndRoadInitiativeCountry = {
  name: 'Angola',
  iso3166Alpha2: 'AO',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Luanda',
  coordinates: { latitude: -8.8383, longitude: 13.2344 },
  independence: '1975-11-11',
  topMajorCities: ['Luanda', 'Huambo', 'Lobito', 'Benguela', 'Lubango'] as [string, string, string, string, string],
  population: 36170961,
  mainLanguages: [ 'Portuguese', 'English', 'Regional languages' ],
  currency: 'Angolan kwanza (AOA)',
  timezone: 'UTC+01:00',
  foundingLeader: 'Agostinho Neto',
  currentLeader: 'João Lourenço (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Local OTC'],
  stablecoin: 'USDT / USDC via P2P; no AOA stablecoin',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['AO'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['AO'],
  stockExchange: 'Bodiva (Angola Securities Exchange)',
}
