import type { BeltAndRoadInitiativeCountry } from './types'

export const iraq: BeltAndRoadInitiativeCountry = {
  name: 'Iraq',
  iso3166Alpha2: 'IQ',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Baghdad',
  coordinates: { latitude: 33.3152, longitude: 44.3661 },
  independence: '1932-10-03 (Kingdom); 2005 constitution (federal republic)',
  topMajorCities: ['Baghdad', 'Basra', 'Mosul', 'Erbil', 'Najaf'] as [string, string, string, string, string],
  population: 46118793,
  mainLanguages: [ 'Arabic', 'Aramaic', 'Sorani' ],
  currency: 'Iraqi dinar (IQD)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Faisal I (King)',
  currentLeader: 'Abdul Latif Rashid (President); Mohammed Shia\\',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional OTC', 'Limited licensed venues'],
  stablecoin: 'USDT informal; banking sector rebuilding',
  stockExchange: 'Iraq Stock Exchange',
}
