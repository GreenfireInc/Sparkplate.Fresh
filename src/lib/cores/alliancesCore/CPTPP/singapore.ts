import type { CptppCountry } from './types'
import { CPTPP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CPTPP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const singapore: CptppCountry = {
  name: 'Singapore',
  iso3166Alpha2: 'SG',
  capital: 'Singapore (city-state)',
  coordinates: { latitude: 1.3521, longitude: 103.8198 },
  independence: '1965-08-09 (from Malaysia)',
  topMajorCities: ['Singapore Central', 'Jurong West', 'Tampines', 'Woodlands', 'Sengkang'],
  population: 6000000,
  mainLanguages: ['English', 'Mandarin Chinese', 'Malay'],
  currency: 'Singapore dollar (SGD)',
  timezone: 'Asia/Singapore',
  foundingLeader: 'Lee Kuan Yew (first Prime Minister)',
  currentLeader: 'Prime Minister Lawrence Wong — verify',
  cryptocurrencyExchanges: ['Independent Reserve SG', 'Coinbase (institutional licensing)', 'MAS-regulated pilots'],
  stablecoin: 'StraitsX XSGD; USDC institutional rails',
  domesticCourierServices: CPTPP_DOMESTIC_COURIERS['SG'],
  notableUniversities: CPTPP_NOTABLE_UNIVERSITIES['SG'],
  stockExchange: 'Singapore Exchange (SGX)',
}
