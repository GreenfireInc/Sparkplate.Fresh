import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const malawi: CommonwealthCountry = {
  name: 'Malawi',
  iso3166Alpha2: 'MW',
  commonwealthStatus: 'member',
  capital: 'Lilongwe',
  coordinates: { latitude: -13.9626, longitude: 33.7741 },
  independence: '1964-07-06',
  topMajorCities: ['Lilongwe', 'Blantyre', 'Mzuzu', 'Zomba', 'Kasungu'],
  population: 21000000,
  mainLanguages: ['English', 'Chichewa', 'Tumbuka'],
  currency: 'Malawian kwacha (MWK)',
  timezone: 'Africa/Blantyre',
  foundingLeader: 'Hastings Banda (first Prime Minister)',
  currentLeader: 'Lazarus Chakwera (President)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['MW'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['MW'],
  stockExchange: 'Malawi Stock Exchange',
}
