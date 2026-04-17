import type { BeltAndRoadInitiativeCountry } from './types'

export const chad: BeltAndRoadInitiativeCountry = {
  name: 'Chad',
  iso3166Alpha2: 'TD',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'N\'Djamena',
  coordinates: { latitude: 12.1348, longitude: 15.0557 },
  independence: '1960-08-11',
  topMajorCities: ["N'Djamena", 'Moundou', 'Sarh', 'Abéché', 'Kélo'] as [string, string, string, string, string],
  population: 19340757,
  mainLanguages: [ 'Arabic', 'French', 'Regional languages' ],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'UTC+01:00',
  foundingLeader: 'François Tombalbaye',
  currentLeader: 'Mahamat Idriss Déby Itno (Transitional President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card (regional)', 'OTC'],
  stablecoin: 'USDT informal; XAF peg',
  stockExchange: 'Financial Market of Central Africa (CEMAC hub; thin Chad listings)',
}
