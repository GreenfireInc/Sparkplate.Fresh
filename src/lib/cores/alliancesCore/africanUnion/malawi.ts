import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
export const malawi: AfricanUnionCountry = {
  name: 'Malawi',
  iso3166Alpha2: 'MW',
  africanUnionStatus: 'member',
  capital: 'Lilongwe',
  coordinates: { latitude: -13.9626, longitude: 33.7741 },
  independence: '1964-07-06',
  topMajorCities: ['Lilongwe', 'Blantyre', 'Mzuzu', 'Zomba', 'Kasungu'],
  population: 21000000,
  mainLanguages: ['English', 'Chichewa', 'Tumbuka'],
  currency: 'Malawian kwacha (MWK)',
  timezone: 'Africa/Blantyre',
  foundingLeader: 'Hastings Banda',
  currentLeader: 'Lazarus Chakwera (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local OTC'],
  stablecoin: 'USDT / USDC informal',
  domesticCourierServices: AU_DOMESTIC_COURIERS['MW'],
  stockExchange: 'Malawi Stock Exchange',
}
