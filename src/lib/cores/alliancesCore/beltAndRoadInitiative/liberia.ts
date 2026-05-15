import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const liberia: BeltAndRoadInitiativeCountry = {
  name: 'Liberia',
  iso3166Alpha2: 'LR',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Monrovia',
  coordinates: { latitude: 6.3156, longitude: -10.8074 },
  independence: '1847-07-26',
  topMajorCities: ['Monrovia', 'Gbarnga', 'Buchanan', 'Kakata', 'Voinjama'] as [string, string, string, string, string],
  population: 5248621,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'Liberian dollar (LRD)',
  timezone: 'UTC',
  foundingLeader: 'Joseph Jenkins Roberts',
  currentLeader: 'Joseph Boakai (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Afriex'],
  stablecoin: 'USDT / USDC; USD cash economy dominant',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['LR'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['LR'],
  stockExchange: 'Liberia Stock Exchange (very limited)',
}
