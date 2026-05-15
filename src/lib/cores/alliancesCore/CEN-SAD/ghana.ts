import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const ghana: CensadCountry = {
  name: 'Ghana',
  iso3166Alpha2: 'GH',
  capital: 'Accra',
  coordinates: { latitude: 5.6037, longitude: -0.187 },
  independence: '1957-03-06',
  topMajorCities: ['Accra', 'Kumasi', 'Tamale', 'Takoradi', 'Ashaiman'],
  population: 34400000,
  mainLanguages: ['English', 'Asante Twi', 'Fante'],
  currency: 'Ghanaian cedi (GHS)',
  timezone: 'Africa/Accra',
  foundingLeader: 'Kwame Nkrumah (first Prime Minister)',
  currentLeader: 'President John Mahama — verify',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance context', 'Licensed VASP evolution'],
  stablecoin: 'Pilot eCedi (CBDC narrative); USDT regional',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['GH'],
  stockExchange: 'Ghana Stock Exchange',
}
