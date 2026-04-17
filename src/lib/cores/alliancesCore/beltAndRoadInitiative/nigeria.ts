import type { BeltAndRoadInitiativeCountry } from './types'

export const nigeria: BeltAndRoadInitiativeCountry = {
  name: 'Nigeria',
  iso3166Alpha2: 'NG',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Abuja',
  coordinates: { latitude: 9.0765, longitude: 7.3986 },
  independence: '1960-10-01',
  topMajorCities: ['Lagos', 'Kano', 'Ibadan', 'Abuja', 'Port Harcourt'] as [string, string, string, string, string],
  population: 223800000,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'Nigerian naira (NGN)',
  timezone: 'UTC+01:00',
  foundingLeader: 'Abubakar Tafawa Balewa (Prime Minister)',
  currentLeader: 'Bola Tinubu (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Luno', 'Quidax', 'Busha', 'Yellow Card'],
  stablecoin: 'USDT / USDC P2P dominant; cNGN stablecoin pilots',
  stockExchange: 'Nigerian Exchange Group (NGX)',
}
