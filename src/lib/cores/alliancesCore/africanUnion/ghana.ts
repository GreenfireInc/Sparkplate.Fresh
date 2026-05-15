import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
export const ghana: AfricanUnionCountry = {
  name: 'Ghana',
  iso3166Alpha2: 'GH',
  africanUnionStatus: 'member',
  capital: 'Accra',
  coordinates: { latitude: 5.6037, longitude: -0.187 },
  independence: '1957-03-06',
  topMajorCities: ['Accra', 'Kumasi', 'Tamale', 'Takoradi', 'Ashaiman'],
  population: 34000000,
  mainLanguages: ['English', 'Akan', 'Ewe'],
  currency: 'Ghanaian cedi (GHS)',
  timezone: 'Africa/Accra',
  foundingLeader: 'Kwame Nkrumah',
  currentLeader: 'John Mahama (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Busha', 'Quidax'],
  stablecoin: 'USDT / USDC; Bank of Ghana piloting eCedi CBDC',
  domesticCourierServices: AU_DOMESTIC_COURIERS['GH'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['GH'],
  stockExchange: 'Ghana Stock Exchange (GSE)',
}
