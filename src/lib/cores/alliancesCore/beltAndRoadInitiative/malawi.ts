import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const malawi: BeltAndRoadInitiativeCountry = {
  name: 'Malawi',
  iso3166Alpha2: 'MW',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Lilongwe',
  coordinates: { latitude: -13.9626, longitude: 33.7741 },
  independence: '1964-07-06',
  topMajorCities: ['Lilongwe', 'Blantyre', 'Mzuzu', 'Zomba', 'Kasungu'] as [string, string, string, string, string],
  population: 20734262,
  mainLanguages: [ 'English', 'Chewa', 'Regional languages' ],
  currency: 'Malawian kwacha (MWK)',
  timezone: 'UTC+02:00',
  foundingLeader: 'Hastings Banda',
  currentLeader: 'Lazarus Chakwera (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local OTC'],
  stablecoin: 'USDT / USDC informal',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['MW'],
  stockExchange: 'Malawi Stock Exchange',
}
